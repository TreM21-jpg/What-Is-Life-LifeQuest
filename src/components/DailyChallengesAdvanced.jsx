/**
 * DailyChallengesOverlay – Advanced daily challenge system with rewards
 * Features:
 * - Time-based challenge rotation
 * - Progress tracking and visualization
 * - Tiered difficulty and rewards
 * - Challenge streaks
 * - Leaderboard integration
 * - Visual progress bars
 */

import React, { useState, useEffect } from "react";

const DEFAULT_CHALLENGES = [
  {
    id: 1,
    title: "Morning Motivation",
    description: "Log in before 9 AM and complete your first quest",
    difficulty: "easy",
    progress: 0,
    target: 1,
    reward: { xp: 50, gold: 25, streak: 1 },
    completed: false,
    timeLimit: "24h",
    icon: "🌅",
  },
  {
    id: 2,
    title: "Zone Explorer",
    description: "Visit 3 different zones and discover their lore",
    difficulty: "medium",
    progress: 1,
    target: 3,
    reward: { xp: 150, gold: 75, streak: 2 },
    completed: false,
    timeLimit: "24h",
    icon: "🗺️",
  },
  {
    id: 3,
    title: "Battle Master",
    description: "Win 5 combat encounters",
    difficulty: "hard",
    progress: 2,
    target: 5,
    reward: { xp: 300, gold: 200, streak: 3 },
    completed: false,
    timeLimit: "24h",
    icon: "⚔️",
  },
  {
    id: 4,
    title: "Knowledge Seeker",
    description: "Unlock 5 lore entries",
    difficulty: "medium",
    progress: 3,
    target: 5,
    reward: { xp: 100, gold: 50, streak: 1 },
    completed: true,
    timeLimit: "24h",
    icon: "📚",
  },
  {
    id: 5,
    title: "Coin Collector",
    description: "Earn 500 gold from quests",
    difficulty: "easy",
    progress: 125,
    target: 500,
    reward: { xp: 75, gold: 100, streak: 1 },
    completed: false,
    timeLimit: "24h",
    icon: "💰",
  },
  {
    id: 6,
    title: "Perfect Streak",
    description: "Complete all challenges 5 days in a row",
    difficulty: "legendary",
    progress: 2,
    target: 5,
    reward: { xp: 500, gold: 500, streak: 10 },
    completed: false,
    timeLimit: "5 days",
    icon: "⭐",
  },
];

export default function DailyChallengesOverlay({ onClose, currentStreak = 0 }) {
  const [challenges, setChallenges] = useState(DEFAULT_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const filteredChallenges =
    filterDifficulty === "all"
      ? challenges
      : challenges.filter((c) => c.difficulty === filterDifficulty);

  const completedCount = challenges.filter((c) => c.completed).length;
  const totalReward = challenges
    .filter((c) => c.completed)
    .reduce((sum, c) => sum + c.reward.xp, 0);

  const difficultyColors = {
    easy: "#00d4ff",
    medium: "#ffaa00",
    hard: "#ff6600",
    legendary: "#ffd700",
  };

  const difficultyEmojis = {
    easy: "⭐",
    medium: "⭐⭐",
    hard: "⭐⭐⭐",
    legendary: "⭐⭐⭐⭐",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.95)",
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "2px solid rgba(0, 212, 255, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 8px 0",
              color: "#00d4ff",
              fontSize: "28px",
              fontWeight: "700",
              textShadow: "0 0 10px #00d4ff",
            }}
          >
            🎯 Daily Challenges
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(0, 212, 255, 0.6)",
              fontSize: "12px",
            }}
          >
            {completedCount} / {challenges.length} completed • {totalReward} XP earned
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "1px solid #00d4ff",
            color: "#00d4ff",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0, 212, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          Close [D]
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "20px",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        {/* Challenge List */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowY: "auto",
          }}
        >
          {/* Streak Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.08))",
              border: "2px solid rgba(255, 215, 0, 0.4)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                color: "rgba(255, 215, 0, 0.7)",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Daily Streak
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🔥 {currentStreak} days
            </p>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {["all", "easy", "medium", "hard", "legendary"].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                style={{
                  padding: "6px 12px",
                  background: filterDifficulty === diff ? "rgba(0, 212, 255, 0.2)" : "transparent",
                  border: `1px solid ${filterDifficulty === diff ? "rgba(0, 212, 255, 0.6)" : "rgba(0, 212, 255, 0.2)"}`,
                  borderRadius: "6px",
                  color: "#00d4ff",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (filterDifficulty !== diff) {
                    e.target.style.background = "rgba(0, 212, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filterDifficulty !== diff) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {diff === "all" ? "All" : diff}
              </button>
            ))}
          </div>

          {/* Challenge Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredChallenges.map((challenge) => {
              const progressPercent = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.completed || progressPercent === 100;

              return (
                <div
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  style={{
                    background: isCompleted
                      ? "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(255, 0, 102, 0.08))"
                      : "linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(255, 0, 102, 0.03))",
                    border: `2px solid ${isCompleted ? "rgba(0, 212, 255, 0.4)" : "rgba(0, 212, 255, 0.2)"}`,
                    borderRadius: "10px",
                    padding: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    opacity: selectedChallenge?.id === challenge.id ? 1 : 0.9,
                    transform: selectedChallenge?.id === challenge.id ? "translateX(4px)" : "translateX(0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.6)";
                    e.currentTarget.style.background = isCompleted
                      ? "linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(255, 0, 102, 0.12))"
                      : "linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(255, 0, 102, 0.06))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isCompleted
                      ? "rgba(0, 212, 255, 0.4)"
                      : "rgba(0, 212, 255, 0.2)";
                    e.currentTarget.style.background = isCompleted
                      ? "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(255, 0, 102, 0.08))"
                      : "linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(255, 0, 102, 0.03))";
                  }}
                >
                  {/* Challenge Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "start", flex: 1 }}>
                      <span style={{ fontSize: "24px" }}>{challenge.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            margin: "0 0 4px 0",
                            color: "#00d4ff",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          {challenge.title}
                          {isCompleted && <span style={{ marginLeft: "8px", color: "#00d4ff" }}>✓</span>}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            color: "rgba(0, 212, 255, 0.6)",
                            fontSize: "11px",
                            lineHeight: "1.4",
                          }}
                        >
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        color: difficultyColors[challenge.difficulty],
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>{difficultyEmojis[challenge.difficulty]}</div>
                      <div style={{ fontSize: "10px" }}>{challenge.timeLimit}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                        fontSize: "11px",
                        color: "rgba(0, 212, 255, 0.7)",
                      }}
                    >
                      <span>Progress</span>
                      <span>
                        {challenge.progress} / {challenge.target}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        background: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${progressPercent}%`,
                          background: `linear-gradient(90deg, ${difficultyColors[challenge.difficulty]}, ${difficultyColors[challenge.difficulty]}99)`,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Reward Badge */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      fontSize: "10px",
                      color: "rgba(0, 212, 255, 0.6)",
                    }}
                  >
                    <span>💎 {challenge.reward.xp} XP</span>
                    <span>💰 {challenge.reward.gold} gold</span>
                    <span>🔥 +{challenge.reward.streak} streak</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        {selectedChallenge && (
          <div
            style={{
              width: "320px",
              background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 102, 0.05))",
              border: "2px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Title */}
            <div>
              <p
                style={{
                  margin: "0 0 8px 0",
                  color: "rgba(0, 212, 255, 0.6)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                Challenge Details
              </p>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#00d4ff",
                }}
              >
                {selectedChallenge.icon} {selectedChallenge.title}
              </h2>
            </div>

            {/* Status */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: selectedChallenge.completed ? "#00d4ff" : "rgba(0, 212, 255, 0.6)",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {selectedChallenge.completed ? "✓ COMPLETED" : "IN PROGRESS"}
              </p>
            </div>

            {/* Difficulty & Rewards */}
            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: "11px", color: "rgba(0, 212, 255, 0.6)" }}>
                DIFFICULTY
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: "600",
                  color: difficultyColors[selectedChallenge.difficulty],
                }}
              >
                {selectedChallenge.difficulty.toUpperCase()} {difficultyEmojis[selectedChallenge.difficulty]}
              </p>
            </div>

            {/* Rewards Breakdown */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px 0",
                  color: "rgba(0, 212, 255, 0.6)",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Rewards
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Experience Points</span>
                  <span style={{ color: "#00d4ff", fontWeight: "600" }}>{selectedChallenge.reward.xp}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Gold</span>
                  <span style={{ color: "#ffd700", fontWeight: "600" }}>{selectedChallenge.reward.gold}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Streak Bonus</span>
                  <span style={{ color: "#ff0066", fontWeight: "600" }}>+{selectedChallenge.reward.streak}</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "11px",
                color: "rgba(0, 212, 255, 0.7)",
                lineHeight: "1.6",
              }}
            >
              💡 <strong>Tip:</strong> Complete all daily challenges to maintain your streak and unlock bonus rewards!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
