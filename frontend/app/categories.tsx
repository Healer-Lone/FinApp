import React from 'react';
import { View, Text, Pressable } from 'react-native';

const CATS = [
  { name: 'Technology' },
  { name: 'Finance' },
  { name: 'Healthcare' },
  { name: 'Energy' },
  { name: 'Consumer' },
  { name: 'Industrial' },
];

export default function CategoriesScreen() {
  return (
    <View style={{ flex:1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 16 }}>Categories</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap', gap: 12 }}>
        {CATS.map((c) => (
          <Pressable key={c.name} style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor:'#111', borderRadius: 12 }}>
            <Text style={{ color:'#fff' }}>{c.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
