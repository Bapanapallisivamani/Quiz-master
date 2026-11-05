import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Timer,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { Category, Question } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface QuizScreenProps {
  category: Category;
  questions: Question[];
  onFinishQuiz: (selectedAnswers: (number | null)[], timeTakenSeconds: number) => void;
  onExitQuiz: () => void;
}

const QUESTION_TIME_LIMIT = 20; // 20 seconds per question

export const QuizScreen: React.FC<QuizScreenProps> = ({
  category,
  questions,
  onFinishQuiz,
  onExitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;
  const selectedOption = selectedAnswers[currentIndex];

  // Timer Countdown Effect
  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question, auto-advance or finish
          handleTimeExpired();
          return QUESTION_TIME_LIMIT;
        }
        if (prev <= 6) {
          sound.playTick();
        }
        return prev - 1;
      });
      setTotalTimeTaken((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, questions.length]);

  const handleTimeExpired = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      onFinishQuiz(selectedAnswers, totalTimeTaken + 1);
    }
  };

  const handleSelectOption = (index: number) => {
    sound.playTap();
    const updated = [...selectedAnswers];
    updated[currentIndex] = index;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    sound.playTap();
    if (isLast) {
      setShowSubmitConfirm(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    sound.playTap();
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleConfirmSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowSubmitConfirm(false);
    onFinishQuiz(selectedAnswers, totalTimeTaken);
  };

  // Progress percentage
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // Timer alert styling
  let timerBadgeColor = 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
  if (timeLeft <= 5) {
    timerBadgeColor = 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 animate-pulse';
  } else if (timeLeft <= 10) {
    timerBadgeColor = 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
  }

  return (
    <div className="flex-1 flex flex-col p-5 select-none relative overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Exit Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
          {category.name}
        </div>

        {/* Timer Badge */}
        <div className={`px-2.5 py-1 rounded-full border text-xs font-bold flex items-center gap-1 tabular-nums ${timerBadgeColor}`}>
          <Timer className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 px-0.5">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="tabular-nums">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md">
            Single Choice
          </span>
          {currentQuestion.isCustom && (
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Custom
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQuestion.question}
        </h3>
      </div>

      {/* 4 Multiple Choice Options */}
      <div className="space-y-2.5 mb-5 flex-1">
        {currentQuestion.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          const isSelected = selectedOption === idx;

          return (
            <div
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 ring-1 ring-purple-600 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Option Letter Badge */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {letter}
              </div>

              {/* Option Text */}
              <span
                className={`text-xs flex-1 ${
                  isSelected
                    ? 'font-bold text-purple-950 dark:text-purple-200'
                    : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {option}
              </span>

              {/* Radio Indicator */}
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-purple-600 bg-purple-600'
                    : 'border-slate-300 dark:border-slate-700'
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Buttons: Previous & Next / Submit */}
      <div className="mt-auto pt-2 flex items-center gap-2.5">
        {!isFirst && (
          <button
            onClick={handlePrevious}
            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>
        )}

        <button
          onClick={handleNext}
          className={`flex-2 h-11 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
            isLast
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
              : 'bg-gradient-to-r from-[#6750A4] to-[#4F46E5] hover:from-[#594392] hover:to-[#4338CA]'
          }`}
        >
          <span>{isLast ? 'Submit Quiz' : 'Next Question'}</span>
          {isLast ? <CheckCircle className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-6">
          <div className="w-full bg-white dark:bg-[#1E1B2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Exit Quiz?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
              Are you sure you want to exit? Your answers in this session will not be saved.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Resume
              </button>
              <button
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  onExitQuiz();
                }}
                className="flex-1 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Exit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-6">
          <div className="w-full bg-white dark:bg-[#1E1B2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ready to Submit?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
              You answered {selectedAnswers.filter((a) => a !== null).length} of {questions.length} questions. Submit to view your performance score and detailed answers.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Review
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
