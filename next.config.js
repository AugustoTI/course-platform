const isDev = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: !isDev,
  },
  images: {
    domains: ['utfs.io'],
  },
}

module.exports = nextConfig
