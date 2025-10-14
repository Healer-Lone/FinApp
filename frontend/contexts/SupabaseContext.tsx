import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Article } from '../types/article';
import { RealtimeChannel } from '@supabase/supabase-js';

interface SupabaseContextType {
  documents: Article[];
  loading: boolean;
  error: string | null;
  refreshDocuments: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // Transform Supabase document to Article format
  const transformDocument = (doc: any): Article => {
    return {
      id: doc.id?.toString() || '',
      company: doc.symbol || doc.title?.split(' ')[0] || 'Unknown',
      headline: doc.title || '',
      summary: doc.content || '',
      stockSymbol: doc.symbol || '',
      sector: doc.sector || 'General',
      timestamp: doc.created_at ? new Date(doc.created_at) : new Date(),
      imageUrl: doc.image_url || 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      imageColor: '#007AFF',
      // Price fields removed as per requirements
      currentPrice: 0,
      priceChange: 0,
      percentageChange: 0,
      // Additional fields from Supabase
      nifty50: doc.nifty50,
      bse200: doc.BSE200,
    };
  };

  // Fetch documents from Supabase
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data) {
        const transformedData = data.map(transformDocument);
        setDocuments(transformedData);
      }
    } catch (err: any) {
      console.error('Error fetching documents:', err);
      setError(err.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  // Setup real-time subscription
  useEffect(() => {
    fetchDocuments();

    // Subscribe to new inserts
    const realtimeChannel = supabase
      .channel('documents-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'documents',
        },
        (payload) => {
          console.log('New document inserted:', payload.new);
          const newDocument = transformDocument(payload.new);
          setDocuments((prev) => [newDocument, ...prev]);
        }
      )
      .subscribe();

    setChannel(realtimeChannel);

    // Cleanup
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const refreshDocuments = async () => {
    await fetchDocuments();
  };

  return (
    <SupabaseContext.Provider value={{ documents, loading, error, refreshDocuments }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return context;
};