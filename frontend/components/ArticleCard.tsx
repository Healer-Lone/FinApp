import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../types/article';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isBookmarked, onBookmarkToggle }) => {
  const { colors } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const { width, height } = useWindowDimensions();
  
  // Responsive height calculation - match tab bar height from _layout.tsx
  const tabBarHeight = Platform.OS === 'ios' ? 85 : 65;
  const cardHeight = height - tabBarHeight;
  const imageHeight = Math.min(height * 0.28, 240); // 28% of screen or max 240px

  const handleShare = async () => {
    setShowMenu(false);
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
    setShowMenu(false);
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onBookmarkToggle();
  };

  const toggleMenu = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowMenu(!showMenu);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, height: cardHeight, width }]}>
      {/* Header Image */}
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        
        {/* 3-dot menu on image */}
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]} 
          onPress={toggleMenu}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Company badge on image */}
        <View style={[styles.companyBadge, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
          <View style={[styles.companyIcon, { backgroundColor: colors.primary }]}>
            <Text style={styles.companyInitial}>{article.company.charAt(0)}</Text>
          </View>
          <Text style={styles.companyNameOnImage}>{article.company}</Text>
        </View>

        {/* Market badges on image */}
        {(article.nifty50 === 'Yes' || article.bse200 === 'Yes') && (
          <View style={styles.marketBadges}>
            {article.nifty50 === 'Yes' && (
              <View style={[styles.marketBadge, { backgroundColor: colors.success }]}>
                <Text style={styles.marketBadgeText}>NIFTY 50</Text>
              </View>
            )}
            {article.bse200 === 'Yes' && (
              <View style={[styles.marketBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.marketBadgeText}>BSE 200</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowMenu(false)}
        >
          <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
            <TouchableOpacity 
              style={styles.menuOption} 
              onPress={handleBookmark}
            >
              <Ionicons 
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
                size={22} 
                color={isBookmarked ? colors.accent : colors.text} 
              />
              <Text style={[styles.menuOptionText, { color: colors.text }]}>
                {isBookmarked ? 'Remove Bookmark' : 'Save Article'}
              </Text>
            </TouchableOpacity>
            
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity 
              style={styles.menuOption} 
              onPress={handleShare}
            >
              <Ionicons name="share-social-outline" size={22} color={colors.text} />
              <Text style={[styles.menuOptionText, { color: colors.text }]}>Share Article</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Content */}
      <View style={styles.content}>
        {/* Stock Info Banner */}
        <View style={[styles.stockBanner, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.stockSymbol, { color: colors.primary }]}>{article.stockSymbol}</Text>
          <View style={[styles.priceDivider, { backgroundColor: colors.border }]} />
          <View style={[styles.sectorTag, { backgroundColor: colors.accent }]}>
            <Text style={styles.sectorText}>{article.sector}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {formatDistanceToNow(article.timestamp, { addSuffix: true })}
          </Text>
        </View>

        {/* Headline & Summary */}
        <View style={styles.textContent}>
          <Text style={[styles.headline, { color: colors.text }]} numberOfLines={3}>{article.headline}</Text>
          <Text style={[styles.summary, { color: colors.textSecondary }]} numberOfLines={8}>{article.summary}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  menuButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 35,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  companyBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  companyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyInitial: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  companyNameOnImage: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  marketBadges: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    flexDirection: 'row',
    gap: 6,
  },
  marketBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  marketBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '80%',
    maxWidth: 300,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 16,
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    gap: 10,
  },
  stockSymbol: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  stockPrice: {
    fontSize: 13,
    fontWeight: '700',
  },
  priceDivider: {
    width: 1,
    height: 14,
  },
  sectorTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  sectorText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  textContent: {
    flex: 1,
    overflow: 'hidden',
  },
  headline: {
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 12,
  },
  summary: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default ArticleCard;
