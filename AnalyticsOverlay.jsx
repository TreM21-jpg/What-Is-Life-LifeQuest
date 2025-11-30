import React from "react";
import NeonTheme from "./NeonTheme.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function AnalyticsOverlay({ stats, onClose }) {
  if (!stats) {
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
        }}>📊 Analytics</h1>
        <p style={{ color: "#fff", fontSize: 18 }}>No stats available yet.</p>
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
      }}>📊 Analytics</h1>

      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.gold}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.goldGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ color: NeonTheme.colors.gold }}>XP</h2>
        <p style={{ color: "#fff", fontSize: 18 }}>{stats.xp || 0}</p>
      </div>

      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.cyan}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.cyanGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ color: NeonTheme.colors.cyan }}>Quests Completed</h2>
        <p style={{ color: "#fff", fontSize: 18 }}>{stats.questsCompleted || 0}</p>
      </div>

      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.purple}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.purpleGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ color: NeonTheme.colors.purple }}>Items Collected</h2>
        <p style={{ color: "#fff", fontSize: 18 }}>{stats.itemsCollected || 0}</p>
      </div>

      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.gold}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.goldGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ color: NeonTheme.colors.gold }}>Achievements</h2>
        <p style={{ color: "#fff", fontSize: 18 }}>{stats.achievementsUnlocked || 0}</p>
      </div>

      <button onClick={onClose} style={{
        marginTop: "20px", padding: "12px 24px",
        background: NeonTheme.colors.cyan,
        border: "none", borderRadius: "8px",
        fontWeight: "700", cursor: "pointer",
        ...NeonTheme.animations.pulse
      }}>Close</button>

      <ShortcutHint hints={[
        { key: "Esc", action: "Close Analytics" },
        { key: "Ctrl+N", action: "Open Analytics" }
      ]}/>
    </div>
  );
}
