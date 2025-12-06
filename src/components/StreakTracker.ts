/**
 * Inspiration Streak Tracker – Gamify player's daily motivation
 * Tracks consecutive days of viewing inspiration, with rewards and leaderboard
 */

const STORAGE_KEY = "lifequest_inspiration_streak";

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastInspiredDate: string;
  totalInspirationsThisWeek: number;
  allTimeInspirations: number;
}

/**
 * Get current streak data
 */
export function getStreakData(): StreakData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastInspiredDate: "",
      totalInspirationsThisWeek: 0,
      allTimeInspirations: 0,
    };
  }
  return JSON.parse(stored);
}

/**
 * Record an inspiration moment
 */
export function recordInspiration(): StreakData {
  const today = new Date().toISOString().split("T")[0];
  const data = getStreakData();

  // Check if already inspired today
  if (data.lastInspiredDate === today) {
    // Same day, just increment all-time
    data.allTimeInspirations++;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  // Check if yesterday was the last inspiration (continue streak)
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (data.lastInspiredDate === yesterday) {
    data.currentStreak++;
  } else {
    // Streak broken, start new
    data.currentStreak = 1;
  }

  // Update longest streak
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

  // Update weekly and all-time counters
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
  if (data.lastInspiredDate >= weekAgo) {
    data.totalInspirationsThisWeek++;
  } else {
    data.totalInspirationsThisWeek = 1;
  }

  data.allTimeInspirations++;
  data.lastInspiredDate = today;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

/**
 * Get streak milestone (for rewards)
 */
export function getStreakMilestone(streak: number): string {
  if (streak === 0) return "";
  if (streak === 1) return "🌱 Sprouting";
  if (streak === 3) return "🌿 Growing";
  if (streak === 7) return "🌳 Established";
  if (streak === 14) return "🌲 Strong";
  if (streak === 30) return "🏔️ Unshakeable";
  if (streak >= 100) return "⭐ Legend";
  return "🔥 On Fire";
}

/**
 * Get a custom message based on streak
 */
export function getStreakMessage(streak: number): string {
  const messages: { [key: number]: string } = {
    1: "Your journey begins! 🌱",
    3: "You're building momentum! 🌿",
    7: "One week strong! 🌳",
    14: "Two weeks of dedication! 💪",
    30: "A month of inspiration! 🏆",
    50: "Half a century of growth! 🚀",
    100: "You are a true legend! ⭐",
  };

  return messages[streak] || `${streak} days of inspiration! 🔥`;
}

/**
 * Reset streak (for testing or user request)
 */
export function resetStreak(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get top streakers (mock leaderboard data)
 */
export function getTopStreakers() {
  // In a real app, this would fetch from backend
  return [
    { rank: 1, name: "You", streak: 42, icon: "👑", isCurrentPlayer: true },
    { rank: 2, name: "Alex", streak: 38, icon: "🥈", isCurrentPlayer: false },
    { rank: 3, name: "Jordan", streak: 35, icon: "🥉", isCurrentPlayer: false },
    { rank: 4, name: "Casey", streak: 28, icon: "🔥", isCurrentPlayer: false },
    { rank: 5, name: "Morgan", streak: 21, icon: "💪", isCurrentPlayer: false },
  ];
}
