/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rehoukrel-storage.is3.cloudhost.id',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
