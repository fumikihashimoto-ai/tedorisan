'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export type CustomSelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: readonly CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = '選択してください',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 外側クリックで閉じる
  useEffect(() => {
    const handlePointerDownOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (wrapperRef.current && target && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDownOutside);
    document.addEventListener('touchstart', handlePointerDownOutside, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('touchstart', handlePointerDownOutside);
    };
  }, []);

  const selectedOption = useMemo(() => options.find((opt) => opt.value === value), [options, value]);

  return (
    <div
      ref={wrapperRef}
      className={`custom-select-wrapper ${isOpen ? 'opened' : ''}`}
    >
      <div className="custom-select-trigger" onClick={() => setIsOpen((v) => !v)}>
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      <div className="custom-options">
        {options.map((option) => (
          <div
            key={option.value}
            className={`custom-option ${value === option.value ? 'selected' : ''}`}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

