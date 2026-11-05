import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/quiz_provider.dart';
import '../widgets/question_card.dart';
import '../widgets/answer_option.dart';
import '../widgets/progress_indicator.dart';
import 'result_screen.dart';

/// QuizScreen provides the core test-taking experience with active countdown timer,
/// question navigation, tactile option selection, and exit confirmation dialog.
class QuizScreen extends StatelessWidget {
  const QuizScreen({super.key});

  Future<bool> _showExitConfirmation(BuildContext context, QuizProvider provider) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Exit Quiz?'),
        content: const Text(
          'Are you sure you want to exit? Your progress in this quiz session will be lost.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
              foregroundColor: Colors.white,
            ),
            onPressed: () {
              provider.exitQuiz();
              Navigator.of(ctx).pop(true);
            },
            child: const Text('Exit Quiz'),
          ),
        ],
      ),
    );
    return result ?? false;
  }

  void _showSubmitConfirmation(BuildContext context, QuizProvider provider) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Submit Quiz?'),
        content: Text(
          'You have answered ${provider.selectedAnswers.where((a) => a != null).length} out of ${provider.totalQuizQuestions} questions. Do you want to submit your quiz now?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Review Answers'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              provider.finishQuiz();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const ResultScreen()),
              );
            },
            child: const Text('Submit Now'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final quizProvider = Provider.of<QuizProvider>(context);
    final question = quizProvider.currentQuestion;

    if (question == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Quiz')),
        body: const Center(child: Text('No questions available in this category.')),
      );
    }

    final isLastQuestion = quizProvider.currentQuestionIndex == quizProvider.totalQuizQuestions - 1;
    final isFirstQuestion = quizProvider.currentQuestionIndex == 0;
    final selectedOptionIndex = quizProvider.selectedAnswers[quizProvider.currentQuestionIndex];

    return WillPopScope(
      onWillPop: () => _showExitConfirmation(context, quizProvider),
      child: Scaffold(
        appBar: AppBar(
          title: Text(quizProvider.selectedCategory?.name ?? 'Quiz'),
          leading: IconButton(
            icon: const Icon(Icons.close_rounded),
            onPressed: () async {
              final shouldExit = await _showExitConfirmation(context, quizProvider);
              if (shouldExit && context.mounted) {
                Navigator.of(context).pop();
              }
            },
          ),
        ),
        body: SafeArea(
          child: Column(
            children: [
              // Progress & Timer Bar
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8.0),
                child: QuizProgressIndicator(
                  currentIndex: quizProvider.currentQuestionIndex,
                  totalQuestions: quizProvider.totalQuizQuestions,
                  timeRemaining: quizProvider.timeRemaining,
                  totalTime: QuizProvider.questionTimeLimit,
                ),
              ),

              // Question and Options
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      QuestionCard(
                        question: question,
                        currentIndex: quizProvider.currentQuestionIndex,
                        totalQuestions: quizProvider.totalQuizQuestions,
                      ),
                      const SizedBox(height: 20),

                      // Four Multiple Choice Options
                      ...List.generate(question.options.length, (optIdx) {
                        return AnswerOption(
                          index: optIdx,
                          text: question.options[optIdx],
                          isSelected: selectedOptionIndex == optIdx,
                          onTap: () {
                            quizProvider.selectAnswer(optIdx);
                          },
                        );
                      }),
                    ],
                  ),
                ),
              ),

              // Navigation Action Bar: Previous & Next / Submit
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
                decoration: BoxDecoration(
                  color: Theme.of(context).scaffoldBackgroundColor,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.04),
                      blurRadius: 10,
                      offset: const Offset(0, -4),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    if (!isFirstQuestion)
                      Expanded(
                        flex: 1,
                        child: OutlinedButton(
                          onPressed: () => quizProvider.previousQuestion(),
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.arrow_back_rounded, size: 18),
                              SizedBox(width: 6),
                              Text('Previous'),
                            ],
                          ),
                        ),
                      ),
                    if (!isFirstQuestion) const SizedBox(width: 12),
                    Expanded(
                      flex: 2,
                      child: ElevatedButton(
                        onPressed: () {
                          if (isLastQuestion) {
                            _showSubmitConfirmation(context, quizProvider);
                          } else {
                            quizProvider.nextQuestion();
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isLastQuestion
                              ? const Color(0xFF10B981)
                              : Theme.of(context).colorScheme.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              isLastQuestion ? 'Submit Quiz' : 'Next Question',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Icon(
                              isLastQuestion ? Icons.check_circle_outline : Icons.arrow_forward_rounded,
                              size: 18,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
