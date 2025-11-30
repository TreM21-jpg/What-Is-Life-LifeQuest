import React, { useEffect, useState } from "react";

export default function Minimap({ playerRef }) {
  const [pos, setPos] = useState({ x: 0, z: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef?.current) {
        setPos({
          x: playerRef.current.position.x,
          z: playerRef.current.position.z
        });
      }
    }, 100); // update every 100ms
    return () => clearInterval(interval);
  }, [playerRef]);

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      background: "#0a0a0a",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "8px",
      width: "160px",
      height: "160px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 12
    }}>
      <div style={{ color: "#00ffff", marginBottom: "6px", fontWeight: 700 }}>
        Minimap
      </div>
      <svg width="140" height="120" style={{ background: "#111", borderRadius: "6px" }}>
        {/* Zones (simple rectangles for demo) */}
        <rect x="60" y="40" width="20" height="20" fill="#88c" /> {/* School */}
        <rect x="100" y="40" width="20" height="20" fill="#c88" /> {/* Playground */}
        <rect x="20" y="40" width="20" height="20" fill="#4c4" /> {/* Park */}
        <rect x="60" y="80" width="20" height="20" fill="#933" /> {/* Battle */}
        <rect x="60" y="0" width="20" height="20" fill="#cc8" /> {/* Home */}

        {/* Player dot */}
        <circle
          cx={70 + pos.x * 5}
          cy={50 + pos.z * 5}
          r="5"
          fill="#00ffff"
        />
      </svg>
      <div style={{ marginTop: "6px", fontSize: "12px" }}>
        X: {pos.x.toFixed(1)} | Z: {pos.z.toFixed(1)}
      </div>
    </div>
  );
}
