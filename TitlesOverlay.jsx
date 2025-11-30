import React from "react";

export default function TitlesOverlay({ titles, equippedTitle, onEquip, onClose }) {
  if (!titles || titles.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1009,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Player Titles
      </h1>

      {/* Equipped title */}
      <p style={{ color: "#44ff88", fontSize: "18px", marginBottom: "20px" }}>
        Currently Equipped: {equippedTitle || "None"}
      </p>

      {/* Titles list */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: "0 0 10px #00ffff"
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {titles.map((title, i) => (
            <li key={i} style={{
              marginBottom: "16px",
              padding: "12px",
              background: title.unlocked ? "#044" : "#222",
              borderRadius: "8px",
              boxShadow: title.unlocked ? "0 0 15px #44ff88" : "0 0 10px #555",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <strong style={{ color: title.unlocked ? "#44ff88" : "#ffcc00" }}>
                  {title.name}
                </strong>
                <p style={{ fontSize: "14px", color: "#cfffff" }}>{title.description}</p>
              </div>
              {title.unlocked ? (
                <button
                  onClick={() => onEquip(title)}
                  style={buttonStyle("#00ffff", "#000")}
                >
                  Equip
                </button>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9ad" }}>Locked</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={buttonStyle("#ff4444", "#fff")}
      >
        Close
      </button>
    </div>
  );
}

function buttonStyle(bg, color) {
  return {
    marginTop: "10px",
    padding: "10px 20px",
    background: bg,
    color: color,
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: `0 0 10px ${bg}`
  };
}
