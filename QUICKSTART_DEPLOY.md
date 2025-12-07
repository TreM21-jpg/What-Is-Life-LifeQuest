# LifeQuest Deployment & MongoDB Setup — Quick Start

This folder contains automated scripts and guides for deploying your backend and setting up persistent storage.

## 📋 Files Overview

- **DEPLOY_HEROKU.ps1** — PowerShell script to deploy to Heroku (recommended for quickest start)
- **DEPLOY_HEROKU.sh** — Bash version of Heroku deploy script
- **DEPLOY_RAILWAY.sh** — Guide for Railway web UI deployment (GitHub-integrated)
- **DEPLOY_AWS_EB.sh** — Script for AWS Elastic Beanstalk deployment
- **SETUP_MONGODB_ATLAS.sh** — Step-by-step guide to create a free MongoDB cluster
- **README_DEPLOY.md** — Detailed reference with all deployment options

## 🚀 Quick Start (5-10 minutes)

### Option 1: Deploy to Heroku (Easiest)

From PowerShell (Windows):
```powershell
cd C:\Users\tmoore\What-Is-Life-LifeQuest
powershell -NoProfile -ExecutionPolicy Bypass -File DEPLOY_HEROKU.ps1
```

Or from Bash (Mac/Linux):
```bash
cd ~/What-Is-Life-LifeQuest
bash DEPLOY_HEROKU.sh
```

This will:
1. Prompt you to log in to Heroku (email + password)
2. Create a new app named `lifequest-api` (or use existing)
3. Deploy your code
4. Optionally set MongoDB URI for persistence
5. Give you a public URL like `https://lifequest-api.herokuapp.com`

### Option 2: Deploy to Railway (Modern, Fast)

1. Visit https://railway.app
2. Log in with GitHub
3. Create new project → select your GitHub repo
4. Railway auto-deploys on push
5. Set `MONGODB_URI` in environment variables
6. Get your deployment URL

### Option 3: AWS Elastic Beanstalk (Production)

From Bash (requires AWS CLI + EB CLI):
```bash
bash DEPLOY_AWS_EB.sh
```

## 🗄️ Set Up MongoDB (Optional but Recommended)

Your backend can run without a database (in-memory fallback), but to persist player saves:

### Quick MongoDB Setup with Atlas (Free)

```bash
bash SETUP_MONGODB_ATLAS.sh
```

Or manually:
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Create database user
4. Get connection string
5. Set `MONGODB_URI` environment variable on your host

## ✅ Verify Deployment

Once deployed, test the health endpoint:

```bash
# Replace with your actual URL
curl https://your-backend-url/health

# Should return:
# { "status": "ok", "database": "MongoDB" or "In-Memory", ... }
```

## 🔗 Connect Frontend to Backend

After deployment, update your frontend's `.env.local`:

```
REACT_APP_API_URL=https://your-backend-url
```

Then rebuild and deploy the frontend.

## 📊 What's Included

Your backend includes:
- Express.js REST API
- MongoDB integration (with in-memory fallback)
- Player saves & leaderboard
- Achievements tracking
- Lore unlock system
- Daily challenges
- Streak tracking
- Health check endpoint

## 🆘 Troubleshooting

**"MONGODB_URI not set"** — Backend will use in-memory storage. Data is lost on restart.

**"Connection refused"** — Make sure your backend is running and the URL is correct.

**"Heroku login failed"** — Run `heroku login` separately and try again.

**"Permission denied" (Scripts)** — On Mac/Linux, run: `chmod +x DEPLOY_*.sh SETUP_*.sh`

## 📞 Next Steps

1. **Deploy backend** using one of the scripts above
2. **Set up MongoDB** (optional) for persistent data
3. **Update frontend** `.env.local` with backend URL
4. **Test save/load** using the Dev/Test controls in the app

For full deployment details, see [README_DEPLOY.md](README_DEPLOY.md)
