import Image from 'next/image';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';

export default function Footer() {
  return (
    <footer className="bg-[#fff] text-white pt-[10px] pb-0">
      {/* ロゴ（100%幅・青エリアの上） */}
      <div className="w-full flex justify-center mb-2 bg-[#fff] py-2">
        <div className="relative w-40 h-10">
          <Image
            src={IMAGE_PATHS.headLogo}
            alt="手取りのミカタ"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 bg-[#1390C8]" />

      {/* コピーライト（横幅100%） */}
      <div className="w-full bg-[#1B3C65] px-4 py-4 text-center">
        <p className="text-[10px] text-[#fff]">
          運営者情報｜プライバシーポリシー
          <br />
          © 2026 手取りのミカタ All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
