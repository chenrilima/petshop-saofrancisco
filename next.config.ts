import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.15.10", "192.168.*"],
};

export default nextConfig;
