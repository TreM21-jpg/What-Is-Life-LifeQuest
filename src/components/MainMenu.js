import React from "react";

export default function MainMenu({ onStart, onCustomize, onSettings }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 100
    }}>
      <h1 style={{
        color: "#00ffff",
        fontSize: "48px",
        marginBottom: "40px",
        textShadow: "0 0 10px #00ffff"
      }}>LIFEQUEST</h1>

      <button onClick={onStart} style={buttonStyle}>PLAY</button>
      <button onClick={onCustomize} style={buttonStyle}>CUSTOMIZE</button>
      <button onClick={onSettings} style={buttonStyle}>SETTINGS</button>
    </div>
  );
}

const buttonStyle = {
  background: "#0f0f0f",
  color: "#00ffff",
  border: "2px solid #00ffff",
  borderRadius: "8px",
  padding: "12px 24px",
  fontSize: "20px",
  margin: "10px",
  cursor: "pointer"
};
