import React from "react";
import { useSeoConfig } from "../context/SeoConfigContext";

const DynamicFooter: React.FC = () => {
  const { config } = useSeoConfig();
  if (!config) return null;

  return (
    <footer
      style={{ marginTop: "50px", textAlign: "center" }}
      dangerouslySetInnerHTML={{ __html: config.brandingConfig.footerHtml }}
    />
  );
};

export default DynamicFooter;
