import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const PsychologyContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('psychology', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // MBTI Data with full descriptions and cognitive functions
  const mbtiTypes = {
    // Analysts (NT) - Purple
    'INTJ': {
      name: 'Architect',
      desc: 'Strategic, independent, determined visionary',
      group: 'Analysts',
      color: 'purple',
      letters: { I: 'Introverted', N: 'Intuitive', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Ni (Introverted Intuition)', 'Te (Extraverted Thinking)', 'Fi (Introverted Feeling)', 'Se (Extraverted Sensing)'],
      strengths: 'Strategic thinking, independence, determination',
      weaknesses: 'Can be arrogant, dismissive of emotions, overly critical'
    },
    'INTP': {
      name: 'Logician',
      desc: 'Innovative, curious, logical thinker',
      group: 'Analysts',
      color: 'purple',
      letters: { I: 'Introverted', N: 'Intuitive', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Ti (Introverted Thinking)', 'Ne (Extraverted Intuition)', 'Si (Introverted Sensing)', 'Fe (Extraverted Feeling)'],
      strengths: 'Analytical, objective, imaginative',
      weaknesses: 'Can be insensitive, absent-minded, condescending'
    },
    'ENTJ': {
      name: 'Commander',
      desc: 'Bold, decisive, natural-born leader',
      group: 'Analysts',
      color: 'purple',
      letters: { E: 'Extraverted', N: 'Intuitive', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Te (Extraverted Thinking)', 'Ni (Introverted Intuition)', 'Se (Extraverted Sensing)', 'Fi (Introverted Feeling)'],
      strengths: 'Efficient, energetic, self-confident, strong-willed',
      weaknesses: 'Can be stubborn, dominant, intolerant, impatient'
    },
    'ENTP': {
      name: 'Debater',
      desc: 'Smart, curious, intellectual explorer',
      group: 'Analysts',
      color: 'purple',
      letters: { E: 'Extraverted', N: 'Intuitive', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Ne (Extraverted Intuition)', 'Ti (Introverted Thinking)', 'Fe (Extraverted Feeling)', 'Si (Introverted Sensing)'],
      strengths: 'Quick thinking, charismatic, knowledgeable',
      weaknesses: 'Can be argumentative, insensitive, unfocused'
    },
    // Diplomats (NF) - Green
    'INFJ': {
      name: 'Advocate',
      desc: 'Idealistic, principled, compassionate guide',
      group: 'Diplomats',
      color: 'green',
      letters: { I: 'Introverted', N: 'Intuitive', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Ni (Introverted Intuition)', 'Fe (Extraverted Feeling)', 'Ti (Introverted Thinking)', 'Se (Extraverted Sensing)'],
      strengths: 'Creative, insightful, principled, passionate',
      weaknesses: 'Can be perfectionistic, overly private, sensitive to criticism'
    },
    'INFP': {
      name: 'Mediator',
      desc: 'Poetic, kind, altruistic dreamer',
      group: 'Diplomats',
      color: 'green',
      letters: { I: 'Introverted', N: 'Intuitive', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Fi (Introverted Feeling)', 'Ne (Extraverted Intuition)', 'Si (Introverted Sensing)', 'Te (Extraverted Thinking)'],
      strengths: 'Empathetic, creative, passionate, idealistic',
      weaknesses: 'Can be impractical, self-isolating, overly idealistic'
    },
    'ENFJ': {
      name: 'Protagonist',
      desc: 'Charismatic, inspiring, natural mentor',
      group: 'Diplomats',
      color: 'green',
      letters: { E: 'Extraverted', N: 'Intuitive', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Fe (Extraverted Feeling)', 'Ni (Introverted Intuition)', 'Se (Extraverted Sensing)', 'Ti (Introverted Thinking)'],
      strengths: 'Charismatic, reliable, natural leader, altruistic',
      weaknesses: 'Can be overly idealistic, too selfless, condescending'
    },
    'ENFP': {
      name: 'Campaigner',
      desc: 'Enthusiastic, creative, free spirit',
      group: 'Diplomats',
      color: 'green',
      letters: { E: 'Extraverted', N: 'Intuitive', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Ne (Extraverted Intuition)', 'Fi (Introverted Feeling)', 'Te (Extraverted Thinking)', 'Si (Introverted Sensing)'],
      strengths: 'Curious, enthusiastic, good communicator, friendly',
      weaknesses: 'Can be unfocused, disorganized, overly accommodating'
    },
    // Sentinels (SJ) - Blue
    'ISTJ': {
      name: 'Logistician',
      desc: 'Practical, reliable, dutiful organizer',
      group: 'Sentinels',
      color: 'blue',
      letters: { I: 'Introverted', S: 'Sensing', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Si (Introverted Sensing)', 'Te (Extraverted Thinking)', 'Fi (Introverted Feeling)', 'Ne (Extraverted Intuition)'],
      strengths: 'Honest, responsible, calm, practical',
      weaknesses: 'Can be stubborn, insensitive, judgmental'
    },
    'ISFJ': {
      name: 'Defender',
      desc: 'Warm, dedicated, protective caretaker',
      group: 'Sentinels',
      color: 'blue',
      letters: { I: 'Introverted', S: 'Sensing', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Si (Introverted Sensing)', 'Fe (Extraverted Feeling)', 'Ti (Introverted Thinking)', 'Ne (Extraverted Intuition)'],
      strengths: 'Supportive, reliable, patient, loyal',
      weaknesses: 'Can be overworked, reluctant to change, too humble'
    },
    'ESTJ': {
      name: 'Executive',
      desc: 'Organized, logical, assertive manager',
      group: 'Sentinels',
      color: 'blue',
      letters: { E: 'Extraverted', S: 'Sensing', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Te (Extraverted Thinking)', 'Si (Introverted Sensing)', 'Ne (Extraverted Intuition)', 'Fi (Introverted Feeling)'],
      strengths: 'Organized, dedicated, strong-willed, direct',
      weaknesses: 'Can be inflexible, stubborn, judgmental'
    },
    'ESFJ': {
      name: 'Consul',
      desc: 'Caring, social, community-oriented helper',
      group: 'Sentinels',
      color: 'blue',
      letters: { E: 'Extraverted', S: 'Sensing', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Fe (Extraverted Feeling)', 'Si (Introverted Sensing)', 'Ne (Extraverted Intuition)', 'Ti (Introverted Thinking)'],
      strengths: 'Caring, sociable, loyal, warm',
      weaknesses: 'Can be needy, approval-seeking, inflexible'
    },
    // Explorers (SP) - Yellow
    'ISTP': {
      name: 'Virtuoso',
      desc: 'Bold, practical, hands-on experimenter',
      group: 'Explorers',
      color: 'yellow',
      letters: { I: 'Introverted', S: 'Sensing', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Ti (Introverted Thinking)', 'Se (Extraverted Sensing)', 'Ni (Introverted Intuition)', 'Fe (Extraverted Feeling)'],
      strengths: 'Optimistic, creative, practical, spontaneous',
      weaknesses: 'Can be stubborn, insensitive, private, risky'
    },
    'ISFP': {
      name: 'Adventurer',
      desc: 'Flexible, charming, artistic soul',
      group: 'Explorers',
      color: 'yellow',
      letters: { I: 'Introverted', S: 'Sensing', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Fi (Introverted Feeling)', 'Se (Extraverted Sensing)', 'Ni (Introverted Intuition)', 'Te (Extraverted Thinking)'],
      strengths: 'Charming, artistic, imaginative, passionate',
      weaknesses: 'Can be overly competitive, unpredictable, easily stressed'
    },
    'ESTP': {
      name: 'Entrepreneur',
      desc: 'Energetic, perceptive, risk-taking doer',
      group: 'Explorers',
      color: 'yellow',
      letters: { E: 'Extraverted', S: 'Sensing', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Se (Extraverted Sensing)', 'Ti (Introverted Thinking)', 'Fe (Extraverted Feeling)', 'Ni (Introverted Intuition)'],
      strengths: 'Bold, rational, practical, perceptive',
      weaknesses: 'Can be insensitive, impatient, risk-prone, defiant'
    },
    'ESFP': {
      name: 'Entertainer',
      desc: 'Spontaneous, energetic, life of the party',
      group: 'Explorers',
      color: 'yellow',
      letters: { E: 'Extraverted', S: 'Sensing', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Se (Extraverted Sensing)', 'Fi (Introverted Feeling)', 'Te (Extraverted Thinking)', 'Ni (Introverted Intuition)'],
      strengths: 'Bold, original, aesthetic, showman, practical',
      weaknesses: 'Can be sensitive, unfocused, conflict-averse, easily bored'
    }
  };

  const getGroupColor = (group) => {
    const colors = {
      'Analysts': 'purple',
      'Diplomats': 'green',
      'Sentinels': 'blue',
      'Explorers': 'amber'
    };
    return colors[group] || 'gray';
  };

  const selectedMbti = data.framework.mbtiType ? mbtiTypes[data.framework.mbtiType] : null;

  const sections = {
    0: ( // Personality Framework
      <div className="space-y-6">
        {/* MBTI Section */}
        <div className="space-y-3">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">MBTI Type (Myers-Briggs Type Indicator)</label>
          <select
            value={data.framework.mbtiType || ''}
            onChange={(e) => update('framework', 'mbtiType', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select MBTI Type --</option>

            <optgroup label="🟣 Analysts (NT) — Rational, Strategic">
              <option value="INTJ">INTJ — Architect — Strategic visionary</option>
              <option value="INTP">INTP — Logician — Logical thinker</option>
              <option value="ENTJ">ENTJ — Commander — Natural leader</option>
              <option value="ENTP">ENTP — Debater — Intellectual explorer</option>
            </optgroup>

            <optgroup label="🟢 Diplomats (NF) — Empathetic, Idealistic">
              <option value="INFJ">INFJ — Advocate — Compassionate guide</option>
              <option value="INFP">INFP — Mediator — Altruistic dreamer</option>
              <option value="ENFJ">ENFJ — Protagonist — Inspiring mentor</option>
              <option value="ENFP">ENFP — Campaigner — Creative free spirit</option>
            </optgroup>

            <optgroup label="🔵 Sentinels (SJ) — Practical, Reliable">
              <option value="ISTJ">ISTJ — Logistician — Dutiful organizer</option>
              <option value="ISFJ">ISFJ — Defender — Protective caretaker</option>
              <option value="ESTJ">ESTJ — Executive — Assertive manager</option>
              <option value="ESFJ">ESFJ — Consul — Community helper</option>
            </optgroup>

            <optgroup label="🟡 Explorers (SP) — Spontaneous, Energetic">
              <option value="ISTP">ISTP — Virtuoso — Hands-on experimenter</option>
              <option value="ISFP">ISFP — Adventurer — Artistic soul</option>
              <option value="ESTP">ESTP — Entrepreneur — Risk-taking doer</option>
              <option value="ESFP">ESFP — Entertainer — Life of the party</option>
            </optgroup>
          </select>

          {/* MBTI Details Card */}
          {selectedMbti && (
            <div className={`mt-3 border-2 rounded-sm overflow-hidden ${
              selectedMbti.color === 'purple' ? 'border-purple-300 bg-purple-50' :
              selectedMbti.color === 'green' ? 'border-green-300 bg-green-50' :
              selectedMbti.color === 'blue' ? 'border-blue-300 bg-blue-50' :
              'border-amber-300 bg-amber-50'
            }`}>
              {/* Header */}
              <div className={`px-4 py-2 ${
                selectedMbti.color === 'purple' ? 'bg-purple-200' :
                selectedMbti.color === 'green' ? 'bg-green-200' :
                selectedMbti.color === 'blue' ? 'bg-blue-200' :
                'bg-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-lg font-bold">{data.framework.mbtiType}</span>
                    <span className="mx-2">—</span>
                    <span className="font-serif text-lg">{selectedMbti.name}</span>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded ${
                    selectedMbti.color === 'purple' ? 'bg-purple-300 text-purple-900' :
                    selectedMbti.color === 'green' ? 'bg-green-300 text-green-900' :
                    selectedMbti.color === 'blue' ? 'bg-blue-300 text-blue-900' :
                    'bg-amber-300 text-amber-900'
                  }`}>{selectedMbti.group}</span>
                </div>
                <p className="font-mono text-sm mt-1 opacity-80">{selectedMbti.desc}</p>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Letter Breakdown */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-2">Letter Breakdown</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(selectedMbti.letters).map(([letter, meaning]) => (
                      <div key={letter} className="text-center p-2 bg-white rounded border border-gray-200">
                        <div className="font-mono text-lg font-bold">{letter}</div>
                        <div className="font-mono text-[9px] text-gray-500">{meaning}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cognitive Stack */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-2">Cognitive Function Stack</h4>
                  <div className="space-y-1">
                    {selectedMbti.cognitiveStack.map((func, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                          i === 0 ? 'bg-gray-900 text-white' :
                          i === 1 ? 'bg-gray-600 text-white' :
                          i === 2 ? 'bg-gray-400 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>{i + 1}</span>
                        <span className="font-mono text-sm">{func}</span>
                        <span className="font-mono text-[9px] text-gray-400">
                          {i === 0 ? '(Dominant)' : i === 1 ? '(Auxiliary)' : i === 2 ? '(Tertiary)' : '(Inferior)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-green-600 mb-1">✓ Strengths</h4>
                    <p className="font-mono text-xs text-gray-600">{selectedMbti.strengths}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-red-600 mb-1">✗ Weaknesses</h4>
                    <p className="font-mono text-xs text-gray-600">{selectedMbti.weaknesses}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enneagram Section - Complete Rewrite */}
        <div className="space-y-4 mt-6">
          {/* Enneagram Header with Explanation */}
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
            <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">✦ ENNEAGRAM</h3>
            <p className="font-mono text-xs text-amber-800 leading-relaxed">
              O Enneagram é um sistema de 9 tipos de personalidade baseado em <strong>motivações centrais</strong>, não comportamentos.
              Cada tipo tem um <strong>medo básico</strong> e um <strong>desejo básico</strong> que guiam suas ações.
              Os tipos são organizados em 3 centros: <span className="text-red-600 font-bold">Corpo/Instinto</span> (raiva),
              <span className="text-emerald-600 font-bold"> Coração</span> (vergonha), e <span className="text-blue-600 font-bold">Cabeça</span> (medo).
            </p>
          </div>

          {/* Core Type Selection */}
          <div>
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
              Core Type — Qual é a motivação central do seu personagem?
            </label>
            <select
              value={data.framework.enneagramType || ''}
              onChange={(e) => {
                const newType = e.target.value;
                updateData('psychology', {
                  ...data,
                  framework: {
                    ...data.framework,
                    enneagramType: newType,
                    enneagramWing: '' // Reset wing when type changes
                  }
                });
              }}
              className="w-full bg-white border-2 border-gray-300 rounded-sm py-3 px-3 font-mono text-sm text-gray-800 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="">-- Selecione o Tipo Principal --</option>
              <optgroup label="🔴 CORPO/INSTINTO — Relacionados à raiva e autonomia">
                <option value="8">Tipo 8 — O Desafiador — Quer estar no controle e ser forte</option>
                <option value="9">Tipo 9 — O Pacificador — Quer paz interior e harmonia</option>
                <option value="1">Tipo 1 — O Reformador — Quer ser correto e melhorar tudo</option>
              </optgroup>
              <optgroup label="💚 CORAÇÃO — Relacionados à vergonha e identidade">
                <option value="2">Tipo 2 — O Ajudante — Quer ser amado e necessário</option>
                <option value="3">Tipo 3 — O Realizador — Quer ser valioso e bem-sucedido</option>
                <option value="4">Tipo 4 — O Individualista — Quer ser único e autêntico</option>
              </optgroup>
              <optgroup label="🔵 CABEÇA — Relacionados ao medo e segurança">
                <option value="5">Tipo 5 — O Investigador — Quer ser capaz e entender tudo</option>
                <option value="6">Tipo 6 — O Leal — Quer segurança e apoio</option>
                <option value="7">Tipo 7 — O Entusiasta — Quer ser livre e feliz</option>
              </optgroup>
            </select>
          </div>

          {/* Type Details Card - Only shows when type is selected */}
          {data.framework.enneagramType && (
            <div className={`border-2 rounded-sm overflow-hidden ${
              ['8','9','1'].includes(data.framework.enneagramType) ? 'border-red-300' :
              ['2','3','4'].includes(data.framework.enneagramType) ? 'border-emerald-300' :
              'border-blue-300'
            }`}>
              {/* Dynamic Header based on type */}
              <div className={`px-4 py-3 ${
                ['8','9','1'].includes(data.framework.enneagramType) ? 'bg-red-100' :
                ['2','3','4'].includes(data.framework.enneagramType) ? 'bg-emerald-100' :
                'bg-blue-100'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-mono text-2xl font-bold">Tipo {data.framework.enneagramType}</span>
                    <span className="mx-2">—</span>
                    <span className="font-serif text-lg">
                      {data.framework.enneagramType === '1' && 'O Reformador'}
                      {data.framework.enneagramType === '2' && 'O Ajudante'}
                      {data.framework.enneagramType === '3' && 'O Realizador'}
                      {data.framework.enneagramType === '4' && 'O Individualista'}
                      {data.framework.enneagramType === '5' && 'O Investigador'}
                      {data.framework.enneagramType === '6' && 'O Leal'}
                      {data.framework.enneagramType === '7' && 'O Entusiasta'}
                      {data.framework.enneagramType === '8' && 'O Desafiador'}
                      {data.framework.enneagramType === '9' && 'O Pacificador'}
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded ${
                    ['8','9','1'].includes(data.framework.enneagramType) ? 'bg-red-200 text-red-800' :
                    ['2','3','4'].includes(data.framework.enneagramType) ? 'bg-emerald-200 text-emerald-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {['8','9','1'].includes(data.framework.enneagramType) && '🔴 Centro Corporal'}
                    {['2','3','4'].includes(data.framework.enneagramType) && '💚 Centro Emocional'}
                    {['5','6','7'].includes(data.framework.enneagramType) && '🔵 Centro Mental'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 bg-white">
                {/* Type-specific content */}
                {data.framework.enneagramType === '1' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Principiado, propositivo, autocontrolado, perfeccionista</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ser corrupto, mau ou defeituoso</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ser bom, ter integridade, ser equilibrado</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Sábio, realista, nobre, heroico moralmente</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Ordenado, moralista, inflexível, crítico</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Obsessivo, contraditório, punitivo</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '2' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Generoso, demonstrativo, agradável, possessivo</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ser indesejado, indigno de amor</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Sentir-se amado e querido</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Altruísta, amoroso incondicionalmente</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Agradador, possessivo, intrusivo</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Manipulador, coercitivo, vitimista</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '3' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Adaptável, excelente, ambicioso, consciente da imagem</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ser sem valor ou sem sucesso</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Sentir-se valioso e admirado</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Autêntico, modesto, inspirador</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Competitivo, narcisista, workaholic</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Enganador, oportunista, vingativo</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '4' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Expressivo, dramático, introspectivo, temperamental</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Não ter identidade ou significado pessoal</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Encontrar a si mesmo e sua significância</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Criativo, inspirado, transformador</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Melancólico, invejoso, autoindulgente</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Depressivo, alienado, autodestrutivo</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '5' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Perceptivo, inovador, reservado, isolado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ser inútil, incapaz ou incompetente</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ser capaz e competente</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Visionário, pioneiro, compreensivo</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Desapegado, cerebral, provocativo</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Niilista, excêntrico, fóbico</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '6' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Engajado, responsável, ansioso, desconfiado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ficar sem apoio ou orientação</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ter segurança e suporte</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Confiante, corajoso, líder</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Cauteloso, defensivo, reclamão</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Paranoico, dependente, autodestrutivo</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '7' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Espontâneo, versátil, disperso, aquisitivo</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ser privado ou preso na dor</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ser satisfeito e contente</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Grato, presente, alegre, realizado</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Excessivo, disperso, impulsivo</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Escapista, maníaco, fora de controle</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '8' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Autoconfiante, decisivo, determinado, confrontador</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Ser machucado ou controlado por outros</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Proteger-se e controlar seu próprio destino</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Magnânimo, heroico, protetor</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Dominador, combativo, intimidador</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Implacável, ditatorial, destrutivo</p>
                      </div>
                    </div>
                  </>
                )}

                {data.framework.enneagramType === '9' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Receptivo, tranquilizador, complacente, resignado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Basic Fear</h4>
                        <p className="font-mono text-xs">Perda, fragmentação, separação</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ter paz interior e estabilidade</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Autônomo, sereno, conectado</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Complacente, teimoso, apaziguador</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Dissociado, negligente, entorpecido</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Wing Selection - Only shows when type is selected */}
          {data.framework.enneagramType && (
            <div>
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                Wing — A "asa" adiciona nuances ao tipo principal
              </label>
              <p className="font-mono text-[10px] text-gray-400 mb-2">
                Cada tipo tem duas wings possíveis (os números adjacentes). A wing influencia como o tipo principal se expressa.
              </p>
              <select
                value={data.framework.enneagramWing || ''}
                onChange={(e) => update('framework', 'enneagramWing', e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-sm py-3 px-3 font-mono text-sm text-gray-800 focus:border-amber-500 focus:outline-none cursor-pointer"
              >
                <option value="">-- Selecione a Wing --</option>
                {data.framework.enneagramType === '1' && (
                  <>
                    <option value="1w9">1w9 — O Idealista — Mais introvertido, filosófico, reservado</option>
                    <option value="1w2">1w2 — O Advogado — Mais extrovertido, empático, prestativo</option>
                  </>
                )}
                {data.framework.enneagramType === '2' && (
                  <>
                    <option value="2w1">2w1 — O Servidor — Mais idealista, objetivo, controlado</option>
                    <option value="2w3">2w3 — O Anfitrião — Mais ambicioso, charmoso, adaptável</option>
                  </>
                )}
                {data.framework.enneagramType === '3' && (
                  <>
                    <option value="3w2">3w2 — O Encantador — Mais sociável, generoso, sedutor</option>
                    <option value="3w4">3w4 — O Profissional — Mais introvertido, artístico, sério</option>
                  </>
                )}
                {data.framework.enneagramType === '4' && (
                  <>
                    <option value="4w3">4w3 — O Aristocrata — Mais ambicioso, sociável, competitivo</option>
                    <option value="4w5">4w5 — O Boêmio — Mais introvertido, intelectual, não-convencional</option>
                  </>
                )}
                {data.framework.enneagramType === '5' && (
                  <>
                    <option value="5w4">5w4 — O Iconoclasta — Mais criativo, sensível, introspectivo</option>
                    <option value="5w6">5w6 — O Solucionador — Mais cooperativo, leal, cético</option>
                  </>
                )}
                {data.framework.enneagramType === '6' && (
                  <>
                    <option value="6w5">6w5 — O Defensor — Mais introvertido, intelectual, independente</option>
                    <option value="6w7">6w7 — O Camarada — Mais extrovertido, brincalhão, divertido</option>
                  </>
                )}
                {data.framework.enneagramType === '7' && (
                  <>
                    <option value="7w6">7w6 — O Animador — Mais leal, responsável, ansioso</option>
                    <option value="7w8">7w8 — O Realista — Mais assertivo, competitivo, materialista</option>
                  </>
                )}
                {data.framework.enneagramType === '8' && (
                  <>
                    <option value="8w7">8w7 — O Maverick — Mais extrovertido, ambicioso, impulsivo</option>
                    <option value="8w9">8w9 — O Urso — Mais receptivo, paciente, gentil</option>
                  </>
                )}
                {data.framework.enneagramType === '9' && (
                  <>
                    <option value="9w8">9w8 — O Árbitro — Mais assertivo, confiante, teimoso</option>
                    <option value="9w1">9w1 — O Sonhador — Mais idealista, ordenado, crítico</option>
                  </>
                )}
              </select>

              {/* Wing Description */}
              {data.framework.enneagramWing && (
                <div className={`mt-3 p-3 rounded border-2 border-dashed ${
                  ['8','9','1'].includes(data.framework.enneagramType) ? 'border-red-300 bg-red-50' :
                  ['2','3','4'].includes(data.framework.enneagramType) ? 'border-emerald-300 bg-emerald-50' :
                  'border-blue-300 bg-blue-50'
                }`}>
                  <p className="font-mono text-sm">
                    <span className="font-bold">{data.framework.enneagramWing}</span> selecionado
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Advanced Options */}
          {data.framework.enneagramType && (
            <details className="border border-gray-200 rounded-sm overflow-hidden">
              <summary className="px-4 py-3 bg-gray-100 cursor-pointer font-mono text-[11px] uppercase tracking-wider text-gray-600 hover:bg-gray-200">
                ▶ Opções Avançadas (Tritype, Instinto, Saúde)
              </summary>
              <div className="p-4 space-y-4 bg-white">
                {/* Tritype */}
                <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                    Tritype — Um tipo de cada centro
                  </label>
                  <p className="font-mono text-[10px] text-gray-400 mb-3">
                    O Tritype combina um tipo de cada centro (Corpo + Coração + Cabeça) para maior precisão.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-mono text-[9px] text-red-500 mb-1 block">🔴 Corpo</label>
                      <select
                        value={data.framework.tritypeBody || ''}
                        onChange={(e) => update('framework', 'tritypeBody', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                      >
                        <option value="">--</option>
                        <option value="8">8 - Desafiador</option>
                        <option value="9">9 - Pacificador</option>
                        <option value="1">1 - Reformador</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-emerald-500 mb-1 block">💚 Coração</label>
                      <select
                        value={data.framework.tritypeHeart || ''}
                        onChange={(e) => update('framework', 'tritypeHeart', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                      >
                        <option value="">--</option>
                        <option value="2">2 - Ajudante</option>
                        <option value="3">3 - Realizador</option>
                        <option value="4">4 - Individualista</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-blue-500 mb-1 block">🔵 Cabeça</label>
                      <select
                        value={data.framework.tritypeHead || ''}
                        onChange={(e) => update('framework', 'tritypeHead', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                      >
                        <option value="">--</option>
                        <option value="5">5 - Investigador</option>
                        <option value="6">6 - Leal</option>
                        <option value="7">7 - Entusiasta</option>
                      </select>
                    </div>
                  </div>
                  {data.framework.tritypeBody && data.framework.tritypeHeart && data.framework.tritypeHead && (
                    <p className="mt-3 font-mono text-sm text-center p-2 bg-amber-50 rounded border border-amber-200">
                      Tritype: <span className="font-bold text-lg">{data.framework.tritypeBody}-{data.framework.tritypeHeart}-{data.framework.tritypeHead}</span>
                    </p>
                  )}
                </div>

                {/* Instinctual Variant */}
                <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                    Variante Instintiva
                  </label>
                  <p className="font-mono text-[10px] text-gray-400 mb-3">
                    Os 3 instintos básicos: <strong>SP</strong> (autopreservação), <strong>SX</strong> (sexual/intensidade), <strong>SO</strong> (social).
                  </p>
                  <select
                    value={data.framework.instinctualVariant || ''}
                    onChange={(e) => update('framework', 'instinctualVariant', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                  >
                    <option value="">-- Selecione --</option>
                    <option value="sp/sx">SP/SX — Autopreservação primeiro, depois Sexual</option>
                    <option value="sp/so">SP/SO — Autopreservação primeiro, depois Social</option>
                    <option value="sx/sp">SX/SP — Sexual primeiro, depois Autopreservação</option>
                    <option value="sx/so">SX/SO — Sexual primeiro, depois Social</option>
                    <option value="so/sp">SO/SP — Social primeiro, depois Autopreservação</option>
                    <option value="so/sx">SO/SX — Social primeiro, depois Sexual</option>
                  </select>
                </div>

                {/* Health Level */}
                <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                    Nível de Saúde Atual (1 = Mais saudável, 9 = Menos saudável)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={data.framework.enneagramHealth || 5}
                    onChange={(e) => update('framework', 'enneagramHealth', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
                    <span className="text-green-600">1-3 Saudável</span>
                    <span className="text-amber-600">4-6 Médio</span>
                    <span className="text-red-600">7-9 Não-saudável</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className={`font-mono text-xl font-bold ${
                      (data.framework.enneagramHealth || 5) <= 3 ? 'text-green-600' :
                      (data.framework.enneagramHealth || 5) <= 6 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      Nível {data.framework.enneagramHealth || 5}
                    </span>
                  </div>
                </div>
              </div>
            </details>
          )}
        </div>

        {/* Temperament Section - Complete */}
        <div className="space-y-4 mt-6">
          {/* Temperament Header with Explanation */}
          <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
            <h3 className="font-mono text-sm font-bold text-orange-900 mb-2">✦ TEMPERAMENTO</h3>
            <p className="font-mono text-xs text-orange-800 leading-relaxed">
              Sistema clássico de 4 temperamentos baseado na teoria dos <strong>humores</strong> de Hipócrates.
              Cada temperamento tem características distintas baseadas em dois eixos:
              <strong> Extroversão vs Introversão</strong> e <strong>Orientação a Pessoas vs Tarefas</strong>.
            </p>
            {/* Visual Matrix */}
            <div className="mt-3 p-3 bg-white rounded border border-orange-200">
              <div className="grid grid-cols-3 gap-1 text-center font-mono text-[9px]">
                <div></div>
                <div className="text-orange-600 font-bold">↑ EXTROVERTIDO</div>
                <div></div>
                <div className="text-orange-600 font-bold">PESSOAS ←</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-yellow-100 p-1 rounded text-yellow-800">🌞 Sanguíneo</div>
                  <div className="bg-red-100 p-1 rounded text-red-800">🔥 Colérico</div>
                  <div className="bg-blue-100 p-1 rounded text-blue-800">💧 Fleumático</div>
                  <div className="bg-purple-100 p-1 rounded text-purple-800">🌍 Melancólico</div>
                </div>
                <div className="text-orange-600 font-bold">→ TAREFAS</div>
                <div></div>
                <div className="text-orange-600 font-bold">↓ INTROVERTIDO</div>
                <div></div>
              </div>
            </div>
          </div>

          {/* Temperament Selection */}
          <div>
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
              Temperamento Principal
            </label>
            <select
              value={data.framework.temperament || ''}
              onChange={(e) => update('framework', 'temperament', e.target.value)}
              className="w-full bg-white border-2 border-gray-300 rounded-sm py-3 px-3 font-mono text-sm text-gray-800 focus:border-orange-500 focus:outline-none cursor-pointer"
            >
              <option value="">-- Selecione o Temperamento --</option>
              <optgroup label="🎯 Temperamentos Puros">
                <option value="Sanguine">🌞 Sanguíneo — Otimista, social, energético, entusiasmado</option>
                <option value="Choleric">🔥 Colérico — Ambicioso, líder, decidido, orientado a resultados</option>
                <option value="Melancholic">🌍 Melancólico — Analítico, detalhista, perfeccionista, sensível</option>
                <option value="Phlegmatic">💧 Fleumático — Calmo, pacífico, consistente, diplomático</option>
              </optgroup>
              <optgroup label="🔀 Combinações (Primário-Secundário)">
                <option value="Sanguine-Choleric">🌞🔥 Sanguíneo-Colérico — Influente e orientado a resultados</option>
                <option value="Sanguine-Phlegmatic">🌞💧 Sanguíneo-Fleumático — Sociável mas estável e calmo</option>
                <option value="Choleric-Sanguine">🔥🌞 Colérico-Sanguíneo — Líder dinâmico e carismático</option>
                <option value="Choleric-Melancholic">🔥🌍 Colérico-Melancólico — Determinado e perfeccionista</option>
                <option value="Melancholic-Choleric">🌍🔥 Melancólico-Colérico — Analítico e assertivo</option>
                <option value="Melancholic-Phlegmatic">🌍💧 Melancólico-Fleumático — Pensativo e consistente</option>
                <option value="Phlegmatic-Sanguine">💧🌞 Fleumático-Sanguíneo — Estável e amigável</option>
                <option value="Phlegmatic-Melancholic">💧🌍 Fleumático-Melancólico — Paciente e metódico</option>
              </optgroup>
            </select>
          </div>

          {/* Temperament Details Card */}
          {data.framework.temperament && (
            <div className={`border-2 rounded-sm overflow-hidden ${
              data.framework.temperament.startsWith('Sanguine') ? 'border-yellow-300' :
              data.framework.temperament.startsWith('Choleric') ? 'border-red-300' :
              data.framework.temperament.startsWith('Melancholic') ? 'border-purple-300' :
              'border-blue-300'
            }`}>
              {/* Header */}
              <div className={`px-4 py-3 ${
                data.framework.temperament.startsWith('Sanguine') ? 'bg-yellow-100' :
                data.framework.temperament.startsWith('Choleric') ? 'bg-red-100' :
                data.framework.temperament.startsWith('Melancholic') ? 'bg-purple-100' :
                'bg-blue-100'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xl font-bold">
                    {data.framework.temperament === 'Sanguine' && '🌞 Sanguíneo'}
                    {data.framework.temperament === 'Choleric' && '🔥 Colérico'}
                    {data.framework.temperament === 'Melancholic' && '🌍 Melancólico'}
                    {data.framework.temperament === 'Phlegmatic' && '💧 Fleumático'}
                    {data.framework.temperament === 'Sanguine-Choleric' && '🌞🔥 Sanguíneo-Colérico'}
                    {data.framework.temperament === 'Sanguine-Phlegmatic' && '🌞💧 Sanguíneo-Fleumático'}
                    {data.framework.temperament === 'Choleric-Sanguine' && '🔥🌞 Colérico-Sanguíneo'}
                    {data.framework.temperament === 'Choleric-Melancholic' && '🔥🌍 Colérico-Melancólico'}
                    {data.framework.temperament === 'Melancholic-Choleric' && '🌍🔥 Melancólico-Colérico'}
                    {data.framework.temperament === 'Melancholic-Phlegmatic' && '🌍💧 Melancólico-Fleumático'}
                    {data.framework.temperament === 'Phlegmatic-Sanguine' && '💧🌞 Fleumático-Sanguíneo'}
                    {data.framework.temperament === 'Phlegmatic-Melancholic' && '💧🌍 Fleumático-Melancólico'}
                  </span>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded ${
                    data.framework.temperament.startsWith('Sanguine') ? 'bg-yellow-200 text-yellow-800' :
                    data.framework.temperament.startsWith('Choleric') ? 'bg-red-200 text-red-800' :
                    data.framework.temperament.startsWith('Melancholic') ? 'bg-purple-200 text-purple-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {(data.framework.temperament.startsWith('Sanguine') || data.framework.temperament.startsWith('Choleric')) ? 'Extrovertido' : 'Introvertido'}
                    {' • '}
                    {(data.framework.temperament.startsWith('Sanguine') || data.framework.temperament.startsWith('Phlegmatic') ||
                      data.framework.temperament === 'Choleric-Sanguine' || data.framework.temperament === 'Melancholic-Phlegmatic')
                      ? 'Pessoas' : 'Tarefas'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 bg-white">
                {/* Sanguine */}
                {data.framework.temperament === 'Sanguine' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Ar | <strong>Humor:</strong> Blood | <strong>Estação:</strong> Primavera
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Sanguíneo é a "alma da festa" - otimista, sociável e cheio de energia. São comunicadores naturais que adoram estar rodeados de pessoas e tendem a ver o lado positivo de tudo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Carismático, entusiasmado, comunicativo, adaptável, alegre, criativo</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Impulsivo, desorganizado, superficial, esquecido, exagerado, indisciplinado</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Vendas, relações públicas, entretenimento, ensino, marketing</p>
                    </div>
                  </>
                )}

                {/* Choleric */}
                {data.framework.temperament === 'Choleric' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Fire | <strong>Humor:</strong> Bile Amarela | <strong>Estação:</strong> Verão
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Colérico é o líder nato - ambicioso, determinado e orientado a resultados. São pessoas práticas que assumem o controle naturalmente e não têm medo de tomar decisões difíceis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Determinado, confiante, produtivo, decisivo, líder, independente</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Impaciente, dominador, irritável, insensível, workaholic, controlador</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Liderança, empreendedorismo, gestão, militar, política, direito</p>
                    </div>
                  </>
                )}

                {/* Melancholic */}
                {data.framework.temperament === 'Melancholic' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Terra | <strong>Humor:</strong> Bile Negra | <strong>Estação:</strong> Outono
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Melancólico é o pensador profundo - analítico, detalhista e perfeccionista. São pessoas sensíveis com rica vida interior que buscam significado e excelência em tudo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Analítico, criativo, leal, idealista, organizado, profundo</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Pessimista, crítico, rancoroso, inseguro, inflexível, difícil de agradar</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Artes, pesquisa, medicina, contabilidade, engenharia, escrita</p>
                    </div>
                  </>
                )}

                {/* Phlegmatic */}
                {data.framework.temperament === 'Phlegmatic' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Água | <strong>Humor:</strong> Fleuma | <strong>Estação:</strong> Inverno
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Fleumático é o pacificador - calmo, estável e diplomático. São pessoas confiáveis que mantêm a paz e funcionam bem sob pressão, preferindo harmonia a conflito.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Calmo, confiável, paciente, equilibrado, diplomático, bom ouvinte</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Passivo, indeciso, teimoso, desmotivado, resistente a mudanças, evasivo</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Diplomacia, recursos humanos, counseling, administração, suporte</p>
                    </div>
                  </>
                )}

                {/* Combinations */}
                {data.framework.temperament === 'Sanguine-Choleric' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-yellow-600 font-bold">sociabilidade e entusiasmo</span> do Sanguíneo com a <span className="text-red-600 font-bold">determinação e liderança</span> do Colérico. São líderes carismáticos que inspiram outros enquanto buscam resultados.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Influente, persuasivo, orientado a resultados, inspirador, pode ser impaciente e dominador quando frustrado.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Sanguine-Phlegmatic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-yellow-600 font-bold">alegria e sociabilidade</span> do Sanguíneo com a <span className="text-blue-600 font-bold">calma e estabilidade</span> do Fleumático. São pessoas amigáveis e fáceis de conviver, menos intensas que o Sanguíneo puro.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Amigável, estável, adaptável, agradável, pode evitar conflitos e ter dificuldade com disciplina.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Choleric-Sanguine' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-red-600 font-bold">ambição e assertividade</span> do Colérico com o <span className="text-yellow-600 font-bold">carisma e entusiasmo</span> do Sanguíneo. São líderes dinâmicos que motivam equipes enquanto mantêm foco nos objetivos.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Dinâmico, assertivo, carismático, competitivo, pode ser impulsivo e insensível às vezes.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Choleric-Melancholic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-red-600 font-bold">determinação e liderança</span> do Colérico com o <span className="text-purple-600 font-bold">perfeccionismo e análise</span> do Melancólico. São realizadores exigentes que buscam excelência em tudo.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Perfeccionista, determinado, exigente, focado, pode ser muito crítico e workaholic.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Melancholic-Choleric' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-purple-600 font-bold">profundidade analítica</span> do Melancólico com a <span className="text-red-600 font-bold">assertividade</span> do Colérico. São pensadores estratégicos que também sabem agir e liderar.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Estratégico, analítico, determinado, independente, pode ser frio e excessivamente crítico.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Melancholic-Phlegmatic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-purple-600 font-bold">profundidade e idealismo</span> do Melancólico com a <span className="text-blue-600 font-bold">calma e consistência</span> do Fleumático. São introvertidos pensativos, consistentes e leais.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Pensativo, consistente, leal, metódico, pode ser pessimista e resistente a mudanças.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Phlegmatic-Sanguine' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-blue-600 font-bold">estabilidade e paciência</span> do Fleumático com a <span className="text-yellow-600 font-bold">simpatia e humor</span> do Sanguíneo. São pessoas agradáveis que equilibram calma com sociabilidade.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Agradável, humorado, estável, não-ameaçador, pode ser indeciso e evitar responsabilidades.</p>
                    </div>
                  </>
                )}

                {data.framework.temperament === 'Phlegmatic-Melancholic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-blue-600 font-bold">calma e diplomacia</span> do Fleumático com a <span className="text-purple-600 font-bold">atenção aos detalhes</span> do Melancólico. São observadores pacientes e metódicos.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Metódico, paciente, observador, confiável, pode ser passivo e muito lento para agir.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <SectionHeader title="Big Five (OCEAN)" />

        {/* Big Five Explanation */}
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4 mb-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">✦ BIG FIVE (OCEAN)</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">
            O modelo dos <strong>Cinco Grandes Fatores</strong> é o sistema de personalidade mais aceito cientificamente.
            Cada fator existe em um <strong>espectro</strong> — não há "bom" ou "ruim", apenas diferentes tendências.
            Mova os controles para definir onde seu personagem se encontra em cada dimensão.
          </p>
        </div>

        {/* Openness */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">O — Openness</h4>
            <span className="font-mono text-xs text-gray-500">Abertura à Experiência</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede curiosidade intelectual, criatividade e preferência por novidade vs. tradição.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Convencional</span>
              <span>Inventivo</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveO}
              onChange={(e) => update('framework', 'bigFiveO', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-300 via-teal-200 to-teal-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveO <= 2 ? 'bg-gray-200 text-gray-700' :
                data.framework.bigFiveO <= 4 ? 'bg-gray-100 text-gray-600' :
                data.framework.bigFiveO === 5 ? 'bg-teal-100 text-teal-700' :
                data.framework.bigFiveO <= 7 ? 'bg-teal-200 text-teal-800' :
                'bg-teal-300 text-teal-900'
              }`}>
                {data.framework.bigFiveO === 1 && 'Muito Convencional'}
                {data.framework.bigFiveO === 2 && 'Convencional'}
                {data.framework.bigFiveO === 3 && 'Moderadamente Convencional'}
                {data.framework.bigFiveO === 4 && 'Levemente Convencional'}
                {data.framework.bigFiveO === 5 && 'Balanceado'}
                {data.framework.bigFiveO === 6 && 'Levemente Inventivo'}
                {data.framework.bigFiveO === 7 && 'Moderadamente Inventivo'}
                {data.framework.bigFiveO === 8 && 'Inventivo'}
                {data.framework.bigFiveO === 9 && 'Muito Inventivo'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveO <= 2 && '💡 Prefere fortemente o familiar, prático e concreto. Desconfia de ideias abstratas e mudanças.'}
              {data.framework.bigFiveO === 3 && '💡 Tendência a preferir rotina e tradição, mas aceita algumas novidades quando necessário.'}
              {data.framework.bigFiveO === 4 && '💡 Ligeira preferência pelo convencional, mas não é fechado a novas experiências.'}
              {data.framework.bigFiveO === 5 && '💡 Equilibra tradição com abertura. Adapta-se conforme a situação.'}
              {data.framework.bigFiveO === 6 && '💡 Ligeira curiosidade por novas ideias, mas mantém pés no chão.'}
              {data.framework.bigFiveO === 7 && '💡 Aprecia criatividade e novidade. Gosta de explorar ideias e possibilidades.'}
              {data.framework.bigFiveO === 8 && '💡 Muito curioso e criativo. Busca ativamente novas experiências e perspectivas.'}
              {data.framework.bigFiveO === 9 && '💡 Extremamente imaginativo e aberto. Vive no mundo das ideias e possibilidades.'}
            </p>
          </div>
        </div>

        {/* Conscientiousness */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">C — Conscientiousness</h4>
            <span className="font-mono text-xs text-gray-500">Conscienciosidade</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede organização, disciplina, confiabilidade e orientação a metas vs. espontaneidade.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Espontâneo</span>
              <span>Organizado</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveC}
              onChange={(e) => update('framework', 'bigFiveC', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-amber-300 via-amber-100 to-indigo-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveC <= 2 ? 'bg-amber-200 text-amber-800' :
                data.framework.bigFiveC <= 4 ? 'bg-amber-100 text-amber-700' :
                data.framework.bigFiveC === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveC <= 7 ? 'bg-indigo-100 text-indigo-700' :
                'bg-indigo-200 text-indigo-800'
              }`}>
                {data.framework.bigFiveC === 1 && 'Muito Espontâneo'}
                {data.framework.bigFiveC === 2 && 'Espontâneo'}
                {data.framework.bigFiveC === 3 && 'Moderadamente Espontâneo'}
                {data.framework.bigFiveC === 4 && 'Levemente Espontâneo'}
                {data.framework.bigFiveC === 5 && 'Balanceado'}
                {data.framework.bigFiveC === 6 && 'Levemente Organizado'}
                {data.framework.bigFiveC === 7 && 'Moderadamente Organizado'}
                {data.framework.bigFiveC === 8 && 'Organizado'}
                {data.framework.bigFiveC === 9 && 'Muito Organizado'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveC <= 2 && '💡 Vive o momento, improvisa, despreocupado com planejamento. Pode parecer irresponsável.'}
              {data.framework.bigFiveC === 3 && '💡 Prefere flexibilidade a estrutura. Planeja pouco, adapta-se conforme necessário.'}
              {data.framework.bigFiveC === 4 && '💡 Ligeiramente desorganizado, mas consegue se estruturar quando precisa.'}
              {data.framework.bigFiveC === 5 && '💡 Equilibra planejamento com flexibilidade. Nem rígido nem caótico.'}
              {data.framework.bigFiveC === 6 && '💡 Tendência a organização, mas não é inflexível. Gosta de ter um plano.'}
              {data.framework.bigFiveC === 7 && '💡 Disciplinado e confiável. Cumpre prazos e mantém compromissos.'}
              {data.framework.bigFiveC === 8 && '💡 Muito organizado e focado em metas. Trabalha duro para alcançar objetivos.'}
              {data.framework.bigFiveC === 9 && '💡 Extremamente metódico e perfeccionista. Pode ser workaholic ou inflexível.'}
            </p>
          </div>
        </div>

        {/* Extraversion */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">E — Extraversion</h4>
            <span className="font-mono text-xs text-gray-500">Extroversão</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede sociabilidade, assertividade e busca por estímulos externos vs. reflexão interna.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Introvertido</span>
              <span>Extrovertido</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveE}
              onChange={(e) => update('framework', 'bigFiveE', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-slate-400 via-slate-200 to-yellow-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveE <= 2 ? 'bg-slate-200 text-slate-700' :
                data.framework.bigFiveE <= 4 ? 'bg-slate-100 text-slate-600' :
                data.framework.bigFiveE === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveE <= 7 ? 'bg-yellow-100 text-yellow-700' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {data.framework.bigFiveE === 1 && 'Muito Introvertido'}
                {data.framework.bigFiveE === 2 && 'Introvertido'}
                {data.framework.bigFiveE === 3 && 'Moderadamente Introvertido'}
                {data.framework.bigFiveE === 4 && 'Levemente Introvertido'}
                {data.framework.bigFiveE === 5 && 'Ambivertido'}
                {data.framework.bigFiveE === 6 && 'Levemente Extrovertido'}
                {data.framework.bigFiveE === 7 && 'Moderadamente Extrovertido'}
                {data.framework.bigFiveE === 8 && 'Extrovertido'}
                {data.framework.bigFiveE === 9 && 'Muito Extrovertido'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveE <= 2 && '💡 Muito reservado e introspectivo. Precisa de muita solidão para recarregar. Evita holofotes.'}
              {data.framework.bigFiveE === 3 && '💡 Prefere pequenos grupos ou interações um-a-um. Esgota-se em ambientes sociais.'}
              {data.framework.bigFiveE === 4 && '💡 Ligeiramente reservado, mas sociável quando necessário. Prefere observar.'}
              {data.framework.bigFiveE === 5 && '💡 Ambivertido - equilibra tempo social com tempo sozinho. Adapta-se ao contexto.'}
              {data.framework.bigFiveE === 6 && '💡 Geralmente sociável, mas valoriza momentos de quietude. Confortável em grupos.'}
              {data.framework.bigFiveE === 7 && '💡 Gosta de estar com pessoas. Energizado por interações sociais. Comunicativo.'}
              {data.framework.bigFiveE === 8 && '💡 Muito sociável e assertivo. Busca ativamente interações. Entediado sozinho.'}
              {data.framework.bigFiveE === 9 && '💡 Extremamente extrovertido. Alma da festa. Precisa de estímulo social constante.'}
            </p>
          </div>
        </div>

        {/* Agreeableness */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">A — Agreeableness</h4>
            <span className="font-mono text-xs text-gray-500">Amabilidade</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede cooperação, empatia e harmonia social vs. ceticismo, competitividade e assertividade.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Desafiador</span>
              <span>Cooperativo</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveA}
              onChange={(e) => update('framework', 'bigFiveA', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-red-400 via-orange-200 to-green-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveA <= 2 ? 'bg-red-200 text-red-800' :
                data.framework.bigFiveA <= 4 ? 'bg-orange-100 text-orange-700' :
                data.framework.bigFiveA === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveA <= 7 ? 'bg-green-100 text-green-700' :
                'bg-green-200 text-green-800'
              }`}>
                {data.framework.bigFiveA === 1 && 'Muito Desafiador'}
                {data.framework.bigFiveA === 2 && 'Desafiador'}
                {data.framework.bigFiveA === 3 && 'Moderadamente Desafiador'}
                {data.framework.bigFiveA === 4 && 'Levemente Desafiador'}
                {data.framework.bigFiveA === 5 && 'Balanceado'}
                {data.framework.bigFiveA === 6 && 'Levemente Cooperativo'}
                {data.framework.bigFiveA === 7 && 'Moderadamente Cooperativo'}
                {data.framework.bigFiveA === 8 && 'Cooperativo'}
                {data.framework.bigFiveA === 9 && 'Muito Cooperativo'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveA <= 2 && '💡 Muito cético e competitivo. Questiona motivações alheias. Pode ser visto como hostil.'}
              {data.framework.bigFiveA === 3 && '💡 Direto e questionador. Não tem medo de discordar. Prefere verdade a harmonia.'}
              {data.framework.bigFiveA === 4 && '💡 Ligeiramente cético. Coopera, mas mantém olhar crítico. Assertivo quando necessário.'}
              {data.framework.bigFiveA === 5 && '💡 Equilibra assertividade com cooperação. Nem passivo nem agressivo.'}
              {data.framework.bigFiveA === 6 && '💡 Geralmente cooperativo e amigável. Busca harmonia, mas defende suas posições.'}
              {data.framework.bigFiveA === 7 && '💡 Empático e prestativo. Prioriza necessidades dos outros. Evita conflitos.'}
              {data.framework.bigFiveA === 8 && '💡 Muito altruísta e confiante. Acredita no melhor das pessoas. Harmonioso.'}
              {data.framework.bigFiveA === 9 && '💡 Extremamente empático e agradável. Pode ter dificuldade em dizer não.'}
            </p>
          </div>
        </div>

        {/* Neuroticism */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">N — Neuroticism</h4>
            <span className="font-mono text-xs text-gray-500">Neuroticismo / Estabilidade Emocional</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede estabilidade emocional e resiliência vs. sensibilidade, ansiedade e reatividade emocional.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Estável</span>
              <span>Sensível</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveN}
              onChange={(e) => update('framework', 'bigFiveN', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-400 via-blue-100 to-pink-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveN <= 2 ? 'bg-blue-200 text-blue-800' :
                data.framework.bigFiveN <= 4 ? 'bg-blue-100 text-blue-700' :
                data.framework.bigFiveN === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveN <= 7 ? 'bg-pink-100 text-pink-700' :
                'bg-pink-200 text-pink-800'
              }`}>
                {data.framework.bigFiveN === 1 && 'Muito Estável'}
                {data.framework.bigFiveN === 2 && 'Estável'}
                {data.framework.bigFiveN === 3 && 'Moderadamente Estável'}
                {data.framework.bigFiveN === 4 && 'Levemente Estável'}
                {data.framework.bigFiveN === 5 && 'Balanceado'}
                {data.framework.bigFiveN === 6 && 'Levemente Sensível'}
                {data.framework.bigFiveN === 7 && 'Moderadamente Sensível'}
                {data.framework.bigFiveN === 8 && 'Sensível'}
                {data.framework.bigFiveN === 9 && 'Muito Sensível'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveN <= 2 && '💡 Extremamente calmo e resiliente. Raramente se abala. Pode parecer frio ou distante.'}
              {data.framework.bigFiveN === 3 && '💡 Emocionalmente estável na maioria das situações. Recupera-se rápido de estresse.'}
              {data.framework.bigFiveN === 4 && '💡 Geralmente calmo, mas pode reagir em situações de alto estresse.'}
              {data.framework.bigFiveN === 5 && '💡 Equilíbrio entre estabilidade e sensibilidade. Reage proporcionalmente.'}
              {data.framework.bigFiveN === 6 && '💡 Ligeiramente reativo emocionalmente. Sente as coisas com certa intensidade.'}
              {data.framework.bigFiveN === 7 && '💡 Sensível e reativo. Experimenta emoções intensamente. Pode preocupar-se demais.'}
              {data.framework.bigFiveN === 8 && '💡 Muito sensível e ansioso. Emoções fortes e frequentes. Vulnerável a estresse.'}
              {data.framework.bigFiveN === 9 && '💡 Extremamente reativo emocionalmente. Propenso a ansiedade, tristeza e instabilidade.'}
            </p>
          </div>
        </div>

        {/* Big Five Summary Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-3">📊 Resumo do Perfil OCEAN</h4>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className={`p-2 rounded ${data.framework.bigFiveO >= 6 ? 'bg-teal-100' : data.framework.bigFiveO <= 4 ? 'bg-gray-200' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">O</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveO <= 4 ? 'Conv.' : data.framework.bigFiveO >= 6 ? 'Invent.' : 'Med.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveC >= 6 ? 'bg-indigo-100' : data.framework.bigFiveC <= 4 ? 'bg-amber-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">C</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveC <= 4 ? 'Espont.' : data.framework.bigFiveC >= 6 ? 'Organ.' : 'Med.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveE >= 6 ? 'bg-yellow-100' : data.framework.bigFiveE <= 4 ? 'bg-slate-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">E</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveE <= 4 ? 'Intro.' : data.framework.bigFiveE >= 6 ? 'Extro.' : 'Ambi.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveA >= 6 ? 'bg-green-100' : data.framework.bigFiveA <= 4 ? 'bg-red-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">A</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveA <= 4 ? 'Desaf.' : data.framework.bigFiveA >= 6 ? 'Coop.' : 'Med.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveN >= 6 ? 'bg-pink-100' : data.framework.bigFiveN <= 4 ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">N</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveN <= 4 ? 'Estáv.' : data.framework.bigFiveN >= 6 ? 'Sens.' : 'Med.'}</div>
            </div>
          </div>
        </div>

        {/* DARK TRIAD Section */}
        <div className="mt-8">
          <div className="bg-slate-900 border border-slate-700 rounded-sm p-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-red-400 mb-2">🔺 DARK TRIAD</h3>
            <p className="font-mono text-xs text-slate-300 leading-relaxed">
              A "Tríade Sombria" consiste em três traços de personalidade socialmente aversivos: <strong className="text-red-300">Narcisismo</strong>, <strong className="text-purple-300">Maquiavelismo</strong> e <strong className="text-slate-100">Psicopatia</strong>.
              Estes traços existem em um espectro — níveis baixos a moderados são comuns na população.
              Útil para criar personagens complexos, anti-heróis, vilões ou pessoas moralmente ambíguas.
            </p>
          </div>

          {/* Narcissism */}
          <div className="border-2 border-red-200 bg-red-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-red-800">🪞 Narcisismo</h4>
              <span className="font-mono text-xs text-red-600">Grandiosidade • Admiração • Superioridade</span>
            </div>
            <p className="font-mono text-[10px] text-red-700 mb-3">
              Senso inflado de auto-importância, necessidade de admiração excessiva e falta de empatia pelos outros.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-red-600">
                <span>Humilde</span>
                <span>Grandioso</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.darkNarcissism || 1}
                onChange={(e) => update('framework', 'darkNarcissism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-200 via-red-200 to-red-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.darkNarcissism || 1) <= 2 ? 'bg-slate-100 text-slate-600' :
                  (data.framework.darkNarcissism || 1) <= 4 ? 'bg-red-100 text-red-700' :
                  (data.framework.darkNarcissism || 1) <= 6 ? 'bg-red-200 text-red-800' :
                  'bg-red-300 text-red-900'
                }`}>
                  {(data.framework.darkNarcissism || 1) === 1 && 'Ausente'}
                  {(data.framework.darkNarcissism || 1) === 2 && 'Mínimo'}
                  {(data.framework.darkNarcissism || 1) === 3 && 'Baixo'}
                  {(data.framework.darkNarcissism || 1) === 4 && 'Moderado-Baixo'}
                  {(data.framework.darkNarcissism || 1) === 5 && 'Moderado'}
                  {(data.framework.darkNarcissism || 1) === 6 && 'Moderado-Alto'}
                  {(data.framework.darkNarcissism || 1) === 7 && 'Alto'}
                  {(data.framework.darkNarcissism || 1) === 8 && 'Muito Alto'}
                  {(data.framework.darkNarcissism || 1) === 9 && 'Extremo'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-red-700 text-center italic">
                {(data.framework.darkNarcissism || 1) <= 2 && '💡 Humilde e modesto. Não busca atenção especial. Reconhece méritos dos outros.'}
                {(data.framework.darkNarcissism || 1) === 3 && '💡 Autoestima saudável. Ocasionalmente gosta de reconhecimento, mas não depende dele.'}
                {(data.framework.darkNarcissism || 1) === 4 && '💡 Alguma necessidade de validação. Pode ser competitivo sobre conquistas.'}
                {(data.framework.darkNarcissism || 1) === 5 && '💡 Busca admiração regularmente. Tem dificuldade quando não é o centro das atenções.'}
                {(data.framework.darkNarcissism || 1) === 6 && '💡 Senso inflado de importância. Espera tratamento especial. Inveja os outros.'}
                {(data.framework.darkNarcissism || 1) === 7 && '💡 Grandiosidade marcante. Explora relacionamentos. Falta empatia significativa.'}
                {(data.framework.darkNarcissism || 1) === 8 && '💡 Arrogância extrema. Fantasias de poder ilimitado. Relacionamentos superficiais.'}
                {(data.framework.darkNarcissism || 1) === 9 && '💡 Narcisismo patológico. Incapaz de ver os outros como iguais. Potencialmente destrutivo.'}
              </p>
            </div>
            {/* Narcissism Subtype */}
            {(data.framework.darkNarcissism || 1) >= 4 && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <label className="font-mono text-[9px] text-red-600 uppercase tracking-wider mb-2 block">Subtipo Narcisista</label>
                <select
                  value={data.framework.narcissismSubtype || ''}
                  onChange={(e) => update('framework', 'narcissismSubtype', e.target.value)}
                  className="w-full bg-white border border-red-200 rounded-sm py-2 px-2 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="grandiose">Grandioso — Arrogante, dominante, busca status e poder</option>
                  <option value="vulnerable">Vulnerável — Frágil, hipersensível a críticas, ressentido</option>
                  <option value="communal">Comunal — Se vê como o "mais altruísta", bondade como superioridade</option>
                  <option value="malignant">Maligno — Combinado com sadismo e paranoia, destrutivo</option>
                </select>
              </div>
            )}
          </div>

          {/* Machiavellianism */}
          <div className="border-2 border-purple-200 bg-purple-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-purple-800">🎭 Maquiavelismo</h4>
              <span className="font-mono text-xs text-purple-600">Manipulação • Cinismo • Estratégia</span>
            </div>
            <p className="font-mono text-[10px] text-purple-700 mb-3">
              Tendência a manipular e explorar outros, visão cínica da natureza humana, foco em interesses próprios acima da moralidade.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-purple-600">
                <span>Sincero</span>
                <span>Manipulador</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.darkMachiavellianism || 1}
                onChange={(e) => update('framework', 'darkMachiavellianism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-200 via-purple-200 to-purple-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.darkMachiavellianism || 1) <= 2 ? 'bg-slate-100 text-slate-600' :
                  (data.framework.darkMachiavellianism || 1) <= 4 ? 'bg-purple-100 text-purple-700' :
                  (data.framework.darkMachiavellianism || 1) <= 6 ? 'bg-purple-200 text-purple-800' :
                  'bg-purple-300 text-purple-900'
                }`}>
                  {(data.framework.darkMachiavellianism || 1) === 1 && 'Ausente'}
                  {(data.framework.darkMachiavellianism || 1) === 2 && 'Mínimo'}
                  {(data.framework.darkMachiavellianism || 1) === 3 && 'Baixo'}
                  {(data.framework.darkMachiavellianism || 1) === 4 && 'Moderado-Baixo'}
                  {(data.framework.darkMachiavellianism || 1) === 5 && 'Moderado'}
                  {(data.framework.darkMachiavellianism || 1) === 6 && 'Moderado-Alto'}
                  {(data.framework.darkMachiavellianism || 1) === 7 && 'Alto'}
                  {(data.framework.darkMachiavellianism || 1) === 8 && 'Muito Alto'}
                  {(data.framework.darkMachiavellianism || 1) === 9 && 'Extremo'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-purple-700 text-center italic">
                {(data.framework.darkMachiavellianism || 1) <= 2 && '💡 Direto e sincero. Confia nos outros. Não usa pessoas como meios para fins.'}
                {(data.framework.darkMachiavellianism || 1) === 3 && '💡 Geralmente honesto, mas capaz de diplomacia estratégica quando necessário.'}
                {(data.framework.darkMachiavellianism || 1) === 4 && '💡 Pragmático. Entende jogos políticos mas prefere não participar.'}
                {(data.framework.darkMachiavellianism || 1) === 5 && '💡 Calculista em situações competitivas. "Os fins justificam os meios" às vezes.'}
                {(data.framework.darkMachiavellianism || 1) === 6 && '💡 Estratégico e oportunista. Manipula quando beneficia. Cínico sobre motivações.'}
                {(data.framework.darkMachiavellianism || 1) === 7 && '💡 Mestre manipulador. Vê relacionamentos como transações. Amoral pragmático.'}
                {(data.framework.darkMachiavellianism || 1) === 8 && '💡 Altamente explorador. Planeja movimentos com antecedência. Friamente calculista.'}
                {(data.framework.darkMachiavellianism || 1) === 9 && '💡 Manipulador patológico. Vê todos como peões. Completamente amoral.'}
              </p>
            </div>
            {/* Machiavellianism Subtype */}
            {(data.framework.darkMachiavellianism || 1) >= 4 && (
              <div className="mt-3 pt-3 border-t border-purple-200">
                <label className="font-mono text-[9px] text-purple-600 uppercase tracking-wider mb-2 block">Estilo Maquiavélico</label>
                <select
                  value={data.framework.machiavellianismSubtype || ''}
                  onChange={(e) => update('framework', 'machiavellianismSubtype', e.target.value)}
                  className="w-full bg-white border border-purple-200 rounded-sm py-2 px-2 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="tactician">Tático — Planeja cuidadosamente, jogadas de longo prazo</option>
                  <option value="opportunist">Oportunista — Age no momento, aproveita situações</option>
                  <option value="charmer">Encantador — Usa carisma e sedução para manipular</option>
                  <option value="bureaucrat">Burocrata — Manipula através de sistemas e regras</option>
                </select>
              </div>
            )}
          </div>

          {/* Psychopathy */}
          <div className="border-2 border-slate-400 bg-slate-100/50 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-slate-800">🖤 Psicopatia</h4>
              <span className="font-mono text-xs text-slate-600">Frieza • Impulsividade • Falta de Remorso</span>
            </div>
            <p className="font-mono text-[10px] text-slate-700 mb-3">
              Déficit de empatia e remorso, comportamento antissocial, impulsividade, charme superficial e frieza emocional.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-slate-600">
                <span>Empático</span>
                <span>Frio</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.darkPsychopathy || 1}
                onChange={(e) => update('framework', 'darkPsychopathy', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.darkPsychopathy || 1) <= 2 ? 'bg-slate-100 text-slate-600' :
                  (data.framework.darkPsychopathy || 1) <= 4 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.darkPsychopathy || 1) <= 6 ? 'bg-slate-300 text-slate-800' :
                  'bg-slate-400 text-slate-900'
                }`}>
                  {(data.framework.darkPsychopathy || 1) === 1 && 'Ausente'}
                  {(data.framework.darkPsychopathy || 1) === 2 && 'Mínimo'}
                  {(data.framework.darkPsychopathy || 1) === 3 && 'Baixo'}
                  {(data.framework.darkPsychopathy || 1) === 4 && 'Moderado-Baixo'}
                  {(data.framework.darkPsychopathy || 1) === 5 && 'Moderado'}
                  {(data.framework.darkPsychopathy || 1) === 6 && 'Moderado-Alto'}
                  {(data.framework.darkPsychopathy || 1) === 7 && 'Alto'}
                  {(data.framework.darkPsychopathy || 1) === 8 && 'Muito Alto'}
                  {(data.framework.darkPsychopathy || 1) === 9 && 'Extremo'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-700 text-center italic">
                {(data.framework.darkPsychopathy || 1) <= 2 && '💡 Empático e consciencioso. Sente culpa e remorso. Conexões emocionais profundas.'}
                {(data.framework.darkPsychopathy || 1) === 3 && '💡 Emocionalmente saudável. Pode ser assertivo mas respeita limites.'}
                {(data.framework.darkPsychopathy || 1) === 4 && '💡 Ligeiramente desapegado emocionalmente. Pode parecer frio sob pressão.'}
                {(data.framework.darkPsychopathy || 1) === 5 && '💡 Empatia reduzida. Busca emoções fortes. Tolerância baixa ao tédio.'}
                {(data.framework.darkPsychopathy || 1) === 6 && '💡 Charme superficial. Manipulador. Pouco remorso por ações prejudiciais.'}
                {(data.framework.darkPsychopathy || 1) === 7 && '💡 Frieza emocional marcante. Impulsivo. Desrespeita normas sociais.'}
                {(data.framework.darkPsychopathy || 1) === 8 && '💡 Ausência quase total de empatia. Predatório. Comportamento antissocial.'}
                {(data.framework.darkPsychopathy || 1) === 9 && '💡 Psicopatia clínica. Sem remorso, sem medo, sem conexão emocional genuína.'}
              </p>
            </div>
            {/* Psychopathy Subtype */}
            {(data.framework.darkPsychopathy || 1) >= 4 && (
              <div className="mt-3 pt-3 border-t border-slate-300">
                <label className="font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-2 block">Subtipo Psicopático</label>
                <select
                  value={data.framework.psychopathySubtype || ''}
                  onChange={(e) => update('framework', 'psychopathySubtype', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-sm py-2 px-2 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="primary">Primário — Frio, calculado, controlado, "bem-sucedido"</option>
                  <option value="secondary">Secundário — Impulsivo, reativo, emocional instável</option>
                  <option value="corporate">Corporativo — Funciona em ambientes de poder, "psicopata de terno"</option>
                  <option value="antisocial">Antissocial — Criminoso, violento, desrespeita leis</option>
                </select>
              </div>
            )}
          </div>

          {/* Dark Triad Summary */}
          <div className="bg-slate-800 border border-slate-600 rounded-sm p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-3">🔺 Perfil Dark Triad</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded ${
                (data.framework.darkNarcissism || 1) <= 3 ? 'bg-slate-700' :
                (data.framework.darkNarcissism || 1) <= 6 ? 'bg-red-900/50' :
                'bg-red-800'
              }`}>
                <div className="font-mono text-lg font-bold text-red-400">🪞</div>
                <div className="font-mono text-[10px] text-slate-300">Narcisismo</div>
                <div className="font-mono text-xs text-red-400 font-bold">
                  {(data.framework.darkNarcissism || 1) <= 3 ? 'Baixo' : (data.framework.darkNarcissism || 1) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.darkMachiavellianism || 1) <= 3 ? 'bg-slate-700' :
                (data.framework.darkMachiavellianism || 1) <= 6 ? 'bg-purple-900/50' :
                'bg-purple-800'
              }`}>
                <div className="font-mono text-lg font-bold text-purple-400">🎭</div>
                <div className="font-mono text-[10px] text-slate-300">Maquiavelismo</div>
                <div className="font-mono text-xs text-purple-400 font-bold">
                  {(data.framework.darkMachiavellianism || 1) <= 3 ? 'Baixo' : (data.framework.darkMachiavellianism || 1) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.darkPsychopathy || 1) <= 3 ? 'bg-slate-700' :
                (data.framework.darkPsychopathy || 1) <= 6 ? 'bg-slate-600' :
                'bg-slate-500'
              }`}>
                <div className="font-mono text-lg font-bold text-slate-300">🖤</div>
                <div className="font-mono text-[10px] text-slate-300">Psicopatia</div>
                <div className="font-mono text-xs text-slate-300 font-bold">
                  {(data.framework.darkPsychopathy || 1) <= 3 ? 'Baixo' : (data.framework.darkPsychopathy || 1) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIGHT TRIAD Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-amber-50 to-sky-50 border border-amber-200 rounded-sm p-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-amber-800 mb-2">🔆 LIGHT TRIAD</h3>
            <p className="font-mono text-xs text-amber-900 leading-relaxed">
              O contraponto positivo ao Dark Triad. Mede três traços pró-sociais: <strong className="text-amber-700">Fé na Humanidade</strong>, <strong className="text-sky-700">Humanismo</strong> e <strong className="text-emerald-700">Kantianismo</strong>.
              Pessoas com alta Light Triad tendem a ver o melhor nos outros, valorizar a dignidade humana e tratar pessoas como fins, não meios.
            </p>
          </div>

          {/* Faith in Humanity */}
          <div className="border-2 border-amber-200 bg-amber-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-amber-800">🌟 Fé na Humanidade</h4>
              <span className="font-mono text-xs text-amber-600">Confiança • Otimismo • Bondade Presumida</span>
            </div>
            <p className="font-mono text-[10px] text-amber-700 mb-3">
              Crença de que as pessoas são fundamentalmente boas. Tendência a confiar nos outros e ver o melhor nas intenções alheias.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-amber-600">
                <span>Cínico</span>
                <span>Confiante</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.lightFaith || 5}
                onChange={(e) => update('framework', 'lightFaith', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-300 via-amber-200 to-amber-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.lightFaith || 5) <= 2 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.lightFaith || 5) <= 4 ? 'bg-amber-100 text-amber-700' :
                  (data.framework.lightFaith || 5) <= 6 ? 'bg-amber-200 text-amber-800' :
                  'bg-amber-300 text-amber-900'
                }`}>
                  {(data.framework.lightFaith || 5) === 1 && 'Muito Cínico'}
                  {(data.framework.lightFaith || 5) === 2 && 'Cínico'}
                  {(data.framework.lightFaith || 5) === 3 && 'Moderadamente Cínico'}
                  {(data.framework.lightFaith || 5) === 4 && 'Levemente Cínico'}
                  {(data.framework.lightFaith || 5) === 5 && 'Balanceado'}
                  {(data.framework.lightFaith || 5) === 6 && 'Levemente Confiante'}
                  {(data.framework.lightFaith || 5) === 7 && 'Moderadamente Confiante'}
                  {(data.framework.lightFaith || 5) === 8 && 'Confiante'}
                  {(data.framework.lightFaith || 5) === 9 && 'Muito Confiante'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-amber-700 text-center italic">
                {(data.framework.lightFaith || 5) <= 2 && '💡 Profundamente desconfiado. Assume más intenções. Difícil confiar em qualquer um.'}
                {(data.framework.lightFaith || 5) === 3 && '💡 Cético sobre motivações alheias. Confiança deve ser conquistada lentamente.'}
                {(data.framework.lightFaith || 5) === 4 && '💡 Cauteloso com novos relacionamentos. Prefere verificar antes de confiar.'}
                {(data.framework.lightFaith || 5) === 5 && '💡 Equilibra confiança com prudência. Nem ingênuo nem paranoico.'}
                {(data.framework.lightFaith || 5) === 6 && '💡 Geralmente assume boas intenções. Dá o benefício da dúvida.'}
                {(data.framework.lightFaith || 5) === 7 && '💡 Acredita no melhor das pessoas. Otimista sobre natureza humana.'}
                {(data.framework.lightFaith || 5) === 8 && '💡 Alta confiança nos outros. Vê bondade mesmo onde outros não veem.'}
                {(data.framework.lightFaith || 5) === 9 && '💡 Fé inabalável na humanidade. Pode ser visto como ingênuo. Perdoa facilmente.'}
              </p>
            </div>
          </div>

          {/* Humanism */}
          <div className="border-2 border-sky-200 bg-sky-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-sky-800">💙 Humanismo</h4>
              <span className="font-mono text-xs text-sky-600">Dignidade • Valor Inerente • Respeito</span>
            </div>
            <p className="font-mono text-[10px] text-sky-700 mb-3">
              Crença no valor e dignidade inerente de cada ser humano. Respeito universal independente de status, utilidade ou relação pessoal.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-sky-600">
                <span>Utilitário</span>
                <span>Humanista</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.lightHumanism || 5}
                onChange={(e) => update('framework', 'lightHumanism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-300 via-sky-200 to-sky-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.lightHumanism || 5) <= 2 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.lightHumanism || 5) <= 4 ? 'bg-sky-100 text-sky-700' :
                  (data.framework.lightHumanism || 5) <= 6 ? 'bg-sky-200 text-sky-800' :
                  'bg-sky-300 text-sky-900'
                }`}>
                  {(data.framework.lightHumanism || 5) === 1 && 'Muito Utilitário'}
                  {(data.framework.lightHumanism || 5) === 2 && 'Utilitário'}
                  {(data.framework.lightHumanism || 5) === 3 && 'Moderadamente Utilitário'}
                  {(data.framework.lightHumanism || 5) === 4 && 'Levemente Utilitário'}
                  {(data.framework.lightHumanism || 5) === 5 && 'Balanceado'}
                  {(data.framework.lightHumanism || 5) === 6 && 'Levemente Humanista'}
                  {(data.framework.lightHumanism || 5) === 7 && 'Moderadamente Humanista'}
                  {(data.framework.lightHumanism || 5) === 8 && 'Humanista'}
                  {(data.framework.lightHumanism || 5) === 9 && 'Muito Humanista'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-sky-700 text-center italic">
                {(data.framework.lightHumanism || 5) <= 2 && '💡 Vê pessoas pelo que podem oferecer. Valor baseado em utilidade. Hierárquico.'}
                {(data.framework.lightHumanism || 5) === 3 && '💡 Pragmático sobre relações. Respeito proporcional ao status ou utilidade.'}
                {(data.framework.lightHumanism || 5) === 4 && '💡 Reconhece valor humano mas prioriza relações úteis ou próximas.'}
                {(data.framework.lightHumanism || 5) === 5 && '💡 Respeita a maioria mas faz distinções. Equilibra princípios com pragmatismo.'}
                {(data.framework.lightHumanism || 5) === 6 && '💡 Valoriza pessoas como indivíduos. Respeito básico independente de status.'}
                {(data.framework.lightHumanism || 5) === 7 && '💡 Forte crença na dignidade humana. Defende os vulneráveis e marginalizados.'}
                {(data.framework.lightHumanism || 5) === 8 && '💡 Profundo respeito por toda vida humana. Igualitário. Empático universalmente.'}
                {(data.framework.lightHumanism || 5) === 9 && '💡 Humanismo radical. Cada pessoa é sagrada. Incapaz de desumanizar qualquer um.'}
              </p>
            </div>
          </div>

          {/* Kantianism */}
          <div className="border-2 border-emerald-200 bg-emerald-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-emerald-800">⚖️ Kantianismo</h4>
              <span className="font-mono text-xs text-emerald-600">Ética • Não-Exploração • Fins não Meios</span>
            </div>
            <p className="font-mono text-[10px] text-emerald-700 mb-3">
              Baseado na ética de Kant: tratar pessoas sempre como fins em si mesmas, nunca apenas como meios. Recusa a usar ou manipular outros.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-emerald-600">
                <span>Instrumental</span>
                <span>Kantiano</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.lightKantianism || 5}
                onChange={(e) => update('framework', 'lightKantianism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-300 via-emerald-200 to-emerald-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.lightKantianism || 5) <= 2 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.lightKantianism || 5) <= 4 ? 'bg-emerald-100 text-emerald-700' :
                  (data.framework.lightKantianism || 5) <= 6 ? 'bg-emerald-200 text-emerald-800' :
                  'bg-emerald-300 text-emerald-900'
                }`}>
                  {(data.framework.lightKantianism || 5) === 1 && 'Muito Instrumental'}
                  {(data.framework.lightKantianism || 5) === 2 && 'Instrumental'}
                  {(data.framework.lightKantianism || 5) === 3 && 'Moderadamente Instrumental'}
                  {(data.framework.lightKantianism || 5) === 4 && 'Levemente Instrumental'}
                  {(data.framework.lightKantianism || 5) === 5 && 'Balanceado'}
                  {(data.framework.lightKantianism || 5) === 6 && 'Levemente Kantiano'}
                  {(data.framework.lightKantianism || 5) === 7 && 'Moderadamente Kantiano'}
                  {(data.framework.lightKantianism || 5) === 8 && 'Kantiano'}
                  {(data.framework.lightKantianism || 5) === 9 && 'Muito Kantiano'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-emerald-700 text-center italic">
                {(data.framework.lightKantianism || 5) <= 2 && '💡 Vê pessoas como recursos. Usa outros sem hesitação. Os fins justificam os meios.'}
                {(data.framework.lightKantianism || 5) === 3 && '💡 Pragmático sobre usar outros. Não perde sono por pequenas manipulações.'}
                {(data.framework.lightKantianism || 5) === 4 && '💡 Prefere não manipular mas fará se necessário. Justifica quando conveniente.'}
                {(data.framework.lightKantianism || 5) === 5 && '💡 Evita usar pessoas mas não é absolutista. Contexto importa.'}
                {(data.framework.lightKantianism || 5) === 6 && '💡 Desconforto em usar outros. Busca relações genuínas e mutuamente benéficas.'}
                {(data.framework.lightKantianism || 5) === 7 && '💡 Forte aversão à manipulação. Trata pessoas com respeito consistente.'}
                {(data.framework.lightKantianism || 5) === 8 && '💡 Recusa usar pessoas como meios. Honestidade radical. Ética de princípios.'}
                {(data.framework.lightKantianism || 5) === 9 && '💡 Kantiano puro. Nunca manipula ou explora. Pode sacrificar ganhos por princípios.'}
              </p>
            </div>
          </div>

          {/* Light Triad Summary */}
          <div className="bg-gradient-to-r from-amber-100 via-sky-100 to-emerald-100 border border-amber-200 rounded-sm p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-amber-700 mb-3">🔆 Perfil Light Triad</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded ${
                (data.framework.lightFaith || 5) <= 3 ? 'bg-white/50' :
                (data.framework.lightFaith || 5) <= 6 ? 'bg-amber-200/50' :
                'bg-amber-300/50'
              }`}>
                <div className="font-mono text-lg font-bold text-amber-600">🌟</div>
                <div className="font-mono text-[10px] text-amber-800">Fé na Humanidade</div>
                <div className="font-mono text-xs text-amber-700 font-bold">
                  {(data.framework.lightFaith || 5) <= 3 ? 'Baixo' : (data.framework.lightFaith || 5) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.lightHumanism || 5) <= 3 ? 'bg-white/50' :
                (data.framework.lightHumanism || 5) <= 6 ? 'bg-sky-200/50' :
                'bg-sky-300/50'
              }`}>
                <div className="font-mono text-lg font-bold text-sky-600">💙</div>
                <div className="font-mono text-[10px] text-sky-800">Humanismo</div>
                <div className="font-mono text-xs text-sky-700 font-bold">
                  {(data.framework.lightHumanism || 5) <= 3 ? 'Baixo' : (data.framework.lightHumanism || 5) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.lightKantianism || 5) <= 3 ? 'bg-white/50' :
                (data.framework.lightKantianism || 5) <= 6 ? 'bg-emerald-200/50' :
                'bg-emerald-300/50'
              }`}>
                <div className="font-mono text-lg font-bold text-emerald-600">⚖️</div>
                <div className="font-mono text-[10px] text-emerald-800">Kantianismo</div>
                <div className="font-mono text-xs text-emerald-700 font-bold">
                  {(data.framework.lightKantianism || 5) <= 3 ? 'Baixo' : (data.framework.lightKantianism || 5) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    1: ( // Core Traits
      <div className="space-y-6">
        {/* Explanation Header */}
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-violet-900 mb-2">✦ SISTEMA DE TRAITS (3-3-3)</h3>
          <p className="font-mono text-xs text-violet-800 leading-relaxed">
            Selecione traits que definem seu personagem. O sistema requer <strong>equilíbrio</strong>:
            mínimo <strong>2 de cada tipo</strong> (positivo, neutro, negativo), máximo <strong>4 de cada</strong>.
            Total: <strong>6-12 traits</strong>. Isso garante personagens complexos e realistas, não heróis perfeitos ou vilões caricatos.
          </p>
        </div>

        {(() => {
          // Massive Traits Database
// EXPANDED TRAITS DATABASE - ~400+ traits
const traitsDatabase = {
  positive: [
    // Caring (12)
    { id: 'compassionate', label: 'Compassionate', cat: 'Caring', desc: 'Deeply cares about others\' suffering' },
    { id: 'empathetic', label: 'Empathetic', cat: 'Caring', desc: 'Feels and understands others\' emotions' },
    { id: 'sympathetic', label: 'Sympathetic', cat: 'Caring', desc: 'Shows concern for others\' hardships' },
    { id: 'nurturing', label: 'Nurturing', cat: 'Caring', desc: 'Cares for and encourages growth' },
    { id: 'gentle', label: 'Gentle', cat: 'Caring', desc: 'Kind and soft in manner' },
    { id: 'tender', label: 'Tender', cat: 'Caring', desc: 'Shows gentleness and affection' },
    { id: 'caring', label: 'Caring', cat: 'Caring', desc: 'Shows kindness and concern' },
    { id: 'attentive', label: 'Attentive', cat: 'Caring', desc: 'Pays close attention to others\' needs' },
    { id: 'considerate', label: 'Considerate', cat: 'Caring', desc: 'Thoughtful of others\' feelings' },
    { id: 'thoughtful', label: 'Thoughtful', cat: 'Caring', desc: 'Shows consideration for others' },
    { id: 'understanding', label: 'Understanding', cat: 'Caring', desc: 'Shows comprehension and tolerance' },
    { id: 'comforting', label: 'Comforting', cat: 'Caring', desc: 'Provides solace and reassurance' },

    // Giving (10)
    { id: 'generous', label: 'Generous', cat: 'Giving', desc: 'Freely gives time, resources, attention' },
    { id: 'altruistic', label: 'Altruistic', cat: 'Giving', desc: 'Selflessly concerned for others' },
    { id: 'charitable', label: 'Charitable', cat: 'Giving', desc: 'Generous to those in need' },
    { id: 'selfless', label: 'Selfless', cat: 'Giving', desc: 'Puts others before self' },
    { id: 'helpful', label: 'Helpful', cat: 'Giving', desc: 'Willing to assist others' },
    { id: 'supportive', label: 'Supportive', cat: 'Giving', desc: 'Provides encouragement and help' },
    { id: 'accommodating', label: 'Accommodating', cat: 'Giving', desc: 'Willing to adjust for others' },
    { id: 'hospitable', label: 'Hospitable', cat: 'Giving', desc: 'Welcomes guests warmly' },
    { id: 'magnanimous', label: 'Magnanimous', cat: 'Giving', desc: 'Generous in forgiving' },
    { id: 'benevolent', label: 'Benevolent', cat: 'Giving', desc: 'Well-meaning and kindly' },

    // Loyalty (10)
    { id: 'loyal', label: 'Loyal', cat: 'Loyalty', desc: 'Steadfast in allegiance' },
    { id: 'faithful', label: 'Faithful', cat: 'Loyalty', desc: 'True to commitments' },
    { id: 'devoted', label: 'Devoted', cat: 'Loyalty', desc: 'Deeply dedicated to others' },
    { id: 'dependable', label: 'Dependable', cat: 'Loyalty', desc: 'Can be relied upon' },
    { id: 'trustworthy', label: 'Trustworthy', cat: 'Loyalty', desc: 'Worthy of confidence' },
    { id: 'reliable', label: 'Reliable', cat: 'Loyalty', desc: 'Consistently good in quality' },
    { id: 'committed', label: 'Committed', cat: 'Loyalty', desc: 'Dedicated to a cause or person' },
    { id: 'steadfast', label: 'Steadfast', cat: 'Loyalty', desc: 'Firmly loyal and constant' },
    { id: 'true', label: 'True', cat: 'Loyalty', desc: 'Genuine and loyal' },
    { id: 'dedicated', label: 'Dedicated', cat: 'Loyalty', desc: 'Devoted to a task or purpose' },

    // Harmony (10)
    { id: 'forgiving', label: 'Forgiving', cat: 'Harmony', desc: 'Lets go of grudges' },
    { id: 'diplomatic', label: 'Diplomatic', cat: 'Harmony', desc: 'Tactful in difficult situations' },
    { id: 'peacemaking', label: 'Peacemaking', cat: 'Harmony', desc: 'Works to resolve conflicts' },
    { id: 'tolerant', label: 'Tolerant', cat: 'Harmony', desc: 'Accepts differences in others' },
    { id: 'accepting', label: 'Accepting', cat: 'Harmony', desc: 'Receives others without judgment' },
    { id: 'patient', label: 'Patient', cat: 'Harmony', desc: 'Tolerates delays calmly' },
    { id: 'cooperative', label: 'Cooperative', cat: 'Harmony', desc: 'Works well with others' },
    { id: 'agreeable', label: 'Agreeable', cat: 'Harmony', desc: 'Pleasant and easy to work with' },
    { id: 'easygoing', label: 'Easygoing', cat: 'Harmony', desc: 'Relaxed and tolerant' },
    { id: 'flexible', label: 'Flexible', cat: 'Harmony', desc: 'Willing to compromise' },

    // Integrity (15)
    { id: 'honest', label: 'Honest', cat: 'Integrity', desc: 'Truthful and sincere' },
    { id: 'sincere', label: 'Sincere', cat: 'Integrity', desc: 'Free from pretense' },
    { id: 'truthful', label: 'Truthful', cat: 'Integrity', desc: 'Speaks only truth' },
    { id: 'genuine', label: 'Genuine', cat: 'Integrity', desc: 'Authentic and real' },
    { id: 'authentic', label: 'Authentic', cat: 'Integrity', desc: 'True to oneself' },
    { id: 'transparent', label: 'Transparent', cat: 'Integrity', desc: 'Open and honest' },
    { id: 'forthright', label: 'Forthright', cat: 'Integrity', desc: 'Direct and outspoken honestly' },
    { id: 'candid', label: 'Candid', cat: 'Integrity', desc: 'Frank and unreserved' },
    { id: 'principled', label: 'Principled', cat: 'Integrity', desc: 'Acts on moral code' },
    { id: 'ethical', label: 'Ethical', cat: 'Integrity', desc: 'Morally correct' },
    { id: 'moral', label: 'Moral', cat: 'Integrity', desc: 'Concerned with right and wrong' },
    { id: 'virtuous', label: 'Virtuous', cat: 'Integrity', desc: 'Having high moral standards' },
    { id: 'honorable', label: 'Honorable', cat: 'Integrity', desc: 'Worthy of respect' },
    { id: 'noble', label: 'Noble', cat: 'Integrity', desc: 'Having high moral qualities' },
    { id: 'righteous', label: 'Righteous', cat: 'Integrity', desc: 'Morally right and just' },

    // Courage (10)
    { id: 'courageous', label: 'Courageous', cat: 'Courage', desc: 'Faces fear bravely' },
    { id: 'brave', label: 'Brave', cat: 'Courage', desc: 'Ready to face danger' },
    { id: 'bold', label: 'Bold', cat: 'Courage', desc: 'Willing to take risks' },
    { id: 'fearless', label: 'Fearless', cat: 'Courage', desc: 'Lacking fear' },
    { id: 'daring', label: 'Daring', cat: 'Courage', desc: 'Adventurous and bold' },
    { id: 'valiant', label: 'Valiant', cat: 'Courage', desc: 'Brave and determined' },
    { id: 'heroic', label: 'Heroic', cat: 'Courage', desc: 'Extremely brave' },
    { id: 'gallant', label: 'Gallant', cat: 'Courage', desc: 'Brave and noble' },
    { id: 'audacious', label: 'Audacious', cat: 'Courage', desc: 'Willingness to take bold risks' },
    { id: 'intrepid', label: 'Intrepid', cat: 'Courage', desc: 'Fearless and adventurous' },

    // Humility (8)
    { id: 'humble', label: 'Humble', cat: 'Humility', desc: 'Modest about achievements' },
    { id: 'modest', label: 'Modest', cat: 'Humility', desc: 'Unassuming about abilities' },
    { id: 'unassuming', label: 'Unassuming', cat: 'Humility', desc: 'Not pretentious' },
    { id: 'unpretentious', label: 'Unpretentious', cat: 'Humility', desc: 'Not trying to impress' },
    { id: 'down-to-earth', label: 'Down-to-earth', cat: 'Humility', desc: 'Practical and realistic' },
    { id: 'grounded', label: 'Grounded', cat: 'Humility', desc: 'Well-balanced and sensible' },
    { id: 'self-effacing', label: 'Self-effacing', cat: 'Humility', desc: 'Not claiming attention' },
    { id: 'gracious', label: 'Gracious', cat: 'Humility', desc: 'Courteous, kind, and pleasant' },

    // Resilience (10)
    { id: 'resilient', label: 'Resilient', cat: 'Resilience', desc: 'Recovers quickly from setbacks' },
    { id: 'strong', label: 'Strong', cat: 'Resilience', desc: 'Able to withstand hardship' },
    { id: 'tough', label: 'Tough', cat: 'Resilience', desc: 'Able to endure difficulty' },
    { id: 'tenacious', label: 'Tenacious', cat: 'Resilience', desc: 'Persistent and determined' },
    { id: 'persevering', label: 'Persevering', cat: 'Resilience', desc: 'Continues despite difficulty' },
    { id: 'persistent', label: 'Persistent', cat: 'Resilience', desc: 'Refuses to give up' },
    { id: 'enduring', label: 'Enduring', cat: 'Resilience', desc: 'Lasting through hardship' },
    { id: 'indomitable', label: 'Indomitable', cat: 'Resilience', desc: 'Impossible to defeat' },
    { id: 'unbreakable', label: 'Unbreakable', cat: 'Resilience', desc: 'Cannot be broken' },
    { id: 'adaptable', label: 'Adaptable', cat: 'Resilience', desc: 'Adjusts to new conditions' },

    // Intelligence (12)
    { id: 'intelligent', label: 'Intelligent', cat: 'Intelligence', desc: 'Quick to learn and understand' },
    { id: 'smart', label: 'Smart', cat: 'Intelligence', desc: 'Having sharp mental ability' },
    { id: 'clever', label: 'Clever', cat: 'Intelligence', desc: 'Quick-witted and resourceful' },
    { id: 'brilliant', label: 'Brilliant', cat: 'Intelligence', desc: 'Exceptionally intelligent' },
    { id: 'sharp', label: 'Sharp', cat: 'Intelligence', desc: 'Quick and keen mentally' },
    { id: 'quick-witted', label: 'Quick-witted', cat: 'Intelligence', desc: 'Fast thinking and responses' },
    { id: 'astute', label: 'Astute', cat: 'Intelligence', desc: 'Shrewd and perceptive' },
    { id: 'wise', label: 'Wise', cat: 'Intelligence', desc: 'Having good judgment' },
    { id: 'knowledgeable', label: 'Knowledgeable', cat: 'Intelligence', desc: 'Well-informed' },
    { id: 'learned', label: 'Learned', cat: 'Intelligence', desc: 'Having much knowledge' },
    { id: 'intellectual', label: 'Intellectual', cat: 'Intelligence', desc: 'Engaged in mental activity' },
    { id: 'scholarly', label: 'Scholarly', cat: 'Intelligence', desc: 'Academic and studious' },

    // Creativity (10)
    { id: 'creative', label: 'Creative', cat: 'Creativity', desc: 'Original and imaginative' },
    { id: 'imaginative', label: 'Imaginative', cat: 'Creativity', desc: 'Has vivid imagination' },
    { id: 'innovative', label: 'Innovative', cat: 'Creativity', desc: 'Introduces new ideas' },
    { id: 'inventive', label: 'Inventive', cat: 'Creativity', desc: 'Creates new things' },
    { id: 'original', label: 'Original', cat: 'Creativity', desc: 'Unique and novel' },
    { id: 'artistic', label: 'Artistic', cat: 'Creativity', desc: 'Has creative skill' },
    { id: 'visionary', label: 'Visionary', cat: 'Creativity', desc: 'Thinks about the future' },
    { id: 'inspired', label: 'Inspired', cat: 'Creativity', desc: 'Filled with creative urge' },
    { id: 'ingenious', label: 'Ingenious', cat: 'Creativity', desc: 'Cleverly inventive' },
    { id: 'resourceful', label: 'Resourceful', cat: 'Creativity', desc: 'Finds clever solutions' },

    // Curiosity (7)
    { id: 'curious', label: 'Curious', cat: 'Curiosity', desc: 'Eager to learn' },
    { id: 'inquisitive', label: 'Inquisitive', cat: 'Curiosity', desc: 'Asks many questions' },
    { id: 'questioning', label: 'Questioning', cat: 'Curiosity', desc: 'Tends to ask questions' },
    { id: 'exploratory', label: 'Exploratory', cat: 'Curiosity', desc: 'Likes to explore' },
    { id: 'investigative', label: 'Investigative', cat: 'Curiosity', desc: 'Researches deeply' },
    { id: 'studious', label: 'Studious', cat: 'Curiosity', desc: 'Devoted to study' },
    { id: 'open-minded', label: 'Open-minded', cat: 'Curiosity', desc: 'Receptive to new ideas' },

    // Analysis (10)
    { id: 'analytical', label: 'Analytical', cat: 'Analysis', desc: 'Examines methodically' },
    { id: 'logical', label: 'Logical', cat: 'Analysis', desc: 'Uses clear reasoning' },
    { id: 'rational', label: 'Rational', cat: 'Analysis', desc: 'Based on reason' },
    { id: 'systematic', label: 'Systematic', cat: 'Analysis', desc: 'Methodical and organized' },
    { id: 'methodical', label: 'Methodical', cat: 'Analysis', desc: 'Done in ordered way' },
    { id: 'critical-thinker', label: 'Critical Thinker', cat: 'Analysis', desc: 'Analyzes objectively' },
    { id: 'objective', label: 'Objective', cat: 'Analysis', desc: 'Not influenced by emotions' },
    { id: 'discerning', label: 'Discerning', cat: 'Analysis', desc: 'Shows good judgment' },
    { id: 'perceptive', label: 'Perceptive', cat: 'Analysis', desc: 'Quick to notice things' },
    { id: 'insightful', label: 'Insightful', cat: 'Analysis', desc: 'Shows deep understanding' },

    // Ambition (9)
    { id: 'ambitious', label: 'Ambitious', cat: 'Ambition', desc: 'Strong desire to succeed' },
    { id: 'driven', label: 'Driven', cat: 'Ambition', desc: 'Compelled to achieve' },
    { id: 'motivated', label: 'Motivated', cat: 'Ambition', desc: 'Has drive to act' },
    { id: 'aspiring', label: 'Aspiring', cat: 'Ambition', desc: 'Seeking to achieve' },
    { id: 'goal-oriented', label: 'Goal-oriented', cat: 'Ambition', desc: 'Focused on objectives' },
    { id: 'determined', label: 'Determined', cat: 'Ambition', desc: 'Firm in purpose' },
    { id: 'resolute', label: 'Resolute', cat: 'Ambition', desc: 'Admirably purposeful' },
    { id: 'focused', label: 'Focused', cat: 'Ambition', desc: 'Concentrated on goals' },
    { id: 'purposeful', label: 'Purposeful', cat: 'Ambition', desc: 'Having clear purpose' },

    // Work Ethic (10)
    { id: 'hardworking', label: 'Hardworking', cat: 'Work Ethic', desc: 'Puts in consistent effort' },
    { id: 'diligent', label: 'Diligent', cat: 'Work Ethic', desc: 'Careful and persistent' },
    { id: 'industrious', label: 'Industrious', cat: 'Work Ethic', desc: 'Hard-working' },
    { id: 'conscientious', label: 'Conscientious', cat: 'Work Ethic', desc: 'Wishes to do right' },
    { id: 'thorough', label: 'Thorough', cat: 'Work Ethic', desc: 'Complete and careful' },
    { id: 'meticulous', label: 'Meticulous', cat: 'Work Ethic', desc: 'Very careful and precise' },
    { id: 'disciplined', label: 'Disciplined', cat: 'Work Ethic', desc: 'Controlled and orderly' },
    { id: 'organized', label: 'Organized', cat: 'Work Ethic', desc: 'Arranged systematically' },
    { id: 'efficient', label: 'Efficient', cat: 'Work Ethic', desc: 'Achieves maximum productivity' },
    { id: 'proactive', label: 'Proactive', cat: 'Work Ethic', desc: 'Takes initiative' },

    // Warmth (10)
    { id: 'warm', label: 'Warm', cat: 'Warmth', desc: 'Friendly and affectionate' },
    { id: 'friendly', label: 'Friendly', cat: 'Warmth', desc: 'Kind and pleasant' },
    { id: 'affectionate', label: 'Affectionate', cat: 'Warmth', desc: 'Shows fondness' },
    { id: 'loving', label: 'Loving', cat: 'Warmth', desc: 'Full of love' },
    { id: 'kind', label: 'Kind', cat: 'Warmth', desc: 'Considerate and helpful' },
    { id: 'sweet', label: 'Sweet', cat: 'Warmth', desc: 'Pleasant and kind' },
    { id: 'good-natured', label: 'Good-natured', cat: 'Warmth', desc: 'Kind and cheerful' },
    { id: 'amiable', label: 'Amiable', cat: 'Warmth', desc: 'Friendly and pleasant' },
    { id: 'approachable', label: 'Approachable', cat: 'Warmth', desc: 'Easy to talk to' },
    { id: 'welcoming', label: 'Welcoming', cat: 'Warmth', desc: 'Receives warmly' },

    // Charisma (10)
    { id: 'charismatic', label: 'Charismatic', cat: 'Charisma', desc: 'Naturally attracts others' },
    { id: 'charming', label: 'Charming', cat: 'Charisma', desc: 'Delightful and attractive' },
    { id: 'magnetic', label: 'Magnetic', cat: 'Charisma', desc: 'Very attractive personality' },
    { id: 'captivating', label: 'Captivating', cat: 'Charisma', desc: 'Attracts and holds attention' },
    { id: 'engaging', label: 'Engaging', cat: 'Charisma', desc: 'Charming and attractive' },
    { id: 'likeable', label: 'Likeable', cat: 'Charisma', desc: 'Easy to like' },
    { id: 'personable', label: 'Personable', cat: 'Charisma', desc: 'Pleasant appearance and manner' },
    { id: 'sociable', label: 'Sociable', cat: 'Charisma', desc: 'Enjoys company of others' },
    { id: 'outgoing', label: 'Outgoing', cat: 'Charisma', desc: 'Friendly and socially confident' },
    { id: 'gregarious', label: 'Gregarious', cat: 'Charisma', desc: 'Fond of company' },

    // Communication (8)
    { id: 'articulate', label: 'Articulate', cat: 'Communication', desc: 'Expresses clearly' },
    { id: 'eloquent', label: 'Eloquent', cat: 'Communication', desc: 'Fluent and persuasive' },
    { id: 'expressive', label: 'Expressive', cat: 'Communication', desc: 'Conveys thoughts well' },
    { id: 'persuasive', label: 'Persuasive', cat: 'Communication', desc: 'Good at convincing' },
    { id: 'witty', label: 'Witty', cat: 'Communication', desc: 'Clever and amusing' },
    { id: 'humorous', label: 'Humorous', cat: 'Communication', desc: 'Has sense of humor' },
    { id: 'funny', label: 'Funny', cat: 'Communication', desc: 'Causes laughter' },
    { id: 'entertaining', label: 'Entertaining', cat: 'Communication', desc: 'Provides amusement' },

    // Positivity (10)
    { id: 'optimistic', label: 'Optimistic', cat: 'Positivity', desc: 'Hopeful and positive' },
    { id: 'hopeful', label: 'Hopeful', cat: 'Positivity', desc: 'Full of hope' },
    { id: 'positive', label: 'Positive', cat: 'Positivity', desc: 'Constructive and optimistic' },
    { id: 'cheerful', label: 'Cheerful', cat: 'Positivity', desc: 'Happy and positive' },
    { id: 'joyful', label: 'Joyful', cat: 'Positivity', desc: 'Full of joy' },
    { id: 'happy', label: 'Happy', cat: 'Positivity', desc: 'Feeling pleasure' },
    { id: 'upbeat', label: 'Upbeat', cat: 'Positivity', desc: 'Cheerful and positive' },
    { id: 'buoyant', label: 'Buoyant', cat: 'Positivity', desc: 'Cheerful and optimistic' },
    { id: 'lighthearted', label: 'Lighthearted', cat: 'Positivity', desc: 'Carefree and cheerful' },
    { id: 'playful', label: 'Playful', cat: 'Positivity', desc: 'Fun-loving and light' },

    // Calm (10)
    { id: 'calm', label: 'Calm', cat: 'Calm', desc: 'Peaceful and untroubled' },
    { id: 'serene', label: 'Serene', cat: 'Calm', desc: 'Calm and peaceful' },
    { id: 'tranquil', label: 'Tranquil', cat: 'Calm', desc: 'Free from disturbance' },
    { id: 'peaceful', label: 'Peaceful', cat: 'Calm', desc: 'Free from conflict' },
    { id: 'composed', label: 'Composed', cat: 'Calm', desc: 'Calm and in control' },
    { id: 'collected', label: 'Collected', cat: 'Calm', desc: 'Calm and controlled' },
    { id: 'unflappable', label: 'Unflappable', cat: 'Calm', desc: 'Remains calm under pressure' },
    { id: 'level-headed', label: 'Level-headed', cat: 'Calm', desc: 'Calm and sensible' },
    { id: 'even-tempered', label: 'Even-tempered', cat: 'Calm', desc: 'Not easily upset' },
    { id: 'cool-headed', label: 'Cool-headed', cat: 'Calm', desc: 'Calm in difficult situations' },

    // Passion (10)
    { id: 'passionate', label: 'Passionate', cat: 'Passion', desc: 'Shows strong feeling' },
    { id: 'enthusiastic', label: 'Enthusiastic', cat: 'Passion', desc: 'Eager and excited' },
    { id: 'zealous', label: 'Zealous', cat: 'Passion', desc: 'Full of zeal' },
    { id: 'ardent', label: 'Ardent', cat: 'Passion', desc: 'Enthusiastic and passionate' },
    { id: 'fervent', label: 'Fervent', cat: 'Passion', desc: 'Having intense feeling' },
    { id: 'spirited', label: 'Spirited', cat: 'Passion', desc: 'Full of energy and courage' },
    { id: 'vivacious', label: 'Vivacious', cat: 'Passion', desc: 'Lively and animated' },
    { id: 'energetic', label: 'Energetic', cat: 'Passion', desc: 'Full of energy' },
    { id: 'dynamic', label: 'Dynamic', cat: 'Passion', desc: 'Full of energy and new ideas' },
    { id: 'vibrant', label: 'Vibrant', cat: 'Passion', desc: 'Full of life and energy' },

    // Leadership (10)
    { id: 'leader', label: 'Leader', cat: 'Leadership', desc: 'Guides and directs others' },
    { id: 'assertive', label: 'Assertive', cat: 'Leadership', desc: 'Confident and forceful' },
    { id: 'confident', label: 'Confident', cat: 'Leadership', desc: 'Self-assured' },
    { id: 'decisive', label: 'Decisive', cat: 'Leadership', desc: 'Makes decisions quickly' },
    { id: 'commanding', label: 'Commanding', cat: 'Leadership', desc: 'Projects authority' },
    { id: 'authoritative', label: 'Authoritative', cat: 'Leadership', desc: 'Commanding and self-confident' },
    { id: 'influential', label: 'Influential', cat: 'Leadership', desc: 'Has great influence' },
    { id: 'inspiring', label: 'Inspiring', cat: 'Leadership', desc: 'Motivates others' },
    { id: 'empowering', label: 'Empowering', cat: 'Leadership', desc: 'Gives power to others' },
    { id: 'mentoring', label: 'Mentoring', cat: 'Leadership', desc: 'Guides and teaches others' },
  ],

  neutral: [
    // Energy (8)
    { id: 'introverted', label: 'Introverted', cat: 'Energy', desc: 'Energized by solitude' },
    { id: 'extroverted', label: 'Extroverted', cat: 'Energy', desc: 'Energized by people' },
    { id: 'ambiverted', label: 'Ambiverted', cat: 'Energy', desc: 'Mix of intro/extrovert' },
    { id: 'high-energy', label: 'High-energy', cat: 'Energy', desc: 'Always active' },
    { id: 'low-energy', label: 'Low-energy', cat: 'Energy', desc: 'Calm and slow-paced' },
    { id: 'restless', label: 'Restless', cat: 'Energy', desc: 'Unable to stay still' },
    { id: 'hyperactive', label: 'Hyperactive', cat: 'Energy', desc: 'Extremely active' },
    { id: 'mellow', label: 'Mellow', cat: 'Energy', desc: 'Relaxed and unhurried' },

    // Expression (10)
    { id: 'reserved', label: 'Reserved', cat: 'Expression', desc: 'Restrained in expression' },
    { id: 'quiet', label: 'Quiet', cat: 'Expression', desc: 'Speaks little' },
    { id: 'soft-spoken', label: 'Soft-spoken', cat: 'Expression', desc: 'Speaks quietly' },
    { id: 'loud', label: 'Loud', cat: 'Expression', desc: 'Makes much noise' },
    { id: 'talkative', label: 'Talkative', cat: 'Expression', desc: 'Talks a lot' },
    { id: 'verbose', label: 'Verbose', cat: 'Expression', desc: 'Uses many words' },
    { id: 'laconic', label: 'Laconic', cat: 'Expression', desc: 'Uses few words' },
    { id: 'demonstrative', label: 'Demonstrative', cat: 'Expression', desc: 'Shows feelings openly' },
    { id: 'animated', label: 'Animated', cat: 'Expression', desc: 'Full of life in expression' },
    { id: 'understated', label: 'Understated', cat: 'Expression', desc: 'Deliberately restrained' },

    // Mood (10)
    { id: 'serious', label: 'Serious', cat: 'Mood', desc: 'Solemn, not frivolous' },
    { id: 'intense', label: 'Intense', cat: 'Mood', desc: 'Deeply focused' },
    { id: 'laid-back', label: 'Laid-back', cat: 'Mood', desc: 'Relaxed and easygoing' },
    { id: 'stoic', label: 'Stoic', cat: 'Mood', desc: 'Endures without complaint' },
    { id: 'emotional', label: 'Emotional', cat: 'Mood', desc: 'Expresses feelings openly' },
    { id: 'detached', label: 'Detached', cat: 'Mood', desc: 'Emotionally distant' },
    { id: 'brooding', label: 'Brooding', cat: 'Mood', desc: 'Thinks moodily' },
    { id: 'melancholic', label: 'Melancholic', cat: 'Mood', desc: 'Tends toward sadness' },
    { id: 'mercurial', label: 'Mercurial', cat: 'Mood', desc: 'Quick-changing moods' },
    { id: 'temperamental', label: 'Temperamental', cat: 'Mood', desc: 'Subject to mood changes' },

    // Decisions (10)
    { id: 'pragmatic', label: 'Pragmatic', cat: 'Decisions', desc: 'Practical over idealistic' },
    { id: 'idealistic', label: 'Idealistic', cat: 'Decisions', desc: 'Pursues high principles' },
    { id: 'realistic', label: 'Realistic', cat: 'Decisions', desc: 'Accepts things as they are' },
    { id: 'cautious', label: 'Cautious', cat: 'Decisions', desc: 'Careful to avoid risk' },
    { id: 'risk-taking', label: 'Risk-taking', cat: 'Decisions', desc: 'Willing to take chances' },
    { id: 'calculated', label: 'Calculated', cat: 'Decisions', desc: 'Carefully considered' },
    { id: 'deliberate', label: 'Deliberate', cat: 'Decisions', desc: 'Done consciously' },
    { id: 'spontaneous', label: 'Spontaneous', cat: 'Decisions', desc: 'Acts without planning' },
    { id: 'impulsive', label: 'Impulsive', cat: 'Decisions', desc: 'Acts on impulse' },
    { id: 'indecisive', label: 'Indecisive', cat: 'Decisions', desc: 'Has trouble deciding' },

    // Thinking (10)
    { id: 'skeptical', label: 'Skeptical', cat: 'Thinking', desc: 'Questions claims' },
    { id: 'credulous', label: 'Credulous', cat: 'Thinking', desc: 'Too ready to believe' },
    { id: 'cynical', label: 'Cynical', cat: 'Thinking', desc: 'Distrusts motives' },
    { id: 'trusting', label: 'Trusting', cat: 'Thinking', desc: 'Inclined to trust' },
    { id: 'literal', label: 'Literal', cat: 'Thinking', desc: 'Takes things at face value' },
    { id: 'abstract', label: 'Abstract', cat: 'Thinking', desc: 'Thinks in concepts' },
    { id: 'concrete', label: 'Concrete', cat: 'Thinking', desc: 'Thinks in specifics' },
    { id: 'daydreamer', label: 'Daydreamer', cat: 'Thinking', desc: 'Lost in fantasy' },
    { id: 'realist', label: 'Realist', cat: 'Thinking', desc: 'Accepts reality' },
    { id: 'philosophical', label: 'Philosophical', cat: 'Thinking', desc: 'Ponders deep questions' },

    // Values (12)
    { id: 'traditional', label: 'Traditional', cat: 'Values', desc: 'Values established customs' },
    { id: 'progressive', label: 'Progressive', cat: 'Values', desc: 'Favors change' },
    { id: 'conservative', label: 'Conservative', cat: 'Values', desc: 'Prefers tradition' },
    { id: 'unconventional', label: 'Unconventional', cat: 'Values', desc: 'Does things differently' },
    { id: 'nonconformist', label: 'Nonconformist', cat: 'Values', desc: 'Rejects accepted behavior' },
    { id: 'conformist', label: 'Conformist', cat: 'Values', desc: 'Follows conventions' },
    { id: 'rebellious', label: 'Rebellious', cat: 'Values', desc: 'Resists authority' },
    { id: 'spiritual', label: 'Spiritual', cat: 'Values', desc: 'Concerned with the spirit' },
    { id: 'materialistic', label: 'Materialistic', cat: 'Values', desc: 'Values possessions' },
    { id: 'minimalist', label: 'Minimalist', cat: 'Values', desc: 'Prefers simplicity' },
    { id: 'hedonistic', label: 'Hedonistic', cat: 'Values', desc: 'Pursues pleasure' },
    { id: 'ascetic', label: 'Ascetic', cat: 'Values', desc: 'Practices self-denial' },

    // Social Style (10)
    { id: 'formal', label: 'Formal', cat: 'Social Style', desc: 'Proper and ceremonious' },
    { id: 'informal', label: 'Informal', cat: 'Social Style', desc: 'Casual and relaxed' },
    { id: 'private', label: 'Private', cat: 'Social Style', desc: 'Keeps life hidden' },
    { id: 'open-book', label: 'Open Book', cat: 'Social Style', desc: 'Shares everything' },
    { id: 'mysterious', label: 'Mysterious', cat: 'Social Style', desc: 'Hard to understand' },
    { id: 'enigmatic', label: 'Enigmatic', cat: 'Social Style', desc: 'Puzzling and mysterious' },
    { id: 'flamboyant', label: 'Flamboyant', cat: 'Social Style', desc: 'Showy and dramatic' },
    { id: 'eccentric', label: 'Eccentric', cat: 'Social Style', desc: 'Unconventional and peculiar' },
    { id: 'bohemian', label: 'Bohemian', cat: 'Social Style', desc: 'Artistic and unconventional' },
    { id: 'mainstream', label: 'Mainstream', cat: 'Social Style', desc: 'Follows popular trends' },

    // Communication Style (10)
    { id: 'blunt', label: 'Blunt', cat: 'Comm Style', desc: 'Direct without softening' },
    { id: 'tactful', label: 'Tactful', cat: 'Comm Style', desc: 'Careful not to offend' },
    { id: 'sarcastic', label: 'Sarcastic', cat: 'Comm Style', desc: 'Uses ironic remarks' },
    { id: 'dry', label: 'Dry', cat: 'Comm Style', desc: 'Subtle, deadpan humor' },
    { id: 'deadpan', label: 'Deadpan', cat: 'Comm Style', desc: 'Expressionless delivery' },
    { id: 'dramatic', label: 'Dramatic', cat: 'Comm Style', desc: 'Theatrical expression' },
    { id: 'matter-of-fact', label: 'Matter-of-fact', cat: 'Comm Style', desc: 'Unemotional and practical' },
    { id: 'flowery', label: 'Flowery', cat: 'Comm Style', desc: 'Elaborate language' },
    { id: 'plain-spoken', label: 'Plain-spoken', cat: 'Comm Style', desc: 'Simple and direct' },
    { id: 'diplomatic', label: 'Diplomatic', cat: 'Comm Style', desc: 'Handles delicately' },

    // Focus (8)
    { id: 'detail-oriented', label: 'Detail-oriented', cat: 'Focus', desc: 'Attends to small things' },
    { id: 'big-picture', label: 'Big-picture', cat: 'Focus', desc: 'Sees overall pattern' },
    { id: 'perfectionist', label: 'Perfectionist', cat: 'Focus', desc: 'Demands perfection' },
    { id: 'present-focused', label: 'Present-focused', cat: 'Focus', desc: 'Lives in the now' },
    { id: 'future-focused', label: 'Future-focused', cat: 'Focus', desc: 'Plans ahead' },
    { id: 'past-focused', label: 'Past-focused', cat: 'Focus', desc: 'Dwells on past' },
    { id: 'nostalgic', label: 'Nostalgic', cat: 'Focus', desc: 'Attached to the past' },
    { id: 'forward-thinking', label: 'Forward-thinking', cat: 'Focus', desc: 'Plans for the future' },

    // Independence (8)
    { id: 'independent', label: 'Independent', cat: 'Independence', desc: 'Self-reliant' },
    { id: 'dependent', label: 'Dependent', cat: 'Independence', desc: 'Relies on others' },
    { id: 'self-sufficient', label: 'Self-sufficient', cat: 'Independence', desc: 'Needs no help' },
    { id: 'collaborative', label: 'Collaborative', cat: 'Independence', desc: 'Works with others' },
    { id: 'lone-wolf', label: 'Lone Wolf', cat: 'Independence', desc: 'Prefers working alone' },
    { id: 'team-player', label: 'Team Player', cat: 'Independence', desc: 'Works well in groups' },
    { id: 'competitive', label: 'Competitive', cat: 'Independence', desc: 'Driven to win' },
    { id: 'cooperative', label: 'Cooperative', cat: 'Independence', desc: 'Works with others' },

    // Quirks (15)
    { id: 'superstitious', label: 'Superstitious', cat: 'Quirks', desc: 'Believes in luck/omens' },
    { id: 'habitual', label: 'Habitual', cat: 'Quirks', desc: 'Follows routines' },
    { id: 'ritualistic', label: 'Ritualistic', cat: 'Quirks', desc: 'Performs rituals' },
    { id: 'absent-minded', label: 'Absent-minded', cat: 'Quirks', desc: 'Forgetful, distracted' },
    { id: 'scatterbrained', label: 'Scatterbrained', cat: 'Quirks', desc: 'Disorganized thinking' },
    { id: 'hyperfocused', label: 'Hyperfocused', cat: 'Quirks', desc: 'Intensely concentrated' },
    { id: 'night-owl', label: 'Night Owl', cat: 'Quirks', desc: 'Active at night' },
    { id: 'early-bird', label: 'Early Bird', cat: 'Quirks', desc: 'Active in morning' },
    { id: 'workaholic', label: 'Workaholic', cat: 'Quirks', desc: 'Obsessed with work' },
    { id: 'thrill-seeker', label: 'Thrill-seeker', cat: 'Quirks', desc: 'Seeks excitement' },
    { id: 'homebody', label: 'Homebody', cat: 'Quirks', desc: 'Prefers staying home' },
    { id: 'wanderer', label: 'Wanderer', cat: 'Quirks', desc: 'Loves to travel' },
    { id: 'collector', label: 'Collector', cat: 'Quirks', desc: 'Gathers items' },
    { id: 'neat-freak', label: 'Neat Freak', cat: 'Quirks', desc: 'Obsessed with cleanliness' },
    { id: 'messy', label: 'Messy', cat: 'Quirks', desc: 'Disorganized surroundings' },
  ],

  negative: [
    // Selfishness (10)
    { id: 'selfish', label: 'Selfish', cat: 'Selfishness', desc: 'Prioritizes self over others' },
    { id: 'self-centered', label: 'Self-centered', cat: 'Selfishness', desc: 'Focused on self' },
    { id: 'egotistical', label: 'Egotistical', cat: 'Selfishness', desc: 'Excessively conceited' },
    { id: 'narcissistic', label: 'Narcissistic', cat: 'Selfishness', desc: 'Excessive self-love' },
    { id: 'self-absorbed', label: 'Self-absorbed', cat: 'Selfishness', desc: 'Preoccupied with self' },
    { id: 'entitled', label: 'Entitled', cat: 'Selfishness', desc: 'Believes deserves special treatment' },
    { id: 'greedy', label: 'Greedy', cat: 'Selfishness', desc: 'Excessive desire for more' },
    { id: 'stingy', label: 'Stingy', cat: 'Selfishness', desc: 'Unwilling to give' },
    { id: 'miserly', label: 'Miserly', cat: 'Selfishness', desc: 'Hoards wealth' },
    { id: 'ungrateful', label: 'Ungrateful', cat: 'Selfishness', desc: 'Not thankful' },

    // Hostility (18)
    { id: 'hostile', label: 'Hostile', cat: 'Hostility', desc: 'Unfriendly and aggressive' },
    { id: 'aggressive', label: 'Aggressive', cat: 'Hostility', desc: 'Ready to attack' },
    { id: 'antagonistic', label: 'Antagonistic', cat: 'Hostility', desc: 'Actively hostile' },
    { id: 'belligerent', label: 'Belligerent', cat: 'Hostility', desc: 'Hostile and aggressive' },
    { id: 'combative', label: 'Combative', cat: 'Hostility', desc: 'Ready to fight' },
    { id: 'confrontational', label: 'Confrontational', cat: 'Hostility', desc: 'Tends to confront' },
    { id: 'quarrelsome', label: 'Quarrelsome', cat: 'Hostility', desc: 'Given to arguing' },
    { id: 'argumentative', label: 'Argumentative', cat: 'Hostility', desc: 'Loves to argue' },
    { id: 'spiteful', label: 'Spiteful', cat: 'Hostility', desc: 'Wanting to hurt' },
    { id: 'malicious', label: 'Malicious', cat: 'Hostility', desc: 'Intending harm' },
    { id: 'vindictive', label: 'Vindictive', cat: 'Hostility', desc: 'Seeks revenge' },
    { id: 'vengeful', label: 'Vengeful', cat: 'Hostility', desc: 'Seeking vengeance' },
    { id: 'cruel', label: 'Cruel', cat: 'Hostility', desc: 'Willfully causes pain' },
    { id: 'sadistic', label: 'Sadistic', cat: 'Hostility', desc: 'Enjoys others\' pain' },
    { id: 'brutal', label: 'Brutal', cat: 'Hostility', desc: 'Savagely violent' },
    { id: 'ruthless', label: 'Ruthless', cat: 'Hostility', desc: 'Without pity' },
    { id: 'merciless', label: 'Merciless', cat: 'Hostility', desc: 'Shows no mercy' },
    { id: 'vicious', label: 'Vicious', cat: 'Hostility', desc: 'Deliberately cruel' },

    // Manipulation (10)
    { id: 'manipulative', label: 'Manipulative', cat: 'Manipulation', desc: 'Controls others deceptively' },
    { id: 'deceitful', label: 'Deceitful', cat: 'Manipulation', desc: 'Deceives others' },
    { id: 'deceptive', label: 'Deceptive', cat: 'Manipulation', desc: 'Misleads others' },
    { id: 'scheming', label: 'Scheming', cat: 'Manipulation', desc: 'Makes secret plans' },
    { id: 'conniving', label: 'Conniving', cat: 'Manipulation', desc: 'Secretly plans harm' },
    { id: 'calculating', label: 'Calculating', cat: 'Manipulation', desc: 'Coldly plans' },
    { id: 'exploitative', label: 'Exploitative', cat: 'Manipulation', desc: 'Uses others unfairly' },
    { id: 'opportunistic', label: 'Opportunistic', cat: 'Manipulation', desc: 'Exploits circumstances' },
    { id: 'two-faced', label: 'Two-faced', cat: 'Manipulation', desc: 'Insincere and deceitful' },
    { id: 'backstabbing', label: 'Backstabbing', cat: 'Manipulation', desc: 'Betrays trust' },

    // Coldness (10)
    { id: 'cold', label: 'Cold', cat: 'Coldness', desc: 'Emotionally distant' },
    { id: 'aloof', label: 'Aloof', cat: 'Coldness', desc: 'Distant and uninvolved' },
    { id: 'distant', label: 'Distant', cat: 'Coldness', desc: 'Emotionally remote' },
    { id: 'unfeeling', label: 'Unfeeling', cat: 'Coldness', desc: 'Lacks sympathy' },
    { id: 'callous', label: 'Callous', cat: 'Coldness', desc: 'Insensitive and cruel' },
    { id: 'heartless', label: 'Heartless', cat: 'Coldness', desc: 'Lacking compassion' },
    { id: 'indifferent', label: 'Indifferent', cat: 'Coldness', desc: 'No interest or concern' },
    { id: 'apathetic', label: 'Apathetic', cat: 'Coldness', desc: 'Lacking enthusiasm' },
    { id: 'unsympathetic', label: 'Unsympathetic', cat: 'Coldness', desc: 'Not showing sympathy' },
    { id: 'dismissive', label: 'Dismissive', cat: 'Coldness', desc: 'Treats as unworthy' },

    // Dishonesty (10)
    { id: 'dishonest', label: 'Dishonest', cat: 'Dishonesty', desc: 'Lies and deceives' },
    { id: 'liar', label: 'Liar', cat: 'Dishonesty', desc: 'Tells lies habitually' },
    { id: 'untruthful', label: 'Untruthful', cat: 'Dishonesty', desc: 'Not truthful' },
    { id: 'insincere', label: 'Insincere', cat: 'Dishonesty', desc: 'Not genuine' },
    { id: 'hypocritical', label: 'Hypocritical', cat: 'Dishonesty', desc: 'Says one thing, does another' },
    { id: 'phony', label: 'Phony', cat: 'Dishonesty', desc: 'Not genuine' },
    { id: 'fake', label: 'Fake', cat: 'Dishonesty', desc: 'Not authentic' },
    { id: 'treacherous', label: 'Treacherous', cat: 'Dishonesty', desc: 'Guilty of betrayal' },
    { id: 'disloyal', label: 'Disloyal', cat: 'Dishonesty', desc: 'Betrays allegiance' },
    { id: 'unfaithful', label: 'Unfaithful', cat: 'Dishonesty', desc: 'Not true to commitments' },

    // Pride (12)
    { id: 'arrogant', label: 'Arrogant', cat: 'Pride', desc: 'Exaggerated self-importance' },
    { id: 'proud', label: 'Proud', cat: 'Pride', desc: 'Excessively proud' },
    { id: 'haughty', label: 'Haughty', cat: 'Pride', desc: 'Arrogantly superior' },
    { id: 'pompous', label: 'Pompous', cat: 'Pride', desc: 'Self-important' },
    { id: 'conceited', label: 'Conceited', cat: 'Pride', desc: 'Excessively proud of oneself' },
    { id: 'vain', label: 'Vain', cat: 'Pride', desc: 'Excessive pride in appearance' },
    { id: 'smug', label: 'Smug', cat: 'Pride', desc: 'Excessively pleased with self' },
    { id: 'snobbish', label: 'Snobbish', cat: 'Pride', desc: 'Looks down on others' },
    { id: 'condescending', label: 'Condescending', cat: 'Pride', desc: 'Patronizingly superior' },
    { id: 'pretentious', label: 'Pretentious', cat: 'Pride', desc: 'Claims undeserved importance' },
    { id: 'boastful', label: 'Boastful', cat: 'Pride', desc: 'Brags excessively' },
    { id: 'show-off', label: 'Show-off', cat: 'Pride', desc: 'Displays abilities excessively' },

    // Weakness (9)
    { id: 'cowardly', label: 'Cowardly', cat: 'Weakness', desc: 'Lacks courage' },
    { id: 'fearful', label: 'Fearful', cat: 'Weakness', desc: 'Afraid of things' },
    { id: 'timid', label: 'Timid', cat: 'Weakness', desc: 'Lacking courage' },
    { id: 'spineless', label: 'Spineless', cat: 'Weakness', desc: 'Lacks courage or willpower' },
    { id: 'weak-willed', label: 'Weak-willed', cat: 'Weakness', desc: 'Easily influenced' },
    { id: 'pushover', label: 'Pushover', cat: 'Weakness', desc: 'Easily persuaded' },
    { id: 'submissive', label: 'Submissive', cat: 'Weakness', desc: 'Yields to others' },
    { id: 'doormat', label: 'Doormat', cat: 'Weakness', desc: 'Lets others walk over them' },
    { id: 'passive', label: 'Passive', cat: 'Weakness', desc: 'Accepts without resistance' },

    // Irresponsibility (10)
    { id: 'lazy', label: 'Lazy', cat: 'Irresponsibility', desc: 'Avoids work' },
    { id: 'slothful', label: 'Slothful', cat: 'Irresponsibility', desc: 'Reluctant to work' },
    { id: 'negligent', label: 'Negligent', cat: 'Irresponsibility', desc: 'Fails to take care' },
    { id: 'careless', label: 'Careless', cat: 'Irresponsibility', desc: 'Not careful' },
    { id: 'reckless', label: 'Reckless', cat: 'Irresponsibility', desc: 'Disregards consequences' },
    { id: 'irresponsible', label: 'Irresponsible', cat: 'Irresponsibility', desc: 'Not responsible' },
    { id: 'unreliable', label: 'Unreliable', cat: 'Irresponsibility', desc: 'Cannot be depended on' },
    { id: 'flaky', label: 'Flaky', cat: 'Irresponsibility', desc: 'Unreliable' },
    { id: 'inconsistent', label: 'Inconsistent', cat: 'Irresponsibility', desc: 'Not consistent' },
    { id: 'procrastinator', label: 'Procrastinator', cat: 'Irresponsibility', desc: 'Delays tasks' },

    // Anger (10)
    { id: 'angry', label: 'Angry', cat: 'Anger', desc: 'Easily angered' },
    { id: 'hot-tempered', label: 'Hot-tempered', cat: 'Anger', desc: 'Quick to anger' },
    { id: 'short-tempered', label: 'Short-tempered', cat: 'Anger', desc: 'Easily angered' },
    { id: 'irritable', label: 'Irritable', cat: 'Anger', desc: 'Easily annoyed' },
    { id: 'volatile', label: 'Volatile', cat: 'Anger', desc: 'Explosive temperament' },
    { id: 'explosive', label: 'Explosive', cat: 'Anger', desc: 'Bursts into anger' },
    { id: 'rageful', label: 'Rageful', cat: 'Anger', desc: 'Full of rage' },
    { id: 'resentful', label: 'Resentful', cat: 'Anger', desc: 'Feels bitterness' },
    { id: 'bitter', label: 'Bitter', cat: 'Anger', desc: 'Angry and resentful' },
    { id: 'wrathful', label: 'Wrathful', cat: 'Anger', desc: 'Full of wrath' },

    // Fear/Anxiety (10)
    { id: 'anxious', label: 'Anxious', cat: 'Fear', desc: 'Constantly worried' },
    { id: 'nervous', label: 'Nervous', cat: 'Fear', desc: 'Easily agitated' },
    { id: 'worried', label: 'Worried', cat: 'Fear', desc: 'Troubled by concerns' },
    { id: 'paranoid', label: 'Paranoid', cat: 'Fear', desc: 'Irrationally suspicious' },
    { id: 'suspicious', label: 'Suspicious', cat: 'Fear', desc: 'Distrustful' },
    { id: 'distrustful', label: 'Distrustful', cat: 'Fear', desc: 'Doesn\'t trust' },
    { id: 'insecure', label: 'Insecure', cat: 'Fear', desc: 'Lacks confidence' },
    { id: 'self-doubting', label: 'Self-doubting', cat: 'Fear', desc: 'Doubts own abilities' },
    { id: 'phobic', label: 'Phobic', cat: 'Fear', desc: 'Has irrational fears' },
    { id: 'neurotic', label: 'Neurotic', cat: 'Fear', desc: 'Prone to anxiety' },

    // Sadness (10)
    { id: 'pessimistic', label: 'Pessimistic', cat: 'Sadness', desc: 'Expects the worst' },
    { id: 'negative', label: 'Negative', cat: 'Sadness', desc: 'Focuses on bad' },
    { id: 'cynical', label: 'Cynical', cat: 'Sadness', desc: 'Distrusts motives' },
    { id: 'depressive', label: 'Depressive', cat: 'Sadness', desc: 'Prone to depression' },
    { id: 'gloomy', label: 'Gloomy', cat: 'Sadness', desc: 'Dark and depressing' },
    { id: 'morose', label: 'Morose', cat: 'Sadness', desc: 'Sullen and ill-tempered' },
    { id: 'sullen', label: 'Sullen', cat: 'Sadness', desc: 'Bad-tempered and sulky' },
    { id: 'moody', label: 'Moody', cat: 'Sadness', desc: 'Given to moods' },
    { id: 'brooding', label: 'Brooding', cat: 'Sadness', desc: 'Dark and threatening' },
    { id: 'melancholy', label: 'Melancholy', cat: 'Sadness', desc: 'Deep sadness' },

    // Jealousy (6)
    { id: 'jealous', label: 'Jealous', cat: 'Jealousy', desc: 'Envious of others' },
    { id: 'envious', label: 'Envious', cat: 'Jealousy', desc: 'Wants what others have' },
    { id: 'covetous', label: 'Covetous', cat: 'Jealousy', desc: 'Wants others\' possessions' },
    { id: 'possessive', label: 'Possessive', cat: 'Jealousy', desc: 'Overly controlling' },
    { id: 'territorial', label: 'Territorial', cat: 'Jealousy', desc: 'Protective of territory' },
    { id: 'resentful', label: 'Resentful', cat: 'Jealousy', desc: 'Feels bitterness at others' },

    // Control (8)
    { id: 'controlling', label: 'Controlling', cat: 'Control', desc: 'Needs to dominate' },
    { id: 'domineering', label: 'Domineering', cat: 'Control', desc: 'Overbearing' },
    { id: 'authoritarian', label: 'Authoritarian', cat: 'Control', desc: 'Demands obedience' },
    { id: 'bossy', label: 'Bossy', cat: 'Control', desc: 'Gives orders' },
    { id: 'overbearing', label: 'Overbearing', cat: 'Control', desc: 'Unpleasantly dominant' },
    { id: 'micromanaging', label: 'Micromanaging', cat: 'Control', desc: 'Controls every detail' },
    { id: 'tyrannical', label: 'Tyrannical', cat: 'Control', desc: 'Exercises power cruelly' },
    { id: 'dictatorial', label: 'Dictatorial', cat: 'Control', desc: 'Like a dictator' },

    // Stubbornness (8)
    { id: 'stubborn', label: 'Stubborn', cat: 'Stubbornness', desc: 'Refuses to change' },
    { id: 'obstinate', label: 'Obstinate', cat: 'Stubbornness', desc: 'Stubbornly refuses' },
    { id: 'pig-headed', label: 'Pig-headed', cat: 'Stubbornness', desc: 'Stupidly stubborn' },
    { id: 'inflexible', label: 'Inflexible', cat: 'Stubbornness', desc: 'Unwilling to change' },
    { id: 'rigid', label: 'Rigid', cat: 'Stubbornness', desc: 'Not flexible' },
    { id: 'unyielding', label: 'Unyielding', cat: 'Stubbornness', desc: 'Not giving way' },
    { id: 'uncompromising', label: 'Uncompromising', cat: 'Stubbornness', desc: 'Refuses to compromise' },
    { id: 'close-minded', label: 'Close-minded', cat: 'Stubbornness', desc: 'Not open to new ideas' },

    // Impulsivity (8)
    { id: 'impulsive', label: 'Impulsive', cat: 'Impulsivity', desc: 'Acts without thinking' },
    { id: 'rash', label: 'Rash', cat: 'Impulsivity', desc: 'Acts hastily' },
    { id: 'hasty', label: 'Hasty', cat: 'Impulsivity', desc: 'Done too quickly' },
    { id: 'impatient', label: 'Impatient', cat: 'Impulsivity', desc: 'Unable to wait' },
    { id: 'erratic', label: 'Erratic', cat: 'Impulsivity', desc: 'Unpredictable' },
    { id: 'unpredictable', label: 'Unpredictable', cat: 'Impulsivity', desc: 'Cannot be predicted' },
    { id: 'chaotic', label: 'Chaotic', cat: 'Impulsivity', desc: 'Complete disorder' },
    { id: 'wild', label: 'Wild', cat: 'Impulsivity', desc: 'Uncontrolled and unruly' },

    // Obsession (6)
    { id: 'obsessive', label: 'Obsessive', cat: 'Obsession', desc: 'Unhealthily fixated' },
    { id: 'compulsive', label: 'Compulsive', cat: 'Obsession', desc: 'Driven by urges' },
    { id: 'addictive', label: 'Addictive', cat: 'Obsession', desc: 'Prone to addiction' },
    { id: 'fanatical', label: 'Fanatical', cat: 'Obsession', desc: 'Excessively enthusiastic' },
    { id: 'fixated', label: 'Fixated', cat: 'Obsession', desc: 'Focused obsessively' },
    { id: 'manic', label: 'Manic', cat: 'Obsession', desc: 'Frenzied and obsessive' },

    // Social Flaws (10)
    { id: 'socially-awkward', label: 'Socially Awkward', cat: 'Social', desc: 'Uncomfortable socially' },
    { id: 'awkward', label: 'Awkward', cat: 'Social', desc: 'Lacking grace' },
    { id: 'shy', label: 'Shy', cat: 'Social', desc: 'Nervous around others' },
    { id: 'withdrawn', label: 'Withdrawn', cat: 'Social', desc: 'Not sociable' },
    { id: 'reclusive', label: 'Reclusive', cat: 'Social', desc: 'Avoids others' },
    { id: 'antisocial', label: 'Antisocial', cat: 'Social', desc: 'Contrary to society' },
    { id: 'misanthropic', label: 'Misanthropic', cat: 'Social', desc: 'Dislikes humanity' },
    { id: 'attention-seeking', label: 'Attention-seeking', cat: 'Social', desc: 'Craves spotlight' },
    { id: 'clingy', label: 'Clingy', cat: 'Social', desc: 'Overly dependent' },
    { id: 'needy', label: 'Needy', cat: 'Social', desc: 'Requires constant attention' },

    // Rudeness (10)
    { id: 'rude', label: 'Rude', cat: 'Rudeness', desc: 'Offensively impolite' },
    { id: 'impolite', label: 'Impolite', cat: 'Rudeness', desc: 'Not polite' },
    { id: 'disrespectful', label: 'Disrespectful', cat: 'Rudeness', desc: 'Lacking respect' },
    { id: 'tactless', label: 'Tactless', cat: 'Rudeness', desc: 'Lacks tact' },
    { id: 'inconsiderate', label: 'Inconsiderate', cat: 'Rudeness', desc: 'Not thoughtful' },
    { id: 'insensitive', label: 'Insensitive', cat: 'Rudeness', desc: 'Not aware of feelings' },
    { id: 'abrasive', label: 'Abrasive', cat: 'Rudeness', desc: 'Rough manner' },
    { id: 'obnoxious', label: 'Obnoxious', cat: 'Rudeness', desc: 'Extremely unpleasant' },
    { id: 'insufferable', label: 'Insufferable', cat: 'Rudeness', desc: 'Unbearable' },
    { id: 'offensive', label: 'Offensive', cat: 'Rudeness', desc: 'Causing offense' },

    // Judgment (9)
    { id: 'judgmental', label: 'Judgmental', cat: 'Judgment', desc: 'Critically judges others' },
    { id: 'critical', label: 'Critical', cat: 'Judgment', desc: 'Finds fault' },
    { id: 'harsh', label: 'Harsh', cat: 'Judgment', desc: 'Cruelly critical' },
    { id: 'unforgiving', label: 'Unforgiving', cat: 'Judgment', desc: 'Doesn\'t forgive' },
    { id: 'intolerant', label: 'Intolerant', cat: 'Judgment', desc: 'Not tolerant' },
    { id: 'prejudiced', label: 'Prejudiced', cat: 'Judgment', desc: 'Has unfair opinions' },
    { id: 'biased', label: 'Biased', cat: 'Judgment', desc: 'Unfairly prejudiced' },
    { id: 'narrow-minded', label: 'Narrow-minded', cat: 'Judgment', desc: 'Not open to other views' },
    { id: 'bigoted', label: 'Bigoted', cat: 'Judgment', desc: 'Intolerant toward others' },
  ]
};

          const positiveTraits = data.traits.positiveTraits || [];
          const neutralTraits = data.traits.neutralTraits || [];
          const negativeTraits = data.traits.negativeTraits || [];

          const totalTraits = positiveTraits.length + neutralTraits.length + negativeTraits.length;

          const isValid = totalTraits >= 6 && totalTraits <= 12 &&
            positiveTraits.length >= 2 && positiveTraits.length <= 4 &&
            neutralTraits.length >= 2 && neutralTraits.length <= 4 &&
            negativeTraits.length >= 2 && negativeTraits.length <= 4;

          const toggleTrait = (type, traitId) => {
            const currentTraits = type === 'positive' ? positiveTraits :
                                  type === 'neutral' ? neutralTraits : negativeTraits;
            const fieldName = type === 'positive' ? 'positiveTraits' :
                             type === 'neutral' ? 'neutralTraits' : 'negativeTraits';

            if (currentTraits.includes(traitId)) {
              // Remove
              update('traits', fieldName, currentTraits.filter(t => t !== traitId));
            } else {
              // Add (check max)
              if (currentTraits.length < 4) {
                update('traits', fieldName, [...currentTraits, traitId]);
              }
            }
          };

          const TraitSelector = ({ type, traits, selected, color }) => {
            const [expanded, setExpanded] = React.useState(false);
            const categories = [...new Set(traits.map(t => t.cat))];

            return (
              <div className={`border-2 rounded-sm overflow-hidden ${
                type === 'positive' ? 'border-green-300' :
                type === 'neutral' ? 'border-gray-300' :
                'border-red-300'
              }`}>
                {/* Header */}
                <div className={`px-4 py-3 ${
                  type === 'positive' ? 'bg-green-100' :
                  type === 'neutral' ? 'bg-gray-100' :
                  'bg-red-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-bold">
                        {type === 'positive' && '✦ POSITIVE TRAITS'}
                        {type === 'neutral' && '◈ NEUTRAL TRAITS'}
                        {type === 'negative' && '✗ NEGATIVE TRAITS / FLAWS'}
                      </span>
                      <span className={`ml-2 font-mono text-xs ${
                        selected.length < 2 ? 'text-red-600' :
                        selected.length > 4 ? 'text-red-600' :
                        'text-gray-500'
                      }`}>
                        ({selected.length}/4) {selected.length < 2 && '⚠️ min 2'}
                      </span>
                    </div>
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="font-mono text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                    >
                      {expanded ? '▼ Fechar' : '▶ Selecionar'}
                    </button>
                  </div>

                  {/* Selected Tags */}
                  {selected.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selected.map(traitId => {
                        const trait = traits.find(t => t.id === traitId);
                        return trait ? (
                          <span
                            key={traitId}
                            onClick={() => toggleTrait(type, traitId)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                              type === 'positive' ? 'bg-green-200 text-green-800' :
                              type === 'neutral' ? 'bg-gray-200 text-gray-800' :
                              'bg-red-200 text-red-800'
                            }`}
                          >
                            {trait.label} <span className="text-[10px]">×</span>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                {/* Expanded Selection */}
                {expanded && (
                  <div className="p-4 bg-white max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                      <div key={cat} className="mb-3">
                        <h5 className="font-mono text-[10px] uppercase text-gray-500 mb-2">{cat}</h5>
                        <div className="flex flex-wrap gap-1">
                          {traits.filter(t => t.cat === cat).map(trait => (
                            <button
                              key={trait.id}
                              onClick={() => toggleTrait(type, trait.id)}
                              disabled={!selected.includes(trait.id) && selected.length >= 4}
                              title={trait.desc}
                              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                selected.includes(trait.id)
                                  ? type === 'positive' ? 'bg-green-500 text-white' :
                                    type === 'neutral' ? 'bg-gray-500 text-white' :
                                    'bg-red-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              } ${!selected.includes(trait.id) && selected.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {trait.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          };

          return (
            <div className="space-y-4">
              {/* Validation Status */}
              <div className={`p-3 rounded-sm border-2 ${
                isValid ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">
                    {isValid ? '✓ Perfil válido' : '⚠️ Ajuste necessário'}
                  </span>
                  <span className="font-mono text-sm font-bold">
                    Total: {totalTraits}/12 traits
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div className={`p-1 rounded ${positiveTraits.length >= 2 && positiveTraits.length <= 4 ? 'bg-green-200' : 'bg-red-200'}`}>
                    <span className="font-mono text-[10px]">Positivos: {positiveTraits.length}/4</span>
                  </div>
                  <div className={`p-1 rounded ${neutralTraits.length >= 2 && neutralTraits.length <= 4 ? 'bg-gray-200' : 'bg-red-200'}`}>
                    <span className="font-mono text-[10px]">Neutros: {neutralTraits.length}/4</span>
                  </div>
                  <div className={`p-1 rounded ${negativeTraits.length >= 2 && negativeTraits.length <= 4 ? 'bg-red-200' : 'bg-amber-200'}`}>
                    <span className="font-mono text-[10px]">Negativos: {negativeTraits.length}/4</span>
                  </div>
                </div>
              </div>

              {/* Trait Selectors */}
              <TraitSelector
                type="positive"
                traits={traitsDatabase.positive}
                selected={positiveTraits}
              />

              <TraitSelector
                type="neutral"
                traits={traitsDatabase.neutral}
                selected={neutralTraits}
              />

              <TraitSelector
                type="negative"
                traits={traitsDatabase.negative}
                selected={negativeTraits}
              />

              {/* Hidden/Shadow Traits */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-purple-50 border border-purple-200 rounded-sm p-4 mb-4">
                  <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">🌑 HIDDEN / SHADOW TRAITS</h3>
                  <p className="font-mono text-xs text-purple-800 leading-relaxed">
                    Traits que o personagem <strong>possui mas esconde</strong> dos outros. Podem ser positivos (bondade escondida por fachada fria),
                    neutros (introversão mascarada) ou negativos (crueldade sob gentileza). Selecione <strong>1-3 traits</strong> que não estejam nos traits visíveis.
                  </p>
                </div>

                {(() => {
                  const hiddenTraits = data.traits.hiddenTraits || [];
                  const allVisibleTraits = [...positiveTraits, ...neutralTraits, ...negativeTraits];
                  const allTraits = [...traitsDatabase.positive, ...traitsDatabase.neutral, ...traitsDatabase.negative];

                  // Group all traits by type for display
                  const traitsByType = {
                    positive: traitsDatabase.positive,
                    neutral: traitsDatabase.neutral,
                    negative: traitsDatabase.negative
                  };

                  const toggleHiddenTrait = (traitId) => {
                    if (hiddenTraits.includes(traitId)) {
                      update('traits', 'hiddenTraits', hiddenTraits.filter(t => t !== traitId));
                    } else if (hiddenTraits.length < 3 && !allVisibleTraits.includes(traitId)) {
                      update('traits', 'hiddenTraits', [...hiddenTraits, traitId]);
                    }
                  };

                  const getTraitInfo = (traitId) => {
                    return allTraits.find(t => t.id === traitId);
                  };

                  const getTraitType = (traitId) => {
                    if (traitsDatabase.positive.find(t => t.id === traitId)) return 'positive';
                    if (traitsDatabase.neutral.find(t => t.id === traitId)) return 'neutral';
                    return 'negative';
                  };

                  const [hiddenExpanded, setHiddenExpanded] = React.useState(false);

                  const isHiddenValid = hiddenTraits.length >= 1 && hiddenTraits.length <= 3;

                  return (
                    <div className={`border-2 rounded-sm overflow-hidden border-purple-300`}>
                      {/* Header */}
                      <div className="px-4 py-3 bg-purple-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-sm font-bold text-purple-900">
                              🌑 SHADOW TRAITS
                            </span>
                            <span className={`ml-2 font-mono text-xs ${
                              hiddenTraits.length < 1 ? 'text-amber-600' :
                              hiddenTraits.length > 3 ? 'text-red-600' :
                              'text-purple-600'
                            }`}>
                              ({hiddenTraits.length}/3) {hiddenTraits.length < 1 && '⚠️ min 1'}
                            </span>
                          </div>
                          <button
                            onClick={() => setHiddenExpanded(!hiddenExpanded)}
                            className="font-mono text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                          >
                            {hiddenExpanded ? '▼ Fechar' : '▶ Selecionar'}
                          </button>
                        </div>

                        {/* Selected Tags */}
                        {hiddenTraits.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {hiddenTraits.map(traitId => {
                              const trait = getTraitInfo(traitId);
                              const type = getTraitType(traitId);
                              return trait ? (
                                <span
                                  key={traitId}
                                  onClick={() => toggleHiddenTrait(traitId)}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                                    type === 'positive' ? 'bg-green-200 text-green-800 border border-green-400' :
                                    type === 'neutral' ? 'bg-gray-200 text-gray-800 border border-gray-400' :
                                    'bg-red-200 text-red-800 border border-red-400'
                                  }`}
                                >
                                  {type === 'positive' && '✦'}
                                  {type === 'neutral' && '◈'}
                                  {type === 'negative' && '✗'}
                                  {trait.label} <span className="text-[10px]">×</span>
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>

                      {/* Expanded Selection */}
                      {hiddenExpanded && (
                        <div className="p-4 bg-white max-h-80 overflow-y-auto">
                          {/* Positive Traits */}
                          <div className="mb-4">
                            <h5 className="font-mono text-xs font-bold text-green-700 mb-2 flex items-center gap-1">
                              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                              POSITIVE TRAITS (escondidos)
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {traitsByType.positive.map(trait => {
                                const isVisible = allVisibleTraits.includes(trait.id);
                                const isSelected = hiddenTraits.includes(trait.id);
                                const isDisabled = isVisible || (!isSelected && hiddenTraits.length >= 3);

                                return (
                                  <button
                                    key={trait.id}
                                    onClick={() => !isDisabled && toggleHiddenTrait(trait.id)}
                                    disabled={isDisabled}
                                    title={isVisible ? 'Já está nos traits visíveis' : trait.desc}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                      isSelected ? 'bg-green-500 text-white' :
                                      isVisible ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' :
                                      isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                                    }`}
                                  >
                                    {trait.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Neutral Traits */}
                          <div className="mb-4">
                            <h5 className="font-mono text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                              <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                              NEUTRAL TRAITS (escondidos)
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {traitsByType.neutral.map(trait => {
                                const isVisible = allVisibleTraits.includes(trait.id);
                                const isSelected = hiddenTraits.includes(trait.id);
                                const isDisabled = isVisible || (!isSelected && hiddenTraits.length >= 3);

                                return (
                                  <button
                                    key={trait.id}
                                    onClick={() => !isDisabled && toggleHiddenTrait(trait.id)}
                                    disabled={isDisabled}
                                    title={isVisible ? 'Já está nos traits visíveis' : trait.desc}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                      isSelected ? 'bg-gray-500 text-white' :
                                      isVisible ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' :
                                      isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      'bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer'
                                    }`}
                                  >
                                    {trait.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Negative Traits */}
                          <div className="mb-2">
                            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 flex items-center gap-1">
                              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                              NEGATIVE TRAITS (escondidos)
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {traitsByType.negative.map(trait => {
                                const isVisible = allVisibleTraits.includes(trait.id);
                                const isSelected = hiddenTraits.includes(trait.id);
                                const isDisabled = isVisible || (!isSelected && hiddenTraits.length >= 3);

                                return (
                                  <button
                                    key={trait.id}
                                    onClick={() => !isDisabled && toggleHiddenTrait(trait.id)}
                                    disabled={isDisabled}
                                    title={isVisible ? 'Já está nos traits visíveis' : trait.desc}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                      isSelected ? 'bg-red-500 text-white' :
                                      isVisible ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' :
                                      isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      'bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer'
                                    }`}
                                  >
                                    {trait.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <p className="font-mono text-[10px] text-gray-500 mt-3 italic">
                            💡 Traits riscados já estão selecionados como visíveis e não podem ser shadow traits.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Perceived vs Reality - Visual System */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 rounded-sm p-4 mb-4">
                  <h3 className="font-mono text-sm font-bold text-gray-800 mb-2">👁️💀 MÁSCARA vs VERDADE</h3>
                  <p className="font-mono text-xs text-gray-600 leading-relaxed">
                    O contraste entre como o personagem é <strong>percebido pelos outros</strong> e <strong>quem realmente é</strong> por dentro.
                    Baseado nos traits visíveis e ocultos que você selecionou.
                  </p>
                </div>

                {/* Visual Contrast Display */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Facade - What others see */}
                  <div className="bg-cyan-50 border-2 border-cyan-300 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">👁️</span>
                      <h4 className="font-mono text-sm font-bold text-cyan-800">FACHADA</h4>
                    </div>
                    <p className="font-mono text-[10px] text-cyan-600 mb-3">Como os outros o veem</p>

                    {positiveTraits.length + neutralTraits.length + negativeTraits.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {positiveTraits.map(traitId => {
                          const trait = traitsDatabase.positive.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className="px-2 py-1 bg-green-200 text-green-800 rounded text-[10px] font-mono">
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                        {neutralTraits.map(traitId => {
                          const trait = traitsDatabase.neutral.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-[10px] font-mono">
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                        {negativeTraits.map(traitId => {
                          const trait = traitsDatabase.negative.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className="px-2 py-1 bg-red-200 text-red-800 rounded text-[10px] font-mono">
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="font-mono text-[10px] text-cyan-400 italic">Selecione traits visíveis acima</p>
                    )}
                  </div>

                  {/* Interior - Hidden truth */}
                  <div className="bg-purple-50 border-2 border-purple-300 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">💀</span>
                      <h4 className="font-mono text-sm font-bold text-purple-800">INTERIOR</h4>
                    </div>
                    <p className="font-mono text-[10px] text-purple-600 mb-3">O que esconde dos outros</p>

                    {(data.traits.hiddenTraits || []).length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {(data.traits.hiddenTraits || []).map(traitId => {
                          const allTraits = [...traitsDatabase.positive, ...traitsDatabase.neutral, ...traitsDatabase.negative];
                          const trait = allTraits.find(t => t.id === traitId);
                          const isPositive = traitsDatabase.positive.find(t => t.id === traitId);
                          const isNeutral = traitsDatabase.neutral.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className={`px-2 py-1 rounded text-[10px] font-mono border ${
                              isPositive ? 'bg-green-100 text-green-800 border-green-400' :
                              isNeutral ? 'bg-gray-100 text-gray-800 border-gray-400' :
                              'bg-red-100 text-red-800 border-red-400'
                            }`}>
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="font-mono text-[10px] text-purple-400 italic">Selecione shadow traits acima</p>
                    )}
                  </div>
                </div>

                {/* Contrast Symbol */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-full">
                    <span className="font-mono text-lg">≠</span>
                  </div>
                </div>

                {/* Additional Context Fields */}
                <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-sm p-4">
                  <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">📝 Contexto Adicional</h4>

                  {/* Who knows the truth */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      Quem conhece a verdade?
                    </label>
                    <select
                      value={data.traits.whoKnowsTruth || ''}
                      onChange={(e) => update('traits', 'whoKnowsTruth', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                    >
                      <option value="">-- Selecione --</option>
                      <option value="nobody">Ninguém — Completamente isolado</option>
                      <option value="one-person">Uma pessoa — Confidente único</option>
                      <option value="family">Família próxima</option>
                      <option value="best-friend">Melhor amigo(a)</option>
                      <option value="partner">Parceiro(a) romântico(a)</option>
                      <option value="therapist">Terapeuta/Psicólogo</option>
                      <option value="few-people">Poucas pessoas de confiança</option>
                      <option value="everyone">Todos sabem — Não esconde mais</option>
                    </select>
                  </div>

                  {/* When does the mask fall */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      Quando a máscara cai?
                    </label>
                    <select
                      value={data.traits.maskFallsTrigger || ''}
                      onChange={(e) => update('traits', 'maskFallsTrigger', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                    >
                      <option value="">-- Selecione --</option>
                      <option value="never">Nunca — Controle absoluto</option>
                      <option value="alcohol">Sob efeito de álcool/substâncias</option>
                      <option value="extreme-stress">Estresse extremo</option>
                      <option value="anger">Momentos de raiva intensa</option>
                      <option value="intimacy">Momentos de intimidade</option>
                      <option value="vulnerability">Quando se sente vulnerável</option>
                      <option value="alone">Quando está sozinho(a)</option>
                      <option value="crisis">Em situações de crise</option>
                      <option value="triggered">Quando algo específico o(a) triggera</option>
                      <option value="gradually">Gradualmente com confiança</option>
                    </select>
                  </div>

                  {/* Why they hide it */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      Por que esconde essa parte de si?
                    </label>
                    <textarea
                      value={data.traits.whyHiding || ''}
                      onChange={(e) => update('traits', 'whyHiding', e.target.value)}
                      placeholder="e.g. Fear of rejection, past trauma, shame, protection..."
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
                    />
                  </div>

                  {/* What happens when revealed */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      O que acontece quando é revelado?
                    </label>
                    <textarea
                      value={data.traits.whenRevealed || ''}
                      onChange={(e) => update('traits', 'whenRevealed', e.target.value)}
                      placeholder="Ex: Fica em negação, ataca quem descobriu, fecha-se completamente, sente alívio..."
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    ),
    2: ( // Emotional Landscape
      <div className="space-y-6">
        {/* Header Explanation */}
        <div className="bg-rose-50 border border-rose-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-rose-900 mb-2">💗 PAISAGEM EMOCIONAL</h3>
          <p className="font-mono text-xs text-rose-800 leading-relaxed">
            Como seu personagem <strong>experimenta, processa e expressa</strong> emoções.
            Isso define como ele reage ao mundo e como os outros percebem seu estado emocional.
          </p>
        </div>

        {/* Emotional Range - Qualitative */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">🎭 Amplitude Emocional</h4>
            <span className="font-mono text-xs text-gray-500">Como expressa emoções</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Quão intensamente o personagem demonstra suas emoções para os outros.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Contido</span>
              <span>Expressivo</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={data.emotional.emotionalRange || 4}
              onChange={(e) => update('emotional', 'emotionalRange', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-200 via-gray-200 to-red-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.emotional.emotionalRange || 4) === 1 ? 'bg-blue-200 text-blue-800' :
                (data.emotional.emotionalRange || 4) === 2 ? 'bg-blue-100 text-blue-700' :
                (data.emotional.emotionalRange || 4) === 3 ? 'bg-slate-100 text-slate-700' :
                (data.emotional.emotionalRange || 4) === 4 ? 'bg-gray-100 text-gray-700' :
                (data.emotional.emotionalRange || 4) === 5 ? 'bg-orange-100 text-orange-700' :
                (data.emotional.emotionalRange || 4) === 6 ? 'bg-red-100 text-red-700' :
                'bg-red-200 text-red-800'
              }`}>
                {(data.emotional.emotionalRange || 4) === 1 && 'Estoico'}
                {(data.emotional.emotionalRange || 4) === 2 && 'Muito Contido'}
                {(data.emotional.emotionalRange || 4) === 3 && 'Reservado'}
                {(data.emotional.emotionalRange || 4) === 4 && 'Equilibrado'}
                {(data.emotional.emotionalRange || 4) === 5 && 'Emotivo'}
                {(data.emotional.emotionalRange || 4) === 6 && 'Muito Expressivo'}
                {(data.emotional.emotionalRange || 4) === 7 && 'Intenso/Dramático'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.emotional.emotionalRange || 4) === 1 && '💡 Quase nunca demonstra emoções. Rosto impassível. Outros não sabem o que sente.'}
              {(data.emotional.emotionalRange || 4) === 2 && '💡 Raramente mostra emoções. Controlado. Pode parecer frio ou distante.'}
              {(data.emotional.emotionalRange || 4) === 3 && '💡 Emoções sutis. Expressa principalmente com pessoas próximas.'}
              {(data.emotional.emotionalRange || 4) === 4 && '💡 Expressa emoções de forma apropriada ao contexto. Adaptável.'}
              {(data.emotional.emotionalRange || 4) === 5 && '💡 Emoções visíveis. Ri alto, chora em filmes. Transparente.'}
              {(data.emotional.emotionalRange || 4) === 6 && '💡 Muito expressivo. Gesticula, voz varia muito. Energia contagiante.'}
              {(data.emotional.emotionalRange || 4) === 7 && '💡 Emoções intensas e dramáticas. Tudo é vivido com máxima intensidade.'}
            </p>
          </div>
        </div>

        {/* Default Mood */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😊 Humor Base</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O estado emocional padrão quando nada específico está acontecendo.
          </p>
          <select
            value={data.emotional.defaultMood || ''}
            onChange={(e) => update('emotional', 'defaultMood', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs mb-3"
          >
            <option value="">-- Selecione o humor base --</option>
            <optgroup label="😊 Positivos">
              <option value="cheerful">Alegre — Geralmente de bom humor, sorridente</option>
              <option value="content">Contente — Satisfeito, em paz</option>
              <option value="optimistic">Otimista — Espera o melhor, esperançoso</option>
              <option value="playful">Brincalhão — Leve, gosta de humor</option>
              <option value="enthusiastic">Entusiasmado — Animado, energético</option>
              <option value="serene">Sereno — Calmo, tranquilo, zen</option>
              <option value="confident">Confiante — Seguro de si, assertivo</option>
            </optgroup>
            <optgroup label="😐 Neutros">
              <option value="neutral">Neutro — Sem inclinação particular</option>
              <option value="calm">Calmo — Tranquilo, estável</option>
              <option value="focused">Focado — Concentrado, sério</option>
              <option value="pensive">Pensativo — Reflexivo, contemplativo</option>
              <option value="reserved">Reservado — Quieto, observador</option>
              <option value="practical">Prático — Objetivo, pragmático</option>
              <option value="detached">Desapegado — Emocionalmente distante</option>
            </optgroup>
            <optgroup label="😔 Negativos">
              <option value="melancholic">Melancólico — Tristeza suave constante</option>
              <option value="anxious">Ansioso — Preocupado, tenso</option>
              <option value="irritable">Irritável — Facilmente incomodado</option>
              <option value="cynical">Cínico — Descrente, sarcástico</option>
              <option value="bitter">Amargo — Ressentido, azedo</option>
              <option value="gloomy">Sombrio — Pessimista, negativo</option>
              <option value="restless">Inquieto — Agitado, impaciente</option>
              <option value="defensive">Defensivo — Na guarda, desconfiado</option>
            </optgroup>
          </select>
        </div>

        {/* Emotional Triggers - Multi-select */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚡ Gatilhos Emocionais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O que provoca reações emocionais intensas. Selecione até 5.
          </p>

          {(() => {
            const triggerOptions = [
              { id: 'rejection', label: 'Rejeição', cat: 'Interpersonal', desc: 'Ser rejeitado ou excluído' },
              { id: 'abandonment', label: 'Abandonment', cat: 'Interpersonal', desc: 'Fear of being left' },
              { id: 'betrayal', label: 'Traição', cat: 'Interpersonal', desc: 'Quebra de confiança' },
              { id: 'disrespect', label: 'Desrespeito', cat: 'Interpersonal', desc: 'Ser tratado com desdém' },
              { id: 'injustice', label: 'Injustiça', cat: 'Interpersonal', desc: 'Testemunhar ou sofrer injustiça' },
              { id: 'criticism', label: 'Crítica', cat: 'Self', desc: 'Ser criticado ou julgado' },
              { id: 'failure', label: 'Fracasso', cat: 'Self', desc: 'Falhar ou não atingir metas' },
              { id: 'incompetence', label: 'Incompetência', cat: 'Self', desc: 'Parecer incapaz ou burro' },
              { id: 'vulnerability', label: 'Vulnerabilidade', cat: 'Self', desc: 'Ser visto como fraco' },
              { id: 'loss-control', label: 'Perda de Controle', cat: 'Self', desc: 'Não ter controle da situação' },
              { id: 'crowds', label: 'Crowds', cat: 'Environment', desc: 'Lugares com muita gente' },
              { id: 'conflict', label: 'Conflito', cat: 'Environment', desc: 'Brigas, discussões' },
              { id: 'chaos', label: 'Caos', cat: 'Environment', desc: 'Desordem, imprevisibilidade' },
              { id: 'silence', label: 'Silêncio', cat: 'Environment', desc: 'Quietude prolongada' },
              { id: 'confinement', label: 'Confinamento', cat: 'Environment', desc: 'Espaços fechados ou restrição' },
              { id: 'memories', label: 'Memórias', cat: 'Past', desc: 'Lembranças específicas do passado' },
              { id: 'anniversaries', label: 'Datas', cat: 'Past', desc: 'Aniversários de eventos' },
              { id: 'similar-people', label: 'Pessoas Similares', cat: 'Past', desc: 'Pessoas que lembram alguém' },
              { id: 'specific-places', label: 'Lugares', cat: 'Past', desc: 'Locais com significado' },
              { id: 'sensory', label: 'Sensorial', cat: 'Past', desc: 'Cheiros, sons, músicas específicas' },
            ];

            const selectedTriggers = data.emotional.triggers || [];

            const toggleTrigger = (triggerId) => {
              if (selectedTriggers.includes(triggerId)) {
                update('emotional', 'triggers', selectedTriggers.filter(t => t !== triggerId));
              } else if (selectedTriggers.length < 5) {
                update('emotional', 'triggers', [...selectedTriggers, triggerId]);
              }
            };

            const categories = [...new Set(triggerOptions.map(t => t.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedTriggers.length}/5</span>
                </div>

                {/* Selected triggers */}
                {selectedTriggers.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedTriggers.map(triggerId => {
                      const trigger = triggerOptions.find(t => t.id === triggerId);
                      return trigger ? (
                        <span
                          key={triggerId}
                          onClick={() => toggleTrigger(triggerId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-mono cursor-pointer hover:bg-red-200"
                        >
                          ⚡ {trigger.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Trigger options by category */}
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {triggerOptions.filter(t => t.cat === cat).map(trigger => (
                        <button
                          key={trigger.id}
                          onClick={() => toggleTrigger(trigger.id)}
                          disabled={!selectedTriggers.includes(trigger.id) && selectedTriggers.length >= 5}
                          title={trigger.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedTriggers.includes(trigger.id)
                              ? 'bg-red-500 text-white'
                              : selectedTriggers.length >= 5
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-100 text-gray-700 hover:bg-red-100 cursor-pointer'
                          }`}
                        >
                          {trigger.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Coping Mechanisms - Multi-select */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🛡️ Mecanismos de Coping</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como lida com estresse e emoções difíceis. Selecione até 4.
          </p>

          {(() => {
            const copingOptions = [
              // Healthy
              { id: 'exercise', label: 'Exercício físico', cat: 'Saudável', desc: 'Corre, academia, esportes' },
              { id: 'meditation', label: 'Meditação', cat: 'Saudável', desc: 'Mindfulness, respiração' },
              { id: 'talking', label: 'Conversar', cat: 'Saudável', desc: 'Desabafa com alguém' },
              { id: 'journaling', label: 'Escrever', cat: 'Saudável', desc: 'Diário, journaling' },
              { id: 'creative', label: 'Arte/Criatividade', cat: 'Saudável', desc: 'Música, pintura, escrita' },
              { id: 'nature', label: 'Natureza', cat: 'Saudável', desc: 'Caminhadas, ar livre' },
              { id: 'therapy', label: 'Terapia', cat: 'Saudável', desc: 'Busca ajuda profissional' },
              { id: 'problem-solving', label: 'Resolver problemas', cat: 'Saudável', desc: 'Enfrenta de frente' },

              // Neutral
              { id: 'sleeping', label: 'Dormir', cat: 'Neutro', desc: 'Dorme para escapar' },
              { id: 'distraction', label: 'Distração', cat: 'Neutro', desc: 'TV, jogos, redes sociais' },
              { id: 'humor', label: 'Humor', cat: 'Neutro', desc: 'Faz piadas, ri da situação' },
              { id: 'work', label: 'Trabalho', cat: 'Neutro', desc: 'Mergulha no trabalho' },
              { id: 'cleaning', label: 'Organizar/Limpar', cat: 'Neutro', desc: 'Faxina compulsiva' },
              { id: 'isolation', label: 'Isolamento', cat: 'Neutro', desc: 'Fica sozinho' },
              { id: 'compartmentalization', label: 'Compartimentar', cat: 'Neutro', desc: 'Separa e ignora' },

              // Unhealthy
              { id: 'substance', label: 'Substâncias', cat: 'Prejudicial', desc: 'Álcool, drogas, cigarro' },
              { id: 'eating', label: 'Comer demais/de menos', cat: 'Prejudicial', desc: 'Relação com comida' },
              { id: 'aggression', label: 'Agressividade', cat: 'Prejudicial', desc: 'Explode, briga' },
              { id: 'self-harm', label: 'Autolesão', cat: 'Prejudicial', desc: 'Se machuca' },
              { id: 'denial', label: 'Negação', cat: 'Prejudicial', desc: 'Finge que está bem' },
              { id: 'blame', label: 'Culpar outros', cat: 'Prejudicial', desc: 'Projeta nos outros' },
              { id: 'shopping', label: 'Compras compulsivas', cat: 'Prejudicial', desc: 'Gasta dinheiro' },
              { id: 'risk-taking', label: 'Comportamento de risco', cat: 'Prejudicial', desc: 'Busca adrenalina perigosa' },
            ];

            const selectedCoping = data.emotional.copingMechanisms || [];

            const toggleCoping = (copingId) => {
              if (selectedCoping.includes(copingId)) {
                update('emotional', 'copingMechanisms', selectedCoping.filter(c => c !== copingId));
              } else if (selectedCoping.length < 4) {
                update('emotional', 'copingMechanisms', [...selectedCoping, copingId]);
              }
            };

            const categories = [...new Set(copingOptions.map(c => c.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedCoping.length}/4</span>
                </div>

                {/* Selected coping */}
                {selectedCoping.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedCoping.map(copingId => {
                      const coping = copingOptions.find(c => c.id === copingId);
                      const isHealthy = coping?.cat === 'Saudável';
                      const isUnhealthy = coping?.cat === 'Prejudicial';
                      return coping ? (
                        <span
                          key={copingId}
                          onClick={() => toggleCoping(copingId)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                            isHealthy ? 'bg-green-100 text-green-800' :
                            isUnhealthy ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          🛡️ {coping.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Coping options by category */}
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className={`font-mono text-[10px] uppercase mb-1 ${
                      cat === 'Saudável' ? 'text-green-600' :
                      cat === 'Prejudicial' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {copingOptions.filter(c => c.cat === cat).map(coping => (
                        <button
                          key={coping.id}
                          onClick={() => toggleCoping(coping.id)}
                          disabled={!selectedCoping.includes(coping.id) && selectedCoping.length >= 4}
                          title={coping.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedCoping.includes(coping.id)
                              ? cat === 'Saudável' ? 'bg-green-500 text-white' :
                                cat === 'Prejudicial' ? 'bg-red-500 text-white' :
                                'bg-amber-500 text-white'
                              : selectedCoping.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : cat === 'Saudável' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                                cat === 'Prejudicial' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          } cursor-pointer`}
                        >
                          {coping.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Attachment Style */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💕 Estilo de Apego</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como forma e mantém vínculos emocionais com outras pessoas.
          </p>
          <select
            value={data.emotional.attachmentStyle || ''}
            onChange={(e) => update('emotional', 'attachmentStyle', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs mb-3"
          >
            <option value="">-- Selecione --</option>
            <option value="secure">🟢 Seguro — Confortável com intimidade e independência</option>
            <option value="anxious">🟡 Ansioso-Preocupado — Busca validação, medo de abandono</option>
            <option value="avoidant">🟠 Evitativo-Dismissivo — Valoriza independência, evita intimidade</option>
            <option value="fearful">🔴 Evitativo-Medroso — Deseja intimidade mas teme rejeição</option>
            <option value="disorganized">⚫ Desorganizado — Padrões inconsistentes, trauma</option>
          </select>

          {/* Attachment Style Description */}
          {data.emotional.attachmentStyle && (
            <div className={`p-3 rounded-sm text-xs font-mono ${
              data.emotional.attachmentStyle === 'secure' ? 'bg-green-50 text-green-800 border border-green-200' :
              data.emotional.attachmentStyle === 'anxious' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
              data.emotional.attachmentStyle === 'avoidant' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
              data.emotional.attachmentStyle === 'fearful' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-gray-100 text-gray-800 border border-gray-300'
            }`}>
              {data.emotional.attachmentStyle === 'secure' && (
                <div>
                  <strong>Seguro:</strong> Tem facilidade em confiar nos outros e ser confiável.
                  Confortável com proximidade emocional. Comunica necessidades claramente.
                  Relacionamentos estáveis e satisfatórios.
                </div>
              )}
              {data.emotional.attachmentStyle === 'anxious' && (
                <div>
                  <strong>Ansioso-Preocupado:</strong> Preocupa-se muito com relacionamentos.
                  Constant search for validation and reassurance. Intense fear of abandonment.
                  Pode parecer "carente" ou possessivo. Muito sensível a sinais de rejeição.
                </div>
              )}
              {data.emotional.attachmentStyle === 'avoidant' && (
                <div>
                  <strong>Evitativo-Dismissivo:</strong> Valoriza muito independência e autossuficiência.
                  Desconfortável com muita proximidade emocional. Minimiza importância de relacionamentos.
                  Pode parecer distante ou emocionalmente indisponível.
                </div>
              )}
              {data.emotional.attachmentStyle === 'fearful' && (
                <div>
                  <strong>Evitativo-Medroso:</strong> Deseja intimidade mas teme muito a rejeição.
                  Conflito interno entre aproximar-se e afastar-se. Dificuldade em confiar.
                  Relacionamentos intensos e turbulentos. Baixa autoestima.
                </div>
              )}
              {data.emotional.attachmentStyle === 'disorganized' && (
                <div>
                  <strong>Desorganizado:</strong> Padrões inconsistentes e imprevisíveis.
                  Geralmente resultado de trauma ou abuso na infância.
                  Pode alternar entre buscar e rejeitar intimidade.
                  Dificuldade em regular emoções em relacionamentos.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Emotional Volatility */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">🌊 Volatilidade Emocional</h4>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Quão rapidamente as emoções mudam e quão intensas são as oscilações.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Estável</span>
              <span>Volátil</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={data.emotional.volatility || 3}
              onChange={(e) => update('emotional', 'volatility', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-300 via-gray-200 to-orange-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.emotional.volatility || 3) === 1 ? 'bg-blue-200 text-blue-800' :
                (data.emotional.volatility || 3) === 2 ? 'bg-blue-100 text-blue-700' :
                (data.emotional.volatility || 3) === 3 ? 'bg-gray-100 text-gray-700' :
                (data.emotional.volatility || 3) === 4 ? 'bg-orange-100 text-orange-700' :
                'bg-orange-200 text-orange-800'
              }`}>
                {(data.emotional.volatility || 3) === 1 && 'Muito Estável'}
                {(data.emotional.volatility || 3) === 2 && 'Estável'}
                {(data.emotional.volatility || 3) === 3 && 'Moderado'}
                {(data.emotional.volatility || 3) === 4 && 'Volátil'}
                {(data.emotional.volatility || 3) === 5 && 'Muito Volátil'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.emotional.volatility || 3) === 1 && '💡 Emoções mudam lentamente. Difícil de abalar. Previsível.'}
              {(data.emotional.volatility || 3) === 2 && '💡 Geralmente estável com mudanças graduais. Recupera-se bem.'}
              {(data.emotional.volatility || 3) === 3 && '💡 Mudanças emocionais normais. Às vezes oscila mais.'}
              {(data.emotional.volatility || 3) === 4 && '💡 Emoções mudam rapidamente. Pode surpreender os outros.'}
              {(data.emotional.volatility || 3) === 5 && '💡 Montanha-russa emocional. Oscilações intensas e rápidas.'}
            </p>
          </div>
        </div>

        {/* Emotional Intelligence */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">🧠 Inteligência Emocional</h4>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Capacidade de reconhecer, entender e gerenciar emoções próprias e dos outros.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Baixa</span>
              <span>Alta</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={data.emotional.emotionalIntelligence || 3}
              onChange={(e) => update('emotional', 'emotionalIntelligence', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-300 via-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.emotional.emotionalIntelligence || 3) === 1 ? 'bg-gray-200 text-gray-700' :
                (data.emotional.emotionalIntelligence || 3) === 2 ? 'bg-gray-100 text-gray-600' :
                (data.emotional.emotionalIntelligence || 3) === 3 ? 'bg-purple-100 text-purple-700' :
                (data.emotional.emotionalIntelligence || 3) === 4 ? 'bg-purple-200 text-purple-800' :
                'bg-purple-300 text-purple-900'
              }`}>
                {(data.emotional.emotionalIntelligence || 3) === 1 && 'Muito Baixa'}
                {(data.emotional.emotionalIntelligence || 3) === 2 && 'Baixa'}
                {(data.emotional.emotionalIntelligence || 3) === 3 && 'Média'}
                {(data.emotional.emotionalIntelligence || 3) === 4 && 'Alta'}
                {(data.emotional.emotionalIntelligence || 3) === 5 && 'Muito Alta'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.emotional.emotionalIntelligence || 3) === 1 && '💡 Dificuldade em identificar emoções. Não percebe como afeta outros.'}
              {(data.emotional.emotionalIntelligence || 3) === 2 && '💡 Reconhece emoções básicas mas luta para gerenciá-las.'}
              {(data.emotional.emotionalIntelligence || 3) === 3 && '💡 Entende emoções razoavelmente. Às vezes perde sinais sutis.'}
              {(data.emotional.emotionalIntelligence || 3) === 4 && '💡 Boa leitura emocional. Empático. Gerencia bem conflitos.'}
              {(data.emotional.emotionalIntelligence || 3) === 5 && '💡 Excepcional em ler pessoas. Nato mediador. Muito empático.'}
            </p>
          </div>
        </div>

        {/* Dominant Emotion */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💖 Emoção Dominante</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            A emoção que o personagem mais sente, que colore sua experiência do mundo.
          </p>
          <select
            value={data.emotional.dominantEmotion || ''}
            onChange={(e) => update('emotional', 'dominantEmotion', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione a emoção dominante --</option>
            <optgroup label="🌟 Emoções Positivas">
              <option value="joy">Joy (Alegria) — Felicidade, contentamento, prazer</option>
              <option value="love">Love — Carinho, afeição, conexão</option>
              <option value="hope">Hope (Esperança) — Otimismo, expectativa positiva</option>
              <option value="gratitude">Gratitude (Gratidão) — Apreciação, reconhecimento</option>
              <option value="serenity">Serenity (Serenidade) — Paz, calma, tranquilidade</option>
              <option value="interest">Interest (Interesse) — Curiosidade, engajamento</option>
              <option value="amusement">Amusement (Diversão) — Humor, leveza</option>
              <option value="pride">Pride (Orgulho) — Satisfação com conquistas</option>
              <option value="awe">Awe (Admiração) — Maravilhamento, reverência</option>
              <option value="inspiration">Inspiration (Inspiração) — Elevação, motivação</option>
            </optgroup>
            <optgroup label="😐 Emoções Neutras/Mistas">
              <option value="nostalgia">Nostalgia — Saudade agridoce do passado</option>
              <option value="anticipation">Anticipation (Antecipação) — Expectativa, ansiedade boa</option>
              <option value="surprise">Surprise (Surpresa) — Choque, admiração</option>
              <option value="confusion">Confusion (Confusão) — Incerteza, perplexidade</option>
              <option value="ambivalence">Ambivalence (Ambivalência) — Sentimentos conflitantes</option>
            </optgroup>
            <optgroup label="😔 Emoções Negativas">
              <option value="sadness">Sadness (Tristeza) — Melancolia, pesar, luto</option>
              <option value="fear">Fear — Anxiety, worry, terror</option>
              <option value="anger">Anger (Raiva) — Frustração, irritação, fúria</option>
              <option value="shame">Shame (Vergonha) — Humilhação, inadequação</option>
              <option value="guilt">Guilt (Culpa) — Remorso, arrependimento</option>
              <option value="envy">Envy (Inveja) — Ciúme, cobiça</option>
              <option value="disgust">Disgust (Nojo) — Repulsa, aversão</option>
              <option value="contempt">Contempt (Desprezo) — Desdém, superioridade</option>
              <option value="loneliness">Loneliness (Solidão) — Isolamento, abandono</option>
              <option value="boredom">Boredom (Tédio) — Apatia, desinteresse</option>
              <option value="resentment">Resentment (Ressentimento) — Amargura guardada</option>
              <option value="despair">Despair (Desespero) — Desesperança, vazio</option>
            </optgroup>
          </select>
        </div>

        {/* Avoided Emotion */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚫 Emoção Evitada</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            A emoção que o personagem mais reprime, evita ou não consegue lidar.
          </p>
          <select
            value={data.emotional.avoidedEmotion || ''}
            onChange={(e) => update('emotional', 'avoidedEmotion', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione a emoção evitada --</option>
            <optgroup label="😔 Emoções Frequentemente Evitadas">
              <option value="vulnerability">Vulnerability (Vulnerabilidade) — Evita mostrar fraqueza</option>
              <option value="sadness">Sadness (Tristeza) — Não se permite chorar ou lamentar</option>
              <option value="fear">Fear — Denies or hides their fears</option>
              <option value="anger">Anger (Raiva) — Reprime irritação e frustração</option>
              <option value="shame">Shame (Vergonha) — Esconde a todo custo</option>
              <option value="guilt">Guilt (Culpa) — Evita enfrentar arrependimentos</option>
              <option value="loneliness">Loneliness (Solidão) — Nega sentir-se sozinho</option>
              <option value="helplessness">Helplessness (Impotência) — Não aceita não ter controle</option>
              <option value="neediness">Neediness (Carência) — Esconde necessidade de outros</option>
              <option value="jealousy">Jealousy (Ciúme) — Não admite sentir ciúmes</option>
              <option value="grief">Grief (Luto) — Evita processar perdas</option>
              <option value="disappointment">Disappointment (Decepção) — Não admite expectativas frustradas</option>
            </optgroup>
            <optgroup label="🌟 Emoções Positivas (paradoxalmente evitadas)">
              <option value="joy">Joy (Alegria) — Desconforto com felicidade, espera o pior</option>
              <option value="love">Love — Fear of loving, avoids connection</option>
              <option value="hope">Hope (Esperança) — Cinismo protege de decepção</option>
              <option value="pride">Pride (Orgulho) — Não se permite sentir orgulho</option>
              <option value="excitement">Excitement (Empolgação) — Contém entusiasmo</option>
              <option value="trust">Trust (Confiança) — Evita confiar em outros</option>
            </optgroup>
          </select>

          {/* Why avoided */}
          {data.emotional.avoidedEmotion && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <label className="font-mono text-[10px] text-gray-500 mb-1 block">Por que evita essa emoção?</label>
              <select
                value={data.emotional.avoidedEmotionReason || ''}
                onChange={(e) => update('emotional', 'avoidedEmotionReason', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Selecione a razão --</option>
                <option value="childhood">Childhood (Infância) — Aprendeu que não era seguro/permitido</option>
                <option value="trauma">Trauma — Associa a experiência dolorosa</option>
                <option value="weakness">Weakness (Fraqueza) — Vê como sinal de fraqueza</option>
                <option value="control">Control (Controle) — Perde o controle quando sente</option>
                <option value="overwhelm">Overwhelm (Sobrecarga) — Intensidade é demais</option>
                <option value="shame">Shame (Vergonha) — Tem vergonha de sentir isso</option>
                <option value="cultural">Cultural — Cultura/família não permite</option>
                <option value="gender">Gender — Expectativas de gênero</option>
                <option value="protection">Protection (Proteção) — Se protege de mais dor</option>
                <option value="unknown">Unknown (Desconhecido) — Não sabe, apenas evita</option>
              </select>
            </div>
          )}
        </div>
      </div>
    ),
    3: ( // Inner World
      <div className="space-y-6">
        {/* Header Explanation */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-indigo-900 mb-2">🌌 MUNDO INTERIOR</h3>
          <p className="font-mono text-xs text-indigo-800 leading-relaxed">
            Os <strong>medos, desejos, vergonhas e defesas</strong> mais profundos do personagem.
            O que move suas ações e o que ele esconde até de si mesmo.
          </p>
        </div>

        {/* Core Fears - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😨 Core Fears</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Os medos mais profundos que motivam comportamentos. Selecione até 4.
          </p>

          {(() => {
            const fearOptions = [
              // Existential (12)
              { id: 'death', label: 'Morte', cat: 'Existencial', desc: 'Fear of own mortality' },
              { id: 'meaninglessness', label: 'Falta de Sentido', cat: 'Existencial', desc: 'Que a vida não tenha propósito' },
              { id: 'insignificance', label: 'Insignificância', cat: 'Existencial', desc: 'Não importar, ser esquecido' },
              { id: 'being-ordinary', label: 'Ser Comum', cat: 'Existencial', desc: 'Não ser especial ou único' },
              { id: 'wasted-life', label: 'Vida Desperdiçada', cat: 'Existencial', desc: 'Não realizar seu potencial' },
              { id: 'losing-identity', label: 'Perder Identidade', cat: 'Existencial', desc: 'Não saber quem realmente é' },
              { id: 'nonexistence', label: 'Não-Existência', cat: 'Existencial', desc: 'Deixar de existir completamente' },
              { id: 'futility', label: 'Futilidade', cat: 'Existencial', desc: 'Que nada que faça importe' },
              { id: 'time-running-out', label: 'Tempo Acabando', cat: 'Existencial', desc: 'Não ter tempo suficiente' },
              { id: 'legacy', label: 'Sem Legado', cat: 'Existencial', desc: 'Não deixar nada para trás' },
              { id: 'forgotten', label: 'Ser Esquecido', cat: 'Existencial', desc: 'Ninguém lembrar que existiu' },
              { id: 'meaningless-suffering', label: 'Sofrimento Inútil', cat: 'Existencial', desc: 'Sofrer sem razão ou propósito' },

              // Relational (16)
              { id: 'abandonment', label: 'Abandonment', cat: 'Relacional', desc: 'Ser deixado por quem ama' },
              { id: 'rejection', label: 'Rejeição', cat: 'Relacional', desc: 'Ser rejeitado pelos outros' },
              { id: 'betrayal', label: 'Traição', cat: 'Relacional', desc: 'Ser traído por quem confia' },
              { id: 'loneliness', label: 'Solidão', cat: 'Relacional', desc: 'Ficar completamente sozinho' },
              { id: 'intimacy', label: 'Intimidade', cat: 'Relacional', desc: 'Ser verdadeiramente conhecido' },
              { id: 'commitment', label: 'Compromisso', cat: 'Relacional', desc: 'Ficar preso em relacionamento' },
              { id: 'losing-loved-ones', label: 'Perder Quem Ama', cat: 'Relacional', desc: 'Morte ou perda de entes queridos' },
              { id: 'being-unlovable', label: 'Ser Não-Amável', cat: 'Relacional', desc: 'Que ninguém possa amá-lo' },
              { id: 'being-replaced', label: 'Ser Substituído', cat: 'Relacional', desc: 'Outro tomar seu lugar' },
              { id: 'being-forgotten-by-loved', label: 'Esquecido por Quem Ama', cat: 'Relacional', desc: 'Entes queridos esquecerem de você' },
              { id: 'disappointing-others', label: 'Decepcionar Outros', cat: 'Relacional', desc: 'Não corresponder às expectativas' },
              { id: 'being-burden', label: 'Ser um Fardo', cat: 'Relacional', desc: 'Atrapalhar a vida dos outros' },
              { id: 'suffocation', label: 'Sufocamento', cat: 'Relacional', desc: 'Relacionamentos que aprisionam' },
              { id: 'losing-connection', label: 'Perder Conexão', cat: 'Relacional', desc: 'Afastar-se de quem ama' },
              { id: 'being-used', label: 'Ser Usado', cat: 'Relacional', desc: 'Outros só querem algo de você' },
              { id: 'never-finding-love', label: 'Nunca Encontrar Amor', cat: 'Relacional', desc: 'Ficar sem parceiro para sempre' },

              // Self-worth (14)
              { id: 'failure', label: 'Fracasso', cat: 'Autoestima', desc: 'Falhar em objetivos importantes' },
              { id: 'inadequacy', label: 'Inadequação', cat: 'Autoestima', desc: 'Nunca ser bom o suficiente' },
              { id: 'being-exposed', label: 'Ser Exposto', cat: 'Autoestima', desc: 'Que descubram quem realmente é' },
              { id: 'humiliation', label: 'Humilhação', cat: 'Autoestima', desc: 'Ser ridicularizado publicamente' },
              { id: 'incompetence', label: 'Incompetência', cat: 'Autoestima', desc: 'Parecer burro ou incapaz' },
              { id: 'being-weak', label: 'Parecer Fraco', cat: 'Autoestima', desc: 'Ser visto como vulnerável' },
              { id: 'losing-respect', label: 'Perder Respeito', cat: 'Autoestima', desc: 'Que outros parem de respeitá-lo' },
              { id: 'being-judged', label: 'Ser Julgado', cat: 'Autoestima', desc: 'Outros julgando suas escolhas' },
              { id: 'being-seen-as-fraud', label: 'Parecer Fraude', cat: 'Autoestima', desc: 'Descobrirem que é impostor' },
              { id: 'not-measuring-up', label: 'Não Estar à Altura', cat: 'Autoestima', desc: 'Não alcançar padrões' },
              { id: 'being-mocked', label: 'Ser Zombado', cat: 'Autoestima', desc: 'Rirem de você' },
              { id: 'losing-status', label: 'Perder Status', cat: 'Autoestima', desc: 'Cair na hierarquia social' },
              { id: 'being-pitied', label: 'Ser Digno de Pena', cat: 'Autoestima', desc: 'Outros sentirem pena' },
              { id: 'mediocrity', label: 'Mediocridade', cat: 'Autoestima', desc: 'Ser apenas mais um' },

              // Control (12)
              { id: 'loss-of-control', label: 'Perda de Controle', cat: 'Controle', desc: 'Não controlar sua vida' },
              { id: 'chaos', label: 'Caos', cat: 'Controle', desc: 'Desordem e imprevisibilidade' },
              { id: 'helplessness', label: 'Impotência', cat: 'Controle', desc: 'Não poder fazer nada' },
              { id: 'dependency', label: 'Dependência', cat: 'Controle', desc: 'Precisar dos outros' },
              { id: 'being-trapped', label: 'Estar Preso', cat: 'Controle', desc: 'Sem opções ou saída' },
              { id: 'uncertainty', label: 'Incerteza', cat: 'Controle', desc: 'Não saber o que vai acontecer' },
              { id: 'losing-autonomy', label: 'Perder Autonomia', cat: 'Controle', desc: 'Outros controlando sua vida' },
              { id: 'powerlessness', label: 'Impotência Total', cat: 'Controle', desc: 'Não ter nenhum poder' },
              { id: 'being-manipulated', label: 'Ser Manipulado', cat: 'Controle', desc: 'Outros controlando você' },
              { id: 'unpredictability', label: 'Imprevisibilidade', cat: 'Controle', desc: 'Não conseguir prever' },
              { id: 'forced-change', label: 'Mudança Forçada', cat: 'Controle', desc: 'Ser obrigado a mudar' },
              { id: 'losing-freedom', label: 'Perder Liberdade', cat: 'Controle', desc: 'Restrições à liberdade' },

              // Physical/Practical (14)
              { id: 'poverty', label: 'Pobreza', cat: 'Prático', desc: 'Perder dinheiro, segurança material' },
              { id: 'illness', label: 'Doença', cat: 'Prático', desc: 'Ficar doente ou incapacitado' },
              { id: 'aging', label: 'Envelhecer', cat: 'Prático', desc: 'Perder juventude e vitalidade' },
              { id: 'physical-harm', label: 'Violência', cat: 'Prático', desc: 'Ser ferido ou atacado' },
              { id: 'losing-home', label: 'Perder o Lar', cat: 'Prático', desc: 'Não ter onde morar' },
              { id: 'disability', label: 'Deficiência', cat: 'Prático', desc: 'Perder capacidades físicas' },
              { id: 'pain', label: 'Dor', cat: 'Prático', desc: 'Sofrer dor física' },
              { id: 'starvation', label: 'Fome', cat: 'Prático', desc: 'Não ter o que comer' },
              { id: 'homelessness', label: 'Sem-Teto', cat: 'Prático', desc: 'Viver nas ruas' },
              { id: 'accidents', label: 'Acidentes', cat: 'Prático', desc: 'Desastres e acidentes' },
              { id: 'natural-disasters', label: 'Desastres Naturais', cat: 'Prático', desc: 'Terremotos, enchentes, etc.' },
              { id: 'losing-possessions', label: 'Perder Bens', cat: 'Prático', desc: 'Perder posses importantes' },
              { id: 'job-loss', label: 'Perder Emprego', cat: 'Prático', desc: 'Ficar desempregado' },
              { id: 'financial-ruin', label: 'Ruína Financeira', cat: 'Prático', desc: 'Falência total' },

              // Moral/Spiritual (12)
              { id: 'being-evil', label: 'Ser Mau', cat: 'Moral', desc: 'Descobrir que é uma pessoa má' },
              { id: 'corruption', label: 'Corrupção', cat: 'Moral', desc: 'Perder seus princípios' },
              { id: 'damnation', label: 'Condenação', cat: 'Moral', desc: 'Punição divina ou karma' },
              { id: 'becoming-like-parent', label: 'Virar os Pais', cat: 'Moral', desc: 'Repetir erros dos pais' },
              { id: 'hurting-others', label: 'Machucar Outros', cat: 'Moral', desc: 'Causar dor a quem ama' },
              { id: 'losing-faith', label: 'Perder a Fé', cat: 'Moral', desc: 'Perder crenças espirituais' },
              { id: 'being-wrong', label: 'Estar Errado', cat: 'Moral', desc: 'Descobrir que estava errado' },
              { id: 'moral-failure', label: 'Falha Moral', cat: 'Moral', desc: 'Não viver seus valores' },
              { id: 'guilt', label: 'Culpa Eterna', cat: 'Moral', desc: 'Carregar culpa para sempre' },
              { id: 'becoming-monster', label: 'Virar Monstro', cat: 'Moral', desc: 'Transformar-se em algo terrível' },
              { id: 'losing-humanity', label: 'Perder Humanidade', cat: 'Moral', desc: 'Perder compaixão e empatia' },
              { id: 'divine-punishment', label: 'Castigo Divino', cat: 'Moral', desc: 'Ser punido por forças superiores' },

              // Phobias/Specific (16)
              { id: 'darkness', label: 'Darkness', cat: 'Fobias', desc: 'Fear of the dark' },
              { id: 'heights', label: 'Heights', cat: 'Fobias', desc: 'Fear of high places' },
              { id: 'enclosed-spaces', label: 'Espaços Fechados', cat: 'Fobias', desc: 'Claustrofobia' },
              { id: 'open-spaces', label: 'Espaços Abertos', cat: 'Fobias', desc: 'Agoraphobia' },
              { id: 'water', label: 'Água', cat: 'Fobias', desc: 'Fear of water/drowning' },
              { id: 'fire', label: 'Fire', cat: 'Fobias', desc: 'Fear of fires' },
              { id: 'crowds', label: 'Crowds', cat: 'Fobias', desc: 'Fear of crowds' },
              { id: 'animals', label: 'Animais', cat: 'Fobias', desc: 'Fear of certain animals' },
              { id: 'insects', label: 'Insetos', cat: 'Fobias', desc: 'Fear of insects' },
              { id: 'blood', label: 'Blood', cat: 'Fobias', desc: 'Fear of seeing blood' },
              { id: 'needles', label: 'Needles', cat: 'Fobias', desc: 'Fear of injections' },
              { id: 'flying', label: 'Flying', cat: 'Fobias', desc: 'Fear of flying' },
              { id: 'public-speaking', label: 'Public Speaking', cat: 'Fobias', desc: 'Fear of speeches' },
              { id: 'being-watched', label: 'Being Watched', cat: 'Fobias', desc: 'Fear of being watched' },
              { id: 'germs', label: 'Germs', cat: 'Fobias', desc: 'Fear of contamination' },
              { id: 'supernatural', label: 'Supernatural', cat: 'Fobias', desc: 'Fear of ghosts, demons' },
            ];

            const selectedFears = data.innerWorld.coreFears || [];

            const toggleFear = (fearId) => {
              if (selectedFears.includes(fearId)) {
                update('innerWorld', 'coreFears', selectedFears.filter(f => f !== fearId));
              } else if (selectedFears.length < 4) {
                update('innerWorld', 'coreFears', [...selectedFears, fearId]);
              }
            };

            const categories = [...new Set(fearOptions.map(f => f.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedFears.length}/4</span>
                </div>

                {selectedFears.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedFears.map(fearId => {
                      const fear = fearOptions.find(f => f.id === fearId);
                      return fear ? (
                        <span
                          key={fearId}
                          onClick={() => toggleFear(fearId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-mono cursor-pointer hover:bg-red-200"
                        >
                          😨 {fear.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {fearOptions.filter(f => f.cat === cat).map(fear => (
                        <button
                          key={fear.id}
                          onClick={() => toggleFear(fear.id)}
                          disabled={!selectedFears.includes(fear.id) && selectedFears.length >= 4}
                          title={fear.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedFears.includes(fear.id)
                              ? 'bg-red-500 text-white'
                              : selectedFears.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer'
                          }`}
                        >
                          {fear.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Custom fear input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Custom fear (optional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customFear || ''}
                    onChange={(e) => update('innerWorld', 'customFear', e.target.value)}
                    placeholder="Descreva um medo específico não listado..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Core Desires - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💫 Desejos Centrais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O que o personagem mais quer na vida, consciente ou inconscientemente. Selecione até 4.
          </p>

          {(() => {
            const desireOptions = [
              // Love & Connection (16)
              { id: 'love', label: 'Amor', cat: 'Conexão', desc: 'Ser amado incondicionalmente' },
              { id: 'belonging', label: 'Pertencimento', cat: 'Conexão', desc: 'Fazer parte de algo' },
              { id: 'acceptance', label: 'Aceitação', cat: 'Conexão', desc: 'Ser aceito como é' },
              { id: 'intimacy', label: 'Intimidade', cat: 'Conexão', desc: 'Conexão profunda com outro' },
              { id: 'family', label: 'Família', cat: 'Conexão', desc: 'Ter ou criar uma família' },
              { id: 'friendship', label: 'Amizade', cat: 'Conexão', desc: 'Amigos verdadeiros' },
              { id: 'partnership', label: 'Parceria', cat: 'Conexão', desc: 'Companheiro(a) de vida' },
              { id: 'understanding', label: 'Ser Compreendido', cat: 'Conexão', desc: 'Que outros o entendam' },
              { id: 'community', label: 'Comunidade', cat: 'Conexão', desc: 'Pertencer a um grupo' },
              { id: 'reconciliation', label: 'Reconciliação', cat: 'Conexão', desc: 'Fazer as pazes com alguém' },
              { id: 'reunion', label: 'Reencontro', cat: 'Conexão', desc: 'Reencontrar alguém perdido' },
              { id: 'approval', label: 'Aprovação', cat: 'Conexão', desc: 'Ser aprovado por outros' },
              { id: 'validation', label: 'Validação', cat: 'Conexão', desc: 'Ter sentimentos validados' },
              { id: 'loyalty', label: 'Lealdade', cat: 'Conexão', desc: 'Pessoas leais ao seu lado' },
              { id: 'trust', label: 'Confiança', cat: 'Conexão', desc: 'Poder confiar em alguém' },
              { id: 'soulmate', label: 'Alma Gêmea', cat: 'Conexão', desc: 'Encontrar pessoa perfeita' },

              // Achievement & Status (14)
              { id: 'success', label: 'Sucesso', cat: 'Conquista', desc: 'Alcançar grandes objetivos' },
              { id: 'power', label: 'Poder', cat: 'Conquista', desc: 'Influência e controle' },
              { id: 'wealth', label: 'Riqueza', cat: 'Conquista', desc: 'Abundância material' },
              { id: 'fame', label: 'Fama', cat: 'Conquista', desc: 'Ser conhecido e admirado' },
              { id: 'respect', label: 'Respeito', cat: 'Conquista', desc: 'Ser respeitado pelos outros' },
              { id: 'status', label: 'Status', cat: 'Conquista', desc: 'Posição social elevada' },
              { id: 'legacy', label: 'Legado', cat: 'Conquista', desc: 'Deixar marca no mundo' },
              { id: 'mastery', label: 'Maestria', cat: 'Conquista', desc: 'Ser o melhor em algo' },
              { id: 'recognition', label: 'Reconhecimento', cat: 'Conquista', desc: 'Ter trabalho reconhecido' },
              { id: 'influence', label: 'Influência', cat: 'Conquista', desc: 'Impactar decisões e pessoas' },
              { id: 'victory', label: 'Vitória', cat: 'Conquista', desc: 'Vencer competições e desafios' },
              { id: 'dominance', label: 'Dominância', cat: 'Conquista', desc: 'Estar no topo da hierarquia' },
              { id: 'achievement', label: 'Realização', cat: 'Conquista', desc: 'Completar grandes feitos' },
              { id: 'excellence', label: 'Excelência', cat: 'Conquista', desc: 'Ser excelente em tudo' },

              // Self & Growth (14)
              { id: 'freedom', label: 'Liberdade', cat: 'Autonomia', desc: 'Viver sem restrições' },
              { id: 'independence', label: 'Independência', cat: 'Autonomia', desc: 'Não depender de ninguém' },
              { id: 'authenticity', label: 'Autenticidade', cat: 'Autonomia', desc: 'Ser verdadeiro consigo' },
              { id: 'self-knowledge', label: 'Autoconhecimento', cat: 'Autonomia', desc: 'Entender a si mesmo' },
              { id: 'growth', label: 'Crescimento', cat: 'Autonomia', desc: 'Evoluir constantemente' },
              { id: 'healing', label: 'Cura', cat: 'Autonomia', desc: 'Superar traumas e dores' },
              { id: 'self-acceptance', label: 'Auto-Aceitação', cat: 'Autonomia', desc: 'Aceitar a si mesmo' },
              { id: 'self-expression', label: 'Auto-Expressão', cat: 'Autonomia', desc: 'Expressar quem é' },
              { id: 'self-improvement', label: 'Auto-Melhoria', cat: 'Autonomia', desc: 'Melhorar constantemente' },
              { id: 'transformation', label: 'Transformação', cat: 'Autonomia', desc: 'Mudar completamente' },
              { id: 'reinvention', label: 'Reinvenção', cat: 'Autonomia', desc: 'Começar de novo' },
              { id: 'empowerment', label: 'Empoderamento', cat: 'Autonomia', desc: 'Sentir-se poderoso' },
              { id: 'confidence', label: 'Autoconfiança', cat: 'Autonomia', desc: 'Confiar em si mesmo' },
              { id: 'wholeness', label: 'Completude', cat: 'Autonomia', desc: 'Sentir-se completo' },

              // Purpose & Meaning (14)
              { id: 'purpose', label: 'Propósito', cat: 'Significado', desc: 'Razão para viver' },
              { id: 'meaning', label: 'Sentido', cat: 'Significado', desc: 'Vida com significado' },
              { id: 'justice', label: 'Justiça', cat: 'Significado', desc: 'Ver justiça ser feita' },
              { id: 'truth', label: 'Verdade', cat: 'Significado', desc: 'Conhecer a verdade' },
              { id: 'knowledge', label: 'Conhecimento', cat: 'Significado', desc: 'Saber e entender' },
              { id: 'wisdom', label: 'Sabedoria', cat: 'Significado', desc: 'Compreensão profunda' },
              { id: 'spirituality', label: 'Espiritualidade', cat: 'Significado', desc: 'Conexão com o transcendente' },
              { id: 'enlightenment', label: 'Iluminação', cat: 'Significado', desc: 'Despertar espiritual' },
              { id: 'answers', label: 'Respostas', cat: 'Significado', desc: 'Respostas para grandes perguntas' },
              { id: 'understanding-world', label: 'Entender o Mundo', cat: 'Significado', desc: 'Compreender como tudo funciona' },
              { id: 'contribution', label: 'Contribuição', cat: 'Significado', desc: 'Contribuir para algo maior' },
              { id: 'making-difference', label: 'Fazer Diferença', cat: 'Significado', desc: 'Impactar positivamente' },
              { id: 'calling', label: 'Vocação', cat: 'Significado', desc: 'Encontrar seu chamado' },
              { id: 'destiny', label: 'Destino', cat: 'Significado', desc: 'Cumprir seu destino' },

              // Safety & Stability (12)
              { id: 'security', label: 'Segurança', cat: 'Estabilidade', desc: 'Estar protegido' },
              { id: 'stability', label: 'Estabilidade', cat: 'Estabilidade', desc: 'Vida previsível e calma' },
              { id: 'peace', label: 'Paz', cat: 'Estabilidade', desc: 'Tranquilidade interior' },
              { id: 'comfort', label: 'Conforto', cat: 'Estabilidade', desc: 'Vida confortável' },
              { id: 'order', label: 'Ordem', cat: 'Estabilidade', desc: 'Organização e controle' },
              { id: 'home', label: 'Lar', cat: 'Estabilidade', desc: 'Lugar para pertencer' },
              { id: 'routine', label: 'Rotina', cat: 'Estabilidade', desc: 'Previsibilidade diária' },
              { id: 'certainty', label: 'Certeza', cat: 'Estabilidade', desc: 'Saber o que esperar' },
              { id: 'protection', label: 'Proteção', cat: 'Estabilidade', desc: 'Estar protegido de ameaças' },
              { id: 'health', label: 'Saúde', cat: 'Estabilidade', desc: 'Corpo e mente saudáveis' },
              { id: 'normalcy', label: 'Normalidade', cat: 'Estabilidade', desc: 'Vida normal e comum' },
              { id: 'simplicity', label: 'Simplicidade', cat: 'Estabilidade', desc: 'Vida simples e descomplicada' },

              // Experience (12)
              { id: 'adventure', label: 'Aventura', cat: 'Experiência', desc: 'Experiências emocionantes' },
              { id: 'pleasure', label: 'Prazer', cat: 'Experiência', desc: 'Desfrutar a vida' },
              { id: 'beauty', label: 'Beleza', cat: 'Experiência', desc: 'Beleza e estética' },
              { id: 'creativity', label: 'Criatividade', cat: 'Experiência', desc: 'Expressar-se criativamente' },
              { id: 'novelty', label: 'Novidade', cat: 'Experiência', desc: 'Coisas novas e diferentes' },
              { id: 'excitement', label: 'Emoção', cat: 'Experiência', desc: 'Adrenalina e emoção' },
              { id: 'fun', label: 'Diversão', cat: 'Experiência', desc: 'Se divertir e brincar' },
              { id: 'travel', label: 'Viajar', cat: 'Experiência', desc: 'Conhecer lugares novos' },
              { id: 'variety', label: 'Variedade', cat: 'Experiência', desc: 'Experiências diversas' },
              { id: 'intensity', label: 'Intensidade', cat: 'Experiência', desc: 'Viver intensamente' },
              { id: 'sensation', label: 'Sensação', cat: 'Experiência', desc: 'Experiências sensoriais' },
              { id: 'exploration', label: 'Exploração', cat: 'Experiência', desc: 'Explorar o desconhecido' },

              // Helping/Impact (12)
              { id: 'helping', label: 'Ajudar Outros', cat: 'Impacto', desc: 'Fazer diferença na vida de outros' },
              { id: 'protecting', label: 'Proteger', cat: 'Impacto', desc: 'Proteger quem ama' },
              { id: 'saving', label: 'Salvar', cat: 'Impacto', desc: 'Resgatar ou salvar pessoas' },
              { id: 'changing-world', label: 'Mudar o Mundo', cat: 'Impacto', desc: 'Melhorar o mundo' },
              { id: 'revenge', label: 'Vingança', cat: 'Impacto', desc: 'Fazer justiça pessoal' },
              { id: 'teaching', label: 'Ensinar', cat: 'Impacto', desc: 'Passar conhecimento adiante' },
              { id: 'inspiring', label: 'Inspirar', cat: 'Impacto', desc: 'Inspirar outras pessoas' },
              { id: 'leading', label: 'Liderar', cat: 'Impacto', desc: 'Guiar outros ao sucesso' },
              { id: 'healing-others', label: 'Curar Outros', cat: 'Impacto', desc: 'Ajudar na cura de outros' },
              { id: 'justice-for-others', label: 'Justiça para Outros', cat: 'Impacto', desc: 'Defender os injustiçados' },
              { id: 'sacrifice', label: 'Sacrifício', cat: 'Impacto', desc: 'Dar-se por algo maior' },
              { id: 'martyrdom', label: 'Martírio', cat: 'Impacto', desc: 'Sofrer por uma causa' },
            ];

            const selectedDesires = data.innerWorld.coreDesires || [];

            const toggleDesire = (desireId) => {
              if (selectedDesires.includes(desireId)) {
                update('innerWorld', 'coreDesires', selectedDesires.filter(d => d !== desireId));
              } else if (selectedDesires.length < 4) {
                update('innerWorld', 'coreDesires', [...selectedDesires, desireId]);
              }
            };

            const categories = [...new Set(desireOptions.map(d => d.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedDesires.length}/4</span>
                </div>

                {selectedDesires.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedDesires.map(desireId => {
                      const desire = desireOptions.find(d => d.id === desireId);
                      return desire ? (
                        <span
                          key={desireId}
                          onClick={() => toggleDesire(desireId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-mono cursor-pointer hover:bg-amber-200"
                        >
                          💫 {desire.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {desireOptions.filter(d => d.cat === cat).map(desire => (
                        <button
                          key={desire.id}
                          onClick={() => toggleDesire(desire.id)}
                          disabled={!selectedDesires.includes(desire.id) && selectedDesires.length >= 4}
                          title={desire.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedDesires.includes(desire.id)
                              ? 'bg-amber-500 text-white'
                              : selectedDesires.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer'
                          }`}
                        >
                          {desire.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Custom desire input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Desejo personalizado (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customDesire || ''}
                    onChange={(e) => update('innerWorld', 'customDesire', e.target.value)}
                    placeholder="Descreva um desejo específico não listado..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Core Shame - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😔 Vergonhas / Inseguranças Centrais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            As vergonhas mais profundas, aquilo que mais teme que descubram sobre si. Selecione até 4.
          </p>

          {(() => {
            const shameOptions = [
              // Appearance (12)
              { id: 'body', label: 'Corpo/Aparência', cat: 'Aparência', desc: 'Vergonha do próprio corpo' },
              { id: 'ugly', label: 'Ser Feio', cat: 'Aparência', desc: 'Não se achar atraente' },
              { id: 'aging', label: 'Idade', cat: 'Aparência', desc: 'Vergonha de envelhecer' },
              { id: 'disability', label: 'Deficiência', cat: 'Aparência', desc: 'Limitação física ou mental' },
              { id: 'scars', label: 'Cicatrizes/Marcas', cat: 'Aparência', desc: 'Marcas no corpo' },
              { id: 'weight', label: 'Peso', cat: 'Aparência', desc: 'Vergonha do peso' },
              { id: 'height', label: 'Altura', cat: 'Aparência', desc: 'Muito alto ou baixo' },
              { id: 'skin', label: 'Pele', cat: 'Aparência', desc: 'Cor, acne, condições de pele' },
              { id: 'hair', label: 'Cabelo', cat: 'Aparência', desc: 'Calvície, tipo de cabelo' },
              { id: 'voice', label: 'Voz', cat: 'Aparência', desc: 'Vergonha da própria voz' },
              { id: 'physical-feature', label: 'Característica Física', cat: 'Aparência', desc: 'Algo específico do corpo' },
              { id: 'aging-body', label: 'Corpo Envelhecendo', cat: 'Aparência', desc: 'Mudanças físicas da idade' },

              // Intelligence/Competence (14)
              { id: 'stupid', label: 'Ser Burro', cat: 'Competência', desc: 'Acha que não é inteligente' },
              { id: 'uneducated', label: 'Falta de Estudo', cat: 'Competência', desc: 'Não ter educação formal' },
              { id: 'incompetent', label: 'Incompetência', cat: 'Competência', desc: 'Não ser capaz' },
              { id: 'fraud', label: 'Impostor', cat: 'Competência', desc: 'Síndrome do impostor' },
              { id: 'failure', label: 'Ser Fracassado', cat: 'Competência', desc: 'Não ter conseguido nada' },
              { id: 'poor-decisions', label: 'Más Decisões', cat: 'Competência', desc: 'Histórico de escolhas ruins' },
              { id: 'ignorant', label: 'Ignorância', cat: 'Competência', desc: 'Não saber coisas básicas' },
              { id: 'slow', label: 'Ser Lento', cat: 'Competência', desc: 'Demorar para entender' },
              { id: 'untalented', label: 'Sem Talento', cat: 'Competência', desc: 'Não ter habilidades especiais' },
              { id: 'unsuccessful', label: 'Sem Sucesso', cat: 'Competência', desc: 'Não ter alcançado nada' },
              { id: 'cant-provide', label: 'Não Prover', cat: 'Competência', desc: 'Não conseguir sustentar' },
              { id: 'bad-at-job', label: 'Ruim no Trabalho', cat: 'Competência', desc: 'Performance profissional ruim' },
              { id: 'cant-learn', label: 'Não Aprender', cat: 'Competência', desc: 'Dificuldade de aprendizado' },
              { id: 'wasted-potential', label: 'Potencial Desperdiçado', cat: 'Competência', desc: 'Não usar suas capacidades' },

              // Social/Status (14)
              { id: 'poverty', label: 'Pobreza', cat: 'Social', desc: 'Origem ou situação pobre' },
              { id: 'class', label: 'Classe Social', cat: 'Social', desc: 'Origem social "inferior"' },
              { id: 'family-shame', label: 'Família', cat: 'Social', desc: 'Vergonha da própria família' },
              { id: 'unpopular', label: 'Ser Impopular', cat: 'Social', desc: 'Não ser querido/popular' },
              { id: 'weird', label: 'Ser Estranho', cat: 'Social', desc: 'Ser visto como esquisito' },
              { id: 'boring', label: 'Ser Chato', cat: 'Social', desc: 'Não ser interessante' },
              { id: 'no-friends', label: 'Sem Amigos', cat: 'Social', desc: 'Não ter amizades' },
              { id: 'social-anxiety', label: 'Social Anxiety', cat: 'Social', desc: 'Fear of interactions' },
              { id: 'awkwardness', label: 'Ser Desajeitado', cat: 'Social', desc: 'Comportamento social estranho' },
              { id: 'outcast', label: 'Ser Excluído', cat: 'Social', desc: 'Não pertencer a grupos' },
              { id: 'background', label: 'Origem', cat: 'Social', desc: 'De onde veio' },
              { id: 'accent', label: 'Sotaque', cat: 'Social', desc: 'Forma de falar' },
              { id: 'culture', label: 'Cultura', cat: 'Social', desc: 'Vergonha cultural' },
              { id: 'religion', label: 'Religião', cat: 'Social', desc: 'Crenças religiosas' },

              // Character (16)
              { id: 'selfish', label: 'Ser Egoísta', cat: 'Caráter', desc: 'Acha que só pensa em si' },
              { id: 'cruel', label: 'Ser Cruel', cat: 'Caráter', desc: 'Potencial para maldade' },
              { id: 'weak', label: 'Ser Fraco', cat: 'Caráter', desc: 'Falta de força ou coragem' },
              { id: 'coward', label: 'Ser Covarde', cat: 'Caráter', desc: 'Não enfrentar desafios' },
              { id: 'bad-person', label: 'Ser Má Pessoa', cat: 'Caráter', desc: 'No fundo ser alguém ruim' },
              { id: 'unlovable', label: 'Não-Amável', cat: 'Caráter', desc: 'Impossível de ser amado' },
              { id: 'toxic', label: 'Ser Tóxico', cat: 'Caráter', desc: 'Fazer mal a quem está perto' },
              { id: 'liar', label: 'Ser Mentiroso', cat: 'Caráter', desc: 'Tendência a mentir' },
              { id: 'manipulative', label: 'Ser Manipulador', cat: 'Caráter', desc: 'Manipula pessoas' },
              { id: 'jealous', label: 'Ser Ciumento', cat: 'Caráter', desc: 'Ciúme excessivo' },
              { id: 'envious', label: 'Ser Invejoso', cat: 'Caráter', desc: 'Inveja dos outros' },
              { id: 'lazy', label: 'Ser Preguiçoso', cat: 'Caráter', desc: 'Falta de iniciativa' },
              { id: 'angry', label: 'Raiva Interna', cat: 'Caráter', desc: 'Raiva que esconde' },
              { id: 'hateful', label: 'Ódio Interno', cat: 'Caráter', desc: 'Ódio que carrega' },
              { id: 'fake', label: 'Ser Falso', cat: 'Caráter', desc: 'Não ser genuíno' },
              { id: 'hypocrite', label: 'Ser Hipócrita', cat: 'Caráter', desc: 'Não pratica o que prega' },

              // Past (14)
              { id: 'past-actions', label: 'Ações do Passado', cat: 'Passado', desc: 'Algo terrível que fez' },
              { id: 'abuse-victim', label: 'Ter Sido Vítima', cat: 'Passado', desc: 'Vergonha de ter sofrido abuso' },
              { id: 'addiction', label: 'Vício', cat: 'Passado', desc: 'Histórico de dependência' },
              { id: 'criminal-past', label: 'Passado Criminal', cat: 'Passado', desc: 'Crimes ou prisão' },
              { id: 'secrets', label: 'Segredos', cat: 'Passado', desc: 'Coisas que esconde de todos' },
              { id: 'trauma', label: 'Trauma', cat: 'Passado', desc: 'Experiências traumáticas' },
              { id: 'cheating', label: 'Ter Traído', cat: 'Passado', desc: 'Traições amorosas' },
              { id: 'betrayed-someone', label: 'Ter Traído Alguém', cat: 'Passado', desc: 'Traiu confiança de alguém' },
              { id: 'abandoned-someone', label: 'Abandonmentu Alguém', cat: 'Passado', desc: 'Deixou alguém que precisava' },
              { id: 'hurt-someone', label: 'Machucou Alguém', cat: 'Passado', desc: 'Causou dor a outros' },
              { id: 'failed-someone', label: 'Falhou com Alguém', cat: 'Passado', desc: 'Não estava lá quando precisaram' },
              { id: 'lost-opportunity', label: 'Oportunidade Perdida', cat: 'Passado', desc: 'Chance que deixou passar' },
              { id: 'past-relationship', label: 'Relacionamento Passado', cat: 'Passado', desc: 'Vergonha de relacionamentos' },
              { id: 'past-self', label: 'Quem Era', cat: 'Passado', desc: 'Vergonha de quem foi' },

              // Emotional (12)
              { id: 'needs', label: 'Ter Necessidades', cat: 'Emocional', desc: 'Vergonha de precisar de algo' },
              { id: 'vulnerability', label: 'Vulnerabilidade', cat: 'Emocional', desc: 'Mostrar fraqueza' },
              { id: 'emotions', label: 'Emoções', cat: 'Emocional', desc: 'Sentir emoções intensas' },
              { id: 'desire', label: 'Desejos', cat: 'Emocional', desc: 'Vergonha dos próprios desejos' },
              { id: 'mental-health', label: 'Saúde Mental', cat: 'Emocional', desc: 'Problemas psicológicos' },
              { id: 'crying', label: 'Chorar', cat: 'Emocional', desc: 'Vergonha de chorar' },
              { id: 'fear', label: 'Having Fear', cat: 'Emocional', desc: 'Shame of feeling fear' },
              { id: 'neediness', label: 'Ser Carente', cat: 'Emocional', desc: 'Precisar demais dos outros' },
              { id: 'sensitivity', label: 'Sensibilidade', cat: 'Emocional', desc: 'Ser muito sensível' },
              { id: 'anxiety', label: 'Ansiedade', cat: 'Emocional', desc: 'Sofrer de ansiedade' },
              { id: 'depression', label: 'Depressão', cat: 'Emocional', desc: 'Sofrer de depressão' },
              { id: 'darkness-inside', label: 'Darkness Interior', cat: 'Emocional', desc: 'Pensamentos sombrios' },

              // Sexual/Romantic (12)
              { id: 'sexuality', label: 'Sexualidade', cat: 'Íntimo', desc: 'Orientação ou expressão sexual' },
              { id: 'inexperience', label: 'Inexperiência', cat: 'Íntimo', desc: 'Falta de experiência' },
              { id: 'desires-taboo', label: 'Desejos Tabu', cat: 'Íntimo', desc: 'Desejos "inaceitáveis"' },
              { id: 'romantic-failure', label: 'Fracasso Amoroso', cat: 'Íntimo', desc: 'Histórico de relacionamentos ruins' },
              { id: 'virginity', label: 'Virgindade', cat: 'Íntimo', desc: 'Ainda ser virgem' },
              { id: 'body-intimate', label: 'Corpo na Intimidade', cat: 'Íntimo', desc: 'Vergonha do corpo nu' },
              { id: 'performance', label: 'Performance', cat: 'Íntimo', desc: 'Fear of not satisfying' },
              { id: 'kinks', label: 'Fetiches', cat: 'Íntimo', desc: 'Desejos não convencionais' },
              { id: 'romantic-history', label: 'Histórico Romântico', cat: 'Íntimo', desc: 'Número de parceiros' },
              { id: 'never-loved', label: 'Nunca Amado', cat: 'Íntimo', desc: 'Nunca teve relacionamento' },
              { id: 'heartbreak', label: 'Coração Partido', cat: 'Íntimo', desc: 'Ter sido devastado' },
              { id: 'romantic-mistakes', label: 'Erros Românticos', cat: 'Íntimo', desc: 'Decisões ruins no amor' },
            ];

            const selectedShames = data.innerWorld.coreShame || [];

            const toggleShame = (shameId) => {
              if (selectedShames.includes(shameId)) {
                update('innerWorld', 'coreShame', selectedShames.filter(s => s !== shameId));
              } else if (selectedShames.length < 4) {
                update('innerWorld', 'coreShame', [...selectedShames, shameId]);
              }
            };

            const categories = [...new Set(shameOptions.map(s => s.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedShames.length}/4</span>
                </div>

                {selectedShames.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedShames.map(shameId => {
                      const shame = shameOptions.find(s => s.id === shameId);
                      return shame ? (
                        <span
                          key={shameId}
                          onClick={() => toggleShame(shameId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono cursor-pointer hover:bg-purple-200"
                        >
                          😔 {shame.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {shameOptions.filter(s => s.cat === cat).map(shame => (
                        <button
                          key={shame.id}
                          onClick={() => toggleShame(shame.id)}
                          disabled={!selectedShames.includes(shame.id) && selectedShames.length >= 4}
                          title={shame.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedShames.includes(shame.id)
                              ? 'bg-purple-500 text-white'
                              : selectedShames.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer'
                          }`}
                        >
                          {shame.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Custom shame input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Vergonha personalizada (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customShame || ''}
                    onChange={(e) => update('innerWorld', 'customShame', e.target.value)}
                    placeholder="Descreva uma vergonha específica não listada..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Defense Mechanisms - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🛡️ Mecanismos de Defesa</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como a mente se protege de pensamentos e emoções dolorosas. Selecione até 4.
          </p>

          {(() => {
            const defenseOptions = [
              // Primitive (10)
              { id: 'denial', label: 'Negação', cat: 'Primitivo', desc: 'Recusa aceitar a realidade' },
              { id: 'projection', label: 'Projeção', cat: 'Primitivo', desc: 'Atribui seus sentimentos a outros' },
              { id: 'splitting', label: 'Cisão', cat: 'Primitivo', desc: 'Vê tudo como bom ou mau' },
              { id: 'dissociation', label: 'Dissociação', cat: 'Primitivo', desc: 'Desconecta da realidade' },
              { id: 'regression', label: 'Regressão', cat: 'Primitivo', desc: 'Volta a comportamentos infantis' },
              { id: 'acting-out', label: 'Acting Out', cat: 'Primitivo', desc: 'Age ao invés de sentir' },
              { id: 'omnipotence', label: 'Onipotência', cat: 'Primitivo', desc: 'Acredita ter poderes especiais' },
              { id: 'primitive-idealization', label: 'Idealização Primitiva', cat: 'Primitivo', desc: 'Vê outros como perfeitos' },
              { id: 'projective-identification', label: 'Identificação Projetiva', cat: 'Primitivo', desc: 'Força outros a sentir o que sente' },
              { id: 'schizoid-fantasy', label: 'Fantasia Esquizóide', cat: 'Primitivo', desc: 'Retiro para mundo interno' },

              // Neurotic (14)
              { id: 'repression', label: 'Repressão', cat: 'Neurótico', desc: 'Empurra para o inconsciente' },
              { id: 'displacement', label: 'Deslocamento', cat: 'Neurótico', desc: 'Direciona a outro alvo' },
              { id: 'intellectualization', label: 'Intelectualização', cat: 'Neurótico', desc: 'Racionaliza para não sentir' },
              { id: 'rationalization', label: 'Racionalização', cat: 'Neurótico', desc: 'Cria explicações aceitáveis' },
              { id: 'reaction-formation', label: 'Formação Reativa', cat: 'Neurótico', desc: 'Age oposto ao que sente' },
              { id: 'undoing', label: 'Anulação', cat: 'Neurótico', desc: 'Tenta reverter ações/pensamentos' },
              { id: 'isolation', label: 'Isolamento Afetivo', cat: 'Neurótico', desc: 'Separa emoção do pensamento' },
              { id: 'controlling', label: 'Controle Excessivo', cat: 'Neurótico', desc: 'Tenta controlar tudo' },
              { id: 'externalization', label: 'Externalização', cat: 'Neurótico', desc: 'Culpa fatores externos' },
              { id: 'inhibition', label: 'Inibição', cat: 'Neurótico', desc: 'Limita funções do ego' },
              { id: 'sexualization', label: 'Sexualização', cat: 'Neurótico', desc: 'Dá conotação sexual a coisas' },
              { id: 'moralization', label: 'Moralização', cat: 'Neurótico', desc: 'Transforma em questão moral' },
              { id: 'turning-against-self', label: 'Volta Contra Si', cat: 'Neurótico', desc: 'Direciona raiva para si' },
              { id: 'reversal', label: 'Reversão', cat: 'Neurótico', desc: 'Transforma em oposto' },

              // Mature (10)
              { id: 'humor', label: 'Humor', cat: 'Maduro', desc: 'Usa humor para lidar' },
              { id: 'sublimation', label: 'Sublimação', cat: 'Maduro', desc: 'Canaliza para algo produtivo' },
              { id: 'suppression', label: 'Supressão', cat: 'Maduro', desc: 'Conscientemente adia lidar' },
              { id: 'altruism', label: 'Altruísmo', cat: 'Maduro', desc: 'Ajuda outros para se sentir bem' },
              { id: 'anticipation', label: 'Antecipação', cat: 'Maduro', desc: 'Planeja para futuras dificuldades' },
              { id: 'acceptance', label: 'Aceitação', cat: 'Maduro', desc: 'Aceita a realidade' },
              { id: 'identification', label: 'Identificação', cat: 'Maduro', desc: 'Incorpora qualidades de outros' },
              { id: 'affiliation', label: 'Afiliação', cat: 'Maduro', desc: 'Busca apoio de outros' },
              { id: 'self-observation', label: 'Auto-Observação', cat: 'Maduro', desc: 'Reflete sobre si mesmo' },
              { id: 'self-assertion', label: 'Auto-Afirmação', cat: 'Maduro', desc: 'Expressa sentimentos diretamente' },

              // Other common (14)
              { id: 'avoidance', label: 'Evitação', cat: 'Comum', desc: 'Evita situações difíceis' },
              { id: 'compensation', label: 'Compensação', cat: 'Comum', desc: 'Sobressai em outra área' },
              { id: 'fantasy', label: 'Fantasia', cat: 'Comum', desc: 'Escapa para mundo imaginário' },
              { id: 'passive-aggression', label: 'Passivo-Agressivo', cat: 'Comum', desc: 'Hostilidade indireta' },
              { id: 'idealization', label: 'Idealização', cat: 'Comum', desc: 'Vê outros como perfeitos' },
              { id: 'devaluation', label: 'Desvalorização', cat: 'Comum', desc: 'Diminui valor de outros' },
              { id: 'somatization', label: 'Somatização', cat: 'Comum', desc: 'Converte em sintomas físicos' },
              { id: 'compartmentalization', label: 'Compartimentalização', cat: 'Comum', desc: 'Separa partes da vida' },
              { id: 'minimization', label: 'Minimização', cat: 'Comum', desc: 'Diminui importância de algo' },
              { id: 'exaggeration', label: 'Exagero', cat: 'Comum', desc: 'Amplifica situações' },
              { id: 'distancing', label: 'Distanciamento', cat: 'Comum', desc: 'Se afasta emocionalmente' },
              { id: 'withdrawal', label: 'Retirada', cat: 'Comum', desc: 'Se retira de situações' },
              { id: 'help-rejecting', label: 'Rejeitar Ajuda', cat: 'Comum', desc: 'Pede ajuda mas rejeita' },
              { id: 'autistic-fantasy', label: 'Devaneio Excessivo', cat: 'Comum', desc: 'Vive em fantasia' },
            ];

            const selectedDefenses = data.innerWorld.defenseMechanisms || [];

            const toggleDefense = (defenseId) => {
              if (selectedDefenses.includes(defenseId)) {
                update('innerWorld', 'defenseMechanisms', selectedDefenses.filter(d => d !== defenseId));
              } else if (selectedDefenses.length < 4) {
                update('innerWorld', 'defenseMechanisms', [...selectedDefenses, defenseId]);
              }
            };

            const categories = [...new Set(defenseOptions.map(d => d.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedDefenses.length}/4</span>
                </div>

                {selectedDefenses.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedDefenses.map(defenseId => {
                      const defense = defenseOptions.find(d => d.id === defenseId);
                      const isPrimitive = defense?.cat === 'Primitivo';
                      const isMature = defense?.cat === 'Maduro';
                      return defense ? (
                        <span
                          key={defenseId}
                          onClick={() => toggleDefense(defenseId)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                            isPrimitive ? 'bg-red-100 text-red-800' :
                            isMature ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          🛡️ {defense.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className={`font-mono text-[10px] uppercase mb-1 ${
                      cat === 'Primitivo' ? 'text-red-600' :
                      cat === 'Maduro' ? 'text-green-600' :
                      cat === 'Neurótico' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {defenseOptions.filter(d => d.cat === cat).map(defense => (
                        <button
                          key={defense.id}
                          onClick={() => toggleDefense(defense.id)}
                          disabled={!selectedDefenses.includes(defense.id) && selectedDefenses.length >= 4}
                          title={defense.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedDefenses.includes(defense.id)
                              ? cat === 'Primitivo' ? 'bg-red-500 text-white' :
                                cat === 'Maduro' ? 'bg-green-500 text-white' :
                                cat === 'Neurótico' ? 'bg-orange-500 text-white' :
                                'bg-blue-500 text-white'
                              : selectedDefenses.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : cat === 'Primitivo' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                cat === 'Maduro' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                                cat === 'Neurótico' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' :
                                'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          } cursor-pointer`}
                        >
                          {defense.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <p className="font-mono text-[10px] text-gray-500 mt-2 italic">
                  💡 <span className="text-red-600">Primitivos</span> = menos saudáveis |
                  <span className="text-orange-600"> Neuróticos</span> = moderados |
                  <span className="text-green-600"> Maduros</span> = mais saudáveis
                </p>

                {/* Custom defense input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Mecanismo personalizado (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customDefense || ''}
                    onChange={(e) => update('innerWorld', 'customDefense', e.target.value)}
                    placeholder="Descreva um mecanismo de defesa específico..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Inner Critic Voice - Multi-select up to 5 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👤 Voz do Crítico Interior</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O que a voz negativa interna diz constantemente. Selecione até 5 frases principais.
          </p>

          {(() => {
            const criticOptions = [
              // Inadequacy (12)
              { id: 'not-good-enough', label: '"Você não é bom o suficiente"', cat: 'Inadequação', desc: 'Nunca atinge o padrão' },
              { id: 'not-smart', label: '"Você é burro"', cat: 'Inadequação', desc: 'Não é inteligente' },
              { id: 'not-talented', label: '"Você não tem talento"', cat: 'Inadequação', desc: 'Sem habilidades especiais' },
              { id: 'not-trying', label: '"Você não se esforça"', cat: 'Inadequação', desc: 'Preguiçoso, sem dedicação' },
              { id: 'mediocre', label: '"Você é medíocre"', cat: 'Inadequação', desc: 'Comum, sem destaque' },
              { id: 'failure', label: '"Você é um fracasso"', cat: 'Inadequação', desc: 'Não consegue nada' },
              { id: 'not-capable', label: '"Você não é capaz"', cat: 'Inadequação', desc: 'Incapaz de fazer' },
              { id: 'cant-do-anything', label: '"Você não faz nada direito"', cat: 'Inadequação', desc: 'Tudo que faz é errado' },
              { id: 'never-succeed', label: '"Você nunca vai conseguir"', cat: 'Inadequação', desc: 'Destinado a falhar' },
              { id: 'not-as-good', label: '"Outros são melhores que você"', cat: 'Inadequação', desc: 'Sempre inferior' },
              { id: 'disappointing', label: '"Você é uma decepção"', cat: 'Inadequação', desc: 'Decepciona a todos' },
              { id: 'pathetic', label: '"Você é patético"', cat: 'Inadequação', desc: 'Digno de pena' },

              // Unlovability (12)
              { id: 'unlovable', label: '"Ninguém te ama de verdade"', cat: 'Amor', desc: 'Impossível ser amado' },
              { id: 'burden', label: '"Você é um fardo"', cat: 'Amor', desc: 'Atrapalha os outros' },
              { id: 'alone', label: '"Você vai morrer sozinho"', cat: 'Amor', desc: 'Destinado à solidão' },
              { id: 'too-much', label: '"Você é demais"', cat: 'Amor', desc: 'Intenso demais, cansativo' },
              { id: 'not-enough', label: '"Você não é suficiente"', cat: 'Amor', desc: 'Não satisfaz ninguém' },
              { id: 'abandoned', label: '"Todos vão te abandonar"', cat: 'Amor', desc: 'Sempre será deixado' },
              { id: 'dont-deserve-love', label: '"Você não merece amor"', cat: 'Amor', desc: 'Não merece ser amado' },
              { id: 'no-one-cares', label: '"Ninguém se importa com você"', cat: 'Amor', desc: 'Ignorado por todos' },
              { id: 'better-without-you', label: '"Estariam melhor sem você"', cat: 'Amor', desc: 'Atrapalha a vida dos outros' },
              { id: 'annoying', label: '"Você é irritante"', cat: 'Amor', desc: 'Incomoda as pessoas' },
              { id: 'unwanted', label: '"Ninguém te quer"', cat: 'Amor', desc: 'Não é desejado' },
              { id: 'replaceable', label: '"Você é substituível"', cat: 'Amor', desc: 'Qualquer um serve no seu lugar' },

              // Shame (12)
              { id: 'disgusting', label: '"Você é nojento"', cat: 'Vergonha', desc: 'Algo repulsivo em si' },
              { id: 'shameful', label: '"Você deveria ter vergonha"', cat: 'Vergonha', desc: 'Deveria se envergonhar' },
              { id: 'fraud', label: '"Você é uma fraude"', cat: 'Vergonha', desc: 'Enganando todo mundo' },
              { id: 'wrong', label: '"Tem algo errado com você"', cat: 'Vergonha', desc: 'Fundamentalmente defeituoso' },
              { id: 'broken', label: '"Você é quebrado"', cat: 'Vergonha', desc: 'Danificado, irreparável' },
              { id: 'dirty', label: '"Você é sujo"', cat: 'Vergonha', desc: 'Impuro, manchado' },
              { id: 'defective', label: '"Você é defeituoso"', cat: 'Vergonha', desc: 'Nasceu com problema' },
              { id: 'ugly-inside', label: '"Você é feio por dentro"', cat: 'Vergonha', desc: 'Alma feia' },
              { id: 'monster', label: '"Você é um monstro"', cat: 'Vergonha', desc: 'Pessoa terrível' },
              { id: 'secret-self', label: '"Se soubessem quem você é..."', cat: 'Vergonha', desc: 'O eu escondido é horrível' },
              { id: 'pretending', label: '"Você está fingindo"', cat: 'Vergonha', desc: 'Não é quem parece' },
              { id: 'dont-belong', label: '"Você não pertence aqui"', cat: 'Vergonha', desc: 'Intruso, não pertence' },

              // Worthlessness (10)
              { id: 'worthless', label: '"Você não vale nada"', cat: 'Valor', desc: 'Sem nenhum valor' },
              { id: 'useless', label: '"Você é inútil"', cat: 'Valor', desc: 'Não serve para nada' },
              { id: 'waste', label: '"Você é um desperdício"', cat: 'Valor', desc: 'Desperdiçando potencial/vida' },
              { id: 'invisible', label: '"Ninguém te nota"', cat: 'Valor', desc: 'Invisível, ignorado' },
              { id: 'matter', label: '"Você não importa"', cat: 'Valor', desc: 'Sem significância' },
              { id: 'pointless', label: '"Sua existência é inútil"', cat: 'Valor', desc: 'Não há razão para existir' },
              { id: 'contribute-nothing', label: '"Você não contribui com nada"', cat: 'Valor', desc: 'Sem contribuição' },
              { id: 'take-space', label: '"Você só ocupa espaço"', cat: 'Valor', desc: 'Apenas existe, sem propósito' },
              { id: 'no-impact', label: '"Nada mudaria sem você"', cat: 'Valor', desc: 'Sem impacto no mundo' },
              { id: 'forgettable', label: '"Você é esquecível"', cat: 'Valor', desc: 'Ninguém vai lembrar' },

              // Self-blame (10)
              { id: 'your-fault', label: '"É tudo culpa sua"', cat: 'Culpa', desc: 'Responsável por tudo de ruim' },
              { id: 'deserve-bad', label: '"Você merece coisas ruins"', cat: 'Culpa', desc: 'Merece sofrer' },
              { id: 'ruined', label: '"Você estragou tudo"', cat: 'Culpa', desc: 'Arruina tudo que toca' },
              { id: 'selfish', label: '"Você só pensa em si"', cat: 'Culpa', desc: 'Egoísta demais' },
              { id: 'hurt-everyone', label: '"Você machuca quem ama"', cat: 'Culpa', desc: 'Tóxico para outros' },
              { id: 'caused-this', label: '"Você causou isso"', cat: 'Culpa', desc: 'Responsável pelo problema' },
              { id: 'should-have', label: '"Você deveria ter feito diferente"', cat: 'Culpa', desc: 'Sempre escolhe errado' },
              { id: 'punishment', label: '"Você merece ser punido"', cat: 'Culpa', desc: 'Merece castigo' },
              { id: 'blame', label: '"A culpa é sua"', cat: 'Culpa', desc: 'Culpado por tudo' },
              { id: 'destroyed', label: '"Você destruiu tudo"', cat: 'Culpa', desc: 'Destruidor' },

              // Fear (12)
              { id: 'cant-handle', label: '"You won't handle it"', cat: 'Fear', desc: 'Will crumble' },
              { id: 'too-weak', label: '"You are too weak"', cat: 'Fear', desc: 'No strength to face' },
              { id: 'fail-again', label: '"You will fail again"', cat: 'Fear', desc: 'History repeating' },
              { id: 'exposed', label: '"They will find out who you are"', cat: 'Fear', desc: 'The mask will fall' },
              { id: 'too-late', label: '"It's too late"', cat: 'Fear', desc: 'Lost the chance' },
              { id: 'never-change', label: '"You will never change"', cat: 'Fear', desc: 'Trapped forever' },
              { id: 'cant-escape', label: '"You cannot escape"', cat: 'Fear', desc: 'No way out' },
              { id: 'something-bad', label: '"Something bad will happen"', cat: 'Fear', desc: 'Imminent disaster' },
              { id: 'lose-everything', label: '"You will lose everything"', cat: 'Fear', desc: 'Total loss' },
              { id: 'not-safe', label: '"You are not safe"', cat: 'Fear', desc: 'Constant danger' },
              { id: 'time-running-out', label: '"Time is running out"', cat: 'Fear', desc: 'Constant urgency' },
              { id: 'doomed', label: '"You are doomed"', cat: 'Fear', desc: 'Sealed fate' },
            ];

            const selectedCritic = data.innerWorld.innerCriticVoice || [];

            const toggleCritic = (criticId) => {
              if (selectedCritic.includes(criticId)) {
                update('innerWorld', 'innerCriticVoice', selectedCritic.filter(c => c !== criticId));
              } else if (selectedCritic.length < 5) {
                update('innerWorld', 'innerCriticVoice', [...selectedCritic, criticId]);
              }
            };

            const categories = [...new Set(criticOptions.map(c => c.cat))];

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedCritic.length}/5</span>
                </div>

                {selectedCritic.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedCritic.map(criticId => {
                      const critic = criticOptions.find(c => c.id === criticId);
                      return critic ? (
                        <span
                          key={criticId}
                          onClick={() => toggleCritic(criticId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono cursor-pointer hover:bg-slate-300 italic"
                        >
                          {critic.label} <span className="text-[10px] not-italic">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {criticOptions.filter(c => c.cat === cat).map(critic => (
                        <button
                          key={critic.id}
                          onClick={() => toggleCritic(critic.id)}
                          disabled={!selectedCritic.includes(critic.id) && selectedCritic.length >= 5}
                          title={critic.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all italic ${
                            selectedCritic.includes(critic.id)
                              ? 'bg-slate-700 text-white'
                              : selectedCritic.length >= 5
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer'
                          }`}
                        >
                          {critic.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Custom critic input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Voz personalizada (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customCritic || ''}
                    onChange={(e) => update('innerWorld', 'customCritic', e.target.value)}
                    placeholder='Ex: "Você nunca será como seu irmão"'
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs italic"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    ),
    4: ( // Mental Health
      <div className="space-y-6">
        {/* Header Explanation */}
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">🧠 SAÚDE MENTAL (Opcional)</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">
            Transtornos, tratamentos e medicações do personagem. <strong>Esta seção é completamente opcional</strong> e
            deve ser usada com sensibilidade. Códigos CID-10 incluídos para precisão clínica.
          </p>
        </div>

        {/* Toggle for enabling mental health section */}
        <div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.mentalHealth.hasMentalHealthHistory || false}
              onChange={(e) => update('mentalHealth', 'hasMentalHealthHistory', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="font-mono text-sm text-gray-700">
              Este personagem tem histórico de saúde mental relevante para a narrativa
            </span>
          </label>
        </div>

        {data.mentalHealth.hasMentalHealthHistory && (
          <>
            {/* Diagnosed Conditions - Multi-select with CID */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📋 Condições Diagnosticadas</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Diagnósticos oficiais com código CID-10. Selecione até 3.
              </p>

              {(() => {
                const conditionOptions = [
                  // Mood Disorders F30-F39
                  { id: 'f32', cid: 'F32', label: 'Episódio Depressivo', cat: 'Transtornos do Humor', desc: 'Depressão maior, episódio único' },
                  { id: 'f33', cid: 'F33', label: 'Transtorno Depressivo Recorrente', cat: 'Transtornos do Humor', desc: 'Depressão com múltiplos episódios' },
                  { id: 'f34.1', cid: 'F34.1', label: 'Distimia', cat: 'Transtornos do Humor', desc: 'Depressão crônica de baixa intensidade' },
                  { id: 'f31', cid: 'F31', label: 'Transtorno Afetivo Bipolar', cat: 'Transtornos do Humor', desc: 'Oscilação entre mania e depressão' },
                  { id: 'f30', cid: 'F30', label: 'Episódio Maníaco', cat: 'Transtornos do Humor', desc: 'Mania isolada' },
                  { id: 'f34.0', cid: 'F34.0', label: 'Ciclotimia', cat: 'Transtornos do Humor', desc: 'Oscilações de humor menos intensas' },

                  // Anxiety Disorders F40-F48
                  { id: 'f41.1', cid: 'F41.1', label: 'Transtorno de Ansiedade Generalizada', cat: 'Anxiety Disorders', desc: 'Preocupação excessiva constante' },
                  { id: 'f41.0', cid: 'F41.0', label: 'Transtorno de Pânico', cat: 'Anxiety Disorders', desc: 'Ataques de pânico recorrentes' },
                  { id: 'f40.1', cid: 'F40.1', label: 'Social Phobia', cat: 'Anxiety Disorders', desc: 'Intense fear of social situations' },
                  { id: 'f40.2', cid: 'F40.2', label: 'Specific Phobias', cat: 'Anxiety Disorders', desc: 'Intense fear of specific objects/situations' },
                  { id: 'f40.0', cid: 'F40.0', label: 'Agoraphobia', cat: 'Anxiety Disorders', desc: 'Fear of open spaces/crowds' },
                  { id: 'f42', cid: 'F42', label: 'Transtorno Obsessivo-Compulsivo (TOC)', cat: 'Anxiety Disorders', desc: 'Obsessões e compulsões' },
                  { id: 'f43.1', cid: 'F43.1', label: 'TEPT', cat: 'Anxiety Disorders', desc: 'Transtorno de Estresse Pós-Traumático' },
                  { id: 'f43.2', cid: 'F43.2', label: 'Transtorno de Ajustamento', cat: 'Anxiety Disorders', desc: 'Reação a estresse/mudança de vida' },

                  // Psychotic Disorders F20-F29
                  { id: 'f20', cid: 'F20', label: 'Esquizofrenia', cat: 'Transtornos Psicóticos', desc: 'Alucinações, delírios, desorganização' },
                  { id: 'f25', cid: 'F25', label: 'Transtorno Esquizoafetivo', cat: 'Transtornos Psicóticos', desc: 'Sintomas de esquizofrenia + humor' },
                  { id: 'f22', cid: 'F22', label: 'Transtorno Delirante', cat: 'Transtornos Psicóticos', desc: 'Delírios persistentes sem outros sintomas' },
                  { id: 'f23', cid: 'F23', label: 'Transtorno Psicótico Breve', cat: 'Transtornos Psicóticos', desc: 'Episódio psicótico de curta duração' },

                  // Personality Disorders F60-F69
                  { id: 'f60.3', cid: 'F60.3', label: 'Transtorno de Personalidade Borderline', cat: 'Transtornos de Personalidade', desc: 'Instabilidade emocional, impulsividade' },
                  { id: 'f60.2', cid: 'F60.2', label: 'Transtorno de Personalidade Antissocial', cat: 'Transtornos de Personalidade', desc: 'Desrespeito por normas e direitos' },
                  { id: 'f60.81', cid: 'F60.81', label: 'Transtorno de Personalidade Narcisista', cat: 'Transtornos de Personalidade', desc: 'Grandiosidade, necessidade de admiração' },
                  { id: 'f60.4', cid: 'F60.4', label: 'Transtorno de Personalidade Histriônica', cat: 'Transtornos de Personalidade', desc: 'Emotividade excessiva, busca de atenção' },
                  { id: 'f60.6', cid: 'F60.6', label: 'Transtorno de Personalidade Evitativa', cat: 'Transtornos de Personalidade', desc: 'Inibição social, sentimentos de inadequação' },
                  { id: 'f60.7', cid: 'F60.7', label: 'Transtorno de Personalidade Dependente', cat: 'Transtornos de Personalidade', desc: 'Necessidade excessiva de cuidado' },
                  { id: 'f60.5', cid: 'F60.5', label: 'Transtorno de Personalidade Obsessiva', cat: 'Transtornos de Personalidade', desc: 'Perfeccionismo, rigidez' },
                  { id: 'f60.0', cid: 'F60.0', label: 'Transtorno de Personalidade Paranoide', cat: 'Transtornos de Personalidade', desc: 'Desconfiança e suspeita' },
                  { id: 'f60.1', cid: 'F60.1', label: 'Transtorno de Personalidade Esquizoide', cat: 'Transtornos de Personalidade', desc: 'Distanciamento social, afeto restrito' },
                  { id: 'f21', cid: 'F21', label: 'Transtorno de Personalidade Esquizotípica', cat: 'Transtornos de Personalidade', desc: 'Excentricidade, pensamento mágico' },

                  // Eating Disorders F50
                  { id: 'f50.0', cid: 'F50.0', label: 'Anorexia Nervosa', cat: 'Eating Disorders', desc: 'Food restriction, fear of gaining weight' },
                  { id: 'f50.2', cid: 'F50.2', label: 'Bulimia Nervosa', cat: 'Eating Disorders', desc: 'Compulsão alimentar + purgação' },
                  { id: 'f50.8', cid: 'F50.8', label: 'Transtorno de Compulsão Alimentar', cat: 'Eating Disorders', desc: 'Compulsão sem purgação' },

                  // Substance Use F10-F19
                  { id: 'f10', cid: 'F10', label: 'Transtorno por Uso de Álcool', cat: 'Transtornos por Substâncias', desc: 'Dependência ou abuso de álcool' },
                  { id: 'f11', cid: 'F11', label: 'Transtorno por Uso de Opioides', cat: 'Transtornos por Substâncias', desc: 'Dependência de opioides' },
                  { id: 'f12', cid: 'F12', label: 'Transtorno por Uso de Cannabis', cat: 'Transtornos por Substâncias', desc: 'Dependência de maconha' },
                  { id: 'f14', cid: 'F14', label: 'Transtorno por Uso de Cocaína', cat: 'Transtornos por Substâncias', desc: 'Dependência de cocaína/crack' },
                  { id: 'f15', cid: 'F15', label: 'Transtorno por Uso de Estimulantes', cat: 'Transtornos por Substâncias', desc: 'Anfetaminas, metanfetaminas' },
                  { id: 'f17', cid: 'F17', label: 'Transtorno por Uso de Tabaco', cat: 'Transtornos por Substâncias', desc: 'Dependência de nicotina' },
                  { id: 'f19', cid: 'F19', label: 'Transtorno por Múltiplas Substâncias', cat: 'Transtornos por Substâncias', desc: 'Poliusuário' },

                  // Neurodevelopmental F80-F89, F90-F98
                  { id: 'f90', cid: 'F90', label: 'TDAH', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Déficit de Atenção e Hiperatividade' },
                  { id: 'f84.0', cid: 'F84.0', label: 'Transtorno do Espectro Autista', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Autismo, dificuldades sociais e comunicação' },
                  { id: 'f81', cid: 'F81', label: 'Transtornos de Aprendizagem', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Dislexia, discalculia' },
                  { id: 'f95', cid: 'F95', label: 'Transtorno de Tiques / Tourette', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Tiques motores e vocais' },

                  // Other
                  { id: 'f44', cid: 'F44', label: 'Transtorno Dissociativo', cat: 'Outros', desc: 'Dissociação, amnésia dissociativa' },
                  { id: 'f44.81', cid: 'F44.81', label: 'Transtorno Dissociativo de Identidade', cat: 'Outros', desc: 'Múltiplas personalidades' },
                  { id: 'f45', cid: 'F45', label: 'Transtorno Somatoforme', cat: 'Outros', desc: 'Sintomas físicos sem causa médica' },
                  { id: 'f51', cid: 'F51', label: 'Transtornos do Sono', cat: 'Outros', desc: 'Insônia, hipersonia, parassonias' },
                  { id: 'f63', cid: 'F63', label: 'Transtornos de Controle de Impulsos', cat: 'Outros', desc: 'Cleptomania, piromania, jogo patológico' },
                  { id: 'f64', cid: 'F64', label: 'Disforia de Gênero', cat: 'Outros', desc: 'Incongruência de gênero' },
                ];

                const selectedConditions = data.mentalHealth.diagnosedConditions || [];

                const toggleCondition = (conditionId) => {
                  if (selectedConditions.includes(conditionId)) {
                    update('mentalHealth', 'diagnosedConditions', selectedConditions.filter(c => c !== conditionId));
                  } else if (selectedConditions.length < 3) {
                    update('mentalHealth', 'diagnosedConditions', [...selectedConditions, conditionId]);
                  }
                };

                const categories = [...new Set(conditionOptions.map(c => c.cat))];

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">Selecionados: {selectedConditions.length}/3</span>
                    </div>

                    {selectedConditions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedConditions.map(conditionId => {
                          const condition = conditionOptions.find(c => c.id === conditionId);
                          return condition ? (
                            <span
                              key={conditionId}
                              onClick={() => toggleCondition(conditionId)}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-mono cursor-pointer hover:bg-teal-200"
                            >
                              <span className="text-[9px] bg-teal-200 px-1 rounded">{condition.cid}</span> {condition.label} <span className="text-[10px]">×</span>
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}

                    {categories.map(cat => (
                      <div key={cat} className="mb-2">
                        <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                        <div className="flex flex-wrap gap-1">
                          {conditionOptions.filter(c => c.cat === cat).map(condition => (
                            <button
                              key={condition.id}
                              onClick={() => toggleCondition(condition.id)}
                              disabled={!selectedConditions.includes(condition.id) && selectedConditions.length >= 3}
                              title={`${condition.cid}: ${condition.desc}`}
                              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                selectedConditions.includes(condition.id)
                                  ? 'bg-teal-500 text-white'
                                  : selectedConditions.length >= 3
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100 cursor-pointer'
                              }`}
                            >
                              <span className="text-[9px] opacity-75">{condition.cid}</span> {condition.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Custom condition */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Condição personalizada (opcional):</label>
                      <input
                        type="text"
                        value={data.mentalHealth.customCondition || ''}
                        onChange={(e) => update('mentalHealth', 'customCondition', e.target.value)}
                        placeholder="Descreva uma condição específica..."
                        className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Undiagnosed Tendencies */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">❓ Tendências Não-Diagnosticadas</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Padrões comportamentais ou emocionais que o personagem demonstra, mas nunca foram formalmente diagnosticados. Selecione até 3.
              </p>

              {(() => {
                const tendencyOptions = [
                  { id: 'depressive', label: 'Tendências Depressivas', desc: 'Humor baixo recorrente, sem diagnóstico formal' },
                  { id: 'anxious', label: 'Tendências Ansiosas', desc: 'Preocupação excessiva, nervosismo' },
                  { id: 'obsessive', label: 'Tendências Obsessivas', desc: 'Pensamentos repetitivos, rituais' },
                  { id: 'paranoid', label: 'Tendências Paranoides', desc: 'Desconfiança, suspeita excessiva' },
                  { id: 'narcissistic', label: 'Traços Narcisistas', desc: 'Grandiosidade, necessidade de admiração' },
                  { id: 'borderline', label: 'Borderline Traits', desc: 'Emotional instability, fear of abandonment' },
                  { id: 'avoidant', label: 'Avoidant Traits', desc: 'Social avoidance, fear of rejection' },
                  { id: 'dependent', label: 'Traços Dependentes', desc: 'Dificuldade em tomar decisões sozinho' },
                  { id: 'histrionic', label: 'Traços Histriônicos', desc: 'Dramaticidade, busca de atenção' },
                  { id: 'antisocial', label: 'Traços Antissociais', desc: 'Desrespeito por regras, falta de remorso' },
                  { id: 'schizoid', label: 'Traços Esquizoides', desc: 'Preferência por solidão, afeto restrito' },
                  { id: 'adhd', label: 'Traços de TDAH', desc: 'Desatenção, impulsividade' },
                  { id: 'autism', label: 'Traços Autísticos', desc: 'Dificuldades sociais sutis, interesses específicos' },
                  { id: 'trauma', label: 'Trauma Não Processado', desc: 'Sintomas de TEPT sem diagnóstico' },
                  { id: 'dissociative', label: 'Tendências Dissociativas', desc: 'Episódios de desconexão da realidade' },
                  { id: 'eating', label: 'Relação Difícil com Comida', desc: 'Padrões alimentares problemáticos' },
                  { id: 'addiction', label: 'Comportamentos Aditivos', desc: 'Vícios não-substâncias (jogo, compras, sexo)' },
                  { id: 'self-harm', label: 'Histórico de Autolesão', desc: 'Comportamentos autolesivos passados' },
                  { id: 'suicidal', label: 'Ideação Suicida Prévia', desc: 'Pensamentos suicidas no passado' },
                ];

                const selectedTendencies = data.mentalHealth.undiagnosedTendencies || [];

                const toggleTendency = (tendencyId) => {
                  if (selectedTendencies.includes(tendencyId)) {
                    update('mentalHealth', 'undiagnosedTendencies', selectedTendencies.filter(t => t !== tendencyId));
                  } else if (selectedTendencies.length < 3) {
                    update('mentalHealth', 'undiagnosedTendencies', [...selectedTendencies, tendencyId]);
                  }
                };

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">Selecionados: {selectedTendencies.length}/3</span>
                    </div>

                    {selectedTendencies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedTendencies.map(tendencyId => {
                          const tendency = tendencyOptions.find(t => t.id === tendencyId);
                          return tendency ? (
                            <span
                              key={tendencyId}
                              onClick={() => toggleTendency(tendencyId)}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-mono cursor-pointer hover:bg-amber-200"
                            >
                              ❓ {tendency.label} <span className="text-[10px]">×</span>
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {tendencyOptions.map(tendency => (
                        <button
                          key={tendency.id}
                          onClick={() => toggleTendency(tendency.id)}
                          disabled={!selectedTendencies.includes(tendency.id) && selectedTendencies.length >= 3}
                          title={tendency.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedTendencies.includes(tendency.id)
                              ? 'bg-amber-500 text-white'
                              : selectedTendencies.length >= 3
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer'
                          }`}
                        >
                          {tendency.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Therapy History */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🛋️ Histórico de Terapia</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Experiência do personagem com tratamento psicológico/psiquiátrico.
              </p>

              {/* Therapy Status */}
              <div className="mb-4">
                <label className="font-mono text-[10px] text-gray-500 mb-1 block">Status atual:</label>
                <select
                  value={data.mentalHealth.therapyStatus || ''}
                  onChange={(e) => update('mentalHealth', 'therapyStatus', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="never">Nunca fez terapia</option>
                  <option value="considering">Considerando começar</option>
                  <option value="tried-quit">Tentou mas desistiu</option>
                  <option value="past">Fez no passado, não faz mais</option>
                  <option value="current">Em terapia atualmente</option>
                  <option value="longtime">Em terapia há anos</option>
                  <option value="resistant">Resistente/Recusa tratamento</option>
                  <option value="forced">Forçado/Obrigatório (judicial, família)</option>
                </select>
              </div>

              {/* Therapy Type */}
              {(data.mentalHealth.therapyStatus === 'current' || data.mentalHealth.therapyStatus === 'longtime' || data.mentalHealth.therapyStatus === 'past') && (
                <div className="mb-4">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">Abordagem terapêutica:</label>
                  <select
                    value={data.mentalHealth.therapyType || ''}
                    onChange={(e) => update('mentalHealth', 'therapyType', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  >
                    <option value="">-- Selecione --</option>
                    <optgroup label="Main Approaches">
                      <option value="tcc">TCC — Terapia Cognitivo-Comportamental (foco em pensamentos/comportamentos)</option>
                      <option value="psychoanalysis">Psicanálise — Freudiana (foco no inconsciente, longo prazo)</option>
                      <option value="jungian">Junguiana — Psicologia Analítica (arquétipos, sonhos)</option>
                      <option value="humanist">Humanista/Rogeriana — Centrada na pessoa (autoatualização)</option>
                      <option value="gestalt">Gestalt-Terapia — Aqui e agora (experiência presente)</option>
                      <option value="behavioral">Comportamental — Behaviorismo (modificação de comportamento)</option>
                      <option value="systemic">Sistêmica — Terapia familiar (relações e sistemas)</option>
                    </optgroup>
                    <optgroup label="Outras Abordagens">
                      <option value="psychodrama">Psicodrama — Dramatização e encenação</option>
                      <option value="existential">Existencial-Fenomenológica — Sentido da vida</option>
                      <option value="dbt">DBT — Terapia Dialética (regulação emocional)</option>
                      <option value="emdr">EMDR — Dessensibilização por movimentos oculares (trauma)</option>
                      <option value="act">ACT — Terapia de Aceitação e Compromisso</option>
                      <option value="art">Arteterapia — Expressão criativa</option>
                      <option value="group">Terapia de Grupo</option>
                      <option value="couples">Terapia de Casal</option>
                      <option value="unknown">Não sabe/Genérica</option>
                    </optgroup>
                  </select>
                </div>
              )}

              {/* Relationship with Therapy */}
              <div className="mb-4">
                <label className="font-mono text-[10px] text-gray-500 mb-1 block">Relação com o processo terapêutico:</label>
                <select
                  value={data.mentalHealth.therapyRelationship || ''}
                  onChange={(e) => update('mentalHealth', 'therapyRelationship', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="engaged">Engajado — Participa ativamente, faz as tarefas</option>
                  <option value="ambivalent">Ambivalente — Às vezes vai, às vezes falta</option>
                  <option value="resistant">Resistente — Vai mas não se abre</option>
                  <option value="skeptical">Cético — Não acredita muito que funciona</option>
                  <option value="dependent">Dependente — Não consegue ficar sem</option>
                  <option value="avoidant">Evitativo — Evita tópicos difíceis</option>
                  <option value="performative">Performático — Diz o que o terapeuta quer ouvir</option>
                  <option value="hostile">Hostil — Antagoniza o terapeuta</option>
                </select>
              </div>
            </div>

            {/* Medications */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💊 Medicação Psiquiátrica</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Classes de medicamentos (não marcas específicas). Selecione até 3.
              </p>

              {(() => {
                const medicationOptions = [
                  // Antidepressants
                  { id: 'ssri', label: 'ISRS (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Inibidor Seletivo de Recaptação de Serotonina',
                    effects: 'Náusea, insônia, disfunção sexual, ganho de peso' },
                  { id: 'snri', label: 'IRSN (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Inibidor de Recaptação de Serotonina e Noradrenalina',
                    effects: 'Náusea, tontura, sudorese, pressão alta' },
                  { id: 'tricyclic', label: 'Tricíclico (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Antidepressivo de primeira geração',
                    effects: 'Boca seca, constipação, visão turva, sedação, ganho de peso' },
                  { id: 'maoi', label: 'IMAO (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Inibidor da Monoamina Oxidase',
                    effects: 'Restrições alimentares severas, pressão alta, insônia' },
                  { id: 'atypical-ad', label: 'Atípico (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Bupropiona, Mirtazapina, Trazodona',
                    effects: 'Varia: insônia ou sedação, ganho ou perda de peso' },

                  // Anxiolytics
                  { id: 'benzo', label: 'Benzodiazepínico (Ansiolítico)', cat: 'Ansiolíticos',
                    desc: 'Diazepam, Clonazepam, Alprazolam',
                    effects: 'Sonolência, dependência, confusão, amnésia, abstinência' },
                  { id: 'buspirone', label: 'Buspirona (Ansiolítico)', cat: 'Ansiolíticos',
                    desc: 'Ansiolítico não-benzodiazepínico',
                    effects: 'Tontura, náusea, demora para fazer efeito' },
                  { id: 'z-drugs', label: 'Hipnótico-Z (Sono)', cat: 'Ansiolíticos',
                    desc: 'Zolpidem, Zopiclona',
                    effects: 'Sonambulismo, amnésia, dependência' },

                  // Antipsychotics
                  { id: 'typical-ap', label: 'Antipsicótico Típico', cat: 'Antipsicóticos',
                    desc: 'Haloperidol, Clorpromazina (1ª geração)',
                    effects: 'Rigidez, tremores, inquietação, sedação intensa' },
                  { id: 'atypical-ap', label: 'Antipsicótico Atípico', cat: 'Antipsicóticos',
                    desc: 'Risperidona, Quetiapina, Olanzapina (2ª geração)',
                    effects: 'Ganho de peso, diabetes, sedação, dislipidemia' },
                  { id: 'third-gen-ap', label: 'Antipsicótico 3ª Geração', cat: 'Antipsicóticos',
                    desc: 'Aripiprazol, Brexpiprazol',
                    effects: 'Inquietação, insônia, menos efeitos metabólicos' },

                  // Mood Stabilizers
                  { id: 'lithium', label: 'Lítio (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Carbonato de Lítio',
                    effects: 'Tremor, sede, tireoide, rins, janela terapêutica estreita' },
                  { id: 'valproate', label: 'Valproato (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Ácido Valproico, Divalproato',
                    effects: 'Ganho de peso, queda de cabelo, tremor, hepatotoxicidade' },
                  { id: 'carbamazepine', label: 'Carbamazepina (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Anticonvulsivante estabilizador',
                    effects: 'Sedação, lentidão mental, rash cutâneo' },
                  { id: 'lamotrigine', label: 'Lamotrigina (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Anticonvulsivante, bom para depressão bipolar',
                    effects: 'Rash (Stevens-Johnson), insônia, cefaleia' },

                  // Stimulants
                  { id: 'stimulant', label: 'Estimulante (TDAH)', cat: 'Estimulantes',
                    desc: 'Metilfenidato, Lisdexanfetamina',
                    effects: 'Insônia, perda de apetite, ansiedade, taquicardia' },
                  { id: 'non-stim-adhd', label: 'Não-Estimulante (TDAH)', cat: 'Estimulantes',
                    desc: 'Atomoxetina',
                    effects: 'Náusea, fadiga, demora para fazer efeito' },

                  // Other
                  { id: 'prn', label: 'SOS / Conforme Necessário', cat: 'Outros',
                    desc: 'Medicação de resgate para crises',
                    effects: 'Varia conforme o medicamento' },
                  { id: 'supplement', label: 'Suplemento/Natural', cat: 'Outros',
                    desc: 'Melatonina, Magnésio, Ômega-3, Erva de São João',
                    effects: 'Geralmente leves, interações possíveis' },
                ];

                const selectedMeds = data.mentalHealth.medications || [];

                const toggleMed = (medId) => {
                  if (selectedMeds.includes(medId)) {
                    update('mentalHealth', 'medications', selectedMeds.filter(m => m !== medId));
                  } else if (selectedMeds.length < 3) {
                    update('mentalHealth', 'medications', [...selectedMeds, medId]);
                  }
                };

                const categories = [...new Set(medicationOptions.map(m => m.cat))];

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">Selecionados: {selectedMeds.length}/3</span>
                    </div>

                    {selectedMeds.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {selectedMeds.map(medId => {
                          const med = medicationOptions.find(m => m.id === medId);
                          return med ? (
                            <div
                              key={medId}
                              className="bg-blue-50 border border-blue-200 rounded-sm p-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-blue-800">
                                  💊 {med.label}
                                </span>
                                <button
                                  onClick={() => toggleMed(medId)}
                                  className="text-blue-400 hover:text-blue-600 text-xs"
                                >
                                  ×
                                </button>
                              </div>
                              <p className="font-mono text-[10px] text-blue-600 mt-1">{med.desc}</p>
                              <p className="font-mono text-[10px] text-red-600 mt-1">
                                ⚠️ Efeitos: {med.effects}
                              </p>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}

                    {categories.map(cat => (
                      <div key={cat} className="mb-2">
                        <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                        <div className="flex flex-wrap gap-1">
                          {medicationOptions.filter(m => m.cat === cat).map(med => (
                            <button
                              key={med.id}
                              onClick={() => toggleMed(med.id)}
                              disabled={!selectedMeds.includes(med.id) && selectedMeds.length >= 3}
                              title={`${med.desc}\n⚠️ ${med.effects}`}
                              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                selectedMeds.includes(med.id)
                                  ? 'bg-blue-500 text-white'
                                  : selectedMeds.length >= 3
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer'
                              }`}
                            >
                              {med.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Medication Compliance */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <label className="font-mono text-[10px] text-gray-500 mb-1 block">Adesão à medicação:</label>
                      <select
                        value={data.mentalHealth.medCompliance || ''}
                        onChange={(e) => update('mentalHealth', 'medCompliance', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                      >
                        <option value="">-- Selecione --</option>
                        <option value="perfect">Perfeita — Nunca esquece, horários certos</option>
                        <option value="good">Boa — Raramente esquece</option>
                        <option value="irregular">Irregular — Às vezes esquece</option>
                        <option value="poor">Ruim — Frequentemente esquece ou pula doses</option>
                        <option value="self-adjust">Auto-ajusta — Muda doses por conta própria</option>
                        <option value="stops">Para sozinho — Interrompe quando se sente bem</option>
                        <option value="resistant">Resistente — Não quer tomar</option>
                        <option value="hiding">Esconde — Finge que toma</option>
                      </select>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Hospitalization History */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏥 Histórico de Internação</h4>
              <select
                value={data.mentalHealth.hospitalization || ''}
                onChange={(e) => update('mentalHealth', 'hospitalization', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Selecione --</option>
                <option value="never">Nunca foi internado</option>
                <option value="once-voluntary">Uma vez — Voluntária</option>
                <option value="once-involuntary">Uma vez — Involuntária</option>
                <option value="multiple-voluntary">Múltiplas — Voluntárias</option>
                <option value="multiple-involuntary">Múltiplas — Involuntárias</option>
                <option value="recent">Internação recente (último ano)</option>
                <option value="current">Atualmente internado</option>
              </select>
            </div>
          </>
        )}
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

// ============================================================================
// INTELLIGENCE CONTENT - Complete Implementation
// ============================================================================


export default PsychologyContent;
