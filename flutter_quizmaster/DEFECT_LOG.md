# QuizMaster - Software Defect Log

**Project Name:** QuizMaster Android Application  
**Programme:** Flutter Application Development Programme  
**Conducted By:** IITM Pravartak & BodhBridge Flutter Lab  
**Institution:** Kallam Haranadhareddy Institute of Technology (KHIT), Guntur  
**Date:** March 2026  

---

## Defect Log Register

| Defect ID | Description | Severity | Module / Screen | Steps to Reproduce | Root Cause | Status | Resolution / Fix Details |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEF-001** | Rapid consecutive taps on "Next Question" caused skipped questions. | Medium | `quiz_screen.dart` | Tap the "Next" button twice in quick succession (<100ms). | Lack of debouncing and index clamp in state transitions. | **Closed** | Added active transition flag and bound checking inside `QuizProvider.nextQuestion()`. |
| **DEF-002** | Timer continued counting down after user exited quiz dialog. | High | `quiz_provider.dart` | Open a quiz, tap back button, confirm exit, check background timers. | `_timer?.cancel()` was not invoked on route exit callback. | **Closed** | Added `provider.exitQuiz()` to dialog confirmation and overridden `dispose()` to cancel active periodic timers. |
| **DEF-003** | User could enter identical options (e.g. Option A = Option B) in custom questions. | Medium | `add_question_screen.dart` | Enter "Apple" for both Option A and Option B, tap Save. | Form validator only checked for non-empty text, not uniqueness. | **Closed** | Implemented Set-based distinctness validation checking that `options.toSet().length == 4`. |
| **DEF-004** | Dark mode text in answer options had low contrast on AMOLED screens. | Low | `answer_option.dart` | Switch to dark theme in Home screen, start quiz. | Hardcoded surface text color did not adapt to Theme `onSurface`. | **Closed** | Replaced hardcoded grey values with `theme.colorScheme.onSurface` and `theme.colorScheme.outlineVariant`. |
| **DEF-005** | Custom questions were lost when app was terminated and relaunched. | Critical | `storage_service.dart` | Add a custom question, force-kill app from Android task switcher, reopen. | Custom questions were only stored in in-memory list. | **Closed** | Connected `saveCustomQuestions()` and `loadCustomQuestions()` using `SharedPreferences` JSON serialization on startup. |
| **DEF-006** | Question text wrapping clipped on small screen devices (e.g. 4.7-inch displays). | Low | `question_card.dart` | Run app on 720p 4.7" emulator, view question with >120 characters. | Missing flexible container and constrained vertical height. | **Closed** | Wrapped question cards in single scroll views and used auto-wrapping Text widgets with proportional line height (1.4). |

---

## Defect Severity Classifications

1. **Critical**: App crashes, data corruption, or inability to launch or complete a quiz.
2. **High**: Core functionality failure (e.g. timer not stopping, scores not saving to local storage).
3. **Medium**: Edge-case logic defects, form validation oversights, or improper state transitions.
4. **Low**: UI layout clipping, minor contrast issues, or non-blocking cosmetic defects.

---

## Quality Assurance Sign-Off

- **Lead QA Engineer:** Student Team Member 1 (KHIT Guntur)
- **Development Lead:** Student Team Member 2 (KHIT Guntur)
- **Programme Mentor:** IITM Pravartak / BodhBridge Mentor
- **Sign-off Date:** March 2026
