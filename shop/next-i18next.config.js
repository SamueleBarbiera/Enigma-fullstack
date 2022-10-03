const path = require("path");
module.exports = {
	i18n: {
		locales: ["en", "de", "es","it", "ar", "he", "zh"],
		defaultLocale: "it",
	},
	localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
