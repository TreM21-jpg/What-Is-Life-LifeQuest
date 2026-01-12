import React, { useEffect, useState } from "react";
import { backendAPI } from "../services/BackendAPI";

export default function QuestOverlay({ onClose }) {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepted, setAccepted] = useState(new Set());
  const [completed, setCompleted] = useState(new Set());

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await backendAPI.getQuests();
        if (!mounted) return;
        setQuests(list);
      } catch (err) {
        setError(err.message || "Failed to load quests");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  const handleAccept = async (questId) => {
    try {
      await backendAPI.acceptQuest(questId);
      setAccepted(prev => new Set(prev).add(questId));
      alert("Quest accepted — progress saved to server (if authenticated).");
    } catch (err) {
      console.warn(err);
      alert("Failed to accept quest — sign in to persist progress.");
    }
  };

  const handleComplete = async (questId) => {
    try {
      const res = await backendAPI.completeQuest(questId);
      setCompleted(prev => new Set(prev).add(questId));
      alert(`Quest complete! Reward: ${res.rewardXp || 0} XP`);
    } catch (err) {
      console.warn(err);
      alert("Failed to complete quest — ensure requirements met and you are signed in.");
    }
  };

  if (loading) return <div style={{ color: '#00d4ff' }}>Loading quests...</div>;
  if (error) return <div style={{ color: 'salmon' }}>Error loading quests: {error}</div>;

  return (
    <div style={{ color: '#ffc800' }}>
      <div style={{ marginBottom: 12, fontWeight: 'bold', fontSize: 14 }}>📜 AVAILABLE QUESTS</div>
      {quests.length === 0 && <div style={{ color: '#666' }}>No quests available.</div>}

      {quests.map(q => (
        <div key={q.id} style={{ padding: 10, marginBottom: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,200,0,0.2)', borderRadius: 6 }}>
          <div style={{ fontWeight: 'bold' }}>{q.title}</div>
          <div style={{ fontSize: 12, color: '#aaa', marginTop: 6 }}>{q.description}</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button onClick={() => handleAccept(q.id)} style={{ padding: '6px 10px', background: '#00d4ff', color: '#000', borderRadius: 6, border: 'none' }}>Accept</button>
            <button onClick={() => handleComplete(q.id)} style={{ padding: '6px 10px', background: '#00ff88', color: '#000', borderRadius: 6, border: 'none' }}>Complete</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 8 }}>
        <button onClick={onClose} style={{ padding: '6px 10px', background: '#444', color: '#fff', borderRadius: 6 }}>Close</button>
      </div>
    </div>
  );
}


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

