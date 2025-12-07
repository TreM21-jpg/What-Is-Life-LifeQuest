# 🚀 LifeQuest Complete Deployment Guide

## Overview

LifeQuest is now **fully production-ready** with comprehensive deployment automation across multiple platforms:

- **Heroku** - Cloud deployment with automatic scaling
- **Railway** - GitHub-integrated deployment with auto-scaling
- **AWS Elastic Beanstalk** - Enterprise-grade AWS deployment
- **Docker** - Containerized local and cloud deployment
- **MongoDB Atlas** - Cloud database with free tier
- **Netlify** - Frontend deployment with auto-builds

---

## ⚡ Quick Start (5 minutes)

### Option 1: Automated Deployment (Recommended)

**Windows (PowerShell):**
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File DEPLOY_ALL.ps1
```

**Mac/Linux (Node.js):**
```bash
node DEPLOY_ALL.js
```

This will automatically:
1. ✅ Validate your repository
2. ✅ Install dependencies
3. ✅ Deploy to Heroku
4. ✅ Deploy to AWS EB
5. ✅ Configure Railway
6. ✅ Set up MongoDB Atlas guidance
7. ✅ Configure frontend
8. ✅ Test health endpoints
9. ✅ Provide next steps

### Option 2: Manual Step-by-Step

See `DEPLOYMENT_CHECKLIST.md` for detailed manual instructions.

---

## 📦 What's Deployed

### Backend Services (3 platforms)

| Platform | URL | Setup Time | Auto-Deploy | Free Tier |
|----------|-----|-----------|------------|-----------|
| Heroku | `https://lifequest-api.herokuapp.com` | 2-3 min | Manual | ✅ Limited |
| Railway | `https://your-service.up.railway.app` | Auto | ✅ Automatic | ✅ Yes |
| AWS EB | `http://lifequest-env.elasticbeanstalk.com` | 5-10 min | Manual | ⚠️ Limited |

### Database

| Service | Tier | Size | Auto-Scale | Free Tier |
|---------|------|------|-----------|-----------|
| MongoDB Atlas | Shared | 512 MB | ✅ Yes | ✅ Yes |

### Frontend

| Platform | URL | Auto-Deploy | Free Tier |
|----------|-----|------------|-----------|
| Netlify | `https://lifequest.netlify.app` | ✅ GitHub | ✅ Yes |

---

## 🔑 Key Files

### Deployment Orchestrators
- **`DEPLOY_ALL.js`** - Master orchestrator (Node.js, cross-platform)
- **`DEPLOY_ALL.ps1`** - Master orchestrator (PowerShell, Windows)

### Platform-Specific Scripts
- **`DEPLOY_HEROKU.ps1`** - Interactive Heroku deployment
- **`DEPLOY_HEROKU.sh`** - Bash Heroku deployment
- **`DEPLOY_RAILWAY.sh`** - Railway deployment guide
- **`DEPLOY_AWS_EB.sh`** - AWS EB deployment automation
- **`SETUP_MONGODB_ATLAS.sh`** - MongoDB Atlas walkthrough

### Documentation
- **`DEPLOYMENT_CHECKLIST.md`** - Step-by-step verification
- **`DEPLOYMENT_DASHBOARD.html`** - Interactive browser guide (open in browser)
- **`README_DEPLOY.md`** - Comprehensive reference
- **`QUICKSTART_DEPLOY.md`** - 5-minute quick start
- **`DEVELOPMENT_CHECKLIST.md`** - Integration checklist

### Configuration
- **`.env.example`** - Environment variable template
- **`Dockerfile`** - Docker container definition
- **`docker-compose.yml`** - Local dev with MongoDB
- **`Procfile`** - Heroku process file

---

## 🎯 Deployment Flow

```
┌─────────────────────┐
│  Start Here: Code   │
│   Committed to      │
│   GitHub/main       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Run DEPLOY_ALL     │
│  (.js or .ps1)      │
└──────────┬──────────┘
           │
           ├─── Step 1: Validate Repository
           │         (Check 7 required files)
           │
           ├─── Step 2: Git Status Check
           │         (Auto-commit if needed)
           │
           ├─── Step 3: Install Dependencies
           │         (npm install)
           │
           ├─── Step 4: Deploy to Heroku
           │         (git push heroku main)
           │
           ├─── Step 5: Deploy to AWS EB
           │         (eb init → eb create)
           │
           ├─── Step 6: Configure Railway
           │         (GitHub integration)
           │
           ├─── Step 7: Setup MongoDB Atlas
           │         (Create cluster & user)
           │
           ├─── Step 8: Set Environment Vars
           │         (MONGODB_URI on each platform)
           │
           ├─── Step 9: Configure Frontend
           │         (Update REACT_APP_API_URL)
           │
           ├─── Step 10: Test Health Endpoints
           │         (curl /health on each)
           │
           └─── Step 11: Done! 🎉
                    (View monitoring)
```

---

## 🔧 Prerequisites

### Required
- ✅ Node.js 16+ installed
- ✅ Git installed
- ✅ GitHub account with code committed

### For Heroku Deployment
- ✅ Heroku account (free)
- ✅ Heroku CLI installed
- ✅ `npm install -g heroku`

### For AWS EB Deployment
- ✅ AWS account (free tier available)
- ✅ EB CLI installed
- ✅ `pip install awsebcli --user`
- ✅ AWS credentials configured
- ✅ `aws configure`

### For Railway Deployment
- ✅ Railway account (free)
- ✅ GitHub connected to Railway
- ✅ No additional CLI needed

### For MongoDB
- ✅ MongoDB Atlas account (free)
- ✅ Free tier cluster created
- ✅ Connection string ready

---

## 📝 Step-by-Step Deployment

### 1. Validate Repository

Your repository should have:
```
✅ package.json            (Node dependencies)
✅ Procfile               (Heroku process)
✅ Dockerfile             (Container definition)
✅ docker-compose.yml     (Local dev stack)
✅ .env.example           (Environment template)
✅ backend/server-enhanced.js    (Express backend)
✅ src/App.js             (React app)
```

### 2. Commit Code to GitHub

```bash
git add -A
git commit -m "Ready for deployment"
git push origin main
```

### 3. Deploy Backend (Choose one or all three)

#### Option A: Heroku (Easiest)
```bash
heroku login -i
heroku apps:create lifequest-api
git push heroku main
```

#### Option B: AWS EB
```bash
pip install awsebcli --user
aws configure  # Enter AWS credentials
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" lifequest-api
eb create lifequest-env --instance-type t3.micro
```

#### Option C: Railway (Fastest)
1. Go to https://railway.app
2. Connect your GitHub repo
3. Select this repository
4. Railway auto-deploys on git push

#### Option D: Docker Local
```bash
docker compose up --build
```

### 4. Set Up MongoDB

1. Go to https://cloud.mongodb.com
2. Create free cluster (Shared Tier)
3. Create database user (username: `lifequest`)
4. Configure network access (0.0.0.0/0)
5. Get connection string
6. Replace `<username>`, `<password>`, database name

Example:
```
mongodb+srv://lifequest:YourPassword@cluster0.abcd.mongodb.net/lifequest?retryWrites=true&w=majority
```

### 5. Set Environment Variables

For each deployed backend platform:

**Heroku:**
```bash
heroku config:set MONGODB_URI="your-connection-string"
```

**Railway:**
- Dashboard → Variables → Add `MONGODB_URI`

**AWS EB:**
```bash
eb setenv MONGODB_URI="your-connection-string"
eb deploy
```

### 6. Configure Frontend

Create `src/.env.local`:
```
REACT_APP_API_URL=https://your-backend-url
```

Then deploy:
```bash
npm run build
# Push to GitHub (Netlify auto-deploys)
```

### 7. Test Deployment

```bash
# Test backend health
curl https://your-backend-url/health

# Test leaderboard
curl https://your-backend-url/api/leaderboard

# Test save endpoint
curl -X POST https://your-backend-url/api/player/save \
  -H "X-Session-Id: test" \
  -H "Content-Type: application/json" \
  -d '{"level": 5, "xp": 1000}'
```

---

## 🧪 Testing

### Frontend Dev/Test UI

1. Start frontend: `npm start`
2. Go to http://localhost:3000
3. Click buttons in top-right (if dev UI enabled):
   - "Play Intro Cinematic"
   - "Save Game"
   - "Load Game"
   - "Submit Leaderboard"
   - "Unlock Achievement"
   - "Unlock Lore"

### Manual API Testing

```bash
# Health check
curl http://localhost:3001/health

# Get leaderboard
curl http://localhost:3001/api/leaderboard

# Save game state
curl -X POST http://localhost:3001/api/player/save \
  -H "X-Session-Id: my-session" \
  -H "Content-Type: application/json" \
  -d '{
    "level": 5,
    "xp": 1000,
    "achievements": ["first-level", "first-win"],
    "inventory": ["sword-basic", "shield-basic"]
  }'

# Load game state
curl -H "X-Session-Id: my-session" \
  http://localhost:3001/api/player/load

# Unlock achievement
curl -X POST http://localhost:3001/api/achievements/unlock \
  -H "X-Session-Id: my-session" \
  -H "Content-Type: application/json" \
  -d '{"achievementId": "first-level"}'

# Unlock lore
curl -X POST http://localhost:3001/api/lore/unlock \
  -H "X-Session-Id: my-session" \
  -H "Content-Type: application/json" \
  -d '{"loreId": "intro-world-lore"}'
```

---

## 📊 Monitoring & Maintenance

### Heroku
```bash
# View logs
heroku logs --tail --app=lifequest-api

# View environment
heroku config --app=lifequest-api

# Restart app
heroku ps:restart --app=lifequest-api

# Scale dynos
heroku ps:scale web=2 --app=lifequest-api
```

### AWS EB
```bash
# View status
eb status

# View logs
eb logs --all

# View health
eb health

# Update environment
eb setenv VAR_NAME=value
eb deploy

# View events
eb events -f
```

### Railway
- Open Dashboard → Select Service
- View "Deployments" for build logs
- View "Metrics" for performance
- View "Variables" for environment config

### MongoDB Atlas
- Open https://cloud.mongodb.com
- Check "Metrics" for database performance
- Check "Security" for audit logs
- Monitor connection count in dashboard

---

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Check logs
heroku logs --app=lifequest-api         # Heroku
eb logs --all                           # AWS EB
# Check Railway dashboard              # Railway

# Common issues:
# - Missing MONGODB_URI environment variable
# - Node version mismatch (need 16+)
# - Port already in use (should use $PORT from env)
```

### MongoDB Connection Error
```bash
# Verify connection string format:
# mongodb+srv://username:password@host/database?retryWrites=true&w=majority

# Common issues:
# - Wrong password
# - @ or : in password (must be URL-encoded)
# - Network access not configured (need 0.0.0.0/0)
# - Database name missing at end
```

### Frontend API Calls Fail
```bash
# Check .env.local has correct backend URL:
REACT_APP_API_URL=https://your-backend-url

# Rebuild frontend:
npm run build

# Check CORS is enabled (it should be in server-enhanced.js)

# Check frontend & backend are communicating:
# Open DevTools → Network tab → make API call → check response
```

### Heroku Git Push Fails
```bash
# Ensure Heroku remote is set:
git remote -v | grep heroku

# If not, add it:
heroku git:remote --app=lifequest-api

# Try pushing again:
git push heroku main
```

### AWS EB Deployment Stuck
```bash
# Check environment status:
eb status

# View events:
eb events -f

# Check logs:
eb logs --all

# If truly stuck, terminate and recreate:
eb terminate
eb create lifequest-env --instance-type t3.micro
```

---

## 🎯 Deployment Checklist

- [ ] Code committed to GitHub (`main` branch)
- [ ] All 7 required files present
- [ ] NPM dependencies installed (`npm install`)
- [ ] Heroku CLI installed and authenticated (`heroku login -i`)
- [ ] Heroku app created (`heroku apps:create lifequest-api`)
- [ ] Code pushed to Heroku (`git push heroku main`)
- [ ] MongoDB Atlas cluster created
- [ ] Database user created (username: lifequest)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] `MONGODB_URI` set on Heroku (`heroku config:set MONGODB_URI="..."`)
- [ ] Frontend `.env.local` created with `REACT_APP_API_URL`
- [ ] Frontend built (`npm run build`)
- [ ] Frontend deployed to Netlify
- [ ] Health endpoint tested (`curl https://your-url/health`)
- [ ] Dev/Test buttons work in frontend
- [ ] Save/Load works with MongoDB
- [ ] Leaderboard submits and persists

---

## 📈 Success Metrics

Once deployed, you should see:

1. **Backend Health** ✅
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-01T...",
     "version": "2.0.0",
     "database": "MongoDB",
     "uptime": 1234567
   }
   ```

2. **Database Persistence** ✅
   - Save game state → Database updated
   - Load game state → Data retrieved
   - Submit leaderboard → Persisted across requests

3. **Frontend Connection** ✅
   - API calls succeed without CORS errors
   - Dev/Test buttons show success messages
   - Console shows no 404 or connection errors

4. **Multi-Platform Redundancy** ✅
   - At least 2 backends deployed
   - All backends connect to same MongoDB
   - Failover between backends works

---

## 🚀 You're Live!

Once all checks pass:

```
🎉 Congratulations! LifeQuest is deployed! 🎉

Frontend:    https://lifequest.netlify.app
Backend 1:   https://lifequest-api.herokuapp.com
Backend 2:   https://your-service.up.railway.app
Backend 3:   http://your-eb-domain.elasticbeanstalk.com
Database:    MongoDB Atlas (cloud)
```

### Next Steps

1. **Monitor Performance**
   - Heroku: `heroku logs --tail`
   - Railway: Dashboard metrics
   - AWS EB: `eb health`
   - MongoDB: Atlas metrics

2. **Collect Feedback**
   - Add analytics tracking
   - Set up error logging (Sentry, LogRocket)
   - Monitor user behavior

3. **Scale as Needed**
   - Heroku: Upgrade dynos or add more
   - AWS EB: Increase instance type or auto-scaling
   - MongoDB: Upgrade from free tier to paid

4. **Continuous Updates**
   - Push code to GitHub
   - Railway auto-deploys
   - Heroku/EB manual deployment
   - Frontend Netlify auto-builds

---

## 📚 Additional Resources

- [Node.js Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Heroku Docs](https://devcenter.heroku.com/)
- [AWS EB Docs](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Railway Docs](https://docs.railway.app/)
- [React Docs](https://react.dev/)
- [Netlify Docs](https://docs.netlify.com/)

---

## 🆘 Getting Help

If you encounter issues:

1. **Check logs**
   - Backend logs (platform-specific)
   - Browser DevTools (frontend)
   - MongoDB Atlas audit logs

2. **Review documentation**
   - `DEPLOYMENT_CHECKLIST.md`
   - `README_DEPLOY.md`
   - `QUICKSTART_DEPLOY.md`

3. **Test locally first**
   - `npm start` (frontend)
   - `node backend/server-enhanced.js` (backend)
   - `docker compose up` (both with MongoDB)

4. **Verify prerequisites**
   - All required files present
   - Environment variables set
   - Network access configured
   - Git repository clean

---

**LifeQuest is production-ready. Deploy with confidence! 🚀**
