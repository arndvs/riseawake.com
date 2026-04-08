const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/investors/ceo-letter',
        destination: '/investors/shareholder-letter',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
