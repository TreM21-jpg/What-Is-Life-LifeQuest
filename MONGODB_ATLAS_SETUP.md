# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or GitHub
4. Verify your email address

### Step 2: Create a Free Cluster
1. After login, click "Create Deployment"
2. Choose **M0 (Free)** tier
3. Select your preferred cloud provider (AWS/Google Cloud/Azure) and region
4. Click "Create"
5. Wait 1-2 minutes for cluster to initialize

### Step 3: Create Database User
1. In Atlas dashboard, go to **Security → Database Access**
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Username: `lifequest`
5. Password: Create a strong password (save this!)
6. Set **Built-in Role**: `Atlas admin`
7. Click "Add User"

### Step 4: Allow Network Access
1. Go to **Security → Network Access**
2. Click "Add IP Address"
3. Choose **Allow access from anywhere** (for development) OR
4. Add your specific IP or Railway's IP ranges
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to **Databases** → Click "Connect" on your cluster
2. Choose **Drivers** option
3. Select **Node.js** driver (v4.1 or later)
4. Copy the connection string (looks like):
   ```
   mongodb+srv://lifequest:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you created
6. Replace `<database>` with `lifequest`

**Final connection string:**
```
mongodb+srv://lifequest:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lifequest?retryWrites=true&w=majority
```

---

## Add MongoDB URI to Railway

### Via Railway Web Dashboard
1. Go to your Railway project (https://railway.app/dashboard)
2. Select your app ("lifequest-api")
3. Click "Variables" tab
4. Click "Add Variable"
5. Key: `MONGODB_URI`
6. Value: `mongodb+srv://lifequest:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lifequest?retryWrites=true&w=majority`
7. Click "Save"
8. Railway automatically redeploys your app

### Verify Connection
After setting the URI, check the backend logs:
- Go to **Deployments** tab
- Click the latest deployment
- Logs should show: `"✅ Connected to MongoDB"`

---

## Test the Connection

### Local Testing
1. Create `.env` file in `backend/` directory:
   ```
   MONGODB_URI=mongodb+srv://lifequest:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lifequest?retryWrites=true&w=majority
   NODE_ENV=development
   ```

2. Start backend locally:
   ```bash
   node backend/server-enhanced.js
   ```

3. Should log:
   ```
   ✅ Connected to MongoDB
   Connected to MongoDB at ...
   Server running on port 3001
   ```

### Check Health Endpoint
```bash
curl https://YOUR_RAILWAY_URL/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "MongoDB",
  "uptime": 123456,
  "timestamp": "2025-12-07T..."
}
```

---

## Database Collections

The backend automatically creates these collections:

| Collection | Purpose |
|-----------|---------|
| `game_saves` | Player save files |
| `save_slots` | Save slot management |
| `leaderboard` | High scores/rankings |
| `players` | Player profiles |
| `achievements` | Unlocked achievements |
| `lore_unlocks` | Discovered lore entries |
| `daily_completions` | Daily challenge progress |
| `playerFeedback` | Bug reports & suggestions |
| `gameUpdates` | Patch notes history |

---

## Pricing & Limits

**Free Tier (M0):**
- ✅ 512 MB storage
- ✅ Serverless instances
- ✅ Perfect for development/testing
- ⚠️ Shared resources

**When to Upgrade:**
- Game reaches 1000+ concurrent players
- Data size exceeds 512 MB
- Need guaranteed performance (M2+)

---

## Troubleshooting

### Connection String Not Working
- **Error**: `authentication failed`
  - Check password is URL-encoded (use special character handling)
  - Verify IP is whitelisted in Network Access

- **Error**: `connect ECONNREFUSED`
  - Check internet connection
  - Verify cluster is in "Running" state in Atlas

### No Data Persisting
- Check `MONGODB_URI` is set in Railway variables
- Verify backend logs show "Connected to MongoDB"
- Check database user has proper permissions

### Performance Issues
- Check collection indexes are created (backend does this automatically)
- Consider upgrading from M0 to M2 if volume increases
- Enable compression in connection string (already in template)

---

## Security Best Practices

✅ **Do This:**
- Keep password private (never commit .env files)
- Use strong passwords (12+ characters, mixed case, numbers, symbols)
- Restrict network access when possible (don't use 0.0.0.0/0 in production)
- Regularly rotate database user passwords
- Enable MongoDB SCRAM authentication (default)

❌ **Don't Do This:**
- Commit MongoDB URI to public repos
- Share password in chat/email
- Use simple passwords
- Allow access from 0.0.0.0/0 in production

---

## Next Steps

1. **Create cluster** (follow steps 1-4 above)
2. **Get connection string** (step 5)
3. **Add to Railway** (in this guide)
4. **Test health endpoint** (in this guide)
5. **Play the game!** Backend now persists all player data

---

## Support

If you get stuck:
- Check MongoDB Atlas status: https://status.mongodb.com/
- Review backend logs in Railway dashboard
- Check `backend/server-enhanced.js` for connection logic
- Verify credentials in `MONGODB_URI` are URL-encoded

