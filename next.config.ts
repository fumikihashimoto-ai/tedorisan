import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // 計算ツール
      {
        source: '/job-change',
        destination: '/tools/job-change',
        permanent: true,
      },
      {
        source: '/fresh-graduate',
        destination: '/tools/fresh-graduate',
        permanent: true,
      },
      {
        source: '/side-business',
        destination: '/tools/side-business',
        permanent: true,
      },
      // 業種別
      {
        source: '/industry/:path*',
        destination: '/data/industry/:path*',
        permanent: true,
      },
      // 早見表
      {
        source: '/comparison/list',
        destination: '/tables',
        permanent: true,
      },
      {
        source: '/comparison',
        destination: '/tables',
        permanent: true,
      },
      {
        source: '/annual-income/:amount',
        destination: '/tables/annual-income/:amount',
        permanent: true,
      },
      {
        source: '/monthly-takehome/:amount',
        destination: '/tables/monthly-takehome/:amount',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
