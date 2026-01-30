'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type AnimatedSelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: AnimatedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** フォームフィールドの高さに合わせる（h-12 相当） */
  className?: string;
};

export default function AnimatedSelect({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  className = '',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const portalKey = useId();

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  const updatePosition = () => {
    if (wrapperRef.current && typeof document !== 'undefined') {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDownOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (wrapperRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDownOutside);
    document.addEventListener('touchstart', handlePointerDownOutside, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('touchstart', handlePointerDownOutside);
    };
  }, []);

  const handleToggle = () => {
    if (isAnimatingRef.current) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    isAnimatingRef.current = true;
    setIsOpen(false);
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 300);
  };

  const baseTriggerClass =
    'w-full px-4 h-12 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between cursor-pointer transition-colors duration-200 hover:border-gray-400';
  const triggerClass = `${baseTriggerClass} ${isOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''} ${className}`;

  const dropdownContent = isOpen && typeof document !== 'undefined' && (
    <div
      ref={(el) => {
        dropdownRef.current = el;
      }}
      className="animated-select-dropdown"
      style={{
        position: 'fixed',
        top: dropdownStyle.top,
        left: dropdownStyle.left,
        width: dropdownStyle.width,
        zIndex: 9999,
      }}
      role="listbox"
      aria-expanded={isOpen}
    >
      {options.map((option) => (
        <div
          key={option.value}
          role="option"
          aria-selected={value === option.value}
          className={`animated-select-option ${value === option.value ? 'selected' : ''}`}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={triggerClass}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="animated-select-dropdown"
        tabIndex={0}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={`inline-block transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-gray-500"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {typeof document !== 'undefined' &&
        isOpen &&
        createPortal(dropdownContent, document.body, portalKey)}
    </div>
  );
}
