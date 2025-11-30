import React from "react";

export default function QuestLog({ completedQuests }) {
  const zones = ["School", "Home", "Park"];
  const questDetails = {
    School: "Find the lost book in the library.",
    Home: "Help your sibling clean the room.",
    Park: "Collect 3 glowing leaves from the trees."
  };

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#1a1a1a",
      color: "#00ff99",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "14px",
      border: "1px solid #00ff99",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 10
    }}>
      <h3>Quest Log</h3>
      <ul>
        {zones.map((zone) => (
          <li key={zone}>
            <strong>{zone}</strong>: {completedQuests.includes(zone) ? "✅ Completed" : "❌ Incomplete"}
            <br />
            <em>{questDetails[zone]}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
