const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')

const withPWA = require('next-pwa')({
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
})

module.exports = withPWA({
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    i18n,
    images: {
        domains: [
            'via.placeholder.com',
            'res.cloudinary.com',
            's3.amazonaws.com',
            '18.141.64.26',
            '127.0.0.1',
            'localhost',
            'picsum.photos',
            'pickbazar-sail.test',
            'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
            'chawkbazarlaravel.s3.ap-southeast-1.amazonaws.com',
            'lh3.googleusercontent.com',
            'https://abhorrent-potato-production.up.railway.app/',
            'abhorrent-potato-production.up.railway.app',
        ],
    },
})
