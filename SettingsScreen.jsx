import React, { useState } from "react";

export default function SettingsScreen({ onClose }) {
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const [graphicsQuality, setGraphicsQuality] = useState("medium");
  const [controlScheme, setControlScheme] = useState("keyboard");

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#00ffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 400
    }}>
      <h1 style={{ marginBottom: "20px" }}>Settings</h1>

      {/* Music Volume */}
      <label style={{ marginBottom: "10px" }}>
        Music Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={musicVolume}
          onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
        {Math.round(musicVolume * 100)}%
      </label>

      {/* SFX Volume */}
      <label style={{ marginBottom: "10px" }}>
        SFX Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={sfxVolume}
          onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
        {Math.round(sfxVolume * 100)}%
      </label>

      {/* Graphics Quality */}
      <label style={{ marginBottom: "10px" }}>
        Graphics Quality:
        <select
          value={graphicsQuality}
          onChange={(e) => setGraphicsQuality(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px", borderRadius: "6px" }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="ultra">Ultra</option>
        </select>
      </label>

      {/* Control Scheme */}
      <label style={{ marginBottom: "20px" }}>
        Control Scheme:
        <select
          value={controlScheme}
          onChange={(e) => setControlScheme(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px", borderRadius: "6px" }}
        >
          <option value="keyboard">Keyboard</option>
          <option value="mouse">Mouse</option>
          <option value="touch">Touch</option>
          <option value="controller">Controller</option>
        </select>
      </label>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          padding: "12px 24px",
          background: "#00ffff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700"
        }}
      >
        Save & Close
      </button>
    </div>
  );
}
