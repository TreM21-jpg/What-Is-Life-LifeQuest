import React, { useState } from "react";
import HealthBar from "./HealthBar";
import Inventory from "./Inventory";
import QuestTrackerHUD from "./QuestTrackerHUD";
import Minimap from "./Minimap";
import AIChatBox from "./AIChatBox";
import StreakDisplay from "./StreakDisplay";

export default function HUDOverlay({
  playerHP,
  playerMaxHP,
  items,
  onUseItem,
  activeNPC,
  nextObjectives,
  playerPosition,
  playerStats = {}
}) {
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: "none", // HUD shouldn't block gameplay clicks
      zIndex: 100
    }}>
      {/* Health Bar (top-left) */}
      <div style={{ position: "absolute", top: "20px", left: "20px", pointerEvents: "auto" }}>
        <HealthBar playerHP={playerHP} playerMaxHP={playerMaxHP} />
      </div>

      {/* Inventory (bottom-left) */}
      <div style={{ position: "absolute", bottom: "200px", left: "20px", pointerEvents: "auto" }}>
        <Inventory items={items} onUseItem={onUseItem} />
      </div>

      {/* AI Chat Button (bottom-left, above inventory) */}
      <div style={{ 
        position: "absolute", 
        bottom: "160px", 
        left: "20px", 
        pointerEvents: "auto",
        zIndex: 101
      }}>
        <button
          onClick={() => setShowAIChat(true)}
          title="Open AI Assistant (Ctrl+Shift+A)"
          style={{
            padding: "12px 20px",
            backgroundColor: "rgba(0, 212, 255, 0.2)",
            border: "2px solid rgba(0, 212, 255, 0.6)",
            borderRadius: "12px",
            color: "#00d4ff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease",
            boxShadow: "0 0 10px rgba(0, 212, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minHeight: "44px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(0, 212, 255, 0.4)";
            e.target.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(0, 212, 255, 0.2)";
            e.target.style.boxShadow = "0 0 10px rgba(0, 212, 255, 0.2)";
          }}
        >
          💬 AI Assistant
        </button>
      </div>

      {/* Quest Tracker (top-right) */}
      <div style={{ position: "absolute", top: "20px", right: "20px", pointerEvents: "auto" }}>
        <QuestTrackerHUD activeNPC={activeNPC} nextObjectives={nextObjectives} />
      </div>

      {/* Minimap (bottom-right) */}
      <div style={{ position: "absolute", bottom: "20px", right: "20px", pointerEvents: "auto" }}>
        <Minimap playerPosition={playerPosition} />
      </div>

      {/* Streak Display (top-right, above quest tracker) */}
      <div style={{ position: "absolute", top: "20px", right: "320px", pointerEvents: "auto" }}>
        <StreakDisplay position="inline" compact={true} />
      </div>

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChatBox 
          onClose={() => setShowAIChat(false)} 
          playerStats={playerStats}
        />
      )}
    </div>
  );
}
