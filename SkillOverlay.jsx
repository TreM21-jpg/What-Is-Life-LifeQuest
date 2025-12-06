import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function SkillOverlay({ skills, onActivate, onClose }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1064,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Skills
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
          {skills.map((s, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: NeonTheme.shadows.cyanGlow,
              animation: "skillGlow 3s infinite alternate"
            }}>
              <strong style={{ color: NeonTheme.colors.gold, fontSize: "18px" }}>
                {s.name}
              </strong>
              <p style={{ fontSize: "14px" }}>{s.description}</p>

              {/* Cooldown ring */}
              {s.cooldown > 0 && (
                <svg width="60" height="60" style={{ marginTop: "10px" }}>
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke={NeonTheme.colors.cyan}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${s.cooldown * 10} 200`}
                    style={{
                      filter: `drop-shadow(${NeonTheme.shadows.cyanGlow})`,
                      animation: "cooldownRotate 4s linear infinite"
                    }}
                  />
                </svg>
              )}

              <button
                onClick={() => onActivate(s)}
                disabled={s.cooldown > 0}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: s.cooldown > 0 ? NeonTheme.colors.red : NeonTheme.colors.green,
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: s.cooldown > 0 ? "not-allowed" : "pointer",
                  fontWeight: "700",
                  ...NeonTheme.animations.pulse
                }}
              >
                {s.cooldown > 0 ? `Cooldown (${s.cooldown}s)` : "Activate"}
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
          @keyframes skillGlow {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.cyan}; }
            100% { box-shadow: 0 0 20px ${NeonTheme.colors.gold}; }
          }
          @keyframes cooldownRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
