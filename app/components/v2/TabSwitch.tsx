'use client';

import type { TabType } from '@/lib/topPageTypes';

interface TabSwitchProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabSwitch({ activeTab, onTabChange }: TabSwitchProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex gap-0">
        <button
          onClick={() => onTabChange('transfer')}
          className={`flex-1 min-h-[44px] md:min-h-[48px] flex items-center justify-center py-2 text-center font-extrabold text-sm md:text-base transition rounded-tl rounded-bl ${
            activeTab === 'transfer'
              ? 'bg-[#1390c8] text-white'
              : 'bg-[#aaa] text-white'
          }`}
          type="button"
        >
          転職
        </button>
        <button
          onClick={() => onTabChange('skillup')}
          className={`flex-1 min-h-[44px] md:min-h-[48px] flex items-center justify-center py-2 text-center font-extrabold text-sm md:text-base transition rounded-tr rounded-br ${
            activeTab === 'skillup'
              ? 'bg-[#1390c8] text-white'
              : 'bg-[#aaa] text-white'
          }`}
          type="button"
        >
          スキルアップ
        </button>
      </div>
    </div>
  );
}
