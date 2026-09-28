/**
 * Lobby Screen Component
 * Clean, high-impact start screen with clear presentation branding.
 */

export function createLobbyScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container screen-center';

  container.innerHTML = `
    <div style="max-width: 720px; display: flex; flex-direction: column; align-items: center;">
      <div class="intro-badge">TOEIC READING PRACTICE</div>
      <h1 style="font-size: 46px; font-weight: 900; margin-bottom: 14px; color: var(--text-main); letter-spacing: -0.6px; line-height: 1.2;">
        CHARTS, FORMS & LONG SENTENCES
      </h1>
      <p style="font-size: 19px; font-weight: 600; color: var(--text-secondary); margin-bottom: 36px; line-height: 1.4;">
        Rèn luyện kỹ năng scan dữ kiện & phân tích cấu trúc câu Part 7
      </p>
      <button id="btn-start" class="btn-primary-large">
        BẮT ĐẦU ➔
      </button>
    </div>
  `;

  container.querySelector('#btn-start').addEventListener('click', () => {
    gameState.startGame();
  });

  return container;
}
