import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Layers, ArrowRight } from 'lucide-react';
import { Category } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface CategoriesScreenProps {
  categories: Category[];
  onStartQuiz: (category: Category) => void;
  onBack: () => void;
  onNavigateToAddQuestion: () => void;
  getQuestionCount: (categoryId: string) => number;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  categories,
  onStartQuiz,
  onBack,
  onNavigateToAddQuestion,
  getQuestionCount,
}) => {
  const [search, setSearch] = useState('');

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  );

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
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Quiz Categories
          </h2>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            onNavigateToAddQuestion();
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
          title="Add Question"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories (e.g. Science, CS)..."
          className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Categories Count Label */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 px-0.5">
        <span>{filtered.length} Categories Available</span>
        <span>Tap any card to start</span>
      </div>

      {/* Categories Grid */}
      {filtered.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <Layers className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
          <p className="text-xs text-slate-500">No categories found matching "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-6">
          {filtered.map((cat) => {
            const count = getQuestionCount(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => {
                  sound.playTap();
                  onStartQuiz(cat);
                }}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] hover:border-purple-400 dark:hover:border-purple-500 transition-all cursor-pointer shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {count} Qs
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-purple-600 dark:text-purple-400">
                  <span>Start Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
