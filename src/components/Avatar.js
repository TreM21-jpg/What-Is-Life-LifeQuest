import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Avatar({ gender, isWalking }) {
  const { scene, animations } = useGLTF(`/models/avatar-${gender}.glb`);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (isWalking) {
      actions["Walk"]?.reset().fadeIn(0.2).play();
    } else {
      actions["Idle"]?.reset().fadeIn(0.2).play();
    }
    return () => {
      actions["Walk"]?.fadeOut(0.2);
      actions["Idle"]?.fadeOut(0.2);
    };
  }, [isWalking, actions]);

  return <primitive object={scene} />;
}
