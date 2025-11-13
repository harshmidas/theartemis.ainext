// "use client";

// import React, { useState, useEffect } from 'react';
// // import './BlogPost.css';

// interface BlogPostData {
//   id: string;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   featuredImage: string;
//   featuredImageAlt: string;
//   author: string;
//   authorBio: string;
//   authorAvatar: string;
//   category: string;
//   tags: string[];
//   featured: boolean;
//   published: boolean;
//   publishedAt: string;
//   scheduledFor: string | null;
//   seoMeta: {
//     metaTitle: string;
//     metaDescription: string;
//     metaKeywords: string[];
//     canonicalUrl: string;
//     ogTitle: string;
//     ogDescription: string;
//     ogImage: string;
//     twitterCard: string;
//     twitterTitle: string;
//     twitterDescription: string;
//     twitterImage: string;
//     structuredData: {
//       type: string;
//       publisher: string;
//       author: string;
//       section: string;
//     };
//     noIndex: boolean;
//     noFollow: boolean;
//   };
//   viewCount: number;
//   shareCount: number;
//   commentCount: number;
//   readingTimeMinutes: number;
//   relatedBlogIds: string[];
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   updatedBy: string;
//   metadata: {
//     series: string;
//     readTimeCategory: string;
//     relatedCompanies: string[];
//     language: string;
//     geoTarget: string;
//   };
// }

// const BlogPost: React.FC = () => {
//   const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);

//   useEffect(() => {
//     const fetchBlogPost = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           'http://157.20.214.84:9292/api/v1/seo-blogs/slug/future-of-healthcare-automation-artemis',
//           {
//             method: 'GET',
//             headers: {
//               'accept': '*/*',
//               'X-Tenant': '68b20dd0fb42964f2328b424'
//             }
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch blog post: ${response.status}`);
//         }

//         const data = await response.json();
//         setBlogPost(data);
        
//         // In a real app, you would fetch related posts by their IDs
//         // For now, we'll simulate this with empty array
//         setRelatedPosts([]);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogPost();
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatNumber = (num: number) => {
//     return num.toLocaleString();
//   };

//   // const estimateReadingTime = (content: string) => {
//   //   const wordsPerMinute = 200;
//   //   const words = content.split(/\s+/).length;
//   //   return Math.ceil(words / wordsPerMinute);
//   // };

//   if (loading) {
//     return (
//       <div className="blog-post-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading blog post...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="blog-post-error">
//         <h2>Error Loading Blog Post</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!blogPost) {
//     return (
//       <div className="blog-post-error">
//         <h2>No Blog Post Found</h2>
//         <p>The requested blog post could not be loaded.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="blog-post-container">
//       {/* Article Header */}
//       <header className="blog-post-header">
//         <div className="blog-breadcrumb">
//           <a href="/blog">Blog</a>
//           <span className="breadcrumb-separator">/</span>
//           <a href={`/blog/category/${blogPost.category.toLowerCase().replace(/\s+/g, '-')}`}>
//             {blogPost.category}
//           </a>
//           <span className="breadcrumb-separator">/</span>
//           <span>{blogPost.title}</span>
//         </div>

//         <div className="blog-meta-header">
//           <span className="blog-category">{blogPost.category}</span>
//           {blogPost.featured && (
//             <span className="featured-badge">Featured</span>
//           )}
//         </div>

//         <h1 className="blog-post-title">{blogPost.title}</h1>
//         <p className="blog-post-excerpt">{blogPost.excerpt}</p>

//         <div className="blog-post-meta">
//           <div className="author-info">
//             <img 
//               src={blogPost.authorAvatar} 
//               alt={blogPost.author}
//               className="author-avatar"
//               onError={(e) => {
//                 e.currentTarget.src = 'https://via.placeholder.com/60x60/667eea/ffffff?text=AU';
//               }}
//             />
//             <div className="author-details">
//               <span className="author-name">{blogPost.author}</span>
//               <span className="publish-date">
//                 Published on {formatDate(blogPost.publishedAt)}
//               </span>
//             </div>
//           </div>

//           <div className="post-stats">
//             <div className="stat">
//               <span className="stat-icon">👁️</span>
//               <span>{formatNumber(blogPost.viewCount)} views</span>
//             </div>
//             <div className="stat">
//               <span className="stat-icon">⏱️</span>
//               <span>{blogPost.readingTimeMinutes} min read</span>
//             </div>
//             <div className="stat">
//               <span className="stat-icon">💬</span>
//               <span>{formatNumber(blogPost.commentCount)} comments</span>
//             </div>
//             <div className="stat">
//               <span className="stat-icon">📤</span>
//               <span>{formatNumber(blogPost.shareCount)} shares</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Featured Image */}
//       {blogPost.featuredImage && (
//         <div className="featured-image-container">
//           <img 
//             src={blogPost.featuredImage} 
//             alt={blogPost.featuredImageAlt}
//             className="blog-featured-image"
//           />
//           {blogPost.featuredImageAlt && (
//             <p className="image-caption">{blogPost.featuredImageAlt}</p>
//           )}
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="blog-post-content">
//         <div className="content-grid">
//           {/* Article Content */}
//           <article className="article-main-content">
//             <div 
//               className="blog-content"
//               dangerouslySetInnerHTML={{ __html: blogPost.content }}
//             />

//             {/* Tags */}
//             {blogPost.tags && blogPost.tags.length > 0 && (
//               <div className="tags-section">
//                 <h4>Topics</h4>
//                 <div className="tags-container">
//                   {blogPost.tags.map((tag, index) => (
//                     <a 
//                       key={index} 
//                       href={`/blog/tag/${tag.toLowerCase()}`}
//                       className="tag"
//                     >
//                       {tag}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Share Section */}
//             <div className="share-section">
//               <h4>Share this article</h4>
//               <div className="share-buttons">
//                 <button 
//                   className="share-btn twitter"
//                   onClick={() => {
//                     const text = `${blogPost.title} - ${blogPost.excerpt}`;
//                     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
//                     window.open(url, '_blank');
//                   }}
//                 >
//                   Twitter
//                 </button>
//                 <button 
//                   className="share-btn linkedin"
//                   onClick={() => {
//                     const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
//                     window.open(url, '_blank');
//                   }}
//                 >
//                   LinkedIn
//                 </button>
//                 <button 
//                   className="share-btn facebook"
//                   onClick={() => {
//                     const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
//                     window.open(url, '_blank');
//                   }}
//                 >
//                   Facebook
//                 </button>
//                 <button 
//                   className="share-btn copy-link"
//                   onClick={() => {
//                     navigator.clipboard.writeText(window.location.href);
//                     alert('Link copied to clipboard!');
//                   }}
//                 >
//                   Copy Link
//                 </button>
//               </div>
//             </div>

//             {/* Author Bio */}
//             <div className="author-bio-section">
//               <div className="author-bio-card">
//                 <img 
//                   src={blogPost.authorAvatar} 
//                   alt={blogPost.author}
//                   className="author-bio-avatar"
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/80x80/667eea/ffffff?text=AU';
//                   }}
//                 />
//                 <div className="author-bio-content">
//                   <h4>About {blogPost.author}</h4>
//                   <p>{blogPost.authorBio}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Newsletter Signup */}
//             <div className="newsletter-cta">
//               <div className="newsletter-content">
//                 <h4>Stay Updated with Artemis Insights</h4>
//                 <p>Get the latest healthcare staffing trends and automation insights delivered to your inbox.</p>
//                 <div className="newsletter-form">
//                   <input 
//                     type="email" 
//                     placeholder="Enter your email address"
//                     className="newsletter-input"
//                   />
//                   <button className="newsletter-submit">Subscribe</button>
//                 </div>
//               </div>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside className="blog-sidebar">
//             {/* Table of Contents */}
//             <div className="sidebar-widget table-of-contents">
//               <h4>In this article</h4>
//               <nav className="toc-nav">
//                 <a href="#introduction" className="toc-link">Introduction</a>
//                 <a href="#automation-trends" className="toc-link">Automation Trends</a>
//                 <a href="#artemis-solutions" className="toc-link">Artemis Solutions</a>
//                 <a href="#future-outlook" className="toc-link">Future Outlook</a>
//               </nav>
//             </div>

//             {/* Series Information */}
//             {blogPost.metadata.series && (
//               <div className="sidebar-widget series-info">
//                 <h4>Series: {blogPost.metadata.series}</h4>
//                 <p>Part of our ongoing exploration of AI in healthcare staffing.</p>
//                 <a href={`/blog/series/${blogPost.metadata.series.toLowerCase().replace(/\s+/g, '-')}`} className="series-link">
//                   View all articles
//                 </a>
//               </div>
//             )}

//             {/* Popular Tags */}
//             <div className="sidebar-widget popular-tags">
//               <h4>Popular Topics</h4>
//               <div className="sidebar-tags">
//                 <a href="/blog/tag/ai" className="sidebar-tag">AI</a>
//                 <a href="/blog/tag/healthcare" className="sidebar-tag">Healthcare</a>
//                 <a href="/blog/tag/automation" className="sidebar-tag">Automation</a>
//                 <a href="/blog/tag/staffing" className="sidebar-tag">Staffing</a>
//                 <a href="/blog/tag/innovation" className="sidebar-tag">Innovation</a>
//                 <a href="/blog/tag/technology" className="sidebar-tag">Technology</a>
//               </div>
//             </div>

//             {/* Related Companies */}
//             {blogPost.metadata.relatedCompanies && blogPost.metadata.relatedCompanies.length > 0 && (
//               <div className="sidebar-widget related-companies">
//                 <h4>Mentioned Companies</h4>
//                 <ul className="companies-list">
//                   {blogPost.metadata.relatedCompanies.map((company, index) => (
//                     <li key={index}>{company}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* CTA Widget */}
//             <div className="sidebar-widget cta-widget">
//               <h4>Ready to Transform Your Staffing?</h4>
//               <p>See how Artemis can automate your healthcare staffing operations.</p>
//               <a href="/demo" className="cta-button">Book a Demo</a>
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* Related Posts Section */}
//       {relatedPosts.length > 0 && (
//         <section className="related-posts">
//           <div className="related-posts-header">
//             <h3>Related Articles</h3>
//             <p>Continue reading with these related posts</p>
//           </div>
//           <div className="related-posts-grid">
//             {relatedPosts.map((post) => (
//               <article key={post.id} className="related-post-card">
//                 <img src={post.featuredImage} alt={post.featuredImageAlt} />
//                 <div className="related-post-content">
//                   <span className="related-post-category">{post.category}</span>
//                   <h5>{post.title}</h5>
//                   <p>{post.excerpt}</p>
//                   <a href={`/blog/${post.slug}`} className="read-more-link">
//                     Read More →
//                   </a>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Comments Section */}
//       <section className="comments-section">
//         <div className="comments-header">
//           <h3>
//             Discussion ({blogPost.commentCount})
//           </h3>
//           <p>Join the conversation about healthcare automation</p>
//         </div>
        
//         <div className="comments-coming-soon">
//           <div className="coming-soon-content">
//             <h4>Comments Coming Soon</h4>
//             <p>We're building a community discussion feature to enable conversations around our articles.</p>
//             <div className="comment-alternatives">
//               <p>In the meantime, you can:</p>
//               <ul>
//                 <li>Share your thoughts on LinkedIn and tag us</li>
//                 <li>Reach out via our contact form</li>
//                 <li>Join our newsletter for updates</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BlogPost;





















































"use client";

import React, { useState, useEffect } from 'react';
// import './BlogPost.css';

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
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://157.20.214.84:9292/api/v1/seo-blogs/slug/future-of-healthcare-automation-artemis',
          {
            method: 'GET',
            headers: {
              'accept': '*/*',
              'X-Tenant': '68b20dd0fb42964f2328b424'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${response.status}`);
        }

        const data = await response.json();
        setBlogPost(data);
        
        // Simulate related posts fetch
        setTimeout(() => {
          setRelatedPosts([
            {
              ...data,
              id: '2',
              title: 'AI in Healthcare: Transforming Patient Care',
              excerpt: 'Explore how artificial intelligence is revolutionizing patient care and medical diagnostics.',
              category: 'AI & Technology'
            },
            {
              ...data,
              id: '3',
              title: 'The Future of Medical Staffing',
              excerpt: 'Understanding the evolving landscape of healthcare staffing in the digital age.',
              category: 'Staffing'
            },
            {
              ...data,
              id: '4',
              title: 'Automating Healthcare Operations',
              excerpt: 'How automation is streamlining healthcare operations and improving efficiency.',
              category: 'Automation'
            }
          ] as any);
        }, 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
    const title = blogPost?.title || '';
    const text = blogPost?.excerpt || '';

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
    
    setIsShareMenuOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  if (loading) {
    return (
      <div className="blog-loading">
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
      <div className="blog-error">
        <div className="error-container">
          <div className="error-icon">📝</div>
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

  if (!blogPost) {
    return (
      <div className="blog-not-found">
        <div className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <div className="not-found-content">
            <h2>Article Not Found</h2>
            <p>The requested blog post could not be located in our archives.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      {/* SEO Structured Data */}
      {blogPost.seoMeta?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPost.seoMeta.structuredData)
          }}
        />
      )}

      {/* Header Section */}
      <header className="blog-header">
        <div className="header-container">
          {/* Breadcrumb */}
          <nav className="blog-breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/blog" className="breadcrumb-link">Blog</a>
            <span className="breadcrumb-separator">/</span>
            <a 
              href={`/blog/category/${blogPost.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="breadcrumb-link"
            >
              {blogPost.category}
            </a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{blogPost.title}</span>
          </nav>

          {/* Category & Featured Badge */}
          <div className="blog-meta-header">
            <div className="category-badge">{blogPost.category}</div>
            {blogPost.featured && (
              <div className="featured-badge">
                <span className="featured-star">⭐</span>
                Featured
              </div>
            )}
          </div>

          {/* Title & Excerpt */}
          <div className="title-section">
            <h1 className="blog-title">{blogPost.title}</h1>
            <p className="blog-excerpt">{blogPost.excerpt}</p>
          </div>

          {/* Author & Stats */}
          <div className="blog-meta">
            <div className="author-info">
              <div className="author-avatar">
                <img 
                  src={blogPost.authorAvatar} 
                  alt={blogPost.author}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format';
                  }}
                />
              </div>
              <div className="author-details">
                <div className="author-name">{blogPost.author}</div>
                <div className="publish-info">
                  <span className="publish-date">{formatDate(blogPost.publishedAt)}</span>
                  <span className="meta-divider">•</span>
                  <span className="read-time">{blogPost.readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>

            <div className="post-stats">
              <div className="stat-item">
                <div className="stat-icon">👁️</div>
                <div className="stat-content">
                  <div className="stat-number">{formatNumber(blogPost.viewCount)}</div>
                  <div className="stat-label">Views</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">💬</div>
                <div className="stat-content">
                  <div className="stat-number">{formatNumber(blogPost.commentCount)}</div>
                  <div className="stat-label">Comments</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">📤</div>
                <div className="stat-content">
                  <div className="stat-number">{formatNumber(blogPost.shareCount)}</div>
                  <div className="stat-label">Shares</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blogPost.featuredImage && (
        <div className="featured-media">
          <div className="image-container">
            <img 
              src={blogPost.featuredImage} 
              alt={blogPost.featuredImageAlt}
              className="featured-image"
            />
          </div>
          {blogPost.featuredImageAlt && (
            <div className="image-caption">{blogPost.featuredImageAlt}</div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="blog-content-layout">
        <div className="content-container">
          
          {/* Primary Content */}
          <main className="primary-content">
            
            {/* Article Content */}
            <article className="article-content">
              <div 
                className="content-body"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </article>

            {/* Tags Section */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <section className="tags-section">
                <div className="section-header">
                  <h3 className="section-title">Topics Covered</h3>
                </div>
                <div className="tags-container">
                  {blogPost.tags.map((tag, index) => (
                    <a 
                      key={index} 
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="topic-tag"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Share Section */}
            <section className="share-section">
              <div className="share-container">
                <div className="share-header">
                  <h4 className="share-title">Found this article helpful?</h4>
                  <p className="share-subtitle">Share it with your network</p>
                </div>
                <div className="share-buttons">
                  <button 
                    className="share-button twitter"
                    onClick={() => handleShare('twitter')}
                  >
                    <span className="button-icon">𝕏</span>
                    <span className="button-text">Twitter</span>
                  </button>
                  <button 
                    className="share-button linkedin"
                    onClick={() => handleShare('linkedin')}
                  >
                    <span className="button-icon">in</span>
                    <span className="button-text">LinkedIn</span>
                  </button>
                  <button 
                    className="share-button facebook"
                    onClick={() => handleShare('facebook')}
                  >
                    <span className="button-icon">f</span>
                    <span className="button-text">Facebook</span>
                  </button>
                  <button 
                    className="share-button copy"
                    onClick={() => handleShare('copy')}
                  >
                    <span className="button-icon">🔗</span>
                    <span className="button-text">Copy Link</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Author Bio */}
            <section className="author-bio-section">
              <div className="author-bio-card">
                <div className="author-bio-avatar">
                  <img 
                    src={blogPost.authorAvatar} 
                    alt={blogPost.author}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format';
                    }}
                  />
                </div>
                <div className="author-bio-content">
                  <div className="author-bio-header">
                    <h4>About {blogPost.author}</h4>
                    <div className="author-role">Senior Writer</div>
                  </div>
                  <p className="author-bio-text">{blogPost.authorBio}</p>
                </div>
              </div>
            </section>

            {/* Newsletter CTA */}
            <section className="newsletter-section">
              <div className="newsletter-card">
                <div className="newsletter-content">
                  <div className="newsletter-icon">📬</div>
                  <h4 className="newsletter-title">Stay Updated with Artemis</h4>
                  <p className="newsletter-description">
                    Get the latest insights on healthcare automation, AI trends, and staffing innovations delivered to your inbox.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                    <div className="form-group">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="newsletter-input"
                        required
                      />
                      <button type="submit" className="newsletter-button">
                        Subscribe
                      </button>
                    </div>
                    <p className="newsletter-note">
                      No spam. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            
            {/* Table of Contents */}
            <div className="sidebar-widget toc-widget">
              <div className="widget-header">
                <h4 className="widget-title">In This Article</h4>
                <div className="widget-icon">📑</div>
              </div>
              <nav className="toc-nav">
                <a href="#introduction" className="toc-link">
                  <span className="toc-bullet"></span>
                  <span className="toc-text">Introduction</span>
                </a>
                <a href="#trends" className="toc-link">
                  <span className="toc-bullet"></span>
                  <span className="toc-text">Current Trends</span>
                </a>
                <a href="#solutions" className="toc-link">
                  <span className="toc-bullet"></span>
                  <span className="toc-text">Artemis Solutions</span>
                </a>
                <a href="#future" className="toc-link">
                  <span className="toc-bullet"></span>
                  <span className="toc-text">Future Outlook</span>
                </a>
                <a href="#conclusion" className="toc-link">
                  <span className="toc-bullet"></span>
                  <span className="toc-text">Conclusion</span>
                </a>
              </nav>
            </div>

            {/* Series Info */}
            {blogPost.metadata.series && (
              <div className="sidebar-widget series-widget">
                <div className="widget-header">
                  <h4 className="widget-title">Series</h4>
                  <div className="widget-icon">📚</div>
                </div>
                <div className="series-content">
                  <div className="series-name">{blogPost.metadata.series}</div>
                  <p className="series-description">
                    Part of our ongoing exploration of AI in healthcare staffing.
                  </p>
                  <a 
                    href={`/blog/series/${blogPost.metadata.series.toLowerCase().replace(/\s+/g, '-')}`}
                    className="series-link"
                  >
                    View All Articles →
                  </a>
                </div>
              </div>
            )}

            {/* Popular Tags */}
            <div className="sidebar-widget tags-widget">
              <div className="widget-header">
                <h4 className="widget-title">Popular Topics</h4>
                <div className="widget-icon">🏷️</div>
              </div>
              <div className="tags-grid">
                {['AI', 'Healthcare', 'Automation', 'Staffing', 'Innovation', 'Technology', 'Digital Health', 'Workforce'].map((tag) => (
                  <a 
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="sidebar-tag"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Widget */}
            <div className="sidebar-widget cta-widget">
              <div className="cta-content">
                <div className="cta-icon">🚀</div>
                <h4 className="cta-title">Ready to Transform Your Staffing?</h4>
                <p className="cta-description">
                  See how Artemis can automate your healthcare staffing operations.
                </p>
                <a href="/demo" className="cta-button">
                  Book a Demo
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Continue Reading</h2>
              <p className="section-subtitle">Explore more articles on similar topics</p>
            </div>
            <div className="related-posts-grid">
              {relatedPosts.map((post) => (
                <article key={post.id} className="related-post-card">
                  <div className="post-image">
                    <img 
                      src={post.featuredImage} 
                      alt={post.featuredImageAlt}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&auto=format';
                      }}
                    />
                    <div className="post-category">{post.category}</div>
                  </div>
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <a href={`/blog/${post.slug}`} className="read-more-link">
                      Read Article →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="comments-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Join the Discussion ({blogPost.commentCount})
            </h2>
            <p className="section-subtitle">
              Share your thoughts on healthcare automation
            </p>
          </div>
          
          <div className="comments-coming-soon">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">💬</div>
              <h3 className="coming-soon-title">Comments Coming Soon</h3>
              <p className="coming-soon-description">
                We're building a community discussion feature to enable meaningful conversations around our articles.
              </p>
              <div className="coming-soon-alternatives">
                <h4>In the meantime, you can:</h4>
                <ul className="alternatives-list">
                  <li>Share your thoughts on LinkedIn and tag @Artemis</li>
                  <li>Reach out via our contact form</li>
                  <li>Join our newsletter for updates on new features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPost;