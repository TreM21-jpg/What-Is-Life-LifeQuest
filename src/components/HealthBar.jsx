import React from "react";

export default function HealthBar({ playerHP, playerMaxHP }) {
  const percent = Math.max(0, (playerHP / playerMaxHP) * 100);

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "220px",
      height: "24px",
      background: "#333",
      border: "2px solid #00ffff",
      borderRadius: "8px",
      overflow: "hidden",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 30
    }}>
      <div style={{
        width: `${percent}%`,
        height: "100%",
        background: percent > 50 ? "#44ff88" : percent > 20 ? "#ffcc00" : "#ff4444",
        transition: "width 0.3s ease"
      }} />
      <span style={{
        position: "absolute",
        top: "2px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "700"
      }}>
        HP: {playerHP}/{playerMaxHP}
      </span>
    </div>
  );
}
