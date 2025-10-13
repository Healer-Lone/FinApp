import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  BackHandler,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../types/article';
import { getArticlesByCategory, mockArticles } from '../../utils/mockData';
import ArticleCard from '../../components/ArticleCard';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { useTheme } from '../../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

const { height } = Dimensions.get('window');

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
  const { colors, isDarkMode } = useTheme();

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showArticles) {
        setShowArticles(false);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [showArticles]);

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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        
        <View style={[styles.articleHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.cardBg }]}
            onPress={handleBackToCategories}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.articleHeaderTitle, { color: colors.text }]}>{selectedCategory}</Text>
            <Text style={[styles.articleHeaderSubtitle, { color: colors.textSecondary }]}>
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
          snapToInterval={height - (Platform.OS === 'ios' ? 160 : 140)}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

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
                style={[styles.categoryCard, { backgroundColor: colors.cardBg }]}
                onPress={() => handleCategorySelect(category)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: colors.background }]}>
                  <Ionicons
                    name={categoryIcons[category] as any}
                    size={28}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]}>{category}</Text>
                <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>
                  {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                </Text>
                <View style={styles.categoryArrow}>
                  <Ionicons name="chevron-forward" size={18} color={colors.accent} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.statsSection}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>Market Overview</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
              <Ionicons name="newspaper" size={24} color={colors.accent} />
              <Text style={[styles.statNumber, { color: colors.text }]}>{mockArticles.length}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Articles</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
              <Ionicons name="trending-up" size={24} color={colors.success} />
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {mockArticles.filter((a) => a.priceChange > 0).length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Bullish</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
              <Ionicons name="trending-down" size={24} color={colors.error} />
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {mockArticles.filter((a) => a.priceChange < 0).length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Bearish</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  articleHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  articleHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  articleHeaderSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  categoryCount: {
    fontSize: 12,
  },
  categoryArrow: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  statsSection: {
    marginTop: 8,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
