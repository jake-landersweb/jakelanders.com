/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
