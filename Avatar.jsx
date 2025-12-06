import React from "react";
import { useFrame } from "@react-three/fiber";

export default function Avatar({
  gender = "male",
  skinColor = "#ffe0bd",
  hairStyle = "short",
  hairColor = "#000000",
  eyeColor = "#0000ff",
  outfit = "casual"
}) {
  const ref = React.useRef();

  // Simple idle animation (slight bobbing)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  // Outfit colors
  const outfitColors = {
    casual: "#66ccff",
    school: "#ffcc00",
    battle: "#ff4444",
    formal: "#8888ff",
    sport: "#44ff88"
  };

  // Hair geometry based on style
  const renderHair = () => {
    switch (hairStyle) {
      case "long":
        return (
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        );
      case "curly":
        return (
          <mesh position={[0, 1.5, 0]}>
            <icosahedronGeometry args={[0.35, 2]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        );
      case "braids":
        return (
          <>
            <mesh position={[-0.2, 1.3, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.2, 1.3, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </>
        );
      case "buzzcut":
        return (
          <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        );
      default: // short
        return (
          <mesh position={[0, 1.45, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        );
    }
  };

  return (
    <group ref={ref}>
      {/* Body capsule */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
        <meshStandardMaterial color={outfitColors[outfit] || "#66ccff"} />
      </mesh>

      {/* Head sphere */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.35, 0.23]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.08, 1.35, 0.23]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>

      {/* Hair */}
      {renderHair()}
    </group>
  );
}
