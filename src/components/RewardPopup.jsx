import React, { useEffect, useState } from "react";

export default function RewardPopup({ message, duration = 2500, onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!visible) return null;

  return (
    <div style={{
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,0.7)",
      padding: "12px 24px",
      borderRadius: "10px",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "20px",
      fontWeight: "700",
      color: "#44ff88",
      textShadow: "0 0 15px #00ffff",
      boxShadow: "0 0 20px #00ffff",
      animation: "floatUp 2.5s ease-out forwards",
      zIndex: 760
    }}>
      {message}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translate(-50%, 0); opacity: 1; }
            50% { transform: translate(-50%, -20px); opacity: 0.8; }
            100% { transform: translate(-50%, -40px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
