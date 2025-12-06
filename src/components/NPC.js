import React from "react";
import { useGLTF } from "@react-three/drei";

export default function NPC({ model, position, name, zone, onTalk }) {
  const { scene } = useGLTF(model);

  return (
    <group
      position={position}
      onClick={() => onTalk(name, zone)}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <primitive object={scene} />
    </group>
  );
}
