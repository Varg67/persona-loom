import React, { useState } from 'react';
import { Icons } from './Icons';

export const FileTab = ({ tab, isActive, onClick, index, isLocked = false, lockReason = '' }) => {
  const TabIcon = tab.icon;
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (isLocked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      onClick();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="group relative transition-all duration-300 ease-out"
        style={{ marginTop: index === 0 ? '24px' : '0', zIndex: isActive ? 50 : 40 - index }}
      >
        <div
          className={`relative flex items-center gap-2 px-3 py-1.5 min-w-[130px] transition-all duration-300 ease-out
            ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${isActive && !isLocked ? 'translate-x-2 shadow-lg' : 'hover:translate-x-1 hover:shadow-md'}`}
          style={{
            background: isLocked
              ? 'linear-gradient(135deg, #555 0%, #444 100%)'
              : isActive
                ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                : `linear-gradient(135deg, ${tab.color}99 0%, ${tab.color}77 100%)`,
            borderRadius: '0 5px 5px 0',
            boxShadow: isActive && !isLocked
              ? `4px 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`
              : `2px 1px 4px rgba(0,0,0,0.2)`,
          }}
        >
          <TabIcon width={12} height={12} className={isActive && !isLocked ? 'text-white' : 'text-white/70'} />
          <span className={`font-mono text-[9px] font-bold tracking-[0.1em] uppercase ${isActive && !isLocked ? 'text-white' : 'text-white/80'}`}>
            {tab.label}
          </span>
          {(tab.locked || isLocked) && <Icons.Lock width={8} height={8} className="text-white/50 ml-auto" />}
          {isActive && !isLocked && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />}
        </div>
        {isActive && !isLocked && (
          <div className="absolute top-0 bottom-0 -right-1 w-2 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #f5f0e6)' }} />
        )}
      </button>

      {/* Lock Tooltip */}
      {showTooltip && isLocked && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[100] animate-fadeIn">
          <div className="bg-gray-900 text-white px-3 py-2 rounded shadow-lg max-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <Icons.Lock width={12} height={12} className="text-red-400" />
              <span className="font-mono text-[10px] font-bold uppercase text-red-400">Restricted</span>
            </div>
            <p className="font-mono text-[9px] text-gray-300 leading-relaxed">
              {lockReason}
            </p>
            {/* Arrow */}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};
