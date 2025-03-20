/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        // port: '',
        // pathname: '/**',
        // search: '',
      },
      {
        protocol: 'http',
        hostname: 'cms',
        // port: '',
        // pathname: '/**',
        // search: '',
      },
    ],
  },
}

export default nextConfig
