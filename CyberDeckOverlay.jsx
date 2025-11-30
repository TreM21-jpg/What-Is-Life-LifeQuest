import React from "react";

export default function CyberDeckOverlay({ slots, onEquip, onClose }) {
  if (!slots || slots.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1026,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        CyberDeck Loadout
      </h1>

      {/* Deck slots */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "20px",
        boxShadow: "0 0 10px #00ffff",
        overflowY: "auto",
        maxHeight: "70vh"
      }}>
        {slots.map((slot, i) => (
          <div key={i} style={{
            background: slot.equipped ? "#044" : "#222",
            border: "2px solid #00ffff",
            borderRadius: "10px",
            padding: "12px",
            textAlign: "center",
            boxShadow: slot.equipped ? "0 0 15px #44ff88" : "0 0 10px #555"
          }}>
            <strong style={{ color: "#ffcc00", fontSize: "16px" }}>
              {slot.name || `Slot ${i + 1}`}
            </strong>
            <p style={{ fontSize: "14px", color: "#cfffff" }}>
              {slot.description || "Empty"}
            </p>
            {!slot.equipped && (
              <button
                onClick={() => onEquip(slot)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: "#00ffff",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "700"
                }}
              >
                Equip
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#00ffff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700"
        }}
      >
        Close
      </button>
    </div>
  );
}
