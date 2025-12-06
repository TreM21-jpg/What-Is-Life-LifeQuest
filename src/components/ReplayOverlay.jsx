import React from "react";

export default function ReplayOverlay({ replay, onPlay, onPause, onClose }) {
  if (!replay) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1014,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Replay Viewer
      </h1>

      {/* Replay details */}
      <div style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "70%",
        marginBottom: "20px",
        textAlign: "center",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>{replay.title}</h3>
        <p style={{ fontSize: "14px", color: "#cfffff" }}>{replay.description}</p>
        <p style={{ fontSize: "12px", color: "#9ad" }}>Duration: {replay.duration}s</p>
      </div>

      {/* Playback controls */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <button onClick={onPlay} style={buttonStyle("#44ff88", "#000")}>▶ Play</button>
        <button onClick={onPause} style={buttonStyle("#ffcc00", "#000")}>⏸ Pause</button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={buttonStyle("#00ffff", "#000")}
      >
        Close
      </button>
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
