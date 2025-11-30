import React, { useEffect, useRef, useState } from "react";
import NeonTheme from "./NeonTheme.js";
import { AudioCues } from "./AudioCues.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef([]);

  useEffect(() => {
    // Ambient hum
    AudioCues.play("gridHumLoop", { loop: true, volume: 0.35, fadeIn: 1500 });

    // Timeline
    timerRef.current.push(setTimeout(() => setPhase(1), 500));
    timerRef.current.push(setTimeout(() => {
      setPhase(2);
      AudioCues.play("logoBurst", { volume: 0.8 });
      AudioCues.duck("gridHumLoop", 0.25, 600);
    }, 1600));
    timerRef.current.push(setTimeout(() => {
      setPhase(3);
      AudioCues.play("titleReveal", { volume: 0.6 });
    }, 2400));
    timerRef.current.push(setTimeout(() => {
      setPhase(4);
      AudioCues.play("characterSweep", { volume: 0.5 });
    }, 3200));
    timerRef.current.push(setTimeout(() => {
      setPhase(5);
      AudioCues.play("menuRise", { volume: 0.6 });
    }, 4300));
    timerRef.current.push(setTimeout(() => {
      AudioCues.fadeOut("gridHumLoop", 1000);
      onComplete?.();
    }, 5200));

    return () => {
      timerRef.current.forEach(clearTimeout);
      AudioCues.stop("gridHumLoop");
    };
  }, [onComplete]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "black", zIndex: 9999 }}>
      {/* Cyan grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px), " +
          "linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 700ms ease-out"
      }} />

      {/* Logo burst */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 280, height: 280, borderRadius: "50%",
        border: `3px solid ${NeonTheme.colors.cyan}`,
        boxShadow: NeonTheme.shadows.cyanGlow,
        opacity: phase >= 2 ? 1 : 0,
        animation: phase >= 2 ? "burstExpand 1.4s ease-out" : "none"
      }} />

      {/* Title */}
      <h1 style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        color: NeonTheme.colors.gold,
        fontFamily: NeonTheme.fonts.heading,
        fontSize: 64, letterSpacing: 6,
        textShadow: `${NeonTheme.shadows.goldGlow}, ${NeonTheme.shadows.cyanGlow}`,
        opacity: phase >= 3 ? 1 : 0,
        animation: phase >= 3 ? "titlePulse 2s infinite" : "none"
      }}>LIFEQUEST</h1>

      {/* Shortcut hints */}
      <ShortcutHint hints={[
        { key: "Enter", action: "Skip Intro" },
        { key: "Ctrl+O", action: "Jump to Outro" }
      ]}/>

      <style>
        {`
          @keyframes burstExpand {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
          }
          @keyframes titlePulse {
            0% { text-shadow: 0 0 10px #ffd700; }
            50% { text-shadow: 0 0 24px #00ffff; }
            100% { text-shadow: 0 0 10px #ffd700; }
          }
        `}
      </style>
    </div>
  );
}
