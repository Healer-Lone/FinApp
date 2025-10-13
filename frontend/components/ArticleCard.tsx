import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../types/article';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isBookmarked, onBookmarkToggle }) => {
  const { colors } = useTheme();
  const priceChangeColor = article.priceChange >= 0 ? colors.success : colors.error;
  const priceChangeIcon = article.priceChange >= 0 ? 'trending-up' : 'trending-down';

  const handleShare = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    try {
      const message = `${article.headline}\n\n${article.summary}\n\n${article.stockSymbol}: $${article.currentPrice} (${article.priceChange >= 0 ? '+' : ''}${article.percentageChange}%)`;
      
      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: article.company,
            text: message,
          });
        } else {
          alert('Share functionality is not available in this browser');
        }
      } else {
        alert('Share feature will be available soon!');
      }
    } catch (error) {
      // User cancelled share
    }
  };

  const handleBookmark = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onBookmarkToggle();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Floating Action Buttons */}
      <View style={styles.floatingActions}>
        <TouchableOpacity 
          style={[styles.floatingButton, { backgroundColor: colors.card }]} 
          onPress={handleBookmark}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={isBookmarked ? colors.accent : colors.text}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.floatingButton, { backgroundColor: colors.card }]} 
          onPress={handleShare}
        >
          <Ionicons name="share-social-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <View style={[styles.companyIcon, { backgroundColor: colors.primary }]}>
            <Text style={styles.companyInitial}>{article.company.charAt(0)}</Text>
          </View>
          <View style={styles.companyDetails}>
            <Text style={[styles.companyName, { color: colors.text }]}>{article.company}</Text>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
              {formatDistanceToNow(article.timestamp, { addSuffix: true })}
            </Text>
          </View>
        </View>
        <View style={[styles.priceChange, { backgroundColor: priceChangeColor + '20' }]}>
          <Ionicons name={priceChangeIcon} size={14} color={priceChangeColor} />
          <Text style={[styles.percentageChange, { color: priceChangeColor }]}>
            {article.priceChange >= 0 ? '+' : ''}{article.percentageChange.toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* Stock Price Banner */}
      <View style={[styles.stockBanner, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.stockSymbol, { color: colors.primary }]}>{article.stockSymbol}</Text>
        <View style={[styles.priceDivider, { backgroundColor: colors.border }]} />
        <Text style={[styles.stockPrice, { color: colors.text }]}>${article.currentPrice.toFixed(2)}</Text>
        <View style={[styles.priceDivider, { backgroundColor: colors.border }]} />
        <View style={[styles.sectorTag, { backgroundColor: colors.accent }]}>
          <Text style={styles.sectorText}>{article.sector}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.headline, { color: colors.text }]}>{article.headline}</Text>
        <Text style={[styles.summary, { color: colors.textSecondary }]}>{article.summary}</Text>
      </View>

      {/* Swipe Indicator */}
      <View style={styles.swipeIndicator}>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - (Platform.OS === 'ios' ? 105 : 85),
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  floatingActions: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? 55 : 35,
    zIndex: 10,
    gap: 8,
  },
  floatingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight: 50,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyInitial: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 11,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 3,
  },
  percentageChange: {
    fontSize: 12,
    fontWeight: '700',
  },
  stockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  stockPrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  priceDivider: {
    width: 1,
    height: 16,
  },
  sectorTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  sectorText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  headline: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 14,
  },
  summary: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
  swipeIndicator: {
    alignItems: 'center',
    paddingBottom: 8,
  },
});

export default ArticleCard;
