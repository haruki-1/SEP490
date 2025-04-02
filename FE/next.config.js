const { i18n } = require('./next-i18next.config.js');

module.exports = {
	i18n,
	reactStrictMode: true,
	images: {
		domains: ['*'], // Cho phép tất cả các domain
		// hoặc sử dụng remotePatterns với pattern rộng hơn
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // Cho phép tất cả các hostname với https
			},
			{
				protocol: 'http',
				hostname: '**', // Cho phép tất cả các hostname với http
			},
		],
	},
};