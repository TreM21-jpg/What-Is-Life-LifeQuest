import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function CameraRig({ duration, onFinish }) {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);

    // Simple cinematic zoom + pan
    state.camera.position.z = 10 - time * 1.5;
    state.camera.position.x = Math.sin(time * 0.5) * 2;
    state.camera.lookAt(0, 0, 0);

    if (time > duration) {
      onFinish();
    }
  });

  return null;
}

function ScriptedText({ script, currentLine }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#00ffff",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "28px",
      textShadow: "0 0 10px #00ffff",
      zIndex: 200,
      textAlign: "center",
      width: "80%"
    }}>
      {script[currentLine]}
    </div>
  );
}

export default function CutscenePlayer({ script = [], duration = 8, onFinish }) {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (script.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLine((line) => {
        if (line < script.length - 1) return line + 1;
        return line;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [script]);

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

      {/* Scripted text */}
      {script.length > 0 && (
        <ScriptedText script={script} currentLine={currentLine} />
      )}
    </div>
  );
}
