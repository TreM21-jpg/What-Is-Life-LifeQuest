import React from "react";

export default function CutsceneSkipOverlay({ onSkip, onRewind, onClose }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "30px",
      right: "30px",
      background: "rgba(0,0,0,0.85)",
      border: "2px solid #00ffff",
      borderRadius: "10px",
      padding: "15px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      fontSize: "14px",
      zIndex: 1020,
      boxShadow: "0 0 15px #00ffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px"
    }}>
      {/* Title */}
      <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>🎬 Cutscene Controls</h3>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onSkip}
          style={buttonStyle("#44ff88", "#000")}
        >
          ⏭ Skip
        </button>
        <button
          onClick={onRewind}
          style={buttonStyle("#ffcc00", "#000")}
        >
          ⏮ Rewind
        </button>
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={buttonStyle("#00ffff", "#000")}
        >
          Close
        </button>
      )}
    </div>
  );
}

function buttonStyle(bg, color) {
  return {
    padding: "10px 20px",
    background: bg,
    color: color,
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: `0 0 10px ${bg}`
  };
}
