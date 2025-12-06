import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function EmoteWheelOverlay({ emotes, onSelect, onClose }) {
  if (!emotes || emotes.length === 0) return null;

  const centerX = 300;
  const centerY = 300;
  const radius = 180;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1073,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Emote Wheel
      </h1>

      <svg width="600" height="600" style={{ marginBottom: "20px" }}>
        {emotes.map((emote, i) => {
          const angle = (i / emotes.length) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <g key={i} onClick={() => onSelect(emote)} style={{ cursor: "pointer" }}>
              <circle
                cx={x}
                cy={y}
                r={40}
                fill={NeonTheme.colors.mid}
                stroke={NeonTheme.colors.cyan}
                strokeWidth="2"
                style={{
                  filter: `drop-shadow(${NeonTheme.shadows.cyanGlow})`,
                  animation: "radialPulse 2s infinite"
                }}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill={NeonTheme.colors.gold}
                fontSize="14px"
              >
                {emote.label}
              </text>
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
          @keyframes radialPulse {
            0% { r: 40; }
            50% { r: 48; }
            100% { r: 40; }
          }
        `}
      </style>
    </div>
  );
}
