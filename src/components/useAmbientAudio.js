import { useEffect } from "react";

export function useAmbientAudio(audioFile) {
  useEffect(() => {
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = 0.4;

    audio.play().catch(() => {
      console.warn("Autoplay blocked, user interaction required.");
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioFile]);
}
