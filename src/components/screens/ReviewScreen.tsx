import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';
import { Question, QuizResult } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface ReviewScreenProps {
  result: QuizResult;
  questions: Question[];
  onBack: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  result,
  questions,
  onBack,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  const filteredQuestions = questions.filter((q, idx) => {
    const selected = result.selectedAnswers[idx];
    const isCorrect = selected === q.correctAnswerIndex;
    if (filter === 'correct') return isCorrect;
    if (filter === 'incorrect') return !isCorrect;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-5 select-none overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center gap-2 pb-3">
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
            Review Answers
          </h2>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {result.correctAnswers} correct · {result.incorrectAnswers} incorrect
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 mb-4 text-xs font-semibold">
        <button
          onClick={() => {
            sound.playTap();
            setFilter('all');
          }}
          className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-white dark:bg-[#1E1B2E] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          All ({questions.length})
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setFilter('correct');
          }}
          className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === 'correct'
              ? 'bg-white dark:bg-[#1E1B2E] text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Correct ({result.correctAnswers})
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setFilter('incorrect');
          }}
          className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
            filter === 'incorrect'
              ? 'bg-white dark:bg-[#1E1B2E] text-rose-600 dark:text-rose-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Incorrect ({result.incorrectAnswers})
        </button>
      </div>

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {filter === 'incorrect' ? 'No incorrect answers to review!' : 'No questions found'}
          </p>
        </div>
      ) : (
        <div className="space-y-4 pb-6">
          {filteredQuestions.map((q) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);
            const userSelectedIndex = result.selectedAnswers[originalIndex];
            const isUserCorrect = userSelectedIndex === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm"
              >
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    {isUserCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Correct (+10 pts)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        {userSelectedIndex === null ? 'Skipped / Timed Out' : 'Incorrect'}
                      </span>
                    )}

                    {q.isCustom && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                        <Sparkles className="w-2.5 h-2.5" />
                        Custom
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    Question {originalIndex + 1}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 leading-relaxed">
                  {q.question}
                </h4>

                {/* Answer Options Review */}
                <div className="space-y-1.5 mb-3">
                  {q.options.map((option, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswerIndex;
                    const isUserChoice = optIdx === userSelectedIndex;
                    const letter = String.fromCharCode(65 + optIdx);

                    let optionBg = 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300';

                    if (isOptionCorrect) {
                      optionBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500/20';
                    } else if (isUserChoice && !isOptionCorrect) {
                      optionBg = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 font-semibold ring-1 ring-rose-500/20';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${optionBg}`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                              isOptionCorrect
                                ? 'bg-emerald-600 text-white'
                                : isUserChoice
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {letter}
                          </span>
                          <span>{option}</span>
                        </div>

                        {isOptionCorrect && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            Correct Answer
                          </span>
                        )}
                        {!isOptionCorrect && isUserChoice && (
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                            Your Selection
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {q.explanation && (
                  <div className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 flex items-start gap-2 text-xs">
                    <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-purple-900 dark:text-purple-200 leading-snug">
                      <span className="font-bold">Explanation:</span> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
