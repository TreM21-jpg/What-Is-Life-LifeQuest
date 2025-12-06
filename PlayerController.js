import React, { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";

export default function PlayerController({ children, onZoneEnter, onBossDefeat, onPlayerDefeat }) {
  const controls = useKeyboardControls();

  // 🎮 Combat States
  const [playerHealth, setPlayerHealth] = useState(100);
  const [bossHealth, setBossHealth] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [inBattle, setInBattle] = useState(false);
  const [cooldowns, setCooldowns] = useState({ skill1: false, skill2: false });

  // 🧩 Basic Attack
  const attackBoss = () => {
    if (inBattle && bossHealth > 0) {
      setBossHealth((prev) => Math.max(prev - 10, 0));
      // Boss counterattacks randomly
      if (Math.random() > 0.7) {
        setPlayerHealth((prev) => Math.max(prev - 15, 0));
      }
    }
  };

  // 🧩 Skill Attack
  const useSkill = (skill) => {
    if (inBattle && !cooldowns[skill] && energy >= 20) {
      setBossHealth((prev) => Math.max(prev - 30, 0));
      setEnergy((prev) => Math.max(prev - 20, 0));
      setCooldowns((prev) => ({ ...prev, [skill]: true }));
      setTimeout(() => {
        setCooldowns((prev) => ({ ...prev, [skill]: false }));
      }, 3000);
      // Boss counterattack chance
      if (Math.random() > 0.5) {
        setPlayerHealth((prev) => Math.max(prev - 20, 0));
      }
    }
  };

  // 🧩 Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") attackBoss();
      if (event.key === "1") useSkill("skill1");
      if (event.key === "2") useSkill("skill2");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inBattle, bossHealth, energy, cooldowns]);

  // 🎵 Automatic Boss Defeat Trigger
  useEffect(() => {
    if (bossHealth === 0 && inBattle) {
      onBossDefeat();
      setInBattle(false);
    }
  }, [bossHealth, inBattle, onBossDefeat]);

  // 🎵 Player Defeat Trigger
  useEffect(() => {
    if (playerHealth === 0 && inBattle) {
      if (onPlayerDefeat) {
        onPlayerDefeat();
      }
      setInBattle(false);
    }
  }, [playerHealth, inBattle, onPlayerDefeat]);

  // ⚡ Energy Regen
  useEffect(() => {
    const regen = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, 100));
    }, 500);
    return () => clearInterval(regen);
  }, []);

  // 🧩 Zone Entry Logic
  const checkZoneEntry = (position) => {
    if (position.z < -7) {
      onZoneEnter("Battle");
      setInBattle(true);
      setBossHealth(100);
      setPlayerHealth(100);
      setEnergy(100);
    } else {
      setInBattle(false);
    }
  };

  return (
    <>
      {/* Combat UI */}
      {inBattle && (
        <>
          {/* Boss Health Bar */}
          <div style={{
            position: "absolute", top: "20px", left: "50%",
            transform: "translateX(-50%)", width: "300px", height: "20px",
            background: "#333", border: "2px solid red", borderRadius: "5px", zIndex: 20
          }}>
            <div style={{
              width: `${bossHealth}%`, height: "100%", background: "red", transition: "width 0.3s"
            }} />
          </div>

          {/* Player Health Bar */}
          <div style={{
            position: "absolute", bottom: "80px", left: "20px",
            width: "200px", height: "20px", background: "#333",
            border: "2px solid green", borderRadius: "5px", zIndex: 20
          }}>
            <div style={{
              width: `${playerHealth}%`, height: "100%", background: "green", transition: "width 0.3s"
            }} />
          </div>

          {/* Energy Bar */}
          <div style={{
            position: "absolute", bottom: "50px", left: "20px",
            width: "200px", height: "20px", background: "#333",
            border: "2px solid blue", borderRadius: "5px", zIndex: 20
          }}>
            <div style={{
              width: `${energy}%`, height: "100%", background: "blue", transition: "width 0.3s"
            }} />
          </div>

          {/* Mobile Attack & Skill Buttons */}
          <div style={{
            position: "absolute", bottom: "20px", right: "20px",
            display: "flex", gap: "10px", zIndex: 30
          }}>
            <button onClick={attackBoss} style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "red", color: "#fff", fontWeight: "bold"
            }}>⚔</button>
            <button onClick={() => useSkill("skill1")} disabled={cooldowns.skill1} style={{
              width: "50px", height: "50px", borderRadius: "50%",
              background: cooldowns.skill1 ? "gray" : "purple", color: "#fff"
            }}>1</button>
            <button onClick={() => useSkill("skill2")} disabled={cooldowns.skill2} style={{
              width: "50px", height: "50px", borderRadius: "50%",
              background: cooldowns.skill2 ? "gray" : "orange", color: "#fff"
            }}>2</button>
          </div>
        </>
      )}

      {/* Children with zone checking */}
      <group>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onUpdate: (pos) => checkZoneEntry(pos)
          })
        )}
      </group>
    </>
  );
}
