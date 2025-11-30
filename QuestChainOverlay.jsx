import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function QuestChainOverlay({ quests, onClose }) {
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
      zIndex: 1046,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      {/* Title */}
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Quest Chain
      </h1>

      {/* Quest chain list */}
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
        <ol style={{ paddingLeft: "20px" }}>
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
              <strong style={{ color: NeonTheme.colors.gold, fontSize: "18px" }}>
                {quest.title}
              </strong>
              <p style={{ fontSize: "14px" }}>{quest.description}</p>

              {/* Status indicator */}
              <p style={{
                fontSize: "12px",
                marginTop: "6px",
                color:
                  quest.completed
                    ? NeonTheme.colors.green
                    : NeonTheme.colors.red
              }}>
                {quest.completed ? "✔ Completed" : "✖ In Progress"}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Close button */}
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
    </div>
  );
}
