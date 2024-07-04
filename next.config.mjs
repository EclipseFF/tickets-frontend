/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
                pathname: '/api/v1/static/**',
            },
            {
                protocol: 'http',
                hostname: '194.110.55.24',
                port: '4000',
                pathname: '/api/v1/static/**',
            },

            {
                protocol: 'https',
                hostname: '91.201.214.204',
                port: '4000',
                pathname: '/api/v1/static/**',
            },
        ],
    }
};

export default nextConfig;
