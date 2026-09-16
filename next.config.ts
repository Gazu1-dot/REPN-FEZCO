import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "export", devIndicators: false, distDir: process.env.REPN_DEV_PREVIEW ? ".next-preview" : ".next", allowedDevOrigins: ["terminal.local"], trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
