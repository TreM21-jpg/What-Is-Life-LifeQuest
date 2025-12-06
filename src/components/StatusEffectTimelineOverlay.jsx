import React from "react";

export default function StatusEffectTimelineOverlay({ effects, onClose }) {
  if (!effects || effects.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "400px",
      background: "rgba(0,0,0,0.85)",
      border: "2px solid #00ffff",
      borderRadius: "10px",
      padding: "15px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      fontSize: "14px",
      zIndex: 1017,
      boxShadow: "0 0 15px #00ffff"
    }}>
      {/* Title */}
      <h3 style={{ color: "#44ff88", marginBottom: "10px" }}>⏳ Status Effects Timeline</h3>

      {/* Effects list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {effects.map((effect, i) => (
          <li key={i} style={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{
              color: effect.type === "buff" ? "#44ff88" : "#ff4444",
              fontWeight: "700"
            }}>
              {effect.name}
            </span>
            <span style={{ color: "#ffcc00" }}>
              {effect.remaining}s
            </span>
          </li>
        ))}
      </ul>

      {/* Close button */}
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
