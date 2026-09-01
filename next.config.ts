import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // English is paused — keep any existing /en links working instead of 404ing.
      // Temporary, so 307 rather than 308.
      { source: '/en', destination: '/vi', permanent: false },
      { source: '/en/:path*', destination: '/vi/:path*', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
