/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.1.3:9291/api/:path*",
      },
    ];
  },
};

export default nextConfig;
