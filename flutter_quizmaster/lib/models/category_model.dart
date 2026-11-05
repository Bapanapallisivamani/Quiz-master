/// CategoryModel represents a subject category in QuizMaster.
class CategoryModel {
  final String id;
  final String name;
  final String icon;
  final String description;
  final int colorValue;

  const CategoryModel({
    required this.id,
    required this.name,
    required this.icon,
    required this.description,
    required this.colorValue,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'icon': icon,
    'description': description,
    'colorValue': colorValue,
  };

  factory CategoryModel.fromJson(Map<String, dynamic> json) => CategoryModel(
    id: json['id'] as String,
    name: json['name'] as String,
    icon: json['icon'] as String,
    description: json['description'] as String,
    colorValue: json['colorValue'] as int,
  );
}
