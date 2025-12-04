import React, { useEffect, useRef } from "react";

export default function OutroSequence({ onFinish }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [onFinish]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Orbitron', sans-serif",
      color: "#ff00ff",
      fontSize: "42px",
      textShadow: "0 0 12px #ff00ff"
    }}>
      🎬 Thanks for Playing LifeQuest!
    </div>
  );
}
