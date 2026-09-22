# Windows counterpart to playwright_cli.sh. Pass arguments through unchanged.
$ErrorActionPreference = 'Stop'

$playwrightNpx = Get-Command npx.cmd -ErrorAction SilentlyContinue
if (-not $playwrightNpx) {
    $playwrightNpx = Get-Command npx -ErrorAction SilentlyContinue
}
if (-not $playwrightNpx) {
    Write-Error 'npx is required but not found on PATH. Check the installed or bundled Node.js runtime.'
    exit 1
}

$playwrightHasSession = $false
foreach ($playwrightArg in $args) {
    if ($playwrightArg -eq '--session' -or $playwrightArg -like '--session=*') {
        $playwrightHasSession = $true
        break
    }
}

$playwrightArguments = @('--yes', '--package', '@playwright/cli', 'playwright-cli')
if (-not $playwrightHasSession -and $env:PLAYWRIGHT_CLI_SESSION) {
    $playwrightArguments += @('--session', $env:PLAYWRIGHT_CLI_SESSION)
}
$playwrightArguments += $args
& $playwrightNpx.Source @playwrightArguments
exit $LASTEXITCODE
