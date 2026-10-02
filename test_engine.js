/**
 * Test Engine
 * Automated verification of GameStateMachine, TimerEngine, and Questions Data.
 */

import { gameState, GamePhase } from './state/gameStateMachine.js';
import { questionsData } from './data/questions.js';

console.log("=== BẮT ĐẦU KIỂM THỬ HỆ THỐNG MINI-GAME V2 (MINIMAL) ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✖ FAIL: ${message}`);
    failed++;
  }
}

// 1. Kiểm tra cấu trúc Questions Data (Demo + Q1 Maple + Q2 Lorene + Q3 Channel + Q4 Midas + Q5 Postal)
console.log("\n1. Kiểm tra Data Questions:");
assert(questionsData.length === 6, "Tổng số câu hỏi là 6 (1 Demo + 5 Real)");
assert(questionsData[0].id === 'demo', "Câu đầu tiên là Demo");
assert(questionsData[0].correctAnswerId === 'C', "Câu demo đáp án đúng là C");
const expected = { q1: 'B', q2: 'C', q3: 'C', q4: 'C', q5: 'B' };
for (const [id, ans] of Object.entries(expected)) {
  const q = questionsData.find(x => x.id === id);
  assert(!!q, `${id} tồn tại`);
  assert(q.correctAnswerId === ans, `${id} đáp án đúng là ${ans}`);
}
assert(!questionsData.some(q => /167|168/i.test(JSON.stringify(q))), "Không xuất hiện Q167/Q168");

for (let i = 1; i <= 5; i++) {
  assert(questionsData[i].order === i, `Câu ${i} có order = ${i}`);
  assert(questionsData[i].answers.length === 4, `Câu ${i} có đủ 4 phương án A, B, C, D`);
  assert(!!questionsData[i].why, `Câu ${i} có dòng giải thích why ngắn gọn`);
}

// 1b. Kiểm tra nội dung Q5 (mail rates: closest new vs original price)
console.log("\n1b. Kiểm tra nội dung Q5:");
const q5 = questionsData.find(x => x.id === 'q5');
assert(q5.question === "Which type of mail had a new price that was closest to its original price?", "Q5 question chính xác");
assert(q5.answers.map(a => a.id).join(',') === "A,B,C,D", "Q5 đủ 4 phương án A,B,C,D");
assert(q5.answers.map(a => a.text).join('|') === "Domestic letter mail|Commercial mail|International mail|Metered mail", "Q5 answers đúng thứ tự");
assert(q5.correctAnswerId === 'B', "Q5 đáp án đúng là B (Commercial mail)");
assert(q5.skill === "COMPARE → CALCULATE DIFFERENCE → IDENTIFY CLOSEST VALUE", "Q5 skill chính xác");
assert(q5.why === "Commercial mail có giá cũ $0.70 lên giá mới $0.85, chênh lệch chỉ $0.15 nên gần giá gốc nhất.", "Q5 explanation 1 câu ngắn (TV)");
assert(!/%/.test(q5.why), "Q5 explanation không dùng % Increase");
assert(!/%/.test(q5.evidence.chain.map(s => s.label).join(' ')), "Q5 evidence không dùng % Increase");
assert(q5.evidence.chain.some(s => s.key === "Commercial mail"), "Q5 evidence key: Commercial mail");
assert(q5.media?.imageUrl === "./assets/5-postal-rates.png", "Q5 dùng đúng image asset gốc");

// 2. Kiểm tra GameStateMachine Flow
console.log("\n2. Kiểm tra GameStateMachine Flow:");
gameState.resetGame();
assert(gameState.phase === GamePhase.LOBBY, "Khởi tạo game ở state LOBBY");

gameState.startGame();
assert(gameState.phase === GamePhase.QUESTION_SHOWN, "Start game chuyển sang QUESTION_SHOWN");
assert(gameState.getCurrentQuestion().id === 'demo', "Đang ở câu Demo");

// Chưa bấm READY thì timer không chạy
assert(gameState.phase === GamePhase.QUESTION_SHOWN, "Chưa bấm READY thì vẫn ở QUESTION_SHOWN");

// Bấm READY -> QUESTION_TIMER (15s)
gameState.pressReady();
assert(gameState.phase === GamePhase.QUESTION_TIMER, "Bấm READY chuyển sang QUESTION_TIMER (15s)");

// Hết 15s (hoặc skip) -> DOCUMENT_SHOWN (20s)
gameState.skipTimer();
assert(gameState.phase === GamePhase.DOCUMENT_SHOWN, "Hết 15s chuyển sang DOCUMENT_SHOWN (20s scan)");

// Hết 20s (hoặc skip) -> ANSWER_MODE
gameState.skipTimer();
assert(gameState.phase === GamePhase.ANSWER_MODE, "Hết 20s scan chuyển sang ANSWER_MODE");

// Chọn đáp án TẠM trong 15s: chưa khóa, chưa hiện kết quả, được đổi
assert(gameState.isAnswerLocked === false, "Trước khi chọn, answer chưa bị khóa");
const selectRes1 = gameState.selectAnswer('C');
assert(selectRes1 === true, "Chọn đáp án C thành công");
assert(gameState.selectedAnswer === 'C', "Đáp án đã chọn là C");
assert(gameState.isAnswerLocked === false, "Chọn xong vẫn chưa khóa (chờ hết 15s)");
assert(gameState.isResultShown === false, "Chưa hiện kết quả + giải thích khi còn 15s");

// Đổi đáp án trong 15s
const selectRes2 = gameState.selectAnswer('A');
assert(selectRes2 === true, "Được đổi đáp án trong 15s");
assert(gameState.selectedAnswer === 'A', "Đáp án hiện tại là A");
assert(gameState.isResultShown === false, "Đổi xong vẫn chưa hiện kết quả");

// hết 15s (skip) -> khóa + hiện kết quả, giữ lựa chọn cuối
gameState.skipTimer();
assert(gameState.phase === GamePhase.ANSWER_MODE, "Vẫn ở ANSWER_MODE khi hết 15s");
assert(gameState.isAnswerLocked === true, "hết 15s thì khóa đáp án");
assert(gameState.isResultShown === true, "hết 15s mới hiện kết quả + giải thích");
assert(gameState.selectedAnswer === 'A', "Giữ lựa chọn cuối (A), không bị xóa");

// Sau khi khóa thì không đổi được nữa
assert(gameState.selectAnswer('C') === false, "Không thể đổi đáp án sau khi đã khóa");

// Chuyển sang EVIDENCE
gameState.setPhase(GamePhase.EVIDENCE);
assert(gameState.phase === GamePhase.EVIDENCE, "Chuyển sang EVIDENCE thành công");
assert(gameState.currentEvidenceStep === 1, "Vao EVIDENCE reset ve buoc 1");

// Chuyển sang câu kế tiếp (Q1)
gameState.nextQuestion();
assert(gameState.currentQuestionIndex === 1, "Đã chuyển sang Câu 1");
assert(gameState.phase === GamePhase.QUESTION_SHOWN, "Câu 1 ở trạng thái QUESTION_SHOWN");

// Đi tiếp qua Q2, Q3, Q4, Q5
for (let qIdx = 2; qIdx <= 5; qIdx++) {
  gameState.nextQuestion();
  assert(gameState.currentQuestionIndex === qIdx, `Đã chuyển sang Câu ${qIdx}`);
}

// Từ Q5 chuyển sang DONE
gameState.nextQuestion();
assert(gameState.phase === GamePhase.DONE, "Sau câu cuối cùng chuyển sang DONE");

// Reset game về LOBBY
gameState.resetGame();
assert(gameState.phase === GamePhase.LOBBY, "Reset game đưa về LOBBY");
assert(gameState.currentQuestionIndex === 0, "Index câu hỏi trở về 0");

console.log("\n=========================================");
console.log(`KẾT QUẢ KIỂM THỬ: ${passed} PASS, ${failed} FAIL`);
console.log("=========================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
