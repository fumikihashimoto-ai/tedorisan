'use client';

interface NumberInputWithSuffixProps {
  /** 現在の値 */
  value: string;
  /** 値変更時のコールバック */
  onChange: (value: string) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** 右側に表示する単位（例: 万円、歳、年） */
  suffix: string;
  /** 追加のクラス名（input要素用） */
  inputClassName?: string;
  /** 追加のクラス名（コンテナ用） */
  className?: string;
}

export default function NumberInputWithSuffix({
  value,
  onChange,
  placeholder = '',
  suffix,
  inputClassName = '',
  className = '',
}: NumberInputWithSuffixProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full h-12 pl-4 pr-12 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-['Noto_Sans_JP'] text-[12px] text-[var(--color-v2-text)] placeholder-unified placeholder:text-left ${inputClassName}`}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-['Noto_Sans_JP'] font-bold text-[14px] text-[#AAAAAA] text-right">
        {suffix}
      </span>
    </div>
  );
}
