import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article } from '../types/article';

interface BookmarkContextType {
  bookmarks: Article[];
  addBookmark: (article: Article) => void;
  removeBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  const addBookmark = (article: Article) => {
    setBookmarks((prev) => [...prev, article]);
  };

  const removeBookmark = (articleId: string) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== articleId));
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some((item) => item.id === articleId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};
