const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')

const withPWA = require('next-pwa')({
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
})

module.exports = withPWA({
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
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
            'https://api-enigma-moda-production.up.railway.app/',
            'api-enigma-moda-production.up.railway.app',
            'googleusercontent.com',
            'chawkbazarapi.Enigma.io',
            'graph.facebook.com',
            'res.cloudinary.com',
            's3.amazonaws.com',
            '18.141.64.26',
            'via.placeholder.com',
            'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
            'chawkbazarlaravel.s3.ap-southeast-1.amazonaws.com',
            'picsum.photos',
            'cdninstagram.com',
            'scontent.cdninstagram.com',
        ],
    },
})
