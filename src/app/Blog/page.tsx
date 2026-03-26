"use client";

import React, { useState, useEffect } from 'react';
import styles from './BlogPost.module.css';

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
  publishedAt: number;       // seconds since epoch
  scheduledFor: string | null;
  seoMeta: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[] | null;
    canonicalUrl: string;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    twitterCard: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
    twitterImage: string | null;
    structuredData: any | null;
    noIndex: boolean;
    noFollow: boolean | null;
  };
  viewCount: number;
  shareCount: number;
  commentCount: number;
  readingTimeMinutes: number;
  relatedBlogIds: string[];
  status: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  metadata: {
    website?: string;
    contentType?: string;
    series?: string;
    readTimeCategory?: string;
    relatedCompanies?: string[];
    language?: string;
    geoTarget?: string;
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
    // Static blog data provided by the user
    const staticData: BlogPostData[] = [
      {
        id: "69865b9b4c161e4ed6846317",
        title: "How Working Capital Financing Helps Businesses Stay Competitive",
        slug: "working-capital-financing-business-competitiveness",
        content: "Working capital financing provides businesses with the funds needed to manage everyday operational expenses and maintain stable cash flow. It is commonly used for payroll, inventory purchases, rent, utilities, and short-term growth initiatives.\n\nMany businesses experience cash flow gaps due to delayed customer payments or seasonal revenue changes. Working capital solutions help bridge these gaps, allowing operations to continue without disruption.\n\nCompared to traditional long-term loans, working capital financing is often faster to access and more flexible. However, business owners should carefully evaluate repayment terms and overall cost before choosing a financing option.\n\nWhen used strategically, working capital financing can help businesses remain competitive, respond to opportunities quickly, and sustain long-term growth.",
        excerpt: "Working capital financing helps businesses manage cash flow, cover daily expenses, and remain competitive in changing markets.",
        featuredImage: "/blog/working-capital.jpg",
        featuredImageAlt: "Working capital financing for small businesses",
        author: "Apollo USA Editorial Team",
        authorBio: "The Apollo USA Editorial Team provides educational insights on business financing and funding strategies.",
        authorAvatar: "/favicon.png",
        category: "Funding",
        tags: ["working capital", "business financing", "cash flow management", "small business funding"],
        featured: false,
        published: true,
        publishedAt: 1770412709.172,
        scheduledFor: null,
        seoMeta: {
          metaTitle: "Working Capital Financing for Small Businesses | Apollo USA",
          metaDescription: "Learn how working capital financing helps small businesses manage cash flow, fund daily operations, and support growth.",
          metaKeywords: null,
          canonicalUrl: "https://www.apollousa.org/blog/working-capital-financing-business-competitiveness",
          ogTitle: null,
          ogDescription: null,
          ogImage: null,
          twitterCard: null,
          twitterTitle: null,
          twitterDescription: null,
          twitterImage: null,
          structuredData: null,
          noIndex: false,
          noFollow: null,
        },
        viewCount: 0,
        shareCount: 0,
        commentCount: 0,
        readingTimeMinutes: 4,
        relatedBlogIds: [],
        status: "DRAFT",
        createdAt: 1770412955.707,
        updatedAt: 1770412955.707,
        createdBy: "system",
        updatedBy: "system",
        metadata: {
          website: "apollousa.org",
          contentType: "educational",
        },
      },
      {
        id: "698664d64c161e4ed6846318",
        title: "Contractor Financing: How to Get the Capital You Need to Grow Your Construction Business",
        slug: "contractor-financing",
        content: "Growing a construction business requires predictable cash flow, access to working capital, and the ability to invest in equipment, labor, and materials upfront. Contractors often face delayed payments, seasonal demand, and high operational costs, which can slow down growth if funding is not available at the right time. Contractor financing is designed to bridge this gap by providing funds for day-to-day operations, project expansion, or emergency expenses. Whether you are a small contractor or managing large commercial projects, having access to financing can help you take on bigger contracts without stressing your cash reserves.There are several types of contractor financing options available, including equipment financing, invoice factoring, lines of credit, and short-term business loans. Each option serves a different purpose, so understanding your business needs is critical before choosing the right solution.Start by preparing clear documentation such as financial statements, project contracts, invoices, and proof of business income. Lenders evaluate these documents to assess your repayment capacity and risk profile. The better organized your records are, the faster your approval process will be.Another key factor is your credit profile. While some lenders offer financing with minimal credit checks, having a healthy business or personal credit score can help you secure lower interest rates and more favorable terms.,Ultimately, contractor financing should be used strategically. Instead of using loans to cover losses, leverage financing to scale operations, purchase productivity-boosting equipment, hire skilled labor, and improve project delivery timelines. When used wisely, financing becomes a growth tool rather than a burden.",
        excerpt: "Understand how merchant cash advances work, their benefits for businesses with consistent sales, and how to determine if this funding option is right for you.",
        featuredImage: "/blog/contractor-financing-south-africa.webp",
        featuredImageAlt: "Contractor-Financing",
        author: "Apollo USA Editorial Team",
        authorBio: "The Apollo USA Editorial Team provides educational insights on business financing and funding strategies.",
        authorAvatar: "/favicon.png",
        category: "Funding",
        tags: ["working capital", "business financing", "cash flow management", "small business funding"],
        featured: false,
        published: true,
        publishedAt: 1770412709.172,
        scheduledFor: null,
        seoMeta: {
          metaTitle: "Contractor Financing: How to Get the Capital You Need to Grow Your Construction Business | Apollo USA",
          metaDescription: "Learn how contractor financing helps construction businesses manage cash flow, fund equipment, cover labor costs, and take on larger projects with confidence.",
          metaKeywords: null,
          canonicalUrl: "https://www.apollousa.org/blog/contractor-financing",
          ogTitle: null,
          ogDescription: null,
          ogImage: null,
          twitterCard: null,
          twitterTitle: null,
          twitterDescription: null,
          twitterImage: null,
          structuredData: null,
          noIndex: false,
          noFollow: null,
        },
        viewCount: 0,
        shareCount: 0,
        commentCount: 0,
        readingTimeMinutes: 6,
        relatedBlogIds: [],
        status: "DRAFT",
        createdAt: 1770415318.141,
        updatedAt: 1770415318.141,
        createdBy: "system",
        updatedBy: "system",
        metadata: {
          website: "apollousa.org",
          contentType: "educational",
        },
      },
      {
        id: "698665b74c161e4ed6846319",
        title: "Merchant Cash Advance Explained: A Comprehensive Guide",
        slug: "merchant-cash-advance",
        content: "A merchant cash advance (MCA) is a flexible funding option designed for businesses with consistent sales, particularly those that accept credit or debit card payments. Instead of a traditional loan with fixed monthly payments, an MCA provides a lump sum of capital in exchange for a percentage of future sales. This structure allows repayments to adjust based on your daily revenue, making it appealing for businesses with fluctuating cash flow.\n\nMerchant cash advances are commonly used to cover short-term business needs such as purchasing inventory, managing payroll, launching marketing campaigns, or handling unexpected expenses. Because approval is primarily based on sales performance rather than credit score, MCAs are often accessible to businesses that may not qualify for conventional bank loans.\n\nThe application process for a merchant cash advance is typically fast and straightforward. Lenders usually require recent bank statements, proof of business revenue, and basic business information. Funds can often be disbursed within days, making MCAs a popular option when quick access to capital is critical.\n\nHowever, it is important to understand the cost structure of merchant cash advances. Instead of interest rates, MCAs use a factor rate, which can make them more expensive than traditional financing if used long-term. Businesses should carefully evaluate their cash flow, repayment terms, and overall financing strategy before choosing this option.\n\nWhen used responsibly, a merchant cash advance can serve as a powerful short-term funding tool. It is best suited for businesses with strong, consistent sales that need fast capital and can comfortably manage variable repayments tied to revenue.",
        excerpt: "Understand how merchant cash advances work, their benefits for businesses with consistent sales, and how to determine if this funding option is right for you.",
        featuredImage: "/blog/merchant-cash.jpg",
        featuredImageAlt: "Merchant Cash Advance Funding",
        author: "Apollo USA Editorial Team",
        authorBio: "The Apollo USA Editorial Team provides educational insights on business financing and funding strategies.",
        authorAvatar: "/favicon.png",
        category: "Funding",
        tags: ["merchant cash advance", "business funding", "cash flow solutions", "small business financing"],
        featured: false,
        published: true,
        publishedAt: 1709078400,
        scheduledFor: null,
        seoMeta: {
          metaTitle: "Merchant Cash Advance Explained: A Comprehensive Guide | Apollo USA",
          metaDescription: "Learn how merchant cash advances work, their advantages, risks, and whether this flexible funding option is right for your business.",
          metaKeywords: null,
          canonicalUrl: "https://www.apollousa.org/blog/merchant-cash-advance",
          ogTitle: null,
          ogDescription: null,
          ogImage: null,
          twitterCard: null,
          twitterTitle: null,
          twitterDescription: null,
          twitterImage: null,
          structuredData: null,
          noIndex: false,
          noFollow: null,
        },
        viewCount: 0,
        shareCount: 0,
        commentCount: 0,
        readingTimeMinutes: 7,
        relatedBlogIds: [],
        status: "DRAFT",
        createdAt: 1770415543.261,
        updatedAt: 1770415543.261,
        createdBy: "system",
        updatedBy: "system",
        metadata: {
          website: "apollousa.org",
          contentType: "educational",
        },
      },
      {
        id: "698665fd4c161e4ed684631a",
        title: "The Complete Guide to SBA Loans for Small Businesses",
        slug: "sba-loan-guide",
        content: "Small Business Administration (SBA) loans are one of the most popular financing options for small businesses seeking affordable and long-term funding. Backed by the U.S. Small Business Administration, these loans reduce risk for lenders, allowing businesses to access lower interest rates, longer repayment terms, and higher loan amounts compared to traditional business loans.\n\nSBA loans can be used for a wide range of business purposes, including working capital, purchasing equipment, buying real estate, refinancing existing debt, or funding business expansion. Popular SBA loan programs include the SBA 7(a) Loan Program, SBA 504 Loans, and SBA Microloans, each designed to meet different business needs.\n\nTo qualify for an SBA loan, businesses must meet specific eligibility requirements. These typically include operating as a for-profit business, meeting SBA size standards, demonstrating the ability to repay the loan, and having invested equity in the business. Lenders will also evaluate credit history, cash flow, and business financial statements during the approval process.\n\nThe SBA loan application process is more detailed than many alternative financing options. Applicants should be prepared to submit financial statements, tax returns, business plans, and personal background information. While approval may take longer, the favorable loan terms often make SBA loans worth the effort.\n\nWhen compared to traditional business loans, SBA loans generally offer more flexible terms and lower costs, but require more documentation and patience. For small businesses focused on long-term growth and stability, SBA loans can be a powerful financing solution.",
        excerpt: "Everything you need to know about SBA loans, including eligibility requirements, application process, and how they compare to traditional business loans.",
        featuredImage: "/blog/sba-loan.jpg",
        featuredImageAlt: "SBA Loan Guide for Small Businesses",
        author: "Apollo USA Editorial Team",
        authorBio: "The Apollo USA Editorial Team provides educational insights on business financing and funding strategies.",
        authorAvatar: "/favicon.png",
        category: "Funding",
        tags: ["sba loans", "small business funding", "business loans", "government-backed loans"],
        featured: false,
        published: true,
        publishedAt: 1707955200,
        scheduledFor: null,
        seoMeta: {
          metaTitle: "The Complete Guide to SBA Loans for Small Businesses | Apollo USA",
          metaDescription: "Learn how SBA loans work, eligibility requirements, application steps, and how they compare to traditional business financing options.",
          metaKeywords: null,
          canonicalUrl: "https://www.apollousa.org/blog/sba-loan-guide",
          ogTitle: null,
          ogDescription: null,
          ogImage: null,
          twitterCard: null,
          twitterTitle: null,
          twitterDescription: null,
          twitterImage: null,
          structuredData: null,
          noIndex: false,
          noFollow: null,
        },
        viewCount: 0,
        shareCount: 0,
        commentCount: 0,
        readingTimeMinutes: 8,
        relatedBlogIds: [],
        status: "DRAFT",
        createdAt: 1770415613.406,
        updatedAt: 1770415613.406,
        createdBy: "system",
        updatedBy: "system",
        metadata: {
          website: "apollousa.org",
          contentType: "educational",
        },
      },
      {
        id: "698666334c161e4ed684631b",
        title: "Effective Cash Flow Management Strategies for Growing Businesses",
        slug: "cash-flow-management",
        content: "Effective cash flow management is critical for growing businesses looking to maintain stability while scaling operations. Cash flow represents the movement of money in and out of your business, and without proper oversight, even profitable companies can struggle to meet day-to-day expenses.\n\nOne of the most important strategies is maintaining accurate and up-to-date cash flow forecasts. By projecting income and expenses, businesses can anticipate shortfalls, plan for seasonal fluctuations, and make informed financial decisions ahead of time. Regularly reviewing forecasts helps prevent surprises and allows for proactive adjustments.\n\nImproving accounts receivable processes is another key factor in optimizing cash flow. Sending invoices promptly, setting clear payment terms, and following up on overdue payments can significantly reduce delays in receiving funds. Offering early payment incentives or multiple payment options can further encourage timely payments.\n\nControlling expenses is equally important. Businesses should regularly review operating costs, eliminate unnecessary spending, and negotiate better terms with suppliers where possible. Even small cost-saving measures can add up and improve overall financial flexibility.\n\nFinally, maintaining access to flexible funding options such as lines of credit or short-term financing can help businesses bridge temporary cash gaps. When combined with strong cash flow management practices, these tools allow companies to seize growth opportunities without jeopardizing financial stability.",
        excerpt: "Essential strategies to optimize cash flow, avoid common pitfalls, and ensure your business has the financial flexibility to seize growth opportunities.",
        featuredImage: "/blog/cash-flow.webp",
        featuredImageAlt: "Cash Flow Management Strategies for Businesses",
        author: "Apollo USA Editorial Team",
        authorBio: "The Apollo USA Editorial Team provides educational insights on business financing and funding strategies.",
        authorAvatar: "/favicon.png",
        category: "Funding",
        tags: ["cash flow management", "business finance", "working capital", "financial planning"],
        featured: false,
        published: true,
        publishedAt: 1706572800,
        scheduledFor: null,
        seoMeta: {
          metaTitle: "Effective Cash Flow Management Strategies for Growing Businesses | Apollo USA",
          metaDescription: "Learn proven cash flow management strategies to improve liquidity, reduce financial risk, and support sustainable business growth.",
          metaKeywords: null,
          canonicalUrl: "https://www.apollousa.org/blog/cash-flow-management",
          ogTitle: null,
          ogDescription: null,
          ogImage: null,
          twitterCard: null,
          twitterTitle: null,
          twitterDescription: null,
          twitterImage: null,
          structuredData: null,
          noIndex: false,
          noFollow: null,
        },
        viewCount: 0,
        shareCount: 0,
        commentCount: 0,
        readingTimeMinutes: 6,
        relatedBlogIds: [],
        status: "DRAFT",
        createdAt: 1770415667.409,
        updatedAt: 1770415667.409,
        createdBy: "system",
        updatedBy: "system",
        metadata: {
          website: "apollousa.org",
          contentType: "educational",
        },
      },
    ];

    // Convert publishedAt from seconds to milliseconds if needed
    const normalizePosts = (posts: BlogPostData[]): BlogPostData[] => {
      return posts.map(post => ({
        ...post,
        publishedAt:
          typeof post.publishedAt === 'number' && post.publishedAt < 1e12
            ? post.publishedAt * 1000
            : post.publishedAt,
      }));
    };

    const normalized = normalizePosts(staticData);

    // Include all posts (no filtering by status; all have published: true)
    setBlogPosts(normalized);

    // Set related posts (first 3 from the list, but you might customize based on relatedBlogIds)
    setRelatedPosts(normalized.slice(0, 3));

    setLoading(false);
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
          block: 'start',
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

  const formatDate = (dateValue: number) => {
    try {
      // If it's still in seconds (Unix timestamp), convert to milliseconds
      const ms = dateValue < 1e12 ? dateValue * 1000 : dateValue;
      return new Date(ms).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
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
      copy: url,
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

        {/* API Status Info (now showing static data) */}
        <div className={styles.apiStatus}>
          <strong>📡 Data Source:</strong> Static blog data{' '}
          | Showing <strong>{filteredPosts.length}</strong> of{' '}
          <strong>{blogPosts.length}</strong> posts
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
                className={`${styles.categoryFilter} ${selectedCategory === category ? styles.active : ''
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
              className={`${styles.postCard} ${post.featured ? styles.featured : ''} ${selectedPost?.id === post.id ? styles.selected : ''
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
              className={`${styles.postDetail} ${expandedPosts.has(post.id) ? styles.expanded : ''
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
                      src={post.featuredImage}
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