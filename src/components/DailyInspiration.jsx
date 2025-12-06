/**
 * Daily Inspiration Tile – Shows motivational quote in the Hub
 * Updates visually with neon styling and celebrates the player's journey
 * Now includes streak tracking and achievement milestones
 */

import React, { useState, useEffect } from "react";
import { getRandomQuote } from "./InspiringQuotes";
import { recordInspiration, getStreakData, getStreakMilestone, getStreakMessage } from "./StreakTracker.ts";
import { triggerFeedback } from "./HapticAudioFeedback";

export default function DailyInspiration() {
  const [quote, setQuote] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [streakData, setStreakData] = useState(null);
  const [newMilestone, setNewMilestone] = useState(false);

  useEffect(() => {
    const selectedQuote = getRandomQuote();
    setQuote(selectedQuote);

    // Record inspiration and get streak data
    const streak = recordInspiration();
    setStreakData(streak);

    // Check if this is a new milestone
    const milestones = [1, 3, 7, 14, 30, 50, 100];
    if (milestones.includes(streak.currentStreak)) {
      setNewMilestone(true);
      triggerFeedback("achievement");
    }
  }, []);

  const handleRefresh = () => {
    const selectedQuote = getRandomQuote();
    setQuote(selectedQuote);
    setRefreshCount((prev) => prev + 1);
    triggerFeedback("button");
  };

  if (!quote || !streakData) return null;

  const milestone = getStreakMilestone(streakData.currentStreak);
  const streakMessage = getStreakMessage(streakData.currentStreak);

  return (
    <div
      style={{
        background: newMilestone 
          ? "linear-gradient(135deg, rgba(255, 0, 102, 0.15), rgba(0, 212, 255, 0.15))"
          : "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 102, 0.05))",
        border: "2px solid",
        borderImage: "linear-gradient(135deg, #00d4ff, #ff0066) 1",
        borderRadius: "16px",
        padding: "24px",
        maxWidth: "500px",
        margin: "20px auto",
        textAlign: "center",
        boxShadow: newMilestone
          ? "0 0 40px rgba(255, 0, 102, 0.3), inset 0 0 20px rgba(255, 0, 102, 0.1)"
          : "0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)",
        transition: "all 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = newMilestone
          ? "0 0 50px rgba(255, 0, 102, 0.4), inset 0 0 30px rgba(255, 0, 102, 0.15)"
          : "0 0 40px rgba(0, 212, 255, 0.4), inset 0 0 30px rgba(0, 212, 255, 0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = newMilestone
          ? "0 0 40px rgba(255, 0, 102, 0.3), inset 0 0 20px rgba(255, 0, 102, 0.1)"
          : "0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Milestone notification */}
      {newMilestone && (
        <div style={{
          background: "rgba(255, 0, 102, 0.2)",
          border: "1px solid #ff0066",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "16px",
          animation: "pulse 0.6s ease-out"
        }}>
          <p style={{
            color: "#ff0066",
            fontSize: "14px",
            fontWeight: "600",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            🎯 Milestone Unlocked! {milestone}
          </p>
        </div>
      )}

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

      {/* Streak display */}
      <div style={{
        background: "rgba(0, 212, 255, 0.1)",
        border: "1px solid rgba(0, 212, 255, 0.3)",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "16px"
      }}>
        <p style={{
          color: "#00d4ff",
          fontSize: "14px",
          margin: "0 0 8px 0",
          fontWeight: "600"
        }}>
          🔥 Current Streak: {streakData.currentStreak} days
        </p>
        <p style={{
          color: "#0099ff",
          fontSize: "12px",
          margin: 0,
          fontStyle: "italic"
        }}>
          {streakMessage}
        </p>
        <p style={{
          color: "rgba(0, 212, 255, 0.7)",
          fontSize: "11px",
          margin: "4px 0 0 0"
        }}>
          Longest: {streakData.longestStreak} days | Total: {streakData.allTimeInspirations}
        </p>
      </div>

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
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
