import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/article.dart';

class SupabaseProvider with ChangeNotifier {
  List<Article> _documents = [];
  bool _loading = true;
  String? _error;
  RealtimeChannel? _channel;
  
  List<Article> get documents => _documents;
  bool get loading => _loading;
  String? get error => _error;
  
  SupabaseProvider() {
    _initializeData();
  }
  
  Future<void> _initializeData() async {
    await fetchDocuments();
    _setupRealtimeSubscription();
  }
  
  Future<void> fetchDocuments() async {
    try {
      _loading = true;
      _error = null;
      notifyListeners();
      
      final response = await Supabase.instance.client
          .from('documents')
          .select()
          .order('created_at', ascending: false);
      
      _documents = (response as List)
          .map((doc) => Article.fromJson(doc))
          .toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
  
  void _setupRealtimeSubscription() {
    _channel = Supabase.instance.client
        .channel('documents-channel')
        .onPostgresChanges(
          event: PostgresChangeEvent.insert,
          schema: 'public',
          table: 'documents',
          callback: (payload) {
            final newDoc = Article.fromJson(payload.newRecord);
            _documents.insert(0, newDoc);
            notifyListeners();
          },
        )
        .subscribe();
  }
  
  @override
  void dispose() {
    _channel?.unsubscribe();
    super.dispose();
  }
}