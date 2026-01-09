import React from "react";
import LifeQuestLogo from "./LifeQuestLogo";

export default function MainMenu({ onStart, onCustomize, onSettings }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "linear-gradient(180deg, #000 0%, #0a0a0a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 300
    }}>
      <LifeQuestLogo size={200} color="#00ffff" showText={false} />

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button
          onClick={onStart}
          style={{
            padding: "14px 28px",
            background: "#00ffff",
            color: "#000",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Start Game
        </button>

        <button
          onClick={onCustomize}
          style={{
            padding: "14px 28px",
            background: "#ffcc00",
            color: "#000",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Customize Avatar
        </button>

        <button
          onClick={onSettings}
          style={{
            padding: "14px 28px",
            background: "#ff4444",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          Settings
        </button>
      </div>

      <footer style={{ marginTop: "60px", color: "#888", fontSize: "14px" }}>
        © 2025 Pinnacle Charter School Student Leadership Council
      </footer>
    </div>
  );
}
