import React from "react";

export default function GameOverScreen({ onRetry, onQuit }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 600
    }}>
      <h1 style={{
        color: "#ff4444",
        fontSize: "48px",
        marginBottom: "20px",
        textShadow: "0 0 15px #ff4444"
      }}>
        ☠️ Game Over
      </h1>
      <p style={{ color: "#cfffff", marginBottom: "30px" }}>
        You’ve lost all lives. Don’t give up — every setback is a chance to grow stronger.
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={onRetry}
          style={{
            padding: "14px 28px",
            background: "#44ff88",
            color: "#000",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Retry
        </button>
        <button
          onClick={onQuit}
          style={{
            padding: "14px 28px",
            background: "#ff4444",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Quit to Menu
        </button>
      </div>
    </div>
  );
}
