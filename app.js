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
import { soundManager } from './components/shared/sound.js';

let lastPhase = null;
let prevUnlockedKey = null;

function renderHeader(gameState) {
  const header = document.createElement('header');
  header.className = 'app-header';

  const q = gameState.getCurrentQuestion();
  let counterText = '';
  const totalReal = gameState.questions.length - 1;

  if (gameState.phase !== GamePhase.LOBBY && gameState.phase !== GamePhase.DONE) {
    counterText = q.id === 'demo' ? 'DEMO' : `CÂU ${q.order} / ${totalReal}`;
  }

  // 1. LEFT: Brand & Chip
  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-left';
  leftDiv.innerHTML = `
    <span class="brand-title">TOEIC PART 7</span>
    ${counterText ? `<span class="header-counter">${counterText}</span>` : ''}
  `;

  // 2. CENTER: 4-step progress indicator: Ask → Scan → Answer → Explain
  const centerDiv = document.createElement('div');
  centerDiv.className = 'header-center';

  let activeStep = 0;
  if (gameState.phase === GamePhase.QUESTION_TIMER) activeStep = 1;
  else if (gameState.phase === GamePhase.DOCUMENT_SHOWN) activeStep = 2;
  else if (gameState.phase === GamePhase.ANSWER_MODE && !gameState.isResultShown) activeStep = 3;
  else if (gameState.phase === GamePhase.ANSWER_MODE && gameState.isResultShown) activeStep = 4;
  else if (gameState.phase === GamePhase.EVIDENCE) activeStep = 4;

  const showSteps = gameState.phase !== GamePhase.LOBBY && gameState.phase !== GamePhase.DONE;
  if (showSteps) {
    centerDiv.innerHTML = `
      <div class="phase-indicator">
        <span class="phase-step ${activeStep === 1 ? 'active' : (activeStep > 1 ? 'completed' : '')}">Ask</span>
        <span class="phase-arrow">→</span>
        <span class="phase-step ${activeStep === 2 ? 'active' : (activeStep > 2 ? 'completed' : '')}">Scan</span>
        <span class="phase-arrow">→</span>
        <span class="phase-step ${activeStep === 3 ? 'active' : (activeStep > 3 ? 'completed' : '')}">Answer</span>
        <span class="phase-arrow">→</span>
        <span class="phase-step ${activeStep === 4 ? 'active' : ''}">Explain</span>
      </div>
    `;
  }

  // 3. RIGHT: Speaker / Audio toggle
  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-right';

  const audioBtn = document.createElement('button');
  audioBtn.className = 'btn-audio-toggle';
  audioBtn.setAttribute('title', soundManager.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh');
  audioBtn.setAttribute('aria-label', soundManager.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh');

  const updateAudioIcon = () => {
    if (soundManager.isMuted) {
      audioBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      audioBtn.classList.add('muted');
    } else {
      audioBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      audioBtn.classList.remove('muted');
    }
  };
  updateAudioIcon();

  audioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    soundManager.ensureContext();
    soundManager.toggleMute();
    updateAudioIcon();
    audioBtn.setAttribute('title', soundManager.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh');
    audioBtn.setAttribute('aria-label', soundManager.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh');
  });

  rightDiv.appendChild(audioBtn);

  header.appendChild(leftDiv);
  header.appendChild(centerDiv);
  header.appendChild(rightDiv);

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
      // Audio cue for phase transitions
      if (lastPhase !== gameState.phase) {
        if (gameState.phase === GamePhase.QUESTION_TIMER || gameState.phase === GamePhase.DOCUMENT_SHOWN) {
          soundManager.playPhaseChange();
        } else if (gameState.phase === GamePhase.DONE) {
          soundManager.playDone();
        }
        lastPhase = gameState.phase;
      }

      // Audio cue for answer reveal (10s expired or skipped -> locked + result shown)
      if (gameState.phase === GamePhase.ANSWER_MODE && !gameState.isAnswerLocked) {
        prevUnlockedKey = `${gameState.currentQuestionIndex}`;
      } else if (gameState.phase === GamePhase.ANSWER_MODE && gameState.isAnswerLocked && prevUnlockedKey === `${gameState.currentQuestionIndex}`) {
        prevUnlockedKey = null;
        const rq = gameState.getCurrentQuestion();
        if (!gameState.selectedAnswer) {
          soundManager.playTimeout();
        } else if (gameState.selectedAnswer === rq?.correctAnswerId) {
          soundManager.playCorrect();
        } else {
          soundManager.playIncorrect();
        }
      } else if (gameState.phase !== GamePhase.ANSWER_MODE) {
        prevUnlockedKey = null;
      }

      appRoot.innerHTML = '';

      // 1. Header
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
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
