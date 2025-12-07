/**
 * CharacterController3D – Professional 3D character movement and animation blending
 * Features:
 * - Smooth locomotion (idle → walk → run → jump with easing)
 * - Animation blending with crossfading
 * - Physics-based movement with acceleration/deceleration
 * - Responsive camera follow with smoothing
 * - Direction-aware animation (facing direction)
 * - Sprint toggle and stamina system
 * - Footstep sound cues
 */

import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const CharacterController3D = React.forwardRef(
  (
    {
      model = "/models/avatar-Elementary.glb",
      onAnimationChange,
      onMovement,
      soundEnabled = true,
    },
    ref
  ) => {
    // Load model and animations
    const { scene, animations } = useGLTF(model);
    const { actions } = useAnimations(animations, scene);

    // Three.js context
    const { camera } = useThree();

    // Refs for state management
    const groupRef = useRef();
    const animationStateRef = useRef("idle");
    const velocityRef = useRef(new THREE.Vector3());
    const directionRef = useRef(new THREE.Vector3(0, 0, -1)); // Facing forward
    const keysRef = useRef({});
    const isSprintingRef = useRef(false);
    const staminaRef = useRef(100);
    const lastFootstepTimeRef = useRef(0);

    // State
    const [animationState, setAnimationState] = useState("idle");
    const [stamina, setStamina] = useState(100);
    const [speed, setSpeed] = useState(0);

    // Constants
    const WALK_SPEED = 5;
    const RUN_SPEED = 10;
    const JUMP_FORCE = 15;
    const ACCELERATION = 0.8;
    const DECELERATION = 0.85;
    const ROTATION_SPEED = 0.1;
    const STAMINA_DRAIN = 0.5; // per frame while sprinting
    const STAMINA_RECOVERY = 0.3; // per frame while idle/walking
    const FOOTSTEP_INTERVAL = 300; // ms between footstep sounds
    const GRAVITY = -9.8 * 2; // Adjusted for frame rate

    // Animation configuration
    const animationMap = {
      idle: { action: "Idle", weight: 1, speed: 1 },
      walk: { action: "Walk", weight: 1, speed: 1 },
      run: { action: "Run", weight: 1, speed: 1.2 },
      jump: { action: "Jump", weight: 1, speed: 1 },
      land: { action: "Land", weight: 1, speed: 1 },
      turnLeft: { action: "TurnLeft", weight: 0.5, speed: 1 },
      turnRight: { action: "TurnRight", weight: 0.5, speed: 1 },
    };

    /**
     * Blend to next animation with smooth crossfade
     */
    const blendAnimation = (nextState, duration = 0.3) => {
      if (animationStateRef.current === nextState) return;

      const currentAction = actions[animationMap[animationStateRef.current]?.action];
      const nextAction = actions[animationMap[nextState]?.action];

      if (currentAction && nextAction) {
        currentAction.fadeOut(duration);
        nextAction.reset()
          .fadeIn(duration)
          .play();
      }

      animationStateRef.current = nextState;
      setAnimationState(nextState);

      if (onAnimationChange) {
        onAnimationChange(nextState);
      }
    };

    /**
     * Play footstep sound effect
     */
    const playFootstep = () => {
      const now = Date.now();
      if (now - lastFootstepTimeRef.current < FOOTSTEP_INTERVAL) return;
      lastFootstepTimeRef.current = now;

      if (!soundEnabled) return;

      // Use Web Audio API for footstep
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      // Footstep: low thump sound
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    /**
     * Calculate desired movement direction from keyboard input
     */
    const getMovementDirection = () => {
      let moveDir = new THREE.Vector3();

      if (keysRef.current["w"] || keysRef.current["W"]) moveDir.z -= 1;
      if (keysRef.current["s"] || keysRef.current["S"]) moveDir.z += 1;
      if (keysRef.current["a"] || keysRef.current["A"]) moveDir.x -= 1;
      if (keysRef.current["d"] || keysRef.current["D"]) moveDir.x += 1;

      // Normalize diagonal movement
      if (moveDir.length() > 0) {
        moveDir.normalize();
      }

      return moveDir;
    };

    /**
     * Update stamina and sprint state
     */
    const updateStamina = (isMoving, isSprinting) => {
      let stamina = staminaRef.current;

      if (isSprinting && isMoving) {
        stamina -= STAMINA_DRAIN;
        if (stamina < 0) {
          stamina = 0;
          isSprintingRef.current = false;
        }
      } else if (isMoving) {
        // Walking recovers slowly
        stamina += STAMINA_RECOVERY * 0.5;
      } else {
        // Idle recovers quickly
        stamina += STAMINA_RECOVERY;
      }

      stamina = Math.max(0, Math.min(100, stamina));
      staminaRef.current = stamina;
      setStamina(stamina);

      return stamina;
    };

    /**
     * Main update loop (runs per frame)
     */
    useFrame((state, delta) => {
      if (!groupRef.current) return;

      // Get input
      const moveDir = getMovementDirection();
      const isMoving = moveDir.length() > 0;

      // Handle sprint toggle (Shift key)
      if (keysRef.current["Shift"] && isMoving && staminaRef.current > 20) {
        isSprintingRef.current = true;
      } else if (!isMoving || staminaRef.current === 0) {
        isSprintingRef.current = false;
      }

      // Update stamina
      updateStamina(isMoving, isSprintingRef.current);

      // Calculate target speed
      const targetSpeed = isMoving
        ? isSprintingRef.current
          ? RUN_SPEED
          : WALK_SPEED
        : 0;

      // Smooth acceleration/deceleration
      const currentSpeed = velocityRef.current.length();
      const speedDiff = targetSpeed - currentSpeed;
      const accelerationFactor = isMoving ? ACCELERATION : DECELERATION;
      const newSpeed = currentSpeed + speedDiff * accelerationFactor * delta;

      // Update character rotation to face movement direction
      if (isMoving) {
        // Smoothly rotate character to face movement direction
        const targetAngle = Math.atan2(moveDir.x, moveDir.z);
        const currentAngle = Math.atan2(
          groupRef.current.rotation.order === "YXZ"
            ? Math.sin(groupRef.current.rotation.y)
            : groupRef.current.rotation.y,
          Math.cos(groupRef.current.rotation.y)
        );

        let angleDiff = targetAngle - currentAngle;
        // Normalize angle difference to [-π, π]
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        groupRef.current.rotation.y += angleDiff * ROTATION_SPEED;
        directionRef.current.copy(moveDir);
      }

      // Apply movement
      if (isMoving && newSpeed > 0.1) {
        const moveVec = moveDir.clone().multiplyScalar(newSpeed * delta);
        groupRef.current.position.add(moveVec);
        velocityRef.current.copy(moveDir).multiplyScalar(newSpeed);

        // Play footstep sounds
        if ((animationStateRef.current === "walk" || animationStateRef.current === "run") && soundEnabled) {
          playFootstep();
        }
      } else {
        velocityRef.current.multiplyScalar(DECELERATION);
      }

      // Animation blending based on speed
      let nextAnimation = "idle";
      if (newSpeed > RUN_SPEED * 0.8) {
        nextAnimation = "run";
      } else if (newSpeed > 0.5) {
        nextAnimation = "walk";
      } else {
        nextAnimation = "idle";
      }

      if (nextAnimation !== animationStateRef.current) {
        blendAnimation(nextAnimation, 0.2);
      }

      // Smooth camera follow (third-person)
      const cameraOffset = new THREE.Vector3(0, 2, 4);
      const targetCameraPos = groupRef.current.position.clone().add(cameraOffset);

      camera.position.lerp(targetCameraPos, 0.1);
      camera.lookAt(groupRef.current.position.clone().add(new THREE.Vector3(0, 1, 0)));

      setSpeed(Math.round(newSpeed * 10) / 10);

      // Report movement for game logic
      if (onMovement) {
        onMovement({
          position: groupRef.current.position.clone(),
          velocity: velocityRef.current.clone(),
          direction: directionRef.current.clone(),
          isMoving,
          isSprinting: isSprintingRef.current,
          animation: animationStateRef.current,
        });
      }
    });

    /**
     * Keyboard input handlers
     */
    useEffect(() => {
      const handleKeyDown = (e) => {
        keysRef.current[e.key] = true;
      };

      const handleKeyUp = (e) => {
        keysRef.current[e.key] = false;
      };

      // Handle jump
      const handleSpace = (e) => {
        if (e.code === "Space") {
          e.preventDefault();
          if (Math.abs(velocityRef.current.y) < 0.1) {
            // Only jump if grounded
            velocityRef.current.y = JUMP_FORCE;
            blendAnimation("jump", 0.1);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("keydown", handleSpace);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("keydown", handleSpace);
      };
    }, []);

    // Expose controller methods via ref
    useEffect(() => {
      if (ref) {
        ref.current = {
          position: groupRef.current?.position,
          getState: () => ({
            animation: animationStateRef.current,
            velocity: velocityRef.current.clone(),
            direction: directionRef.current.clone(),
            stamina: staminaRef.current,
            isSprinting: isSprintingRef.current,
          }),
          blendAnimation,
          setAnimation: blendAnimation,
        };
      }
    }, [ref]);

    return (
      <group ref={groupRef} position={[0, 0, 0]}>
        <primitive object={scene} scale={1.5} />
      </group>
    );
  }
);

CharacterController3D.displayName = "CharacterController3D";

export default CharacterController3D;
