/**
 * LoreUnlockSystem.js
 * 
 * Progress-based lore unlocking system
 * Unlocks story content as players advance through game
 */

export const LORE_DATABASE = [
  // Characters
  {
    id: "char_sage",
    title: "The Sage",
    category: "characters",
    content:
      "An ancient being who has witnessed the rise and fall of countless civilizations. The Sage seeks to guide seekers like you toward understanding.",
    image: "🧙",
    unlockedBy: "start",
    requiredLevel: 0
  },
  {
    id: "char_shadow",
    title: "The Shadow",
    category: "characters",
    content:
      "A mysterious figure that appears in moments of doubt. Some say The Shadow is a test of character, others believe it to be a manifestation of inner darkness.",
    image: "👤",
    unlockedBy: "levelUp",
    requiredLevel: 5
  },
  {
    id: "char_light",
    title: "The Light",
    category: "characters",
    content:
      "A being of pure knowledge and compassion. The Light illuminates truths about existence and guides lost souls toward enlightenment.",
    image: "✨",
    unlockedBy: "achievement",
    requiredLevel: 10,
    requiredAchievement: "ach_seeker"
  },

  // Locations
  {
    id: "loc_forest",
    title: "Forest of Beginnings",
    category: "locations",
    content:
      "Where all seekers begin their journey. Green and full of life, it represents the potential within every soul. The Sage dwells here.",
    image: "🌲",
    unlockedBy: "start",
    requiredLevel: 0
  },
  {
    id: "loc_mountain",
    title: "Mountain of Trials",
    category: "locations",
    content:
      "A treacherous peak that tests the resolve of those who climb it. At the summit lies truth, but the path is fraught with challenges.",
    image: "⛰️",
    unlockedBy: "quest",
    requiredLevel: 10,
    requiredQuestsCompleted: 5
  },
  {
    id: "loc_abyss",
    title: "The Abyss",
    category: "locations",
    content:
      "A place of darkness where the shadow of the soul is strongest. Only by understanding the darkness can one appreciate the light.",
    image: "🌑",
    unlockedBy: "battle",
    requiredLevel: 20
  },
  {
    id: "loc_sanctuary",
    title: "Sanctuary of Truth",
    category: "locations",
    content:
      "The final destination of all seekers. Here, the answer to 'What is Life?' can be found. But the journey is as important as the destination.",
    image: "🏛️",
    unlockedBy: "endgame",
    requiredLevel: 50
  },

  // Factions
  {
    id: "fact_order",
    title: "Order of Life",
    category: "factions",
    content:
      "An ancient organization dedicated to understanding and preserving the essence of life. They believe life is something to be cherished and protected.",
    image: "⚔️",
    unlockedBy: "quest",
    requiredLevel: 15,
    requiredQuestsCompleted: 10
  },
  {
    id: "fact_seekers",
    title: "Seekers Guild",
    category: "factions",
    content:
      "A community of philosophers and adventurers who quest for knowledge. They believe life is what you make of it through actions and choices.",
    image: "🔍",
    unlockedBy: "achievement",
    requiredLevel: 20,
    requiredAchievement: "ach_quest_master"
  },

  // History & Philosophy
  {
    id: "hist_ancient",
    title: "The First Question",
    category: "history",
    content:
      "Long ago, the first seeker asked: 'What is life?' This question echoed through ages and brought countless seekers to search for answers.",
    image: "📜",
    unlockedBy: "start",
    requiredLevel: 0
  },
  {
    id: "hist_great_war",
    title: "The Great War of Understanding",
    category: "history",
    content:
      "A conflict between those who sought to define life and those who believed life could not be defined. Neither side won, but understanding grew.",
    image: "⚡",
    unlockedBy: "levelUp",
    requiredLevel: 25
  },
  {
    id: "hist_new_age",
    title: "The New Age of Seekers",
    category: "history",
    content:
      "An era of enlightenment where many seekers realized the answer was personal to each individual. Life means different things to different beings.",
    image: "🌅",
    unlockedBy: "milestone",
    requiredLevel: 40,
    requiredQuestsCompleted: 50
  }
];

export class LoreUnlockSystem {
  constructor() {
    this.unlockedLore = this.loadUnlockedLore();
  }

  loadUnlockedLore() {
    const saved = localStorage.getItem("lifequest_unlocked_lore");
    return saved ? JSON.parse(saved) : [];
  }

  saveLore() {
    localStorage.setItem(
      "lifequest_unlocked_lore",
      JSON.stringify(this.unlockedLore)
    );
  }

  /**
   * Check if lore entry should be unlocked based on conditions
   */
  checkUnlock(playerStats) {
    const {
      level = 0,
      xp = 0,
      questsCompleted = 0,
      achievements = []
    } = playerStats;

    LORE_DATABASE.forEach((entry) => {
      if (this.unlockedLore.includes(entry.id)) return; // Already unlocked

      let shouldUnlock = false;

      if (entry.requiredLevel <= level) {
        if (entry.unlockedBy === "start") {
          shouldUnlock = true;
        } else if (entry.unlockedBy === "levelUp") {
          shouldUnlock = true;
        } else if (entry.unlockedBy === "quest" && entry.requiredQuestsCompleted) {
          shouldUnlock = questsCompleted >= entry.requiredQuestsCompleted;
        } else if (entry.unlockedBy === "achievement" && entry.requiredAchievement) {
          shouldUnlock = achievements.includes(entry.requiredAchievement);
        } else if (entry.unlockedBy === "battle") {
          shouldUnlock = true; // Simplified for now
        } else if (entry.unlockedBy === "milestone") {
          shouldUnlock =
            questsCompleted >= (entry.requiredQuestsCompleted || 0) &&
            level >= entry.requiredLevel;
        } else if (entry.unlockedBy === "endgame") {
          shouldUnlock = level >= entry.requiredLevel;
        }
      }

      if (shouldUnlock) {
        this.unlockLore(entry.id);
      }
    });
  }

  unlockLore(loreId) {
    if (!this.unlockedLore.includes(loreId)) {
      this.unlockedLore.push(loreId);
      this.saveLore();

      // Trigger celebration
      const lore = LORE_DATABASE.find((l) => l.id === loreId);
      if (lore) {
        console.log(`📖 Lore Unlocked: ${lore.title}`);
        // Could trigger cinematics here
      }

      return true;
    }
    return false;
  }

  /**
   * Get lore entries filtered by category and unlock status
   */
  getLore(category = "all", onlyUnlocked = false) {
    let entries = LORE_DATABASE;

    if (category !== "all") {
      entries = entries.filter((e) => e.category === category);
    }

    if (onlyUnlocked) {
      entries = entries.filter((e) => this.unlockedLore.includes(e.id));
    }

    return entries;
  }

  /**
   * Get next lore to unlock
   */
  getNextLore(playerStats) {
    const locked = LORE_DATABASE.filter(
      (e) => !this.unlockedLore.includes(e.id)
    );

    const nextLore = locked.find((e) => {
      return (
        playerStats.level >= (e.requiredLevel || 0) - 1 &&
        playerStats.questsCompleted >= (e.requiredQuestsCompleted || 0) - 1
      );
    });

    return nextLore;
  }

  /**
   * Get completion percentage
   */
  getCompletionPercentage() {
    return Math.round((this.unlockedLore.length / LORE_DATABASE.length) * 100);
  }

  /**
   * Get progress by category
   */
  getProgressByCategory() {
    const categories = [...new Set(LORE_DATABASE.map((e) => e.category))];
    const progress = {};

    categories.forEach((cat) => {
      const total = LORE_DATABASE.filter((e) => e.category === cat).length;
      const unlocked = LORE_DATABASE.filter(
        (e) => e.category === cat && this.unlockedLore.includes(e.id)
      ).length;

      progress[cat] = {
        unlocked,
        total,
        percentage: Math.round((unlocked / total) * 100)
      };
    });

    return progress;
  }
}

// Export singleton
export const loreUnlockSystem = new LoreUnlockSystem();
