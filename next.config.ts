import type { NextConfig } from "next";

const cloudname = process.env.CLOUDINARY_CLOUD_NAME;

// TODO: if not cloudname 

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit:"5mb",
    },
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${cloudname}/**`,
      },
    ],
  },
};

export default nextConfig;
