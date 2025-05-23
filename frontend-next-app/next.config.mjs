/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        // port: '',
        // pathname: '/**',
        // search: '',
      },
      {
        protocol: "http",
        hostname: "cms",
        // port: '',
        // pathname: '/**',
        // search: '',
      },
      {
        protocol: "https",
        hostname: "starostwo-cms-prod-262337281137.us-central1.run.app",
        // port: '',
        // pathname: '',
        // search: '',
      },

      {
        protocol: "https",
        hostname: "szkolycms.powiatminski.pl",
        // port: '',
        // pathname: '',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
