import 'package:flutter/material.dart';

class AppTheme {
  // Light Theme Colors
  static const Color lightPrimary = Color(0xFFFF9500);
  static const Color lightAccent = Color(0xFFFF6B35);
  static const Color lightBackground = Color(0xFFF5F5F5);
  static const Color lightCardBg = Color(0xFFFFFFFF);
  static const Color lightText = Color(0xFF000000);
  static const Color lightTextSecondary = Color(0xFF666666);
  static const Color lightBorder = Color(0xFFE0E0E0);

  // Dark Theme Colors
  static const Color darkPrimary = Color(0xFFFF9500);
  static const Color darkAccent = Color(0xFFFF6B35);
  static const Color darkBackground = Color(0xFF000000);
  static const Color darkCardBg = Color(0xFF1C1C1E);
  static const Color darkText = Color(0xFFFFFFFF);
  static const Color darkTextSecondary = Color(0xFF999999);
  static const Color darkBorder = Color(0xFF2C2C2E);

  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    primaryColor: lightPrimary,
    scaffoldBackgroundColor: lightBackground,
    colorScheme: const ColorScheme.light(
      primary: lightPrimary,
      secondary: lightAccent,
      surface: lightCardBg,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: lightBackground,
      foregroundColor: lightText,
      elevation: 0,
    ),
    cardTheme: CardThemeData(
      color: lightCardBg,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(color: lightText, fontWeight: FontWeight.bold),
      bodyLarge: TextStyle(color: lightText),
      bodyMedium: TextStyle(color: lightTextSecondary),
    ),
  );

  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    primaryColor: darkPrimary,
    scaffoldBackgroundColor: darkBackground,
    colorScheme: const ColorScheme.dark(
      primary: darkPrimary,
      secondary: darkAccent,
      surface: darkCardBg,
      background: darkBackground,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: darkBackground,
      foregroundColor: darkText,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      color: darkCardBg,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(color: darkText, fontWeight: FontWeight.bold),
      bodyLarge: TextStyle(color: darkText),
      bodyMedium: TextStyle(color: darkTextSecondary),
    ),
  );
}