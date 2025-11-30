import React from "react";

export default function VictoryScreen({ onContinue }) {
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
        color: "#44ff88",
        fontSize: "48px",
        marginBottom: "20px",
        textShadow: "0 0 15px #44ff88"
      }}>
        🎉 Victory!
      </h1>
      <p style={{ color: "#cfffff", marginBottom: "30px" }}>
        You defeated the boss and gained valuable experience!
      </p>
      <button
        onClick={onContinue}
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
        Continue Adventure
      </button>
    </div>
  );
}
