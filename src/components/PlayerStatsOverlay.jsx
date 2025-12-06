import React from "react";

export default function PlayerStatsOverlay({ stats, onClose }) {
  if (!stats) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1012,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Player Stats
      </h1>

      {/* Stats panel */}
      <div style={{
        flexGrow: 1,
        width: "70%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={statStyle}>📜 Quests Completed: {stats.questsCompleted}</li>
          <li style={statStyle}>⚔ Battles Won: {stats.battlesWon}</li>
          <li style={statStyle}>💀 Battles Lost: {stats.battlesLost}</li>
          <li style={statStyle}>🪙 Currency Earned: {stats.currency}</li>
          <li style={statStyle}>💎 Gems Collected: {stats.gems}</li>
          <li style={statStyle}>⏱ Hours Played: {stats.hoursPlayed}</li>
          <li style={statStyle}>🏆 Achievements Unlocked: {stats.achievements}</li>
          <li style={statStyle}>🌍 Zones Explored: {stats.zonesExplored}</li>
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

const statStyle = {
  marginBottom: "12px",
  fontSize: "16px",
  color: "#cfffff"
};
