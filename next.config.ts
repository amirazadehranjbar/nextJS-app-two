import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "agreeable-mandrill-857.convex.cloud",
                pathname: "/api/storage/**",
            },
        ],
    },
};

export default nextConfig;
