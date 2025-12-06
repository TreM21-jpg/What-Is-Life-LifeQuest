import React from "react";

export default function DialogueChoicesOverlay({ dialogue, choices, onSelect, onClose }) {
  if (!dialogue || !choices || choices.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      background: "rgba(0,0,0,0.85)",
      borderTop: "3px solid #00ffff",
      padding: "20px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 1019,
      boxShadow: "0 0 15px #00ffff"
    }}>
      {/* Dialogue text */}
      <p style={{
        fontSize: "18px",
        marginBottom: "20px",
        color: "#ffcc00",
        textShadow: "0 0 10px #ffcc00"
      }}>
        {dialogue}
      </p>

      {/* Choices */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => onSelect(choice)}
            style={{
              padding: "12px",
              background: "#111",
              color: "#00ffff",
              border: "2px solid #00ffff",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "700",
              textAlign: "left",
              boxShadow: "0 0 10px #00ffff",
              transition: "background 0.3s ease, color 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#00ffff";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#111";
              e.target.style.color = "#00ffff";
            }}
          >
            {choice.text}
          </button>
        ))}
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#ff4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Close
        </button>
      )}
    </div>
  );
}
