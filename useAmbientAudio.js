import { useEffect } from "react";
import { AudioCues } from "./AudioCues.js";

// Map your assets here
// Replace with your actual file paths
const assets = {
  gridHumLoop: "/audio/grid_hum_loop.mp3",
  logoBurst: "/audio/logo_burst.mp3",
  titleReveal: "/audio/title_reveal.mp3",
  characterSweep: "/audio/character_sweep.mp3",
  menuRise: "/audio/menu_rise.mp3",
  victoryPulse: "/audio/victory_pulse.mp3",
  badgeChime: "/audio/badge_chime.mp3",
  finalHum: "/audio/final_hum.mp3",
  // Overlay cues (examples):
  critFlash: "/audio/crit_flash.mp3",
  achievementUnlock: "/audio/achievement_unlock.mp3",
  buttonOpen: "/audio/button_open.mp3",
  buttonClose: "/audio/button_close.mp3",
};

export function useAmbientAudio() {
  useEffect(() => {
    Object.entries(assets).forEach(([id, src]) => AudioCues.load(id, src));
  }, []);

  const playCue = (id, opts) => AudioCues.play(id, opts);
  const fadeOut = (id, ms) => AudioCues.fadeOut(id, ms);
  const duck = (id, to, ms) => AudioCues.duck(id, to, ms);

  return { playCue, fadeOut, duck };
}
