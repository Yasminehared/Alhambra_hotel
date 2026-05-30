# Alhambra Hotel — one-command Docker start (Windows)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Install Docker Desktop: https://www.docker.com/products/docker-desktop/" -ForegroundColor Red
    exit 1
}

Write-Host "Building and starting Alhambra (first run may take 10+ minutes)..." -ForegroundColor Cyan
docker compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Ready:" -ForegroundColor Green
    Write-Host "  Website:  http://localhost:8080"
    Write-Host "  Admin:    http://localhost:8080/admin/login"
    Write-Host "  Login:    admin@alhambra.com / password"
    Write-Host ""
    Write-Host "Logs: docker compose logs -f gateway"
} else {
    Write-Host "Startup failed. Run: docker compose logs" -ForegroundColor Red
    exit $LASTEXITCODE
}
