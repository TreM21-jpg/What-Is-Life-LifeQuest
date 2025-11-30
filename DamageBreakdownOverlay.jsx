import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function DamageBreakdownOverlay({ damageData, onClose }) {
  if (!damageData || damageData.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1071,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Damage Breakdown
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
          {damageData.map((entry, i) => (
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
                {entry.source}
              </strong>
              <p style={{ fontSize: "14px" }}>
                Damage Dealt: {entry.dealt} | Damage Taken: {entry.taken}
              </p>

              {/* Crit sparks */}
              {entry.crits > 0 && (
                <p style={{
                  fontSize: "12px",
                  marginTop: "6px",
                  color: NeonTheme.colors.gold,
                  animation: "critSpark 1s infinite"
                }}>
                  ✦ Critical Hits: {entry.crits}
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
          @keyframes critSpark {
            0% { text-shadow: 0 0 5px ${NeonTheme.colors.gold}; }
            50% { text-shadow: 0 0 20px ${NeonTheme.colors.cyan}; }
            100% { text-shadow: 0 0 5px ${NeonTheme.colors.gold}; }
          }
        `}
      </style>
    </div>
  );
}
