// app/Article/page.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Article.module.css';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  anchor: string;
  children?: TableOfContentsItem[];
}

interface Reference {
  title: string;
  url: string;
  author: string;
  accessedDate: number;
  type: string;
}

interface SEOArticle {
  id: string;
  websiteId: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  galleryImages?: string[];
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  authorLinkedIn?: string;
  category: string;
  subCategory?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: number; // timestamp in seconds
  articleType: string;
  difficultyLevel: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  readingTimeMinutes: number;
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
  tableOfContents?: TableOfContentsItem[];
  references?: Reference[];
  seoMeta?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    structuredData?: any;
  };
  relatedArticleIds?: string[];
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  metadata?: {
    targetAudience?: string;
    contentType?: string;
    region?: string;
  };
}

const ArticlePage = () => {
  const [articles, setArticles] = useState<SEOArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<SEOArticle | null>(null);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  const articleDetailRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching articles from new API...');
        const response = await fetch(
          'https://tenantapi.theartemis.ai/api/v1/seo-websites/69c6cb641673f94b68ce9990/articles',
          {
            method: 'GET',
            headers: {
              accept: '*/*',
              'X-Tenant': '670a48b168b0640a262870c4',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SEOArticle[] = await response.json();
        console.log('API Response received:', data);
        console.log(`Total articles from API: ${data.length}`);

        // Normalize publishedAt (convert seconds to milliseconds if needed)
        const normalizedData = data.map((article) => ({
          ...article,
          publishedAt:
            typeof article.publishedAt === 'number' && article.publishedAt < 1e12
              ? article.publishedAt * 1000
              : article.publishedAt,
        }));

        const publishedArticles = normalizedData.filter(
          (article) => article.published && article.status === 'PUBLISHED'
        );

        console.log(`Published articles after filtering: ${publishedArticles.length}`);
        setArticles(publishedArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article: SEOArticle) => {
    setSelectedArticle(article);
    setExpandedArticles((prev) => {
      const newSet = new Set(prev);
      newSet.add(article.id);
      return newSet;
    });

    setTimeout(() => {
      const element = articleDetailRefs.current[article.id];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const toggleArticleExpansion = (articleId: string) => {
    setExpandedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const categories = ['All', ...new Set(articles.map((article) => article.category))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (timestamp: number) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatNumber = (num: number = 0) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleShare = (
    article: SEOArticle,
    platform: 'twitter' | 'linkedin' | 'facebook',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/articles/${article.slug}` : '';
    const title = article.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    const shareUrl = shareUrls[platform];
    if (shareUrl && typeof window !== 'undefined') {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleBookmark = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Article ${articleId} bookmarked!`);
  };

  const getDifficultyColor = (level: string) => {
    if (!level) return '#6b7280';
    switch (level.toUpperCase()) {
      case 'BEGINNER':
        return '#10b981';
      case 'INTERMEDIATE':
        return '#f59e0b';
      case 'ADVANCED':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getArticleTypeColor = (type: string) => {
    if (!type) return '#6b7280';
    switch (type.toUpperCase()) {
      case 'RESEARCH':
        return '#8b5cf6';
      case 'TUTORIAL':
        return '#06b6d4';
      case 'GUIDE':
        return '#10b981';
      case 'NEWS':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const renderArticleContent = (content: string) => ({ __html: content });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading Articles from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>Error</div>
          <h1 className={styles.errorTitle}>Error Loading Articles</h1>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.primaryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Articles | The Artemis</title>
        <meta
          name="description"
          content="Discover insightful articles about AI in healthcare staffing and workforce optimization."
        />
        <meta
          name="keywords"
          content="healthcare, AI, staffing, workforce, optimization"
        />
        <meta property="og:title" content="Articles | The Artemis" />
        <meta
          property="og:description"
          content="Discover insightful articles about AI in healthcare staffing and workforce optimization."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Articles</span>
          </nav>

          <div className={styles.headerContent}>
            <h1 className={styles.title}>Knowledge Hub</h1>
            <p className={styles.summary}>
              Explore our collection of insightful articles on AI-powered healthcare staffing and workforce optimization
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{articles.length}</span>
                <span className={styles.statLabel}>Total Articles</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{articles.filter((a) => a.featured).length}</span>
                <span className={styles.statLabel}>Featured</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{categories.length - 1}</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
            </div>
          </div>
        </header>

        {/* API Status Info */}
        <div className={styles.apiStatus}>
          <strong>API Status:</strong> Connected to{' '}
          <code>/api/v1/seo-websites/69c6cb641673f94b68ce9990/articles</code> | Showing{' '}
          <strong>{filteredArticles.length}</strong> of <strong>{articles.length}</strong> published articles
          {selectedArticle && (
            <span>
              {' '}
              | Viewing: <strong>{selectedArticle.title}</strong>
            </span>
          )}
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search articles, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className={styles.clearSearch}>
                Clear
              </button>
            )}
          </div>

          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryFilter} ${selectedCategory === category ? styles.active : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className={`${styles.articleCard} ${article.featured ? styles.featured : ''} ${
                selectedArticle?.id === article.id ? styles.selected : ''
              }`}
              onClick={() => handleArticleClick(article)}
            >
              {article.featured && (
                <div className={styles.featuredRibbon}>
                  <span>Featured</span>
                </div>
              )}

              <div className={styles.cardImageContainer}>
                <img
                  src={article.featuredImage}
                  alt={article.featuredImageAlt || article.title}
                  className={styles.cardImage}
                  onError={(e) => {
                    // e.currentTarget.src = '/api/placeholder/400/200';
                  }}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.cardBadges}>
                  <span
                    className={styles.typeBadge}
                    style={{ backgroundColor: getArticleTypeColor(article.articleType) }}
                  >
                    {article.articleType || 'Article'}
                  </span>
                  <span
                    className={styles.difficultyBadge}
                    style={{ backgroundColor: getDifficultyColor(article.difficultyLevel) }}
                  >
                    {article.difficultyLevel || 'All Levels'}
                  </span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.category}>{article.category}</span>
                  {article.subCategory && (
                    <span className={styles.subCategory}>{article.subCategory}</span>
                  )}
                  <span className={styles.publishDate}>{formatDate(article.publishedAt)}</span>
                  <span className={styles.readingTime}>{article.readingTimeMinutes || 5} min read</span>
                </div>

                <h2 className={styles.cardTitle}>{article.title}</h2>

                <p className={styles.cardSummary}>{article.summary || 'No summary available'}</p>

                <div className={styles.cardAuthor}>
                  <div className={styles.authorInfo}>
                    {article.authorAvatar && (
                      <img
                        src={article.authorAvatar}
                        alt={article.author}
                        className={styles.authorAvatar}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>{article.author || 'Unknown Author'}</span>
                      {article.authorBio && (
                        <span className={styles.authorBio}>
                          {article.authorBio.length > 60
                            ? `${article.authorBio.substring(0, 60)}...`
                            : article.authorBio}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {article.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                    {article.tags.length > 4 && (
                      <span className={styles.moreTags}>+{article.tags.length - 4} more</span>
                    )}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  <div className={styles.cardStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Views:</span>
                      <span>{formatNumber(article.viewCount)}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Shares:</span>
                      <span>{formatNumber(article.shareCount)}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Bookmarks:</span>
                      <span>{formatNumber(article.bookmarkCount)}</span>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      onClick={(e) => handleShare(article, 'twitter', e)}
                      className={styles.actionButton}
                      title="Share on Twitter"
                    >
                      Tweet
                    </button>
                    <button
                      onClick={(e) => handleShare(article, 'linkedin', e)}
                      className={styles.actionButton}
                      title="Share on LinkedIn"
                    >
                      Share
                    </button>
                    <button
                      onClick={(e) => handleBookmark(article.id, e)}
                      className={styles.actionButton}
                      title="Bookmark article"
                    >
                      Bookmark
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Details Sections */}
        <div className={styles.articleDetailsContainer}>
          {filteredArticles.map((article) => (
            <section
              key={article.id}
              id={`article-${article.slug}`}
              ref={(el: HTMLDivElement | null) => {
                articleDetailRefs.current[article.id] = el;
              }}
              className={`${styles.articleDetail} ${expandedArticles.has(article.id) ? styles.expanded : ''}`}
            >
              <div className={styles.articleDetailHeader}>
                <div className={styles.articleDetailMeta}>
                  <span className={styles.articleDetailCategory}>{article.category}</span>
                  {article.subCategory && (
                    <span className={styles.articleDetailSubCategory}>{article.subCategory}</span>
                  )}
                  <span className={styles.articleDetailDate}>{formatDate(article.publishedAt)}</span>
                  <span className={styles.articleDetailReadingTime}>
                    {article.readingTimeMinutes || 5} min read
                  </span>
                  <span
                    className={styles.articleDetailType}
                    style={{ backgroundColor: getArticleTypeColor(article.articleType) }}
                  >
                    {article.articleType}
                  </span>
                  <span
                    className={styles.articleDetailDifficulty}
                    style={{ backgroundColor: getDifficultyColor(article.difficultyLevel) }}
                  >
                    {article.difficultyLevel}
                  </span>
                </div>

                <h1 className={styles.articleDetailTitle}>{article.title}</h1>

                {article.featuredImage && (
                  <div className={styles.articleDetailImageContainer}>
                    <img
                      src={article.featuredImage}
                      alt={article.featuredImageAlt || article.title}
                      className={styles.articleDetailImage}
                    />
                  </div>
                )}

                <div className={styles.articleDetailAuthor}>
                  {article.authorAvatar && (
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className={styles.articleDetailAuthorAvatar}
                    />
                  )}
                  <div className={styles.articleDetailAuthorInfo}>
                    <h3 className={styles.articleDetailAuthorName}>{article.author}</h3>
                    {article.authorBio && (
                      <p className={styles.articleDetailAuthorBio}>{article.authorBio}</p>
                    )}
                    {article.authorLinkedIn && (
                      <a
                        href={article.authorLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.articleDetailAuthorLinkedIn}
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.articleDetailContent}>
                <div className={styles.articleContent} dangerouslySetInnerHTML={renderArticleContent(article.content)} />

                {/* Gallery Images */}
                {article.galleryImages && article.galleryImages.length > 0 && (
                  <div className={styles.gallerySection}>
                    <h4>Image Gallery</h4>
                    <div className={styles.galleryGrid}>
                      {article.galleryImages.map((img, idx) => (
                        <div key={idx} className={styles.galleryItem}>
                          <img src={img} alt={`Gallery ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Table of Contents */}
                {article.tableOfContents && article.tableOfContents.length > 0 && (
                  <div className={styles.tocSection}>
                    <h4>Table of Contents</h4>
                    <ul className={styles.tocList}>
                      {article.tableOfContents.map((item) => (
                        <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 20}px` }}>
                          <a href={item.anchor} className={styles.tocLink}>
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* References */}
                {article.references && article.references.length > 0 && (
                  <div className={styles.referencesSection}>
                    <h4>References</h4>
                    <ul className={styles.referencesList}>
                      {article.references.map((ref, idx) => (
                        <li key={idx}>
                          <a href={ref.url} target="_blank" rel="noopener noreferrer">
                            {ref.title}
                          </a>{' '}
                          – {ref.author} ({new Date(ref.accessedDate * 1000).toLocaleDateString()})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metadata */}
                {article.metadata && Object.keys(article.metadata).length > 0 && (
                  <div className={styles.metadataSection}>
                    <h4>Additional Information</h4>
                    <div className={styles.metadataGrid}>
                      {article.metadata.targetAudience && (
                        <div className={styles.metadataItem}>
                          <strong>Target Audience:</strong> {article.metadata.targetAudience}
                        </div>
                      )}
                      {article.metadata.contentType && (
                        <div className={styles.metadataItem}>
                          <strong>Content Type:</strong> {article.metadata.contentType}
                        </div>
                      )}
                      {article.metadata.region && (
                        <div className={styles.metadataItem}>
                          <strong>Region:</strong> {article.metadata.region}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className={styles.articleDetailTags}>
                    <h4>Tags:</h4>
                    <div className={styles.articleTagsList}>
                      {article.tags.map((tag, index) => (
                        <span key={index} className={styles.articleTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.articleDetailActions}>
                  <button onClick={() => toggleArticleExpansion(article.id)} className={styles.collapseButton}>
                    {expandedArticles.has(article.id) ? 'Collapse' : 'Expand'}
                  </button>
                  <div className={styles.articleSocialActions}>
                    <span>Share: </span>
                    <button onClick={(e) => handleShare(article, 'twitter', e)} className={styles.socialButton}>
                      Twitter
                    </button>
                    <button onClick={(e) => handleShare(article, 'linkedin', e)} className={styles.socialButton}>
                      LinkedIn
                    </button>
                    <button onClick={(e) => handleShare(article, 'facebook', e)} className={styles.socialButton}>
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>No results</div>
            <h3 className={styles.emptyTitle}>No articles found</h3>
            <p className={styles.emptyMessage}>
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria'
                : articles.length === 0
                ? 'No published articles available from the API'
                : 'No articles match your criteria'}
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className={styles.primaryButton}
              >
                Clear Filters
              </button>
            )}
            {articles.length === 0 && (
              <button onClick={() => window.location.reload()} className={styles.primaryButton}>
                Refresh Articles
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <h3 className={styles.footerTitle}>The Artemis</h3>
              <p className={styles.footerDescription}>
                Revolutionizing healthcare staffing through AI-powered solutions and insights.
              </p>
            </div>
            <div className={styles.footerStats}>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>{articles.length}</span>
                <span className={styles.footerStatLabel}>Articles Published</span>
              </div>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>
                  {articles.reduce((acc, article) => acc + (article.viewCount || 0), 0)}
                </span>
                <span className={styles.footerStatLabel}>Total Views</span>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>© {new Date().getFullYear()} The Artemis. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ArticlePage;