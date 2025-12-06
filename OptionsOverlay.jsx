import React, { useState } from "react";

export default function OptionsOverlay({ show, onClose }) {
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(100);
  const [controls, setControls] = useState("WASD");

  if (!show) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 950
    }}>
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "30px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Quick Options
      </h1>

      {/* Volume */}
      <div style={rowStyle}>
        <label style={labelStyle}>🔊 Volume</label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={sliderStyle}
        />
        <span>{volume}%</span>
      </div>

      {/* Brightness */}
      <div style={rowStyle}>
        <label style={labelStyle}>💡 Brightness</label>
        <input
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
          style={sliderStyle}
        />
        <span>{brightness}%</span>
      </div>

      {/* Controls */}
      <div style={rowStyle}>
        <label style={labelStyle}>🎮 Controls</label>
        <select
          value={controls}
          onChange={(e) => setControls(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "14px"
          }}
        >
          <option value="WASD">WASD</option>
          <option value="Arrow Keys">Arrow Keys</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          marginTop: "30px",
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
        Close
      </button>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
  color: "#cfffff"
};

const labelStyle = {
  width: "120px",
  textAlign: "right",
  fontWeight: "700"
};

const sliderStyle = {
  flexGrow: 1,
  cursor: "pointer"
};
