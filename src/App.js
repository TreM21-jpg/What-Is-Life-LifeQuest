import React, { useState, useEffect } from "react";
import OverlayManager from "./components/OverlayManager.jsx";
import { useAmbientAudio } from "./components/useAmbientAudio";
import GameScene from "./components/GameScene.js";
import CinematicSequence from "./components/CinematicSequence.jsx";
import { playCinematic } from "./utils/cinematicSequences";

function App() {
  // === Core player state ===
  const [xp, setXp] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [questsCompleted, setQuestsCompleted] = useState(0);

  // === Quest completion handler ===
  const onQuestComplete = (region) => {
    // XP gain
    setXp((prev) => prev + 50);

    // Reward item
    const rewardItem =
      region.rarity === "legendary"
        ? { name: "Legendary Relic", rarity: "legendary" }
        : region.rarity === "rare"
        ? { name: "Rare Artifact", rarity: "rare" }
        : { name: "Common Trinket", rarity: "common" };
    setInventory((prev) => [...prev, rewardItem]);

    // Achievement
    setAchievements((prev) => [
      ...prev,
      { title: `Quest Completed: ${region.name}`, rarity: region.rarity }
    ]);

    // Quest counter
    setQuestsCompleted((prev) => prev + 1);
  };

  // === Shop purchase handler ===
  const onBuyProduct = (product) => {
    setInventory((prev) => [...prev, product]);
    setXp((prev) => prev + 10); // small XP bonus for purchases
  };

  // === Item selection handler ===
  const onSelectItem = (item) => {
    console.log("Selected item:", item);
    // Could trigger equip/use logic here
  };

  // === Settings update handler ===
  const onUpdateSettings = (updated) => {
    console.log("Settings updated:", updated);
    // Could persist to localStorage or backend
  };

  // === Stats object for AnalyticsOverlay ===
  const stats = {
    xp,
    questsCompleted,
    itemsCollected: inventory.length,
    achievementsUnlocked: achievements.length
  };

  // === Overlay props ===
  const overlays = {
    items: inventory,
    products: [
      { name: "Health Potion", price: 25, rarity: "common" },
      { name: "Mana Crystal", price: 50, rarity: "rare" },
      { name: "Sword of Legends", price: 200, rarity: "legendary" }
    ],
    achievements,
    badges: [],
    titles: [],
    stats,
    worldData: {
      regions: [
        {
          name: "Forest of Beginnings",
          description: "A lush green forest",
          lore: "Helpers are born here.",
          rarity: "common",
          x: 600, y: 500, w: 280, h: 220
        },
        {
          name: "Dreamer’s Valley",
          description: "A land of imagination",
          lore: "Dream with intent.",
          rarity: "rare",
          x: 1200, y: 800, w: 300, h: 240
        },
        {
          name: "Golden Citadel",
          description: "A legendary stronghold",
          lore: "Earn your entry.",
          rarity: "legendary",
          x: 1800, y: 400, w: 320, h: 260
        }
      ]
    },
    onQuestComplete,
    onBuyProduct,
    onSelectItem,
    onUpdateSettings
  };
  // Start ambient background audio via hook (previously provided by AmbientAudioProvider)
  useAmbientAudio("/audio/tranquil-bell-melodies-267092.mp3");

  // === Cinematic state ===
  const [showCinematic, setShowCinematic] = useState(false);
  const [currentSequence, setCurrentSequence] = useState(null);

  // === Auto-play intro cinematic on first app load ===
  useEffect(() => {
    // Only play intro once on component mount
    const seq = playCinematic("intro");
    setCurrentSequence(seq);
    setShowCinematic(true);
  }, []); // Empty dependency array ensures this runs only once on mount

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const SESSION_ID = "dev-session-1";

  const api = (path, opts = {}) => {
    const headers = Object.assign({}, opts.headers || {}, { "X-Session-Id": SESSION_ID, "Content-Type": "application/json" });
    return fetch(`${API_BASE}${path}`, Object.assign({}, opts, { headers })).then(r => r.json());
  };

  const triggerIntro = () => {
    const seq = playCinematic("intro");
    setCurrentSequence(seq);
    setShowCinematic(true);
  };

  const handleCinematicComplete = () => {
    setShowCinematic(false);
    setCurrentSequence(null);
  };

  // quick test helpers
  const saveGame = async () => {
    const payload = { level: 3, xp: xp, gold: 50, inventory };
    const res = await api("/api/player/save", { method: "POST", body: JSON.stringify(payload) });
    console.log("saveGame:", res);
    alert("Save response: " + (res.message || JSON.stringify(res)));
  };

  const loadGame = async () => {
    const res = await api("/api/player/load");
    console.log("loadGame:", res);
    alert("Load response: " + JSON.stringify(res));
  };

  const submitLeaderboard = async () => {
    const res = await api("/api/leaderboard/submit", { method: "POST", body: JSON.stringify({ metric: "xp", value: xp }) });
    console.log("submitLeaderboard:", res);
    alert("Leaderboard submit: " + JSON.stringify(res));
  };

  const unlockAchievement = async () => {
    const res = await api("/api/achievements/ach_collector/unlock", { method: "POST" });
    console.log("unlockAchievement:", res);
    alert("Achievement unlock: " + JSON.stringify(res));
  };

  const unlockLore = async () => {
    const res = await api("/api/lore/lore_order/unlock", { method: "POST" });
    console.log("unlockLore:", res);
    alert("Lore unlock: " + JSON.stringify(res));
  };

  return (
    <div style={{ width: "100%", height: "100vh", background: "#000" }}>
      {/* Game world */}
      <GameScene overlays={overlays} />

      {/* Overlay system */}
      <OverlayManager overlays={overlays} />

      {/* Developer test controls */}
      <div style={{ position: "fixed", right: 12, top: 12, zIndex: 9999, background: "rgba(0,0,0,0.6)", color: "#fff", padding: 10, borderRadius: 8, width: 220, fontSize: 13 }}>
        <div style={{ marginBottom: 8, fontWeight: "bold" }}>Dev / Test</div>
        <button onClick={triggerIntro} style={{ width: "100%", marginBottom: 6 }}>Play Intro Cinematic</button>
        <button onClick={saveGame} style={{ width: "100%", marginBottom: 6 }}>Save Game</button>
        <button onClick={loadGame} style={{ width: "100%", marginBottom: 6 }}>Load Game</button>
        <button onClick={submitLeaderboard} style={{ width: "100%", marginBottom: 6 }}>Submit Leaderboard</button>
        <button onClick={unlockAchievement} style={{ width: "100%", marginBottom: 6 }}>Unlock Achievement</button>
        <button onClick={unlockLore} style={{ width: "100%" }}>Unlock Lore</button>
      </div>

      {showCinematic && currentSequence ? (
        <CinematicSequence sequence={currentSequence} onComplete={handleCinematicComplete} />
      ) : null}
    </div>
  );
}

export default App;
