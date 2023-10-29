const isDev = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: !isDev,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https',
      },
    ],
  },
}

module.exports = nextConfig
