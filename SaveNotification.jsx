import React, { useEffect, useState } from "react";

export default function SaveNotification({ show, duration = 3000 }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!visible) return null;

  return (
    <div style={{
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#00ffff",
      color: "#000",
      padding: "12px 24px",
      borderRadius: "8px",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "16px",
      fontWeight: "700",
      boxShadow: "0 0 15px #00ffff",
      zIndex: 500
    }}>
      💾 Progress Saved!
    </div>
  );
}
