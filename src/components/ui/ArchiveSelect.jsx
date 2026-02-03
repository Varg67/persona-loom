import React from 'react';

export const ArchiveSelect = ({ label, value = '', onChange, options = [] }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
    >
      <option value="">-- Select --</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);
