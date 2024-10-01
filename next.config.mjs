/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "valiant-partridge-243.convex.cloud" },
      { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
      { hostname: "handsome-penguin-673.convex.cloud" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
