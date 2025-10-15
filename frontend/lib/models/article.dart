class Article {
  final String id;
  final String company;
  final String headline;
  final String summary;
  final String stockSymbol;
  final String sector;
  final DateTime timestamp;
  final String imageUrl;
  final String imageColor;
  final bool? nifty50;
  final bool? bse200;

  Article({
    required this.id,
    required this.company,
    required this.headline,
    required this.summary,
    required this.stockSymbol,
    required this.sector,
    required this.timestamp,
    required this.imageUrl,
    required this.imageColor,
    this.nifty50,
    this.bse200,
  });

  factory Article.fromJson(Map<String, dynamic> json) {
    // Handle variant field names safely
    final createdAt = json['created_at'] ?? json['published_at'] ?? json['timestamp'];
    String? image = json['image_url'] ?? json['imageUrl'] ?? json['cover'];
    // Ensure non-null, non-empty image to avoid widget crashes
    image ??= 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80';

    return Article(
      id: (json['id'] ?? json['uuid'] ?? json['doc_id'] ?? '').toString(),
      company: (json['symbol'] ?? json['company'] ?? (json['title'] is String ? (json['title'] as String).split(' ').first : 'Unknown')).toString(),
      headline: (json['title'] ?? json['headline'] ?? json['name'] ?? '').toString(),
      summary: (json['content'] ?? json['summary'] ?? json['description'] ?? '').toString(),
      stockSymbol: (json['symbol'] ?? json['ticker'] ?? '').toString(),
      sector: (json['sector'] ?? json['category'] ?? 'General').toString(),
      timestamp: createdAt != null ? DateTime.tryParse(createdAt.toString()) ?? DateTime.now() : DateTime.now(),
      imageUrl: image,
      imageColor: '#007AFF',
      nifty50: json['nifty50'] is bool ? json['nifty50'] as bool : null,
      bse200: json['BSE200'] is bool ? json['BSE200'] as bool : (json['bse200'] is bool ? json['bse200'] as bool : null),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'company': company,
      'headline': headline,
      'summary': summary,
      'stockSymbol': stockSymbol,
      'sector': sector,
      'timestamp': timestamp.toIso8601String(),
      'imageUrl': imageUrl,
      'imageColor': imageColor,
      'nifty50': nifty50,
      'bse200': bse200,
    };
  }
}
