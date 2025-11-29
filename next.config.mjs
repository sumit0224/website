/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'appwarstechnologies.com',
      },
    ],
  },
};

export default nextConfig;
