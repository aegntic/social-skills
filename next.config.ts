import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lint runs via `bun run lint`; don't fail production builds on lint.
  eslint: { ignoreDuringBuilds: true },
  // Emit a self-contained server bundle for container/deploy targets.
  output: "standalone",
};

export default nextConfig;
