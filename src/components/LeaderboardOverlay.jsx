/**
 * LeaderboardOverlay.jsx (Enhanced)
 * 
 * Global leaderboard with backend integration
 * Supports persistent rankings, multiple sort options, time periods
 */

import React, { useState, useEffect } from "react";
import { backendAPI } from "../services/BackendAPI.js";
import NeonTheme from "./NeonTheme.js";

export default function LeaderboardOverlay({ players, onClose }) {
  const [entries, setEntries] = useState(players || []);
  const [playerRank, setPlayerRank] = useState(null);
  const [sortBy, setSortBy] = useState("xp");
  const [period, setPeriod] = useState("allTime");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!players || players.length === 0) {
      loadLeaderboard();
    }
  }, []);

  async function loadLeaderboard() {
    try {
      setIsLoading(true);
      const data = await backendAPI.getLeaderboard({
        limit: 50,
        period,
        sortBy
      });
      setEntries(data);

      const rank = await backendAPI.getPlayerRank(sortBy);
      setPlayerRank(rank);
    } catch (error) {
      console.warn("Failed to load leaderboard from backend, using local data");
    } finally {
      setIsLoading(false);
    }
  }

  if (!entries || entries.length === 0) return null;

  const getMedalEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
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
        🏆 LEADERBOARD
      </h1>

      {/* Controls */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {["xp", "questsCompleted", "playtime"].map((option) => (
          <button
            key={option}
            onClick={() => { setSortBy(option); loadLeaderboard(); }}
            style={{
              padding: "8px 12px",
              background: sortBy === option ? NeonTheme.colors.cyan : "transparent",
              color: sortBy === option ? "#000" : NeonTheme.colors.cyan,
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold"
            }}
          >
            {option === "xp" ? "XP" : option === "questsCompleted" ? "Quests" : "Time"}
          </button>
        ))}
      </div>

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
          {entries.map((p, i) => (
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
                color: i === 0 ? NeonTheme.colors.gold : i === 1 ? NeonTheme.colors.cyan : NeonTheme.colors.green,
                fontSize: "18px"
              }}>
                {getMedalEmoji(i + 1)} {p.name}
              </strong>
              <p style={{ fontSize: "14px" }}>
                {sortBy === "xp" ? `XP: ${p.xp || 0}` : sortBy === "questsCompleted" ? `Quests: ${p.questsCompleted || 0}` : `Time: ${p.playtime || 0}h`}
              </p>

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
