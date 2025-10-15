import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/bookmark_provider.dart';
import '../widgets/article_card.dart';

class BookmarksScreen extends StatelessWidget {
  const BookmarksScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<BookmarkProvider>(
        builder: (context, bookmarkProvider, child) {
          // Empty State
          if (bookmarkProvider.bookmarks.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 140,
                    height: 140,
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surface,
                      borderRadius: BorderRadius.circular(70),
                    ),
                    child: const Icon(
                      Icons.bookmark_outline,
                      size: 64,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'No Saved Articles',
                    style: TextStyle(
                      color: Theme.of(context).textTheme.bodyLarge?.color,
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 40),
                    child: Text(
                      'Bookmark articles from the feed to read them later',
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 14,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ],
              ),
            );
          }

          // Bookmarks List
          return PageView.builder(
            scrollDirection: Axis.vertical,
            itemCount: bookmarkProvider.bookmarks.length,
            itemBuilder: (context, index) {
              final article = bookmarkProvider.bookmarks[index];
              return ArticleCard(
                article: article,
                isBookmarked: true,
                onBookmarkToggle: () {
                  bookmarkProvider.removeBookmark(article.id);
                },
              );
            },
          );
        },
      ),
    );
  }
}