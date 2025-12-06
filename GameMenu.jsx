import React from "react";

export default function GameMenu({ showMenu, setShowMenu, onRestart }) {
  if (!showMenu) return null;

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
      zIndex: 200
    }}>
      <h1 style={{ color: "#00ffff", marginBottom: "30px" }}>Game Paused</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button
          onClick={() => setShowMenu(false)}
          style={{
            padding: "12px 24px",
            background: "#00ffff",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Resume
        </button>
        <button
          onClick={onRestart}
          style={{
            padding: "12px 24px",
            background: "#ffcc00",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Restart
        </button>
        <button
          onClick={() => {
            setShowMenu(false);
            window.location.reload(); // simple quit back to splash
          }}
          style={{
            padding: "12px 24px",
            background: "#ff4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Quit to Menu
        </button>
      </div>
    </div>
  );
}
