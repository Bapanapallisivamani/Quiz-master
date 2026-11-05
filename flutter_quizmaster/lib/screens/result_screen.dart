import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/quiz_provider.dart';
import '../widgets/custom_button.dart';
import 'home_screen.dart';
import 'review_screen.dart';
import 'quiz_screen.dart';

/// ResultScreen celebrates quiz completion, presenting detailed scoring breakdowns,
/// percentage analytics, performance feedback badges, and routing options.
class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final quizProvider = Provider.of<QuizProvider>(context);
    final result = quizProvider.lastQuizResult;

    if (result == null) {
      return Scaffold(
        body: Center(
          child: CustomButton(
            text: 'Return Home',
            onPressed: () {
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => const HomeScreen()),
                (route) => false,
              );
            },
          ),
        ),
      );
    }

    final isGreatScore = result.percentage >= 70;
    final scoreColor = isGreatScore ? const Color(0xFF10B981) : const Color(0xFFF59E0B);

    return WillPopScope(
      onWillPop: () async {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const HomeScreen()),
          (route) => false,
        );
        return false;
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Quiz Results'),
          automaticallyImplyLeading: false,
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 10),

                // Celebration Badge Icon
                Container(
                  width: 90,
                  height: 90,
                  decoration: BoxDecoration(
                    color: scoreColor.withOpacity(0.12),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    isGreatScore ? Icons.military_tech_rounded : Icons.psychology_rounded,
                    size: 52,
                    color: scoreColor,
                  ),
                ),
                const SizedBox(height: 16),

                // Performance message
                Text(
                  result.performanceMessage,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Category: ${result.category}',
                  style: TextStyle(
                    fontSize: 14,
                    color: theme.textTheme.bodyMedium?.color?.withOpacity(0.7),
                  ),
                ),
                const SizedBox(height: 24),

                // Big Score Summary Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 24.0),
                    child: Column(
                      children: [
                        Text(
                          '${result.percentage.toStringAsFixed(1)}%',
                          style: TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.w900,
                            color: scoreColor,
                            letterSpacing: -1,
                          ),
                        ),
                        Text(
                          'Final Score: ${result.score} pts',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 20),
                        const Divider(),
                        const SizedBox(height: 16),

                        // 3-Metric Row: Total, Correct, Incorrect
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _buildStatItem(
                              context: context,
                              label: 'Questions',
                              value: '${result.totalQuestions}',
                              color: theme.colorScheme.onSurface,
                              icon: Icons.help_outline_rounded,
                            ),
                            _buildStatItem(
                              context: context,
                              label: 'Correct',
                              value: '${result.correctAnswers}',
                              color: const Color(0xFF10B981),
                              icon: Icons.check_circle_outline_rounded,
                            ),
                            _buildStatItem(
                              context: context,
                              label: 'Incorrect',
                              value: '${result.incorrectAnswers}',
                              color: const Color(0xFFEF4444),
                              icon: Icons.highlight_off_rounded,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 28),

                // Actions: Review Answers, Restart Quiz, Return Home
                CustomButton(
                  text: 'Review Answers',
                  icon: Icons.fact_check_outlined,
                  backgroundColor: theme.colorScheme.secondary,
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => ReviewScreen(
                          result: result,
                          questions: quizProvider.activeQuizQuestions,
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 12),
                CustomButton(
                  text: 'Restart Quiz',
                  icon: Icons.replay_rounded,
                  isOutlined: true,
                  onPressed: () {
                    quizProvider.restartQuiz();
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (context) => const QuizScreen()),
                    );
                  },
                ),
                const SizedBox(height: 12),
                TextButton.icon(
                  onPressed: () {
                    quizProvider.exitQuiz();
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (context) => const HomeScreen()),
                      (route) => false,
                    );
                  },
                  icon: const Icon(Icons.home_rounded),
                  label: const Text('Return to Home Dashboard'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStatItem({
    required BuildContext context,
    required String label,
    required String value,
    required Color color,
    required IconData icon,
  }) {
    return Column(
      children: [
        Icon(icon, color: color, size: 22),
        const SizedBox(height: 6),
        Text(
          value,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Theme.of(context).textTheme.bodySmall?.color?.withOpacity(0.7),
          ),
        ),
      ],
    );
  }
}
