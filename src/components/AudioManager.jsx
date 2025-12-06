import React, { useEffect, useRef } from "react";

export default function AudioManager({ stage, inBattle, victory, defeat }) {
  const bgmRef = useRef(null);
  const sfxRef = useRef(null);

  // Helper to play audio
  const playAudio = (ref, src, loop = false, volume = 0.5) => {
    if (ref.current) {
      ref.current.pause();
    }
    ref.current = new Audio(src);
    ref.current.loop = loop;
    ref.current.volume = volume;
    ref.current.play().catch(err => console.warn("Audio play error:", err));
  };

  useEffect(() => {
    if (victory) {
      playAudio(sfxRef, "/audio/victory.mp3", false, 0.7);
    } else if (defeat) {
      playAudio(sfxRef, "/audio/defeat.mp3", false, 0.7);
    } else if (inBattle) {
      playAudio(bgmRef, "/audio/battle_theme.mp3", true, 0.5);
    } else {
      // Stage‑based background music
      switch (stage) {
        case "Elementary":
          playAudio(bgmRef, "/audio/elementary_theme.mp3", true, 0.4);
          break;
        case "Middle":
          playAudio(bgmRef, "/audio/middle_theme.mp3", true, 0.4);
          break;
        case "High/Adult":
          playAudio(bgmRef, "/audio/high_theme.mp3", true, 0.4);
          break;
        default:
          playAudio(bgmRef, "/audio/default_theme.mp3", true, 0.4);
      }
    }
  }, [stage, inBattle, victory, defeat]);

  return null; // invisible manager
}
