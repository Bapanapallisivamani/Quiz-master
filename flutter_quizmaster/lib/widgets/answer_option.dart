import 'package:flutter/material.dart';

/// AnswerOption renders an interactive multiple-choice answer card.
/// Supports normal selection, review feedback (correct/incorrect highlighting),
/// and keyboard/touch navigation.
class AnswerOption extends StatelessWidget {
  final int index;
  final String text;
  final bool isSelected;
  final bool isReviewMode;
  final bool isCorrectAnswer;
  final VoidCallback? onTap;

  const AnswerOption({
    super.key,
    required this.index,
    required this.text,
    required this.isSelected,
    this.isReviewMode = false,
    this.isCorrectAnswer = false,
    this.onTap,
  });

  String get _optionLetter {
    switch (index) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      default:
        return '${index + 1}';
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    // Determine colors based on state
    Color borderColor = theme.colorScheme.outlineVariant.withOpacity(0.5);
    Color backgroundColor = isDark ? const Color(0xFF1E1B2E) : Colors.white;
    Color textColor = theme.colorScheme.onSurface;
    Color badgeBgColor = theme.colorScheme.surfaceVariant;
    Color badgeTextColor = theme.colorScheme.onSurfaceVariant;
    Widget? trailingIcon;

    if (isReviewMode) {
      if (isCorrectAnswer) {
        borderColor = const Color(0xFF10B981);
        backgroundColor = const Color(0xFF10B981).withOpacity(0.12);
        badgeBgColor = const Color(0xFF10B981);
        badgeTextColor = Colors.white;
        trailingIcon = const Icon(Icons.check_circle_rounded, color: Color(0xFF10B981), size: 22);
      } else if (isSelected && !isCorrectAnswer) {
        borderColor = const Color(0xFFEF4444);
        backgroundColor = const Color(0xFFEF4444).withOpacity(0.12);
        badgeBgColor = const Color(0xFFEF4444);
        badgeTextColor = Colors.white;
        trailingIcon = const Icon(Icons.cancel_rounded, color: Color(0xFFEF4444), size: 22);
      }
    } else if (isSelected) {
      borderColor = theme.colorScheme.primary;
      backgroundColor = theme.colorScheme.primary.withOpacity(0.08);
      badgeBgColor = theme.colorScheme.primary;
      badgeTextColor = Colors.white;
      trailingIcon = Icon(Icons.radio_button_checked, color: theme.colorScheme.primary, size: 22);
    } else {
      trailingIcon = Icon(Icons.radio_button_off, color: theme.colorScheme.outlineVariant, size: 22);
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: isReviewMode ? null : onTap,
          borderRadius: BorderRadius.circular(16),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: backgroundColor,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: borderColor, width: isSelected ? 2 : 1),
            ),
            child: Row(
              children: [
                // Option letter badge (A, B, C, D)
                Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: badgeBgColor,
                    shape: BoxShape.circle,
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    _optionLetter,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: badgeTextColor,
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                // Option text
                Expanded(
                  child: Text(
                    text,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                      color: textColor,
                      height: 1.3,
                    ),
                  ),
                ),
                if (trailingIcon != null) ...[
                  const SizedBox(width: 10),
                  trailingIcon,
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
