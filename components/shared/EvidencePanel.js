/**
 * Evidence Panel Component
 * Displays document with interactive step highlights, concise why note, and NEXT button.
 * Ho tro ca table (table_cells highlight) va image (image_keys list tien trinh).
 */

import { createTableRenderer } from '../media/TableRenderer.js';
import { createImageRenderer } from '../media/ImageRenderer.js';
import { createSentenceRenderer } from '../longsentence/SentenceRenderer.js';
import { soundManager } from './sound.js';

function redKey(text) {
  if (!text) return '';
  return `<span class="red-key">${text}</span>`;
}

function buildChainHtml(question, currentStep) {
  const chain = question.evidence?.chain || [];
  const visible = chain.slice(0, currentStep);
  if (visible.length === 0) return '';
  const items = visible.map((s) => {
    let label = s.label || '';
    if (s.key && label.includes(s.key)) {
      label = label.split(s.key).join(redKey(s.key));
    } else if (s.key) {
      label = `${label} (${redKey(s.key)})`;
    }
    return `<div class="explanation-step-item"><span class="step-num">${s.step}</span><span>${label}</span></div>`;
  }).join('');
  return `<div class="explanation-steps evidence-chain">${items}</div>`;
}

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
  // - image kind (Q1,Q3,Q4,Q5): anh goc full + chain keys ben duoi
  // - table kind (demo,Q2): bang HTML + highlight (demo) / chain keys (Q2)
  if (question.type === 'long_sentence') {
    const sentenceEl = createSentenceRenderer(question.longSentence, question.evidence, currentStep);
    container.appendChild(sentenceEl);
  } else if (question.media?.kind === 'image') {
    const imgEl = createImageRenderer(question.media);
    // Gioi han chieu cao tren man Evidence de con cho chain + why
    imgEl.classList.add('evidence-doc');
    container.appendChild(imgEl);
  } else {
    const tableEl = createTableRenderer(question.media, question.evidence, currentStep);
    container.appendChild(tableEl);
  }

  // Chain steps (chi hien toi currentStep - tuan tu theo buoc)
  const chainHtml = buildChainHtml(question, currentStep);
  if (chainHtml) {
    const chainBox = document.createElement('div');
    chainBox.className = 'explanation-card evidence-chain-card';
    chainBox.innerHTML = `
      <div class="explanation-header">
        <span class="explanation-badge">DẪN CHỨNG TỪNG BƯỚC</span>
        ${question.skill ? `<span class="explanation-skill">${question.skill}</span>` : ''}
      </div>
      ${chainHtml}
    `;
    container.appendChild(chainBox);
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
