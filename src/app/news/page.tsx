"use client";

import { useState, useEffect } from 'react';
import styles from './News.module.css';

interface SEOMeta {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleSection?: string;
  articleTags?: string[];
  noIndex?: boolean;
  structuredData?: any;
}

interface Update {
  timestamp: number; // seconds
  updateType: string;
  content: string;
  updatedBy?: string;
}

interface Metadata {
  targetAudience?: string;
  region?: string;
  contentType?: string;
  wordCount?: number;
  readingLevel?: string;
}

interface NewsArticleData {
  id: string;
  websiteId: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  publishedAt: number; // seconds
  reporter?: string;
  location?: string;
  dateline?: string;
  viewCount?: number;
  shareCount?: number;
  featuredImage?: string;
  featuredImageAlt?: string;
  mediaGallery?: string[];
  updates?: Update[];
  tags?: string[];
  source?: string;
  sourceUrl?: string;
  metadata?: Metadata;
  expiresAt?: number; // seconds
  breakingNews?: boolean;
  priority?: 'BREAKING' | 'HIGH' | 'MEDIUM' | 'LOW';
  seoMeta?: SEOMeta;
  featured?: boolean;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  updatedBy?: string;
}

const NewsArticles = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleData | null>(null);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        setLoading(true);
        console.log('Fetching news articles from new API...');

        const response = await fetch(
          'https://5cc5-103-16-29-36.ngrok-free.app/api/v1/seo-websites/69c6cb641673f94b68ce9990/news',
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

        const data: NewsArticleData[] = await response.json();
        console.log('News API Response received:', data);
        console.log(`Total news articles from API: ${data.length}`);

        // Normalize timestamps (convert seconds to milliseconds)
        const normalizedData = data.map((article) => ({
          ...article,
          publishedAt:
            typeof article.publishedAt === 'number' && article.publishedAt < 1e12
              ? article.publishedAt * 1000
              : article.publishedAt,
          expiresAt:
            article.expiresAt && typeof article.expiresAt === 'number' && article.expiresAt < 1e12
              ? article.expiresAt * 1000
              : article.expiresAt,
          updates: article.updates?.map((update) => ({
            ...update,
            timestamp:
              typeof update.timestamp === 'number' && update.timestamp < 1e12
                ? update.timestamp * 1000
                : update.timestamp,
          })),
        }));

        // Filter only published articles
        const publishedArticles = normalizedData.filter((article) => article.status === 'PUBLISHED');
        console.log(`Published news articles after filtering: ${publishedArticles.length}`);
        setNewsArticles(publishedArticles);
      } catch (err) {
        console.error('Error fetching news articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, []);

  const handleArticleClick = (article: NewsArticleData) => {
    setSelectedArticle(article);
    setExpandedArticles((prev) => {
      const newSet = new Set(prev);
      newSet.add(article.id);
      return newSet;
    });

    setTimeout(() => {
      const element = document.getElementById(`news-${article.slug}`);
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

  const categories = ['All', ...new Set(newsArticles.map((article) => article.category))];

  const filteredArticles = newsArticles.filter((article) => {
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
        hour: '2-digit',
        minute: '2-digit',
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
    article: NewsArticleData,
    platform: 'twitter' | 'linkedin' | 'facebook' | 'copy',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/news/${article.slug}` : '';
    const title = article.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: url,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleBookmark = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`News article ${articleId} bookmarked!`);
  };

  const getPriorityColor = (priority: string = 'MEDIUM') => {
    switch (priority.toUpperCase()) {
      case 'BREAKING':
        return '#dc2626';
      case 'HIGH':
        return '#ef4444';
      case 'MEDIUM':
        return '#f59e0b';
      case 'LOW':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const renderArticleContent = (content: string) => ({ __html: content });

  const isExpired = (expiresAt: number | undefined) => {
    if (!expiresAt) return false;
    return Date.now() > expiresAt;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading News Articles from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>Error</div>
          <h1 className={styles.errorTitle}>Error Loading News Articles</h1>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.primaryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>News</span>
        </nav>

        <div className={styles.headerContent}>
          <h1 className={styles.title}>News Hub</h1>
          <p className={styles.summary}>
            Stay updated with the latest news, breaking stories, and important updates from around the world
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{newsArticles.length}</span>
              <span className={styles.statLabel}>Total Articles</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{newsArticles.filter((a) => a.breakingNews).length}</span>
              <span className={styles.statLabel}>Breaking News</span>
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
        <code>/api/v1/seo-websites/69c6cb641673f94b68ce9990/news</code> | Showing{' '}
        <strong>{filteredArticles.length}</strong> of <strong>{newsArticles.length}</strong> published articles
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
            placeholder="Search news articles, tags, or topics..."
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

      {/* News Articles Grid */}
      <div className={styles.articlesGrid}>
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className={`${styles.articleCard} ${article.breakingNews ? styles.breaking : ''} ${
              selectedArticle?.id === article.id ? styles.selected : ''
            }`}
            onClick={() => handleArticleClick(article)}
          >
            {/* Breaking News Badge */}
            {article.breakingNews && (
              <div className={styles.breakingRibbon}>
                <span className={styles.liveDot}></span>
                BREAKING NEWS
              </div>
            )}

            {/* Priority Badge */}
            {article.priority && article.priority !== 'MEDIUM' && (
              <div
                className={styles.priorityBadge}
                style={{ backgroundColor: getPriorityColor(article.priority) }}
              >
                {article.priority}
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
                <span className={styles.categoryBadge}>{article.category}</span>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.publishDate}>{formatDate(article.publishedAt)}</span>
                <span className={styles.readingTime}>
                  {article.metadata?.wordCount ? Math.ceil(article.metadata.wordCount / 200) : 5} min read
                </span>
              </div>

              <h2 className={styles.cardTitle}>{article.title}</h2>

              <p className={styles.cardSummary}>{article.summary || 'No summary available'}</p>

              {/* Reporter Info */}
              <div className={styles.cardReporter}>
                <div className={styles.reporterInfo}>
                  <div className={styles.reporterAvatar}>{article.reporter?.charAt(0) || 'N'}</div>
                  <div className={styles.reporterDetails}>
                    <span className={styles.reporterName}>{article.reporter || 'News Reporter'}</span>
                    {article.location && <span className={styles.reporterLocation}>{article.location}</span>}
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
                  {article.updates && article.updates.length > 0 && (
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Updates:</span>
                      <span>{article.updates.length}</span>
                    </div>
                  )}
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
                    onClick={(e) => handleShare(article, 'facebook', e)}
                    className={styles.actionButton}
                    title="Share on Facebook"
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

      {/* News Article Details Sections */}
      <div className={styles.articleDetailsContainer}>
        {filteredArticles.map((article: NewsArticleData) => (
          <section
            key={article.id}
            id={`news-${article.slug}`}
            className={`${styles.articleDetail} ${expandedArticles.has(article.id) ? styles.expanded : ''}`}
          >
            <div className={styles.articleDetailHeader}>
              {/* Breaking News Banner */}
              {article.breakingNews && (
                <div className={styles.breakingBanner}>
                  <div className={styles.breakingContent}>
                    <span className={styles.liveDot}></span>
                    <span className={styles.breakingText}>BREAKING NEWS</span>
                    <span className={styles.breakingTime}>LIVE</span>
                  </div>
                </div>
              )}

              <div className={styles.articleDetailMeta}>
                <span className={styles.articleDetailCategory}>{article.category}</span>
                <span className={styles.articleDetailDate}>{formatDate(article.publishedAt)}</span>
                <span className={styles.articleDetailReadingTime}>
                  {article.metadata?.wordCount ? Math.ceil(article.metadata.wordCount / 200) : 5} min read
                </span>
                {article.priority && article.priority !== 'MEDIUM' && (
                  <span
                    className={styles.priorityTag}
                    style={{ backgroundColor: getPriorityColor(article.priority) }}
                  >
                    {article.priority} PRIORITY
                  </span>
                )}
                {isExpired(article.expiresAt) && <span className={styles.expiredTag}>EXPIRED</span>}
              </div>

              <h1 className={styles.articleDetailTitle}>{article.title}</h1>

              {article.dateline && <p className={styles.dateline}>{article.dateline}</p>}

              <p className={styles.articleDetailSummary}>{article.summary}</p>

              {/* Reporter Info */}
              <div className={styles.articleDetailReporter}>
                <div className={styles.reporterAvatar}>{article.reporter?.charAt(0) || 'N'}</div>
                <div className={styles.reporterInfo}>
                  <h3 className={styles.reporterName}>{article.reporter || 'News Reporter'}</h3>
                  <p className={styles.reporterLocation}>{article.location || 'Global Desk'}</p>
                </div>
              </div>

              {article.featuredImage && (
                <div className={styles.articleDetailImageContainer}>
                  <img
                    src={article.featuredImage}
                    alt={article.featuredImageAlt || article.title}
                    className={styles.articleDetailImage}
                  />
                  {article.featuredImageAlt && (
                    <div className={styles.imageCaption}>{article.featuredImageAlt}</div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.articleDetailContent}>
              <div className={styles.articleContent} dangerouslySetInnerHTML={renderArticleContent(article.content)} />

              {/* Media Gallery */}
              {article.mediaGallery && article.mediaGallery.length > 0 && (
                <div className={styles.mediaGallery}>
                  <h4>Media Gallery</h4>
                  <div className={styles.galleryGrid}>
                    {article.mediaGallery.map((image, index) => (
                      <div key={index} className={styles.galleryItem}>
                        <img src={image} alt={`Gallery ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Updates Timeline */}
              {article.updates && article.updates.length > 0 && (
                <div className={styles.updatesSection}>
                  <h4>Story Updates ({article.updates.length})</h4>
                  <div className={styles.timeline}>
                    {article.updates.map((update, index) => (
                      <div key={index} className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          <div className={styles.markerDot}></div>
                          {index < article.updates!.length - 1 && <div className={styles.timelineLine}></div>}
                        </div>
                        <div className={styles.timelineContent}>
                          <div className={styles.updateHeader}>
                            <span className={styles.updateType}>{update.updateType}</span>
                            <span className={styles.updateTime}>{formatDate(update.timestamp)}</span>
                          </div>
                          <p className={styles.updateContent}>{update.content}</p>
                          {update.updatedBy && <span className={styles.updateBy}>Updated by {update.updatedBy}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Information */}
              {(article.source || article.sourceUrl) && (
                <div className={styles.sourceSection}>
                  <h4>Source Information</h4>
                  <div className={styles.sourceContent}>
                    {article.source && (
                      <p>
                        <strong>Source:</strong> {article.source}
                      </p>
                    )}
                    {article.sourceUrl && (
                      <p>
                        <strong>Original URL:</strong>{' '}
                        <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {article.sourceUrl}
                        </a>
                      </p>
                    )}
                  </div>
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
                    {article.metadata.region && (
                      <div className={styles.metadataItem}>
                        <strong>Region:</strong> {article.metadata.region}
                      </div>
                    )}
                    {article.metadata.contentType && (
                      <div className={styles.metadataItem}>
                        <strong>Content Type:</strong> {article.metadata.contentType}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className={styles.articleDetailTags}>
                  <h4>Related Topics</h4>
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
                  <button onClick={(e) => handleShare(article, 'facebook', e)} className={styles.socialButton}>
                    Facebook
                  </button>
                  <button onClick={(e) => handleShare(article, 'linkedin', e)} className={styles.socialButton}>
                    LinkedIn
                  </button>
                  <button onClick={(e) => handleShare(article, 'copy', e)} className={styles.socialButton}>
                    Copy Link
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
          <h3 className={styles.emptyTitle}>No news articles found</h3>
          <p className={styles.emptyMessage}>
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or filter criteria'
              : newsArticles.length === 0
              ? 'No published news articles available from the API'
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
          {newsArticles.length === 0 && (
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
            <h3 className={styles.footerTitle}>News Network</h3>
            <p className={styles.footerDescription}>
              Delivering timely, accurate, and comprehensive news coverage from around the globe.
            </p>
          </div>
          <div className={styles.footerStats}>
            <div className={styles.footerStat}>
              <span className={styles.footerStatNumber}>{newsArticles.length}</span>
              <span className={styles.footerStatLabel}>Articles Published</span>
            </div>
            <div className={styles.footerStat}>
              <span className={styles.footerStatNumber}>
                {newsArticles.reduce((acc, article) => acc + (article.viewCount || 0), 0)}
              </span>
              <span className={styles.footerStatLabel}>Total Views</span>
            </div>
            <div className={styles.footerStat}>
              <span className={styles.footerStatNumber}>{newsArticles.filter((a) => a.breakingNews).length}</span>
              <span className={styles.footerStatLabel}>Breaking Stories</span>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerText}>© {new Date().getFullYear()} News Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NewsArticles;