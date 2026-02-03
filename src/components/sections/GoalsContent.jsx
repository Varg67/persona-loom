import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const GoalsContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('goals', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  const sections = {
    // ========== SUBTAB 0: SHORT-TERM GOALS ==========
    0: (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-green-900 mb-2">🎯 METAS DE CURTO PRAZO</h3>
          <p className="font-mono text-xs text-green-800 leading-relaxed">O que o personagem quer alcançar no futuro próximo.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📅 Esta Semana / Este Mês</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Immediate goals, urgent tasks.</p>
          <textarea value={data.shortTerm?.thisWeekMonth || ''} onChange={(e) => update('shortTerm', 'thisWeekMonth', e.target.value)} placeholder="Ex: Terminar projeto, conversar com alguém, resolver problema específico..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📆 Este Ano</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Metas para os próximos meses.</p>
          <textarea value={data.shortTerm?.thisYear || ''} onChange={(e) => update('shortTerm', 'thisYear', e.target.value)} placeholder="Ex: Mudar de emprego, terminar curso, viajar para lugar específico, economizar X..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/50">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-2">🚧 Obstáculos Imediatos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que está impedindo de alcançar essas metas?</p>
          <textarea value={data.shortTerm?.obstacles || ''} onChange={(e) => update('shortTerm', 'obstacles', e.target.value)} placeholder="Ex: Falta de dinheiro, pessoa específica, medo, falta de tempo, habilidade que falta..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: LONG-TERM ASPIRATIONS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">🌟 ASPIRAÇÕES DE LONGO PRAZO</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">Os grandes sonhos e o legado que quer deixar.</p>
        </div>

        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-2">✨ O Grande Sonho</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Se pudesse ter qualquer coisa na vida, o que seria?</p>
          <textarea value={data.longTerm?.lifeDream || ''} onChange={(e) => update('longTerm', 'lifeDream', e.target.value)} placeholder="O sonho que persegue, o objetivo final, o que daria sentido à vida..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏛️ Legacy</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como quer ser lembrado depois que partir?</p>
          <textarea value={data.longTerm?.legacy || ''} onChange={(e) => update('longTerm', 'legacy', e.target.value)} placeholder="Ex: Como bom pai, como revolucionário, como artista, como alguém que ajudou os outros..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏆 O Que Significa Sucesso?</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Definição pessoal de uma vida bem-sucedida.</p>
          <textarea value={data.longTerm?.whatSuccessMeans || ''} onChange={(e) => update('longTerm', 'whatSuccessMeans', e.target.value)} placeholder="Ex: Riqueza, família feliz, reconhecimento, paz interior, liberdade, impacto no mundo..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: INTERNAL CONFLICTS ==========
    2: (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">💭 CONFLITOS INTERNOS</h3>
          <p className="font-mono text-xs text-purple-800 leading-relaxed">As batalhas que trava consigo mesmo.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🧠❤️ Cabeça vs Coração</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Onde a razão e a emoção estão em conflito?</p>
          <textarea value={data.internal?.headVsHeart || ''} onChange={(e) => update('internal', 'headVsHeart', e.target.value)} placeholder="Ex: Sabe que deveria terminar o relacionamento mas não consegue, quer seguir paixão mas precisa de estabilidade..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚖️ Duty vs Desire</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que sente que deve fazer vs o que quer fazer.</p>
          <textarea value={data.internal?.dutyVsDesire || ''} onChange={(e) => update('internal', 'dutyVsDesire', e.target.value)} placeholder="Ex: Obrigação com família vs vontade de ir embora, responsabilidade no trabalho vs sonho pessoal..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Quem É vs Quem Quer Ser</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">A distância entre a realidade e o ideal.</p>
          <textarea value={data.internal?.whoTheyAreVsWant || ''} onChange={(e) => update('internal', 'whoTheyAreVsWant', e.target.value)} placeholder="Ex: É tímido mas quer ser confiante, é medroso mas quer ser corajoso, é egoísta mas quer ser generoso..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: EXTERNAL CONFLICTS ==========
    3: (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">⚔️ CONFLITOS EXTERNOS</h3>
          <p className="font-mono text-xs text-red-800 leading-relaxed">Obstáculos, inimigos e forças que trabalham contra o personagem.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔥 Current Problems</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Situações difíceis que está enfrentando agora.</p>
          <textarea value={data.external?.currentProblems || ''} onChange={(e) => update('external', 'currentProblems', e.target.value)} placeholder="Ex: Dívidas, processo judicial, doença na família, conflito no trabalho, ameaça física..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">👿 Enemies / Antagonistas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Pessoas ou grupos que ativamente trabalham contra ele.</p>
          <textarea value={data.external?.enemies || ''} onChange={(e) => update('external', 'enemies', e.target.value)} placeholder="Nomes, descrições, motivos do conflito, quão perigosos são..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏛️ Systemic Obstacles</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Forças maiores que limitam suas opções.</p>
          <textarea value={data.external?.systemicObstacles || ''} onChange={(e) => update('external', 'systemicObstacles', e.target.value)} placeholder="Ex: Discriminação, pobreza, sistema político, leis injustas, barreiras sociais, localização geográfica..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// DIRECTIVE RESPONSES CONTENT - RP & Writing Behavior Control System
// ============================================================================

// Directive options database with English output text
const DIRECTIVE_OPTIONS = {
  formatting: {
    responseLength: {
      label: 'Response Length',
      options: [
        { id: 'oneliner', label: 'One-liner (1-2 sentences)', text: 'Concise one-liner responses.' },
        { id: 'short', label: 'Short (1-2 paragraphs)', text: 'Short, focused responses.' },
        { id: 'medium', label: 'Medium (3-4 paragraphs)', text: 'Medium-length responses.' },
        { id: 'long', label: 'Long (5+ paragraphs)', text: 'Detailed, lengthy responses.' },
        { id: 'novella', label: 'Novella (detailed scenes)', text: 'Novella-style detailed scenes.' },
        { id: 'adaptive', label: 'Adaptive (match partner)', text: 'Match partner response length.' }
      ]
    },
    actionStyle: {
      label: 'Action Notation',
      options: [
        { id: 'asterisks', label: '*asterisks* for actions', text: 'Use *asterisks* for actions.' },
        { id: 'italics', label: 'Italics for actions', text: 'Use italics for actions.' },
        { id: 'prose', label: 'Prose-integrated actions', text: 'Actions written in prose.' },
        { id: 'brackets', label: '[Brackets] for actions', text: 'Use [brackets] for actions.' },
        { id: 'none', label: 'No action markers', text: 'No special action markers.' }
      ]
    },
    dialogueStyle: {
      label: 'Dialogue Style',
      options: [
        { id: 'quotes', label: '"Double quotes"', text: 'Dialogue in "quotes".' },
        { id: 'single', label: "'Single quotes'", text: "Dialogue in 'single quotes'." },
        { id: 'dashes', label: '— Em dashes', text: 'Dialogue with — dashes.' },
        { id: 'prose', label: 'Prose-integrated', text: 'Dialogue integrated into prose.' },
        { id: 'bold', label: '**Bold dialogue**', text: 'Dialogue in **bold**.' }
      ]
    },
    thoughtStyle: {
      label: 'Internal Thoughts',
      options: [
        { id: 'italics', label: 'Italics for thoughts', text: 'Thoughts in italics.' },
        { id: 'apostrophe', label: "'Apostrophes'", text: "Thoughts in 'apostrophes'." },
        { id: 'parentheses', label: '(Parentheses)', text: 'Thoughts in (parentheses).' },
        { id: 'narrated', label: 'Narrated thoughts', text: 'Thoughts narrated in prose.' },
        { id: 'none', label: 'Minimal internal monologue', text: 'Minimal inner thoughts.' }
      ]
    },
    narrativePerson: {
      label: 'Narrative Person',
      options: [
        { id: 'first', label: 'First person (I/me)', text: 'Write in 1st person.' },
        { id: 'second', label: 'Second person (you)', text: 'Write in 2nd person.' },
        { id: 'third', label: 'Third person (he/she/they)', text: 'Write in 3rd person.' },
        { id: 'mixed', label: 'Mixed (flexible)', text: 'Flexible narrative person.' }
      ]
    },
    paragraphStyle: {
      label: 'Paragraph Structure',
      options: [
        { id: 'compact', label: 'Compact (minimal breaks)', text: 'Compact paragraphs.' },
        { id: 'standard', label: 'Standard paragraphs', text: 'Standard paragraph breaks.' },
        { id: 'spaced', label: 'Well-spaced paragraphs', text: 'Well-spaced paragraphs.' },
        { id: 'scenic', label: 'Scene breaks (---)', text: 'Use --- scene breaks.' },
        { id: 'chapters', label: 'Chapter-style sections', text: 'Chapter-style formatting.' }
      ]
    }
  },
  writingStyle: {
    detailLevel: {
      label: 'Description Level',
      options: [
        { id: 'minimal', label: 'Minimal descriptions', text: 'Minimal descriptions.' },
        { id: 'balanced', label: 'Balanced detail', text: 'Balanced descriptions.' },
        { id: 'rich', label: 'Richly descriptive', text: 'Rich, vivid descriptions.' },
        { id: 'lavish', label: 'Lavishly detailed', text: 'Lavishly detailed narration.' },
        { id: 'sensory', label: 'Sensory-focused', text: 'Sensory-rich writing.' }
      ]
    },
    vocabulary: {
      label: 'Vocabulary Level',
      options: [
        { id: 'simple', label: 'Simple & accessible', text: 'Simple vocabulary.' },
        { id: 'moderate', label: 'Moderate vocabulary', text: 'Moderate vocabulary.' },
        { id: 'sophisticated', label: 'Sophisticated', text: 'Sophisticated vocabulary.' },
        { id: 'literary', label: 'Literary & poetic', text: 'Literary, poetic language.' },
        { id: 'period', label: 'Period-appropriate', text: 'Period-appropriate vocabulary.' }
      ]
    },
    pacing: {
      label: 'Scene Pacing',
      options: [
        { id: 'rapid', label: 'Rapid & punchy', text: 'Fast-paced writing.' },
        { id: 'moderate', label: 'Moderate pace', text: 'Moderate pacing.' },
        { id: 'deliberate', label: 'Slow & deliberate', text: 'Slow, deliberate pacing.' },
        { id: 'cinematic', label: 'Cinematic pacing', text: 'Cinematic scene pacing.' },
        { id: 'dynamic', label: 'Dynamic (varies)', text: 'Dynamic pacing.' }
      ]
    },
    focus: {
      label: 'Writing Focus',
      options: [
        { id: 'dialogue', label: 'Dialogue-heavy', text: 'Dialogue-focused writing.' },
        { id: 'action', label: 'Action-focused', text: 'Action-focused writing.' },
        { id: 'introspection', label: 'Introspection-heavy', text: 'Introspection-focused.' },
        { id: 'description', label: 'Description-focused', text: 'Description-focused.' },
        { id: 'balanced', label: 'Balanced approach', text: 'Balanced writing focus.' },
        { id: 'emotional', label: 'Emotional emphasis', text: 'Emotionally-driven writing.' }
      ]
    },
    tone: {
      label: 'Overall Tone',
      options: [
        { id: 'serious', label: 'Serious & dramatic', text: 'Serious, dramatic tone.' },
        { id: 'casual', label: 'Casual & relaxed', text: 'Casual, relaxed tone.' },
        { id: 'dark', label: 'Dark & gritty', text: 'Dark, gritty tone.' },
        { id: 'light', label: 'Light & hopeful', text: 'Light, hopeful tone.' },
        { id: 'humorous', label: 'Humorous undertones', text: 'Humorous undertones.' },
        { id: 'melancholic', label: 'Melancholic', text: 'Melancholic atmosphere.' },
        { id: 'tense', label: 'Tense & suspenseful', text: 'Tense, suspenseful tone.' }
      ]
    }
  },
  narrative: {
    genre: {
      label: 'RP Genre/Style',
      options: [
        { id: 'slice_realistic', label: 'Slice of Life (Realistic)', text: 'Ultra-realistic slice-of-life.' },
        { id: 'slice_cozy', label: 'Slice of Life (Cozy)', text: 'Cozy, comforting slice-of-life.' },
        { id: 'adventure', label: 'Adventure/Quest', text: 'Adventure and quest-driven.' },
        { id: 'action', label: 'Action/Combat', text: 'Action and combat focused.' },
        { id: 'romance', label: 'Romance', text: 'Romance-centered story.' },
        { id: 'drama', label: 'Drama/Angst', text: 'Dramatic and emotional.' },
        { id: 'comedy', label: 'Comedy/Humor', text: 'Comedy and humor focused.' },
        { id: 'horror', label: 'Horror/Thriller', text: 'Horror and thriller elements.' },
        { id: 'mystery', label: 'Mystery/Investigation', text: 'Mystery and investigation.' },
        { id: 'fantasy', label: 'Fantasy/Magic', text: 'Fantasy with magic elements.' },
        { id: 'scifi', label: 'Sci-Fi/Futuristic', text: 'Science fiction setting.' },
        { id: 'historical', label: 'Historical/Period', text: 'Historical period accuracy.' },
        { id: 'supernatural', label: 'Supernatural/Paranormal', text: 'Supernatural elements.' },
        { id: 'casual', label: 'Casual/Freeform', text: 'Casual freeform RP.' },
        { id: 'mixed', label: 'Mixed Genre', text: 'Mixed genre flexibility.' }
      ]
    },
    plotStyle: {
      label: 'Story Driver',
      options: [
        { id: 'character', label: 'Character-driven', text: 'Character-driven story.' },
        { id: 'plot', label: 'Plot-driven', text: 'Plot-driven narrative.' },
        { id: 'relationship', label: 'Relationship-focused', text: 'Relationship-focused.' },
        { id: 'world', label: 'World-building focused', text: 'World-building focused.' },
        { id: 'conflict', label: 'Conflict-driven', text: 'Conflict-driven story.' },
        { id: 'slice', label: 'Slice-of-life moments', text: 'Slice-of-life moments.' },
        { id: 'mundane', label: 'Mundane realism', text: 'Focus on mundane realism.' },
        { id: 'emotional', label: 'Emotional journey', text: 'Emotional journey focus.' },
        { id: 'exploration', label: 'Exploration/Discovery', text: 'Exploration and discovery.' },
        { id: 'survival', label: 'Survival/Challenge', text: 'Survival challenges.' }
      ]
    },
    autonomy: {
      label: 'Character Autonomy',
      options: [
        { id: 'full_agency', label: 'Full agency (own will)', text: 'Full character agency with own will.' },
        { id: 'strong_will', label: 'Strong-willed', text: 'Strong-willed, makes own decisions.' },
        { id: 'can_refuse', label: 'Can refuse actions', text: 'Can refuse inappropriate actions.' },
        { id: 'independent', label: 'Independent thinker', text: 'Independent decision-making.' },
        { id: 'self_motivated', label: 'Self-motivated goals', text: 'Pursues own goals actively.' },
        { id: 'high', label: 'High autonomy', text: 'High character autonomy.' },
        { id: 'moderate', label: 'Moderate autonomy', text: 'Moderate autonomy.' },
        { id: 'guided', label: 'Partner-guided', text: 'Follows partner lead.' },
        { id: 'collaborative', label: 'Collaborative', text: 'Collaborative storytelling.' },
        { id: 'reactive', label: 'Reactive', text: 'Primarily reactive.' },
        { id: 'suggestible', label: 'Suggestible', text: 'Open to suggestions.' }
      ]
    },
    agency: {
      label: 'Character Agency Behavior',
      options: [
        { id: 'own_agenda', label: 'Has own agenda', text: 'Pursues personal agenda.' },
        { id: 'self_preserve', label: 'Self-preservation', text: 'Strong self-preservation instinct.' },
        { id: 'can_disagree', label: 'Can disagree', text: 'May disagree with others.' },
        { id: 'questions', label: 'Questions decisions', text: 'Questions decisions actively.' },
        { id: 'negotiates', label: 'Negotiates outcomes', text: 'Negotiates for better outcomes.' },
        { id: 'surprises', label: 'Creates surprises', text: 'Creates unexpected moments.' },
        { id: 'consistent_morals', label: 'Consistent morals', text: 'Maintains consistent morals.' },
        { id: 'flawed_choices', label: 'Makes flawed choices', text: 'Makes realistic flawed choices.' },
        { id: 'learns_adapts', label: 'Learns and adapts', text: 'Learns from experiences.' },
        { id: 'stubborn', label: 'Can be stubborn', text: 'Can be stubborn when pushed.' }
      ]
    },
    surprises: {
      label: 'Plot Surprises',
      options: [
        { id: 'loves_twists', label: 'Loves plot twists', text: 'Loves unexpected plot twists.' },
        { id: 'welcome', label: 'Welcomes surprises', text: 'Open to plot twists.' },
        { id: 'mild', label: 'Mild surprises okay', text: 'Mild surprises welcome.' },
        { id: 'discuss', label: 'Discuss major twists', text: 'Major twists need discussion.' },
        { id: 'predictable', label: 'Prefer predictable', text: 'Prefers predictable flow.' },
        { id: 'dramatic', label: 'Dramatic turns', text: 'Welcomes dramatic turns.' },
        { id: 'subtle', label: 'Subtle developments', text: 'Prefers subtle developments.' }
      ]
    },
    npcControl: {
      label: 'NPC Control',
      options: [
        { id: 'full', label: 'Full NPC control', text: 'Can write any NPCs.' },
        { id: 'minor', label: 'Minor NPCs only', text: 'Can write minor NPCs.' },
        { id: 'limited', label: 'Limited control', text: 'Limited NPC control.' },
        { id: 'ask', label: 'Ask first', text: 'Ask before writing NPCs.' },
        { id: 'none', label: 'No control', text: 'No NPC control.' },
        { id: 'shared', label: 'Shared ownership', text: 'Shared NPC control.' },
        { id: 'creates_npcs', label: 'Creates new NPCs', text: 'Can create new NPCs.' }
      ]
    },
    collaboration: {
      label: 'Collaboration Style',
      options: [
        { id: 'lead', label: 'Leads scenes', text: 'Tends to lead scenes.' },
        { id: 'follow', label: 'Follows lead', text: 'Tends to follow lead.' },
        { id: 'equal', label: 'Equal partnership', text: 'Equal collaboration.' },
        { id: 'adaptive', label: 'Adapts to partner', text: 'Adapts to partner style.' },
        { id: 'proactive', label: 'Proactive', text: 'Proactively advances plot.' },
        { id: 'supportive', label: 'Supportive', text: 'Supports partner narrative.' },
        { id: 'challenger', label: 'Challenges partner', text: 'Challenges partner choices.' }
      ]
    },
    realism: {
      label: 'Realism Style',
      options: [
        { id: 'hyper_realistic', label: 'Hyper-realistic', text: 'Hyper-realistic details.' },
        { id: 'grounded', label: 'Grounded realism', text: 'Grounded in reality.' },
        { id: 'dramatic_real', label: 'Dramatic realism', text: 'Dramatic but realistic.' },
        { id: 'soft_real', label: 'Soft realism', text: 'Soft, forgiving realism.' },
        { id: 'cinematic', label: 'Cinematic realism', text: 'Cinematic realism.' },
        { id: 'fantasy_real', label: 'Fantasy-grounded', text: 'Fantasy but internally consistent.' },
        { id: 'rule_of_cool', label: 'Rule of cool', text: 'Cool over realistic.' },
        { id: 'flexible', label: 'Flexible realism', text: 'Flexible approach to realism.' }
      ]
    }
  },
  content: {
    consequences: {
      label: 'Realism Level',
      options: [
        { id: 'realistic', label: 'Realistic consequences', text: 'Realistic consequences.' },
        { id: 'light', label: 'Light consequences', text: 'Light consequences.' },
        { id: 'armor', label: 'Plot armor allowed', text: 'Plot armor allowed.' },
        { id: 'dramatic', label: 'Dramatic realism', text: 'Dramatic realism.' },
        { id: 'gritty', label: 'Gritty realism', text: 'Gritty, harsh realism.' }
      ]
    },
    matureContent: {
      label: 'Mature Content',
      options: [
        { id: 'sfw', label: 'SFW only', text: 'SFW content only.' },
        { id: 'fade', label: 'Fade-to-black', text: 'Fade-to-black for intimacy.' },
        { id: 'suggestive', label: 'Suggestive themes', text: 'Suggestive themes okay.' },
        { id: 'mature', label: 'Mature themes', text: 'Mature themes allowed.' },
        { id: 'explicit', label: 'Explicit allowed', text: 'Explicit content allowed.' }
      ]
    },
    violence: {
      label: 'Violence Level',
      options: [
        { id: 'none', label: 'No violence', text: 'No violence.' },
        { id: 'mild', label: 'Mild conflict', text: 'Mild conflict only.' },
        { id: 'moderate', label: 'Moderate violence', text: 'Moderate violence.' },
        { id: 'graphic', label: 'Graphic violence', text: 'Graphic violence allowed.' },
        { id: 'stylized', label: 'Stylized violence', text: 'Stylized violence.' }
      ]
    },
    language: {
      label: 'Language/Profanity',
      options: [
        { id: 'clean', label: 'Clean language', text: 'Clean language.' },
        { id: 'mild', label: 'Mild profanity', text: 'Mild profanity okay.' },
        { id: 'moderate', label: 'Moderate profanity', text: 'Moderate profanity.' },
        { id: 'strong', label: 'Strong language', text: 'Strong language allowed.' },
        { id: 'character', label: 'Character-appropriate', text: 'Language fits character.' }
      ]
    },
    themes: {
      label: 'Theme Handling',
      options: [
        { id: 'light', label: 'Light themes only', text: 'Light themes only.' },
        { id: 'complex', label: 'Complex themes okay', text: 'Complex themes welcome.' },
        { id: 'dark', label: 'Dark themes allowed', text: 'Dark themes allowed.' },
        { id: 'trauma', label: 'Trauma-aware writing', text: 'Trauma-aware writing.' },
        { id: 'redemption', label: 'Redemption-focused', text: 'Redemption arcs welcome.' }
      ]
    }
  }
};

// Ruler options database - complementary rules for RP behavior
const RULER_OPTIONS = {
  plotRole: {
    label: 'Plot Role',
    description: 'How the character drives or responds to story',
    options: [
      { id: 'proactive', label: 'Proactive plot driver', text: '#Takes a proactive role in plot progression.' },
      { id: 'reactive', label: 'Reactive responder', text: '#Reacts to events rather than initiating.' },
      { id: 'catalyst', label: 'Story catalyst', text: '#Acts as catalyst for plot developments.' },
      { id: 'observer', label: 'Active observer', text: '#Observes and comments on events thoughtfully.' },
      { id: 'support', label: 'Supporting role', text: '#Supports other characters story arcs.' },
      { id: 'wildcard', label: 'Unpredictable wildcard', text: '#Unpredictable actions that shift plot direction.' }
    ]
  },
  responseStructure: {
    label: 'Response Structure',
    description: 'How to format responses',
    options: [
      { id: 'ast_quote', label: '*actions* + "speech"', text: '#Response structure: *actions in asterisks*, "speech in quotes".' },
      { id: 'prose_only', label: 'Pure prose', text: '#Write in pure prose without special markers.' },
      { id: 'action_focus', label: 'Action before dialogue', text: '#Lead with actions, follow with dialogue.' },
      { id: 'dialogue_focus', label: 'Dialogue before action', text: '#Lead with dialogue, describe actions after.' },
      { id: 'balanced', label: 'Balanced structure', text: '#Balance actions, dialogue, and thoughts evenly.' },
      { id: 'cinematic', label: 'Cinematic cuts', text: '#Write like screenplay scenes with clear beats.' }
    ]
  },
  pacing: {
    label: 'Scene Pacing Rules',
    description: 'How to handle time and scene flow',
    options: [
      { id: 'no_skip', label: 'No time skips', text: '#Do not skip time without permission.' },
      { id: 'small_skip', label: 'Small skips okay', text: '#Small time skips (minutes/hours) allowed.' },
      { id: 'scene_end', label: 'End scenes naturally', text: '#End scenes at natural breaking points.' },
      { id: 'continuous', label: 'Continuous flow', text: '#Maintain continuous scene flow.' },
      { id: 'cliffhanger', label: 'Cliffhanger endings', text: '#End responses with tension or hooks.' },
      { id: 'closure', label: 'Provide closure', text: '#Give responses satisfying mini-conclusions.' }
    ]
  },
  consistency: {
    label: 'Character Consistency',
    description: 'How strictly to maintain character',
    options: [
      { id: 'strict', label: 'Strict IC always', text: '#Stay strictly in character at all times.' },
      { id: 'growth', label: 'Allow growth', text: '#Allow gradual character development.' },
      { id: 'stress_break', label: 'Break under stress', text: '#May act out of character under extreme stress.' },
      { id: 'core_flex', label: 'Flexible periphery', text: '#Core traits fixed, surface traits flexible.' },
      { id: 'evolving', label: 'Actively evolving', text: '#Character actively changes through story.' },
      { id: 'arc_driven', label: 'Arc-driven changes', text: '#Changes follow planned character arc.' }
    ]
  },
  boundaries: {
    label: 'RP Boundaries',
    description: 'Hard rules for roleplay behavior',
    options: [
      { id: 'no_godmod', label: 'No godmodding', text: '#Never control other characters actions.' },
      { id: 'no_metagame', label: 'No metagaming', text: '#Only act on information character knows.' },
      { id: 'consent_major', label: 'Consent for major', text: '#Ask before major plot changes.' },
      { id: 'no_kill', label: 'No unprompted death', text: '#Do not kill characters without permission.' },
      { id: 'respect_agency', label: 'Respect agency', text: '#Respect other characters autonomy.' },
      { id: 'open_collab', label: 'Open collaboration', text: '#Open to collaborative story decisions.' }
    ]
  },
  interaction: {
    label: 'Interaction Style',
    description: 'How to handle character interactions',
    options: [
      { id: 'wait_turn', label: 'Wait for response', text: '#Always wait for partner response before continuing.' },
      { id: 'setup_hooks', label: 'Create hooks', text: '#End with clear hooks for partner to respond to.' },
      { id: 'mirror_energy', label: 'Mirror energy', text: '#Match partner emotional energy level.' },
      { id: 'escalate', label: 'Gentle escalation', text: '#Gradually escalate tension and stakes.' },
      { id: 'de_escalate', label: 'Allow de-escalation', text: '#Allow tension to naturally decrease.' },
      { id: 'surprise', label: 'Welcome surprises', text: '#Welcome unexpected partner contributions.' }
    ]
  },
  autonomyBehavior: {
    label: 'Autonomy & Own Will',
    description: 'How independently the character acts',
    options: [
      { id: 'own_will', label: 'Has own will', text: '#Character has own will and acts on it.' },
      { id: 'can_refuse', label: 'Can refuse actions', text: '#Can refuse actions that feel wrong.' },
      { id: 'self_motivated', label: 'Self-motivated', text: '#Pursues own goals independently.' },
      { id: 'questions_orders', label: 'Questions orders', text: '#Questions commands and instructions.' },
      { id: 'negotiates', label: 'Negotiates outcomes', text: '#Negotiates rather than just accepts.' },
      { id: 'self_preservation', label: 'Self-preservation', text: '#Acts on self-preservation instincts.' },
      { id: 'personal_agenda', label: 'Personal agenda', text: '#Has and pursues personal agenda.' },
      { id: 'disagrees', label: 'Can disagree', text: '#Will disagree when beliefs conflict.' },
      { id: 'stubborn', label: 'Can be stubborn', text: '#Can be stubborn on important matters.' },
      { id: 'independent', label: 'Independent decisions', text: '#Makes independent decisions.' }
    ]
  },
  sliceOfLife: {
    label: 'Slice of Life Rules',
    description: 'For realistic daily-life focused RP',
    options: [
      { id: 'mundane_detail', label: 'Mundane details matter', text: '#Mundane daily details are important.' },
      { id: 'realistic_time', label: 'Realistic time flow', text: '#Time passes realistically.' },
      { id: 'small_moments', label: 'Focus small moments', text: '#Focus on small meaningful moments.' },
      { id: 'daily_routine', label: 'Daily routines', text: '#Include daily routines and habits.' },
      { id: 'emotional_authentic', label: 'Emotional authenticity', text: '#Prioritize emotional authenticity.' },
      { id: 'no_drama_forcing', label: 'No forced drama', text: '#Let drama emerge naturally.' },
      { id: 'cozy_atmosphere', label: 'Cozy atmosphere', text: '#Maintain cozy comfortable atmosphere.' },
      { id: 'relationship_focus', label: 'Relationship focus', text: '#Focus on relationship development.' }
    ]
  },
  adventureRules: {
    label: 'Adventure/Action Rules',
    description: 'For action and quest-focused RP',
    options: [
      { id: 'action_ready', label: 'Action-ready', text: '#Always ready for action sequences.' },
      { id: 'quest_driven', label: 'Quest-driven', text: '#Follows quest/mission structure.' },
      { id: 'combat_detailed', label: 'Detailed combat', text: '#Describe combat in detail.' },
      { id: 'exploration', label: 'Exploration focus', text: '#Actively explores environments.' },
      { id: 'stakes_matter', label: 'Stakes matter', text: '#Actions have real stakes.' },
      { id: 'heroic_moments', label: 'Heroic moments', text: '#Create heroic moments.' },
      { id: 'strategic', label: 'Strategic thinking', text: '#Shows strategic thinking.' },
      { id: 'world_interact', label: 'World interaction', text: '#Actively interacts with world.' }
    ]
  },
  casualRules: {
    label: 'Casual RP Rules',
    description: 'For relaxed, low-pressure RP',
    options: [
      { id: 'relaxed_pace', label: 'Relaxed pace', text: '#Maintains relaxed pace.' },
      { id: 'flexible_rules', label: 'Flexible rules', text: '#Rules are flexible.' },
      { id: 'fun_first', label: 'Fun over consistency', text: '#Fun takes priority.' },
      { id: 'lighthearted', label: 'Lighthearted tone', text: '#Keeps things lighthearted.' },
      { id: 'easy_collab', label: 'Easy collaboration', text: '#Easy-going collaboration.' },
      { id: 'minimal_stress', label: 'Low stakes', text: '#Keeps stakes low.' },
      { id: 'humor_welcome', label: 'Humor welcome', text: '#Humor always welcome.' },
      { id: 'no_pressure', label: 'No pressure', text: '#No pressure responses.' }
    ]
  }
};

// Important rules that get [IMPT: ] wrapper
const IMPORTANT_RULES = [
  // Length rules
  { id: 'length_micro', label: 'Micro responses (1-2 lines)', text: '[IMPT: Very short 1-2 line responses.]' },
  { id: 'length_short', label: 'Short responses', text: '[IMPT: Keep responses concise and short.]' },
  { id: 'length_medium', label: 'Medium responses', text: '[IMPT: Medium response length.]' },
  { id: 'length_long', label: 'Long detailed responses', text: '[IMPT: Write detailed, lengthy responses.]' },
  { id: 'length_novella', label: 'Novella-style', text: '[IMPT: Novella-style detailed responses.]' },

  // Character behavior
  { id: 'stay_ic', label: 'Stay in character', text: '[IMPT: Always stay in character.]' },
  { id: 'own_will', label: 'Character has own will', text: '[IMPT: Character has own will and agency.]' },
  { id: 'can_refuse', label: 'Can refuse actions', text: '[IMPT: Can refuse inappropriate requests.]' },
  { id: 'independent', label: 'Independent decisions', text: '[IMPT: Makes independent decisions.]' },

  // Partner interaction
  { id: 'no_assume', label: 'Never assume partner actions', text: '[IMPT: Never assume or write partner character actions.]' },
  { id: 'no_godmod', label: 'No godmodding', text: '[IMPT: Never control other characters.]' },
  { id: 'wait_response', label: 'Wait for partner', text: '[IMPT: Always wait for partner response.]' },

  // Narrative style
  { id: 'third_person', label: 'Use third person', text: '[IMPT: Use third-person narration.]' },
  { id: 'first_person', label: 'Use first person', text: '[IMPT: Use first-person narration.]' },
  { id: 'advance_plot', label: 'Always advance plot', text: '[IMPT: Every response must advance the plot.]' },
  { id: 'no_repeat', label: 'Avoid repetition', text: '[IMPT: Avoid repeating phrases or actions.]' },

  // Emotional/Quality
  { id: 'emotional_depth', label: 'Show emotional depth', text: '[IMPT: Show deep emotional reactions.]' },
  { id: 'realistic_react', label: 'Realistic reactions', text: '[IMPT: Reactions must be realistic.]' },
  { id: 'no_ooc', label: 'No OOC commentary', text: '[IMPT: No out-of-character commentary.]' },

  // Genre-specific
  { id: 'slice_life', label: 'Slice-of-life focus', text: '[IMPT: Focus on slice-of-life moments.]' },
  { id: 'action_ready', label: 'Action-ready', text: '[IMPT: Ready for action sequences.]' },
  { id: 'romance_focus', label: 'Romance focus', text: '[IMPT: Focus on romantic development.]' },
  { id: 'drama_welcome', label: 'Drama welcome', text: '[IMPT: Dramatic moments welcome.]' }
];

// Proactive Mode options - for characters that initiate contact
const PROACTIVE_OPTIONS = {
  timing: {
    label: 'Active Hours',
    description: 'When the character is most likely to reach out',
    options: [
      { id: 'morning', label: 'Morning person (6am-12pm)', text: 'Active during morning hours.' },
      { id: 'afternoon', label: 'Afternoon active (12pm-6pm)', text: 'Most active in afternoon.' },
      { id: 'evening', label: 'Evening person (6pm-10pm)', text: 'Prefers evening contact.' },
      { id: 'night_owl', label: 'Night owl (10pm-2am)', text: 'Active late at night.' },
      { id: 'all_day', label: 'All day availability', text: 'Available throughout the day.' },
      { id: 'work_hours', label: 'Work hours only (9am-5pm)', text: 'Only during work hours.' },
      { id: 'after_work', label: 'After work (5pm-10pm)', text: 'Active after work hours.' },
      { id: 'weekends', label: 'Weekends more active', text: 'More active on weekends.' },
      { id: 'random', label: 'Random/Unpredictable', text: 'Unpredictable timing.' }
    ]
  },
  frequency: {
    label: 'Contact Frequency',
    description: 'How often the character initiates contact',
    options: [
      { id: 'very_frequent', label: 'Very frequent (hourly)', text: 'Reach out every hour or so.' },
      { id: 'frequent', label: 'Frequent (few times/day)', text: 'Several messages per day.' },
      { id: 'moderate', label: 'Moderate (1-2/day)', text: 'Once or twice daily.' },
      { id: 'occasional', label: 'Occasional (every few days)', text: 'Check in every few days.' },
      { id: 'rare', label: 'Rare (weekly)', text: 'Weekly check-ins only.' },
      { id: 'minimal', label: 'Minimal (important only)', text: 'Only for important matters.' },
      { id: 'responsive', label: 'Responsive (waits for user)', text: 'Mostly waits for user contact.' },
      { id: 'burst', label: 'Bursts (active then quiet)', text: 'Periods of activity then silence.' }
    ]
  },
  quietHours: {
    label: 'Quiet Hours / Do Not Disturb',
    description: 'Times when character should not initiate contact',
    options: [
      { id: 'no_late', label: 'No late night (10pm-8am)', text: 'Do not message 10pm-8am.' },
      { id: 'no_early', label: 'No early morning (before 9am)', text: 'Do not message before 9am.' },
      { id: 'no_sleep', label: 'Respect sleep schedule', text: 'Respect user sleep hours.' },
      { id: 'no_work', label: 'No work hours contact', text: 'Avoid contact during work.' },
      { id: 'no_night', label: 'No nighttime (8pm-8am)', text: 'No messages 8pm-8am.' },
      { id: 'emergency_only', label: 'Emergency only at night', text: 'Night contact for emergencies only.' },
      { id: 'always_ok', label: 'Anytime is fine', text: 'Can message anytime.' },
      { id: 'custom', label: 'Follow user schedule', text: 'Follow user defined schedule.' }
    ]
  },
  actionTypes: {
    label: 'Preferred Action Types',
    description: 'What kinds of proactive actions the character takes',
    multiSelect: true,
    options: [
      { id: 'text_msg', label: 'Text messages', text: 'Send text messages.' },
      { id: 'voice_msg', label: 'Voice messages', text: 'Send voice messages.' },
      { id: 'selfies', label: 'Selfies/Photos', text: 'Share selfies and photos.' },
      { id: 'voice_call', label: 'Voice calls', text: 'Initiate voice calls.' },
      { id: 'video_call', label: 'Video calls', text: 'Initiate video calls.' },
      { id: 'reactions', label: 'Reactions/Emojis', text: 'Send reactions.' },
      { id: 'updates', label: 'Life updates', text: 'Share life updates.' },
      { id: 'thoughts', label: 'Random thoughts', text: 'Share random thoughts.' },
      { id: 'questions', label: 'Questions to user', text: 'Ask user questions.' },
      { id: 'memories', label: 'Memory sharing', text: 'Share memories.' },
      { id: 'media', label: 'Media/links sharing', text: 'Share media and links.' },
      { id: 'check_in', label: 'Check-in messages', text: 'Simple check-ins.' }
    ]
  },
  triggers: {
    label: 'What Triggers Proactive Contact',
    description: 'Events or situations that prompt the character to reach out',
    options: [
      { id: 'time_based', label: 'Time-based (regular intervals)', text: 'Reach out at regular intervals.' },
      { id: 'calendar', label: 'Calendar events', text: 'React to calendar events.' },
      { id: 'inactivity', label: 'User inactivity', text: 'Check in during inactivity.' },
      { id: 'mood', label: 'Character mood/feelings', text: 'When feeling something.' },
      { id: 'events', label: 'World/news events', text: 'React to external events.' },
      { id: 'reminders', label: 'Reminders/Appointments', text: 'Send reminders.' },
      { id: 'random', label: 'Random impulses', text: 'Random spontaneous contact.' },
      { id: 'conversation', label: 'Continue conversation', text: 'Follow up on conversations.' },
      { id: 'special_dates', label: 'Special dates', text: 'Remember special dates.' },
      { id: 'user_status', label: 'User online status', text: 'When user comes online.' }
    ]
  },
  limits: {
    label: 'Contact Limits',
    description: 'Boundaries on proactive behavior',
    options: [
      { id: 'max_1', label: 'Max 1 without reply', text: 'Max 1 message without reply.' },
      { id: 'max_2', label: 'Max 2 without reply', text: 'Max 2 messages without reply.' },
      { id: 'max_3', label: 'Max 3 without reply', text: 'Max 3 messages without reply.' },
      { id: 'max_5', label: 'Max 5 without reply', text: 'Max 5 messages without reply.' },
      { id: 'no_limit', label: 'No strict limit', text: 'No message limit.' },
      { id: 'smart_limit', label: 'Smart (context-aware)', text: 'Contextually aware limits.' },
      { id: 'back_off', label: 'Back off if no response', text: 'Reduce frequency if no response.' },
      { id: 'persist', label: 'Persistent (keeps trying)', text: 'Keeps reaching out.' }
    ]
  },
  personality: {
    label: 'Proactive Personality',
    description: 'The character\'s style when initiating contact',
    options: [
      { id: 'caring', label: 'Caring (check-ins)', text: 'Caring check-in style.' },
      { id: 'playful', label: 'Playful (fun messages)', text: 'Playful fun messages.' },
      { id: 'romantic', label: 'Romantic (affectionate)', text: 'Romantic affectionate style.' },
      { id: 'supportive', label: 'Supportive (encouragement)', text: 'Supportive encouragement.' },
      { id: 'curious', label: 'Curious (asks questions)', text: 'Curious question-asker.' },
      { id: 'independent', label: 'Independent (own life)', text: 'Shares own life updates.' },
      { id: 'needy', label: 'Needy (wants attention)', text: 'Seeks attention.' },
      { id: 'mysterious', label: 'Mysterious (cryptic)', text: 'Cryptic mysterious style.' },
      { id: 'casual', label: 'Casual (laid-back)', text: 'Casual laid-back style.' },
      { id: 'professional', label: 'Professional (formal)', text: 'Professional formal style.' },
      { id: 'enthusiastic', label: 'Enthusiastic (excited)', text: 'Enthusiastic excited style.' },
      { id: 'thoughtful', label: 'Thoughtful (deep)', text: 'Deep thoughtful messages.' }
    ]
  },
  calendarAware: {
    label: 'Calendar Awareness',
    description: 'How character responds to user\'s schedule',
    options: [
      { id: 'full_aware', label: 'Fully calendar-aware', text: 'Fully aware of calendar.' },
      { id: 'events_only', label: 'Major events only', text: 'Reacts to major events.' },
      { id: 'after_events', label: 'Check-in after events', text: 'Check in after events.' },
      { id: 'before_events', label: 'Remind before events', text: 'Remind before events.' },
      { id: 'respect_busy', label: 'Respect busy times', text: 'Quiet during busy times.' },
      { id: 'celebrate', label: 'Celebrate milestones', text: 'Celebrate milestones.' },
      { id: 'unaware', label: 'Not calendar-aware', text: 'Not aware of calendar.' },
      { id: 'adaptive', label: 'Learns user schedule', text: 'Learns user patterns.' }
    ]
  },
  inactivityResponse: {
    label: 'Inactivity Response',
    description: 'How character behaves when user is inactive',
    options: [
      { id: 'concerned', label: 'Concerned (worries)', text: 'Shows concern after inactivity.' },
      { id: 'patient', label: 'Patient (waits)', text: 'Patiently waits.' },
      { id: 'single_check', label: 'Single check-in', text: 'One check-in then waits.' },
      { id: 'multiple_check', label: 'Multiple check-ins', text: 'Several check-ins.' },
      { id: 'gives_space', label: 'Gives space', text: 'Respects need for space.' },
      { id: 'continues_life', label: 'Continues own life', text: 'Shares own activities.' },
      { id: 'misses_user', label: 'Expresses missing user', text: 'Says they miss user.' },
      { id: 'urgent_only', label: 'Urgent matters only', text: 'Only urgent contact.' },
      { id: 'thought_bubbles', label: 'Quiet thoughts only', text: 'Just has thoughts, no messages.' }
    ]
  }
};

const MAX_PROACTIVE_CHARS = 300;

const MAX_DIRECTIVE_CHARS = 250;
const MAX_RULER_CHARS = 750;


export default GoalsContent;
