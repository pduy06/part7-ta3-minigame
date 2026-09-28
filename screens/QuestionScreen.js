/**
 * Question Screen Component
 * Manages:
 * 1. READY presentation transition (title 96-120px, subtle breathing button)
 * 2. QUESTION phase (question card 32-40px + 124px corner timer)
 * 3. DOCUMENT scan (full document display, completely static for 20s + mini question & timer)
 */

import { GamePhase } from '../state/gameStateMachine.js';
import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createCountdownElement } from '../components/shared/Countdown.js';
import { createTableRenderer } from '../components/media/TableRenderer.js';
import { createImageRenderer } from '../components/media/ImageRenderer.js';
import { createSentenceRenderer } from '../components/longsentence/SentenceRenderer.js';
import { soundManager } from '../components/shared/sound.js';

function createCornerTimer(size = 124) {
  const wrap = document.createElement('div');
  wrap.className = 'timer-corner';
  wrap.appendChild(createCountdownElement(size));
  return wrap;
}

function createDocumentElement(q) {
  if (q.media?.kind === 'image') return createImageRenderer(q.media);
  if (q.type === 'long_sentence') return createSentenceRenderer(q.longSentence, null, 0);
  return createTableRenderer(q.media, null, 0);
}

function createPrevButton(gameState) {
  if (gameState.currentQuestionIndex <= 0) return null;
  const prevBtn = document.createElement('button');
  prevBtn.className = 'btn-prev-subtle';
  prevBtn.textContent = '← Previous';
  prevBtn.addEventListener('click', () => {
    soundManager.playClick();
    gameState.prevQuestion();
  });
  return prevBtn;
}

function appendPrevButton(container, gameState) {
  const btn = createPrevButton(gameState);
  if (btn) container.appendChild(btn);
}

export function createQuestionScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container';

  const q = gameState.getCurrentQuestion();
  if (!q) return container;

  const isShown = gameState.phase === GamePhase.QUESTION_SHOWN;
  const isQuestionTimer = gameState.phase === GamePhase.QUESTION_TIMER;
  const isDocumentScan = gameState.phase === GamePhase.DOCUMENT_SHOWN;

  if (isShown) {
    // 1. READY SCREEN: Large presentation transition (96-120px)
    container.classList.add('screen-center');
    const isDemo = q.id === 'demo';
    const introLabel = isDemo ? 'DEMO' : `CÂU ${q.order}`;

    const introEl = document.createElement('div');
    introEl.className = 'ready-container';
    introEl.innerHTML = `
      <div class="ready-badge">${isDemo ? 'PHẦN THỰC HÀNH' : 'CÂU HỎI TRỌNG TÂM'}</div>
      <h2 class="ready-title">${introLabel}</h2>
    `;
    container.appendChild(introEl);

    const actionArea = document.createElement('div');
    actionArea.className = 'action-center-area';
    actionArea.innerHTML = `
      <button id="btn-ready" class="btn-ready-action">
        READY
      </button>
    `;
    actionArea.querySelector('#btn-ready').addEventListener('click', () => {
      soundManager.ensureContext();
      soundManager.playClick();
      gameState.pressReady();
    });
    container.appendChild(actionArea);

    if (gameState.currentQuestionIndex > 0) {
      appendPrevButton(container, gameState);
    }

  } else if (isQuestionTimer) {
    // 2. QUESTION: 32-40px question card + 124px corner timer
    container.classList.add('screen-center', 'question-phase-container');
    container.appendChild(createCornerTimer(124));

    const header = createQuestionHeader(q);
    container.appendChild(header);

    // Subtle next button for presenter (skip timer)
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-subtle';
    skipBtn.textContent = 'Next ➔';
    skipBtn.addEventListener('click', () => {
      soundManager.playClick();
      gameState.skipTimer();
    });
    container.appendChild(skipBtn);
    appendPrevButton(container, gameState);

  } else if (isDocumentScan) {
    // 3. DOCUMENT: Almost entire screen, completely static for 20s
    container.classList.add('document-phase-container');

    const topBar = document.createElement('div');
    topBar.className = 'doc-topbar';

    const qMini = document.createElement('div');
    qMini.className = 'doc-question-mini';
    qMini.textContent = q.question;
    topBar.appendChild(qMini);

    topBar.appendChild(createCornerTimer(124));
    container.appendChild(topBar);

    // Document Container (Card)
    const docWrapper = document.createElement('div');
    docWrapper.className = 'doc-main-wrapper';
    docWrapper.appendChild(createDocumentElement(q));
    container.appendChild(docWrapper);

    // Subtle next button (skip timer)
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-subtle';
    skipBtn.textContent = 'Next ➔';
    skipBtn.addEventListener('click', () => {
      soundManager.playClick();
      gameState.skipTimer();
    });
    container.appendChild(skipBtn);
    appendPrevButton(container, gameState);
  }

  return container;
}
