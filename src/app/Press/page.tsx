"use client";
import React, { useState, useEffect } from 'react';
// import './PressRelease.css';

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

  useEffect(() => {
    const fetchPressRelease = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://157.20.214.84:9292/api/v1/seo-press/slug/artemis-ai-staffing-automation-suite',
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
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="press-release-loading">
        <div className="loading-spinner"></div>
        <p>Loading press release...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="press-release-error">
        <h2>Error Loading Press Release</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!pressRelease) {
    return (
      <div className="press-release-error">
        <h2>No Press Release Found</h2>
        <p>The requested press release could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="press-release-container">
      {/* Header Section */}
      <header className="press-release-header">
        <div className="press-release-meta">
          <span className="press-category">{pressRelease.category}</span>
          <span className="press-date">{formatDate(pressRelease.releaseDate)}</span>
          <span className="press-location">{pressRelease.location}</span>
        </div>
        
        <h1 className="press-release-title">{pressRelease.title}</h1>
        <h2 className="press-release-subtitle">{pressRelease.subtitle}</h2>
        
        <div className="press-release-stats">
          <div className="stat-item">
            <span className="stat-number">{formatNumber(pressRelease.viewCount)}</span>
            <span className="stat-label">Views</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{formatNumber(pressRelease.shareCount)}</span>
            <span className="stat-label">Shares</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{formatNumber(pressRelease.downloadCount)}</span>
            <span className="stat-label">Downloads</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {pressRelease.featuredImage && (
        <div className="featured-image-container">
          <img 
            src={pressRelease.featuredImage} 
            alt={pressRelease.featuredImageAlt}
            className="featured-image"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="press-release-content">
        <div className="content-grid">
          {/* Article Content */}
          <article className="article-content">
            <div className="content-section">
              <h3>Executive Summary</h3>
              <p className="summary-text">{pressRelease.summary}</p>
            </div>

            <div className="content-section">
              <h3>Press Release Details</h3>
              <div className="content-text" dangerouslySetInnerHTML={{ __html: pressRelease.content.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Media Assets */}
            {pressRelease.mediaAssets && pressRelease.mediaAssets.length > 0 && (
              <div className="content-section">
                <h3>Media Assets</h3>
                <div className="media-assets-grid">
                  {pressRelease.mediaAssets.map((asset, index) => (
                    <div key={index} className="media-asset">
                      <img src={asset} alt={`Media asset ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {pressRelease.tags && pressRelease.tags.length > 0 && (
              <div className="content-section">
                <div className="tags-container">
                  {pressRelease.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Boilerplate */}
            <div className="content-section boilerplate">
              <h3>About {pressRelease.companyName}</h3>
              <p>{pressRelease.boilerplate}</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="press-sidebar">
            {/* Company Info */}
            <div className="sidebar-section company-info">
              <h4>Company Information</h4>
              <div className="company-logo">
                <img src={pressRelease.companyLogo} alt={`${pressRelease.companyName} logo`} />
              </div>
              <p><strong>{pressRelease.companyName}</strong></p>
              <p><a href={pressRelease.companyWebsite} target="_blank" rel="noopener noreferrer">
                {pressRelease.companyWebsite}
              </a></p>
            </div>

            {/* Contact Information */}
            <div className="sidebar-section contact-info">
              <h4>Media Contacts</h4>
              
              <div className="contact-group">
                <h5>Media Relations</h5>
                <p><strong>{pressRelease.contactInfo.mediaContactName}</strong></p>
                <p>📧 {pressRelease.contactInfo.mediaContactEmail}</p>
                <p>📞 {pressRelease.contactInfo.mediaContactPhone}</p>
              </div>

              <div className="contact-group">
                <h5>PR Contact</h5>
                <p><strong>{pressRelease.contactInfo.prContactName}</strong></p>
                <p>📧 {pressRelease.contactInfo.prContactEmail}</p>
                <p>📞 {pressRelease.contactInfo.prContactPhone}</p>
              </div>

              <div className="contact-group">
                <h5>Additional Contacts</h5>
                <p><strong>Media Relations:</strong> {pressRelease.contactInfo.additionalContacts.mediaRelations}</p>
                <p><strong>Investor Relations:</strong> {pressRelease.contactInfo.additionalContacts.investorRelations}</p>
                <p><strong>Customer Support:</strong> {pressRelease.contactInfo.additionalContacts.customerSupport}</p>
              </div>
            </div>

            {/* Distribution Info */}
            <div className="sidebar-section distribution-info">
              <h4>Distribution</h4>
              <p><strong>Status:</strong> <span className={`status-${pressRelease.status.toLowerCase()}`}>{pressRelease.status}</span></p>
              <p><strong>Priority:</strong> {pressRelease.distributionConfig.customSettings.priority}</p>
              
              <div className="distribution-channels">
                <h5>Channels</h5>
                <ul>
                  {pressRelease.distributionConfig.distributionChannels.map((channel, index) => (
                    <li key={index}>{channel}</li>
                  ))}
                </ul>
              </div>

              <div className="target-outlets">
                <h5>Target Outlets</h5>
                <ul>
                  {pressRelease.distributionConfig.targetMediaOutlets.map((outlet, index) => (
                    <li key={index}>{outlet}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Distribution History */}
            {pressRelease.distributionHistory && pressRelease.distributionHistory.length > 0 && (
              <div className="sidebar-section distribution-history">
                <h4>Distribution History</h4>
                {pressRelease.distributionHistory.map((distribution, index) => (
                  <div key={index} className="distribution-item">
                    <p><strong>{distribution.channel}</strong></p>
                    <p className={`status-${distribution.status.toLowerCase()}`}>{distribution.status}</p>
                    <p className="distribution-date">{formatDate(distribution.distributedAt)}</p>
                    {distribution.metadata.views && (
                      <p className="distribution-metrics">
                        Views: {formatNumber(distribution.metadata.views)} | 
                        Shares: {formatNumber(distribution.metadata.shares || 0)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Action Buttons */}
      <footer className="press-release-actions">
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => window.print()}>
            📄 Print Release
          </button>
          <button className="btn btn-secondary" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }}>
            🔗 Copy Link
          </button>
          <button className="btn btn-secondary" onClick={() => {
            const text = `${pressRelease.title}\n\n${pressRelease.summary}\n\nRead more: ${window.location.href}`;
            navigator.share?.({ title: pressRelease.title, text, url: window.location.href })
              .catch(() => navigator.clipboard.writeText(text));
          }}>
            📤 Share
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PressRelease;