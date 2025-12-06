import React, { useEffect, useState } from "react";

export default function LevelUpOverlay({ newLevel, onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 3000); // overlay lasts 3 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 700
    }}>
      <h1 style={{
        color: "#44ff88",
        fontSize: "56px",
        textShadow: "0 0 20px #44ff88, 0 0 40px #00ffff",
        animation: "flash 1s infinite"
      }}>
        🎉 Level {newLevel} Reached!
      </h1>

      <style>
        {`
          @keyframes flash {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
