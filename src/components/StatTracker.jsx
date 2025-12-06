import React, { useState, useEffect } from "react";

export default function StatTracker({ initialStats, onUpdate }) {
  const [stats, setStats] = useState(initialStats);

  // Update stats whenever they change
  useEffect(() => {
    if (onUpdate) onUpdate(stats);
  }, [stats, onUpdate]);

  // Functions to increment stats
  const gainXP = (amount) => {
    setStats((prev) => {
      const newXP = prev.XP + amount;
      let newLevel = prev.Level;

      // Simple level‑up logic: every 100 XP = +1 Level
      if (newXP >= prev.Level * 100) {
        newLevel += 1;
      }

      return { ...prev, XP: newXP, Level: newLevel };
    });
  };

  const completeQuest = () => {
    setStats((prev) => ({ ...prev, QuestsCompleted: prev.QuestsCompleted + 1 }));
  };

  const winBattle = () => {
    setStats((prev) => ({ ...prev, BattlesWon: prev.BattlesWon + 1 }));
  };

  const loseBattle = () => {
    setStats((prev) => ({ ...prev, BattlesLost: prev.BattlesLost + 1 }));
  };

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#111",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "12px 20px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 120
    }}>
      <h3 style={{ color: "#00ffff", marginBottom: "10px" }}>Player Stats</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>⭐ XP: {stats.XP}</li>
        <li>⬆ Level: {stats.Level}</li>
        <li>📜 Quests Completed: {stats.QuestsCompleted}</li>
        <li>⚔ Battles Won: {stats.BattlesWon}</li>
        <li>💀 Battles Lost: {stats.BattlesLost}</li>
      </ul>
    </div>
  );
}
