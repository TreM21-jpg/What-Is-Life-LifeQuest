import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function BattleZone({ onBossEncounter }) {
  const bossRef = useRef();

  // Simple idle animation for boss
  useFrame((state) => {
    if (bossRef.current) {
      bossRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Arena floor */}
      <mesh position={[0, -0.5, -10]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Arena walls */}
      <mesh position={[0, 2, -15]}>
        <boxGeometry args={[12, 4, 0.5]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[-6, 2, -10]}>
        <boxGeometry args={[0.5, 4, 10]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[6, 2, -10]}>
        <boxGeometry args={[0.5, 4, 10]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Boss placeholder */}
      <mesh ref={bossRef} position={[0, 0.5, -10]} onClick={onBossEncounter}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ff4444" emissive="#550000" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
