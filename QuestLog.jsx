import React from "react";

export default function QuestLog({ completedQuests }) {
  return (
    <div style={{
      position: "absolute",
      top: "100px",
      right: "20px",
      background: "#0a0a0a",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "12px 16px",
      width: "220px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 20
    }}>
      <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
        Quest Log
      </div>
      {completedQuests && completedQuests.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {completedQuests.map((quest, i) => (
            <li key={i} style={{
              marginBottom: "6px",
              padding: "6px",
              background: "#111",
              borderRadius: "6px",
              fontSize: "14px"
            }}>
              ✅ {quest}
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ fontStyle: "italic", color: "#9ad" }}>
          No quests completed yet.
        </div>
      )}
    </div>
  );
}
