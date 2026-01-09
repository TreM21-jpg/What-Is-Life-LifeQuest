/**
 * QuestWorld.jsx
 * 
 * 3D world populated with quest NPCs and interactive quest zones
 * Features:
 * - Multiple quest NPCs at different locations
 * - Quest zones (glowing areas)
 * - Environmental objects (trees, buildings, landmarks)
 * - Quest progress tracking
 */

import React, { useState } from "react";
import { Box, Sphere, Cylinder, useGLTF } from "@react-three/drei";
import QuestNPC from "./QuestNPC";

const QUESTS = [
  {
    id: "forest_guardian",
    name: "Forest Guardian",
    title: "Protect the Forest",
    description: "Defend the ancient forest from corruption",
    reward: 100,
    position: [-15, 1, -20],
  },
  {
    id: "sky_watcher",
    name: "Sky Watcher",
    title: "Reach the Summit",
    description: "Climb to the highest peak and claim the treasure",
    reward: 150,
    position: [15, 1, -25],
  },
  {
    id: "crystal_keeper",
    name: "Crystal Keeper",
    title: "Find the Crystals",
    description: "Collect magical crystals hidden across the world",
    reward: 120,
    position: [20, 1, 5],
  },
  {
    id: "shadow_hunter",
    name: "Shadow Hunter",
    title: "Defeat the Shadow",
    description: "Defeat the ancient shadow creature",
    reward: 200,
    position: [-20, 1, 15],
  },
];

export default function QuestWorld({
  activeQuestId = null,
  completedQuestIds = [],
  onQuestAccept,
}) {
  const [hoveredZone, setHoveredZone] = useState(null);

  return (
    <group>
      {/* Decorative terrain features */}

      {/* Mountains in distance */}
      <Box args={[30, 40, 10]} position={[0, 20, -40]} visible={false}>
        <meshStandardMaterial color="#333333" />
      </Box>

      {/* Trees scattered around */}
      {[-10, 0, 10].map((x, idx) => (
        <group key={`tree-${idx}`} position={[x, 0, -30]}>
          <Cylinder args={[0.5, 1, 6]} position={[0, 3, 0]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Sphere args={[4, 8, 8]} position={[0, 8, 0]} castShadow>
            <meshStandardMaterial color="#2d5016" />
          </Sphere>
        </group>
      ))}

      {/* Quest zones - glowing areas where quests happen */}
      {QUESTS.map((quest) => {
        const isActive = quest.id === activeQuestId;
        const isCompleted = completedQuestIds.includes(quest.id);

        return (
          <group key={quest.id}>
            {/* Quest zone ground marker */}
            <mesh
              position={[quest.position[0], quest.position[1] - 0.95, quest.position[2]]}
              rotation={[-Math.PI / 2, 0, 0]}
              onPointerEnter={() => setHoveredZone(quest.id)}
              onPointerLeave={() => setHoveredZone(null)}
              receiveShadow
            >
              <cylinderGeometry args={[4, 4, 0.1, 32]} />
              <meshStandardMaterial
                color={
                  isCompleted
                    ? "#00ff88"
                    : isActive
                    ? "#00ffff"
                    : "#ffd700"
                }
                emissive={
                  isCompleted
                    ? "#00ff88"
                    : isActive
                    ? "#00ffff"
                    : "#ffd700"
                }
                emissiveIntensity={hoveredZone === quest.id ? 0.8 : 0.4}
              />
            </mesh>

            {/* Ambient glow effect around zone */}
            <Sphere
              args={[4.2, 32, 32]}
              position={quest.position}
              visible={false}
            >
              <meshBasicMaterial
                color={isCompleted ? "#00ff88" : isActive ? "#00ffff" : "#ffd700"}
                transparent
                opacity={0}
              />
            </Sphere>

            {/* NPC at quest location */}
            <QuestNPC
              position={quest.position}
              name={quest.name}
              questTitle={quest.title}
              questDescription={quest.description}
              questReward={quest.reward}
              hasActiveQuest={isActive}
              isCompleted={isCompleted}
              onAcceptQuest={() => onQuestAccept?.(quest.id)}
            />

            {/* Floating particles above active quests */}
            {isActive && (
              <group position={quest.position}>
                {[0, 1, 2].map((i) => (
                  <Sphere
                    key={`particle-${i}`}
                    args={[0.1, 8, 8]}
                    position={[
                      Math.sin(Date.now() / 1000 + i) * 2,
                      2 + i * 0.5,
                      Math.cos(Date.now() / 1000 + i) * 2,
                    ]}
                  >
                    <meshBasicMaterial
                      color="#00ffff"
                      emissive="#00ffff"
                      transparent
                      opacity={0.6}
                    />
                  </Sphere>
                ))}
              </group>
            )}
          </group>
        );
      })}

      {/* Central hub structure */}
      <Box
        args={[20, 10, 20]}
        position={[0, 5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#001f3f"
          metalness={0.3}
          roughness={0.7}
        />
      </Box>

      {/* Pillar markers at cardinal directions */}
      {[
        { pos: [25, 0, 0], label: "East" },
        { pos: [-25, 0, 0], label: "West" },
        { pos: [0, 0, 25], label: "North" },
        { pos: [0, 0, -25], label: "South" },
      ].map((marker, idx) => (
        <Cylinder
          key={idx}
          args={[1, 1, 8]}
          position={marker.pos}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </Cylinder>
      ))}
    </group>
  );
}
