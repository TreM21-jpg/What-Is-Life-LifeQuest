/**
 * CinematicCamera3D – Smooth, professional third-person camera system
 * Features:
 * - Dynamic third-person following with lerp smoothing
 * - Shoulder camera with offset options (left/right/center)
 * - Zoom capabilities with momentum
 * - Cinematic camera angles for boss fights and cutscenes
 * - Mouse/Touch orbit control
 * - Collision detection to prevent clipping
 * - Smooth transitions between camera modes
 */

import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CinematicCamera3D = ({
  targetRef,
  mode = "follow", // "follow", "orbit", "fixedAngle", "cinematic"
  shoulderOffset = 0, // -1 (left), 0 (center), 1 (right)
  distance = 5,
  height = 2,
  smoothness = 0.1,
  onCameraChange,
  enableMouseControl = true,
}) => {
  const { camera, scene } = useThree();

  // State
  const [cameraMode, setCameraMode] = useState(mode);
  const [cameraDistance, setCameraDistance] = useState(distance);

  // Refs
  const orbitRef = useRef({ theta: 0, phi: Math.PI / 6 }); // Orbit angles
  const zoomRef = useRef(distance);
  const zoomVelocityRef = useRef(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const targetPosRef = useRef(new THREE.Vector3());
  const idealCamPosRef = useRef(new THREE.Vector3());

  /**
   * Calculate ideal camera position based on mode and parameters
   */
  const calculateIdealCameraPosition = (targetPos) => {
    const offset = new THREE.Vector3();

    switch (cameraMode) {
      case "follow":
        // Third-person follow with shoulder offset
        offset.set(
          shoulderOffset * 1.5, // Shoulder offset
          height,
          distance
        );
        // Rotate offset based on character facing
        if (targetRef?.current?.rotation) {
          offset.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            targetRef.current.rotation.y
          );
        }
        break;

      case "orbit":
        // Orbit around target
        const radius = zoomRef.current;
        offset.x = radius * Math.sin(orbitRef.current.theta) * Math.cos(orbitRef.current.phi);
        offset.y = radius * Math.sin(orbitRef.current.phi);
        offset.z = radius * Math.cos(orbitRef.current.theta) * Math.cos(orbitRef.current.phi);
        break;

      case "fixedAngle":
        // Fixed isometric-like angle
        offset.set(distance * 0.707, height, distance * 0.707);
        break;

      case "cinematic":
        // Dynamic cinematic angle - sweeps around target
        const time = Date.now() * 0.001;
        const angle = Math.sin(time * 0.5) * Math.PI * 0.5;
        offset.set(
          Math.sin(angle) * distance,
          height + Math.sin(time * 0.3) * 0.5,
          Math.cos(angle) * distance
        );
        break;

      default:
        offset.set(0, height, distance);
    }

    return targetPos.clone().add(offset);
  };

  /**
   * Check for camera collision and adjust
   */
  const avoidCollision = (targetPos, cameraPos) => {
    raycasterRef.current.set(targetPos, cameraPos.clone().sub(targetPos).normalize());
    const intersects = raycasterRef.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const firstHit = intersects[0];
      if (firstHit.distance < cameraDistance) {
        // Pull camera forward to avoid collision
        const direction = cameraPos.clone().sub(targetPos).normalize();
        return targetPos.clone().add(direction.multiplyScalar(firstHit.distance * 0.8));
      }
    }

    return cameraPos;
  };

  /**
   * Handle mouse scroll for zoom
   */
  const handleMouseWheel = (e) => {
    if (!enableMouseControl) return;
    e.preventDefault();

    const zoomSpeed = 0.5;
    const minZoom = 2;
    const maxZoom = 15;

    zoomVelocityRef.current += (e.deltaY > 0 ? 1 : -1) * zoomSpeed;
    zoomRef.current = Math.max(minZoom, Math.min(maxZoom, zoomRef.current + zoomVelocityRef.current));

    setCameraDistance(zoomRef.current);
  };

  /**
   * Handle mouse drag for orbit
   */
  const handleMouseMove = (e) => {
    if (!enableMouseControl || cameraMode !== "orbit") return;

    if (e.buttons === 2) {
      // Right mouse button
      orbitRef.current.theta += (e.movementX * Math.PI) / 500;
      orbitRef.current.phi -= (e.movementY * Math.PI) / 500;

      // Clamp phi to prevent flipping
      orbitRef.current.phi = Math.max(0.1, Math.min(Math.PI * 0.8, orbitRef.current.phi));
    }
  };

  /**
   * Setup mouse events
   */
  useEffect(() => {
    window.addEventListener("wheel", handleMouseWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("wheel", handleMouseWheel);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enableMouseControl, cameraMode]);

  /**
   * Update camera position and rotation each frame
   */
  useFrame(() => {
    if (!targetRef?.current) return;

    // Get target position
    targetPosRef.current.copy(targetRef.current.position);
    targetPosRef.current.y += 1; // Look at center of character, not feet

    // Calculate ideal camera position
    idealCamPosRef.current = calculateIdealCameraPosition(targetPosRef.current);

    // Avoid collisions
    let finalCameraPos = avoidCollision(targetPosRef.current, idealCamPosRef.current);

    // Smooth camera movement
    camera.position.lerp(finalCameraPos, smoothness);

    // Always look at target
    camera.lookAt(targetPosRef.current);

    // Apply FOV zoom effect
    const targetFOV = 50 + (zoomRef.current - distance) * 2;
    camera.fov += (targetFOV - camera.fov) * 0.05;
    camera.updateProjectionMatrix();

    // Apply zoom momentum decay
    zoomVelocityRef.current *= 0.95;

    if (onCameraChange) {
      onCameraChange({
        position: camera.position.clone(),
        target: targetPosRef.current.clone(),
        mode: cameraMode,
        distance: zoomRef.current,
      });
    }
  });

  // Expose camera control methods
  useEffect(() => {
    window.setCameraMode = (newMode) => {
      setCameraMode(newMode);
    };

    window.setCameraDistance = (newDistance) => {
      zoomRef.current = newDistance;
      setCameraDistance(newDistance);
    };

    return () => {
      delete window.setCameraMode;
      delete window.setCameraDistance;
    };
  }, []);

  return null; // Camera is managed via useFrame hook
};

export default CinematicCamera3D;
