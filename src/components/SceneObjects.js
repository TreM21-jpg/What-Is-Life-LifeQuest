import React from "react";
import { useGLTF } from "@react-three/drei";

function GlowingTree() {
  const tree = useGLTF("/models/oak_tree.glb");
  return <primitive object={tree.scene} position={[-6, 0, -14]} scale={2} />;
}

function NPC({ name, position }) {
  const modelMap = {
    Rivera: "3d_character_young_boy.glb",   // Teacher NPC
    StudentHome: "student_2.glb",           // NPC in Home zone
    StudentPark: "sassy_pullover_girl.glb", // NPC in Park zone
    BattleNPC: Math.random() > 0.5
      ? "metal_gear_solid_phatom_pain_big_boss_mixamo_rig.glb"
      : "free-fire-new-female-model-by-boss_shivraj.glb" // Random boss
  };

  const model = useGLTF(`/models/${modelMap[name] || "3d_character_young_boy.glb"}`);
  return <primitive object={model.scene} position={position} scale={1.5} />;
}

export default function SceneObjects({ lockedZones, onTalk }) {
  return (
    <>
      {/* School Zone */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <NPC name="Rivera" position={[0, 0.5, 0]} />

      {/* Home Zone */}
      <mesh position={[6, 0, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color={lockedZones.includes("Home") ? "gray" : "orange"} />
      </mesh>
      {!lockedZones.includes("Home") && (
        <NPC name="StudentHome" position={[6, 0.5, 0]} />
      )}

      {/* Park Zone */}
      <mesh position={[-6, 0, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color={lockedZones.includes("Park") ? "gray" : "green"} />
      </mesh>
      {!lockedZones.includes("Park") && (
        <>
          <NPC name="StudentPark" position={[-6, 0.5, 0]} />
          <GlowingTree />
        </>
      )}

      {/* Battle Zone */}
      <mesh position={[0, 0, -8]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color={lockedZones.includes("Battle") ? "gray" : "red"} />
      </mesh>
      {!lockedZones.includes("Battle") && (
        <NPC name="BattleNPC" position={[0, 0.5, -8]} />
      )}
    </>
  );
}
