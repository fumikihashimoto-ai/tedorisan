import Image from 'next/image';
import Link from 'next/link';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';
import { MobileMenu } from './MobileMenu';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center">
        <div />
        {/* ロゴ（中央） */}
        <Link href="/" className="flex items-center justify-center">
          <div className="relative w-44 h-11">
            <Image
              src={IMAGE_PATHS.headLogo}
              alt="手取りのミカタ"
              fill
              className="object-contain"
              priority
              sizes="176px"
            />
          </div>
        </Link>
        {/* モバイルメニュー */}
        <div className="flex justify-end">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
