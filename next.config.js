const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "out",


}

module.exports = withContentlayer(nextConfig)
