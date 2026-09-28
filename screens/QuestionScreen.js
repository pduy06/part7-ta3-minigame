/**
 * Question Screen Component
 * Manages Question Prompt, READY action, 10s Question Timer, and 20s Document Scan.
 */

import { GamePhase } from '../state/gameStateMachine.js';
import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createCountdownElement } from '../components/shared/Countdown.js';
import { createTableRenderer } from '../components/media/TableRenderer.js';
import { createSentenceRenderer } from '../components/longsentence/SentenceRenderer.js';

export function createQuestionScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container';

  const q = gameState.getCurrentQuestion();
  if (!q) return container;

  const isShown = gameState.phase === GamePhase.QUESTION_SHOWN;
  const isQuestionTimer = gameState.phase === GamePhase.QUESTION_TIMER;
  const isDocumentScan = gameState.phase === GamePhase.DOCUMENT_SHOWN;

  if (isShown) {
    // 1. QUESTION ONLY + READY BUTTON
    container.classList.add('screen-center');
    const header = createQuestionHeader(q);
    container.appendChild(header);

    const actionArea = document.createElement('div');
    actionArea.className = 'action-center-area';
    actionArea.innerHTML = `
      <button id="btn-ready" class="btn-primary-large">
        READY
      </button>
    `;
    actionArea.querySelector('#btn-ready').addEventListener('click', () => {
      gameState.pressReady();
    });
    container.appendChild(actionArea);

  } else if (isQuestionTimer) {
    // 2. QUESTION + 10s COUNTDOWN
    container.classList.add('screen-center');
    const header = createQuestionHeader(q);
    container.appendChild(header);

    const countdownEl = createCountdownElement();
    container.appendChild(countdownEl);

    // Subtle skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-subtle';
    skipBtn.textContent = 'Bỏ qua ➔';
    skipBtn.addEventListener('click', () => {
      gameState.skipTimer();
    });
    container.appendChild(skipBtn);

  } else if (isDocumentScan) {
    // 3. DOCUMENT IS THE CENTRAL FOCUS + 20s COUNTDOWN
    const header = createQuestionHeader(q);
    container.appendChild(header);

    const countdownEl = createCountdownElement();
    container.appendChild(countdownEl);

    if (q.type === 'long_sentence') {
      const sentenceEl = createSentenceRenderer(q.longSentence, null, 0);
      container.appendChild(sentenceEl);
    } else {
      const tableEl = createTableRenderer(q.media, null, 0);
      container.appendChild(tableEl);
    }

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
