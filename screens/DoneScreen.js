/**
 * Done Screen Component
 * Minimalist game completion screen without leaderboard or scoring.
 */

export function createDoneScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container screen-center';

  container.innerHTML = `
    <div style="max-width: 680px; display: flex; flex-direction: column; align-items: center;">
      <div class="intro-badge">HOÀN TẤT BÀI HỌC</div>
      <h1 style="font-size: 48px; font-weight: 900; margin-bottom: 12px; color: var(--text-main); letter-spacing: -0.6px;">
        HOÀN THÀNH
      </h1>
      <p style="font-size: 19px; font-weight: 600; color: var(--text-secondary); margin-bottom: 36px; line-height: 1.4;">
        Bạn đã hoàn thành các câu hỏi Charts, Forms & Long Sentences!
      </p>
      <button id="btn-restart" class="btn-primary-large">
        CHƠI LẠI ↺
      </button>
    </div>
  `;

  container.querySelector('#btn-restart').addEventListener('click', () => {
    gameState.resetGame();
  });

  return container;
}
