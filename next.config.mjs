/** @type {import('next').NextConfig} */
const nextConfig = {
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
