/**
 * GameAccessibilityManager – Unified accessibility and keyboard shortcut system
 * Integrates KeyboardManager, AccessibilityPanel, and game overlays
 */

import React, { useEffect, useRef, useState } from "react";
import AccessibilityPanel from "./AccessibilityPanel";
import { keyboardManager } from "./KeyboardManager";

export default function GameAccessibilityManager({
  onInventoryOpen,
  onMapOpen,
  onQuestsOpen,
  onLoreOpen,
  onAchievementsOpen,
  onSettingsOpen,
  onPause,
  children,
}) {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const keyboardManagerRef = useRef(null);

  useEffect(() => {
    // Initialize keyboard manager
    keyboardManagerRef.current = keyboardManager;

    // Register all game actions
    keyboardManager.registerListener("INVENTORY", () => {
      onInventoryOpen?.();
    });

    keyboardManager.registerListener("MAP", () => {
      onMapOpen?.();
    });

    keyboardManager.registerListener("QUESTS", () => {
      onQuestsOpen?.();
    });

    keyboardManager.registerListener("LORE", () => {
      onLoreOpen?.();
    });

    keyboardManager.registerListener("ACHIEVEMENTS", () => {
      onAchievementsOpen?.();
    });

    keyboardManager.registerListener("SETTINGS", () => {
      onSettingsOpen?.();
    });

    keyboardManager.registerListener("PAUSE", () => {
      onPause?.();
    });

    // Toggle accessibility panel with Alt+?
    const handleAccessibilityToggle = (e) => {
      if (e.altKey && e.key === "?") {
        e.preventDefault();
        setShowAccessibility((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleAccessibilityToggle);

    return () => {
      window.removeEventListener("keydown", handleAccessibilityToggle);
    };
  }, [onInventoryOpen, onMapOpen, onQuestsOpen, onLoreOpen, onAchievementsOpen, onSettingsOpen, onPause]);

  return (
    <>
      {/* Game content */}
      {children}

      {/* Accessibility Panel */}
      <AccessibilityPanel
        currentShortcuts={{
          INVENTORY: "Ctrl+I",
          MAP: "Ctrl+M",
          QUESTS: "Ctrl+Q",
          LORE: "Ctrl+L",
          ACHIEVEMENTS: "Ctrl+A",
          SETTINGS: "Ctrl+S",
          PAUSE: "Esc",
        }}
      />

      {/* Keyboard help hint (small) */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          fontSize: "11px",
          color: "rgba(0, 212, 255, 0.5)",
          pointerEvents: "none",
        }}
      >
        Press <kbd style={{ fontFamily: "monospace" }}>Alt+?</kbd> for keyboard shortcuts
      </div>
    </>
  );
}
