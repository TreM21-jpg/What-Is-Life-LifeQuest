import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function QuestJournalOverlay({ quests, onComplete, onClose }) {
  if (!quests || quests.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1072,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Quest Journal
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
          {quests.map((quest, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: NeonTheme.shadows.cyanGlow,
              ...NeonTheme.animations.slideUp
            }}>
              {/* Animated quest icon */}
              {quest.icon && (
                <img
                  src={quest.icon}
                  alt="Quest Icon"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "6px",
                    border: `2px solid ${NeonTheme.colors.gold}`,
                    boxShadow: NeonTheme.shadows.goldGlow,
                    animation: "iconPulse 2s infinite"
                  }}
                />
              )}
              <strong style={{ color: NeonTheme.colors.gold, fontSize: "18px", marginLeft: "10px" }}>
                {quest.title}
              </strong>
              <p style={{ fontSize: "14px" }}>{quest.description}</p>

              {/* Neon progress arc */}
              <svg width="100" height="100" style={{ marginTop: "10px" }}>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={NeonTheme.colors.cyan}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${quest.progress * 2.5} 250`}
                  style={{
                    filter: `drop-shadow(${NeonTheme.shadows.cyanGlow})`,
                    animation: "progressArc 3s linear infinite"
                  }}
                />
              </svg>

              {!quest.completed && (
                <button
                  onClick={() => onComplete(quest)}
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
                  Complete Quest
                </button>
              )}
              {quest.completed && (
                <p style={{ color: NeonTheme.colors.green, fontSize: "12px", marginTop: "6px" }}>
                  ✔ Completed
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
          @keyframes iconPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes progressArc {
            to { stroke-dashoffset: -250; }
          }
        `}
      </style>
    </div>
  );
}
