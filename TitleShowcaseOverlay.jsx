import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function TitleShowcaseOverlay({ title, onClose }) {
  if (!title) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1069,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      {/* Cinematic Title */}
      <h1 style={{
        color: NeonTheme.colors.gold,
        fontSize: "56px",
        marginBottom: "20px",
        textShadow: `${NeonTheme.shadows.goldGlow}, ${NeonTheme.shadows.cyanGlow}`,
        letterSpacing: "4px",
        animation: "titlePulse 2s infinite"
      }}>
        {title}
      </h1>

      {/* Particle burst layers */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}>
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "200px", height: "200px",
          borderRadius: "50%",
          border: `3px solid ${NeonTheme.colors.cyan}`,
          animation: "burstExpand 3s infinite"
        }} />
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "300px", height: "300px",
          borderRadius: "50%",
          border: `2px dashed ${NeonTheme.colors.gold}`,
          animation: "burstRotate 6s linear infinite"
        }} />
      </div>

      <p style={{
        fontSize: "20px",
        color: NeonTheme.colors.lightText,
        textShadow: NeonTheme.shadows.cyanGlow,
        marginTop: "40px"
      }}>
        Rare Title Unlocked
      </p>

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
          @keyframes titlePulse {
            0% { text-shadow: 0 0 10px ${NeonTheme.colors.gold}; }
            50% { text-shadow: 0 0 25px ${NeonTheme.colors.cyan}; }
            100% { text-shadow: 0 0 10px ${NeonTheme.colors.gold}; }
          }
          @keyframes burstExpand {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes burstRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
