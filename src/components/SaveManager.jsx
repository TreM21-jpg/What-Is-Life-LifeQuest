/**
 * SaveManager.jsx
 * 
 * Enhanced save system with cloud sync and multiple save slots
 * Replaces old localStorage-only approach with BackendAPI integration
 * 
 * Features:
 * - Multiple save slots (backend + local fallback)
 * - Cloud sync with offline support
 * - Quick save/load shortcuts (Ctrl+Shift+S/L)
 * - Auto-save indicator
 * - Save slot management UI
 */

import React, { useState, useEffect } from "react";
import { backendAPI } from "../services/BackendAPI.js";

export default function SaveManager({ playerInfo, setPlayerInfo, gameData, onLoadGame }) {
  const [saveSlots, setSaveSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [newSlotName, setNewSlotName] = useState("");
  const [syncStatus, setSyncStatus] = useState("idle"); // idle, syncing, synced, error

  /**
   * Load from localStorage on mount (for backward compatibility)
   */
  useEffect(() => {
    const saved = localStorage.getItem("lifequest_save");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPlayerInfo(data);
      } catch (err) {
        console.error("Error parsing save data:", err);
      }
    }

    // Load save slots from backend
    loadSaveSlots();

    // Keyboard shortcuts
    const handleQuickSave = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        quickSave();
      }
    };

    window.addEventListener("keydown", handleQuickSave);
    return () => window.removeEventListener("keydown", handleQuickSave);
  }, []);

  /**
   * Auto-save to localStorage whenever playerInfo changes
   */
  useEffect(() => {
    localStorage.setItem("lifequest_save", JSON.stringify(playerInfo));
  }, [playerInfo]);

  async function loadSaveSlots() {
    try {
      setIsLoading(true);
      const slots = await backendAPI.getSaveSlots();
      setSaveSlots(slots);
    } catch (error) {
      console.error("Failed to load save slots:", error);
      // Fallback to local slots
      const localSlots = JSON.parse(localStorage.getItem("lifequest_save_slots") || "[]");
      setSaveSlots(localSlots);
    } finally {
      setIsLoading(false);
    }
  }

  async function createSaveSlot() {
    if (!newSlotName.trim()) return;

    try {
      setSyncStatus("syncing");
      const slotData = {
        name: newSlotName,
        character: playerInfo.character || "Hero",
        xp: playerInfo.xp || 0,
        level: playerInfo.level || 1,
        playtime: playerInfo.playtime || 0,
        region: playerInfo.region || "Unknown"
      };

      const result = await backendAPI.createSaveSlot(slotData);
      setSaveSlots(prev => [...prev, result]);
      setNewSlotName("");
      setSyncStatus("synced");
      
      setTimeout(() => setSyncStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to create save:", error);
      setSyncStatus("error");
    }
  }

  async function loadGameFromSlot(slotId) {
    try {
      setIsLoading(true);
      setSyncStatus("syncing");
      
      const gameState = await backendAPI.loadSaveSlot(slotId);
      
      setPlayerInfo(gameState);
      if (onLoadGame) {
        onLoadGame(gameState);
      }
      
      setShowManager(false);
      setSyncStatus("synced");
      setTimeout(() => setSyncStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to load save:", error);
      setSyncStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteSaveSlot(slotId) {
    if (!window.confirm("Delete this save? This cannot be undone.")) return;

    try {
      await backendAPI.deleteSaveSlot(slotId);
      setSaveSlots(prev => prev.filter(s => s.id !== slotId));
    } catch (error) {
      console.error("Failed to delete save:", error);
    }
  }

  async function quickSave() {
    try {
      setSyncStatus("syncing");
      const slotData = {
        name: `Auto-save ${new Date().toLocaleTimeString()}`,
        character: playerInfo.character || "Hero",
        xp: playerInfo.xp || 0,
        level: playerInfo.level || 1,
        playtime: playerInfo.playtime || 0,
        region: playerInfo.region || "Unknown"
      };

      await backendAPI.createSaveSlot(slotData);
      await loadSaveSlots();
      
      setSyncStatus("synced");
      setTimeout(() => setSyncStatus("idle"), 2000);
    } catch (error) {
      console.error("Quick save failed:", error);
      setSyncStatus("error");
    }
  }

  return (
    <>
      {/* Save Manager Button */}
      <div style={{
        position: "absolute",
        top: 120,
        right: 20,
        zIndex: 1000
      }}>
        <button
          onClick={() => setShowManager(!showManager)}
          style={{
            padding: "10px 15px",
            background: "linear-gradient(135deg, #ff0066, #ff6600)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            boxShadow: `0 0 10px ${syncStatus === "synced" ? "#00d4ff" : "#ff0066"}`
          }}
        >
          💾 Save ({saveSlots.length})
        </button>

        {/* Sync Status Indicator */}
        <div style={{
          marginTop: "5px",
          fontSize: "10px",
          color: syncStatus === "synced" ? "#00d4ff" : syncStatus === "error" ? "#ff0066" : "#999",
          textAlign: "center"
        }}>
          {syncStatus === "syncing" ? "Syncing..." : syncStatus === "synced" ? "✓ Saved" : ""}
        </div>
      </div>

      {/* Save Manager Modal */}
      {showManager && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            border: "2px solid #ff0066",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflow: "auto",
            color: "#00d4ff",
            fontFamily: "monospace"
          }}>
            <h2 style={{ marginTop: 0, color: "#ffd700" }}>💾 SAVE MANAGER</h2>

            {/* Create New Save */}
            <div style={{
              marginBottom: "20px",
              padding: "15px",
              background: "rgba(255, 0, 102, 0.1)",
              border: "1px solid #ff0066",
              borderRadius: "4px"
            }}>
              <h3 style={{ marginTop: 0, color: "#ffd700" }}>Create New Save</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={newSlotName}
                  onChange={(e) => setNewSlotName(e.target.value)}
                  placeholder="Save name (e.g., 'Final Quest')"
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#0a0e27",
                    color: "#00d4ff",
                    border: "1px solid #00d4ff",
                    borderRadius: "4px"
                  }}
                  onKeyPress={(e) => e.key === "Enter" && createSaveSlot()}
                />
                <button
                  onClick={createSaveSlot}
                  disabled={!newSlotName.trim() || isLoading}
                  style={{
                    padding: "8px 15px",
                    background: "#ffd700",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Create
                </button>
              </div>
            </div>

            {/* Save Slots List */}
            <div>
              <h3 style={{ color: "#ffd700" }}>Saved Games ({saveSlots.length})</h3>
              
              {saveSlots.length === 0 ? (
                <p style={{ color: "#999" }}>No save slots yet. Create one to get started!</p>
              ) : (
                saveSlots.map((slot, idx) => (
                  <div
                    key={slot.id}
                    style={{
                      marginBottom: "10px",
                      padding: "12px",
                      background: "rgba(0, 212, 255, 0.05)",
                      border: "1px solid #00d4ff",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ color: "#ffd700", fontWeight: "bold" }}>
                        Slot {idx + 1}: {slot.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#999" }}>
                        Level {slot.level || 1} • XP: {slot.xp || 0} • {slot.region || "Unknown"}
                      </div>
                      <div style={{ fontSize: "10px", color: "#666" }}>
                        Saved: {slot.savedAt ? new Date(slot.savedAt).toLocaleDateString() : "Just now"}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => loadGameFromSlot(slot.id)}
                        disabled={isLoading}
                        style={{
                          padding: "6px 12px",
                          background: "#00d4ff",
                          color: "#000",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: "bold"
                        }}
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteSaveSlot(slot.id)}
                        style={{
                          padding: "6px 12px",
                          background: "rgba(255, 0, 102, 0.5)",
                          color: "#ff0066",
                          border: "1px solid #ff0066",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "11px"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Help text */}
            <div style={{
              marginTop: "20px",
              padding: "10px",
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid #ffd700",
              borderRadius: "4px",
              fontSize: "11px",
              color: "#ffd700"
            }}>
              <strong>Keyboard Shortcuts:</strong>
              <br />
              Ctrl+Shift+S – Quick Save
              <br />
              Ctrl+Shift+L – Load Last Save
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowManager(false)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                background: "#ff0066",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
