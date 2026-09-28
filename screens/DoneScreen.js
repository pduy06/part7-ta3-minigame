/**
 * Done Screen Component
 * Minimalist game completion screen without leaderboard or scoring.
 */

export function createDoneScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container screen-center';

  container.innerHTML = `
    <div style="max-width: 600px;">
      <h1 style="font-size: 48px; font-weight: 900; margin-bottom: 24px; color: var(--text-main); letter-spacing: -0.5px;">
        HOÀN THÀNH
      </h1>
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
