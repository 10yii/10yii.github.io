const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "out",
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }

}

module.exports = withContentlayer(nextConfig)
