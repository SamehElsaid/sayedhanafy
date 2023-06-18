/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: ["static.zyda.com"] },
    env: {
      API_URL: "http://localhost:3009",
    },
  };

module.exports = nextConfig
