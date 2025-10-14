import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  Platform,
  BackHandler,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useSupabase } from '../../contexts/SupabaseContext';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { colors, isDarkMode } = useTheme();
  const { documents, loading, error, refreshDocuments } = useSupabase();
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Let the system handle back on main feed
      return false;
    });

    return () => backHandler.remove();
  }, []);

  // Fade in animation when data loads
  useEffect(() => {
    if (!loading && documents.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, documents]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    await refreshDocuments();
    setRefreshing(false);
  }, [refreshDocuments]);

  const handleBookmarkToggle = (article: any) => {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  // Loading state
  if (loading && documents.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading feed...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
        <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
          Pull down to retry
        </Text>
      </View>
    );
  }

  // Empty state
  if (documents.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No documents yet. New items will appear here automatically!
        </Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.background, opacity: fadeAnim }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <FlatList
        ref={flatListRef}
        data={documents}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            isBookmarked={isBookmarked(item.id)}
            onBookmarkToggle={() => handleBookmarkToggle(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
