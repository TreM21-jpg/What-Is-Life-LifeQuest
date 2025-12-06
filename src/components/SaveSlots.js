import React, { useState, useEffect } from "react";

export default function SaveSlots({ onLoad }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage).filter(k => k.startsWith("lifequest-slot-"));
    const savedSlots = allKeys.map(k => ({
      key: k,
      data: JSON.parse(localStorage.getItem(k))
    }));
    setSlots(savedSlots);
  }, []);

  return (
    <div style={container}>
      <h2>Select Save Slot</h2>
      {slots.map((slot, i) => (
        <button key={i} onClick={() => onLoad(slot.data)} style={button}>
          Slot {i + 1}: {slot.data.name || "Unnamed"} | Level {slot.data.level}
        </button>
      ))}
      <button onClick={() => onLoad(null)} style={button}>New Game</button>
    </div>
  );
}

const container = {
  position: "absolute",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "#000",
  color: "#00ffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Orbitron, sans-serif",
  zIndex: 100
};

const button = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "18px",
  background: "#0f0f0f",
  color: "#00ffff",
  border: "2px solid #00ffff",
  borderRadius: "8px",
  cursor: "pointer"
};
