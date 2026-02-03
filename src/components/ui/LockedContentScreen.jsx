import React from 'react';
import Icons from '../Icons';

const LockedContentScreen = ({ reason, tabName }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeIn">
    {/* Lock Icon Container */}
    <div className="relative mb-8">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
        <Icons.Lock width={40} height={40} className="text-gray-400" />
      </div>
      {/* Red indicator */}
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
        <span className="text-white text-xs font-bold">!</span>
      </div>
    </div>

    {/* Title */}
    <h2 className="font-serif text-2xl font-bold text-gray-700 mb-2">
      Access Restricted
    </h2>
    <p className="font-mono text-sm text-gray-500 mb-6">
      {tabName} Section
    </p>

    {/* Reason Box */}
    <div className="max-w-md bg-amber-50 border-2 border-amber-200 rounded-sm p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icons.Lock width={14} height={14} className="text-amber-700" />
        </div>
        <div className="text-left">
          <h3 className="font-mono text-xs font-bold uppercase text-amber-800 mb-2">
            Age Verification Required
          </h3>
          <p className="font-mono text-xs text-amber-700 leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    </div>

    {/* Help Text */}
    <p className="font-mono text-[10px] text-gray-400 mt-6 max-w-sm">
      This restriction ensures appropriate content handling based on character age.
      Navigate to <span className="font-bold">Identity → Vital Statistics</span> to update the character's age.
    </p>

    {/* Decorative stamp */}
    <div className="mt-8 opacity-20">
      <div className="border-4 border-red-800 rounded px-6 py-3 transform -rotate-6">
        <span className="font-mono text-red-800 text-lg font-black tracking-widest">RESTRICTED</span>
      </div>
    </div>
  </div>
);

export default LockedContentScreen;
