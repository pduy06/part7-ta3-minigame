/**
 * Answer Grid Component
 * Renders large horizontal A/B/C/D cards (28-32px text).
 * States: default, hover (+1px elevation), press (scale 0.98), lock.
 * Reveal:
 * - Correct: green bg/border, ✓ badge icon
 * - Incorrect: red bg/border, ✕ badge icon
 * - Other unselected: faded to ~55%
 */

export function createAnswerGrid(question, selectedAnswer, isLocked, isReveal, onSelect) {
  const grid = document.createElement('div');
  grid.className = 'answers-grid';

  question.answers.forEach(ans => {
    const card = document.createElement('div');
    card.className = 'answer-card';

    const isSelected = selectedAnswer === ans.id;
    const isCorrect = question.correctAnswerId === ans.id;

    if (isSelected) card.classList.add('selected');
    if (isLocked) card.classList.add('locked');

    let badgeContent = ans.id;

    if (isReveal) {
      if (isCorrect) {
        card.classList.add('correct');
        badgeContent = `<svg class="result-mark-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else if (isSelected && !isCorrect) {
        card.classList.add('incorrect');
        badgeContent = `<svg class="result-mark-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        card.classList.add('faded');
      }
    }

    card.innerHTML = `
      <div class="answer-badge">${badgeContent}</div>
      <div class="answer-text">${ans.text}</div>
    `;

    if (!isLocked && onSelect) {
      card.addEventListener('click', () => {
        onSelect(ans.id);
      });
    }

    grid.appendChild(card);
  });

  return grid;
}
