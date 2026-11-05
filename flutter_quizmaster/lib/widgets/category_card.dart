import 'package:flutter/material.dart';
import '../models/category_model.dart';

/// CategoryCard renders an interactive Material 3 card representing a quiz topic,
/// featuring custom category color accent, icon avatar, question counter, and tap action.
class CategoryCard extends StatelessWidget {
  final CategoryModel category;
  final int questionCount;
  final VoidCallback onStart;

  const CategoryCard({
    super.key,
    required this.category,
    required this.questionCount,
    required this.onStart,
  });

  IconData _getIconData(String iconName) {
    switch (iconName) {
      case 'lightbulb_outline':
        return Icons.lightbulb_outline;
      case 'biotech':
        return Icons.biotech;
      case 'calculate':
        return Icons.calculate;
      case 'terminal':
        return Icons.terminal;
      case 'history_edu':
        return Icons.history_edu;
      case 'sports_cricket':
        return Icons.sports_cricket;
      case 'memory':
        return Icons.memory;
      default:
        return Icons.quiz_outlined;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final accentColor = Color(category.colorValue);

    return InkWell(
      onTap: onStart,
      borderRadius: BorderRadius.circular(20),
      child: Card(
        margin: EdgeInsets.zero,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: accentColor.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Icon(
                      _getIconData(category.icon),
                      color: accentColor,
                      size: 26,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.surfaceVariant.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '$questionCount Qs',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    category.name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    category.description,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 12,
                      color: theme.textTheme.bodySmall?.color?.withOpacity(0.8),
                      height: 1.3,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Text(
                    'Start Quiz',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: accentColor,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Icon(
                    Icons.arrow_forward_rounded,
                    size: 16,
                    color: accentColor,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
