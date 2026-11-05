export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  lightBg: string;
}

export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  isCustom?: boolean;
}

export interface QuizResult {
  id: string;
  category: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
  date: string;
  timeTakenSeconds: number;
  selectedAnswers: (number | null)[];
  questionIds: string[];
}

export type ScreenType =
  | 'splash'
  | 'home'
  | 'categories'
  | 'quiz'
  | 'result'
  | 'review'
  | 'history'
  | 'add_question';
