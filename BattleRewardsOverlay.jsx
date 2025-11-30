import React from "react";

export default function BattleRewardsOverlay({ rewards, onClose }) {
  if (!rewards) return null;

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
      zIndex: 1003,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Battle Rewards
      </h1>

      {/* Currency earned */}
      <div style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "60%",
        marginBottom: "20px",
        textAlign: "left",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Currency</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>🪙 Coins: {rewards.coins || 0}</li>
          <li>💎 Gems: {rewards.gems || 0}</li>
          <li>🎟 Tokens: {rewards.tokens || 0}</li>
        </ul>
      </div>

      {/* Loot earned */}
      <div style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "60%",
        marginBottom: "20px",
        textAlign: "left",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Loot</h3>
        {rewards.loot && rewards.loot.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {rewards.loot.map((item, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>🎁 {item}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#9ad" }}>No loot earned.</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#00ffff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700"
        }}
      >
        Close
      </button>
    </div>
  );
}
