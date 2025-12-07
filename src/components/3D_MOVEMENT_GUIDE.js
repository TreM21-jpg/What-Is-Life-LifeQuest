/**
 * 3D Movement & Animation System Integration Guide
 * 
 * This system provides professional-grade 3D character movement and animation blending
 * designed for cinematic gameplay experiences.
 * 
 * COMPONENTS:
 * 1. CharacterController3D – Main character controller with locomotion
 * 2. CinematicCamera3D – Advanced camera system with multiple modes
 * 3. Physics3D – Collision and physics engine
 * 4. AnimationBlender – State machine for smooth animation transitions
 * 5. Game3D – Integrated scene component
 * 
 * QUICK START:
 * 
 * Basic usage in a component:
 * ```jsx
 * import Game3D from './components/Game3D';
 * 
 * export default function GamePage() {
 *   return <Game3D cameraMode="follow" soundEnabled={true} />;
 * }
 * ```
 * 
 * FEATURES:
 * ─────────────────────────────────────────────────
 * 
 * CHARACTER MOVEMENT:
 * • Smooth acceleration/deceleration
 * • Diagonal movement normalization
 * • Sprint mechanics with stamina system
 * • Footstep sound effects
 * • Animation blending based on speed
 * • Direction-aware character rotation
 * 
 * INPUT CONTROLS:
 * • W/A/S/D – Movement (normalized for diagonal)
 * • Shift – Toggle Sprint (consumes stamina)
 * • Space – Jump (when grounded)
 * • Scroll – Zoom camera
 * • Right Mouse Drag – Orbit camera (in orbit mode)
 * 
 * ANIMATION SYSTEM:
 * • Idle (0 speed)
 * • Walk (0.5-5 m/s)
 * • Run (5-10 m/s)
 * • Jump (on space key)
 * • Smooth 0.2-0.3s crossfades between states
 * • Automatic animation selection based on velocity
 * 
 * CAMERA MODES:
 * • "follow" – Third-person shoulder camera (default)
 * • "orbit" – Full 360° orbit with mouse control
 * • "fixedAngle" – Isometric-like fixed perspective
 * • "cinematic" – Dynamic sweeping angle (cutscene-like)
 * 
 * PHYSICS & COLLISION:
 * • AABB collision detection
 * • Automatic ground detection
 * • Gravity simulation
 * • Collision resolution (push out)
 * • Momentum preservation
 * • Slope handling
 * 
 * STAMINA SYSTEM:
 * • Drains at 0.5/frame while sprinting
 * • Recovers 0.3/frame while idle
 * • Recovers 0.15/frame while walking
 * • Prevents sprint when stamina < 20%
 * • Visualized in HUD
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * • Lazy animation loading (only when needed)
 * • Efficient collision culling
 * • Lerp-based smooth movement (no jitter)
 * • Optimized animation crossfading
 * • Reference-based state management
 * 
 * ─────────────────────────────────────────────────
 * 
 * ADVANCED USAGE:
 * 
 * Custom camera distance:
 * ```jsx
 * <Game3D 
 *   cameraMode="follow" 
 *   cameraDistance={7}
 * />
 * ```
 * 
 * Listen to player state changes:
 * ```jsx
 * const handlePlayerState = (state) => {
 *   console.log('Current animation:', state.animation);
 *   console.log('Velocity:', state.velocity);
 *   console.log('Stamina:', state.stamina);
 *   console.log('Position:', state.position);
 * };
 * 
 * <Game3D onPlayerStateChange={handlePlayerState} />
 * ```
 * 
 * Programmatic camera control:
 * ```jsx
 * // These are exposed globally:
 * window.setCameraMode('orbit');    // Switch to orbit mode
 * window.setCameraDistance(10);      // Change zoom
 * ```
 * 
 * Access character controller directly:
 * ```jsx
 * const characterRef = useRef();
 * 
 * <CharacterController3D ref={characterRef} />
 * 
 * // Later:
 * const state = characterRef.current.getState();
 * console.log(state.stamina, state.animation);
 * ```
 * 
 * ─────────────────────────────────────────────────
 * 
 * MODEL REQUIREMENTS:
 * 
 * Your avatar GLTF/GLB model should include animations named:
 * • "Idle" – Standing still (looping)
 * • "Walk" – Walking forward (looping)
 * • "Run" – Running/sprinting (looping)
 * • "Jump" – Jump animation (one-shot)
 * • "Land" – Landing after jump (one-shot)
 * • "TurnLeft" – Turn left (optional)
 * • "TurnRight" – Turn right (optional)
 * 
 * If animations have different names, update animationMap in CharacterController3D.js
 * 
 * ─────────────────────────────────────────────────
 * 
 * CUSTOMIZATION:
 * 
 * Modify locomotion speeds (CharacterController3D.js):
 * const WALK_SPEED = 5;        // m/s
 * const RUN_SPEED = 10;        // m/s
 * const JUMP_FORCE = 15;       // m/s
 * const ACCELERATION = 0.8;    // 0-1, higher = faster response
 * const DECELERATION = 0.85;   // 0-1, higher = faster stop
 * 
 * Modify camera behavior (CinematicCamera3D.js):
 * distance = 5              // Distance behind player
 * height = 2                // Height above player
 * smoothness = 0.1          // Camera lerp amount (0-1)
 * shoulderOffset = 0        // -1 (left), 0 (center), 1 (right)
 * 
 * Modify physics (Physics3D.js):
 * gravity = -9.8 * 2        // Downward acceleration
 * groundDrag = 0.8          // Friction on ground
 * airDrag = 0.95            // Friction in air
 * maxFallSpeed = -30        // Terminal velocity
 * 
 * ─────────────────────────────────────────────────
 * 
 * INTEGRATION WITH GAME LOGIC:
 * 
 * Store player state in game context/state:
 * ```jsx
 * const [gameState, setGameState] = useState({
 *   player: {
 *     position: new Vector3(),
 *     animation: 'idle',
 *     stamina: 100,
 *     velocity: new Vector3()
 *   }
 * });
 * 
 * <Game3D onPlayerStateChange={(state) => {
 *   setGameState(prev => ({ ...prev, player: state }));
 * }} />
 * ```
 * 
 * Trigger events based on animation:
 * ```jsx
 * useEffect(() => {
 *   if (playerState.animation === 'jump') {
 *     triggerAudioFeedback('jump');
 *   }
 * }, [playerState.animation]);
 * ```
 * 
 * ─────────────────────────────────────────────────
 * 
 * DEBUGGING:
 * 
 * Enable movement logging:
 * ```jsx
 * const handlePlayerState = (state) => {
 *   console.log(`[${state.animation.toUpperCase()}] Speed: ${state.velocity.length().toFixed(2)}m/s`);
 * };
 * ```
 * 
 * Monitor collision detection:
 * Colliders are rendered in Game3D scene as colored boxes
 * 
 * Camera debugging:
 * Position info displayed in top-left corner
 * 
 * ─────────────────────────────────────────────────
 */

// This file serves as documentation. Components are in separate files.

export const MOVEMENT_CONSTANTS = {
  WALK_SPEED: 5,
  RUN_SPEED: 10,
  JUMP_FORCE: 15,
  ACCELERATION: 0.8,
  DECELERATION: 0.85,
  ROTATION_SPEED: 0.1,
  STAMINA_DRAIN: 0.5,
  STAMINA_RECOVERY: 0.3,
  FOOTSTEP_INTERVAL: 300,
  GRAVITY: -9.8 * 2,
};

export const ANIMATION_STATES = {
  IDLE: "idle",
  WALK: "walk",
  RUN: "run",
  JUMP: "jump",
  LAND: "land",
  TURN_LEFT: "turnLeft",
  TURN_RIGHT: "turnRight",
};

export const CAMERA_MODES = {
  FOLLOW: "follow",
  ORBIT: "orbit",
  FIXED_ANGLE: "fixedAngle",
  CINEMATIC: "cinematic",
};

export const INPUT_KEYS = {
  MOVE_FORWARD: ["w", "W"],
  MOVE_BACK: ["s", "S"],
  MOVE_LEFT: ["a", "A"],
  MOVE_RIGHT: ["d", "D"],
  SPRINT: ["Shift"],
  JUMP: [" "],
  INTERACT: ["e", "E"],
  PAUSE: ["Escape"],
};

export default {
  MOVEMENT_CONSTANTS,
  ANIMATION_STATES,
  CAMERA_MODES,
  INPUT_KEYS,
};
