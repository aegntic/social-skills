import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Run Cloudflare's bindings/edge shim in `next dev` for local parity with Pages.
// ponytail: setupDevPlatform is a no-op outside Cloudflare env (safe to keep on).
setupDevPlatform();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
