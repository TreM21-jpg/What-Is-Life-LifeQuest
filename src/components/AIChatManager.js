const sampleReplies = [
  "That’s a great question! Let me think about that...",
  "Interesting point — what made you ask that?",
  "I like where you’re going with this!",
  "Could you explain a bit more about what you mean?",
  "Sounds deep — let’s explore that idea.",
];

let memory = [];

export default async function AIChatManager(userInput) {
  // Add user input to memory
  memory.push(userInput);

  // Simple intent detection (expandable)
  if (/hello|hi|hey/i.test(userInput)) return "Hey there! How’s your adventure going?";
  if (/who are you/i.test(userInput)) return "I'm your AI companion, here to guide you through LifeQuest 🌍";
  if (/help/i.test(userInput)) return "Sure! You can ask about quests, items, or tips about any stage.";
  if (/bye|goodbye/i.test(userInput)) return "See you soon! Keep leveling up 💪";

  // Avoid repetition
  const reply = sampleReplies[memory.length % sampleReplies.length];

  return reply;
}
