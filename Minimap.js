import React from "react";
import { Canvas } from "@react-three/fiber";
import SceneObjects from "./SceneObjects";
import Avatar from "./Avatar";

export default function Minimap({ playerRef }) {
  return (
    <div style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "150px",
      height: "150px",
      border: "2px solid #fff",
      borderRadius: "8px",
      overflow: "hidden",
      zIndex: 10
    }}>
      <Canvas camera={{ position: [0, 50, 0], zoom: 0.2 }}>
        <ambientLight />
        <SceneObjects lockedZones={[]} onTalk={() => {}} />
        <group ref={playerRef}>
          <Avatar gender="male" />
        </group>
      </Canvas>
    </div>
  );
}
