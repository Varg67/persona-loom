import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const HistoryContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('history', {
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

  // Calcular completude da história
  const calculateHistoryCompleteness = () => {
    const sections = {
      origin: ['birthPlace', 'birthCircumstances', 'earlyChildhood', 'adolescence', 'currentLifePhase'],
      family: ['familyStructure', 'motherDescription', 'fatherDescription', 'familyRole'],
      moments: ['happiestMemory', 'worstMemory', 'proudestAchievement'],
      trauma: ['healingProgress'],
      memories: ['earliestMemory', 'childhoodHome']
    };

    let filled = 0;
    let total = 0;

    Object.entries(sections).forEach(([section, fields]) => {
      fields.forEach(field => {
        total++;
        if (data[section]?.[field]) filled++;
      });
    });

    return Math.round((filled / total) * 100);
  };

  // Analisar o tom geral da história
  const analyzeHistoryTone = () => {
    let positiveScore = 0;
    let negativeScore = 0;

    // Análise de trauma
    const traumaFields = [
      data.trauma?.childhoodTrauma?.length || 0,
      data.trauma?.coreWounds?.length || 0,
      data.trauma?.abuseSurvived?.length || 0
    ];
    negativeScore += traumaFields.reduce((a, b) => a + b, 0) * 2;

    // Análise de momentos positivos
    if (data.moments?.happiestMemory) positiveScore += 3;
    if (data.moments?.proudestAchievement) positiveScore += 3;
    if ((data.moments?.definingMoments?.length || 0) > 0) positiveScore += 2;

    // Análise de família
    if (data.family?.motherRelationship === 'loving' || data.family?.motherRelationship === 'close') positiveScore += 2;
    if (data.family?.motherRelationship === 'abusive' || data.family?.motherRelationship === 'absent') negativeScore += 3;
    if (data.family?.fatherRelationship === 'loving' || data.family?.fatherRelationship === 'close') positiveScore += 2;
    if (data.family?.fatherRelationship === 'abusive' || data.family?.fatherRelationship === 'absent') negativeScore += 3;

    // Análise de cura
    const healingProgress = data.trauma?.healingProgress || 5;
    if (healingProgress >= 7) positiveScore += 3;
    if (healingProgress <= 3) negativeScore += 2;

    // Análise de infância
    if (data.origin?.childhoodStability === 'very-stable') positiveScore += 2;
    if (data.origin?.childhoodStability === 'chaotic' || data.origin?.childhoodStability === 'unstable') negativeScore += 2;

    const total = positiveScore + negativeScore;
    if (total === 0) return { tone: 'neutral', label: 'Neutro', color: 'gray' };

    const ratio = positiveScore / total;
    if (ratio >= 0.7) return { tone: 'positive', label: 'Majoritariamente Positiva', color: 'emerald' };
    if (ratio >= 0.5) return { tone: 'mixed-positive', label: 'Mista (tendendo a positiva)', color: 'blue' };
    if (ratio >= 0.3) return { tone: 'mixed-negative', label: 'Mista (tendendo a difícil)', color: 'amber' };
    return { tone: 'difficult', label: 'Passado Difícil', color: 'red' };
  };

  const completeness = calculateHistoryCompleteness();
  const historyTone = analyzeHistoryTone();

  const sections = {
    // ========== SUBTAB 0: ORIGIN STORY ==========
    0: (
      <div className="space-y-6">
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">🌅 ORIGIN STORY</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">
            O começo da jornada: nascimento, infância e formação inicial do personagem.
          </p>
        </div>

        {/* Dashboard de história */}
        <div className="bg-gradient-to-br from-gray-50 to-teal-50 border border-gray-200 rounded-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-mono text-xs font-bold text-gray-700">📊 Visão Geral da História</h4>
            <span className={`px-2 py-1 rounded font-mono text-[10px] font-bold ${
              historyTone.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
              historyTone.color === 'blue' ? 'bg-blue-100 text-blue-700' :
              historyTone.color === 'amber' ? 'bg-amber-100 text-amber-700' :
              historyTone.color === 'red' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>{historyTone.label}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded p-2 border border-gray-200">
              <div className="font-mono text-[9px] text-gray-500">Completude</div>
              <div className="font-mono text-lg font-bold text-teal-600">{completeness}%</div>
            </div>
            <div className="bg-white rounded p-2 border border-gray-200">
              <div className="font-mono text-[9px] text-gray-500">Fase Atual</div>
              <div className="font-mono text-sm font-bold text-gray-700">{data.origin?.currentLifePhase || 'Não definida'}</div>
            </div>
          </div>
        </div>

        {/* NASCIMENTO */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-3">👶 Nascimento</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Data de Nascimento</label>
                <input type="text" value={data.origin?.birthDate || ''} onChange={(e) => update('origin', 'birthDate', e.target.value)} placeholder="Ex: 15/03/1990, Primavera de 1985..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Local de Nascimento</label>
                <input type="text" value={data.origin?.birthPlace || ''} onChange={(e) => update('origin', 'birthPlace', e.target.value)} placeholder="Ex: São Paulo, Hospital Santa Casa..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Ordem de Nascimento</label>
                <select value={data.origin?.birthOrder || ''} onChange={(e) => update('origin', 'birthOrder', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="only">Filho único</option>
                  <option value="firstborn">Primogênito</option>
                  <option value="middle">Filho do meio</option>
                  <option value="youngest">Caçula</option>
                  <option value="twin">Gêmeo</option>
                  <option value="adopted-only">Adotado (único)</option>
                  <option value="adopted-siblings">Adotado (com irmãos)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Gravidez/Chegada</label>
                <select value={data.origin?.plannedPregnancy || ''} onChange={(e) => update('origin', 'plannedPregnancy', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="planned-wanted">Planejado e muito desejado</option>
                  <option value="planned">Planejado</option>
                  <option value="surprise-welcome">Surpresa, mas bem-vindo</option>
                  <option value="surprise-complicated">Surpresa, situação complicada</option>
                  <option value="unwanted">Não desejado</option>
                  <option value="fertility-treatment">Tratamento de fertilidade</option>
                  <option value="adopted-infant">Adotado (bebê)</option>
                  <option value="adopted-older">Adotado (mais velho)</option>
                  <option value="surrogate">Barriga de aluguel</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Circunstâncias do Nascimento</label>
                <select value={data.origin?.birthCircumstances || ''} onChange={(e) => update('origin', 'birthCircumstances', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="normal">Normal, sem complicações</option>
                  <option value="difficult">Parto difícil</option>
                  <option value="premature">Prematuro</option>
                  <option value="cesarean-planned">Cesárea planejada</option>
                  <option value="cesarean-emergency">Cesárea de emergência</option>
                  <option value="home-birth">Parto em casa</option>
                  <option value="complications-baby">Complicações (bebê)</option>
                  <option value="complications-mother">Complicações (mãe)</option>
                  <option value="traumatic">Traumático</option>
                  <option value="special-circumstances">Circunstâncias especiais</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PRIMEIRA INFÂNCIA */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🧒 Primeira Infância (0-6 anos)</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Ambiente de Criação</label>
                <select value={data.origin?.childhoodEnvironment || ''} onChange={(e) => update('origin', 'childhoodEnvironment', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="loving-stable">Amoroso e estável</option>
                  <option value="loving-chaotic">Amoroso mas caótico</option>
                  <option value="strict-stable">Rigoroso mas estável</option>
                  <option value="strict-harsh">Rigoroso e severo</option>
                  <option value="permissive">Permissivo/Sem limites</option>
                  <option value="neglectful">Negligente</option>
                  <option value="abusive">Abusivo</option>
                  <option value="overprotective">Superprotetor</option>
                  <option value="inconsistent">Inconsistente</option>
                  <option value="single-parent">Single Parent</option>
                  <option value="extended-family">Criado por família extensa</option>
                  <option value="institutional">Institucional (orfanato, etc.)</option>
                  <option value="foster-care">Lares temporários</option>
                  <option value="mixed">Misto/Variou</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Condição Socioeconômica</label>
                <select value={data.origin?.childhoodSocioeconomic || ''} onChange={(e) => update('origin', 'childhoodSocioeconomic', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="poverty">Pobreza</option>
                  <option value="working-class">Classe trabalhadora</option>
                  <option value="lower-middle">Classe média baixa</option>
                  <option value="middle">Classe média</option>
                  <option value="upper-middle">Classe média alta</option>
                  <option value="wealthy">Rico</option>
                  <option value="elite">Elite</option>
                  <option value="variable">Variou muito</option>
                  <option value="downward">Declínio financeiro</option>
                  <option value="upward">Ascensão financeira</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estabilidade do Lar</label>
              <select value={data.origin?.childhoodStability || ''} onChange={(e) => update('origin', 'childhoodStability', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="very-stable">Muito estável — Mesmo lar, rotina consistente</option>
                <option value="stable">Estável — Poucas mudanças</option>
                <option value="moderate">Moderado — Algumas mudanças</option>
                <option value="unstable">Instável — Mudanças frequentes</option>
                <option value="chaotic">Caótico — Constante incerteza</option>
                <option value="disrupted">Interrompido — Evento traumático mudou tudo</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Descrição da Primeira Infância</label>
              <textarea value={data.origin?.earlyChildhood || ''} onChange={(e) => update('origin', 'earlyChildhood', e.target.value)} placeholder="Como foram os primeiros anos? Memórias, ambiente, cuidadores..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Personalidade na Infância</label>
              <select value={data.origin?.childhoodPersonality || ''} onChange={(e) => update('origin', 'childhoodPersonality', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="happy-outgoing">Feliz e extrovertido</option>
                <option value="shy-quiet">Tímido e quieto</option>
                <option value="curious-adventurous">Curioso e aventureiro</option>
                <option value="anxious-clingy">Ansioso e apegado</option>
                <option value="independent">Independente desde cedo</option>
                <option value="creative-dreamy">Criativo e sonhador</option>
                <option value="serious-mature">Sério e maduro demais</option>
                <option value="rebellious">Rebelde desde pequeno</option>
                <option value="people-pleaser">Buscava agradar</option>
                <option value="invisible">Tentava ser invisível</option>
                <option value="troublemaker">Encrenqueiro</option>
                <option value="perfectionist">Perfeccionista</option>
              </select>
            </div>
          </div>
        </div>

        {/* INFÂNCIA (7-12) */}
        <div className="border-2 border-yellow-200 rounded-sm p-4 bg-yellow-50/30">
          <h4 className="font-mono text-sm font-bold text-yellow-800 mb-3">📚 Infância (7-12 anos)</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Experiência Schoolr (Fundamental)</label>
              <select value={data.origin?.elementarySchool || ''} onChange={(e) => update('origin', 'elementarySchool', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="loved">Amava a escola</option>
                <option value="good-student">Bom aluno, experiência positiva</option>
                <option value="average">Experiência mediana</option>
                <option value="struggled">Teve dificuldades</option>
                <option value="bullied">Sofreu bullying</option>
                <option value="bully">Foi o bully</option>
                <option value="outsider">Outsider/Não se encaixava</option>
                <option value="popular">Popular</option>
                <option value="teacher-favorite">Favorito dos professores</option>
                <option value="troublemaker">Encrenqueiro</option>
                <option value="homeschooled">Educação em casa</option>
                <option value="changed-schools">Mudou muito de escola</option>
                <option value="private">School particular privilegiada</option>
                <option value="public-underfunded">School pública precária</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Amizades na Infância</label>
              <select value={data.origin?.childhoodFriendships || ''} onChange={(e) => update('origin', 'childhoodFriendships', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="many-friends">Muitos amigos, muito social</option>
                <option value="few-close">Poucos mas próximos</option>
                <option value="one-best-friend">Um melhor amigo</option>
                <option value="imaginary-friends">Amigos imaginários</option>
                <option value="loner">Solitário por escolha</option>
                <option value="isolated">Isolado/Excluído</option>
                <option value="sibling-focused">Focado nos irmãos</option>
                <option value="adult-preference">Preferia adultos</option>
                <option value="neighborhood-gang">Turma do bairro</option>
                <option value="changing">Mudava muito de amigos</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Atividades na Infância (até 6)</label>
              <div className="flex flex-wrap gap-1">
                {['Esportes','Artes','Music','Dança','Leitura','Videogames','Brincadeiras ao ar livre','TV/Filmes','Coleções','Animals','Construir coisas','Desenho','Teatro','Religião','Escotismo','Artes marciais','Natação','Futebol','Vôlei','Basquete','Xadrez','Instrumentos','Computadores','Cozinhar','Artesanato','Explorar natureza','Nada específico','Trabalho infantil'].map(activity => (
                  <button key={activity} onClick={() => toggleArrayItem('origin', 'childhoodActivities', activity, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.origin?.childhoodActivities || []).includes(activity) ? 'bg-yellow-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{activity}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ADOLESCENCE */}
        <div className="border-2 border-orange-200 rounded-sm p-4 bg-orange-50/30">
          <h4 className="font-mono text-sm font-bold text-orange-800 mb-3">🎒 Adolescence (13-17 years)</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Experiência no Ensino Médio</label>
              <select value={data.origin?.highSchoolExperience || ''} onChange={(e) => update('origin', 'highSchoolExperience', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="best-years">Melhores anos da vida</option>
                <option value="good">Experiência boa</option>
                <option value="average">Experiência mediana</option>
                <option value="difficult">Difícil</option>
                <option value="worst-years">Piores anos da vida</option>
                <option value="popular">Era popular</option>
                <option value="nerd">Nerd/CDF</option>
                <option value="artsy">Grupo artístico</option>
                <option value="jock">Atleta</option>
                <option value="rebel">Rebelde</option>
                <option value="invisible">Invisível</option>
                <option value="dropout">Abandonmentu</option>
                <option value="expelled">Expulso</option>
                <option value="working">Trabalhava e estudava</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nível de Rebeldia Adolescente</label>
              <select value={data.origin?.teenageRebellion || ''} onChange={(e) => update('origin', 'teenageRebellion', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">Nenhuma — Era muito comportado</option>
                <option value="mild">Leve — Pequenos atos de rebeldia</option>
                <option value="typical">Típica — Discussões, testes de limite</option>
                <option value="significant">Significativa — Problemas sérios</option>
                <option value="extreme">Extrema — Fora de controle</option>
                <option value="delayed">Atrasada — Veio depois</option>
                <option value="suppressed">Suprimida — Não podia se rebelar</option>
                <option value="internal">Interna — Rebeldia silenciosa</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Primeiro Amor / Experiências Românticas</label>
              <select value={data.origin?.firstLove || ''} onChange={(e) => update('origin', 'firstLove', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">Nenhuma experiência</option>
                <option value="crushes-only">Apenas crushes não correspondidos</option>
                <option value="first-love-beautiful">Primeiro amor lindo</option>
                <option value="first-love-painful">Painful First Love</option>
                <option value="many-relationships">Vários relacionamentos</option>
                <option value="long-relationship">Namoro longo</option>
                <option value="forbidden-love">Amor proibido</option>
                <option value="heartbroken">Coração partido</option>
                <option value="late-bloomer">Despertou tarde</option>
                <option value="focused-elsewhere">Focado em outras coisas</option>
                <option value="complicated">Situação complicada</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Adolescence Description</label>
              <textarea value={data.origin?.adolescence || ''} onChange={(e) => update('origin', 'adolescence', e.target.value)} placeholder="How was their adolescence? Challenges, discoveries, identity formation..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Passagem para a Vida Adulta</label>
              <select value={data.origin?.comingOfAge || ''} onChange={(e) => update('origin', 'comingOfAge', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="smooth">Suave — Transição natural</option>
                <option value="eager">Ansioso — Mal podia esperar</option>
                <option value="reluctant">Relutante — Não queria crescer</option>
                <option value="forced">Forçado — Teve que amadurecer cedo</option>
                <option value="traumatic">Traumático — Evento marcante</option>
                <option value="gradual">Gradual — Sem momento definido</option>
                <option value="ritual">Ritual — Cerimônia ou marco cultural</option>
                <option value="delayed">Atrasado — Demorou a amadurecer</option>
              </select>
            </div>
          </div>
        </div>

        {/* VIDA ADULTA */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">🏠 Vida Adulta</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Fase Atual da Vida</label>
              <select value={data.origin?.currentLifePhase || ''} onChange={(e) => update('origin', 'currentLifePhase', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="late-adolescence">Late Adolescence (17-19)</option>
                <option value="emerging-adult">Adulto emergente (20-25)</option>
                <option value="young-adult">Jovem adulto (26-35)</option>
                <option value="established-adult">Adulto estabelecido (36-45)</option>
                <option value="midlife">Meia-idade (46-55)</option>
                <option value="mature-adult">Adulto maduro (56-65)</option>
                <option value="young-senior">Idoso jovem (66-75)</option>
                <option value="senior">Terceira idade (76+)</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Marcos da Vida Adulta (até 8)</label>
              <div className="flex flex-wrap gap-1">
                {['Left home','First own home','College','First job','Established career','Marriage','Divorce','Children','Perda de pai/mãe','Moved city','Moved country','Midlife crisis','Serious Illness','Recovery','Bankruptcy','Financial success','Retirement','Widowhood','Reinvention','Return to studies','Entrepreneurship','No milestones yet'].map(milestone => (
                  <button key={milestone} onClick={() => toggleArrayItem('origin', 'adultMilestones', milestone, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.origin?.adultMilestones || []).includes(milestone) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{milestone}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Jovem Adulto / Vida Adulta Inicial</label>
              <textarea value={data.origin?.youngAdulthood || ''} onChange={(e) => update('origin', 'youngAdulthood', e.target.value)} placeholder="Como foi a transição para a vida adulta? Desafios, conquistas, mudanças..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Notas sobre a Fase Atual</label>
              <textarea value={data.origin?.lifePhaseNotes || ''} onChange={(e) => update('origin', 'lifePhaseNotes', e.target.value)} placeholder="O que define esta fase da vida? Preocupações, objetivos, estado atual..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: FAMILY BACKGROUND ==========
    1: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">👨‍👩‍👧 BACKGROUND FAMILIAR</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">
            A família de origem e sua influência na formação do personagem.
          </p>
        </div>

        {/* ESTRUTURA FAMILIAR */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🏠 Estrutura Familiar</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo de Família</label>
                <select value={data.family?.familyStructure || ''} onChange={(e) => update('family', 'familyStructure', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="nuclear-traditional">Nuclear tradicional (pai, mãe, filhos)</option>
                  <option value="single-mother">Mãe solo</option>
                  <option value="single-father">Single Father</option>
                  <option value="blended">Família reconstituída</option>
                  <option value="extended">Família extensa (avós, tios)</option>
                  <option value="same-sex-parents">Two Fathers/Two Mothers</option>
                  <option value="grandparents">Criado por avós</option>
                  <option value="other-relatives">Criado por outros parentes</option>
                  <option value="foster-family">Família adotiva/Acolhimento</option>
                  <option value="institutional">Institucional (orfanato)</option>
                  <option value="communal">Comunal/Coletivo</option>
                  <option value="absent-parents">Absent Parents</option>
                  <option value="complex">Complexa/Múltiplas configurações</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Parents' Relationship</label>
                <select value={data.family?.parentsRelationship || ''} onChange={(e) => update('family', 'parentsRelationship', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="loving-stable">Amoroso e estável</option>
                  <option value="loving-passionate">Amoroso e intenso</option>
                  <option value="functional">Funcional, sem grandes problemas</option>
                  <option value="distant">Distante, mas civilizado</option>
                  <option value="conflictual">Conflituoso</option>
                  <option value="toxic">Tóxico</option>
                  <option value="violent">Violento</option>
                  <option value="divorced-amicable">Divorciados, relação amigável</option>
                  <option value="divorced-hostile">Divorciados, relação hostil</option>
                  <option value="separated">Separados</option>
                  <option value="widowed">Um falecido</option>
                  <option value="never-together">Nunca estiveram juntos</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* MÃE */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-3">👩 Figura Materna</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Descrição da Mãe/Figura Materna</label>
              <textarea value={data.family?.motherDescription || ''} onChange={(e) => update('family', 'motherDescription', e.target.value)} placeholder="Quem era/é? Personalidade, ocupação, características marcantes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Qualidade da Relação</label>
                <select value={data.family?.motherRelationship || ''} onChange={(e) => update('family', 'motherRelationship', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="loving">Amorosa e próxima</option>
                  <option value="close">Próxima</option>
                  <option value="warm">Carinhosa</option>
                  <option value="functional">Funcional</option>
                  <option value="distant">Distante</option>
                  <option value="complicated">Complicada</option>
                  <option value="conflictual">Conflituosa</option>
                  <option value="enmeshed">Emaranhada/Codependente</option>
                  <option value="neglectful">Negligente</option>
                  <option value="abusive">Abusiva</option>
                  <option value="absent">Ausente</option>
                  <option value="estranged">Sem contato</option>
                  <option value="deceased-close">Falecida (era próxima)</option>
                  <option value="deceased-distant">Falecida (era distante)</option>
                  <option value="unknown">Desconhecida</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status Atual</label>
                <select value={data.family?.motherStatus || ''} onChange={(e) => update('family', 'motherStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="alive-contact">Viva, em contato</option>
                  <option value="alive-distant">Viva, pouco contato</option>
                  <option value="alive-estranged">Viva, sem contato</option>
                  <option value="deceased-recent">Falecida recentemente</option>
                  <option value="deceased-long">Falecida há muito tempo</option>
                  <option value="deceased-childhood">Falecida na infância</option>
                  <option value="missing">Desaparecida</option>
                  <option value="unknown">Desconhecida</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PAI */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">👨 Figura Paterna</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Father/Father Figure Description</label>
              <textarea value={data.family?.fatherDescription || ''} onChange={(e) => update('family', 'fatherDescription', e.target.value)} placeholder="Quem era/é? Personalidade, ocupação, características marcantes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Qualidade da Relação</label>
                <select value={data.family?.fatherRelationship || ''} onChange={(e) => update('family', 'fatherRelationship', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="loving">Amorosa e próxima</option>
                  <option value="close">Próxima</option>
                  <option value="warm">Carinhosa</option>
                  <option value="functional">Funcional</option>
                  <option value="distant">Distante</option>
                  <option value="complicated">Complicada</option>
                  <option value="conflictual">Conflituosa</option>
                  <option value="authoritarian">Autoritária</option>
                  <option value="neglectful">Negligente</option>
                  <option value="abusive">Abusiva</option>
                  <option value="absent">Ausente</option>
                  <option value="estranged">Sem contato</option>
                  <option value="deceased-close">Falecido (era próximo)</option>
                  <option value="deceased-distant">Falecido (era distante)</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status Atual</label>
                <select value={data.family?.fatherStatus || ''} onChange={(e) => update('family', 'fatherStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="alive-contact">Vivo, em contato</option>
                  <option value="alive-distant">Vivo, pouco contato</option>
                  <option value="alive-estranged">Vivo, sem contato</option>
                  <option value="deceased-recent">Falecido recentemente</option>
                  <option value="deceased-long">Falecido há muito tempo</option>
                  <option value="deceased-childhood">Falecido na infância</option>
                  <option value="missing">Desaparecido</option>
                  <option value="unknown">Desconhecido</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PADRASTO/MADRASTA */}
        <div className="border-2 border-gray-200 rounded-sm p-4 bg-gray-50/30">
          <h4 className="font-mono text-sm font-bold text-gray-700 mb-3">👥 Padrasto/Madrasta (se aplicável)</h4>
          <div>
            <textarea value={data.family?.stepParents || ''} onChange={(e) => update('family', 'stepParents', e.target.value)} placeholder="Se teve padrasto ou madrasta, descreva a relação e impacto..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
          </div>
        </div>

        {/* IRMÃOS */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">👫 Irmãos</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Número de Irmãos</label>
                <select value={data.family?.siblingsCount || ''} onChange={(e) => update('family', 'siblingsCount', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="0">Filho único</option>
                  <option value="1">1 irmão/irmã</option>
                  <option value="2">2 irmãos</option>
                  <option value="3">3 irmãos</option>
                  <option value="4">4 irmãos</option>
                  <option value="5+">5 ou mais irmãos</option>
                  <option value="half">Apenas meio-irmãos</option>
                  <option value="step">Apenas irmãos de criação</option>
                  <option value="mixed">Mistura de tipos</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Dinâmica entre Irmãos</label>
                <select value={data.family?.siblingsDynamic || ''} onChange={(e) => update('family', 'siblingsDynamic', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="best-friends">Melhores amigos</option>
                  <option value="close">Próximos</option>
                  <option value="normal">Normal, com altos e baixos</option>
                  <option value="distant">Distantes</option>
                  <option value="competitive">Competitivos</option>
                  <option value="conflictual">Conflituosos</option>
                  <option value="protective">Protetor(a)</option>
                  <option value="protected">Protegido(a)</option>
                  <option value="estranged">Sem contato</option>
                  <option value="complicated">Complicada</option>
                  <option value="na">Não aplicável</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Detalhes sobre os Irmãos</label>
              <textarea value={data.family?.siblingsDetails || ''} onChange={(e) => update('family', 'siblingsDetails', e.target.value)} placeholder="Nomes, idades, personalidades, relação com cada um..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Rivalidade entre Irmãos</label>
              <select value={data.family?.siblingRivalry || ''} onChange={(e) => update('family', 'siblingRivalry', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">Nenhuma rivalidade</option>
                <option value="mild">Leve, saudável</option>
                <option value="moderate">Moderada</option>
                <option value="intense">Intensa</option>
                <option value="destructive">Destrutiva</option>
                <option value="one-sided">Unilateral</option>
                <option value="resolved">Existiu mas foi resolvida</option>
                <option value="na">Não aplicável</option>
              </select>
            </div>
          </div>
        </div>

        {/* FAMÍLIA EXTENSA E VALORES */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-3">👪 Família Extensa & Valores</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Influência dos Avós</label>
              <select value={data.family?.grandparentsInfluence || ''} onChange={(e) => update('family', 'grandparentsInfluence', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="very-present">Muito presentes, grande influência</option>
                <option value="present">Presentes na vida</option>
                <option value="occasional">Contato ocasional</option>
                <option value="distant">Distantes</option>
                <option value="deceased-known">Falecidos, mas conheceu</option>
                <option value="deceased-unknown">Falecidos antes de nascer</option>
                <option value="unknown">Desconhecidos</option>
                <option value="raised-by">Foi criado por eles</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Família Extensa (tios, primos, etc.)</label>
              <textarea value={data.family?.extendedFamily || ''} onChange={(e) => update('family', 'extendedFamily', e.target.value)} placeholder="Presença e importância da família extensa..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Tradições Familiares (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Christmas','New Year','Easter','Aniversários','Domingos em família','Churrascos','Viagens anuais','Festas juninas','Reuniões religiosas','Mother's/Father's Day','Family Recipes','Past Stories','Family Nicknames','Rites of Passage','Heirlooms/Relics','Family Photos','Music/Songs','No Traditions','Abandoned Traditions','Creating New Ones'].map(tradition => (
                  <button key={tradition} onClick={() => toggleArrayItem('family', 'familyTraditions', tradition, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.family?.familyTraditions || []).includes(tradition) ? 'bg-violet-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{tradition}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Valores Familiares (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Educação','Trabalho duro','Religião/Fé','Família acima de tudo','Honestidade','Lealdade','Independência','Financial success','Aparências','Tradição','Humildade','Generosity','Respeito aos mais velhos','Ambição','Conformidade','Creativity','Segurança','Status social','Amor','Sacrifício','Silêncio/Privacidade','Nenhum claro'].map(value => (
                  <button key={value} onClick={() => toggleArrayItem('family', 'familyValues', value, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.family?.familyValues || []).includes(value) ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{value}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DINÂMICA E PAPÉIS */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-3">🎭 Dinâmica & Papéis Familiares</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Seu Papel na Família</label>
                <select value={data.family?.familyRole || ''} onChange={(e) => update('family', 'familyRole', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="golden-child">Filho de ouro — Favorito</option>
                  <option value="black-sheep">Ovelha negra — O diferente</option>
                  <option value="scapegoat">Bode expiatório — Culpado de tudo</option>
                  <option value="peacemaker">Pacificador — Resolve conflitos</option>
                  <option value="caretaker">Cuidador — Cuida de todos</option>
                  <option value="invisible">Invisível — Ignorado</option>
                  <option value="entertainer">Palhaço — Mantém todos felizes</option>
                  <option value="achiever">Realizador — Orgulho da família</option>
                  <option value="rebel">Rebelde — Desafia tudo</option>
                  <option value="lost-child">Criança perdida — Negligenciado</option>
                  <option value="mascot">Mascote — O bebê da família</option>
                  <option value="parentified">Parentified — Played parent role</option>
                  <option value="no-clear-role">Sem papel claro</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Expectativas da Família</label>
                <select value={data.family?.familyExpectations || ''} onChange={(e) => update('family', 'familyExpectations', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="high-met">Altas, e foram cumpridas</option>
                  <option value="high-unmet">Altas, não cumpridas</option>
                  <option value="high-rebelled">Altas, mas se rebelou</option>
                  <option value="moderate">Moderadas</option>
                  <option value="low">Baixas</option>
                  <option value="none">Nenhuma expectativa</option>
                  <option value="conflicting">Conflicting between parents</option>
                  <option value="impossible">Impossíveis de cumprir</option>
                  <option value="career-specific">Carreira específica esperada</option>
                  <option value="continue-legacy">Continuar legado familiar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Traços Herdados da Família (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Physical Appearance','Temperament','Artistic Talents','Intelligence','Addictions','Diseases','Traumas','Fears','Humor','Stubbornness','Generosity','Anxiety','Depression','Strength','Resilience','Creativity','Pessimism','Optimism','Religiosity','Cynicism','Romanticism','Practicality'].map(trait => (
                  <button key={trait} onClick={() => toggleArrayItem('family', 'inheritedTraits', trait, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.family?.inheritedTraits || []).includes(trait) ? 'bg-pink-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{trait}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Conflitos Familiares</label>
              <textarea value={data.family?.familyConflicts || ''} onChange={(e) => update('family', 'familyConflicts', e.target.value)} placeholder="Main conflicts, fights, tensions in the family..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Segredos de Família</label>
              <textarea value={data.family?.familySecrets || ''} onChange={(e) => update('family', 'familySecrets', e.target.value)} placeholder="O que a família esconde? Segredos, tabus, assuntos proibidos..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Legado Familiar</label>
              <textarea value={data.family?.familyLegacy || ''} onChange={(e) => update('family', 'familyLegacy', e.target.value)} placeholder="O que a família representa? História, reputação, herança..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: DEFINING MOMENTS ==========
    2: (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">⭐ MOMENTOS DEFINIDORES</h3>
          <p className="font-mono text-xs text-purple-800 leading-relaxed">
            Os eventos e decisões que moldaram quem o personagem se tornou.
          </p>
        </div>

        {/* MOMENTOS MARCANTES */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">🌟 Momentos que Mudaram Tudo</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Tipos de Momentos Definidores (até 6)</label>
              <div className="flex flex-wrap gap-1">
                {['Death de alguém próximo','Nascimento (filho, irmão)','Marriage','Divorce','Moved city/país','Serious Illness','Acidente','Formatura','First job','Demissão','Promoção importante','Bankruptcy','Financial success','Encontro com mentor','Rompimento amoroso','Reconciliação','Descoberta (segredo, verdade)','Traição','Ato de coragem','Ato de covardia','Loss of faith','Encontro espiritual','Viagem transformadora','Livro/Filme que mudou perspectiva'].map(moment => (
                  <button key={moment} onClick={() => toggleArrayItem('moments', 'definingMoments', moment, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.moments?.definingMoments || []).includes(moment) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{moment}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Decisões que Mudaram a Vida (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Leave home','Marry','Have children','Not have children','Change career','Drop everything','Forgive someone','Cut ties','Return to study','Accept job','Refuse opportunity','Reveal secret','Keep secret','Face fear','Assume identity','Start therapy','Stop drinking/using','Make peace','Leave','Stay','Take a risk','Play safe'].map(decision => (
                  <button key={decision} onClick={() => toggleArrayItem('moments', 'lifeChangingDecisions', decision, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.moments?.lifeChangingDecisions || []).includes(decision) ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{decision}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Pontos de Virada (descrição detalhada)</label>
              <textarea value={data.moments?.turningPoints || ''} onChange={(e) => update('moments', 'turningPoints', e.target.value)} placeholder="Descreva os momentos específicos que mudaram o rumo da vida..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
            </div>
          </div>
        </div>

        {/* MEMÓRIA MAIS FELIZ */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-3">😊 Memória Mais Feliz</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Qual é a memória mais feliz?</label>
              <textarea value={data.moments?.happiestMemory || ''} onChange={(e) => update('moments', 'happiestMemory', e.target.value)} placeholder="Descreva em detalhes a lembrança mais feliz..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade na época</label>
                <input type="text" value={data.moments?.happiestMemoryAge || ''} onChange={(e) => update('moments', 'happiestMemoryAge', e.target.value)} placeholder="e.g. 8 years old, adolescence, 25..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Por que é tão especial?</label>
                <input type="text" value={data.moments?.happiestMemoryWhy || ''} onChange={(e) => update('moments', 'happiestMemoryWhy', e.target.value)} placeholder="O que torna essa memória tão importante?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* PIOR MEMÓRIA */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-3">😢 Pior Memória</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Qual é a pior memória?</label>
              <textarea value={data.moments?.worstMemory || ''} onChange={(e) => update('moments', 'worstMemory', e.target.value)} placeholder="Descreva a lembrança mais dolorosa ou difícil..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade na época</label>
                <input type="text" value={data.moments?.worstMemoryAge || ''} onChange={(e) => update('moments', 'worstMemoryAge', e.target.value)} placeholder="Ex: 12 anos, início dos 20..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Impacto duradouro</label>
                <input type="text" value={data.moments?.worstMemoryImpact || ''} onChange={(e) => update('moments', 'worstMemoryImpact', e.target.value)} placeholder="Como isso ainda afeta hoje?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* CONQUISTAS E ARREPENDIMENTOS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🏆 Conquistas & Arrependimentos</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Maior Orgulho/Conquista</label>
              <textarea value={data.moments?.proudestAchievement || ''} onChange={(e) => update('moments', 'proudestAchievement', e.target.value)} placeholder="Do que tem mais orgulho de ter feito ou conquistado?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade da conquista</label>
              <input type="text" value={data.moments?.achievementAge || ''} onChange={(e) => update('moments', 'achievementAge', e.target.value)} placeholder="Quando aconteceu?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Maior Arrependimento</label>
              <textarea value={data.moments?.biggestRegret || ''} onChange={(e) => update('moments', 'biggestRegret', e.target.value)} placeholder="O que mais se arrepende de ter feito ou não feito?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Resolução do Arrependimento</label>
              <select value={data.moments?.regretResolution || ''} onChange={(e) => update('moments', 'regretResolution', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="resolved">Resolvido — Fez as pazes com isso</option>
                <option value="processing">Processando — Ainda trabalhando nisso</option>
                <option value="unresolved">Não resolvido — Ainda pesa</option>
                <option value="repressed">Reprimido — Evita pensar</option>
                <option value="rationalized">Racionalizado — Encontrou justificativa</option>
                <option value="haunting">Assombra — Não consegue superar</option>
              </select>
            </div>
          </div>
        </div>

        {/* OUTROS EVENTOS */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">📋 Outros Eventos Significativos</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Experiência de Quase-Death</label>
              <textarea value={data.moments?.nearDeathExperience || ''} onChange={(e) => update('moments', 'nearDeathExperience', e.target.value)} placeholder="Já passou por situação de risco de vida? Descreva..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Perdas Significativas (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Death of parent','Death of sibling','Death of grandparents','Death of child','Death of spouse','Death of close friend','Death of pet','Loss of job','Loss of home','Loss of fortune','End of friendship','End of marriage','Loss of health','Loss of capacity','Loss of faith','Miscarriage','Loss of opportunity','No significant loss'].map(loss => (
                  <button key={loss} onClick={() => toggleArrayItem('moments', 'lossesExperienced', loss, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.moments?.lossesExperienced || []).includes(loss) ? 'bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{loss}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Maiores Fracassos</label>
              <textarea value={data.moments?.majorFailures || ''} onChange={(e) => update('moments', 'majorFailures', e.target.value)} placeholder="Falhas significativas, projetos que deram errado, tentativas fracassadas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Lições dos Fracassos</label>
              <textarea value={data.moments?.failureLessons || ''} onChange={(e) => update('moments', 'failureLessons', e.target.value)} placeholder="O que aprendeu com os fracassos?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Golpes de Sorte</label>
                <textarea value={data.moments?.luckyBreaks || ''} onChange={(e) => update('moments', 'luckyBreaks', e.target.value)} placeholder="Momentos de sorte que mudaram algo..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Oportunidades Perdidas</label>
                <textarea value={data.moments?.missedOpportunities || ''} onChange={(e) => update('moments', 'missedOpportunities', e.target.value)} placeholder="Chances que deixou passar e lamenta..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 3: TRAUMA & HEALING ==========
    3: (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">💔 TRAUMA & CURA</h3>
          <p className="font-mono text-xs text-red-800 leading-relaxed">
            Past wounds and the recovery process. Handle with care.
          </p>
        </div>

        {/* TIPOS DE TRAUMA */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-3">⚠️ Tipos de Trauma Experienciados</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Traumas da Infância (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Abandonment','Emotional Neglect','Physical Neglect','Emotional Abuse','Physical Abuse','Sexual Abuse','Witnessing Violence','Bullying','Serious Illness','Death of parent','Parents Divorce','Extreme Poverty','Displacement/Refugee','Natural Disaster','Parentification','Rejection','Isolation','Instability','Family Alcoholism','Family Mental Illness','No Significant Trauma'].map(trauma => (
                  <button key={trauma} onClick={() => toggleArrayItem('trauma', 'childhoodTrauma', trauma, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.childhoodTrauma || []).includes(trauma) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{trauma}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Impacto do Trauma de Infância</label>
              <textarea value={data.trauma?.childhoodTraumaImpact || ''} onChange={(e) => update('trauma', 'childhoodTraumaImpact', e.target.value)} placeholder="Como os traumas de infância afetaram o desenvolvimento e vida adulta?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo Principal de Trauma</label>
                <select value={data.trauma?.traumaType || ''} onChange={(e) => update('trauma', 'traumaType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="none">No Significant Trauma</option>
                  <option value="developmental">Desenvolvimento — Ocorreu na infância</option>
                  <option value="acute">Agudo — Evento único traumático</option>
                  <option value="chronic">Crônico — Trauma repetido ao longo do tempo</option>
                  <option value="complex">Complexo — Múltiplos traumas</option>
                  <option value="vicarious">Vicário — Testemunhou trauma de outros</option>
                  <option value="intergenerational">Intergeracional — Herdado da família</option>
                  <option value="collective">Coletivo — Trauma de grupo/comunidade</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade do Trauma Principal</label>
                <input type="text" value={data.trauma?.traumaAge || ''} onChange={(e) => update('trauma', 'traumaAge', e.target.value)} placeholder="e.g. 7 years old, adolescence, 25..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* CORE WOUNDS */}
        <div className="border-2 border-orange-200 rounded-sm p-4 bg-orange-50/30">
          <h4 className="font-mono text-sm font-bold text-orange-800 mb-3">🩹 Core Wounds</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Main Emotional Wounds (up to 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Abandonment','Rejection','Traição','Humilhação','Injustiça','Não ser amado','Não ser bom o suficiente','Invisibilidade','Impotência','Vergonha','Culpa','Não pertencer','Ser demais','Não ser demais','Não ter valor','Ser diferente','Não ser ouvido','Não ser protegido','Ser um fardo','Solidão'].map(wound => (
                  <button key={wound} onClick={() => toggleArrayItem('trauma', 'coreWounds', wound, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.coreWounds || []).includes(wound) ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{wound}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Origin of Core Wound</label>
              <textarea value={data.trauma?.woundOrigin || ''} onChange={(e) => update('trauma', 'woundOrigin', e.target.value)} placeholder="Quando e como essa ferida se formou?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Attachment Wounds</label>
              <select value={data.trauma?.attachmentWounds || ''} onChange={(e) => update('trauma', 'attachmentWounds', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">Nenhuma ferida de apego significativa</option>
                <option value="inconsistent-care">Cuidado inconsistente — Nunca sabia o que esperar</option>
                <option value="emotional-unavailability">Emotional Unavailability — Parents present but absent</option>
                <option value="enmeshment">Emaranhamento — Falta de limites, superenvolvimento</option>
                <option value="rejection">Rejection — Sentiu-se não querido</option>
                <option value="abandonment">Abandonment — Foi deixado (física ou emocionalmente)</option>
                <option value="role-reversal">Role Reversal — Had to take care of parents</option>
                <option value="comparison">Comparação — Sempre comparado a outros</option>
                <option value="conditional-love">Amor condicional — Só amado quando...</option>
              </select>
            </div>
          </div>
        </div>

        {/* EXPERIÊNCIAS ESPECÍFICAS */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-3">📝 Experiências Específicas</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Experiências de Abandonment</label>
              <textarea value={data.trauma?.abandonmentExperiences || ''} onChange={(e) => update('trauma', 'abandonmentExperiences', e.target.value)} placeholder="Situações em que se sentiu abandonado(a)..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Experiências de Traição</label>
              <textarea value={data.trauma?.betrayalExperiences || ''} onChange={(e) => update('trauma', 'betrayalExperiences', e.target.value)} placeholder="Situações em que foi traído(a) ou teve confiança quebrada..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Histórico de Bullying</label>
              <select value={data.trauma?.bullyingHistory || ''} onChange={(e) => update('trauma', 'bullyingHistory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">Nunca sofreu bullying</option>
                <option value="mild">Leve — Provocações ocasionais</option>
                <option value="moderate">Moderado — Bullying regular</option>
                <option value="severe">Severo — Bullying intenso e prolongado</option>
                <option value="cyberbullying">Cyberbullying</option>
                <option value="workplace">Assédio no trabalho (adulto)</option>
                <option value="was-bully">Foi o bully</option>
                <option value="both">Foi vítima e agressor</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Trauma de Perda</label>
              <textarea value={data.trauma?.lossTrauma || ''} onChange={(e) => update('trauma', 'lossTrauma', e.target.value)} placeholder="Perdas traumáticas (morte, separação, etc.)..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Trauma Testemunhado</label>
              <textarea value={data.trauma?.witnessedTrauma || ''} onChange={(e) => update('trauma', 'witnessedTrauma', e.target.value)} placeholder="Traumas que presenciou acontecer com outros..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>

        {/* SINTOMAS E GATILHOS */}
        <div className="border-2 border-yellow-200 rounded-sm p-4 bg-yellow-50/30">
          <h4 className="font-mono text-sm font-bold text-yellow-800 mb-3">⚡ Sintomas & Gatilhos</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Sintomas de TEPT (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Flashbacks','Nightmares','Evitação','Hipervigilância','Dissociação','Dormência emocional','Irritabilidade','Dificuldade de concentração','Insônia','Reações exageradas','Memórias intrusivas','Desrealização','Despersonalização','Ansiedade constante','Depression','Raiva','Culpa','Vergonha','Nenhum sintoma'].map(symptom => (
                  <button key={symptom} onClick={() => toggleArrayItem('trauma', 'ptsdSymptoms', symptom, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.ptsdSymptoms || []).includes(symptom) ? 'bg-yellow-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{symptom}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Gatilhos (até 6)</label>
              <div className="flex flex-wrap gap-1">
                {['Gritos','Portas batendo','Cheiros específicos','Musics','Datas específicas','Lugares','Toques','Tom de voz','Abandonment','Rejection','Críticas','Conflitos','Silêncio','Darkness','Multidões','Solidão','Intimidade','Autoridade','Perda de controle','Surpresas','Falhas','Julgamento','Nenhum gatilho identificado'].map(trigger => (
                  <button key={trigger} onClick={() => toggleArrayItem('trauma', 'triggers', trigger, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.triggers || []).includes(trigger) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{trigger}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MECANISMOS DE ENFRENTAMENTO */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">🛠️ Mecanismos de Enfrentamento</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Mecanismos Saudáveis (até 5)</label>
              <div className="flex flex-wrap gap-1">
                {['Therapy','Exercise','Meditation','Art/Creativity','Music','Writing/Journaling','Talking to friends','Support Groups','Spirituality/Prayer','Nature','Hobbies','Pets','Volunteering','Setting Boundaries','Self-compassion','Breathing/Relaxation','Routine','Humor','Crying','Adequate Sleep'].map(coping => (
                  <button key={coping} onClick={() => toggleArrayItem('trauma', 'copingMechanisms', coping, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.copingMechanisms || []).includes(coping) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{coping}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Mecanismos Não Saudáveis (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Álcool','Drogas','Compulsão alimentar','Restrição alimentar','Automutilação','Isolation','Workaholism','Compras compulsivas','Promiscuidade','Evitação total','Raiva/Explosões','Negação','Dissociação','Controle excessivo','Relacionamentos tóxicos','Procrastinação','Jogos/Apostas','Sono excessivo','Nenhum'].map(coping => (
                  <button key={coping} onClick={() => toggleArrayItem('trauma', 'unhealthyCoping', coping, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.unhealthyCoping || []).includes(coping) ? 'bg-red-400 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{coping}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* JORNADA DE CURA */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-3">🌱 Jornada de Cura</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Histórico de Therapy</label>
              <select value={data.trauma?.therapyHistory || ''} onChange={(e) => update('trauma', 'therapyHistory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="never">Nunca fez terapia</option>
                <option value="tried-quit">Tentou mas parou</option>
                <option value="past">Fez no passado, não faz mais</option>
                <option value="current">Faz atualmente</option>
                <option value="long-term">Therapy de longo prazo</option>
                <option value="multiple">Vários terapeutas ao longo da vida</option>
                <option value="resistant">Resiste à ideia de terapia</option>
                <option value="cant-access">Quer mas não tem acesso</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-[10px] text-gray-600">Progresso na Cura</label>
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  (data.trauma?.healingProgress || 5) >= 8 ? 'bg-emerald-100 text-emerald-700' :
                  (data.trauma?.healingProgress || 5) >= 5 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{data.trauma?.healingProgress || 5}/10</span>
              </div>
              <input type="range" min="1" max="10" value={data.trauma?.healingProgress || 5} onChange={(e) => update('trauma', 'healingProgress', parseInt(e.target.value))} className="w-full" />
              <div className="flex justify-between font-mono text-[9px] text-gray-400">
                <span>Início da jornada</span>
                <span>Em processo</span>
                <span>Bem avançado</span>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Descrição da Jornada de Cura</label>
              <textarea value={data.trauma?.healingJourney || ''} onChange={(e) => update('trauma', 'healingJourney', e.target.value)} placeholder="Como tem sido o processo de cura? O que ajudou, o que dificultou..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Sistemas de Apoio (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Família','Amigos','Parceiro(a)','Terapeuta','Psiquiatra','Grupo de apoio','Comunidade religiosa','Mentor','Colegas de trabalho','Pets','Online/Comunidades virtuais','Livros de autoajuda','Nenhum sistema de apoio'].map(support => (
                  <button key={support} onClick={() => toggleArrayItem('trauma', 'supportSystems', support, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.supportSystems || []).includes(support) ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{support}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Fatores de Resiliência (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Intelligence','Senso de humor','Creativity','Espiritualidade','Determinação','Empatia','Capacidade de pedir ajuda','Autoconsciência','Flexibilidade','Optimism','Senso de propósito','Conexões sociais','Capacidade de perdoar','Autoestima','Habilidades práticas','Educação','Estabilidade financeira'].map(factor => (
                  <button key={factor} onClick={() => toggleArrayItem('trauma', 'resilienceFactors', factor, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.trauma?.resilienceFactors || []).includes(factor) ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{factor}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Crescimento Pós-Traumático</label>
              <textarea value={data.trauma?.postTraumaticGrowth || ''} onChange={(e) => update('trauma', 'postTraumaticGrowth', e.target.value)} placeholder="O que ganhou ou aprendeu através do sofrimento? Como se tornou mais forte?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Trauma Não Processado</label>
              <textarea value={data.trauma?.unprocessedTrauma || ''} onChange={(e) => update('trauma', 'unprocessedTrauma', e.target.value)} placeholder="What has not yet been processed or resolved? Open wounds..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 4: KEY MEMORIES ==========
    4: (
      <div className="space-y-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-indigo-900 mb-2">🧠 MEMÓRIAS-CHAVE</h3>
          <p className="font-mono text-xs text-indigo-800 leading-relaxed">
            Lembranças específicas que definem a experiência de vida do personagem.
          </p>
        </div>

        {/* PRIMEIRAS MEMÓRIAS */}
        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <h4 className="font-mono text-sm font-bold text-indigo-800 mb-3">🌅 Primeiras Memórias</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memória Mais Antiga</label>
                <textarea value={data.memories?.earliestMemory || ''} onChange={(e) => update('memories', 'earliestMemory', e.target.value)} placeholder="Qual é a primeira memória que consegue lembrar?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade da Primeira Memória</label>
                <input type="text" value={data.memories?.earliestMemoryAge || ''} onChange={(e) => update('memories', 'earliestMemoryAge', e.target.value)} placeholder="Ex: 2-3 anos, 4 anos..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* MEMÓRIAS SENSORIAIS */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">👃 Memórias Sensoriais da Infância</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">A Casa da Infância</label>
              <textarea value={data.memories?.childhoodHome || ''} onChange={(e) => update('memories', 'childhoodHome', e.target.value)} placeholder="Descreva a casa onde cresceu: cômodos, móveis, atmosfera..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Cheiros da Infância</label>
                <input type="text" value={data.memories?.childhoodSmells || ''} onChange={(e) => update('memories', 'childhoodSmells', e.target.value)} placeholder="Ex: Comida da avó, perfume da mãe, grama cortada..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Sons da Infância</label>
                <input type="text" value={data.memories?.childhoodSounds || ''} onChange={(e) => update('memories', 'childhoodSounds', e.target.value)} placeholder="Ex: Music que tocava, vozes, sons do bairro..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Brinquedo Favorito</label>
                <input type="text" value={data.memories?.favoriteChildhoodToy || ''} onChange={(e) => update('memories', 'favoriteChildhoodToy', e.target.value)} placeholder="Qual era o brinquedo ou objeto mais querido?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Esconderijo/Lugar Secreto</label>
                <input type="text" value={data.memories?.childhoodHideout || ''} onChange={(e) => update('memories', 'childhoodHideout', e.target.value)} placeholder="Tinha um cantinho especial ou esconderijo?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Childhood Fears (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Darkness','Monsters','Abandonment','Clowns','Heights','Water','Animals','Thunder','Ghosts','Death','Doctors','Injections','Parents Separation','School','Strangers','Stay sozinho','Insects','Noises','Nightmares','No specific fear'].map(fear => (
                  <button key={fear} onClick={() => toggleArrayItem('memories', 'childhoodFears', fear, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.memories?.childhoodFears || []).includes(fear) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{fear}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Gatilhos Sensoriais Atuais (até 4)</label>
              <div className="flex flex-wrap gap-1">
                {['Perfumes específicos','Musics','Comidas','Lugares','Vozes similares','Estações do ano','Horários do dia','Clima','Texturas','Cores','Fotos','Objetos antigos','Festas/Feriados','Nomes','Nenhum gatilho sensorial'].map(trigger => (
                  <button key={trigger} onClick={() => toggleArrayItem('memories', 'sensoryTriggers', trigger, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.memories?.sensoryTriggers || []).includes(trigger) ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{trigger}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MEMÓRIAS ESPECÍFICAS */}
        <div className="border-2 border-cyan-200 rounded-sm p-4 bg-cyan-50/30">
          <h4 className="font-mono text-sm font-bold text-cyan-800 mb-3">📸 Memórias Específicas</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias da School</label>
              <textarea value={data.memories?.schoolMemories || ''} onChange={(e) => update('memories', 'schoolMemories', e.target.value)} placeholder="Memórias marcantes da época escolar..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Professores que Marcaram</label>
              <textarea value={data.memories?.teachersRemembered || ''} onChange={(e) => update('memories', 'teachersRemembered', e.target.value)} placeholder="Professores que influenciaram (positiva ou negativamente)..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias de Amizades</label>
              <textarea value={data.memories?.friendshipMemories || ''} onChange={(e) => update('memories', 'friendshipMemories', e.target.value)} placeholder="Momentos marcantes com amigos ao longo da vida..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Férias em Família</label>
                <textarea value={data.memories?.familyVacations || ''} onChange={(e) => update('memories', 'familyVacations', e.target.value)} placeholder="Viagens e férias memoráveis..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias de Feriados</label>
                <textarea value={data.memories?.holidayMemories || ''} onChange={(e) => update('memories', 'holidayMemories', e.target.value)} placeholder="Natal, Ano Novo, aniversários..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias de Aniversários</label>
              <textarea value={data.memories?.birthdayMemories || ''} onChange={(e) => update('memories', 'birthdayMemories', e.target.value)} placeholder="Aniversários marcantes (bons ou ruins)..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>

        {/* MEMÓRIAS COMPLEXAS */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-3">🌀 Memórias Complexas</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias Embaraçosas</label>
              <textarea value={data.memories?.embarrassingMemories || ''} onChange={(e) => update('memories', 'embarrassingMemories', e.target.value)} placeholder="Momentos de vergonha que ainda lembra..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias Secretas</label>
              <textarea value={data.memories?.secretMemories || ''} onChange={(e) => update('memories', 'secretMemories', e.target.value)} placeholder="Memórias que guarda para si, que nunca contou a ninguém..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias Reprimidas</label>
              <textarea value={data.memories?.memoriesRepressed || ''} onChange={(e) => update('memories', 'memoriesRepressed', e.target.value)} placeholder="Há lacunas na memória? Períodos que não lembra bem?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Memórias Idealizadas</label>
              <textarea value={data.memories?.memoriesIdealized || ''} onChange={(e) => update('memories', 'memoriesIdealized', e.target.value)} placeholder="Memórias que talvez sejam melhores do que realmente foram..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Se Pudesse Fotografar Momentos</label>
              <textarea value={data.memories?.photographMoments || ''} onChange={(e) => update('memories', 'photographMoments', e.target.value)} placeholder="Se pudesse voltar no tempo para tirar fotos, quais momentos escolheria?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

// Generic placeholder for other tabs

// ============================================================================
// RELATIONSHIPS CONTENT - Complete Implementation with NPCs
// ============================================================================

export default HistoryContent;
