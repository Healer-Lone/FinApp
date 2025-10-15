import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF9500',
        }}>
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
          <Tabs.Screen name="categories" options={{ title: 'Categories' }} />
          <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
          <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
