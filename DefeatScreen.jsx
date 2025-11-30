import React from "react";

export default function DefeatScreen({ onRetry }) {
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
      zIndex: 500
    }}>
      <h1 style={{
        color: "#ff4444",
        fontSize: "48px",
        marginBottom: "20px",
        textShadow: "0 0 15px #ff4444"
      }}>
        💀 Defeat
      </h1>
      <p style={{ color: "#cfffff", marginBottom: "30px" }}>
        You were defeated in battle. Don’t give up — try again!
      </p>
      <button
        onClick={onRetry}
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
        Retry Battle
      </button>
    </div>
  );
}
