import React, { useState } from "react";

export default function AIChat({ player, quests, setQuests }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Simple intelligent response system
  const generateResponse = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      return `Hey ${player.name || "traveler"}! Welcome to LifeQuest. What do you want to achieve today?`;
    }
    if (lower.includes("quest") || lower.includes("mission")) {
      const newQuest = `Quest: ${player.stage} Level Challenge - Learn something new today and apply it in real life.`;
      setQuests([...quests, newQuest]);
      return "I’ve added a new quest for you! Check your active quests below.";
    }
    if (lower.includes("advice")) {
      return "Remember: growth takes time. Stay consistent and celebrate small wins.";
    }
    if (lower.includes("help")) {
      return "You can ask me for quests, real-life advice, or talk about your goals.";
    }
    return "Interesting... tell me more.";
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMsg = { sender: "user", text: input };
    const aiResponse = { sender: "ai", text: generateResponse(input) };
    setMessages([...messages, userMsg, aiResponse]);
    setInput("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-2">AI Chat Assistant</h3>
      <div className="h-48 overflow-y-auto border p-2 rounded mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 mb-1 rounded ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to your AI companion..."
          className="flex-1 border rounded p-2"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
