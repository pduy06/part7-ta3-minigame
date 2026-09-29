/**
 * Lobby Screen Component
 * Minimal, academic, high-impact start screen.
 * Initializes AudioContext on first user interaction.
 */

import { soundManager } from '../components/shared/sound.js';

export function createLobbyScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container screen-center lobby-screen';

  container.innerHTML = `
    <div class="lobby-card">
      <div class="lobby-badge">TOEIC READING PRACTICE</div>
      <h1 class="lobby-title">
        CHARTS, FORMS & LONG SENTENCES
      </h1>
      <p class="lobby-description">
        Rèn luyện kỹ năng scan dữ kiện nhanh và xác định đáp án chính xác trong Part 7
      </p>
      <button id="btn-start" class="btn-primary-large">
        BẮT ĐẦU
      </button>
    </div>
  `;

  container.querySelector('#btn-start').addEventListener('click', () => {
    soundManager.ensureContext();
    soundManager.playClick();
    gameState.startGame();
  });

  return container;
}
