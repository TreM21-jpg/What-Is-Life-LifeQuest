/**
 * Inspiring Quotes System for LifeQuest
 * Displays motivational quotes to encourage players during gameplay.
 * Features quotes from Susan Jeffers, Steph Dallmann, Marilyn Monroe, Rob Glover, and Autumn Bronson.
 */

const quotesByCategory = {
  courage: [
    {
      text: "Feel the fear and do it anyway",
      author: "Susan Jeffers",
      icon: "💪",
    },
    {
      text: "Always, always, always believe in yourself. Because if you don't, then who will?",
      author: "Marilyn Monroe",
      icon: "✨",
    },
    {
      text: "You gain strength, courage, and confidence by every experience in which you stop to look fear in the face.",
      author: "Eleanor Roosevelt",
      icon: "🔥",
    },
  ],
  learning: [
    {
      text: "Technology is a tool, not a destination. Master the fundamentals, stay curious, and use tech to solve real problems—because progress comes from purpose, not just gadgets.",
      author: "Steph Dallmann",
      icon: "🧠",
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      icon: "🎯",
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      icon: "📚",
    },
  ],
  perseverance: [
    {
      text: "The only way out is through.",
      author: "Robert Frost",
      icon: "🚀",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      icon: "🏆",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
      icon: "⏰",
    },
  ],
  purpose: [
    {
      text: "Use tech to solve real problems—because progress comes from purpose, not just gadgets.",
      author: "Rob Glover",
      icon: "🌟",
    },
    {
      text: "The purpose of our lives is to be happy.",
      author: "Dalai Lama",
      icon: "😊",
    },
    {
      text: "Find your purpose and pursue it with everything you have.",
      author: "Autumn Bronson",
      icon: "🎪",
    },
  ],
  growth: [
    {
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne",
      icon: "🌱",
    },
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Keller",
      icon: "🌳",
    },
    {
      text: "Your potential is endless. Keep pushing.",
      author: "Unknown",
      icon: "⭐",
    },
  ],
  teamwork: [
    {
      text: "Alone we can do so little; together we can do so much.",
      author: "Helen Keller",
      icon: "🤝",
    },
    {
      text: "Great things never come from comfort zones.",
      author: "Unknown",
      icon: "🌈",
    },
  ],
};

/**
 * Get a random quote from a specific category
 */
export function getQuoteByCategory(category = "courage") {
  const quotes = quotesByCategory[category] || quotesByCategory.courage;
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/**
 * Get a completely random quote from all categories
 */
export function getRandomQuote() {
  const allQuotes = Object.values(quotesByCategory).flat();
  return allQuotes[Math.floor(Math.random() * allQuotes.length)];
}

/**
 * Get a motivational quote based on player context
 * @param {string} context - 'stuck', 'winning', 'learning', 'struggling', 'exploring'
 */
export function getContextualQuote(context = "winning") {
  const contextMap = {
    stuck: "perseverance",
    winning: "growth",
    learning: "learning",
    struggling: "courage",
    exploring: "purpose",
    levelup: "growth",
    defeat: "perseverance",
    achievement: "teamwork",
  };

  const category = contextMap[context] || "courage";
  return getQuoteByCategory(category);
}

/**
 * Get a batch of quotes for a quote wall or inspirational screen
 */
export function getQuoteBatch(count = 5) {
  const allQuotes = Object.values(quotesByCategory).flat();
  const shuffled = [...allQuotes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get all quotes organized by category
 */
export function getAllQuotes() {
  return quotesByCategory;
}

/**
 * Get quotes from specific authors
 */
export function getQuotesByAuthor(author) {
  const allQuotes = Object.values(quotesByCategory).flat();
  return allQuotes.filter((q) => q.author === author);
}
