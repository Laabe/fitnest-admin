import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'obtmksfewry4ishp.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'fls-a061ca9c-da8c-490f-9693-9a12f9c91e4d.laravel.cloud',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
