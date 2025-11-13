"use client";
// components/NewsArticle.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import './NewsArticle.css';

// Type definitions (unchanged)
interface SEOMeta {
  metaTitle?: string;
  metaDescription?: string;
  structuredData?: any;
}

interface Update {
  updateType: string;
  timestamp: string;
  content: string;
}

interface Metadata {
  readingLevel?: string;
  wordCount?: number;
}

interface NewsArticleData {
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  reporter?: string;
  location?: string;
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
  expiresAt?: string;
  breakingNews?: boolean;
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  seoMeta?: SEOMeta;
}

const NewsArticles = () => {
  const slug = "ai-revolutionizes-real-time-news-reporting-2025";
  const [newsData, setNewsData] = useState<NewsArticleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    if (slug) {
      fetchNewsArticle();
    }
  }, [slug]);

  const fetchNewsArticle = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://157.20.214.84:9292/api/v1/seo-news/slug/${slug}`,
        {
          headers: {
            'accept': '*/*',
            'X-Tenant': '68b20dd0fb42964f2328b424'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news article');
      }

      const data: NewsArticleData = await response.json();
      setNewsData(data);
      
      if (data.seoMeta) {
        document.title = data.seoMeta.metaTitle || data.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', data.seoMeta.metaDescription || '');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook'): void => {
    if (!newsData) return;

    const url = window.location.href;
    const title = newsData.title;
    const text = newsData.summary;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="news-article">
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <div className="loading-pulse"></div>
          </div>
          <div className="loading-content">
            <h3>Loading Article</h3>
            <p>Preparing your reading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-article">
        <div className="error-container">
          <div className="error-icon">📰</div>
          <div className="error-content">
            <h2>Unable to Load Article</h2>
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

  if (!newsData) {
    return (
      <div className="news-article">
        <div className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <div className="not-found-content">
            <h2>Article Not Found</h2>
            <p>The requested news article could not be located in our archives.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-article">
      {/* SEO Structured Data */}
      {newsData.seoMeta?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(newsData.seoMeta.structuredData)
          }}
        />
      )}

      {/* Breaking News Banner */}
      {newsData.breakingNews && (
        <div className="breaking-news">
          <div className="breaking-container">
            <div className="breaking-indicator">
              <span className="live-dot"></span>
              BREAKING NEWS
            </div>
            <div className="breaking-content">
              <span className="breaking-text">{newsData.title}</span>
            </div>
            <div className="breaking-time">LIVE</div>
          </div>
        </div>
      )}

      {/* Main Article Container */}
      <div className="article-container">
        
        {/* Header Section */}
        <header className="article-header">
          <div className="header-grid">
            {/* Left: Category & Metadata */}
            <div className="header-left">
              <div className="category-badge">{newsData.category}</div>
              <div className="metadata-row">
                <span className="publish-date">{formatDate(newsData.publishedAt)}</span>
                <span className="meta-divider">•</span>
                <span className="read-time">
                  {newsData.metadata?.wordCount ? Math.ceil(newsData.metadata.wordCount / 200) : 5} min read
                </span>
                {newsData.priority === 'HIGH' && (
                  <>
                    <span className="meta-divider">•</span>
                    <span className="priority-tag">URGENT</span>
                  </>
                )}
              </div>
            </div>

            {/* Right: Stats */}
            <div className="header-right">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{newsData.viewCount?.toLocaleString() || '0'}</div>
                  <div className="stat-label">Views</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{newsData.shareCount?.toLocaleString() || '0'}</div>
                  <div className="stat-label">Shares</div>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Summary */}
          <div className="title-section">
            <h1 className="article-title">{newsData.title}</h1>
            <p className="article-summary">{newsData.summary}</p>
          </div>

          {/* Author Information */}
          <div className="author-section">
            <div className="author-avatar">
              {newsData.reporter?.charAt(0) || 'N'}
            </div>
            <div className="author-details">
              <div className="author-name">{newsData.reporter || "News Reporter"}</div>
              <div className="author-meta">
                <span className="author-location">{newsData.location || "Global Desk"}</span>
                <span className="meta-divider">•</span>
                <span className="author-role">Senior Correspondent</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {newsData.featuredImage && (
          <div className="featured-media">
            <div className="image-container">
              <img
                src={newsData.featuredImage}
                alt={newsData.featuredImageAlt}
                className="featured-image"
              />
            </div>
            {newsData.featuredImageAlt && (
              <div className="image-caption">{newsData.featuredImageAlt}</div>
            )}
          </div>
        )}

        {/* Main Content Area */}
        <div className="content-layout">
          
          {/* Primary Content */}
          <main className="primary-content">
            
            {/* Article Content */}
            <article className="article-content">
              <div className="content-wrapper">
                <div 
                  dangerouslySetInnerHTML={{ __html: newsData.content }}
                  className="content-body"
                />
              </div>
            </article>

            {/* Media Gallery */}
            {newsData.mediaGallery && newsData.mediaGallery.length > 0 && (
              <section className="media-section">
                <div className="section-header">
                  <h2 className="section-title">Media Gallery</h2>
                  <div className="section-subtitle">Visual documentation of this story</div>
                </div>
                <div className="gallery-grid">
                  {newsData.mediaGallery.map((image, index) => (
                    <div 
                      key={index} 
                      className={`gallery-item ${index === activeImage ? 'active' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <div className="gallery-image">
                        <img src={image} alt={`Gallery item ${index + 1}`} />
                        <div className="gallery-overlay">
                          <div className="overlay-content">
                            <span className="view-icon">👁️</span>
                            <span>View</span>
                          </div>
                        </div>
                      </div>
                      <div className="gallery-number">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Updates Timeline */}
            {newsData.updates && newsData.updates.length > 0 && (
              <section className="updates-section">
                <div className="section-header">
                  <h2 className="section-title">Story Updates</h2>
                  <div className="update-count">{newsData.updates.length} Updates</div>
                </div>
                <div className="timeline">
                  {newsData.updates.map((update, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker">
                        <div className="marker-dot"></div>
                        {index < newsData.updates!.length - 1 && <div className="timeline-line"></div>}
                      </div>
                      <div className="timeline-content">
                        <div className="update-header">
                          <span className="update-type">{update.updateType}</span>
                          <span className="update-time">{formatDate(update.timestamp)}</span>
                        </div>
                        <div className="update-body">
                          <p>{update.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags Section */}
            {newsData.tags && newsData.tags.length > 0 && (
              <section className="tags-section">
                <div className="section-header">
                  <h3 className="section-title">Related Topics</h3>
                </div>
                <div className="tags-container">
                  {newsData.tags.map((tag, index) => (
                    <span key={index} className="topic-tag">#{tag}</span>
                  ))}
                </div>
              </section>
            )}

          </main>

          {/* Sidebar */}
          <aside className="article-sidebar">
            
            {/* Share Widget */}
            <div className="sidebar-widget share-widget">
              <div className="widget-header">
                <h4 className="widget-title">Share This Story</h4>
                <div className="widget-icon">📤</div>
              </div>
              <div className="share-grid">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="share-button twitter"
                >
                  <span className="button-icon">𝕏</span>
                  <span className="button-text">Twitter</span>
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="share-button facebook"
                >
                  <span className="button-icon">f</span>
                  <span className="button-text">Facebook</span>
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="share-button linkedin"
                >
                  <span className="button-icon">in</span>
                  <span className="button-text">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Article Info */}
            <div className="sidebar-widget info-widget">
              <div className="widget-header">
                <h4 className="widget-title">Article Details</h4>
                <div className="widget-icon">📄</div>
              </div>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-label">Source</div>
                  <div className="info-value">{newsData.source || "Original Reporting"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Published</div>
                  <div className="info-value">{formatDate(newsData.publishedAt)}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Reading Level</div>
                  <div className="info-value">{newsData.metadata?.readingLevel || "Standard"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Word Count</div>
                  <div className="info-value">{newsData.metadata?.wordCount?.toLocaleString() || "N/A"}</div>
                </div>
                {newsData.expiresAt && (
                  <div className="info-item">
                    <div className="info-label">Last Updated</div>
                    <div className="info-value">{formatDate(newsData.expiresAt)}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="sidebar-widget stats-widget">
              <div className="widget-header">
                <h4 className="widget-title">Engagement</h4>
                <div className="widget-icon">📊</div>
              </div>
              <div className="stats-list">
                <div className="stat-card">
                  <div className="stat-icon">👁️</div>
                  <div className="stat-content">
                    <div className="stat-number">{newsData.viewCount?.toLocaleString() || '1.2K'}</div>
                    <div className="stat-description">Total Views</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔄</div>
                  <div className="stat-content">
                    <div className="stat-number">{newsData.shareCount?.toLocaleString() || '345'}</div>
                    <div className="stat-description">Social Shares</div>
                  </div>
                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* Source Footer */}
        {newsData.sourceUrl && (
          <footer className="source-footer">
            <div className="footer-content">
              <div className="source-info">
                <span className="source-label">Source: </span>
                <a 
                  href={newsData.sourceUrl} 
                  className="source-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {newsData.source}
                </a>
              </div>
              <div className="footer-meta">
                <span>Published by News Network</span>
              </div>
            </div>
          </footer>
        )}

      </div>
    </div>
  );
};

export default NewsArticles;





















// "use client";
// // components/NewsArticle.tsx
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// // Type definitions
// interface SEOMeta {
//   metaTitle?: string;
//   metaDescription?: string;
//   structuredData?: any;
// }

// interface Update {
//   updateType: string;
//   timestamp: string;
//   content: string;
// }

// interface Metadata {
//   readingLevel?: string;
//   wordCount?: number;
// }

// interface NewsArticleData {
//   title: string;
//   summary: string;
//   content: string;
//   category: string;
//   publishedAt: string;
//   reporter?: string;
//   location?: string;
//   viewCount?: number;
//   shareCount?: number;
//   featuredImage?: string;
//   featuredImageAlt?: string;
//   mediaGallery?: string[];
//   updates?: Update[];
//   tags?: string[];
//   source?: string;
//   sourceUrl?: string;
//   metadata?: Metadata;
//   expiresAt?: string;
//   breakingNews?: boolean;
//   priority?: 'HIGH' | 'MEDIUM' | 'LOW';
//   seoMeta?: SEOMeta;
// }

// const NewsArticles = () => {
// //   const router = useRouter();
// //   const { slug } = router.query;
// const slug="ai-revolutionizes-real-time-news-reporting-2025"
//   const [newsData, setNewsData] = useState<NewsArticleData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeImage, setActiveImage] = useState<number>(0);

//   useEffect(() => {
//     if (slug) {
//       fetchNewsArticle();
//     }
//   }, [slug]);

//   const fetchNewsArticle = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://157.20.214.84:9292/api/v1/seo-news/slug/${slug}`,
//         {
//           headers: {
//             'accept': '*/*',
//             'X-Tenant': '68b20dd0fb42964f2328b424'
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch news article');
//       }

//       const data: NewsArticleData = await response.json();
//       setNewsData(data);
      
//       // Set SEO meta tags
//       if (data.seoMeta) {
//         document.title = data.seoMeta.metaTitle || data.title;
//         const metaDescription = document.querySelector('meta[name="description"]');
//         if (metaDescription) {
//           metaDescription.setAttribute('content', data.seoMeta.metaDescription || '');
//         }
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook'): void => {
//     if (!newsData) return;

//     const url = window.location.href;
//     const title = newsData.title;
//     const text = newsData.summary;

//     const shareUrls = {
//       twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
//     };

//     window.open(shareUrls[platform], '_blank', 'width=600,height=400');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Article</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!newsData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
//           <p className="text-gray-600">The requested news article could not be found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* SEO Structured Data */}
//       {newsData.seoMeta?.structuredData && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(newsData.seoMeta.structuredData)
//           }}
//         />
//       )}

//       {/* Breaking News Banner */}
//       {newsData.breakingNews && (
//         <div className="bg-red-600 text-white py-2 px-4 text-center">
//           <div className="flex items-center justify-center space-x-2">
//             <span className="animate-pulse">🔴</span>
//             <span className="font-bold">BREAKING NEWS</span>
//             <span className="animate-pulse">🔴</span>
//           </div>
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Article Header */}
//         <header className="mb-8">
//           {/* Category and Breadcrumb */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2 text-sm text-gray-600">
//               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                 {newsData.category}
//               </span>
//               <span>•</span>
//               <span>{formatDate(newsData.publishedAt)}</span>
//             </div>
            
//             {/* Priority Badge */}
//             {newsData.priority === 'HIGH' && (
//               <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
//                 High Priority
//               </span>
//             )}
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
//             {newsData.title}
//           </h1>

//           {/* Summary */}
//           <p className="text-xl text-gray-600 mb-6 leading-relaxed">
//             {newsData.summary}
//           </p>

//           {/* Reporter and Location */}
//           <div className="flex items-center justify-between border-b border-t border-gray-200 py-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                   {newsData.reporter?.charAt(0) || 'A'}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">{newsData.reporter}</p>
//                   <p className="text-sm text-gray-600">{newsData.location}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center space-x-6 text-sm text-gray-600">
//               <div className="text-center">
//                 <div className="font-bold text-gray-900">{newsData.viewCount?.toLocaleString()}</div>
//                 <div>Views</div>
//               </div>
//               <div className="text-center bg-red">
//                 <div className="font-bold text-gray-900">{newsData.shareCount?.toLocaleString()}</div>
//                 <div>Shares</div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Featured Image */}
//         {newsData.featuredImage && (
//           <div className="mb-8">
//             <img
//               src={newsData.featuredImage}
//               alt={newsData.featuredImageAlt}
//               className="w-full h-96 object-cover rounded-lg shadow-lg"
//             />
//             {newsData.featuredImageAlt && (
//               <p className="text-sm text-gray-600 mt-2 text-center">
//                 {newsData.featuredImageAlt}
//               </p>
//             )}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Article Content */}
//             <article className="prose prose-lg max-w-none mb-8">
//               <div 
//                 dangerouslySetInnerHTML={{ __html: newsData.content }}
//                 className="text-gray-700 leading-relaxed"
//               />
//             </article>

//             {/* Media Gallery */}
//             {newsData.mediaGallery && newsData.mediaGallery.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-2xl font-bold mb-4">Media Gallery</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {newsData.mediaGallery.map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`Media ${index + 1}`}
//                       className={`w-full h-48 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 ${
//                         index === activeImage ? 'ring-2 ring-blue-500' : ''
//                       }`}
//                       onClick={() => setActiveImage(index)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Updates */}
//             {newsData.updates && newsData.updates.length > 0 && (
//               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
//                 <h3 className="text-xl font-bold mb-4">Article Updates</h3>
//                 <div className="space-y-4">
//                   {newsData.updates.map((update, index) => (
//                     <div key={index} className="border-b border-yellow-200 pb-4 last:border-b-0">
//                       <div className="flex items-center space-x-2 mb-2">
//                         <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
//                           {update.updateType}
//                         </span>
//                         <span className="text-sm text-gray-600">
//                           {formatDate(update.timestamp)}
//                         </span>
//                       </div>
//                       <p className="text-gray-700">{update.content}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Tags */}
//             {newsData.tags && newsData.tags.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex flex-wrap gap-2">
//                   {newsData.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Share Buttons */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
//               <h4 className="font-bold text-gray-900 mb-4">Share This Article</h4>
//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => handleShare('twitter')}
//                   className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
//                 >
//                   Twitter
//                 </button>
//                 <button
//                   onClick={() => handleShare('linkedin')}
//                   className="flex-1 bg-blue-700 text-white py-2 px-3 rounded text-sm hover:bg-blue-800 transition-colors"
//                 >
//                   LinkedIn
//                 </button>
//                 <button
//                   onClick={() => handleShare('facebook')}
//                   className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
//                 >
//                   Facebook
//                 </button>
//               </div>
//             </div>

//             {/* Article Metadata */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h4 className="font-bold text-gray-900 mb-4">Article Details</h4>
//               <dl className="space-y-3 text-sm">
//                 <div>
//                   <dt className="font-medium text-gray-600">Source</dt>
//                   <dd className="text-gray-900">{newsData.source}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-600">Published</dt>
//                   <dd className="text-gray-900">{formatDate(newsData.publishedAt)}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-600">Reading Level</dt>
//                   <dd className="text-gray-900">{newsData.metadata?.readingLevel}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-600">Word Count</dt>
//                   <dd className="text-gray-900">{newsData.metadata?.wordCount} words</dd>
//                 </div>
//                 {newsData.expiresAt && (
//                   <div>
//                     <dt className="font-medium text-gray-600">Expires</dt>
//                     <dd className="text-gray-900">{formatDate(newsData.expiresAt)}</dd>
//                   </div>
//                 )}
//               </dl>
//             </div>
//           </div>
//         </div>

//         {/* Source Attribution */}
//         {newsData.sourceUrl && (
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600">
//               Source: <a href={newsData.sourceUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
//                 {newsData.source}
//               </a>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsArticles;




































// "use client";
// // components/NewsArticle.jsx
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const NewsArticles = () => {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [newsData, setNewsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImage, setActiveImage] = useState(0);

//   useEffect(() => {
//     if (slug) {
//       fetchNewsArticle();
//     }
//   }, [slug]);

//   const fetchNewsArticle = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://157.20.214.84:9292/api/v1/seo-news/slug/${slug}`,
//         {
//           headers: {
//             'accept': '*/*',
//             'X-Tenant': '68b20dd0fb42964f2328b424'
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch news article');
//       }

//       const data = await response.json();
//       setNewsData(data);
      
//       // Set SEO meta tags
//       if (data.seoMeta) {
//         document.title = data.seoMeta.metaTitle || data.title;
//         const metaDescription = document.querySelector('meta[name="description"]');
//         if (metaDescription) {
//           metaDescription.setAttribute('content', data.seoMeta.metaDescription);
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleShare = (platform) => {
//     const url = window.location.href;
//     const title = newsData.title;
//     const text = newsData.summary;

//     const shareUrls = {
//       twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
//     };

//     window.open(shareUrls[platform], '_blank', 'width=600,height=400');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Article</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!newsData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
//           <p className="text-gray-600">The requested news article could not be found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* SEO Structured Data */}
//       {newsData.seoMeta?.structuredData && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(newsData.seoMeta.structuredData)
//           }}
//         />
//       )}

//       {/* Breaking News Banner */}
//       {newsData.breakingNews && (
//         <div className="bg-red-600 text-white py-2 px-4 text-center">
//           <div className="flex items-center justify-center space-x-2">
//             <span className="animate-pulse">🔴</span>
//             <span className="font-bold">BREAKING NEWS</span>
//             <span className="animate-pulse">🔴</span>
//           </div>
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Article Header */}
//         <header className="mb-8">
//           {/* Category and Breadcrumb */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2 text-sm text-gray-600">
//               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                 {newsData.category}
//               </span>
//               <span>•</span>
//               <span>{formatDate(newsData.publishedAt)}</span>
//             </div>
            
//             {/* Priority Badge */}
//             {newsData.priority === 'HIGH' && (
//               <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
//                 High Priority
//               </span>
//             )}
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
//             {newsData.title}
//           </h1>

//           {/* Summary */}
//           <p className="text-xl text-gray-600 mb-6 leading-relaxed">
//             {newsData.summary}
//           </p>

//           {/* Reporter and Location */}
//           <div className="flex items-center justify-between border-b border-t border-gray-200 py-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                   {newsData.reporter?.charAt(0) || 'A'}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">{newsData.reporter}</p>
//                   <p className="text-sm text-gray-600">{newsData.location}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center space-x-6 text-sm text-gray-600">
//               <div className="text-center">
//                 <div className="font-bold text-gray-900">{newsData.viewCount?.toLocaleString()}</div>
//                 <div>Views</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-bold text-gray-900">{newsData.shareCount?.toLocaleString()}</div>
//                 <div>Shares</div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Featured Image */}
//         {newsData.featuredImage && (
//           <div className="mb-8">
//             <img
//               src={newsData.featuredImage}
//               alt={newsData.featuredImageAlt}
//               className="w-full h-96 object-cover rounded-lg shadow-lg"
//             />
//             {newsData.featuredImageAlt && (
//               <p className="text-sm text-gray-600 mt-2 text-center">
//                 {newsData.featuredImageAlt}
//               </p>
//             )}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Article Content */}
//             <article className="prose prose-lg max-w-none mb-8">
//               <div 
//                 dangerouslySetInnerHTML={{ __html: newsData.content }}
//                 className="text-gray-700 leading-relaxed"
//               />
//             </article>

//             {/* Media Gallery */}
//             {newsData.mediaGallery && newsData.mediaGallery.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-2xl font-bold mb-4">Media Gallery</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {newsData.mediaGallery.map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`Media ${index + 1}`}
//                       className={`w-full h-48 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 ${
//                         index === activeImage ? 'ring-2 ring-blue-500' : ''
//                       }`}
//                       onClick={() => setActiveImage(index)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Updates */}
//             {newsData.updates && newsData.updates.length > 0 && (
//               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
//                 <h3 className="text-xl font-bold mb-4">Article Updates</h3>
//                 <div className="space-y-4">
//                   {newsData.updates.map((update, index) => (
//                     <div key={index} className="border-b border-yellow-200 pb-4 last:border-b-0">
//                       <div className="flex items-center space-x-2 mb-2">
//                         <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
//                           {update.updateType}
//                         </span>
//                         <span className="text-sm text-gray-600">
//                           {formatDate(update.timestamp)}
//                         </span>
//                       </div>
//                       <p className="text-gray-700">{update.content}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Tags */}
//             {newsData.tags && newsData.tags.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex flex-wrap gap-2">
//                   {newsData.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Share Buttons */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
//               <h4 className="font-bold text-gray-900 mb-4">Share This Article</h4>
//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => handleShare('twitter')}
//                   className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
//                 >
//                   Twitter
//                 </button>
//                 <button
//                   onClick={() => handleShare('linkedin')}
//                   className="flex-1 bg-blue-700 text-white py-2 px-3 rounded text-sm hover:bg-blue-800 transition-colors"
//                 >
//                   LinkedIn
//                 </button>
//                 <button
//                   onClick={() => handleShare('facebook')}
//                   className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
//                 >
//                   Facebook
//                 </button>
//               </div>
//             </div>

//             {/* Article Metadata */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h4 className="font-bold text-gray-900 mb-4">Article Details</h4>
//               <dl className="space-y-3 text-sm">
//                 <div>
//                   <dt className="font-medium text-gray-600">Source</dt>
//                   <dd className="text-gray-900">{newsData.source}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-600">Published</dt>
//                   <dd className="text-gray-900">{formatDate(newsData.publishedAt)}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-600">Reading Level</dt>
//                   <dd className="text-gray-900">{newsData.metadata?.readingLevel}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-600">Word Count</dt>
//                   <dd className="text-gray-900">{newsData.metadata?.wordCount} words</dd>
//                 </div>
//                 {newsData.expiresAt && (
//                   <div>
//                     <dt className="font-medium text-gray-600">Expires</dt>
//                     <dd className="text-gray-900">{formatDate(newsData.expiresAt)}</dd>
//                   </div>
//                 )}
//               </dl>
//             </div>
//           </div>
//         </div>

//         {/* Source Attribution */}
//         {newsData.sourceUrl && (
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600">
//               Source: <a href={newsData.sourceUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
//                 {newsData.source}
//               </a>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsArticles;