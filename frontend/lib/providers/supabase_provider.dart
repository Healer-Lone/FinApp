import 'dart:async';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/article.dart';

class SupabaseProvider with ChangeNotifier {
  final SupabaseClient _client;

  List<Article> _documents = [];
  bool _loading = true;
  String? _error;
  RealtimeChannel? _channel;

  List<Article> get documents => _documents;
  bool get loading => _loading;
  String? get error => _error;

  SupabaseProvider({SupabaseClient? client}) : _client = client ?? Supabase.instance.client {
    _initializeData();
  }

  Future<void> _initializeData() async {
    try {
      await fetchDocuments();
    } finally {
      _setupRealtimeSubscription();
    }
  }

  Future<void> fetchDocuments() async {
    try {
      _loading = true;
      _error = null;
      notifyListeners();

      final data = await _client
          .from('documents')
          .select()
          .order('created_at', ascending: false)
          .limit(100)
          .timeout(const Duration(seconds: 12));

      if (data is List) {
        _documents = data.map<Article>((doc) => Article.fromJson(doc as Map<String, dynamic>)).toList();
      } else {
        _documents = [];
      }
    } on PostgrestException catch (e) {
      _error = e.message ?? 'Supabase query failed';
    } on TimeoutException {
      _error = 'Request timed out. Please check your connection and try again.';
    } catch (e) {
      _error = e.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  void _setupRealtimeSubscription() {
    try {
      _channel?.unsubscribe();

      _channel = _client
          .channel('public:documents')
          .onPostgresChanges(
            event: PostgresChangeEvent.insert,
            schema: 'public',
            table: 'documents',
            callback: (payload) {
              try {
                final newDoc = Article.fromJson(payload.newRecord);
                _documents.insert(0, newDoc);
                notifyListeners();
              } catch (_) {}
            },
          )
          .onPostgresChanges(
            event: PostgresChangeEvent.update,
            schema: 'public',
            table: 'documents',
            callback: (payload) {
              try {
                final updated = Article.fromJson(payload.newRecord);
                final idx = _documents.indexWhere((a) => a.id == updated.id);
                if (idx != -1) {
                  _documents[idx] = updated;
                  notifyListeners();
                }
              } catch (_) {}
            },
          )
          .onPostgresChanges(
            event: PostgresChangeEvent.delete,
            schema: 'public',
            table: 'documents',
            callback: (payload) {
              final id = payload.oldRecord['id']?.toString();
              if (id != null) {
                _documents.removeWhere((a) => a.id == id);
                notifyListeners();
              }
            },
          )
          .subscribe();
    } catch (e) {
      _error ??= e.toString();
      notifyListeners();
    }
  }

  Future<void> reconnectRealtime() async {
    _channel?.unsubscribe();
    _setupRealtimeSubscription();
  }

  @override
  void dispose() {
    _channel?.unsubscribe();
    super.dispose();
  }
}
