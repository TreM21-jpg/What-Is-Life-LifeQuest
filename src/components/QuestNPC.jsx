/**
 * QuestNPC.jsx
 * 
 * Interactive NPC for quests in the 3D world
 * Features:
 * - Quest marker above head
 * - Click to interact and receive quests
 * - Dialogue system
 * - Quest tracking
 */

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { backendAPI } from "../services/BackendAPI";
import * as THREE from "three";

export default function QuestNPC({
  position = [0, 0, 0],
  name = "NPC",
  questTitle = "Untitled Quest",
  questDescription = "Complete this quest",
  questReward = 50,
  onAcceptQuest,
  hasActiveQuest = false,
  isCompleted = false,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Bobbing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  // Quest marker color based on state
  let markerColor = "#ffd700"; // Yellow = available
  if (hasActiveQuest) markerColor = "#00ffff"; // Cyan = active
  if (isCompleted) markerColor = "#00ff88"; // Green = completed

  const handleClick = async () => {
    // If a prop handler exists, call it (UI-level)
    if (onAcceptQuest) {
      try {
        await onAcceptQuest();
        alert(`${name}: Quest accepted locally.`);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    // Otherwise attempt to call backend API directly (requires auth token)
    try {
      const quests = await backendAPI.getQuests();
      const found = quests.find(q => q.title === questTitle || q.id === questTitle || q.id === questTitle);
      const questId = (found && found.id) || questTitle;
      await backendAPI.acceptQuest(questId);
      alert(`${name}: Quest accepted (server).`);
    } catch (err) {
      console.warn('Accept quest failed (maybe not authenticated):', err);
      alert(`${name}: Failed to accept quest. Log in to save progress.`);
    }
  };

  return (
    <group ref={groupRef} position={position} onClick={handleClick}>
      {/* NPC Body - Simple sphere */}
      <mesh
        castShadow
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#00ffff" : "#4488ff"}
          emissive={hovered ? "#00ffff" : "#002266"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* Quest marker above NPC */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={markerColor} />
      </mesh>

      {/* Glow effect for quest marker */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* NPC name label */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.3}
        color={markerColor}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        {name}
      </Text>

      {/* Quest title label (closer when hovered) */}
      {hovered && (
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="#ffd700"
          anchorX="center"
          anchorY="top"
          maxWidth={2}
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {questTitle}
        </Text>
      )}
    </group>
  );
}
