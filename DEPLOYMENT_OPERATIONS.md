# LifeQuest Deployment & Operations Guide

## 🎮 Overview
LifeQuest is a full-stack browser game with persistent backend storage. This guide covers the deployed infrastructure, testing, and operations.

---

## 📊 Architecture

### Frontend
- **Type**: React SPA (Single Page App)
- **Location**: `src/` directory
- **Deployment**: Local dev (`npm start` on localhost:3000 or 3001)
- **Configuration**: `.env.local` sets `REACT_APP_API_URL=https://lifequest.fly.dev`

### Backend
- **Type**: Node.js + Express API
- **Location**: `backend/` directory
- **Deployment**: Fly.io at **https://lifequest.fly.dev**
- **Database**: MongoDB Atlas (Production)
- **Entry Point**: `backend/server-with-db.js`
- **Port**: 3001 (internally); 443 (externally via Fly.io)

### Database
- **Type**: MongoDB (NoSQL)
- **Provider**: MongoDB Atlas (Cloud)
- **Connection**: `MONGODB_URI` set as Fly.io secret
- **Collections**: `users`, `gamesaves`, `leaderboardentries`, `achievements`

---

## 🚀 Deployment

### Backend (Fly.io)

**App Name**: `lifequest`
**URL**: https://lifequest.fly.dev
**Region**: IAD (Ashburn, Virginia, US)

**Environment Variables (Secrets)**:
```
MONGODB_URI=mongodb+srv://lifequest:NayNay_21@lifequest-prod.lx3iqqr.mongodb.net/?appName=lifequest-prod
JWT_SECRET=<generated 96-char secret>
PORT=3001
NODE_ENV=production
```

**Deploy Command**:
```bash
cd backend
git add -A
git commit -m "description"
git push origin main
flyctl deploy --app lifequest
```

**Health Checks**:
- `GET /health` → 200 with `{"status":"OK",...}`
- `GET /ready` → 200 with `{"ready":true,"databaseState":1}` when DB connected; 503 when connecting

---

## 🧪 Testing

### E2E Tests (Automated)

**Local Run**:
```bash
cd backend
npm install
MONGODB_URI=mongodb+srv://... node e2e_test.js
```

**Results**: Saved to `backend/e2e_results_<timestamp>.json`

**GitHub Actions**:
- Workflow: `.github/workflows/e2e.yml`
- Trigger: On push to `main`
- Tests: Register, login, profile, save/load, leaderboard, achievements
- Cleanup: Removes test users automatically
- Results: Uploaded as GitHub artifact (30-day retention)

**Manual Testing**:
1. Open `http://localhost:3000` (or 3001 if 3000 taken)
2. Register new account
3. Log in
4. Navigate game and save
5. Reload page and verify save persists

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/verify
```

### Player Profile
```
GET    /api/player/profile          (requires auth)
PUT    /api/player/profile          (requires auth)
POST   /api/player/save             (requires auth)
GET    /api/player/load             (requires auth)
GET    /api/player/saves            (requires auth)
```

### Leaderboard
```
GET    /api/leaderboard
POST   /api/leaderboard/submit      (requires auth)
```

### Achievements
```
GET    /api/achievements
POST   /api/achievements/unlock     (requires auth)
GET    /api/achievements/user       (requires auth)
```

### Health
```
GET    /health                      (liveness)
GET    /ready                       (readiness: checks MongoDB)
```

---

## 🔐 Security

- **Auth**: JWT tokens (signed with `JWT_SECRET`)
- **Password**: Bcryptjs hashing (10 rounds)
- **CORS**: Enabled for all origins (`*`)
- **Secrets**: All sensitive values stored as Fly.io secrets (not in code)
- **Token Storage**: Frontend stores in `localStorage` under `AUTH_TOKEN_KEY`

---

## 📈 Monitoring & Logs

**Fly.io Logs**:
```bash
$env:Path += ";$env:USERPROFILE\.fly\bin"
flyctl logs --app lifequest
```

**Dashboard**: https://fly.io/apps/lifequest/monitoring

**Metrics to Watch**:
- Request latency (p50, p99)
- Error rate (4xx, 5xx)
- MongoDB connection state
- Machine restart count

---

## 🛠️ Troubleshooting

### White Screen / App Won't Load
- Check browser console for errors (`F12`)
- Verify `.env.local` has `REACT_APP_API_URL=https://lifequest.fly.dev`
- Check network tab to see if API calls succeed (expect 200 status)
- Verify API is up: `curl https://lifequest.fly.dev/health`

### MongoDB Connection Timeout
- Logs show: `MongoDB connection pending... will retry`
- Check Atlas dashboard for IP whitelist (should allow Fly.io IPs)
- Verify `MONGODB_URI` secret on Fly.io with: `flyctl secrets list --app lifequest`
- Restart the app: `flyctl restart --app lifequest`

### 401 Unauthorized (Auth Error)
- Token may be expired or invalid
- Check `JWT_SECRET` is the same in Fly.io secrets and DB connection
- Clear browser localStorage and re-login

### Leaderboard Not Updating
- Ensure `POST /api/leaderboard/submit` is called after game save
- Check MongoDB `leaderboardentries` collection has entries
- Verify `GET /api/leaderboard` returns results

---

## 📦 File Structure

```
LifeQuest/
├── src/                          # React frontend
│   ├── components/               # UI components
│   ├── services/                 # API client (BackendAPI.js)
│   └── .env.local                # Frontend config (REACT_APP_API_URL)
├── backend/                      # Node.js API
│   ├── server-with-db.js         # Main entry point
│   ├── auth.js                   # Auth logic
│   ├── database.js               # MongoDB models & functions
│   ├── gameRoutes.js             # Game endpoints
│   ├── e2e_test.js               # E2E test script
│   ├── delete_user.js            # Delete user utility
│   ├── package.json
│   ├── .env                      # Backend config (local dev only)
│   └── fly.toml                  # Fly.io config
├── .github/
│   └── workflows/
│       └── e2e.yml               # GitHub Actions E2E workflow
└── .env.local                    # Frontend env override

```

---

## 🚨 Incident Response

**API Down**:
1. Check Fly.io dashboard: https://fly.io/apps/lifequest
2. View logs: `flyctl logs --app lifequest`
3. Restart machines: `flyctl restart --app lifequest`
4. Check MongoDB Atlas connection status

**High Error Rate**:
1. Check MongoDB Atlas metrics and connections
2. Review recent code changes (last deploy)
3. Rollback if needed: `flyctl releases --app lifequest` and `flyctl rollback --app lifequest`

**User Data Loss**:
- MongoDB Atlas has automatic backups (check Backup section in Atlas dashboard)
- Request restore from snapshot if needed

---

## 📋 Maintenance Checklist

- [ ] Weekly: Review error logs in Fly.io dashboard
- [ ] Monthly: Check MongoDB Atlas backup status
- [ ] Monthly: Rotate `JWT_SECRET` (requires re-login for all users)
- [ ] Quarterly: Review and audit authentication logs
- [ ] As needed: Run E2E tests locally before deploying

---

## 🔗 Links

- **Frontend**: http://localhost:3000 (local dev)
- **Backend**: https://lifequest.fly.dev (production)
- **Database**: https://cloud.mongodb.com (Atlas dashboard)
- **Hosting**: https://fly.io/apps/lifequest (Fly.io dashboard)
- **Git**: https://github.com/TreM21-jpg/What-Is-Life-LifeQuest
- **GitHub Actions**: https://github.com/TreM21-jpg/What-Is-Life-LifeQuest/actions

---

## ✅ Quick Reference

**Check Health**:
```bash
curl https://lifequest.fly.dev/health
curl https://lifequest.fly.dev/ready
```

**Deploy**:
```bash
cd backend && git add -A && git commit -m "msg" && git push && flyctl deploy --app lifequest
```

**View Logs**:
```bash
flyctl logs --app lifequest --no-tail
```

**Run Local Dev**:
```bash
npm start          # frontend on localhost:3000 or 3001
# In another terminal:
cd backend && npm start  # backend on localhost:3001
```

---

**Last Updated**: 2026-01-09
**Status**: ✅ Live & Tested
