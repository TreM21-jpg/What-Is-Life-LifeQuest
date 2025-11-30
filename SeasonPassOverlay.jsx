import React from "react";

export default function SeasonPassOverlay({ tiers, currentTier, onClaim, onClose }) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1011,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Season Pass
      </h1>

      {/* Progress bar */}
      <div style={{
        width: "80%",
        height: "20px",
        background: "#222",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <div style={{
          width: `${(currentTier / tiers.length) * 100}%`,
          height: "100%",
          background: "#44ff88",
          borderRadius: "10px",
          transition: "width 0.5s ease"
        }} />
      </div>

      {/* Tiers list */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "60vh",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tiers.map((tier, i) => (
            <li key={i} style={{
              marginBottom: "16px",
              padding: "12px",
              background: i < currentTier ? "#044" : "#222",
              borderRadius: "8px",
              boxShadow: i < currentTier ? "0 0 15px #44ff88" : "0 0 10px #555",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <strong style={{ color: i < currentTier ? "#44ff88" : "#ffcc00" }}>
                  Tier {i + 1}: {tier.title}
                </strong>
                <p style={{ fontSize: "14px", color: "#cfffff" }}>{tier.description}</p>
                <p style={{ fontSize: "12px", color: "#9ad" }}>
                  Reward: 🪙 {tier.reward.coins || 0} | 💎 {tier.reward.gems || 0}
                </p>
              </div>
              {i < currentTier && !tier.claimed ? (
                <button
                  onClick={() => onClaim(tier)}
                  style={buttonStyle("#44ff88", "#000")}
                >
                  Claim
                </button>
              ) : i < currentTier && tier.claimed ? (
                <p style={{ fontStyle: "italic", color: "#9ad" }}>Claimed</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9ad" }}>Locked</p>
              )}
            </li>
          ))}
        </ul>
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
    marginTop: "10px",
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
