import React, { useState } from "react";

export default function SettingsScreen({ onClose }) {
  const [musicOn, setMusicOn] = useState(true);

  return (
    <div style={container}>
      <h2>Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={musicOn}
          onChange={() => setMusicOn(!musicOn)}
        />
        Toggle Music
      </label>

      <button onClick={onClose} style={button}>Back</button>
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
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "18px",
  background: "#0f0f0f",
  color: "#00ffff",
  border: "2px solid #00ffff",
  borderRadius: "8px",
  cursor: "pointer"
};
