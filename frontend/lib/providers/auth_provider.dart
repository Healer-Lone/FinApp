import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  bool _loading = false;
  
  User? get user => _user;
  bool get loading => _loading;
  bool get isAuthenticated => _user != null;
  
  AuthProvider() {
    _user = Supabase.instance.client.auth.currentUser;
    
    // Listen to auth state changes
    Supabase.instance.client.auth.onAuthStateChange.listen((data) {
      _user = data.session?.user;
      notifyListeners();
    });
  }
  
  Future<void> signIn(String email, String password) async {
    try {
      _loading = true;
      notifyListeners();
      
      final response = await Supabase.instance.client.auth.signInWithPassword(
        email: email,
        password: password,
      );
      
      _user = response.user;
    } catch (e) {
      rethrow;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
  
  Future<void> signUp(String email, String password) async {
    try {
      _loading = true;
      notifyListeners();
      
      final response = await Supabase.instance.client.auth.signUp(
        email: email,
        password: password,
      );
      
      _user = response.user;
    } catch (e) {
      rethrow;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
  
  Future<void> signOut() async {
    try {
      _loading = true;
      notifyListeners();
      
      await Supabase.instance.client.auth.signOut();
      _user = null;
    } catch (e) {
      rethrow;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
}