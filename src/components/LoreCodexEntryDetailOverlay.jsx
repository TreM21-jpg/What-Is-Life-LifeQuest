import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function LoreCodexEntryDetailOverlay({ entry, onClose }) {
  if (!entry) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1044,
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
        {entry.title}
      </h1>

      {/* Lore content */}
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
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>
          {entry.description}
        </p>

        {/* Key facts */}
        {entry.facts && entry.facts.length > 0 && (
          <>
            <h2 style={{ color: NeonTheme.colors.gold, marginBottom: "10px" }}>
              Key Facts
            </h2>
            <ul style={{ listStyle: "disc", marginLeft: "20px" }}>
              {entry.facts.map((fact, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  {fact}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Related characters */}
        {entry.characters && entry.characters.length > 0 && (
          <>
            <h2 style={{ color: NeonTheme.colors.gold, marginTop: "20px", marginBottom: "10px" }}>
              Related Characters
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {entry.characters.map((char, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <strong style={{ color: NeonTheme.colors.green }}>{char.name}</strong> — {char.role}
                </li>
              ))}
            </ul>
          </>
        )}
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
