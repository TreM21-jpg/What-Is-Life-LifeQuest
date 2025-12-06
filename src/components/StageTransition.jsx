import React, { useEffect, useState } from "react";

export default function StageTransition({ stageName, onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 4000); // transition lasts 4 seconds
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
      zIndex: 650
    }}>
      <h1 style={{
        color: "#00ffff",
        fontSize: "48px",
        textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
        animation: "pulse 2s infinite"
      }}>
        {stageName} Stage Unlocked
      </h1>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
