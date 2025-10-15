import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:stockbyte/lib/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Navigation bar taps', (tester) async {
    app.main();
    await tester.pumpAndSettle(const Duration(seconds: 3));

    // Tap Categories
    await tester.tap(find.byIcon(Icons.grid_view_outlined));
    await tester.pumpAndSettle();

    // Tap Saved
    await tester.tap(find.byIcon(Icons.bookmark_outline));
    await tester.pumpAndSettle();

    // Tap Profile
    await tester.tap(find.byIcon(Icons.person_outline));
    await tester.pumpAndSettle();

    // Back to Home
    await tester.tap(find.byIcon(Icons.home_outlined));
    await tester.pumpAndSettle();
  });
}
