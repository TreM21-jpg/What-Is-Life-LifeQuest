import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function BuffSynergyOverlay({ buffs, onClose }) {
  if (!buffs || buffs.length === 0) return null;

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
      zIndex: 1052,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      {/* Title */}
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Buff Synergy Map
      </h1>

      {/* Synergy graph */}
      <svg width="600" height="600" style={{ marginBottom: "20px" }}>
        {buffs.map((buff, i) => {
          const angle = (i / buffs.length) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <g key={i}>
              {/* Pulsing Node */}
              <circle
                cx={x}
                cy={y}
                r={30}
                fill={NeonTheme.colors.mid}
                stroke={NeonTheme.colors.cyan}
                strokeWidth="2"
                style={{
                  filter: `drop-shadow(${NeonTheme.shadows.cyanGlow})`,
                  animation: "pulseNode 2s infinite"
                }}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill={NeonTheme.colors.gold}
                fontSize="14px"
              >
                {buff.name}
              </text>

              {/* Curved Synergy Lines */}
              {buff.synergies && buff.synergies.map((targetIndex) => {
                const targetAngle = (targetIndex / buffs.length) * 2 * Math.PI;
                const tx = centerX + radius * Math.cos(targetAngle);
                const ty = centerY + radius * Math.sin(targetAngle);

                const midX = (x + tx) / 2 + 40 * Math.sin(angle);
                const midY = (y + ty) / 2 - 40 * Math.cos(angle);

                return (
                  <path
                    key={`${i}-${targetIndex}`}
                    d={`M ${x} ${y} Q ${midX} ${midY} ${tx} ${ty}`}
                    stroke={NeonTheme.colors.green}
                    strokeWidth="2"
                    fill="none"
                    style={{
                      filter: `drop-shadow(${NeonTheme.shadows.greenGlow})`,
                      strokeDasharray: "6 4",
                      animation: "dashFlow 3s linear infinite"
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Close button */}
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

      {/* Inline CSS Animations */}
      <style>
        {`
          @keyframes pulseNode {
            0% { r: 30; }
            50% { r: 36; }
            100% { r: 30; }
          }
          @keyframes dashFlow {
            to { stroke-dashoffset: -20; }
          }
        `}
      </style>
    </div>
  );
}
