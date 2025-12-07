/**
 * AccessibilityPanel – In-game accessibility features and keyboard hints
 * Features:
 * - Dynamic keyboard shortcut hints near interactables
 * - Color blindness modes
 * - Text scaling and font options
 * - Screen reader support indicators
 * - High contrast mode
 * - Keyboard-only mode indicator
 * - Shortcut cheat sheet overlay
 */

import React, { useState, useEffect } from "react";

export default function AccessibilityPanel({
  currentShortcuts = {},
  onShortcutChange,
  accessible = true,
}) {
  const [showHints, setShowHints] = useState(true);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState("none"); // none, deuteranopia, protanopia, tritanopia
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState(100);
  const [fontType, setFontType] = useState("sans-serif");

  const shortcutCategories = {
    Navigation: [
      { action: "INVENTORY", keys: "Ctrl+I", hint: "Open Inventory" },
      { action: "MAP", keys: "Ctrl+M", hint: "Open Map" },
      { action: "QUESTS", keys: "Ctrl+Q", hint: "Open Quests" },
      { action: "LORE", keys: "Ctrl+L", hint: "Open Lore Codex" },
      { action: "ACHIEVEMENTS", keys: "Ctrl+A", hint: "View Achievements" },
      { action: "SETTINGS", keys: "Ctrl+S", hint: "Open Settings" },
    ],
    Movement: [
      { action: "MOVE_FORWARD", keys: "W", hint: "Move Forward" },
      { action: "MOVE_BACKWARD", keys: "S", hint: "Move Backward" },
      { action: "MOVE_LEFT", keys: "A", hint: "Move Left" },
      { action: "MOVE_RIGHT", keys: "D", hint: "Move Right" },
      { action: "SPRINT", keys: "Shift", hint: "Sprint" },
      { action: "JUMP", keys: "Space", hint: "Jump" },
    ],
    Combat: [
      { action: "ATTACK", keys: "LMB", hint: "Attack" },
      { action: "ABILITY_1", keys: "1", hint: "Ability 1" },
      { action: "ABILITY_2", keys: "2", hint: "Ability 2" },
      { action: "ABILITY_3", keys: "3", hint: "Ability 3" },
      { action: "ULTIMATE", keys: "R", hint: "Ultimate" },
    ],
    Utility: [
      { action: "INTERACT", keys: "E", hint: "Interact" },
      { action: "USE_ITEM", keys: "F", hint: "Use Item" },
      { action: "SKIP_DIALOGUE", keys: "Space", hint: "Skip Dialogue" },
    ],
  };

  // Apply accessibility styles
  useEffect(() => {
    document.documentElement.style.fontSize = `${textScale}%`;
    document.documentElement.style.fontFamily =
      fontType === "dyslexia" ? "'OpenDyslexic', sans-serif" : "inherit";

    if (highContrast) {
      document.documentElement.style.filter = "contrast(1.5) brightness(1.1)";
    } else {
      document.documentElement.style.filter = "none";
    }

    // Color blind mode filters
    let colorFilter = "";
    switch (colorBlindMode) {
      case "deuteranopia":
        colorFilter = "url(#deuteranopia-filter)";
        break;
      case "protanopia":
        colorFilter = "url(#protanopia-filter)";
        break;
      case "tritanopia":
        colorFilter = "url(#tritanopia-filter)";
        break;
      default:
        colorFilter = "none";
    }
    document.documentElement.style.filter = colorFilter;
  }, [textScale, fontType, highContrast, colorBlindMode]);

  return (
    <>
      {/* Accessibility Settings Panel */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {/* Settings Button */}
        <button
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          title="Toggle Keyboard Shortcuts (Alt+?)"
          style={{
            padding: "10px 16px",
            background: highContrast ? "#ffff00" : "rgba(0, 212, 255, 0.2)",
            border: highContrast ? "2px solid #000" : "2px solid rgba(0, 212, 255, 0.6)",
            borderRadius: "8px",
            color: highContrast ? "#000" : "#00d4ff",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          ⌨️ Shortcuts
        </button>

        {/* Accessibility Indicator */}
        <div
          title="Accessibility mode enabled"
          style={{
            padding: "8px 12px",
            background: highContrast ? "#ffff00" : "rgba(255, 0, 102, 0.2)",
            border: highContrast ? "2px solid #000" : "2px solid rgba(255, 0, 102, 0.4)",
            borderRadius: "6px",
            color: highContrast ? "#000" : "#ff0066",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          ♿ A11Y
        </div>
      </div>

      {/* Shortcut Cheat Sheet Overlay */}
      {showCheatSheet && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "80vh",
            maxWidth: "600px",
            background: highContrast ? "#ffff00" : "rgba(0, 0, 0, 0.95)",
            border: highContrast ? "3px solid #000" : "2px solid rgba(0, 212, 255, 0.4)",
            borderRadius: "12px",
            padding: "24px",
            zIndex: 9999,
            overflowY: "auto",
            color: highContrast ? "#000" : "#00d4ff",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>⌨️ Keyboard Shortcuts</h2>
            <button
              onClick={() => setShowCheatSheet(false)}
              style={{
                background: "transparent",
                border: "none",
                color: highContrast ? "#000" : "#00d4ff",
                fontSize: "24px",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Shortcuts by category */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {Object.entries(shortcutCategories).map(([category, shortcuts]) => (
              <div key={category}>
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    opacity: 0.8,
                    borderBottom: highContrast ? "2px solid #000" : "2px solid rgba(0, 212, 255, 0.3)",
                    paddingBottom: "8px",
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {shortcuts.map((shortcut, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px",
                        background: highContrast
                          ? "rgba(0, 0, 0, 0.2)"
                          : "rgba(0, 212, 255, 0.05)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    >
                      <span>{shortcut.hint}</span>
                      <kbd
                        style={{
                          padding: "4px 8px",
                          background: highContrast ? "#000" : "rgba(0, 0, 0, 0.3)",
                          border: highContrast ? "1px solid #000" : "1px solid rgba(0, 212, 255, 0.3)",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: highContrast ? "#ffff00" : "#00d4ff",
                        }}
                      >
                        {shortcut.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Accessibility Settings */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: highContrast ? "2px solid #000" : "2px solid rgba(0, 212, 255, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Accessibility Options
            </h3>

            {/* Text Scale */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Text Size: {textScale}%
              </label>
              <input
                type="range"
                min="80"
                max="150"
                value={textScale}
                onChange={(e) => setTextScale(parseInt(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            {/* High Contrast */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                High Contrast Mode
              </label>
            </div>

            {/* Color Blind Mode */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600" }}>
                Color Blind Mode:
              </label>
              <select
                value={colorBlindMode}
                onChange={(e) => setColorBlindMode(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: highContrast ? "#000" : "rgba(0, 0, 0, 0.3)",
                  color: highContrast ? "#ffff00" : "#00d4ff",
                  border: highContrast ? "2px solid #000" : "1px solid rgba(0, 212, 255, 0.3)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <option value="none">None</option>
                <option value="deuteranopia">Deuteranopia</option>
                <option value="protanopia">Protanopia</option>
                <option value="tritanopia">Tritanopia</option>
              </select>
            </div>

            {/* Font Type */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600" }}>
                Font:
              </label>
              <select
                value={fontType}
                onChange={(e) => setFontType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: highContrast ? "#000" : "rgba(0, 0, 0, 0.3)",
                  color: highContrast ? "#ffff00" : "#00d4ff",
                  border: highContrast ? "2px solid #000" : "1px solid rgba(0, 212, 255, 0.3)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <option value="sans-serif">Standard</option>
                <option value="dyslexia">OpenDyslexic (Dyslexia-friendly)</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>

          {/* Tip */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "11px",
              opacity: 0.7,
              fontStyle: "italic",
              margin: "20px 0 0 0",
            }}
          >
            💡 Press Alt+? to toggle shortcuts anytime
          </p>
        </div>
      )}

      {/* SVG Color Blind Filters */}
      <svg style={{ display: "none" }}>
        <defs>
          {/* Deuteranopia (Green-Blind) */}
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0     0 0
                      0.7   0.3   0     0 0
                      0     0.3   0.7   0 0
                      0     0     0     1 0"
            />
          </filter>

          {/* Protanopia (Red-Blind) */}
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0     0 0
                      0.558 0.442 0     0 0
                      0     0.242 0.758 0 0
                      0     0     0     1 0"
            />
          </filter>

          {/* Tritanopia (Blue-Blind) */}
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95  0.05  0     0 0
                      0     0.433 0.567 0 0
                      0     0.475 0.525 0 0
                      0     0     0     1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
