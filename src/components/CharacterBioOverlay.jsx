import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function CharacterBioOverlay({ character, onClose }) {
  if (!character) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1067,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Character Bio
      </h1>

      {/* Portrait */}
      {character.portrait && (
        <img
          src={character.portrait}
          alt="Character Portrait"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: `4px solid ${NeonTheme.colors.gold}`,
            boxShadow: NeonTheme.shadows.goldGlow,
            marginBottom: "20px",
            animation: "portraitGlow 3s infinite alternate"
          }}
        />
      )}

      {/* Stats */}
      <div style={{
        width: "80%",
        background: NeonTheme.colors.dark,
        borderRadius: "10px",
        padding: "20px",
        boxShadow: NeonTheme.shadows.cyanGlow,
        color: NeonTheme.colors.lightText
      }}>
        <h2 style={{ color: NeonTheme.colors.gold }}>Stats</h2>
        <p style={{ animation: "statPulse 2s infinite" }}>Strength: {character.stats.strength}</p>
        <p style={{ animation: "statPulse 2s infinite" }}>Agility: {character.stats.agility}</p>
        <p style={{ animation: "statPulse 2s infinite" }}>Intelligence: {character.stats.intelligence}</p>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "30px",
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
          @keyframes portraitGlow {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.gold}; }
            100% { box-shadow: 0 0 25px ${NeonTheme.colors.cyan}; }
          }
          @keyframes statPulse {
            0% { color: ${NeonTheme.colors.cyan}; }
            50% { color: ${NeonTheme.colors.gold}; }
            100% { color: ${NeonTheme.colors.cyan}; }
          }
        `}
      </style>
    </div>
  );
}
