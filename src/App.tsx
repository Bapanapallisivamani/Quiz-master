import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Code2,
  BookOpen,
  Download,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react';
import { Category, Question, QuizResult, ScreenType } from './types/quiz';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS } from './data/initialQuestions';
import { AndroidFrame } from './components/AndroidFrame';
import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CategoriesScreen } from './components/screens/CategoriesScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { ReviewScreen } from './components/screens/ReviewScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { AddQuestionScreen } from './components/screens/AddQuestionScreen';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { ApkGuideViewer } from './components/ApkGuideViewer';
import { downloadFlutterProjectZip } from './utils/zipExport';
import { sound } from './utils/audio';

const STORAGE_KEY_CUSTOM = 'quizmaster_custom_questions_v1';
const STORAGE_KEY_HISTORY = 'quizmaster_quiz_history_v1';
const STORAGE_KEY_BEST = 'quizmaster_best_score_v1';
const STORAGE_KEY_THEME = 'quizmaster_theme_dark_v1';

export default function App() {
  // Navigation Tabs in developer portal
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'guide'>('simulator');

  // QuizMaster App State
  const [screen, setScreen] = useState<ScreenType>('splash');
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Active Quiz State
  const [selectedCategory, setSelectedCategory] = useState<Category>(INITIAL_CATEGORIES[0]);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);
  const [lastQuizResult, setLastQuizResult] = useState<QuizResult | null>(null);

  // Load persisted state from localStorage on startup
  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM);
      if (savedCustom) setCustomQuestions(JSON.parse(savedCustom));

      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) setQuizHistory(JSON.parse(savedHistory));

      const savedBest = localStorage.getItem(STORAGE_KEY_BEST);
      if (savedBest) setBestScore(parseInt(savedBest, 10));

      const savedDark = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedDark !== null) {
        const isDarkMode = savedDark === 'true';
        setIsDark(isDarkMode);
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Theme Sync with HTML tag
  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, nextDark.toString());
    } catch {
      // Ignore
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  // Combine initial questions with custom questions
  const allQuestions = [...INITIAL_QUESTIONS, ...customQuestions];

  const getQuestionCountForCategory = (categoryId: string) => {
    return allQuestions.filter((q) => q.category === categoryId).length;
  };

  // Start Quiz Action
  const handleStartQuiz = (category: Category) => {
    setSelectedCategory(category);
    const categoryQuestions = allQuestions.filter((q) => q.category === category.id);

    // Shuffle and pick up to 10 questions
    const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    setActiveQuizQuestions(selected);
    setScreen('quiz');
  };

  // Finish Quiz Action
  const handleFinishQuiz = (selectedAnswers: (number | null)[], timeTakenSeconds: number) => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;

    activeQuizQuestions.forEach((q, idx) => {
      const choice = selectedAnswers[idx];
      if (choice !== null && choice === q.correctAnswerIndex) {
        score += 10;
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const percentage = activeQuizQuestions.length > 0 ? (correct / activeQuizQuestions.length) * 100 : 0;

    const result: QuizResult = {
      id: Date.now().toString(),
      category: selectedCategory.name,
      score,
      totalQuestions: activeQuizQuestions.length,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      percentage,
      date: new Date().toISOString(),
      timeTakenSeconds,
      selectedAnswers,
      questionIds: activeQuizQuestions.map((q) => q.id),
    };

    setLastQuizResult(result);

    // Update history and best score
    const updatedHistory = [result, ...quizHistory];
    setQuizHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch {
      // Ignore
    }

    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem(STORAGE_KEY_BEST, score.toString());
      } catch {
        // Ignore
      }
    }

    setScreen('result');
  };

  // Add Custom Question Action
  const handleSaveCustomQuestion = (newQuestionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...newQuestionData,
      id: `custom_${Date.now()}`,
    };

    const updatedCustom = [...customQuestions, newQuestion];
    setCustomQuestions(updatedCustom);
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(updatedCustom));
    } catch {
      // Ignore
    }
    return true;
  };

  // Clear History Action
  const handleClearHistory = () => {
    setQuizHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // Ignore
    }
  };

  // Android Back Button handler
  const handleAndroidBack = () => {
    sound.playTap();
    if (screen === 'categories' || screen === 'history' || screen === 'add_question') {
      setScreen('home');
    } else if (screen === 'review') {
      setScreen('result');
    } else if (screen === 'result') {
      setScreen('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Bar Contract (Brand, Nav Links, Primary CTA) */}
      <header className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-between gap-8 shrink-0 sticky top-0 z-40">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6750A4] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-purple-600/20 font-black text-lg">
            Q
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              QuizMaster
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
              IITM Pravartak · KHIT Guntur
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => {
              setActiveTab('simulator');
              sound.playTap();
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android App</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('code');
              sound.playTap();
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Flutter Code ({allQuestions.length} Qs)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('guide');
              sound.playTap();
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>APK & Submission</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => downloadFlutterProjectZip()}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#6750A4] to-[#4F46E5] hover:from-[#584192] hover:to-[#4338CA] rounded-xl shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Download complete Flutter project ready for Android Studio"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Flutter ZIP</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'simulator' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Simulator Controls Strip */}
            <div className="w-full max-w-[410px] mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 select-none px-1">
              <span className="font-semibold flex items-center gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                Pixel 8 Pro · Material 3
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Toggle App Theme"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title={isFullscreen ? 'Windowed Device' : 'Expand View'}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Android Device Frame */}
            <AndroidFrame
              isFullscreen={isFullscreen}
              isDark={isDark}
              onBackPress={handleAndroidBack}
              onHomePress={() => {
                sound.playTap();
                setScreen('home');
              }}
            >
              {screen === 'splash' && (
                <SplashScreen
                  onFinish={() => setScreen('home')}
                  isDark={isDark}
                />
              )}

              {screen === 'home' && (
                <HomeScreen
                  categories={categories}
                  bestScore={bestScore}
                  quizHistory={quizHistory}
                  onStartQuiz={handleStartQuiz}
                  onNavigate={(navScreen) => setScreen(navScreen)}
                  isDark={isDark}
                  onToggleTheme={toggleTheme}
                  soundEnabled={soundEnabled}
                  onToggleSound={toggleSound}
                  totalCustomQuestions={customQuestions.length}
                />
              )}

              {screen === 'categories' && (
                <CategoriesScreen
                  categories={categories}
                  onStartQuiz={handleStartQuiz}
                  onBack={() => setScreen('home')}
                  onNavigateToAddQuestion={() => setScreen('add_question')}
                  getQuestionCount={getQuestionCountForCategory}
                />
              )}

              {screen === 'quiz' && (
                <QuizScreen
                  category={selectedCategory}
                  questions={activeQuizQuestions}
                  onFinishQuiz={handleFinishQuiz}
                  onExitQuiz={() => setScreen('home')}
                />
              )}

              {screen === 'result' && lastQuizResult && (
                <ResultScreen
                  result={lastQuizResult}
                  onRestartQuiz={() => handleStartQuiz(selectedCategory)}
                  onReviewAnswers={() => setScreen('review')}
                  onReturnHome={() => setScreen('home')}
                />
              )}

              {screen === 'review' && lastQuizResult && (
                <ReviewScreen
                  result={lastQuizResult}
                  questions={activeQuizQuestions}
                  onBack={() => setScreen('result')}
                />
              )}

              {screen === 'history' && (
                <HistoryScreen
                  quizHistory={quizHistory}
                  bestScore={bestScore}
                  onClearHistory={handleClearHistory}
                  onBack={() => setScreen('home')}
                  onTakeQuiz={() => setScreen('categories')}
                />
              )}

              {screen === 'add_question' && (
                <AddQuestionScreen
                  categories={categories}
                  onSaveQuestion={handleSaveCustomQuestion}
                  onBack={() => setScreen('home')}
                />
              )}
            </AndroidFrame>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col h-[740px]">
            <FlutterCodeViewer />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="flex-1 flex flex-col">
            <ApkGuideViewer />
          </div>
        )}
      </main>
    </div>
  );
}
