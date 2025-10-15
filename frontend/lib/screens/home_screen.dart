import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/supabase_provider.dart';
import '../providers/bookmark_provider.dart';
import '../widgets/article_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _pageController = PageController();

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _refreshFeed() async {
    await context.read<SupabaseProvider>().fetchDocuments();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer2<SupabaseProvider, BookmarkProvider>(
        builder: (context, supabaseProvider, bookmarkProvider, child) {
          // Loading State
          if (supabaseProvider.loading && supabaseProvider.documents.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const CircularProgressIndicator(
                    color: Color(0xFFFF9500),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Loading feed...',
                    style: TextStyle(
                      color: Theme.of(context).textTheme.bodyMedium?.color,
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            );
          }

          // Error State
          if (supabaseProvider.error != null) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      color: Colors.red,
                      size: 64,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      supabaseProvider.error!,
                      style: const TextStyle(
                        color: Colors.red,
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Pull down to retry',
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: _refreshFeed,
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              ),
            );
          }

          // Empty State
          if (supabaseProvider.documents.isEmpty) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(40.0),
                child: Text(
                  'No documents yet. New items will appear here automatically!',
                  style: TextStyle(
                    color: Theme.of(context).textTheme.bodyMedium?.color,
                    fontSize: 16,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            );
          }

          // Article Feed
          return RefreshIndicator(
            onRefresh: _refreshFeed,
            color: const Color(0xFFFF9500),
            child: PageView.builder(
              controller: _pageController,
              scrollDirection: Axis.vertical,
              itemCount: supabaseProvider.documents.length,
              itemBuilder: (context, index) {
                final article = supabaseProvider.documents[index];
                return ArticleCard(
                  article: article,
                  isBookmarked: bookmarkProvider.isBookmarked(article.id),
                  onBookmarkToggle: () {
                    bookmarkProvider.toggleBookmark(article);
                  },
                );
              },
            ),
          );
        },
      ),
    );
  }
}