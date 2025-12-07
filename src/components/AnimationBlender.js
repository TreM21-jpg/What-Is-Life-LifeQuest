/**
 * AnimationBlender – Advanced animation state machine and blending
 * Manages smooth transitions between multiple animation states with priority and timing
 */

export class AnimationBlender {
  constructor(actions = {}) {
    this.actions = actions; // Map of { stateName: THREE.AnimationAction }
    this.currentState = null;
    this.nextState = null;
    this.blendDuration = 0.3;
    this.stateHistory = [];
    this.transitionRules = {};
    this.animationWeights = {}; // For parallel animations
    this.timeouts = [];
  }

  /**
   * Define transition rules between states
   * Example: blender.defineTransition("walk", "run", 0.2); // 0.2s blend
   */
  defineTransition(fromState, toState, duration = 0.3) {
    const key = `${fromState}->${toState}`;
    this.transitionRules[key] = duration;
  }

  /**
   * Get transition duration between two states
   */
  getTransitionDuration(from, to) {
    const key = `${from}->${to}`;
    return this.transitionRules[key] ?? this.blendDuration;
  }

  /**
   * Blend to next animation state
   */
  blendTo(nextStateName, customDuration = null) {
    if (nextStateName === this.currentState) return; // Already in this state

    const duration = customDuration ?? this.getTransitionDuration(this.currentState, nextStateName);

    // Stop previous animation
    if (this.currentState && this.actions[this.currentState]) {
      const currentAction = this.actions[this.currentState];
      currentAction.fadeOut(duration);
    }

    // Start next animation
    if (this.actions[nextStateName]) {
      const nextAction = this.actions[nextStateName];
      nextAction.reset().fadeIn(duration).play();
    }

    // Update state
    this.stateHistory.push({
      state: nextStateName,
      timestamp: Date.now(),
      duration,
    });

    this.currentState = nextStateName;

    return {
      from: this.stateHistory[this.stateHistory.length - 2]?.state,
      to: nextStateName,
      duration,
      timestamp: Date.now(),
    };
  }

  /**
   * Queue animation after current one finishes
   */
  queueAnimation(stateName, duration = null) {
    this.nextState = stateName;

    if (this.currentState && this.actions[this.currentState]) {
      const currentAction = this.actions[this.currentState];
      const remainingTime = currentAction._clip.duration - currentAction.time;

      // Schedule transition
      this.scheduleTransition(stateName, remainingTime, duration);
    }
  }

  /**
   * Schedule transition after delay
   */
  scheduleTransition(stateName, delay, duration = null) {
    const timeoutId = setTimeout(() => {
      this.blendTo(stateName, duration);
    }, delay * 1000);

    this.timeouts.push(timeoutId);
  }

  /**
   * Play animation with auto-return
   * Useful for one-shot animations like jump, attack, etc.
   */
  playOnce(stateName, returnToState = this.currentState, duration = null) {
    const transitionDuration = duration ?? this.getTransitionDuration(this.currentState, stateName);

    // Blend to one-shot animation
    this.blendTo(stateName, transitionDuration);

    // Get duration of the animation
    if (this.actions[stateName]) {
      const clipDuration = this.actions[stateName]._clip.duration;
      const returnDuration = this.getTransitionDuration(stateName, returnToState);

      // Schedule return to previous state
      this.scheduleTransition(returnToState, clipDuration, returnDuration);
    }
  }

  /**
   * Blend multiple animations simultaneously (for layered animations)
   * Example: Run + Attack = playing attack while moving
   */
  layerAnimation(baseState, layerState, layerWeight = 0.5, duration = 0.2) {
    if (this.actions[baseState]) {
      const baseAction = this.actions[baseState];
      baseAction.fadeIn(duration).play();
    }

    if (this.actions[layerState]) {
      const layerAction = this.actions[layerState];
      layerAction
        .fadeIn(duration)
        .play()
        .setLoop(THREE.LoopOnce);

      // Store weight for later adjustment
      this.animationWeights[layerState] = layerWeight;
    }

    this.currentState = baseState;
  }

  /**
   * Get current animation state
   */
  getState() {
    return {
      current: this.currentState,
      next: this.nextState,
      history: this.stateHistory.slice(-10), // Last 10 states
      isTransitioning: this.actions[this.currentState]?.paused === false,
    };
  }

  /**
   * Reset animation state
   */
  reset() {
    Object.values(this.actions).forEach((action) => {
      action.stop();
      action.reset();
    });

    this.currentState = null;
    this.nextState = null;
    this.stateHistory = [];
    this.animationWeights = {};

    // Clear scheduled transitions
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  /**
   * Stop all animations
   */
  stopAll(duration = 0.3) {
    Object.values(this.actions).forEach((action) => {
      action.fadeOut(duration);
    });
  }

  /**
   * Set animation speed multiplier
   */
  setSpeed(stateName, speed = 1) {
    if (this.actions[stateName]) {
      this.actions[stateName].timeScale = speed;
    }
  }

  /**
   * Get animation info
   */
  getAnimationInfo(stateName) {
    if (!this.actions[stateName]) return null;

    const action = this.actions[stateName];
    return {
      name: stateName,
      clip: action._clip.name,
      duration: action._clip.duration,
      currentTime: action.time,
      timeScale: action.timeScale,
      isPlaying: !action.paused,
      weight: action._weight,
    };
  }

  /**
   * Fade all animations to zero weight
   */
  fadeOutAll(duration = 0.3) {
    Object.values(this.actions).forEach((action) => {
      action.fadeOut(duration);
    });
  }

  /**
   * Get animation progress (0-1)
   */
  getProgress(stateName) {
    if (!this.actions[stateName]) return 0;
    const action = this.actions[stateName];
    return action.time / action._clip.duration;
  }

  /**
   * Jump to specific time in animation
   */
  seek(stateName, time) {
    if (this.actions[stateName]) {
      this.actions[stateName].time = time;
    }
  }
}

export default AnimationBlender;
