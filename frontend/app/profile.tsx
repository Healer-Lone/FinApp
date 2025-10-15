import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!);

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      Alert.alert('Logged in');
    } catch (e: any) {
      Alert.alert('Error', e.message || String(e));
    } finally { setLoading(false); }
  }
  async function signUp() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      Alert.alert('Account created. Check your email.');
    } catch (e: any) {
      Alert.alert('Error', e.message || String(e));
    } finally { setLoading(false); }
  }
  async function signOut() {
    await supabase.auth.signOut();
    Alert.alert('Logged out');
  }

  return (
    <View style={{ flex:1, padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Profile</Text>
      <TextInput placeholder="Email" inputMode='email' autoCapitalize='none' style={{ borderWidth:1, borderColor:'#333', padding:12, borderRadius:8 }} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth:1, borderColor:'#333', padding:12, borderRadius:8 }} value={password} onChangeText={setPassword} />
      <Pressable onPress={signIn} disabled={loading} style={{ backgroundColor:'#FF9500', padding:14, borderRadius:10 }}>
        <Text style={{ color:'#fff', textAlign:'center', fontWeight:'700' }}>{loading ? 'Please wait...' : 'Sign In'}</Text>
      </Pressable>
      <Pressable onPress={signUp} disabled={loading} style={{ backgroundColor:'#111', padding:14, borderRadius:10 }}>
        <Text style={{ color:'#fff', textAlign:'center' }}>{loading ? 'Please wait...' : 'Sign Up'}</Text>
      </Pressable>
      <Pressable onPress={signOut} style={{ backgroundColor:'crimson', padding:14, borderRadius:10 }}>
        <Text style={{ color:'#fff', textAlign:'center' }}>Sign Out</Text>
      </Pressable>
    </View>
  );
}
