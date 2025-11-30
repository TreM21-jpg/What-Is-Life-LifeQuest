import React from "react";

export default function GameMenu({ showMenu, setShowMenu, onRestart }) {
  if (!showMenu) return null;

  return (
    <div style={{
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#0f0f0f",
      color: "#00ffff",
      padding: "20px",
      borderRadius: "12px",
      border: "2px solid #00ffff",
      zIndex: 10,
      fontFamily: "Orbitron, sans-serif"
    }}>
      <h2>Game Menu</h2>
      <button onClick={() => setShowMenu(false)}>Resume</button>
      <button onClick={onRestart}>Restart</button>
      <button onClick={() => alert("Music toggled!")}>Toggle Music</button>
    </div>
  );
}
