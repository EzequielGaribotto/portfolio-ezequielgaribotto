/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Fix asset paths for GitHub Pages
  assetPrefix: './',
  trailingSlash: true,
}

module.exports = nextConfig