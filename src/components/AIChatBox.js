import React, { useState, useRef, useEffect } from "react";
import AIChatManager, { getSessionMemory } from "./AIChatManager";
import ResponsiveOverlay, { ResponsiveButton } from "./ResponsiveOverlay.jsx";

export default function AIChatBox({ onClose, playerStats = {} }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I'm your LifeQuest Assistant! Ask me anything — I remember everything and there's no limit to our conversation depth.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Pass player stats for context-aware responses
      const reply = await AIChatManager(input, playerStats);
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I had a moment there. What were we talking about?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveOverlay
      title="💬 AI Assistant"
      onClose={onClose}
      fullScreen={false}
      sidePanel={true}
    >
      {/* Messages container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "16px",
          minHeight: "200px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "12px 16px",
                borderRadius: "12px",
                backgroundColor:
                  msg.sender === "user"
                    ? "rgba(0, 212, 255, 0.2)"
                    : "rgba(100, 150, 200, 0.2)",
                border:
                  msg.sender === "user"
                    ? "1px solid rgba(0, 212, 255, 0.4)"
                    : "1px solid rgba(100, 150, 200, 0.4)",
                color: "#fff",
                fontSize: "14px",
                lineHeight: "1.5",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              padding: "12px 16px",
              color: "#00d4ff",
            }}
          >
            <span>●</span>
            <span>●</span>
            <span>●</span>
            <style>{`
              @keyframes bounce {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
              }
              div > span {
                animation: bounce 0.6s infinite;
              }
              div > span:nth-child(1) { animation-delay: 0s; }
              div > span:nth-child(2) { animation-delay: 0.2s; }
              div > span:nth-child(3) { animation-delay: 0.4s; }
            `}</style>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(0, 212, 255, 0.6)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(0, 212, 255, 0.2)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "12px 20px",
            backgroundColor: "rgba(0, 212, 255, 0.2)",
            border: "1px solid rgba(0, 212, 255, 0.6)",
            borderRadius: "8px",
            color: "#00d4ff",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
            transition: "all 0.3s ease",
            fontSize: "14px",
            minWidth: "60px",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "rgba(0, 212, 255, 0.4)";
              e.target.style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(0, 212, 255, 0.2)";
            e.target.style.boxShadow = "none";
          }}
        >
          Send
        </button>
      </form>

      {/* Session info (optional) */}
      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 212, 255, 0.08)",
          fontSize: "12px",
          color: "rgba(0, 212, 255, 0.7)",
          textAlign: "center",
        }}
      >
        ✨ Our conversation is saved — I remember everything you tell me.
      </div>
    </ResponsiveOverlay>
  );
}
