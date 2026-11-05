import React from 'react';
import {
  HelpCircle,
  Trophy,
  Play,
  PlusCircle,
  History as HistoryIcon,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Category, QuizResult } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface HomeScreenProps {
  categories: Category[];
  bestScore: number;
  quizHistory: QuizResult[];
  onStartQuiz: (category: Category) => void;
  onNavigate: (screen: 'categories' | 'history' | 'add_question') => void;
  isDark: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalCustomQuestions: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  categories,
  bestScore,
  quizHistory,
  onStartQuiz,
  onNavigate,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  totalCustomQuestions,
}) => {
  const averageScore = quizHistory.length > 0
    ? Math.round(quizHistory.reduce((acc, curr) => acc + curr.percentage, 0) / quizHistory.length)
    : 0;

  return (
    <div className="flex-1 flex flex-col p-5 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6750A4] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-purple-600/20">
            <HelpCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              QuizMaster
            </span>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
              KHIT Guntur · IITM Pravartak
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              onToggleSound();
              sound.playTap();
            }}
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
          <button
            onClick={() => {
              onToggleTheme();
              sound.playTap();
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              sound.playTap();
              onNavigate('history');
            }}
            title="Quiz History"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <HistoryIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="pt-1 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome, Scholar! 👋
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          Ready to challenge yourself with today's quiz?
        </p>
      </div>

      {/* Personal Best Banner Card */}
      <div className="w-full rounded-2xl p-4 bg-gradient-to-r from-[#6750A4] via-[#5B4699] to-[#2563EB] text-white shadow-lg shadow-purple-900/25 relative overflow-hidden mb-5">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Personal Best
            </div>
            <div className="mt-2 text-3xl font-black tracking-tight flex items-baseline gap-1">
              {bestScore} <span className="text-xs font-semibold text-purple-200">PTS</span>
            </div>
            <div className="text-[11px] text-purple-100/90 mt-1">
              {quizHistory.length === 0
                ? 'Complete your first quiz to record a score'
                : `${quizHistory.length} attempts · Avg ${averageScore}% accuracy`}
            </div>
          </div>

          <div className="w-13 h-13 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-md shadow-inner">
            <Trophy className="w-7 h-7 text-amber-300 drop-shadow" />
          </div>
        </div>
      </div>

      {/* Primary Action Button: Start Quick Quiz */}
      <button
        onClick={() => {
          sound.playTap();
          if (categories.length > 0) onStartQuiz(categories[0]);
        }}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-[#6750A4] to-[#4F46E5] hover:from-[#594392] hover:to-[#4338CA] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all cursor-pointer mb-5"
      >
        <Play className="w-4 h-4 fill-white" />
        Start Quick Quiz
      </button>

      {/* Categories Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Explore Categories
        </div>
        <button
          onClick={() => {
            sound.playTap();
            onNavigate('categories');
          }}
          className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5"
        >
          View All ({categories.length})
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Top 4 Categories Grid Preview */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {categories.slice(0, 4).map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              sound.playTap();
              onStartQuiz(cat);
            }}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                  5 Qs
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {cat.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {cat.description}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform">
              <span>Start</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <button
          onClick={() => {
            sound.playTap();
            onNavigate('add_question');
          }}
          className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Add Question {totalCustomQuestions > 0 ? `(${totalCustomQuestions})` : ''}
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onNavigate('history');
          }}
          className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <HistoryIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Quiz History
        </button>
      </div>

      {/* Attribution Footer */}
      <div className="mt-auto text-center pt-2">
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          IITM Pravartak & BodhBridge Flutter Lab · KHIT Guntur
        </span>
      </div>
    </div>
  );
};
