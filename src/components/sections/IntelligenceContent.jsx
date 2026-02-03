import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const IntelligenceContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('intelligence', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // Toggle for array fields
  const toggleArrayItem = (section, field, item, maxItems = 10) => {
    const current = data[section]?.[field] || [];
    if (current.includes(item)) {
      update(section, field, current.filter(i => i !== item));
    } else if (current.length < maxItems) {
      update(section, field, [...current, item]);
    }
  };

  const sections = {
    // ========== SUBTAB 0: COGNITIVE PROFILE ==========
    0: (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">🧠 PERFIL COGNITIVO</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">
            Como o cérebro do personagem funciona: capacidade intelectual, velocidade de processamento,
            tipos de memória e estilos de pensamento. Mais útil que um simples número de QI.
          </p>
        </div>

        {/* IQ Range */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📊 Faixa de QI</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Estimativa geral da capacidade intelectual. Lembre-se que QI não mede todos os tipos de inteligência.
          </p>
          <select
            value={data.cognitive?.iqRange || ''}
            onChange={(e) => update('cognitive', 'iqRange', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione a faixa --</option>
            <option value="below-70">Below 70 — Deficiência Intelectual</option>
            <option value="70-84">70-84 — Borderline (Limítrofe)</option>
            <option value="85-99">85-99 — Low Average (Abaixo da Média)</option>
            <option value="100-114">100-114 — Average (Média)</option>
            <option value="115-129">115-129 — High Average (Acima da Média)</option>
            <option value="130-144">130-144 — Superior (Gifted/Superdotado)</option>
            <option value="145-159">145-159 — Very Superior (Muito Superior)</option>
            <option value="160+">160+ — Exceptional (Gênio/Excepcional)</option>
          </select>
          {data.cognitive?.iqRange && (
            <p className="font-mono text-[10px] text-amber-700 mt-2 italic">
              {data.cognitive.iqRange === 'below-70' && '💡 Dificuldades significativas de aprendizado. Precisa de suporte constante.'}
              {data.cognitive.iqRange === '70-84' && '💡 Aprende mais devagar. Pode ter dificuldades acadêmicas mas funciona bem no dia-a-dia.'}
              {data.cognitive.iqRange === '85-99' && '💡 Inteligência normal baixa. Consegue se virar mas não se destaca intelectualmente.'}
              {data.cognitive.iqRange === '100-114' && '💡 Inteligência típica. A maioria das pessoas está nessa faixa.'}
              {data.cognitive.iqRange === '115-129' && '💡 Notavelmente inteligente. Aprende rápido, destaca-se academicamente.'}
              {data.cognitive.iqRange === '130-144' && '💡 Superdotado. Top 2% da população. Pode ter dificuldade de se relacionar com pessoas "normais".'}
              {data.cognitive.iqRange === '145-159' && '💡 Altamente excepcional. Raramente encontra pares intelectuais.'}
              {data.cognitive.iqRange === '160+' && '💡 Gênio. Raríssimo. Pode parecer "estranho" para a maioria das pessoas.'}
            </p>
          )}
        </div>

        {/* Processing Speed */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">⚡ Velocidade de Processamento</h4>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Quão rápido processa informações e chega a conclusões.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Slow</span>
              <span>Fast</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={data.cognitive?.processingSpeed || 4}
              onChange={(e) => update('cognitive', 'processingSpeed', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-200 via-gray-200 to-yellow-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.cognitive?.processingSpeed || 4) <= 2 ? 'bg-blue-200 text-blue-800' :
                (data.cognitive?.processingSpeed || 4) <= 4 ? 'bg-gray-100 text-gray-700' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {(data.cognitive?.processingSpeed || 4) === 1 && 'Very Slow'}
                {(data.cognitive?.processingSpeed || 4) === 2 && 'Slow'}
                {(data.cognitive?.processingSpeed || 4) === 3 && 'Deliberate'}
                {(data.cognitive?.processingSpeed || 4) === 4 && 'Average'}
                {(data.cognitive?.processingSpeed || 4) === 5 && 'Quick'}
                {(data.cognitive?.processingSpeed || 4) === 6 && 'Fast'}
                {(data.cognitive?.processingSpeed || 4) === 7 && 'Lightning'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.cognitive?.processingSpeed || 4) <= 2 && '💡 Precisa de tempo para processar. Pode parecer "lerdo" mas às vezes chega a insights profundos.'}
              {(data.cognitive?.processingSpeed || 4) === 3 && '💡 Pensa antes de responder. Deliberado e cuidadoso.'}
              {(data.cognitive?.processingSpeed || 4) === 4 && '💡 Velocidade normal de pensamento.'}
              {(data.cognitive?.processingSpeed || 4) === 5 && '💡 Raciocínio ágil. Conecta pontos rapidamente.'}
              {(data.cognitive?.processingSpeed || 4) >= 6 && '💡 Mente extremamente rápida. Pode frustrar-se com pessoas mais lentas.'}
            </p>
          </div>
        </div>

        {/* Memory Types */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">🗃️ Tipos de Memória</h4>

          {/* Working Memory */}
          <div className="mb-4">
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Working Memory (Memória de Trabalho)</label>
            <p className="font-mono text-[9px] text-gray-400 mb-2">Capacidade de manter informações "na cabeça" enquanto trabalha com elas.</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(level => (
                <button
                  key={level}
                  onClick={() => update('cognitive', 'workingMemory', level)}
                  className={`flex-1 py-2 rounded font-mono text-xs transition-all ${
                    (data.cognitive?.workingMemory || 3) === level
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {level === 1 && 'Poor'}
                  {level === 2 && 'Below Avg'}
                  {level === 3 && 'Average'}
                  {level === 4 && 'Good'}
                  {level === 5 && 'Excellent'}
                </button>
              ))}
            </div>
          </div>

          {/* Long-term Memory */}
          <div className="mb-4">
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Long-term Memory (Memória de Longo Prazo)</label>
            <p className="font-mono text-[9px] text-gray-400 mb-2">Capacidade de reter informações ao longo do tempo.</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(level => (
                <button
                  key={level}
                  onClick={() => update('cognitive', 'longTermMemory', level)}
                  className={`flex-1 py-2 rounded font-mono text-xs transition-all ${
                    (data.cognitive?.longTermMemory || 3) === level
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {level === 1 && 'Poor'}
                  {level === 2 && 'Below Avg'}
                  {level === 3 && 'Average'}
                  {level === 4 && 'Good'}
                  {level === 5 && 'Excellent'}
                </button>
              ))}
            </div>
          </div>

          {/* Eidetic Memory */}
          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Eidetic/Photographic Memory (Memória Fotográfica)</label>
            <select
              value={data.cognitive?.eidetikMemory || ''}
              onChange={(e) => update('cognitive', 'eidetikMemory', e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
            >
              <option value="">-- Selecione --</option>
              <option value="none">No — Memória normal</option>
              <option value="partial">Partial — Em certas áreas (rostos, números, etc.)</option>
              <option value="strong">Strong — Memória visual muito forte</option>
              <option value="eidetic">Eidetic — Consegue "fotografar" mentalmente o que vê</option>
            </select>
          </div>
        </div>

        {/* Learning Style */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📚 Estilo de Aprendizagem</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como o personagem aprende melhor (modelo VARK).
          </p>
          <select
            value={data.cognitive?.learningStyle || ''}
            onChange={(e) => update('cognitive', 'learningStyle', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione --</option>
            <option value="visual">👁️ Visual — Aprende vendo: diagramas, gráficos, vídeos, demonstrações</option>
            <option value="auditory">👂 Auditory — Aprende ouvindo: palestras, discussões, podcasts</option>
            <option value="reading">📖 Reading/Writing — Aprende lendo e escrevendo: livros, anotações, textos</option>
            <option value="kinesthetic">🤲 Kinesthetic — Aprende fazendo: prática, experimentos, mãos na massa</option>
            <option value="multimodal">🔄 Multimodal — Combinação equilibrada de vários estilos</option>
          </select>
        </div>

        {/* Thinking Styles - Sliders */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">🎯 Estilos de Pensamento</h4>

          {/* Analytical vs Intuitive */}
          <div className="mb-6">
            <div className="flex justify-between font-mono text-[10px] text-gray-600 mb-2">
              <span>🔬 Analytical</span>
              <span>✨ Intuitive</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.cognitive?.analyticalIntuitive || 5}
              onChange={(e) => update('cognitive', 'analyticalIntuitive', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-300 via-gray-200 to-purple-300 rounded-lg appearance-none cursor-pointer"
            />
            <p className="font-mono text-[9px] text-gray-500 text-center mt-1">
              {(data.cognitive?.analyticalIntuitive || 5) <= 3 && 'Pensa em dados, fatos, lógica. Precisa de evidências.'}
              {(data.cognitive?.analyticalIntuitive || 5) === 4 && 'Tendência analítica mas confia em instintos às vezes.'}
              {(data.cognitive?.analyticalIntuitive || 5) === 5 && 'Equilíbrio entre análise e intuição.'}
              {(data.cognitive?.analyticalIntuitive || 5) === 6 && 'Tendência intuitiva mas busca razões quando necessário.'}
              {(data.cognitive?.analyticalIntuitive || 5) >= 7 && 'Confia em "gut feelings". Sabe sem saber explicar.'}
            </p>
          </div>

          {/* Convergent vs Divergent */}
          <div className="mb-6">
            <div className="flex justify-between font-mono text-[10px] text-gray-600 mb-2">
              <span>🎯 Convergent</span>
              <span>🌈 Divergent</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.cognitive?.convergentDivergent || 5}
              onChange={(e) => update('cognitive', 'convergentDivergent', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-green-300 via-gray-200 to-orange-300 rounded-lg appearance-none cursor-pointer"
            />
            <p className="font-mono text-[9px] text-gray-500 text-center mt-1">
              {(data.cognitive?.convergentDivergent || 5) <= 3 && 'Busca A resposta certa. Focado, linear, lógico.'}
              {(data.cognitive?.convergentDivergent || 5) === 5 && 'Alterna entre foco e exploração conforme necessário.'}
              {(data.cognitive?.convergentDivergent || 5) >= 7 && 'Gera múltiplas possibilidades. Criativo, associativo.'}
            </p>
          </div>

          {/* Abstract vs Concrete */}
          <div className="mb-6">
            <div className="flex justify-between font-mono text-[10px] text-gray-600 mb-2">
              <span>☁️ Abstract</span>
              <span>🧱 Concrete</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.cognitive?.abstractConcrete || 5}
              onChange={(e) => update('cognitive', 'abstractConcrete', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-indigo-300 via-gray-200 to-amber-300 rounded-lg appearance-none cursor-pointer"
            />
            <p className="font-mono text-[9px] text-gray-500 text-center mt-1">
              {(data.cognitive?.abstractConcrete || 5) <= 3 && 'Pensa em teorias, conceitos, filosofia. Mundo das ideias.'}
              {(data.cognitive?.abstractConcrete || 5) === 5 && 'Confortável com abstração e praticidade.'}
              {(data.cognitive?.abstractConcrete || 5) >= 7 && 'Pensa em coisas tangíveis, práticas, aplicáveis.'}
            </p>
          </div>

          {/* Street Smart vs Book Smart */}
          <div>
            <div className="flex justify-between font-mono text-[10px] text-gray-600 mb-2">
              <span>🏙️ Street Smart</span>
              <span>📚 Book Smart</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.cognitive?.streetBookSmart || 5}
              onChange={(e) => update('cognitive', 'streetBookSmart', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-slate-400 via-gray-200 to-emerald-400 rounded-lg appearance-none cursor-pointer"
            />
            <p className="font-mono text-[9px] text-gray-500 text-center mt-1">
              {(data.cognitive?.streetBookSmart || 5) <= 3 && 'Inteligência prática. Sabe se virar, ler pessoas, sobreviver.'}
              {(data.cognitive?.streetBookSmart || 5) === 5 && 'Equilíbrio entre conhecimento acadêmico e prático.'}
              {(data.cognitive?.streetBookSmart || 5) >= 7 && 'Inteligência acadêmica. Muito conhecimento formal, talvez ingênuo.'}
            </p>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: MULTIPLE INTELLIGENCES ==========
    1: (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-indigo-900 mb-2">🎭 INTELIGÊNCIAS MÚLTIPLAS</h3>
          <p className="font-mono text-xs text-indigo-800 leading-relaxed">
            Teoria de Howard Gardner: existem múltiplas formas de inteligência além do QI tradicional.
            Uma pessoa pode ser brilhante em uma área e mediana em outras. Classifique de 1-9.
          </p>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 gap-4">

          {/* Logical-Mathematical */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🧮</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Logical-Mathematical</h4>
                <p className="font-mono text-[9px] text-gray-500">Números, padrões, raciocínio lógico, problemas abstratos</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.logical || 5}
              onChange={(e) => update('multipleIntelligences', 'logical', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-blue-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-blue-600">{data.multipleIntelligences?.logical || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Linguistic-Verbal */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📝</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Linguistic-Verbal</h4>
                <p className="font-mono text-[9px] text-gray-500">Palavras, linguagem, escrita, oratória, idiomas</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.linguistic || 5}
              onChange={(e) => update('multipleIntelligences', 'linguistic', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-amber-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-amber-600">{data.multipleIntelligences?.linguistic || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Visual-Spatial */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-purple-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎨</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Visual-Spatial</h4>
                <p className="font-mono text-[9px] text-gray-500">Imagens, espaço, design, navegação, visualização 3D</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.spatial || 5}
              onChange={(e) => update('multipleIntelligences', 'spatial', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-purple-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-purple-600">{data.multipleIntelligences?.spatial || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Musical-Rhythmic */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-pink-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎵</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Musical-Rhythmic</h4>
                <p className="font-mono text-[9px] text-gray-500">Música, ritmo, tom, melodia, composição</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.musical || 5}
              onChange={(e) => update('multipleIntelligences', 'musical', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-pink-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-pink-600">{data.multipleIntelligences?.musical || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Bodily-Kinesthetic */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏃</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Bodily-Kinesthetic</h4>
                <p className="font-mono text-[9px] text-gray-500">Corpo, movimento, coordenação, esportes, dança, artesanato</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.bodily || 5}
              onChange={(e) => update('multipleIntelligences', 'bodily', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-orange-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-orange-600">{data.multipleIntelligences?.bodily || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Naturalistic */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-green-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌿</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Naturalistic</h4>
                <p className="font-mono text-[9px] text-gray-500">Natureza, plantas, animais, ecossistemas, classificação</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.naturalistic || 5}
              onChange={(e) => update('multipleIntelligences', 'naturalistic', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-green-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-green-600">{data.multipleIntelligences?.naturalistic || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Interpersonal */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-cyan-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">👥</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Interpersonal</h4>
                <p className="font-mono text-[9px] text-gray-500">Entender outros, empatia, liderança, trabalho em equipe</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.interpersonal || 5}
              onChange={(e) => update('multipleIntelligences', 'interpersonal', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-cyan-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-cyan-600">{data.multipleIntelligences?.interpersonal || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Intrapersonal */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-violet-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🧘</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Intrapersonal</h4>
                <p className="font-mono text-[9px] text-gray-500">Autoconhecimento, introspecção, entender próprias emoções</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.intrapersonal || 5}
              onChange={(e) => update('multipleIntelligences', 'intrapersonal', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-violet-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-violet-600">{data.multipleIntelligences?.intrapersonal || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>

          {/* Existential */}
          <div className="border border-gray-200 rounded-sm p-4 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">❓</span>
              <div>
                <h4 className="font-mono text-sm font-bold text-gray-800">Existential <span className="text-[9px] text-gray-400">(9ª inteligência proposta)</span></h4>
                <p className="font-mono text-[9px] text-gray-500">Questões existenciais, filosofia, significado da vida, espiritualidade</p>
              </div>
            </div>
            <input
              type="range" min="1" max="9"
              value={data.multipleIntelligences?.existential || 5}
              onChange={(e) => update('multipleIntelligences', 'existential', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-200 to-slate-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
              <span>1 - Baixo</span>
              <span className="font-bold text-slate-600">{data.multipleIntelligences?.existential || 5}</span>
              <span>9 - Alto</span>
            </div>
          </div>
        </div>

        {/* Intelligence Profile Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-3">📊 Perfil de Inteligências</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { key: 'logical', label: '🧮 Log-Mat', color: 'blue' },
              { key: 'linguistic', label: '📝 Ling', color: 'amber' },
              { key: 'spatial', label: '🎨 Spatial', color: 'purple' },
              { key: 'musical', label: '🎵 Music', color: 'pink' },
              { key: 'bodily', label: '🏃 Body', color: 'orange' },
              { key: 'naturalistic', label: '🌿 Nature', color: 'green' },
              { key: 'interpersonal', label: '👥 Inter', color: 'cyan' },
              { key: 'intrapersonal', label: '🧘 Intra', color: 'violet' },
              { key: 'existential', label: '❓ Exist', color: 'slate' },
            ].map(item => {
              const value = data.multipleIntelligences?.[item.key] || 5;
              return (
                <div key={item.key} className={`p-2 rounded ${
                  value >= 7 ? `bg-${item.color}-200` :
                  value <= 3 ? 'bg-gray-200' :
                  'bg-gray-100'
                }`}>
                  <div className="font-mono text-[10px]">{item.label}</div>
                  <div className={`font-mono text-lg font-bold ${
                    value >= 7 ? `text-${item.color}-700` :
                    value <= 3 ? 'text-gray-500' :
                    'text-gray-600'
                  }`}>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: SKILLS & TALENTS ==========
    2: (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-emerald-900 mb-2">🛠️ SKILLS & TALENTOS</h3>
          <p className="font-mono text-xs text-emerald-800 leading-relaxed">
            Habilidades práticas e técnicas que o personagem possui. Inclui tanto hard skills
            (habilidades técnicas mensuráveis) quanto soft skills (habilidades interpessoais).
          </p>
        </div>

        {/* Tech Skills */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💻 Tech Skills</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades tecnológicas e digitais. Selecione até 8.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Programming', 'Web Development', 'Mobile Dev', 'Data Science', 'AI/Machine Learning',
              'Cybersecurity', 'Networking', 'Database Admin', 'Cloud Computing', 'DevOps',
              'UI/UX Design', 'Hardware Repair', 'Video Editing', 'Audio Production', '3D Modeling',
              'Game Development', 'Automation', 'SEO/Marketing Digital', 'IT Support', 'Blockchain'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => toggleArrayItem('skills', 'techSkills', skill, 8)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.skills?.techSkills || []).includes(skill)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.skills?.techSkills || []).length}/8</p>
        </div>

        {/* Creative Skills */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎨 Creative Skills</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades artísticas e criativas. Selecione até 8.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Drawing', 'Painting', 'Sculpture', 'Photography', 'Cinematography', 'Animation',
              'Graphic Design', 'Fashion Design', 'Interior Design', 'Architecture',
              'Creative Writing', 'Poetry', 'Screenwriting', 'Journalism',
              'Music Composition', 'Singing', 'Instrument (String)', 'Instrument (Wind)', 'Instrument (Percussion)', 'Instrument (Keys)',
              'Acting', 'Voice Acting', 'Directing', 'Choreography', 'Dance'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => toggleArrayItem('skills', 'creativeSkills', skill, 8)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.skills?.creativeSkills || []).includes(skill)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.skills?.creativeSkills || []).length}/8</p>
        </div>

        {/* Physical Skills */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💪 Physical Skills</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades físicas e manuais. Selecione até 8.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Martial Arts', 'Boxing', 'Wrestling', 'Fencing', 'Archery', 'Shooting',
              'Swimming', 'Diving', 'Running', 'Cycling', 'Climbing', 'Parkour',
              'Gymnastics', 'Yoga', 'Pilates', 'Dance (Ballet)', 'Dance (Hip-Hop)', 'Dance (Ballroom)',
              'Team Sports', 'Extreme Sports', 'Surfing', 'Skiing', 'Skateboarding',
              'Woodworking', 'Metalworking', 'Mechanics', 'Cooking', 'Baking', 'Sewing',
              'Gardening', 'Carpentry', 'Plumbing', 'Electrical Work'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => toggleArrayItem('skills', 'physicalSkills', skill, 8)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.skills?.physicalSkills || []).includes(skill)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.skills?.physicalSkills || []).length}/8</p>
        </div>

        {/* Professional Skills */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💼 Professional Skills</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades profissionais e de negócios. Selecione até 8.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Accounting', 'Finance', 'Investment', 'Legal/Law', 'Contract Negotiation',
              'Project Management', 'Business Strategy', 'Entrepreneurship', 'Sales', 'Marketing',
              'Public Relations', 'Human Resources', 'Recruiting', 'Training',
              'Medicine', 'Nursing', 'Psychology', 'Therapy', 'Veterinary',
              'Teaching', 'Research', 'Data Analysis', 'Statistics',
              'Engineering', 'Science', 'Consulting', 'Real Estate'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => toggleArrayItem('skills', 'professionalSkills', skill, 8)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.skills?.professionalSkills || []).includes(skill)
                    ? 'bg-slate-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.skills?.professionalSkills || []).length}/8</p>
        </div>

        {/* Survival Skills */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏕️ Survival Skills</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades de sobrevivência e autossuficiência. Selecione até 6.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'First Aid', 'CPR', 'Wilderness Survival', 'Navigation', 'Tracking',
              'Hunting', 'Fishing', 'Foraging', 'Shelter Building', 'Fire Making',
              'Self-Defense', 'Weapons Handling', 'Driving', 'Flying', 'Sailing',
              'Emergency Response', 'Crisis Management', 'Stealth', 'Escape/Evasion'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => toggleArrayItem('skills', 'survivalSkills', skill, 6)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.skills?.survivalSkills || []).includes(skill)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.skills?.survivalSkills || []).length}/6</p>
        </div>

        {/* Social Skills */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗣️ Social Skills</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades interpessoais e comunicativas. Selecione até 6.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Public Speaking', 'Negotiation', 'Persuasion', 'Debate', 'Mediation',
              'Active Listening', 'Networking', 'Interviewing', 'Conflict Resolution',
              'Leadership', 'Team Building', 'Mentoring', 'Coaching',
              'Empathy', 'Reading People', 'Deception Detection', 'Charm/Seduction',
              'Small Talk', 'Storytelling', 'Humor'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => toggleArrayItem('skills', 'socialSkills', skill, 6)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.skills?.socialSkills || []).includes(skill)
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.skills?.socialSkills || []).length}/6</p>
        </div>

        {/* Hidden Talents */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">✨ Talentos Ocultos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades que o personagem tem mas que poucas pessoas sabem.</p>
          <textarea
            value={data.skills?.hiddenTalents || ''}
            onChange={(e) => update('skills', 'hiddenTalents', e.target.value)}
            placeholder="Ex: Sabe cantar ópera mas tem vergonha, é excelente em xadrez mas esconde, etc."
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
          />
        </div>

        {/* Notable Weaknesses */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚠️ Fraquezas Notáveis</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Coisas em que o personagem é particularmente ruim ou incapaz.</p>
          <textarea
            value={data.skills?.notableWeaknesses || ''}
            onChange={(e) => update('skills', 'notableWeaknesses', e.target.value)}
            placeholder="Ex: Péssimo com direções, não sabe cozinhar nada, terrível com tecnologia, etc."
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
          />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: KNOWLEDGE & INTERESTS ==========
    3: (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">📚 CONHECIMENTO & INTERESSES</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">
            O que o personagem sabe, o que o interessa intelectualmente, e como consome informação.
          </p>
        </div>

        {/* Areas of Expertise */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎓 Áreas de Expertise</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Campos onde o personagem é especialista ou muito conhecedor. Até 5.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'History', 'Philosophy', 'Psychology', 'Sociology', 'Anthropology', 'Political Science',
              'Economics', 'Business', 'Law', 'Medicine', 'Biology', 'Chemistry', 'Physics',
              'Mathematics', 'Computer Science', 'Engineering', 'Architecture',
              'Literature', 'Languages', 'Linguistics', 'Art History', 'Music Theory', 'Film Studies',
              'Religion', 'Theology', 'Mythology', 'Occult/Esoteric', 'Astrology',
              'Geography', 'Geology', 'Ecology', 'Astronomy', 'Meteorology',
              'Cuisine/Gastronomy', 'Wine/Beverages', 'Fashion', 'Sports', 'Games',
              'Military History', 'Weapons', 'True Crime', 'Forensics',
              'Local History', 'Pop Culture', 'Internet Culture', 'Subcultures'
            ].map(area => (
              <button
                key={area}
                onClick={() => toggleArrayItem('knowledge', 'expertiseAreas', area, 5)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.knowledge?.expertiseAreas || []).includes(area)
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.knowledge?.expertiseAreas || []).length}/5</p>
        </div>

        {/* Intellectual Interests */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💭 Interesses Intelectuais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Tópicos que o personagem gosta de pensar, discutir ou aprender sobre. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Philosophy of Mind', 'Ethics/Morality', 'Politics', 'Social Issues', 'Environment',
              'Futurism', 'Technology Trends', 'AI/Robotics', 'Space Exploration', 'Transhumanism',
              'Human Behavior', 'Relationships', 'Sexuality', 'Gender Studies', 'Identity',
              'Consciousness', 'Dreams', 'Death/Mortality', 'Meaning of Life', 'Free Will',
              'Evolution', 'Quantum Physics', 'Cosmology', 'Time', 'Parallel Universes',
              'Ancient Civilizations', 'Mysteries/Unexplained', 'Conspiracy Theories', 'Paranormal',
              'Art Movements', 'Music Genres', 'Cinema', 'Theatre', 'Dance',
              'Travel/Cultures', 'Food/Cuisine', 'Fashion Evolution', 'Design', 'Architecture',
              'Self-Improvement', 'Productivity', 'Creativity', 'Innovation', 'Entrepreneurship',
              'Health/Wellness', 'Longevity', 'Nutrition', 'Exercise Science', 'Mental Health'
            ].map(interest => (
              <button
                key={interest}
                onClick={() => toggleArrayItem('knowledge', 'intellectualInterests', interest, 8)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.knowledge?.intellectualInterests || []).includes(interest)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.knowledge?.intellectualInterests || []).length}/8</p>
        </div>

        {/* Currently Learning */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📖 Aprendendo Atualmente</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que o personagem está estudando ou tentando aprender no momento.</p>
          <textarea
            value={data.knowledge?.currentlyLearning || ''}
            onChange={(e) => update('knowledge', 'currentlyLearning', e.target.value)}
            placeholder="Ex: Tentando aprender japonês, fazendo curso de fotografia online, estudando para certificação..."
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
          />
        </div>

        {/* Information Diet */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📱 Dieta de Informação</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como o personagem consome informação. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Books (Fiction)', 'Books (Non-fiction)', 'Academic Papers', 'News Sites',
              'Newspapers (Print)', 'Magazines', 'Podcasts', 'Audiobooks', 'YouTube',
              'Documentaries', 'Online Courses', 'TED Talks', 'Lectures', 'Webinars',
              'Social Media', 'Reddit/Forums', 'Newsletters', 'Blogs', 'Wikipedia',
              'TV News', 'Radio', 'Conversations', 'Word of Mouth', 'Doesn\'t Consume Much'
            ].map(source => (
              <button
                key={source}
                onClick={() => toggleArrayItem('knowledge', 'informationDiet', source, 6)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${
                  (data.knowledge?.informationDiet || []).includes(source)
                    ? 'bg-violet-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2">Selecionados: {(data.knowledge?.informationDiet || []).length}/6</p>
        </div>

        {/* Curiosity Level */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔍 Nível de Curiosidade</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Quão curioso o personagem é por natureza.</p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Incurious</span>
              <span>Curious</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.knowledge?.curiosityLevel || 5}
              onChange={(e) => update('knowledge', 'curiosityLevel', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-300 via-yellow-200 to-yellow-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.knowledge?.curiosityLevel || 5) <= 3 ? 'bg-gray-200 text-gray-700' :
                (data.knowledge?.curiosityLevel || 5) <= 6 ? 'bg-yellow-100 text-yellow-700' :
                'bg-yellow-300 text-yellow-900'
              }`}>
                {(data.knowledge?.curiosityLevel || 5) === 1 && 'Apático'}
                {(data.knowledge?.curiosityLevel || 5) === 2 && 'Desinteressado'}
                {(data.knowledge?.curiosityLevel || 5) === 3 && 'Pouco Curioso'}
                {(data.knowledge?.curiosityLevel || 5) === 4 && 'Levemente Curioso'}
                {(data.knowledge?.curiosityLevel || 5) === 5 && 'Moderadamente Curioso'}
                {(data.knowledge?.curiosityLevel || 5) === 6 && 'Curioso'}
                {(data.knowledge?.curiosityLevel || 5) === 7 && 'Muito Curioso'}
                {(data.knowledge?.curiosityLevel || 5) === 8 && 'Extremamente Curioso'}
                {(data.knowledge?.curiosityLevel || 5) === 9 && 'Insaciavelmente Curioso'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.knowledge?.curiosityLevel || 5) <= 3 && '💡 Aceita o mundo como é. Não questiona, não busca saber mais.'}
              {(data.knowledge?.curiosityLevel || 5) === 4 || (data.knowledge?.curiosityLevel || 5) === 5 && '💡 Curiosidade normal. Pergunta quando algo interessa.'}
              {(data.knowledge?.curiosityLevel || 5) === 6 || (data.knowledge?.curiosityLevel || 5) === 7 && '💡 Gosta de aprender, faz perguntas, busca entender.'}
              {(data.knowledge?.curiosityLevel || 5) >= 8 && '💡 Mente inquieta. Sempre quer saber mais. Pode ser visto como intrometido.'}
            </p>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 4: EDUCATION ==========
    4: (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-rose-50 border border-rose-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-rose-900 mb-2">🎓 EDUCAÇÃO & FORMAÇÃO</h3>
          <p className="font-mono text-xs text-rose-800 leading-relaxed">
            Histórico educacional completo: instituições frequentadas, cursos, diplomas e certificações.
            Use os botões "+ Adicionar" para criar entradas detalhadas.
          </p>
        </div>

        {/* Highest Education Level */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📜 Nível Educacional Mais Alto</h4>
          <select
            value={data.education?.highestLevel || ''}
            onChange={(e) => update('education', 'highestLevel', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione --</option>
            <option value="none">Nenhuma educação formal</option>
            <option value="elementary-incomplete">Fundamental Incompleto</option>
            <option value="elementary">Fundamental Completo</option>
            <option value="highschool-incomplete">Ensino Médio Incompleto</option>
            <option value="highschool">Ensino Médio Completo</option>
            <option value="technical">Curso Técnico</option>
            <option value="college-incomplete">Superior Incompleto (Trancou/Abandonou)</option>
            <option value="college">Superior Completo (Graduação)</option>
            <option value="postgrad">Pós-Graduação / Especialização</option>
            <option value="masters">Mestrado</option>
            <option value="doctorate">Doutorado (PhD)</option>
            <option value="postdoc">Pós-Doutorado</option>
            <option value="homeschool">Educação Domiciliar (Homeschool)</option>
            <option value="alternative">Educação Alternativa</option>
          </select>
        </div>

        {/* School Performance */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📊 Desempenho Escolar Geral</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como era/é como aluno de forma geral.</p>
          <select
            value={data.education?.schoolPerformance || ''}
            onChange={(e) => update('education', 'schoolPerformance', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione --</option>
            <option value="top">Top da Classe — Sempre entre os melhores, medalhas, honras</option>
            <option value="excellent">Excelente — Notas altas, bom comportamento, elogiado</option>
            <option value="good">Bom Aluno — Acima da média, esforçado</option>
            <option value="average">Médio — Notas na média, passou sem destaque</option>
            <option value="below-average">Abaixo da Média — Dificuldades, notas baixas</option>
            <option value="struggling">Lutando — Reprovações, recuperações constantes</option>
            <option value="dropout">Desistente — Abandonou os estudos</option>
            <option value="expelled">Expulso — Problemas disciplinares graves</option>
            <option value="smart-underachiever">Inteligente Mas Não Se Esforçava — Potencial desperdiçado</option>
            <option value="late-bloomer">Desabrochou Tarde — Começou mal, melhorou depois</option>
            <option value="specific-talent">Bom em Uma Área Específica — Excelente em uma matéria, ruim nas outras</option>
          </select>
        </div>

        {/* =============== INSTITUTIONS SECTION =============== */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-mono text-sm font-bold text-gray-800">🏫 Instituições de Ensino</h4>
              <p className="font-mono text-[10px] text-gray-500">Escolas, universidades e outras instituições frequentadas.</p>
            </div>
            <button
              onClick={() => {
                const current = data.education?.institutions || [];
                if (current.length < 5) {
                  update('education', 'institutions', [...current, {
                    name: '',
                    type: '',
                    prestige: '',
                    years: '',
                    status: ''
                  }]);
                }
              }}
              className="px-3 py-1 bg-rose-500 text-white rounded font-mono text-xs hover:bg-rose-600 transition-colors"
            >
              + Adicionar
            </button>
          </div>

          {/* Institution Type Explanation */}
          <details className="mb-4 bg-white rounded p-2 border border-rose-200">
            <summary className="font-mono text-[10px] text-rose-700 cursor-pointer">ℹ️ Tipos de Instituição (clique para ver)</summary>
            <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[9px] text-gray-600">
              <div><strong>Public School:</strong> Escola pública, gratuita, mantida pelo governo</div>
              <div><strong>Private School:</strong> Escola particular, paga, geralmente melhor estrutura</div>
              <div><strong>Religious School:</strong> Escola confessional (católica, evangélica, etc.)</div>
              <div><strong>Military School:</strong> Colégio militar, disciplina rígida, hierarquia</div>
              <div><strong>Boarding School:</strong> Internato, alunos moram na escola</div>
              <div><strong>International School:</strong> Currículo internacional (IB, americano, etc.)</div>
              <div><strong>Charter School:</strong> Escola autônoma com financiamento público (EUA)</div>
              <div><strong>Magnet School:</strong> Escola especializada em uma área (artes, ciências)</div>
              <div><strong>Vocational/Technical:</strong> Escola técnica, foco em habilidades práticas</div>
              <div><strong>Community College:</strong> Faculdade comunitária (EUA), 2 anos</div>
              <div><strong>State University:</strong> Universidade pública estadual</div>
              <div><strong>Federal University:</strong> Universidade federal (Brasil)</div>
              <div><strong>Private University:</strong> Universidade particular</div>
              <div><strong>Ivy League/Elite:</strong> Universidades de elite (Harvard, MIT, etc.)</div>
              <div><strong>Online/Distance:</strong> Educação à distância, EAD</div>
              <div><strong>Trade School:</strong> Escola de ofícios (mecânica, culinária, etc.)</div>
            </div>
          </details>

          {/* Prestige Explanation */}
          <details className="mb-4 bg-white rounded p-2 border border-rose-200">
            <summary className="font-mono text-[10px] text-rose-700 cursor-pointer">ℹ️ Níveis de Prestígio (clique para ver)</summary>
            <div className="mt-2 space-y-1 font-mono text-[9px] text-gray-600">
              <div><strong>⭐ Unknown/Local:</strong> Instituição desconhecida fora da região, sem reputação especial</div>
              <div><strong>⭐⭐ Average:</strong> Instituição comum, reputação média, reconhecida localmente</div>
              <div><strong>⭐⭐⭐ Respected:</strong> Boa reputação, reconhecida regionalmente, diploma valorizado</div>
              <div><strong>⭐⭐⭐⭐ Prestigious:</strong> Alta reputação, reconhecida nacionalmente, abre portas</div>
              <div><strong>⭐⭐⭐⭐⭐ Elite/World-Class:</strong> Elite mundial (Ivy League, Oxbridge, etc.), top do ranking</div>
            </div>
          </details>

          {/* Institution List */}
          {(data.education?.institutions || []).length === 0 ? (
            <p className="font-mono text-[10px] text-gray-400 italic text-center py-4">
              Nenhuma instituição adicionada. Clique em "+ Adicionar" para começar.
            </p>
          ) : (
            <div className="space-y-3">
              {(data.education?.institutions || []).map((inst, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-sm p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] text-gray-500">Instituição #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = [...(data.education?.institutions || [])];
                        updated.splice(idx, 1);
                        update('education', 'institutions', updated);
                      }}
                      className="text-red-500 hover:text-red-700 font-mono text-xs"
                    >
                      ✕ Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Institution Name */}
                    <div className="md:col-span-2">
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Nome da Instituição</label>
                      <input
                        type="text"
                        value={inst.name || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.institutions || [])];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          update('education', 'institutions', updated);
                        }}
                        placeholder="Ex: Harvard University, Colégio São Bento, UFMG..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-xs"
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Tipo</label>
                      <select
                        value={inst.type || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.institutions || [])];
                          updated[idx] = { ...updated[idx], type: e.target.value };
                          update('education', 'institutions', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Tipo --</option>
                        <optgroup label="Educação Básica">
                          <option value="public-school">Public School (Escola Pública)</option>
                          <option value="private-school">Private School (Escola Particular)</option>
                          <option value="religious-school">Religious School (Escola Religiosa)</option>
                          <option value="military-school">Military School (Colégio Militar)</option>
                          <option value="boarding-school">Boarding School (Internato)</option>
                          <option value="international-school">International School</option>
                          <option value="charter-school">Charter School</option>
                          <option value="magnet-school">Magnet School (Especializada)</option>
                          <option value="homeschool">Homeschool (Educação Domiciliar)</option>
                        </optgroup>
                        <optgroup label="Ensino Técnico">
                          <option value="vocational">Vocational/Technical School</option>
                          <option value="trade-school">Trade School (Escola de Ofícios)</option>
                        </optgroup>
                        <optgroup label="Ensino Superior">
                          <option value="community-college">Community College</option>
                          <option value="state-university">State/Public University</option>
                          <option value="federal-university">Federal University</option>
                          <option value="private-university">Private University</option>
                          <option value="ivy-league">Ivy League / Elite University</option>
                          <option value="art-school">Art School / Conservatory</option>
                          <option value="online-university">Online University / EAD</option>
                        </optgroup>
                        <optgroup label="Outros">
                          <option value="academy">Academy / Training Center</option>
                          <option value="seminary">Seminary (Seminário Religioso)</option>
                          <option value="research-institute">Research Institute</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Prestige */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Prestígio</label>
                      <select
                        value={inst.prestige || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.institutions || [])];
                          updated[idx] = { ...updated[idx], prestige: e.target.value };
                          update('education', 'institutions', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Prestígio --</option>
                        <option value="1-unknown">⭐ Unknown/Local</option>
                        <option value="2-average">⭐⭐ Average</option>
                        <option value="3-respected">⭐⭐⭐ Respected</option>
                        <option value="4-prestigious">⭐⭐⭐⭐ Prestigious</option>
                        <option value="5-elite">⭐⭐⭐⭐⭐ Elite/World-Class</option>
                      </select>
                    </div>

                    {/* Years */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Período</label>
                      <input
                        type="text"
                        value={inst.years || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.institutions || [])];
                          updated[idx] = { ...updated[idx], years: e.target.value };
                          update('education', 'institutions', updated);
                        }}
                        placeholder="Ex: 2010-2014, 2018-presente"
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Status</label>
                      <select
                        value={inst.status || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.institutions || [])];
                          updated[idx] = { ...updated[idx], status: e.target.value };
                          update('education', 'institutions', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Status --</option>
                        <option value="completed">✓ Completed (Concluído)</option>
                        <option value="in-progress">📚 In Progress (Cursando)</option>
                        <option value="incomplete">⚠️ Incomplete (Trancou)</option>
                        <option value="dropped">✗ Dropped Out (Abandonou)</option>
                        <option value="expelled">🚫 Expelled (Expulso)</option>
                        <option value="transferred">→ Transferred (Transferiu)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="font-mono text-[9px] text-gray-400 mt-2">
            {(data.education?.institutions || []).length}/5 instituições
          </p>
        </div>

        {/* =============== DEGREES SECTION =============== */}
        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-mono text-sm font-bold text-gray-800">📜 Cursos & Diplomas</h4>
              <p className="font-mono text-[10px] text-gray-500">Formações acadêmicas completadas ou em andamento.</p>
            </div>
            <button
              onClick={() => {
                const current = data.education?.degrees || [];
                if (current.length < 5) {
                  update('education', 'degrees', [...current, {
                    level: '',
                    field: '',
                    specialization: '',
                    status: ''
                  }]);
                }
              }}
              className="px-3 py-1 bg-indigo-500 text-white rounded font-mono text-xs hover:bg-indigo-600 transition-colors"
            >
              + Adicionar
            </button>
          </div>

          {/* Degree Level Explanation */}
          <details className="mb-4 bg-white rounded p-2 border border-indigo-200">
            <summary className="font-mono text-[10px] text-indigo-700 cursor-pointer">ℹ️ Níveis de Formação (clique para ver)</summary>
            <div className="mt-2 space-y-1 font-mono text-[9px] text-gray-600">
              <div><strong>Technical Certificate:</strong> Certificado técnico, cursos profissionalizantes (6 meses - 2 anos)</div>
              <div><strong>Associate Degree:</strong> Grau de associado (EUA), curso superior de 2 anos</div>
              <div><strong>Bachelor's Degree:</strong> Bacharelado/Licenciatura, graduação típica (4-5 anos)</div>
              <div><strong>Postgraduate/Specialization:</strong> Pós-graduação lato sensu, especialização (1-2 anos após graduação)</div>
              <div><strong>Master's Degree (MA/MS/MBA):</strong> Mestrado, pós-graduação stricto sensu (2 anos)</div>
              <div><strong>Doctorate (PhD):</strong> Doutorado, mais alto grau acadêmico (3-6 anos)</div>
              <div><strong>Post-Doctorate:</strong> Pós-doutorado, pesquisa após PhD</div>
              <div><strong>Professional Degree:</strong> Graus profissionais como MD (medicina), JD (direito)</div>
            </div>
          </details>

          {/* Degrees List */}
          {(data.education?.degrees || []).length === 0 ? (
            <p className="font-mono text-[10px] text-gray-400 italic text-center py-4">
              Nenhum curso/diploma adicionado. Clique em "+ Adicionar" para começar.
            </p>
          ) : (
            <div className="space-y-3">
              {(data.education?.degrees || []).map((degree, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-sm p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] text-gray-500">Formação #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = [...(data.education?.degrees || [])];
                        updated.splice(idx, 1);
                        update('education', 'degrees', updated);
                      }}
                      className="text-red-500 hover:text-red-700 font-mono text-xs"
                    >
                      ✕ Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Level */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Nível</label>
                      <select
                        value={degree.level || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.degrees || [])];
                          updated[idx] = { ...updated[idx], level: e.target.value };
                          update('education', 'degrees', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Nível --</option>
                        <option value="technical">Technical Certificate (Técnico)</option>
                        <option value="associate">Associate Degree (Tecnólogo)</option>
                        <option value="bachelor">Bachelors Degree (Bacharelado)</option>
                        <option value="licensure">Licensure (Licenciatura)</option>
                        <option value="postgrad">Postgraduate (Pós-Graduação)</option>
                        <option value="mba">MBA</option>
                        <option value="masters">Masters Degree (Mestrado)</option>
                        <option value="doctorate">Doctorate/PhD (Doutorado)</option>
                        <option value="postdoc">Post-Doctorate (Pós-Doc)</option>
                        <option value="medical">MD (Medicina)</option>
                        <option value="law">JD (Direito)</option>
                      </select>
                    </div>

                    {/* Field of Study */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Área</label>
                      <select
                        value={degree.field || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.degrees || [])];
                          updated[idx] = { ...updated[idx], field: e.target.value };
                          update('education', 'degrees', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Área --</option>
                        <optgroup label="Exatas & Tecnologia">
                          <option value="computer-science">Computer Science</option>
                          <option value="engineering">Engineering</option>
                          <option value="mathematics">Mathematics</option>
                          <option value="physics">Physics</option>
                          <option value="chemistry">Chemistry</option>
                          <option value="data-science">Data Science</option>
                          <option value="information-systems">Information Systems</option>
                        </optgroup>
                        <optgroup label="Ciências Biológicas & Saúde">
                          <option value="medicine">Medicine</option>
                          <option value="nursing">Nursing</option>
                          <option value="biology">Biology</option>
                          <option value="psychology">Psychology</option>
                          <option value="pharmacy">Pharmacy</option>
                          <option value="dentistry">Dentistry</option>
                          <option value="veterinary">Veterinary Medicine</option>
                          <option value="physical-therapy">Physical Therapy</option>
                          <option value="nutrition">Nutrition</option>
                          <option value="public-health">Public Health</option>
                        </optgroup>
                        <optgroup label="Humanas & Sociais">
                          <option value="law">Law</option>
                          <option value="business">Business Administration</option>
                          <option value="economics">Economics</option>
                          <option value="accounting">Accounting</option>
                          <option value="marketing">Marketing</option>
                          <option value="history">History</option>
                          <option value="philosophy">Philosophy</option>
                          <option value="sociology">Sociology</option>
                          <option value="political-science">Political Science</option>
                          <option value="international-relations">International Relations</option>
                          <option value="journalism">Journalism</option>
                          <option value="communications">Communications</option>
                          <option value="education">Education</option>
                          <option value="social-work">Social Work</option>
                        </optgroup>
                        <optgroup label="Artes & Design">
                          <option value="fine-arts">Fine Arts</option>
                          <option value="design">Design</option>
                          <option value="architecture">Architecture</option>
                          <option value="music">Music</option>
                          <option value="theater">Theater / Performing Arts</option>
                          <option value="film">Film / Cinema</option>
                          <option value="fashion">Fashion Design</option>
                        </optgroup>
                        <optgroup label="Linguagens">
                          <option value="literature">Literature</option>
                          <option value="linguistics">Linguistics</option>
                          <option value="translation">Translation</option>
                          <option value="languages">Foreign Languages</option>
                        </optgroup>
                        <optgroup label="Outros">
                          <option value="military">Military Science</option>
                          <option value="theology">Theology</option>
                          <option value="environmental">Environmental Science</option>
                          <option value="agriculture">Agriculture</option>
                          <option value="sports">Sports / Physical Education</option>
                          <option value="hospitality">Hospitality / Tourism</option>
                          <option value="culinary">Culinary Arts</option>
                          <option value="other">Other (Outro)</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Specialization */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Especialização (opcional)</label>
                      <input
                        type="text"
                        value={degree.specialization || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.degrees || [])];
                          updated[idx] = { ...updated[idx], specialization: e.target.value };
                          update('education', 'degrees', updated);
                        }}
                        placeholder="Ex: Neurociência, Direito Tributário, Machine Learning..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Status</label>
                      <select
                        value={degree.status || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.degrees || [])];
                          updated[idx] = { ...updated[idx], status: e.target.value };
                          update('education', 'degrees', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Status --</option>
                        <option value="completed">✓ Completed (Formado)</option>
                        <option value="in-progress">📚 In Progress (Cursando)</option>
                        <option value="incomplete">⚠️ Incomplete (Trancou)</option>
                        <option value="dropped">✗ Dropped Out (Abandonou)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="font-mono text-[9px] text-gray-400 mt-2">
            {(data.education?.degrees || []).length}/5 cursos
          </p>
        </div>

        {/* =============== CERTIFICATIONS SECTION =============== */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-mono text-sm font-bold text-gray-800">📋 Certificações & Licenças</h4>
              <p className="font-mono text-[10px] text-gray-500">Certificados profissionais, licenças e credenciais.</p>
            </div>
            <button
              onClick={() => {
                const current = data.education?.certifications || [];
                if (current.length < 8) {
                  update('education', 'certifications', [...current, {
                    type: '',
                    name: '',
                    issuer: '',
                    status: ''
                  }]);
                }
              }}
              className="px-3 py-1 bg-amber-500 text-white rounded font-mono text-xs hover:bg-amber-600 transition-colors"
            >
              + Adicionar
            </button>
          </div>

          {/* Certification Types Explanation */}
          <details className="mb-4 bg-white rounded p-2 border border-amber-200">
            <summary className="font-mono text-[10px] text-amber-700 cursor-pointer">ℹ️ Tipos de Certificação (clique para ver)</summary>
            <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[9px] text-gray-600">
              <div><strong>Professional License:</strong> Licença para exercer profissão (OAB, CRM, CREA, CRP)</div>
              <div><strong>Industry Certification:</strong> Certificação da indústria (AWS, Cisco, PMP)</div>
              <div><strong>Trade License:</strong> Licença de ofício (eletricista, encanador)</div>
              <div><strong>Teaching Credential:</strong> Credencial para lecionar</div>
              <div><strong>Online Course Certificate:</strong> Certificado de curso online (Coursera, Udemy)</div>
              <div><strong>Language Proficiency:</strong> Proficiência em idioma (TOEFL, IELTS, DELE)</div>
              <div><strong>Safety/Compliance:</strong> Segurança e conformidade (NR-10, OSHA)</div>
              <div><strong>Financial License:</strong> Licença financeira (CFA, CPA, CFP)</div>
              <div><strong>Healthcare Credential:</strong> Credencial de saúde (BLS, ACLS)</div>
              <div><strong>Firearms/Security:</strong> Porte de arma, segurança privada</div>
              <div><strong>Driver's License:</strong> Carteira de motorista (categorias especiais)</div>
              <div><strong>Pilot License:</strong> Brevê de piloto</div>
            </div>
          </details>

          {/* Certifications List */}
          {(data.education?.certifications || []).length === 0 ? (
            <p className="font-mono text-[10px] text-gray-400 italic text-center py-4">
              Nenhuma certificação adicionada. Clique em "+ Adicionar" para começar.
            </p>
          ) : (
            <div className="space-y-3">
              {(data.education?.certifications || []).map((cert, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-sm p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] text-gray-500">Certificação #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = [...(data.education?.certifications || [])];
                        updated.splice(idx, 1);
                        update('education', 'certifications', updated);
                      }}
                      className="text-red-500 hover:text-red-700 font-mono text-xs"
                    >
                      ✕ Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Type */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Tipo</label>
                      <select
                        value={cert.type || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.certifications || [])];
                          updated[idx] = { ...updated[idx], type: e.target.value };
                          update('education', 'certifications', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Tipo --</option>
                        <optgroup label="Licenças Profissionais">
                          <option value="bar-license">Bar License (OAB - Advocacia)</option>
                          <option value="medical-license">Medical License (CRM - Medicina)</option>
                          <option value="engineering-license">Engineering License (CREA)</option>
                          <option value="psychology-license">Psychology License (CRP)</option>
                          <option value="nursing-license">Nursing License (COREN)</option>
                          <option value="accounting-license">Accounting License (CRC)</option>
                          <option value="teaching-license">Teaching Credential</option>
                          <option value="real-estate-license">Real Estate License (CRECI)</option>
                        </optgroup>
                        <optgroup label="Tech & IT">
                          <option value="aws">AWS Certification</option>
                          <option value="azure">Microsoft Azure</option>
                          <option value="google-cloud">Google Cloud</option>
                          <option value="cisco">Cisco (CCNA, CCNP)</option>
                          <option value="comptia">CompTIA (A+, Security+)</option>
                          <option value="pmp">PMP (Project Management)</option>
                          <option value="scrum">Scrum/Agile</option>
                          <option value="data-science-cert">Data Science Cert</option>
                        </optgroup>
                        <optgroup label="Financeiro">
                          <option value="cfa">CFA (Chartered Financial Analyst)</option>
                          <option value="cpa">CPA (Certified Public Accountant)</option>
                          <option value="cfp">CFP (Certified Financial Planner)</option>
                          <option value="series-7">Series 7 / Securities</option>
                        </optgroup>
                        <optgroup label="Idiomas">
                          <option value="toefl">TOEFL</option>
                          <option value="ielts">IELTS</option>
                          <option value="cambridge">Cambridge (FCE, CAE, CPE)</option>
                          <option value="dele">DELE (Espanhol)</option>
                          <option value="delf">DELF/DALF (Francês)</option>
                          <option value="jlpt">JLPT (Japonês)</option>
                          <option value="hsk">HSK (Chinês)</option>
                        </optgroup>
                        <optgroup label="Segurança & Operacional">
                          <option value="safety-nr">NR Safety (Brasil)</option>
                          <option value="osha">OSHA (EUA)</option>
                          <option value="first-aid">First Aid / CPR</option>
                          <option value="firearms">Firearms License</option>
                          <option value="security-guard">Security Guard License</option>
                          <option value="forklift">Forklift/Heavy Equipment</option>
                        </optgroup>
                        <optgroup label="Transporte">
                          <option value="cdl">CDL (Commercial Driver)</option>
                          <option value="pilot-ppl">Pilot PPL</option>
                          <option value="pilot-cpl">Pilot CPL</option>
                          <option value="boat-license">Boat License</option>
                          <option value="motorcycle">Motorcycle License</option>
                        </optgroup>
                        <optgroup label="Outros">
                          <option value="online-course">Online Course Certificate</option>
                          <option value="workshop">Workshop/Seminar</option>
                          <option value="bootcamp">Bootcamp</option>
                          <option value="other">Other (Outro)</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Nome Específico (opcional)</label>
                      <input
                        type="text"
                        value={cert.name || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.certifications || [])];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          update('education', 'certifications', updated);
                        }}
                        placeholder="Ex: AWS Solutions Architect, TOEFL 110..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      />
                    </div>

                    {/* Issuer */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Emissor</label>
                      <input
                        type="text"
                        value={cert.issuer || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.certifications || [])];
                          updated[idx] = { ...updated[idx], issuer: e.target.value };
                          update('education', 'certifications', updated);
                        }}
                        placeholder="Ex: Amazon, OAB, Coursera, Harvard..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block mb-1">Status</label>
                      <select
                        value={cert.status || ''}
                        onChange={(e) => {
                          const updated = [...(data.education?.certifications || [])];
                          updated[idx] = { ...updated[idx], status: e.target.value };
                          update('education', 'certifications', updated);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]"
                      >
                        <option value="">-- Status --</option>
                        <option value="active">✓ Active (Ativo)</option>
                        <option value="expired">⚠️ Expired (Expirado)</option>
                        <option value="in-progress">📚 In Progress (Estudando)</option>
                        <option value="revoked">🚫 Revoked (Cassado)</option>
                        <option value="pending">⏳ Pending (Pendente)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="font-mono text-[9px] text-gray-400 mt-2">
            {(data.education?.certifications || []).length}/8 certificações
          </p>
        </div>

        {/* Autodidact Level */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📖 Nível de Autodidatismo</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Quanto aprende por conta própria, fora de instituições formais.</p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Needs Structure</span>
              <span>Self-Taught</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.education?.autodidactLevel || 5}
              onChange={(e) => update('education', 'autodidactLevel', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-200 via-gray-200 to-green-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.education?.autodidactLevel || 5) <= 3 ? 'bg-blue-200 text-blue-800' :
                (data.education?.autodidactLevel || 5) <= 6 ? 'bg-gray-100 text-gray-700' :
                'bg-green-200 text-green-800'
              }`}>
                {(data.education?.autodidactLevel || 5) <= 2 && 'Precisa de Estrutura'}
                {(data.education?.autodidactLevel || 5) === 3 && 'Prefere Orientação'}
                {(data.education?.autodidactLevel || 5) === 4 && 'Levemente Dependente'}
                {(data.education?.autodidactLevel || 5) === 5 && 'Equilibrado'}
                {(data.education?.autodidactLevel || 5) === 6 && 'Levemente Autodidata'}
                {(data.education?.autodidactLevel || 5) === 7 && 'Autodidata'}
                {(data.education?.autodidactLevel || 5) === 8 && 'Muito Autodidata'}
                {(data.education?.autodidactLevel || 5) === 9 && 'Completamente Autodidata'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.education?.autodidactLevel || 5) <= 3 && '💡 Aprende melhor com professor, currículo, prazos. Dificuldade de se motivar sozinho.'}
              {(data.education?.autodidactLevel || 5) === 4 || (data.education?.autodidactLevel || 5) === 5 && '💡 Mistura de educação formal e autoaprendizado.'}
              {(data.education?.autodidactLevel || 5) >= 6 && '💡 Aprende sozinho, busca recursos, não precisa de instituição.'}
            </p>
          </div>
        </div>

        {/* Attitude Toward Education */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Atitude em Relação à Educação Formal</h4>
          <select
            value={data.education?.attitudeToEducation || ''}
            onChange={(e) => update('education', 'attitudeToEducation', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione --</option>
            <option value="values-highly">Valoriza Muito — Vê educação como essencial para sucesso</option>
            <option value="practical">Prático — Valoriza o que é útil para carreira</option>
            <option value="mixed">Misto — Algumas coisas valem, outras não</option>
            <option value="skeptical">Cético — Questiona o sistema educacional tradicional</option>
            <option value="rebellious">Rebelde — Contra instituições de ensino estabelecidas</option>
            <option value="regretful">Arrependido — Gostaria de ter estudado mais</option>
            <option value="elitist">Elitista — Só valoriza instituições de prestígio</option>
            <option value="anti-intellectual">Anti-Intelectual — Desconfia de "gente estudada"</option>
            <option value="lifelong-learner">Eterno Aprendiz — Sempre quer aprender mais, nunca para</option>
          </select>
        </div>

        {/* Incomplete Studies */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚠️ Estudos Incompletos (Notas)</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Informações adicionais sobre cursos ou formações não completados.</p>
          <textarea
            value={data.education?.incompleteStudies || ''}
            onChange={(e) => update('education', 'incompleteStudies', e.target.value)}
            placeholder="Ex: Trancou Medicina no 3º ano por questões financeiras, abandonou mestrado por oportunidade de emprego..."
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
          />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

// ============================================
// PHYSIQUE CONTENT - Complete Physical Health
// ============================================

export default IntelligenceContent;
