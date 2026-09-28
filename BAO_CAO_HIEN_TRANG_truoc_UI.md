# BÁO CÁO HIỆN TRẠNG — TRƯỚC KHI LÀM UI (TOEIC PART 7 MINI-GAME)

Ngày: 28/09/2026 · Commit: `65cd10d` · Test: **52/52 PASS** (`node test_engine.js`)
Web live: https://pduy06.github.io/part7-ta3-minigame/ · Repo: https://github.com/pduy06/part7-ta3-minigame

> File này đóng gói toàn bộ hiện trạng nội dung + logic để bàn giao cho bước UI.
> Quy tắc: UI chỉ được sửa visual, KHÔNG đổi wording hỏi/đáp, đáp án, flow, timing.

---

## 1. CẤU TRÚC PROJECT

```
index.html (path tương đối ./, Pages-ready, .nojekyll)
app.js (header DEMO / CÂU x/2 động, router theo GamePhase)
state/gameStateMachine.js (flow + lock + timeout, không auto-chuyển)
state/timerEngine.js (timestamp tuyệt đối, đã fix bug kẹt ở 0s)
screens/ Lobby, Question, Answer (RESULT+EXPLANATION+CONTINUE), Evidence (dự phòng), Done
components/shared/ QuestionHeader, AnswerGrid, Countdown (tròn, góc phải), EvidencePanel
components/media/ TableRenderer (hỗ trợ formHeader Lorene) + ImageRenderer (ảnh gốc + báo thiếu asset)
components/longsentence/ SentenceRenderer (hiện không dùng cho 5 câu chính)
data/questions.js (demo + 5 câu chốt bên dưới)
data/gameConfig.js (5s hỏi / 20s scan / 10s chọn)
styles/designTokens.css (accent indigo #4F46E5, nền #F0F9FF) + styles/main.css (.red-key đỏ đậm)
assets/ q1-maple-outdoor.png (430KB), q3-channel19-schedule.png (225KB),
        q4-ms-sullivan.png (160KB), 5-postal-rates.png (187KB), README.md
server.js (chỉ dùng chạy local, Pages không cần)
test_engine.js (34→52 pass sau khi đủ 5 câu)
```

---

## 2. NỘI DUNG CHỐT — 5 CÂU (wording tiếng Anh giữ 100%)

### DEMO (order 0, đáp án C)
- Hỏi: `Who is still waiting for everyone to finish?` — A Member 3 / B Member 4 / C Member 6 / D Member 7.
- Bảng Member 7 hàng tự dựng (hướng dẫn thao tác). Màn READY chỉ hiện `DEMO` to, chưa hiện câu hỏi.

### Q1 — MAPLE OUTDOOR (order 1, đáp án B)
- Hỏi: `How much does an Avalanche fuel canister cost?`
- A $58.79 / B $9.98 / C $19.96 / D $12.85 → **B**.
- Document: ảnh gốc `assets/q1-maple-outdoor.png` full màn hình.
- Explanation (TV): `Câu hỏi hỏi giá của một Fuel Canister. Trong bảng, Fuel Canister có thương hiệu Avalanche và Unit Price là $9.98. Giá $19.96 nằm ở cột Price, không phải giá của một sản phẩm.`
- Key đỏ đậm: `Fuel Canister`, `Avalanche`, `Unit`, `$9.98`.
- Skill: `SCAN → FIND ROW → CHECK COLUMN → FIND DATA`.

### Q2 — REIMBURSEMENT REQUEST FORM / Lorene (order 2, đáp án C)
- Hỏi: `What can be reimbursed using the form?`
- A Only amounts less than £100 / B Only transportation costs / C Only charges submitted with a receipt / D Only the expenses of senior staff members → **C**.
- Document: bảng HTML nguyên văn (header Lorene Industries + meta Timothy Oswell/Laura Cho/Advertising/8123976/Project manager + bảng 3 cột Date/Description/Cost + Total £61 + 3 đoạn policy + chữ ký). Không thêm/bớt chữ, giữ `£`.
- Explanation (TV): `Khoản chi chỉ được hoàn trả khi nhân viên nộp biên lai chi tiết. Vì vậy, đáp án đúng là C.`
- Key đỏ đậm: `without itemized receipts`, `Receipts attached? Yes`.
- Skill: `SCAN → FIND REQUIREMENT → MATCH EVIDENCE`.

### Q3 — CHANNEL 19 PROGRAM SCHEDULE (order 3, đáp án C)
- Hỏi: `What is the focus of the channel?`
- A Food / B Sports / C Nature / D Children → **C**.
- Document: ảnh gốc `assets/q3-channel19-schedule.png` (đã đối chiếu ảnh: đủ 6 chương trình).
- Explanation (TV): `Nhìn tổng thể lịch chương trình, các nội dung chủ yếu nói về động vật, thực vật, thiên nhiên, môi trường và hoạt động ngoài trời. Vì vậy, chủ đề chính của kênh là Nature.`
- Key đỏ đậm (6): `Life in Alaska`, `Amazing Sights of Africa`, `Anatomy of a Dinosaur`, `Rocky`, `Natural Phenomenon`, `Blue Ocean`.
- Skill: `OVERVIEW SCAN → IDENTIFY THE COMMON TOPIC`.

### Q4 — MIDAS TOUCH INTERNET PROVIDER (order 4, đáp án C)
- Hỏi: `What did Ms. Sullivan do on March 13?`
- A Purchased a home security system / B Returned a product / C Signed up for Internet service / D Made an appointment → **C**.
- Document: ảnh gốc `assets/q4-ms-sullivan.png` (Midas Contract: Ms. Tanya Sullivan, Purchase Date March 13, Midas Internet multimedia package $40/month).
- Explanation (TV): `Trong hợp đồng, Ms. Tanya Sullivan có ngày mua dịch vụ là March 13. Phần Services Purchased ghi Midas Internet multimedia package, cho thấy cô ấy đã đăng ký dịch vụ Internet vào ngày này.`
- Key đỏ đậm (4): `Ms. Tanya Sullivan`, `Purchase Date: March 13`, `Services Purchased`, `Midas Internet multimedia package`.
- Skill: `SCAN → FIND NAME/DATE → LOCATE INFORMATION → MATCH PARAPHRASE`.

### Q5 — NATIONAL POSTAL SERVICE (order 5, đáp án B)
- Hỏi: `Why might rates be raised by the postal service in the future?`
- A To cover expenses related to an expansion / B To adjust for changes in inflation / C To pay for additional staff members / D To allow for mail heavier than 30 grams → **B**.
- Document: ảnh gốc `assets/5-postal-rates.png` (NPS notice + bảng giá + câu `Any future price adjustments will be based on national inflation.`).
- Explanation (TV): `Thông báo cho biết mọi điều chỉnh giá trong tương lai sẽ dựa trên tình hình lạm phát quốc gia. Vì vậy, lý do có thể khiến mức phí tăng là để điều chỉnh theo sự thay đổi của lạm phát.`
- Key đỏ đậm (2): `future price adjustments`, `national inflation`.
- Skill: `SCAN → LOCATE EVIDENCE → RECOGNIZE PARAPHRASE`.

Không tồn tại Q167/Q168 trong data (test assert). Q166/Q157 cũ đã thay bằng nội dung chốt trên.

---

## 3. FLOW + TIMING + INTERACTION (đang chạy đúng)

```
LOBBY (BẮT ĐẦU)
→ QUESTION_SHOWN: hiện DEMO / CÂU 1..5 to + READY (chưa hiện câu hỏi)
→ click READY → QUESTION_TIMER: câu hỏi + timer 5s góc phải (chưa hiện document)
→ hết 5s → DOCUMENT_SHOWN: document full + câu hỏi mini + timer 20s góc phải
→ hết 20s → ANSWER_MODE: hỏi + 4 đáp án + timer 10s góc phải
→ click đáp án: lock ngay (đúng xanh / sai đỏ + hiện đáp án đúng), stop timer,
  hiện explanation TV + key đỏ đậm + CONTINUE xanh dưới cùng
→ hết 10s không chọn: khóa, hiện HẾT GIỜ + đáp án đúng + giải thích + CONTINUE
→ CONTINUE → câu tiếp (không màn hình trung gian, không auto-chuyển)
→ hết Q5 → DONE (HOÀN THÀNH + CHƠI LẠI, không điểm/leaderboard/nhóm)
```

- Timer absolute-timestamp (`timerEngine.js`), stop sạch khi chuyển state, đã fix lỗi kẹt 0s.
- Không score/points/leaderboard/group/shortcut/Submit (grep sạch, chỉ còn từ trong nội dung học).
- Counter header động `CÂU x/2` theo `questions.length - 1` (hiện 5 câu → `/5`).
- Chạy offline 100%, path tương đối, Pages deploy từ `main` root.

---

## 4. QUY TẮC CHO BƯỚC UI (giao cho Anti)

1. Chỉ sửa `styles/`, animation/transition trong `components/` + `screens/`; KHÔNG đụng `data/questions.js`, `state/`, `test_engine.js`, wording, đáp án, flow, timing.
2. Giữ: nền sáng, 1 accent, 1 font sans hệ thống, offline, chữ hỏi ≥32px, 16:9 max 1280px, đọc xa qua máy chiếu.
3. Giữ `.red-key` IN ĐẬM + ĐỎ + underline (hiện `font-weight:800; color/border var(--status-incorrect)`), chỉ underline key, không đỏ cả đoạn.
4. Animation 200–450ms ease-out, phục vụ thông tin (countdown mượt, chuyển màn, explanation) — không neon/gaming/gradient/shadow nặng.
5. Timer giữ góc phải (84px ở answer, 124px ở question/doc), document ảnh `max-height:62vh contain`.
6. Sau sửa: `node test_engine.js` phải 52 PASS → commit `UI ...` → push → đợi Pages `built` → kiểm tra ẩn danh link trên qua đủ Demo→Q5→DONE.
7. Trình duyệt thường cache JS: kiểm tra bằng ẩn danh + `Ctrl+Shift+R`; nếu đổi JS mà chưa lên thì bump `?v=` trong `index.html`.

## 5. LỊCH SỬ COMMIT LIÊN QUAN (mới nhất trước)

`65cd10d` Full 5 câu chốt · `91a9ab6` Đồng bộ Q1/Q2 · `b33fb0d` Q4 TV · `e3bec7a` Q4 chốt C ·
`c56e77c` Q5 ảnh gốc · `9b16a87` +ảnh postal · `4ff7950` Q5 Q157 · `286541f` +ảnh Q4 ·
`2411998` khung Q4 · `d84c801` +ảnh Q3 · `92266d7` Q159 · `3e60ced` Bảng 2 Lorene ·
`8409a3b` Q149 · `08a57ba` 5s+10s · `fe774bc` fix kẹt 0s · `b67d074` flow ảnh/CONTINUE.
