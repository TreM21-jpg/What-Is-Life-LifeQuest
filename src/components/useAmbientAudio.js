import { useEffect, useMemo } from "react";
import { AudioCues } from "./AudioCues";

export function useAmbientAudio(audioFile) {
  useEffect(() => {
    if (!audioFile) return;
    AudioCues.load("ambient", audioFile);
    AudioCues.play("ambient", { loop: true, volume: 0.4 });

    return () => {
      AudioCues.fadeOut("ambient", 600);
    };
  }, [audioFile]);

  // Return stable function references so consumers (and effects) don't
  // get new callbacks every render and trigger unnecessary effect runs.
  const api = useMemo(() => ({
    playCue: (id, opts) => AudioCues.play(id, opts),
    fadeOut: (id, ms) => AudioCues.fadeOut(id, ms),
    stop: (id) => AudioCues.stop(id),
    load: (id, src) => AudioCues.load(id, src),
    duck: (id, toVolume, ms) => AudioCues.duck(id, toVolume, ms)
  }), []);

  return api;
}
