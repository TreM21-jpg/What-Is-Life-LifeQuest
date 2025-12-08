import React, { useState } from "react";
import NeonTheme from "./NeonTheme.js";
import ShortcutHint from "./ShortcutHint.jsx";
import QuoteDisplay from "./QuoteDisplay.jsx";
import { triggerFeedback } from "./HapticAudioFeedback";
import { recordInspiration } from "./StreakTracker.ts";

export default function QuestOverlay({ region, onClose }) {
  const [showCompletionQuote, setShowCompletionQuote] = useState(false);

  if (!region) return null;

  // Rarity styling
  const rarityColors = {
    common: NeonTheme.colors.cyan,
    rare: NeonTheme.colors.gold,
    legendary: NeonTheme.colors.purple
  };

  const rarityShadows = {
    common: NeonTheme.shadows.cyanGlow,
    rare: NeonTheme.shadows.goldGlow,
    legendary: NeonTheme.shadows.purpleGlow
  };

  const handleCompleteQuest = () => {
    // Trigger haptic + audio feedback
    triggerFeedback("questcomplete");
    
    // Record inspiration streak
    recordInspiration();

    setShowCompletionQuote(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.92)",
        fontFamily: NeonTheme.fonts.heading,
        zIndex: 1090, padding: "30px",
        ...NeonTheme.animations.fadeIn
      }}>
        <h1 style={{
          color: rarityColors[region.rarity] || NeonTheme.colors.cyan,
          textShadow: rarityShadows[region.rarity] || NeonTheme.shadows.cyanGlow,
          fontSize: 48,
          marginBottom: "20px"
        }}>
          ✨ Quest: {region.name}
        </h1>

        <p style={{
          color: "#fff",
          fontSize: 18,
          marginBottom: "16px",
          lineHeight: 1.4
        }}>
          {region.description}
        </p>

        <div style={{
          padding: "16px",
          border: `2px solid ${rarityColors[region.rarity]}`,
          borderRadius: "8px",
          boxShadow: rarityShadows[region.rarity],
          background: "rgba(255,255,255,0.05)",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: rarityColors[region.rarity] }}>Lore</h2>
          <p style={{ color: "#ddd" }}>{region.lore}</p>
        </div>

        <div style={{
          padding: "16px",
          border: `2px solid ${rarityColors[region.rarity]}`,
          borderRadius: "8px",
          boxShadow: rarityShadows[region.rarity],
          background: "rgba(255,255,255,0.05)",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: rarityColors[region.rarity] }}>Rewards</h2>
          <ul style={{ color: "#fff" }}>
            <li>+50 XP</li>
            <li>{region.rarity === "legendary" ? "Legendary Relic" : region.rarity === "rare" ? "Rare Artifact" : "Common Trinket"}</li>
            <li>{region.rarity === "legendary" ? "Unlock Golden Title" : "Unlock Helper/Dreamer Title"}</li>
          </ul>
        </div>

        <button onClick={handleCompleteQuest} style={{
          marginTop: "20px", padding: "12px 24px",
          background: rarityColors[region.rarity],
          border: "none", borderRadius: "8px",
          fontWeight: "700", cursor: "pointer",
          ...NeonTheme.animations.pulse
        }}>
          Complete Quest
        </button>

        <ShortcutHint hints={[
          { key: "Esc", action: "Close Quest" },
          { key: "Enter", action: "Complete Quest" }
        ]}/>
      </div>

      {/* Show inspiring quote on quest completion */}
      {showCompletionQuote && (
        <QuoteDisplay
          context="achievement"
          duration={2000}
          onDismiss={() => {}}
          autoClose={true}
        />
      )}
    </>
  );
}

