/**
 * database.js
 * 
 * MongoDB connection and models for LifeQuest
 * Handles user accounts, game saves, leaderboard, achievements
 */

const mongoose = require('mongoose');

// Connection options
const mongoOptions = {
  // timeouts (15s) to avoid long block on startup
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 15000
};

/**
 * Connect to MongoDB
 * Non-blocking: logs error but allows server to start
 * Server will report "not ready" via /ready until connection succeeds
 */
async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lifequest';
    
    // Start connection but don't block startup
    mongoose.connect(mongoURI, mongoOptions)
      .then(() => {
        console.log('✅ MongoDB connected successfully');
      })
      .catch(error => {
        console.error('⚠️  MongoDB connection pending... will retry:', error.message);
      });
    
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB initialization error:', error.message);
    // Don't exit—allow server to start in degraded mode
    return null;
  }
}

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  profile: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    playtime: { type: Number, default: 0 }, // in minutes
    region: { type: String, default: 'Hub' },
    achievements: [{ type: String }], // achievement IDs
    inventory: [{
      itemId: String,
      name: String,
      quantity: Number,
      equipped: Boolean
    }],
    stats: {
      questsCompleted: { type: Number, default: 0 },
      enemiesDefeated: { type: Number, default: 0 },
      bossesFought: { type: Number, default: 0 }
    }
  }
});

const User = mongoose.model('User', userSchema);

/**
 * Game Save Schema
 */
const gameSaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: String,
  slotName: String,
  level: Number,
  xp: Number,
  region: String,
  inventory: mongoose.Schema.Types.Mixed,
  questsCompleted: Number,
  achievements: [String],
  stats: mongoose.Schema.Types.Mixed,
  playtime: Number,
  savedAt: {
    type: Date,
    default: Date.now
  }
});

const GameSave = mongoose.model('GameSave', gameSaveSchema);

/**
 * Leaderboard Entry Schema
 */
const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: String,
  xp: Number,
  level: Number,
  playtime: Number,
  questsCompleted: Number,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);

/**
 * Achievement Schema
 */
const achievementSchema = new mongoose.Schema({
  achievementId: String,
  name: String,
  description: String,
  icon: String,
  requirement: mongoose.Schema.Types.Mixed
});

const Achievement = mongoose.model('Achievement', achievementSchema);

/**
 * Database functions
 */

/**
 * Create or update leaderboard entry
 */
async function updateLeaderboardEntry(userId, username, stats) {
  try {
    const entry = await LeaderboardEntry.findOneAndUpdate(
      { userId },
      {
        username,
        xp: stats.xp,
        level: stats.level,
        playtime: stats.playtime,
        questsCompleted: stats.questsCompleted,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );
    return entry;
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
}

/**
 * Get leaderboard
 */
async function getLeaderboard(limit = 10, offset = 0) {
  try {
    const entries = await LeaderboardEntry
      .find({})
      .sort({ xp: -1 })
      .skip(offset)
      .limit(limit);
    
    const total = await LeaderboardEntry.countDocuments();
    
    return {
      entries: entries.map((e, i) => ({
        rank: offset + i + 1,
        username: e.username,
        xp: e.xp,
        level: e.level,
        playtime: e.playtime,
        questsCompleted: e.questsCompleted
      })),
      total
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

/**
 * Save game state
 */
async function saveGameState(userId, username, gameData) {
  try {
    const save = new GameSave({
      userId,
      username,
      ...gameData,
      savedAt: new Date()
    });
    
    await save.save();
    
    // Also update leaderboard
    await updateLeaderboardEntry(userId, username, {
      xp: gameData.xp,
      level: gameData.level,
      playtime: gameData.playtime,
      questsCompleted: gameData.questsCompleted
    });
    
    return save;
  } catch (error) {
    console.error('Error saving game state:', error);
    throw error;
  }
}

/**
 * Get latest game save
 */
async function getLatestGameSave(userId) {
  try {
    const save = await GameSave
      .findOne({ userId })
      .sort({ savedAt: -1 });
    
    return save;
  } catch (error) {
    console.error('Error loading game save:', error);
    throw error;
  }
}

/**
 * Get all game saves for user
 */
async function getGameSaves(userId, limit = 10) {
  try {
    const saves = await GameSave
      .find({ userId })
      .sort({ savedAt: -1 })
      .limit(limit);
    
    return saves;
  } catch (error) {
    console.error('Error fetching game saves:', error);
    throw error;
  }
}

module.exports = {
  connectDB,
  User,
  GameSave,
  LeaderboardEntry,
  Achievement,
  updateLeaderboardEntry,
  getLeaderboard,
  saveGameState,
  getLatestGameSave,
  getGameSaves
};
