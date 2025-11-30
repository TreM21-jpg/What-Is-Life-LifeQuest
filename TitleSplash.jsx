import React, { useEffect, useState } from "react";

export default function TitleSplash({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 4000); // splash lasts 4 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 800,
      padding: "60px 20px"
    }}>
      {/* Paths Tree at the top */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "48px",
        textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
        animation: "pulse 2s infinite"
      }}>
        Paths Tree
      </h1>

      {/* Spacer */}
      <div style={{ flexGrow: 1 }} />

      {/* LifeQuest at the bottom */}
      <h2 style={{
        color: "#44ff88",
        fontSize: "36px",
        marginBottom: "40px",
        textShadow: "0 0 15px #44ff88",
        animation: "fadeIn 3s ease-in-out"
      }}>
        LifeQuest
      </h2>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
