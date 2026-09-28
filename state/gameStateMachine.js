/**
 * Game State Machine
 * Flow trinh chieu tren lop:
 * READY -> QUESTION + 10s -> DOCUMENT (anh goc full) + 20s -> ANSWER (lock) -> RESULT + EXPLANATION -> CONTINUE -> Q tiep
 * Khong tu dong chuyen cau sau khi chon. Timer state truoc phai stop khi sang state moi.
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
    this.init();
  }

  init() {
    this.currentQuestionIndex = 0;
    this.phase = GamePhase.LOBBY;
    this.selectedAnswer = null;
    this.isAnswerLocked = false;
    this.currentEvidenceStep = 1;
    this.isResultShown = false;
    globalTimer.stop();
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex] || null;
  }

  startGame() {
    this.currentQuestionIndex = 0;
    this.setPhase(GamePhase.QUESTION_SHOWN);
  }

  setPhase(newPhase) {
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
      this.currentEvidenceStep = 1;
    } else if (newPhase === GamePhase.QUESTION_TIMER) {
      const duration = q.timing?.questionTimerSeconds || this.config.timing.questionTimerSeconds || 10;
      globalTimer.start(duration, () => {
        this.setPhase(GamePhase.DOCUMENT_SHOWN);
      });
    } else if (newPhase === GamePhase.DOCUMENT_SHOWN) {
      const duration = q.timing?.scanTimerSeconds || this.config.timing.scanTimerSeconds || 20;
      globalTimer.start(duration, () => {
        this.setPhase(GamePhase.ANSWER_MODE);
      });
    } else if (newPhase === GamePhase.ANSWER_MODE) {
      globalTimer.stop();
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

    this.selectedAnswer = answerId;
    this.isAnswerLocked = true;
    this.isResultShown = true;
    // Khong tu dong chuyen cau. Giu RESULT + EXPLANATION, doi bam CONTINUE.
    this._notify();

    return true;
  }

  setEvidenceStep(step) {
    this.currentEvidenceStep = step;
    this._notify();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
      this.setPhase(GamePhase.QUESTION_SHOWN);
      return true;
    } else {
      this.setPhase(GamePhase.DONE);
      return true;
    }
  }

  resetGame() {
    this.init();
    this.setPhase(GamePhase.LOBBY);
  }

  skipTimer() {
    if (this.phase === GamePhase.QUESTION_TIMER || this.phase === GamePhase.DOCUMENT_SHOWN) {
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
