/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect semua URL WordPress lama (?page_id=X, ?p=X) ke homepage
      {
        source: '/',
        has: [{ type: 'query', key: 'page_id' }],
        destination: '/',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'p' }],
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
