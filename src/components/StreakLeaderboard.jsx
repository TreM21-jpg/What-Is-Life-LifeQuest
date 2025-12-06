/**
 * Leaderboard Component – Shows top inspiration streakers
 * Displays player rankings with streak achievements and incentivizes competition
 */

import React, { useState, useEffect } from "react";
import { getStreakData, getTopStreakers, getStreakMilestone } from "./StreakTracker.ts";

export default function StreakLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerRank, setPlayerRank] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const topStreakers = getTopStreakers();
    setLeaderboard(topStreakers);

    const playerData = getStreakData();
    setCurrentStreak(playerData.currentStreak);

    // Find player rank (simulated - in real app, would match against current user)
    const playerIndex = topStreakers.findIndex((s) => s.isCurrentPlayer);
    setPlayerRank(playerIndex >= 0 ? playerIndex + 1 : null);
  }, []);

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(40, 0, 60, 0.95))",
        border: "2px solid",
        borderImage: "linear-gradient(135deg, #00d4ff, #ff0066) 1",
        borderRadius: "16px",
        padding: "24px",
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 0 40px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)",
      }}
    >
      {/* Header */}
      <h2
        style={{
          color: "#00d4ff",
          fontSize: "18px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "2px",
          margin: "0 0 20px 0",
          textAlign: "center",
        }}
      >
        🏆 Inspiration Leaderboard
      </h2>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {/* Silver (2nd place) */}
          {leaderboard[1] && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(192, 192, 192, 0.1), rgba(192, 192, 192, 0.05))",
                border: "2px solid rgba(192, 192, 192, 0.3)",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🥈</div>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#c0c0c0",
                  textTransform: "uppercase",
                }}
              >
                {leaderboard[1].name}
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#c0c0c0",
                }}
              >
                {leaderboard[1].streak}
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "11px",
                  color: "rgba(192, 192, 192, 0.7)",
                }}
              >
                {leaderboard[1].icon}
              </p>
            </div>
          )}

          {/* Gold (1st place) */}
          {leaderboard[0] && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.08))",
                border: "2px solid rgba(255, 215, 0, 0.4)",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                transform: "scale(1.1)",
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "8px" }}>👑</div>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#ffd700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {leaderboard[0].name}
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "32px",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {leaderboard[0].streak}
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "11px",
                  color: "rgba(255, 215, 0, 0.8)",
                }}
              >
                {leaderboard[0].icon}
              </p>
            </div>
          )}

          {/* Bronze (3rd place) */}
          {leaderboard[2] && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(205, 127, 50, 0.1), rgba(205, 127, 50, 0.05))",
                border: "2px solid rgba(205, 127, 50, 0.3)",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🥉</div>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#cd7f32",
                  textTransform: "uppercase",
                }}
              >
                {leaderboard[2].name}
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#cd7f32",
                }}
              >
                {leaderboard[2].streak}
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "11px",
                  color: "rgba(205, 127, 50, 0.7)",
                }}
              >
                {leaderboard[2].icon}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div style={{ overflowX: "auto", marginBottom: "16px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  borderBottom: "2px solid rgba(0, 212, 255, 0.2)",
                  color: "#00d4ff",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                Rank
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  borderBottom: "2px solid rgba(0, 212, 255, 0.2)",
                  color: "#00d4ff",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                Player
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "12px 8px",
                  borderBottom: "2px solid rgba(0, 212, 255, 0.2)",
                  color: "#00d4ff",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                Streak
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "12px 8px",
                  borderBottom: "2px solid rgba(0, 212, 255, 0.2)",
                  color: "#00d4ff",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                Milestone
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => {
              const isCurrentPlayer = player.isCurrentPlayer;
              const milestone = getStreakMilestone(player.streak);

              return (
                <tr
                  key={index}
                  style={{
                    background: isCurrentPlayer
                      ? "rgba(0, 212, 255, 0.15)"
                      : index % 2 === 0
                      ? "rgba(0, 0, 0, 0.2)"
                      : "transparent",
                    borderBottom: "1px solid rgba(0, 212, 255, 0.1)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrentPlayer) {
                      e.currentTarget.style.background = "rgba(0, 212, 255, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isCurrentPlayer
                      ? "rgba(0, 212, 255, 0.15)"
                      : index % 2 === 0
                      ? "rgba(0, 0, 0, 0.2)"
                      : "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "12px 8px",
                      color: "#00d4ff",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {getRankBadge(index + 1)}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      color: isCurrentPlayer ? "#00d4ff" : "rgba(0, 212, 255, 0.8)",
                      fontWeight: isCurrentPlayer ? "700" : "500",
                    }}
                  >
                    {player.name}
                    {isCurrentPlayer && (
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "11px",
                          color: "#ff0066",
                          fontWeight: "600",
                          textTransform: "uppercase",
                        }}
                      >
                        (You)
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      textAlign: "center",
                      color: isCurrentPlayer ? "#00d4ff" : "rgba(0, 212, 255, 0.8)",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {player.streak}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      textAlign: "center",
                      fontSize: "18px",
                    }}
                  >
                    {milestone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Encouragement message for player */}
      {playerRank && (
        <div
          style={{
            background: "rgba(0, 212, 255, 0.1)",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "8px",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "13px", color: "#00d4ff" }}>
            You're ranked <strong>#{playerRank}</strong> with a{" "}
            <strong>{currentStreak}-day</strong> streak! Keep going! 🚀
          </p>
        </div>
      )}
    </div>
  );
}
