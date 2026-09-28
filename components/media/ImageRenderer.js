/**
 * Image Renderer - hien thi anh goc cua de, khong dung lai bang HTML.
 * Neu thieu asset thi bao loi ro rang thay vi tu tao bang moi.
 */

export function createImageRenderer(media) {
  const container = document.createElement('div');
  container.className = 'document-image-full';

  if (!media || !media.imageUrl) {
    container.innerHTML = `
      <div class="missing-asset-box">
        <strong>THIẾU ẢNH GỐC</strong>
        <p>Chưa có file ảnh document. Vui lòng thêm file vào <code>${media?.imageUrl || 'assets/'}</code></p>
        <p>Không tự dựng lại bảng bằng HTML theo yêu cầu flow.</p>
      </div>
    `;
    return container;
  }

  const img = document.createElement('img');
  img.src = media.imageUrl;
  img.alt = 'Document gốc';
  img.className = 'document-original-img';
  img.draggable = false;

  img.onerror = () => {
    container.innerHTML = `
      <div class="missing-asset-box">
        <strong>THIẾU ẢNH GỐC</strong>
        <p>Không tải được <code>${media.imageUrl}</code></p>
        <p>Vui lòng copy ảnh đề gốc vào thư mục <code>assets/</code></p>
      </div>
    `;
  };

  container.appendChild(img);
  return container;
}
