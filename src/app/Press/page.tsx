"use client";
import React, { useState, useEffect } from 'react';
import './Press.css';

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
    mediaContactEmail: string ;
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
  const [pressRelease, setPressRelease] = useState<PressReleaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMediaAsset, setActiveMediaAsset] = useState<number>(0);

  useEffect(() => {
    const fetchPressRelease = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          '/api/v1/seo-press/slug/artemis-ai-staffing-automation-suite',
          {
            method: 'GET',
            headers: {
              'accept': '*/*',
              'X-Tenant': '68b20dd0fb42964f2328b424'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch press release: ${response.status}`);
        }

        const data = await response.json();
        setPressRelease(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPressRelease();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const title = pressRelease?.title || '';
    const text = pressRelease?.summary || '';

    const shareConfig: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareConfig[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleDownload = () => {
    // Simulate PDF download
    alert('Press release PDF download started');
  };

  if (loading) {
    return (
      <div className="press-loading">
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <div className="loading-pulse"></div>
          </div>
          <div className="loading-content">
            <h3>Loading Press Release</h3>
            <p>Fetching the latest news from our newsroom...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="press-error">
        <div className="error-container">
          <div className="error-icon">📰</div>
          <div className="error-content">
            <h2>Unable to Load Press Release</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pressRelease) {
    return (
      <div className="press-not-found">
        <div className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <div className="not-found-content">
            <h2>Press Release Not Found</h2>
            <p>The requested press release could not be located in our archives.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="press-release">
      {/* SEO Structured Data */}
      {pressRelease.seoMeta?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pressRelease.seoMeta.structuredData)
          }}
        />
      )}

      {/* Header Section */}
      <header className="press-header">
        <div className="header-container">
          {/* Breadcrumb */}
          <nav className="press-breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/press" className="breadcrumb-link">Press</a>
            <span className="breadcrumb-separator">/</span>
            <a 
              href={`/press/category/${pressRelease.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="breadcrumb-link"
            >
              {pressRelease.category}
            </a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Press Release</span>
          </nav>

          {/* Meta Information */}
          <div className="press-meta-header">
            <div className="category-badge">{pressRelease.category}</div>
            {pressRelease.featured && (
              <div className="featured-badge">
                <span className="featured-star">⭐</span>
                Featured
              </div>
            )}
            {pressRelease.metadata.priority === 'HIGH' && (
              <div className="priority-badge urgent">
                <span className="urgent-dot"></span>
                URGENT
              </div>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="title-section">
            <h1 className="press-title">{pressRelease.title}</h1>
            <p className="press-subtitle">{pressRelease.subtitle}</p>
          </div>

          {/* Release Info */}
          <div className="release-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Release Date</div>
                <div className="info-value">{formatDate(pressRelease.releaseDate)}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Location</div>
                <div className="info-value">{pressRelease.location}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Status</div>
                <div className={`status-badge status-${pressRelease.status.toLowerCase()}`}>
                  {pressRelease.status}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="press-stats">
            <div className="stat-item">
              <div className="stat-icon">👁️</div>
              <div className="stat-content">
                <div className="stat-number">{formatNumber(pressRelease.viewCount)}</div>
                <div className="stat-label">Views</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📤</div>
              <div className="stat-content">
                <div className="stat-number">{formatNumber(pressRelease.shareCount)}</div>
                <div className="stat-label">Shares</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📥</div>
              <div className="stat-content">
                <div className="stat-number">{formatNumber(pressRelease.downloadCount)}</div>
                <div className="stat-label">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {pressRelease.featuredImage && (
        <div className="featured-media">
          <div className="image-container">
            <img 
              src={pressRelease.featuredImage} 
              alt={pressRelease.featuredImageAlt}
              className="featured-image"
            />
          </div>
          {pressRelease.featuredImageAlt && (
            <div className="image-caption">{pressRelease.featuredImageAlt}</div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="press-content-layout">
        <div className="content-container">
          
          {/* Primary Content */}
          <main className="primary-content">
            
            {/* Executive Summary */}
            <section className="summary-section">
              <div className="section-header">
                <h2 className="section-title">Executive Summary</h2>
                <div className="section-icon">📋</div>
              </div>
              <div className="summary-content">
                <p className="summary-text">{pressRelease.summary}</p>
              </div>
            </section>

            {/* Press Release Content */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">Press Release Details</h2>
                <div className="section-icon">📄</div>
              </div>
              <article className="press-content">
                <div 
                  className="content-body"
                  dangerouslySetInnerHTML={{ __html: pressRelease.content }}
                />
              </article>
            </section>

            {/* Media Assets */}
            {pressRelease.mediaAssets && pressRelease.mediaAssets.length > 0 && (
              <section className="media-section">
                <div className="section-header">
                  <h2 className="section-title">Media Assets</h2>
                  <div className="section-icon">🖼️</div>
                </div>
                <div className="media-grid">
                  {pressRelease.mediaAssets.map((asset, index) => (
                    <div 
                      key={index} 
                      className={`media-item ${index === activeMediaAsset ? 'active' : ''}`}
                      onClick={() => setActiveMediaAsset(index)}
                    >
                      <div className="media-image">
                        <img src={asset} alt={`Media asset ${index + 1}`} />
                        <div className="media-overlay">
                          <div className="overlay-content">
                            <span className="view-icon">👁️</span>
                            <span>View</span>
                          </div>
                        </div>
                      </div>
                      <div className="media-number">Asset #{index + 1}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {pressRelease.tags && pressRelease.tags.length > 0 && (
              <section className="tags-section">
                <div className="section-header">
                  <h3 className="section-title">Related Topics</h3>
                </div>
                <div className="tags-container">
                  {pressRelease.tags.map((tag, index) => (
                    <span key={index} className="topic-tag">#{tag}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Boilerplate */}
            <section className="boilerplate-section">
              <div className="section-header">
                <h2 className="section-title">About {pressRelease.companyName}</h2>
                <div className="section-icon">🏢</div>
              </div>
              <div className="boilerplate-content">
                <p>{pressRelease.boilerplate}</p>
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="press-sidebar">
            
            {/* Company Information */}
            <div className="sidebar-widget company-widget">
              <div className="widget-header">
                <h4 className="widget-title">Company Information</h4>
                <div className="widget-icon">🏢</div>
              </div>
              <div className="company-content">
                <div className="company-logo">
                  <img 
                    src={pressRelease.companyLogo} 
                    alt={`${pressRelease.companyName} logo`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&auto=format';
                    }}
                  />
                </div>
                <div className="company-details">
                  <div className="company-name">{pressRelease.companyName}</div>
                  <a 
                    href={pressRelease.companyWebsite} 
                    className="company-website"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {pressRelease.companyWebsite}
                  </a>
                </div>
              </div>
            </div>

            {/* Media Contacts */}
            <div className="sidebar-widget contacts-widget">
              <div className="widget-header">
                <h4 className="widget-title">Media Contacts</h4>
                <div className="widget-icon">📞</div>
              </div>
              <div className="contacts-list">
                
                {/* Media Relations */}
                <div className="contact-group">
                  <div className="contact-role">Media Relations</div>
                  <div className="contact-name">{pressRelease.contactInfo.mediaContactName}</div>
                  <div className="contact-details">
                    <a href={`mailto:${pressRelease.contactInfo.mediaContactEmail}`} className="contact-link">
                      📧 {pressRelease.contactInfo.mediaContactEmail}
                    </a>
                    <a href={`tel:${pressRelease.contactInfo.mediaContactPhone}`} className="contact-link">
                      📞 {pressRelease.contactInfo.mediaContactPhone}
                    </a>
                  </div>
                </div>

                {/* PR Contact */}
                <div className="contact-group">
                  <div className="contact-role">PR Contact</div>
                  <div className="contact-name">{pressRelease.contactInfo.prContactName}</div>
                  <div className="contact-details">
                    <a href={`mailto:${pressRelease.contactInfo.prContactEmail}`} className="contact-link">
                      📧 {pressRelease.contactInfo.prContactEmail}
                    </a>
                    <a href={`tel:${pressRelease.contactInfo.prContactPhone}`} className="contact-link">
                      📞 {pressRelease.contactInfo.prContactPhone}
                    </a>
                  </div>
                </div>

                {/* Additional Contacts */}
                <div className="contact-group">
                  <div className="contact-role">Additional Contacts</div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <strong>Media Relations:</strong> {pressRelease.contactInfo.additionalContacts.mediaRelations}
                    </div>
                    <div className="contact-item">
                      <strong>Investor Relations:</strong> {pressRelease.contactInfo.additionalContacts.investorRelations}
                    </div>
                    <div className="contact-item">
                      <strong>Customer Support:</strong> {pressRelease.contactInfo.additionalContacts.customerSupport}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Distribution Information */}
            <div className="sidebar-widget distribution-widget">
              <div className="widget-header">
                <h4 className="widget-title">Distribution</h4>
                <div className="widget-icon">📡</div>
              </div>
              <div className="distribution-content">
                <div className="distribution-item">
                  <div className="dist-label">Status</div>
                  <div className={`dist-value status-${pressRelease.status.toLowerCase()}`}>
                    {pressRelease.status}
                  </div>
                </div>
                <div className="distribution-item">
                  <div className="dist-label">Priority</div>
                  <div className="dist-value priority-high">{pressRelease.distributionConfig.customSettings.priority}</div>
                </div>
                <div className="distribution-item">
                  <div className="dist-label">Embargo</div>
                  <div className="dist-value">{pressRelease.distributionConfig.customSettings.pressEmbargo || 'None'}</div>
                </div>
              </div>

              {/* Distribution Channels */}
              <div className="channels-section">
                <h5 className="channels-title">Distribution Channels</h5>
                <div className="channels-list">
                  {pressRelease.distributionConfig.distributionChannels.map((channel, index) => (
                    <div key={index} className="channel-item">
                      <span className="channel-bullet"></span>
                      {channel}
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Outlets */}
              <div className="outlets-section">
                <h5 className="outlets-title">Target Media Outlets</h5>
                <div className="outlets-list">
                  {pressRelease.distributionConfig.targetMediaOutlets.map((outlet, index) => (
                    <div key={index} className="outlet-item">
                      <span className="outlet-bullet"></span>
                      {outlet}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Distribution History */}
            {pressRelease.distributionHistory && pressRelease.distributionHistory.length > 0 && (
              <div className="sidebar-widget history-widget">
                <div className="widget-header">
                  <h4 className="widget-title">Distribution History</h4>
                  <div className="widget-icon">📊</div>
                </div>
                <div className="history-list">
                  {pressRelease.distributionHistory.map((distribution, index) => (
                    <div key={index} className="history-item">
                      <div className="history-header">
                        <div className="history-channel">{distribution.channel}</div>
                        <div className={`history-status status-${distribution.status.toLowerCase()}`}>
                          {distribution.status}
                        </div>
                      </div>
                      <div className="history-date">{formatDate(distribution.distributedAt)}</div>
                      {distribution.metadata.views && (
                        <div className="history-metrics">
                          <div className="metric">
                            <span className="metric-value">{formatNumber(distribution.metadata.views)}</span>
                            <span className="metric-label">Views</span>
                          </div>
                          <div className="metric">
                            <span className="metric-value">{formatNumber(distribution.metadata.shares || 0)}</span>
                            <span className="metric-label">Shares</span>
                          </div>
                          {distribution.metadata.engagement && (
                            <div className="metric">
                              <span className="metric-value">{distribution.metadata.engagement}%</span>
                              <span className="metric-label">Engagement</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>

      {/* Action Footer */}
      <footer className="press-actions">
        <div className="actions-container">
          <div className="actions-content">
            <div className="actions-info">
              <h4>Press Release Actions</h4>
              <p>Download, share, or print this press release</p>
            </div>
            <div className="action-buttons">
              <button 
                className="action-button primary"
                onClick={handleDownload}
              >
                <span className="button-icon">📥</span>
                <span className="button-text">Download PDF</span>
              </button>
              <button 
                className="action-button secondary"
                onClick={() => window.print()}
              >
                <span className="button-icon">🖨️</span>
                <span className="button-text">Print Release</span>
              </button>
              <button 
                className="action-button secondary"
                onClick={() => handleShare('copy')}
              >
                <span className="button-icon">🔗</span>
                <span className="button-text">Copy Link</span>
              </button>
              <button 
                className="action-button secondary"
                onClick={() => handleShare('twitter')}
              >
                <span className="button-icon">🐦</span>
                <span className="button-text">Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PressRelease;



















































// "use client";
// import React, { useState, useEffect } from 'react';
// // import './PressRelease.css';

// interface PressReleaseData {
//   id: string;
//   title: string;
//   slug: string;
//   content: string;
//   subtitle: string;
//   summary: string;
//   featuredImage: string;
//   featuredImageAlt: string;
//   mediaAssets: string[];
//   companyName: string;
//   companyLogo: string;
//   companyWebsite: string;
//   contactInfo: {
//     mediaContactName: string;
//     mediaContactEmail: string ;
//     mediaContactPhone: string;
//     prContactName: string;
//     prContactEmail: string;
//     prContactPhone: string;
//     additionalContacts: {
//       mediaRelations: string;
//       investorRelations: string;
//       customerSupport: string;
//     };
//   };
//   releaseDate: string;
//   location: string;
//   boilerplate: string;
//   category: string;
//   tags: string[];
//   featured: boolean;
//   published: boolean;
//   publishedAt: string;
//   distributionConfig: {
//     autoDistribute: boolean;
//     distributionChannels: string[];
//     targetMediaOutlets: string[];
//     scheduledDistributionTime: string;
//     customSettings: {
//       pressEmbargo: string;
//       contactFollowUp: string;
//       priority: string;
//     };
//   };
//   distributionHistory: Array<{
//     distributedAt: string;
//     channel: string;
//     status: string;
//     responseMessage: string;
//     metadata: {
//       distributionId?: string;
//       views?: number;
//       shares?: number;
//       engagement?: number;
//       postId?: string;
//     };
//   }>;
//   seoMeta: {
//     metaTitle: string;
//     metaDescription: string;
//     metaKeywords: string[];
//     canonicalUrl: string;
//     ogTitle: string;
//     ogDescription: string;
//     ogImage: string;
//     ogType: string;
//     noIndex: boolean;
//     structuredData: {
//       '@type': string;
//       headline: string;
//       datePublished: string;
//       publisher: string;
//       author: string;
//     };
//   };
//   viewCount: number;
//   downloadCount: number;
//   shareCount: number;
//   relatedPressIds: string[];
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   updatedBy: string;
//   metadata: {
//     internalNotes: string;
//     region: string;
//     priority: string;
//   };
// }

// const PressRelease: React.FC = () => {
//   const [pressRelease, setPressRelease] = useState<PressReleaseData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPressRelease = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           '/api/v1/seo-press/slug/artemis-ai-staffing-automation-suite',
//           {
//             method: 'GET',
//             headers: {
//               'accept': '*/*',
//               'X-Tenant': '68b20dd0fb42964f2328b424'
//             }
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch press release: ${response.status}`);
//         }

//         const data = await response.json();
//         setPressRelease(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPressRelease();
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatNumber = (num: number) => {
//     return num.toLocaleString();
//   };

//   if (loading) {
//     return (
//       <div className="press-release-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading press release...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="press-release-error">
//         <h2>Error Loading Press Release</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!pressRelease) {
//     return (
//       <div className="press-release-error">
//         <h2>No Press Release Found</h2>
//         <p>The requested press release could not be loaded.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="press-release-container">
//       {/* Header Section */}
//       <header className="press-release-header">
//         <div className="press-release-meta">
//           <span className="press-category">{pressRelease.category}</span>
//           <span className="press-date">{formatDate(pressRelease.releaseDate)}</span>
//           <span className="press-location">{pressRelease.location}</span>
//         </div>
        
//         <h1 className="press-release-title">{pressRelease.title}</h1>
//         <h2 className="press-release-subtitle">{pressRelease.subtitle}</h2>
        
//         <div className="press-release-stats">
//           <div className="stat-item">
//             <span className="stat-number">{formatNumber(pressRelease.viewCount)}</span>
//             <span className="stat-label">Views</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-number">{formatNumber(pressRelease.shareCount)}</span>
//             <span className="stat-label">Shares</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-number">{formatNumber(pressRelease.downloadCount)}</span>
//             <span className="stat-label">Downloads</span>
//           </div>
//         </div>
//       </header>

//       {/* Featured Image */}
//       {pressRelease.featuredImage && (
//         <div className="featured-image-container">
//           <img 
//             src={pressRelease.featuredImage} 
//             alt={pressRelease.featuredImageAlt}
//             className="featured-image"
//           />
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="press-release-content">
//         <div className="content-grid">
//           {/* Article Content */}
//           <article className="article-content">
//             <div className="content-section">
//               <h3>Executive Summary</h3>
//               <p className="summary-text">{pressRelease.summary}</p>
//             </div>

//             <div className="content-section">
//               <h3>Press Release Details</h3>
//               <div className="content-text" dangerouslySetInnerHTML={{ __html: pressRelease.content.replace(/\n/g, '<br/>') }} />
//             </div>

//             {/* Media Assets */}
//             {pressRelease.mediaAssets && pressRelease.mediaAssets.length > 0 && (
//               <div className="content-section">
//                 <h3>Media Assets</h3>
//                 <div className="media-assets-grid">
//                   {pressRelease.mediaAssets.map((asset, index) => (
//                     <div key={index} className="media-asset">
//                       <img src={asset} alt={`Media asset ${index + 1}`} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Tags */}
//             {pressRelease.tags && pressRelease.tags.length > 0 && (
//               <div className="content-section">
//                 <div className="tags-container">
//                   {pressRelease.tags.map((tag, index) => (
//                     <span key={index} className="tag">{tag}</span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Boilerplate */}
//             <div className="content-section boilerplate">
//               <h3>About {pressRelease.companyName}</h3>
//               <p>{pressRelease.boilerplate}</p>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside className="press-sidebar">
//             {/* Company Info */}
//             <div className="sidebar-section company-info">
//               <h4>Company Information</h4>
//               <div className="company-logo">
//                 <img src={pressRelease.companyLogo} alt={`${pressRelease.companyName} logo`} />
//               </div>
//               <p><strong>{pressRelease.companyName}</strong></p>
//               <p><a href={pressRelease.companyWebsite} target="_blank" rel="noopener noreferrer">
//                 {pressRelease.companyWebsite}
//               </a></p>
//             </div>

//             {/* Contact Information */}
//             <div className="sidebar-section contact-info">
//               <h4>Media Contacts</h4>
              
//               <div className="contact-group">
//                 <h5>Media Relations</h5>
//                 <p><strong>{pressRelease.contactInfo.mediaContactName}</strong></p>
//                 <p>📧 {pressRelease.contactInfo.mediaContactEmail}</p>
//                 <p>📞 {pressRelease.contactInfo.mediaContactPhone}</p>
//               </div>

//               <div className="contact-group">
//                 <h5>PR Contact</h5>
//                 <p><strong>{pressRelease.contactInfo.prContactName}</strong></p>
//                 <p>📧 {pressRelease.contactInfo.prContactEmail}</p>
//                 <p>📞 {pressRelease.contactInfo.prContactPhone}</p>
//               </div>

//               <div className="contact-group">
//                 <h5>Additional Contacts</h5>
//                 <p><strong>Media Relations:</strong> {pressRelease.contactInfo.additionalContacts.mediaRelations}</p>
//                 <p><strong>Investor Relations:</strong> {pressRelease.contactInfo.additionalContacts.investorRelations}</p>
//                 <p><strong>Customer Support:</strong> {pressRelease.contactInfo.additionalContacts.customerSupport}</p>
//               </div>
//             </div>

//             {/* Distribution Info */}
//             <div className="sidebar-section distribution-info">
//               <h4>Distribution</h4>
//               <p><strong>Status:</strong> <span className={`status-${pressRelease.status.toLowerCase()}`}>{pressRelease.status}</span></p>
//               <p><strong>Priority:</strong> {pressRelease.distributionConfig.customSettings.priority}</p>
              
//               <div className="distribution-channels">
//                 <h5>Channels</h5>
//                 <ul>
//                   {pressRelease.distributionConfig.distributionChannels.map((channel, index) => (
//                     <li key={index}>{channel}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="target-outlets">
//                 <h5>Target Outlets</h5>
//                 <ul>
//                   {pressRelease.distributionConfig.targetMediaOutlets.map((outlet, index) => (
//                     <li key={index}>{outlet}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Distribution History */}
//             {pressRelease.distributionHistory && pressRelease.distributionHistory.length > 0 && (
//               <div className="sidebar-section distribution-history">
//                 <h4>Distribution History</h4>
//                 {pressRelease.distributionHistory.map((distribution, index) => (
//                   <div key={index} className="distribution-item">
//                     <p><strong>{distribution.channel}</strong></p>
//                     <p className={`status-${distribution.status.toLowerCase()}`}>{distribution.status}</p>
//                     <p className="distribution-date">{formatDate(distribution.distributedAt)}</p>
//                     {distribution.metadata.views && (
//                       <p className="distribution-metrics">
//                         Views: {formatNumber(distribution.metadata.views)} | 
//                         Shares: {formatNumber(distribution.metadata.shares || 0)}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </aside>
//         </div>
//       </main>

//       {/* Action Buttons */}
//       <footer className="press-release-actions">
//         <div className="action-buttons">
//           <button className="btn btn-primary" onClick={() => window.print()}>
//             📄 Print Release
//           </button>
//           <button className="btn btn-secondary" onClick={() => {
//             navigator.clipboard.writeText(window.location.href);
//             alert('Link copied to clipboard!');
//           }}>
//             🔗 Copy Link
//           </button>
//           <button className="btn btn-secondary" onClick={() => {
//             const text = `${pressRelease.title}\n\n${pressRelease.summary}\n\nRead more: ${window.location.href}`;
//             navigator.share?.({ title: pressRelease.title, text, url: window.location.href })
//               .catch(() => navigator.clipboard.writeText(text));
//           }}>
//             📤 Share
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PressRelease;