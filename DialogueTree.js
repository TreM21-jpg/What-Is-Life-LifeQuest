import React from "react";

/**
 * DialogueTree Component
 * Renders NPC dialogue, choices, and quest outcomes.
 * Accepts props:
 *  - npc: { name, zone }
 *  - questData: array of quest objects (JSON)
 *  - onChoice: callback(text, effect)
 */

export default function DialogueTree({ npc, questData = [], onChoice }) {
  if (!npc) return null;

  // Filter quests by zone or NPC
  const availableQuests = questData.filter(
    (q) => q.npc === npc.name || q.zone === npc.zone
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#111",
        color: "#00ffff",
        padding: "16px",
        borderRadius: "12px",
        fontFamily: "Orbitron, sans-serif",
        border: "2px solid #00ffff",
        width: "80%",
        zIndex: 50,
      }}
    >
      <h2>{npc.name} ({npc.zone})</h2>
      {availableQuests.length === 0 && (
        <p>No quests available here right now.</p>
      )}

      {availableQuests.map((quest, i) => (
        <div
          key={i}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #00ffff",
            borderRadius: "8px",
          }}
        >
          <h3>{quest.quest}</h3>
          <p><strong>Objective:</strong> {quest.objective}</p>
          <p><strong>Dialogue:</strong> {quest.dialogue}</p>

          {/* Choices */}
          {quest.choices && quest.choices.length > 0 ? (
            <div style={{ marginTop: "10px" }}>
              {quest.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => onChoice(choice.text, choice.effect)}
                  style={{
                    display: "block",
                    margin: "5px 0",
                    padding: "8px",
                    background: "#00ffff",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => onChoice("Accept Quest", quest.reward)}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#00ffff",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Accept Quest
            </button>
          )}

          {/* Rewards & Consequences */}
          <p style={{ marginTop: "10px" }}>
            <strong>Reward:</strong> {quest.reward?.xp} XP, {quest.reward?.item}
          </p>
          {quest.consequence && (
            <p style={{ color: "#ff4444" }}>
              <strong>Consequence:</strong> {quest.consequence}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
