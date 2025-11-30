import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function GearOverlay({ gear, onUpgrade, onClose }) {
  if (!gear || gear.length === 0) return null;

  const rarityColors = {
    common: NeonTheme.colors.cyan,
    rare: NeonTheme.colors.green,
    epic: NeonTheme.colors.gold,
    legendary: NeonTheme.colors.red
  };

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1063,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Gear
      </h1>

      <div style={{
        flexGrow: 1,
        width: "80%",
        background: NeonTheme.colors.dark,
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: NeonTheme.shadows.cyanGlow,
        color: NeonTheme.colors.lightText
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {gear.map((g, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${rarityColors[g.rarity] || NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: `${NeonTheme.shadows.cyanGlow}, ${NeonTheme.shadows.goldGlow}`,
              animation: g.rarity === "legendary" ? "legendaryPulse 2s infinite" : "rarityGlow 3s infinite alternate"
            }}>
              <strong style={{ color: rarityColors[g.rarity], fontSize: "18px" }}>
                {g.name} ({g.rarity})
              </strong>
              <p style={{ fontSize: "14px" }}>{g.description}</p>

              <button
                onClick={() => onUpgrade(g)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: NeonTheme.colors.gold,
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "700",
                  animation: "upgradePulse 2s infinite"
                }}
              >
                Upgrade
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
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
          @keyframes rarityGlow {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.cyan}; }
            100% { box-shadow: 0 0 20px ${NeonTheme.colors.gold}; }
          }
          @keyframes legendaryPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes upgradePulse {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.gold}; }
            100% { box-shadow: 0 0 25px ${NeonTheme.colors.green}; }
          }
        `}
      </style>
    </div>
  );
}
