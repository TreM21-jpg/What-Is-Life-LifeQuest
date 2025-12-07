# LifeQuest Complete Deployment Checklist

## 📋 Pre-Deployment Verification

### Repository Status
- [ ] All code committed to `main` branch
  ```bash
  git status  # Should show: On branch main, nothing to commit
  ```
- [ ] No uncommitted changes
  ```bash
  git log --oneline -5  # View recent commits
  ```
- [ ] Remote is set to GitHub
  ```bash
  git remote -v  # Should show origin pointing to GitHub repo
  ```

### Required Files Present
- [ ] `package.json` (Node dependencies)
- [ ] `Procfile` (Heroku process)
- [ ] `Dockerfile` (Container image)
- [ ] `docker-compose.yml` (Local dev)
- [ ] `.env.example` (Environment template)
- [ ] `backend/server-enhanced.js` (Express backend)
- [ ] `src/App.js` (React app with dev UI)
- [ ] `DEPLOYMENT_DASHBOARD.html` (Interactive guide)
- [ ] Deployment scripts (`DEPLOY_*.ps1`, `DEPLOY_*.sh`, `DEPLOY_ALL.js`)

### NPM Dependencies
- [ ] Express installed (`npm list express`)
- [ ] CORS installed (`npm list cors`)
- [ ] MongoDB driver installed (`npm list mongodb`)
- [ ] Dotenv installed (`npm list dotenv`)

---

## 🚀 Deployment Steps

### 1. Heroku Deployment

#### Prerequisites
- [ ] Heroku account created (https://heroku.com)
- [ ] Heroku CLI installed
  ```bash
  npm install -g heroku
  ```
- [ ] Authenticated with Heroku
  ```bash
  heroku login -i
  ```

#### Deployment
- [ ] Create app (or use existing)
  ```bash
  heroku apps:create lifequest-api
  ```
  *Note: If name is taken, Heroku will suggest alternative*

- [ ] Push code to Heroku
  ```bash
  git push heroku main
  ```

- [ ] Verify deployment
  ```bash
  heroku logs --tail --app=lifequest-api
  ```
  *Should show: "🚀 LifeQuest Backend Server running on port 3001"*

- [ ] Get app URL
  ```bash
  heroku apps:info lifequest-api
  ```
  *Save the Dyno formation URL (e.g., https://lifequest-api.herokuapp.com)*

- [ ] Test health endpoint
  ```bash
  curl https://lifequest-api.herokuapp.com/health
  ```
  *Should return: `{ "status": "ok", "database": "In-Memory", ... }`*

### 2. Railway Deployment

#### Prerequisites
- [ ] Railway account created (https://railway.app)
- [ ] GitHub account connected to Railway

#### Deployment
- [ ] Create new project on Railway
  - [ ] Select "Deploy from GitHub repo"
  - [ ] Authorize Railway for GitHub
  - [ ] Select: `TreM21-jpg/What-Is-Life-LifeQuest`
  - [ ] Choose `main` branch

- [ ] Railway auto-deploys
  - [ ] Wait for deployment to complete (~5 min)
  - [ ] Check deployment logs in dashboard

- [ ] Get deployment URL
  - [ ] Find in Railway dashboard under "Deployments"
  - [ ] Save the URL (e.g., https://your-service.up.railway.app)

- [ ] Test health endpoint
  ```bash
  curl https://your-service.up.railway.app/health
  ```

### 3. AWS Elastic Beanstalk Deployment

#### Prerequisites
- [ ] AWS account created (https://aws.amazon.com)
- [ ] AWS CLI installed
  ```bash
  pip install awscli --user
  ```
- [ ] EB CLI installed
  ```bash
  pip install awsebcli --user
  ```
- [ ] AWS credentials configured
  ```bash
  aws configure
  # Enter: Access Key ID, Secret Access Key, region (us-east-1), output format (json)
  ```

#### Deployment
- [ ] Initialize Elastic Beanstalk
  ```bash
  eb init -p "Node.js 18 running on 64bit Amazon Linux 2" lifequest-api --region us-east-1
  ```

- [ ] Create environment
  ```bash
  eb create lifequest-env --instance-type t3.micro
  ```
  *Takes 3-5 minutes to create EC2 instance*

- [ ] Verify deployment
  ```bash
  eb status
  ```
  *Should show: Environment is ready*

- [ ] Get environment URL
  ```bash
  eb open --print-url
  ```
  *Save the URL (e.g., http://lifequest-env.elasticbeanstalk.com)*

- [ ] Test health endpoint
  ```bash
  curl http://your-eb-url/health
  ```

### 4. MongoDB Atlas Setup

#### Prerequisites
- [ ] MongoDB Atlas account created (https://cloud.mongodb.com)

#### Steps
- [ ] Create Free Cluster
  - [ ] Click "Create" → "Build a Database"
  - [ ] Select "Shared Tier" (Free)
  - [ ] Choose AWS as provider
  - [ ] Select closest region
  - [ ] Click "Create Cluster"
  - [ ] Wait 3-5 minutes for provisioning

- [ ] Create Database User
  - [ ] Go to "Database Access" → "Add New Database User"
  - [ ] Username: `lifequest`
  - [ ] Generate secure password (or create one)
  - [ ] Role: "Atlas admin"
  - [ ] Save password securely

- [ ] Configure Network Access
  - [ ] Go to "Network Access" → "Add IP Address"
  - [ ] IP: `0.0.0.0/0` (or restrict to your app IPs)
  - [ ] Click "Confirm"

- [ ] Get Connection String
  - [ ] Click your cluster → "Connect"
  - [ ] Select "Connect your application"
  - [ ] Copy connection string
  - [ ] Replace `<username>` with `lifequest`
  - [ ] Replace `<password>` with your password
  - [ ] Replace `myFirstDatabase` with `lifequest`
  - [ ] Save the full connection string

#### Set MONGODB_URI on Each Platform

- [ ] Heroku
  ```bash
  heroku config:set MONGODB_URI="mongodb+srv://lifequest:PASSWORD@cluster.mongodb.net/lifequest?retryWrites=true&w=majority" --app=lifequest-api
  ```

- [ ] Railway
  - [ ] Go to Railway Dashboard
  - [ ] Select your service
  - [ ] Go to "Variables"
  - [ ] Add new variable: `MONGODB_URI`
  - [ ] Paste connection string
  - [ ] Service auto-restarts

- [ ] AWS EB
  ```bash
  eb setenv MONGODB_URI="mongodb+srv://lifequest:PASSWORD@cluster.mongodb.net/lifequest?retryWrites=true&w=majority"
  eb deploy
  ```

#### Verify MongoDB Connection
- [ ] Test each backend health endpoint
  ```bash
  curl https://lifequest-api.herokuapp.com/health
  curl https://your-service.up.railway.app/health
  curl http://your-eb-domain/health
  ```
  *All should show: `"database": "MongoDB"`*

### 5. Frontend Configuration

- [ ] Create `.env.local` in React project root
  ```
  REACT_APP_API_URL=https://lifequest-api.herokuapp.com
  ```
  *(Use your actual backend URL)*

- [ ] Rebuild frontend
  ```bash
  npm run build
  ```

- [ ] Test locally
  ```bash
  npm start
  # Open http://localhost:3000
  # Click Dev/Test buttons to verify API calls
  ```

- [ ] Deploy to Netlify
  - [ ] Push to GitHub
  - [ ] Netlify auto-deploys (if already connected)
  - [ ] Verify deployment at your Netlify URL

### 6. End-to-End Testing

#### Local Testing (if backend still running)
- [ ] Health endpoint works
  ```bash
  curl http://localhost:3001/health
  ```

- [ ] Leaderboard endpoint works
  ```bash
  curl http://localhost:3001/api/leaderboard
  ```

- [ ] Save/load works
  ```bash
  curl -X POST http://localhost:3001/api/player/save \
    -H "X-Session-Id: test-session" \
    -H "Content-Type: application/json" \
    -d '{"level": 5, "xp": 1000}'
  ```

#### Dev/Test UI Testing (Frontend)
- [ ] Click "Play Intro Cinematic" → cinematic plays
- [ ] Click "Save Game" → response in console
- [ ] Click "Load Game" → retrieves saved data
- [ ] Click "Submit Leaderboard" → updates ranking
- [ ] Click "Unlock Achievement" → achievement added
- [ ] Click "Unlock Lore" → lore entry unlocked

#### Cross-Platform Testing
- [ ] Heroku backend responds to all requests
- [ ] Railway backend responds to all requests
- [ ] AWS EB backend responds to all requests
- [ ] All three backends return "database": "MongoDB"
- [ ] Player data persists across requests (if MongoDB configured)

---

## 📊 Monitoring & Maintenance

### Heroku
- [ ] Monitor logs
  ```bash
  heroku logs --tail --app=lifequest-api
  ```

- [ ] View environment variables
  ```bash
  heroku config --app=lifequest-api
  ```

- [ ] Restart app (if needed)
  ```bash
  heroku ps:restart --app=lifequest-api
  ```

### Railway
- [ ] Check logs in Railway dashboard
- [ ] Monitor metrics (CPU, memory, request count)
- [ ] View environment variables in project settings

### AWS EB
- [ ] View logs
  ```bash
  eb logs --all
  ```

- [ ] Check environment health
  ```bash
  eb health
  ```

- [ ] View events
  ```bash
  eb events -f
  ```

### MongoDB Atlas
- [ ] Monitor Atlas dashboard
  - [ ] Check database size
  - [ ] View active connections
  - [ ] Review security audit logs

- [ ] Test connection periodically
  ```bash
  curl https://your-backend/health
  ```

---

## ✅ Success Criteria

All of the following should be true:

1. ✅ Code is committed to GitHub
2. ✅ Three backends deployed (Heroku, Railway, AWS EB)
3. ✅ MongoDB Atlas cluster created and connected
4. ✅ All three backends return `"database": "MongoDB"`
5. ✅ Frontend `.env.local` points to one backend
6. ✅ Dev/Test buttons work for all endpoints
7. ✅ Player data persists (save/load works)
8. ✅ Leaderboard updates on submit
9. ✅ Achievements unlock properly
10. ✅ Lore entries unlock and display

---

## 🆘 Troubleshooting

### "Connection refused" error
- [ ] Verify backend URL is correct in `.env.local`
- [ ] Check that backend is running
- [ ] For Heroku: Run `heroku ps --app=lifequest-api` (should show running dyno)
- [ ] For Railway: Check deployment status in dashboard
- [ ] For AWS EB: Run `eb status` (should show "Ready")

### "MongoDB error" or in-memory fallback
- [ ] Verify `MONGODB_URI` is set on platform
- [ ] Check connection string format (must include password)
- [ ] Verify MongoDB Atlas network access includes your app's IP
- [ ] Test connection string locally: `mongo "<your_connection_string>"`

### "Heroku build failed"
- [ ] Check `heroku logs --app=lifequest-api` for errors
- [ ] Verify all npm dependencies are in `package.json`
- [ ] Ensure `Procfile` is correct
- [ ] Try deploying again: `git push heroku main`

### "AWS EB deployment stuck"
- [ ] Run `eb status` to check environment
- [ ] Run `eb events -f` to see what's happening
- [ ] Check `eb logs --all` for error messages
- [ ] If stuck, terminate and recreate: `eb terminate && eb create`

### "Railway deployment not triggering"
- [ ] Verify GitHub is connected to Railway
- [ ] Check that `main` branch is selected
- [ ] Push a new commit to main: `git commit --allow-empty && git push`
- [ ] Check Railway dashboard for deployment status

---

## 📞 Quick Reference Commands

```bash
# Git
git status
git log --oneline -5
git push

# Heroku
heroku login -i
heroku apps:create lifequest-api
git push heroku main
heroku logs --tail --app=lifequest-api
heroku config:set MONGODB_URI="..." --app=lifequest-api

# AWS EB
eb init
eb create lifequest-env --instance-type t3.micro
eb status
eb deploy
eb logs --all
eb setenv MONGODB_URI="..."

# Local Testing
npm start  # Frontend
node backend/server-enhanced.js  # Backend
docker compose up --build  # Both with MongoDB

# Health Checks
curl http://localhost:3001/health
curl https://lifequest-api.herokuapp.com/health
curl https://your-railway-url/health
curl http://your-eb-url/health

# Frontend
npm run build
npm start
```

---

## 🎉 When Complete

Once all checkmarks are checked:
1. You have 3 production backends running
2. All persist data to MongoDB
3. Frontend is deployed to Netlify
4. Game is live and playable
5. All systems are monitored

**Congratulations! LifeQuest is live! 🚀**
