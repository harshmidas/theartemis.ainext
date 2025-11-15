/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://157.20.214.84:9292/api/:path*",
      },
    ];
  },
};

export default nextConfig;
