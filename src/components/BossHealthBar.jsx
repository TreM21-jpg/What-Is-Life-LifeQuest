import React from "react";

export default function BossHealthBar({ bossHP, bossMaxHP, bossName }) {
  const percent = Math.max(0, (bossHP / bossMaxHP) * 100);

  return (
    <div style={{
      position: "absolute",
      top: "60px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "400px",
      height: "28px",
      background: "#222",
      border: "2px solid #ff4444",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 30
    }}>
      <div style={{
        width: `${percent}%`,
        height: "100%",
        background: percent > 50 ? "#ff4444" : percent > 20 ? "#ffcc00" : "#888",
        transition: "width 0.3s ease"
      }} />
      <span style={{
        position: "absolute",
        top: "2px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "700"
      }}>
        {bossName} HP: {bossHP}/{bossMaxHP}
      </span>
    </div>
  );
}
