// AudioCues.js
const registry = new Map();

function load(id, src) {
  if (registry.has(id)) return registry.get(id);
  const audio = new Audio(src);
  audio.preload = "auto";
  registry.set(id, audio);
  return audio;
}

function play(id, opts = {}) {
  const audio = registry.get(id);
  if (!audio) return;
  const { loop = false, volume = 1, fadeIn = 0 } = opts;
  audio.loop = loop;
  audio.volume = 0;
  audio.currentTime = 0;
  audio.play().catch(() => {});
  if (fadeIn > 0) {
    const target = volume;
    const step = target / Math.max(1, fadeIn / 60);
    let v = 0;
    const handle = setInterval(() => {
      v = Math.min(target, v + step);
      audio.volume = v;
      if (v >= target) clearInterval(handle);
    }, 60);
  } else {
    audio.volume = volume;
  }
}

function stop(id) {
  const audio = registry.get(id);
  if (!audio) return;
  audio.pause();
}

function fadeOut(id, ms = 600) {
  const audio = registry.get(id);
  if (!audio) return;
  const start = audio.volume;
  const step = start / Math.max(1, ms / 60);
  let v = start;
  const handle = setInterval(() => {
    v = Math.max(0, v - step);
    audio.volume = v;
    if (v <= 0) {
      clearInterval(handle);
      audio.pause();
    }
  }, 60);
}

function duck(id, toVolume = 0.3, ms = 500) {
  const audio = registry.get(id);
  if (!audio) return;
  const start = audio.volume;
  const diff = start - toVolume;
  const step = diff / Math.max(1, ms / 60);
  let v = start;
  const handle = setInterval(() => {
    v = Math.max(toVolume, v - step);
    audio.volume = v;
    if (v <= toVolume) clearInterval(handle);
  }, 60);
}

export const AudioCues = { load, play, stop, fadeOut, duck, registry };
