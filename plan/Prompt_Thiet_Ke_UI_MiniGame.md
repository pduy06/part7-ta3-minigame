# PROMPT THIẾT KẾ UI — MINI-GAME NGƯỜI 4 (TOEIC PART 7)

*Prompt này CHỈ tập trung vào phần visual design (không phải kiến trúc/logic — phần đó đã có sẵn trong file `Plan_MiniGame_Nguoi4_Charts_Forms_LongSentences.md` và `Prompt_Build_MiniGame_Nguoi4.md`). Copy toàn bộ khối code bên dưới, dán cho AI thiết kế.*

---

```
Bạn là UI/UX designer. Nhiệm vụ: thiết kế lại giao diện cho 1 web app mini-game
học TOEIC Reading Part 7, đã có sẵn logic/flow hoạt động (file HTML đính kèm).
CHỈ được chỉnh phần visual (màu, type, spacing, animation, bố cục thị giác).
TUYỆT ĐỐI KHÔNG được đổi state machine, không đổi flow, không đổi nội dung
câu hỏi/dữ liệu, không đổi cấu trúc DOM theo cách phá logic JS đang có.

====================================================================
YÊU CẦU CỐT LÕI: ĐƠN GIẢN NHẤT CÓ THỂ — NHƯNG MƯỢT VÀ SÁNG
====================================================================
"Đơn giản nhất có thể" nghĩa là:
- Càng ít thành phần trang trí càng tốt. Nếu 1 chi tiết không giúp người
  xem hiểu nội dung nhanh hơn, bỏ nó đi.
- KHÔNG dùng nhiều hơn 1 màu accent. Không gradient. Không họa tiết nền.
  Không shadow nặng. Không border-radius tùy tiện khác nhau giữa các phần.
- KHÔNG dùng nhiều hơn 1 typeface (sans-serif, dễ đọc từ xa qua máy chiếu).
- Bố cục PHẢI luôn để nội dung chính (câu hỏi, chart/form, đáp án) là trung
  tâm thị giác duy nhất tại mọi thời điểm — không có gì cạnh tranh sự chú ý.

"Mượt mà" nghĩa là:
- Mọi chuyển động (chuyển state, xuất hiện đáp án, highlight evidence)
  PHẢI có transition/animation êm (200–450ms, easing dạng ease/ease-out),
  KHÔNG giật, KHÔNG bật tắt đột ngột (trừ khi là hành động cần cảm giác
  tức thì như "khóa đáp án khi click" — chỗ đó có thể nhanh/dứt khoát).
- Animation CHỈ phục vụ mục đích truyền tải thông tin (ví dụ: evidence
  xuất hiện tuần tự từng bước, countdown đổi màu mượt) — KHÔNG thêm
  animation trang trí không có lý do sư phạm.
- Countdown timer là điểm animation quan trọng nhất: phải mượt tuyệt đối
  (dùng requestAnimationFrame, không giật khung hình), vì đây là yếu tố
  người xem nhìn liên tục trong 10 giây.

"Sáng sủa" nghĩa là:
- Nền sáng (trắng hoặc off-white gần trắng, KHÔNG dùng nền tối/dark mode
  làm mặc định).
- Độ tương phản chữ/nền đủ cao để đọc rõ từ xa qua máy chiếu (không dùng
  chữ xám nhạt trên nền trắng cho nội dung chính).
- Tổng thể phải toát ra cảm giác "công cụ học tập nghiêm túc, gọn gàng",
  KHÔNG phải "web landing page marketing" và KHÔNG phải "game arcade".

====================================================================
NGUỒN THAM KHẢO TRÊN GITHUB (chỉ tham khảo CÁCH LÀM, không copy nguyên UI)
====================================================================
Đây là các repo đã được chọn lọc phù hợp — hãy xem qua cách họ xử lý từng
phần cụ thể, không cần đọc toàn bộ repo:

1. https://github.com/vydimitrov/react-countdown-circle-timer
   → Tham khảo cách họ làm countdown dạng vòng tròn mượt, đổi màu theo
   thời gian còn lại. Đây là chuẩn tối thiểu cho phần timer.

2. https://github.com/rodrigmelo/react-image-bounding-box
   → Tham khảo cách overlay highlight trên ảnh bằng tọa độ % — dùng làm
   tham chiếu nếu sau này cần thêm evidence dạng ảnh (không bắt buộc cho
   bản hiện tại vì đang dùng bảng HTML).

3. https://github.com/muxtorovaslonbek-ops/quizlive-
   và https://github.com/ClassQuiz/classquiz
   → CHỈ tham khảo cách họ bố trí layout câu hỏi/đáp án tối giản và cách
   chuyển động giữa các màn hình quiz — KHÔNG copy màu sắc/branding của
   họ (nhiều app quiz mã nguồn mở dùng màu sắc rất "gamey", sặc sỡ — đó
   là điều CẦN TRÁNH theo yêu cầu "sáng sủa, tối giản" ở trên).

Nếu tìm thêm reference khác trên GitHub, chỉ chọn những repo có phong cách
"clean / editorial / academic", KHÔNG chọn repo có phong cách "gaming/neon/
esports" dù chúng có UI bắt mắt hơn.

====================================================================
RÀNG BUỘC KỸ THUẬT (không được vi phạm)
====================================================================
- Chỉ sửa phần CSS (và animation liên quan trong JS nếu cần), giữ nguyên
  toàn bộ HTML structure/id/class đang dùng để không làm hỏng logic JS.
- Không thêm thư viện ngoài, không load font/asset từ mạng ngoài — phải
  chạy offline 100% khi trình chiếu (dùng font hệ thống hoặc nhúng sẵn).
- Phải giữ được các trạng thái UI đã có: câu hỏi → scan (có countdown) →
  đáp án (khóa khi chọn) → evidence (highlight tuần tự theo bước) → điểm.
- Responsive tối thiểu cho màn hình 16:9 (laptop/máy chiếu), không cần tối
  ưu mobile.
- Không được phá vỡ khả năng đọc từ xa: cỡ chữ câu hỏi tối thiểu tương
  đương 28–32px trên màn hình chiếu.

====================================================================
QUY TRÌNH LÀM VIỆC BẮT BUỘC
====================================================================
1. Trước khi sửa code, đề xuất 1 bảng "design token" ngắn gọn: 1 màu nền,
   1 màu chữ chính, 1 màu accent duy nhất, 1 typeface, thang bo góc, thang
   spacing — trình bày để duyệt trước khi code.
2. Sau khi được duyệt, mới áp dụng vào file HTML hiện có.
3. Không tự ý đổi màu/accent nếu chưa được duyệt ở bước 1.

Mục tiêu cuối: một giao diện mà khi nhìn vào, người xem hiểu ngay đây là
công cụ luyện thi nghiêm túc — đẹp vì sự tối giản và mượt mà, không phải
vì nhiều chi tiết trang trí.
```

---

### Cách dùng file này

1. Đính kèm file `part7-minigame.html` đã có (bản hiện tại) cùng với prompt này khi giao cho AI thiết kế.
2. Yêu cầu AI đề xuất design token trước (bước 1 trong "Quy trình làm việc"), bạn duyệt rồi mới cho code tiếp.
3. Nếu AI thiết kế đề xuất màu/font khác — kiểm tra lại có còn giữ đúng tinh thần "sáng sủa, tối giản, mượt" hay không trước khi đồng ý.
