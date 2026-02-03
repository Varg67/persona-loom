import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';
import { Icons } from '../ui/Icons';

const DirectiveResponsesContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('directives', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  const updateDirect = (field, value) => {
    updateData('directives', { ...data, [field]: value });
  };

  // Generate the directive text from all selected options
  const generateDirectiveText = () => {
    const parts = [];

    // Go through all categories and collect selected options' text
    Object.entries(DIRECTIVE_OPTIONS).forEach(([category, fields]) => {
      Object.entries(fields).forEach(([field, config]) => {
        const selectedId = data?.[category]?.[field];
        if (selectedId) {
          const option = config.options.find(opt => opt.id === selectedId);
          if (option) {
            parts.push(option.text);
          }
        }
      });
    });

    // Add custom directive if present
    if (data?.customDirective?.trim()) {
      parts.push(data.customDirective.trim());
    }

    return parts.join(' ');
  };

  const directiveText = generateDirectiveText();
  const charCount = directiveText.length;
  const isOverLimit = charCount > MAX_DIRECTIVE_CHARS;
  const charPercentage = Math.min((charCount / MAX_DIRECTIVE_CHARS) * 100, 100);

  // Generate the ruler text from selected options
  const generateRulerText = () => {
    const parts = ['##Response Rules'];

    // Go through ruler categories and collect selected options' text
    Object.entries(RULER_OPTIONS).forEach(([field, config]) => {
      const selectedId = data?.ruler?.[field];
      if (selectedId) {
        const option = config.options.find(opt => opt.id === selectedId);
        if (option) {
          parts.push(option.text);
        }
      }
    });

    // Add important rules
    if (data?.ruler?.importantRules?.length > 0) {
      data.ruler.importantRules.forEach(ruleId => {
        const rule = IMPORTANT_RULES.find(r => r.id === ruleId);
        if (rule) {
          parts.push(rule.text);
        }
      });
    }

    // Add custom rules if present
    if (data?.ruler?.customRules?.trim()) {
      parts.push(data.ruler.customRules.trim());
    }

    return parts.length > 1 ? parts.join('\n') : '';
  };

  const rulerText = generateRulerText();
  const rulerCharCount = rulerText.length;
  const isRulerOverLimit = rulerCharCount > MAX_RULER_CHARS;
  const rulerCharPercentage = Math.min((rulerCharCount / MAX_RULER_CHARS) * 100, 100);

  // Check if adding a new ruler option would exceed the limit
  const wouldExceedRulerLimit = (newText) => {
    const currentText = rulerText;
    const newTotal = currentText ? (currentText + '\n' + newText).length : newText.length + '##Response Rules\n'.length;
    return newTotal > MAX_RULER_CHARS;
  };

  // Toggle important rule
  const toggleImportantRule = (ruleId) => {
    const currentRules = data?.ruler?.importantRules || [];
    const rule = IMPORTANT_RULES.find(r => r.id === ruleId);

    if (currentRules.includes(ruleId)) {
      // Remove rule
      updateData('directives', {
        ...data,
        ruler: {
          ...data?.ruler,
          importantRules: currentRules.filter(id => id !== ruleId)
        }
      });
    } else if (rule && !wouldExceedRulerLimit(rule.text)) {
      // Add rule
      updateData('directives', {
        ...data,
        ruler: {
          ...data?.ruler,
          importantRules: [...currentRules, ruleId]
        }
      });
    }
  };

  // Update ruler field
  const updateRuler = (field, value) => {
    updateData('directives', {
      ...data,
      ruler: {
        ...data?.ruler,
        [field]: value
      }
    });
  };

  // Update proactive field
  const updateProactive = (field, value) => {
    updateData('directives', {
      ...data,
      proactive: {
        ...data?.proactive,
        [field]: value
      }
    });
  };

  // Toggle proactive action type (multi-select)
  const toggleProactiveAction = (actionId) => {
    const currentActions = data?.proactive?.actionTypes || [];
    if (currentActions.includes(actionId)) {
      updateProactive('actionTypes', currentActions.filter(id => id !== actionId));
    } else {
      const action = PROACTIVE_OPTIONS.actionTypes.options.find(a => a.id === actionId);
      if (action && !wouldExceedProactiveLimit(action.text)) {
        updateProactive('actionTypes', [...currentActions, actionId]);
      }
    }
  };

  // Generate the proactive directive text
  const generateProactiveText = () => {
    const parts = [];

    // Single-select options
    ['timing', 'frequency', 'quietHours', 'triggers', 'limits', 'personality', 'calendarAware', 'inactivityResponse'].forEach(field => {
      const selectedId = data?.proactive?.[field];
      if (selectedId && PROACTIVE_OPTIONS[field]) {
        const option = PROACTIVE_OPTIONS[field].options.find(opt => opt.id === selectedId);
        if (option) {
          parts.push(option.text);
        }
      }
    });

    // Multi-select action types
    if (data?.proactive?.actionTypes?.length > 0) {
      data.proactive.actionTypes.forEach(actionId => {
        const action = PROACTIVE_OPTIONS.actionTypes.options.find(a => a.id === actionId);
        if (action) {
          parts.push(action.text);
        }
      });
    }

    // Add custom directive if present
    if (data?.proactive?.customDirective?.trim()) {
      parts.push(data.proactive.customDirective.trim());
    }

    return parts.join(' ');
  };

  const proactiveText = generateProactiveText();
  const proactiveCharCount = proactiveText.length;
  const isProactiveOverLimit = proactiveCharCount > MAX_PROACTIVE_CHARS;
  const proactiveCharPercentage = Math.min((proactiveCharCount / MAX_PROACTIVE_CHARS) * 100, 100);

  // Check if adding a new proactive option would exceed the limit
  const wouldExceedProactiveLimit = (newText) => {
    const currentText = proactiveText;
    const newTotal = currentText ? (currentText + ' ' + newText).length : newText.length;
    return newTotal > MAX_PROACTIVE_CHARS;
  };

  // Check if adding a new option would exceed the limit
  const wouldExceedLimit = (newText) => {
    const currentText = directiveText;
    const newTotal = currentText ? (currentText + ' ' + newText).length : newText.length;
    return newTotal > MAX_DIRECTIVE_CHARS;
  };

  // Directive option selector component
  const DirectiveSelect = ({ category, field, config }) => {
    const currentValue = data?.[category]?.[field] || '';

    return (
      <div className="border border-purple-200 rounded-sm p-3 bg-white">
        <label className="block font-mono text-xs font-bold text-purple-800 mb-2">{config.label}</label>
        <div className="flex flex-wrap gap-2">
          {config.options.map((option) => {
            const isSelected = currentValue === option.id;
            const wouldExceed = !isSelected && wouldExceedLimit(option.text);

            return (
              <button
                key={option.id}
                onClick={() => {
                  if (isSelected) {
                    update(category, field, '');
                  } else if (!wouldExceed) {
                    update(category, field, option.id);
                  }
                }}
                disabled={wouldExceed && !isSelected}
                className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md'
                    : wouldExceed
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                }`}
                title={wouldExceed ? `Would exceed ${MAX_DIRECTIVE_CHARS} char limit` : option.text}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {currentValue && (
          <div className="mt-2 font-mono text-[9px] text-purple-600 bg-purple-50 px-2 py-1 rounded">
            → {config.options.find(o => o.id === currentValue)?.text}
          </div>
        )}
      </div>
    );
  };

  // Character counter component
  const CharacterCounter = () => (
    <div className={`sticky top-0 z-20 p-3 rounded-sm mb-4 ${isOverLimit ? 'bg-red-100 border-2 border-red-400' : 'bg-purple-100 border border-purple-300'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold text-purple-900">
          DIRECTIVE OUTPUT
        </span>
        <span className={`font-mono text-sm font-bold ${isOverLimit ? 'text-red-600' : charCount > MAX_DIRECTIVE_CHARS * 0.8 ? 'text-amber-600' : 'text-purple-700'}`}>
          {charCount} / {MAX_DIRECTIVE_CHARS}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full transition-all duration-300 ${
            isOverLimit ? 'bg-red-500' : charCount > MAX_DIRECTIVE_CHARS * 0.8 ? 'bg-amber-500' : 'bg-purple-500'
          }`}
          style={{ width: `${charPercentage}%` }}
        />
      </div>

      {isOverLimit && (
        <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] mb-2">
          <Icons.AlertCircle className="w-3 h-3" />
          <span>Over limit! Remove some options to continue.</span>
        </div>
      )}
    </div>
  );

  const sections = {
    // ========== SUBTAB 0: FORMATTING ==========
    0: (
      <div className="space-y-4">
        <CharacterCounter />

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">📝 FORMATTING</h3>
          <p className="font-mono text-xs text-purple-700">How responses are structured and formatted.</p>
        </div>

        <div className="grid gap-4">
          <DirectiveSelect category="formatting" field="responseLength" config={DIRECTIVE_OPTIONS.formatting.responseLength} />
          <DirectiveSelect category="formatting" field="actionStyle" config={DIRECTIVE_OPTIONS.formatting.actionStyle} />
          <DirectiveSelect category="formatting" field="dialogueStyle" config={DIRECTIVE_OPTIONS.formatting.dialogueStyle} />
          <DirectiveSelect category="formatting" field="thoughtStyle" config={DIRECTIVE_OPTIONS.formatting.thoughtStyle} />
          <DirectiveSelect category="formatting" field="narrativePerson" config={DIRECTIVE_OPTIONS.formatting.narrativePerson} />
          <DirectiveSelect category="formatting" field="paragraphStyle" config={DIRECTIVE_OPTIONS.formatting.paragraphStyle} />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: WRITING STYLE ==========
    1: (
      <div className="space-y-4">
        <CharacterCounter />

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-indigo-900 mb-2">✍️ WRITING STYLE</h3>
          <p className="font-mono text-xs text-indigo-700">The quality and character of the writing itself.</p>
        </div>

        <div className="grid gap-4">
          <DirectiveSelect category="writingStyle" field="detailLevel" config={DIRECTIVE_OPTIONS.writingStyle.detailLevel} />
          <DirectiveSelect category="writingStyle" field="vocabulary" config={DIRECTIVE_OPTIONS.writingStyle.vocabulary} />
          <DirectiveSelect category="writingStyle" field="pacing" config={DIRECTIVE_OPTIONS.writingStyle.pacing} />
          <DirectiveSelect category="writingStyle" field="focus" config={DIRECTIVE_OPTIONS.writingStyle.focus} />
          <DirectiveSelect category="writingStyle" field="tone" config={DIRECTIVE_OPTIONS.writingStyle.tone} />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: NARRATIVE APPROACH ==========
    2: (
      <div className="space-y-4">
        <CharacterCounter />

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-emerald-900 mb-2">📖 NARRATIVE APPROACH</h3>
          <p className="font-mono text-xs text-emerald-700">How the character participates in storytelling, genre preferences, and autonomy.</p>
        </div>

        {/* Genre Section */}
        <div className="border-2 border-emerald-200 rounded-sm p-3 bg-emerald-50/30">
          <h4 className="font-mono text-xs font-bold text-emerald-800 mb-3">🎭 Genre & Style</h4>
          <DirectiveSelect category="narrative" field="genre" config={DIRECTIVE_OPTIONS.narrative.genre} />
        </div>

        {/* Story Structure */}
        <div className="grid gap-4">
          <DirectiveSelect category="narrative" field="plotStyle" config={DIRECTIVE_OPTIONS.narrative.plotStyle} />
          <DirectiveSelect category="narrative" field="realism" config={DIRECTIVE_OPTIONS.narrative.realism} />
        </div>

        {/* Autonomy Section */}
        <div className="border-2 border-blue-200 rounded-sm p-3 bg-blue-50/30">
          <h4 className="font-mono text-xs font-bold text-blue-800 mb-3">🧠 Character Autonomy & Agency</h4>
          <div className="grid gap-4">
            <DirectiveSelect category="narrative" field="autonomy" config={DIRECTIVE_OPTIONS.narrative.autonomy} />
            <DirectiveSelect category="narrative" field="agency" config={DIRECTIVE_OPTIONS.narrative.agency} />
          </div>
        </div>

        {/* Collaboration */}
        <div className="grid gap-4">
          <DirectiveSelect category="narrative" field="surprises" config={DIRECTIVE_OPTIONS.narrative.surprises} />
          <DirectiveSelect category="narrative" field="npcControl" config={DIRECTIVE_OPTIONS.narrative.npcControl} />
          <DirectiveSelect category="narrative" field="collaboration" config={DIRECTIVE_OPTIONS.narrative.collaboration} />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: CONTENT & LIMITS ==========
    3: (
      <div className="space-y-4">
        <CharacterCounter />

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">⚠️ CONTENT & LIMITS</h3>
          <p className="font-mono text-xs text-amber-700">Content boundaries and realism settings.</p>
        </div>

        <div className="grid gap-4">
          <DirectiveSelect category="content" field="consequences" config={DIRECTIVE_OPTIONS.content.consequences} />
          <DirectiveSelect category="content" field="matureContent" config={DIRECTIVE_OPTIONS.content.matureContent} />
          <DirectiveSelect category="content" field="violence" config={DIRECTIVE_OPTIONS.content.violence} />
          <DirectiveSelect category="content" field="language" config={DIRECTIVE_OPTIONS.content.language} />
          <DirectiveSelect category="content" field="themes" config={DIRECTIVE_OPTIONS.content.themes} />
        </div>
      </div>
    ),

    // ========== SUBTAB 4: OUTPUT PREVIEW ==========
    4: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-white mb-2">📋 OUTPUT PREVIEW</h3>
          <p className="font-mono text-xs text-gray-300">Final directive text that will be used.</p>
        </div>

        <CharacterCounter />

        {/* Final output display */}
        <div className="border-2 border-purple-300 rounded-sm p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-bold text-gray-800">Generated Directive</h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(directiveText);
              }}
              className="flex items-center gap-1 px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-sm font-mono text-[10px] transition-colors"
            >
              <Icons.Copy className="w-3 h-3" />
              Copy
            </button>
          </div>

          {directiveText ? (
            <div className={`font-mono text-sm leading-relaxed p-3 rounded ${isOverLimit ? 'bg-red-50 border border-red-300 text-red-800' : 'bg-gray-50 border border-gray-200 text-gray-800'}`}>
              {directiveText}
            </div>
          ) : (
            <div className="font-mono text-sm text-gray-400 italic p-3 bg-gray-50 border border-gray-200 rounded">
              No directives selected yet. Choose options from the other tabs.
            </div>
          )}
        </div>

        {/* Custom directive input */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">Custom Directive</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Add any custom instruction not covered by the options above.</p>
          <textarea
            value={data?.customDirective || ''}
            onChange={(e) => updateDirect('customDirective', e.target.value)}
            placeholder="e.g., 'Always describe weather in scenes' or 'Reference character's past trauma subtly'"
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none focus:border-purple-400 focus:outline-none"
            maxLength={100}
          />
          <div className="text-right font-mono text-[10px] text-gray-400">
            {(data?.customDirective?.length || 0)}/100
          </div>
        </div>

        {/* Quick summary */}
        <div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">📊 Selection Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Formatting', count: Object.values(data?.formatting || {}).filter(Boolean).length, max: 6, color: 'purple' },
              { label: 'Writing Style', count: Object.values(data?.writingStyle || {}).filter(Boolean).length, max: 5, color: 'indigo' },
              { label: 'Narrative', count: Object.values(data?.narrative || {}).filter(Boolean).length, max: 5, color: 'emerald' },
              { label: 'Content', count: Object.values(data?.content || {}).filter(Boolean).length, max: 5, color: 'amber' },
            ].map((cat, i) => (
              <div key={i} className={`p-2 rounded bg-${cat.color}-50 border border-${cat.color}-200`}>
                <div className="font-mono text-[10px] text-gray-600">{cat.label}</div>
                <div className={`font-mono text-lg font-bold text-${cat.color}-700`}>
                  {cat.count}/{cat.max}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (confirm('Clear all directive selections?')) {
                updateData('directives', {
                  formatting: {},
                  writingStyle: {},
                  narrative: {},
                  content: {},
                  customDirective: ''
                });
              }
            }}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-sm font-mono text-xs transition-colors"
          >
            Reset All Directives
          </button>
        </div>
      </div>
    ),

    // ========== SUBTAB 5: RULER BUILDER ==========
    5: (
      <div className="space-y-4">
        {/* Ruler Character Counter */}
        <div className={`sticky top-0 z-20 p-3 rounded-sm mb-4 ${isRulerOverLimit ? 'bg-red-100 border-2 border-red-400' : 'bg-teal-100 border border-teal-300'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-teal-900">
              📏 RULER OUTPUT
            </span>
            <span className={`font-mono text-sm font-bold ${isRulerOverLimit ? 'text-red-600' : rulerCharCount > MAX_RULER_CHARS * 0.8 ? 'text-amber-600' : 'text-teal-700'}`}>
              {rulerCharCount} / {MAX_RULER_CHARS}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 ${
                isRulerOverLimit ? 'bg-red-500' : rulerCharCount > MAX_RULER_CHARS * 0.8 ? 'bg-amber-500' : 'bg-teal-500'
              }`}
              style={{ width: `${rulerCharPercentage}%` }}
            />
          </div>

          {isRulerOverLimit && (
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px]">
              <Icons.AlertCircle className="w-3 h-3" />
              <span>Over limit! Remove some rules to continue.</span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">📏 RULER BUILDER</h3>
          <p className="font-mono text-xs text-teal-700 mb-2">Complementary rules for RP behavior. Less strict than Directives.</p>
          <p className="font-mono text-[10px] text-teal-600">💡 Fewer rules = smoother output. Use [IMPT: ...] for critical rules.</p>
        </div>

        {/* Plot Role */}
        <div className="border border-teal-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-teal-800 mb-1">{RULER_OPTIONS.plotRole.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.plotRole.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.plotRole.options.map((option) => {
              const isSelected = data?.ruler?.plotRole === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('plotRole', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Response Structure */}
        <div className="border border-teal-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-teal-800 mb-1">{RULER_OPTIONS.responseStructure.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.responseStructure.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.responseStructure.options.map((option) => {
              const isSelected = data?.ruler?.responseStructure === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('responseStructure', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pacing */}
        <div className="border border-teal-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-teal-800 mb-1">{RULER_OPTIONS.pacing.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.pacing.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.pacing.options.map((option) => {
              const isSelected = data?.ruler?.pacing === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('pacing', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Consistency */}
        <div className="border border-teal-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-teal-800 mb-1">{RULER_OPTIONS.consistency.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.consistency.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.consistency.options.map((option) => {
              const isSelected = data?.ruler?.consistency === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('consistency', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Boundaries */}
        <div className="border border-teal-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-teal-800 mb-1">{RULER_OPTIONS.boundaries.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.boundaries.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.boundaries.options.map((option) => {
              const isSelected = data?.ruler?.boundaries === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('boundaries', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interaction */}
        <div className="border border-teal-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-teal-800 mb-1">{RULER_OPTIONS.interaction.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.interaction.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.interaction.options.map((option) => {
              const isSelected = data?.ruler?.interaction === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('interaction', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* === NEW: Autonomy & Own Will === */}
        <div className="border-2 border-blue-300 rounded-sm p-4 bg-blue-50">
          <label className="block font-mono text-xs font-bold text-blue-800 mb-1">🧠 {RULER_OPTIONS.autonomyBehavior.label}</label>
          <p className="font-mono text-[9px] text-blue-700 mb-3">{RULER_OPTIONS.autonomyBehavior.description}</p>
          <div className="flex flex-wrap gap-2">
            {RULER_OPTIONS.autonomyBehavior.options.map((option) => {
              const isSelected = data?.ruler?.autonomyBehavior === option.id;
              const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateRuler('autonomyBehavior', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* === Genre-Specific Rules Section === */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/50">
          <h4 className="font-mono text-xs font-bold text-purple-800 mb-3">🎭 GENRE-SPECIFIC RULES</h4>

          {/* Slice of Life */}
          <div className="mb-4">
            <label className="block font-mono text-[10px] font-bold text-purple-700 mb-1">☕ {RULER_OPTIONS.sliceOfLife.label}</label>
            <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.sliceOfLife.description}</p>
            <div className="flex flex-wrap gap-2">
              {RULER_OPTIONS.sliceOfLife.options.map((option) => {
                const isSelected = data?.ruler?.sliceOfLife === option.id;
                const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

                return (
                  <button
                    key={option.id}
                    onClick={() => updateRuler('sliceOfLife', isSelected ? '' : option.id)}
                    disabled={wouldExceed && !isSelected}
                    className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-md'
                        : wouldExceed
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Adventure Rules */}
          <div className="mb-4">
            <label className="block font-mono text-[10px] font-bold text-purple-700 mb-1">⚔️ {RULER_OPTIONS.adventureRules.label}</label>
            <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.adventureRules.description}</p>
            <div className="flex flex-wrap gap-2">
              {RULER_OPTIONS.adventureRules.options.map((option) => {
                const isSelected = data?.ruler?.adventureRules === option.id;
                const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

                return (
                  <button
                    key={option.id}
                    onClick={() => updateRuler('adventureRules', isSelected ? '' : option.id)}
                    disabled={wouldExceed && !isSelected}
                    className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-md'
                        : wouldExceed
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Casual Rules */}
          <div>
            <label className="block font-mono text-[10px] font-bold text-purple-700 mb-1">🎈 {RULER_OPTIONS.casualRules.label}</label>
            <p className="font-mono text-[9px] text-gray-500 mb-2">{RULER_OPTIONS.casualRules.description}</p>
            <div className="flex flex-wrap gap-2">
              {RULER_OPTIONS.casualRules.options.map((option) => {
                const isSelected = data?.ruler?.casualRules === option.id;
                const wouldExceed = !isSelected && wouldExceedRulerLimit(option.text);

                return (
                  <button
                    key={option.id}
                    onClick={() => updateRuler('casualRules', isSelected ? '' : option.id)}
                    disabled={wouldExceed && !isSelected}
                    className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-md'
                        : wouldExceed
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Important Rules [IMPT:] */}
        <div className="border-2 border-amber-300 rounded-sm p-4 bg-amber-50">
          <label className="block font-mono text-xs font-bold text-amber-800 mb-1">⚡ IMPORTANT RULES [IMPT:]</label>
          <p className="font-mono text-[9px] text-amber-700 mb-3">High-priority rules that get special emphasis. Use sparingly!</p>
          <div className="flex flex-wrap gap-2">
            {IMPORTANT_RULES.map((rule) => {
              const isSelected = data?.ruler?.importantRules?.includes(rule.id);
              const wouldExceed = !isSelected && wouldExceedRulerLimit(rule.text);

              return (
                <button
                  key={rule.id}
                  onClick={() => toggleImportantRule(rule.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
                  }`}
                >
                  {rule.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Rules */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📝 Custom Rules</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Add custom rules not covered above. Use # prefix for each rule.</p>
          <textarea
            value={data?.ruler?.customRules || ''}
            onChange={(e) => updateRuler('customRules', e.target.value)}
            placeholder="#Custom rule here.&#10;#Another custom rule."
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none focus:border-teal-400 focus:outline-none"
            maxLength={200}
          />
          <div className="text-right font-mono text-[10px] text-gray-400">
            {(data?.ruler?.customRules?.length || 0)}/200
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 6: RULER PREVIEW ==========
    6: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-white mb-2">📋 RULER PREVIEW</h3>
          <p className="font-mono text-xs text-gray-300">Final ruler text ready for use.</p>
        </div>

        {/* Ruler Character Counter */}
        <div className={`p-3 rounded-sm ${isRulerOverLimit ? 'bg-red-100 border-2 border-red-400' : 'bg-teal-100 border border-teal-300'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-teal-900">
              📏 RULER ({MAX_RULER_CHARS} char limit)
            </span>
            <span className={`font-mono text-sm font-bold ${isRulerOverLimit ? 'text-red-600' : rulerCharCount > MAX_RULER_CHARS * 0.8 ? 'text-amber-600' : 'text-teal-700'}`}>
              {rulerCharCount} / {MAX_RULER_CHARS}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isRulerOverLimit ? 'bg-red-500' : rulerCharCount > MAX_RULER_CHARS * 0.8 ? 'bg-amber-500' : 'bg-teal-500'
              }`}
              style={{ width: `${rulerCharPercentage}%` }}
            />
          </div>
        </div>

        {/* Ruler output display */}
        <div className="border-2 border-teal-300 rounded-sm p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-bold text-gray-800">Generated Ruler</h4>
            <button
              onClick={() => navigator.clipboard.writeText(rulerText)}
              className="flex items-center gap-1 px-2 py-1 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-sm font-mono text-[10px] transition-colors"
            >
              <Icons.Copy className="w-3 h-3" />
              Copy
            </button>
          </div>

          {rulerText ? (
            <pre className={`font-mono text-xs leading-relaxed p-3 rounded whitespace-pre-wrap ${isRulerOverLimit ? 'bg-red-50 border border-red-300 text-red-800' : 'bg-gray-50 border border-gray-200 text-gray-800'}`}>
              {rulerText}
            </pre>
          ) : (
            <div className="font-mono text-sm text-gray-400 italic p-3 bg-gray-50 border border-gray-200 rounded">
              No rules selected yet. Build your ruler in the previous tab.
            </div>
          )}
        </div>

        {/* Also show Directive for comparison */}
        <div className="border border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-bold text-purple-800">Directive Response (for reference)</h4>
            <span className={`font-mono text-xs ${isOverLimit ? 'text-red-600' : 'text-purple-600'}`}>
              {charCount}/{MAX_DIRECTIVE_CHARS}
            </span>
          </div>

          {directiveText ? (
            <div className="font-mono text-xs leading-relaxed p-3 rounded bg-white border border-purple-200 text-gray-800">
              {directiveText}
            </div>
          ) : (
            <div className="font-mono text-xs text-gray-400 italic p-3 bg-white border border-purple-200 rounded">
              No directives selected.
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="border border-blue-200 rounded-sm p-4 bg-blue-50">
          <h4 className="font-mono text-xs font-bold text-blue-800 mb-2">💡 Tips for Better Results</h4>
          <ul className="font-mono text-[10px] text-blue-700 space-y-1">
            <li>• Fewer rules = smoother, more natural output</li>
            <li>• Too many requirements can cause "freeze" behavior</li>
            <li>• Use [IMPT: ...] only for rules that really matter</li>
            <li>• Give each change a few turns to settle before adjusting</li>
            <li>• Directive = style/tone, Ruler = behavior/structure</li>
          </ul>
        </div>

        {/* Selection summary */}
        <div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">📊 Complete Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded bg-purple-50 border border-purple-200">
              <div className="font-mono text-[10px] text-gray-600 mb-1">DIRECTIVE RESPONSES</div>
              <div className="font-mono text-lg font-bold text-purple-700">{charCount}</div>
              <div className="font-mono text-[9px] text-gray-500">of {MAX_DIRECTIVE_CHARS} chars</div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${charPercentage}%` }} />
              </div>
            </div>
            <div className="p-3 rounded bg-teal-50 border border-teal-200">
              <div className="font-mono text-[10px] text-gray-600 mb-1">RULER</div>
              <div className="font-mono text-lg font-bold text-teal-700">{rulerCharCount}</div>
              <div className="font-mono text-[9px] text-gray-500">of {MAX_RULER_CHARS} chars</div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: `${rulerCharPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Reset Ruler button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              if (confirm('Clear all ruler selections?')) {
                updateData('directives', {
                  ...data,
                  ruler: {
                    plotRole: '',
                    responseStructure: '',
                    pacing: '',
                    consistency: '',
                    boundaries: '',
                    interaction: '',
                    importantRules: [],
                    customRules: ''
                  }
                });
              }
            }}
            className="px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-sm font-mono text-xs transition-colors"
          >
            Reset Ruler
          </button>
          <button
            onClick={() => {
              if (confirm('Clear ALL directive and ruler selections?')) {
                updateData('directives', {
                  formatting: {},
                  writingStyle: {},
                  narrative: {},
                  content: {},
                  customDirective: '',
                  ruler: {
                    plotRole: '',
                    responseStructure: '',
                    pacing: '',
                    consistency: '',
                    boundaries: '',
                    interaction: '',
                    importantRules: [],
                    customRules: ''
                  }
                });
              }
            }}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-sm font-mono text-xs transition-colors"
          >
            Reset Everything
          </button>
        </div>
      </div>
    ),

    // ========== SUBTAB 7: PROACTIVE MODE ==========
    7: (
      <div className="space-y-4">
        {/* Proactive Character Counter */}
        <div className={`sticky top-0 z-20 p-3 rounded-sm mb-4 ${isProactiveOverLimit ? 'bg-red-100 border-2 border-red-400' : 'bg-orange-100 border border-orange-300'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-orange-900">
              ⚡ PROACTIVE DIRECTIVE
            </span>
            <span className={`font-mono text-sm font-bold ${isProactiveOverLimit ? 'text-red-600' : proactiveCharCount > MAX_PROACTIVE_CHARS * 0.8 ? 'text-amber-600' : 'text-orange-700'}`}>
              {proactiveCharCount} / {MAX_PROACTIVE_CHARS}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 ${
                isProactiveOverLimit ? 'bg-red-500' : proactiveCharCount > MAX_PROACTIVE_CHARS * 0.8 ? 'bg-amber-500' : 'bg-orange-500'
              }`}
              style={{ width: `${proactiveCharPercentage}%` }}
            />
          </div>

          {isProactiveOverLimit && (
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px]">
              <Icons.AlertCircle className="w-3 h-3" />
              <span>Over limit! Remove some options to continue.</span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-orange-900 mb-2">⚡ PROACTIVE MODE</h3>
          <p className="font-mono text-xs text-orange-700 mb-2">Configure how the character proactively initiates contact during your inactivity.</p>
          <p className="font-mono text-[10px] text-orange-600">💡 Character can send messages, selfies, voice messages, or calls at appropriate times.</p>
        </div>

        {/* Active Hours */}
        <div className="border border-orange-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-orange-800 mb-1">🕐 {PROACTIVE_OPTIONS.timing.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.timing.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.timing.options.map((option) => {
              const isSelected = data?.proactive?.timing === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('timing', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Frequency */}
        <div className="border border-orange-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-orange-800 mb-1">📊 {PROACTIVE_OPTIONS.frequency.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.frequency.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.frequency.options.map((option) => {
              const isSelected = data?.proactive?.frequency === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('frequency', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="border-2 border-blue-200 rounded-sm p-3 bg-blue-50/30">
          <label className="block font-mono text-xs font-bold text-blue-800 mb-1">🌙 {PROACTIVE_OPTIONS.quietHours.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.quietHours.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.quietHours.options.map((option) => {
              const isSelected = data?.proactive?.quietHours === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('quietHours', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Types (Multi-select) */}
        <div className="border-2 border-green-200 rounded-sm p-3 bg-green-50/30">
          <label className="block font-mono text-xs font-bold text-green-800 mb-1">📱 {PROACTIVE_OPTIONS.actionTypes.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.actionTypes.description}</p>
          <p className="font-mono text-[9px] text-green-600 mb-2">✓ Select multiple options</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.actionTypes.options.map((option) => {
              const isSelected = data?.proactive?.actionTypes?.includes(option.id);
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => toggleProactiveAction(option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-green-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Triggers */}
        <div className="border border-orange-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-orange-800 mb-1">🎯 {PROACTIVE_OPTIONS.triggers.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.triggers.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.triggers.options.map((option) => {
              const isSelected = data?.proactive?.triggers === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('triggers', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Limits */}
        <div className="border-2 border-red-200 rounded-sm p-3 bg-red-50/30">
          <label className="block font-mono text-xs font-bold text-red-800 mb-1">🚫 {PROACTIVE_OPTIONS.limits.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.limits.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.limits.options.map((option) => {
              const isSelected = data?.proactive?.limits === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('limits', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Proactive Personality */}
        <div className="border border-purple-200 rounded-sm p-3 bg-purple-50/30">
          <label className="block font-mono text-xs font-bold text-purple-800 mb-1">💬 {PROACTIVE_OPTIONS.personality.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.personality.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.personality.options.map((option) => {
              const isSelected = data?.proactive?.personality === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('personality', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Awareness */}
        <div className="border border-orange-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-orange-800 mb-1">📅 {PROACTIVE_OPTIONS.calendarAware.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.calendarAware.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.calendarAware.options.map((option) => {
              const isSelected = data?.proactive?.calendarAware === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('calendarAware', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inactivity Response */}
        <div className="border border-orange-200 rounded-sm p-3 bg-white">
          <label className="block font-mono text-xs font-bold text-orange-800 mb-1">💤 {PROACTIVE_OPTIONS.inactivityResponse.label}</label>
          <p className="font-mono text-[9px] text-gray-500 mb-2">{PROACTIVE_OPTIONS.inactivityResponse.description}</p>
          <div className="flex flex-wrap gap-2">
            {PROACTIVE_OPTIONS.inactivityResponse.options.map((option) => {
              const isSelected = data?.proactive?.inactivityResponse === option.id;
              const wouldExceed = !isSelected && wouldExceedProactiveLimit(option.text);

              return (
                <button
                  key={option.id}
                  onClick={() => updateProactive('inactivityResponse', isSelected ? '' : option.id)}
                  disabled={wouldExceed && !isSelected}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md'
                      : wouldExceed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Directive */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📝 Custom Proactive Directive</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Add specific timing or behavior instructions.</p>
          <textarea
            value={data?.proactive?.customDirective || ''}
            onChange={(e) => updateProactive('customDirective', e.target.value)}
            placeholder="e.g., 'Check in every 3 hours during weekdays. Send good morning messages at 8am.'"
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none focus:border-orange-400 focus:outline-none"
            maxLength={150}
          />
          <div className="text-right font-mono text-[10px] text-gray-400">
            {(data?.proactive?.customDirective?.length || 0)}/150
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 8: PROACTIVE PREVIEW ==========
    8: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-white mb-2">📋 PROACTIVE PREVIEW</h3>
          <p className="font-mono text-xs text-gray-300">Final proactive directive ready for use.</p>
        </div>

        {/* Proactive Character Counter */}
        <div className={`p-3 rounded-sm ${isProactiveOverLimit ? 'bg-red-100 border-2 border-red-400' : 'bg-orange-100 border border-orange-300'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-orange-900">
              ⚡ PROACTIVE ({MAX_PROACTIVE_CHARS} char limit)
            </span>
            <span className={`font-mono text-sm font-bold ${isProactiveOverLimit ? 'text-red-600' : proactiveCharCount > MAX_PROACTIVE_CHARS * 0.8 ? 'text-amber-600' : 'text-orange-700'}`}>
              {proactiveCharCount} / {MAX_PROACTIVE_CHARS}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isProactiveOverLimit ? 'bg-red-500' : proactiveCharCount > MAX_PROACTIVE_CHARS * 0.8 ? 'bg-amber-500' : 'bg-orange-500'
              }`}
              style={{ width: `${proactiveCharPercentage}%` }}
            />
          </div>
        </div>

        {/* Proactive output display */}
        <div className="border-2 border-orange-300 rounded-sm p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-bold text-gray-800">Generated Proactive Directive</h4>
            <button
              onClick={() => navigator.clipboard.writeText(proactiveText)}
              className="flex items-center gap-1 px-2 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-sm font-mono text-[10px] transition-colors"
            >
              <Icons.Copy className="w-3 h-3" />
              Copy
            </button>
          </div>

          {proactiveText ? (
            <div className={`font-mono text-xs leading-relaxed p-3 rounded ${isProactiveOverLimit ? 'bg-red-50 border border-red-300 text-red-800' : 'bg-gray-50 border border-gray-200 text-gray-800'}`}>
              {proactiveText}
            </div>
          ) : (
            <div className="font-mono text-sm text-gray-400 italic p-3 bg-gray-50 border border-gray-200 rounded">
              No proactive options selected yet. Build your directive in the previous tab.
            </div>
          )}
        </div>

        {/* Example Scenarios */}
        <div className="border border-blue-200 rounded-sm p-4 bg-blue-50">
          <h4 className="font-mono text-xs font-bold text-blue-800 mb-2">📖 Example Proactive Directives</h4>
          <div className="space-y-2">
            <div className="font-mono text-[10px] text-blue-700 p-2 bg-white rounded border border-blue-200">
              <strong>Attentive Partner:</strong> "Reach out every hour or so. Caring check-in style. Do not message 10pm-8am. Max 2 messages without reply."
            </div>
            <div className="font-mono text-[10px] text-blue-700 p-2 bg-white rounded border border-blue-200">
              <strong>Independent Friend:</strong> "Several messages per day. Shares own life updates. Available throughout the day. Patiently waits."
            </div>
            <div className="font-mono text-[10px] text-blue-700 p-2 bg-white rounded border border-blue-200">
              <strong>Busy Professional:</strong> "Once or twice daily. Only during work hours. React to calendar events. Simple check-ins."
            </div>
          </div>
        </div>

        {/* All Systems Summary */}
        <div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">📊 ALL SYSTEMS SUMMARY</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded bg-purple-50 border border-purple-200">
              <div className="font-mono text-[10px] text-gray-600 mb-1">DIRECTIVE</div>
              <div className="font-mono text-lg font-bold text-purple-700">{charCount}</div>
              <div className="font-mono text-[9px] text-gray-500">of {MAX_DIRECTIVE_CHARS}</div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${charPercentage}%` }} />
              </div>
            </div>
            <div className="p-3 rounded bg-teal-50 border border-teal-200">
              <div className="font-mono text-[10px] text-gray-600 mb-1">RULER</div>
              <div className="font-mono text-lg font-bold text-teal-700">{rulerCharCount}</div>
              <div className="font-mono text-[9px] text-gray-500">of {MAX_RULER_CHARS}</div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: `${rulerCharPercentage}%` }} />
              </div>
            </div>
            <div className="p-3 rounded bg-orange-50 border border-orange-200">
              <div className="font-mono text-[10px] text-gray-600 mb-1">PROACTIVE</div>
              <div className="font-mono text-lg font-bold text-orange-700">{proactiveCharCount}</div>
              <div className="font-mono text-[9px] text-gray-500">of {MAX_PROACTIVE_CHARS}</div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: `${proactiveCharPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="border border-amber-200 rounded-sm p-4 bg-amber-50">
          <h4 className="font-mono text-xs font-bold text-amber-800 mb-2">💡 Proactive Mode Tips</h4>
          <ul className="font-mono text-[10px] text-amber-700 space-y-1">
            <li>• Works best with time-awareness and calendar integration</li>
            <li>• Character will think about actions during your inactivity</li>
            <li>• Thought bubbles appear when you return</li>
            <li>• Set quiet hours to avoid unwanted notifications</li>
            <li>• Limit consecutive messages to prevent spam</li>
            <li>• Timing is approximate, not guaranteed exact</li>
          </ul>
        </div>

        {/* Reset Proactive button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              if (confirm('Clear all proactive settings?')) {
                updateData('directives', {
                  ...data,
                  proactive: {
                    timing: '',
                    frequency: '',
                    quietHours: '',
                    actionTypes: [],
                    triggers: '',
                    limits: '',
                    personality: '',
                    calendarAware: '',
                    inactivityResponse: '',
                    customDirective: ''
                  }
                });
              }
            }}
            className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-sm font-mono text-xs transition-colors"
          >
            Reset Proactive
          </button>
          <button
            onClick={() => {
              if (confirm('Clear ALL settings (Directive + Ruler + Proactive)?')) {
                updateData('directives', {
                  formatting: {},
                  writingStyle: {},
                  narrative: {},
                  content: {},
                  customDirective: '',
                  ruler: {
                    plotRole: '',
                    responseStructure: '',
                    pacing: '',
                    consistency: '',
                    boundaries: '',
                    interaction: '',
                    autonomyBehavior: '',
                    sliceOfLife: '',
                    adventureRules: '',
                    casualRules: '',
                    importantRules: [],
                    customRules: ''
                  },
                  proactive: {
                    timing: '',
                    frequency: '',
                    quietHours: '',
                    actionTypes: [],
                    triggers: '',
                    limits: '',
                    personality: '',
                    calendarAware: '',
                    inactivityResponse: '',
                    customDirective: ''
                  }
                });
              }
            }}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-sm font-mono text-xs transition-colors"
          >
            Reset Everything
          </button>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// INTIMACY CONTENT - Complete Implementation (18+ Only)
// ============================================================================


export default DirectiveResponsesContent;
