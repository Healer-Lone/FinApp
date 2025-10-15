import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArticleCard from '../../components/ArticleCard';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function BookmarksScreen() {
  const { bookmarks, removeBookmark, isBookmarked } = useBookmarks();
  const { colors, isDarkMode } = useTheme();

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    });
    return () => backHandler.remove();
  }, []);

  const handleBookmarkToggle = (articleId: string) => {
    removeBookmark(articleId);
  };

  if (bookmarks.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />

        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: colors.cardBg }]}>
            <Ionicons name="bookmark-outline" size={64} color={colors.textSecondary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No Saved Articles</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Bookmark articles from the feed to read them later
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <FlatList
        data={bookmarks}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            isBookmarked={isBookmarked(item.id)}
            onBookmarkToggle={() => handleBookmarkToggle(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={height - (Platform.OS === 'ios' ? 105 : 85)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
