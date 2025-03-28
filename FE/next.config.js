
const { i18n } = require('./next-i18next.config.js');

module.exports = {
	i18n,
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'links.papareact.com',
			},
			{
				protocol: 'https',
				hostname: 'encrypted-tbn1.gstatic.com',
			},
			{
				protocol: 'https',
				hostname: 'homestaybooking-001-site1.ntempurl.com',
			},
			{
				protocol: 'https',
				hostname: 'i.pinimg.com',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
				protocol: 'http',
			},
			{
				protocol: 'https',
				hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
			},
			{
				protocol: 'https',
				hostname: 'homestaybooking-',
			},
		],
	},
};
