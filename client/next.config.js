/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  distDir: 'dist',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
