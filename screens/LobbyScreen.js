/**
 * Lobby Screen Component
 * Minimalist start screen with zero unnecessary paragraphs.
 */

export function createLobbyScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container screen-center';

  container.innerHTML = `
    <div style="max-width: 600px;">
      <h1 style="font-size: 40px; font-weight: 900; margin-bottom: 28px; color: var(--text-main); letter-spacing: -0.5px;">
        TOEIC READING PART 7
      </h1>
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
