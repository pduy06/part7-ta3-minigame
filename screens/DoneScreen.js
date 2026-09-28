/**
 * Done Screen Component
 * Minimal completion screen without scores, rankings, or confetti.
 * Shows:
 * - Large progressively drawn ✓ animation
 * - Completion title
 * - CHƠI LẠI ↺ button
 */

import { soundManager } from '../components/shared/sound.js';

export function createDoneScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container screen-center done-screen';

  container.innerHTML = `
    <div class="done-card">
      <div class="done-checkmark-wrapper">
        <svg class="done-checkmark-svg" viewBox="0 0 64 64">
          <circle class="done-circle" cx="32" cy="32" r="28" fill="none" stroke="#16A34A" stroke-width="4"></circle>
          <polyline class="done-check" points="18 33 27 42 46 22" fill="none" stroke="#16A34A" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"></polyline>
        </svg>
      </div>

      <h1 class="done-title">
        HOÀN THÀNH BÀI TẬP
      </h1>
      <p class="done-description">
        Đã hoàn tất toàn bộ các câu hỏi Charts, Forms & Long Sentences!
      </p>

      <button id="btn-restart" class="btn-primary-large btn-done-restart">
        CHƠI LẠI ↺
      </button>
    </div>
  `;

  container.querySelector('#btn-restart').addEventListener('click', () => {
    soundManager.playClick();
    gameState.resetGame();
  });

  return container;
}
