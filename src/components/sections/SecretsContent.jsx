import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const SecretsContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('secrets', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  const sections = {
    // ========== SUBTAB 0: HIDDEN TRUTHS ==========
    0: (
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-400 mb-2">🔒 HIDDEN TRUTHS</h3>
          <p className="font-mono text-xs text-gray-400 leading-relaxed">Os segredos mais profundos que o personagem guarda.</p>
        </div>

        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">💀 O Maior Segredo</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que destruiria a vida dele se fosse revelado?</p>
          <textarea value={data.hidden?.biggestSecret || ''} onChange={(e) => update('hidden', 'biggestSecret', e.target.value)} placeholder="O segredo que carrega, que pouquíssimas pessoas (ou ninguém) sabem..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Mentiras Mantidas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Mentiras que conta regularmente ou há muito tempo.</p>
          <textarea value={data.hidden?.liesMaintained || ''} onChange={(e) => update('hidden', 'liesMaintained', e.target.value)} placeholder="Ex: Finge que se formou na faculdade, diz que os pais morreram, esconde vício..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚫 Nunca Admitiria</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Coisas que nunca confessaria, mesmo sob tortura.</p>
          <textarea value={data.hidden?.neverAdmit || ''} onChange={(e) => update('hidden', 'neverAdmit', e.target.value)} placeholder="Truths denied even to oneself, things they would die without revealing..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💭 Desejos Secretos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Vontades que tem vergonha de admitir.</p>
          <textarea value={data.hidden?.secretDesires || ''} onChange={(e) => update('hidden', 'secretDesires', e.target.value)} placeholder="Ex: Quer largar tudo e sumir, fantasia com a vida de outra pessoa, inveja alguém..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: CONTRADICTIONS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">⚖️ CONTRADIÇÕES</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">As inconsistências entre quem o personagem finge ser e quem realmente é.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Público vs Privado</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como a persona pública difere da pessoa real?</p>
          <textarea value={data.contradictions?.publicVsPrivate || ''} onChange={(e) => update('contradictions', 'publicVsPrivate', e.target.value)} placeholder="Ex: Parece confiante mas é inseguro, age feliz mas está deprimido, finge ser durão mas é sensível..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗣️ O Que Prega vs O Que Pratica</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Conselhos que dá mas não segue.</p>
          <textarea value={data.contradictions?.preachVsPractice || ''} onChange={(e) => update('contradictions', 'preachVsPractice', e.target.value)} placeholder="Ex: Diz para outros serem honestos mas mente, critica vícios mas tem os próprios..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🙈 Hipocrisia Inconsciente</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Contradições que ele nem percebe em si mesmo.</p>
          <textarea value={data.contradictions?.unawareHypocrisy || ''} onChange={(e) => update('contradictions', 'unawareHypocrisy', e.target.value)} placeholder="Ex: Reclama de fofoca mas fofoca, critica preconceito mas tem preconceitos, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: SKELETONS ==========
    2: (
      <div className="space-y-6">
        <div className="bg-slate-800 border border-slate-600 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-slate-200 mb-2">💀 ESQUELETOS NO ARMÁRIO</h3>
          <p className="font-mono text-xs text-slate-400 leading-relaxed">O passado sombrio e as pessoas que poderiam usar isso contra ele.</p>
        </div>

        <div className="border-2 border-slate-300 rounded-sm p-4 bg-slate-50">
          <h4 className="font-mono text-sm font-bold text-slate-800 mb-2">❌ Erros do Passado</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Coisas terríveis que fez e gostaria de apagar.</p>
          <textarea value={data.skeletons?.pastMistakes || ''} onChange={(e) => update('skeletons', 'pastMistakes', e.target.value)} placeholder="Ex: Traiu alguém, causou um acidente, roubou, mentiu com consequências graves..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😔 Pessoas que Prejudicou</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Quem ele machucou e ainda carrega essa culpa?</p>
          <textarea value={data.skeletons?.peopleWronged || ''} onChange={(e) => update('skeletons', 'peopleWronged', e.target.value)} placeholder="Nomes ou descrições de pessoas que prejudicou, abandonou, ou traiu..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border-2 border-red-300 rounded-sm p-4 bg-red-50">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">⚠️ Quem Poderia Destruí-lo?</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Pessoas que sabem demais e poderiam arruinar sua vida.</p>
          <textarea value={data.skeletons?.couldDestroyThem || ''} onChange={(e) => update('skeletons', 'couldDestroyThem', e.target.value)} placeholder="Nomes de pessoas que têm informação comprometedora, ex-parceiros vingativos, testemunhas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// GOALS CONTENT - Complete Implementation
// ============================================================================

export default SecretsContent;
