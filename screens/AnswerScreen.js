/**
 * Answer Screen Component
 * STEP 3-6: Question + 4 answers (click truc tiep, lock ngay, xanh/do).
 * Sau khi chon: hien RESULT + EXPLANATION cuc ngan (gach chan do key) + CONTINUE phia duoi.
 * Khong tu dong chuyen cau.
 */

import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createAnswerGrid } from '../components/shared/AnswerGrid.js';
import { createCountdownElement } from '../components/shared/Countdown.js';

function redKey(text) {
  return `<span class="red-key">${text}</span>`;
}

function buildExplanationHtml(q) {
  if (!q.evidence?.chain) return q.why ? `<div class="explanation-box">${q.why}</div>` : '';
  const steps = q.evidence.chain.map(s => `<div>${s.label ? s.label.replace(s.key || '___', redKey(s.key || '')) : ''}</div>`).join('');
  // Fallback neu label khong chua key: liet ke key gach do
  const keys = q.evidence.chain.map(s => redKey(s.key)).join(' → ');
  return `
    <div class="explanation-box">
      <div class="explanation-title">Evidence</div>
      <div class="explanation-steps">${steps || keys}</div>
      ${q.why ? `<div class="explanation-why">${q.why}</div>` : ''}
      ${q.distractor ? `<div class="explanation-distractor">Distractor: ${q.distractor.replace('PRICE', redKey('PRICE')).replace('UNIT PRICE', redKey('UNIT PRICE'))}</div>` : ''}
    </div>
  `;
}

export function createAnswerScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container';

  const q = gameState.getCurrentQuestion();
  if (!q) return container;

  // 0. Timer 10s chon dap an (goc phai, chi hien khi chua chon)
  if (!gameState.isAnswerLocked) {
    const corner = document.createElement('div');
    corner.className = 'timer-corner';
    corner.appendChild(createCountdownElement());
    container.appendChild(corner);
  }

  // 1. Question Prompt
  const header = createQuestionHeader(q);
  container.appendChild(header);

  // 2. Result Feedback Status Bar (neu da chon hoac het gio)
  if (gameState.isTimeout && !gameState.selectedAnswer) {
    const timeoutBar = document.createElement('div');
    timeoutBar.className = 'result-status-bar incorrect';
    timeoutBar.innerHTML = `
      <span>HẾT GIỜ — CHƯA CHỌN</span>
      <span style="font-size: 16px; font-weight: 700;">Đáp án đúng: ${q.correctAnswerId}</span>
    `;
    container.appendChild(timeoutBar);
    const expWrap0 = document.createElement('div');
    expWrap0.innerHTML = buildExplanationHtml(q);
    container.appendChild(expWrap0);
  }

  if (gameState.isResultShown && gameState.selectedAnswer) {
    const isCorrect = gameState.selectedAnswer === q.correctAnswerId;
    const statusBar = document.createElement('div');
    statusBar.className = `result-status-bar ${isCorrect ? 'correct' : 'incorrect'}`;

    if (isCorrect) {
      statusBar.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          CHÍNH XÁC
        </span>
        <span style="font-size: 16px; font-weight: 700;">Đáp án đúng: ${q.correctAnswerId}</span>
      `;
    } else {
      statusBar.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          CHƯA CHÍNH XÁC
        </span>
        <span style="font-size: 16px; font-weight: 700;">Đáp án đúng: ${q.correctAnswerId}</span>
      `;
    }
    container.appendChild(statusBar);

    // 2b. EXPLANATION cuc ngan ngay ben duoi
    const expWrap = document.createElement('div');
    expWrap.innerHTML = buildExplanationHtml(q);
    container.appendChild(expWrap);
  }

  // 3. 4 Answer Options Grid
  const grid = createAnswerGrid(
    q,
    gameState.selectedAnswer,
    gameState.isAnswerLocked,
    gameState.isResultShown,
    (answerId) => {
      gameState.selectAnswer(answerId);
    }
  );
  container.appendChild(grid);

  // 4. CONTINUE phia duoi sau khi da chon (khong tu dong chuyen)
  if (gameState.isResultShown && gameState.isAnswerLocked) {
    const row = document.createElement('div');
    row.className = 'bottom-action-row';
    row.innerHTML = `<button class="btn-continue">CONTINUE ➔</button>`;
    row.querySelector('.btn-continue').addEventListener('click', () => {
      gameState.nextQuestion();
    });
    container.appendChild(row);
  }

  return container;
}
