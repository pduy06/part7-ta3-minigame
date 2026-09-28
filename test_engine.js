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

// 1. Kiểm tra cấu trúc Questions Data (Demo + Q1 Q149 + Q2 Q159; Q3/Q5 cho sau, Q4 bo, khong Q166/Q157)
console.log("\n1. Kiểm tra Data Questions:");
assert(questionsData.length === 3, "Tổng số câu hỏi là 3 (1 Demo + Q1 + Q2)");
assert(questionsData[0].id === 'demo', "Câu đầu tiên là Demo");
assert(questionsData[0].correctAnswerId === 'C', "Câu demo đáp án đúng là C");
assert(questionsData[1].id === 'q1', "Q1 = Q149");
assert(questionsData[1].correctAnswerId === 'C', "Q1 đáp án đúng là C");
assert(questionsData[2].id === 'q2', "Q2 = Q159");
assert(questionsData[2].correctAnswerId === 'C', "Q2 đáp án đúng là C");
assert(!questionsData.some(q => /166|167|168|157|Sullivan|postal/i.test(JSON.stringify(q))), "Không xuất hiện Q166/Q167/Q168/Q157");

for (let i = 1; i <= 2; i++) {
  assert(questionsData[i].order === i, `Câu ${i} có order = ${i}`);
  assert(questionsData[i].answers.length === 4, `Câu ${i} có đủ 4 phương án A, B, C, D`);
  assert(!!questionsData[i].why, `Câu ${i} có dòng giải thích why ngắn gọn`);
}

// 2. Kiểm tra GameStateMachine Flow
console.log("\n2. Kiểm tra GameStateMachine Flow:");
gameState.resetGame();
assert(gameState.phase === GamePhase.LOBBY, "Khởi tạo game ở state LOBBY");

gameState.startGame();
assert(gameState.phase === GamePhase.QUESTION_SHOWN, "Start game chuyển sang QUESTION_SHOWN");
assert(gameState.getCurrentQuestion().id === 'demo', "Đang ở câu Demo");

// Chưa bấm READY thì timer không chạy
assert(gameState.phase === GamePhase.QUESTION_SHOWN, "Chưa bấm READY thì vẫn ở QUESTION_SHOWN");

// Bấm READY -> QUESTION_TIMER (10s)
gameState.pressReady();
assert(gameState.phase === GamePhase.QUESTION_TIMER, "Bấm READY chuyển sang QUESTION_TIMER (10s)");

// Hết 10s (hoặc skip) -> DOCUMENT_SHOWN (20s)
gameState.skipTimer();
assert(gameState.phase === GamePhase.DOCUMENT_SHOWN, "Hết 10s chuyển sang DOCUMENT_SHOWN (20s scan)");

// Hết 20s (hoặc skip) -> ANSWER_MODE
gameState.skipTimer();
assert(gameState.phase === GamePhase.ANSWER_MODE, "Hết 20s scan chuyển sang ANSWER_MODE");

// Chọn đáp án & khóa
assert(gameState.isAnswerLocked === false, "Trước khi chọn, answer chưa bị khóa");
const selectRes1 = gameState.selectAnswer('C');
assert(selectRes1 === true, "Chọn đáp án C thành công");
assert(gameState.selectedAnswer === 'C', "Đáp án đã chọn là C");
assert(gameState.isAnswerLocked === true, "Sau khi chọn, answer bị khóa");

// Thử đổi sang đáp án khác
const selectRes2 = gameState.selectAnswer('A');
assert(selectRes2 === false, "Không thể đổi đáp án sau khi đã khóa");
assert(gameState.selectedAnswer === 'C', "Đáp án vẫn là C");

// Chuyển sang EVIDENCE
gameState.setPhase(GamePhase.EVIDENCE);
assert(gameState.phase === GamePhase.EVIDENCE, "Chuyển sang EVIDENCE thành công");

// Chuyển sang câu kế tiếp (Q1)
gameState.nextQuestion();
assert(gameState.currentQuestionIndex === 1, "Đã chuyển sang Câu 1");
assert(gameState.phase === GamePhase.QUESTION_SHOWN, "Câu 1 ở trạng thái QUESTION_SHOWN");

// Đi tiếp sang Q2
gameState.nextQuestion();
assert(gameState.currentQuestionIndex === 2, "Đã chuyển sang Câu 2");

// Từ Q2 (câu cuối hiện tại) chuyển sang DONE
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
