import 'package:flutter/material.dart';
import '../models/question_model.dart';
import '../models/quiz_result_model.dart';
import '../widgets/answer_option.dart';

/// ReviewScreen allows learners to inspect every question answered during a quiz,
/// reviewing their selected answers against correct choices and reading educational explanations.
class ReviewScreen extends StatefulWidget {
  final QuizResultModel result;
  final List<QuestionModel> questions;

  const ReviewScreen({
    super.key,
    required this.result,
    required this.questions,
  });

  @override
  State<ReviewScreen> createState() => _ReviewScreenState();
}

class _ReviewScreenState extends State<ReviewScreen> {
  int _filterIndex = 0; // 0: All, 1: Correct, 2: Incorrect

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Filter questions based on filter selection
    final indexedQuestions = List.generate(widget.questions.length, (i) => i);
    final filteredIndices = indexedQuestions.where((i) {
      final selected = widget.result.selectedAnswers[i];
      final correct = widget.questions[i].correctAnswerIndex;
      final isCorrect = selected != null && selected == correct;

      if (_filterIndex == 1) return isCorrect;
      if (_filterIndex == 2) return !isCorrect;
      return true;
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Review Answers'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Filter Segmented Chips
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
              child: Row(
                children: [
                  _buildFilterTab(0, 'All (${widget.questions.length})'),
                  const SizedBox(width: 8),
                  _buildFilterTab(1, 'Correct (${widget.result.correctAnswers})'),
                  const SizedBox(width: 8),
                  _buildFilterTab(2, 'Incorrect (${widget.result.incorrectAnswers})'),
                ],
              ),
            ),
            const Divider(height: 1),

            // Question Review List
            Expanded(
              child: filteredIndices.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.check_circle_outline,
                            size: 50,
                            color: theme.colorScheme.primary.withOpacity(0.5),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            _filterIndex == 2
                                ? 'Flawless! No incorrect answers to review.'
                                : 'No questions in this filter.',
                            style: TextStyle(
                              fontSize: 14,
                              color: theme.textTheme.bodyMedium?.color?.withOpacity(0.7),
                            ),
                          ),
                        ],
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(20.0),
                      itemCount: filteredIndices.length,
                      itemBuilder: (context, index) {
                        final qIndex = filteredIndices[index];
                        final q = widget.questions[qIndex];
                        final selectedOpt = widget.result.selectedAnswers[qIndex];
                        final isCorrect = selectedOpt == q.correctAnswerIndex;

                        return Card(
                          margin: const EdgeInsets.only(bottom: 20.0),
                          child: Padding(
                            padding: const EdgeInsets.all(18.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: isCorrect
                                            ? const Color(0xFF10B981).withOpacity(0.12)
                                            : const Color(0xFFEF4444).withOpacity(0.12),
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Icon(
                                            isCorrect ? Icons.check_circle : Icons.cancel,
                                            size: 14,
                                            color: isCorrect ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                                          ),
                                          const SizedBox(width: 6),
                                          Text(
                                            isCorrect ? 'Correct' : 'Incorrect',
                                            style: TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                              color: isCorrect
                                                  ? const Color(0xFF10B981)
                                                  : const Color(0xFFEF4444),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Text(
                                      'Question ${qIndex + 1} of ${widget.questions.length}',
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: theme.textTheme.bodySmall?.color?.withOpacity(0.6),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 14),
                                Text(
                                  q.question,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    height: 1.3,
                                  ),
                                ),
                                const SizedBox(height: 16),

                                // Options Review
                                ...List.generate(q.options.length, (optIdx) {
                                  final isThisOptionSelected = selectedOpt == optIdx;
                                  final isThisOptionCorrect = q.correctAnswerIndex == optIdx;

                                  return AnswerOption(
                                    index: optIdx,
                                    text: q.options[optIdx],
                                    isSelected: isThisOptionSelected,
                                    isReviewMode: true,
                                    isCorrectAnswer: isThisOptionCorrect,
                                  );
                                }),

                                // Educational Explanation
                                if (q.explanation.isNotEmpty) ...[
                                  const SizedBox(height: 10),
                                  Container(
                                    width: double.infinity,
                                    padding: const EdgeInsets.all(14.0),
                                    decoration: BoxDecoration(
                                      color: theme.colorScheme.surfaceVariant.withOpacity(0.35),
                                      borderRadius: BorderRadius.circular(14),
                                    ),
                                    child: Row(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Icon(
                                          Icons.info_outline_rounded,
                                          size: 18,
                                          color: theme.colorScheme.primary,
                                        ),
                                        const SizedBox(width: 10),
                                        Expanded(
                                          child: Text(
                                            q.explanation,
                                            style: TextStyle(
                                              fontSize: 13,
                                              color: theme.textTheme.bodySmall?.color?.withOpacity(0.85),
                                              height: 1.4,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterTab(int index, String label) {
    final theme = Theme.of(context);
    final isSelected = _filterIndex == index;

    return Expanded(
      child: InkWell(
        onTap: () {
          setState(() {
            _filterIndex = index;
          });
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected
                ? theme.colorScheme.primary
                : theme.colorScheme.surfaceVariant.withOpacity(0.4),
            borderRadius: BorderRadius.circular(12),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
              color: isSelected ? Colors.white : theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
      ),
    );
  }
}
