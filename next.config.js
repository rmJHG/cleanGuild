const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['open.api.nexon.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@acme/ui'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async rewrites() {
    return [
      {
        source: '/fetchData',
        destination: '/api/char',
      },
    ];
  },
};

module.exports = nextConfig;
