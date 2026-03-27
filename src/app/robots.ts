export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/auth/"],
      },
    ],
    sitemap: "https://theartemis.ai/sitemap.xml",
  };
}