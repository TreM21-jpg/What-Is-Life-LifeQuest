import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function AvatarModel() {
  const { scene } = useGLTF('/models/avatar-Elementary.glb'); // loads the model
  return <primitive object={scene} scale={1.2} position={[0, -1, 0]} />;
}

export default function Avatar3D() {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <AvatarModel />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}
