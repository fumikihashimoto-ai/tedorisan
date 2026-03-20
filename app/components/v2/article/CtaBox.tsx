import Link from 'next/link';

/** アフィリエイトドメイン判定用 */
const AFFILIATE_DOMAINS = ['a8.net', 'accesstrade.net', 'afb.info', 'valuecommerce.com', 'rentrax.jp'];

function isAffiliateLink(url: string): boolean {
  return AFFILIATE_DOMAINS.some((domain) => url.includes(domain));
}

interface CtaBoxProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant: 'orange' | 'red' | 'coral';
}

export default function CtaBox({
  title,
  description,
  buttonText,
  buttonLink,
}: CtaBoxProps) {
  const isInternal = buttonLink.startsWith('/');
  const isPlaceholder = buttonLink.startsWith('【');
  const needsSponsoredRel = !isInternal && isAffiliateLink(buttonLink);

  return (
    <div className="border-[3px] border-[#BF0000] rounded-none bg-white px-5 py-5 my-6">
      {title && (
        <p className="font-['Noto_Sans_JP'] text-[16px] font-bold text-[#BF0000] mb-2">
          {title}
        </p>
      )}
      {description && (
        <p className="font-['Noto_Sans_JP'] text-[14px] text-[#333333] leading-[1.6] mb-3">
          {description}
        </p>
      )}
      {isPlaceholder ? (
        <span className="inline-block bg-[#BF0000] text-white text-[14px] font-bold px-8 py-3 rounded opacity-50 cursor-not-allowed">
          {buttonText}
        </span>
      ) : isInternal ? (
        <Link
          href={buttonLink}
          className="inline-block bg-[#BF0000] text-white text-[14px] font-bold px-8 py-3 rounded hover:opacity-85 transition-opacity no-underline"
        >
          {buttonText}
        </Link>
      ) : (
        <a
          href={buttonLink}
          target="_blank"
          rel={needsSponsoredRel ? 'nofollow sponsored noopener noreferrer' : 'noopener noreferrer'}
          className="inline-block bg-[#BF0000] text-white text-[14px] font-bold px-8 py-3 rounded hover:opacity-85 transition-opacity no-underline"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}
