/**
 * Game3D – Main 3D gameplay scene integrating character controller, camera, and physics
 * This is the foundation for cinematic, responsive 3D gameplay
 */

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Plane, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CharacterController3D from "./CharacterController3D";
import CinematicCamera3D from "./CinematicCamera3D";
import { Physics3D } from "./Physics3D";

// Scene environment and world setup
function GameEnvironment() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        castShadow
      />
      <pointLight position={[-10, 5, -10]} intensity={0.4} color="#00d4ff" />

      {/* Sky and atmosphere */}
      <Sky sunPosition={[10, 20, 10]} turbidity={8} rayleigh={6} mieCoefficient={0.005} />

      {/* Ground plane */}
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#001f3f"
          metalness={0.1}
          roughness={0.8}
        />
      </Plane>

      {/* Environment objects - obstacles and platforms */}
      <mesh
        position={[5, 0.5, 5]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>

      <mesh
        position={[-5, 0.5, -5]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 1.5, 3]} />
        <meshStandardMaterial color="#00d4ff" />
      </mesh>

      {/* Decorative column */}
      <mesh position={[0, 0, 10]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
        <meshStandardMaterial color="#ff0066" />
      </mesh>
    </>
  );
}

// Main game scene component
export default function Game3D({
  playerPosition = [0, 0, 0],
  onPlayerStateChange,
  cameraMode = "follow",
  soundEnabled = true,
}) {
  const characterRef = useRef();
  const [playerState, setPlayerState] = useState({
    position: new THREE.Vector3(...playerPosition),
    velocity: new THREE.Vector3(),
    direction: new THREE.Vector3(0, 0, -1),
    animation: "idle",
    stamina: 100,
    isSprinting: false,
  });

  // Handle player movement callback
  const handleMovement = (state) => {
    setPlayerState(state);
    if (onPlayerStateChange) {
      onPlayerStateChange(state);
    }
  };

  // Handle animation changes
  const handleAnimationChange = (animation) => {
    setPlayerState((prev) => ({ ...prev, animation }));
  };

  return (
    <Canvas
      shadows
      camera={{
        position: [5, 3, 5],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {/* Environment */}
      <GameEnvironment />

      {/* Character with advanced controller */}
      <CharacterController3D
        ref={characterRef}
        model="/models/avatar-Elementary.glb"
        onMovement={handleMovement}
        onAnimationChange={handleAnimationChange}
        soundEnabled={soundEnabled}
      />

      {/* Cinematic camera system */}
      <CinematicCamera3D
        targetRef={characterRef}
        mode={cameraMode}
        shoulderOffset={0}
        distance={5}
        height={2}
        smoothness={0.1}
        enableMouseControl={true}
      />

      {/* HUD overlay for game info */}
      <Html style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "#00d4ff",
            fontFamily: "monospace",
            fontSize: "12px",
            textShadow: "0 0 10px #00d4ff",
            zIndex: 100,
          }}
        >
          <div>Animation: {playerState.animation.toUpperCase()}</div>
          <div>Stamina: {Math.round(playerState.stamina)}%</div>
          <div>Speed: {playerState.velocity?.length().toFixed(2)} m/s</div>
          <div>Position: [{Math.round(playerState.position?.x)}, {Math.round(playerState.position?.y)}, {Math.round(playerState.position?.z)}]</div>
        </div>

        {/* Controls hint */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            color: "rgba(0, 212, 255, 0.6)",
            fontFamily: "monospace",
            fontSize: "11px",
            lineHeight: "1.6",
            zIndex: 100,
          }}
        >
          <div>W/A/S/D - Move</div>
          <div>Shift - Sprint (uses stamina)</div>
          <div>Space - Jump</div>
          <div>Scroll - Zoom Camera</div>
          <div>Right Mouse - Orbit (in orbit mode)</div>
        </div>
      </Html>
    </Canvas>
  );
}

// HTML component for rendering in Canvas context
function Html({ children, style }) {
  return (
    <div style={style}>
      {children}
    </div>
  );
}
