/**
 * cinematicSequences.js
 * 
 * Pre-built cinematic sequences for game moments
 * Includes: Intro, boss encounters, victory, defeat
 */

export const CINEMATIC_SEQUENCES = {
  /**
   * INTRO SEQUENCE - Game opening
   */
  intro: {
    name: "Intro",
    duration: 8000, // 8 seconds
    content: "🌌 WHAT IS LIFE? 🌌",
    dialogue: [
      {
        time: 1000,
        duration: 2000,
        speaker: "The Sage",
        text: "Welcome, seeker. You stand at the threshold of understanding."
      },
      {
        time: 3500,
        duration: 2000,
        speaker: "The Sage",
        text: "Your journey through life awaits. Will you discover what truly matters?"
      },
      {
        time: 5500,
        duration: 2000,
        speaker: "Narrator",
        text: "Press SPACE to begin your quest..."
      }
    ],
    music: {
      url: "/audio/epic-theme.mp3",
      startTime: 0,
      fadeIn: 1000,
      fadeOut: 1000
    },
    effects: {
      vignette: true,
      bloom: true
    },
    skipable: true
  },

  /**
   * BOSS INTRO - Dramatic encounter
   */
  bossIntro: (bossName, bossDescription) => ({
    name: "Boss Intro",
    duration: 6000,
    content: `⚔️ ${bossName.toUpperCase()} ⚔️`,
    dialogue: [
      {
        time: 500,
        duration: 1500,
        speaker: "Narrator",
        text: `You encounter: ${bossName}`
      },
      {
        time: 2200,
        duration: 2000,
        speaker: "Enemy",
        text: bossDescription || "I am the guardian of this realm. Turn back if you dare."
      },
      {
        time: 4500,
        duration: 1000,
        speaker: "Narrator",
        text: "BATTLE START!"
      }
    ],
    music: {
      url: "/audio/boss-theme.mp3",
      startTime: 0,
      fadeIn: 500,
      fadeOut: 500
    },
    effects: {
      vignette: true,
      bloom: true
    },
    skipable: true
  }),

  /**
   * VICTORY SEQUENCE
   */
  victory: (enemyName, reward) => ({
    name: "Victory",
    duration: 7000,
    content: "🎉 VICTORY! 🎉",
    dialogue: [
      {
        time: 500,
        duration: 1500,
        speaker: "Narrator",
        text: `You have defeated ${enemyName || "the enemy"}!`
      },
      {
        time: 2200,
        duration: 2000,
        speaker: "Narrator",
        text: `Reward: +${reward?.xp || 100} XP, +${reward?.gold || 50} Gold`
      },
      {
        time: 4500,
        duration: 2000,
        speaker: "Narrator",
        text: "Continue your journey to new heights!"
      }
    ],
    music: {
      url: "/audio/victory-theme.mp3",
      startTime: 0,
      fadeIn: 500,
      fadeOut: 1000
    },
    effects: {
      vignette: false,
      bloom: true
    },
    skipable: true
  }),

  /**
   * DEFEAT SEQUENCE
   */
  defeat: () => ({
    name: "Defeat",
    duration: 5000,
    content: "💀 DEFEATED 💀",
    dialogue: [
      {
        time: 500,
        duration: 1500,
        speaker: "Narrator",
        text: "You have fallen in battle..."
      },
      {
        time: 2200,
        duration: 2000,
        speaker: "Narrator",
        text: "Return to your last checkpoint and try again."
      }
    ],
    music: {
      url: "/audio/defeat-theme.mp3",
      startTime: 0,
      fadeIn: 500,
      fadeOut: 1000
    },
    effects: {
      vignette: true,
      bloom: false
    },
    skipable: true
  }),

  /**
   * LEVEL UP SEQUENCE
   */
  levelUp: (newLevel, statBoosts) => ({
    name: "Level Up",
    duration: 4000,
    content: `⭐ LEVEL ${newLevel} ⭐`,
    dialogue: [
      {
        time: 500,
        duration: 1500,
        speaker: "Narrator",
        text: `You have reached Level ${newLevel}!`
      },
      {
        time: 2200,
        duration: 1500,
        speaker: "Narrator",
        text: `Stat Boost: ${Object.entries(statBoosts || {})
          .map(([key, val]) => `+${val} ${key}`)
          .join(", ")}`
      }
    ],
    music: {
      url: "/audio/level-up.mp3",
      startTime: 0,
      fadeIn: 300,
      fadeOut: 500
    },
    effects: {
      vignette: false,
      bloom: true
    },
    skipable: true
  }),

  /**
   * ACHIEVEMENT UNLOCKED
   */
  achievementUnlock: (achievementTitle, achievementDesc) => ({
    name: "Achievement",
    duration: 4000,
    content: "🏆 ACHIEVEMENT UNLOCKED 🏆",
    dialogue: [
      {
        time: 500,
        duration: 1500,
        speaker: "System",
        text: achievementTitle
      },
      {
        time: 2200,
        duration: 1500,
        speaker: "System",
        text: achievementDesc || "You have accomplished something great!"
      }
    ],
    music: {
      url: "/audio/achievement.mp3",
      startTime: 0,
      fadeIn: 200,
      fadeOut: 400
    },
    effects: {
      vignette: false,
      bloom: true
    },
    skipable: true
  }),

  /**
   * LOCATION DISCOVERY
   */
  locationDiscovery: (locationName, locationLore) => ({
    name: "Discovery",
    duration: 5000,
    content: `📍 NEW LOCATION 📍`,
    dialogue: [
      {
        time: 500,
        duration: 1500,
        speaker: "Narrator",
        text: `You have discovered: ${locationName}`
      },
      {
        time: 2200,
        duration: 2000,
        speaker: "Lore",
        text: locationLore || "A mysterious place awaits exploration."
      }
    ],
    music: {
      url: "/audio/discovery.mp3",
      startTime: 0,
      fadeIn: 500,
      fadeOut: 500
    },
    effects: {
      vignette: false,
      bloom: false
    },
    skipable: true
  }),

  /**
   * FINAL BOSS INTRO
   */
  finalBossIntro: {
    name: "Final Boss",
    duration: 10000,
    content: "👑 THE FINAL CHALLENGE 👑",
    dialogue: [
      {
        time: 1000,
        duration: 2000,
        speaker: "The Great One",
        text: "You have traveled far, seeker. But the true trial lies ahead."
      },
      {
        time: 3500,
        duration: 2000,
        speaker: "The Great One",
        text: "Face me and discover the answer to your question..."
      },
      {
        time: 6000,
        duration: 2000,
        speaker: "Narrator",
        text: "What is life? You will find out."
      },
      {
        time: 8200,
        duration: 1500,
        speaker: "Narrator",
        text: "THE BATTLE FOR TRUTH BEGINS!"
      }
    ],
    music: {
      url: "/audio/final-boss-theme.mp3",
      startTime: 0,
      fadeIn: 1000,
      fadeOut: 500
    },
    effects: {
      vignette: true,
      bloom: true
    },
    skipable: true
  }
};

/**
 * Trigger a cinematic sequence from anywhere in the game
 */
export function playCinematic(sequenceName, options = {}) {
  const sequence = CINEMATIC_SEQUENCES[sequenceName];
  
  if (!sequence) {
    console.warn(`Cinematic sequence "${sequenceName}" not found`);
    return null;
  }

  // Handle dynamic sequences (functions)
  if (typeof sequence === "function") {
    return sequence(options.bossName || options.title, options.bossDescription || options.description);
  }

  return sequence;
}
