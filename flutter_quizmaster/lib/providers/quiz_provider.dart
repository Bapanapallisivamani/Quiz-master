import 'dart:async';
import 'package:flutter/material.dart';
import '../models/category_model.dart';
import '../models/question_model.dart';
import '../models/quiz_result_model.dart';
import '../services/quiz_service.dart';
import '../services/storage_service.dart';

/// QuizProvider is the core state management hub using ChangeNotifier.
/// It orchestrates quiz flow, timer management, score calculation, answer tracking,
/// category management, custom questions, and persistence.
class QuizProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();

  // --- Theme State ---
  bool _isDarkMode = false;
  bool get isDarkMode => _isDarkMode;

  // --- Category and Question Repositories ---
  List<CategoryModel> _categories = [];
  List<QuestionModel> _allQuestions = [];
  List<QuestionModel> _customQuestions = [];

  List<CategoryModel> get categories => _categories;
  List<QuestionModel> get allQuestions => _allQuestions;
  List<QuestionModel> get customQuestions => _customQuestions;

  // --- Active Quiz Session State ---
  CategoryModel? _selectedCategory;
  List<QuestionModel> _activeQuizQuestions = [];
  int _currentQuestionIndex = 0;
  List<int?> _selectedAnswers = []; // null if unanswered
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
    if (_activeQuizQuestions.isEmpty || _currentQuestionIndex >= _activeQuizQuestions.length) {
      return null;
    }
    return _activeQuizQuestions[_currentQuestionIndex];
  }

  int get totalQuizQuestions => _activeQuizQuestions.length;

  // --- Timer State ---
  static const int questionTimeLimit = 20; // 20 seconds per question
  int _timeRemaining = questionTimeLimit;
  Timer? _timer;
  bool _isTimerRunning = false;

  int get timeRemaining => _timeRemaining;
  bool get isTimerRunning => _isTimerRunning;

  // --- History and Best Scores ---
  List<QuizResultModel> _quizHistory = [];
  int _bestScore = 0;

  List<QuizResultModel> get quizHistory => _quizHistory;
  int get bestScore => _bestScore;

  QuizResultModel? _lastQuizResult;
  QuizResultModel? get lastQuizResult => _lastQuizResult;

  // --- Initialization ---
  QuizProvider() {
    _initData();
  }

  Future<void> _initData() async {
    _categories = QuizService.getDefaultCategories();
    _isDarkMode = await _storageService.loadDarkModePreference();
    _customQuestions = await _storageService.loadCustomQuestions();

    // Combine base questions and saved custom questions
    _allQuestions = [
      ...QuizService.getInitialQuestions(),
      ..._customQuestions,
    ];

    _quizHistory = await _storageService.loadQuizHistory();
    _bestScore = await _storageService.loadBestScore();
    notifyListeners();
  }

  // --- Theme Toggle ---
  void toggleTheme() async {
    _isDarkMode = !_isDarkMode;
    await _storageService.saveDarkModePreference(_isDarkMode);
    notifyListeners();
  }

  // --- Question Counts per Category ---
  int getQuestionCountForCategory(String categoryId) {
    return _allQuestions.where((q) => q.category == categoryId).length;
  }

  // --- Quiz Session Control ---
  void startQuiz(CategoryModel category) {
    _selectedCategory = category;
    
    // Filter questions for this category
    final categoryQuestions = _allQuestions
        .where((q) => q.category == category.id)
        .toList();

    // Shuffle questions for randomized experience
    categoryQuestions.shuffle();

    // Take up to 10 questions per quiz
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
        // Time expired for this question
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
    
    // Prevent overriding if question answered (or allow changing prior to next)
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

    // Calculate score
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
    final percentage = _activeQuizQuestions.isEmpty
        ? 0.0
        : (correctCount / _activeQuizQuestions.length) * 100;

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
    _saveResult(result);
    notifyListeners();
  }

  Future<void> _saveResult(QuizResultModel result) async {
    await _storageService.saveQuizResult(result);
    _quizHistory.insert(0, result);
    if (result.score > _bestScore) {
      _bestScore = result.score;
    }
    notifyListeners();
  }

  void restartQuiz() {
    if (_selectedCategory != null) {
      startQuiz(_selectedCategory!);
    }
  }

  void exitQuiz() {
    _timer?.cancel();
    _isTimerRunning = false;
    _isQuizCompleted = false;
    _selectedCategory = null;
    _activeQuizQuestions = [];
    _selectedAnswers = [];
    notifyListeners();
  }

  // --- Add Custom Question ---
  Future<bool> addCustomQuestion({
    required String question,
    required List<String> options,
    required int correctAnswerIndex,
    required String category,
    String explanation = '',
  }) async {
    // Validation
    final cleanQuestion = question.trim();
    if (cleanQuestion.isEmpty) return false;
    if (options.length != 4) return false;
    if (options.any((opt) => opt.trim().isEmpty)) return false;

    // Check duplicate options
    final distinctOptions = options.map((o) => o.trim().toLowerCase()).toSet();
    if (distinctOptions.length != 4) return false;

    if (correctAnswerIndex < 0 || correctAnswerIndex > 3) return false;

    final newQuestion = QuestionModel(
      id: 'custom_${DateTime.now().millisecondsSinceEpoch}',
      question: cleanQuestion,
      options: options.map((o) => o.trim()).toList(),
      correctAnswerIndex: correctAnswerIndex,
      category: category,
      explanation: explanation.trim().isNotEmpty
          ? explanation.trim()
          : 'Answer verified by user submission.',
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
