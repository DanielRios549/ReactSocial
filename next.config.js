/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    buildExcludes: [/middleware-manifest.json$/, /_middleware.js$/],
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'github-readme-stats.vercel.app'
    ],
  },
})
