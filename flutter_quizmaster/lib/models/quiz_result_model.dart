/// QuizResultModel stores the outcome of a completed quiz session.
class QuizResultModel {
  final String id;
  final String category;
  final int score;
  final int totalQuestions;
  final int correctAnswers;
  final int incorrectAnswers;
  final double percentage;
  final DateTime date;
  final int timeTakenSeconds;
  final List<int?> selectedAnswers; // Index selected for each question
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

  String get formattedPercentage => '${percentage.toStringAsFixed(1)}%';

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
