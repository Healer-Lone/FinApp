import React from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBookmarks } from '../src/store/bookmarks';
import { ArticleCard } from '../src/components/ArticleCard';

export default function SavedScreen() {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  return (
    <View style={{ flex:1 }}>
      <FlashList
        data={bookmarks}
        estimatedItemSize={320}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            isBookmarked={isBookmarked(String(item.id))}
            onBookmarkToggle={() => toggleBookmark(item)}
          />
        )}
        ListEmptyComponent={<View style={{ padding: 40 }}><Text style={{ textAlign:'center' }}>No saved articles</Text></View>}
      />
    </View>
  );
}
