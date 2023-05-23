/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  output: 'export',
  distDir: 'dist',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
