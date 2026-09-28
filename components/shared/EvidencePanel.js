/**
 * Evidence Panel Component
 * Displays document with interactive step highlights, concise why note, and NEXT button.
 */

import { createTableRenderer } from '../media/TableRenderer.js';
import { createSentenceRenderer } from '../longsentence/SentenceRenderer.js';
import { soundManager } from './sound.js';

export function createEvidencePanel(question, currentStep, onStepChange, onNext) {
  const container = document.createElement('div');
  container.className = 'evidence-layout';

  // Step selector buttons
  const stepBar = document.createElement('div');
  stepBar.className = 'evidence-step-bar';

  let totalSteps = 1;
  if (question.evidence?.chain) {
    totalSteps = question.evidence.chain.length;
  }

  for (let s = 1; s <= totalSteps; s++) {
    const btn = document.createElement('button');
    btn.className = `step-btn ${s <= currentStep ? 'active' : ''}`;
    btn.textContent = `Bước ${s}`;
    btn.addEventListener('click', () => {
      soundManager.playClick();
      onStepChange(s);
    });
    stepBar.appendChild(btn);
  }
  container.appendChild(stepBar);

  // Document or Sentence Renderer
  if (question.type === 'long_sentence') {
    const sentenceEl = createSentenceRenderer(question.longSentence, question.evidence, currentStep);
    container.appendChild(sentenceEl);
  } else {
    const tableEl = createTableRenderer(question.media, question.evidence, currentStep);
    container.appendChild(tableEl);
  }

  // Why note (concise 1-line explanation)
  if (question.why) {
    const whyBox = document.createElement('div');
    whyBox.className = 'evidence-why-box';
    whyBox.innerHTML = `<strong>Giải thích:</strong> ${question.why}`;
    container.appendChild(whyBox);
  }

  // Next Question Button
  const actionRow = document.createElement('div');
  actionRow.className = 'bottom-action-row';
  actionRow.innerHTML = `
    <button id="btn-evidence-next" class="btn-continue-green">
      CONTINUE ➔
    </button>
  `;

  actionRow.querySelector('#btn-evidence-next').addEventListener('click', () => {
    soundManager.playClick();
    onNext();
  });
  container.appendChild(actionRow);

  return container;
}
