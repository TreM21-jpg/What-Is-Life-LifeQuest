// NeonTheme.js
// Shared theme constants for LifeQuest overlays

const NeonTheme = {
  colors: {
    cyan: "#00ffff",
    gold: "#ffcc00",
    green: "#44ff88",
    red: "#ff4444",
    dark: "#111",
    mid: "#222",
    lightText: "#cfffff",
    mutedText: "#9ad"
  },

  shadows: {
    cyanGlow: "0 0 15px #00ffff",
    goldGlow: "0 0 15px #ffcc00",
    greenGlow: "0 0 15px #44ff88",
    redGlow: "0 0 15px #ff4444"
  },

  fonts: {
    heading: "Orbitron, sans-serif",
    body: "Orbitron, sans-serif"
  },

  animations: {
    fadeIn: {
      animation: "fadeIn 0.5s ease forwards"
    },
    pulse: {
      animation: "pulse 1.5s infinite"
    },
    slideUp: {
      animation: "slideUp 0.6s ease forwards"
    }
  }
};

export default NeonTheme;

/* Add these keyframes in your global CSS (e.g., index.css):

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0% { box-shadow: 0 0 10px #00ffff; }
  50% { box-shadow: 0 0 20px #00ffff; }
  100% { box-shadow: 0 0 10px #00ffff; }
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
*/
