import React, { useState } from 'react';
import { ArrowLeft, Trash2, Trophy, Clock, CheckCircle, Calendar, Play } from 'lucide-react';
import { QuizResult } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface HistoryScreenProps {
  quizHistory: QuizResult[];
  bestScore: number;
  onClearHistory: () => void;
  onBack: () => void;
  onTakeQuiz: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  quizHistory,
  bestScore,
  onClearHistory,
  onBack,
  onTakeQuiz,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-5 select-none overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Quiz History & Scores
            </h2>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Persisted across app restarts
            </span>
          </div>
        </div>

        {quizHistory.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Clear History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {quizHistory.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            No Quiz Attempts Recorded Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 mb-5 leading-relaxed">
            Take your first quiz to record your progress, accuracy rates, and earn your spot on the leaderboard.
          </p>
          <button
            onClick={() => {
              sound.playTap();
              onTakeQuiz();
            }}
            className="h-10 px-4 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-purple-700 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Take a Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-3 pb-6">
          {quizHistory.map((attempt) => {
            const isBest = attempt.score === bestScore && bestScore > 0;
            const formattedDate = new Date(attempt.date).toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={attempt.id}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm flex items-center gap-3.5"
              >
                {/* Score Avatar */}
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-sm ${
                    isBest
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-600 ring-2 ring-amber-400/30'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600'
                  }`}
                >
                  <span className="text-sm font-black leading-none">{attempt.score}</span>
                  <span className="text-[8px] font-bold tracking-tighter opacity-80">PTS</span>
                </div>

                {/* Info Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {attempt.category}
                    </span>
                    {isBest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                        <Trophy className="w-2.5 h-2.5 text-amber-500" />
                        Best
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400">
                      <CheckCircle className="w-3 h-3" />
                      {attempt.percentage.toFixed(0)}% ({attempt.correctAnswers}/{attempt.totalQuestions})
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-6">
          <div className="w-full bg-white dark:bg-[#1E1B2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Clear All Quiz History?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              This will erase all past attempt records from local storage. Your recorded personal best score will be preserved.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
                className="flex-1 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
