import React from "react";

export default function ComboMeterOverlay({ comboCount, multiplier, onClose }) {
  if (comboCount === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "rgba(0,0,0,0.8)",
      border: "2px solid #00ffff",
      borderRadius: "10px",
      padding: "15px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      fontSize: "16px",
      zIndex: 1015,
      boxShadow: "0 0 15px #00ffff",
      textAlign: "center"
    }}>
      {/* Combo count */}
      <h2 style={{
        color: "#ff4444",
        fontSize: "28px",
        margin: "0 0 10px 0",
        textShadow: "0 0 10px #ff4444"
      }}>
        Combo: {comboCount}
      </h2>

      {/* Multiplier */}
      <p style={{
        color: "#44ff88",
        fontSize: "20px",
        margin: 0,
        textShadow: "0 0 10px #44ff88"
      }}>
        Multiplier ×{multiplier}
      </p>

      {/* Optional close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            background: "#00ffff",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Close
        </button>
      )}
    </div>
  );
}
