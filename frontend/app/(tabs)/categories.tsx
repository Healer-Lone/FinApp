import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../types/article';
import { getArticlesByCategory } from '../../utils/mockData';
import ArticleCard from '../../components/ArticleCard';
import { useBookmarks } from '../../contexts/BookmarkContext';
import * as Haptics from 'expo-haptics';

const categories: Category[] = [
  'All',
  'Technology',
  'Banking',
  'Energy',
  'Healthcare',
  'Consumer',
  'Manufacturing',
];

const categoryIcons: Record<Category, string> = {
  All: 'grid-outline',
  Technology: 'hardware-chip-outline',
  Banking: 'cash-outline',
  Energy: 'flash-outline',
  Healthcare: 'medical-outline',
  Consumer: 'cart-outline',
  Manufacturing: 'construct-outline',
};

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [showArticles, setShowArticles] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const handleCategorySelect = async (category: Category) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedCategory(category);
    setShowArticles(true);
  };

  const handleBackToCategories = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowArticles(false);
  };

  const handleBookmarkToggle = (article: any) => {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  const filteredArticles = getArticlesByCategory(selectedCategory);

  if (showArticles) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        {/* Header with Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToCategories}
          >
            <Ionicons name="arrow-back" size={24} color="#1a237e" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{selectedCategory}</Text>
            <Text style={styles.headerSubtitle}>
              {filteredArticles.length} articles
            </Text>
          </View>
        </View>

        <FlatList
          data={filteredArticles}
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
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Categories</Text>
        <Text style={styles.headerSubtitle}>Browse by sector</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoryGrid}>
          {categories.map((category) => {
            const articleCount = getArticlesByCategory(category).length;
            return (
              <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() => handleCategorySelect(category)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIconContainer}>
                  <Ionicons
                    name={categoryIcons[category] as any}
                    size={32}
                    color="#1a237e"
                  />
                </View>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                </Text>
                <View style={styles.categoryArrow}>
                  <Ionicons name="chevron-forward" size={20} color="#00bfa5" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="newspaper" size={28} color="#00bfa5" />
              <Text style={styles.statNumber}>{mockArticles.length}</Text>
              <Text style={styles.statLabel}>Total Articles</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="pulse" size={28} color="#4caf50" />
              <Text style={styles.statNumber}>
                {mockArticles.filter((a) => a.priceChange > 0).length}
              </Text>
              <Text style={styles.statLabel}>Bullish</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trending-down" size={28} color="#f44336" />
              <Text style={styles.statNumber}>
                {mockArticles.filter((a) => a.priceChange < 0).length}
              </Text>
              <Text style={styles.statLabel}>Bearish</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 8,
  },
  categoryArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  statsSection: {
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#212121',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '600',
  },
});

import { mockArticles } from '../../utils/mockData';
