import React, { useEffect, useState } from "react";

export default function LoadingScreen({ message = "Loading...", onFinish }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-finish after 3 seconds (or tie into asset loading logic)
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 700
    }}>
      <h1 style={{
        color: "#00ffff",
        fontSize: "36px",
        textShadow: "0 0 15px #00ffff",
        marginBottom: "20px"
      }}>
        {message}{dots}
      </h1>
      <div style={{
        width: "200px",
        height: "8px",
        background: "#333",
        borderRadius: "6px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${(dots.length / 3) * 100}%`,
          height: "100%",
          background: "#00ffff",
          transition: "width 0.5s ease"
        }} />
      </div>
    </div>
  );
}
