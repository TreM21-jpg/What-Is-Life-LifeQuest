import React, { useEffect, useRef } from "react";

export default function OutroSequence({ onFinish }) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Start outro timer
    timerRef.current = setTimeout(() => {
      onFinish && onFinish();
    }, 2000);

    // ✅ Copy ref into local variable for cleanup
    const timer = timerRef.current;
    return () => clearTimeout(timer);
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
