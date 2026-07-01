import type { NextConfig } from "next";

const isStatic = process.env.NEXT_PUBLIC_STATIC_MODE === "true";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" as const } : {}),
  images: {
    unoptimized: isStatic,
    remotePatterns: isStatic
      ? []
      : [{ protocol: "https", hostname: "picsum.photos" }],
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
