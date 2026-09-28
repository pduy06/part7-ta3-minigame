/**
 * Countdown Component
 * Clean, smooth circular SVG countdown timer.
 * Sizes: 124px (Question / Document) or 84px (Answer).
 * Ring bg #E0E7FF, active ring #4F46E5, warning #D97706 on last 3s.
 */

import { globalTimer } from '../../state/timerEngine.js';
import { soundManager } from './sound.js';

export function createCountdownElement(size = 124) {
  const container = document.createElement('div');
  container.className = `timer-wrapper ${size === 84 ? 'timer-sm' : ''}`;
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;

  const viewBoxSize = 124;
  const radius = size === 84 ? 48 : 52;
  const strokeWidth = size === 84 ? 9 : 8;
  const center = viewBoxSize / 2;
  const circumference = 2 * Math.PI * radius;

  container.innerHTML = `
    <svg class="timer-svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}">
      <circle class="timer-bg-circle" cx="${center}" cy="${center}" r="${radius}" stroke-width="${strokeWidth}"></circle>
      <circle class="timer-progress-circle" cx="${center}" cy="${center}" r="${radius}" stroke-width="${strokeWidth}"
        style="stroke-dasharray: ${circumference}; stroke-dashoffset: 0;"></circle>
    </svg>
    <div class="timer-number">--</div>
  `;

  const progressCircle = container.querySelector('.timer-progress-circle');
  const timerNumber = container.querySelector('.timer-number');

  let lastRemainingSeconds = null;

  const unsubscribe = globalTimer.subscribe(({ remainingSeconds, fraction, isRunning }) => {
    if (!isRunning && remainingSeconds === 0) {
      timerNumber.textContent = '0';
      progressCircle.style.strokeDashoffset = `${circumference}`;
      progressCircle.className = 'timer-progress-circle warning';
      container.classList.remove('pulse-danger');
      return;
    }

    const currentSec = remainingSeconds > 0 ? remainingSeconds : 0;
    timerNumber.textContent = `${currentSec}`;
    const offset = circumference * (1 - fraction);
    progressCircle.style.strokeDashoffset = `${offset}`;

    // Tick audio and pulse on last 3 seconds
    if (currentSec <= 3 && currentSec > 0) {
      progressCircle.className = 'timer-progress-circle warning';
      container.classList.add('pulse-warning');
      if (lastRemainingSeconds !== currentSec) {
        soundManager.playTick();
      }
    } else {
      progressCircle.className = 'timer-progress-circle';
      container.classList.remove('pulse-warning');
    }

    lastRemainingSeconds = currentSec;
  });

  container._unsubscribe = unsubscribe;
  return container;
}
