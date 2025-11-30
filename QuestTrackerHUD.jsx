import React from "react";

export default function QuestTrackerHUD({ activeNPC, nextObjectives }) {
  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#0a0a0a",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "12px 16px",
      width: "260px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 25
    }}>
      <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
        Quest Tracker
      </div>

      {/* Active NPC */}
      {activeNPC ? (
        <div style={{ marginBottom: "12px" }}>
          <strong>Talking to:</strong> {activeNPC.name} ({activeNPC.zone})
        </div>
      ) : (
        <div style={{ marginBottom: "12px", fontStyle: "italic", color: "#9ad" }}>
          No active NPC
        </div>
      )}

      {/* Next Objectives */}
      <div>
        <strong>Next Objectives:</strong>
        {nextObjectives && nextObjectives.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0" }}>
            {nextObjectives.map((obj, i) => (
              <li key={i} style={{
                marginBottom: "6px",
                padding: "6px",
                background: "#111",
                borderRadius: "6px",
                fontSize: "14px"
              }}>
                ➡️ {obj}
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ fontStyle: "italic", color: "#9ad", marginTop: "6px" }}>
            None available
          </div>
        )}
      </div>
    </div>
  );
}
