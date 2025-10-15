import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/article.dart';
import '../config/constants.dart';

class BookmarkProvider with ChangeNotifier {
  List<Article> _bookmarks = [];
  
  List<Article> get bookmarks => _bookmarks;
  
  BookmarkProvider() {
    _loadBookmarks();
  }
  
  Future<void> _loadBookmarks() async {
    final prefs = await SharedPreferences.getInstance();
    final bookmarksJson = prefs.getString(AppConstants.bookmarksKey);
    if (bookmarksJson != null) {
      final List<dynamic> decoded = json.decode(bookmarksJson);
      _bookmarks = decoded.map((item) => Article.fromJson(item)).toList();
      notifyListeners();
    }
  }
  
  Future<void> _saveBookmarks() async {
    final prefs = await SharedPreferences.getInstance();
    final bookmarksJson = json.encode(_bookmarks.map((e) => e.toJson()).toList());
    await prefs.setString(AppConstants.bookmarksKey, bookmarksJson);
  }
  
  bool isBookmarked(String articleId) {
    return _bookmarks.any((article) => article.id == articleId);
  }
  
  Future<void> addBookmark(Article article) async {
    if (!isBookmarked(article.id)) {
      _bookmarks.insert(0, article);
      await _saveBookmarks();
      notifyListeners();
    }
  }
  
  Future<void> removeBookmark(String articleId) async {
    _bookmarks.removeWhere((article) => article.id == articleId);
    await _saveBookmarks();
    notifyListeners();
  }
  
  Future<void> toggleBookmark(Article article) async {
    if (isBookmarked(article.id)) {
      await removeBookmark(article.id);
    } else {
      await addBookmark(article);
    }
  }
}