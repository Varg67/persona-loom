import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const BehaviorContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('behavior', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  const sections = {
    // ========== SUBTAB 0: COMMUNICATION ==========
    0: (
      <div className="space-y-6">
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-violet-900 mb-2">💬 COMUNICAÇÃO</h3>
          <p className="font-mono text-xs text-violet-800 leading-relaxed">Como o personagem se comunica verbalmente e não-verbalmente.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗣️ Estilo de Fala</h4>
          <select value={data.communication?.speakingStyle || ''} onChange={(e) => update('communication', 'speakingStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="eloquent">Eloquent — Articulado, escolhe palavras com cuidado</option>
            <option value="direct">Direct — Vai direto ao ponto, sem rodeios</option>
            <option value="rambling">Rambling — Divaga, perde o fio da meada</option>
            <option value="quiet">Quiet — Fala pouco, só quando necessário</option>
            <option value="loud">Loud — Fala alto, domina conversas</option>
            <option value="fast">Fast — Fala rápido, atropela palavras</option>
            <option value="slow">Slow — Fala devagar, pausado</option>
            <option value="mumbling">Mumbling — Murmura, difícil de entender</option>
            <option value="animated">Animated — Expressivo, usa muitos gestos</option>
            <option value="monotone">Monotone — Tom monótono, pouca variação</option>
            <option value="formal">Formal — Sempre formal, mesmo casualmente</option>
            <option value="casual">Casual — Sempre informal, gírias</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📚 Nível de Vocabulário</h4>
          <select value={data.communication?.vocabularyLevel || ''} onChange={(e) => update('communication', 'vocabularyLevel', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="simple">Simple — Palavras básicas, frases curtas</option>
            <option value="average">Average — Vocabulário comum, adequado</option>
            <option value="educated">Educated — Vocabulário amplo, bem articulado</option>
            <option value="academic">Academic — Jargão técnico, termos específicos</option>
            <option value="pretentious">Pretentious — Usa palavras difíceis para impressionar</option>
            <option value="slang-heavy">Slang-Heavy — Muitas gírias e expressões</option>
            <option value="mixed">Mixed — Varia conforme contexto</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌍 Sotaque / Dialeto</h4>
          <input type="text" value={data.communication?.accentDialect || ''} onChange={(e) => update('communication', 'accentDialect', e.target.value)} placeholder="Ex: Sotaque nordestino, Inglês britânico, Sem sotaque marcante..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔄 Tiques Verbais</h4>
          <textarea value={data.communication?.verbalTics || ''} onChange={(e) => update('communication', 'verbalTics', e.target.value)} placeholder="Ex: Diz 'tipo' frequentemente, pigarreia antes de falar, termina frases com 'sabe?'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👐 Hábitos Não-Verbais</h4>
          <textarea value={data.communication?.nonVerbalHabits || ''} onChange={(e) => update('communication', 'nonVerbalHabits', e.target.value)} placeholder="Ex: Evita contato visual, gesticula muito, cruza os braços, toca no cabelo..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: DAILY PATTERNS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">📅 PADRÕES DIÁRIOS</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">Rotinas, rituais e hábitos do dia-a-dia.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌅 Rotina Matinal</h4>
          <textarea value={data.daily?.morningRoutine || ''} onChange={(e) => update('daily', 'morningRoutine', e.target.value)} placeholder="Descreva como começa o dia: acorda cedo/tarde, primeiro café, exercício, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔁 Rituais Diários</h4>
          <textarea value={data.daily?.dailyRituals || ''} onChange={(e) => update('daily', 'dailyRituals', e.target.value)} placeholder="Hábitos que repete todos os dias: ler antes de dormir, café às 3pm, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⏰ Hábitos de Procrastinação</h4>
          <textarea value={data.daily?.procrastinationHabits || ''} onChange={(e) => update('daily', 'procrastinationHabits', e.target.value)} placeholder="Como procrastina: redes sociais, limpeza, soneca, 'só mais um episódio'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📐 Nível de Organização</h4>
          <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Caótico</span><span>Metódico</span></div>
          <input type="range" min="1" max="9" value={data.daily?.organizationLevel || 5} onChange={(e) => update('daily', 'organizationLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-blue-400 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: SOCIAL BEHAVIOR ==========
    2: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">👥 COMPORTAMENTO SOCIAL</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">Como se comporta em diferentes contextos sociais.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👋 Primeira Impressão</h4>
          <textarea value={data.social?.firstImpression || ''} onChange={(e) => update('social', 'firstImpression', e.target.value)} placeholder="Como as pessoas geralmente o percebem no primeiro encontro..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👥 Comportamento em Grupos</h4>
          <select value={data.social?.behaviorInGroups || ''} onChange={(e) => update('social', 'behaviorInGroups', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="leader">Leader — Assume comando naturalmente</option>
            <option value="entertainer">Entertainer — Conta piadas, anima o grupo</option>
            <option value="observer">Observer — Observa mais do que participa</option>
            <option value="mediator">Mediator — Resolve conflitos, harmoniza</option>
            <option value="wallflower">Wallflower — Fica nos cantos, evita atenção</option>
            <option value="contrarian">Contrarian — Discorda por esporte</option>
            <option value="supporter">Supporter — Apoia ideias dos outros</option>
            <option value="dominator">Dominator — Monopoliza conversas</option>
            <option value="chameleon">Chameleon — Adapta-se ao grupo</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🤝 Comportamento One-on-One</h4>
          <select value={data.social?.behaviorOneOnOne || ''} onChange={(e) => update('social', 'behaviorOneOnOne', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="intimate">Intimate — Abre-se facilmente, conexão profunda</option>
            <option value="guarded">Guarded — Mantém distância, superficial</option>
            <option value="listener">Listener — Prefere ouvir do que falar</option>
            <option value="talker">Talker — Fala mais do que ouve</option>
            <option value="awkward">Awkward — Desconfortável, silêncios</option>
            <option value="intense">Intense — Contato visual forte, foco total</option>
            <option value="distracted">Distracted — Mente vagueia facilmente</option>
            <option value="warm">Warm — Caloroso, faz o outro se sentir bem</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😰 Comportamento Sob Estresse</h4>
          <textarea value={data.social?.behaviorUnderStress || ''} onChange={(e) => update('social', 'behaviorUnderStress', e.target.value)} placeholder="Como muda quando estressado: isola-se, fica irritável, busca ajuda..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: QUIRKS & HABITS ==========
    3: (
      <div className="space-y-6">
        <div className="bg-pink-50 border border-pink-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-pink-900 mb-2">🎭 MANIAS & HÁBITOS</h3>
          <p className="font-mono text-xs text-pink-800 leading-relaxed">Peculiaridades, tiques e comportamentos característicos.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😬 Hábitos Nervosos</h4>
          <textarea value={data.quirks?.nervousHabits || ''} onChange={(e) => update('quirks', 'nervousHabits', e.target.value)} placeholder="Ex: Rói unhas, balança a perna, mexe no cabelo, range dentes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🤗 Comportamentos de Conforto</h4>
          <textarea value={data.quirks?.comfortBehaviors || ''} onChange={(e) => update('quirks', 'comfortBehaviors', e.target.value)} placeholder="O que faz para se acalmar: come doce, abraça travesseiro, banho quente..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😤 Pet Peeves</h4>
          <textarea value={data.quirks?.petPeeves || ''} onChange={(e) => update('quirks', 'petPeeves', e.target.value)} placeholder="Coisas que irritam desproporcionalmente: barulho de mastigar, atraso, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍀 Superstições Pessoais</h4>
          <textarea value={data.quirks?.superstitions || ''} onChange={(e) => update('quirks', 'superstitions', e.target.value)} placeholder="Rituais de sorte, manias, 'se eu não fizer X, Y vai acontecer'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 4: UNDER PRESSURE ==========
    4: (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">⚡ SOB PRESSÃO</h3>
          <p className="font-mono text-xs text-red-800 leading-relaxed">Como reage a crises, falhas e situações extremas.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🥊 Resposta Instintiva</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Qual a primeira reação quando ameaçado ou em perigo?</p>
          <div className="grid grid-cols-4 gap-2">
            {['Fight', 'Flight', 'Freeze', 'Fawn'].map(response => (
              <button key={response} onClick={() => update('pressure', 'fightFlightFreeze', response)} className={`py-3 rounded font-mono text-xs transition-all ${data.pressure?.fightFlightFreeze === response ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                {response === 'Fight' && '🥊 Fight'}
                {response === 'Flight' && '🏃 Flight'}
                {response === 'Freeze' && '🧊 Freeze'}
                {response === 'Fawn' && '🙇 Fawn'}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-500 mt-2 italic">
            {data.pressure?.fightFlightFreeze === 'Fight' && 'Enfrenta o perigo de frente, pode ser agressivo ou assertivo.'}
            {data.pressure?.fightFlightFreeze === 'Flight' && 'Foge, evita, procura escapar da situação.'}
            {data.pressure?.fightFlightFreeze === 'Freeze' && 'Paralisa, fica imóvel, não consegue reagir.'}
            {data.pressure?.fightFlightFreeze === 'Fawn' && 'Tenta agradar, apaziguar, evitar conflito a todo custo.'}
          </p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚨 Personalidade em Crise</h4>
          <select value={data.pressure?.crisisPersonality || ''} onChange={(e) => update('pressure', 'crisisPersonality', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="calm-leader">Calm Leader — Fica mais calmo, assume controle</option>
            <option value="panics">Panics — Entra em pânico, perde controle</option>
            <option value="shuts-down">Shuts Down — Desliga, fica apático</option>
            <option value="hyper-focused">Hyper-Focused — Foco extremo no problema</option>
            <option value="emotional">Emotional — Reage emocionalmente primeiro</option>
            <option value="analytical">Analytical — Analisa friamente a situação</option>
            <option value="denial">Denial — Nega que há problema</option>
            <option value="blame">Blame — Procura culpados</option>
            <option value="helper">Helper — Foca em ajudar outros</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📉 Como Lida com Fracasso</h4>
          <textarea value={data.pressure?.handleFailure || ''} onChange={(e) => update('pressure', 'handleFailure', e.target.value)} placeholder="Descreva: nega, aprende, se culpa, culpa outros, tenta de novo imediatamente..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📈 Como Lida com Sucesso</h4>
          <textarea value={data.pressure?.handleSuccess || ''} onChange={(e) => update('pressure', 'handleSuccess', e.target.value)} placeholder="Descreva: celebra abertamente, minimiza, fica desconfortável, usa como motivação..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// SECRETS CONTENT - Complete Implementation
// ============================================================================

export default BehaviorContent;
