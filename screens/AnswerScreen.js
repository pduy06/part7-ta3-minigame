/**
 * Answer Screen Component
 * Renders Question prompt and 4 options (A, B, C, D).
 * Immediate lock upon selection with quick result feedback.
 */

import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createAnswerGrid } from '../components/shared/AnswerGrid.js';

export function createAnswerScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container';

  const q = gameState.getCurrentQuestion();
  if (!q) return container;

  // 1. Question Prompt
  const header = createQuestionHeader(q);
  container.appendChild(header);

  // 2. Result Feedback Status Bar (if answer is clicked/locked & reveal)
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

  return container;
}
