import React from "react";
import NeonTheme from "./NeonTheme.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function CombatFeedbackOverlay({ feedback, onClose }) {
  if (!feedback || feedback.length === 0) {
    return (
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.92)",
        fontFamily: NeonTheme.fonts.heading,
        zIndex: 1085, padding: "30px",
        ...NeonTheme.animations.fadeIn
      }}>
        <h1 style={{
          color: NeonTheme.colors.purple,
          textShadow: NeonTheme.shadows.purpleGlow,
          fontSize: 42,
          marginBottom: "20px"
        }}>⚔️ Combat Feedback</h1>
        <p style={{ color: "#fff", fontSize: 18 }}>No combat events yet.</p>
        <button onClick={onClose} style={{
          marginTop: "20px", padding: "12px 24px",
          background: NeonTheme.colors.cyan,
          border: "none", borderRadius: "8px",
          fontWeight: "700", cursor: "pointer",
          ...NeonTheme.animations.pulse
        }}>Close</button>
      </div>
    );
  }

  const rarityColors = {
    common: NeonTheme.colors.cyan,
    rare: NeonTheme.colors.gold,
    legendary: NeonTheme.colors.purple
  };

  const rarityShadows = {
    common: NeonTheme.shadows.cyanGlow,
    rare: NeonTheme.shadows.goldGlow,
    legendary: NeonTheme.shadows.purpleGlow
  };

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(0,0,0,0.92)",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1085, padding: "30px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.purple,
        textShadow: NeonTheme.shadows.purpleGlow,
        fontSize: 42,
        marginBottom: "20px"
      }}>⚔️ Combat Feedback</h1>

      <div style={{ maxHeight: "70%", overflowY: "auto" }}>
        {feedback.map((event, i) => (
          <div key={i} style={{
            marginBottom: "16px",
            padding: "14px",
            border: `2px solid ${rarityColors[event.rarity] || NeonTheme.colors.cyan}`,
            borderRadius: "8px",
            boxShadow: rarityShadows[event.rarity] || NeonTheme.shadows.cyanGlow,
            background: "rgba(255,255,255,0.05)",
            animation: "fadeInUp 0.6s ease"
          }}>
            <h2 style={{
              color: rarityColors[event.rarity] || NeonTheme.colors.cyan,
              marginBottom: "6px"
            }}>{event.title}</h2>
            <p style={{ color: "#ddd", fontSize: 14 }}>{event.message}</p>
            {event.rarity && (
              <p style={{ color: "#aaa", fontSize: 12 }}>
                Rarity: {event.rarity.charAt(0).toUpperCase() + event.rarity.slice(1)}
              </p>
            )}
          </div>
        ))}
      </div>

      <button onClick={onClose} style={{
        marginTop: "20px", padding: "12px 24px",
        background: NeonTheme.colors.cyan,
        border: "none", borderRadius: "8px",
        fontWeight: "700", cursor: "pointer",
        ...NeonTheme.animations.pulse
      }}>Close</button>

      <ShortcutHint hints={[
        { key: "Esc", action: "Close Combat Feedback" },
        { key: "Ctrl+C", action: "Open Combat Feedback" }
      ]}/>
    </div>
  );
}
