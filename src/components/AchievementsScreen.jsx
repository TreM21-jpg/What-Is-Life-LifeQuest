import React from "react";

export default function AchievementsScreen({ achievements, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#cfffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 400
    }}>
      <h1 style={{ marginBottom: "20px", color: "#00ffff" }}>Achievements</h1>

      {achievements && achievements.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "60%" }}>
          {achievements.map((ach, i) => (
            <li key={i} style={{
              marginBottom: "12px",
              padding: "12px",
              background: "#111",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px"
            }}>
              <span>🏆 {ach.title}</span>
              <span style={{ fontStyle: "italic", color: "#9ad" }}>
                {ach.description}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ fontStyle: "italic", color: "#9ad" }}>
          No achievements unlocked yet.
        </div>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: "30px",
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
