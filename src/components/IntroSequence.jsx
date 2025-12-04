import React, { useEffect, useRef } from "react";

export default function IntroSequence({ onFinish }) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Start intro timer
    timerRef.current = setTimeout(() => {
      onFinish && onFinish();
    }, 3000);

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
      color: "#00ffff",
      fontSize: "48px",
      textShadow: "0 0 12px #00ffff"
    }}>
      🌟 Welcome to LifeQuest
    </div>
  );
}
