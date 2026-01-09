/**
 * BackendAPI.js
 * 
 * Centralized API client for game backend integration
 * Handles: Player saves, leaderboard sync, achievements, stats, lore unlocks
 * 
 * Environment:
 * - Development: http://localhost:3001
 * - Production: https://lifequest-api.herokuapp.com or AWS Lambda
 * 
 * Session Management:
 * - Local sessionId generation for anonymous players
 * - Optional user auth via Google OAuth 2.0
 * - Automatic save on phase transitions
 * - Optimistic updates with rollback
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const SESSION_ID_KEY = "lifequest_session_id";
const AUTH_TOKEN_KEY = "lifequest_auth_token";

class BackendAPI {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    this.isOnline = navigator.onLine;
    
    // Listen for online/offline events
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.syncPendingChanges();
    });
    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  /**
   * Session Management
   */
  
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem(SESSION_ID_KEY);
    if (!sessionId) {
      sessionId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    return sessionId;
  }

  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  /**
   * Helper: Make API request with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "X-Session-ID": this.sessionId,
      ...(this.authToken && { "Authorization": `Bearer ${this.authToken}` }),
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired
          this.authToken = null;
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * PLAYER DATA ENDPOINTS
   */

  /**
   * Create or fetch current player profile
   */
  async getPlayerProfile() {
    try {
      const data = await this.request("/api/player/profile");
      return data;
    } catch (error) {
      console.warn("Failed to fetch player profile, using local data");
      return this.getLocalPlayerProfile();
    }
  }

  /**
   * Save entire player game state
   * Called on phase transitions, before logout, on auto-save intervals
   */
  async saveGameState(gameData) {
    if (!this.isOnline) {
      return this.saveGameStateLocally(gameData);
    }

    try {
      const response = await this.request("/api/player/save", {
        method: "POST",
        body: JSON.stringify({
          xp: gameData.xp,
          level: gameData.level || 1,
          inventory: gameData.inventory,
          questsCompleted: gameData.questsCompleted,
          achievements: gameData.achievements,
          stats: gameData.stats || {},
          timestamp: Date.now(),
          clientVersion: "1.0.0"
        })
      });
      
      // Also save locally as backup
      this.saveGameStateLocally(gameData);
      
      return response;
    } catch (error) {
      console.warn("Failed to save to backend, saving locally instead");
      return this.saveGameStateLocally(gameData);
    }
  }

  /**
   * Load player game state from backend or local storage
   */
  async loadGameState() {
    if (!this.isOnline) {
      return this.loadGameStateLocally();
    }

    try {
      const data = await this.request("/api/player/load");
      return data;
    } catch (error) {
      console.warn("Failed to load from backend, using local data");
      return this.loadGameStateLocally();
    }
  }

  /**
   * SAVE SLOTS ENDPOINTS
   * Support multiple save files
   */

  async getSaveSlots() {
    try {
      const data = await this.request("/api/saves/slots");
      return data.slots || [];
    } catch (error) {
      return this.getSaveSlotsLocally();
    }
  }

  async createSaveSlot(slotData) {
    try {
      const response = await this.request("/api/saves/create", {
        method: "POST",
        body: JSON.stringify({
          name: slotData.name,
          character: slotData.character,
          xp: slotData.xp,
          level: slotData.level,
          playtime: slotData.playtime,
          region: slotData.region
        })
      });
      
      this.saveSlotLocally(response.slotId, slotData);
      return response;
    } catch (error) {
      return this.saveSlotLocally(null, slotData);
    }
  }

  async loadSaveSlot(slotId) {
    try {
      const data = await this.request(`/api/saves/${slotId}`);
      return data;
    } catch (error) {
      return this.loadSlotLocally(slotId);
    }
  }

  async deleteSaveSlot(slotId) {
    try {
      return await this.request(`/api/saves/${slotId}`, { method: "DELETE" });
    } catch (error) {
      this.deleteSaveSlotLocally(slotId);
    }
  }

  /**
   * LEADERBOARD ENDPOINTS
   */

  async getLeaderboard(options = {}) {
    const query = new URLSearchParams({
      limit: options.limit || 50,
      period: options.period || "allTime", // weekly, monthly, allTime
      sortBy: options.sortBy || "xp" // xp, questsCompleted, playtime
    }).toString();

    try {
      const data = await this.request(`/api/leaderboard?${query}`);
      return data.entries || [];
    } catch (error) {
      return this.getLocalLeaderboard(options);
    }
  }

  async getPlayerRank(metric = "xp") {
    try {
      const data = await this.request(`/api/leaderboard/rank?metric=${metric}`);
      return data;
    } catch (error) {
      return { rank: null, percentile: null };
    }
  }

  async submitScore(metric, value) {
    try {
      return await this.request("/api/leaderboard/submit", {
        method: "POST",
        body: JSON.stringify({ metric, value, timestamp: Date.now() })
      });
    } catch (error) {
      console.warn("Failed to submit score");
      return null;
    }
  }

  /**
   * ACHIEVEMENT ENDPOINTS
   */

  async checkAchievements(achievements) {
    try {
      const response = await this.request("/api/achievements/check", {
        method: "POST",
        body: JSON.stringify({ achievements })
      });
      return response.unlocked || [];
    } catch (error) {
      return [];
    }
  }

  async unlockAchievement(achievementId) {
    try {
      return await this.request(`/api/achievements/${achievementId}/unlock`, {
        method: "POST"
      });
    } catch (error) {
      console.warn(`Failed to unlock achievement ${achievementId}`);
    }
  }

  async getAchievements() {
    try {
      const data = await this.request("/api/achievements");
      return data.achievements || [];
    } catch (error) {
      return [];
    }
  }

  /**
   * LORE & PROGRESSION ENDPOINTS
   */

  async getLoreEntries(filters = {}) {
    const query = new URLSearchParams({
      category: filters.category || "all", // characters, locations, factions, history
      unlocked: filters.unlocked !== false
    }).toString();

    try {
      const data = await this.request(`/api/lore?${query}`);
      return data.entries || [];
    } catch (error) {
      return this.getLocalLoreEntries(filters);
    }
  }

  async unlockLoreEntry(entryId) {
    try {
      return await this.request(`/api/lore/${entryId}/unlock`, {
        method: "POST"
      });
    } catch (error) {
      console.warn(`Failed to unlock lore ${entryId}`);
    }
  }

  /**
   * QUESTS
   */
  async getQuests() {
    try {
      const data = await this.request('/api/quests');
      return data.quests || [];
    } catch (err) {
      console.warn('Failed to fetch quests', err);
      return [];
    }
  }

  async acceptQuest(questId) {
    try {
      const data = await this.request('/api/quests/accept', {
        method: 'POST',
        body: JSON.stringify({ questId })
      });
      return data;
    } catch (err) {
      console.warn('Failed to accept quest', err);
      throw err;
    }
  }

  async completeQuest(questId) {
    try {
      const data = await this.request('/api/quests/complete', {
        method: 'POST',
        body: JSON.stringify({ questId })
      });
      return data;
    } catch (err) {
      console.warn('Failed to complete quest', err);
      throw err;
    }
  }

  /**
   * DAILIES & STREAKS
   */

  async getDailyChallenge(date = null) {
    const query = date ? `?date=${date}` : "";
    try {
      const data = await this.request(`/api/dailies/challenge${query}`);
      return data;
    } catch (error) {
      return this.getLocalDailyChallenge();
    }
  }

  async completeDailyChallenge(challengeId, progress) {
    try {
      return await this.request(`/api/dailies/${challengeId}/complete`, {
        method: "POST",
        body: JSON.stringify({ progress, completedAt: Date.now() })
      });
    } catch (error) {
      console.warn("Failed to submit daily challenge completion");
    }
  }

  async getStreakData() {
    try {
      const data = await this.request("/api/streaks/current");
      return data;
    } catch (error) {
      return this.getLocalStreakData();
    }
  }

  async updateStreak() {
    try {
      return await this.request("/api/streaks/update", { method: "POST" });
    } catch (error) {
      console.warn("Failed to update streak");
    }
  }

  /**
   * AUTHENTICATION
   */

  /**
   * Register new user
   * @param {string} username - Username
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async register(username, email, password) {
    try {
      const response = await this.request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password })
      });
      
      if (response.success && response.token) {
        this.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    try {
      const response = await this.request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      
      if (response.success && response.token) {
        this.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  /**
   * Verify token validity
   */
  async verifyToken() {
    try {
      const response = await this.request("/api/auth/verify", {
        method: "POST"
      });
      
      return response.valid || false;
    } catch (error) {
      console.warn("Token verification failed");
      return false;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.authToken !== null && this.authToken !== undefined;
  }

  /**
   * Authenticate with Google OAuth token
   */
  async authenticateGoogle(googleToken) {
    try {
      const response = await this.request("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: googleToken })
      });
      
      this.setAuthToken(response.token);
      return response;
    } catch (error) {
      console.error("Google authentication failed");
      throw error;
    }
  }

  /**
   * Logout and clear auth
   */
  async logout() {
    try {
      await this.request("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.warn("Logout request failed");
    } finally {
      this.authToken = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  /**
   * LOCAL STORAGE FALLBACK (Offline support)
   */

  saveGameStateLocally(gameData) {
    localStorage.setItem("lifequest_game_state", JSON.stringify(gameData));
    return gameData;
  }

  loadGameStateLocally() {
    const data = localStorage.getItem("lifequest_game_state");
    return data ? JSON.parse(data) : null;
  }

  getLocalPlayerProfile() {
    return {
      sessionId: this.sessionId,
      createdAt: localStorage.getItem("lifequest_created_at") || Date.now(),
      playtime: parseInt(localStorage.getItem("lifequest_playtime") || 0)
    };
  }

  saveSlotLocally(slotId, slotData) {
    const slots = this.getSaveSlotsLocally();
    const newSlot = {
      id: slotId || `local_${Date.now()}`,
      ...slotData,
      savedAt: Date.now()
    };
    slots.push(newSlot);
    localStorage.setItem("lifequest_save_slots", JSON.stringify(slots));
    return newSlot;
  }

  getSaveSlotsLocally() {
    const data = localStorage.getItem("lifequest_save_slots");
    return data ? JSON.parse(data) : [];
  }

  loadSlotLocally(slotId) {
    const slots = this.getSaveSlotsLocally();
    return slots.find(s => s.id === slotId) || null;
  }

  deleteSaveSlotLocally(slotId) {
    let slots = this.getSaveSlotsLocally();
    slots = slots.filter(s => s.id !== slotId);
    localStorage.setItem("lifequest_save_slots", JSON.stringify(slots));
  }

  getLocalLeaderboard(options = {}) {
    // Mock leaderboard for offline mode
    return [
      { rank: 1, name: "SkyWalker", xp: 50000, questsCompleted: 150 },
      { rank: 2, name: "DreamSeeker", xp: 45000, questsCompleted: 140 },
      { rank: 3, name: "You", xp: 35000, questsCompleted: 120 }
    ];
  }

  getLocalLoreEntries(filters = {}) {
    const allLore = [
      { id: "char_sage", title: "The Sage", category: "characters", unlocked: true },
      { id: "loc_forest", title: "Forest of Beginnings", category: "locations", unlocked: true },
      { id: "fact_order", title: "Order of Life", category: "factions", unlocked: false },
      { id: "hist_ancient", title: "Ancient Times", category: "history", unlocked: false }
    ];

    if (filters.category && filters.category !== "all") {
      return allLore.filter(entry => entry.category === filters.category);
    }
    if (filters.unlocked !== false) {
      return allLore.filter(entry => entry.unlocked);
    }
    return allLore;
  }

  getLocalDailyChallenge() {
    return {
      id: "daily_1",
      title: "Morning Motivation",
      description: "Complete 1 quest",
      progress: 0,
      target: 1,
      reward: { xp: 100, gold: 50 }
    };
  }

  getLocalStreakData() {
    return {
      currentStreak: parseInt(localStorage.getItem("lifequest_streak") || 0),
      longestStreak: parseInt(localStorage.getItem("lifequest_longest_streak") || 0),
      lastPlayedDate: localStorage.getItem("lifequest_last_played_date")
    };
  }

  /**
   * SYNC MANAGEMENT
   */

  pendingChanges = [];

  addPendingChange(change) {
    this.pendingChanges.push({
      ...change,
      timestamp: Date.now()
    });
    localStorage.setItem("lifequest_pending_changes", JSON.stringify(this.pendingChanges));
  }

  async syncPendingChanges() {
    if (!this.isOnline || this.pendingChanges.length === 0) return;

    const changes = [...this.pendingChanges];
    for (const change of changes) {
      try {
        await this.request("/api/sync/change", {
          method: "POST",
          body: JSON.stringify(change)
        });
        this.pendingChanges = this.pendingChanges.filter(c => c.timestamp !== change.timestamp);
      } catch (error) {
        console.warn("Failed to sync change, will retry later");
      }
    }
    localStorage.setItem("lifequest_pending_changes", JSON.stringify(this.pendingChanges));
  }
}

// Export singleton instance
export const backendAPI = new BackendAPI();
export default BackendAPI;
