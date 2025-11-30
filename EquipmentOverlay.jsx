import React from "react";

export default function EquipmentOverlay({ equipment, onUnequip, onClose }) {
  if (!equipment) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 997,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "36px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Equipped Gear
      </h1>

      {/* Gear slots */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        width: "80%",
        marginBottom: "30px"
      }}>
        {["Weapon", "Armor", "Accessory"].map((slot, i) => {
          const item = equipment[slot.toLowerCase()];
          return (
            <div key={i} style={{
              background: "#111",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px #00ffff"
            }}>
              <h3 style={{ color: "#ffcc00", marginBottom: "10px" }}>{slot}</h3>
              {item ? (
                <>
                  <strong style={{ color: "#44ff88" }}>{item.name}</strong>
                  <p style={{ fontSize: "14px", color: "#9ad" }}>{item.description}</p>
                  {item.stats && (
                    <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
                      {Object.entries(item.stats).map(([key, value], j) => (
                        <li key={j} style={{ fontSize: "12px", marginBottom: "4px" }}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  )}
                  {onUnequip && (
                    <button
                      onClick={() => onUnequip(slot.toLowerCase())}
                      style={buttonStyle("#ff4444", "#fff")}
                    >
                      Unequip
                    </button>
                  )}
                </>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9ad" }}>Empty slot</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={buttonStyle("#00ffff", "#000")}
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
