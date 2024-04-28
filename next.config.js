const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "out",

}

module.exports = withContentlayer(nextConfig)
