import React from "react";

export default function XPBar({ currentXP, level }) {
  // XP needed for next level (simple formula: level * 100)
  const xpForNextLevel = level * 100;
  const progress = Math.min((currentXP / xpForNextLevel) * 100, 100);

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      background: "#222",
      border: "2px solid #00ffff",
      borderRadius: "12px",
      padding: "6px",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 130
    }}>
      {/* Progress bar */}
      <div style={{
        width: `${progress}%`,
        height: "20px",
        background: "linear-gradient(90deg, #00ffff, #44ff88)",
        borderRadius: "8px",
        boxShadow: "0 0 15px #00ffff"
      }} />

      {/* Text overlay */}
      <div style={{
        textAlign: "center",
        marginTop: "6px",
        color: "#cfffff",
        fontSize: "14px",
        fontWeight: "700"
      }}>
        XP: {currentXP} / {xpForNextLevel} | Level {level}
      </div>
    </div>
  );
}
