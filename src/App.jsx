import React, { useState, useEffect } from 'react';
import { TABS_CONFIG } from './data/constants';
import { createInitialCharacterData } from './data/initialState';
import { FileTab } from './components/ui/FileTab';
import { SubtabNav } from './components/ui/SubtabNav';
import { LockedContentScreen } from './components/ui/LockedContentScreen';

import IdentityContent from './components/sections/IdentityContent';
import AppearanceContent from './components/sections/AppearanceContent';
import PsychologyContent from './components/sections/PsychologyContent';
import PhysiqueContent from './components/sections/PhysiqueContent';
import VoiceContent from './components/sections/VoiceContent';
import HistoryContent from './components/sections/HistoryContent';
import RelationshipsContent from './components/sections/RelationshipsContent';
import IntimacyContent from './components/sections/IntimacyContent';
import OccupationContent from './components/sections/OccupationContent';
import IntelligenceContent from './components/sections/IntelligenceContent';
import WorldviewContent from './components/sections/WorldviewContent';
import FavoritesContent from './components/sections/FavoritesContent';
import BehaviorContent from './components/sections/BehaviorContent';
import SecretsContent from './components/sections/SecretsContent';
import GoalsContent from './components/sections/GoalsContent';
import DirectiveResponsesContent from './components/sections/DirectivesContent';
import DatabaseContent from './components/sections/DatabaseContent';
import ExportContent from './components/sections/ExportContent';
import GenericTabContent from './components/sections/GenericTabContent';

export default function App() {
  const [activeTab, setActiveTab] = useState('identity');
  const [activeSubtab, setActiveSubtab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [characterData, setCharacterData] = useState(createInitialCharacterData);

  // Reset subtab when changing main tab
  useEffect(() => { setActiveSubtab(0); }, [activeTab]);

  // Derived state
  const characterAge = parseInt(characterData.identity?.vitals?.age, 10) || 0;
  const isAdult = characterAge >= 18;

  // Helper function to check if intimacy data exists
  const hasIntimacyData = (intimacy) => {
    if (!intimacy) return false;
    return Object.values(intimacy).some(section =>
      section && typeof section === 'object' && Object.values(section).some(val =>
        val !== '' && val !== 5 && val !== null && val !== undefined &&
        !(Array.isArray(val) && val.length === 0)
      )
    );
  };

  // Clear intimacy data when character becomes non-adult
  useEffect(() => {
    if (!isAdult && hasIntimacyData(characterData.intimacy)) {
      setCharacterData(prev => ({
        ...prev,
        intimacy: createInitialCharacterData().intimacy
      }));
    }
  }, [isAdult, characterData.intimacy]);

  const isTabLocked = (tabId) => tabId === 'intimacy' && !isAdult;

  const getLockReason = (tabId) => {
    if (tabId === 'intimacy' && !isAdult) {
      return characterAge === 0
        ? "Character age must be set to 18+ to access this section."
        : `This section is restricted to adult characters (18+). Current age: ${characterAge}.`;
    }
    return '';
  };

  const updateData = (section, data) => setCharacterData(prev => ({ ...prev, [section]: data }));

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(characterData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `persona_${characterData.identity?.core?.firstName || 'unnamed'}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentTabConfig = TABS_CONFIG.find(t => t.id === activeTab);

  const renderTabContent = () => {
    if (isTabLocked(activeTab)) {
      return <LockedContentScreen reason={getLockReason(activeTab)} tabName={currentTabConfig?.label || activeTab} />;
    }

    switch (activeTab) {
      case 'identity':
        return <IdentityContent data={characterData.identity} updateData={updateData} subtab={activeSubtab} />;
      case 'appearance':
        return <AppearanceContent data={characterData.appearance} updateData={updateData} subtab={activeSubtab} characterAge={characterData.identity?.vitals?.age} characterGender={characterData.identity?.vitals?.genderIdentity || characterData.identity?.vitals?.biologicalSex} />;
      case 'psychology':
        return <PsychologyContent data={characterData.psychology} updateData={updateData} subtab={activeSubtab} />;
      case 'physique':
        return <PhysiqueContent data={characterData.physique} updateData={updateData} subtab={activeSubtab} />;
      case 'voice':
        return <VoiceContent data={characterData.voice} updateData={updateData} subtab={activeSubtab} />;
      case 'history':
        return <HistoryContent data={characterData.history} updateData={updateData} subtab={activeSubtab} characterAge={characterData.identity?.vitals?.age} birthDate={characterData.history?.origin?.birthDate} />;
      case 'relationships':
        return <RelationshipsContent data={characterData.relationships} updateData={updateData} subtab={activeSubtab} />;
      case 'intimacy':
        return <IntimacyContent data={characterData.intimacy} updateData={updateData} subtab={activeSubtab} />;
      case 'occupation':
        return <OccupationContent data={characterData.occupation} education={characterData.education} updateData={updateData} subtab={activeSubtab} />;
      case 'intelligence':
        return <IntelligenceContent data={characterData.intelligence} updateData={updateData} subtab={activeSubtab} />;
      case 'worldview':
        return <WorldviewContent data={characterData.worldview} updateData={updateData} subtab={activeSubtab} />;
      case 'favorites':
        return <FavoritesContent data={characterData.favorites} updateData={updateData} subtab={activeSubtab} />;
      case 'behavior':
        return <BehaviorContent data={characterData.behavior} updateData={updateData} subtab={activeSubtab} />;
      case 'secrets':
        return <SecretsContent data={characterData.secrets} updateData={updateData} subtab={activeSubtab} />;
      case 'goals':
        return <GoalsContent data={characterData.goals} updateData={updateData} subtab={activeSubtab} />;
      case 'directives':
        return <DirectiveResponsesContent data={characterData.directives} updateData={updateData} subtab={activeSubtab} />;
      case 'database':
        return <DatabaseContent characterData={characterData} onCopy={handleCopy} onDownload={handleDownload} copied={copied} subtab={activeSubtab} />;
      case 'export':
        return <ExportContent characterData={characterData} onCopy={handleCopy} onDownload={handleDownload} updateData={updateData} subtab={activeSubtab} />;
      default:
        return <GenericTabContent tabId={activeTab} data={characterData[activeTab]} updateData={updateData} subtab={activeSubtab} subtabs={currentTabConfig?.subtabs || []} />;
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
        <div className="w-[140px] flex-shrink-0 flex flex-col -mr-2 overflow-y-auto" style={{ background: '#e8e0d0', zIndex: 10 }}>
          <div className="flex flex-col gap-0.5 pr-2">
            {TABS_CONFIG.map((tab, idx) => (
              <FileTab
                key={tab.id}
                tab={tab}
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
            <div className={`font-mono text-[8px] uppercase ${isAdult ? 'text-emerald-600' : 'text-amber-500'}`}>
              {characterAge > 0 ? (isAdult ? '✓ Adult' : '✗ Minor') : 'Not set'}
            </div>
          </div>

          <div className="mt-auto p-3">
            <div className="font-mono text-[7px] text-gray-500 uppercase tracking-widest opacity-50" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              PERSONA LOOM v7
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 relative overflow-hidden rounded-r-md" style={{ background: '#f5f0e6' }}>
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

          <div className="absolute top-6 right-6 w-16 h-16 flex items-center justify-center pointer-events-none opacity-30" style={{ border: '3px solid rgba(139, 0, 0, 0.4)', borderRadius: '50%', transform: 'rotate(-15deg)' }}>
            <span className="font-mono text-[7px] font-bold text-center leading-tight" style={{ color: 'rgba(139, 0, 0, 0.5)' }}>CLASSIFIED<br/>DOCUMENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
