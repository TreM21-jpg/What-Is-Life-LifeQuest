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

