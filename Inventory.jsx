import React from "react";

export default function Inventory({ items, onUseItem }) {
  if (!items || items.length === 0) {
    return (
      <div style={{
        position: "absolute",
        bottom: "200px",
        left: "20px",
        background: "#0a0a0a",
        border: "1px solid #00ffff",
        borderRadius: "10px",
        padding: "12px 16px",
        width: "200px",
        fontFamily: "Orbitron, sans-serif",
        color: "#cfffff",
        zIndex: 20
      }}>
        <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
          Inventory
        </div>
        <div style={{ fontStyle: "italic", color: "#9ad" }}>
          Empty
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute",
      bottom: "200px",
      left: "20px",
      background: "#0a0a0a",
      border: "1px solid #00ffff",
      borderRadius: "10px",
      padding: "12px 16px",
      width: "200px",
      fontFamily: "Orbitron, sans-serif",
      color: "#cfffff",
      zIndex: 20
    }}>
      <div style={{ color: "#00ffff", marginBottom: "8px", fontWeight: 700 }}>
        Inventory
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px"
        }}>
          <span>{item}</span>
          <button
            onClick={() => onUseItem(item)}
            style={{
              background: "#00ffff",
              border: "none",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "12px",
              color: "#000"
            }}
          >
            Use
          </button>
        </div>
      ))}
    </div>
  );
}
