import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'bookmarks_v1';

type BookmarkStore = {
  bookmarks: any[];
  hydrate: () => Promise<void>;
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (article: any) => Promise<void>;
};

export const useBookmarks = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) set({ bookmarks: JSON.parse(raw) });
    } catch {}
  },
  isBookmarked: (id: string) => !!get().bookmarks.find(b => String(b.id) === id),
  toggleBookmark: async (article: any) => {
    const id = String(article?.id);
    const current = get().bookmarks;
    let next = current;
    if (get().isBookmarked(id)) {
      next = current.filter(b => String(b.id) !== id);
    } else {
      next = [article, ...current];
    }
    set({ bookmarks: next });
    try { await AsyncStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }
}));

// Auto-hydrate store
useBookmarks.getState().hydrate();
