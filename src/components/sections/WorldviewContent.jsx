import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const WorldviewContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('worldview', {
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

  const sections = {
    0: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">🌌 FILOSOFIA CENTRAL</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">As crenças fundamentais sobre a natureza da realidade, vida e existência.</p>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">☀️ Otimismo vs Pessimismo</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Pessimist</span><span>Optimist</span></div>
            <input type="range" min="1" max="9" value={data.philosophy?.optimismPessimism || 5} onChange={(e) => update('philosophy', 'optimismPessimism', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-slate-400 via-gray-200 to-yellow-400 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center"><span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${(data.philosophy?.optimismPessimism || 5) <= 3 ? 'bg-slate-200 text-slate-700' : (data.philosophy?.optimismPessimism || 5) >= 7 ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>
              {['','Deeply Pessimistic','Pessimistic','Somewhat Pessimistic','Leaning Pessimistic','Realistic','Leaning Optimistic','Somewhat Optimistic','Optimistic','Deeply Optimistic'][data.philosophy?.optimismPessimism || 5]}
            </span></div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👥 Visão da Natureza Humana</h4>
          <select value={data.philosophy?.humanNature || ''} onChange={(e) => update('philosophy', 'humanNature', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="inherently-good">Inherently Good — Pessoas são naturalmente boas</option>
            <option value="mostly-good">Mostly Good — A maioria é boa, com exceções</option>
            <option value="blank-slate">Blank Slate — Pessoas são moldadas pelo ambiente</option>
            <option value="complex">Complex — Humanos são complexos demais para generalizar</option>
            <option value="self-interested">Self-Interested — Pessoas agem por interesse próprio</option>
            <option value="mostly-bad">Mostly Bad — A maioria é egoísta ou má</option>
            <option value="inherently-evil">Inherently Evil — Pessoas são naturalmente más</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎲 Livre Arbítrio vs Determinismo</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Determinism</span><span>Free Will</span></div>
            <input type="range" min="1" max="9" value={data.philosophy?.freeWillDeterminism || 5} onChange={(e) => update('philosophy', 'freeWillDeterminism', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-purple-400 via-gray-200 to-green-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌟 Sentido da Vida</h4>
          <select value={data.philosophy?.meaningOfLife || ''} onChange={(e) => update('philosophy', 'meaningOfLife', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <optgroup label="Pessoais"><option value="happiness">Happiness</option><option value="self-actualization">Self-Actualization</option><option value="experience">Experience</option><option value="knowledge">Knowledge</option><option value="creativity">Creativity</option></optgroup>
            <optgroup label="Relacionais"><option value="love">Love</option><option value="family">Family</option><option value="connection">Connection</option><option value="service">Service</option><option value="legacy">Legacy</option></optgroup>
            <optgroup label="Transcendentes"><option value="religious">Religious Purpose</option><option value="spiritual-growth">Spiritual Growth</option></optgroup>
            <optgroup label="Céticos"><option value="no-inherent-meaning">No Inherent Meaning</option><option value="create-own-meaning">Create Own Meaning</option><option value="uncertain">Uncertain</option></optgroup>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📚 Filosofia de Vida</h4>
          <select value={data.philosophy?.lifePhilosophy || ''} onChange={(e) => update('philosophy', 'lifePhilosophy', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="stoicism">Stoicism — Aceitar o que não pode controlar</option>
            <option value="epicureanism">Epicureanism — Buscar prazeres moderados</option>
            <option value="hedonism">Hedonism — Maximizar prazer</option>
            <option value="existentialism">Existentialism — Criar significado através de escolhas</option>
            <option value="nihilism">Nihilism — Nada tem valor inerente</option>
            <option value="absurdism">Absurdism — Aceitar o absurdo</option>
            <option value="pragmatism">Pragmatism — O que funciona importa</option>
            <option value="humanism">Humanism — Valor humano é central</option>
            <option value="buddhist">Buddhist — Superar sofrimento</option>
            <option value="traditionalist">Traditionalist — Sabedoria nas tradições</option>
            <option value="no-philosophy">No Defined Philosophy</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💬 Lema de Vida</h4>
          <input type="text" value={data.philosophy?.lifeMotto || ''} onChange={(e) => update('philosophy', 'lifeMotto', e.target.value)} placeholder="Ex: Carpe diem, Isso também passará..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔄 View on Change</h4>
          <select value={data.philosophy?.viewOnChange || ''} onChange={(e) => update('philosophy', 'viewOnChange', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="embraces">Embraces — Adora novidade</option>
            <option value="accepts">Accepts — Aceita como parte da vida</option>
            <option value="cautious">Cautious — Prefere estabilidade</option>
            <option value="resistant">Resistant — Resiste ativamente</option>
            <option value="fears">Fears — Mudança causa ansiedade</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💀 View on Death</h4>
          <select value={data.philosophy?.viewOnDeath || ''} onChange={(e) => update('philosophy', 'viewOnDeath', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="terrified">Terrified — Medo intenso</option>
            <option value="fears">Fears — Tem medo mas lida</option>
            <option value="accepts">Accepts — Aceita como natural</option>
            <option value="peaceful">Peaceful — Em paz com a ideia</option>
            <option value="welcomes">Welcomes — Vê como libertação</option>
            <option value="denies">Denies — Não pensa nisso</option>
            <option value="defiant">Defiant — Quer vencer a morte</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😢 View on Suffering</h4>
          <select value={data.philosophy?.viewOnSuffering || ''} onChange={(e) => update('philosophy', 'viewOnSuffering', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="meaningless">Meaningless — Aleatório sem propósito</option>
            <option value="builds-character">Builds Character — Fortalece e ensina</option>
            <option value="punishment">Punishment — Consequência de erros</option>
            <option value="test">Test — Teste divino</option>
            <option value="karma">Karma — Resultado de ações passadas</option>
            <option value="necessary">Necessary — Necessário para apreciar alegria</option>
            <option value="avoidable">Avoidable — Pode ser evitado</option>
          </select>
        </div>
      </div>
    ),
    1: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">⚖️ BÚSSOLA MORAL</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">Sistema ético: como decide o que é certo/errado, flexibilidade moral, linhas que nunca cruza.</p>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📜 Framework Ético</h4>
          <select value={data.moral?.ethicalFramework || ''} onChange={(e) => update('moral', 'ethicalFramework', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="deontology">Deontology — Regras são absolutas</option>
            <option value="utilitarianism">Utilitarianism — Maior bem para maior número</option>
            <option value="virtue-ethics">Virtue Ethics — O que pessoa virtuosa faria</option>
            <option value="care-ethics">Care Ethics — Prioriza relações</option>
            <option value="egoism">Ethical Egoism — O melhor para mim é certo</option>
            <option value="relativism">Moral Relativism — Depende do contexto</option>
            <option value="divine-command">Divine Command — O que Deus diz é certo</option>
            <option value="intuition">Moral Intuition — Sente o que é certo</option>
            <option value="pragmatic">Pragmatic — Faz o que funciona</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔄 Flexibilidade Moral</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Rigid</span><span>Flexible</span></div>
            <input type="range" min="1" max="9" value={data.moral?.moralFlexibility || 5} onChange={(e) => update('moral', 'moralFlexibility', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 via-gray-200 to-orange-400 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center"><span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${(data.moral?.moralFlexibility || 5) <= 3 ? 'bg-blue-200 text-blue-800' : (data.moral?.moralFlexibility || 5) >= 7 ? 'bg-orange-200 text-orange-800' : 'bg-gray-100 text-gray-700'}`}>
              {['','Absolutist','Rigid','Principled','Moderate','Balanced','Pragmatic','Flexible','Very Flexible','Situational'][data.moral?.moralFlexibility || 5]}
            </span></div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎯 "Os Fins Justificam os Meios"</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Never</span><span>Always</span></div>
            <input type="range" min="1" max="9" value={data.moral?.endsJustifyMeans || 5} onChange={(e) => update('moral', 'endsJustifyMeans', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 via-gray-200 to-red-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">🤔 Dilemas Morais</h4>
          <div className="space-y-4">
            {[{key:'wouldLieToProtect',label:'Mentiria para proteger alguém?'},{key:'wouldStealIfStarving',label:'Roubaria comida se morrendo de fome?'},{key:'wouldKillInDefense',label:'Mataria em legítima defesa?'}].map(q => (
              <div key={q.key}>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">{q.label}</label>
                <div className="flex gap-2">
                  {['never','unlikely','depends','likely','absolutely'].map(opt => (
                    <button key={opt} onClick={() => update('moral', q.key, opt)} className={`flex-1 py-1.5 rounded font-mono text-[10px] transition-all ${data.moral?.[q.key] === opt ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚫 Linhas que Nunca Cruzaria</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Ações que NUNCA faria. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Betray Family','Betray Friends','Harm Children','Harm Innocents','Kill (Anyone)','Torture','Sexual Violence','Steal from Poor','Break Promise','Snitch/Inform','Use Drugs','Adultery','Animal Cruelty'].map(line => (
              <button key={line} onClick={() => toggleArrayItem('moral', 'linesNeverCrossed', line, 8)} className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${(data.moral?.linesNeverCrossed || []).includes(line) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{line}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📋 Código Pessoal</h4>
          <textarea value={data.moral?.personalCode || ''} onChange={(e) => update('moral', 'personalCode', e.target.value)} placeholder="Regras pessoais: 'Sempre pago dívidas', 'Nunca ataco primeiro'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😔 Consciência Pesada</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>No Guilt</span><span>Heavy Guilt</span></div>
            <input type="range" min="1" max="9" value={data.moral?.guiltyConscienceLevel || 5} onChange={(e) => update('moral', 'guiltyConscienceLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-slate-400 via-gray-200 to-purple-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">🙏 CRENÇAS & FÉ</h3>
          <p className="font-mono text-xs text-purple-800 leading-relaxed">Relação com religião, espiritualidade, sobrenatural e transcendente.</p>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⛪ Afiliação Religiosa</h4>
          <select value={data.beliefs?.religiousAffiliation || ''} onChange={(e) => update('beliefs', 'religiousAffiliation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <optgroup label="Não-Religiosos">
              <option value="atheist">Atheist</option><option value="agnostic">Agnostic</option><option value="spiritual">Spiritual but not Religious</option>
            </optgroup>
            <optgroup label="Cristianismo">
              <option value="catholic">Catholic</option><option value="orthodox">Orthodox</option><option value="protestant">Protestant</option><option value="evangelical">Evangelical</option><option value="pentecostal">Pentecostal</option>
            </optgroup>
            <optgroup label="Outras Abraâmicas">
              <option value="sunni">Sunni Muslim</option><option value="shia">Shia Muslim</option><option value="jewish">Jewish</option>
            </optgroup>
            <optgroup label="Orientais">
              <option value="buddhist">Buddhist</option><option value="hindu">Hindu</option><option value="taoist">Taoist</option><option value="shinto">Shinto</option>
            </optgroup>
            <optgroup label="Outras">
              <option value="pagan">Pagan/Wicca</option><option value="new-age">New Age</option><option value="spiritualist">Spiritualist</option><option value="syncretic">Syncretic</option><option value="other">Other</option>
            </optgroup>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📿 Nível de Religiosidade</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Non-Practicing</span><span>Devout</span></div>
            <input type="range" min="1" max="9" value={data.beliefs?.religiosityLevel || 5} onChange={(e) => update('beliefs', 'religiosityLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 via-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center"><span className="inline-block px-3 py-1 rounded font-mono text-sm font-bold bg-purple-100 text-purple-700">
              {['','Non-Practicing','Cultural Only','Occasional','Somewhat','Moderate','Regular','Committed','Very Devout','Extremely Devout'][data.beliefs?.religiosityLevel || 5]}
            </span></div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">✨ View on Afterlife</h4>
          <select value={data.beliefs?.viewOnAfterlife || ''} onChange={(e) => update('beliefs', 'viewOnAfterlife', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="nothing">Nothing — Morte é o fim</option>
            <option value="uncertain">Uncertain — Não sabe</option>
            <option value="hopes">Hopes — Espera que haja algo</option>
            <option value="heaven-hell">Heaven/Hell</option>
            <option value="reincarnation">Reincarnation</option>
            <option value="nirvana">Nirvana/Liberation</option>
            <option value="spirit-world">Spirit World</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👻 Posição sobre Sobrenatural</h4>
          <select value={data.beliefs?.supernaturalStance || ''} onChange={(e) => update('beliefs', 'supernaturalStance', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="hardline-skeptic">Hardline Skeptic — Nada existe</option>
            <option value="skeptic">Skeptic — Duvida mas aberto</option>
            <option value="curious">Curious — Quer investigar</option>
            <option value="open">Open-Minded — Acha possível</option>
            <option value="believer">Believer — Acredita</option>
            <option value="experiencer">Experiencer — Já teve experiências</option>
            <option value="practitioner">Practitioner — Pratica</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍀 Superstições</h4>
          <div className="flex flex-wrap gap-2">
            {['Black Cats','Friday 13th','Broken Mirror','Knock on Wood','Evil Eye','Full Moon','Lucky Numbers','Astrology','Tarot','Dreams as Omens','Karma is Literal','No Superstitions'].map(item => (
              <button key={item} onClick={() => toggleArrayItem('beliefs', 'superstitions', item, 6)} className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${(data.beliefs?.superstitions || []).includes(item) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🧘 Práticas Espirituais</h4>
          <div className="flex flex-wrap gap-2">
            {['Prayer','Meditation','Yoga','Fasting','Church Attendance','Scripture Reading','Rituals','Chanting','Offerings','Ancestor Veneration','Crystal Healing','None'].map(p => (
              <button key={p} onClick={() => toggleArrayItem('beliefs', 'spiritualPractices', p, 6)} className={`px-3 py-1 rounded-full font-mono text-[10px] transition-all ${(data.beliefs?.spiritualPractices || []).includes(p) ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Destino vs Escolha</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Everything is Fate</span><span>We Make Our Path</span></div>
            <input type="range" min="1" max="9" value={data.beliefs?.fateVsChoice || 5} onChange={(e) => update('beliefs', 'fateVsChoice', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 via-gray-200 to-green-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">🏛️ POLÍTICO & SOCIAL</h3>
          <p className="font-mono text-xs text-red-800 leading-relaxed">Posicionamentos políticos, econômicos e sociais. Personagens podem ter visões diversas.</p>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⬅️ Espectro Político ➡️</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Far Left</span><span>Far Right</span></div>
            <input type="range" min="1" max="9" value={data.political?.politicalSpectrum || 5} onChange={(e) => update('political', 'politicalSpectrum', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-500 via-gray-300 to-blue-500 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center"><span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${(data.political?.politicalSpectrum || 5) <= 3 ? 'bg-red-200 text-red-800' : (data.political?.politicalSpectrum || 5) >= 7 ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
              {['','Far Left','Left','Center-Left','Lean Left','Centrist','Lean Right','Center-Right','Right','Far Right'][data.political?.politicalSpectrum || 5]}
            </span></div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💰 Visão Econômica</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Socialist</span><span>Capitalist</span></div>
            <input type="range" min="1" max="9" value={data.political?.economicViews || 5} onChange={(e) => update('political', 'economicViews', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-400 via-gray-200 to-green-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👥 Visão Social</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Progressive</span><span>Conservative</span></div>
            <input type="range" min="1" max="9" value={data.political?.socialViews || 5} onChange={(e) => update('political', 'socialViews', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-pink-400 via-gray-200 to-amber-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗽 Liberdade vs Autoridade</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Libertarian</span><span>Authoritarian</span></div>
            <input type="range" min="1" max="9" value={data.political?.libertarianAuthoritarian || 5} onChange={(e) => update('political', 'libertarianAuthoritarian', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-yellow-400 via-gray-200 to-slate-500 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏴 Nacionalismo</h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500"><span>Globalist</span><span>Nationalist</span></div>
            <input type="range" min="1" max="9" value={data.political?.nationalismLevel || 5} onChange={(e) => update('political', 'nationalismLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 via-gray-200 to-red-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">🏢 Confiança em Instituições</h4>
          <div className="grid grid-cols-2 gap-4">
            {[{key:'trustInGovernment',label:'🏛️ Government'},{key:'trustInMedia',label:'📺 Media'},{key:'trustInScience',label:'🔬 Science'},{key:'trustInReligion',label:'⛪ Religious Inst.'}].map(item => (
              <div key={item.key}>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">{item.label}</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(level => (
                    <button key={level} onClick={() => update('political', item.key, level)} className={`flex-1 py-1 rounded font-mono text-[10px] transition-all ${(data.political?.[item.key] || 3) === level ? level <= 2 ? 'bg-red-500 text-white' : level >= 4 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{level}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-400 mt-2 text-center">1 = Nenhuma, 5 = Total</p>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">✊ Causas que Apoia</h4>
          <div className="flex flex-wrap gap-2">
            {['Environment','Human Rights','LGBTQ+ Rights','Racial Justice','Economic Equality','Gun Rights','Gun Control','Religious Freedom','Free Speech','Anti-War','Strong Military','Immigration Reform','Border Security','Criminal Justice Reform','Traditional Values','None/Apolitical'].map(cause => (
              <button key={cause} onClick={() => toggleArrayItem('political', 'causesSupported', cause, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.political?.causesSupported || []).includes(cause) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{cause}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗳️ Engajamento Político</h4>
          <select value={data.political?.politicalEngagement || ''} onChange={(e) => update('political', 'politicalEngagement', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="apathetic">Apathetic — Não se importa</option>
            <option value="passive">Passive — Acompanha mas não participa</option>
            <option value="voter">Voter — Só vota</option>
            <option value="informed">Informed — Bem informado, discute</option>
            <option value="advocate">Advocate — Defende causas</option>
            <option value="activist">Activist — Participa de movimentos</option>
            <option value="radical">Radical — Ações extremas</option>
          </select>
        </div>
      </div>
    ),
    4: (
      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-emerald-900 mb-2">⚖️ JULGAMENTOS & VALORES</h3>
          <p className="font-mono text-xs text-emerald-800 leading-relaxed">O que respeita, despreza, e como julga outros. Valores fundamentais e prioridades.</p>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👍 O Que Respeita</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Qualidades que admira. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Intelligence','Wisdom','Kindness','Honesty','Integrity','Loyalty','Courage','Strength','Resilience','Ambition','Success','Wealth','Creativity','Humor','Humility','Hard Work','Independence','Authenticity','Leadership','Faith','Family Values'].map(item => (
              <button key={item} onClick={() => toggleArrayItem('judgments', 'whatTheyRespect', item, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.judgments?.whatTheyRespect || []).includes(item) ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👎 O Que Despreza</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Qualidades que detesta. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Weakness','Cowardice','Dishonesty','Hypocrisy','Betrayal','Cruelty','Arrogance','Narcissism','Laziness','Incompetence','Stupidity','Ignorance','Greed','Selfishness','Conformity','Manipulation','Injustice','Complaining','Victimhood','Entitlement'].map(item => (
              <button key={item} onClick={() => toggleArrayItem('judgments', 'whatTheyDespise', item, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.judgments?.whatTheyDespise || []).includes(item) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌟 Modelos/Inspirações</h4>
          <textarea value={data.judgments?.roleModels || ''} onChange={(e) => update('judgments', 'roleModels', e.target.value)} placeholder="Pessoas que admira ou quer ser como..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👃 Olha com Desdém</h4>
          <textarea value={data.judgments?.looksDownOn || ''} onChange={(e) => update('judgments', 'looksDownOn', e.target.value)} placeholder="Tipos de pessoas que menospreza..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚠️ Preconceitos Conhecidos</h4>
          <p className="font-mono text-[10px] text-amber-600 mb-3">Para personagens realistas, não endosso. Até 5.</p>
          <div className="flex flex-wrap gap-2">
            {['Against Poor','Against Rich','Against Uneducated','Against Intellectuals','Against Young','Against Old','Against Immigrants','Against Certain Religions','Against Atheists','Against Certain Races','Against Disabled','Against Overweight','Against Rural','Against Urban','None Significant'].map(item => (
              <button key={item} onClick={() => toggleArrayItem('judgments', 'knownPrejudices', item, 5)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.judgments?.knownPrejudices || []).includes(item) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔍 Como Julga Outros</h4>
          <select value={data.judgments?.howJudgesOthers || ''} onChange={(e) => update('judgments', 'howJudgesOthers', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="actions">By Actions — Ações falam mais alto</option>
            <option value="intentions">By Intentions — Importa o que quis fazer</option>
            <option value="results">By Results — Só resultados importam</option>
            <option value="character">By Character — Caráter geral</option>
            <option value="appearance">By Appearance — Primeira impressão</option>
            <option value="status">By Status — Posição social</option>
            <option value="reputation">By Reputation — O que dizem</option>
            <option value="potential">By Potential — O que pode se tornar</option>
            <option value="non-judgmental">Non-Judgmental — Tenta não julgar</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏆 Hierarquia de Valores (Top 5)</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Os 5 valores mais importantes, em ordem de prioridade.</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {['Family','Friends','Love','Freedom','Security','Health','Wealth','Power','Success','Career','Knowledge','Truth','Justice','Honor','Loyalty','Faith','Adventure','Pleasure','Peace','Creativity','Independence','Legacy'].map(value => {
              const currentValues = data.judgments?.topValues || [];
              const index = currentValues.indexOf(value);
              return (
                <button key={value} onClick={() => {
                  if (index >= 0) update('judgments', 'topValues', currentValues.filter(v => v !== value));
                  else if (currentValues.length < 5) update('judgments', 'topValues', [...currentValues, value]);
                }} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${index >= 0 ? 'bg-emerald-500 text-white' : currentValues.length >= 5 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {index >= 0 && <span className="mr-1">#{index + 1}</span>}{value}
                </button>
              );
            })}
          </div>
          {(data.judgments?.topValues || []).length > 0 && (
            <div className="bg-emerald-50 rounded p-3 border border-emerald-200">
              <p className="font-mono text-[10px] text-emerald-800 mb-2">Ordem:</p>
              <div className="flex flex-wrap gap-2">
                {(data.judgments?.topValues || []).map((value, idx) => (
                  <span key={value} className="px-2 py-1 bg-emerald-200 rounded font-mono text-[10px] text-emerald-800">#{idx + 1} {value}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// FAVORITES CONTENT - Complete Implementation
// ============================================================================


export default WorldviewContent;
