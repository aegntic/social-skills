import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lint runs via `bun run lint`; don't fail production builds on lint.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
