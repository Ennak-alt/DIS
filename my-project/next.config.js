/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/www',
  output: 'export',
  distDir: 'dist',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
