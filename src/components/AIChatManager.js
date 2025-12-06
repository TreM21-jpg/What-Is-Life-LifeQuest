// ============================================
// ENHANCED AI CHAT MANAGER WITH SESSION MEMORY
// ============================================

// Session Memory Structure
let sessionMemory = {
  conversationHistory: [],
  userProfile: {
    name: null,
    currentStage: null,
    recentQuests: [],
    preferences: {},
  },
  contextState: {
    lastTopic: null,
    emotionalTone: null,
    engagementLevel: 0,
  },
  deepReasoningLog: [],
};

// ============================================
// EXTENDED REPLY LIBRARY WITH INSPIRATIONAL QUOTES
// ============================================

const extendedReplyLibrary = {
  greeting: [
    "Hey there! How's your adventure going?",
    "Welcome back, adventurer! Ready to grow?",
    "Great to see you! What's on your mind?",
    "Hey! Excited to help you on your journey! 🌟",
  ],
  encouragement: [
    "Susan Jeffers said: 'The only way to get rid of the fear of doing something is to go out and do it.' You've got this! 💪",
    "Steph Dallmann reminds us: 'Your struggles are not a sign of weakness, but of strength. Keep pushing forward!'",
    "Marilyn Monroe: 'If you're going to be two-faced at least make one of them pretty.' Be authentically YOU! ✨",
    "Rob Glover: 'Success is the sum of small efforts repeated day in and day out.' Every step matters! 🎯",
    "You're stronger than you think. Every challenge is an opportunity to level up! 🚀",
  ],
  reflection: [
    "That's a great question! Let me think about that...",
    "Interesting point — what made you ask that?",
    "I like where you're going with this!",
    "Could you explain a bit more about what you mean?",
    "Sounds deep — let's explore that idea.",
  ],
  support: [
    "I'm here for you, no matter what.",
    "You're doing better than you realize.",
    "Remember: progress over perfection! 🌱",
    "Every day is a chance to become your best self.",
    "You've overcome challenges before. You can do it again!",
  ],
  questHelp: [
    "Quest getting tough? Remember, every quest is a chance to learn something new!",
    "Stuck on a quest? Try looking at it from a different angle.",
    "Quest rewards are coming! Keep pushing forward! 🎁",
  ],
  itemInfo: [
    "That item sounds powerful! What will you use it for?",
    "Great find! Equipment matters, but your determination matters more.",
    "Nice pickup! How's it helping your game?",
  ],
  farewell: [
    "See you soon! Keep leveling up 💪",
    "Take care out there, adventurer!",
    "Until next time—keep growing! 🌟",
    "Goodbye! Remember: you're unstoppable! 🚀",
  ],
};

// ============================================
// DEEP REASONING TEMPLATES
// ============================================

const deepReasoningTemplates = {
  emotionalSupport: "How is the user feeling? What emotional need might they have?",
  progressTracking: "What progress has the user made? How can we celebrate it?",
  motivationAnalysis: "What motivates this user? How can we encourage them?",
  contextAwareness: "What's happening in their game? How can we give relevant advice?",
  relationshipBuilding: "How can we deepen our connection with the user?",
};

// ============================================
// SESSION MEMORY FUNCTIONS
// ============================================

/**
 * Get the current session memory
 */
export function getSessionMemory() {
  return sessionMemory;
}

/**
 * Clear the session memory (useful on logout or new session)
 */
export function clearSessionMemory() {
  sessionMemory = {
    conversationHistory: [],
    userProfile: {
      name: null,
      currentStage: null,
      recentQuests: [],
      preferences: {},
    },
    contextState: {
      lastTopic: null,
      emotionalTone: null,
      engagementLevel: 0,
    },
    deepReasoningLog: [],
  };
}

/**
 * Update session context based on game state
 */
export function updateSessionContext(contextData) {
  if (contextData.currentStage) {
    sessionMemory.userProfile.currentStage = contextData.currentStage;
  }
  if (contextData.emotionalTone) {
    sessionMemory.contextState.emotionalTone = contextData.emotionalTone;
  }
  if (contextData.recentQuestName) {
    sessionMemory.userProfile.recentQuests.push(contextData.recentQuestName);
    // Keep only last 5 quests
    if (sessionMemory.userProfile.recentQuests.length > 5) {
      sessionMemory.userProfile.recentQuests.shift();
    }
  }
}

/**
 * Add reasoning step to deep reasoning log
 */
function logReasoningStep(template, analysis) {
  sessionMemory.deepReasoningLog.push({
    timestamp: new Date().toISOString(),
    template,
    analysis,
  });
  // Keep only last 20 reasoning steps
  if (sessionMemory.deepReasoningLog.length > 20) {
    sessionMemory.deepReasoningLog.shift();
  }
}

/**
 * Get contextually relevant reply based on user input and history
 */
function getContextualReply(userInput, replyType) {
  const replies = extendedReplyLibrary[replyType] || extendedReplyLibrary.reflection;
  // Use engagement level to vary responses
  const index = (sessionMemory.contextState.engagementLevel + Math.random() * 10) % replies.length;
  return replies[Math.floor(index)];
}

// ============================================
// MAIN AI CHAT MANAGER FUNCTION
// ============================================

/**
 * Main AI Chat Manager with session memory and deep reasoning
 */
export default async function AIChatManager(userInput) {
  // Add to conversation history
  sessionMemory.conversationHistory.push({
    role: "user",
    content: userInput,
    timestamp: new Date().toISOString(),
  });

  // Keep history manageable (last 50 messages)
  if (sessionMemory.conversationHistory.length > 50) {
    sessionMemory.conversationHistory.shift();
  }

  // Increase engagement level
  sessionMemory.contextState.engagementLevel = Math.min(
    sessionMemory.contextState.engagementLevel + 1,
    10
  );

  // ============================================
  // INTENT DETECTION WITH CONTEXT AWARENESS
  // ============================================

  // Greeting intents
  if (/hello|hi|hey/i.test(userInput)) {
    logReasoningStep("greeting_intent", "User is saying hello");
    const reply = getContextualReply(userInput, "greeting");
    sessionMemory.contextState.lastTopic = "greeting";
    return reply;
  }

  // Identity/Who are you
  if (/who are you|what are you|tell me about yourself/i.test(userInput)) {
    logReasoningStep("identity_intent", "User asking about AI identity");
    const reply =
      "I'm your AI companion, here to guide you through LifeQuest! 🌍 I learn from our conversations and am here to support your growth.";
    sessionMemory.contextState.lastTopic = "identity";
    return reply;
  }

  // Help request
  if (/help|need help|what can you do/i.test(userInput)) {
    logReasoningStep("help_intent", "User requesting help");
    const reply =
      "Sure! You can ask me about quests, items, tips for any stage, strategies, encouragement, or just chat. What would help you most right now?";
    sessionMemory.contextState.lastTopic = "help";
    return reply;
  }

  // Goodbye/Farewell
  if (/bye|goodbye|see you|farewell/i.test(userInput)) {
    logReasoningStep("farewell_intent", "User saying goodbye");
    const reply = getContextualReply(userInput, "farewell");
    sessionMemory.contextState.lastTopic = "farewell";
    // Could trigger save here
    return reply;
  }

  // Quest-related
  if (/quest|challenge|objective|mission/i.test(userInput)) {
    logReasoningStep("quest_intent", "User asking about quests/challenges");
    sessionMemory.contextState.lastTopic = "quest";
    return getContextualReply(userInput, "questHelp");
  }

  // Item-related
  if (/item|equipment|gear|loot|weapon|armor|inventory/i.test(userInput)) {
    logReasoningStep("item_intent", "User asking about items/equipment");
    sessionMemory.contextState.lastTopic = "item";
    return getContextualReply(userInput, "itemInfo");
  }

  // Emotional/Support seeking
  if (/hard|difficult|struggling|stuck|frustrated|sad|angry|tired/i.test(userInput)) {
    logReasoningStep("emotional_intent", "User expressing negative emotions - provide support");
    sessionMemory.contextState.lastTopic = "emotional";
    sessionMemory.contextState.emotionalTone = "supportive";
    return getContextualReply(userInput, "encouragement");
  }

  // Motivation/Inspiration seeking
  if (/inspire|motivate|quote|strength|believe|confidence|courage/i.test(userInput)) {
    logReasoningStep("motivation_intent", "User seeking motivation/inspiration");
    sessionMemory.contextState.lastTopic = "motivation";
    return getContextualReply(userInput, "encouragement");
  }

  // ============================================
  // MULTI-TURN CONVERSATION CONTEXT
  // ============================================

  // If we have conversation history, use it for context
  if (sessionMemory.conversationHistory.length > 1) {
    const recentContext = sessionMemory.conversationHistory.slice(-3);
    logReasoningStep(
      "context_awareness",
      `Multi-turn conversation detected. Recent context: ${recentContext.map((m) => m.content).join(" | ")}`
    );
  }

  // ============================================
  // DEFAULT RESPONSE STRATEGY
  // ============================================

  // Default: provide encouraging, thoughtful response
  const defaultResponses = [
    "That's something to think about! Tell me more—I'm here to listen.",
    "Interesting! How is that affecting your journey?",
    "I hear you. What would help you move forward?",
    getContextualReply(userInput, "encouragement"),
    "Every conversation helps you grow. Let's keep talking! 🌱",
  ];

  const reply = defaultResponses[sessionMemory.conversationHistory.length % defaultResponses.length];
  sessionMemory.contextState.lastTopic = "general";

  // Add AI response to history
  sessionMemory.conversationHistory.push({
    role: "assistant",
    content: reply,
    timestamp: new Date().toISOString(),
  });

  return reply;
}
