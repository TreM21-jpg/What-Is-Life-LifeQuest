@echo off
REM Heroku Deployment Script for LifeQuest Backend (PowerShell version)
REM Run from repo root: powershell -NoProfile -ExecutionPolicy Bypass -File DEPLOY_HEROKU.ps1

$APP_NAME = "lifequest-api"
$REGION = "us"

Write-Host "🚀 LifeQuest Heroku Deployment" -ForegroundColor Cyan
Write-Host "=============================="
Write-Host ""

# Step 1: Login
Write-Host "Step 1: Authenticating with Heroku..." -ForegroundColor Yellow
cmd /c heroku login -i

# Step 2: Create app (if not exists)
Write-Host ""
Write-Host "Step 2: Creating Heroku app (or using existing)..." -ForegroundColor Yellow
$appCheckOutput = cmd /c "heroku apps:create $APP_NAME --region $REGION 2>&1"
if ($appCheckOutput -like "*already exists*") {
  Write-Host "App $APP_NAME already exists"
} else {
  Write-Host "App $APP_NAME created"
}

# Step 3: Push repo to Heroku
Write-Host ""
Write-Host "Step 3: Deploying code to Heroku..." -ForegroundColor Yellow
git push heroku main

# Step 4: Set MongoDB URI (optional)
Write-Host ""
Write-Host "Step 4: (Optional) Set MongoDB URI" -ForegroundColor Yellow
Write-Host "If you have a MongoDB Atlas URI, enter it now."
Write-Host "Or press Enter to skip (backend will use in-memory storage)"
$MONGODB_URI = Read-Host "Enter MongoDB URI (or press Enter to skip)"

if ($MONGODB_URI) {
  cmd /c "heroku config:set MONGODB_URI='$MONGODB_URI' --app=$APP_NAME"
  Write-Host "✅ MongoDB URI set" -ForegroundColor Green
}

# Step 5: View deployment info
Write-Host ""
Write-Host "Step 5: Deployment Info" -ForegroundColor Yellow
$appInfo = cmd /c "heroku apps:info $APP_NAME"
Write-Host $appInfo

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your backend is live at: https://$APP_NAME.herokuapp.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Health check:"
Write-Host "  curl https://$APP_NAME.herokuapp.com/health"
Write-Host ""
Write-Host "Set this URL in your frontend .env.local:"
Write-Host "  REACT_APP_API_URL=https://$APP_NAME.herokuapp.com"
Write-Host ""
Write-Host "View logs with:"
Write-Host "  heroku logs --tail --app=$APP_NAME"
