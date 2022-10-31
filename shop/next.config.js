const { i18n } = require('./next-i18next.config')
const runtimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')({
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
})

module.exports = withPWA({
    i18n,
    images: {
        domains: [
            '127.0.0.1',
            'localhost',
            'googleusercontent.com',
            'maps.googleapis.com',
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
