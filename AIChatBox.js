import React, { useState } from "react";
import AIChatManager from "./AIChatManager";

export default function AIChatBox({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello 👋 I'm your LifeQuest Assistant! Ask me anything." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    const reply = await AIChatManager(input);
    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div className="absolute bottom-6 right-6 bg-gray-800 text-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900 rounded-t-2xl">
        <h2 className="text-lg font-semibold">AI Assistant 🤖</h2>
        <button onClick={onClose} className="text-red-400 hover:text-red-600">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-600 self-end text-right"
                : "bg-gray-700 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex border-t border-gray-700">
        <input
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
