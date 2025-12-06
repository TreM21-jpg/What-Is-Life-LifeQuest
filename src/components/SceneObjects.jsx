import React from "react";
import { Html } from "@react-three/drei";

export default function SceneObjects({ lockedZones, onTalk }) {
  return (
    <>
      {/* School Zone */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#88c" />
        <Html position={[0, 2, 0]}>
          <button
            onClick={() => onTalk("Classmate", "School")}
            style={{
              background: "#00ffff",
              border: "none",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
              fontFamily: "Orbitron, sans-serif"
            }}
          >
            Talk to Classmate
          </button>
        </Html>
      </mesh>

      {/* Playground Zone */}
      <mesh position={[10, 0, 0]}>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#c88" />
        <Html position={[0, 2, 0]}>
          <button
            onClick={() => onTalk("Bully", "Playground")}
            style={{
              background: "#ff4444",
              border: "none",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
              fontFamily: "Orbitron, sans-serif",
              color: "#fff"
            }}
          >
            Confront Bully
          </button>
        </Html>
      </mesh>

      {/* Park Zone */}
      {!lockedZones.includes("Park") && (
        <mesh position={[-10, 0, 0]}>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#4c4" />
          <Html position={[0, 2, 0]}>
            <button
              onClick={() => onTalk("Friend", "Park")}
              style={{
                background: "#00ffff",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
                fontFamily: "Orbitron, sans-serif"
              }}
            >
              Talk to Friend
            </button>
          </Html>
        </mesh>
      )}

      {/* Battle Zone */}
      {!lockedZones.includes("Battle") && (
        <mesh position={[0, 0, -10]}>
          <boxGeometry args={[6, 2, 6]} />
          <meshStandardMaterial color="#933" />
          <Html position={[0, 2, 0]}>
            <button
              onClick={() => onTalk("Exam Dragon", "Battle")}
              style={{
                background: "#ff4444",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
                fontFamily: "Orbitron, sans-serif",
                color: "#fff"
              }}
            >
              Face Exam Dragon
            </button>
          </Html>
        </mesh>
      )}

      {/* Home Zone */}
      {!lockedZones.includes("Home") && (
        <mesh position={[0, 0, 10]}>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#cc8" />
          <Html position={[0, 2, 0]}>
            <button
              onClick={() => onTalk("Mentor", "Home")}
              style={{
                background: "#00ffff",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
                fontFamily: "Orbitron, sans-serif"
              }}
            >
              Talk to Mentor
            </button>
          </Html>
        </mesh>
      )}
    </>
  );
}
