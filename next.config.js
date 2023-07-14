/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.lauravillumsen.dk',
      },
    ],
  },
};

module.exports = nextConfig;
