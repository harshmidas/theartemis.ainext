'use client';

import React from "react";
import Script from "next/script";
import { useSeoConfig } from "../context/SeoConfigContext";

const DynamicScripts: React.FC = () => {
  const { config } = useSeoConfig();
  
  if (!config) return null;

  const { seoConfig } = config;
  const { headerScripts = [], footerScripts = [] } = seoConfig;

  return (
    <>
      {/* Header Scripts */}
      {headerScripts.map((script, index) => (
        <Script
          key={`header-${index}`}
          id={`header-script-${index}`}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: script }}
        />
      ))}

      {/* Footer Scripts */}
      {footerScripts.map((script, index) => (
        <Script
          key={`footer-${index}`}
          id={`footer-script-${index}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: script }}
        />
      ))}
    </>
  );
};

export default DynamicScripts;