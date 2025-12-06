import React from "react";

export default function LoreCodexOverlay({ entries, unlockedEntries, onClose }) {
  if (!entries) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1006,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Lore Codex
      </h1>

      {/* Entries list */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: "0 0 10px #00ffff"
      }}>
        {entries.map((entry, i) => {
          const isUnlocked = unlockedEntries.includes(entry.id);
          return (
            <div key={i} style={{
              marginBottom: "20px",
              padding: "15px",
              background: isUnlocked ? "#044" : "#222",
              borderRadius: "8px",
              boxShadow: isUnlocked ? "0 0 15px #44ff88" : "0 0 10px #555"
            }}>
              <h3 style={{ color: isUnlocked ? "#44ff88" : "#ffcc00" }}>
                {entry.title}
              </h3>
              {isUnlocked ? (
                <p style={{ color: "#cfffff", fontSize: "14px" }}>{entry.text}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9ad" }}>Locked entry</p>
              )}
            </div>
          );
        })}
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
