import React, { useState, useEffect, useCallback } from "react";
import { useAmbientAudio } from "./useAmbientAudio.js";
import KeyboardManager from "./KeyboardManager.js";
import { backendAPI } from "../services/BackendAPI.js";

// Sequences
import IntroSequence from "./IntroSequence.jsx";
import OutroSequence from "./OutroSequence.jsx";

// Overlays
import InventoryOverlay from "./InventoryOverlay.jsx";
import ShopOverlay from "./ShopOverlay.jsx";
import CombatFeedbackOverlay from "./CombatFeedbackOverlay.jsx";
import AchievementOverlay from "./AchievementOverlay.jsx";
import SettingsOverlay from "./SettingsOverlay.jsx";
import AnalyticsOverlay from "./AnalyticsOverlay.jsx";
import MapOverlay from "./MapOverlay.jsx";
import QuestOverlay from "./QuestOverlay.jsx";
import AccessibilityPanel from "./AccessibilityPanel.jsx";
import DailyChallengesAdvanced from "./DailyChallengesAdvanced.jsx";

// Shortcut hints
import ShortcutHint from "./ShortcutHint.jsx";

export default function OverlayManager({ overlays, autoRegion }) {
  const { playCue, fadeOut } = useAmbientAudio();
  const [phase, setPhase] = useState("intro"); // intro → app → outro
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [keyboardManager] = useState(() => new KeyboardManager());
  const [autoSaveCounter, setAutoSaveCounter] = useState(0);

  const openOverlay = useCallback((name) => {
    setActiveOverlay(name);
    playCue("gridHumLoop", { loop: true, volume: 0.25, fadeIn: 600 });
    playCue("buttonOpen", { volume: 0.35 });
  }, [playCue]);

  const closeOverlay = useCallback(() => {
    fadeOut("gridHumLoop", 600);
    playCue("buttonClose", { volume: 0.3 });
    setActiveOverlay(null);
    setSelectedRegion(null);
  }, [fadeOut, playCue]);

  /**
   * Auto-save game state to backend every 60 seconds
   */
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      const gameData = {
        xp: overlays.stats?.xp || 0,
        level: overlays.stats?.level || 1,
        inventory: overlays.items || [],
        questsCompleted: overlays.stats?.questsCompleted || 0,
        achievements: overlays.achievements || [],
        stats: overlays.stats || {},
        activeOverlay,
        selectedRegion
      };

      backendAPI.saveGameState(gameData).catch(error => {
        console.warn("Auto-save failed:", error);
      });

      setAutoSaveCounter(prev => prev + 1);
    }, 60000); // Every 60 seconds

    return () => clearInterval(autoSaveInterval);
  }, [overlays, activeOverlay, selectedRegion]);

  /**
   * Register keyboard shortcuts via KeyboardManager
   */
  useEffect(() => {
    // Navigation overlays
    keyboardManager.registerListener("INVENTORY", () => {
      if (phase === "app") openOverlay("inventory");
    });
    keyboardManager.registerListener("MAP", () => {
      if (phase === "app") openOverlay("map");
    });
    keyboardManager.registerListener("QUESTS", () => {
      if (phase === "app") openOverlay("quest");
    });
    keyboardManager.registerListener("ACHIEVEMENTS", () => {
      if (phase === "app") openOverlay("achievements");
    });
    keyboardManager.registerListener("SETTINGS", () => {
      if (phase === "app") openOverlay("settings");
    });
    keyboardManager.registerListener("LORE", () => {
      if (phase === "app") openOverlay("lore");
    });

    // Combat & utility
    keyboardManager.registerListener("COMBAT", () => {
      if (phase === "app") openOverlay("combat");
    });
    keyboardManager.registerListener("ANALYTICS", () => {
      if (phase === "app") openOverlay("analytics");
    });
    keyboardManager.registerListener("SHOP", () => {
      if (phase === "app") openOverlay("shop");
    });

    // Close overlay
    keyboardManager.registerListener("PAUSE", () => {
      if (activeOverlay) {
        closeOverlay();
      } else if (phase === "app") {
        setPhase("outro");
      }
    });

    // Phase transitions
    keyboardManager.registerListener("SKIP_INTRO", () => {
      if (phase === "intro") setPhase("app");
    });
    keyboardManager.registerListener("SKIP_OUTRO", () => {
      if (phase === "outro") setPhase("app");
    });

    return () => {
      // Cleanup listeners - clear registered keyboard listeners
      keyboardManager.disableAllListeners();
    };
  }, [phase, activeOverlay, openOverlay, closeOverlay, keyboardManager]);

  // === AUTO REGION TRIGGER ===
  useEffect(() => {
    if (autoRegion) {
      setSelectedRegion(autoRegion);
      setActiveOverlay("quest");
    }
  }, [autoRegion]);

  // === PHASE HANDLING ===
  if (phase === "intro") {
    return <IntroSequence onComplete={() => setPhase("app")} />;
  }

  if (phase === "outro") {
    return (
      <OutroSequence
        badges={overlays.badges || []}
        titles={overlays.titles || []}
        onComplete={() => setPhase("app")}
      />
    );
  }

  // === MAIN APP PHASE ===
  return (
    <>
      {/* Overlay triggers (optional UI buttons) */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <button onClick={() => openOverlay("inventory")}>Inventory (Ctrl+I)</button>
        <button onClick={() => openOverlay("shop")}>Shop (Ctrl+S)</button>
        <button onClick={() => openOverlay("combat")}>Combat (Ctrl+C)</button>
        <button onClick={() => openOverlay("achievements")}>Achievements (Ctrl+A)</button>
        <button onClick={() => openOverlay("settings")}>Settings (Ctrl+T)</button>
        <button onClick={() => openOverlay("analytics")}>Analytics (Ctrl+N)</button>
        <button onClick={() => openOverlay("map")}>Open World (Ctrl+M)</button>
        <button onClick={() => setPhase("outro")}>End Showcase (Ctrl+O)</button>
      </div>

      {/* Active overlay rendering */}
      {activeOverlay === "inventory" && (
        <InventoryOverlay items={overlays.items} onSelect={overlays.onSelectItem} onClose={closeOverlay} />
      )}
      {activeOverlay === "shop" && (
        <ShopOverlay products={overlays.products} onBuy={overlays.onBuyProduct} onClose={closeOverlay} />
      )}
      {activeOverlay === "combat" && (
        <CombatFeedbackOverlay feedback={overlays.feedback} onClose={closeOverlay} />
      )}
      {activeOverlay === "achievements" && (
        <AchievementOverlay achievements={overlays.achievements} onClose={closeOverlay} />
      )}
      {activeOverlay === "settings" && (
        <SettingsOverlay settings={overlays.settings} onUpdate={overlays.onUpdateSettings} onClose={closeOverlay} />
      )}
      {activeOverlay === "analytics" && (
        <AnalyticsOverlay stats={overlays.stats} onClose={closeOverlay} />
      )}
      {activeOverlay === "map" && (
        <MapOverlay
          worldData={overlays.worldData}
          onClose={closeOverlay}
          onSelectRegion={(region) => {
            setSelectedRegion(region);
            setActiveOverlay("quest");
          }}
        />
      )}
      {activeOverlay === "quest" && selectedRegion && (
        <QuestOverlay
          region={selectedRegion}
          onClose={() => {
            // Example: update XP/inventory on quest completion
            if (overlays.onQuestComplete) overlays.onQuestComplete(selectedRegion);
            closeOverlay();
          }}
        />
      )}

      {/* Accessibility Panel - Always available */}
      <AccessibilityPanel />

      {/* Shortcut hints */}
      {activeOverlay && (
        <ShortcutHint hints={[
          { key: "Esc", action: "Close Overlay" },
          { key: "Ctrl+I", action: "Open Inventory" },
          { key: "Ctrl+S", action: "Open Shop" },
          { key: "Ctrl+C", action: "Open Combat Feedback" },
          { key: "Ctrl+A", action: "Open Achievements" },
          { key: "Ctrl+T", action: "Open Settings" },
          { key: "Ctrl+N", action: "Open Analytics" },
          { key: "Ctrl+M", action: "Open Map" },
          { key: "Ctrl+Q", action: "Open Quests" },
          { key: "Ctrl+L", action: "Open Lore" },
          { key: "Alt+?", action: "Toggle Shortcuts" }
        ]} />
      )}

      {/* Auto-save indicator */}
      <div style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        fontSize: "12px",
        color: "#00d4ff",
        opacity: 0.6,
        fontFamily: "monospace"
      }}>
        Auto-saves: {autoSaveCounter}
      </div>
    </>
  );
}
