/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com", "storage.tally.so", "avatars.githubusercontent.com"],
  },
  transpilePackages: ['@uiw/react-md-editor'],
};

module.exports = nextConfig;