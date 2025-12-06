import React from "react";

export default function BuffDebuffOverlay({ effects, onExpire }) {
  if (!effects || effects.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "15px",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1000
    }}>
      {effects.map((effect, i) => {
        const isBuff = effect.type === "buff";
        return (
          <div key={i} style={{
            background: isBuff ? "rgba(0,255,255,0.2)" : "rgba(255,0,0,0.2)",
            border: `2px solid ${isBuff ? "#00ffff" : "#ff4444"}`,
            borderRadius: "10px",
            padding: "10px",
            width: "120px",
            textAlign: "center",
            boxShadow: `0 0 10px ${isBuff ? "#00ffff" : "#ff4444"}`
          }}>
            {/* Effect name */}
            <h4 style={{ color: isBuff ? "#44ff88" : "#ff4444", marginBottom: "6px" }}>
              {effect.name}
            </h4>

            {/* Duration */}
            <p style={{ fontSize: "12px", color: "#ffcc00" }}>
              {effect.durationRemaining}s left
            </p>

            {/* Expire callback */}
            {effect.durationRemaining <= 0 && onExpire && (
              <button
                onClick={() => onExpire(effect)}
                style={{
                  marginTop: "6px",
                  padding: "4px 8px",
                  background: "#ffcc00",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: "700"
                }}
              >
                Remove
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
