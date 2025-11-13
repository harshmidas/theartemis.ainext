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