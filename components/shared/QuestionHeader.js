/**
 * Question Header Component
 * Minimalist display of question prompt.
 */

export function createQuestionHeader(question) {
  const container = document.createElement('div');
  container.className = 'question-container';

  container.innerHTML = `
    <h2 class="question-title-text">${question.question}</h2>
  `;

  return container;
}
