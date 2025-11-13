import React, { useEffect } from "react";
import { useSeoConfig } from "../context/SeoConfigContext";

const DynamicHeader: React.FC = () => {
  const { config } = useSeoConfig();
  if (!config) return null;
console.log("DynamicHeader config:", config);
  const { brandingConfig } = config;

  // Apply brand colors and fonts globally
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", brandingConfig.primaryColor);
    root.style.setProperty("--secondary-color", brandingConfig.secondaryColor);
    root.style.setProperty("--font-family", brandingConfig.fontFamily);
  }, [brandingConfig]);

  return (
    <header
      style={{ fontFamily: brandingConfig.fontFamily }}
      dangerouslySetInnerHTML={{ __html: brandingConfig.headerHtml }}
    />
  );
};

export default DynamicHeader;
