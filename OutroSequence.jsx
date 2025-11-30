import React, { useEffect, useRef, useState } from "react";
import NeonTheme from "./NeonTheme.js";
import { AudioCues } from "./AudioCues.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function OutroSequence({ badges = [], titles = [], onComplete }) {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef([]);

  useEffect(() => {
    AudioCues.play("victoryPulse", { volume: 0.6 });
    AudioCues.play("gridHumLoop", { loop: true, volume: 0.25, fadeIn: 800 });

    timerRef.current.push(setTimeout(() => setPhase(1), 500));
    timerRef.current.push(setTimeout(() => {
      setPhase(2);
      AudioCues.play("badgeChime", { volume: 0.7 });
    }, 1200));
    timerRef.current.push(setTimeout(() => setPhase(3), 2600));
    timerRef.current.push(setTimeout(() => {
      setPhase(4);
      AudioCues.play("finalHum", { volume: 0.5 });
      AudioCues.fadeOut("gridHumLoop", 1200);
    }, 3400));
    timerRef.current.push(setTimeout(() => onComplete?.(), 4600));

    return () => {
      timerRef.current.forEach(clearTimeout);
      AudioCues.stop("gridHumLoop");
    };
  }, [onComplete]);

  // Helper: style badges by rarity
  const getBadgeStyle = (rarity) => {
    switch (rarity) {
      case "legendary":
        return {
          color: NeonTheme.colors.gold,
          textShadow: `${NeonTheme.shadows.goldGlow}, 0 0 20px ${NeonTheme.colors.gold}`,
          animation: "legendaryPulse 2s infinite"
        };
      case "rare":
        return {
          color: NeonTheme.colors.cyan,
          textShadow: NeonTheme.shadows.cyanGlow,
          animation: "rareShimmer 3s infinite"
        };
      default: // common
        return {
          color: NeonTheme.colors.lightText,
          textShadow: "0 0 6px #888",
          animation: "commonFade 4s infinite"
        };
    }
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "black", zIndex: 9999 }}>
      {/* Victory wash */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.22), transparent 60%)",
        opacity: phase >= 1 ? 1 : 0, transition: "opacity 600ms ease-out"
      }} />

      {/* Badges/titles */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "70%", textAlign: "center",
        opacity: phase >= 2 ? 1 : 0, transition: "opacity 300ms ease-out"
      }}>
        {badges.slice(0, 4).map((b, i) => (
          <span key={i} style={{
            display: "inline-block", margin: "0 12px 12px 12px",
            fontSize: 24, ...getBadgeStyle(b.rarity)
          }}>🏅 {b.name}</span>
        ))}
        {titles.slice(0, 3).map((t, i) => (
          <div key={i} style={{
            fontSize: 28, ...getBadgeStyle(t.rarity), marginTop: 8
          }}>{t.name}</div>
        ))}
      </div>

      {/* Final logo */}
      <h1 style={{
        position: "absolute", bottom: "14%", left: "50%",
        transform: "translateX(-50%)",
        color: NeonTheme.colors.gold, fontFamily: NeonTheme.fonts.heading,
        fontSize: 48, letterSpacing: 5,
        textShadow: `${NeonTheme.shadows.goldGlow}, ${NeonTheme.shadows.cyanGlow}`,
        opacity: phase >= 4 ? 1 : 0,
        animation: phase >= 4 ? "finalPulse 1.8s ease-in-out infinite" : "none"
      }}>LIFEQUEST</h1>

      {/* Shortcut hints */}
      <ShortcutHint hints={[
        { key: "Enter", action: "Skip Outro" },
        { key: "Ctrl+I", action: "Return to Inventory" },
        { key: "Ctrl+N", action: "Open Analytics" }
      ]}/>

      <style>
        {`
          @keyframes badgeFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
          @keyframes titleShimmer {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
          @keyframes finalPulse {
            0% { text-shadow: 0 0 10px #ffd700; }
            50% { text-shadow: 0 0 26px #00ffff; }
            100% { text-shadow: 0 0 10px #ffd700; }
          }
          @keyframes legendaryPulse {
            0% { text-shadow: 0 0 12px #ffd700; }
            50% { text-shadow: 0 0 28px #ffae00; }
            100% { text-shadow: 0 0 12px #ffd700; }
          }
          @keyframes rareShimmer {
            0% { opacity: 0.8; }
            50% { opacity: 1; }
            100% { opacity: 0.8; }
          }
          @keyframes commonFade {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
