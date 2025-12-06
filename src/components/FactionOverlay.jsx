import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function FactionOverlay({ factions, onClose }) {
  if (!factions || factions.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1039,
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
        Faction Reputation
      </h1>

      {/* Faction list */}
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
          {factions.map((faction, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: NeonTheme.shadows.cyanGlow
            }}>
              <strong style={{ color: NeonTheme.colors.gold, fontSize: "18px" }}>
                {faction.name}
              </strong>
              <p style={{ fontSize: "14px" }}>{faction.description}</p>

              {/* Reputation bar */}
              <div style={{
                height: "12px",
                background: "#333",
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "8px",
                boxShadow: NeonTheme.shadows.cyanGlow
              }}>
                <div style={{
                  width: `${faction.reputation}%`,
                  height: "100%",
                  background:
                    faction.reputation >= 70
                      ? NeonTheme.colors.green
                      : faction.reputation >= 40
                      ? NeonTheme.colors.gold
                      : NeonTheme.colors.red,
                  transition: "width 0.3s ease"
                }} />
              </div>
              <p style={{ fontSize: "12px", color: NeonTheme.colors.mutedText, marginTop: "4px" }}>
                Reputation: {faction.reputation}%
              </p>

              {/* Perks */}
              {faction.perks && faction.perks.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <h3 style={{ color: NeonTheme.colors.green, fontSize: "14px" }}>Perks:</h3>
                  <ul style={{ listStyle: "disc", marginLeft: "20px" }}>
                    {faction.perks.map((perk, j) => (
                      <li key={j}>{perk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Close button */}
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
    </div>
  );
}
