/**
 * Sound Manager - Lightweight Web Audio API Synthesizer
 * Safe, offline, zero external audio files.
 * Target volume: 0.15 - 0.2 with smooth attack/decay.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('toeic_sound_muted') === 'true';
    this.currentSource = null;
    this.masterGain = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('toeic_sound_muted', this.isMuted ? 'true' : 'false');
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.1, startTime = 0, startGain = 0.18, endGain = 0) {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      // Smooth attack and decay to prevent clicking
      const t = ctx.currentTime + startTime;
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(startGain, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, endGain || 0.0001), t + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + duration + 0.02);
    } catch (e) {
      // Audio autoplay restrictions or context error
    }
  }

  // 1. Soft click (60ms) for START / READY / CONTINUE
  playClick() {
    this.playTone(600, 'sine', 0.06, 0, 0.12, 0.001);
  }

  // 2. Light single note (120ms) for PHASE CHANGE
  playPhaseChange() {
    this.playTone(523.25, 'sine', 0.12, 0, 0.15, 0.001); // C5
  }

  // 3. One tick (40ms) for LAST 3 SECONDS
  playTick() {
    this.playTone(880, 'triangle', 0.04, 0, 0.14, 0.001); // A5 tick
  }

  // 4. Two ascending notes (250ms) for CORRECT
  playCorrect() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.playTone(523.25, 'sine', 0.12, 0, 0.16, 0.001);    // C5
    this.playTone(659.25, 'sine', 0.16, 0.11, 0.18, 0.001); // E5
  }

  // 5. One low soft note (250ms) for INCORRECT
  playIncorrect() {
    this.playTone(220, 'sine', 0.25, 0, 0.18, 0.001); // A3
  }

  // 6. Two descending soft notes (300ms) for TIMEOUT
  playTimeout() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.playTone(392.00, 'sine', 0.14, 0, 0.16, 0.001);    // G4
    this.playTone(311.13, 'sine', 0.18, 0.13, 0.16, 0.001); // Eb4
  }

  // 7. Three ascending notes (700ms) for DONE
  playDone() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.playTone(523.25, 'sine', 0.2, 0, 0.16, 0.001);    // C5
    this.playTone(659.25, 'sine', 0.2, 0.18, 0.17, 0.001); // E5
    this.playTone(783.99, 'sine', 0.35, 0.36, 0.18, 0.001); // G5
  }
}

export const soundManager = new SoundManager();
