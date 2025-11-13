export interface SeoWebsite {
  id: string;
  domain: string;
  seoConfig: SeoConfig;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
  favicon: string;
  headerScripts?: string[];
  footerScripts?: string[];
}






export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  robotsTxt: string;
  sitemapUrl: string;
  favicon: string;
  ogImage: string;
  twitterCard: string;
  structuredData: Record<string, any>;
  indexable: boolean;
  canonicalUrl: string;
}

export interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCss: string;
  headerHtml: string;
  footerHtml: string;
  bannerImage: string;
}

export interface JobFeedConfig {
  jobCategories: string[];
  locations: string[];
  jobsPerPage: number;
  sortOrder: string;
  showSalary: boolean;
  showCompanyLogo: boolean;
  enableApply: boolean;
  applyRedirectUrl: string;
  customFilters: Record<string, string>;
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  linkedInInsightTag?: string;
  customTracking?: Record<string, string>;
}

export interface CustomScripts {
  headerScripts: string;
  footerScripts: string;
  externalScripts: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  additionalContacts?: Record<string, string>;
}

export interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}

export interface SeoWebsite {
  _id: string;
  name: string;
  domain: string;
  baseUrl: string;
  description: string;
  active: boolean;
  seoConfig: SeoConfig;
  brandingConfig: BrandingConfig;
  jobFeedConfig: JobFeedConfig;
  analyticsConfig: AnalyticsConfig;
  customScripts: CustomScripts;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  metadata?: Record<string, any>;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  anchor: string;
}

export interface Reference {
  title: string;
  url: string;
  author: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  subCategory?: string;
  featured: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  galleryImages?: string[];
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  authorLinkedIn?: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
  articleType: string;
  difficultyLevel: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  tags: string[];
  tableOfContents?: TableOfContentsItem[];
  references?: Reference[];
  seoMeta?: SEOData;
}