import React, { useState } from "react";
import NeonTheme from "./NeonTheme.js";
import ShortcutHint from "./ShortcutHint.jsx";

export default function MapOverlay({ worldData, onClose, onSelectRegion }) {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    if (onSelectRegion) onSelectRegion(region); // trigger quest overlay or zoom
  };

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(0,0,0,0.95)",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1083, padding: "20px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        textShadow: NeonTheme.shadows.cyanGlow,
        fontSize: 48
      }}>🌍 LifeQuest Open World</h1>

      {/* Region list */}
      <div style={{ marginTop: "20px" }}>
        {worldData?.regions?.map((region, i) => (
          <div key={i}
            onClick={() => handleRegionClick(region)}
            style={{
              marginBottom: "12px",
              padding: "10px",
              border: `2px solid ${NeonTheme.colors.gold}`,
              borderRadius: "6px",
              boxShadow: NeonTheme.shadows.goldGlow,
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <strong>{region.name}</strong> — {region.description}
          </div>
        ))}
      </div>

      {/* Selected region details */}
      {selectedRegion && (
        <div style={{
          marginTop: "20px",
          padding: "16px",
          border: `2px solid ${NeonTheme.colors.cyan}`,
          borderRadius: "8px",
          boxShadow: NeonTheme.shadows.cyanGlow,
          background: NeonTheme.colors.mid
        }}>
          <h2 style={{ color: NeonTheme.colors.gold }}>{selectedRegion.name}</h2>
          <p>{selectedRegion.lore}</p>
          <button onClick={() => setSelectedRegion(null)} style={{
            marginTop: "10px", padding: "8px 16px",
            background: NeonTheme.colors.cyan, border: "none",
            borderRadius: "6px", fontWeight: "700", cursor: "pointer",
            ...NeonTheme.animations.pulse
          }}>Back to Map</button>
        </div>
      )}

      <button onClick={onClose} style={{
        marginTop: "20px", padding: "12px 24px",
        background: NeonTheme.colors.cyan, border: "none",
        borderRadius: "8px", fontWeight: "700", cursor: "pointer",
        ...NeonTheme.animations.pulse
      }}>Close Map</button>

      <ShortcutHint hints={[
        { key: "Esc", action: "Close Map" },
        { key: "Ctrl+M", action: "Open Map" },
        { key: "Click Region", action: "Zoom / Trigger Quest" }
      ]}/>
    </div>
  );
}
