/**
 * BACKEND_SETUP_GUIDE.md
 * 
 * Complete guide for setting up LifeQuest backend integration
 * Covers development, testing, and production deployment
 */

# LifeQuest Backend Integration Setup Guide

## Quick Start (Development)

### 1. Local Backend Setup

```bash
# Clone/navigate to backend directory
cd backend

# Install dependencies
npm install express cors dotenv

# Create .env file
echo "PORT=3001" > .env
echo "NODE_ENV=development" >> .env

# Start server
node server-starter.js
```

Server will run on `http://localhost:3001`

### 2. Connect Frontend to Backend

In `.env.local`:
```env
REACT_APP_API_URL=http://localhost:3001
```

Or set in frontend code (BackendAPI.js already defaults to localhost:3001)

### 3. Test Backend API

```bash
# Health check
curl http://localhost:3001/health

# Get leaderboard
curl http://localhost:3001/api/leaderboard

# Get achievements
curl http://localhost:3001/api/achievements
```

## Frontend Integration Points

### In App.js or OverlayManager.jsx

```javascript
import { backendAPI } from "./services/BackendAPI.js";

// Auto-save on phase change
useEffect(() => {
  const gameData = {
    xp: overlays.stats.xp,
    level: 1,
    inventory: overlays.items,
    questsCompleted: overlays.stats.questsCompleted,
    achievements: overlays.achievements
  };
  
  backendAPI.saveGameState(gameData);
}, [overlays]);

// Load player profile on startup
useEffect(() => {
  backendAPI.getPlayerProfile().then(profile => {
    console.log("Player Profile:", profile);
  });
}, []);
```

### In SaveManager.jsx

```javascript
// Create save slot
await backendAPI.createSaveSlot({
  name: "My Save",
  xp: 5000,
  level: 10,
  region: "Forest"
});

// Load save
const save = await backendAPI.loadSaveSlot(slotId);
```

### In Leaderboard Component

```javascript
// Get global leaderboard
const entries = await backendAPI.getLeaderboard({
  limit: 50,
  period: "allTime",
  sortBy: "xp"
});

// Get player rank
const rank = await backendAPI.getPlayerRank("xp");
```

## Production Deployment

### Option 1: Heroku (Recommended for Quick Setup)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create lifequest-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3001

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

Your API will be at: `https://lifequest-api.herokuapp.com`

Update frontend:
```env
REACT_APP_API_URL=https://lifequest-api.herokuapp.com
```

### Option 2: Railway.app (Modern Alternative)

1. Connect GitHub repo to Railway
2. Create Node.js service
3. Set PORT=3001 in environment
4. Auto-deploy on push

Your API will be at: `https://<project>.railway.app`

### Option 3: AWS Lambda + API Gateway

```bash
# Install Serverless Framework
npm install -g serverless

# Create function
serverless create --template aws-nodejs --path lifequest-api

# Deploy
serverless deploy
```

### Option 4: Render.com

1. Connect GitHub repo
2. Create Web Service
3. Set build command: `npm install`
4. Set start command: `node server-starter.js`
5. Render handles deployment

## Database Integration (Production)

### Replace In-Memory with MongoDB

```javascript
// Install MongoDB driver
npm install mongodb

// In server-starter.js
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const db = mongoClient.db("lifequest");

// Replace playerSaves Map with:
const savesCollection = db.collection("game_saves");

// Create save:
app.post("/api/player/save", async (req, res) => {
  const gameData = req.body;
  const sessionId = req.headers["x-session-id"];
  
  await savesCollection.updateOne(
    { sessionId },
    { $set: { ...gameData, savedAt: new Date() } },
    { upsert: true }
  );
  
  res.json({ success: true, message: "Game state saved" });
});

// Load save:
app.get("/api/player/load", async (req, res) => {
  const sessionId = req.headers["x-session-id"];
  const gameData = await savesCollection.findOne({ sessionId });
  
  if (!gameData) {
    return res.status(404).json({ message: "No save found" });
  }
  
  res.json(gameData);
});
```

### MongoDB Atlas Setup

1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/lifequest?retryWrites=true`
4. Add to .env: `MONGODB_URI=mongodb+srv://...`

## API Endpoints Reference

### Player
- `GET /api/player/profile` - Get player profile
- `POST /api/player/save` - Save game state
- `GET /api/player/load` - Load game state

### Saves
- `GET /api/saves/slots` - List save slots
- `POST /api/saves/create` - Create save slot
- `GET /api/saves/:slotId` - Load specific save
- `DELETE /api/saves/:slotId` - Delete save

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard entries
- `GET /api/leaderboard/rank` - Get player rank
- `POST /api/leaderboard/submit` - Submit score

### Achievements
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements/:id/unlock` - Unlock achievement
- `POST /api/achievements/check` - Check if unlocked

### Lore
- `GET /api/lore` - Get lore entries
- `POST /api/lore/:id/unlock` - Unlock lore

### Dailies
- `GET /api/dailies/challenge` - Get daily challenge
- `POST /api/dailies/:id/complete` - Complete daily

### Streaks
- `GET /api/streaks/current` - Get streak data
- `POST /api/streaks/update` - Update streak

### Auth
- `POST /api/auth/google` - Authenticate with Google
- `POST /api/auth/logout` - Logout

## Client-Side Integration

### Auto-Save Setup

```javascript
// In OverlayManager.jsx
useEffect(() => {
  const autoSaveInterval = setInterval(() => {
    const gameData = {
      xp: overlays.stats.xp,
      inventory: overlays.items,
      questsCompleted: overlays.stats.questsCompleted,
      achievements: overlays.achievements
    };
    
    backendAPI.saveGameState(gameData)
      .catch(error => console.warn("Auto-save failed:", error));
  }, 60000); // Every 60 seconds
  
  return () => clearInterval(autoSaveInterval);
}, [overlays]);
```

### Offline Support

BackendAPI.js automatically:
- Detects online/offline status
- Falls back to localStorage
- Queues changes for sync when online
- Handles network errors gracefully

### Session Management

Each anonymous player gets unique `sessionId`:
```javascript
const sessionId = localStorage.getItem("lifequest_session_id");
// Sent with every request via X-Session-ID header
```

Optional Google OAuth for persistent profiles:
```javascript
const token = await googleAuth.getIdToken();
await backendAPI.authenticateGoogle(token);
```

## Testing

### Test Auto-Save
1. Open game and change player XP
2. Check Chrome DevTools → Network
3. Look for POST `/api/player/save` requests

### Test Offline Sync
1. Open game
2. DevTools → Network → Offline
3. Make changes
4. Turn network back online
5. Changes auto-sync

### Test Leaderboard
```javascript
// In browser console
(async () => {
  const leaderboard = await backendAPI.getLeaderboard();
  console.log("Leaderboard:", leaderboard);
})();
```

## Troubleshooting

### CORS Errors
Backend has CORS enabled. If issues:
```javascript
// In server-starter.js
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
```

### Auth Errors
Check X-Session-ID header is sent:
```javascript
// BackendAPI.js does this automatically
const headers = {
  "X-Session-ID": this.sessionId,
  ...options.headers
};
```

### Save Not Syncing
Check browser console for errors:
```javascript
backendAPI.saveGameState(data)
  .catch(error => console.error("Save failed:", error));
```

## Environment Variables

### Development (.env)
```
PORT=3001
NODE_ENV=development
```

### Production (.env or Heroku config)
```
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
JWT_SECRET=your_secret_key
```

### Frontend (.env.local)
```
REACT_APP_API_URL=https://lifequest-api.herokuapp.com
REACT_APP_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

## Next Steps

1. **Deploy Backend** → Choose Heroku, Railway, or AWS
2. **Update API URL** → Set REACT_APP_API_URL in frontend
3. **Test Integration** → Use browser DevTools to verify API calls
4. **Add Database** → Replace in-memory with MongoDB
5. **Enable Auth** → Implement Google OAuth
6. **Monitor** → Set up error logging (Sentry, LogRocket)
7. **Scale** → Add caching, CDN, database indexing as needed

## Support & Resources

- Express.js Docs: https://expressjs.com
- Heroku Deployment: https://devcenter.heroku.com
- MongoDB Atlas: https://docs.atlas.mongodb.com
- CORS: https://enable-cors.org
- REST API Design: https://restfulapi.net
