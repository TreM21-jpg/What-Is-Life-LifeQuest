import React, { useEffect, useRef, useState } from "react";
import OverlayManager from "./OverlayManager.jsx";

export default function GameScene({ overlays }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // Player state
  const [player, setPlayer] = useState({
    x: 400, y: 300, vx: 0, vy: 0, speed: 2.6, radius: 14, color: "#FFDC00"
  });

  // Camera state
  const [camera, setCamera] = useState({ x: 0, y: 0, width: 800, height: 600 });

  // Active region (auto triggers overlay)
  const [activeRegion, setActiveRegion] = useState(null);

  // World setup
  const world = {
    width: 2400,
    height: 1800,
    regions: overlays?.worldData?.regions || [
      { name: "Forest of Beginnings", description: "A lush green forest", lore: "Helpers are born here.", rarity: "common", x: 600, y: 500, w: 280, h: 220 },
      { name: "Dreamer’s Valley", description: "A land of imagination", lore: "Dream with intent.", rarity: "rare", x: 1200, y: 800, w: 300, h: 240 },
      { name: "Golden Citadel", description: "A legendary stronghold", lore: "Earn your entry.", rarity: "legendary", x: 1800, y: 400, w: 320, h: 260 }
    ]
  };

  // Input tracking
  const keysRef = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const down = (e) => { if (e.key in keysRef.current) keysRef.current[e.key] = true; };
    const up = (e) => { if (e.key in keysRef.current) keysRef.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Region detection
  const checkRegionEntry = (px, py) => {
    for (const r of world.regions) {
      if (px > r.x && px < r.x + r.w && py > r.y && py < r.y + r.h) {
        return r;
      }
    }
    return null;
  };

  // Update loop
  const update = () => {
    const K = keysRef.current;
    let vx = 0, vy = 0;
    if (K.w) vy -= 1;
    if (K.s) vy += 1;
    if (K.a) vx -= 1;
    if (K.d) vx += 1;

    if (vx !== 0 && vy !== 0) {
      const inv = 1 / Math.sqrt(2);
      vx *= inv; vy *= inv;
    }

    const nx = Math.max(player.radius, Math.min(world.width - player.radius, player.x + vx * player.speed));
    const ny = Math.max(player.radius, Math.min(world.height - player.radius, player.y + vy * player.speed));

    setPlayer((p) => ({ ...p, x: nx, y: ny, vx, vy }));

    const cx = Math.max(0, Math.min(world.width - camera.width, nx - camera.width / 2));
    const cy = Math.max(0, Math.min(world.height - camera.height, ny - camera.height / 2));
    setCamera((cam) => ({ ...cam, x: cx, y: cy }));

    const region = checkRegionEntry(nx, ny);
    if (region && (!activeRegion || activeRegion.name !== region.name)) {
      setActiveRegion(region); // auto trigger overlay
    }
  };

  // Render loop
  const render = (ctx) => {
    const { width, height } = ctx.canvas;
    ctx.fillStyle = "#001f3f";
    ctx.fillRect(0, 0, width, height);

    // Regions
    for (const r of world.regions) {
      const rx = r.x - camera.x;
      const ry = r.y - camera.y;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.strokeStyle = r.rarity === "legendary" ? "#ffd700" : (r.rarity === "rare" ? "#00ffff" : "#888");
      ctx.strokeRect(rx, ry, r.w, r.h);
      ctx.fillText(r.name, rx + 8, ry + 20);
    }

    // Player
    const px = player.x - camera.x;
    const py = player.y - camera.y;
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(px, py, player.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let last = performance.now();

    const frame = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      update(dt);
      render(ctx);
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        width={800}
        height={600}
        style={{
          display: "block",
          margin: "0 auto",
          border: "2px solid #00ffff",
          boxShadow: "0 0 20px #00ffff",
          background: "#000"
        }}
      />

      {/* Overlay system with auto region trigger */}
      <OverlayManager overlays={overlays} autoRegion={activeRegion} />
    </div>
  );
}
