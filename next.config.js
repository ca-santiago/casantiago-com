/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'media.licdn.com',
        }, {
            protocol: 'https',
            hostname: 'static.vecteezy.com'
        },{
            protocol: 'https',
            hostname: 'drive.google.com'
        }]
    }
}

module.exports = nextConfig
