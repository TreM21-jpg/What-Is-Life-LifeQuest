import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function LeaderboardOverlay({ players, onClose }) {
  if (!players || players.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1077,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Leaderboard
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
        <ol style={{ paddingLeft: "20px" }}>
          {players.map((p, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: NeonTheme.shadows.cyanGlow,
              animation: "rankGlow 3s infinite alternate"
            }}>
              <strong style={{
                color: i === 0 ? NeonTheme.colors.gold : NeonTheme.colors.green,
                fontSize: "18px"
              }}>
                {i + 1}. {p.name}
              </strong>
              <p style={{ fontSize: "14px" }}>Score: {p.score}</p>

              {/* Climb/Fall indicator */}
              {p.change > 0 && (
                <span style={{
                  color: NeonTheme.colors.green,
                  animation: "climbPulse 2s infinite"
                }}>▲ +{p.change}</span>
              )}
              {p.change < 0 && (
                <span style={{
                  color: NeonTheme.colors.red,
                  animation: "fallPulse 2s infinite"
                }}>▼ {p.change}</span>
              )}

              {/* Crown for #1 */}
              {i === 0 && (
                <span style={{
                  fontSize: "20px",
                  color: NeonTheme.colors.gold,
                  animation: "crownPulse 2s infinite"
                }}>
                  👑
                </span>
              )}
            </li>
          ))}
        </ol>
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
          @keyframes rankGlow {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.cyan}; }
            100% { box-shadow: 0 0 25px ${NeonTheme.colors.gold}; }
          }
          @keyframes crownPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes climbPulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          @keyframes fallPulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
