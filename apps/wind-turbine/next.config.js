/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@mui/x-charts']);
const nextConfig = {}

module.exports = withTM({
    // Your Next.js config
});