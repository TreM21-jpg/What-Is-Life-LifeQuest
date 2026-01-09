/**
 * server-with-db.js
 * 
 * Enhanced LifeQuest Backend API with MongoDB and Authentication
 * Run this once you have MongoDB set up (local or Atlas)
 * 
 * SETUP:
 * 1. npm install express cors dotenv bcryptjs jsonwebtoken mongoose
 * 2. Create .env file with:
 *    PORT=3001
 *    NODE_ENV=development
 *    JWT_SECRET=your-secret-key
 *    MONGODB_URI=mongodb://localhost:27017/lifequest
 * 3. npm start (this file) or node server-with-db.js
 * 
 * For MongoDB Atlas:
 * MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifequest?retryWrites=true&w=majority
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./auth.js");
const db = require("./database.js");
const gameRoutes = require("./gameRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Initialize database connection
 */
db.connectDB().then(() => {
  console.log('Database ready for requests');
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

/**
 * ============================================
 * AUTHENTICATION ENDPOINTS
 * ============================================
 */

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { username, email, password }
 */
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await auth.registerUser(username, email, password);

  if (result.success) {
    return res.status(201).json(result);
  }

  return res.status(400).json(result);
});

/**
 * POST /api/auth/login
 * Login user
 * Body: { username, password }
 */
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await auth.loginUser(username, password);

  if (result.success) {
    return res.status(200).json(result);
  }

  return res.status(401).json(result);
});

/**
 * POST /api/auth/verify
 * Verify token validity
 * Header: Authorization: Bearer <token>
 */
app.post("/api/auth/verify", (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false, error: 'No token provided' });
  }

  const decoded = auth.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ valid: false, error: 'Invalid token' });
  }

  res.json({ valid: true, user: decoded });
});

/**
 * ============================================
 * PLAYER PROFILE ENDPOINTS
 * ============================================
 */

/**
 * GET /api/player/profile
 * Get current player profile
 * Requires authentication
 */
app.get("/api/player/profile", auth.authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const user = await auth.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    success: true,
    user: user
  });
});

/**
 * PUT /api/player/profile
 * Update player profile
 * Requires authentication
 * Body: { level, xp, playtime, region, achievements, inventory, stats }
 */
app.put("/api/player/profile", auth.authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const updates = req.body;

  const success = await auth.updateUserProfile(userId, updates);

  if (!success) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = await auth.getUserById(userId);
  res.json({
    success: true,
    user: user
  });
});

/**
 * ============================================
 * GAME STATE ENDPOINTS
 * ============================================
 */

/**
 * POST /api/player/save
 * Save game state
 * Requires authentication
 * Body: { xp, level, inventory, region, questsCompleted, achievements, stats, playtime }
 */
app.post("/api/player/save", auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const username = req.user.username;
    const gameData = req.body;

    const save = await db.saveGameState(userId, username, gameData);

    console.log(`Game state saved for ${username}`);

    res.json({
      success: true,
      message: "Game state saved",
      savedAt: save.savedAt
    });
  } catch (error) {
    console.error('Error saving game state:', error);
    res.status(500).json({ error: 'Failed to save game state' });
  }
});

/**
 * GET /api/player/load
 * Load latest game state
 * Requires authentication
 */
app.get("/api/player/load", auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const save = await db.getLatestGameSave(userId);

    if (!save) {
      return res.json({
        success: true,
        message: "No save data found",
        data: null
      });
    }

    res.json({
      success: true,
      data: {
        xp: save.xp,
        level: save.level,
        region: save.region,
        inventory: save.inventory,
        questsCompleted: save.questsCompleted,
        achievements: save.achievements,
        stats: save.stats,
        playtime: save.playtime,
        savedAt: save.savedAt
      }
    });
  } catch (error) {
    console.error('Error loading game state:', error);
    res.status(500).json({ error: 'Failed to load game state' });
  }
});

/**
 * GET /api/player/saves
 * Get all game saves for user
 * Requires authentication
 */
app.get("/api/player/saves", auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;
    
    const saves = await db.getGameSaves(userId, limit);

    res.json({
      success: true,
      saves: saves.map(save => ({
        id: save._id,
        slotName: save.slotName,
        level: save.level,
        xp: save.xp,
        region: save.region,
        playtime: save.playtime,
        questsCompleted: save.questsCompleted,
        savedAt: save.savedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching game saves:', error);
    res.status(500).json({ error: 'Failed to fetch game saves' });
  }
});

/**
 * ============================================
 * LEADERBOARD ENDPOINTS
 * ============================================
 */

/**
 * GET /api/leaderboard
 * Get global leaderboard
 * Query params: ?limit=10&offset=0
 */
app.get("/api/leaderboard", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const result = await db.getLeaderboard(limit, offset);

    res.json({
      success: true,
      leaderboard: result.entries,
      total: result.total,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * POST /api/leaderboard/submit
 * Submit score to leaderboard
 * Requires authentication
 * Body: { xp, level, playtime, questsCompleted }
 */
app.post("/api/leaderboard/submit", auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const username = req.user.username;
    const { xp, level, playtime, questsCompleted } = req.body;

    await db.updateLeaderboardEntry(userId, username, {
      xp,
      level,
      playtime,
      questsCompleted
    });

    console.log(`Leaderboard submission from ${username}: ${xp} XP`);

    res.json({
      success: true,
      message: "Score submitted to leaderboard"
    });
  } catch (error) {
    console.error('Error submitting leaderboard score:', error);
    res.status(500).json({ error: 'Failed to submit score' });
  }
});

/**
 * ============================================
 * ACHIEVEMENT ENDPOINTS
 * ============================================
 */

/**
 * GET /api/achievements
 * Get all achievements
 */
app.get("/api/achievements", (req, res) => {
  const allAchievements = [
    { id: 1, name: 'First Steps', description: 'Complete first quest', icon: '🎯' },
    { id: 2, name: 'Adventurer', description: 'Complete 10 quests', icon: '🗺️' },
    { id: 3, name: 'Scholar', description: 'Reach level 10', icon: '📚' },
    { id: 4, name: 'Master', description: 'Reach level 30', icon: '👑' },
    { id: 5, name: 'Dragon Slayer', description: 'Defeat a boss', icon: '🐉' },
    { id: 6, name: 'Legendary', description: 'Reach level 50', icon: '⭐' }
  ];

  res.json({
    success: true,
    achievements: allAchievements
  });
});

/**
 * GET /api/achievements/user
 * Get user's unlocked achievements
 * Requires authentication
 */
app.get("/api/achievements/user", auth.authMiddleware, async (req, res) => {
  try {
    const user = await auth.getUserById(req.user.userId);

    res.json({
      success: true,
      achievements: user.profile.achievements || []
    });
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

/**
 * POST /api/achievements/unlock
 * Unlock achievement
 * Requires authentication
 * Body: { achievementId }
 */
app.post("/api/achievements/unlock", auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { achievementId } = req.body;
    
    const user = await auth.getUserById(userId);
    
    if (!user.profile.achievements.includes(achievementId)) {
      user.profile.achievements.push(achievementId);
      await auth.updateUserProfile(userId, user.profile);
    }

    console.log(`Achievement ${achievementId} unlocked for ${req.user.username}`);

    res.json({
      success: true,
      message: "Achievement unlocked"
    });
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    res.status(500).json({ error: 'Failed to unlock achievement' });
  }
});

/**
 * ============================================
 * HEALTH CHECK
 * ============================================
 */

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: 'MongoDB (Atlas or Local)'
  });
});

// Readiness: checks critical dependencies (DB)
app.get('/ready', async (req, res) => {
  try {
    const state = mongoose.connection.readyState; // 1 = connected
    if (state === 1) {
      return res.status(200).json({ ready: true, databaseState: state });
    }
    return res.status(503).json({ ready: false, databaseState: state });
  } catch (err) {
    console.error('Readiness check failed:', err);
    return res.status(503).json({ ready: false, error: err.message });
  }
});

/**
 * ============================================
 * GAME ROUTES
 * ============================================
 */

app.use("/api/game", gameRoutes);

/**
 * ============================================
 * ERROR HANDLING
 * ============================================
 */

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

/**
 * ============================================
 * SERVER START
 * ============================================
 */

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  LifeQuest Backend Server Running (MongoDB)║
╠════════════════════════════════════════════╣
║ 🚀 Server: http://localhost:${PORT}              ║
║ 📡 API: /api/* endpoints                  ║
║ 🗄️  Database: MongoDB                      ║
║ 🔐 Auth: JWT tokens required              ║
║ 🏥 Health: GET /health                   ║
║ 📝 Env: ${process.env.NODE_ENV || 'development'}                            ║
╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
