import React, { useEffect, useState } from "react";

export default function QuestCompletionOverlay({ questTitle, rewards, onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 4000); // overlay lasts 4 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

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
      zIndex: 740
    }}>
      <h1 style={{
        color: "#44ff88",
        fontSize: "48px",
        marginBottom: "20px",
        textShadow: "0 0 20px #44ff88, 0 0 40px #00ffff",
        animation: "pulse 2s infinite"
      }}>
        ✅ Quest Completed!
      </h1>
      <h2 style={{ color: "#00ffff", marginBottom: "10px" }}>
        {questTitle}
      </h2>

      {/* Rewards list */}
      <div style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        width: "60%",
        textAlign: "left",
        color: "#cfffff"
      }}>
        <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Rewards</h3>
        {rewards && rewards.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {rewards.map((reward, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                🎁 {reward}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#9ad" }}>No rewards listed.</p>
        )}
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
