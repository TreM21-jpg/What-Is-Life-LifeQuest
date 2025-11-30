import React from "react";

export default function ProgressionTimeline({ currentStage }) {
  const stages = ["Elementary", "Middle", "High/Adult"];

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#0a0a0a",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "12px 16px",
      width: "400px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 20,
      textAlign: "center"
    }}>
      <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
        Progression Timeline
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {stages.map((stage, i) => {
          const isActive = stage === currentStage;
          const isCompleted =
            stages.indexOf(currentStage) > i; // earlier stages are completed

          return (
            <div key={i} style={{ flex: 1 }}>
              <div
                style={{
                  margin: "0 auto",
                  width: "80px",
                  padding: "6px",
                  borderRadius: "6px",
                  background: isActive
                    ? "#00ffff"
                    : isCompleted
                    ? "#44ff88"
                    : "#333",
                  color: isActive ? "#000" : "#fff",
                  fontWeight: isActive ? "700" : "400",
                  marginBottom: "6px"
                }}
              >
                {stage}
              </div>
              {i < stages.length - 1 && (
                <div
                  style={{
                    height: "4px",
                    background: isCompleted ? "#44ff88" : "#555",
                    margin: "0 10px"
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
