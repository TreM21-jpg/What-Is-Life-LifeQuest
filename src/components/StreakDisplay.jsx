/**
 * Streak Display Component – Shows player's inspiration streak in HUD/sidebar
 * Displays current streak, milestone emoji, progress bar to next milestone
 */

import React, { useState, useEffect } from "react";
import { getStreakData, getStreakMilestone, getStreakMessage } from "./StreakTracker.ts";

const MILESTONES = [1, 3, 7, 14, 30, 50, 100, 200, 500];

export default function StreakDisplay({ position = "top-right", compact = false }) {
  const [streakData, setStreakData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const data = getStreakData();
    setStreakData(data);

    // Update streak data every minute
    const interval = setInterval(() => {
      const updated = getStreakData();
      setStreakData(updated);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!streakData) return null;

  const milestone = getStreakMilestone(streakData.currentStreak);
  const streakMessage = getStreakMessage(streakData.currentStreak);

  // Calculate progress to next milestone
  const nextMilestoneIndex = MILESTONES.findIndex(
    (m) => m > streakData.currentStreak
  );
  const nextMilestone =
    nextMilestoneIndex === -1 ? 500 : MILESTONES[nextMilestoneIndex];
  const currentMilestoneThreshold =
    nextMilestoneIndex === 0 ? 0 : MILESTONES[nextMilestoneIndex - 1];
  const progressPercent = Math.round(
    ((streakData.currentStreak - currentMilestoneThreshold) /
      (nextMilestone - currentMilestoneThreshold)) *
      100
  );

  // Position styles
  const positionStyles = {
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    inline: { position: "relative", top: 0, right: 0, bottom: 0, left: 0 },
  };

  const isInline = position === "inline";

  return (
    <div
      style={{
        ...(isInline ? {} : { position: "fixed", zIndex: 1000 }),
        ...positionStyles[position],
        fontFamily: "'Arial', sans-serif",
      }}
    >
      {/* Compact view (default) */}
      {compact || !expanded ? (
        <button
          onClick={() => setExpanded(true)}
          style={{
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(255, 0, 102, 0.1))",
            border: "2px solid rgba(0, 212, 255, 0.4)",
            borderRadius: "12px",
            padding: "12px 16px",
            color: "#00d4ff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 30px rgba(0, 212, 255, 0.4)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.2)";
            e.target.style.transform = "scale(1)";
          }}
        >
          <span style={{ fontSize: "16px" }}>{milestone}</span>
          <span>{streakData.currentStreak}</span>
        </button>
      ) : (
        /* Expanded view */
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(40, 0, 60, 0.95))",
            border: "2px solid",
            borderImage: "linear-gradient(135deg, #00d4ff, #ff0066) 1",
            borderRadius: "16px",
            padding: "20px",
            minWidth: "300px",
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setExpanded(false)}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "transparent",
              border: "none",
              color: "#00d4ff",
              fontSize: "20px",
              cursor: "pointer",
              padding: "4px 8px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ff0066";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#00d4ff";
            }}
          >
            ✕
          </button>

          {/* Header */}
          <h3
            style={{
              color: "#00d4ff",
              fontSize: "16px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              margin: "0 0 16px 0",
              textAlign: "center",
            }}
          >
            🔥 Your Inspiration Streak
          </h3>

          {/* Streak number */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #00d4ff, #0099ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {streakData.currentStreak}
            </div>
            <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#00d4ff" }}>
              {streakData.currentStreak === 1 ? "day" : "days"} in a row
            </p>
          </div>

          {/* Milestone badge */}
          <div
            style={{
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "rgba(0, 212, 255, 0.7)", textTransform: "uppercase" }}>
              Current Milestone
            </p>
            <p style={{ margin: 0, fontSize: "24px" }}>{milestone}</p>
          </div>

          {/* Motivational message */}
          <p
            style={{
              margin: "0 0 16px 0",
              fontSize: "14px",
              fontStyle: "italic",
              color: "rgba(0, 212, 255, 0.8)",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            {streakMessage}
          </p>

          {/* Progress bar to next milestone */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(0, 212, 255, 0.6)",
                  textTransform: "uppercase",
                }}
              >
                Progress to {nextMilestone}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(0, 212, 255, 0.6)",
                  fontWeight: "600",
                }}
              >
                {progressPercent}%
              </span>
            </div>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                borderRadius: "4px",
                height: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #0099ff)",
                  height: "100%",
                  width: `${progressPercent}%`,
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 10px rgba(0, 212, 255, 0.4)",
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "11px", color: "rgba(0, 212, 255, 0.6)", textTransform: "uppercase" }}>
                Longest
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#00d4ff",
                }}
              >
                {streakData.longestStreak}
              </p>
            </div>
            <div
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "11px", color: "rgba(0, 212, 255, 0.6)", textTransform: "uppercase" }}>
                Total
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#00d4ff",
                }}
              >
                {streakData.allTimeInspirations}
              </p>
            </div>
          </div>

          {/* Weekly breakdown */}
          <div
            style={{
              background: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <p style={{ margin: "0 0 8px 0", fontSize: "11px", color: "rgba(0, 212, 255, 0.6)", textTransform: "uppercase" }}>
              This Week
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "600",
                color: "#00d4ff",
              }}
            >
              {streakData.totalInspirationsThisWeek} inspirations
            </p>
          </div>

          {/* Motivational footer */}
          <p
            style={{
              marginTop: "16px",
              fontSize: "12px",
              color: "rgba(255, 0, 102, 0.7)",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Keep the streak alive! Every day counts. 💪
          </p>
        </div>
      )}
    </div>
  );
}
