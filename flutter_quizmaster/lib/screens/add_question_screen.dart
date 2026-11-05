import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/quiz_provider.dart';
import '../widgets/custom_button.dart';

/// AddQuestionScreen provides a validated Material 3 form allowing users to
/// create, validate, and persist custom multiple-choice questions into local storage.
class AddQuestionScreen extends StatefulWidget {
  const AddQuestionScreen({super.key});

  @override
  State<AddQuestionScreen> createState() => _AddQuestionScreenState();
}

class _AddQuestionScreenState extends State<AddQuestionScreen> {
  final _formKey = GlobalKey<FormState>();
  final _questionController = TextEditingController();
  final List<TextEditingController> _optionControllers = List.generate(
    4,
    (_) => TextEditingController(),
  );
  final _explanationController = TextEditingController();

  String _selectedCategory = 'gk';
  int _correctAnswerIndex = 0;
  bool _isSaving = false;

  @override
  void dispose() {
    _questionController.dispose();
    for (var c in _optionControllers) {
      c.dispose();
    }
    _explanationController.dispose();
    super.dispose();
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    // Duplicate option check
    final rawOptions = _optionControllers.map((c) => c.text.trim().toLowerCase()).toList();
    final uniqueSet = rawOptions.toSet();
    if (uniqueSet.length != 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('All 4 answer options must be distinct and non-identical!'),
          backgroundColor: Colors.redAccent,
        ),
      );
      return;
    }

    setState(() {
      _isSaving = true;
    });

    final quizProvider = Provider.of<QuizProvider>(context, listen: false);

    final success = await quizProvider.addCustomQuestion(
      question: _questionController.text.trim(),
      options: _optionControllers.map((c) => c.text.trim()).toList(),
      correctAnswerIndex: _correctAnswerIndex,
      category: _selectedCategory,
      explanation: _explanationController.text.trim(),
    );

    setState(() {
      _isSaving = false;
    });

    if (mounted) {
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Question saved successfully and added to quiz pool!'),
            backgroundColor: Color(0xFF10B981),
          ),
        );
        Navigator.of(context).pop();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to save question. Please verify all fields.'),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final quizProvider = Provider.of<QuizProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Custom Question'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Academic tip note
                Container(
                  padding: const EdgeInsets.all(14.0),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: theme.colorScheme.primary.withOpacity(0.2)),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.lightbulb_rounded, color: theme.colorScheme.primary, size: 22),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          'Questions added here are persisted in local storage and instantly included in quizzes.',
                          style: TextStyle(
                            fontSize: 12,
                            color: theme.textTheme.bodyMedium?.color?.withOpacity(0.85),
                            height: 1.3,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Category Selector
                Text(
                  'Select Category',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: _selectedCategory,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.category_outlined),
                  ),
                  items: quizProvider.categories.map((cat) {
                    return DropdownMenuItem(
                      value: cat.id,
                      child: Text(cat.name),
                    );
                  }).toList(),
                  onChanged: (val) {
                    if (val != null) {
                      setState(() {
                        _selectedCategory = val;
                      });
                    }
                  },
                ),
                const SizedBox(height: 20),

                // Question Text Field
                Text(
                  'Question Text',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _questionController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: 'Enter your question clearly (e.g. What is the time complexity of QuickSort?)...',
                    alignLabelWithHint: true,
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'Question text cannot be empty.';
                    }
                    if (value.trim().length < 8) {
                      return 'Question must be at least 8 characters long.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),

                // Answer Options Header
                Text(
                  'Answer Options & Correct Answer',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Tap the radio button next to the option that is the correct answer.',
                  style: TextStyle(
                    fontSize: 12,
                    color: theme.textTheme.bodySmall?.color?.withOpacity(0.7),
                  ),
                ),
                const SizedBox(height: 12),

                // Four Options with Radio Selectors
                ...List.generate(4, (index) {
                  final letter = String.fromCharCode(65 + index); // A, B, C, D
                  final isSelected = _correctAnswerIndex == index;

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Radio button for correct answer
                        InkWell(
                          onTap: () {
                            setState(() {
                              _correctAnswerIndex = index;
                            });
                          },
                          borderRadius: BorderRadius.circular(20),
                          child: Padding(
                            padding: const EdgeInsets.only(top: 10.0, right: 8.0),
                            child: Icon(
                              isSelected ? Icons.check_circle_rounded : Icons.radio_button_off_rounded,
                              color: isSelected ? const Color(0xFF10B981) : theme.colorScheme.outlineVariant,
                              size: 26,
                            ),
                          ),
                        ),
                        // Text field for option
                        Expanded(
                          child: TextFormField(
                            controller: _optionControllers[index],
                            decoration: InputDecoration(
                              labelText: 'Option $letter ${isSelected ? "(Correct Answer)" : ""}',
                              labelStyle: TextStyle(
                                color: isSelected ? const Color(0xFF10B981) : null,
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                              ),
                              prefixIcon: Container(
                                width: 32,
                                alignment: Alignment.center,
                                child: Text(
                                  letter,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: isSelected ? const Color(0xFF10B981) : theme.colorScheme.primary,
                                  ),
                                ),
                              ),
                            ),
                            validator: (val) {
                              if (val == null || val.trim().isEmpty) {
                                return 'Option $letter is required.';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),
                  );
                }),
                const SizedBox(height: 12),

                // Explanation / Reference (Optional)
                Text(
                  'Explanation (Optional but Recommended)',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _explanationController,
                  maxLines: 2,
                  decoration: const InputDecoration(
                    hintText: 'Explain why the correct answer is right for the review screen...',
                  ),
                ),
                const SizedBox(height: 28),

                // Save Question CTA
                CustomButton(
                  text: _isSaving ? 'Saving Question...' : 'Save Question to Repository',
                  icon: Icons.save_rounded,
                  onPressed: _isSaving ? null : _submitForm,
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
