import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/question_model.dart';
import '../models/quiz_result_model.dart';

/// StorageService encapsulates all local data persistence using SharedPreferences.
/// It safely encodes/decodes custom questions, quiz history, best scores, and user preferences.
class StorageService {
  static const String _keyCustomQuestions = 'quizmaster_custom_questions';
  static const String _keyQuizHistory = 'quizmaster_quiz_history';
  static const String _keyBestScore = 'quizmaster_best_score';
  static const String _keyDarkMode = 'quizmaster_dark_mode';

  /// Save custom questions created by the user
  Future<bool> saveCustomQuestions(List<QuestionModel> questions) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonList = questions.map((q) => jsonEncode(q.toJson())).toList();
      return await prefs.setStringList(_keyCustomQuestions, jsonList);
    } catch (e) {
      return false;
    }
  }

  /// Load custom questions from SharedPreferences
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

  /// Save a completed quiz result to history
  Future<bool> saveQuizResult(QuizResultModel result) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final currentHistory = await loadQuizHistory();
      currentHistory.insert(0, result); // Add newest first

      final jsonList = currentHistory.map((r) => jsonEncode(r.toJson())).toList();
      await prefs.setStringList(_keyQuizHistory, jsonList);

      // Check and update best score
      final currentBest = prefs.getInt(_keyBestScore) ?? 0;
      if (result.score > currentBest) {
        await prefs.setInt(_keyBestScore, result.score);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  /// Load all quiz history
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

  /// Clear quiz history
  Future<bool> clearHistory() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return await prefs.remove(_keyQuizHistory);
    } catch (e) {
      return false;
    }
  }

  /// Load best score achieved across all quizzes
  Future<int> loadBestScore() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getInt(_keyBestScore) ?? 0;
    } catch (e) {
      return 0;
    }
  }

  /// Save theme preference
  Future<bool> saveDarkModePreference(bool isDark) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return await prefs.setBool(_keyDarkMode, isDark);
    } catch (e) {
      return false;
    }
  }

  /// Load theme preference
  Future<bool> loadDarkModePreference() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getBool(_keyDarkMode) ?? false;
    } catch (e) {
      return false;
    }
  }
}
