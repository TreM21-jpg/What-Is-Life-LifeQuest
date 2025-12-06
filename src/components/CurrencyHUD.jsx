import React from "react";

export default function CurrencyHUD({ coins = 0, gems = 0, tokens = 0 }) {
  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "rgba(0,0,0,0.7)",
      padding: "12px 20px",
      borderRadius: "10px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      fontSize: "16px",
      fontWeight: "700",
      boxShadow: "0 0 15px #00ffff",
      zIndex: 150
    }}>
      <h3 style={{ color: "#00ffff", marginBottom: "10px" }}>Currencies</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: "6px" }}>🪙 Coins: {coins}</li>
        <li style={{ marginBottom: "6px" }}>💎 Gems: {gems}</li>
        <li style={{ marginBottom: "6px" }}>🎟 Tokens: {tokens}</li>
      </ul>
    </div>
  );
}
