import React from "react";

export default function DialogueOverlay({ npcName, dialogueLines, currentLine, onAdvance }) {
  if (!dialogueLines || dialogueLines.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      background: "rgba(0,0,0,0.85)",
      borderTop: "2px solid #00ffff",
      padding: "20px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 300
    }}>
      {/* NPC Name */}
      <div style={{
        color: "#00ffff",
        fontWeight: "700",
        marginBottom: "10px",
        fontSize: "18px"
      }}>
        {npcName}
      </div>

      {/* Dialogue Line */}
      <div style={{
        fontSize: "16px",
        marginBottom: "20px",
        lineHeight: "1.4"
      }}>
        {dialogueLines[currentLine]}
      </div>

      {/* Advance Button */}
      <div style={{ textAlign: "right" }}>
        <button
          onClick={onAdvance}
          style={{
            padding: "10px 20px",
            background: "#00ffff",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
