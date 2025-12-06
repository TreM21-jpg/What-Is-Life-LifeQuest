import React from "react";

export default function SkillTreeOverlay({ skills, onUnlock, onClose }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1025,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Skill Tree
      </h1>

      {/* Node-based skill tree */}
      <div style={{
        flexGrow: 1,
        width: "90%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflow: "auto",
        boxShadow: "0 0 10px #00ffff",
        position: "relative"
      }}>
        <svg width="100%" height="600px">
          {skills.map((skill, i) => (
            <g key={i}>
              {/* Node */}
              <circle
                cx={skill.x}
                cy={skill.y}
                r="30"
                fill={skill.unlocked ? "#44ff88" : "#222"}
                stroke="#00ffff"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 8px #00ffff)", cursor: "pointer" }}
                onClick={() => onUnlock(skill)}
              />
              {/* Label */}
              <text
                x={skill.x}
                y={skill.y + 50}
                textAnchor="middle"
                fill="#cfffff"
                fontSize="12px"
              >
                {skill.name}
              </text>

              {/* Connections */}
              {skill.connections && skill.connections.map((targetIndex, j) => {
                const target = skills[targetIndex];
                return (
                  <line
                    key={j}
                    x1={skill.x}
                    y1={skill.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="#00ffff"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 6px #00ffff)" }}
                  />
                );
              })}
            </g>
          ))}
        </svg>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#00ffff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700"
        }}
      >
        Close
      </button>
    </div>
  );
}
