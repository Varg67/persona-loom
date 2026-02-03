import React from 'react';

const ArchiveInput = ({ label, value = '', onChange, type = 'text', placeholder = '', multiline = false }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">{label}</label>
    {multiline ? (
      <textarea
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-gray-300 py-2 font-mono text-sm text-gray-800 placeholder-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none min-h-[80px]"
      />
    ) : (
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-gray-300 py-1 font-mono text-sm text-gray-800 placeholder-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
      />
    )}
  </div>
);

export default ArchiveInput;
