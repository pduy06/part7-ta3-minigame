/**
 * Main Application Entry Point
 * Mounts the presentation mini-game and orchestrates screen rendering.
 */

import { gameState, GamePhase } from './state/gameStateMachine.js';
import { createLobbyScreen } from './screens/LobbyScreen.js';
import { createQuestionScreen } from './screens/QuestionScreen.js';
import { createAnswerScreen } from './screens/AnswerScreen.js';
import { createEvidenceScreen } from './screens/EvidenceScreen.js';
import { createDoneScreen } from './screens/DoneScreen.js';

function renderHeader(gameState) {
  const header = document.createElement('header');
  header.className = 'app-header';

  const q = gameState.getCurrentQuestion();
  let counterText = '';

  if (gameState.phase !== GamePhase.LOBBY && gameState.phase !== GamePhase.DONE) {
    const totalReal = gameState.questions.length - 1;
    counterText = q.id === 'demo' ? 'DEMO' : `CÂU ${q.order} / ${totalReal}`;
  }

  header.innerHTML = `
    <h1 class="brand-title">TOEIC READING PART 7</h1>
    ${counterText ? `<div class="header-counter">${counterText}</div>` : ''}
  `;

  return header;
}

export function initApp() {
  const appRoot = document.getElementById('app');
  if (!appRoot) {
    console.error("Target #app container not found.");
    return;
  }

  function render() {
    try {
      appRoot.innerHTML = '';

      // 1. Minimal Header
      const header = renderHeader(gameState);
      appRoot.appendChild(header);

      // 2. Active Screen
      let currentScreen = null;
      switch (gameState.phase) {
        case GamePhase.LOBBY:
          currentScreen = createLobbyScreen(gameState);
          break;
        case GamePhase.QUESTION_SHOWN:
        case GamePhase.QUESTION_TIMER:
        case GamePhase.DOCUMENT_SHOWN:
          currentScreen = createQuestionScreen(gameState);
          break;
        case GamePhase.ANSWER_MODE:
          currentScreen = createAnswerScreen(gameState);
          break;
        case GamePhase.EVIDENCE:
          currentScreen = createEvidenceScreen(gameState);
          break;
        case GamePhase.DONE:
          currentScreen = createDoneScreen(gameState);
          break;
        default:
          currentScreen = createLobbyScreen(gameState);
      }

      if (currentScreen) {
        appRoot.appendChild(currentScreen);
      }
    } catch (err) {
      console.error("Render error:", err);
      appRoot.innerHTML = `
        <div style="padding: 40px; text-align: center; color: var(--status-incorrect);">
          <h2>Đã xảy ra lỗi</h2>
          <p>${err.message}</p>
          <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 15px; cursor: pointer;">
            Tải lại trang
          </button>
        </div>
      `;
    }
  }

  // Subscribe to state machine updates
  gameState.subscribe(() => {
    render();
  });

  render();
}

// Auto boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
