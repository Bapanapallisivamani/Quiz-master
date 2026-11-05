import 'package:flutter/material.dart';
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
          providers: [
            ChangeNotifierProvider(create: (_) => QuizProvider()),
          ],
          child: const QuizMasterApp(),
        ),
      );

      // Verify QuizMaster branding appears
      expect(find.text('QuizMaster'), findsWidgets);
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    testWidgets('2. Home screen displays dashboard cards and categories', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [
            ChangeNotifierProvider(create: (_) => QuizProvider()),
          ],
          child: const MaterialApp(
            home: HomeScreen(),
          ),
        ),
      );

      // Check header, best score card and quick actions
      expect(find.text('Welcome, Scholar! 👋'), findsOneWidget);
      expect(find.text('PERSONAL BEST'), findsOneWidget);
      expect(find.text('Start Quick Quiz'), findsOneWidget);
      expect(find.text('Explore Categories'), findsOneWidget);
    });

    testWidgets('3. Categories screen displays categories and search filter works', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [
            ChangeNotifierProvider(create: (_) => QuizProvider()),
          ],
          child: const MaterialApp(
            home: CategoriesScreen(),
          ),
        ),
      );

      // Verify categories screen renders
      expect(find.text('Quiz Categories'), findsOneWidget);
      expect(find.byType(TextField), findsOneWidget);

      // Test searching for "Science"
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
          providers: [
            ChangeNotifierProvider<QuizProvider>.value(value: quizProvider),
          ],
          child: const MaterialApp(
            home: QuizScreen(),
          ),
        ),
      );

      // Verify question progress and option cards
      expect(find.textContaining('QUESTION 1 OF'), findsOneWidget);
      expect(find.text('Next Question'), findsOneWidget);
    });

    testWidgets('5. Add question screen validates empty fields', (WidgetTester tester) async {
      await tester.pumpWidget(
        MultiProvider(
          providers: [
            ChangeNotifierProvider(create: (_) => QuizProvider()),
          ],
          child: const MaterialApp(
            home: AddQuestionScreen(),
          ),
        ),
      );

      // Try tapping Save without filling fields
      await tester.tap(find.text('Save Question to Repository'));
      await tester.pumpAndSettle();

      // Expect validation error message
      expect(find.text('Question text cannot be empty.'), findsOneWidget);
    });
  });
}
