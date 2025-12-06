import React, { useState } from "react";
import NeonTheme from "./NeonTheme.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function SettingsOverlay({ settings, onUpdate, onClose }) {
  const [localSettings, setLocalSettings] = useState(settings || {
    audio: true,
    neonTheme: true,
    difficulty: "normal",
    accessibility: { hints: true, highContrast: false }
  });

  const handleToggle = (key) => {
    const updated = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(updated);
    onUpdate && onUpdate(updated);
  };

  const handleDifficulty = (level) => {
    const updated = { ...localSettings, difficulty: level };
    setLocalSettings(updated);
    onUpdate && onUpdate(updated);
  };

  const handleAccessibility = (key) => {
    const updated = {
      ...localSettings,
      accessibility: {
        ...localSettings.accessibility,
        [key]: !localSettings.accessibility[key]
      }
    };
    setLocalSettings(updated);
    onUpdate && onUpdate(updated);
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
      }}>⚙️ Settings</h1>

      {/* Audio toggle */}
      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.cyan}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.cyanGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <label style={{ color: "#fff", fontSize: 18 }}>
          <input
            type="checkbox"
            checked={localSettings.audio}
            onChange={() => handleToggle("audio")}
            style={{ marginRight: "10px" }}
          />
          Audio Enabled
        </label>
      </div>

      {/* Neon theme toggle */}
      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.purple}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.purpleGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <label style={{ color: "#fff", fontSize: 18 }}>
          <input
            type="checkbox"
            checked={localSettings.neonTheme}
            onChange={() => handleToggle("neonTheme")}
            style={{ marginRight: "10px" }}
          />
          Neon Theme
        </label>
      </div>

      {/* Difficulty selector */}
      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.gold}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.goldGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <p style={{ color: "#fff", fontSize: 18 }}>Difficulty</p>
        {["easy", "normal", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => handleDifficulty(level)}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              background: localSettings.difficulty === level ? NeonTheme.colors.gold : NeonTheme.colors.cyan,
              border: "none",
              borderRadius: "6px",
              fontWeight: "700",
              cursor: "pointer",
              ...NeonTheme.animations.pulse
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Accessibility toggles */}
      <div style={{
        marginBottom: "16px",
        padding: "14px",
        border: `2px solid ${NeonTheme.colors.cyan}`,
        borderRadius: "8px",
        boxShadow: NeonTheme.shadows.cyanGlow,
        background: "rgba(255,255,255,0.05)"
      }}>
        <p style={{ color: "#fff", fontSize: 18 }}>Accessibility</p>
        <label style={{ color: "#fff", fontSize: 16 }}>
          <input
            type="checkbox"
            checked={localSettings.accessibility.hints}
            onChange={() => handleAccessibility("hints")}
            style={{ marginRight: "10px" }}
          />
          Show Shortcut Hints
        </label>
        <br />
        <label style={{ color: "#fff", fontSize: 16 }}>
          <input
            type="checkbox"
            checked={localSettings.accessibility.highContrast}
            onChange={() => handleAccessibility("highContrast")}
            style={{ marginRight: "10px" }}
          />
          High Contrast Mode
        </label>
      </div>

      <button onClick={onClose} style={{
        marginTop: "20px", padding: "12px 24px",
        background: NeonTheme.colors.cyan,
        border: "none", borderRadius: "8px",
        fontWeight: "700", cursor: "pointer",
        ...NeonTheme.animations.pulse
      }}>Close</button>

      <ShortcutHint hints={[
        { key: "Esc", action: "Close Settings" },
        { key: "Ctrl+T", action: "Open Settings" }
      ]}/>
    </div>
  );
}
