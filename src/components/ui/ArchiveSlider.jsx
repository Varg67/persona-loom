import React from 'react';

const ArchiveSlider = ({ label, value = 5, onChange, min = 1, max = 10, leftLabel = '', rightLabel = '' }) => {
  const safeValue = value ?? min;
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between items-center">
        <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">{label}</label>
        <span className="font-mono text-xs font-bold text-gray-800">{safeValue}/{max}</span>
      </div>
      <div className="flex items-center gap-2">
        {leftLabel && <span className="font-mono text-[8px] text-gray-400 w-16 text-right">{leftLabel}</span>}
        <input
          type="range"
          min={min}
          max={max}
          value={safeValue}
          onChange={onChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
        />
        {rightLabel && <span className="font-mono text-[8px] text-gray-400 w-16">{rightLabel}</span>}
      </div>
    </div>
  );
};

export default ArchiveSlider;
