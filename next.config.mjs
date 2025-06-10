/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/phonolab',
  assetPrefix: '/phonolab/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
