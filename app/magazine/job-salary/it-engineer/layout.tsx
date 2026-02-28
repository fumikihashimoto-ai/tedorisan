import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ITエンジニアの平均年収は？年収アップを実現する転職のポイント | 手取りのミカタ',
  description:
    'ITエンジニアの平均年収データと年収アップを実現するための転職戦略を徹底解説。',
};

export default function ITEngineerSalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
