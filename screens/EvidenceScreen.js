/**
 * Evidence Screen Component
 * Renders Document with progressive highlights and concise explanation.
 */

import { createQuestionHeader } from '../components/shared/QuestionHeader.js';
import { createEvidencePanel } from '../components/shared/EvidencePanel.js';
import { soundManager } from '../components/shared/sound.js';

export function createEvidenceScreen(gameState) {
  const container = document.createElement('div');
  container.className = 'screen-container';

  const q = gameState.getCurrentQuestion();
  if (!q) return container;

  // 1. Question Prompt
  const header = createQuestionHeader(q);
  container.appendChild(header);

  // 2. Evidence Panel with Step Highlighting and NEXT button
  const evidencePanel = createEvidencePanel(
    q,
    gameState.currentEvidenceStep,
    (step) => {
      gameState.setEvidenceStep(step);
    },
    () => {
      gameState.nextQuestion();
    }
  );
  container.appendChild(evidencePanel);

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
