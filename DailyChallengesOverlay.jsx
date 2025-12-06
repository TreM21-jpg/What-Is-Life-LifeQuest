import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function DailyChallengeOverlay({ challenges, onClaim, onClose }) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1078,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Daily Challenges
      </h1>

      <div style={{
        flexGrow: 1,
        width: "80%",
        background: NeonTheme.colors.dark,
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: NeonTheme.shadows.cyanGlow,
        color: NeonTheme.colors.lightText
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {challenges.map((c, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: NeonTheme.shadows.cyanGlow,
              ...NeonTheme.animations.slideUp
            }}>
              <strong style={{ color: NeonTheme.colors.gold, fontSize: "18px" }}>
                {c.title}
              </strong>
              <p style={{ fontSize: "14px" }}>{c.description}</p>

              {/* Countdown timer refinement */}
              <p style={{
                fontSize: "12px",
                color: NeonTheme.colors.green,
                animation: "countdownPulse 1s infinite"
              }}>
                ⏳ {c.timeLeft}h remaining
              </p>

              {/* Neon streak tracker */}
              <p style={{
                fontSize: "12px",
                color: NeonTheme.colors.cyan,
                animation: "streakGlow 2s infinite alternate"
              }}>
                🔥 Streak: {c.streak} days
              </p>

              {!c.claimed && (
                <button
                  onClick={() => onClaim(c)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 16px",
                    background: NeonTheme.colors.green,
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "700",
                    ...NeonTheme.animations.pulse
                  }}
                >
                  Claim Reward
                </button>
              )}
              {c.claimed && (
                <p style={{ color: NeonTheme.colors.green, fontSize: "12px", marginTop: "6px" }}>
                  ✔ Reward Claimed
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: NeonTheme.colors.cyan,
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700",
          ...NeonTheme.animations.pulse
        }}
      >
        Close
      </button>

      <style>
        {`
          @keyframes countdownPulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          @keyframes streakGlow {
            0% { text-shadow: 0 0 10px ${NeonTheme.colors.cyan}; }
            100% { text-shadow: 0 0 20px ${NeonTheme.colors.gold}; }
          }
        `}
      </style>
    </div>
  );
}
