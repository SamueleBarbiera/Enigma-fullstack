const path = require('path')

module.exports = {
    i18n: {
        locales: ['en', 'de', 'es', 'ar', 'he', 'zh', 'it'],
        defaultLocale: 'it',
        // localeDetection: false,
    },
    localePath: path.resolve('./public/locales/chawkbazar'),
}
