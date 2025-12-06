import React from "react";

export default function CombatLogOverlay({ logs, onClose }) {
  if (!logs || logs.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      width: "300px",
      height: "200px",
      background: "rgba(0,0,0,0.8)",
      border: "2px solid #00ffff",
      borderRadius: "10px",
      padding: "10px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      fontSize: "12px",
      overflowY: "auto",
      zIndex: 1001,
      boxShadow: "0 0 15px #00ffff"
    }}>
      <h3 style={{ color: "#44ff88", marginBottom: "10px" }}>⚔ Combat Log</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {logs.map((entry, i) => (
          <li key={i} style={{ marginBottom: "6px" }}>
            <span style={{ color: entry.type === "damage" ? "#ff4444" : entry.type === "heal" ? "#44ff88" : "#ffcc00" }}>
              {entry.message}
            </span>
            <div style={{ fontSize: "10px", color: "#9ad" }}>{entry.timestamp}</div>
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
