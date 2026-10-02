/**
 * Game State Machine
 * Flow trinh chieu tren lop:
 * READY -> QUESTION + 5s -> DOCUMENT (anh goc full) + 30s -> ANSWER + 15s chon (tam thoi, duoc doi, chua lock) -> HET 15s lock + RESULT + EXPLANATION -> CONTINUE -> Q tiep
 * Chon dap an trong 15s chi luu tam, khong hien ket qua + giai thich. Het 15s (hoac Next/skip) moi khoa + hien ket qua. Timer state truoc stop khi sang state moi.
 */

import { questionsData } from '../data/questions.js';
import { gameConfig } from '../data/gameConfig.js';
import { globalTimer } from './timerEngine.js';

export const GamePhase = {
  LOBBY: 'LOBBY',
  QUESTION_SHOWN: 'QUESTION_SHOWN',
  QUESTION_TIMER: 'QUESTION_TIMER',
  DOCUMENT_SHOWN: 'DOCUMENT_SHOWN',
  ANSWER_MODE: 'ANSWER_MODE',
  EVIDENCE: 'EVIDENCE',
  DONE: 'DONE'
};

export class GameStateMachine {
  constructor() {
    this.questions = questionsData;
    this.config = gameConfig;
    this.listeners = new Set();
    this.history = [];
    this._suppressHistory = false;
    this.init();
  }

  init() {
    this.currentQuestionIndex = 0;
    this.phase = GamePhase.LOBBY;
    this.selectedAnswer = null;
    this.isAnswerLocked = false;
    this.currentEvidenceStep = 1;
    this.isResultShown = false;
    this.isTimeout = false;
    this.history = [];
    globalTimer.stop();
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex] || null;
  }

  startGame() {
    this.history = [];
    this.currentQuestionIndex = 0;
    this.setPhase(GamePhase.QUESTION_SHOWN);
  }

  _snapshot() {
    return {
      index: this.currentQuestionIndex,
      phase: this.phase,
      selectedAnswer: this.selectedAnswer,
      isAnswerLocked: this.isAnswerLocked,
      isResultShown: this.isResultShown,
      isTimeout: this.isTimeout,
      evidenceStep: this.currentEvidenceStep,
    };
  }

  _pushHistory() {
    if (this._suppressHistory) return;
    this.history.push(this._snapshot());
    if (this.history.length > 100) this.history.shift();
  }

  canGoBack() {
    return this.history.length > 0;
  }

  goBack() {
    if (this.history.length === 0) return false;
    const prev = this.history.pop();
    this._suppressHistory = true;
    globalTimer.stop();
    this.currentQuestionIndex = prev.index;
    this.phase = prev.phase;
    this.selectedAnswer = prev.selectedAnswer;
    this.isAnswerLocked = prev.isAnswerLocked;
    this.isResultShown = prev.isResultShown;
    this.isTimeout = prev.isTimeout;
    this.currentEvidenceStep = prev.evidenceStep;

    const q = this.getCurrentQuestion();
    if (q && prev.phase === GamePhase.QUESTION_TIMER) {
      const duration = q.timing?.questionTimerSeconds || this.config.timing.questionTimerSeconds || 5;
      globalTimer.start(duration, () => {
        this._suppressHistory = false;
        this.setPhase(GamePhase.DOCUMENT_SHOWN);
      });
    } else if (q && prev.phase === GamePhase.DOCUMENT_SHOWN) {
      const duration = q.timing?.scanTimerSeconds || this.config.timing.scanTimerSeconds || 30;
      globalTimer.start(duration, () => {
        this._suppressHistory = false;
        this.setPhase(GamePhase.ANSWER_MODE);
      });
    } else if (q && prev.phase === GamePhase.ANSWER_MODE && !prev.isAnswerLocked) {
      const duration = q.timing?.answerTimerSeconds || this.config.timing.answerTimerSeconds || 15;
      globalTimer.start(duration, () => {
        this._suppressHistory = false;
        this.lockOnTimeout();
      });
    } else {
      globalTimer.stop();
    }
    this._suppressHistory = false;
    this._notify();
    return true;
  }

  setPhase(newPhase) {
    if (!this._suppressHistory && newPhase !== this.phase) {
      this._pushHistory();
    }
    this.phase = newPhase;
    globalTimer.stop();

    const q = this.getCurrentQuestion();
    if (!q) {
      this.phase = GamePhase.DONE;
      this._notify();
      return;
    }

    if (newPhase === GamePhase.QUESTION_SHOWN) {
      this.selectedAnswer = null;
      this.isAnswerLocked = false;
      this.isResultShown = false;
      this.isTimeout = false;
      this.currentEvidenceStep = 1;
    } else if (newPhase === GamePhase.QUESTION_TIMER) {
      const duration = q.timing?.questionTimerSeconds || this.config.timing.questionTimerSeconds || 5;
      globalTimer.start(duration, () => {
        this.setPhase(GamePhase.DOCUMENT_SHOWN);
      });
    } else if (newPhase === GamePhase.DOCUMENT_SHOWN) {
      const duration = q.timing?.scanTimerSeconds || this.config.timing.scanTimerSeconds || 30;
      globalTimer.start(duration, () => {
        this.setPhase(GamePhase.ANSWER_MODE);
      });
    } else if (newPhase === GamePhase.ANSWER_MODE) {
      const duration = q.timing?.answerTimerSeconds || this.config.timing.answerTimerSeconds || 15;
      globalTimer.start(duration, () => {
        this.lockOnTimeout();
      });
    } else if (newPhase === GamePhase.EVIDENCE) {
      globalTimer.stop();
      this.currentEvidenceStep = 1;
    } else if (newPhase === GamePhase.DONE) {
      globalTimer.stop();
    }

    this._notify();
  }

  pressReady() {
    if (this.phase === GamePhase.QUESTION_SHOWN) {
      this.setPhase(GamePhase.QUESTION_TIMER);
    }
  }

  selectAnswer(answerId) {
    if (this.phase !== GamePhase.ANSWER_MODE) return false;
    if (this.isAnswerLocked) return false;

    // Chon tam trong 15s: luu lua chon, duoc doi, KHONG lock, KHONG hien ket qua + giai thich, timer van chay.
    this.selectedAnswer = answerId;
    this.isTimeout = false;
    this._notify();

    return true;
  }

  lockOnTimeout() {
    if (this.phase !== GamePhase.ANSWER_MODE) return;
    if (this.isAnswerLocked) return;
    // Het 15s (hoac Next/skip): khoa + hien ket qua + giai thich. Giu nguyen lua chon cuoi cua nguoi choi.
    this._pushHistory();
    this.isAnswerLocked = true;
    this.isResultShown = true;
    this.isTimeout = !this.selectedAnswer;
    globalTimer.stop();
    this._notify();
  }

  setEvidenceStep(step) {
    this.currentEvidenceStep = step;
    this._notify();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this._pushHistory();
      this._suppressHistory = true;
      this.currentQuestionIndex += 1;
      this.setPhase(GamePhase.QUESTION_SHOWN);
      this._suppressHistory = false;
      return true;
    } else {
      this._pushHistory();
      this._suppressHistory = true;
      this.setPhase(GamePhase.DONE);
      this._suppressHistory = false;
      return true;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex -= 1;
      this.setPhase(GamePhase.QUESTION_SHOWN);
      return true;
    }
    return false;
  }

  resetGame() {
    this.init();
    this.setPhase(GamePhase.LOBBY);
  }

  skipTimer() {
    if (this.phase === GamePhase.QUESTION_TIMER || this.phase === GamePhase.DOCUMENT_SHOWN || this.phase === GamePhase.ANSWER_MODE) {
      globalTimer.skip();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  _notify() {
    for (const listener of this.listeners) {
      try {
        listener(this);
      } catch (err) {
        console.error("GameStateMachine listener error:", err);
      }
    }
  }
}

export const gameState = new GameStateMachine();
