const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: "export",
    distDir: "out",
    images: { unoptimized: true }

}

module.exports = withContentlayer(nextConfig)
