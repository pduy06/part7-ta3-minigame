# PLAN MINI-GAME TOEIC READING PART 7 — BẢN RÚT GỌN (v2)

*Đây là bản thay thế hoàn toàn cho plan v1. Lý do thay: bản v1 đi theo hướng "hệ thống quiz đầy đủ chức năng" (điểm, nhóm, presenter dock, phím tắt), trong khi mục tiêu thật sự là **một mini-game trình chiếu trực quan, ít chữ, tập trung tuyệt đối vào kỹ năng đọc Part 7**. Mục 0 bên dưới liệt kê rõ những gì đã XÓA và vì sao, để bất kỳ ai (kể cả AI code) đọc plan này không vô tình khôi phục lại phần đã bỏ.*

---

## 0. THAY ĐỔI SO VỚI BẢN V1 — ĐỌC TRƯỚC KHI LÀM BẤT CỨ GÌ

### 0.1 Những gì bị XÓA HOÀN TOÀN (không phải ẩn, không phải display:none — xóa khỏi logic)

| Đã xóa | Lý do |
|---|---|
| Hệ thống điểm (score, cộng/trừ điểm, bonus trả lời sớm, Score Engine) | Đây không phải cuộc thi có thắng thua, mà là công cụ luyện kỹ năng. Điểm số kéo sự chú ý khỏi mục tiêu học. |
| Hệ thống nhóm (Group 1–6, chọn nhóm, bảng nhóm, leaderboard) | Mini-game là hoạt động chung cho cả người xem, không cần chia phe. |
| Nhãn "Người 4 / Person 4 / Speaker 4" ở bất kỳ đâu trong UI | Đây là mini-game của cả buổi thuyết trình, không gắn tên người phụ trách lên giao diện. |
| Phím tắt (Space, Enter, các phím S/P/C/R, 1–6...) | Chỉ cần click chuột. Không cần hướng dẫn "Press X to...". |
| Presenter Dock / bảng điều khiển nổi phức tạp, group control, score control | Không cần hệ thống điều khiển nhiều chức năng — chỉ cần "mở web → trình chiếu → click → chơi". |
| Màn hình "How to Play" / đoạn giải thích luật chơi dài trên web | Người thuyết trình tự giải thích bằng lời. Web chỉ hiện đúng thứ cần nhìn tại từng thời điểm (ví dụ: chỉ chữ "READY", chỉ số đếm giờ). |
| Mọi câu văn giải thích/mô tả/hướng dẫn không phục vụ trực tiếp bước hiện tại (subtitle dài, tooltip, footnote, status text kỹ thuật) | Mỗi màn hình phải được xem như 1 slide trình chiếu, không phải 1 trang web nhiều nội dung. |

**Quy tắc kiểm tra nhanh cho mọi thành phần UI:** nó có *trực tiếp* giúp người chơi đọc câu hỏi, tìm thông tin, hoặc kiểm tra đáp án không? Nếu không → xóa.

### 0.2 Những gì GIỮ LẠI (đang đúng, chỉ cần chỉnh cho khớp UI tối giản mới)

- State flow (câu hỏi → scan → đáp án → evidence → câu tiếp).
- Timer (đổi thông số — xem mục 3 và mục 8).
- Answer lock (chọn xong khóa ngay, không đổi được).
- Evidence highlight theo chuỗi suy luận (Row → Column → Data / Subject → Verb → Clause).
- Cấu trúc dữ liệu câu hỏi (data-driven, thêm câu chỉ cần thêm object).
- Responsive 16:9, chạy offline hoàn toàn.

### 0.3 Đối chiếu với tài liệu gốc của nhóm (vẫn còn hiệu lực, không đổi)

Nguyên tắc sư phạm bắt buộc — không được vi phạm dù đã rút gọn UI:

- **Question → xác định target information → Scan → Evidence → Answer** — không cho phép lối tắt "thấy từ giống câu hỏi → click".
- Với Chart/Form: đọc tiêu đề → hàng → cột → đơn vị/ghi chú, rồi mới đối chiếu dữ liệu.
- Với Long Sentence: xác định chủ ngữ + động từ chính trước, rồi mới quay lại mệnh đề phụ; chú ý từ nối (however, therefore, instead, unfortunately).
- Evidence phải luôn thể hiện **chuỗi** suy luận, không chỉ khoanh đáp án cuối.

Những nguyên tắc trên là lý do tồn tại của game — dù giao diện rút gọn tối đa, các bước Scan và Evidence **không được cắt bỏ hay rút gọn về mặt sư phạm**, chỉ được rút gọn về mặt *chữ và trang trí*.

---

## 1. MỤC TIÊU TỔNG THỂ

Một web mini-game dùng trong lúc trình chiếu, cảm giác phải là:

đơn giản · sáng · sạch · hiện đại · dễ nhìn trên máy chiếu · ít chữ · ít thành phần · thao tác trực quan (chỉ click) · animation vừa đủ, chỉ phục vụ truyền tải thông tin.

Đây **không phải** hệ thống quản lý cuộc thi, không leaderboard, không phải ứng dụng quiz nhiều chức năng. Mục tiêu duy nhất: giúp người xem **thực hành đúng kỹ năng đọc Part 7** qua 1 flow trực quan.

---

## 2. NGUYÊN TẮC NỘI DUNG — ÍT CHỮ

Mỗi màn hình là **1 slide trình chiếu**, không phải 1 trang web.

Ưu tiên: `visual → question → document → answer`
Không ưu tiên: `paragraph → instruction → description → explanation → button → metadata`

Quy tắc: nếu 1 đoạn text không cần thiết để người chơi thực hiện bước hiện tại → xóa. Ví dụ những gì đủ để hiện trên màn hình:

```
READY
10
20
A · B · C · D
✓ CORRECT
✕ INCORRECT
```

Không tự thêm subtitle dài, mô tả chức năng, hướng dẫn sử dụng.

---

## 3. FLOW CHÍNH (đã cập nhật — khác v1)

```
QUESTION            (hiện câu hỏi, chưa chạy timer)
   ↓  click READY
10s QUESTION TIMER  (đếm giờ đọc câu hỏi — hiển thị, không im lặng như v1)
   ↓ auto
DOCUMENT            (chart/form/câu dài xuất hiện)
   ↓ auto
20s SCAN TIMER      (đếm giờ đọc/scan document)
   ↓ auto
DOCUMENT HIDDEN     (ẩn document)
   ↓ auto
ANSWER  A / B / C / D
   ↓ click 1 đáp án
ANSWER LOCK
   ↓ auto
RESULT              (✓ CORRECT / ✕ INCORRECT — chỉ 1 dòng)
   ↓ auto hoặc click
EVIDENCE            (document hiện lại + highlight, giải thích cực ngắn: Why / Evidence / Answer)
   ↓ click NEXT
QUESTION tiếp theo
   ...
DONE                (màn hình kết thúc tối giản, không leaderboard, không tổng điểm)
```

**Khác biệt quan trọng so với v1:**
- Không còn delay 5 giây "im lặng" trước khi document xuất hiện → thay bằng **10 giây đếm công khai** để đọc câu hỏi, do người chơi tự bấm **READY** để bắt đầu (không tự động chạy ngay khi vào màn hình câu hỏi).
- Thời gian scan document tăng từ 10s (v1) lên **20 giây**.
- Không có bước "Presenter bấm Reveal Evidence" riêng — Result → Evidence có thể tự động nối tiếp (đơn giản hóa thao tác, đúng nguyên tắc "ít thao tác").
- Không có bảng điểm ở cuối, chỉ có màn hình `DONE`.

---

## 4. SCREEN-BY-SCREEN (tối giản hóa)

### 4.1 Question Screen
Chỉ có: số thứ tự câu hỏi (nhỏ, góc trên) + câu hỏi (to nhất, giữa màn hình) + nút **READY**.
Không có: mô tả luật, điểm, nhóm, tên người phụ trách, thanh trạng thái phức tạp.

### 4.2 READY → Question Timer (10s)
Trước khi bấm: chỉ hiện chữ `READY` (dạng nút bấm lớn, rõ, là điểm nhấn duy nhất trên màn hình ngoài câu hỏi).
Sau khi bấm: `READY` biến mất, countdown 10 giây xuất hiện — to, dễ nhìn, animation mượt, không chiếm quá nhiều diện tích, không hiệu ứng rườm rà (không làm giao diện thành "game arcade").

### 4.3 Document Scan (20s)
Document (chart/table/form/câu dài) là **trung tâm duy nhất** của màn hình. Không sidebar, không hướng dẫn, không thông tin kỹ thuật xung quanh. Countdown 20 giây đặt ở vị trí cố định, không cạnh tranh sự chú ý với document.

### 4.4 Document Hidden → Answer
Document biến mất hoàn toàn. Màn hình chỉ còn: câu hỏi (rút gọn, phía trên) + 4 đáp án A/B/C/D — lớn, dễ click, khoảng cách rõ, đọc được từ xa.
Click 1 đáp án → khóa ngay lập tức, không cho đổi.

### 4.5 Result
Chỉ 1 dòng trạng thái: `✓ CORRECT` hoặc `✕ INCORRECT`. Không màn hình "chúc mừng" to, không hiệu ứng ăn mừng. Nếu sai, đáp án đúng phải được chỉ rõ ngay khi chuyển sang Evidence.

### 4.6 Evidence
Document hiện lại, highlight đúng chuỗi suy luận (Row→Column→Data hoặc Subject→Verb→Clause), xuất hiện tuần tự theo bước — đây là phần duy nhất được phép có nhiều hơn 1 dòng chữ, nhưng vẫn phải cực ngắn:

```
Why?
Evidence: [phần được highlight]
Answer: [đáp án đúng]
```

Không viết thành đoạn văn dài — người thuyết trình giải thích thêm bằng lời.

### 4.7 Next
Chỉ 1 nút `NEXT`. Không "Confirm", không "Score saved", không "Continue as Group...".

### 4.8 Done
Màn hình kết thúc cực tối giản — chỉ 1 dòng kiểu `DONE`, không leaderboard, không tổng điểm, không bảng nhóm.

---

## 5. CẤU TRÚC CÂU HỎI (data-driven, đã bỏ field điểm/nhóm)

```jsonc
{
  "id": "demo" | "q1" | "q2" | "q3" | "q4" | "q5",
  "order": number,
  "type": "form" | "chart" | "long_sentence",
  "question": "Câu hỏi ngắn gọn",
  "media": {
    "kind": "table" | "image",
    "tableData": { "columns": string[], "rows": string[][] } | null,
    "imageUrl": string | null,
    "imageAspectRatio": number | null
  },
  "answers": [ { "id": "A"|"B"|"C"|"D", "text": string } ... 4 phần tử ],
  "correctAnswerId": string,
  "timing": {
    "questionTimerSeconds": 10,
    "scanTimerSeconds": 20
  },
  "evidence": {
    "mode": "table_cells" | "coordinates",
    "chain": [ { "step": number, "row": number, "col": number, "label": string } ]
  },
  "why": "1 câu cực ngắn giải thích vì sao đáp án đúng — không phải đoạn văn.",
  "longSentence": {
    "text": string,
    "segments": [ { "text": string, "role": "subject"|"main_verb"|"modifier_phrase"|"subordinate_clause"|"object_clause" } ]
  }
}
```

**Đã bỏ khỏi schema v1:** `scored`, `bonusForEarlyAnswer`, mọi field liên quan điểm/nhóm, `title` hiển thị tên phụ trách, `explanation` dài 3-4 field (rút còn 1 field `why` cực ngắn — chi tiết 3 lớp "target info / where to find / why correct" vẫn tồn tại **trong đầu người thuyết trình**, không hiển thị hết trên màn hình).

---

## 6. STATE MACHINE (đã cập nhật)

```
QUESTION_SHOWN
  ↓ click READY
QUESTION_TIMER (10s, auto)
  ↓ auto hết giờ
DOCUMENT_SHOWN
  ↓ auto
SCAN_TIMER (20s, auto)
  ↓ auto hết giờ
DOCUMENT_HIDDEN → ANSWER_MODE
  ↓ click 1 đáp án
ANSWER_LOCKED
  ↓ auto (delay ngắn ~600ms để người xem kịp thấy đáp án đã chọn)
RESULT
  ↓ auto (delay ngắn) hoặc click bất kỳ
EVIDENCE
  ↓ click NEXT
QUESTION_SHOWN (câu kế)  hoặc  DONE (nếu hết câu)
```

**Lưu ý bắt buộc:** không thêm state cho group/score. Không thêm state cho "Presenter Dock mode". Chỉ có 1 luồng tuyến tính duy nhất, không rẽ nhánh theo vai trò người dùng.

**Điều khiển tối thiểu cần giữ (không phải Presenter Dock, chỉ 1-2 nút ẩn nhỏ, không nổi bật):**
- Nút `READY` (là một phần của flow, không phải control ẩn).
- Nút `NEXT` (là một phần của flow).
- 1 nút "Skip timer" rất nhỏ, khiêm tốn (phòng sự cố kỹ thuật), không thiết kế thành thanh điều khiển riêng.

---

## 7. EVIDENCE SYSTEM (giữ nguyên nguyên tắc kỹ thuật từ v1)

- Ưu tiên tối đa `media.kind = "table"`: dựng bằng HTML table thật, highlight bằng class trên đúng ô theo row/col — an toàn tuyệt đối khi resize/chiếu.
- Chỉ dùng `media.kind = "image"` (tọa độ % + object-fit: contain) khi bắt buộc phải giữ ảnh gốc.
- Highlight luôn xuất hiện **tuần tự theo bước**, không hiện hết cùng lúc.
- Với Long Sentence: tô màu/gạch chân theo `role`, đúng thứ tự Subject → Main Verb → mệnh đề phụ.

---

## 8. TIMER SYSTEM (thông số mới: 10s + 20s)

- **Question Timer:** 10 giây, bắt đầu SAU khi người dùng click `READY` (không tự chạy). Hiển thị to, rõ, animation mượt (circular hoặc dạng số lớn có progress ring mảnh) — không chiếm quá nhiều diện tích màn hình, không hiệu ứng kiểu game đấu trường.
- **Scan Timer:** 20 giây, tự động bắt đầu ngay khi document xuất hiện.
- Cả 2 timer đều tính theo **timestamp tuyệt đối** (không dùng setInterval cộng dồn), để không lệch giờ khi trình chiếu trực tiếp.
- Không âm thanh đếm giờ (giữ tối giản tuyệt đối — không thêm trừ khi được yêu cầu).

---

## 9. VISUAL DESIGN (đúng theo file thiết kế UI đã thống nhất trước đó)

Đây là **nguồn tham khảo trực tiếp** cho phần visual — không tự thiết kế lại từ đầu, chỉ áp dụng và rút gọn thêm:

- Nền sáng (trắng/off-white), không dark mode mặc định.
- 1 màu accent duy nhất, không gradient, không shadow nặng.
- 1 typeface sans-serif duy nhất, rõ, đọc được từ xa qua máy chiếu.
- Không quá nhiều card, không quá nhiều border, không giống landing page marketing.
- Không phong cách gaming/neon/esports.
- Nội dung chính (câu hỏi/document/đáp án) luôn là **trung tâm thị giác duy nhất**.
- Animation chỉ dùng khi có mục đích truyền tải thông tin (countdown, evidence xuất hiện theo bước) — không animation trang trí.

---

## 10. QUY TRÌNH SỬA (audit trước, thiết kế sau)

**Không thiết kế lại UI ngay.** Thứ tự bắt buộc:

1. **Đọc lại toàn bộ:** plan này, code hiện tại, component hiện tại, CSS hiện tại.
2. **Audit:** rà soát code tìm và liệt kê mọi chỗ còn chứa các từ khóa đã bị loại bỏ (xem checklist mục 11).
3. **Sửa kiến trúc logic trước:** xóa hẳn Score Engine, Group system, Presenter Dock phức tạp, keyboard shortcut handler khỏi code — không chỉ ẩn bằng CSS (`display:none`) rồi giữ nguyên logic phía sau.
4. **Sửa flow** cho đúng mục 3 (thêm state READY, đổi timer 10s/20s, bỏ nhánh Group/Score).
5. **Sau cùng mới chỉnh UI** theo mục 9.

---

## 11. CHECKLIST KIỂM TRA CUỐI CÙNG (grep toàn bộ project)

Sau khi sửa, tìm trong toàn bộ code — KHÔNG được còn xuất hiện (nếu chỉ phục vụ chức năng đã xóa):

```
group
score
leaderboard
confirm score
presenter (dock/panel phức tạp)
shortcut / keyboard shortcut
Người 4 / Person 4 / Speaker 4
```

Kiểm tra flow thực tế đúng thứ tự:

```
QUESTION → READY → 10s → DOCUMENT → 20s → HIDDEN → ANSWER → LOCK → RESULT → EVIDENCE → NEXT → ... → DONE
```

Không có bước thừa, không có bước thiếu.

---

## 12. CẤU TRÚC CÂU HỎI TOÀN BÀI

Giữ nguyên cấu trúc: **Demo (tutorial, không tính điểm vì không còn hệ thống điểm) → Q1 → Q2 → Q3 → Q4 → Q5 → DONE.**

Demo dùng đúng dữ liệu "Group Project Incident Report" đã có ở bản v1 (nội dung câu hỏi/đáp án/evidence giữ nguyên, chỉ bỏ field điểm khỏi data).

---

## 13. NGUYÊN TẮC THIẾT KẾ CUỐI CÙNG — THỨ TỰ ƯU TIÊN

1. Dễ nhìn
2. Dễ hiểu
3. Ít chữ
4. Ít thao tác
5. Animation mượt
6. Đẹp

**Không hy sinh sự đơn giản để thêm tính năng.** Đây là mini-game dùng trong thuyết trình, không phải nền tảng quiz.

---

## 14. ĐIỂM CẦN XÁC NHẬN TRƯỚC KHI SỬA CODE

1. Bạn có tài liệu/code hiện tại (bản Antigravity đã làm) để mình đọc và audit cụ thể theo checklist mục 11 không, hay bắt đầu lại từ file `part7-minigame.html` đã build trước đó trong hội thoại này?
2. Result → Evidence: bạn muốn **tự động nối tiếp** (đúng tinh thần "ít thao tác" ở mục 3) hay vẫn giữ 1 click để chuyển, để người thuyết trình kiểm soát nhịp nói?
3. Nút "Skip timer" nhỏ — có cần thiết giữ lại không, hay bỏ luôn để tối giản tuyệt đối (chấp nhận rủi ro nếu timer chạy sai)?
