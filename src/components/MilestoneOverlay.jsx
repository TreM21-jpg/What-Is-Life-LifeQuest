import React, { useEffect, useState } from "react";

export default function MilestoneOverlay({ milestoneTitle, milestoneDescription, onFinish }) {
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
      zIndex: 720
    }}>
      <h1 style={{
        color: "#ffcc00",
        fontSize: "48px",
        marginBottom: "20px",
        textShadow: "0 0 20px #ffcc00, 0 0 40px #ff4444",
        animation: "glow 2s infinite"
      }}>
        🏆 Milestone Unlocked!
      </h1>
      <h2 style={{ color: "#00ffff", marginBottom: "10px" }}>
        {milestoneTitle}
      </h2>
      <p style={{ color: "#cfffff", fontStyle: "italic" }}>
        {milestoneDescription}
      </p>

      <style>
        {`
          @keyframes glow {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
