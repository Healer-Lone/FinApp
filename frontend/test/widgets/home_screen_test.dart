import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:stockbyte/lib/screens/home_screen.dart';
import 'package:stockbyte/lib/providers/bookmark_provider.dart';
import 'package:stockbyte/lib/providers/supabase_provider.dart';
import 'package:stockbyte/lib/models/article.dart';

class FakeSupabaseProvider extends ChangeNotifier implements SupabaseProvider {
  @override
  List<Article> _docs;
  @override
  bool get loading => false;
  @override
  String? get error => null;
  @override
  List<Article> get documents => _docs;
  FakeSupabaseProvider(this._docs);
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('HomeScreen shows list of articles', (tester) async {
    final docs = [
      Article(id:'1', company:'Acme', headline:'Launch', summary:'...', stockSymbol:'ACME', sector:'Tech', timestamp:DateTime.now(), imageUrl:'https://example.com', imageColor:'#000'),
      Article(id:'2', company:'Beta', headline:'Earnings', summary:'...', stockSymbol:'BETA', sector:'Finance', timestamp:DateTime.now(), imageUrl:'https://example.com', imageColor:'#000'),
    ];

    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<BookmarkProvider>(create: (_) => BookmarkProvider()),
          ChangeNotifierProvider<SupabaseProvider>(create: (_) => FakeSupabaseProvider(docs) as SupabaseProvider),
        ],
        child: const MaterialApp(home: HomeScreen()),
      ),
    );

    await tester.pumpAndSettle();

    expect(find.textContaining('Launch'), findsOneWidget);
    expect(find.textContaining('Earnings'), findsOneWidget);
  });
}
