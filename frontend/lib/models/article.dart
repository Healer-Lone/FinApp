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
    return Article(
      id: json['id']?.toString() ?? '',
      company: json['symbol'] ?? json['title']?.split(' ')[0] ?? 'Unknown',
      headline: json['title'] ?? '',
      summary: json['content'] ?? '',
      stockSymbol: json['symbol'] ?? '',
      sector: json['sector'] ?? 'General',
      timestamp: json['created_at'] != null 
          ? DateTime.parse(json['created_at']) 
          : DateTime.now(),
      imageUrl: json['image_url'] ?? 
          'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      imageColor: '#007AFF',
      nifty50: json['nifty50'],
      bse200: json['BSE200'],
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