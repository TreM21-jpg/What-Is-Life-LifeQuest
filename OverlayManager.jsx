import React, { useState, useEffect } from "react";
import { useAmbientAudio } from "./useAmbientAudio.js";

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

// Shortcut hints
import ShortcutHint from "./ShortcutHint.jsx";

export default function OverlayManager({ overlays, autoRegion }) {
  const { playCue, fadeOut } = useAmbientAudio();
  const [phase, setPhase] = useState("intro"); // intro → app → outro
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const openOverlay = (name) => {
    setActiveOverlay(name);
    playCue("gridHumLoop", { loop: true, volume: 0.25, fadeIn: 600 });
    playCue("buttonOpen", { volume: 0.35 });
  };

  const closeOverlay = () => {
    fadeOut("gridHumLoop", 600);
    playCue("buttonClose", { volume: 0.3 });
    setActiveOverlay(null);
    setSelectedRegion(null);
  };

  // === GLOBAL KEYBOARD SHORTCUTS ===
  useEffect(() => {
    const handleKey = (e) => {
      if (phase === "intro") {
        if (e.key === "Enter") setPhase("app"); // skip intro
      } else if (phase === "app") {
        if (e.key === "Escape") closeOverlay();
        if (e.ctrlKey && e.key.toLowerCase() === "i") openOverlay("inventory");
        if (e.ctrlKey && e.key.toLowerCase() === "s") openOverlay("shop");
        if (e.ctrlKey && e.key.toLowerCase() === "c") openOverlay("combat");
        if (e.ctrlKey && e.key.toLowerCase() === "a") openOverlay("achievements");
        if (e.ctrlKey && e.key.toLowerCase() === "t") openOverlay("settings");
        if (e.ctrlKey && e.key.toLowerCase() === "n") openOverlay("analytics");
        if (e.ctrlKey && e.key.toLowerCase() === "m") openOverlay("map");
        if (e.ctrlKey && e.key.toLowerCase() === "o") setPhase("outro");
      } else if (phase === "outro") {
        if (e.key === "Enter") setPhase("app");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase]);

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
          { key: "Ctrl+O", action: "Trigger Outro" }
        ]} />
      )}
    </>
  );
}
