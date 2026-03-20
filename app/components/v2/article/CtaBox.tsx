import Link from 'next/link';

interface CtaBoxProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant: 'orange' | 'red' | 'coral';
}

const variantStyles = {
  orange: {
    wrapper: 'bg-[#FFF5E6] border-l-4 border-l-[#E8800A] rounded-r-lg',
    title: 'text-[#A35A00]',
    desc: 'text-[#6B3D00]',
    button: 'bg-[#E8800A]',
  },
  red: {
    wrapper: 'bg-[#FDEEEE] border-l-4 border-l-[#D14040] rounded-r-lg',
    title: 'text-[#A32D2D]',
    desc: 'text-[#6B1E1E]',
    button: 'bg-[#D14040]',
  },
  coral: {
    wrapper: 'bg-[#FFF5E6] rounded-lg text-center',
    title: 'text-[#7A4A0A]',
    desc: 'text-[#7A4A0A]',
    button: 'bg-[#D85A30]',
  },
} as const;

export default function CtaBox({
  title,
  description,
  buttonText,
  buttonLink,
  variant,
}: CtaBoxProps) {
  const styles = variantStyles[variant];
  const isInternal = buttonLink.startsWith('/');
  const isPlaceholder = buttonLink.startsWith('【');

  return (
    <div className={`${styles.wrapper} px-5 py-4 my-6`}>
      {title && (
        <p className={`${styles.title} font-bold mb-2`}>
          {title}
        </p>
      )}
      {description && (
        <p className={`${styles.desc} text-sm leading-relaxed mb-3`}>
          {description}
        </p>
      )}
      {isPlaceholder ? (
        <span className={`${styles.button} inline-block text-white px-6 py-2.5 rounded-md text-sm font-bold opacity-50 cursor-not-allowed`}>
          {buttonText}
        </span>
      ) : isInternal ? (
        <Link
          href={buttonLink}
          className={`${styles.button} inline-block text-white px-6 py-2.5 rounded-md text-sm font-bold no-underline hover:opacity-85 transition-opacity`}
        >
          {buttonText}
        </Link>
      ) : (
        <a
          href={buttonLink}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className={`${styles.button} inline-block text-white px-6 py-2.5 rounded-md text-sm font-bold no-underline hover:opacity-85 transition-opacity`}
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}
