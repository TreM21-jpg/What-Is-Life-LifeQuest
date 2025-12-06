import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function QuestDecisionOverlay({ decisions, onChoose, onClose }) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1045,
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
        Quest Decision
      </h1>

      {/* Decision list */}
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
          {decisions.map((decision, i) => (
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
                {decision.title}
              </strong>
              <p style={{ fontSize: "14px" }}>{decision.description}</p>

              {/* Choose button */}
              <button
                onClick={() => onChoose(decision)}
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
                Choose
              </button>
            </li>
          ))}
        </ul>
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
