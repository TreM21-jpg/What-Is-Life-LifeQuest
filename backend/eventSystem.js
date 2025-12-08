/**
 * Monthly Event System
 * Handles seasonal/monthly events that rotate throughout the year
 * Each event has special rewards, challenges, and themes
 */

const EventSystem = {
  // Define events by month (0-indexed, 0 = January)
  monthlyEvents: [
    {
      month: 0, // January
      name: "New Year's Quest",
      theme: "renewal",
      description: "Begin your journey anew with double XP",
      rewards: { xpMultiplier: 2, coins: 500 },
      questBonus: "New Year Blessing",
      icon: "🎆"
    },
    {
      month: 1, // February
      name: "Love's Challenge",
      theme: "compassion",
      description: "Help others and earn heart tokens",
      rewards: { heartTokens: 200, coins: 400 },
      questBonus: "Compassion's Gift",
      icon: "❤️"
    },
    {
      month: 2, // March
      name: "Spring Awakening",
      theme: "growth",
      description: "Plants grow, so do you! Bonus skill XP",
      rewards: { skillXpMultiplier: 1.5, coins: 450 },
      questBonus: "Growth Spurt",
      icon: "🌱"
    },
    {
      month: 3, // April
      name: "Fool's Gold",
      theme: "trickery",
      description: "Riddles and puzzles for extra rewards",
      rewards: { coins: 600, riddlePasses: 3 },
      questBonus: "Trickster's Luck",
      icon: "🃏"
    },
    {
      month: 4, // May
      name: "Harvest Moon",
      theme: "abundance",
      description: "Abundance flows! Rare items drop more often",
      rewards: { rarityBoost: 0.25, coins: 500 },
      questBonus: "Harvest Blessing",
      icon: "🌾"
    },
    {
      month: 5, // June
      name: "Summer Festival",
      theme: "celebration",
      description: "Celebrate with friends and special cosmetics",
      rewards: { coins: 700, cosmetics: ["SummerHat", "BeachArmor"] },
      questBonus: "Festival Spirit",
      icon: "🎉"
    },
    {
      month: 6, // July
      name: "Dragon's Ascent",
      theme: "power",
      description: "Face powerful foes and claim legendary rewards",
      rewards: { coins: 800, powerBoost: 0.2 },
      questBonus: "Dragon's Blessing",
      icon: "🐉"
    },
    {
      month: 7, // August
      name: "Twilight's Mystery",
      theme: "mystery",
      description: "Unlock hidden secrets and ancient lore",
      rewards: { coins: 550, loreUnlocks: 5 },
      questBonus: "Lore Keeper's Gift",
      icon: "🌙"
    },
    {
      month: 8, // September
      name: "Autumn Trials",
      theme: "endurance",
      description: "Tests of endurance grant superior rewards",
      rewards: { coins: 600, enduranceBoost: 1.3 },
      questBonus: "Endurance's Reward",
      icon: "🍂"
    },
    {
      month: 9, // October
      name: "Spooky Spirits",
      theme: "Halloween",
      description: "Haunted quests and creepy cosmetics await",
      rewards: { coins: 650, cosmetics: ["PumpkinMask", "GhostCloak"], specialRewards: "SpookyChest" },
      questBonus: "Spirit's Favor",
      icon: "👻"
    },
    {
      month: 10, // November
      name: "Gratitude's Bounty",
      theme: "gratitude",
      description: "Share and receive! Bonus rewards for team play",
      rewards: { coins: 700, teamBonus: 1.5 },
      questBonus: "Gratitude's Blessing",
      icon: "🦃"
    },
    {
      month: 11, // December
      name: "Winter's Gift",
      theme: "winter",
      description: "Festive cheer and legendary holiday items",
      rewards: { coins: 900, cosmetics: ["SantaHat", "SnowArmor"], holidayChest: 3 },
      questBonus: "Winter's Magic",
      icon: "🎄"
    }
  ],

  // Get current month's event
  getCurrentEvent() {
    const now = new Date();
    const currentMonth = now.getMonth();
    return this.monthlyEvents.find(e => e.month === currentMonth) || this.monthlyEvents[0];
  },

  // Get event by month number
  getEventByMonth(month) {
    return this.monthlyEvents.find(e => e.month === month) || null;
  },

  // Get upcoming events (next 3 months)
  getUpcomingEvents(count = 3) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const upcoming = [];

    for (let i = 0; i < count; i++) {
      const month = (currentMonth + i + 1) % 12;
      const event = this.monthlyEvents.find(e => e.month === month);
      if (event) upcoming.push(event);
    }
    return upcoming;
  },

  // Apply event rewards to player
  applyEventRewards(player, event) {
    if (!player.eventRewards) player.eventRewards = {};

    if (event.rewards.xpMultiplier) {
      player.eventRewards.xpMultiplier = event.rewards.xpMultiplier;
    }
    if (event.rewards.skillXpMultiplier) {
      player.eventRewards.skillXpMultiplier = event.rewards.skillXpMultiplier;
    }
    if (event.rewards.coins) {
      player.coins = (player.coins || 0) + event.rewards.coins;
    }
    if (event.rewards.cosmetics) {
      player.cosmetics = player.cosmetics || [];
      event.rewards.cosmetics.forEach(c => {
        if (!player.cosmetics.includes(c)) player.cosmetics.push(c);
      });
    }

    player.currentEvent = event.name;
    player.eventExpiry = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime();

    return player;
  },

  // Check if event is active and refresh if expired
  refreshEventStatus(player) {
    const now = Date.now();
    if (!player.eventExpiry || now > player.eventExpiry) {
      const event = this.getCurrentEvent();
      return this.applyEventRewards(player, event);
    }
    return player;
  }
};

module.exports = EventSystem;
