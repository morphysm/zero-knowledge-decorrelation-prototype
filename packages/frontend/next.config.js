/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@famed-airdrop-prototype/contracts']);

const nextConfig = withTM({
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback = {
        fs: false,
        stream: false,
        path: false,
        crypto: false,
        os: false,
      };
    }
    return config;
  },
});


module.exports = nextConfig;
