import React from "react";

export default function BattleResultsOverlay({ results, onClose }) {
  if (!results) return null;

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
      zIndex: 1002,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Battle Results
      </h1>

      {/* XP gained */}
      <p style={{ color: "#44ff88", fontSize: "18px", marginBottom: "10px" }}>
        ✨ XP Gained: {results.xp}
      </p>

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
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Loot Earned</h3>
        {results.loot && results.loot.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {results.loot.map((item, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>🎁 {item}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#9ad" }}>No loot this time.</p>
        )}
      </div>

      {/* Performance stats */}
      <div style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "60%",
        marginBottom: "20px",
        textAlign: "left",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Performance</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>⚔ Damage Dealt: {results.damage}</li>
          <li>🛡 Damage Taken: {results.damageTaken}</li>
          <li>💖 Healing Done: {results.healing}</li>
          <li>⏱ Duration: {results.duration}s</li>
        </ul>
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
