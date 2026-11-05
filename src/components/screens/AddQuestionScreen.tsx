import React, { useState } from 'react';
import { ArrowLeft, Save, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Category, Question } from '../../types/quiz';
import { sound } from '../../utils/audio';

interface AddQuestionScreenProps {
  categories: Category[];
  onSaveQuestion: (question: Omit<Question, 'id'>) => boolean;
  onBack: () => void;
}

export const AddQuestionScreen: React.FC<AddQuestionScreenProps> = ({
  categories,
  onSaveQuestion,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'gk');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{
    question?: string;
    options?: string[];
    duplicate?: string;
    general?: string;
  }>({});

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);

    // Clear duplicate error when editing
    if (errors.duplicate) {
      setErrors((prev) => ({ ...prev, duplicate: undefined }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      question?: string;
      options?: string[];
      duplicate?: string;
      general?: string;
    } = {};

    // Validate Question
    if (!questionText.trim()) {
      newErrors.question = 'Question text cannot be empty.';
    } else if (questionText.trim().length < 8) {
      newErrors.question = 'Question must be at least 8 characters.';
    }

    // Validate 4 Options
    const optionErrors: string[] = [];
    options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      if (!opt.trim()) {
        optionErrors.push(`Option ${letter} is required.`);
      }
    });

    if (optionErrors.length > 0) {
      newErrors.options = optionErrors;
    }

    // Check for duplicate identical options
    const trimmedOptions = options.map((opt) => opt.trim().toLowerCase());
    const uniqueOptions = new Set(trimmedOptions);
    if (uniqueOptions.size < 4 && optionErrors.length === 0) {
      newErrors.duplicate = 'All 4 options must be distinct. Duplicate options are not allowed.';
    }

    if (Object.keys(newErrors).length > 0) {
      sound.playIncorrect();
      setErrors(newErrors);
      return;
    }

    // Passed validation, save question
    const success = onSaveQuestion({
      category: selectedCategory,
      question: questionText.trim(),
      options: options.map((opt) => opt.trim()),
      correctAnswerIndex,
      explanation: explanation.trim() || 'Verified by author submission.',
      isCustom: true,
    });

    if (success) {
      sound.playCorrect();
      setSavedSuccess(true);
      setTimeout(() => {
        onBack();
      }, 1200);
    }
  };

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
            Add Custom Question
          </h2>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Saves permanently to local storage
          </span>
        </div>
      </div>

      {savedSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Question Added Successfully!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Now included in future quizzes for this category.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 pb-6">
          {/* Information Banner */}
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <p className="text-[11px] text-purple-900 dark:text-purple-200 leading-snug">
              Custom questions are stored in your device storage and appear in subsequent quizzes.
            </p>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Text */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Question Text *
              </label>
              <span className="text-[10px] text-slate-400">
                {questionText.length} chars
              </span>
            </div>
            <textarea
              rows={2}
              value={questionText}
              onChange={(e) => {
                setQuestionText(e.target.value);
                if (errors.question) setErrors((prev) => ({ ...prev, question: undefined }));
              }}
              placeholder="e.g. Which algorithm is used for finding shortest paths in a graph?"
              className={`w-full p-2.5 rounded-xl border text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 bg-white dark:bg-[#1E1B2E] focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.question ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
              }`}
            />
            {errors.question && (
              <p className="text-[10px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.question}
              </p>
            )}
          </div>

          {/* Answer Options Header */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">
              4 Options & Correct Answer *
            </label>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">
              Select the radio indicator beside the option that is the correct answer.
            </p>

            {errors.duplicate && (
              <div className="p-2 mb-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.duplicate}
              </div>
            )}

            <div className="space-y-2">
              {options.map((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isCorrect = correctAnswerIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border transition-all ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E]'
                    }`}
                  >
                    {/* Radio selector for correct answer */}
                    <button
                      type="button"
                      onClick={() => setCorrectAnswerIndex(idx)}
                      title={`Mark Option ${letter} as Correct`}
                      className="cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isCorrect
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isCorrect && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </button>

                    <span
                      className={`text-[11px] font-bold w-4 text-center ${
                        isCorrect ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    >
                      {letter}
                    </span>

                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${letter} ${isCorrect ? '(Correct Answer)' : ''}`}
                      className="flex-1 h-8 text-xs bg-transparent focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                    />
                  </div>
                );
              })}
            </div>

            {errors.options && errors.options.length > 0 && (
              <p className="text-[10px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                All 4 option fields must be filled out.
              </p>
            )}
          </div>

          {/* Explanation (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Explanation (Optional)
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Why is this the correct answer? (Shown during post-quiz review)"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 bg-white dark:bg-[#1E1B2E] focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Question to Local Repository
          </button>
        </form>
      )}
    </div>
  );
};
