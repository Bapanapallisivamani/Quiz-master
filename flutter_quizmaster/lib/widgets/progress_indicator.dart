import 'package:flutter/material.dart';

/// QuizProgressIndicator renders the dual quiz progress bar and animated timer pill.
class QuizProgressIndicator extends StatelessWidget {
  final int currentIndex;
  final int totalQuestions;
  final int timeRemaining;
  final int totalTime;

  const QuizProgressIndicator({
    super.key,
    required this.currentIndex,
    required this.totalQuestions,
    required this.timeRemaining,
    this.totalTime = 20,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final questionProgress = totalQuestions > 0 ? (currentIndex + 1) / totalQuestions : 0.0;
    final timePercent = totalTime > 0 ? timeRemaining / totalTime : 0.0;

    Color timerColor = theme.colorScheme.primary;
    if (timeRemaining <= 5) {
      timerColor = const Color(0xFFEF4444); // Red alert
    } else if (timeRemaining <= 10) {
      timerColor = const Color(0xFFF59E0B); // Amber warning
    }

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Linear progress indicator for question count
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: LinearProgressIndicator(
                  value: questionProgress,
                  minHeight: 8,
                  backgroundColor: theme.colorScheme.outlineVariant.withOpacity(0.3),
                  valueColor: AlwaysStoppedAnimation<Color>(theme.colorScheme.primary),
                ),
              ),
            ),
            const SizedBox(width: 16),
            // Timer pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: timerColor.withOpacity(0.12),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: timerColor.withOpacity(0.3)),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.timer_outlined,
                    size: 16,
                    color: timerColor,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    '${timeRemaining}s',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: timerColor,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
