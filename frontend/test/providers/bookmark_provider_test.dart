import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:stockbyte/lib/providers/bookmark_provider.dart' as bp;
import 'package:stockbyte/lib/models/article.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('BookmarkProvider', () {
    setUp(() async {
      SharedPreferences.setMockInitialValues({});
    });

    test('add and remove bookmarks', () async {
      final provider = bp.BookmarkProvider();
      final article = Article(
        id: '1',
        company: 'Acme',
        headline: 'News',
        summary: 'Summary',
        stockSymbol: 'ACME',
        sector: 'Tech',
        timestamp: DateTime.now(),
        imageUrl: 'https://example.com',
        imageColor: '#000',
      );

      expect(provider.bookmarks.length, 0);
      await provider.addBookmark(article);
      expect(provider.isBookmarked('1'), true);
      expect(provider.bookmarks.length, 1);

      await provider.toggleBookmark(article);
      expect(provider.isBookmarked('1'), false);
      expect(provider.bookmarks.length, 0);
    });

    test('persists to SharedPreferences', () async {
      final provider = bp.BookmarkProvider();
      final article = Article(
        id: '2', company: 'X', headline: 'H', summary: 'S', stockSymbol: 'X', sector: 'S', timestamp: DateTime.now(), imageUrl: '', imageColor: '#fff');

      await provider.addBookmark(article);
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString('bookmarks');
      expect(raw, isNotNull);
      final list = json.decode(raw!);
      expect(list, isA<List>());
      expect((list as List).first['id'], '2');
    });
  });
}
