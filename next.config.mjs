/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_NODE_ENV === 'prod',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'http',
        hostname: '**.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
