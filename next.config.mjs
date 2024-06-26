/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["open.api.nexon.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
  },
};

export default nextConfig;
