#requires -Version 3.0
[CmdletBinding()]
param(
    [ValidateSet('Check','CleanTemp','TrimMemory','SelfTest','Menu')][string]$Mode = 'Check',
    [switch]$Apply,
    [ValidateRange(7,3650)][int]$KeepDays = 30,
    [ValidateRange(1,50000)][int]$MaxFiles = 10000,
    [ValidateRange(1,10240)][int]$MaxMB = 512,
    [ValidateRange(1,5000000)][int]$MaxScan = 200000,
    [string]$ProfilePath = $env:USERPROFILE,
    [string]$ReportPath
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

function Get-State {
    $os = Get-WmiObject Win32_OperatingSystem
    $mem = Get-WmiObject Win32_PerfFormattedData_PerfOS_Memory
    $disk = Get-WmiObject Win32_LogicalDisk -Filter "DeviceID='$env:SystemDrive'"
    if (!$os -or !$mem -or !$disk -or !$os.TotalVisibleMemorySize -or !$mem.CommitLimit -or
        $null -eq $os.FreePhysicalMemory -or $null -eq $disk.FreeSpace) { throw '无法读取完整资源状态，已停止。' }
    [pscustomobject]@{
        Time = (Get-Date).ToString('o'); Hostname = $env:COMPUTERNAME
        TotalMB = [math]::Round([double]$os.TotalVisibleMemorySize / 1024, 1)
        AvailableMB = [math]::Round([double]$os.FreePhysicalMemory / 1024, 1)
        CommittedMB = [math]::Round([double]$mem.CommittedBytes / 1MB, 1)
        CommitPercent = [double]$mem.PercentCommittedBytesInUse
        SystemDisk = $env:SystemDrive; DiskFreeGB = [math]::Round([double]$disk.FreeSpace / 1GB, 3)
        Processes = @(Get-Process -Name WXWork,WXWorkWeb,WeMailNode -ErrorAction SilentlyContinue |
            Select-Object ProcessName,Id,WorkingSet64,PrivateMemorySize64,StartTime)
    }
}

function Test-PlainDirectory([string]$Path) {
    $dir = New-Object IO.DirectoryInfo($Path)
    if (!$dir.Exists) { return $false }
    while ($null -ne $dir) {
        if (($dir.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { return $false }
        $dir = $dir.Parent
    }
    return $true
}

function Get-TempRoots([string]$Root) {
    if (!(Test-PlainDirectory $Root)) { throw "临时目录不存在，或包含目录链接，已停止：$Root" }
    $Root
    foreach ($dir in (New-Object IO.DirectoryInfo($Root)).EnumerateDirectories()) {
        if ($dir.Name -match '^\d+$' -and (Test-PlainDirectory $dir.FullName)) { $dir.FullName }
    }
}

function Test-OldImage($File, [datetime]$Cutoff) {
    return ($File.Exists -and $File.Length -gt 0 -and
        ($File.Attributes -band ([IO.FileAttributes]::ReadOnly -bor [IO.FileAttributes]::ReparsePoint)) -eq 0 -and
        $File.Name -match '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}\.(jpg|jpeg|png|gif|webp)$' -and
        $File.CreationTimeUtc -lt $Cutoff -and $File.LastWriteTimeUtc -lt $Cutoff)
}

function Find-Batch([string[]]$Roots, [datetime]$Cutoff, [int]$FileLimit, [long]$ByteLimit, [int]$ScanLimit = 200000) {
    $selected = New-Object 'Collections.Generic.List[object]'
    $bytes = 0L; $scanned = 0; $limited = $false; $scanLimited = $false; $scanErrors = 0
    # ponytail: bounded batches keep RAM use small; rerun to handle a large backlog.
    :scan foreach ($root in $Roots) {
        foreach ($file in (New-Object IO.DirectoryInfo($root)).EnumerateFiles()) {
            if ($scanned -ge $ScanLimit) { $scanLimited = $true; break scan }
            $scanned++
            try {
                if (!(Test-OldImage $file $Cutoff) -or $file.Length -gt $ByteLimit) { continue }
                if ($bytes + $file.Length -gt $ByteLimit) { $limited = $true; break scan }
                $row = [pscustomobject]@{Path=$file.FullName;Length=$file.Length;
                    CreatedTicks=$file.CreationTimeUtc.Ticks;WrittenTicks=$file.LastWriteTimeUtc.Ticks}
            } catch { $scanErrors++; continue } # A changing file must not abort the entire scan.
            $selected.Add($row); $bytes += $row.Length
            if ($selected.Count -ge $FileLimit -or $bytes -ge $ByteLimit) { $limited = $true; break scan }
        }
    }
    [pscustomobject]@{Files=$selected.ToArray();Bytes=$bytes;Scanned=$scanned;LimitReached=$limited;
        ScanLimitReached=$scanLimited;ScanErrors=$scanErrors}
}

function Remove-Batch($Files, [string[]]$Roots, [datetime]$Cutoff) {
    $deleted = New-Object 'Collections.Generic.List[object]'
    $skipped = 0; $bytes = 0L
    foreach ($row in $Files) {
        $stream = $null
        try {
            $file = New-Object IO.FileInfo($row.Path)
            if ($Roots -notcontains $file.DirectoryName -or !(Test-PlainDirectory $file.DirectoryName)) { $skipped++; continue }
            $file.Refresh()
            if (!(Test-OldImage $file $Cutoff) -or $file.Length -ne $row.Length -or
                $file.CreationTimeUtc.Ticks -ne $row.CreatedTicks -or $file.LastWriteTimeUtc.Ticks -ne $row.WrittenTicks) { $skipped++; continue }
            # ShareDelete permits our delete while this handle blocks existing/new readers and writers.
            $stream = [IO.File]::Open($file.FullName, 'Open', 'Read', 'Delete')
            $file.Refresh()
            if (!(Test-OldImage $file $Cutoff) -or $file.Length -ne $row.Length -or
                $file.CreationTimeUtc.Ticks -ne $row.CreatedTicks -or $file.LastWriteTimeUtc.Ticks -ne $row.WrittenTicks) { $skipped++; continue }
            [IO.File]::Delete($file.FullName)
            $stream.Dispose(); $stream = $null
            if ([IO.File]::Exists($file.FullName)) { $skipped++; continue }
            $deleted.Add($row); $bytes += $row.Length
        } catch { $skipped++ }
        finally { if ($null -ne $stream) { $stream.Dispose() } }
    }
    [pscustomobject]@{DeletedCount=$deleted.Count;DeletedBytes=$bytes;SkippedCount=$skipped;DeletedFiles=$deleted.ToArray()}
}

function Get-TrimBlockReason($State) {
    $threshold = [math]::Max(256, $State.TotalMB * 0.15)
    if ($State.AvailableMB -ge $threshold) { return "当前可用内存充足，跳过内存压缩。" }
    if ($State.CommitPercent -ge 85) { return "已提交内存过高；压缩工作集不能释放这些分配，已跳过。" }
    if ($State.DiskFreeGB -lt 2) { return "系统盘不足 2 GB，先处理磁盘空间，已跳过内存压缩。" }
    if (@($State.Processes | Where-Object {$_.ProcessName -eq 'WXWork'}).Count -eq 0) { return "未找到企业微信主进程，已跳过。" }
    return $null
}

function Add-MemoryApi {
    if (!('WeComMaintenance.NativeMemory' -as [type])) {
        Add-Type -Namespace WeComMaintenance -Name NativeMemory -MemberDefinition @'
[System.Runtime.InteropServices.DllImport("psapi.dll", SetLastError=true)]
[return: System.Runtime.InteropServices.MarshalAs(System.Runtime.InteropServices.UnmanagedType.Bool)]
public static extern bool EmptyWorkingSet(System.IntPtr hProcess);
'@
    }
}

function Invoke-SelfTest {
    $root = Join-Path ([IO.Path]::GetTempPath()) ('WeComMaintenanceTest-' + [guid]::NewGuid().ToString('N'))
    $null = [IO.Directory]::CreateDirectory($root)
    $lock = $null
    try {
        $old = [datetime]::UtcNow.AddDays(-40); $cutoff = [datetime]::UtcNow.AddDays(-30)
        $paths = @{}
        foreach ($name in @('old','recent','locked','readonly','changed','named')) {
            $filename = [guid]::NewGuid().ToString() + '.jpg'
            if ($name -eq 'named') { $filename = 'business-material.jpg' }
            $p = Join-Path $root $filename; [IO.File]::WriteAllBytes($p, (New-Object byte[] 1024))
            if ($name -ne 'recent') { [IO.File]::SetCreationTimeUtc($p,$old); [IO.File]::SetLastWriteTimeUtc($p,$old) }
            $paths[$name] = $p
        }
        [IO.File]::SetAttributes($paths.readonly, [IO.FileAttributes]::ReadOnly)
        $lock = [IO.File]::Open($paths.locked,'Open','Read','None')
        $roots = @(Get-TempRoots $root)
        $batch = Find-Batch $roots $cutoff 100 1MB
        if ($batch.Files.Count -ne 3) { throw 'SelfTest: old-file selection failed' }
        $limited = Find-Batch $roots $cutoff 1 1MB
        if ($limited.Files.Count -ne 1 -or !$limited.LimitReached) { throw 'SelfTest: batch cap failed' }
        $byteLimited = Find-Batch $roots $cutoff 100 1024
        if ($byteLimited.Files.Count -ne 1 -or $byteLimited.Bytes -gt 1024) { throw 'SelfTest: byte cap failed' }
        $scanLimited = Find-Batch $roots $cutoff 100 1MB 1
        if ($scanLimited.Scanned -ne 1 -or !$scanLimited.ScanLimitReached) { throw 'SelfTest: scan cap failed' }
        $noneOld = Find-Batch $roots ([datetime]::UtcNow.AddYears(-1)) 100 1MB 1
        if ($noneOld.Files.Count -ne 0 -or $noneOld.Scanned -ne 1 -or !$noneOld.ScanLimitReached) { throw 'SelfTest: empty scan cap failed' }
        $sub = Join-Path $root 'protected'; $null=[IO.Directory]::CreateDirectory($sub)
        $outside = Join-Path $sub ([guid]::NewGuid().ToString()+'.jpg')
        [IO.File]::WriteAllBytes($outside,(New-Object byte[] 1024))
        [IO.File]::SetCreationTimeUtc($outside,$old); [IO.File]::SetLastWriteTimeUtc($outside,$old)
        $foreign = [pscustomobject]@{Path=$outside;Length=1024;CreatedTicks=$old.Ticks;WrittenTicks=$old.Ticks}
        $guard = Remove-Batch @($foreign) $roots $cutoff
        if ($guard.DeletedCount -ne 0 -or ![IO.File]::Exists($outside)) { throw 'SelfTest: directory boundary failed' }
        [IO.File]::SetLastWriteTimeUtc($paths.changed,[datetime]::UtcNow)
        $result = Remove-Batch $batch.Files $roots $cutoff
        if ($result.DeletedCount -ne 1 -or $result.SkippedCount -ne 2 -or [IO.File]::Exists($paths.old)) { throw 'SelfTest: locked/changed-file guard failed' }
        foreach ($name in @('recent','locked','readonly','changed','named')) {
            if (![IO.File]::Exists($paths[$name])) { throw "SelfTest: protected file removed: $name" }
        }
        $state = [pscustomobject]@{TotalMB=2048;AvailableMB=900;CommitPercent=40;DiskFreeGB=5;Processes=@([pscustomobject]@{ProcessName='WXWork'})}
        if (!(Get-TrimBlockReason $state)) { throw 'SelfTest: sufficient-memory guard failed' }
        $state.AvailableMB=100; $state.DiskFreeGB=1
        if (!(Get-TrimBlockReason $state)) { throw 'SelfTest: low-disk guard failed' }
        $state.DiskFreeGB=5; $state.CommitPercent=90
        if (!(Get-TrimBlockReason $state)) { throw 'SelfTest: commit guard failed' }
        $state.CommitPercent=40
        if (Get-TrimBlockReason $state) { throw 'SelfTest: eligible-memory check failed' }
        Add-MemoryApi
        if (![WeComMaintenance.NativeMemory]::EmptyWorkingSet([Diagnostics.Process]::GetCurrentProcess().Handle)) { throw 'SelfTest: native API failed' }
        [pscustomobject]@{Passed=$true;BusinessProcessesTouched=$false;SyntheticFilesDeleted=1;NativeApiTestedOnSelf=$true}
    } finally {
        if ($null -ne $lock) { $lock.Dispose() }
        if ($paths -and $paths.readonly -and [IO.File]::Exists($paths.readonly)) { [IO.File]::SetAttributes($paths.readonly,[IO.FileAttributes]::Normal) }
        [IO.Directory]::Delete($root,$true)
    }
}

if ($Mode -eq 'Menu') {
    Write-Host "1 检查状态    2 清理旧临时图片    3 尝试临时释放内存    0 退出"
    $choice = Read-Host '请选择'
    $target = switch ($choice) {'1' {'Check'} '2' {'CleanTemp'} '3' {'TrimMemory'} default {return}}
    $menuReport = Join-Path $PSScriptRoot ('Logs\preview-' + [guid]::NewGuid().ToString('N') + '.json')
    & $PSCommandPath -Mode $target -KeepDays $KeepDays -MaxFiles $MaxFiles -MaxMB $MaxMB -MaxScan $MaxScan -ProfilePath $ProfilePath -ReportPath $menuReport
    $preview = [IO.File]::ReadAllText($menuReport) | ConvertFrom-Json
    $canApply = ($choice -eq '2' -and $preview.Candidates.Count -gt 0) -or ($choice -eq '3' -and $preview.Status -eq 'Preview')
    if ($canApply) {
        if ($choice -eq '2') { Write-Host '执行后将永久删除本批过期临时图片。' }
        else { Write-Host '内存释放只作一次临时缓解，可能短暂变慢。' }
        if ((Read-Host '核对上方预览后，输入 YES 执行') -ceq 'YES') {
            & $PSCommandPath -Mode $target -Apply -KeepDays $KeepDays -MaxFiles $MaxFiles -MaxMB $MaxMB -MaxScan $MaxScan -ProfilePath $ProfilePath
        }
    }
    $null = Read-Host '按回车结束'; return
}

if ([string]::IsNullOrWhiteSpace($ReportPath)) {
    $ReportPath = Join-Path $PSScriptRoot ('Logs\' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0,8) + '.json')
}
$ReportPath = [IO.Path]::GetFullPath($ReportPath)
$null = [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($ReportPath))
$null = New-Item -ItemType File -Path $ReportPath # Fail before modifying files if a report already exists.
$report = [ordered]@{Version='1.1';Mode=$Mode;Apply=[bool]$Apply;Status='Started';ReportPath=$ReportPath}
try {
    $report.Before = Get-State
    Write-Host ("内存可用 {0} / {1} MB；系统盘 {2} 可用 {3} GB" -f $report.Before.AvailableMB,$report.Before.TotalMB,$report.Before.SystemDisk,$report.Before.DiskFreeGB)
    if ($Mode -eq 'SelfTest') { $report.Test = Invoke-SelfTest }
    elseif ($Mode -eq 'TrimMemory') {
        $report.Message = Get-TrimBlockReason $report.Before
        if ($report.Message) { $report.Status='Skipped' }
        elseif (!$Apply) { $report.Status='Preview'; $report.Message='可尝试一次压缩企业微信工作集；这不会释放程序已提交的内存，也不会解决内存泄漏。' }
        else {
            Add-MemoryApi
            $report.Trim = @(foreach ($process in @(Get-Process -Name WXWork -ErrorAction SilentlyContinue)) {
                try {
                    $before = $process.WorkingSet64
                    $ok = [WeComMaintenance.NativeMemory]::EmptyWorkingSet($process.Handle)
                    $errorCode = [Runtime.InteropServices.Marshal]::GetLastWin32Error(); $process.Refresh()
                    [pscustomobject]@{Id=$process.Id;Success=$ok;Win32Error=$(if($ok){0}else{$errorCode});WorkingSetBefore=$before;WorkingSetAfter=$process.WorkingSet64}
                } catch { [pscustomobject]@{Id=$process.Id;Success=$false;Error=$_.Exception.Message} }
            })
            if ($report.Trim.Count -eq 0) { $report.Status='Skipped' }
            elseif (@($report.Trim | Where-Object {!$_.Success}).Count -gt 0) { $report.Status='PartialFailure' }
            $report.Message='已尝试一次。工作集可能重新增长；不能将工作集下降等同于全机释放量。'
        }
    } else {
        $root = Join-Path ([IO.Path]::GetFullPath($ProfilePath)) 'AppData\Local\Temp'
        $roots = @(Get-TempRoots $root); $cutoff=[datetime]::UtcNow.AddDays(-$KeepDays)
        $batch = Find-Batch $roots $cutoff $MaxFiles ($MaxMB * 1MB) $MaxScan
        $report.Scope=@{Roots=$roots;KeepDays=$KeepDays;MaxFiles=$MaxFiles;MaxMB=$MaxMB;MaxScan=$MaxScan}
        $report.Candidates=@{Count=$batch.Files.Count;Bytes=$batch.Bytes;LimitReached=$batch.LimitReached;Scanned=$batch.Scanned;
            ScanLimitReached=$batch.ScanLimitReached;ScanErrors=$batch.ScanErrors;Examples=@($batch.Files|Select-Object -First 5)}
        Write-Host ("本批候选：{0} 个旧临时图片，共 {1:N1} MB；保留最近 {2} 天。" -f $batch.Files.Count,($batch.Bytes/1MB),$KeepDays)
        if ($Mode -eq 'CleanTemp' -and $Apply) { $report.Cleanup=Remove-Batch $batch.Files $roots $cutoff }
        else { $report.Status='Preview'; $report.Message='仅预览，没有删除。候选数量是本批上限范围，不是全部缓存总量。' }
    }
    $report.After=Get-State
    if ($report.Status -eq 'Started') { $report.Status='Completed' }
} catch { $report.Status='Error'; $report.Error=$_.Exception.Message; throw }
finally {
    $report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ReportPath -Encoding UTF8
    if ($report.Cleanup) { Write-Host ("实际删除 {0} 个文件，{1:N1} MB；跳过 {2} 个。" -f $report.Cleanup.DeletedCount,($report.Cleanup.DeletedBytes/1MB),$report.Cleanup.SkippedCount) }
    if ($report.Message) { Write-Host $report.Message }
    if ($report.After) { Write-Host ("复查：内存可用 {0} MB；系统盘可用 {1} GB。" -f $report.After.AvailableMB,$report.After.DiskFreeGB) }
    Write-Host "结果：$($report.Status)；记录：$ReportPath"
}
