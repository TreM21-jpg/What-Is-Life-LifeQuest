import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function CameraRig({ onFinish }) {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);

    // Simple camera pan forward
    state.camera.position.z = 10 - time * 2;
    state.camera.lookAt(0, 0, 0);

    if (time > 5) {
      onFinish();
    }
  });

  return null;
}

function TitleSequence() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => s + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    "A Journey Through Life...",
    "Face Challenges, Grow Stronger...",
    "Choose Your Path...",
    "Welcome to LifeQuest"
  ];

  return (
    <div style={{
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#00ffff",
      fontFamily: "Orbitron, sans-serif",
      fontSize: "36px",
      textShadow: "0 0 10px #00ffff",
      zIndex: 100
    }}>
      {messages[step] || ""}
    </div>
  );
}

export default function TrailerScene({ onFinish }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas>
        {/* Background glow */}
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#111" side={2} />
        </mesh>

        {/* Camera rig */}
        <CameraRig onFinish={onFinish} />
      </Canvas>

      {/* Title text sequence */}
      <TitleSequence />
    </div>
  );
}
