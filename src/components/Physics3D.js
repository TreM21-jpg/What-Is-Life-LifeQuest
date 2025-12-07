/**
 * Physics3D – Simple physics engine for 3D interactions
 * Features:
 * - Gravity and jumping
 * - Collision detection (AABB - Axis-Aligned Bounding Box)
 * - Ground detection and slope handling
 * - Character-object interactions
 * - Momentum and velocity calculations
 */

import * as THREE from "three";

export class Physics3D {
  constructor(options = {}) {
    this.gravity = options.gravity || -9.8 * 2;
    this.groundDrag = options.groundDrag || 0.8;
    this.airDrag = options.airDrag || 0.95;
    this.maxFallSpeed = options.maxFallSpeed || -30;

    // World objects for collision
    this.colliders = [];
    this.isGrounded = false;
  }

  /**
   * Add a collider box to the world
   */
  addCollider(position, size, rigid = true) {
    this.colliders.push({
      position: position.clone(),
      size: size.clone(),
      rigid,
      box: new THREE.Box3(
        position.clone().sub(size.clone().multiplyScalar(0.5)),
        position.clone().add(size.clone().multiplyScalar(0.5))
      ),
    });
  }

  /**
   * Check if point is inside box (AABB)
   */
  pointInBox(point, box) {
    return (
      point.x >= box.min.x &&
      point.x <= box.max.x &&
      point.y >= box.min.y &&
      point.y <= box.max.y &&
      point.z >= box.min.z &&
      point.z <= box.max.z
    );
  }

  /**
   * Get closest point on box to given point
   */
  getClosestPointOnBox(point, box) {
    const closest = point.clone();
    closest.x = Math.max(box.min.x, Math.min(closest.x, box.max.x));
    closest.y = Math.max(box.min.y, Math.min(closest.y, box.max.y));
    closest.z = Math.max(box.min.z, Math.min(closest.z, box.max.z));
    return closest;
  }

  /**
   * Check AABB collision
   */
  checkCollision(pos1, size1, pos2, size2) {
    const box1 = new THREE.Box3(
      pos1.clone().sub(size1.clone().multiplyScalar(0.5)),
      pos1.clone().add(size1.clone().multiplyScalar(0.5))
    );

    const box2 = new THREE.Box3(
      pos2.clone().sub(size2.clone().multiplyScalar(0.5)),
      pos2.clone().add(size2.clone().multiplyScalar(0.5))
    );

    return box1.intersectsBox(box2);
  }

  /**
   * Resolve collision - push character out of collider
   */
  resolveCollision(playerPos, playerSize, colliderPos, colliderSize, velocity) {
    const playerBox = new THREE.Box3(
      playerPos.clone().sub(playerSize.clone().multiplyScalar(0.5)),
      playerPos.clone().add(playerSize.clone().multiplyScalar(0.5))
    );

    const colliderBox = new THREE.Box3(
      colliderPos.clone().sub(colliderSize.clone().multiplyScalar(0.5)),
      colliderPos.clone().add(colliderSize.clone().multiplyScalar(0.5))
    );

    if (!playerBox.intersectsBox(colliderBox)) return playerPos.clone();

    // Find overlap on each axis
    const overlap = {
      x: Math.min(playerBox.max.x, colliderBox.max.x) - Math.max(playerBox.min.x, colliderBox.min.x),
      y: Math.min(playerBox.max.y, colliderBox.max.y) - Math.max(playerBox.min.y, colliderBox.min.y),
      z: Math.min(playerBox.max.z, colliderBox.max.z) - Math.max(playerBox.min.z, colliderBox.min.z),
    };

    // Push out on smallest overlap axis
    const resolvedPos = playerPos.clone();

    if (overlap.y < overlap.x && overlap.y < overlap.z) {
      // Resolve on Y (most common for ground)
      if (playerBox.max.y - colliderBox.min.y < colliderBox.max.y - playerBox.min.y) {
        resolvedPos.y -= overlap.y;
        this.isGrounded = true;
      } else {
        resolvedPos.y += overlap.y;
      }
      velocity.y = 0; // Stop vertical momentum
    } else if (overlap.x < overlap.z) {
      // Resolve on X
      if (playerBox.max.x - colliderBox.min.x < colliderBox.max.x - playerBox.min.x) {
        resolvedPos.x -= overlap.x;
      } else {
        resolvedPos.x += overlap.x;
      }
      velocity.x *= -0.2; // Bounce slightly
    } else {
      // Resolve on Z
      if (playerBox.max.z - colliderBox.min.z < colliderBox.max.z - playerBox.min.z) {
        resolvedPos.z -= overlap.z;
      } else {
        resolvedPos.z += overlap.z;
      }
      velocity.z *= -0.2; // Bounce slightly
    }

    return resolvedPos;
  }

  /**
   * Update physics for one frame
   */
  update(
    playerPos,
    playerSize,
    velocity,
    deltaTime,
    isOnGround = false,
    friction = 0.1
  ) {
    // Apply gravity
    if (!isOnGround) {
      velocity.y += this.gravity * deltaTime;
      velocity.y = Math.max(velocity.y, this.maxFallSpeed);
    }

    // Apply friction
    const frictionFactor = isOnGround ? this.groundDrag : this.airDrag;
    velocity.x *= frictionFactor;
    velocity.z *= frictionFactor;

    // Calculate new position
    const newPos = playerPos.clone().add(velocity.clone().multiplyScalar(deltaTime));

    // Check ground
    this.isGrounded = false;

    // Resolve collisions
    for (const collider of this.colliders) {
      newPos = this.resolveCollision(newPos, playerSize, collider.position, collider.size, velocity);
    }

    return { position: newPos, velocity, isGrounded: this.isGrounded };
  }

  /**
   * Raycast for ground detection
   */
  raycastGround(origin, maxDistance = 2) {
    const ray = new THREE.Ray(origin, new THREE.Vector3(0, -1, 0));

    for (const collider of this.colliders) {
      const closestPoint = this.getClosestPointOnBox(origin, collider.box);
      const dist = origin.distanceTo(closestPoint);

      if (closestPoint.y < origin.y && dist < maxDistance) {
        return {
          hit: true,
          distance: dist,
          normal: new THREE.Vector3(0, 1, 0),
          point: closestPoint,
        };
      }
    }

    return { hit: false };
  }

  /**
   * Clear all colliders
   */
  reset() {
    this.colliders = [];
    this.isGrounded = false;
  }
}

export default Physics3D;
