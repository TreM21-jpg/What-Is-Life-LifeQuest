import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function ShortcutHint({ hints }) {
  return (
    <div style={{
      position: "absolute", bottom: 20, right: 20,
      background: NeonTheme.colors.dark,
      border: `2px solid ${NeonTheme.colors.cyan}`,
      borderRadius: "8px",
      padding: "10px 16px",
      boxShadow: NeonTheme.shadows.cyanGlow,
      fontFamily: NeonTheme.fonts.heading,
      fontSize: "14px",
      color: NeonTheme.colors.lightText,
      animation: "hintPulse 2s infinite alternate"
    }}>
      {hints.map((h, i) => (
        <div key={i} style={{ marginBottom: "4px" }}>
          <span style={{ color: NeonTheme.colors.gold }}>{h.key}</span> → {h.action}
        </div>
      ))}
      <style>
        {`
          @keyframes hintPulse {
            0% { box-shadow: 0 0 8px ${NeonTheme.colors.cyan}; }
            100% { box-shadow: 0 0 16px ${NeonTheme.colors.gold}; }
          }
        `}
      </style>
    </div>
  );
}
