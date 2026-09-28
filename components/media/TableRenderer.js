/**
 * Table Renderer Component
 * Renders structured TOEIC tables with progressive highlight steps.
 */

export function createTableRenderer(media, evidence = null, currentStep = 0) {
  const container = document.createElement('div');
  container.className = 'document-container';

  if (!media || !media.tableData) {
    container.innerHTML = '<div>Không có dữ liệu bảng.</div>';
    return container;
  }

  const { columns, rows, footnote } = media.tableData;

  let highlightedRow = -1;
  let highlightedCol = -1;
  const targetCells = [];
  let highlightFootnote = false;

  if (evidence && evidence.chain && currentStep > 0) {
    const active = evidence.chain.slice(0, currentStep);
    active.forEach((h, index) => {
      const isLatest = index === active.length - 1;
      if (h.row !== undefined && h.col === undefined) {
        if (h.row >= rows.length) highlightFootnote = true;
        else highlightedRow = h.row;
      }
      if (h.col !== undefined && h.row === undefined) {
        highlightedCol = h.col;
      }
      if (h.row !== undefined && h.col !== undefined) {
        if (h.row >= rows.length) {
          highlightFootnote = true;
        } else {
          targetCells.push({ row: h.row, col: h.col, isLatest });
        }
      }
    });
  }

  let tableHtml = `<table class="clean-table"><thead><tr>`;
  columns.forEach((colName, cIndex) => {
    const isColActive = highlightedCol === cIndex;
    tableHtml += `<th class="${isColActive ? 'col-active' : ''}">${colName}</th>`;
  });
  tableHtml += `</tr></thead><tbody>`;

  rows.forEach((row, rIndex) => {
    const isRowActive = highlightedRow === rIndex;
    tableHtml += `<tr class="${isRowActive ? 'row-active' : ''}">`;

    row.forEach((cellVal, cIndex) => {
      const targetMatch = targetCells.find(t => t.row === rIndex && t.col === cIndex);
      const isColActive = highlightedCol === cIndex;

      let classes = [];
      if (targetMatch) {
        classes.push(targetMatch.isLatest ? 'cell-target-current' : 'cell-target');
      } else if (isColActive) {
        classes.push('col-active');
      }

      tableHtml += `<td class="${classes.join(' ')}">${cellVal}</td>`;
    });

    tableHtml += `</tr>`;
  });

  tableHtml += `</tbody></table>`;

  if (footnote) {
    tableHtml += `
      <div class="table-footnote ${highlightFootnote ? 'footnote-target' : ''}">
        ${footnote}
      </div>
    `;
  }

  container.innerHTML = tableHtml;
  return container;
}
