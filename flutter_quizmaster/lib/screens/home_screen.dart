import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/quiz_provider.dart';
import '../widgets/category_card.dart';
import '../widgets/custom_button.dart';
import 'categories_screen.dart';
import 'quiz_screen.dart';
import 'history_screen.dart';
import 'add_question_screen.dart';

/// HomeScreen serves as the primary dashboard for QuizMaster, displaying overall statistics,
/// highest achieved score, quick category launchers, and navigation hubs.
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final quizProvider = Provider.of<QuizProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.quiz_rounded, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 10),
            const Text('QuizMaster'),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Toggle Theme',
            icon: Icon(
              quizProvider.isDarkMode ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
            ),
            onPressed: () => quizProvider.toggleTheme(),
          ),
          IconButton(
            tooltip: 'Quiz History',
            icon: const Icon(Icons.leaderboard_outlined),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const HistoryScreen()),
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome Header
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome, Scholar! 👋',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w800,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Ready to test your knowledge today?',
                    style: TextStyle(
                      fontSize: 14,
                      color: theme.textTheme.bodyMedium?.color?.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Best Score Banner Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20.0),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      theme.colorScheme.primary,
                      theme.colorScheme.secondary,
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: theme.colorScheme.primary.withOpacity(0.3),
                      blurRadius: 16,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Text(
                              'PERSONAL BEST',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            '${quizProvider.bestScore} Points',
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            quizProvider.quizHistory.isEmpty
                                ? 'Complete your first quiz to record a score'
                                : 'Total Attempts: ${quizProvider.quizHistory.length} quizzes',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.white.withOpacity(0.85),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.emoji_events_rounded,
                        color: Colors.amberAccent,
                        size: 34,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Primary "Start Quiz" Action
              CustomButton(
                text: 'Start Quick Quiz',
                icon: Icons.play_arrow_rounded,
                onPressed: () {
                  if (quizProvider.categories.isNotEmpty) {
                    quizProvider.startQuiz(quizProvider.categories.first);
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => const QuizScreen()),
                    );
                  }
                },
              ),
              const SizedBox(height: 24),

              // Categories Header with "View All"
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Explore Categories',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) => const CategoriesScreen()),
                      );
                    },
                    child: const Text('View All'),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Grid of Categories (Top 4 preview)
              GridView.builder(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 0.86,
                  crossAxisSpacing: 14,
                  mainAxisSpacing: 14,
                ),
                itemCount: quizProvider.categories.take(4).length,
                itemBuilder: (context, index) {
                  final cat = quizProvider.categories[index];
                  final qCount = quizProvider.getQuestionCountForCategory(cat.id);
                  return CategoryCard(
                    category: cat,
                    questionCount: qCount,
                    onStart: () {
                      quizProvider.startQuiz(cat);
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) => const QuizScreen()),
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: 24),

              // Quick Action Bar: Add Question & Leaderboard
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(builder: (context) => const AddQuestionScreen()),
                        );
                      },
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      icon: const Icon(Icons.add_circle_outline, size: 20),
                      label: const Text('Add Question'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(builder: (context) => const HistoryScreen()),
                        );
                      },
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      icon: const Icon(Icons.history_rounded, size: 20),
                      label: const Text('History'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Academic Attribution Footer
              Center(
                child: Text(
                  'IITM Pravartak & BodhBridge Flutter Lab · KHIT Guntur',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 11,
                    color: theme.textTheme.bodySmall?.color?.withOpacity(0.5),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
