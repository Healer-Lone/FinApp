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
import Share from 'react-native-share';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isBookmarked, onBookmarkToggle }) => {
  const priceChangeColor = article.priceChange >= 0 ? '#4caf50' : '#f44336';
  const priceChangeIcon = article.priceChange >= 0 ? 'trending-up' : 'trending-down';

  const handleShare = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    try {
      await Share.open({
        message: `${article.headline}\n\n${article.summary}\n\n${article.stockSymbol}: $${article.currentPrice} (${article.priceChange >= 0 ? '+' : ''}${article.percentageChange}%)`,
        title: article.company,
      });
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <View style={styles.companyIcon}>
            <Text style={styles.companyInitial}>{article.company.charAt(0)}</Text>
          </View>
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>{article.company}</Text>
            <Text style={styles.timestamp}>
              {formatDistanceToNow(article.timestamp, { addSuffix: true })}
            </Text>
          </View>
        </View>
        <View style={styles.stockInfo}>
          <View style={[styles.priceChange, { backgroundColor: priceChangeColor + '20' }]}>
            <Ionicons name={priceChangeIcon} size={16} color={priceChangeColor} />
            <Text style={[styles.percentageChange, { color: priceChangeColor }]}>
              {article.priceChange >= 0 ? '+' : ''}{article.percentageChange.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Stock Price Banner */}
      <View style={styles.stockBanner}>
        <Text style={styles.stockSymbol}>{article.stockSymbol}</Text>
        <View style={styles.priceDivider} />
        <Text style={styles.stockPrice}>${article.currentPrice.toFixed(2)}</Text>
        <View style={styles.priceDivider} />
        <View style={styles.sectorTag}>
          <Text style={styles.sectorText}>{article.sector}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.headline}>{article.headline}</Text>
        <Text style={styles.summary}>{article.summary}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="#1a237e" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, isBookmarked && styles.bookmarkedButton]}
          onPress={handleBookmark}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#00bfa5' : '#1a237e'}
          />
          <Text style={[styles.actionText, isBookmarked && styles.bookmarkedText]}>
            {isBookmarked ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="open-outline" size={24} color="#1a237e" />
          <Text style={styles.actionText}>Read More</Text>
        </TouchableOpacity>
      </View>

      {/* Swipe Indicator */}
      <View style={styles.swipeIndicator}>
        <Ionicons name="chevron-down" size={20} color="#9e9e9e" />
        <Text style={styles.swipeText}>Swipe for next article</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - (Platform.OS === 'ios' ? 150 : 130),
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyInitial: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#757575',
  },
  stockInfo: {
    alignItems: 'flex-end',
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  percentageChange: {
    fontSize: 14,
    fontWeight: '700',
  },
  stockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  stockSymbol: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a237e',
    letterSpacing: 0.5,
  },
  stockPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212121',
  },
  priceDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
  },
  sectorTag: {
    backgroundColor: '#00bfa5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectorText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#212121',
    lineHeight: 30,
    marginBottom: 16,
  },
  summary: {
    fontSize: 15,
    lineHeight: 24,
    color: '#424242',
    textAlign: 'justify',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  bookmarkedButton: {
    backgroundColor: '#00bfa5' + '15',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#1a237e',
  },
  bookmarkedText: {
    color: '#00bfa5',
  },
  swipeIndicator: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  swipeText: {
    fontSize: 11,
    color: '#9e9e9e',
    marginTop: 2,
  },
});

export default ArticleCard;
