/**
 * Game3DOverlay.jsx
 * 
 * 3D-compatible UI overlay system for inventory, quests, stats, etc.
 * Displays over the 3D canvas without interfering with Three.js rendering
 */

import React, { useState } from "react";
import InventoryOverlay from "./InventoryOverlay";
import { HUDOverlay } from "./HUDOverlay";

import QuestOverlay from "./QuestOverlay";
export default function Game3DOverlay({
  overlays = {},
  playerState = {},
  xp = 0,
  questsCompleted = 0,
}) {
  const [activeTab, setActiveTab] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showQuestPanel, setShowQuestPanel] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {/* Stats HUD - Always visible */}
      {showStats && (
        <div
          style={{
            position: "fixed",
            top: 100,
            right: 20,
            background: "rgba(0, 20, 40, 0.85)",
            border: "2px solid #00d4ff",
            borderRadius: 8,
            padding: 16,
            color: "#00d4ff",
            fontFamily: "monospace",
            fontSize: 12,
            maxWidth: 280,
            pointerEvents: "auto",
            zIndex: 1000,
          }}
        >
          <div style={{ marginBottom: 12, fontWeight: "bold", fontSize: 14 }}>
            ⚔️ PLAYER STATS
          </div>
          <div style={{ marginBottom: 8 }}>
            XP: <span style={{ color: "#ffd700" }}>{xp}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            Quests Completed:{" "}
            <span style={{ color: "#00ff88" }}>{questsCompleted}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            Stamina:{" "}
            <span style={{ color: "#ff6b6b" }}>
              {Math.round(playerState.stamina || 100)}%
            </span>
          </div>
          <div>
            Speed:{" "}
            <span style={{ color: "#00ffff" }}>
              {(playerState.velocity?.length?.() || 0).toFixed(2)} m/s
            </span>
          </div>
          <div
            style={{
              marginTop: 12,
              paddingTop: 8,
              borderTop: "1px solid rgba(0, 212, 255, 0.3)",
              fontSize: 10,
            }}
          >
            Animation: {playerState.animation?.toUpperCase() || "IDLE"}
          </div>
        </div>
      )}

      {/* Quick action buttons */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          display: "flex",
          gap: 10,
          pointerEvents: "auto",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setShowInventory(!showInventory)}
          style={{
            padding: 12,
            background: showInventory
              ? "rgba(0, 212, 255, 0.8)"
              : "rgba(0, 50, 100, 0.8)",
            border: "2px solid #00d4ff",
            borderRadius: 6,
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          🎒 Inventory
        </button>

        <button
          onClick={() => setShowStats(!showStats)}
          style={{
            padding: 12,
            background: showStats
              ? "rgba(0, 212, 255, 0.8)"
              : "rgba(0, 50, 100, 0.8)",
            border: "2px solid #00d4ff",
            borderRadius: 6,
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          📊 Stats
        </button>

        <button
          onClick={() => setActiveTab(activeTab === "quests" ? null : "quests")}
          style={{
            padding: 12,
            background:
              activeTab === "quests"
                ? "rgba(255, 200, 0, 0.8)"
                : "rgba(0, 50, 100, 0.8)",
            border: "2px solid #ffc800",
            borderRadius: 6,
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          📜 Quests
        </button>
      </div>

      {/* Inventory panel */}
      {showInventory && (
        <div
          style={{
            <button onClick={() => setShowQuestPanel(s => !s)} style={{ padding: '8px 12px', borderRadius: 6, background: '#222', color: '#fff', border: 'none' }}>Quests</button>
            position: "fixed",
            top: 100,
            left: 20,
            background: "rgba(0, 20, 40, 0.95)",
            border: "2px solid #00d4ff",
            borderRadius: 8,
            padding: 20,
            maxWidth: 400,
            maxHeight: "80vh",
            overflow: "auto",
            pointerEvents: "auto",
            zIndex: 1001,
            color: "#00d4ff",
            fontFamily: "monospace",
          }}
        >
          <div style={{ marginBottom: 16, fontWeight: "bold", fontSize: 14 }}>
            🎒 INVENTORY ({overlays.items?.length || 0} items)
          </div>

          {overlays.items && overlays.items.length > 0 ? (
            <div>
              {overlays.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 10,
                    marginBottom: 8,
                    background: "rgba(0, 212, 255, 0.1)",
                    border:
                      item.rarity === "legendary"
                        ? "1px solid #ffd700"
                        : item.rarity === "rare"
                        ? "1px solid #00ffff"
                        : "1px solid #666",
                    borderRadius: 4,
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#aaa" }}>
                    {item.rarity?.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "#666", fontSize: 12 }}>
              Your inventory is empty. Complete quests to collect items!
            </div>
          )}
        </div>
      )}

      {/* Quests panel */}
      {activeTab === "quests" && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
          {showQuestPanel && (
            <div style={{ position: 'absolute', bottom: 56, right: 12, width: 360, maxHeight: '50vh', overflow: 'auto', pointerEvents: 'auto', background: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 8 }}>
              <QuestOverlay onClose={() => setShowQuestPanel(false)} />
            </div>
          )}
            left: 20,
            background: "rgba(0, 20, 40, 0.95)",
            border: "2px solid #ffc800",
            borderRadius: 8,
            padding: 20,
            maxWidth: 400,
            maxHeight: 300,
            overflow: "auto",
            pointerEvents: "auto",
            zIndex: 1001,
            color: "#ffc800",
            fontFamily: "monospace",
          }}
        >
          <div style={{ marginBottom: 16, fontWeight: "bold", fontSize: 14 }}>
            📜 AVAILABLE QUESTS
          </div>

          {overlays.worldData?.regions && overlays.worldData.regions.length > 0 ? (
            <div>
              {overlays.worldData.regions.map((region, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 12,
                    marginBottom: 10,
                    background: "rgba(255, 200, 0, 0.1)",
                    border: "1px solid #ffc800",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255, 200, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 200, 0, 0.1)";
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{region.name}</div>
                  <div style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>
                    {region.description}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "#ffc800",
                      marginTop: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    {region.rarity} • +50 XP
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "#666", fontSize: 12 }}>
              No quests available.
            </div>
          )}
        </div>
      )}

      {/* Controls hint */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "rgba(0, 50, 100, 0.8)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          borderRadius: 6,
          padding: 12,
          color: "rgba(0, 212, 255, 0.6)",
          fontFamily: "monospace",
          fontSize: 11,
          maxWidth: 200,
          pointerEvents: "auto",
          zIndex: 1000,
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 6 }}>⌨️ CONTROLS</div>
        <div>W/A/S/D - Move</div>
        <div>Shift - Sprint</div>
        <div>Space - Jump</div>
        <div>Scroll - Zoom</div>
        <div>I - Inventory</div>
        <div>Q - Quests</div>
      </div>
    </div>
  );
}
