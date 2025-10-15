import 'package:flutter_test/flutter_test.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:stockbyte/lib/providers/supabase_provider.dart';

class ThrowingClient implements SupabaseClient {
  @override
  PostgrestFilterBuilder from(String table) {
    throw PostgrestException(message: 'fail');
  }
  noSuchMethod(Invocation i) => super.noSuchMethod(i);
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('SupabaseProvider captures errors', () async {
    final provider = SupabaseProvider(client: ThrowingClient());
    await provider.fetchDocuments();
    expect(provider.error, isNotNull);
    expect(provider.loading, false);
  });
}
