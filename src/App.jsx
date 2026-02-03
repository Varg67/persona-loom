import React, { useState, useEffect } from 'react';
import { CharacterProvider, useCharacter } from './context/CharacterContext';
import { TABS_CONFIG } from './data/initialState';
import Icons from './components/Icons';
import FileTab from './components/ui/FileTab';
import SubtabNav from './components/ui/SubtabNav';
import LockedContentScreen from './components/ui/LockedContentScreen';

// Feature Components
import IdentityTab from './features/Identity/IdentityTab';
import AppearanceTab from './features/Appearance/AppearanceTab';
import PsychologyTab from './features/Psychology/PsychologyTab';
import StoryTab from './features/Story/StoryTab';
import ExportTab from './features/Export/ExportTab';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('identity');
  const [activeSubtab, setActiveSubtab] = useState(0);
  const { characterData } = useCharacter();

  // Reset subtab when changing main tab
  useEffect(() => { setActiveSubtab(0); }, [activeTab]);

  // Derived state for locking
  const characterAge = parseInt(characterData.identity?.vitals?.age, 10) || 0;
  const isAdult = characterAge >= 18;
  const isTabLocked = (tabId) => tabId === 'intimacy' && !isAdult;
  const getLockReason = (tabId) => {
    if (tabId === 'intimacy' && !isAdult) {
      return characterAge === 0
        ? "Character age must be set to 18+ to access this section."
        : `This section is restricted to adult characters (18+). Current age: ${characterAge}.`;
    }
    return '';
  };

  const currentTabConfig = TABS_CONFIG.find(t => t.id === activeTab);

  const renderTabContent = () => {
    if (isTabLocked(activeTab)) {
      return <LockedContentScreen reason={getLockReason(activeTab)} tabName={currentTabConfig?.label || activeTab} />;
    }

    switch (activeTab) {
      case 'identity': return <IdentityTab subtab={activeSubtab} />;
      case 'appearance': return <AppearanceTab subtab={activeSubtab} />;
      case 'psychology': return <PsychologyTab subtab={activeSubtab} />;
      case 'history': return <StoryTab subtab={activeSubtab} />;
      case 'export': return <ExportTab subtab={activeSubtab} />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="font-serif text-xl text-gray-400 mb-2">{currentTabConfig?.label}</h3>
            <p className="font-mono text-xs text-gray-400">Component refactoring in progress...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' }}>
      <div className="relative flex shadow-2xl w-full max-w-[1200px] h-[85vh] min-h-[600px]">
        {/* Spine */}
        <div className="w-6 flex-shrink-0 relative rounded-l-md" style={{ background: 'linear-gradient(90deg, #3d3428, #5a4d3a, #4a4035)' }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full" style={{ top: `${15 + i * 14}%`, background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #1a1a1a)' }} />
          ))}
        </div>

        {/* Tabs sidebar */}
        <div className="w-[140px] flex-shrink-0 flex flex-col -mr-2 overflow-y-auto bg-[#e8e0d0] z-10 custom-scrollbar">
          <div className="flex flex-col gap-0.5 pr-2">
            {TABS_CONFIG.map((tab, idx) => (
              <FileTab
                key={tab.id}
                tab={{...tab, icon: Icons[tab.icon]}}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                index={idx}
                isLocked={isTabLocked(tab.id)}
                lockReason={getLockReason(tab.id)}
              />
            ))}
          </div>

          <div className="px-3 py-2 mt-2 mx-2 bg-white/50 border border-gray-300">
            <div className="font-mono text-[8px] text-gray-500 uppercase tracking-widest mb-1">Character Age</div>
            <div className={`font-mono text-lg font-bold ${isAdult ? 'text-emerald-700' : 'text-amber-600'}`}>
              {characterAge > 0 ? `${characterAge} yrs` : '—'}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 relative overflow-hidden rounded-r-md bg-[#f5f0e6]">
           {/* Content implementation */}
           <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

          <div className="relative z-10 p-6 md:p-10 h-full overflow-y-auto">
            {currentTabConfig && activeTab !== 'database' && activeTab !== 'export' && (
              <>
                <div className="mb-4">
                  <span className="inline-block text-white font-mono text-[9px] px-2 py-1 tracking-[0.15em]" style={{ background: currentTabConfig.color }}>
                    FILE {String(TABS_CONFIG.findIndex(t => t.id === activeTab) + 1).padStart(2, '0')} // {currentTabConfig.label}
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-black italic text-gray-900 mb-2">{currentTabConfig.label}</h1>
                <div className="h-1 bg-gray-900 mb-6 w-32" />
                <SubtabNav subtabs={currentTabConfig.subtabs} activeSubtab={activeSubtab} setActiveSubtab={setActiveSubtab} />
              </>
            )}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}
