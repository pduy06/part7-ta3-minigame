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

  // 2. Result Feedback Status Bar (if answer is clicked/locked)
  if (gameState.isResultShown && gameState.selectedAnswer) {
    const isCorrect = gameState.selectedAnswer === q.correctAnswerId;
    const statusBar = document.createElement('div');
    statusBar.className = `result-status-bar ${isCorrect ? 'correct' : 'incorrect'}`;

    if (isCorrect) {
      statusBar.innerHTML = `
        <span>✓ CORRECT</span>
        <span style="font-size: 15px; font-weight: 600;">Đáp án đúng: ${q.correctAnswerId}</span>
      `;
    } else {
      statusBar.innerHTML = `
        <span>✕ INCORRECT</span>
        <span style="font-size: 15px; font-weight: 600;">Đáp án đúng: ${q.correctAnswerId}</span>
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
