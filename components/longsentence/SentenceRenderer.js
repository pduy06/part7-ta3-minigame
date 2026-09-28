/**
 * Sentence Renderer Component
 * Renders structured TOEIC long sentences with progressive syntax highlight steps.
 */

export function createSentenceRenderer(longSentenceData, evidence = null, currentStep = 0) {
  const container = document.createElement('div');
  container.className = 'document-container';

  if (!longSentenceData || !longSentenceData.segments) {
    container.innerHTML = '<div>Không có dữ liệu câu dài.</div>';
    return container;
  }

  const { segments } = longSentenceData;
  const activeIndexes = new Set();

  if (evidence && evidence.chain && currentStep > 0) {
    evidence.chain.slice(0, currentStep).forEach(item => {
      if (item.segmentIndex !== undefined) {
        activeIndexes.add(item.segmentIndex);
      }
    });
  }

  const rendered = segments.map((seg, idx) => {
    const isActive = activeIndexes.has(idx);
    let activeClass = '';

    if (isActive) {
      if (seg.role === 'subject') activeClass = 'active-subject';
      else if (seg.role === 'main_verb') activeClass = 'active-verb';
      else activeClass = 'active-segment';
    }

    return `<span class="sentence-segment ${activeClass}">${seg.text}</span>`;
  }).join(' ');

  container.innerHTML = `
    <div class="sentence-box">
      ${rendered}
    </div>
  `;

  return container;
}
