import React from 'react';

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-4 mt-8 mb-6">
    <div className="h-px flex-1 bg-gray-300" />
    <h3 className="font-serif text-sm font-bold italic text-gray-500 uppercase tracking-widest px-3 py-1 border border-gray-300 bg-gray-50/50">
      {title}
    </h3>
    <div className="h-px flex-1 bg-gray-300" />
  </div>
);

export default SectionHeader;
