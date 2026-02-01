import CtaCard from './CtaCard';

interface CtaSectionProps {
  title?: string; // セクションタイトル（デフォルト: '手取りを増やすための次のステップ'）
}

export default function CtaSection({ title = '手取りを増やすための次のステップ' }: CtaSectionProps) {
  return (
    <section className="bg-[#F8FAFC] py-6 px-4 rounded-lg">
      <h2 className="text-lg font-bold text-[#1E293B] mb-4">{title}</h2>
      <div>
        <CtaCard title="自分の適正年収を知って、今の年収と比べてみませんか？" />
        <CtaCard title="『年収を上げたい！』転職のプロに相談してみよう" />
        <CtaCard title="あなたに向いている仕事は何？質問に答えて適職探しのヒントを見つけよう" />
      </div>
    </section>
  );
}

