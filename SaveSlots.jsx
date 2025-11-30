import React, { useState } from "react";

export default function SaveSlots({ onLoad }) {
  const [slots, setSlots] = useState([
    JSON.parse(localStorage.getItem("lifequest_slot1") || "null"),
    JSON.parse(localStorage.getItem("lifequest_slot2") || "null"),
    JSON.parse(localStorage.getItem("lifequest_slot3") || "null")
  ]);

  const handleSave = (index) => {
    const data = {
      timestamp: Date.now(),
      playerInfo: {
        email: "demo@lifequest.com",
        birthday: "2008-09-15",
        gender: "male",
        name: "",
        xp: 0,
        level: 1,
        stage: "Elementary",
        completedQuests: []
      }
    };
    localStorage.setItem(`lifequest_slot${index + 1}`, JSON.stringify(data));
    const updated = [...slots];
    updated[index] = data;
    setSlots(updated);
  };

  const handleLoad = (index) => {
    const data = slots[index];
    if (data) {
      onLoad(data.playerInfo);
    }
  };

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#00ffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 300
    }}>
      <h1 style={{ marginBottom: "20px" }}>Choose Save Slot</h1>
      {slots.map((slot, i) => (
        <div key={i} style={{
          marginBottom: "16px",
          background: "#111",
          padding: "12px 20px",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center"
        }}>
          <div style={{ marginBottom: "8px" }}>
            Slot {i + 1}: {slot ? `Saved on ${new Date(slot.timestamp).toLocaleString()}` : "Empty"}
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={() => handleLoad(i)}
              disabled={!slot}
              style={{
                padding: "8px 16px",
                background: slot ? "#00ffff" : "#555",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: slot ? "pointer" : "not-allowed"
              }}
            >
              Load
            </button>
            <button
              onClick={() => handleSave(i)}
              style={{
                padding: "8px 16px",
                background: "#ffcc00",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
