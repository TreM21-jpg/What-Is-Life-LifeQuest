import React from "react";
import NeonTheme from "./NeonTheme.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function AchievementOverlay({ achievements, onClose }) {
  if (!achievements || achievements.length === 0) {
    return (
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.92)",
        fontFamily: NeonTheme.fonts.heading,
        zIndex: 1085, padding: "30px",
        ...NeonTheme.animations.fadeIn
      }}>
        <h1 style={{
          color: NeonTheme.colors.cyan,
          textShadow: NeonTheme.shadows.cyanGlow,
          fontSize: 42,
          marginBottom: "20px"
        }}>🏆 Achievements</h1>
        <p style={{ color: "#fff", fontSize: 18 }}>No achievements unlocked yet.</p>
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
        color: NeonTheme.colors.gold,
        textShadow: NeonTheme.shadows.goldGlow,
        fontSize: 42,
        marginBottom: "20px"
      }}>🏆 Achievements</h1>

      <div style={{ maxHeight: "70%", overflowY: "auto" }}>
        {achievements.map((ach, i) => (
          <div key={i} style={{
            marginBottom: "16px",
            padding: "14px",
            border: `2px solid ${rarityColors[ach.rarity] || NeonTheme.colors.cyan}`,
            borderRadius: "8px",
            boxShadow: rarityShadows[ach.rarity] || NeonTheme.shadows.cyanGlow,
            background: "rgba(255,255,255,0.05)",
            animation: "fadeInUp 0.6s ease",
          }}>
            <h2 style={{
              color: rarityColors[ach.rarity] || NeonTheme.colors.cyan,
              marginBottom: "6px"
            }}>{ach.title}</h2>
            <p style={{ color: "#ddd", fontSize: 14 }}>
              Rarity: {ach.rarity.charAt(0).toUpperCase() + ach.rarity.slice(1)}
            </p>
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
        { key: "Esc", action: "Close Achievements" },
        { key: "Ctrl+A", action: "Open Achievements" }
      ]}/>
    </div>
  );
}
