
export enum AppState {
  ASKING = 'ASKING',
  CELEBRATING = 'CELEBRATING',
  LOGGING_IN = 'LOGGING_IN',
  CHOICE = 'CHOICE',
  GALLERY = 'GALLERY',
  QUIZ = 'QUIZ',
  WRITTEN_ANSWERS = 'WRITTEN_ANSWERS'
}

export interface Position {
  x: number;
  y: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}
