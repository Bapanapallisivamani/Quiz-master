# QuizMaster – Modern Android Flutter Quiz Application

![Flutter](https://img.shields.io/badge/Flutter-3.35%2B-02569B?logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-3.3%2B-0175C2?logo=dart&logoColor=white)
![Material 3](https://img.shields.io/badge/Design-Material%203-6750A4?logo=material-design&logoColor=white)
![Provider](https://img.shields.io/badge/State-Provider%206.1-4F46E5)
![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android&logoColor=white)

**QuizMaster** is a complete, modern, fully functional Android quiz application developed as a group project for the **Flutter Application Development Programme** conducted by **IITM Pravartak** and **BodhBridge Flutter Lab** for students of **Kallam Haranadhareddy Institute of Technology (KHIT), Guntur**.

---

## 📱 Project Overview

QuizMaster empowers students and competitive exam aspirants to test their mastery across diverse academic and technical disciplines. It combines an engaging Material 3 interface, persistent question authoring, real-time timer constraints, interactive review feedback, and local storage retention.

### Key Capabilities
- **7 Comprehensive Disciplines:** General Knowledge, Science, Mathematics, Computer Science, History, Sports, and Technology with 35+ original questions.
- **Dynamic Quiz Engine:** Randomized question ordering, 20-second per-question countdown timer with visual and auditory thresholds, and tactile 4-option selection.
- **Answer Review System:** Post-quiz analysis highlighting user choices vs. verified correct answers with detailed educational explanations.
- **Custom Question Creator:** Validated form with real-time error prevention (empty fields, identical duplicate options, category tagging) and permanent persistence.
- **Persistent Analytics:** Retains best scores, attempt logs, accuracy percentages, and theme preferences across device restarts via `SharedPreferences`.
- **Dual-Theme Support:** Material 3 Purple & Blue seed palette with seamless Light and Dark modes.

---

## 🏛️ Project Architecture

The codebase strictly adheres to clean architectural separation of concerns:

```
lib/
├── main.dart                      # Application root, Provider injection & theme binding
├── models/
│   ├── category_model.dart        # Quiz category schema & JSON serialization
│   ├── question_model.dart        # Question entity with options, correct index & explanation
│   └── quiz_result_model.dart     # Completed session metrics, accuracy & timestamp
├── providers/
│   └── quiz_provider.dart         # ChangeNotifier managing active session, timer, history & questions
├── services/
│   ├── quiz_service.dart          # Default 35+ question bank & category registry
│   └── storage_service.dart       # SharedPreferences persistence layer (JSON encoder/decoder)
├── screens/
│   ├── splash_screen.dart         # Animated entrance with KHIT & IITM Pravartak attribution
│   ├── home_screen.dart           # Dashboard with personal best, quick launch & stat cards
│   ├── categories_screen.dart     # Category browser with live search and question counts
│   ├── quiz_screen.dart           # Question card, countdown timer, options & exit guard
│   ├── result_screen.dart         # Performance score, percentage, statistics & routing
│   ├── review_screen.dart         # Detailed question breakdown with filter tabs (All/Correct/Incorrect)
│   ├── history_screen.dart        # Persistent attempt logs with highest score highlighting
│   └── add_question_screen.dart   # Validated custom question authoring form
├── widgets/
│   ├── category_card.dart         # Rounded Material 3 topic card with icon and count
│   ├── answer_option.dart         # Interactive option button with review feedback states
│   ├── question_card.dart         # Prominent question presentation card
│   ├── custom_button.dart         # Primary and outlined elevated button components
│   └── progress_indicator.dart    # Synchronized linear question progress and countdown timer
└── theme/
    └── app_theme.dart             # Material 3 seed color schemes (Light and Dark)

test/
└── widget_test.dart               # Complete Flutter test suite testing all screens & flows
```

---

## 🚀 Getting Started

### Prerequisites
- **Flutter SDK:** Version 3.35.0 or newer
- **Dart SDK:** Version 3.3.0 or newer (with sound null safety)
- **Android Studio:** Ladybug / Hedgehog or newer with Android SDK Build-Tools 34+
- **JDK:** OpenJDK 17 or higher

### Installation & Run

1. **Clone or Extract the Project:**
   ```bash
   cd flutter_quizmaster
   ```

2. **Install Flutter Dependencies:**
   ```bash
   flutter pub get
   ```

3. **Verify Flutter Environment:**
   ```bash
   flutter doctor
   ```

4. **Launch the Application on Android Device / Emulator:**
   ```bash
   flutter run
   ```

---

## 🧪 Automated Testing

The project includes automated widget tests that verify:
- Initial launch and branding presentation.
- Home screen dashboard and navigation hooks.
- Category search filtering.
- Quiz question display and option selection.
- Add Custom Question form validation (empty inputs, duplicate choices).

Run the tests using:
```bash
flutter test
```

Expected output:
```
00:02 +5: All tests passed!
```

---

## 📦 Generating a Release APK

To produce a production-ready, standalone Android APK for submission or physical device installation:

### 1. Build Standard Release APK
Run the following command in the project root:
```bash
flutter build apk --release
```

The compiled APK will be generated at:
```
build/app/outputs/flutter-apk/app-release.apk
```

### 2. Build Split-Per-ABI APKs (Smaller file size for Android architectures):
```bash
flutter build apk --split-per-abi
```
This produces optimized APKs for `armeabi-v7a`, `arm64-v8a`, and `x86_64`.

### 3. Signing the Release APK (Optional for Google Play / Formal Submission)
1. Generate an upload keystore:
   ```bash
   keytool -genkey -v -keystore android/app/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```
2. Create `android/key.properties` with keystore credentials:
   ```properties
   storePassword=yourStorePassword
   keyPassword=yourKeyPassword
   keyAlias=upload
   storeFile=upload-keystore.jks
   ```
3. Reference `key.properties` in `android/app/build.gradle`.

---

## 📸 Screen Gallery & Flow

1. **Splash Screen:** Animated QuizMaster logo with IITM Pravartak & BodhBridge Flutter Lab accreditation.
2. **Dashboard (Home):** Personal Best score banner, active category previews, and quick quiz launcher.
3. **Categories Browser:** 7 color-coded disciplines with search query bar and question tallies.
4. **Quiz Interface:** 20-second dynamic timer, animated progress bar, single-choice option selectors, and confirmation guards.
5. **Results & Analytics:** Circular score indicator, percentage, performance feedback badge, and retry CTA.
6. **Answer Review:** Filterable question-by-question review showing selected answer, correct choice, and explanation.
7. **Score History / Leaderboard:** Chronological attempt history persisted in SharedPreferences with highest score badge.
8. **Question Creator:** Robust authoring tool with input validation, preventing duplicate options or missing answers.

---

## 👥 Student Team & Contributions

**Institution:** Kallam Haranadhareddy Institute of Technology (KHIT), Guntur  
**Programme:** Flutter Application Development Programme  
**Mentors:** IITM Pravartak & BodhBridge Flutter Lab  

| Team Member | Roll / Register Number | Primary Contribution |
| :--- | :--- | :--- |
| **Team Member 1** | `248X1A0514` | Project Architecture, State Management (`QuizProvider`), Custom Question Validation & Local Storage (`StorageService`) |
| **Team Member 2** | `248X1A05xx` | Material 3 UI/UX Design System (`AppTheme`), `QuizScreen`, `AnswerOption` and Timer Logic |
| **Team Member 3** | `248X1A05xx` | `HomeScreen`, `CategoriesScreen`, Question Bank Curation (35+ Questions) & Review System |
| **Team Member 4** | `248X1A05xx` | Widget Testing (`widget_test.dart`), Defect Logging, APK Release Compilation & Documentation |

---

## 📄 License & Academic Attribution
Developed for academic demonstration as part of the IITM Pravartak & BodhBridge Flutter Lab training initiative.  
SPDX-License-Identifier: Apache-2.0
