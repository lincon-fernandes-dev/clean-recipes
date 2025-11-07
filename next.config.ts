const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // Ou use remotePatterns (recomendado para versões mais recentes do Next.js)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
