import { Card, PrimaryLinkButton } from './ui';
import ImagePlaceholder from './ImagePlaceholder';

type Props = {
  href?: string;
};

export default function SalaryAssessmentCta({ href = '/job-change' }: Props) {
  return (
    <Card as="div" className="section-gap">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* イラスト（プレースホルダー） */}
        <div className="flex justify-center md:justify-start">
          <ImagePlaceholder />
        </div>

        {/* ベネフィット + ボタン */}
        <div className="flex-1">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-[#64748B]">3分で完了</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-[#64748B]">完全無料</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-[#64748B]">あなたの市場価値がわかる</span>
            </div>
          </div>

          <div className="mt-4 md:mt-5">
            <PrimaryLinkButton href={href} className="w-full md:w-auto justify-center">
              年収査定を受ける
            </PrimaryLinkButton>
          </div>
        </div>
      </div>
    </Card>
  );
}

