import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function CustomizationOverlay({ avatar, onUpdate, onClose }) {
  if (!avatar) return null;

  const handleChange = (key, value) => {
    onUpdate({ ...avatar, [key]: value });
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
      zIndex: 1074,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Avatar Customization
      </h1>

      {/* Avatar preview */}
      <div style={{
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        border: `4px solid ${NeonTheme.colors.gold}`,
        boxShadow: NeonTheme.shadows.goldGlow,
        marginBottom: "20px",
        animation: "avatarGlow 3s infinite alternate",
        backgroundImage: `url(${avatar.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />

      {/* Sliders */}
      <div style={{
        width: "80%",
        background: NeonTheme.colors.dark,
        borderRadius: "10px",
        padding: "20px",
        boxShadow: NeonTheme.shadows.cyanGlow,
        color: NeonTheme.colors.lightText
      }}>
        <h2 style={{ color: NeonTheme.colors.gold }}>Adjustments</h2>
        <label>
          Hair Color
          <input
            type="range"
            min="0"
            max="100"
            value={avatar.hairColor}
            onChange={(e) => handleChange("hairColor", e.target.value)}
            style={{
              width: "100%",
              accentColor: NeonTheme.colors.cyan,
              animation: "sliderGlow 2s infinite alternate"
            }}
          />
        </label>
        <label>
          Outfit Style
          <input
            type="range"
            min="0"
            max="100"
            value={avatar.outfitStyle}
            onChange={(e) => handleChange("outfitStyle", e.target.value)}
            style={{
              width: "100%",
              accentColor: NeonTheme.colors.gold,
              animation: "sliderGlow 2s infinite alternate"
            }}
          />
        </label>
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
          @keyframes avatarGlow {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.gold}; }
            100% { box-shadow: 0 0 25px ${NeonTheme.colors.cyan}; }
          }
          @keyframes sliderGlow {
            0% { box-shadow: 0 0 5px ${NeonTheme.colors.cyan}; }
            100% { box-shadow: 0 0 15px ${NeonTheme.colors.gold}; }
          }
        `}
      </style>
    </div>
  );
}
