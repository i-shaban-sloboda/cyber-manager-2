/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        // workaround for Amplify build
        STAGING_URL: process.env.STAGING_URL,
    },
}

module.exports = nextConfig
