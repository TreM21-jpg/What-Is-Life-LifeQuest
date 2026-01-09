/**
 * KeyboardShortcuts – Game-wide keyboard navigation and accessibility
 * Features:
 * - Global hotkey bindings (Ctrl+I, Ctrl+M, etc.)
 * - Dynamic shortcut hints in UI
 * - Keyboard-only gameplay support
 * - Remappable keybinds
 * - Accessibility modes
 */

const DEFAULT_SHORTCUTS = {
  // Navigation
  INVENTORY: { keys: ["Control", "i"], description: "Open Inventory", category: "Navigation" },
  MAP: { keys: ["Control", "m"], description: "Open Map", category: "Navigation" },
  QUESTS: { keys: ["Control", "q"], description: "Open Quests", category: "Navigation" },
  LORE: { keys: ["Control", "l"], description: "Open Lore Codex", category: "Navigation" },
  ACHIEVEMENTS: { keys: ["Control", "a"], description: "Open Achievements", category: "Navigation" },
  SETTINGS: { keys: ["Control", "s"], description: "Open Settings", category: "Navigation" },
  PAUSE: { keys: ["Escape"], description: "Pause/Menu", category: "Navigation" },

  // Movement
  MOVE_FORWARD: { keys: ["w", "W"], description: "Move Forward", category: "Movement" },
  MOVE_BACKWARD: { keys: ["s", "S"], description: "Move Backward", category: "Movement" },
  MOVE_LEFT: { keys: ["a", "A"], description: "Move Left", category: "Movement" },
  MOVE_RIGHT: { keys: ["d", "D"], description: "Move Right", category: "Movement" },
  SPRINT: { keys: ["Shift"], description: "Sprint (hold)", category: "Movement" },
  JUMP: { keys: [" "], description: "Jump", category: "Movement" },

  // Combat
  ATTACK: { keys: ["LMB"], description: "Attack", category: "Combat" },
  ABILITY_1: { keys: ["1"], description: "Ability 1", category: "Combat" },
  ABILITY_2: { keys: ["2"], description: "Ability 2", category: "Combat" },
  ABILITY_3: { keys: ["3"], description: "Ability 3", category: "Combat" },
  ULTIMATE: { keys: ["r", "R"], description: "Ultimate Ability", category: "Combat" },

  // Utility
  INTERACT: { keys: ["e", "E"], description: "Interact", category: "Utility" },
  USE_ITEM: { keys: ["f", "F"], description: "Use Item", category: "Utility" },
  SKIP_DIALOGUE: { keys: ["Space"], description: "Skip Dialogue", category: "Utility" },
  SCREENSHOT: { keys: ["Print"], description: "Screenshot", category: "Utility" },
};

export class KeyboardManager {
  constructor() {
    this.shortcuts = { ...DEFAULT_SHORTCUTS };
    this.listeners = {};
    this.activeKeys = new Set();
    this.enabled = true;
    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }

  handleKeyDown(event) {
    if (!this.enabled) return;

    this.activeKeys.add(event.key);

    // Check each shortcut
    for (const [action, shortcut] of Object.entries(this.shortcuts)) {
      if (this.matchesShortcut(event, shortcut)) {
        event.preventDefault();
        this.triggerAction(action);
      }
    }
  }

  handleKeyUp(event) {
    this.activeKeys.delete(event.key);
  }

  matchesShortcut(event, shortcut) {
    const keys = shortcut.keys || [];
    if (keys.length === 0) return false;

    // Special handling for modifier combinations
    if (keys.includes("Control")) {
      if (!event.ctrlKey) return false;
      return keys.some((k) => k !== "Control" && event.key.toLowerCase() === k.toLowerCase());
    }

    if (keys.includes("Shift")) {
      if (!event.shiftKey) return false;
      return keys.some((k) => k !== "Shift" && event.key.toLowerCase() === k.toLowerCase());
    }

    if (keys.includes("Alt")) {
      if (!event.altKey) return false;
      return keys.some((k) => k !== "Alt" && event.key.toLowerCase() === k.toLowerCase());
    }

    return keys.some((k) => event.key === k || event.key.toLowerCase() === k.toLowerCase());
  }

  registerListener(action, callback) {
    this.listeners[action] = callback;
  }

  triggerAction(action) {
    if (this.listeners[action]) {
      this.listeners[action]();
    }
  }

  remapShortcut(action, newKeys) {
    if (this.shortcuts[action]) {
      this.shortcuts[action].keys = newKeys;
    }
  }

  getShortcuts() {
    return this.shortcuts;
  }

  getShortcutsByCategory(category) {
    return Object.entries(this.shortcuts)
      .filter(([, shortcut]) => shortcut.category === category)
      .map(([action, shortcut]) => ({ action, ...shortcut }));
  }

  getShortcut(action) {
    return this.shortcuts[action];
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  disableAllListeners() {
    this.listeners = {};
  }

  destroy() {
    window.removeEventListener("keydown", (e) => this.handleKeyDown(e));
    window.removeEventListener("keyup", (e) => this.handleKeyUp(e));
    this.listeners = {};
  }
}

// Global instance
export const keyboardManager = new KeyboardManager();

export default KeyboardManager;
