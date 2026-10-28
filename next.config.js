/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    // Qualities the components request (Next 16 requires them to be declared)
    qualities: [75, 100],
  },
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig