/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i5.walmartimages.com",
      "localhost",
      "picsum.photos",
      "example.com",
    ], // <== Domain name
  },
};

module.exports = nextConfig;
