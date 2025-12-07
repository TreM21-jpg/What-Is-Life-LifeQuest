/**
 * server-starter.js
 * 
 * Minimal Node.js + Express backend for LifeQuest
 * Provides REST API for game state persistence, leaderboard, achievements
 * 
 * SETUP:
 * 1. npm install express cors dotenv
 * 2. Copy this to backend/server.js
 * 3. Create .env with:
 *    PORT=3001
 *    MONGODB_URI=your_mongodb_connection
 *    NODE_ENV=development
 * 4. npm start
 * 
 * DEPLOYMENT:
 * - Heroku: git push heroku main
 * - AWS Lambda: Serverless Framework
 * - Railway: Connect GitHub repo
 * - Vercel: /api directory
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (replace with MongoDB/PostgreSQL in production)
const playerSaves = new Map();
const leaderboard = [];
const achievements = new Map();

/**
 * PLAYER ENDPOINTS
 */

// Get player profile
app.get("/api/player/profile", (req, res) => {
  const sessionId = req.headers["x-session-id"];
  
  const profile = {
    sessionId,
    createdAt: new Date(),
    playtime: 0,
    lastSaved: null
  };
  
  res.json(profile);
});

// Save game state
app.post("/api/player/save", (req, res) => {
  const sessionId = req.headers["x-session-id"];
  const gameData = req.body;
  
  playerSaves.set(sessionId, {
    ...gameData,
    savedAt: new Date().toISOString()
  });
  
  console.log(`Saved game state for ${sessionId}`);
  
  res.json({
    success: true,
    message: "Game state saved",
    savedAt: new Date().toISOString()
  });
});

// Load game state
app.get("/api/player/load", (req, res) => {
  const sessionId = req.headers["x-session-id"];
  const gameData = playerSaves.get(sessionId);
  
  if (!gameData) {
    return res.status(404).json({
      success: false,
      message: "No save found for this session"
    });
  }
  
  res.json(gameData);
});

/**
 * SAVE SLOTS ENDPOINTS
 */

app.get("/api/saves/slots", (req, res) => {
  const sessionId = req.headers["x-session-id"];
  const save = playerSaves.get(sessionId);
  
  res.json({
    slots: save ? [save] : []
  });
});

app.post("/api/saves/create", (req, res) => {
  const sessionId = req.headers["x-session-id"];
  const slotData = req.body;
  
  const slotId = `slot_${Date.now()}`;
  playerSaves.set(slotId, {
    ...slotData,
    id: slotId,
    sessionId,
    createdAt: new Date().toISOString()
  });
  
  res.json({
    success: true,
    slotId,
    message: "Save slot created"
  });
});

app.get("/api/saves/:slotId", (req, res) => {
  const save = playerSaves.get(req.params.slotId);
  
  if (!save) {
    return res.status(404).json({ message: "Save not found" });
  }
  
  res.json(save);
});

app.delete("/api/saves/:slotId", (req, res) => {
  playerSaves.delete(req.params.slotId);
  res.json({ success: true, message: "Save deleted" });
});

/**
 * LEADERBOARD ENDPOINTS
 */

app.get("/api/leaderboard", (req, res) => {
  const { limit = 50, period = "allTime", sortBy = "xp" } = req.query;
  
  // Mock leaderboard data
  const mockEntries = [
    { rank: 1, name: "SkyWalker", xp: 50000, questsCompleted: 150, playtime: 5000 },
    { rank: 2, name: "DreamSeeker", xp: 45000, questsCompleted: 140, playtime: 4500 },
    { rank: 3, name: "IceKnight", xp: 40000, questsCompleted: 130, playtime: 4000 },
    { rank: 4, name: "You", xp: 35000, questsCompleted: 120, playtime: 3500 },
    { rank: 5, name: "PhoenixRisen", xp: 30000, questsCompleted: 110, playtime: 3000 }
  ];
  
  res.json({
    entries: mockEntries.slice(0, parseInt(limit)),
    period,
    sortBy
  });
});

app.get("/api/leaderboard/rank", (req, res) => {
  const { metric = "xp" } = req.query;
  
  res.json({
    rank: 4,
    percentile: 85,
    metric,
    yourValue: 35000
  });
});

app.post("/api/leaderboard/submit", (req, res) => {
  const { metric, value } = req.body;
  const sessionId = req.headers["x-session-id"];
  
  console.log(`Leaderboard submit: ${metric} = ${value} from ${sessionId}`);
  
  res.json({
    success: true,
    message: "Score submitted"
  });
});

/**
 * ACHIEVEMENTS ENDPOINTS
 */

app.get("/api/achievements", (req, res) => {
  const mockAchievements = [
    { id: "ach_first_quest", title: "First Steps", description: "Complete your first quest", unlocked: true },
    { id: "ach_five_quests", title: "Quest Master", description: "Complete 5 quests", unlocked: true },
    { id: "ach_all_regions", title: "World Explorer", description: "Visit all regions", unlocked: false },
    { id: "ach_collector", title: "Collector", description: "Gather 100 items", unlocked: false }
  ];
  
  res.json({ achievements: mockAchievements });
});

app.post("/api/achievements/:id/unlock", (req, res) => {
  const { id } = req.params;
  const sessionId = req.headers["x-session-id"];
  
  console.log(`Achievement unlocked: ${id} for ${sessionId}`);
  
  res.json({
    success: true,
    achievementId: id,
    message: "Achievement unlocked!"
  });
});

app.post("/api/achievements/check", (req, res) => {
  const { achievements } = req.body;
  
  // Simple check: return first achievement as unlocked
  res.json({
    unlocked: achievements.slice(0, 1)
  });
});

/**
 * LORE ENDPOINTS
 */

app.get("/api/lore", (req, res) => {
  const { category = "all", unlocked = true } = req.query;
  
  const mockLore = [
    {
      id: "lore_sage",
      title: "The Sage",
      category: "characters",
      content: "An ancient guide who has witnessed the rise and fall of civilizations...",
      unlocked: true
    },
    {
      id: "lore_forest",
      title: "Forest of Beginnings",
      category: "locations",
      content: "A lush green forest where all helpers are born...",
      unlocked: true
    },
    {
      id: "lore_order",
      title: "Order of Life",
      category: "factions",
      content: "An ancient order dedicated to protecting the balance...",
      unlocked: false
    }
  ];
  
  let entries = mockLore;
  if (category !== "all") {
    entries = entries.filter(e => e.category === category);
  }
  if (unlocked === "true") {
    entries = entries.filter(e => e.unlocked);
  }
  
  res.json({ entries });
});

app.post("/api/lore/:id/unlock", (req, res) => {
  const { id } = req.params;
  console.log(`Lore entry unlocked: ${id}`);
  
  res.json({
    success: true,
    entryId: id,
    message: "Lore entry unlocked!"
  });
});

/**
 * DAILY CHALLENGES
 */

app.get("/api/dailies/challenge", (req, res) => {
  const { date } = req.query;
  
  res.json({
    id: "daily_1",
    title: "Morning Motivation",
    description: "Complete 1 quest",
    target: 1,
    reward: { xp: 100, gold: 50, streakBonus: 10 },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });
});

app.post("/api/dailies/:id/complete", (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  
  console.log(`Daily challenge completed: ${id}, progress: ${progress}`);
  
  res.json({
    success: true,
    challengeId: id,
    reward: { xp: 100, gold: 50 }
  });
});

/**
 * STREAKS
 */

app.get("/api/streaks/current", (req, res) => {
  res.json({
    currentStreak: 5,
    longestStreak: 12,
    lastPlayedDate: new Date().toISOString(),
    streakBonus: 1.5
  });
});

app.post("/api/streaks/update", (req, res) => {
  res.json({
    success: true,
    currentStreak: 6,
    streakBonus: 1.5
  });
});

/**
 * AUTHENTICATION (Google OAuth - simplified)
 */

app.post("/api/auth/google", (req, res) => {
  const { token } = req.body;
  
  // In production: verify token with Google API
  console.log("Google authentication request");
  
  const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  res.json({
    success: true,
    token: authToken,
    message: "Authenticated with Google"
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.json({ success: true, message: "Logged out" });
});

/**
 * SYNC ENDPOINT
 */

app.post("/api/sync/change", (req, res) => {
  const change = req.body;
  console.log("Syncing change:", change);
  
  res.json({
    success: true,
    message: "Change synced"
  });
});

/**
 * HEALTH CHECK
 */

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

/**
 * START SERVER
 */

app.listen(PORT, () => {
  console.log(`LifeQuest Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Base: http://localhost:${PORT}/api`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  Player: /api/player/*`);
  console.log(`  Saves: /api/saves/*`);
  console.log(`  Leaderboard: /api/leaderboard`);
  console.log(`  Achievements: /api/achievements`);
  console.log(`  Lore: /api/lore`);
  console.log(`  Dailies: /api/dailies/*`);
  console.log(`  Streaks: /api/streaks/*`);
  console.log(`  Auth: /api/auth/*`);
});

module.exports = app;
