import React, { useEffect, useState } from "react";

export default function CreditsScene({ onFinish }) {
  const [scrollY, setScrollY] = useState(400);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollY((y) => y - 1);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollY < -600) {
      onFinish();
    }
  }, [scrollY, onFinish]);

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "black",
      color: "#00ffff",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "24px",
      textAlign: "center",
      overflow: "hidden",
      zIndex: 600
    }}>
      <div style={{
        position: "absolute",
        top: scrollY,
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%"
      }}>
        <h1 style={{ marginBottom: "40px", textShadow: "0 0 10px #00ffff" }}>
          LifeQuest
        </h1>

        <p style={{ marginBottom: "20px" }}>Created By</p>
        <h2 style={{ marginBottom: "40px", color: "#44ff88" }}>
          Trevious Moore
        </h2>

        <p style={{ marginBottom: "20px" }}>Special Thanks</p>
        <p style={{ marginBottom: "40px", fontStyle: "italic", color: "#9ad" }}>
          Pinnacle Charter School Student Leadership Council  
          and every student who inspires innovation
        </p>

        <p style={{ marginBottom: "20px" }}>Powered By</p>
        <p style={{ marginBottom: "40px", color: "#ffcc00" }}>
          Microsoft Copilot Collaboration
        </p>

        <p style={{ marginBottom: "20px" }}>© 2025 LifeQuest</p>
        <p style={{ fontSize: "18px", color: "#888" }}>
          Thank you for playing!
        </p>
      </div>
    </div>
  );
}
