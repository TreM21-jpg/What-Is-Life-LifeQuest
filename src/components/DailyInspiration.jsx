/**
 * Daily Inspiration Tile – Shows motivational quote in the Hub
 * Updates visually with neon styling and celebrates the player's journey
 */

import React, { useState, useEffect } from "react";
import { getRandomQuote } from "./InspiringQuotes";

export default function DailyInspiration() {
  const [quote, setQuote] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const selectedQuote = getRandomQuote();
    setQuote(selectedQuote);
  }, []);

  const handleRefresh = () => {
    const selectedQuote = getRandomQuote();
    setQuote(selectedQuote);
    setRefreshCount((prev) => prev + 1);
  };

  if (!quote) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 102, 0.05))",
        border: "2px solid",
        borderImage: "linear-gradient(135deg, #00d4ff, #ff0066) 1",
        borderRadius: "16px",
        padding: "24px",
        maxWidth: "500px",
        margin: "20px auto",
        textAlign: "center",
        boxShadow: "0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)",
        transition: "all 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 40px rgba(0, 212, 255, 0.4), inset 0 0 30px rgba(0, 212, 255, 0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>{quote.icon}</div>

      {/* Title */}
      <h2
        style={{
          color: "#00d4ff",
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "2px",
          margin: "0 0 16px 0",
          opacity: 0.8,
        }}
      >
        Daily Inspiration
      </h2>

      {/* Quote text */}
      <blockquote
        style={{
          margin: "0 0 16px 0",
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "1.6",
          background: "linear-gradient(135deg, #00d4ff, #0099ff)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontStyle: "italic",
        }}
      >
        "{quote.text}"
      </blockquote>

      {/* Author */}
      <p
        style={{
          margin: "0 0 16px 0",
          fontSize: "14px",
          color: "#0099ff",
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        — {quote.author}
      </p>

      {/* Refresh button */}
      <button
        onClick={handleRefresh}
        style={{
          padding: "10px 20px",
          backgroundColor: "rgba(0, 212, 255, 0.2)",
          border: "1px solid rgba(0, 212, 255, 0.5)",
          borderRadius: "8px",
          color: "#00d4ff",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "13px",
          transition: "all 0.3s ease",
          minHeight: "40px",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgba(0, 212, 255, 0.4)";
          e.target.style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "rgba(0, 212, 255, 0.2)";
          e.target.style.boxShadow = "none";
        }}
      >
        ✨ Inspire Me Again
      </button>

      {/* Refresh count indicator */}
      {refreshCount > 0 && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "rgba(0, 212, 255, 0.6)",
            fontStyle: "italic",
          }}
        >
          You've been inspired {refreshCount} times today 🌟
        </p>
      )}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          div {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
