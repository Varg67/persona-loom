import React, { useState, useEffect } from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';
import { Icons } from '../ui/Icons';

const DatabaseContent = ({ characterData, onCopy, onDownload, copied, subtab = 0 }) => {
  const [viewMode, setViewMode] = useState('visual');
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const expandAll = () => {
    const allSections = ['identity', 'appearance', 'psychology', 'physique', 'voice', 'history', 'relationships', 'intimacy', 'occupation', 'intelligence', 'worldview', 'favorites', 'behavior', 'secrets', 'goals', 'directives'];
    const expanded = {};
    allSections.forEach(s => expanded[s] = true);
    setExpandedSections(expanded);
  };

  const collapseAll = () => setExpandedSections({});

  // Count fields per section
  const countSectionFields = (obj) => {
    let filled = 0, total = 0;
    const count = (o) => {
      if (!o) return;
      Object.values(o).forEach(v => {
        if (typeof v === 'object' && v !== null && !Array.isArray(v)) count(v);
        else {
          total++;
          if (Array.isArray(v)) { if (v.length > 0) filled++; }
          else if (v !== '' && v !== null && v !== undefined && v !== 5) filled++;
        }
      });
    };
    count(obj);
    return { filled, total, percent: total > 0 ? Math.round((filled / total) * 100) : 0 };
  };

  // Get filled fields from object
  const getFilledFields = (obj, prefix = '') => {
    const fields = [];
    if (!obj) return fields;

    Object.entries(obj).forEach(([key, value]) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        fields.push(...getFilledFields(value, fieldName));
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          fields.push({ key: fieldName, value: value.join(', '), isArray: true, count: value.length });
        }
      } else if (value !== '' && value !== null && value !== undefined && value !== 5) {
        fields.push({ key: fieldName, value: String(value) });
      }
    });
    return fields;
  };

  // Get ALL fields (including empty)
  const getAllFields = (obj, prefix = '') => {
    const fields = [];
    if (!obj) return fields;

    Object.entries(obj).forEach(([key, value]) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        fields.push(...getAllFields(value, fieldName));
      } else {
        const isFilled = Array.isArray(value) ? value.length > 0 : (value !== '' && value !== null && value !== undefined && value !== 5);
        fields.push({
          key: fieldName,
          value: Array.isArray(value) ? value.join(', ') : String(value || ''),
          isFilled,
          isArray: Array.isArray(value)
        });
      }
    });
    return fields;
  };

  // Format field name for display
  const formatFieldName = (key) => {
    return key
      .split('.')
      .pop()
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  // Total stats
  const totalStats = countSectionFields(characterData);

  // Section configurations
  const sections = [
    { id: 'identity', label: 'Identity', icon: '🪪', color: 'blue', data: characterData.identity },
    { id: 'appearance', label: 'Appearance', icon: '👤', color: 'pink', data: characterData.appearance },
    { id: 'psychology', label: 'Psychology', icon: '🧠', color: 'purple', data: characterData.psychology },
    { id: 'physique', label: 'Physique', icon: '💪', color: 'amber', data: characterData.physique },
    { id: 'voice', label: 'Voice', icon: '🎤', color: 'orange', data: characterData.voice },
    { id: 'history', label: 'History', icon: '📖', color: 'teal', data: characterData.history },
    { id: 'relationships', label: 'Relationships', icon: '👥', color: 'red', data: characterData.relationships },
    { id: 'intimacy', label: 'Intimacy', icon: '💜', color: 'fuchsia', data: characterData.intimacy },
    { id: 'occupation', label: 'Occupation', icon: '💼', color: 'green', data: characterData.occupation },
    { id: 'intelligence', label: 'Intelligence', icon: '📚', color: 'indigo', data: characterData.intelligence },
    { id: 'worldview', label: 'Worldview', icon: '🌍', color: 'cyan', data: characterData.worldview },
    { id: 'favorites', label: 'Favorites', icon: '⭐', color: 'yellow', data: characterData.favorites },
    { id: 'behavior', label: 'Behavior', icon: '🎭', color: 'rose', data: characterData.behavior },
    { id: 'secrets', label: 'Secrets', icon: '🔒', color: 'slate', data: characterData.secrets },
    { id: 'goals', label: 'Goals', icon: '🎯', color: 'emerald', data: characterData.goals },
    { id: 'directives', label: 'Directives', icon: '⚙️', color: 'violet', data: characterData.directives },
  ];

  // Validation rules
  const validationRules = [
    { id: 'name', label: 'Character has a name', check: () => !!characterData.identity?.core?.firstName, category: 'Required' },
    { id: 'age', label: 'Age is defined', check: () => !!characterData.identity?.vitals?.age, category: 'Required' },
    { id: 'gender', label: 'Gender identity set', check: () => !!characterData.identity?.vitals?.genderIdentity, category: 'Required' },
    { id: 'appearance_basic', label: 'Basic appearance defined', check: () => !!characterData.appearance?.face?.faceShape || !!characterData.appearance?.hair?.color, category: 'Recommended' },
    { id: 'personality', label: 'Personality traits set', check: () => (characterData.psychology?.core?.personalityTraits?.length || 0) > 0, category: 'Recommended' },
    { id: 'backstory', label: 'Has backstory/history', check: () => !!characterData.history?.childhood?.childhoodSummary || !!characterData.history?.formative?.formativeEvent, category: 'Recommended' },
    { id: 'voice_basic', label: 'Voice characteristics set', check: () => !!characterData.voice?.design?.voiceGender || characterData.voice?.design?.pitch !== 5, category: 'For TTS' },
    { id: 'voice_accent', label: 'Accent defined', check: () => !!characterData.voice?.languages?.accent, category: 'For TTS' },
    { id: 'directives_set', label: 'Directives configured', check: () => !!characterData.directives?.formatting?.responseLength, category: 'For RP' },
    { id: 'goals_defined', label: 'Character goals set', check: () => !!characterData.goals?.primary?.mainGoal, category: 'For Story' },
    { id: 'relationships', label: 'Relationships defined', check: () => (characterData.relationships?.npcs?.length || 0) > 0, category: 'For Story' },
    { id: 'occupation', label: 'Occupation defined', check: () => (characterData.occupation?.jobs?.length || 0) > 0, category: 'Optional' },
  ];

  // Quick summary card
  const QuickSummary = () => {
    const identity = characterData.identity || {};
    const core = identity.core || {};
    const vitals = identity.vitals || {};
    const psychology = characterData.psychology || {};

    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 text-white mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
            {core.firstName ? core.firstName.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">
              {core.firstName || 'Unnamed'} {core.middleName || ''} {core.lastName || ''}
            </h2>
            {core.nickname && <p className="text-slate-400 text-sm mb-2">"{core.nickname}"</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {vitals.age && (
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">{vitals.age} years old</span>
              )}
              {vitals.genderIdentity && (
                <span className="px-2 py-1 bg-pink-500/20 rounded text-xs">{vitals.genderIdentity}</span>
              )}
              {vitals.nationality && (
                <span className="px-2 py-1 bg-green-500/20 rounded text-xs">{vitals.nationality}</span>
              )}
              {psychology.core?.mbtiType && (
                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">{psychology.core.mbtiType}</span>
              )}
              {characterData.occupation?.jobs?.[0]?.title && (
                <span className="px-2 py-1 bg-amber-500/20 rounded text-xs">{characterData.occupation.jobs[0].title}</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{totalStats.percent}%</div>
            <div className="text-xs text-slate-400">Complete</div>
            <div className="text-xs text-slate-500">{totalStats.filled}/{totalStats.total} fields</div>
          </div>
        </div>
      </div>
    );
  };

  // Section Card Component
  const SectionCard = ({ section }) => {
    const stats = countSectionFields(section.data);
    const fields = getFilledFields(section.data);
    const isExpanded = expandedSections[section.id];

    // Filter fields by search term
    const filteredFields = searchTerm
      ? fields.filter(f => f.key.toLowerCase().includes(searchTerm.toLowerCase()) || f.value.toLowerCase().includes(searchTerm.toLowerCase()))
      : fields;

    const colorClasses = {
      blue: 'border-blue-300 bg-blue-50',
      pink: 'border-pink-300 bg-pink-50',
      purple: 'border-purple-300 bg-purple-50',
      amber: 'border-amber-300 bg-amber-50',
      orange: 'border-orange-300 bg-orange-50',
      teal: 'border-teal-300 bg-teal-50',
      red: 'border-red-300 bg-red-50',
      fuchsia: 'border-fuchsia-300 bg-fuchsia-50',
      green: 'border-green-300 bg-green-50',
      indigo: 'border-indigo-300 bg-indigo-50',
      cyan: 'border-cyan-300 bg-cyan-50',
      yellow: 'border-yellow-300 bg-yellow-50',
      rose: 'border-rose-300 bg-rose-50',
      slate: 'border-slate-300 bg-slate-50',
      emerald: 'border-emerald-300 bg-emerald-50',
      violet: 'border-violet-300 bg-violet-50',
    };

    const headerColors = {
      blue: 'bg-blue-600',
      pink: 'bg-pink-600',
      purple: 'bg-purple-600',
      amber: 'bg-amber-600',
      orange: 'bg-orange-600',
      teal: 'bg-teal-600',
      red: 'bg-red-600',
      fuchsia: 'bg-fuchsia-600',
      green: 'bg-green-600',
      indigo: 'bg-indigo-600',
      cyan: 'bg-cyan-600',
      yellow: 'bg-yellow-600',
      rose: 'bg-rose-600',
      slate: 'bg-slate-600',
      emerald: 'bg-emerald-600',
      violet: 'bg-violet-600',
    };

    if (stats.filled === 0 && !searchTerm) return null;
    if (searchTerm && filteredFields.length === 0) return null;

    return (
      <div className={`border-2 rounded-lg overflow-hidden ${colorClasses[section.color] || 'border-gray-300 bg-gray-50'}`}>
        <button
          onClick={() => toggleSection(section.id)}
          className={`w-full flex items-center justify-between p-3 ${headerColors[section.color] || 'bg-gray-600'} text-white`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{section.icon}</span>
            <span className="font-mono text-sm font-bold">{section.label}</span>
            <span className="font-mono text-xs opacity-75">({filteredFields.length} fields)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${stats.percent}%` }} />
            </div>
            <span className="font-mono text-xs">{stats.percent}%</span>
            <span className="text-lg">{isExpanded ? '▼' : '▶'}</span>
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 space-y-2">
            {filteredFields.map((field, idx) => (
              <div key={idx} className="flex justify-between items-start py-1 border-b border-white/50 last:border-0">
                <span className="font-mono text-xs text-gray-600">{formatFieldName(field.key)}</span>
                <span className="font-mono text-xs text-gray-900 text-right max-w-[60%]">
                  {field.isArray && <span className="text-blue-600">[{field.count}] </span>}
                  {field.value.length > 100 ? field.value.substring(0, 100) + '...' : field.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ========== SUBTAB CONTENT ==========
  const subtabContent = {
    // SUBTAB 0: Overview
    0: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-sm p-4 text-white">
          <h3 className="font-mono text-sm font-bold mb-2">📊 DATABASE OVERVIEW</h3>
          <p className="font-mono text-xs text-blue-200">Complete view of your character's data structure.</p>
        </div>

        <QuickSummary />

        {/* Section completion grid */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">📁 Section Completion</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map(section => {
              const stats = countSectionFields(section.data);
              return (
                <div key={section.id} className="p-3 rounded border border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-mono text-xs font-bold text-gray-700">{section.label}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full ${stats.percent >= 75 ? 'bg-green-500' : stats.percent >= 50 ? 'bg-yellow-500' : stats.percent >= 25 ? 'bg-orange-500' : 'bg-red-500'}`}
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-gray-500">{stats.filled}/{stats.total} ({stats.percent}%)</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded bg-blue-50 border border-blue-200 text-center">
            <div className="font-mono text-3xl font-bold text-blue-700">{totalStats.filled}</div>
            <div className="font-mono text-xs text-gray-600">Fields Filled</div>
          </div>
          <div className="p-4 rounded bg-gray-50 border border-gray-200 text-center">
            <div className="font-mono text-3xl font-bold text-gray-700">{totalStats.total}</div>
            <div className="font-mono text-xs text-gray-600">Total Fields</div>
          </div>
          <div className="p-4 rounded bg-green-50 border border-green-200 text-center">
            <div className="font-mono text-3xl font-bold text-green-700">{totalStats.percent}%</div>
            <div className="font-mono text-xs text-gray-600">Complete</div>
          </div>
          <div className="p-4 rounded bg-purple-50 border border-purple-200 text-center">
            <div className="font-mono text-3xl font-bold text-purple-700">{sections.filter(s => countSectionFields(s.data).percent > 0).length}</div>
            <div className="font-mono text-xs text-gray-600">Sections Used</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <button onClick={onCopy} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-mono text-xs uppercase hover:bg-gray-700 rounded-sm">
            <Icons.Copy width={16} height={16} />
            Copy JSON
          </button>
          <button onClick={onDownload} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-900 font-mono text-xs uppercase hover:bg-gray-100 rounded-sm">
            <Icons.Download width={16} height={16} />
            Download
          </button>
        </div>
      </div>
    ),

    // SUBTAB 1: Browse Data
    1: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-teal-900 to-cyan-900 rounded-sm p-4 text-white">
          <h3 className="font-mono text-sm font-bold mb-2">🔍 BROWSE DATA</h3>
          <p className="font-mono text-xs text-teal-200">Search and explore all character data.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fields or values..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-sm font-mono text-xs focus:border-blue-500 focus:outline-none"
            />
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-sm font-mono text-xs"
          >
            <option value="all">All Sections</option>
            {sections.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* View controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button onClick={expandAll} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-sm font-mono text-xs">
              Expand All
            </button>
            <button onClick={collapseAll} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-sm font-mono text-xs">
              Collapse All
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1 rounded-sm font-mono text-xs ${viewMode === 'visual' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Visual
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-3 py-1 rounded-sm font-mono text-xs ${viewMode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              JSON
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'visual' ? (
          <div className="space-y-3">
            {(selectedSection === 'all' ? sections : sections.filter(s => s.id === selectedSection)).map(section => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-sm p-4 max-h-[600px] overflow-auto">
            <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap">
              {JSON.stringify(
                selectedSection === 'all' ? characterData : characterData[selectedSection],
                null, 2
              )}
            </pre>
          </div>
        )}
      </div>
    ),

    // SUBTAB 2: Statistics
    2: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-sm p-4 text-white">
          <h3 className="font-mono text-sm font-bold mb-2">📈 STATISTICS</h3>
          <p className="font-mono text-xs text-purple-200">Detailed analytics about your character data.</p>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-center">
            <div className="font-mono text-4xl font-bold">{totalStats.percent}%</div>
            <div className="font-mono text-xs opacity-75">Overall Completion</div>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white text-center">
            <div className="font-mono text-4xl font-bold">{totalStats.filled}</div>
            <div className="font-mono text-xs opacity-75">Fields Filled</div>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white text-center">
            <div className="font-mono text-4xl font-bold">{totalStats.total - totalStats.filled}</div>
            <div className="font-mono text-xs opacity-75">Fields Empty</div>
          </div>
        </div>

        {/* Completion by section chart */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">📊 Completion by Section</h4>
          <div className="space-y-3">
            {sections.map(section => {
              const stats = countSectionFields(section.data);
              return (
                <div key={section.id} className="flex items-center gap-3">
                  <span className="text-lg w-8">{section.icon}</span>
                  <span className="font-mono text-xs w-24 text-gray-700">{section.label}</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        stats.percent >= 75 ? 'bg-green-500' :
                        stats.percent >= 50 ? 'bg-yellow-500' :
                        stats.percent >= 25 ? 'bg-orange-500' :
                        stats.percent > 0 ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs w-12 text-right text-gray-600">{stats.percent}%</span>
                  <span className="font-mono text-[10px] w-16 text-right text-gray-400">{stats.filled}/{stats.total}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top filled sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-sm p-4">
            <h4 className="font-mono text-xs font-bold text-green-800 mb-3">✅ Most Complete</h4>
            {sections
              .map(s => ({ ...s, stats: countSectionFields(s.data) }))
              .filter(s => s.stats.filled > 0)
              .sort((a, b) => b.stats.percent - a.stats.percent)
              .slice(0, 5)
              .map((s, i) => (
                <div key={s.id} className="flex items-center justify-between py-1">
                  <span className="font-mono text-xs text-gray-700">{i+1}. {s.icon} {s.label}</span>
                  <span className="font-mono text-xs font-bold text-green-700">{s.stats.percent}%</span>
                </div>
              ))
            }
          </div>
          <div className="bg-red-50 border border-red-200 rounded-sm p-4">
            <h4 className="font-mono text-xs font-bold text-red-800 mb-3">⚠️ Needs Attention</h4>
            {sections
              .map(s => ({ ...s, stats: countSectionFields(s.data) }))
              .filter(s => s.stats.percent < 50 && s.stats.total > 0)
              .sort((a, b) => a.stats.percent - b.stats.percent)
              .slice(0, 5)
              .map((s, i) => (
                <div key={s.id} className="flex items-center justify-between py-1">
                  <span className="font-mono text-xs text-gray-700">{s.icon} {s.label}</span>
                  <span className="font-mono text-xs font-bold text-red-700">{s.stats.percent}%</span>
                </div>
              ))
            }
          </div>
        </div>

        {/* Data size */}
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-2">💾 Data Size</h4>
          <div className="font-mono text-xs text-gray-600">
            JSON size: <strong>{(JSON.stringify(characterData).length / 1024).toFixed(2)} KB</strong>
          </div>
        </div>
      </div>
    ),

    // SUBTAB 3: Validation
    3: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-sm p-4 text-white">
          <h3 className="font-mono text-sm font-bold mb-2">✅ VALIDATION</h3>
          <p className="font-mono text-xs text-amber-200">Check if your character is ready for use.</p>
        </div>

        {/* Validation summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded bg-green-50 border border-green-200 text-center">
            <div className="font-mono text-3xl font-bold text-green-700">
              {validationRules.filter(r => r.check()).length}
            </div>
            <div className="font-mono text-xs text-gray-600">Passed</div>
          </div>
          <div className="p-4 rounded bg-red-50 border border-red-200 text-center">
            <div className="font-mono text-3xl font-bold text-red-700">
              {validationRules.filter(r => !r.check()).length}
            </div>
            <div className="font-mono text-xs text-gray-600">Failed</div>
          </div>
          <div className="p-4 rounded bg-blue-50 border border-blue-200 text-center">
            <div className="font-mono text-3xl font-bold text-blue-700">
              {validationRules.length}
            </div>
            <div className="font-mono text-xs text-gray-600">Total Checks</div>
          </div>
        </div>

        {/* Validation by category */}
        {['Required', 'Recommended', 'For TTS', 'For RP', 'For Story', 'Optional'].map(category => {
          const categoryRules = validationRules.filter(r => r.category === category);
          if (categoryRules.length === 0) return null;

          return (
            <div key={category} className="bg-white border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">{category}</h4>
              <div className="space-y-2">
                {categoryRules.map(rule => {
                  const passed = rule.check();
                  return (
                    <div key={rule.id} className={`flex items-center gap-3 p-2 rounded ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
                      <span className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
                        {passed ? '✓' : '✗'}
                      </span>
                      <span className="font-mono text-xs text-gray-700">{rule.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Readiness indicators */}
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-3">🎯 Readiness for Platforms</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Basic RP', checks: ['name', 'age', 'gender', 'personality'] },
              { label: 'ElevenLabs TTS', checks: ['voice_basic', 'voice_accent'] },
              { label: 'Story-driven RP', checks: ['backstory', 'goals_defined', 'relationships'] },
              { label: 'Full Character', checks: ['name', 'age', 'appearance_basic', 'personality', 'backstory'] },
            ].map(platform => {
              const passed = platform.checks.filter(c => validationRules.find(r => r.id === c)?.check()).length;
              const total = platform.checks.length;
              const percent = Math.round((passed / total) * 100);

              return (
                <div key={platform.label} className="p-3 rounded bg-white border border-gray-200">
                  <div className="font-mono text-xs font-bold text-gray-700 mb-2">{platform.label}</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                    <div
                      className={`h-full ${percent === 100 ? 'bg-green-500' : percent >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-gray-500">{passed}/{total} ready</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),

    // SUBTAB 4: Quick Edit
    4: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-sm p-4 text-white">
          <h3 className="font-mono text-sm font-bold mb-2">✏️ QUICK EDIT</h3>
          <p className="font-mono text-xs text-green-200">Quickly view and edit key character fields.</p>
        </div>

        {/* Essential Info */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">🪪 Essential Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">First Name</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-sm">
                {characterData.identity?.core?.firstName || <span className="text-gray-400 italic">Not set</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Last Name</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-sm">
                {characterData.identity?.core?.lastName || <span className="text-gray-400 italic">Not set</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Nickname</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-sm">
                {characterData.identity?.core?.nickname || <span className="text-gray-400 italic">Not set</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Age</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-sm">
                {characterData.identity?.vitals?.age || <span className="text-gray-400 italic">Not set</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Gender</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-sm">
                {characterData.identity?.vitals?.genderIdentity || <span className="text-gray-400 italic">Not set</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Nationality</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-sm">
                {characterData.identity?.vitals?.nationality || <span className="text-gray-400 italic">Not set</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Quick View */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">👤 Appearance</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Hair Color</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-xs">
                {characterData.appearance?.hair?.color || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Eye Color</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-xs">
                {characterData.appearance?.eyes?.color || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Height</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-xs">
                {characterData.appearance?.body?.height || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Build</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm font-mono text-xs">
                {characterData.appearance?.body?.build || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Personality Quick View */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">🧠 Personality</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">MBTI Type</label>
              <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-sm font-mono text-sm font-bold text-purple-700">
                {characterData.psychology?.core?.mbtiType || <span className="text-gray-400 italic font-normal">Not set</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Enneagram</label>
              <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-sm font-mono text-sm font-bold text-purple-700">
                {characterData.psychology?.core?.enneagramType || <span className="text-gray-400 italic font-normal">Not set</span>}
              </div>
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] text-gray-500 mb-2">Personality Traits</label>
            <div className="flex flex-wrap gap-2">
              {characterData.psychology?.core?.personalityTraits?.length > 0
                ? characterData.psychology.core.personalityTraits.map((trait, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-sm font-mono text-xs">{trait}</span>
                  ))
                : <span className="text-gray-400 italic font-mono text-xs">No traits selected</span>
              }
            </div>
          </div>
        </div>

        {/* Voice Quick View */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">🎤 Voice</h4>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Voice Gender</label>
              <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-sm font-mono text-xs">
                {characterData.voice?.design?.voiceGender || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Voice Age</label>
              <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-sm font-mono text-xs">
                {characterData.voice?.design?.voiceAge || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] text-gray-500 mb-1">Accent</label>
              <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-sm font-mono text-xs">
                {characterData.voice?.languages?.accent || <span className="text-gray-400 italic">—</span>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Pitch', value: characterData.voice?.design?.pitch },
              { label: 'Speed', value: characterData.voice?.design?.speed },
              { label: 'Warmth', value: characterData.voice?.design?.timbreWarmth },
              { label: 'Smoothness', value: characterData.voice?.design?.timbreSmoothness },
            ].map((item, i) => (
              <div key={i} className="text-center p-2 bg-gray-50 rounded">
                <div className="font-mono text-lg font-bold text-gray-700">{item.value || 5}</div>
                <div className="font-mono text-[9px] text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Occupation */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">💼 Occupation</h4>
          {characterData.occupation?.jobs?.length > 0 ? (
            <div className="space-y-2">
              {characterData.occupation.jobs.map((job, i) => (
                <div key={i} className="p-3 bg-green-50 border border-green-200 rounded-sm">
                  <div className="font-mono text-sm font-bold text-green-800">{job.title || 'Untitled'}</div>
                  {job.company && <div className="font-mono text-xs text-green-600">@ {job.company}</div>}
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-gray-400 italic">No occupations defined</p>
          )}
        </div>

        {/* Quick tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <p className="font-mono text-xs text-blue-700">
            💡 This is a read-only quick view. To edit fields, navigate to their respective tabs in the main navigation.
          </p>
        </div>
      </div>
    ),

    // SUBTAB 5: Compare (Snapshots)
    5: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-violet-900 to-purple-900 rounded-sm p-4 text-white">
          <h3 className="font-mono text-sm font-bold mb-2">📸 COMPARE & SNAPSHOTS</h3>
          <p className="font-mono text-xs text-violet-200">Save snapshots and compare character versions.</p>
        </div>

        {/* Create Snapshot */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">💾 Create Snapshot</h4>
          <p className="font-mono text-xs text-gray-500 mb-4">Save the current state of your character for later comparison.</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const snapshot = {
                  timestamp: new Date().toISOString(),
                  name: characterData.identity?.core?.firstName || 'Unnamed',
                  data: JSON.stringify(characterData),
                  stats: totalStats
                };
                const existing = JSON.parse(localStorage.getItem('personaLoomSnapshots') || '[]');
                existing.push(snapshot);
                localStorage.setItem('personaLoomSnapshots', JSON.stringify(existing.slice(-10)));
                alert('Snapshot saved! (Max 10 snapshots stored)');
              }}
              className="flex-1 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white font-mono text-xs uppercase rounded-sm"
            >
              📸 Save Current Snapshot
            </button>
            <button
              onClick={() => {
                if (confirm('Clear all saved snapshots?')) {
                  localStorage.removeItem('personaLoomSnapshots');
                  alert('All snapshots cleared');
                }
              }}
              className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-mono text-xs uppercase rounded-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Saved Snapshots */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">📂 Saved Snapshots</h4>
          {(() => {
            const snapshots = JSON.parse(localStorage.getItem('personaLoomSnapshots') || '[]');
            if (snapshots.length === 0) {
              return <p className="font-mono text-xs text-gray-400 italic">No snapshots saved yet.</p>;
            }
            return (
              <div className="space-y-2">
                {snapshots.map((snap, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-sm">
                    <div>
                      <div className="font-mono text-sm font-bold text-gray-800">{snap.name}</div>
                      <div className="font-mono text-[10px] text-gray-500">
                        {new Date(snap.timestamp).toLocaleString()} • {snap.stats?.percent || 0}% complete
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (confirm('Restore this snapshot? Current data will be replaced.')) {
                            const data = JSON.parse(snap.data);
                            Object.keys(data).forEach(key => {
                              if (typeof data[key] === 'object') {
                                // Would need updateData passed as prop
                              }
                            });
                            alert('To restore, use Import/Backup with the snapshot data.');
                          }
                        }}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-mono text-[10px] rounded-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(snap.data);
                          alert('Snapshot data copied to clipboard!');
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-[10px] rounded-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Character Comparison */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">⚖️ Character Comparison</h4>
          <p className="font-mono text-xs text-gray-500 mb-4">Compare your character with previous snapshots or other characters.</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-sm">
              <div className="font-mono text-xs font-bold text-blue-800 mb-2">📍 Current Character</div>
              <div className="font-mono text-lg font-bold text-blue-700">
                {characterData.identity?.core?.firstName || 'Unnamed'}
              </div>
              <div className="font-mono text-xs text-blue-600">{totalStats.percent}% complete</div>
              <div className="font-mono text-[10px] text-blue-500">{totalStats.filled} fields filled</div>
            </div>

            <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center">
              <div className="font-mono text-xs text-gray-500 mb-2">Compare with...</div>
              <select
                className="w-full px-2 py-1 border border-gray-300 rounded-sm font-mono text-xs"
                onChange={(e) => {
                  if (e.target.value) {
                    const snapshots = JSON.parse(localStorage.getItem('personaLoomSnapshots') || '[]');
                    const snap = snapshots[parseInt(e.target.value)];
                    if (snap) {
                      const data = JSON.parse(snap.data);
                      const stats = countSectionFields(data);
                      alert(`Snapshot: ${snap.name}\nCompletion: ${stats.percent}%\nFields: ${stats.filled}/${stats.total}`);
                    }
                  }
                }}
              >
                <option value="">Select snapshot...</option>
                {JSON.parse(localStorage.getItem('personaLoomSnapshots') || '[]').map((snap, i) => (
                  <option key={i} value={i}>{snap.name} - {new Date(snap.timestamp).toLocaleDateString()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Changelog */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">📝 Session Changes</h4>
          <p className="font-mono text-xs text-gray-500 mb-4">Track what has changed since the session started.</p>
          <div className="p-4 bg-gray-50 rounded-sm">
            <div className="font-mono text-xs text-gray-600">
              <p>• Session started: <strong>{new Date().toLocaleString()}</strong></p>
              <p>• Current completion: <strong>{totalStats.percent}%</strong></p>
              <p>• Total fields filled: <strong>{totalStats.filled}</strong></p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-4">
          <h4 className="font-mono text-xs font-bold text-violet-800 mb-2">💡 Tips</h4>
          <ul className="font-mono text-[10px] text-violet-700 space-y-1">
            <li>• Snapshots are stored locally in your browser</li>
            <li>• Maximum of 10 snapshots are kept</li>
            <li>• Use Export → Import/Backup for permanent saves</li>
            <li>• Clear browser data will remove snapshots</li>
          </ul>
        </div>
      </div>
    ),
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <span className="inline-block bg-[#1a365d] text-white font-mono text-[9px] px-2 py-1 tracking-[0.15em]">SYSTEM // DATABASE</span>
      </div>
      <h1 className="font-serif text-4xl font-black italic text-gray-900 mb-4">Character Database</h1>
      <p className="font-mono text-xs text-gray-500 mb-8">View, browse, and analyze your character data.</p>

      {subtabContent[subtab] || subtabContent[0]}
    </div>
  );
};

// ============================================================================
// EXPORT CONTENT - Complete with multiple formats
// ============================================================================

export default DatabaseContent;
