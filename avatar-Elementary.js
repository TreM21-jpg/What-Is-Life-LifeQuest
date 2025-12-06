// Avatar3D.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AvatarModel({ stage, xp }) {
  let modelPath = `/models/avatar-${stage}.glb`;

  if (xp >= 500) modelPath = `/models/avatar-${stage}-evolved.glb`;

  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />;
}

export default function Avatar3D({ stage, xp }) {
  return (
    <div style={{ height: "400px" }}>
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <AvatarModel stage={stage} xp={xp} />
      </Canvas>
    </div>
  );
}
