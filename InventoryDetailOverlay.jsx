import React from "react";

export default function InventoryDetailOverlay({ item, onEquip, onUse, onDiscard, onClose }) {
  if (!item) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 996,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "36px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        {item.name}
      </h1>

      {/* Preview image */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            marginBottom: "20px",
            border: "2px solid #44ff88",
            borderRadius: "10px",
            boxShadow: "0 0 15px #44ff88"
          }}
        />
      )}

      {/* Description */}
      <p style={{
        color: "#cfffff",
        marginBottom: "20px",
        textAlign: "center",
        maxWidth: "70%"
      }}>
        {item.description}
      </p>

      {/* Stats */}
      {item.stats && (
        <div style={{
          background: "#111",
          padding: "20px",
          borderRadius: "10px",
          width: "60%",
          marginBottom: "20px",
          textAlign: "left"
        }}>
          <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>Stats</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {Object.entries(item.stats).map(([key, value], i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {onEquip && (
          <button
            onClick={() => onEquip(item)}
            style={buttonStyle("#44ff88", "#000")}
          >
            Equip
          </button>
        )}
        {onUse && (
          <button
            onClick={() => onUse(item)}
            style={buttonStyle("#00ffff", "#000")}
          >
            Use
          </button>
        )}
        {onDiscard && (
          <button
            onClick={() => onDiscard(item)}
            style={buttonStyle("#ff4444", "#fff")}
          >
            Discard
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={buttonStyle("#ffcc00", "#000")}
      >
        Close
      </button>
    </div>
  );
}

function buttonStyle(bg, color) {
  return {
    padding: "12px 24px",
    background: bg,
    color: color,
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: `0 0 15px ${bg}`
  };
}
