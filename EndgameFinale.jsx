import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function FinaleCamera({ duration, onFinish }) {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);

    // Slow upward pan for dramatic finale
    state.camera.position.y = time * 0.5;
    state.camera.position.z = 8 - time * 0.3;
    state.camera.lookAt(0, 0, 0);

    if (time > duration) {
      onFinish();
    }
  });

  return null;
}

function FinaleText({ finalLines, currentLine }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#00ffff",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "28px",
      textShadow: "0 0 15px #00ffff",
      zIndex: 300,
      textAlign: "center",
      width: "80%"
    }}>
      <p>{finalLines[currentLine]}</p>
    </div>
  );
}

export default function EndgameFinale({ finalLines = [], duration = 10, onFinish }) {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (finalLines.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLine((line) => {
        if (line < finalLines.length - 1) return line + 1;
        return line;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [finalLines]);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas>
        {/* Background glow */}
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#111" side={2} />
        </mesh>

        {/* Camera rig */}
        <FinaleCamera duration={duration} onFinish={onFinish} />
      </Canvas>

      {/* Finale text */}
      {finalLines.length > 0 && (
        <FinaleText finalLines={finalLines} currentLine={currentLine} />
      )}
    </div>
  );
}
