import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import { mockArticles } from '../../utils/mockData';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { useTheme } from '../../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { colors, isDarkMode } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Let the system handle back on main feed
      return false;
    });

    return () => backHandler.remove();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleBookmarkToggle = (article: any) => {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <FlatList
        ref={flatListRef}
        data={mockArticles}
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
        snapToInterval={height - (Platform.OS === 'ios' ? 105 : 85)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
    </View>
  );
}

const { height } = require('react-native').Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
