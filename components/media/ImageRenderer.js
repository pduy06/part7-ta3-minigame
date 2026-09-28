/**
 * Image Renderer Component
 * Displays original TOEIC document images faithfully.
 * White card, thin #E2E8F0 border, border-radius 12px, subtle shadow.
 * Preserves original proportions without zooming or movement.
 * Non-animated amber box for missing assets.
 */

export function createImageRenderer(media) {
  const container = document.createElement('div');
  container.className = 'document-image-card';

  if (!media || !media.imageUrl) {
    container.innerHTML = `
      <div class="missing-asset-warning">
        <strong>THIẾU TÀI LIỆU GỐC</strong>
        <p>Chưa có file ảnh cho câu hỏi này (<code>${media?.imageUrl || 'assets/'}</code>).</p>
      </div>
    `;
    return container;
  }

  const img = document.createElement('img');
  img.src = media.imageUrl;
  img.alt = 'TOEIC Document';
  img.className = 'document-original-img';
  img.draggable = false;

  img.onerror = () => {
    container.innerHTML = `
      <div class="missing-asset-warning">
        <strong>KHÔNG TẢI ĐƯỢC ẢNH GỐC</strong>
        <p>Không tìm thấy file: <code>${media.imageUrl}</code> trong thư mục assets.</p>
      </div>
    `;
  };

  container.appendChild(img);
  return container;
}
