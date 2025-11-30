import React from "react";

export default function PauseOverlay({ show, onResume, onSettings }) {
  if (!show) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 250
    }}>
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "30px",
        textShadow: "0 0 10px #00ffff"
      }}>
        Game Paused
      </h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={onResume}
          style={{
            padding: "12px 24px",
            background: "#44ff88",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Resume
        </button>
        <button
          onClick={onSettings}
          style={{
            padding: "12px 24px",
            background: "#ffcc00",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
