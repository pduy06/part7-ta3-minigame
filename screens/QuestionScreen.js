/**
 * Question Screen Component
 * Manages Question Prompt, READY action, 10s Question Timer, and 20s Document Scan.
 */

import { GamePhase } from '../state/gameStateMachine.js';
import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createCountdownElement } from '../components/shared/Countdown.js';
import { createTableRenderer } from '../components/media/TableRenderer.js';
import { createImageRenderer } from '../components/media/ImageRenderer.js';
import { createSentenceRenderer } from '../components/longsentence/SentenceRenderer.js';

function createCornerTimer() {
  const wrap = document.createElement('div');
  wrap.className = 'timer-corner';
  wrap.appendChild(createCountdownElement());
  return wrap;
}

function createDocumentEl(q) {
  if (q.media?.kind === 'image') return createImageRenderer(q.media);
  if (q.type === 'long_sentence') return createSentenceRenderer(q.longSentence, null, 0);
  return createTableRenderer(q.media, null, 0);
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
    // 1. INTRO ONLY (DEMO / CAU 1..5) + READY BUTTON - chua hien cau hoi
    container.classList.add('screen-center');
    const isDemo = q.id === 'demo';
    const introBadgeText = isDemo ? 'PHẦN THỰC HÀNH' : `CÂU HỎI TRỌNG TÂM`;
    const introLabel = isDemo ? 'DEMO' : `CÂU ${q.order}`;

    const introEl = document.createElement('div');
    introEl.className = 'intro-container';
    introEl.innerHTML = `
      <div class="intro-badge">${introBadgeText}</div>
      <h2 class="intro-title">${introLabel}</h2>
    `;
    container.appendChild(introEl);

    const actionArea = document.createElement('div');
    actionArea.className = 'action-center-area';
    actionArea.innerHTML = `
      <button id="btn-ready" class="btn-primary-large">
        READY ➔
      </button>
    `;
    actionArea.querySelector('#btn-ready').addEventListener('click', () => {
      gameState.pressReady();
    });
    container.appendChild(actionArea);

  } else if (isQuestionTimer) {
    // 2. STEP 1: QUESTION truoc, 10s goc phai, chua hien document
    container.classList.add('screen-center');
    container.appendChild(createCornerTimer());
    const header = createQuestionHeader(q);
    container.appendChild(header);

    // Subtle skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-subtle';
    skipBtn.textContent = 'Bỏ qua ➔';
    skipBtn.addEventListener('click', () => {
      gameState.skipTimer();
    });
    container.appendChild(skipBtn);

  } else if (isDocumentScan) {
    // 3. STEP 2: DOCUMENT anh goc full man hinh + cau hoi nho ben tren + 20s goc phai
    const topBar = document.createElement('div');
    topBar.className = 'doc-topbar';
    const qMini = document.createElement('div');
    qMini.className = 'doc-question-mini';
    qMini.textContent = q.question;
    topBar.appendChild(qMini);
    topBar.appendChild(createCornerTimer());
    container.appendChild(topBar);

    container.appendChild(createDocumentEl(q));

    // Subtle skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-subtle';
    skipBtn.textContent = 'Bỏ qua ➔';
    skipBtn.addEventListener('click', () => {
      gameState.skipTimer();
    });
    container.appendChild(skipBtn);
  }

  return container;
}
