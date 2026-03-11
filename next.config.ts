import type { NextConfig } from "next";
import { cmsRedirects } from './lib/redirects';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
  async redirects() {
    return [
      // HTTP → HTTPS 永久リダイレクト（x-forwarded-proto で判定）
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://tedorisan.jp/:path*',
        permanent: true,
      },
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
        destination: '/articles/salary-data/pharmacist',
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
        destination: '/articles/salary-data/real-estate',
        permanent: true,
      },
      {
        source: '/data/industry/construction',
        destination: '/articles/salary-data/construction',
        permanent: true,
      },
      {
        source: '/data/industry/sales',
        destination: '/articles/salary-data/sales',
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
      // 資格系ページ → 記事ページへリダイレクト
      {
        source: '/qualifications/araforty-engineer',
        destination: '/articles/skill-up/araforty-engineer',
        permanent: true,
      },
      {
        source: '/qualifications',
        destination: '/articles/skill-up/araforty-engineer',
        permanent: true,
      },
      // magazine系ページ → 記事ページへリダイレクト
      {
        source: '/magazine/job-salary/it-engineer',
        destination: '/articles/salary-data/it-engineer',
        permanent: true,
      },
      {
        source: '/magazine/job-salary/sales',
        destination: '/articles/salary-data/sales',
        permanent: true,
      },
      {
        source: '/magazine/job-salary/pharmacist',
        destination: '/articles/salary-data/pharmacist',
        permanent: true,
      },
      {
        source: '/magazine/job-salary/nursery',
        destination: '/articles/salary-data/nursery',
        permanent: true,
      },
      {
        source: '/magazine/job-salary/medical-tech',
        destination: '/articles/salary-data/medical-tech',
        permanent: true,
      },
      {
        source: '/magazine/job-salary/real-estate',
        destination: '/articles/salary-data/real-estate',
        permanent: true,
      },
      {
        source: '/magazine/job-salary/construction',
        destination: '/articles/salary-data/construction',
        permanent: true,
      },
      // 未経験転職系ページ → 記事ページへリダイレクト
      {
        source: '/magazine/inexperienced/20s',
        destination: '/articles/career-change/20s',
        permanent: true,
      },
      {
        source: '/magazine/inexperienced/20s-women',
        destination: '/articles/career-change/20s-women',
        permanent: true,
      },
      {
        source: '/magazine/inexperienced/30s',
        destination: '/articles/career-change/30s',
        permanent: true,
      },
      {
        source: '/magazine/inexperienced/30s-women',
        destination: '/articles/career-change/30s-women',
        permanent: true,
      },
      {
        source: '/magazine/inexperienced/40s',
        destination: '/articles/career-change/40s',
        permanent: true,
      },
      {
        source: '/magazine/inexperienced/40s-women',
        destination: '/articles/career-change/40s-women',
        permanent: true,
      },
      {
        source: '/magazine/inexperienced/high-school-women',
        destination: '/articles/career-change/high-school-women',
        permanent: true,
      },
      {
        source: '/magazine/high-school',
        destination: '/articles/career-change/high-school-career',
        permanent: true,
      },
      // ツール系ページ → 記事ページへリダイレクト
      {
        source: '/tools/fresh-graduate',
        destination: '/articles/career-change/fresh-graduate',
        permanent: true,
      },
      {
        source: '/tools/job-change',
        destination: '/articles/career-change/job-change',
        permanent: true,
      },
      {
        source: '/tools/side-business',
        destination: '/articles/salary-basics/side-business',
        permanent: true,
      },
      // 早見表 → 記事ページへリダイレクト
      {
        source: '/tables',
        destination: '/articles/salary-basics/tables',
        permanent: true,
      },
      {
        source: '/tables/',
        destination: '/articles/salary-basics/tables',
        permanent: true,
      },
      // 資格系ページ → 記事ページへリダイレクト（追加分）
      {
        source: '/qualifications/stable-career',
        destination: '/articles/skill-up/stable-career',
        permanent: true,
      },
      {
        source: '/qualifications/no-entry-requirement',
        destination: '/articles/skill-up/no-entry-requirement',
        permanent: true,
      },
      {
        source: '/qualifications/no-work-experience',
        destination: '/articles/skill-up/no-work-experience',
        permanent: true,
      },
      {
        source: '/qualifications/high-income',
        destination: '/articles/skill-up/high-income',
        permanent: true,
      },
      {
        source: '/qualifications/40s-women-restart',
        destination: '/articles/skill-up/40s-women-restart',
        permanent: true,
      },
      // ツールページ → 計算ページ
      {
        source: '/tools',
        destination: '/calculator',
        permanent: true,
      },
      // キャリア系ページ → リダイレクト
      {
        source: '/career/career-change-20s',
        destination: '/articles/career-change/career-change-20s',
        permanent: true,
      },
      {
        source: '/career/high-income',
        destination: '/',
        permanent: true,
      },
      ...cmsRedirects,
    ];
  },
};

export default nextConfig;
