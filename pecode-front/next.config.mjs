/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      },
    ]
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:4000/:path*',
    },
  ],
}

export default nextConfig
