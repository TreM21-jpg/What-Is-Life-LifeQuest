import React from "react";

export default function QuestTracker({ activeQuest }) {
  if (!activeQuest) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "#333",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        width: "250px",
      }}
    >
      <h3>🧭 Quest Active</h3>
      <strong>{activeQuest.title}</strong>
      <p>{activeQuest.description}</p>
      <p>XP: {activeQuest.xp}</p>
    </div>
  );
}
