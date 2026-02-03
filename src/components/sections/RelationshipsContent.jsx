import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const RelationshipsContent = ({ data, updateData, subtab }) => {
  const [editingNpcIndex, setEditingNpcIndex] = React.useState(null);
  const MAX_NPCS = 5;
  const IDEAL_NPCS = 3;

  // Template para novo NPC - expandido
  const emptyNpc = {
    id: Date.now(),
    // Básico
    name: '',
    nickname: '',
    status: 'active',
    age: '',
    ageCategory: '',
    gender: '',
    pronouns: '',
    occupation: '',
    socialClass: '',
    // Aparência
    physicalDescription: '',
    distinctiveFeatures: '',
    styleDescription: '',
    // Personalidade
    personalityBrief: '',
    personalityType: '',
    temperament: '',
    catchphrase: '',
    speakingStyle: '',
    // Relacionamento
    relationshipType: '',
    relationshipSubtype: '',
    roleInLife: '',
    proximityLevel: 5,
    trustLevel: 5,
    conflictLevel: 2,
    dependencyLevel: 3,
    influenceLevel: 5,
    emotionalBond: '',
    powerDynamic: '',
    boundaryRespect: '',
    // Comunicação
    communicationFrequency: '',
    communicationMethods: [],
    conversationTopics: [],
    avoidedTopics: [],
    // História
    howTheyMet: '',
    meetingContext: '',
    meetingYear: '',
    relationshipDuration: '',
    sharedHistory: '',
    turningPoints: '',
    secretsKnown: '',
    secretsHidden: '',
    // Dinâmica atual
    currentDynamic: '',
    recentChanges: '',
    ongoingIssues: '',
    positiveTraits: [],
    negativeTraits: [],
    sharedInterests: [],
    conflictSources: [],
    supportTypes: [],
    // Futuro
    futurePotential: '',
    unresolvedMatters: '',
    hopes: '',
    fears: '',
    // Meta
    narrativeImportance: '',
    storyRole: '',
    notes: ''
  };

  const update = (section, field, value) => {
    updateData('relationships', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  const toggleArrayItem = (section, field, item, maxItems = 10) => {
    const current = data[section]?.[field] || [];
    if (current.includes(item)) {
      update(section, field, current.filter(i => i !== item));
    } else if (current.length < maxItems) {
      update(section, field, [...current, item]);
    }
  };

  // Funções para gerenciar NPCs
  const addNpc = () => {
    const npcs = data.npcs || [];
    if (npcs.length >= MAX_NPCS) return;
    const newNpc = { ...emptyNpc, id: Date.now() };
    updateData('relationships', { ...data, npcs: [...npcs, newNpc] });
    setEditingNpcIndex(npcs.length);
  };

  const updateNpc = (index, field, value) => {
    const npcs = [...(data.npcs || [])];
    npcs[index] = { ...npcs[index], [field]: value };
    updateData('relationships', { ...data, npcs });
  };

  const toggleNpcArrayItem = (index, field, item, maxItems = 5) => {
    const npcs = [...(data.npcs || [])];
    const current = npcs[index]?.[field] || [];
    if (current.includes(item)) {
      npcs[index] = { ...npcs[index], [field]: current.filter(i => i !== item) };
    } else if (current.length < maxItems) {
      npcs[index] = { ...npcs[index], [field]: [...current, item] };
    }
    updateData('relationships', { ...data, npcs });
  };

  const removeNpc = (index) => {
    const npcs = [...(data.npcs || [])];
    npcs.splice(index, 1);
    updateData('relationships', { ...data, npcs });
    setEditingNpcIndex(null);
  };

  // ========== SISTEMA DE ANÁLISE DE RELACIONAMENTO ==========

  // Calcular saúde do relacionamento (0-100)
  const calculateRelationshipHealth = (npc) => {
    let score = 50; // Base

    // Proximidade (positivo)
    score += (npc.proximityLevel || 5) * 2;

    // Confiança (positivo)
    score += (npc.trustLevel || 5) * 3;

    // Conflito (negativo)
    score -= (npc.conflictLevel || 2) * 4;

    // Dependência extrema (negativo se muito alta)
    const dep = npc.dependencyLevel || 3;
    if (dep > 7) score -= (dep - 7) * 5;
    if (dep < 2) score -= 5; // Muito pouca conexão

    // Comunicação
    const commFreq = npc.communicationFrequency || '';
    if (['daily', 'several-week'].includes(commFreq)) score += 10;
    if (['rarely', 'almost-never', 'no-contact'].includes(commFreq)) score -= 15;

    // Status
    if (npc.status === 'estranged') score -= 30;
    if (npc.status === 'complicated') score -= 15;
    if (npc.status === 'distant') score -= 10;

    // Vínculo emocional
    const bond = npc.emotionalBond || '';
    if (['love-unconditional', 'love-romantic', 'deep-friendship', 'loyalty'].includes(bond)) score += 15;
    if (['hatred', 'resentment', 'fear'].includes(bond)) score -= 20;
    if (['guilt', 'obligation'].includes(bond)) score -= 10;

    // Dinâmica de poder
    if (npc.powerDynamic === 'balanced') score += 10;
    if (['dominant-unhealthy', 'submissive-unhealthy'].includes(npc.powerDynamic)) score -= 15;

    // Respeito a limites
    if (npc.boundaryRespect === 'always') score += 10;
    if (npc.boundaryRespect === 'rarely' || npc.boundaryRespect === 'never') score -= 20;

    // Traços
    const posTraits = (npc.positiveTraits || []).length;
    const negTraits = (npc.negativeTraits || []).length;
    score += posTraits * 2;
    score -= negTraits * 2;

    // Conflitos ativos
    const conflicts = (npc.conflictSources || []).length;
    score -= conflicts * 3;

    // Interesses compartilhados
    const interests = (npc.sharedInterests || []).length;
    score += interests * 2;

    // Clamp 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  // Obter diagnóstico do relacionamento
  const getRelationshipDiagnosis = (npc) => {
    const health = calculateRelationshipHealth(npc);
    const issues = [];
    const strengths = [];

    // Análise de problemas
    if ((npc.conflictLevel || 2) >= 7) issues.push('Alto nível de conflito');
    if ((npc.trustLevel || 5) <= 3) issues.push('Baixa confiança');
    if ((npc.dependencyLevel || 3) >= 8) issues.push('Possível codependência');
    if (['rarely', 'almost-never', 'no-contact'].includes(npc.communicationFrequency)) issues.push('Comunicação insuficiente');
    if (['hatred', 'resentment', 'fear'].includes(npc.emotionalBond)) issues.push('Vínculo emocional negativo');
    if (['dominant-unhealthy', 'submissive-unhealthy'].includes(npc.powerDynamic)) issues.push('Dinâmica de poder desequilibrada');
    if (['rarely', 'never'].includes(npc.boundaryRespect)) issues.push('Limites não respeitados');
    if ((npc.conflictSources || []).length >= 4) issues.push('Múltiplas fontes de conflito');
    if (npc.status === 'estranged') issues.push('Relacionamento rompido');

    // Análise de forças
    if ((npc.proximityLevel || 5) >= 8) strengths.push('Vínculo muito forte');
    if ((npc.trustLevel || 5) >= 8) strengths.push('Alta confiança mútua');
    if (['daily', 'several-week'].includes(npc.communicationFrequency)) strengths.push('Comunicação frequente');
    if (['love-unconditional', 'deep-friendship'].includes(npc.emotionalBond)) strengths.push('Laço emocional saudável');
    if (npc.powerDynamic === 'balanced') strengths.push('Dinâmica equilibrada');
    if (npc.boundaryRespect === 'always') strengths.push('Respeito aos limites');
    if ((npc.sharedInterests || []).length >= 4) strengths.push('Muitos interesses em comum');
    if ((npc.positiveTraits || []).length >= 4) strengths.push('Muitas qualidades positivas');

    let status = 'healthy';
    let label = 'Saudável';
    let color = 'emerald';

    if (health < 30) { status = 'critical'; label = 'Crítico'; color = 'red'; }
    else if (health < 50) { status = 'troubled'; label = 'Troubled'; color = 'orange'; }
    else if (health < 70) { status = 'mixed'; label = 'Misto'; color = 'yellow'; }
    else if (health < 85) { status = 'good'; label = 'Bom'; color = 'emerald'; }
    else { status = 'excellent'; label = 'Excelente'; color = 'green'; }

    return { health, status, label, color, issues, strengths };
  };

  // Obter cor baseada no nível de proximidade
  const getProximityColor = (level) => {
    if (level >= 9) return { bg: 'bg-rose-500', text: 'text-rose-700', light: 'bg-rose-100', border: 'border-rose-300', label: 'Alma Gêmea' };
    if (level >= 7) return { bg: 'bg-pink-500', text: 'text-pink-700', light: 'bg-pink-100', border: 'border-pink-300', label: 'Muito Próximo' };
    if (level >= 5) return { bg: 'bg-purple-500', text: 'text-purple-700', light: 'bg-purple-100', border: 'border-purple-300', label: 'Próximo' };
    if (level >= 3) return { bg: 'bg-blue-500', text: 'text-blue-700', light: 'bg-blue-100', border: 'border-blue-300', label: 'Conhecido' };
    return { bg: 'bg-gray-400', text: 'text-gray-600', light: 'bg-gray-100', border: 'border-gray-300', label: 'Distante' };
  };

  // Obter ícone do tipo de relacionamento
  const getRelationshipIcon = (type) => {
    const icons = {
      'family-parent': '👨‍👩‍👧', 'family-sibling': '👫', 'family-child': '👶', 'family-grandparent': '👴',
      'family-extended': '👪', 'family-step': '👨‍👩‍👧', 'family-in-law': '💒',
      'romantic-partner': '💑', 'romantic-spouse': '💍', 'romantic-ex': '💔', 'romantic-crush': '💕', 'romantic-complicated': '🌀',
      'friend-best': '🤝', 'friend-close': '👋', 'friend-casual': '😊', 'friend-childhood': '🧒', 'friend-online': '💻',
      'professional-mentor': '🎓', 'professional-mentee': '📚', 'professional-colleague': '💼',
      'professional-boss': '👔', 'professional-employee': '👤', 'professional-client': '🤝', 'professional-partner': '🤝',
      'rival': '⚔️', 'enemy': '👿', 'bully': '😠', 'nemesis': '🔥',
      'acquaintance': '👤', 'neighbor': '🏠', 'therapist': '🧠', 'doctor': '⚕️',
      'teacher': '📖', 'religious': '⛪', 'deceased': '🕊️', 'imaginary': '🌈', 'other': '❓'
    };
    return icons[type] || '👤';
  };

  // Calcular completude do NPC
  const calculateNpcCompleteness = (npc) => {
    const requiredFields = ['name', 'relationshipType', 'proximityLevel'];
    const importantFields = ['age', 'gender', 'occupation', 'howTheyMet', 'emotionalBond', 'communicationFrequency'];
    const optionalFields = ['physicalDescription', 'personalityBrief', 'sharedHistory', 'currentDynamic', 'roleInLife'];

    let score = 0;
    let total = 0;

    // Required (peso 3)
    requiredFields.forEach(f => { total += 3; if (npc[f]) score += 3; });
    // Important (peso 2)
    importantFields.forEach(f => { total += 2; if (npc[f]) score += 2; });
    // Optional (peso 1)
    optionalFields.forEach(f => { total += 1; if (npc[f]) score += 1; });
    // Arrays
    if ((npc.positiveTraits || []).length > 0) score += 1; total += 1;
    if ((npc.negativeTraits || []).length > 0) score += 1; total += 1;
    if ((npc.sharedInterests || []).length > 0) score += 1; total += 1;

    return Math.round((score / total) * 100);
  };

  // ========== COMPONENTE DO FORMULÁRIO DE NPC ==========
  const NpcForm = ({ npc, index }) => {
    const proximity = getProximityColor(npc.proximityLevel || 5);
    const diagnosis = getRelationshipDiagnosis(npc);
    const completeness = calculateNpcCompleteness(npc);

    return (
      <div className="space-y-6">
        {/* Header do formulário */}
        <div className={`flex items-center justify-between ${proximity.light} border-2 ${proximity.border} rounded-sm p-3`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setEditingNpcIndex(null)} className="text-gray-600 hover:text-gray-900">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900">
                {getRelationshipIcon(npc.relationshipType)} Editando NPC #{index + 1}
              </h3>
              <p className="font-mono text-[10px] text-gray-600">{npc.name || 'Novo personagem'} {npc.nickname ? `"${npc.nickname}"` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-mono text-[9px] text-gray-500">Completude</div>
              <div className="font-mono text-sm font-bold text-purple-600">{completeness}%</div>
            </div>
            <button onClick={() => removeNpc(index)} className="px-2 py-1 bg-red-500 text-white font-mono text-[10px] rounded hover:bg-red-600">
              🗑️ Remover
            </button>
          </div>
        </div>

        {/* DIAGNÓSTICO DO RELACIONAMENTO */}
        <div className={`border-2 rounded-sm p-4 ${
          diagnosis.color === 'red' ? 'border-red-300 bg-red-50' :
          diagnosis.color === 'orange' ? 'border-orange-300 bg-orange-50' :
          diagnosis.color === 'yellow' ? 'border-yellow-300 bg-yellow-50' :
          'border-emerald-300 bg-emerald-50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-bold flex items-center gap-2">
              🩺 Diagnóstico do Relacionamento
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                diagnosis.color === 'red' ? 'bg-red-200 text-red-800' :
                diagnosis.color === 'orange' ? 'bg-orange-200 text-orange-800' :
                diagnosis.color === 'yellow' ? 'bg-yellow-200 text-yellow-800' :
                'bg-emerald-200 text-emerald-800'
              }`}>{diagnosis.label}</span>
            </h4>
            <div className="font-mono text-2xl font-bold">{diagnosis.health}/100</div>
          </div>

          <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div className={`h-full rounded-full transition-all ${
              diagnosis.color === 'red' ? 'bg-red-500' :
              diagnosis.color === 'orange' ? 'bg-orange-500' :
              diagnosis.color === 'yellow' ? 'bg-yellow-500' :
              'bg-emerald-500'
            }`} style={{ width: `${diagnosis.health}%` }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {diagnosis.issues.length > 0 && (
              <div className="bg-white/50 rounded p-2">
                <div className="font-mono text-[10px] font-bold text-red-700 mb-1">⚠️ Pontos de Atenção:</div>
                <ul className="space-y-0.5">
                  {diagnosis.issues.map((issue, i) => (
                    <li key={i} className="font-mono text-[9px] text-red-600">• {issue}</li>
                  ))}
                </ul>
              </div>
            )}
            {diagnosis.strengths.length > 0 && (
              <div className="bg-white/50 rounded p-2">
                <div className="font-mono text-[10px] font-bold text-emerald-700 mb-1">✓ Pontos Fortes:</div>
                <ul className="space-y-0.5">
                  {diagnosis.strengths.map((strength, i) => (
                    <li key={i} className="font-mono text-[9px] text-emerald-600">• {strength}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-3">👤 Informações Básicas</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nome Completo *</label>
                <input type="text" value={npc.name || ''} onChange={(e) => updateNpc(index, 'name', e.target.value)} placeholder="Ex: Maria Silva Santos" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Apelido/Como é Chamado</label>
                <input type="text" value={npc.nickname || ''} onChange={(e) => updateNpc(index, 'nickname', e.target.value)} placeholder="Ex: Má, Tia Mari, Dona Maria" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status na Vida do Personagem</label>
                <select value={npc.status || 'active'} onChange={(e) => updateNpc(index, 'status', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="active">✓ Ativo — Presente e em contato</option>
                  <option value="distant">📍 Distante — Pouco contato atualmente</option>
                  <option value="estranged">💔 Afastado — Rompimento/Sem contato</option>
                  <option value="reconnecting">🔄 Reconectando — Retomando contato</option>
                  <option value="complicated">🌀 Complicado — Situação instável</option>
                  <option value="deceased">🕊️ Falecido — Mas ainda importante</option>
                  <option value="missing">❓ Desaparecido — Paradeiro desconhecido</option>
                  <option value="imaginary">🌈 Imaginário — Não é real</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade</label>
                <input type="text" value={npc.age || ''} onChange={(e) => updateNpc(index, 'age', e.target.value)} placeholder="Ex: 45, ~30, 60s" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Faixa Etária</label>
                <select value={npc.ageCategory || ''} onChange={(e) => updateNpc(index, 'ageCategory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="child">Criança (0-12)</option>
                  <option value="teen">Adolescente (13-17)</option>
                  <option value="young-adult">Jovem Adulto (18-25)</option>
                  <option value="adult">Adulto (26-40)</option>
                  <option value="middle-aged">Meia-idade (41-60)</option>
                  <option value="senior">Idoso (61-75)</option>
                  <option value="elderly">Idoso Avançado (76+)</option>
                  <option value="ageless">Sem idade definida</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Gênero</label>
                <select value={npc.gender || ''} onChange={(e) => updateNpc(index, 'gender', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="non-binary">Não-binário</option>
                  <option value="genderfluid">Gênero fluido</option>
                  <option value="agender">Agênero</option>
                  <option value="other">Outro</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Pronomes</label>
                <select value={npc.pronouns || ''} onChange={(e) => updateNpc(index, 'pronouns', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="he-him">Ele/Dele</option>
                  <option value="she-her">Ela/Dela</option>
                  <option value="they-them">Elu/Delu</option>
                  <option value="any">Qualquer um</option>
                  <option value="other">Outros</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Ocupação</label>
                <input type="text" value={npc.occupation || ''} onChange={(e) => updateNpc(index, 'occupation', e.target.value)} placeholder="Ex: Professor aposentado, médica, estudante..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Classe Social</label>
                <select value={npc.socialClass || ''} onChange={(e) => updateNpc(index, 'socialClass', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="poverty">Pobreza</option>
                  <option value="working-class">Classe trabalhadora</option>
                  <option value="lower-middle">Classe média baixa</option>
                  <option value="middle">Classe média</option>
                  <option value="upper-middle">Classe média alta</option>
                  <option value="wealthy">Rico</option>
                  <option value="elite">Elite/Ultra-rico</option>
                  <option value="variable">Variável/Instável</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* APARÊNCIA E PERSONALIDADE */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-3">🎭 Aparência & Personalidade</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Descrição Física</label>
              <textarea value={npc.physicalDescription || ''} onChange={(e) => updateNpc(index, 'physicalDescription', e.target.value)} placeholder="Altura, corpo, cabelo, olhos, características marcantes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Características Distintivas</label>
                <input type="text" value={npc.distinctiveFeatures || ''} onChange={(e) => updateNpc(index, 'distinctiveFeatures', e.target.value)} placeholder="Cicatriz, tatuagem, usa óculos, manca..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo Visual</label>
                <input type="text" value={npc.styleDescription || ''} onChange={(e) => updateNpc(index, 'styleDescription', e.target.value)} placeholder="Sempre de terno, estilo hippie, casual..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo de Personalidade (MBTI)</label>
                <select value={npc.personalityType || ''} onChange={(e) => updateNpc(index, 'personalityType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <optgroup label="Analistas">
                    <option value="INTJ">INTJ — Arquiteto</option>
                    <option value="INTP">INTP — Lógico</option>
                    <option value="ENTJ">ENTJ — Comandante</option>
                    <option value="ENTP">ENTP — Debatedor</option>
                  </optgroup>
                  <optgroup label="Diplomatas">
                    <option value="INFJ">INFJ — Advogado</option>
                    <option value="INFP">INFP — Mediador</option>
                    <option value="ENFJ">ENFJ — Protagonista</option>
                    <option value="ENFP">ENFP — Ativista</option>
                  </optgroup>
                  <optgroup label="Sentinelas">
                    <option value="ISTJ">ISTJ — Logístico</option>
                    <option value="ISFJ">ISFJ — Defensor</option>
                    <option value="ESTJ">ESTJ — Executivo</option>
                    <option value="ESFJ">ESFJ — Cônsul</option>
                  </optgroup>
                  <optgroup label="Exploradores">
                    <option value="ISTP">ISTP — Virtuoso</option>
                    <option value="ISFP">ISFP — Aventureiro</option>
                    <option value="ESTP">ESTP — Empresário</option>
                    <option value="ESFP">ESFP — Animador</option>
                  </optgroup>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Temperamento</label>
                <select value={npc.temperament || ''} onChange={(e) => updateNpc(index, 'temperament', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="sanguine">Sanguíneo — Otimista, social, impulsivo</option>
                  <option value="choleric">Colérico — Ambicioso, líder, irritável</option>
                  <option value="melancholic">Melancólico — Analítico, detalhista, perfeccionista</option>
                  <option value="phlegmatic">Fleumático — Calmo, pacífico, passivo</option>
                  <option value="mixed">Misto — Combinação de temperamentos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Personalidade em Poucas Palavras</label>
              <input type="text" value={npc.personalityBrief || ''} onChange={(e) => updateNpc(index, 'personalityBrief', e.target.value)} placeholder="Ex: Rigoroso mas carinhoso, otimista demais, sarcástico e leal..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Frase Característica / Bordão</label>
                <input type="text" value={npc.catchphrase || ''} onChange={(e) => updateNpc(index, 'catchphrase', e.target.value)} placeholder="Ex: 'Na minha época...', 'Relaxa que dá certo'" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo de Fala</label>
                <select value={npc.speakingStyle || ''} onChange={(e) => updateNpc(index, 'speakingStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="formal">Formal — Linguagem culta e educada</option>
                  <option value="casual">Casual — Relaxado e informal</option>
                  <option value="slang">Gírias — Usa muito vocabulário informal</option>
                  <option value="technical">Técnico — Usa jargão profissional</option>
                  <option value="poetic">Poético — Fala de forma elaborada</option>
                  <option value="direct">Direto — Poucas palavras, objetivo</option>
                  <option value="verbose">Prolixo — Fala demais</option>
                  <option value="quiet">Quieto — Fala pouco</option>
                  <option value="sarcastic">Sarcástico — Ironia constante</option>
                  <option value="warm">Acolhedor — Tom carinhoso</option>
                  <option value="cold">Frio — Distante e impessoal</option>
                  <option value="nervous">Nervoso — Gagueja, tropeça nas palavras</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RELATIONSHIP TYPE */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">💜 Tipo de Relacionamento</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Categoria Principal *</label>
                <select value={npc.relationshipType || ''} onChange={(e) => updateNpc(index, 'relationshipType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <optgroup label="👨‍👩‍👧 Família">
                    <option value="family-parent">Father/Mother</option>
                    <option value="family-sibling">Irmão/Irmã</option>
                    <option value="family-child">Filho/Filha</option>
                    <option value="family-grandparent">Avô/Avó</option>
                    <option value="family-extended">Família Extensa</option>
                    <option value="family-step">Padrasto/Madrasta/Meio-irmão</option>
                    <option value="family-in-law">Sogro/Cunhado/etc</option>
                  </optgroup>
                  <optgroup label="💕 Romântico">
                    <option value="romantic-partner">Parceiro(a) Atual</option>
                    <option value="romantic-spouse">Cônjuge</option>
                    <option value="romantic-ex">Ex-parceiro(a)</option>
                    <option value="romantic-crush">Interesse Romântico</option>
                    <option value="romantic-complicated">Relacionamento Complicado</option>
                  </optgroup>
                  <optgroup label="🤝 Amizade">
                    <option value="friend-best">Melhor Amigo(a)</option>
                    <option value="friend-close">Amigo(a) Próximo(a)</option>
                    <option value="friend-casual">Amigo(a) Casual</option>
                    <option value="friend-childhood">Amigo(a) de Infância</option>
                    <option value="friend-online">Amigo(a) Virtual</option>
                  </optgroup>
                  <optgroup label="💼 Profissional">
                    <option value="professional-mentor">Mentor(a)</option>
                    <option value="professional-mentee">Mentorado(a)</option>
                    <option value="professional-colleague">Colega de Trabalho</option>
                    <option value="professional-boss">Chefe</option>
                    <option value="professional-employee">Funcionário(a)</option>
                    <option value="professional-client">Cliente</option>
                    <option value="professional-partner">Sócio(a)</option>
                  </optgroup>
                  <optgroup label="⚔️ Conflito">
                    <option value="rival">Rival</option>
                    <option value="enemy">Inimigo(a)</option>
                    <option value="bully">Bully/Agressor(a)</option>
                    <option value="nemesis">Nêmesis</option>
                  </optgroup>
                  <optgroup label="👤 Outros">
                    <option value="acquaintance">Conhecido(a)</option>
                    <option value="neighbor">Vizinho(a)</option>
                    <option value="therapist">Terapeuta</option>
                    <option value="doctor">Médico(a)</option>
                    <option value="teacher">Professor(a)</option>
                    <option value="religious">Líder Religioso</option>
                    <option value="deceased">Pessoa Falecida</option>
                    <option value="imaginary">Imaginário</option>
                    <option value="other">Outro</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Especificação</label>
                <input type="text" value={npc.relationshipSubtype || ''} onChange={(e) => updateNpc(index, 'relationshipSubtype', e.target.value)} placeholder="Ex: Mãe biológica, ex-namorado do colégio, chefe direto..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Papel na Vida do Personagem</label>
                <select value={npc.roleInLife || ''} onChange={(e) => updateNpc(index, 'roleInLife', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="anchor">⚓ Âncora — Estabiliza e dá segurança</option>
                  <option value="mirror">🪞 Espelho — Reflete quem realmente é</option>
                  <option value="catalyst">⚡ Catalisador — Provoca mudanças</option>
                  <option value="protector">🛡️ Protetor — Cuida e defende</option>
                  <option value="dependent">🤲 Dependente — Precisa de cuidados</option>
                  <option value="mentor">🎓 Mentor — Ensina e guia</option>
                  <option value="challenger">🏋️ Desafiador — Questiona e empurra</option>
                  <option value="confidant">🤫 Confidente — Guarda segredos</option>
                  <option value="comic-relief">😂 Alívio Cômico — Traz leveza</option>
                  <option value="shadow">👥 Sombra — O que teme ser</option>
                  <option value="inspiration">✨ Inspiração — Modelo a seguir</option>
                  <option value="burden">⛓️ Fardo — Peso emocional</option>
                  <option value="mystery">🔮 Mistério — Pessoa enigmática</option>
                  <option value="memory">💭 Memória — Ligação ao passado</option>
                  <option value="hope">🌟 Esperança — Representa o futuro</option>
                  <option value="rival">🎯 Rival — Competidor/Oponente</option>
                  <option value="temptation">🍎 Tentação — Desvia do caminho</option>
                  <option value="conscience">😇 Consciência — Voz da razão</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Importância Narrativa</label>
                <select value={npc.narrativeImportance || ''} onChange={(e) => updateNpc(index, 'narrativeImportance', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="central">⭐⭐⭐ Central — Essencial para a história</option>
                  <option value="major">⭐⭐ Importante — Aparece frequentemente</option>
                  <option value="supporting">⭐ Suporte — Aparições significativas</option>
                  <option value="minor">Menor — Mencionado ocasionalmente</option>
                  <option value="background">Background — Contexto apenas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PROXIMITY & DYNAMICS */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-3">💗 Proximidade & Dinâmica</h4>

          <div className="space-y-4">
            {/* Slider principal de proximidade */}
            <div className="bg-white rounded-sm p-3 border border-pink-200">
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-[10px] text-gray-600">Nível de Proximidade</label>
                <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${proximity.light} ${proximity.text}`}>
                  {npc.proximityLevel || 5}/10 — {proximity.label}
                </span>
              </div>
              <input type="range" min="1" max="10" value={npc.proximityLevel || 5} onChange={(e) => updateNpc(index, 'proximityLevel', parseInt(e.target.value))} className="w-full h-3 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between font-mono text-[9px] text-gray-400 mt-1">
                <span>1 — Distante</span>
                <span>5 — Próximo</span>
                <span>10 — Alma Gêmea</span>
              </div>
            </div>

            {/* Grid de sliders secundários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-sm p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-mono text-[10px] text-gray-600">🤝 Confiança</label>
                  <span className={`font-mono text-xs font-bold ${(npc.trustLevel || 5) >= 7 ? 'text-emerald-600' : (npc.trustLevel || 5) <= 3 ? 'text-red-600' : 'text-gray-600'}`}>{npc.trustLevel || 5}/10</span>
                </div>
                <input type="range" min="1" max="10" value={npc.trustLevel || 5} onChange={(e) => updateNpc(index, 'trustLevel', parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between font-mono text-[8px] text-gray-400"><span>Desconfia</span><span>Confia cegamente</span></div>
              </div>
              <div className="bg-white rounded-sm p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-mono text-[10px] text-gray-600">⚡ Conflito</label>
                  <span className={`font-mono text-xs font-bold ${(npc.conflictLevel || 2) >= 7 ? 'text-red-600' : (npc.conflictLevel || 2) <= 3 ? 'text-emerald-600' : 'text-yellow-600'}`}>{npc.conflictLevel || 2}/10</span>
                </div>
                <input type="range" min="1" max="10" value={npc.conflictLevel || 2} onChange={(e) => updateNpc(index, 'conflictLevel', parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between font-mono text-[8px] text-gray-400"><span>Harmonia</span><span>Conflito constante</span></div>
              </div>
              <div className="bg-white rounded-sm p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-mono text-[10px] text-gray-600">🔗 Dependência</label>
                  <span className={`font-mono text-xs font-bold ${(npc.dependencyLevel || 3) >= 8 ? 'text-orange-600' : 'text-gray-600'}`}>{npc.dependencyLevel || 3}/10</span>
                </div>
                <input type="range" min="1" max="10" value={npc.dependencyLevel || 3} onChange={(e) => updateNpc(index, 'dependencyLevel', parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between font-mono text-[8px] text-gray-400"><span>Independente</span><span>Codependente</span></div>
              </div>
              <div className="bg-white rounded-sm p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-mono text-[10px] text-gray-600">👑 Influência sobre o Personagem</label>
                  <span className="font-mono text-xs font-bold text-gray-600">{npc.influenceLevel || 5}/10</span>
                </div>
                <input type="range" min="1" max="10" value={npc.influenceLevel || 5} onChange={(e) => updateNpc(index, 'influenceLevel', parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between font-mono text-[8px] text-gray-400"><span>Nenhuma</span><span>Enorme</span></div>
              </div>
            </div>

            {/* Dropdowns de dinâmica */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Vínculo Emocional Principal</label>
                <select value={npc.emotionalBond || ''} onChange={(e) => updateNpc(index, 'emotionalBond', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <optgroup label="Positivos">
                    <option value="love-unconditional">❤️ Amor Incondicional</option>
                    <option value="love-romantic">💕 Amor Romântico</option>
                    <option value="deep-friendship">🤝 Amizade Profunda</option>
                    <option value="respect">🙏 Respeito/Admiração</option>
                    <option value="gratitude">🙏 Gratidão</option>
                    <option value="loyalty">🛡️ Lealdade</option>
                    <option value="protectiveness">🛡️ Proteção</option>
                  </optgroup>
                  <optgroup label="Complexos">
                    <option value="love-complicated">💔 Amor Complicado</option>
                    <option value="ambivalent">🤷 Ambivalente</option>
                    <option value="nostalgia">🌅 Nostalgia</option>
                    <option value="obligation">⛓️ Obrigação</option>
                    <option value="guilt">😔 Culpa</option>
                    <option value="pity">😢 Pena</option>
                  </optgroup>
                  <optgroup label="Negativos">
                    <option value="fear">😰 Fear</option>
                    <option value="resentment">😤 Ressentimento</option>
                    <option value="jealousy">😒 Inveja/Ciúme</option>
                    <option value="hatred">😡 Ódio</option>
                    <option value="contempt">🙄 Desprezo</option>
                  </optgroup>
                  <option value="indifference">😐 Indiferença</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Dinâmica de Poder</label>
                <select value={npc.powerDynamic || ''} onChange={(e) => updateNpc(index, 'powerDynamic', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="balanced">⚖️ Equilibrada — Iguais</option>
                  <option value="dominant-healthy">👆 Dominante (saudável) — Lidera naturalmente</option>
                  <option value="submissive-healthy">👇 Submisso (saudável) — Segue naturalmente</option>
                  <option value="dominant-unhealthy">⚠️ Dominante (problemático) — Controla</option>
                  <option value="submissive-unhealthy">⚠️ Submisso (problemático) — É controlado</option>
                  <option value="fluctuating">🔄 Flutuante — Muda conforme situação</option>
                  <option value="competitive">⚔️ Competitiva — Disputam poder</option>
                  <option value="complementary">🧩 Complementar — Cada um tem seu papel</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Respeito a Limites</label>
                <select value={npc.boundaryRespect || ''} onChange={(e) => updateNpc(index, 'boundaryRespect', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="always">✓ Sempre — Respeita completamente</option>
                  <option value="mostly">Geralmente — Respeita na maioria das vezes</option>
                  <option value="sometimes">Às vezes — Cruza limites ocasionalmente</option>
                  <option value="rarely">Raramente — Frequentemente ultrapassa</option>
                  <option value="never">✗ Nunca — Ignora completamente</option>
                  <option value="improving">📈 Melhorando — Está aprendendo</option>
                  <option value="unclear">❓ Incerto — Limites não claros</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* COMUNICAÇÃO */}
        <div className="border-2 border-cyan-200 rounded-sm p-4 bg-cyan-50/30">
          <h4 className="font-mono text-sm font-bold text-cyan-800 mb-3">💬 Comunicação</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Frequência de Contato</label>
                <select value={npc.communicationFrequency || ''} onChange={(e) => updateNpc(index, 'communicationFrequency', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="constant">🔴 Constante — Várias vezes ao dia</option>
                  <option value="daily">Diária — Todo dia</option>
                  <option value="several-week">Várias vezes por semana</option>
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quinzenal</option>
                  <option value="monthly">Mensal</option>
                  <option value="occasionally">Ocasional — A cada poucos meses</option>
                  <option value="rarely">Raro — Uma ou duas vezes por ano</option>
                  <option value="almost-never">Quase nunca — Anos sem contato</option>
                  <option value="no-contact">Sem contato</option>
                  <option value="one-sided">Unilateral — Só um lado tenta</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-2 block">Meios de Comunicação (até 4)</label>
                <div className="flex flex-wrap gap-1">
                  {['Pessoalmente','Telefone','WhatsApp','SMS','E-mail','Redes Sociais','Videochamada','Cartas','Através de outros','Telepatia/Espiritual'].map(method => (
                    <button key={method} onClick={() => toggleNpcArrayItem(index, 'communicationMethods', method, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.communicationMethods || []).includes(method) ? 'bg-cyan-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{method}</button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Assuntos que Costumam Conversar (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Dia a dia','Trabalho','Família','Relacionamentos','Fofocas','Memórias','Planos futuros','Problemas pessoais','Política','Filosofia','Hobbies','Saúde','Dinheiro','Filmes/Séries','Esportes','Comida','Viagens','Espiritualidade','Piadas','Nada profundo'].map(topic => (
                  <button key={topic} onClick={() => toggleNpcArrayItem(index, 'conversationTopics', topic, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.conversationTopics || []).includes(topic) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{topic}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Assuntos que Evitam (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Passado','Dinheiro','Relacionamentos','Família','Política','Religião','Saúde','Trabalho','Certos pessoas','Erros antigos','Sonhos/Planos','Sentimentos','Morte','Sexo','Vícios','Nenhum assunto é tabu'].map(topic => (
                  <button key={topic} onClick={() => toggleNpcArrayItem(index, 'avoidedTopics', topic, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.avoidedTopics || []).includes(topic) ? 'bg-red-400 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{topic}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HISTÓRIA */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">📜 História do Relacionamento</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Como se Conheceram</label>
                <select value={npc.howTheyMet || ''} onChange={(e) => updateNpc(index, 'howTheyMet', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="birth">👶 Nascimento — Família</option>
                  <option value="childhood">🧒 Infância</option>
                  <option value="school">🏫 Escola</option>
                  <option value="university">🎓 Faculdade</option>
                  <option value="work">💼 Trabalho</option>
                  <option value="mutual-friends">👥 Amigos em comum</option>
                  <option value="event">🎉 Evento/Festa</option>
                  <option value="online">💻 Online/App</option>
                  <option value="dating-app">❤️ App de namoro</option>
                  <option value="hobby">🎨 Hobby/Atividade</option>
                  <option value="neighborhood">🏠 Vizinhança</option>
                  <option value="accident">🎲 Por acaso</option>
                  <option value="travel">✈️ Viagem</option>
                  <option value="crisis">🆘 Durante uma crise</option>
                  <option value="professional">🏥 Serviço profissional</option>
                  <option value="introduced">🤝 Foram apresentados</option>
                  <option value="dont-remember">❓ Não lembra</option>
                  <option value="complicated">🌀 Complicado</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Contexto do Primeiro Encontro</label>
                <input type="text" value={npc.meetingContext || ''} onChange={(e) => updateNpc(index, 'meetingContext', e.target.value)} placeholder="Ex: Na fila do cinema, primeiro dia de aula..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Quando se Conheceram</label>
                <input type="text" value={npc.meetingYear || ''} onChange={(e) => updateNpc(index, 'meetingYear', e.target.value)} placeholder="Ex: 2015, infância, há 10 anos..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Duração do Relacionamento</label>
              <select value={npc.relationshipDuration || ''} onChange={(e) => updateNpc(index, 'relationshipDuration', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="new">Novo — Menos de 6 meses</option>
                <option value="recent">Recente — 6 meses a 2 anos</option>
                <option value="established">Estabelecido — 2-5 anos</option>
                <option value="long-term">Longo prazo — 5-10 anos</option>
                <option value="lifelong">Vida toda — 10+ anos</option>
                <option value="since-birth">Desde o nascimento</option>
                <option value="on-off">Vai e vem — Intermitente</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">História Compartilhada</label>
              <textarea value={npc.sharedHistory || ''} onChange={(e) => updateNpc(index, 'sharedHistory', e.target.value)} placeholder="Eventos marcantes, experiências compartilhadas, momentos decisivos..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Pontos de Virada no Relacionamento</label>
              <textarea value={npc.turningPoints || ''} onChange={(e) => updateNpc(index, 'turningPoints', e.target.value)} placeholder="Momentos que mudaram a relação (para melhor ou pior)..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Segredos que Este NPC Sabe</label>
                <textarea value={npc.secretsKnown || ''} onChange={(e) => updateNpc(index, 'secretsKnown', e.target.value)} placeholder="O que este NPC sabe sobre o personagem..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Segredos que o Personagem Esconde deste NPC</label>
                <textarea value={npc.secretsHidden || ''} onChange={(e) => updateNpc(index, 'secretsHidden', e.target.value)} placeholder="O que o personagem esconde deste NPC..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* DINÂMICA ATUAL */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-3">🔄 Dinâmica Atual</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Como está a relação atualmente?</label>
              <textarea value={npc.currentDynamic || ''} onChange={(e) => updateNpc(index, 'currentDynamic', e.target.value)} placeholder="Descreva o estado atual: estão bem, afastados, em conflito, reconciliando..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Mudanças Recentes</label>
                <textarea value={npc.recentChanges || ''} onChange={(e) => updateNpc(index, 'recentChanges', e.target.value)} placeholder="Algo mudou recentemente na relação?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Problemas em Andamento</label>
                <textarea value={npc.ongoingIssues || ''} onChange={(e) => updateNpc(index, 'ongoingIssues', e.target.value)} placeholder="Questões não resolvidas, tensões persistentes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Traços Positivos deste NPC (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Leal','Carinhoso','Engraçado','Inteligente','Honesto','Generoso','Protetor','Paciente','Compreensivo','Inspirador','Confiável','Aventureiro','Calmo','Sábio','Empático','Otimista','Corajoso','Criativo','Dedicado','Respeitoso','Amoroso','Prestativo','Motivador','Divertido','Sincero','Resiliente','Humilde','Gentil','Justo','Responsável'].map(trait => (
                  <button key={trait} onClick={() => toggleNpcArrayItem(index, 'positiveTraits', trait, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.positiveTraits || []).includes(trait) ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{trait}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Traços Negativos deste NPC (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Crítico','Controlador','Distante','Ciumento','Teimoso','Impaciente','Irresponsável','Desonesto','Egoísta','Manipulador','Ausente','Temperamental','Pessimista','Negligente','Possessivo','Inseguro','Dramático','Mesquinho','Arrogante','Passivo-agressivo','Imprevisível','Dependente','Frio','Competitivo','Julgador','Rancoroso','Preguiçoso','Desrespeitoso','Vingativo','Vitimista'].map(trait => (
                  <button key={trait} onClick={() => toggleNpcArrayItem(index, 'negativeTraits', trait, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.negativeTraits || []).includes(trait) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{trait}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Interesses Compartilhados (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Filmes/Séries','Música','Esportes','Jogos','Culinária','Viagens','Livros','Arte','Natureza','Fitness','Tecnologia','Política','Fofoca','Trabalho','Família','Memórias','Filosofia','Animais','Festas','Compras','Religião/Fé','Artesanato','Causas sociais','Humor','Moda','Fotografia','Dança','Teatro','Ciência','Nenhum em comum'].map(interest => (
                  <button key={interest} onClick={() => toggleNpcArrayItem(index, 'sharedInterests', interest, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.sharedInterests || []).includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{interest}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Fontes de Conflito (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Dinheiro','Tempo/Atenção','Valores diferentes','Comunicação','Ciúmes','Expectativas','Passado','Família','Trabalho','Distância','Prioridades','Personalidades','Hábitos','Decisões','Falta de apoio','Traição','Mentiras','Política','Religião','Estilo de vida','Mudanças','Terceiros','Saúde','Dependência','Filhos','Compromisso','Intimidade','Respeito','Controle','Nenhum'].map(conflict => (
                  <button key={conflict} onClick={() => toggleNpcArrayItem(index, 'conflictSources', conflict, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.conflictSources || []).includes(conflict) ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{conflict}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Tipos de Apoio que Este NPC Oferece (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Emocional','Financeiro','Prático/Logístico','Conselhos','Motivação','Companhia','Networking','Profissional','Cuidado físico','Moradia','Diversão','Proteção','Validação','Escuta','Crítica construtiva','Nenhum','É o contrário (personagem apoia)'].map(support => (
                  <button key={support} onClick={() => toggleNpcArrayItem(index, 'supportTypes', support, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(npc.supportTypes || []).includes(support) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{support}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FUTURO */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🔮 Futuro & Potencial</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Potencial Futuro</label>
                <select value={npc.futurePotential || ''} onChange={(e) => updateNpc(index, 'futurePotential', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="strengthen">📈 Fortalecer — Vai se aproximar mais</option>
                  <option value="stable">➡️ Estável — Continuar como está</option>
                  <option value="uncertain">❓ Incerto — Pode ir para qualquer lado</option>
                  <option value="fade">📉 Enfraquecer — Vai se distanciar</option>
                  <option value="reconcile">🤝 Reconciliar — Resolver conflitos</option>
                  <option value="break">💔 Romper — Caminho para término</option>
                  <option value="transform">🔄 Transformar — Mudar de natureza</option>
                  <option value="reconnect">🔗 Reconectar — Voltar após afastamento</option>
                  <option value="deepen">💎 Aprofundar — Novo nível de intimidade</option>
                  <option value="complicated">🌀 Complicado — Muitas variáveis</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Papel na História (Meta)</label>
                <select value={npc.storyRole || ''} onChange={(e) => updateNpc(index, 'storyRole', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="love-interest">💕 Love Interest</option>
                  <option value="best-friend">🤝 Best Friend/Sidekick</option>
                  <option value="mentor">🎓 Mentor/Guide</option>
                  <option value="antagonist">👿 Antagonista</option>
                  <option value="comic-relief">😂 Alívio Cômico</option>
                  <option value="tragic">😢 Elemento Trágico</option>
                  <option value="mystery">🔮 Elemento Misterioso</option>
                  <option value="catalyst">⚡ Catalisador de Mudança</option>
                  <option value="mirror">🪞 Espelho do Protagonista</option>
                  <option value="grounding">⚓ Âncora/Grounding</option>
                  <option value="wildcard">🃏 Wildcard/Imprevisível</option>
                  <option value="background">📋 Background/Contexto</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Assuntos Não Resolvidos</label>
              <textarea value={npc.unresolvedMatters || ''} onChange={(e) => updateNpc(index, 'unresolvedMatters', e.target.value)} placeholder="Questões pendentes, conversas adiadas, verdades não ditas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Esperanças para Este Relacionamento</label>
                <textarea value={npc.hopes || ''} onChange={(e) => updateNpc(index, 'hopes', e.target.value)} placeholder="O que o personagem espera/deseja desta relação..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Fears sobre Este Relacionamento</label>
                <textarea value={npc.fears || ''} onChange={(e) => updateNpc(index, 'fears', e.target.value)} placeholder="O que o personagem teme que aconteça..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Notas Adicionais</label>
              <textarea value={npc.notes || ''} onChange={(e) => updateNpc(index, 'notes', e.target.value)} placeholder="Qualquer informação adicional sobre este NPC..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>

        {/* Botão de voltar */}
        <div className="flex justify-center pt-4">
          <button onClick={() => setEditingNpcIndex(null)} className="px-6 py-2 bg-rose-600 text-white font-mono text-xs rounded hover:bg-rose-700 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            Concluir Edição
          </button>
        </div>
      </div>
    );
  };

  // ========== LISTA DE NPCs ==========
  const NpcList = () => {
    const npcs = data.npcs || [];
    const canAddMore = npcs.length < MAX_NPCS;

    // Calcular estatísticas gerais
    const stats = {
      total: npcs.length,
      avgHealth: npcs.length > 0 ? Math.round(npcs.reduce((sum, npc) => sum + calculateRelationshipHealth(npc), 0) / npcs.length) : 0,
      healthy: npcs.filter(npc => calculateRelationshipHealth(npc) >= 70).length,
      troubled: npcs.filter(npc => calculateRelationshipHealth(npc) < 50).length,
      byType: {
        family: npcs.filter(npc => (npc.relationshipType || '').startsWith('family-')).length,
        romantic: npcs.filter(npc => (npc.relationshipType || '').startsWith('romantic-')).length,
        friend: npcs.filter(npc => (npc.relationshipType || '').startsWith('friend-')).length,
        professional: npcs.filter(npc => (npc.relationshipType || '').startsWith('professional-')).length,
        conflict: npcs.filter(npc => ['rival', 'enemy', 'bully', 'nemesis'].includes(npc.relationshipType)).length,
        other: npcs.filter(npc => !['family-', 'romantic-', 'friend-', 'professional-'].some(t => (npc.relationshipType || '').startsWith(t)) && !['rival', 'enemy', 'bully', 'nemesis'].includes(npc.relationshipType)).length
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-rose-50 border border-rose-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-rose-900 mb-2">👥 PERSONAGENS IMPORTANTES (NPCs)</h3>
          <p className="font-mono text-xs text-rose-800 leading-relaxed">
            Adicione as pessoas mais importantes na vida do seu personagem.
            <span className="font-bold"> Ideal: {IDEAL_NPCS} NPCs</span> | Máximo: {MAX_NPCS} NPCs.
          </p>
        </div>

        {/* Dashboard de estatísticas */}
        {npcs.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-rose-50 border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-xs font-bold text-gray-700 mb-3">📊 Visão Geral dos Relacionamentos</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded p-3 border border-gray-200 text-center">
                <div className="font-mono text-2xl font-bold text-rose-600">{stats.total}</div>
                <div className="font-mono text-[9px] text-gray-500">NPCs Total</div>
              </div>
              <div className="bg-white rounded p-3 border border-gray-200 text-center">
                <div className={`font-mono text-2xl font-bold ${stats.avgHealth >= 70 ? 'text-emerald-600' : stats.avgHealth >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{stats.avgHealth}%</div>
                <div className="font-mono text-[9px] text-gray-500">Saúde Média</div>
              </div>
              <div className="bg-white rounded p-3 border border-gray-200 text-center">
                <div className="font-mono text-2xl font-bold text-emerald-600">{stats.healthy}</div>
                <div className="font-mono text-[9px] text-gray-500">Saudáveis</div>
              </div>
              <div className="bg-white rounded p-3 border border-gray-200 text-center">
                <div className="font-mono text-2xl font-bold text-red-600">{stats.troubled}</div>
                <div className="font-mono text-[9px] text-gray-500">Troubled</div>
              </div>
            </div>

            {/* Breakdown por tipo */}
            <div className="flex flex-wrap gap-2 justify-center">
              {stats.byType.family > 0 && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-mono text-[9px]">👨‍👩‍👧 Família: {stats.byType.family}</span>}
              {stats.byType.romantic > 0 && <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full font-mono text-[9px]">💕 Romântico: {stats.byType.romantic}</span>}
              {stats.byType.friend > 0 && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-mono text-[9px]">🤝 Amizade: {stats.byType.friend}</span>}
              {stats.byType.professional > 0 && <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-mono text-[9px]">💼 Profissional: {stats.byType.professional}</span>}
              {stats.byType.conflict > 0 && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-mono text-[9px]">⚔️ Conflito: {stats.byType.conflict}</span>}
            </div>
          </div>
        )}

        {/* Indicador de progresso */}
        <div className="bg-white border border-gray-200 rounded-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-gray-600">NPCs Cadastrados</span>
            <span className={`font-mono text-sm font-bold ${npcs.length >= IDEAL_NPCS ? 'text-emerald-600' : 'text-amber-600'}`}>
              {npcs.length}/{MAX_NPCS}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${npcs.length >= IDEAL_NPCS ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: `${(npcs.length / MAX_NPCS) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-gray-400 mt-1">
            <span>0</span>
            <span className="text-amber-600">Ideal: {IDEAL_NPCS}</span>
            <span>Máx: {MAX_NPCS}</span>
          </div>
        </div>

        {/* Lista de NPCs */}
        {npcs.length > 0 ? (
          <div className="space-y-3">
            {npcs.map((npc, index) => {
              const proximity = getProximityColor(npc.proximityLevel || 5);
              const icon = getRelationshipIcon(npc.relationshipType);
              const diagnosis = getRelationshipDiagnosis(npc);
              const completeness = calculateNpcCompleteness(npc);

              return (
                <div
                  key={npc.id || index}
                  className={`border-2 rounded-sm p-4 transition-all hover:shadow-md cursor-pointer ${proximity.light} ${proximity.border}`}
                  onClick={() => setEditingNpcIndex(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-14 h-14 rounded-full ${proximity.bg} flex items-center justify-center text-white text-2xl flex-shrink-0 shadow`}>
                        {icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-mono text-sm font-bold text-gray-900">{npc.name || 'Sem nome'}</h4>
                          {npc.nickname && <span className="font-mono text-xs text-gray-500">"{npc.nickname}"</span>}
                        </div>
                        <p className="font-mono text-[10px] text-gray-600 mb-1">
                          {npc.relationshipType ? npc.relationshipType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace('Family ', '').replace('Romantic ', '').replace('Friend ', '').replace('Professional ', '') : 'Tipo não definido'}
                          {npc.age && ` • ${npc.age} anos`}
                          {npc.occupation && ` • ${npc.occupation}`}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${proximity.light} ${proximity.text}`}>
                            {proximity.label} ({npc.proximityLevel || 5}/10)
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                            diagnosis.color === 'red' ? 'bg-red-100 text-red-700' :
                            diagnosis.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                            diagnosis.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            🩺 {diagnosis.health}%
                          </span>
                          {npc.status && npc.status !== 'active' && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-mono text-[9px]">
                              {npc.status === 'deceased' ? '🕊️' : npc.status === 'estranged' ? '💔' : npc.status === 'distant' ? '📍' : '🌀'} {npc.status}
                            </span>
                          )}
                        </div>
                        {npc.personalityBrief && (
                          <p className="font-mono text-[9px] text-gray-500 mt-1 italic">"{npc.personalityBrief}"</p>
                        )}
                        {/* Alertas */}
                        {diagnosis.issues.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {diagnosis.issues.slice(0, 2).map((issue, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-mono text-[8px]">⚠️ {issue}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4 items-end">
                      <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); setEditingNpcIndex(index); }} className="px-3 py-1.5 bg-rose-100 text-rose-700 font-mono text-[10px] rounded hover:bg-rose-200">
                          ✏️ Editar
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); removeNpc(index); }} className="px-3 py-1.5 bg-red-100 text-red-700 font-mono text-[10px] rounded hover:bg-red-200">
                          🗑️
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[8px] text-gray-400">Completude</div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-0.5">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${completeness}%` }}></div>
                        </div>
                        <div className="font-mono text-[8px] text-gray-400">{completeness}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
            <div className="text-gray-400 mb-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p className="font-mono text-sm text-gray-500 mb-1">Nenhum NPC cadastrado</p>
            <p className="font-mono text-xs text-gray-400">Adicione as pessoas mais importantes na vida do seu personagem.</p>
          </div>
        )}

        {/* Botão de adicionar */}
        {canAddMore ? (
          <button onClick={addNpc} className="w-full py-4 border-2 border-dashed border-rose-400 rounded-sm text-rose-600 font-mono text-sm hover:bg-rose-50 hover:border-rose-500 transition-all flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Adicionar NPC ({npcs.length}/{MAX_NPCS})
          </button>
        ) : (
          <div className="w-full py-4 border-2 border-gray-300 rounded-sm text-gray-500 font-mono text-sm bg-gray-50 text-center">
            ✓ Limite máximo de NPCs atingido ({MAX_NPCS}/{MAX_NPCS})
          </div>
        )}

        {/* Mapa visual */}
        {npcs.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-rose-50 border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-xs font-bold text-gray-700 mb-3">🗺️ Mapa de Relacionamentos</h4>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-lg">
                  👤
                </div>
                <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 font-mono text-[9px] text-gray-600 whitespace-nowrap font-bold">PROTAGONISTA</span>
              </div>
              {npcs.map((npc, index) => {
                const proximity = getProximityColor(npc.proximityLevel || 5);
                const icon = getRelationshipIcon(npc.relationshipType);
                const diagnosis = getRelationshipDiagnosis(npc);
                return (
                  <div key={index} className="relative cursor-pointer" onClick={() => setEditingNpcIndex(index)}>
                    <div className={`w-14 h-14 rounded-full ${proximity.bg} flex items-center justify-center text-white text-xl border-2 border-white shadow ${diagnosis.color === 'red' ? 'ring-2 ring-red-400' : ''}`}>
                      {icon}
                    </div>
                    <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 font-mono text-[8px] text-gray-600 whitespace-nowrap max-w-16 truncate">
                      {npc.name || `NPC ${index + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span className="font-mono text-[8px] text-gray-500">Alma Gêmea</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-pink-500"></div><span className="font-mono text-[8px] text-gray-500">Muito Próximo</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="font-mono text-[8px] text-gray-500">Próximo</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="font-mono text-[8px] text-gray-500">Conhecido</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-400"></div><span className="font-mono text-[8px] text-gray-500">Distante</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full ring-2 ring-red-400"></div><span className="font-mono text-[8px] text-gray-500">Troubled</span></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const sections = {
    // ========== SUBTAB 0: KEY NPCs ==========
    0: editingNpcIndex !== null && data.npcs?.[editingNpcIndex] ? (
      <NpcForm npc={data.npcs[editingNpcIndex]} index={editingNpcIndex} />
    ) : (
      <NpcList />
    ),

    // ========== SUBTAB 1: SOCIAL PATTERNS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">🧩 PADRÕES SOCIAIS</h3>
          <p className="font-mono text-xs text-purple-800 leading-relaxed">Como o personagem se relaciona socialmente.</p>
        </div>

        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">⚡ Energia Social & Estilo</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-[10px] text-gray-600">Introversão ↔ Extroversão</label>
                <span className="font-mono text-xs font-bold text-purple-600">{data.patterns?.socialEnergy || 5}/10</span>
              </div>
              <input type="range" min="1" max="10" value={data.patterns?.socialEnergy || 5} onChange={(e) => update('patterns', 'socialEnergy', parseInt(e.target.value))} className="w-full" />
              <div className="flex justify-between font-mono text-[9px] text-gray-400">
                <span>Introvertido</span><span>Ambivertido</span><span>Extrovertido</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-[10px] text-gray-600">Facilidade em Confiar</label>
                <span className="font-mono text-xs font-bold text-purple-600">{data.patterns?.trustLevel || 5}/10</span>
              </div>
              <input type="range" min="1" max="10" value={data.patterns?.trustLevel || 5} onChange={(e) => update('patterns', 'trustLevel', parseInt(e.target.value))} className="w-full" />
              <div className="flex justify-between font-mono text-[9px] text-gray-400">
                <span>Muito desconfiado</span><span>Cauteloso</span><span>Confia facilmente</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo em Conflitos</label>
                <select value={data.patterns?.conflictStyle || ''} onChange={(e) => update('patterns', 'conflictStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="avoidant">Evitativo — Foge de conflitos</option>
                  <option value="accommodating">Acomodador — Cede para manter a paz</option>
                  <option value="compromising">Conciliador — Busca meio-termo</option>
                  <option value="collaborative">Colaborativo — Busca solução win-win</option>
                  <option value="competitive">Competitivo — Quer ganhar</option>
                  <option value="aggressive">Agressivo — Confronta diretamente</option>
                  <option value="passive-aggressive">Passivo-agressivo</option>
                  <option value="depends">Depende da situação</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo de Amizade</label>
                <select value={data.patterns?.friendshipStyle || ''} onChange={(e) => update('patterns', 'friendshipStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="few-deep">Poucos e profundos</option>
                  <option value="many-surface">Muitos e superficiais</option>
                  <option value="balanced">Equilibrado</option>
                  <option value="loner">Solitário</option>
                  <option value="social-butterfly">Borboleta social</option>
                  <option value="selective">Muito seletivo</option>
                  <option value="loyal">Leal — Mantém por décadas</option>
                  <option value="transient">Transitório</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Linguagem do Amor Principal</label>
                <select value={data.patterns?.loveLanguages || ''} onChange={(e) => update('patterns', 'loveLanguages', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="words">Palavras de Afirmação</option>
                  <option value="acts">Atos de Serviço</option>
                  <option value="gifts">Presentes</option>
                  <option value="time">Tempo de Qualidade</option>
                  <option value="touch">Toque Físico</option>
                  <option value="mixed">Misto</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo de Apego</label>
                <select value={data.patterns?.attachmentStyle || ''} onChange={(e) => update('patterns', 'attachmentStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="secure">Seguro — Confortável com intimidade</option>
                  <option value="anxious">Ansioso — Fear de abandono</option>
                  <option value="avoidant">Evitativo — Evita intimidade</option>
                  <option value="fearful">Desorganizado — Misto de ansioso e evitativo</option>
                  <option value="earned-secure">Seguro Conquistado — Superou padrões</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: CURRENT CIRCLE ==========
    2: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">🔵 CÍRCULO ATUAL</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">Descrição geral do círculo social (além dos NPCs detalhados).</p>
        </div>

        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">👥 Grupos Sociais</h4>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Melhores Amigos (descrição geral)</label>
              <textarea value={data.circle?.bestFriends || ''} onChange={(e) => update('circle', 'bestFriends', e.target.value)} placeholder="Além dos NPCs detalhados, quem são os melhores amigos?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Amigos Próximos</label>
              <textarea value={data.circle?.closeFriends || ''} onChange={(e) => update('circle', 'closeFriends', e.target.value)} placeholder="Amigos com quem tem boa relação..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Conhecidos/Colegas</label>
              <textarea value={data.circle?.acquaintances || ''} onChange={(e) => update('circle', 'acquaintances', e.target.value)} placeholder="Pessoas que conhece mas não são próximas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Rivais/Desafetos</label>
              <textarea value={data.circle?.rivals || ''} onChange={(e) => update('circle', 'rivals', e.target.value)} placeholder="Pessoas com quem tem conflito..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Mentores/Figuras de Referência</label>
              <textarea value={data.circle?.mentors || ''} onChange={(e) => update('circle', 'mentors', e.target.value)} placeholder="Pessoas que admira ou que servem de modelo..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 3: ROMANTIC HISTORY ==========
    3: (
      <div className="space-y-6">
        <div className="bg-pink-50 border border-pink-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-pink-900 mb-2">💕 HISTÓRICO ROMÂNTICO</h3>
          <p className="font-mono text-xs text-pink-800 leading-relaxed">Vida amorosa passada e presente.</p>
        </div>

        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-3">❤️ Vida Amorosa</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status Atual</label>
                <select value={data.romantic?.relationshipStatus || ''} onChange={(e) => update('romantic', 'relationshipStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="single">Solteiro(a)</option>
                  <option value="dating">Namorando</option>
                  <option value="engaged">Noivo(a)</option>
                  <option value="married">Casado(a)</option>
                  <option value="divorced">Divorciado(a)</option>
                  <option value="widowed">Viúvo(a)</option>
                  <option value="separated">Separado(a)</option>
                  <option value="complicated">Complicado</option>
                  <option value="open">Relacionamento aberto</option>
                  <option value="poly">Poliamoroso</option>
                  <option value="situationship">Situationship</option>
                  <option value="talking">Ficando/Conhecendo</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Experiência Romântica</label>
                <select value={data.romantic?.romanticExperience || ''} onChange={(e) => update('romantic', 'romanticExperience', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="none">Nenhuma experiência</option>
                  <option value="minimal">Mínima — 1-2 relacionamentos</option>
                  <option value="some">Alguma — Alguns relacionamentos</option>
                  <option value="moderate">Moderada — Vários relacionamentos</option>
                  <option value="extensive">Extensa — Muitos relacionamentos</option>
                  <option value="married-once">Casou uma vez</option>
                  <option value="married-multiple">Casou múltiplas vezes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relacionamentos Passados Significativos</label>
              <textarea value={data.romantic?.pastRelationships || ''} onChange={(e) => update('romantic', 'pastRelationships', e.target.value)} placeholder="Histórico de relacionamentos importantes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Padrões em Relacionamentos</label>
              <textarea value={data.romantic?.romanticPatterns || ''} onChange={(e) => update('romantic', 'romanticPatterns', e.target.value)} placeholder="Padrões repetitivos, tipo de pessoa que atrai/é atraído..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Deal Breakers</label>
              <textarea value={data.romantic?.dealBreakers || ''} onChange={(e) => update('romantic', 'dealBreakers', e.target.value)} placeholder="O que não tolera em um relacionamento..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 4: FAMILY TIES ==========
    4: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">👨‍👩‍👧 LAÇOS FAMILIARES</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">Relação com a família (descrição geral, além dos NPCs).</p>
        </div>

        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">👪 Família</h4>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">General Relationship with Parents</label>
              <textarea value={data.family?.relationshipWithParents || ''} onChange={(e) => update('family', 'relationshipWithParents', e.target.value)} placeholder="How is the relationship with father and mother..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relação com Irmãos</label>
              <textarea value={data.family?.relationshipWithSiblings || ''} onChange={(e) => update('family', 'relationshipWithSiblings', e.target.value)} placeholder="Relação com irmãos, se tiver..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Afastamentos/Rupturas</label>
              <textarea value={data.family?.estrangements || ''} onChange={(e) => update('family', 'estrangements', e.target.value)} placeholder="Membros com quem não fala, conflitos sérios..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// BEHAVIOR CONTENT - Complete Implementation
// ============================================================================

export default RelationshipsContent;
