import React, { useRef, createContext, useContext } from "react";

const AmbientAudioContext = createContext();

export function useAmbientAudio() {
  return useContext(AmbientAudioContext);
}

export function AmbientAudioProvider({ children }) {
  const audioRefs = useRef({});

  const playCue = (name, { loop = false, volume = 1 } = {}) => {
    if (!audioRefs.current[name]) {
      const audio = new Audio(`/audio/${name}.mp3`);
      audio.loop = loop;
      audio.volume = volume;
      audioRefs.current[name] = audio;
    }
    audioRefs.current[name].play();
  };

  const fadeOut = (name, duration = 500) => {
    const audio = audioRefs.current[name];
    if (audio) {
      const step = audio.volume / (duration / 50);
      const fade = setInterval(() => {
        if (audio.volume > step) {
          audio.volume -= step;
        } else {
          audio.pause();
          clearInterval(fade);
        }
      }, 50);
    }
  };

  return (
    <AmbientAudioContext.Provider value={{ playCue, fadeOut }}>
      {children}
    </AmbientAudioContext.Provider>
  );
}
