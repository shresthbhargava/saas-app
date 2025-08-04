const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            { hostname: 'img.clerk.com' },
        ],
    },
};

const sentryOptions = {
    org: 'student-tet',
    project: 'money',

    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    disableLogger: true,
    automaticVercelMonitors: true,
};

module.exports = withSentryConfig(nextConfig, sentryOptions);
``
