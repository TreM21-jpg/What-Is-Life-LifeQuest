import React from "react";

export default function ItemDetailOverlay({ item, onBuy, onClose }) {
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
      zIndex: 995,
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

      {/* Preview image (optional) */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
            marginBottom: "20px",
            border: "2px solid #00ffff",
            borderRadius: "10px",
            boxShadow: "0 0 15px #00ffff"
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

      {/* Cost */}
      <div style={{
        marginBottom: "20px",
        color: "#44ff88",
        fontWeight: "700"
      }}>
        Cost: 🪙 {item.cost.coins || 0} | 💎 {item.cost.gems || 0} | 🎟 {item.cost.tokens || 0}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => onBuy(item)}
          style={{
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
          Buy
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "12px 24px",
            background: "#ff4444",
            color: "#fff",
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
    </div>
  );
}
