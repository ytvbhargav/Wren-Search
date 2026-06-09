import withPayload from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "localhost" },
      // S3 bucket host that serves Payload media.
      { hostname: "nownloadcms.s3.ap-south-1.amazonaws.com" },
    ],
    unoptimized: true, // Payload-served media
  },
};

export default withPayload(nextConfig, {
  configPath: "./src/payload.config.ts",
});
