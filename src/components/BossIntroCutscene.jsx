import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function CameraRig({ duration, onFinish }) {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);

    // Dramatic zoom-in effect
    state.camera.position.z = 12 - time * 2;
    state.camera.lookAt(0, 0, 0);

    if (time > duration) {
      onFinish();
    }
  });

  return null;
}

function IntroText({ bossName, bossIntroLines, currentLine }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#ff4444",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "28px",
      textShadow: "0 0 15px #ff4444",
      zIndex: 300,
      textAlign: "center",
      width: "80%"
    }}>
      <h2 style={{ marginBottom: "20px", color: "#ffcc00" }}>
        {bossName} Approaches...
      </h2>
      <p>{bossIntroLines[currentLine]}</p>
    </div>
  );
}

export default function BossIntroCutscene({ bossName, bossIntroLines = [], duration = 6, onFinish }) {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (bossIntroLines.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLine((line) => {
        if (line < bossIntroLines.length - 1) return line + 1;
        return line;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [bossIntroLines]);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas>
        {/* Background atmosphere */}
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#111" side={2} />
        </mesh>

        {/* Camera rig */}
        <CameraRig duration={duration} onFinish={onFinish} />
      </Canvas>

      {/* Intro text */}
      {bossIntroLines.length > 0 && (
        <IntroText bossName={bossName} bossIntroLines={bossIntroLines} currentLine={currentLine} />
      )}
    </div>
  );
}
