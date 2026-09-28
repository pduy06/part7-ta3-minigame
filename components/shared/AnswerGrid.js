/**
 * Answer Grid Component
 * Renders 4 multiple-choice options (A, B, C, D) with immediate lock.
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

    if (isReveal) {
      if (isCorrect) {
        card.classList.add('correct');
      } else if (isSelected && !isCorrect) {
        card.classList.add('incorrect');
      }
    }

    card.innerHTML = `
      <div class="answer-badge">${ans.id}</div>
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
