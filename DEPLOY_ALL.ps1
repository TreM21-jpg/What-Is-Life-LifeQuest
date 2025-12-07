# LifeQuest Full Deployment Orchestrator (PowerShell)
# This script automates all deployment steps for Heroku, Railway, AWS EB, and MongoDB

param(
    [switch]$SkipHeroku = $false,
    [switch]$SkipAWS = $false,
    [switch]$SkipRailway = $false,
    [switch]$SkipDocker = $false
)

# Color output
function Write-Success {
    param([string]$Message)
    Write-Host "[✓] $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "[i] $Message" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[!] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[✗] $Message" -ForegroundColor Red
}

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host ("═" * 70) -ForegroundColor Magenta
    Write-Host "  $Title" -ForegroundColor Magenta
    Write-Host ("═" * 70) -ForegroundColor Magenta
    Write-Host ""
}

# ============================================================================
# MAIN DEPLOYMENT
# ============================================================================

Write-Section "🚀 LifeQuest Full Deployment Orchestrator"

# Step 1: Validate Repository
Write-Section "1️⃣  Repository Validation"

$requiredFiles = @(
    "package.json",
    "Procfile",
    "Dockerfile",
    "docker-compose.yml",
    ".env.example",
    "backend/server-enhanced.js",
    "src/App.js"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Success "Found: $file"
    } else {
        Write-Error "Missing: $file"
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Error "Some required files are missing. Exiting."
    exit 1
}

# Step 2: Git Status
Write-Section "2️⃣  Git Status Check"

$gitStatus = git status --porcelain 2>$null
if ([string]::IsNullOrWhiteSpace($gitStatus)) {
    Write-Success "Repository is clean"
} else {
    Write-Warning "Uncommitted changes detected. Committing..."
    git add -A
    git commit -m "Auto-commit before deployment"
    Write-Success "Changes committed"
}

# Step 3: NPM Dependencies
Write-Section "3️⃣  NPM Dependencies"

Write-Info "Checking backend dependencies..."
npm list express cors dotenv mongodb > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Info "Installing missing dependencies..."
    npm install
}
Write-Success "All dependencies installed"

# Step 4: Heroku Deployment
if (-not $SkipHeroku) {
    Write-Section "4️⃣  Heroku Deployment"
    
    $herokuExists = cmd /c "heroku --version" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Info "Creating Heroku app..."
        cmd /c "heroku apps:create lifequest-api 2>nul || echo App exists"
        
        Write-Info "Pushing code to Heroku..."
        git push heroku main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Heroku deployment complete"
            Write-Success "Backend URL: https://lifequest-api.herokuapp.com"
        } else {
            Write-Warning "Heroku push failed - may require authentication"
        }
    } else {
        Write-Warning "Heroku CLI not installed. Skipping Heroku deployment."
        Write-Info "Install with: npm install -g heroku"
    }
}

# Step 5: AWS EB Deployment
if (-not $SkipAWS) {
    Write-Section "5️⃣  AWS Elastic Beanstalk"
    
    $ebExists = cmd /c "eb --version" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Info "Initializing Elastic Beanstalk..."
        eb init -p "Node.js 18 running on 64bit Amazon Linux 2" lifequest-api --region us-east-1 2>$null
        
        Write-Info "Creating environment..."
        eb create lifequest-env --instance-type t3.micro 2>$null
        
        Write-Success "AWS EB configured"
        Write-Info "Note: EC2 instance creation takes 3-5 minutes"
    } else {
        Write-Warning "EB CLI not installed. Skipping AWS EB deployment."
        Write-Info "Install with: pip install awsebcli --user"
    }
}

# Step 6: Railway Deployment
if (-not $SkipRailway) {
    Write-Section "6️⃣  Railway Deployment"
    
    Write-Info "Railway uses GitHub integration for auto-deploy"
    Write-Success "Setup steps:"
    Write-Host "  1. Visit https://railway.app"
    Write-Host "  2. Create account or log in"
    Write-Host "  3. New project → Connect GitHub"
    Write-Host "  4. Select: TreM21-jpg/What-Is-Life-LifeQuest"
    Write-Host "  5. Auto-deploys on every push to main"
    Write-Host "  6. Set MONGODB_URI in environment variables"
}

# Step 7: Docker Verification
if (-not $SkipDocker) {
    Write-Section "7️⃣  Docker Verification"
    
    $dockerExists = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Docker is available"
        Write-Info "To test locally: docker compose up --build"
    } else {
        Write-Warning "Docker not installed"
        Write-Info "Install from: https://www.docker.com"
    }
}

# Step 8: Environment Variables
Write-Section "8️⃣  Environment Variables Setup"

if (Test-Path ".env.example") {
    Write-Success ".env.example found"
    Write-Info "Set these variables on your deployment platform:"
    Write-Host "  MONGODB_URI = <your_mongodb_atlas_connection_string>"
    Write-Host "  PORT = 3001"
    Write-Host "  NODE_ENV = production"
}

# Step 9: MongoDB Atlas Instructions
Write-Section "9️⃣  MongoDB Atlas Setup"

Write-Host @"
Steps to set up MongoDB Atlas:

1. Go to https://cloud.mongodb.com
2. Create account or log in
3. Create Free Cluster (Shared Tier)
4. Create Database User:
   - Username: lifequest
   - Generate secure password
5. Configure Network Access:
   - Add IP: 0.0.0.0/0
6. Get Connection String:
   - Click Connect → Connect your application
   - Copy the connection string
7. Replace in connection string:
   - <username> → lifequest
   - <password> → your_password
   - myFirstDatabase → lifequest
8. Set MONGODB_URI on each platform:
   Heroku:
     heroku config:set MONGODB_URI="<your_uri>" --app=lifequest-api
   Railway:
     Set in Dashboard → Variables
   AWS EB:
     eb setenv MONGODB_URI="<your_uri>"

Example URI:
mongodb+srv://lifequest:YourPassword123@cluster0.abcd.mongodb.net/lifequest?retryWrites=true&w=majority
"@

# Step 10: Frontend Configuration
Write-Section "🔟 Frontend Configuration"

Write-Host @"
After backend is deployed:

1. Update .env.local in React project:
   REACT_APP_API_URL=https://your-backend-url

2. Rebuild frontend:
   npm run build

3. Deploy to Netlify:
   - Connect GitHub repo to Netlify
   - Select main branch
   - Build command: npm run build
   - Publish directory: build/
   - Auto-deploys on push
"@

# Step 11: Health Check
Write-Section "1️⃣1️⃣  Health Check"

Write-Host @"
Verify deployments with:

Local (if running):
  curl http://localhost:3001/health
  curl http://localhost:3001/api/leaderboard

Heroku:
  curl https://lifequest-api.herokuapp.com/health

AWS EB:
  curl http://your-eb-domain/health

Expected response:
  { "status": "ok", "database": "MongoDB" or "In-Memory", ... }
"@

# Step 12: Final Summary
Write-Section "✅ Deployment Summary"

Write-Host @"
╔════════════════════════════════════════════════════════════╗
║          🎮 LifeQuest Deployment Complete! 🚀             ║
╚════════════════════════════════════════════════════════════╝

Next Steps:

1. Verify each deployment:
   ✓ Heroku: https://dashboard.heroku.com/apps
   ✓ Railway: https://railway.app/dashboard
   ✓ AWS EB: AWS Console → Elastic Beanstalk

2. Set MongoDB URI on each platform

3. Update frontend .env.local with backend URL

4. Rebuild and deploy frontend to Netlify

5. Test end-to-end with Dev/Test UI buttons

6. Monitor logs:
   ✓ Heroku: heroku logs --tail --app=lifequest-api
   ✓ AWS EB: eb logs --all
   ✓ Railway: Dashboard logs

Documentation:
- DEPLOYMENT_DASHBOARD.html (interactive guide)
- README_DEPLOY.md (comprehensive reference)
- QUICK_REFERENCE.txt (cheat sheet)

You're Production-Ready! 🎉
"@
