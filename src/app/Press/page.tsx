"use client";
import React, { useState, useEffect } from 'react';
import styles from './PressRelease.module.css';

interface PressReleaseData {
  id: string;
  title: string;
  slug: string;
  content: string;
  subtitle: string;
  summary: string;
  featuredImage: string;
  featuredImageAlt: string;
  mediaAssets: string[];
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  contactInfo: {
    mediaContactName: string;
    mediaContactEmail: string;
    mediaContactPhone: string;
    prContactName: string;
    prContactEmail: string;
    prContactPhone: string;
    additionalContacts: {
      mediaRelations: string;
      investorRelations: string;
      customerSupport: string;
    };
  };
  releaseDate: string;
  location: string;
  boilerplate: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  distributionConfig: {
    autoDistribute: boolean;
    distributionChannels: string[];
    targetMediaOutlets: string[];
    scheduledDistributionTime: string;
    customSettings: {
      pressEmbargo: string;
      contactFollowUp: string;
      priority: string;
    };
  };
  distributionHistory: Array<{
    distributedAt: string;
    channel: string;
    status: string;
    responseMessage: string;
    metadata: {
      distributionId?: string;
      views?: number;
      shares?: number;
      engagement?: number;
      postId?: string;
    };
  }>;
  seoMeta: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogType: string;
    noIndex: boolean;
    structuredData: {
      '@type': string;
      headline: string;
      datePublished: string;
      publisher: string;
      author: string;
    };
  };
  viewCount: number;
  downloadCount: number;
  shareCount: number;
  relatedPressIds: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  metadata: {
    internalNotes: string;
    region: string;
    priority: string;
  };
}

const PressRelease: React.FC = () => {
  const [pressReleases, setPressReleases] = useState<PressReleaseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRelease, setSelectedRelease] = useState<PressReleaseData | null>(null);
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching press releases from API...');
        
        const response = await fetch('/api/v1/seo-press/', {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'X-Tenant': '68b20dd0fb42964f2328b424'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PressReleaseData[] = await response.json();
        console.log('✅ Press API Response received:', data);
        console.log(`📊 Total press releases from API: ${data.length}`);
        
        // Filter only published releases
        const publishedReleases = data.filter(release => release.published && release.status === 'PUBLISHED');
        console.log(`🎯 Published press releases after filtering: ${publishedReleases.length}`);
        setPressReleases(publishedReleases);
        
      } catch (err) {
        console.error('❌ Error fetching press releases:', err);
        setError(err instanceof Error ? err.message : 'Failed to load press releases');
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  // Handle release card click
  const handleReleaseClick = (release: PressReleaseData) => {
    setSelectedRelease(release);
    
    // Add to expanded releases set
    setExpandedReleases(prev => {
      const newSet = new Set(prev);
      newSet.add(release.id);
      return newSet;
    });

    // Scroll to the release detail section
    setTimeout(() => {
      const element = document.getElementById(`press-${release.slug}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }
    }, 100);
  };

  // Toggle release expansion
  const toggleReleaseExpansion = (releaseId: string) => {
    setExpandedReleases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(releaseId)) {
        newSet.delete(releaseId);
      } else {
        newSet.add(releaseId);
      }
      return newSet;
    });
  };

  // Get unique categories for filter
  const categories = ['All', ...new Set(pressReleases.map(release => release.category))];

  // Filter releases based on search and category
  const filteredReleases = pressReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (release.tags && release.tags.some(tag => 
                           tag.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    
    const matchesCategory = selectedCategory === 'All' || release.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatNumber = (num: number = 0) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleShare = (release: PressReleaseData, platform: 'twitter' | 'linkedin' | 'facebook' | 'copy', e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined' 
      ? `${window.location.origin}/press/${release.slug}`
      : '';
    const title = release.title;

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

  const handleBookmark = (releaseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Press release ${releaseId} bookmarked!`);
  };

  const handleDownload = (release: PressReleaseData, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Downloading press release: ${release.title}`);
  };

  const getPriorityColor = (priority: string = 'MEDIUM') => {
    switch (priority.toUpperCase()) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Function to render release content with basic HTML support
  const renderReleaseContent = (content: string) => {
    return { __html: content };
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading Press Releases from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>⚠️</div>
          <h1 className={styles.errorTitle}>Error Loading Press Releases</h1>
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
            <span className={styles.breadcrumbCurrent}>Press Releases</span>
          </nav>

          <div className={styles.headerContent}>
            <h1 className={styles.title}>Press Room</h1>
            <p className={styles.summary}>
              Official press releases, company announcements, and media resources
            </p>
            
            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{pressReleases.length}</span>
                <span className={styles.statLabel}>Total Releases</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {pressReleases.filter(r => r.featured).length}
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
          <code>/api/v1/seo-press</code>{' '}
          | Showing <strong>{filteredReleases.length}</strong> of{' '}
          <strong>{pressReleases.length}</strong> published releases
          {selectedRelease && (
            <span> | 📖 Viewing: <strong>{selectedRelease.title}</strong></span>
          )}
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.searchBox}>
            <div className={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Search press releases, tags, or companies..."
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

        {/* Press Releases Grid */}
        <div className={styles.releasesGrid}>
          {filteredReleases.map((release) => (
            <article 
              key={release.id} 
              className={`${styles.releaseCard} ${release.featured ? styles.featured : ''} ${
                selectedRelease?.id === release.id ? styles.selected : ''
              }`}
              onClick={() => handleReleaseClick(release)}
            >
              {/* Featured Badge */}
              {release.featured && (
                <div className={styles.featuredRibbon}>
                  <span>⭐ Featured</span>
                </div>
              )}

              {/* Priority Badge */}
              {release.metadata.priority && release.metadata.priority !== 'MEDIUM' && (
                <div 
                  className={styles.priorityBadge}
                  style={{ backgroundColor: getPriorityColor(release.metadata.priority) }}
                >
                  {release.metadata.priority}
                </div>
              )}

              {/* Image */}
              <div className={styles.cardImageContainer}>
                <img 
                  src={release.featuredImage || '/api/placeholder/400/200'} 
                  alt={release.featuredImageAlt || release.title}
                  className={styles.cardImage}
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/400/200';
                  }}
                />
                <div className={styles.imageOverlay} />
                
                {/* Category Badge */}
                <div className={styles.cardBadges}>
                  <span className={styles.categoryBadge}>
                    {release.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.category}>{release.category}</span>
                  <span className={styles.releaseDate}>
                    {formatDate(release.releaseDate)}
                  </span>
                  <span className={styles.location}>
                    {release.location}
                  </span>
                </div>

                <h2 className={styles.cardTitle}>
                  {release.title}
                </h2>

                <p className={styles.cardSubtitle}>
                  {release.subtitle}
                </p>

                <p className={styles.cardSummary}>
                  {release.summary || 'No summary available'}
                </p>

                {/* Company Info */}
                <div className={styles.cardCompany}>
                  <div className={styles.companyInfo}>
                    {release.companyLogo && (
                      <img 
                        src={release.companyLogo} 
                        alt={release.companyName}
                        className={styles.companyLogo}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className={styles.companyDetails}>
                      <span className={styles.companyName}>
                        {release.companyName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {release.tags && release.tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {release.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                    {release.tags.length > 4 && (
                      <span className={styles.moreTags}>
                        +{release.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Stats and Actions */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardStats}>
                    <div className={styles.stat}>
                      <span className={styles.statIcon}>👁️</span>
                      <span>{formatNumber(release.viewCount)}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statIcon}>📥</span>
                      <span>{formatNumber(release.downloadCount)}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statIcon}>📤</span>
                      <span>{formatNumber(release.shareCount)}</span>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button 
                      onClick={(e) => handleDownload(release, e)}
                      className={styles.actionButton}
                      title="Download PDF"
                    >
                      📥
                    </button>
                    <button 
                      onClick={(e) => handleShare(release, 'twitter', e)}
                      className={styles.actionButton}
                      title="Share on Twitter"
                    >
                      🐦
                    </button>
                    <button 
                      onClick={(e) => handleShare(release, 'linkedin', e)}
                      className={styles.actionButton}
                      title="Share on LinkedIn"
                    >
                      💼
                    </button>
                    <button 
                      onClick={(e) => handleBookmark(release.id, e)}
                      className={styles.actionButton}
                      title="Bookmark release"
                    >
                      📑
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Press Release Details Sections */}
        <div className={styles.releaseDetailsContainer}>
          {filteredReleases.map((release) => (
            <section 
              key={release.id}
              id={`press-${release.slug}`}
              className={`${styles.releaseDetail} ${
                expandedReleases.has(release.id) ? styles.expanded : ''
              }`}
            >
              <div className={styles.releaseDetailHeader}>
                <div className={styles.releaseDetailMeta}>
                  <span className={styles.releaseDetailCategory}>{release.category}</span>
                  <span className={styles.releaseDetailDate}>
                    {formatDate(release.releaseDate)}
                  </span>
                  <span className={styles.releaseDetailLocation}>
                    {release.location}
                  </span>
                  {release.metadata.priority && release.metadata.priority !== 'MEDIUM' && (
                    <span 
                      className={styles.priorityTag}
                      style={{ backgroundColor: getPriorityColor(release.metadata.priority) }}
                    >
                      {release.metadata.priority} PRIORITY
                    </span>
                  )}
                </div>

                <h1 className={styles.releaseDetailTitle}>
                  {release.title}
                </h1>

                <p className={styles.releaseDetailSubtitle}>
                  {release.subtitle}
                </p>

                <p className={styles.releaseDetailSummary}>
                  {release.summary}
                </p>

                {/* Company Info */}
                <div className={styles.releaseDetailCompany}>
                  <div className={styles.companyHeader}>
                    {release.companyLogo && (
                      <img 
                        src={release.companyLogo} 
                        alt={release.companyName}
                        className={styles.companyDetailLogo}
                      />
                    )}
                    <div className={styles.companyDetailInfo}>
                      <h3 className={styles.companyDetailName}>{release.companyName}</h3>
                      {release.companyWebsite && (
                        <a 
                          href={release.companyWebsite} 
                          className={styles.companyWebsite}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {release.companyWebsite}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {release.featuredImage && (
                  <div className={styles.releaseDetailImageContainer}>
                    <img 
                      src={release.featuredImage} 
                      alt={release.featuredImageAlt || release.title}
                      className={styles.releaseDetailImage}
                    />
                    {release.featuredImageAlt && (
                      <div className={styles.imageCaption}>{release.featuredImageAlt}</div>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.releaseDetailContent}>
                <div 
                  className={styles.releaseContent}
                  dangerouslySetInnerHTML={renderReleaseContent(release.content)}
                />
                
                {/* Media Assets */}
                {release.mediaAssets && release.mediaAssets.length > 0 && (
                  <div className={styles.mediaAssetsSection}>
                    <h4>Media Assets</h4>
                    <div className={styles.mediaAssetsGrid}>
                      {release.mediaAssets.map((asset, index) => (
                        <div key={index} className={styles.mediaAssetItem}>
                          <img src={asset} alt={`Media asset ${index + 1}`} />
                          <div className={styles.mediaAssetInfo}>
                            <span className={styles.assetNumber}>Asset #{index + 1}</span>
                            <button className={styles.downloadAssetButton}>
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className={styles.contactSection}>
                  <h4>Media Contacts</h4>
                  <div className={styles.contactGrid}>
                    <div className={styles.contactGroup}>
                      <h5>Media Relations</h5>
                      <p><strong>{release.contactInfo.mediaContactName}</strong></p>
                      <p>📧 {release.contactInfo.mediaContactEmail}</p>
                      <p>📞 {release.contactInfo.mediaContactPhone}</p>
                    </div>
                    <div className={styles.contactGroup}>
                      <h5>PR Contact</h5>
                      <p><strong>{release.contactInfo.prContactName}</strong></p>
                      <p>📧 {release.contactInfo.prContactEmail}</p>
                      <p>📞 {release.contactInfo.prContactPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Distribution Information */}
                <div className={styles.distributionSection}>
                  <h4>Distribution Information</h4>
                  <div className={styles.distributionInfo}>
                    <div className={styles.distributionItem}>
                      <strong>Status:</strong> {release.status}
                    </div>
                    <div className={styles.distributionItem}>
                      <strong>Priority:</strong> {release.distributionConfig.customSettings.priority}
                    </div>
                    <div className={styles.distributionItem}>
                      <strong>Embargo:</strong> {release.distributionConfig.customSettings.pressEmbargo || 'None'}
                    </div>
                  </div>
                  
                  {release.distributionConfig.distributionChannels.length > 0 && (
                    <div className={styles.channelsSection}>
                      <h5>Distribution Channels</h5>
                      <div className={styles.channelsList}>
                        {release.distributionConfig.distributionChannels.map((channel, index) => (
                          <span key={index} className={styles.channelTag}>{channel}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Boilerplate */}
                <div className={styles.boilerplateSection}>
                  <h4>About {release.companyName}</h4>
                  <p className={styles.boilerplateText}>{release.boilerplate}</p>
                </div>

                {/* Tags */}
                {release.tags && release.tags.length > 0 && (
                  <div className={styles.releaseDetailTags}>
                    <h4>Related Topics</h4>
                    <div className={styles.releaseTagsList}>
                      {release.tags.map((tag, index) => (
                        <span key={index} className={styles.releaseTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Release Actions */}
                <div className={styles.releaseDetailActions}>
                  <button 
                    onClick={() => toggleReleaseExpansion(release.id)}
                    className={styles.collapseButton}
                  >
                    {expandedReleases.has(release.id) ? '▲ Collapse' : '▼ Expand'}
                  </button>
                  <div className={styles.releaseSocialActions}>
                    <span>Share: </span>
                    <button 
                      onClick={(e) => handleShare(release, 'twitter', e)}
                      className={styles.socialButton}
                    >
                      Twitter
                    </button>
                    <button 
                      onClick={(e) => handleShare(release, 'linkedin', e)}
                      className={styles.socialButton}
                    >
                      LinkedIn
                    </button>
                    <button 
                      onClick={(e) => handleShare(release, 'facebook', e)}
                      className={styles.socialButton}
                    >
                      Facebook
                    </button>
                    <button 
                      onClick={(e) => handleShare(release, 'copy', e)}
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

        {/* Empty State */}
        {filteredReleases.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📰</div>
            <h3 className={styles.emptyTitle}>No press releases found</h3>
            <p className={styles.emptyMessage}>
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : pressReleases.length === 0 
                  ? 'No published press releases available from the API'
                  : 'No releases match your criteria'
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
            {pressReleases.length === 0 && (
              <button 
                onClick={() => window.location.reload()}
                className={styles.primaryButton}
              >
                Refresh Releases
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <h3 className={styles.footerTitle}>Press Room</h3>
              <p className={styles.footerDescription}>
                Official source for company news, announcements, and media resources.
              </p>
            </div>
            <div className={styles.footerStats}>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>{pressReleases.length}</span>
                <span className={styles.footerStatLabel}>Releases Published</span>
              </div>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>
                  {pressReleases.reduce((acc, release) => acc + (release.viewCount || 0), 0)}
                </span>
                <span className={styles.footerStatLabel}>Total Views</span>
              </div>
              <div className={styles.footerStat}>
                <span className={styles.footerStatNumber}>
                  {pressReleases.filter(r => r.featured).length}
                </span>
                <span className={styles.footerStatLabel}>Featured</span>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} Press Room. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PressRelease;