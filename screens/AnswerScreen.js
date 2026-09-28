/**
 * Answer Screen Component
 * Renders Question prompt and large A/B/C/D choices (28-32px text).
 * Click selects provisionally (changeable within 10s, no result yet).
 * Result + explanation reveal only when 10s expires (or Next/skip).
 * Shows:
 * - Selected green (✓) or red (✕) with shake animation
 * - Correct answer highlighted green with ✓
 * - Other unselected options fade to ~55%
 * - Separate white explanation card with 4px indigo left border
 * - Red bold underlined evidence key
 * - Large green CONTINUE button
 */

import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createAnswerGrid } from '../components/shared/AnswerGrid.js';
import { createCountdownElement } from '../components/shared/Countdown.js';
import { soundManager } from '../components/shared/sound.js';

function redKey(text) {
  if (!text) return '';
  return `<span class="red-key">${text}</span>`;
}

function buildExplanationHtml(q) {
  if (!q) return '';
  let stepsHtml = '';
  if (q.evidence?.chain) {
    stepsHtml = q.evidence.chain.map(s => {
      let label = s.label || '';
      if (s.key && label.includes(s.key)) {
        label = label.split(s.key).join(redKey(s.key));
      } else if (s.key) {
        label = `${label} (${redKey(s.key)})`;
      }
      return `<div class="explanation-step-item">${label}</div>`;
    }).join('');
  }

  return `
    <div class="explanation-card">
      <div class="explanation-header">
        <span class="explanation-badge">GIẢI THÍCH & DẪN CHỨNG</span>
        ${q.skill ? `<span class="explanation-skill">${q.skill}</span>` : ''}
      </div>
      ${stepsHtml ? `<div class="explanation-steps">${stepsHtml}</div>` : ''}
      ${q.why ? `<div class="explanation-why">${q.why}</div>` : ''}
      ${q.distractor ? `<div class="explanation-distractor"><strong>Lưu ý bẫy:</strong> ${q.distractor.replace(/PRICE|UNIT PRICE/g, match => redKey(match))}</div>` : ''}
    </div>
  `;
}

export function createAnswerScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container answer-screen-container';

  const q = gameState.getCurrentQuestion();
  if (!q) return container;

  // 0. Corner Timer (84px, only active while waiting for answer selection)
  if (!gameState.isAnswerLocked) {
    const corner = document.createElement('div');
    corner.className = 'timer-corner';
    corner.appendChild(createCountdownElement(84));
    container.appendChild(corner);
  }

  // 1. Question Prompt (Card: 32-40px)
  const header = createQuestionHeader(q);
  container.appendChild(header);

  // 2. Timeout Banner (if time expired before answer)
  if (gameState.isTimeout && !gameState.selectedAnswer) {
    const timeoutBar = document.createElement('div');
    timeoutBar.className = 'timeout-status-bar';
    timeoutBar.innerHTML = `
      <span class="status-title">HẾT GIỜ — CHƯA CHỌN ĐÁP ÁN</span>
      <span class="status-correct-hint">Đáp án đúng là: <strong>${q.correctAnswerId}</strong></span>
    `;
    container.appendChild(timeoutBar);
  }

  // 3. 4 Answer Options Grid (Cards: 28-32px)
  const grid = createAnswerGrid(
    q,
    gameState.selectedAnswer,
    gameState.isAnswerLocked,
    gameState.isResultShown,
    (answerId) => {
      soundManager.playClick();
      gameState.selectAnswer(answerId);
    }
  );
  container.appendChild(grid);

  // 4. Explanation Section (Separate White Card with Indigo left border)
  if (gameState.isResultShown) {
    const expWrapper = document.createElement('div');
    expWrapper.className = 'explanation-section-wrapper';
    expWrapper.innerHTML = buildExplanationHtml(q);
    container.appendChild(expWrapper);

    // 5. Large Green CONTINUE Button
    const actionRow = document.createElement('div');
    actionRow.className = 'continue-action-row';
    actionRow.innerHTML = `
      <button id="btn-continue" class="btn-continue-green">
        CONTINUE ➔
      </button>
    `;

    actionRow.querySelector('#btn-continue').addEventListener('click', () => {
      soundManager.playClick();
      gameState.nextQuestion();
    });

    container.appendChild(actionRow);
  }

  // Subtle presenter nav: Previous (câu trước) + Next (bỏ qua 10s chọn)
  if (!gameState.isAnswerLocked) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-skip-subtle';
    nextBtn.textContent = 'Next ➔';
    nextBtn.addEventListener('click', () => {
      soundManager.playClick();
      gameState.skipTimer();
    });
    container.appendChild(nextBtn);
  }
  if (gameState.canGoBack && gameState.canGoBack()) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn-prev-subtle';
    prevBtn.textContent = '← Previous';
    prevBtn.addEventListener('click', () => {
      soundManager.playClick();
      gameState.goBack();
    });
    container.appendChild(prevBtn);
  }

  return container;
}
