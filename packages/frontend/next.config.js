/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@famed-airdrop-prototype/frontend']);

const nextConfig = withTM({
  reactStrictMode: true,
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
    // config.experiments = { asyncWebAssembly: true };
    return config;
  },
});

module.exports = nextConfig;
