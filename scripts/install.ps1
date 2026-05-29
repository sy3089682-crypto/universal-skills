#!/usr/bin/env pwsh
# Universal Skills Installer — Windows / PowerShell
param(
    [ValidateSet("auto","all","opencode","claude-code","cursor","windsurf")]
    [string]$Mode = "auto"
)

$VERSION = "1.0.0"
$ScriptDir = Split-Path -Parent $PSScriptRoot
$SkillsSrc = Join-Path $ScriptDir "skills"

$Host.UI.RawUI.ForegroundColor = "DarkCyan"
Write-Host "`n ╔══════════════════════════════════════╗"
Write-Host " ║   Universal Skills Installer v$VERSION  ║"
Write-Host " ╚══════════════════════════════════════╝`n"
$Host.UI.RawUI.ForegroundColor = "White"

function Copy-Skills {
    param([string]$Src, [string]$Dst)
    if (-not (Test-Path $Dst)) { New-Item -ItemType Directory -Path $Dst -Force | Out-Null }
    $count = 0
    Get-ChildItem $Src -Directory | ForEach-Object {
        $catDir = $_.FullName
        $catName = $_.Name
        Get-ChildItem $catDir -Directory | ForEach-Object {
            $skillDir = $_.FullName
            $skillName = $_.Name
            $skillFile = Join-Path $skillDir "SKILL.md"
            if (Test-Path $skillFile) {
                $dstSkill = Join-Path $Dst $catName $skillName
                New-Item -ItemType Directory -Path $dstSkill -Force | Out-Null
                Copy-Item $skillFile (Join-Path $dstSkill "SKILL.md") -Force
                $count++
            }
        }
    }
    return $count
}

$targets = @()
if ($Mode -eq "auto") {
    if (Test-Path "$env:USERPROFILE\.config\opencode") { $targets += "opencode" }
    if (Test-Path "$env:USERPROFILE\.claude") { $targets += "claude-code" }
    if (Test-Path "$env:USERPROFILE\.cursor") { $targets += "cursor" }
    if (Test-Path "$env:USERPROFILE\.windsurf") { $targets += "windsurf" }
    if ($targets.Count -eq 0) { $targets = @("opencode", "claude-code") }
} elseif ($Mode -eq "all") {
    $targets = @("opencode", "claude-code", "cursor", "windsurf")
} else {
    $targets = @($Mode)
}

Write-Host "Installing for:" -ForegroundColor Cyan
$targets | ForEach-Object { Write-Host "  • $_" }

$total = 0
foreach ($target in $targets) {
    switch ($target) {
        "opencode" {
            $dst = "$env:USERPROFILE\.config\opencode\skills"
            Write-Host "`n  → opencode" -NoNewline
            $c = Copy-Skills -Src $SkillsSrc -Dst $dst
            $pluginDst = "$env:USERPROFILE\.opencode\plugins"
            if (-not (Test-Path $pluginDst)) { New-Item -ItemType Directory -Path $pluginDst -Force | Out-Null }
            $pluginSrc = Join-Path $ScriptDir "plugins\opencode\skill-router.ts"
            if (Test-Path $pluginSrc) { Copy-Item $pluginSrc (Join-Path $pluginDst "skill-router.ts") -Force }
            Write-Host " $c skills" -ForegroundColor Green
            $total += $c
        }
        "claude-code" {
            $dst = "$env:USERPROFILE\.claude\skills"
            Write-Host "`n  → Claude Code" -NoNewline
            $c = Copy-Skills -Src $SkillsSrc -Dst $dst
            Write-Host " $c skills" -ForegroundColor Green
            $total += $c
        }
        "cursor" {
            $dst = "$env:USERPROFILE\.cursor\skills"
            Write-Host "`n  → Cursor" -NoNewline
            $c = Copy-Skills -Src $SkillsSrc -Dst $dst
            Write-Host " $c skills" -ForegroundColor Green
            $total += $c
        }
        "windsurf" {
            $dst = "$env:USERPROFILE\.windsurf\skills"
            Write-Host "`n  → Windsurf" -NoNewline
            $c = Copy-Skills -Src $SkillsSrc -Dst $dst
            Write-Host " $c skills" -ForegroundColor Green
            $total += $c
        }
    }
}

$Host.UI.RawUI.ForegroundColor = "Green"
Write-Host "`n ──────────────────────────────────────"
Write-Host " ✓ $total skills deployed across $($targets.Count) tool(s)"
Write-Host " ──────────────────────────────────────"
$Host.UI.RawUI.ForegroundColor = "Cyan"
Write-Host "`n ➜ Restart your CLI tool — skills load automatically"
Write-Host " ➜ Run 'npx universal-skills list' to browse`n"
$Host.UI.RawUI.ForegroundColor = "White"
