export interface FlutterFile {
  path: string;
  name: string;
  folder: string;
  language: string;
  description: string;
  content: string;
}

export const FLUTTER_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    folder: 'Root',
    language: 'yaml',
    description: 'Flutter project specification and dependencies (Provider, SharedPreferences, Google Fonts, Intl).',
    content: `name: quizmaster
description: "A modern Material 3 Android Quiz Application built with Flutter & Dart for IITM Pravartak and BodhBridge Flutter Lab - KHIT Guntur"
publish_to: "none"

version: 1.0.0+1

environment:
  sdk: ">=3.3.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter

  # State Management
  provider: ^6.1.2

  # Local Data Persistence
  shared_preferences: ^2.2.3

  # Icons and Typography
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

  # Date formatting for quiz history
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true

  assets:
    - assets/images/
`,
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    folder: 'lib',
    language: 'dart',
    description: 'Application entry point injecting Provider and configuring Material 3 theme.',
    content: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'providers/quiz_provider.dart';
import 'screens/splash_screen.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => QuizProvider()),
      ],
      child: const QuizMasterApp(),
    ),
  );
}

class QuizMasterApp extends StatelessWidget {
  const QuizMasterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<QuizProvider>(
      builder: (context, quizProvider, _) {
        return MaterialApp(
          title: 'QuizMaster',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: quizProvider.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          home: const SplashScreen(),
        );
      },
    );
  }
}
`,
  },
  {
    path: 'lib/theme/app_theme.dart',
    name: 'app_theme.dart',
    folder: 'lib/theme',
    language: 'dart',
    description: 'Material 3 design system with purple and blue seed palettes for Light & Dark modes.',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primarySeed = Color(0xFF6750A4);
  static const Color secondarySeed = Color(0xFF2563EB);
  static const Color accentColor = Color(0xFF7C3AED);

  static const Color correctColor = Color(0xFF10B981);
  static const Color incorrectColor = Color(0xFFEF4444);
  static const Color warningColor = Color(0xFFF59E0B);

  static ThemeData get lightTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: primarySeed,
      brightness: Brightness.light,
      primary: const Color(0xFF6750A4),
      secondary: const Color(0xFF4F46E5),
      tertiary: const Color(0xFF0284C7),
      surface: const Color(0xFFFBFBFE),
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: const Color(0xFFF6F7FB),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(ThemeData.light().textTheme),
      appBarTheme: AppBarTheme(
        centerTitle: true,
        elevation: 0,
        backgroundColor: colorScheme.surface,
        foregroundColor: colorScheme.onSurface,
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: colorScheme.onSurface,
        ),
      ),
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(
            color: colorScheme.outlineVariant.withOpacity(0.4),
            width: 1,
          ),
        ),
        color: Colors.white,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 2,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          textStyle: GoogleFonts.plusJakartaSans(fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: colorScheme.outlineVariant),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      ),
    );
  }

  static ThemeData get darkTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: primarySeed,
      brightness: Brightness.dark,
      primary: const Color(0xFFD0BCFF),
      secondary: const Color(0xFF818CF8),
      tertiary: const Color(0xFF38BDF8),
      surface: const Color(0xFF1E1B2E),
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: const Color(0xFF12111A),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(ThemeData.dark().textTheme),
      appBarTheme: AppBarTheme(
        centerTitle: true,
        elevation: 0,
        backgroundColor: colorScheme.surface,
        foregroundColor: colorScheme.onSurface,
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: colorScheme.onSurface,
        ),
      ),
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(
            color: colorScheme.outlineVariant.withOpacity(0.2),
            width: 1,
          ),
        ),
        color: const Color(0xFF1E1B2E),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 2,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          textStyle: GoogleFonts.plusJakartaSans(fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF1E1B2E),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: colorScheme.outlineVariant.withOpacity(0.4)),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/models/category_model.dart',
    name: 'category_model.dart',
    folder: 'lib/models',
    language: 'dart',
    description: 'Category entity schema with JSON serialization.',
    content: `class CategoryModel {
  final String id;
  final String name;
  final String icon;
  final String description;
  final int colorValue;

  const CategoryModel({
    required this.id,
    required this.name,
    required this.icon,
    required this.description,
    required this.colorValue,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'icon': icon,
    'description': description,
    'colorValue': colorValue,
  };

  factory CategoryModel.fromJson(Map<String, dynamic> json) => CategoryModel(
    id: json['id'] as String,
    name: json['name'] as String,
    icon: json['icon'] as String,
    description: json['description'] as String,
    colorValue: json['colorValue'] as int,
  );
}
`,
  },
  {
    path: 'lib/models/question_model.dart',
    name: 'question_model.dart',
    folder: 'lib/models',
    language: 'dart',
    description: 'Question entity schema with options, correct answer index, explanation and custom flag.',
    content: `class QuestionModel {
  final String id;
  final String question;
  final List<String> options;
  final int correctAnswerIndex;
  final String category;
  final String explanation;
  final bool isCustom;

  const QuestionModel({
    required this.id,
    required this.question,
    required this.options,
    required this.correctAnswerIndex,
    required this.category,
    this.explanation = '',
    this.isCustom = false,
  });

  String get correctAnswer => options[correctAnswerIndex];

  Map<String, dynamic> toJson() => {
    'id': id,
    'question': question,
    'options': options,
    'correctAnswerIndex': correctAnswerIndex,
    'category': category,
    'explanation': explanation,
    'isCustom': isCustom,
  };

  factory QuestionModel.fromJson(Map<String, dynamic> json) => QuestionModel(
    id: json['id'] as String,
    question: json['question'] as String,
    options: List<String>.from(json['options'] as List),
    correctAnswerIndex: json['correctAnswerIndex'] as int,
    category: json['category'] as String,
    explanation: (json['explanation'] as String?) ?? '',
    isCustom: (json['isCustom'] as bool?) ?? false,
  );
}
`,
  },
  {
    path: 'lib/models/quiz_result_model.dart',
    name: 'quiz_result_model.dart',
    folder: 'lib/models',
    language: 'dart',
    description: 'Quiz session outcome model storing score, percentage, date, and answer indices.',
    content: `class QuizResultModel {
  final String id;
  final String category;
  final int score;
  final int totalQuestions;
  final int correctAnswers;
  final int incorrectAnswers;
  final double percentage;
  final DateTime date;
  final int timeTakenSeconds;
  final List<int?> selectedAnswers;
  final List<String> questionIds;

  const QuizResultModel({
    required this.id,
    required this.category,
    required this.score,
    required this.totalQuestions,
    required this.correctAnswers,
    required this.incorrectAnswers,
    required this.percentage,
    required this.date,
    required this.timeTakenSeconds,
    required this.selectedAnswers,
    required this.questionIds,
  });

  String get formattedPercentage => '\${percentage.toStringAsFixed(1)}%';

  String get performanceMessage {
    if (percentage >= 90) return 'Outstanding Mastery!';
    if (percentage >= 75) return 'Great Job! Well Done!';
    if (percentage >= 50) return 'Good Effort! Keep Learning!';
    return 'Keep Practicing, You Will Excel!';
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'category': category,
    'score': score,
    'totalQuestions': totalQuestions,
    'correctAnswers': correctAnswers,
    'incorrectAnswers': incorrectAnswers,
    'percentage': percentage,
    'date': date.toIso8601String(),
    'timeTakenSeconds': timeTakenSeconds,
    'selectedAnswers': selectedAnswers,
    'questionIds': questionIds,
  };

  factory QuizResultModel.fromJson(Map<String, dynamic> json) => QuizResultModel(
    id: json['id'] as String,
    category: json['category'] as String,
    score: json['score'] as int,
    totalQuestions: json['totalQuestions'] as int,
    correctAnswers: json['correctAnswers'] as int,
    incorrectAnswers: json['incorrectAnswers'] as int,
    percentage: (json['percentage'] as num).toDouble(),
    date: DateTime.parse(json['date'] as String),
    timeTakenSeconds: json['timeTakenSeconds'] as int,
    selectedAnswers: (json['selectedAnswers'] as List).map((e) => e as int?).toList(),
    questionIds: List<String>.from(json['questionIds'] as List),
  );
}
`,
  },
  {
    path: 'lib/services/storage_service.dart',
    name: 'storage_service.dart',
    folder: 'lib/services',
    language: 'dart',
    description: 'SharedPreferences persistence engine for custom questions, scores, and preferences.',
    content: `import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/question_model.dart';
import '../models/quiz_result_model.dart';

class StorageService {
  static const String _keyCustomQuestions = 'quizmaster_custom_questions';
  static const String _keyQuizHistory = 'quizmaster_quiz_history';
  static const String _keyBestScore = 'quizmaster_best_score';
  static const String _keyDarkMode = 'quizmaster_dark_mode';

  Future<bool> saveCustomQuestions(List<QuestionModel> questions) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonList = questions.map((q) => jsonEncode(q.toJson())).toList();
      return await prefs.setStringList(_keyCustomQuestions, jsonList);
    } catch (e) {
      return false;
    }
  }

  Future<List<QuestionModel>> loadCustomQuestions() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonList = prefs.getStringList(_keyCustomQuestions) ?? [];
      return jsonList
          .map((item) => QuestionModel.fromJson(jsonDecode(item) as Map<String, dynamic>))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<bool> saveQuizResult(QuizResultModel result) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final currentHistory = await loadQuizHistory();
      currentHistory.insert(0, result);

      final jsonList = currentHistory.map((r) => jsonEncode(r.toJson())).toList();
      await prefs.setStringList(_keyQuizHistory, jsonList);

      final currentBest = prefs.getInt(_keyBestScore) ?? 0;
      if (result.score > currentBest) {
        await prefs.setInt(_keyBestScore, result.score);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<List<QuizResultModel>> loadQuizHistory() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonList = prefs.getStringList(_keyQuizHistory) ?? [];
      return jsonList
          .map((item) => QuizResultModel.fromJson(jsonDecode(item) as Map<String, dynamic>))
          .toList();
    } catch (e) {
      return [];
    }
  }

  Future<bool> clearHistory() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return await prefs.remove(_keyQuizHistory);
    } catch (e) {
      return false;
    }
  }

  Future<int> loadBestScore() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getInt(_keyBestScore) ?? 0;
    } catch (e) {
      return 0;
    }
  }

  Future<bool> saveDarkModePreference(bool isDark) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return await prefs.setBool(_keyDarkMode, isDark);
    } catch (e) {
      return false;
    }
  }

  Future<bool> loadDarkModePreference() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getBool(_keyDarkMode) ?? false;
    } catch (e) {
      return false;
    }
  }
}
`,
  },
  {
    path: 'lib/services/quiz_service.dart',
    name: 'quiz_service.dart',
    folder: 'lib/services',
    language: 'dart',
    description: '35+ original questions across 7 categories and category registry.',
    content: `import '../models/category_model.dart';
import '../models/question_model.dart';

class QuizService {
  static List<CategoryModel> getDefaultCategories() {
    return const [
      CategoryModel(id: 'gk', name: 'General Knowledge', icon: 'lightbulb_outline', description: 'World facts, capitals, geography, and global trivia.', colorValue: 0xFF6750A4),
      CategoryModel(id: 'science', name: 'Science', icon: 'biotech', description: 'Physics, chemistry, astronomy, and biology discoveries.', colorValue: 0xFF0284C7),
      CategoryModel(id: 'math', name: 'Mathematics', icon: 'calculate', description: 'Algebra, arithmetic, geometry, and number puzzles.', colorValue: 0xFF10B981),
      CategoryModel(id: 'cs', name: 'Computer Science', icon: 'terminal', description: 'Data structures, algorithms, databases, and OS concepts.', colorValue: 0xFF4F46E5),
      CategoryModel(id: 'history', name: 'History', icon: 'history_edu', description: 'Ancient empires, world wars, revolutions, and leaders.', colorValue: 0xFFD97706),
      CategoryModel(id: 'sports', name: 'Sports', icon: 'sports_cricket', description: 'Cricket, football, Olympics, records, and championships.', colorValue: 0xFFE11D48),
      CategoryModel(id: 'tech', name: 'Technology', icon: 'memory', description: 'AI, mobile development, cloud computing, and gadgets.', colorValue: 0xFF7C3AED),
    ];
  }

  static List<QuestionModel> getInitialQuestions() {
    return const [
      QuestionModel(
        id: 'gk_1', category: 'gk',
        question: 'Which is the longest river in the world by total length?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswerIndex: 1,
        explanation: 'The Nile River in northeastern Africa is approximately 6,650 km long.',
      ),
      QuestionModel(
        id: 'gk_2', category: 'gk',
        question: 'In which Indian state is the prestigious IIT Madras located?',
        options: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Maharashtra'],
        correctAnswerIndex: 1,
        explanation: 'IIT Madras, founded in 1959, is located in Chennai, Tamil Nadu.',
      ),
      QuestionModel(
        id: 'sci_1', category: 'science',
        question: 'What is the chemical symbol for the element Gold?',
        options: ['Ag', 'Au', 'Gd', 'Fe'],
        correctAnswerIndex: 1,
        explanation: 'The symbol Au comes from the Latin word "Aurum".',
      ),
      QuestionModel(
        id: 'cs_1', category: 'cs',
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswerIndex: 2,
        explanation: 'Binary search halves search space repeatedly, yielding O(log n).',
      ),
      QuestionModel(
        id: 'tech_1', category: 'tech',
        question: 'Which company developed the Flutter UI framework and Dart language?',
        options: ['Apple', 'Microsoft', 'Google', 'Meta'],
        correctAnswerIndex: 2,
        explanation: 'Flutter and Dart were created by Google for cross-platform app engineering.',
      ),
    ];
  }
}
`,
  },
  {
    path: 'lib/providers/quiz_provider.dart',
    name: 'quiz_provider.dart',
    folder: 'lib/providers',
    language: 'dart',
    description: 'Central state hub managing active session, timer countdown, answers, custom questions, and results.',
    content: `import 'dart:async';
import 'package:flutter/material.dart';
import '../models/category_model.dart';
import '../models/question_model.dart';
import '../models/quiz_result_model.dart';
import '../services/quiz_service.dart';
import '../services/storage_service.dart';

class QuizProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();

  bool _isDarkMode = false;
  bool get isDarkMode => _isDarkMode;

  List<CategoryModel> _categories = [];
  List<QuestionModel> _allQuestions = [];
  List<QuestionModel> _customQuestions = [];

  List<CategoryModel> get categories => _categories;
  List<QuestionModel> get allQuestions => _allQuestions;
  List<QuestionModel> get customQuestions => _customQuestions;

  CategoryModel? _selectedCategory;
  List<QuestionModel> _activeQuizQuestions = [];
  int _currentQuestionIndex = 0;
  List<int?> _selectedAnswers = [];
  bool _isQuizCompleted = false;
  int _score = 0;
  int _timeTakenSeconds = 0;

  CategoryModel? get selectedCategory => _selectedCategory;
  List<QuestionModel> get activeQuizQuestions => _activeQuizQuestions;
  int get currentQuestionIndex => _currentQuestionIndex;
  List<int?> get selectedAnswers => _selectedAnswers;
  bool get isQuizCompleted => _isQuizCompleted;
  int get score => _score;
  int get timeTakenSeconds => _timeTakenSeconds;

  QuestionModel? get currentQuestion {
    if (_activeQuizQuestions.isEmpty || _currentQuestionIndex >= _activeQuizQuestions.length) return null;
    return _activeQuizQuestions[_currentQuestionIndex];
  }

  int get totalQuizQuestions => _activeQuizQuestions.length;

  static const int questionTimeLimit = 20;
  int _timeRemaining = questionTimeLimit;
  Timer? _timer;
  bool _isTimerRunning = false;

  int get timeRemaining => _timeRemaining;
  bool get isTimerRunning => _isTimerRunning;

  List<QuizResultModel> _quizHistory = [];
  int _bestScore = 0;

  List<QuizResultModel> get quizHistory => _quizHistory;
  int get bestScore => _bestScore;
  QuizResultModel? _lastQuizResult;
  QuizResultModel? get lastQuizResult => _lastQuizResult;

  QuizProvider() {
    _initData();
  }

  Future<void> _initData() async {
    _categories = QuizService.getDefaultCategories();
    _isDarkMode = await _storageService.loadDarkModePreference();
    _customQuestions = await _storageService.loadCustomQuestions();
    _allQuestions = [...QuizService.getInitialQuestions(), ..._customQuestions];
    _quizHistory = await _storageService.loadQuizHistory();
    _bestScore = await _storageService.loadBestScore();
    notifyListeners();
  }

  void toggleTheme() async {
    _isDarkMode = !_isDarkMode;
    await _storageService.saveDarkModePreference(_isDarkMode);
    notifyListeners();
  }

  int getQuestionCountForCategory(String categoryId) {
    return _allQuestions.where((q) => q.category == categoryId).length;
  }

  void startQuiz(CategoryModel category) {
    _selectedCategory = category;
    final categoryQuestions = _allQuestions.where((q) => q.category == category.id).toList();
    categoryQuestions.shuffle();
    _activeQuizQuestions = categoryQuestions.take(10).toList();
    _currentQuestionIndex = 0;
    _selectedAnswers = List<int?>.filled(_activeQuizQuestions.length, null);
    _isQuizCompleted = false;
    _score = 0;
    _timeTakenSeconds = 0;

    _startQuestionTimer();
    notifyListeners();
  }

  void _startQuestionTimer() {
    _timer?.cancel();
    _timeRemaining = questionTimeLimit;
    _isTimerRunning = true;

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timeRemaining > 0) {
        _timeRemaining--;
        _timeTakenSeconds++;
        notifyListeners();
      } else {
        handleTimeExpired();
      }
    });
  }

  void handleTimeExpired() {
    if (_currentQuestionIndex < _activeQuizQuestions.length - 1) {
      nextQuestion();
    } else {
      finishQuiz();
    }
  }

  void selectAnswer(int optionIndex) {
    if (_isQuizCompleted) return;
    _selectedAnswers[_currentQuestionIndex] = optionIndex;
    notifyListeners();
  }

  void nextQuestion() {
    if (_currentQuestionIndex < _activeQuizQuestions.length - 1) {
      _currentQuestionIndex++;
      _startQuestionTimer();
      notifyListeners();
    } else {
      finishQuiz();
    }
  }

  void previousQuestion() {
    if (_currentQuestionIndex > 0) {
      _currentQuestionIndex--;
      _startQuestionTimer();
      notifyListeners();
    }
  }

  void finishQuiz() {
    _timer?.cancel();
    _isTimerRunning = false;
    _isQuizCompleted = true;

    int calculatedScore = 0;
    int correctCount = 0;
    int incorrectCount = 0;

    for (int i = 0; i < _activeQuizQuestions.length; i++) {
      final selected = _selectedAnswers[i];
      final correct = _activeQuizQuestions[i].correctAnswerIndex;
      if (selected != null && selected == correct) {
        calculatedScore += 10;
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    _score = calculatedScore;
    final percentage = _activeQuizQuestions.isEmpty ? 0.0 : (correctCount / _activeQuizQuestions.length) * 100;

    final result = QuizResultModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      category: _selectedCategory?.name ?? 'General Quiz',
      score: _score,
      totalQuestions: _activeQuizQuestions.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      percentage: percentage,
      date: DateTime.now(),
      timeTakenSeconds: _timeTakenSeconds,
      selectedAnswers: List<int?>.from(_selectedAnswers),
      questionIds: _activeQuizQuestions.map((q) => q.id).toList(),
    );

    _lastQuizResult = result;
    _storageService.saveQuizResult(result);
    _quizHistory.insert(0, result);
    if (result.score > _bestScore) {
      _bestScore = result.score;
    }
    notifyListeners();
  }

  void restartQuiz() {
    if (_selectedCategory != null) startQuiz(_selectedCategory!);
  }

  void exitQuiz() {
    _timer?.cancel();
    _isTimerRunning = false;
    _isQuizCompleted = false;
    notifyListeners();
  }

  Future<bool> addCustomQuestion({
    required String question,
    required List<String> options,
    required int correctAnswerIndex,
    required String category,
    String explanation = '',
  }) async {
    final cleanQuestion = question.trim();
    if (cleanQuestion.isEmpty || options.length != 4) return false;
    if (options.any((opt) => opt.trim().isEmpty)) return false;

    final distinctOptions = options.map((o) => o.trim().toLowerCase()).toSet();
    if (distinctOptions.length != 4) return false;

    final newQuestion = QuestionModel(
      id: 'custom_\${DateTime.now().millisecondsSinceEpoch}',
      question: cleanQuestion,
      options: options.map((o) => o.trim()).toList(),
      correctAnswerIndex: correctAnswerIndex,
      category: category,
      explanation: explanation.trim().isNotEmpty ? explanation.trim() : 'Answer verified by user submission.',
      isCustom: true,
    );

    _customQuestions.add(newQuestion);
    _allQuestions.add(newQuestion);
    await _storageService.saveCustomQuestions(_customQuestions);
    notifyListeners();
    return true;
  }

  Future<void> clearHistory() async {
    await _storageService.clearHistory();
    _quizHistory.clear();
    notifyListeners();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}
`,
  },
  {
    path: 'test/widget_test.dart',
    name: 'widget_test.dart',
    folder: 'test',
    language: 'dart',
    description: 'Comprehensive test suite testing launch, navigation, quiz display, and form validation.',
    content: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:quizmaster/main.dart';
import 'package:quizmaster/providers/quiz_provider.dart';
import 'package:quizmaster/screens/home_screen.dart';
import 'package:quizmaster/screens/categories_screen.dart';
import 'package:quizmaster/screens/add_question_screen.dart';
import 'package:quizmaster/screens/quiz_screen.dart';

void main() {
  group('QuizMaster Application & Widget Tests', () {
    testWidgets('1. Application launches and displays splash screen branding', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [ChangeNotifierProvider(create: (_) => QuizProvider())],
          child: const QuizMasterApp(),
        ),
      );

      expect(find.text('QuizMaster'), findsWidgets);
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    testWidgets('2. Home screen displays dashboard cards and categories', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [ChangeNotifierProvider(create: (_) => QuizProvider())],
          child: const MaterialApp(home: HomeScreen()),
        ),
      );

      expect(find.text('Welcome, Scholar! 👋'), findsOneWidget);
      expect(find.text('PERSONAL BEST'), findsOneWidget);
      expect(find.text('Start Quick Quiz'), findsOneWidget);
      expect(find.text('Explore Categories'), findsOneWidget);
    });

    testWidgets('3. Categories screen displays categories and search filter works', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [ChangeNotifierProvider(create: (_) => QuizProvider())],
          child: const MaterialApp(home: CategoriesScreen()),
        ),
      );

      expect(find.text('Quiz Categories'), findsOneWidget);
      expect(find.byType(TextField), findsOneWidget);
      await tester.enterText(find.byType(TextField), 'Science');
      await tester.pumpAndSettle();
      expect(find.text('Science'), findsWidgets);
    });

    testWidgets('4. Quiz question screen renders question, timer, and 4 choices', (WidgetTester tester) async {
      final quizProvider = QuizProvider();
      if (quizProvider.categories.isNotEmpty) {
        quizProvider.startQuiz(quizProvider.categories.first);
      }

      await tester.pumpWidget(
        MultiProvider(
          providers: [ChangeNotifierProvider<QuizProvider>.value(value: quizProvider)],
          child: const MaterialApp(home: QuizScreen()),
        ),
      );

      expect(find.textContaining('QUESTION 1 OF'), findsOneWidget);
      expect(find.text('Next Question'), findsOneWidget);
    });

    testWidgets('5. Add question screen validates empty fields', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [ChangeNotifierProvider(create: (_) => QuizProvider())],
          child: const MaterialApp(home: AddQuestionScreen()),
        ),
      );

      await tester.tap(find.text('Save Question to Repository'));
      await tester.pumpAndSettle();
      expect(find.text('Question text cannot be empty.'), findsOneWidget);
    });
  });
}
`,
  },
  {
    path: 'DEFECT_LOG.md',
    name: 'DEFECT_LOG.md',
    folder: 'Root',
    language: 'markdown',
    description: 'Documented defect register and QA classification template for the college project demonstration.',
    content: `# QuizMaster - Software Defect Log

**Project Name:** QuizMaster Android Application  
**Programme:** Flutter Application Development Programme  
**Conducted By:** IITM Pravartak & BodhBridge Flutter Lab  
**Institution:** Kallam Haranadhareddy Institute of Technology (KHIT), Guntur  

| Defect ID | Description | Severity | Module | Root Cause | Status | Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEF-001** | Rapid taps on "Next Question" skipped questions. | Medium | quiz_screen.dart | Lack of debounce guard in transition. | Closed | Added boundary check & debounce flag. |
| **DEF-002** | Timer kept ticking after exiting quiz dialog. | High | quiz_provider.dart | Timer was not cancelled on pop. | Closed | Added explicit exitQuiz() hook. |
| **DEF-003** | Identical options allowed in custom question creator. | Medium | add_question_screen.dart | Only checked non-empty, not uniqueness. | Closed | Enforced Set uniqueness on all 4 options. |
| **DEF-004** | Low contrast in dark mode on AMOLED. | Low | answer_option.dart | Hardcoded grey values. | Closed | Bound to theme.colorScheme.onSurface. |
| **DEF-005** | Custom questions lost upon app termination. | Critical | storage_service.dart | Kept in-memory only. | Closed | Implemented SharedPreferences JSON storage. |
`,
  },
  {
    path: 'README.md',
    name: 'README.md',
    folder: 'Root',
    language: 'markdown',
    description: 'Full GitHub-ready documentation with architecture, setup, testing, release APK instructions, and team contributions.',
    content: `# QuizMaster – Modern Android Flutter Quiz Application

Flutter Group Project developed for the Flutter Application Development Programme conducted by IITM Pravartak & BodhBridge Flutter Lab for KHIT Guntur students.

## Quick Start
1. flutter pub get
2. flutter run
3. flutter test
4. flutter build apk --release
`,
  },
];
