import '../models/category_model.dart';
import '../models/question_model.dart';

/// QuizService provides standard categories and an initial repository of 35+
/// original questions across 7 core domains.
class QuizService {
  /// Default predefined categories with Material colors and icons
  static List<CategoryModel> getDefaultCategories() {
    return const [
      CategoryModel(
        id: 'gk',
        name: 'General Knowledge',
        icon: 'lightbulb_outline',
        description: 'World facts, capitals, geography, and global trivia.',
        colorValue: 0xFF6750A4,
      ),
      CategoryModel(
        id: 'science',
        name: 'Science',
        icon: 'biotech',
        description: 'Physics, chemistry, astronomy, and biology discoveries.',
        colorValue: 0xFF0284C7,
      ),
      CategoryModel(
        id: 'math',
        name: 'Mathematics',
        icon: 'calculate',
        description: 'Algebra, arithmetic, geometry, and number puzzles.',
        colorValue: 0xFF10B981,
      ),
      CategoryModel(
        id: 'cs',
        name: 'Computer Science',
        icon: 'terminal',
        description: 'Data structures, algorithms, databases, and OS concepts.',
        colorValue: 0xFF4F46E5,
      ),
      CategoryModel(
        id: 'history',
        name: 'History',
        icon: 'history_edu',
        description: 'Ancient empires, world wars, revolutions, and leaders.',
        colorValue: 0xFFD97706,
      ),
      CategoryModel(
        id: 'sports',
        name: 'Sports',
        icon: 'sports_cricket',
        description: 'Cricket, football, Olympics, records, and championships.',
        colorValue: 0xFFE11D48,
      ),
      CategoryModel(
        id: 'tech',
        name: 'Technology',
        icon: 'memory',
        description: 'AI, mobile development, cloud computing, and gadgets.',
        colorValue: 0xFF7C3AED,
      ),
    ];
  }

  /// 35+ Initial original sample questions (5 per category)
  static List<QuestionModel> getInitialQuestions() {
    return const [
      // --- GENERAL KNOWLEDGE ---
      QuestionModel(
        id: 'gk_1',
        category: 'gk',
        question: 'Which is the longest river in the world by total length?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswerIndex: 1,
        explanation: 'The Nile River in northeastern Africa is approximately 6,650 km long, traditionally considered the longest in the world.',
      ),
      QuestionModel(
        id: 'gk_2',
        category: 'gk',
        question: 'In which Indian state is the prestigious IIT Madras located?',
        options: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Maharashtra'],
        correctAnswerIndex: 1,
        explanation: 'IIT Madras (Indian Institute of Technology Madras), founded in 1959, is located in Chennai, Tamil Nadu.',
      ),
      QuestionModel(
        id: 'gk_3',
        category: 'gk',
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswerIndex: 2,
        explanation: 'Canberra was chosen as the compromise capital of Australia in 1908 between rivals Sydney and Melbourne.',
      ),
      QuestionModel(
        id: 'gk_4',
        category: 'gk',
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['South Korea', 'Japan', 'Norway', 'China'],
        correctAnswerIndex: 1,
        explanation: 'Japan is called "Nihon" or "Nippon" in Japanese, which literally translates to "origin of the sun".',
      ),
      QuestionModel(
        id: 'gk_5',
        category: 'gk',
        question: 'Who painted the famous masterpiece known as the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswerIndex: 2,
        explanation: 'Leonardo da Vinci painted the Mona Lisa during the Italian Renaissance between 1503 and 1519.',
      ),

      // --- SCIENCE ---
      QuestionModel(
        id: 'sci_1',
        category: 'science',
        question: 'What is the chemical symbol for the element Gold?',
        options: ['Ag', 'Au', 'Gd', 'Fe'],
        correctAnswerIndex: 1,
        explanation: 'The symbol Au comes from the Latin word "Aurum", which means shining dawn.',
      ),
      QuestionModel(
        id: 'sci_2',
        category: 'science',
        question: 'Which planet in our solar system has the highest number of recognized moons?',
        options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
        correctAnswerIndex: 1,
        explanation: 'Saturn has over 146 confirmed moons, holding the record for the most moons in the solar system.',
      ),
      QuestionModel(
        id: 'sci_3',
        category: 'science',
        question: 'What is the powerhouse organelle of the eukaryotic cell?',
        options: ['Ribosome', 'Nucleus', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswerIndex: 2,
        explanation: 'Mitochondria generate most of the chemical energy needed to power the cell\'s biochemical reactions (ATP).',
      ),
      QuestionModel(
        id: 'sci_4',
        category: 'science',
        question: 'What is the approximate speed of light in a vacuum?',
        options: ['150,000 km/s', '300,000 km/s', '450,000 km/s', '30,000 km/s'],
        correctAnswerIndex: 1,
        explanation: 'The speed of light in vacuum is exactly 299,792,458 m/s, approximately 300,000 km/s.',
      ),
      QuestionModel(
        id: 'sci_5',
        category: 'science',
        question: 'Which gas is most abundant in Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswerIndex: 2,
        explanation: 'Nitrogen makes up roughly 78.08% of Earth\'s atmosphere by volume.',
      ),

      // --- MATHEMATICS ---
      QuestionModel(
        id: 'math_1',
        category: 'math',
        question: 'What is the value of 2 to the power of 8 (2⁸)?',
        options: ['128', '256', '512', '64'],
        correctAnswerIndex: 1,
        explanation: '2 to the 8th power equals 256 (2 x 2 x 2 x 2 x 2 x 2 x 2 x 2).',
      ),
      QuestionModel(
        id: 'math_2',
        category: 'math',
        question: 'What is the only even prime number?',
        options: ['0', '1', '2', '4'],
        correctAnswerIndex: 2,
        explanation: '2 is the smallest and the only even prime number, having only divisors 1 and 2.',
      ),
      QuestionModel(
        id: 'math_3',
        category: 'math',
        question: 'What is the derivative of sin(x) with respect to x?',
        options: ['-sin(x)', 'cos(x)', '-cos(x)', 'tan(x)'],
        correctAnswerIndex: 1,
        explanation: 'By standard calculus differentiation rules, d/dx[sin(x)] = cos(x).',
      ),
      QuestionModel(
        id: 'math_4',
        category: 'math',
        question: 'What is the sum of interior angles in a convex pentagon?',
        options: ['360 degrees', '540 degrees', '720 degrees', '450 degrees'],
        correctAnswerIndex: 1,
        explanation: 'Formula is (n - 2) * 180°. For n = 5: (5 - 2) * 180° = 3 * 180° = 540°.',
      ),
      QuestionModel(
        id: 'math_5',
        category: 'math',
        question: 'If a right-angled triangle has legs of lengths 3 and 4, what is the hypotenuse?',
        options: ['5', '6', '7', '8'],
        correctAnswerIndex: 0,
        explanation: 'By the Pythagorean theorem: c² = 3² + 4² = 9 + 16 = 25, hence c = 5.',
      ),

      // --- COMPUTER SCIENCE ---
      QuestionModel(
        id: 'cs_1',
        category: 'cs',
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswerIndex: 2,
        explanation: 'Binary search halves the search space with each comparison step, yielding logarithmic O(log n) complexity.',
      ),
      QuestionModel(
        id: 'cs_2',
        category: 'cs',
        question: 'Which data structure follows the Last-In First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Linked List', 'Tree'],
        correctAnswerIndex: 1,
        explanation: 'A Stack processes the most recently pushed item first (Last-In First-Out).',
      ),
      QuestionModel(
        id: 'cs_3',
        category: 'cs',
        question: 'Which of the following is NOT an ACID property in DBMS transactions?',
        options: ['Atomicity', 'Consistency', 'Integrity', 'Durability'],
        correctAnswerIndex: 2,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
      ),
      QuestionModel(
        id: 'cs_4',
        category: 'cs',
        question: 'In object-oriented programming, what is the ability of an object to take many forms?',
        options: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction'],
        correctAnswerIndex: 1,
        explanation: 'Polymorphism (from Greek "many forms") allows methods to do different things based on the object.',
      ),
      QuestionModel(
        id: 'cs_5',
        category: 'cs',
        question: 'What protocol is used to securely transfer hypertext over the World Wide Web?',
        options: ['FTP', 'HTTP', 'HTTPS', 'SSH'],
        correctAnswerIndex: 2,
        explanation: 'HTTPS (HyperText Transfer Protocol Secure) encrypts data transferred using TLS/SSL.',
      ),

      // --- HISTORY ---
      QuestionModel(
        id: 'hist_1',
        category: 'history',
        question: 'In which year did India attain its independence from British rule?',
        options: ['1942', '1945', '1947', '1950'],
        correctAnswerIndex: 2,
        explanation: 'India won independence on August 15, 1947, following the Indian Independence Act passed by the British Parliament.',
      ),
      QuestionModel(
        id: 'hist_2',
        category: 'history',
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
        correctAnswerIndex: 1,
        explanation: 'George Washington served as the first U.S. President from 1789 to 1797.',
      ),
      QuestionModel(
        id: 'hist_3',
        category: 'history',
        question: 'Which ancient civilization built the monumental pyramids of Giza?',
        options: ['Ancient Rome', 'Mesopotamia', 'Ancient Egypt', 'Indus Valley'],
        correctAnswerIndex: 2,
        explanation: 'The ancient Egyptians constructed the Giza pyramids during the Old Kingdom Fourth Dynasty.',
      ),
      QuestionModel(
        id: 'hist_4',
        category: 'history',
        question: 'Which historic wall dividing a major European city fell in November 1989?',
        options: ['Great Wall of Hadrian', 'Berlin Wall', 'Vienna Wall', 'Roman Wall'],
        correctAnswerIndex: 1,
        explanation: 'The fall of the Berlin Wall on November 9, 1989, marked a pivotal moment in the end of the Cold War.',
      ),
      QuestionModel(
        id: 'hist_5',
        category: 'history',
        question: 'Which prominent ruler of the Maurya Empire renounced war after the Kalinga conquest?',
        options: ['Chandragupta Maurya', 'Bindusara', 'Ashoka the Great', 'Samudragupta'],
        correctAnswerIndex: 2,
        explanation: 'Emperor Ashoka embraced Buddhism and non-violence (Ahimsa) following the devastation of the Kalinga War in 261 BCE.',
      ),

      // --- SPORTS ---
      QuestionModel(
        id: 'spo_1',
        category: 'sports',
        question: 'Which nation won the inaugural ICC Men\'s T20 World Cup in 2007?',
        options: ['Pakistan', 'Australia', 'India', 'West Indies'],
        correctAnswerIndex: 2,
        explanation: 'India, captained by MS Dhoni, defeated Pakistan in an unforgettable final at the Wanderers in Johannesburg.',
      ),
      QuestionModel(
        id: 'spo_2',
        category: 'sports',
        question: 'How many players are on the field for one team in a standard soccer match?',
        options: ['9', '10', '11', '12'],
        correctAnswerIndex: 2,
        explanation: 'A regulation football/soccer team has 11 players on the pitch, including one goalkeeper.',
      ),
      QuestionModel(
        id: 'spo_3',
        category: 'sports',
        question: 'Who holds the world record for the 100m sprint with a time of 9.58 seconds?',
        options: ['Tyson Gay', 'Usain Bolt', 'Carl Lewis', 'Yohan Blake'],
        correctAnswerIndex: 1,
        explanation: 'Usain Bolt set the 9.58-second 100m world record at the 2009 World Athletics Championships in Berlin.',
      ),
      QuestionModel(
        id: 'spo_4',
        category: 'sports',
        question: 'In tennis, what term is used for a score of zero points?',
        options: ['Fault', 'Deuce', 'Love', 'Nil'],
        correctAnswerIndex: 2,
        explanation: 'In tennis scoring, "Love" denotes zero, thought to derive from the French word "l\'oeuf" (egg).',
      ),
      QuestionModel(
        id: 'spo_5',
        category: 'sports',
        question: 'Where were the ancient Olympic Games first held?',
        options: ['Athens', 'Olympia', 'Sparta', 'Rome'],
        correctAnswerIndex: 1,
        explanation: 'The ancient games were held every four years at the sanctuary of Zeus in Olympia, Greece from 776 BCE.',
      ),

      // --- TECHNOLOGY ---
      QuestionModel(
        id: 'tech_1',
        category: 'tech',
        question: 'Which company developed the Flutter UI framework and Dart language?',
        options: ['Apple', 'Microsoft', 'Google', 'Meta'],
        correctAnswerIndex: 2,
        explanation: 'Flutter and Dart were created by Google to enable beautiful, natively compiled multi-platform applications.',
      ),
      QuestionModel(
        id: 'tech_2',
        category: 'tech',
        question: 'What is the primary function of a ChangeNotifier in Flutter\'s Provider package?',
        options: [
          'Store data permanently in SQLite',
          'Notify listeners/widgets when state changes occur',
          'Compile Dart code into native ARM assembly',
          'Handle HTTP network requests',
        ],
        correctAnswerIndex: 1,
        explanation: 'ChangeNotifier implements notifyListeners(), alerting subscribed UI consumer widgets to rebuild when data changes.',
      ),
      QuestionModel(
        id: 'tech_3',
        category: 'tech',
        question: 'What does API stand for in software engineering?',
        options: [
          'Application Programming Interface',
          'Automated Program Integration',
          'Advanced Processing Instruction',
          'Applied Python Implementation',
        ],
        correctAnswerIndex: 0,
        explanation: 'API stands for Application Programming Interface, defining contract interactions between software systems.',
      ),
      QuestionModel(
        id: 'tech_4',
        category: 'tech',
        question: 'Which design version is currently standard in modern Android Flutter apps?',
        options: ['Material 1', 'Material 2', 'Material 3', 'Neumorphism'],
        correctAnswerIndex: 2,
        explanation: 'Material 3 (Material You) provides dynamic color seeding, refreshed typography, and fluid rounded components.',
      ),
      QuestionModel(
        id: 'tech_5',
        category: 'tech',
        question: 'What does Git commit do in a version control workflow?',
        options: [
          'Deletes the local branch',
          'Uploads files directly to GitHub',
          'Records snapshots of staged changes to the repository',
          'Merges remote conflicts automatically',
        ],
        correctAnswerIndex: 2,
        explanation: 'A git commit records a permanent snapshot of staged project changes into the local repository history.',
      ),
    ];
  }
}
