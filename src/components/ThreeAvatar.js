import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ThreeAvatar() {
  const avatarRef = useRef();

  useFrame(() => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y += 0.01; // idle animation
    }
  });

  return (
    <mesh ref={avatarRef} position={[0, 1, 0]} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}
