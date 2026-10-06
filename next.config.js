/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig