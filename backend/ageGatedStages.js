/**
 * Age-Gated Stage Progression System
 * Players progress through stages based on their age bracket
 * Ensures age-appropriate content and challenges
 */

const AgeGatedStages = {
  // Define age brackets and their corresponding stages
  ageBrackets: [
    {
      name: "Littles",
      minAge: 4,
      maxAge: 6,
      color: "#FFB6C1",
      stages: [
        {
          id: "elementary_intro",
          name: "Forest of Beginnings",
          difficulty: 1,
          description: "A peaceful place to meet your first friends",
          theme: "gentle",
          challenges: [
            { type: "talk_to_character", target: "Sage", reward: 10 },
            { type: "collect_item", item: "fruit", count: 5, reward: 20 }
          ],
          contentRating: "G",
          estimatedDuration: "10-15 min"
        }
      ]
    },
    {
      name: "Elementary",
      minAge: 7,
      maxAge: 9,
      color: "#87CEEB",
      stages: [
        {
          id: "elementary_stage_1",
          name: "Forest of Beginnings",
          difficulty: 1,
          description: "Explore and learn the basics of your journey",
          theme: "discovery",
          challenges: [
            { type: "defeat_enemy", enemyType: "slime", count: 3, reward: 50 },
            { type: "complete_quest", questName: "Help the Lost", reward: 100 }
          ],
          contentRating: "G",
          estimatedDuration: "20-30 min"
        },
        {
          id: "elementary_stage_2",
          name: "Mountain of Trials",
          difficulty: 2,
          description: "Test your skills and discover your strengths",
          theme: "challenge",
          challenges: [
            { type: "defeat_enemy", enemyType: "goblin", count: 5, reward: 75 },
            { type: "solve_puzzle", puzzleType: "logic", count: 2, reward: 100 }
          ],
          contentRating: "PG",
          estimatedDuration: "30-45 min"
        }
      ]
    },
    {
      name: "Middle School",
      minAge: 10,
      maxAge: 12,
      color: "#90EE90",
      stages: [
        {
          id: "middle_stage_1",
          name: "Forest of Discovery",
          difficulty: 2,
          description: "Uncover secrets and build your character",
          theme: "growth",
          challenges: [
            { type: "defeat_enemy", enemyType: "goblin", count: 8, reward: 150 },
            { type: "complete_faction_quest", factionName: "Order of Life", reward: 200 }
          ],
          contentRating: "PG",
          estimatedDuration: "30-45 min"
        },
        {
          id: "middle_stage_2",
          name: "Mountain of Trials",
          difficulty: 3,
          description: "Push your limits and prove your worth",
          theme: "perseverance",
          challenges: [
            { type: "boss_battle", bossName: "Shadow Guardian", reward: 300 },
            { type: "complete_daily_challenges", count: 5, reward: 100 }
          ],
          contentRating: "PG-13",
          estimatedDuration: "45-60 min"
        },
        {
          id: "middle_stage_3",
          name: "The Abyss",
          difficulty: 4,
          description: "Face darkness and emerge stronger",
          theme: "courage",
          challenges: [
            { type: "defeat_enemy", enemyType: "shadow_creature", count: 10, reward: 250 },
            { type: "unlock_lore", loreCategory: "History", count: 3, reward: 150 }
          ],
          contentRating: "PG-13",
          estimatedDuration: "60-90 min"
        }
      ]
    },
    {
      name: "High School",
      minAge: 13,
      maxAge: 17,
      color: "#FFD700",
      stages: [
        {
          id: "highschool_stage_1",
          name: "The Crossroads",
          difficulty: 3,
          description: "Choose your path and define your destiny",
          theme: "choice",
          challenges: [
            { type: "faction_choice", factions: ["Order of Life", "Seekers Guild"], reward: 200 },
            { type: "skill_specialization", specializations: 3, reward: 150 }
          ],
          contentRating: "PG-13",
          estimatedDuration: "45-60 min"
        },
        {
          id: "highschool_stage_2",
          name: "Mountain of Trials",
          difficulty: 4,
          description: "Master your chosen path",
          theme: "mastery",
          challenges: [
            { type: "boss_battle", bossName: "The Light", reward: 400 },
            { type: "complete_synergy_combos", count: 10, reward: 200 }
          ],
          contentRating: "PG-13",
          estimatedDuration: "60-90 min"
        },
        {
          id: "highschool_stage_3",
          name: "The Abyss",
          difficulty: 5,
          description: "Confront the deepest truths",
          theme: "reflection",
          challenges: [
            { type: "defeat_enemy", enemyType: "shadow_boss", count: 1, reward: 500 },
            { type: "unlock_all_lore", loreCategory: "Characters", reward: 300 }
          ],
          contentRating: "PG-13",
          estimatedDuration: "90-120 min"
        },
        {
          id: "highschool_stage_4",
          name: "Sanctuary of Truth",
          difficulty: 6,
          description: "Reach enlightenment and answer the ultimate question",
          theme: "wisdom",
          challenges: [
            { type: "final_boss", bossName: "The Truth Guardian", reward: 1000 },
            { type: "unlock_ending", endingType: "true", reward: 500 }
          ],
          contentRating: "PG-13",
          estimatedDuration: "120-150 min"
        }
      ]
    },
    {
      name: "Adult",
      minAge: 18,
      maxAge: 120,
      color: "#FF69B4",
      stages: [
        {
          id: "adult_stage_1",
          name: "The Crossroads Revisited",
          difficulty: 4,
          description: "Reflect on your path and make meaningful choices",
          theme: "reflection",
          challenges: [
            { type: "faction_deep_dive", factionName: "any", reward: 250 },
            { type: "mentor_players", menteeCount: 3, reward: 200 }
          ],
          contentRating: "R",
          estimatedDuration: "60-90 min"
        },
        {
          id: "adult_stage_2",
          name: "The Abyss Deep",
          difficulty: 5,
          description: "Explore philosophical questions at depth",
          theme: "philosophy",
          challenges: [
            { type: "philosophical_choice", complexity: "high", reward: 400 },
            { type: "unlock_secret_lore", count: 5, reward: 300 }
          ],
          contentRating: "R",
          estimatedDuration: "90-120 min"
        },
        {
          id: "adult_stage_3",
          name: "Sanctuary of Truth - Ultimate",
          difficulty: 6,
          description: "Achieve true enlightenment through multiple playthroughs",
          theme: "transcendence",
          challenges: [
            { type: "final_boss_plus", variant: "nightmare", reward: 2000 },
            { type: "unlock_ng_plus", newGamePlus: true, reward: 1000 }
          ],
          contentRating: "R",
          estimatedDuration: "150-200 min"
        }
      ]
    }
  ],

  // Get age bracket for player
  getAgeBracket(playerAge) {
    return this.ageBrackets.find(bracket =>
      playerAge >= bracket.minAge && playerAge <= bracket.maxAge
    ) || null;
  },

  // Get all stages for player's age bracket
  getAccessibleStages(playerAge) {
    const bracket = this.getAgeBracket(playerAge);
    if (!bracket) return [];
    return bracket.stages;
  },

  // Get stage details
  getStageDetails(stageId, playerAge) {
    const bracket = this.getAgeBracket(playerAge);
    if (!bracket) return null;
    return bracket.stages.find(s => s.id === stageId) || null;
  },

  // Check if player can access stage based on age and progression
  canAccessStage(playerAge, stageId, playerProgress = []) {
    const stage = this.getStageDetails(stageId, playerAge);
    if (!stage) return false;

    // Get stage index
    const bracket = this.getAgeBracket(playerAge);
    const stageIndex = bracket.stages.findIndex(s => s.id === stageId);

    // First stage is always accessible
    if (stageIndex === 0) return true;

    // Otherwise, check if previous stage is completed
    const prevStage = bracket.stages[stageIndex - 1];
    return playerProgress.includes(prevStage.id);
  },

  // Get recommended stage for player level
  getRecommendedStage(playerAge, playerLevel) {
    const bracket = this.getAgeBracket(playerAge);
    if (!bracket) return null;

    // Find stage with difficulty closest to player level
    const recommended = bracket.stages.reduce((closest, stage) => {
      const stageDiffDiff = Math.abs(stage.difficulty - playerLevel);
      const closestDiffDiff = Math.abs(closest.difficulty - playerLevel);
      return stageDiffDiff < closestDiffDiff ? stage : closest;
    });

    return recommended;
  },

  // Get all age brackets for admin dashboard
  getAllBrackets() {
    return this.ageBrackets.map(bracket => ({
      name: bracket.name,
      ageRange: `${bracket.minAge}-${bracket.maxAge}`,
      color: bracket.color,
      stageCount: bracket.stages.length
    }));
  }
};

module.exports = AgeGatedStages;
