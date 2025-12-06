import React from "react";

export default function ObjectiveTracker({ objectives, onCompleteObjective }) {
  return (
    <div style={{
      position: "absolute",
      top: "120px",
      left: "20px",
      background: "#0a0a0a",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "12px 16px",
      width: "240px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 25
    }}>
      <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
        Current Objectives
      </div>
      {objectives && objectives.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {objectives.map((obj, i) => (
            <li key={i} style={{
              marginBottom: "6px",
              padding: "6px",
              background: "#111",
              borderRadius: "6px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>⬜ {obj}</span>
              <button
                onClick={() => onCompleteObjective(obj)}
                style={{
                  background: "#44ff88",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "12px",
                  color: "#000"
                }}
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ fontStyle: "italic", color: "#9ad" }}>
          No active objectives.
        </div>
      )}
    </div>
  );
}
