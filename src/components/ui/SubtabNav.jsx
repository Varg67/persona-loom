import React from 'react';

const SubtabNav = ({ subtabs, activeSubtab, setActiveSubtab }) => {
  if (!subtabs || subtabs.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-200">
      {subtabs.map((subtab, idx) => (
        <button
          key={subtab}
          onClick={() => setActiveSubtab(idx)}
          className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all
            ${activeSubtab === idx
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}
        >
          {subtab}
        </button>
      ))}
    </div>
  );
};

export default SubtabNav;
