import React from "react";

export default function Inventory({ items }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      background: "#111",
      color: "#00ffff",
      padding: "10px",
      borderRadius: "8px",
      fontFamily: "Orbitron, sans-serif",
      border: "1px solid #00ffff",
      zIndex: 10
    }}>
      <h3>Inventory</h3>
      <ul>
        {items.length === 0 ? <li>Empty</li> : items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
