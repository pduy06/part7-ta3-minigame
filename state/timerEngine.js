/**
 * Timer Engine
 * Absolute-timestamp based countdown timer.
 * Prevents timer drift, multiple intervals, or tab throttle inconsistencies.
 */

export class TimerEngine {
  constructor() {
    this.intervalId = null;
    this.endTime = null;
    this.totalDurationMs = 0;
    this.remainingMs = 0;
    this.isPaused = false;
    this.isRunning = false;
    this.listeners = new Set();
  }

  /**
   * Start a countdown with duration in seconds
   * @param {number} seconds 
   * @param {Function} onComplete 
   */
  start(seconds, onComplete = null) {
    this.stop(); // Clear any existing timer cleanly
    this.totalDurationMs = seconds * 1000;
    this.remainingMs = this.totalDurationMs;
    this.endTime = Date.now() + this.remainingMs;
    this.isRunning = true;
    this.isPaused = false;
    this.onCompleteCallback = onComplete;

    this._notify(seconds, 1.0);

    this.intervalId = setInterval(() => {
      if (this.isPaused) return;

      const now = Date.now();
      const diff = this.endTime - now;

      if (diff <= 0) {
        const cb = this.onCompleteCallback;
        this.stop();
        this._notify(0, 0);
        if (cb) {
          cb();
        }
      } else {
        this.remainingMs = diff;
        const remainingSeconds = Math.ceil(diff / 1000);
        const fraction = Math.max(0, Math.min(1, diff / this.totalDurationMs));
        this._notify(remainingSeconds, fraction);
      }
    }, 50); // High frequency check for smooth UI updates
  }

  /**
   * Pause the countdown
   */
  pause() {
    if (!this.isRunning || this.isPaused) return;
    this.isPaused = true;
    this.remainingMs = Math.max(0, this.endTime - Date.now());
  }

  /**
   * Resume the countdown
   */
  resume() {
    if (!this.isRunning || !this.isPaused) return;
    this.isPaused = false;
    this.endTime = Date.now() + this.remainingMs;
  }

  /**
   * Skip current countdown to 0 and trigger completion
   */
  skip() {
    if (!this.isRunning) return;
    const cb = this.onCompleteCallback;
    this.stop();
    this._notify(0, 0);
    if (cb) {
      cb();
    }
  }

  /**
   * Stop and cleanup the timer completely
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    this.isPaused = false;
    this.endTime = null;
    this.onCompleteCallback = null;
  }

  /**
   * Subscribe to timer updates
   * @param {Function} listener (remainingSeconds, fraction) => void
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  _notify(remainingSeconds, fraction) {
    for (const listener of this.listeners) {
      try {
        listener({
          remainingSeconds,
          fraction,
          isRunning: this.isRunning,
          isPaused: this.isPaused
        });
      } catch (err) {
        console.error("Timer listener error:", err);
      }
    }
  }
}

export const globalTimer = new TimerEngine();
