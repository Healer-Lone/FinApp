import React, { useCallback } from 'react';
import { View, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { ArticleCard } from '../src/components/ArticleCard';
import { useBookmarks } from '../src/store/bookmarks';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnon);

async function fetchDocuments() {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}

export default function HomeScreen() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
    staleTime: 30_000,
  });
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const onRefresh = useCallback(() => { refetch(); }, [refetch]);

  if (isLoading) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
        <ActivityIndicator color="#FF9500" />
        <Text style={{ marginTop: 12 }}>Loading feed...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding: 20 }}>
        <Text style={{ color: 'red', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>{String((error as any)?.message || error)}</Text>
        <Text style={{ color: '#888', marginTop: 8 }}>Pull to retry</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={data}
      estimatedItemSize={320}
      refreshControl={<RefreshControl refreshing={!!isRefetching} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <ArticleCard
          article={item}
          isBookmarked={isBookmarked(String(item.id))}
          onBookmarkToggle={() => toggleBookmark(item)}
        />
      )}
      ListEmptyComponent={<View style={{ padding: 40 }}><Text style={{ textAlign:'center' }}>No documents yet.</Text></View>}
    />
  );
}
