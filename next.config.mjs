import createNextJsObfuscator from "nextjs-obfuscator";
/** @type {import('next').NextConfig} */
const withNextJsObfuscator = createNextJsObfuscator(obfuscatorOptions, pluginOptions);
const nextConfig = withNextJsObfuscator({
  images: {
    domains: ["open.api.nexon.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
});

export default nextConfig;
