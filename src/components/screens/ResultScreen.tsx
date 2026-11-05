import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  BookOpenCheck,
  Home,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { QuizResult } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface ResultScreenProps {
  result: QuizResult;
  onRestartQuiz: () => void;
  onReviewAnswers: () => void;
  onReturnHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestartQuiz,
  onReviewAnswers,
  onReturnHome,
}) => {
  useEffect(() => {
    sound.playFanfare();

    // Trigger confetti celebration if score >= 60%
    if (result.percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6750A4', '#2563EB', '#10B981', '#F59E0B'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [result.percentage]);

  let performanceTitle = 'Keep Practicing!';
  let performanceDesc = 'You are building foundational knowledge. Review your mistakes to master these concepts.';
  let scoreColorClass = 'text-amber-500 dark:text-amber-400';

  if (result.percentage >= 90) {
    performanceTitle = 'Outstanding Mastery!';
    performanceDesc = 'Incredible accuracy! You have demonstrated exceptional knowledge.';
    scoreColorClass = 'text-emerald-500 dark:text-emerald-400';
  } else if (result.percentage >= 70) {
    performanceTitle = 'Great Job! Well Done!';
    performanceDesc = 'Solid score! With a little more review, you can hit a perfect score.';
    scoreColorClass = 'text-purple-600 dark:text-purple-400';
  } else if (result.percentage >= 50) {
    performanceTitle = 'Good Effort!';
    performanceDesc = 'You passed this quiz challenge! Review the explanations to level up.';
    scoreColorClass = 'text-blue-500 dark:text-blue-400';
  }

  return (
    <div className="flex-1 flex flex-col p-5 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="text-center pt-2 pb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Quiz Completed!
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Category: <span className="font-semibold text-slate-700 dark:text-slate-200">{result.category}</span>
        </p>
      </div>

      {/* Main Score Presentation Card */}
      <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm text-center mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-purple-600/20">
          <Trophy className="w-8 h-8 text-amber-300" />
        </div>

        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          {performanceTitle}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1 mb-4 leading-relaxed">
          {performanceDesc}
        </p>

        {/* Circular Percentage / Big Score */}
        <div className="py-2">
          <div className={`text-4xl font-black tracking-tight ${scoreColorClass}`}>
            {result.percentage.toFixed(1)}%
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
            Final Score: {result.score} Points
          </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800/80 my-4" />

        {/* Metrics Row: Total, Correct, Incorrect */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-center text-slate-400 mb-1">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {result.totalQuestions}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Total Qs
            </div>
          </div>

          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
            <div className="flex items-center justify-center text-emerald-500 mb-1">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {result.correctAnswers}
            </div>
            <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
              Correct
            </div>
          </div>

          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30">
            <div className="flex items-center justify-center text-rose-500 mb-1">
              <XCircle className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-rose-600 dark:text-rose-400">
              {result.incorrectAnswers}
            </div>
            <div className="text-[10px] text-rose-600/80 dark:text-rose-400/80">
              Incorrect
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Review Answers, Restart Quiz, Return Home */}
      <div className="space-y-2.5 mt-auto pb-2">
        <button
          onClick={() => {
            sound.playTap();
            onReviewAnswers();
          }}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <BookOpenCheck className="w-4 h-4" />
          Review Answers with Explanations
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onRestartQuiz();
          }}
          className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Restart Quiz
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onReturnHome();
          }}
          className="w-full h-10 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
