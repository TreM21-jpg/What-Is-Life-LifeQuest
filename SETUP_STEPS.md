# MongoDB Atlas + Heroku/Railway/AWS Setup Guide

## Step 1: Create MongoDB Atlas Free Cluster

Go to https://cloud.mongodb.com and:

1. Sign up or log in
2. Click "Create" → "Build a Database"
3. Select "Shared" (Free tier)
4. Choose AWS provider
5. Pick your closest region
6. Click "Create Cluster" (wait 3-5 minutes)

## Step 2: Create Database User

1. Go to "Database Access" → "Add New Database User"
2. Username: `lifequest`
3. Password: Generate secure password (save this!)
4. Role: "Atlas admin"
5. Click "Add User"

## Step 3: Configure Network Access

1. Go to "Network Access" → "Add IP Address"
2. IP: `0.0.0.0/0` (allow all)
3. Click "Confirm"

## Step 4: Get Connection String

1. Go to "Clusters" → "Connect"
2. Select "Connect your application"
3. Copy the connection string

## Step 5: Build Your MongoDB URI

Replace in the connection string:
- `<username>` → `lifequest`
- `<password>` → your actual password
- `myFirstDatabase` → `lifequest`

Example:
```
mongodb+srv://lifequest:YourPassword123@cluster0.abc.mongodb.net/lifequest?retryWrites=true&w=majority
```

## Step 6: Set MongoDB URI on Deployment Platforms

Once you have your URI, run these commands:

### Heroku
```powershell
heroku config:set MONGODB_URI="mongodb+srv://lifequest:password@cluster.mongodb.net/lifequest?retryWrites=true&w=majority" --app=lifequest-api
```

### Railway
1. Go to Railway Dashboard
2. Select your service
3. Go to "Variables"
4. Add: `MONGODB_URI` = `your_connection_string`
5. Service auto-restarts

### AWS EB
```bash
eb setenv MONGODB_URI="mongodb+srv://lifequest:password@cluster.mongodb.net/lifequest?retryWrites=true&w=majority"
eb deploy
```

---

**Next Steps:**
1. Complete MongoDB Atlas setup (5-10 minutes)
2. Get your connection string
3. Set it on each platform
4. Test with health endpoints

