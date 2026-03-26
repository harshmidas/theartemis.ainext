/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tenantapi.theartemis.ai/api/:path*",
      },
    ];
  },
};

export default nextConfig;
