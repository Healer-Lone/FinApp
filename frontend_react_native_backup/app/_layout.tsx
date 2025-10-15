import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BookmarkProvider } from '../contexts/BookmarkContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { SupabaseProvider } from '../contexts/SupabaseContext';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <SupabaseProvider>
            <BookmarkProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
            </BookmarkProvider>
          </SupabaseProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
