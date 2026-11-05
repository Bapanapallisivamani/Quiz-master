/// QuestionModel represents a multiple-choice question in QuizMaster.
class QuestionModel {
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

  QuestionModel copyWith({
    String? id,
    String? question,
    List<String>? options,
    int? correctAnswerIndex,
    String? category,
    String? explanation,
    bool? isCustom,
  }) {
    return QuestionModel(
      id: id ?? this.id,
      question: question ?? this.question,
      options: options ?? this.options,
      correctAnswerIndex: correctAnswerIndex ?? this.correctAnswerIndex,
      category: category ?? this.category,
      explanation: explanation ?? this.explanation,
      isCustom: isCustom ?? this.isCustom,
    );
  }
}
