const { i18n } = require('./next-i18next.config.js');

module.exports = {
	i18n,
	reactStrictMode: true,
	images: {
		domains: [], // Remove wildcard domains as they're not secure
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // Allow all hostnames with https
			},
			{
				protocol: 'http',
				hostname: '**', // Allow all hostnames with http
			},
		],
	},
};
