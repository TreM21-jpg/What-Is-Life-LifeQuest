import React from "react";
import HealthBar from "./HealthBar";
import Inventory from "./Inventory";
import QuestTrackerHUD from "./QuestTrackerHUD";
import Minimap from "./Minimap";

export default function HUDOverlay({
  playerHP,
  playerMaxHP,
  items,
  onUseItem,
  activeNPC,
  nextObjectives,
  playerPosition
}) {
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

      {/* Quest Tracker (top-right) */}
      <div style={{ position: "absolute", top: "20px", right: "20px", pointerEvents: "auto" }}>
        <QuestTrackerHUD activeNPC={activeNPC} nextObjectives={nextObjectives} />
      </div>

      {/* Minimap (bottom-right) */}
      <div style={{ position: "absolute", bottom: "20px", right: "20px", pointerEvents: "auto" }}>
        <Minimap playerPosition={playerPosition} />
      </div>
    </div>
  );
}
