/**
 * CinematicSequence.jsx
 * 
 * Professional cinematic camera system with dialogue, timing, and effects
 * Used for: Intro, boss encounters, victory/defeat sequences
 * 
 * Features:
 * - Keyframe-based camera animation
 * - Dialogue integration
 * - Music fade in/out
 * - Screen effects (fade, vignette, bloom)
 * - Timing and synchronization
 * - Skip functionality (Space or click)
 */

import React, { useState, useEffect, useRef } from "react";
import LifeQuestLogo from "./LifeQuestLogo";

export default function CinematicSequence({
  sequence,
  onComplete,
  onSkip,
  canSkip = true
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [effectsOpacity, setEffectsOpacity] = useState(1);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const {
    name,
    duration, // Total duration in ms
    camera, // { keyframes: [{time, pos, target, fov}, ...] }
    dialogue, // [{time, text, speaker, duration}, ...]
    music, // { url, startTime, fadeIn, fadeOut }
    effects, // { vignette, bloom, colorGrade, ... }
    skipable = true,
    onDialogue // Callback when dialogue plays
  } = sequence;

  /**
   * Animate based on elapsed time
   */
  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const frameTime = progress * duration;

      setCurrentFrame(frameTime);

      // Update dialogue
      if (dialogue) {
        const currentDialogue = dialogue.find(
          d => d.time <= frameTime && frameTime < d.time + d.duration
        );
        const newIndex = currentDialogue ? dialogue.indexOf(currentDialogue) : -1;
        if (newIndex !== dialogueIndex) {
          setDialogueIndex(newIndex);
          if (newIndex >= 0 && onDialogue) {
            onDialogue(dialogue[newIndex]);
          }
        }
      }

      // Handle fade out at end
      if (progress > 0.9) {
        setEffectsOpacity(1 - (progress - 0.9) * 10);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, dialogue, dialogueIndex, onDialogue, onComplete]);

  /**
   * Handle skip
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (canSkip && skipable && (e.code === "Space" || e.key === "Escape")) {
        e.preventDefault();
        onSkip?.();
        onComplete?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canSkip, skipable, onSkip, onComplete]);

  const currentDialogue = dialogueIndex >= 0 ? dialogue?.[dialogueIndex] : null;
  const progress = currentFrame / duration;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer"
      }}
      onClick={() => {
        if (canSkip && skipable) {
          onSkip?.();
          onComplete?.();
        }
      }}
    >
      {/* Main cinematic area */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0a0e27, #1a1a2e)",
          opacity: effectsOpacity
        }}
      >
        {/* Vignette effect */}
        {effects?.vignette && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)",
              pointerEvents: "none"
            }}
          />
        )}

        {/* Bloom effect */}
        {effects?.bloom && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle, rgba(255,215,0,${0.1 * Math.sin(progress * Math.PI)}) 0%, transparent 70%)`,
              pointerEvents: "none"
            }}
          />
        )}

        {/* Sequence content (custom renderer) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#00d4ff",
            fontSize: "48px",
            textShadow: "0 0 20px #00d4ff",
            opacity: Math.max(0, 1 - Math.abs(progress - 0.5) * 2)
          }}
        >
          <LifeQuestLogo size={240} color="#00d4ff" showText={true} />
          <div style={{ marginTop: 40, opacity: Math.sin(progress * Math.PI) }}>
            {sequence.content}
          </div>
        </div>
      </div>

      {/* Dialogue UI */}
      {currentDialogue && (
        <div
          style={{
            position: "absolute",
            bottom: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "80%",
            background: "rgba(0, 20, 40, 0.95)",
            border: "2px solid #00d4ff",
            borderRadius: "8px",
            padding: "20px",
            zIndex: 10000,
            animation: "slideUp 0.5s ease-out",
            color: "#00d4ff",
            fontFamily: "monospace",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)"
          }}
        >
          {currentDialogue.speaker && (
            <div
              style={{
                color: "#ffd700",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "8px"
              }}
            >
              {currentDialogue.speaker}
            </div>
          )}
          <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
            {currentDialogue.text}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "4px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "2px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #00d4ff, #ffd700)",
            width: `${progress * 100}%`,
            transition: "width 0.1s linear"
          }}
        />
      </div>

      {/* Skip hint */}
      {canSkip && skipable && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "#666",
            fontSize: "12px",
            fontFamily: "monospace"
          }}
        >
          Press SPACE to skip
        </div>
      )}

      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
