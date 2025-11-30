import React, { useEffect, useState } from "react";

export default function CriticalHitOverlay({ damage, visible, onClose }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!show) return null;

  return (
    <div style={{
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "rgba(0,0,0,0.7)",
      border: "3px solid #ff4444",
      borderRadius: "12px",
      padding: "20px 40px",
      fontFamily: "Orbitron, sans-serif",
      color: "#ff4444",
      fontSize: "36px",
      fontWeight: "900",
      textAlign: "center",
      zIndex: 1016,
      boxShadow: "0 0 25px #ff4444",
      animation: "pulse 0.8s infinite"
    }}>
      💥 CRITICAL HIT! 💥
      <div style={{ fontSize: "24px", color: "#ffcc00", marginTop: "10px" }}>
        Damage: {damage}
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
        `}
      </style>
    </div>
  );
}
