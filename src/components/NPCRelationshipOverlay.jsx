import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function NPCRelationshipOverlay({ relationships, onClose }) {
  if (!relationships || relationships.length === 0) return null;

  const centerX = 300;
  const centerY = 300;
  const radius = 200;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1068,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        NPC Relationships
      </h1>

      <svg width="600" height="600" style={{ marginBottom: "20px" }}>
        {relationships.map((rel, i) => {
          const angle = (i / relationships.length) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <g key={i}>
              {/* NPC node */}
              <circle
                cx={x}
                cy={y}
                r={25}
                fill={NeonTheme.colors.mid}
                stroke={NeonTheme.colors.cyan}
                strokeWidth="2"
                style={{
                  filter: `drop-shadow(${NeonTheme.shadows.cyanGlow})`,
                  animation: "trustPulse 2s infinite"
                }}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill={NeonTheme.colors.gold}
                fontSize="14px"
              >
                {rel.npc}
              </text>

              {/* Bond line to center */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={rel.trust > 70 ? NeonTheme.colors.green : NeonTheme.colors.red}
                strokeWidth="2"
                style={{
                  filter: `drop-shadow(${NeonTheme.shadows.greenGlow})`,
                  strokeDasharray: "6 4",
                  animation: "bondFlow 3s linear infinite"
                }}
              />
            </g>
          );
        })}
      </svg>

      <button
        onClick={onClose}
        style={{
          padding: "12px 24px",
          background: NeonTheme.colors.cyan,
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700",
          ...NeonTheme.animations.pulse
        }}
      >
        Close
      </button>

      <style>
        {`
          @keyframes trustPulse {
            0% { r: 25; }
            50% { r: 30; }
            100% { r: 25; }
          }
          @keyframes bondFlow {
            to { stroke-dashoffset: -20; }
          }
        `}
      </style>
    </div>
  );
}
