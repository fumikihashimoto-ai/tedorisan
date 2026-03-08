import Image from 'next/image';

const DEFAULT_CATCHPHRASE1 = '＼あなたの年収をアップする／';
const DEFAULT_CATCHPHRASE2 = '【転職サイト・スクール比較】';

interface HeroSectionProps {
  /** 1行目キャッチコピー（＼○○○／形式） */
  catchphrase1?: string;
  /** 2行目サブコピー（【○○○】形式） */
  catchphrase2?: string;
}

export function HeroSection({
  catchphrase1 = DEFAULT_CATCHPHRASE1,
  catchphrase2 = DEFAULT_CATCHPHRASE2,
}: HeroSectionProps = {}) {
  return (
    <section
      className="relative w-full max-w-[1200px] mx-auto flex flex-col min-h-[150px] md:min-h-[260px] overflow-hidden"
      style={{ backgroundColor: '#79ccf1' }}
    >
      {/* テキストエリア（中央） */}
      <div className="flex-1 flex flex-col items-center justify-center py-2 px-4 md:py-4">
        <p
          className="font-['Noto_Sans_JP'] font-black text-xl md:text-2xl lg:text-3xl text-center mb-2"
          style={{ color: '#fff' }}
        >
          {catchphrase1}
        </p>
        <p
          className="font-['Noto_Sans_JP'] font-black text-lg md:text-xl lg:text-2xl text-center"
          style={{ color: '#fff' }}
        >
          {catchphrase2}
        </p>
      </div>

      {/* イラスト画像（ヒーローエリアの下に配置） */}
      <div className="w-full flex justify-center items-end">
        <div className="relative w-full max-w-[650px] h-[100px] md:h-[180px] lg:h-[232px]">
          <Image
            src="/images/v2/hero_illustration.png"
            alt="転職・スキルアップで年収アップを目指す人々"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 650px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
