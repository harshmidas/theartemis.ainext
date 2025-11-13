'use client';

import React from "react";
import Head from "next/head";
import { useSeoConfig } from "../context/SeoConfigContext";

const SeoMeta: React.FC = () => {
  const { config, loading } = useSeoConfig();
  
  if (loading || !config) return null;

  const { seoConfig } = config;
  const {
    metaTitle,
    metaDescription,
    metaKeywords = [],
    ogImage,
    twitterCard,
    canonicalUrl,
    favicon,
  } = seoConfig;

  return (
    <Head>
      {/* Title */}
      <title>{metaTitle}</title>

      {/* Basic SEO */}
      <meta name="description" content={metaDescription} />
      {metaKeywords.length > 0 && (
        <meta name="keywords" content={metaKeywords.join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      {favicon && <link rel="icon" href={favicon} type="image/png" />}
    </Head>
  );
};

export default SeoMeta;