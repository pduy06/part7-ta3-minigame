/**
 * Countdown Component
 * Clean, smooth circular SVG countdown timer.
 */

import { globalTimer } from '../../state/timerEngine.js';

export function createCountdownElement() {
  const container = document.createElement('div');
  container.className = 'timer-wrapper';

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  container.innerHTML = `
    <svg class="timer-svg" viewBox="0 0 120 120">
      <circle class="timer-bg-circle" cx="60" cy="60" r="${radius}"></circle>
      <circle class="timer-progress-circle" cx="60" cy="60" r="${radius}"
        style="stroke-dasharray: ${circumference}; stroke-dashoffset: 0;"></circle>
    </svg>
    <div class="timer-number">--</div>
  `;

  const progressCircle = container.querySelector('.timer-progress-circle');
  const timerNumber = container.querySelector('.timer-number');

  const unsubscribe = globalTimer.subscribe(({ remainingSeconds, fraction, isRunning }) => {
    if (!isRunning && remainingSeconds === 0) {
      timerNumber.textContent = '0';
      progressCircle.style.strokeDashoffset = `${circumference}`;
      progressCircle.className = 'timer-progress-circle danger';
      return;
    }

    timerNumber.textContent = remainingSeconds > 0 ? remainingSeconds : '0';
    const offset = circumference * (1 - fraction);
    progressCircle.style.strokeDashoffset = `${offset}`;

    if (remainingSeconds <= 3 && remainingSeconds > 0) {
      progressCircle.className = 'timer-progress-circle danger';
    } else if (remainingSeconds <= 6) {
      progressCircle.className = 'timer-progress-circle warning';
    } else {
      progressCircle.className = 'timer-progress-circle';
    }
  });

  container._unsubscribe = unsubscribe;
  return container;
}
