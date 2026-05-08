import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.hashnode.com'
            },
            {
                protocol: 'https',
                hostname: 'www.freecodecamp.org'
            }
        ]
    },
    turbopack: {
        root: process.cwd()
    }
}

export default nextConfig
