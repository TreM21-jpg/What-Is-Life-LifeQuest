import React from "react";
import Avatar from "./Avatar";

export default function ProfileScreen({ playerName, avatarConfig, stats, achievements, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#cfffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 960,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Player Profile
      </h1>

      {/* Avatar */}
      <div style={{ marginBottom: "20px" }}>
        <Avatar config={avatarConfig} />
      </div>

      {/* Player Name */}
      <h2 style={{ marginBottom: "30px", color: "#44ff88" }}>
        {playerName}
      </h2>

      {/* Stats */}
      <div style={{
        marginBottom: "30px",
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "80%",
        textAlign: "left"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Stats</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {Object.entries(stats).map(([key, value], i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements */}
      <div style={{
        marginBottom: "30px",
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "80%",
        textAlign: "left"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Achievements</h3>
        {achievements && achievements.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {achievements.map((ach, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                🏆 <strong>{ach.title}</strong> — {ach.description}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#9ad" }}>No achievements yet.</p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
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
