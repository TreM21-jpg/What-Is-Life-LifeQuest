import React from "react";

export default function MainMenuOverlay({ onStart, onLoad, onSettings, onQuit }) {
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
      zIndex: 900
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "64px",
        marginBottom: "60px",
        textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
        animation: "pulse 2s infinite"
      }}>
        LifeQuest
      </h1>

      {/* Menu Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button
          onClick={onStart}
          style={buttonStyle("#44ff88", "#000")}
        >
          ▶ Start
        </button>
        <button
          onClick={onLoad}
          style={buttonStyle("#00ffff", "#000")}
        >
          📂 Load
        </button>
        <button
          onClick={onSettings}
          style={buttonStyle("#ffcc00", "#000")}
        >
          ⚙ Settings
        </button>
        <button
          onClick={onQuit}
          style={buttonStyle("#ff4444", "#fff")}
        >
          ✖ Quit
        </button>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

// Shared button style generator
function buttonStyle(bg, color) {
  return {
    padding: "14px 32px",
    background: bg,
    color: color,
    border: "none",
    borderRadius: "10px",
    fontSize: "22px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: `0 0 15px ${bg}`,
    transition: "transform 0.2s ease",
  };
}
