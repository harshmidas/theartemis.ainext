"use client";

import React, { useState, useEffect } from 'react';
import styles from './BlogPost.module.css';
// import '..article/Article.module.css';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  scheduledFor: string | null;
  seoMeta: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
    structuredData: {
      type: string;
      publisher: string;
      author: string;
      section: string;
    };
    noIndex: boolean;
    noFollow: boolean;
  };
  viewCount: number;
  shareCount: number;
  commentCount: number;
  readingTimeMinutes: number;
  relatedBlogIds: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  metadata: {
    series: string;
    readTimeCategory: string;
    relatedCompanies: string[];
    language: string;
    geoTarget: string;
  };
}

const BlogPost: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching blog posts from API...');
        
        const response = await fetch('/api/v1/seo-blogs/', {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'X-Tenant': '68b20dd0fb42964f2328b424'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogPostData[] = await response.json();
        console.log('✅ Blog API Response received:', data);
        console.log(`📊 Total blog posts from API: ${data.length}`);
        
        // Filter only published posts
        const publishedPosts = data.filter(post => post.published && post.status === 'PUBLISHED');
        console.log(`🎯 Published blog posts after filtering: ${publishedPosts.length}`);
        setBlogPosts(publishedPosts);
        
        // Simulate related posts
        if (publishedPosts.length > 0) {
          setRelatedPosts(publishedPosts.slice(0, 3).map((post, index) => ({
            ...post,
            id: `related-${index}`,
            title: `Related: ${post.title}`,
            excerpt: `Explore more about ${post.category} and related topics...`
          })));
        }
        
      } catch (err) {
        console.error('❌ Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Handle post card click
  const handlePostClick = (post: BlogPostData) => {
    setSelectedPost(post);
    
    // Add to expanded posts set
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      newSet.add(post.id);
      return newSet;
    });

    // Scroll to the post detail section
    setTimeout(() => {
      const element = document.getElementById(`post-${post.slug}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }
    }, 100);
  };

  // Toggle post expansion
  const togglePostExpansion = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Get unique categories for filter
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => 
                           tag.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleShare = (post: BlogPostData, platform: 'twitter' | 'linkedin' | 'facebook' | 'copy', e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined' 
      ? `${window.location.origin}/blog/${post.slug}`
      : '';
    const title = post.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleBookmark = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Blog post ${postId} bookmarked!`);
  };

  // Function to render post content with basic HTML support
  const renderPostContent = (content: string) => {
    return { __html: content };
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading Blog Posts from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>⚠️</div>
          <h1 className={styles.errorTitle}>Error Loading Blog Posts</h1>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className={styles.primaryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <nav className={styles.breadcrumb}>
            <a href="/" className={styles.breadcrumbLink}>Home</a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Blog</span>
          </nav>

          <div className={styles.headerContent}>
            <h1 className={styles.title}>Blog Hub</h1>
            <p className={styles.summary}>
              Discover insightful articles, tutorials, and news about healthcare technology and innovation
            </p>
            
            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{blogPosts.length}</span>
                <span className={styles.statLabel}>Total Posts</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {blogPosts.filter(p => p.featured).length}
                </span>
                <span className={styles.statLabel}>Featured</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {categories.length - 1}
                </span>
                <span className={styles.statLabel}>Categories</span>
              </div>
            </div>
          </div>
        </header>

        {/* API Status Info */}
        <div className={styles.apiStatus}>
          <strong>📡 API Status:</strong> Connected to{' '}
          <code>/api/v1/seo-blogs</code>{' '}
          | Showing <strong>{filteredPosts.length}</strong> of{' '}
          <strong>{blogPosts.length}</strong> published posts
          {selectedPost && (
            <span> | 📖 Viewing: <strong>{selectedPost.title}</strong></span>
          )}
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.searchBox}>
            <div className={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Search blog posts, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className={styles.clearSearch}
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryFilter} ${
                  selectedCategory === category ? styles.active : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className={`${styles.postCard} ${post.featured ? styles.featured : ''} ${
                selectedPost?.id === post.id ? styles.selected : ''
              }`}
              onClick={() => handlePostClick(post)}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className={styles.featuredRibbon}>
                  <span>⭐ Featured</span>
                </div>
              )}

              {/* Image */}
              <div className={styles.cardImageContainer}>
                <img 
                  src={post.featuredImage} 
                  alt={post.featuredImageAlt || post.title}
                  className={styles.cardImage}
                  onError={(e) => {
                    // e.currentTarget.src = '/api/placeholder/400/200';
                  }}
                />
                <div className={styles.imageOverlay} />
                
                {/* Category Badge */}
                <div className={styles.cardBadges}>
                  <span className={styles.categoryBadge}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.publishDate}>
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className={styles.readingTime}>
                    {post.readingTimeMinutes || 5} min read
                  </span>
                </div>

                <h2 className={styles.cardTitle}>
                  {post.title}
                </h2>

                <p className={styles.cardSummary}>
                  {post.excerpt || 'No excerpt available'}
                </p>

                {/* Author Info */}
                <div className={styles.cardAuthor}>
                  <div className={styles.authorInfo}>
                    {post.authorAvatar && (
                      <img 
                        src={post.authorAvatar} 
                        alt={post.author}
                        className={styles.authorAvatar}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>
                        {post.author || 'Unknown Author'}
                      </span>
                      {post.authorBio && (
                        <span className={styles.authorBio}>
                          {post.authorBio.length > 60 
                            ? `${post.authorBio.substring(0, 60)}...`
                            : post.authorBio
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {post.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 4 && (
                      <span className={styles.moreTags}>
                        +{post.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Stats and Actions */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardStats}>
                    <div className={styles.stat}>
                      <span className={styles.statIcon}>👁️</span>
                      <span>{formatNumber(post.viewCount || 0)}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statIcon}>💬</span>
                      <span>{formatNumber(post.commentCount || 0)}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statIcon}>📤</span>
                      <span>{formatNumber(post.shareCount || 0)}</span>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button 
                      onClick={(e) => handleShare(post, 'twitter', e)}
                      className={styles.actionButton}
                      title="Share on Twitter"
                    >
                      🐦
                    </button>
                    <button 
                      onClick={(e) => handleShare(post, 'linkedin', e)}
                      className={styles.actionButton}
                      title="Share on LinkedIn"
                    >
                      💼
                    </button>
                    <button 
                      onClick={(e) => handleBookmark(post.id, e)}
                      className={styles.actionButton}
                      title="Bookmark post"
                    >
                      📑
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Post Details Sections */}
        <div className={styles.postDetailsContainer}>
          {filteredPosts.map((post) => (
            <section 
              key={post.id}
              id={`post-${post.slug}`}
              className={`${styles.postDetail} ${
                expandedPosts.has(post.id) ? styles.expanded : ''
              }`}
            >
              <div className={styles.postDetailHeader}>
                <div className={styles.postDetailMeta}>
                  <span className={styles.postDetailCategory}>{post.category}</span>
                  <span className={styles.postDetailDate}>
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className={styles.postDetailReadingTime}>
                    {post.readingTimeMinutes || 5} min read
                  </span>
                  {post.metadata?.series && (
                    <span className={styles.seriesBadge}>
                      Series: {post.metadata.series}
                    </span>
                  )}
                </div>

                <h1 className={styles.postDetailTitle}>
                  {post.title}
                </h1>

                <p className={styles.postDetailExcerpt}>
                  {post.excerpt}
                </p>

                {post.featuredImage && (
                  <div className={styles.postDetailImageContainer}>
                    <img 
                      src={post.featuredImage} 
                      alt={post.featuredImageAlt || post.title}
                      className={styles.postDetailImage}
                    />
                  </div>
                )}

                <div className={styles.postDetailAuthor}>
                  {post.authorAvatar && (
                    <img 
                      src={post.authorAvatar} 
                      alt={post.author}
                      className={styles.postDetailAuthorAvatar}
                    />
                  )}
                  <div className={styles.postDetailAuthorInfo}>
                    <h3 className={styles.postDetailAuthorName}>{post.author}</h3>
                    {post.authorBio && (
                      <p className={styles.postDetailAuthorBio}>{post.authorBio}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.postDetailContent}>
                <div 
                  className={styles.postContent}
                  dangerouslySetInnerHTML={renderPostContent(post.content)}
                />
                
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postDetailTags}>
                    <h4>Topics Covered</h4>
                    <div className={styles.postTagsList}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.postTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEO Meta Info */}
                {post.seoMeta && (
                  <div className={styles.seoMetaSection}>
                    <h4>SEO Information</h4>
                    <div className={styles.seoMetaGrid}>
                      <div className={styles.seoMetaItem}>
                        <strong>Meta Title:</strong>
                        <span>{post.seoMeta.metaTitle}</span>
                      </div>
                      <div className={styles.seoMetaItem}>
                        <strong>Meta Description:</strong>
                        <span>{post.seoMeta.metaDescription}</span>
                      </div>
                      {post.seoMeta.metaKeywords && (
                        <div className={styles.seoMetaItem}>
                          <strong>Keywords:</strong>
                          <span>{post.seoMeta.metaKeywords.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className={styles.postDetailActions}>
                  <button 
                    onClick={() => togglePostExpansion(post.id)}
                    className={styles.collapseButton}
                  >
                    {expandedPosts.has(post.id) ? '▲ Collapse' : '▼ Expand'}
                  </button>
                  <div className={styles.postSocialActions}>
                    <span>Share: </span>
                    <button 
                      onClick={(e) => handleShare(post, 'twitter', e)}
                      className={styles.socialButton}
                    >
                      Twitter
                    </button>
                    <button 
                      onClick={(e) => handleShare(post, 'linkedin', e)}
                      className={styles.socialButton}
                    >
                      LinkedIn
                    </button>
                    <button 
                      onClick={(e) => handleShare(post, 'facebook', e)}
                      className={styles.socialButton}
                    >
                      Facebook
                    </button>
                    <button 
                      onClick={(e) => handleShare(post, 'copy', e)}
                      className={styles.socialButton}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedPostsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Related Posts</h2>
              <p className={styles.sectionSubtitle}>Continue reading with these related articles</p>
            </div>
            <div className={styles.relatedPostsGrid}>
              {relatedPosts.map((post) => (
                <article key={post.id} className={styles.relatedPostCard}>
                  <div className={styles.relatedPostImage}>
                    <img 
                      src={post.featuredImage } 
                      alt={post.featuredImageAlt || post.title}
                    />
                    <div className={styles.relatedPostCategory}>{post.category}</div>
                  </div>
                  <div className={styles.relatedPostContent}>
                    <h3 className={styles.relatedPostTitle}>{post.title}</h3>
                    <p className={styles.relatedPostExcerpt}>{post.excerpt}</p>
                    <a href={`/blog/${post.slug}`} className={styles.readMoreLink}>
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No blog posts found</h3>
            <p className={styles.emptyMessage}>
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : blogPosts.length === 0 
                  ? 'No published blog posts available from the API'
                  : 'No posts match your criteria'
              }
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
            {blogPosts.length === 0 && (
              <button 
                onClick={() => window.location.reload()}
                className={styles.primaryButton}
              >
                Refresh Posts
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <h3 className={styles.footerTitle}>Artemis Blog</h3>
              <p className={styles.footerDescription}>
                Sharing insights and innovations in healthcare technology and staffing solutions.
              </p>
            </div>
            <div className={styles.footerStats}>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>{blogPosts.length}</span>
                <span className={styles.footerStatLabel}>Posts Published</span>
              </div>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>
                  {blogPosts.reduce((acc, post) => acc + (post.viewCount || 0), 0)}
                </span>
                <span className={styles.footerStatLabel}>Total Views</span>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} Artemis Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BlogPost;