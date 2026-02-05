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
      // 業種別（旧 /industry/* → 新 /magazine/job-salary/*）
      {
        source: '/industry/:path*',
        destination: '/magazine/job-salary/:path*',
        permanent: true,
      },
      // 職種別年収（旧 /data/industry/* → 新 /magazine/job-salary/*）
      {
        source: '/data/industry/it-engineer',
        destination: '/magazine/job-salary/it-engineer',
        permanent: true,
      },
      {
        source: '/data/industry/pharmacist',
        destination: '/magazine/job-salary/pharmacist',
        permanent: true,
      },
      {
        source: '/data/industry/nursery',
        destination: '/magazine/job-salary/nursery',
        permanent: true,
      },
      {
        source: '/data/industry/medical-tech',
        destination: '/magazine/job-salary/medical-tech',
        permanent: true,
      },
      {
        source: '/data/industry/real-estate',
        destination: '/magazine/job-salary/real-estate',
        permanent: true,
      },
      {
        source: '/data/industry/construction',
        destination: '/magazine/job-salary/construction',
        permanent: true,
      },
      {
        source: '/data/industry/sales',
        destination: '/magazine/job-salary/sales',
        permanent: true,
      },
      // 未経験の転職（旧 /career/inexperienced* → 新 /magazine/inexperienced/*）
      {
        source: '/career/inexperienced',
        destination: '/magazine/inexperienced/20s',
        permanent: true,
      },
      {
        source: '/career/inexperienced-women',
        destination: '/magazine/inexperienced/20s-women',
        permanent: true,
      },
      {
        source: '/career/inexperienced-30s',
        destination: '/magazine/inexperienced/30s',
        permanent: true,
      },
      {
        source: '/career/inexperienced-30s-women',
        destination: '/magazine/inexperienced/30s-women',
        permanent: true,
      },
      {
        source: '/career/inexperienced-40s',
        destination: '/magazine/inexperienced/40s',
        permanent: true,
      },
      {
        source: '/career/inexperienced-40s-women',
        destination: '/magazine/inexperienced/40s-women',
        permanent: true,
      },
      // 早見表（年収別・手取り別は /tables に集約）
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
        source: '/tables/annual-income/:amount',
        destination: '/tables',
        permanent: true,
      },
      {
        source: '/tables/monthly-takehome/:amount',
        destination: '/tables',
        permanent: true,
      },
      {
        source: '/annual-income/:amount',
        destination: '/tables',
        permanent: true,
      },
      {
        source: '/monthly-takehome/:amount',
        destination: '/tables',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
