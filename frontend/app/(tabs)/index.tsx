import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  Platform,
  Text,
  SafeAreaView,
} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import { mockArticles } from '../../utils/mockData';
import { useBookmarks } from '../../contexts/BookmarkContext';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const flatListRef = useRef<FlatList>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    // Simulate fetching new data
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>FinShorts</Text>
        <Text style={styles.headerSubtitle}>Financial News in 100 Words</Text>
      </View>

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
        snapToInterval={Platform.OS === 'ios' ? undefined : 700}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00bfa5"
            colors={['#00bfa5']}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1a237e',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
    fontWeight: '500',
  },
});
