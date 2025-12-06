import React, { useState } from "react";
import OverlayManager from "./components/OverlayManager.jsx";
import { useAmbientAudio } from "./components/useAmbientAudio";
import GameScene from "./components/GameScene.js";

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

  return (
    <div style={{ width: "100%", height: "100vh", background: "#000" }}>
      {/* Game world */}
      <GameScene overlays={overlays} />

      {/* Overlay system */}
      <OverlayManager overlays={overlays} />
    </div>
  );
}

export default App;
