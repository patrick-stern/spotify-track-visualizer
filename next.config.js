/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `@import "_utils.scss";`
    },

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.forEach(({ oneOf }) =>
			oneOf?.forEach(({ use }) => {
				use?.forEach?.(({ options}) => {
                    localIdentName = dev ? '[name]_[local]__[hash:base64:5]' : 'css__[hash:base64:4]';
				});
			}),
		);

		return config;
	},
}

module.exports = nextConfig
