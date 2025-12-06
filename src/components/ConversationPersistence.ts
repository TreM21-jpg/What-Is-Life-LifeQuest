/**
 * Conversation Persistence – Save & restore AIChat session history
 * Enables long-term conversation context across multiple play sessions
 */

const CONVERSATION_STORAGE_KEY = "lifequest_conversation_history";
const SESSION_METADATA_KEY = "lifequest_session_metadata";

export interface ConversationMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
  context?: {
    playerLevel?: number;
    questCompleted?: string;
    mood?: string;
  };
}

export interface SessionMetadata {
  sessionId: string;
  startTime: number;
  endTime?: number;
  messageCount: number;
  topic?: string;
  playerStats?: any;
}

/**
 * Save a message to conversation history
 */
export function saveMessage(message: ConversationMessage): void {
  const history = getConversationHistory();
  message.id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  message.timestamp = Date.now();
  history.push(message);

  // Keep last 500 messages to prevent storage bloat
  if (history.length > 500) {
    history.splice(0, history.length - 500);
  }

  localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(history));
}

/**
 * Get full conversation history
 */
export function getConversationHistory(): ConversationMessage[] {
  const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get conversation excerpt (last N messages for context)
 */
export function getConversationExcerpt(count: number = 10): ConversationMessage[] {
  const history = getConversationHistory();
  return history.slice(Math.max(0, history.length - count));
}

/**
 * Get conversation summary for context injection into AI
 */
export function getConversationSummary(): string {
  const history = getConversationHistory();
  if (history.length === 0) return "";

  const recent = history.slice(-5);
  return recent
    .map((msg) => `${msg.sender === "user" ? "You" : "AI"}: ${msg.text}`)
    .join("\n");
}

/**
 * Search conversation history
 */
export function searchConversation(query: string): ConversationMessage[] {
  const history = getConversationHistory();
  const lowerQuery = query.toLowerCase();
  return history.filter(
    (msg) =>
      msg.text.toLowerCase().includes(lowerQuery) ||
      msg.sender.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Create new session
 */
export function startSession(playerStats?: any): SessionMetadata {
  const session: SessionMetadata = {
    sessionId: `session_${Date.now()}`,
    startTime: Date.now(),
    messageCount: 0,
    playerStats,
  };

  localStorage.setItem(SESSION_METADATA_KEY, JSON.stringify(session));
  return session;
}

/**
 * End current session
 */
export function endSession(): SessionMetadata | null {
  const stored = localStorage.getItem(SESSION_METADATA_KEY);
  if (!stored) return null;

  const session: SessionMetadata = JSON.parse(stored);
  session.endTime = Date.now();
  session.messageCount = getConversationHistory().length;

  localStorage.setItem(SESSION_METADATA_KEY, JSON.stringify(session));
  return session;
}

/**
 * Get current session
 */
export function getCurrentSession(): SessionMetadata | null {
  const stored = localStorage.getItem(SESSION_METADATA_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Clear all conversation history (destructive)
 */
export function clearConversationHistory(): void {
  localStorage.removeItem(CONVERSATION_STORAGE_KEY);
}

/**
 * Export conversation as JSON
 */
export function exportConversation(): string {
  const history = getConversationHistory();
  const session = getCurrentSession();
  return JSON.stringify(
    {
      session,
      conversation: history,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

/**
 * Get conversation statistics
 */
export function getConversationStats() {
  const history = getConversationHistory();
  const userMessages = history.filter((m) => m.sender === "user");
  const aiMessages = history.filter((m) => m.sender === "ai");

  return {
    totalMessages: history.length,
    userMessages: userMessages.length,
    aiMessages: aiMessages.length,
    averageUserMessageLength:
      userMessages.length > 0
        ? userMessages.reduce((sum, m) => sum + m.text.length, 0) /
          userMessages.length
        : 0,
    averageAIMessageLength:
      aiMessages.length > 0
        ? aiMessages.reduce((sum, m) => sum + m.text.length, 0) /
          aiMessages.length
        : 0,
    longestConversationGap: calculateLongestGap(history),
  };
}

/**
 * Helper: calculate longest gap between messages
 */
function calculateLongestGap(history: ConversationMessage[]): number {
  if (history.length < 2) return 0;
  let maxGap = 0;
  for (let i = 1; i < history.length; i++) {
    const gap = history[i].timestamp - history[i - 1].timestamp;
    maxGap = Math.max(maxGap, gap);
  }
  return maxGap;
}
