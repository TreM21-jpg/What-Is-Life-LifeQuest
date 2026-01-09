/**
 * LifeQuestLogo.jsx
 * 
 * SVG component for the LifeQuest logo - A tree symbolizing life and growth
 * Used in: Main menu, loading screen, intro cinematic, and branding
 */

export default function LifeQuestLogo({ size = 200, color = "#333", showText = true }) {
  const width = size;
  const height = size;
  const imagePath = "/assets/images/lifequest-logo.png"; // place the exact provided image here

  return (
    <div style={{ textAlign: "center" }}>
      {/* Use exact provided raster logo if present in public/assets/images, otherwise fallback to SVG */}
      <img
        src={imagePath}
        alt="LifeQuest"
        style={{ width: width, height: height, objectFit: 'contain', display: 'block', margin: '0 auto' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
      >
        {/* Tree trunk */}
        <line x1="100" y1="140" x2="95" y2="180" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="140" x2="105" y2="180" stroke={color} strokeWidth="3" strokeLinecap="round" />

        {/* Main canopy - branches radiating outward */}
        {/* Top center */}
        <line x1="100" y1="40" x2="100" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="40" x2="85" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="40" x2="115" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Upper left branches */}
        <line x1="75" y1="50" x2="55" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="50" x2="60" y2="35" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="75" y1="50" x2="50" y2="45" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Upper right branches */}
        <line x1="125" y1="50" x2="145" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="125" y1="50" x2="140" y2="35" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="125" y1="50" x2="150" y2="45" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Left branches */}
        <line x1="55" y1="80" x2="30" y2="55" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="80" x2="35" y2="75" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="80" x2="25" y2="85" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Right branches */}
        <line x1="145" y1="80" x2="170" y2="55" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="145" y1="80" x2="165" y2="75" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="145" y1="80" x2="175" y2="85" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Lower left branches */}
        <line x1="70" y1="110" x2="45" y2="100" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="110" x2="50" y2="125" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="110" x2="40" y2="130" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Lower right branches */}
        <line x1="130" y1="110" x2="155" y2="100" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="110" x2="150" y2="125" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="110" x2="160" y2="130" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Main canopy connection to trunk */}
        <line x1="100" y1="140" x2="100" y2="60" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </svg>

      {showText && (
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            fontWeight: "bold",
            letterSpacing: 2,
            color: color,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          LIFEQUEST
        </div>
      )}
    </div>
  );
}
