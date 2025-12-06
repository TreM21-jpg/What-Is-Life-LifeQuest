import React from "react";

export default function DialogueTree({ npc, questData, onChoice }) {
  if (!npc) return null;

  // Filter quests for this NPC and zone
  const npcQuests = questData.filter(
    (q) => q.npc === npc.name && q.zone === npc.zone
  );

  if (npcQuests.length === 0) {
    return (
      <div style={{
        position: "absolute", bottom: "20px", right: "20px",
        background: "#0a0a0a", border: "1px solid #00ffff",
        borderRadius: "10px", padding: "12px 16px",
        width: "320px", fontFamily: "Orbitron, sans-serif",
        color: "#cfffff", zIndex: 20
      }}>
        <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
          {npc.name}
        </div>
        <div style={{ fontStyle: "italic", color: "#9ad" }}>
          No quests available here.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute", bottom: "20px", right: "20px",
      background: "#0a0a0a", border: "1px solid #00ffff",
      borderRadius: "10px", padding: "12px 16px",
      width: "320px", fontFamily: "Orbitron, sans-serif",
      color: "#cfffff", zIndex: 20
    }}>
      {npcQuests.map((quest) => (
        <div key={quest.id} style={{ marginBottom: "16px" }}>
          <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
            {quest.npc} ({quest.zone})
          </div>
          {quest.dialogue.map((line, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ marginBottom: "8px" }}>{line.text}</div>
              {line.choices.map((choice, j) => (
                <button
                  key={j}
                  onClick={() => onChoice(choice.text, choice.effect)}
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    width: "100%",
                    background: "#00ffff",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontFamily: "Orbitron, sans-serif"
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
