import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

export function normalizeArticle(a: any) {
  const createdAt = a?.created_at || a?.published_at || a?.timestamp;
  const image = a?.image_url || a?.imageUrl || a?.cover || 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80';
  return {
    id: String(a?.id ?? a?.uuid ?? a?.doc_id ?? ''),
    company: a?.symbol || a?.company || (typeof a?.title === 'string' ? a.title.split(' ')[0] : 'Unknown'),
    headline: a?.title || a?.headline || a?.name || '',
    summary: a?.content || a?.summary || a?.description || '',
    stockSymbol: a?.symbol || a?.ticker || '',
    sector: a?.sector || a?.category || 'General',
    timestamp: createdAt ? new Date(createdAt) : new Date(),
    imageUrl: image,
  };
}

export const ArticleCard = ({ article, isBookmarked, onBookmarkToggle }: { article: any; isBookmarked: boolean; onBookmarkToggle: () => void }) => {
  const a = normalizeArticle(article);
  return (
    <View style={{ margin: 12, borderRadius: 16, overflow: 'hidden', backgroundColor: '#111' }}>
      <Image source={{ uri: a.imageUrl }} style={{ width: '100%', height: 180, backgroundColor:'#333' }} resizeMode='cover' />
      <View style={{ padding: 16, gap: 8 }}>
        <Text style={{ color:'#fff', fontWeight:'800' }}>{a.company}{a.stockSymbol ? `  ${a.stockSymbol}` : ''}</Text>
        <Text style={{ color:'#fff', fontSize: 18, fontWeight:'700' }}>{a.headline}</Text>
        {!!a.summary && <Text numberOfLines={4} style={{ color:'#ddd' }}>{a.summary}</Text>}
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop: 10 }}>
          <Text style={{ color:'#bbb' }}>{a.sector}</Text>
          <Pressable onPress={onBookmarkToggle} style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: isBookmarked ? '#FF9500' : '#333', borderRadius: 8 }}>
            <Text style={{ color:'#fff' }}>{isBookmarked ? 'Saved' : 'Save'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
