/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/index.html',
                destination: '/',
                permanent: true,
            },
            {
                source: '/input.html',
                destination: '/input',
                permanent: true,
            },
            {
                source: '/summary.html',
                destination: '/summary',
                permanent: true,
            }
        ];
    },
};

export default nextConfig;
