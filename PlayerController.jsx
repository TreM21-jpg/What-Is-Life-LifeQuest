import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

export default function PlayerController({ children, onZoneEnter, onBossDefeat, onPlayerDefeat }) {
  const ref = useRef();
  const controls = useKeyboardControls();

  // Simple movement speed
  const speed = 0.1;

  // Zone boundaries (example positions)
  const zones = {
    School: { x: [ -2, 2 ], z: [ -2, 2 ] },
    Playground: { x: [ 8, 12 ], z: [ -2, 2 ] },
    Park: { x: [ -12, -8 ], z: [ -2, 2 ] },
    Battle: { x: [ -2, 2 ], z: [ -12, -8 ] },
    Home: { x: [ -2, 2 ], z: [ 8, 12 ] }
  };

  useFrame(() => {
    if (!ref.current) return;

    // Movement controls
    if (controls.forward) ref.current.position.z -= speed;
    if (controls.backward) ref.current.position.z += speed;
    if (controls.left) ref.current.position.x -= speed;
    if (controls.right) ref.current.position.x += speed;

    // Zone detection
    Object.entries(zones).forEach(([zone, bounds]) => {
      const { x, z } = bounds;
      if (
        ref.current.position.x >= x[0] &&
        ref.current.position.x <= x[1] &&
        ref.current.position.z >= z[0] &&
        ref.current.position.z <= z[1]
      ) {
        onZoneEnter(zone);
      }
    });

    // Example defeat triggers (you can expand these)
    if (ref.current.position.y < -5) {
      onPlayerDefeat();
    }
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
}
