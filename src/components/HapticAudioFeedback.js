/**
 * Haptic & Audio Feedback System for LifeQuest
 * Provides tactile and sound cues for key game moments on mobile/desktop
 */

/**
 * Trigger haptic feedback (mobile vibration)
 * @param {string} pattern - 'light', 'medium', 'heavy', 'success', 'warning', 'error'
 */
export function triggerHaptic(pattern = "medium") {
  if (!navigator.vibrate) return; // Not supported

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [40],
    success: [20, 10, 20], // short-pause-short
    warning: [30, 20, 30], // medium-pause-medium
    error: [50, 20, 50, 20, 50], // long-pause-long-pause-long
    levelup: [30, 10, 30, 10, 50], // celebration pattern
    questcomplete: [40, 15, 40, 15, 40, 15, 60], // triple pulse
    victory: [50, 20, 50], // bold victory pattern
    defeat: [100, 30, 50], // sad pattern
  };

  const vibrationPattern = patterns[pattern] || patterns.medium;
  navigator.vibrate(vibrationPattern);
}

/**
 * Play sound effect
 * @param {string} effect - 'levelup', 'questcomplete', 'victory', 'defeat', 'notification', 'button'
 * @param {number} volume - 0 to 1 (default 0.5)
 */
export function playSoundEffect(effect = "notification", volume = 0.5) {
  // Using Web Audio API for flexible sound generation
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;

  const soundConfigs = {
    levelup: () => {
      // Ascending arpeggio pattern
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.5);
    },

    questcomplete: () => {
      // Triumphant chord
      const frequencies = [392, 494, 587]; // G4, B4, D5
      frequencies.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        gain.gain.setValueAtTime(volume / frequencies.length, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.start(now);
        osc.stop(now + 0.8);
      });
    },

    victory: () => {
      // Celebratory fanfare
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1);

      osc.type = "sine";
      osc.frequency.setValueAtTime(523, now); // C5
      osc.frequency.exponentialRampToValueAtTime(784, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(1047, now + 0.6);
      osc.start(now);
      osc.stop(now + 1);
    },

    defeat: () => {
      // Descending sad tone
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.6); // Drop to A3
      osc.start(now);
      osc.stop(now + 0.6);
    },

    notification: () => {
      // Simple beep
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.start(now);
      osc.stop(now + 0.2);
    },

    button: () => {
      // Click sound
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.start(now);
      osc.stop(now + 0.1);
    },
  };

  if (soundConfigs[effect]) {
    soundConfigs[effect]();
  }
}

/**
 * Combined feedback (haptic + sound)
 */
export function triggerFeedback(moment = "questcomplete") {
  const feedbackMap = {
    levelup: { haptic: "levelup", sound: "levelup" },
    questcomplete: { haptic: "questcomplete", sound: "questcomplete" },
    victory: { haptic: "victory", sound: "victory" },
    defeat: { haptic: "defeat", sound: "defeat" },
    achievement: { haptic: "success", sound: "questcomplete" },
    button: { haptic: "light", sound: "button" },
  };

  const feedback = feedbackMap[moment];
  if (feedback) {
    triggerHaptic(feedback.haptic);
    playSoundEffect(feedback.sound, 0.4);
  }
}
