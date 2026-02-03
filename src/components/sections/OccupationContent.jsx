import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const OccupationContent = ({ data, updateData, subtab }) => {
  const [editingJobIndex, setEditingJobIndex] = React.useState(null);

  // ========== SALARY CALCULATION SYSTEM ==========

  // Salário base anual por indústria (em USD para referência global)
  const industrySalaryBase = {
    // Technology - Alta remuneração
    'tech-software': 95000, 'tech-saas': 100000, 'tech-ai': 130000, 'tech-cybersecurity': 110000,
    'tech-data': 105000, 'tech-fintech': 115000, 'tech-gaming': 85000, 'tech-blockchain': 120000,
    // Finance - Alta remuneração
    'fin-banking': 90000, 'fin-investment': 150000, 'fin-pe-vc': 180000, 'fin-insurance': 75000,
    'biz-consulting': 95000, 'biz-legal': 110000, 'biz-real-estate': 70000,
    // Healthcare
    'health-hospital': 80000, 'health-pharma': 95000, 'health-biotech': 100000, 'health-mental': 65000,
    // Media & Creative
    'media-film': 70000, 'media-tv': 65000, 'media-music': 55000, 'media-advertising': 65000,
    'media-marketing': 60000, 'creative-design': 55000,
    // Education
    'edu-k12': 45000, 'edu-higher': 65000, 'edu-online': 55000,
    // Retail & Hospitality
    'retail-general': 35000, 'retail-ecommerce': 55000, 'hosp-restaurant': 32000, 'hosp-hotel': 38000,
    // Manufacturing & Energy
    'mfg-automotive': 65000, 'mfg-aerospace': 85000, 'energy-oil-gas': 95000, 'energy-renewable': 75000,
    // Government & Non-Profit
    'gov-federal': 70000, 'gov-military': 55000, 'npo-charity': 45000, 'npo-ngo': 50000,
    // Other
    'trade-construction': 55000, 'trans-logistics': 50000, 'ag-farming': 40000,
    'other-security': 42000, 'other-adult': 60000, 'other-criminal': 80000, 'other-unknown': 50000
  };

  // Multiplicador por nível de senioridade
  const seniorityMultiplier = {
    'intern': 0.25, 'trainee': 0.35, 'entry': 0.45, 'associate': 0.55,
    'junior': 0.60, 'mid': 0.85, 'senior': 1.15, 'staff': 1.45, 'specialist': 1.10, 'expert': 1.35,
    'team-lead': 1.25, 'supervisor': 1.15, 'manager': 1.40, 'senior-manager': 1.65,
    'director': 2.00, 'senior-director': 2.40, 'vp': 2.80, 'svp': 3.50, 'evp': 4.00,
    'c-level': 4.50, 'ceo': 6.00, 'coo': 4.80, 'cfo': 5.00, 'cto': 5.20, 'cmo': 4.50,
    'founder': 3.00, 'co-founder': 2.50, 'owner': 2.80, 'partner': 3.50,
    'freelance-junior': 0.55, 'freelance-experienced': 0.90, 'freelance-expert': 1.30,
    'contractor': 1.10, 'consultant': 1.40, 'na': 0.70
  };

  // Multiplicador por tipo de empresa
  const companyTypeMultiplier = {
    'startup-early': 0.75, 'startup-late': 0.90, 'scaleup': 1.05, 'sme-small': 0.80, 'sme-medium': 0.90,
    'large-corp': 1.10, 'enterprise': 1.20, 'multinational': 1.30, 'public-company': 1.25, 'family-business': 0.85,
    'agency': 0.85, 'consultancy': 1.15, 'law-firm': 1.30, 'big-four': 1.25, 'studio': 0.80,
    'government': 0.90, 'military': 0.85, 'ngo': 0.70, 'university': 0.85, 'hospital': 1.00,
    'solo-freelance': 0.90, 'own-business': 1.00, 'gig-platform': 0.60,
    'criminal-org': 1.50, 'classified': 1.20
  };

  // Multiplicador por tamanho da empresa
  const companySizeMultiplier = {
    '1': 0.70, '2-10': 0.80, '11-50': 0.90, '51-200': 1.00,
    '201-1000': 1.10, '1001-10000': 1.20, '10000+': 1.30
  };

  // Multiplicador por alcance global
  const companyReachMultiplier = { 'local': 0.85, 'regional': 0.95, 'national': 1.00, 'global': 1.20 };

  // Multiplicador por tempo na empresa
  const tenureMultiplier = {
    'less-3m': 0.95, '3-6m': 0.97, '6-12m': 1.00, '1-2y': 1.03, '2-3y': 1.06,
    '3-5y': 1.10, '5-10y': 1.15, '10-20y': 1.20, '20y+': 1.25, 'founder': 1.00
  };

  // Multiplicador por horas trabalhadas
  const hoursMultiplier = {
    'less-10': 0.25, '10-20': 0.50, '20-30': 0.75, '30-40': 1.00, '40-50': 1.10,
    '50-60': 1.15, '60-70': 1.18, '70+': 1.20, 'variable': 1.00
  };

  // Multiplicador por área funcional
  const functionalAreaMultiplier = {
    'Engineering': 1.15, 'Software Development': 1.20, 'Data Science': 1.25, 'Product Management': 1.15,
    'Project Management': 1.00, 'Design/UX': 1.05, 'Marketing': 0.95, 'Sales': 1.10,
    'Business Development': 1.05, 'Customer Success': 0.90, 'Operations': 0.95, 'Finance': 1.10,
    'Accounting': 0.95, 'HR/People': 0.90, 'Legal': 1.20, 'Strategy': 1.15, 'Analytics': 1.10,
    'Research': 1.05, 'QA/Testing': 0.95, 'DevOps': 1.15, 'IT/Infrastructure': 1.00,
    'Supply Chain': 0.95, 'Manufacturing': 0.90, 'Admin/Assistant': 0.70, 'Communications': 0.85,
    'Content/Writing': 0.80, 'Social Media': 0.75, 'Consulting': 1.15, 'General Management': 1.10,
    'Executive Leadership': 1.50, 'Founder': 1.30, 'Creative Direction': 1.10, 'Teaching/Education': 0.75,
    'Healthcare/Clinical': 1.05, 'Scientific Research': 1.00, 'Manual Labor': 0.60, 'Skilled Trades': 0.80,
    'Food Service': 0.55, 'Retail Sales': 0.60, 'Security': 0.70, 'Military/Defense': 0.85,
    'Religious/Ministry': 0.60, 'Freelance/Gig': 0.85, 'Other': 0.80
  };

  // Multiplicador por status de emprego
  const employmentStatusMultiplier = {
    'full-time': 1.00, 'part-time': 0.95, 'contract': 1.15, 'temporary': 0.90, 'seasonal': 0.85,
    'probationary': 0.90, 'intern-paid': 0.30, 'intern-unpaid': 0.00, 'apprentice': 0.35, 'trainee': 0.40,
    'freelancer': 1.10, 'consultant': 1.25, 'contractor': 1.15, 'gig-worker': 0.70,
    'business-owner': 1.20, 'entrepreneur': 1.00, 'startup-founder': 0.80, 'solopreneur': 0.90,
    'creator': 0.80, 'influencer': 0.90, 'artist-independent': 0.70,
    'student-working': 0.50, 'semi-retired': 0.60, 'volunteer': 0.00,
    'military': 0.85, 'criminal': 1.50, 'unknown': 0.80
  };

  // Multiplicador por gestão de pessoas
  const managementMultiplier = {
    'no': 1.00, 'informal': 1.03, '1-3': 1.08, '4-10': 1.15,
    '11-25': 1.25, '26-50': 1.35, '50-100': 1.50, '100+': 1.70
  };

  // Main salary calculation function
  const calculateSalary = (job) => {
    if (!job.industry && !job.seniorityLevel) return null;

    let baseSalary = industrySalaryBase[job.industry] || 50000;

    const seniority = seniorityMultiplier[job.seniorityLevel] || 1.00;
    const compType = companyTypeMultiplier[job.companyType] || 1.00;
    const compSize = companySizeMultiplier[job.companySize] || 1.00;
    const compReach = companyReachMultiplier[job.companyReach] || 1.00;
    const tenure = tenureMultiplier[job.timeAtCompany] || 1.00;
    const hours = hoursMultiplier[job.hoursPerWeek] || 1.00;
    const empStatus = employmentStatusMultiplier[job.employmentStatus] || 1.00;
    const management = managementMultiplier[job.managesPeople] || 1.00;

    let funcAreaMult = 1.00;
    if (job.functionalAreas && job.functionalAreas.length > 0) {
      const areaMultipliers = job.functionalAreas.map(area => functionalAreaMultiplier[area] || 1.00);
      funcAreaMult = areaMultipliers.reduce((a, b) => a + b, 0) / areaMultipliers.length;
    }

    const estimatedAnnual = baseSalary * seniority * compType * compSize * compReach * tenure * hours * empStatus * management * funcAreaMult;
    const minSalary = estimatedAnnual * 0.85;
    const maxSalary = estimatedAnnual * 1.15;

    return {
      annual: Math.round(estimatedAnnual),
      monthly: Math.round(estimatedAnnual / 12),
      range: { min: Math.round(minSalary), max: Math.round(maxSalary) },
      factors: { base: baseSalary, seniority, compType, compSize, compReach, tenure, hours, empStatus, management, funcArea: funcAreaMult },
      confidence: calculateConfidence(job)
    };
  };

  const calculateConfidence = (job) => {
    const fields = [job.industry, job.seniorityLevel, job.companyType, job.companySize, job.companyReach,
                    job.timeAtCompany, job.hoursPerWeek, job.employmentStatus, job.managesPeople, job.functionalAreas?.length > 0];
    const filled = fields.filter(Boolean).length;
    const percentage = (filled / fields.length) * 100;
    if (percentage >= 80) return { level: 'high', label: 'Alta', color: 'emerald' };
    if (percentage >= 50) return { level: 'medium', label: 'Média', color: 'yellow' };
    return { level: 'low', label: 'Baixa', color: 'red' };
  };

  // Componente de exibição do salário estimado
  const SalaryCalculator = ({ job }) => {
    const estimate = calculateSalary(job);
    const [showDetails, setShowDetails] = React.useState(false);
    const [currency, setCurrency] = React.useState('USD');
    const conversionRates = { USD: 1, BRL: 5.0, EUR: 0.92, GBP: 0.79 };
    const convert = (value) => Math.round(value * conversionRates[currency]);
    const symbols = { USD: '$', BRL: 'R$', EUR: '€', GBP: '£' };

    if (!estimate) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-sm p-4 bg-gray-50">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-mono text-xs">💰 Fill Industry and Seniority to see salary estimate</span>
          </div>
        </div>
      );
    }

    return (
      <div className="border-2 border-emerald-300 rounded-sm p-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-mono text-sm font-bold text-emerald-800 flex items-center gap-2">
            💰 Automatic Salary Estimate
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
              estimate.confidence.level === 'high' ? 'bg-emerald-100 text-emerald-700' :
              estimate.confidence.level === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>Confiança {estimate.confidence.label}</span>
          </h4>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-white border border-emerald-200 rounded px-2 py-1 font-mono text-[10px]">
            <option value="USD">USD ($)</option>
            <option value="BRL">BRL (R$)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-sm p-3 border border-emerald-200">
            <div className="font-mono text-[10px] text-gray-500 mb-1">Salário Anual Estimado</div>
            <div className="font-mono text-xl font-bold text-emerald-700">{symbols[currency]}{convert(estimate.annual).toLocaleString()}</div>
            <div className="font-mono text-[9px] text-gray-400">Range: {symbols[currency]}{convert(estimate.range.min).toLocaleString()} - {symbols[currency]}{convert(estimate.range.max).toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-sm p-3 border border-emerald-200">
            <div className="font-mono text-[10px] text-gray-500 mb-1">Salário Mensal Estimado</div>
            <div className="font-mono text-xl font-bold text-teal-700">{symbols[currency]}{convert(estimate.monthly).toLocaleString()}</div>
          </div>
        </div>

        <button onClick={() => setShowDetails(!showDetails)} className="w-full py-2 bg-emerald-100 hover:bg-emerald-200 rounded text-emerald-700 font-mono text-[10px] flex items-center justify-center gap-1">
          {showDetails ? '▲ Ocultar' : '▼ Ver'} Fatores do Cálculo
        </button>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-emerald-200">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {[
                { label: 'Base', value: `$${estimate.factors.base.toLocaleString()}` },
                { label: 'Senioridade', mult: estimate.factors.seniority },
                { label: 'Tipo Empresa', mult: estimate.factors.compType },
                { label: 'Tamanho', mult: estimate.factors.compSize },
                { label: 'Alcance', mult: estimate.factors.compReach },
                { label: 'Tempo', mult: estimate.factors.tenure },
                { label: 'Horas', mult: estimate.factors.hours },
                { label: 'Status', mult: estimate.factors.empStatus },
                { label: 'Gestão', mult: estimate.factors.management },
                { label: 'Área', mult: estimate.factors.funcArea },
              ].map((f, i) => (
                <div key={i} className="bg-white/50 rounded p-2 border border-emerald-100 text-center">
                  <div className="font-mono text-[8px] text-gray-500">{f.label}</div>
                  <div className={`font-mono text-xs font-bold ${f.mult && f.mult > 1 ? 'text-emerald-600' : f.mult && f.mult < 1 ? 'text-red-500' : 'text-gray-700'}`}>
                    {f.value || `×${f.mult?.toFixed(2)}`}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-mono text-[9px] text-yellow-700">⚠️ Estimativa baseada em médias de mercado. Valores reais variam por região, empresa e negociação.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Template para novo emprego
  const emptyJob = {
    id: Date.now(),
    isPrimary: false,
    employmentStatus: '',
    workArrangement: '',
    jobTitle: '',
    seniorityLevel: '',
    jobDescription: '',
    timeInRole: '',
    timeAtCompany: '',
    managesPeople: '',
    hoursPerWeek: '',
    industry: '',
    functionalAreas: [],
    companyName: '',
    companyType: '',
    companySize: '',
    companyReach: '',
    companyAge: '',
    companyReputation: '',
    companyCulture: [],
    estimatedSalary: null,
    salaryOverride: ''
  };

  const update = (section, field, value) => {
    updateData('occupation', {
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

  // Funções para gerenciar múltiplos empregos
  const addJob = () => {
    const jobs = data.jobs || [];
    const newJob = { ...emptyJob, id: Date.now(), isPrimary: jobs.length === 0 };
    updateData('occupation', { ...data, jobs: [...jobs, newJob] });
    setEditingJobIndex(jobs.length);
  };

  const updateJob = (index, field, value) => {
    const jobs = [...(data.jobs || [])];
    jobs[index] = { ...jobs[index], [field]: value };
    updateData('occupation', { ...data, jobs });
  };

  const toggleJobArrayItem = (index, field, item, maxItems = 10) => {
    const jobs = [...(data.jobs || [])];
    const current = jobs[index]?.[field] || [];
    if (current.includes(item)) {
      jobs[index] = { ...jobs[index], [field]: current.filter(i => i !== item) };
    } else if (current.length < maxItems) {
      jobs[index] = { ...jobs[index], [field]: [...current, item] };
    }
    updateData('occupation', { ...data, jobs });
  };

  const removeJob = (index) => {
    const jobs = [...(data.jobs || [])];
    jobs.splice(index, 1);
    // Se removeu o emprego principal, marcar o primeiro como principal
    if (jobs.length > 0 && !jobs.some(j => j.isPrimary)) {
      jobs[0].isPrimary = true;
    }
    updateData('occupation', { ...data, jobs });
    setEditingJobIndex(null);
  };

  const setPrimaryJob = (index) => {
    const jobs = (data.jobs || []).map((job, i) => ({
      ...job,
      isPrimary: i === index
    }));
    updateData('occupation', { ...data, jobs });
  };

  const getJobSummary = (job) => {
    const title = job.jobTitle || 'Sem título';
    const company = job.companyName || 'Empresa não informada';
    const status = job.employmentStatus ? job.employmentStatus.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Status não definido';
    return { title, company, status };
  };

  // Componente do formulário de emprego
  const JobForm = ({ job, index }) => (
    <div className="space-y-6">
      {/* Header do formulário */}
      <div className="flex items-center justify-between bg-emerald-100 border border-emerald-300 rounded-sm p-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setEditingJobIndex(null)} className="text-emerald-700 hover:text-emerald-900">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h3 className="font-mono text-sm font-bold text-emerald-900">
              {job.isPrimary ? '⭐ ' : ''}Editando Emprego #{index + 1}
            </h3>
            <p className="font-mono text-[10px] text-emerald-700">{job.jobTitle || 'Novo emprego'} {job.companyName ? `@ ${job.companyName}` : ''}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!job.isPrimary && (
            <button onClick={() => setPrimaryJob(index)} className="px-2 py-1 bg-yellow-500 text-white font-mono text-[10px] rounded hover:bg-yellow-600">
              ⭐ Tornar Principal
            </button>
          )}
          <button onClick={() => removeJob(index)} className="px-2 py-1 bg-red-500 text-white font-mono text-[10px] rounded hover:bg-red-600">
            🗑️ Remover
          </button>
        </div>
      </div>

      {/* EMPLOYMENT STATUS */}
      <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
        <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">📊 Status de Emprego</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status Atual</label>
            <select value={job.employmentStatus || ''} onChange={(e) => updateJob(index, 'employmentStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <optgroup label="Employed">
                <option value="full-time">Full-Time Employee</option>
                <option value="part-time">Part-Time Employee</option>
                <option value="contract">Contract Worker</option>
                <option value="temporary">Temporary</option>
                <option value="seasonal">Seasonal</option>
                <option value="probationary">Probationary</option>
                <option value="intern-paid">Paid Intern</option>
                <option value="intern-unpaid">Unpaid Intern</option>
                <option value="apprentice">Apprentice</option>
                <option value="trainee">Trainee</option>
              </optgroup>
              <optgroup label="Self-Employed">
                <option value="freelancer">Freelancer</option>
                <option value="consultant">Independent Consultant</option>
                <option value="contractor">Independent Contractor</option>
                <option value="gig-worker">Gig Worker</option>
                <option value="business-owner">Business Owner</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="startup-founder">Startup Founder</option>
                <option value="solopreneur">Solopreneur</option>
                <option value="creator">Content Creator</option>
                <option value="influencer">Influencer</option>
                <option value="artist-independent">Independent Artist</option>
              </optgroup>
              <optgroup label="Other">
                <option value="student-working">Working Student</option>
                <option value="semi-retired">Semi-Retired</option>
                <option value="volunteer">Volunteer</option>
                <option value="military">Military Service</option>
                <option value="criminal">Criminal Activities</option>
                <option value="unknown">Unknown/Mysterious</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Regime de Trabalho</label>
            <select value={job.workArrangement || ''} onChange={(e) => updateJob(index, 'workArrangement', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="office-full">100% Office</option>
              <option value="office-mostly">Mostly Office</option>
              <option value="hybrid-balanced">Hybrid Balanced</option>
              <option value="hybrid-mostly-remote">Hybrid Mostly Remote</option>
              <option value="remote-full">100% Remote</option>
              <option value="remote-async">Remote Async</option>
              <option value="digital-nomad">Digital Nomad</option>
              <option value="field-work">Field Work</option>
              <option value="traveling">Traveling</option>
              <option value="on-site-client">On-Site at Client</option>
              <option value="multiple-locations">Multiple Locations</option>
              <option value="shift-work">Shift Work</option>
              <option value="on-call">On-Call</option>
              <option value="flexible">Fully Flexible</option>
              <option value="na">N/A</option>
            </select>
          </div>
        </div>
      </div>

      {/* JOB TITLE & ROLE */}
      <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
        <h4 className="font-mono text-sm font-bold text-emerald-800 mb-3">👔 Cargo & Função</h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Cargo/Título</label>
              <input type="text" value={job.jobTitle || ''} onChange={(e) => updateJob(index, 'jobTitle', e.target.value)} placeholder="Ex: Software Engineer, Marketing Manager..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nível de Senioridade</label>
              <select value={job.seniorityLevel || ''} onChange={(e) => updateJob(index, 'seniorityLevel', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <optgroup label="Entry Level">
                  <option value="intern">Intern/Estagiário</option>
                  <option value="trainee">Trainee</option>
                  <option value="entry">Entry Level/Júnior</option>
                  <option value="associate">Associate</option>
                </optgroup>
                <optgroup label="Individual Contributor">
                  <option value="junior">Junior (1-2 years)</option>
                  <option value="mid">Mid-Level (3-5 years)</option>
                  <option value="senior">Senior (5-8 years)</option>
                  <option value="staff">Staff/Principal (8+ years)</option>
                  <option value="specialist">Specialist</option>
                  <option value="expert">Expert/Authority</option>
                </optgroup>
                <optgroup label="Management">
                  <option value="team-lead">Team Lead</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="manager">Manager</option>
                  <option value="senior-manager">Senior Manager</option>
                  <option value="director">Director</option>
                  <option value="senior-director">Senior Director</option>
                  <option value="vp">Vice President</option>
                  <option value="svp">Senior Vice President</option>
                  <option value="evp">Executive Vice President</option>
                </optgroup>
                <optgroup label="Executive">
                  <option value="c-level">C-Level Executive</option>
                  <option value="ceo">CEO/Chief Executive Officer</option>
                  <option value="coo">COO/Chief Operating Officer</option>
                  <option value="cfo">CFO/Chief Financial Officer</option>
                  <option value="cto">CTO/Chief Technology Officer</option>
                  <option value="cmo">CMO/Chief Marketing Officer</option>
                  <option value="founder">Founder</option>
                  <option value="co-founder">Co-Founder</option>
                  <option value="owner">Owner/Proprietário</option>
                  <option value="partner">Partner</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="freelance-junior">Freelance - Junior</option>
                  <option value="freelance-experienced">Freelance - Experienced</option>
                  <option value="freelance-expert">Freelance - Expert</option>
                  <option value="contractor">Contractor</option>
                  <option value="consultant">Consultant</option>
                  <option value="na">N/A</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Descrição do Trabalho</label>
            <textarea value={job.jobDescription || ''} onChange={(e) => updateJob(index, 'jobDescription', e.target.value)} placeholder="What do they do daily? Main responsibilities..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tempo no Cargo</label>
              <select value={job.timeInRole || ''} onChange={(e) => updateJob(index, 'timeInRole', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="less-3m">Menos de 3 meses</option>
                <option value="3-6m">3-6 meses</option>
                <option value="6-12m">6-12 meses</option>
                <option value="1-2y">1-2 anos</option>
                <option value="2-3y">2-3 anos</option>
                <option value="3-5y">3-5 anos</option>
                <option value="5-10y">5-10 anos</option>
                <option value="10-20y">10-20 anos</option>
                <option value="20y+">20+ anos</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tempo na Empresa</label>
              <select value={job.timeAtCompany || ''} onChange={(e) => updateJob(index, 'timeAtCompany', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="less-3m">Menos de 3 meses</option>
                <option value="3-6m">3-6 meses</option>
                <option value="6-12m">6-12 meses</option>
                <option value="1-2y">1-2 anos</option>
                <option value="2-3y">2-3 anos</option>
                <option value="3-5y">3-5 anos</option>
                <option value="5-10y">5-10 anos</option>
                <option value="10-20y">10-20 anos</option>
                <option value="20y+">20+ anos</option>
                <option value="founder">Desde a fundação</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Gerencia Pessoas?</label>
              <select value={job.managesPeople || ''} onChange={(e) => updateJob(index, 'managesPeople', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="no">Não</option>
                <option value="informal">Informal</option>
                <option value="1-3">1-3 pessoas</option>
                <option value="4-10">4-10 pessoas</option>
                <option value="11-25">11-25 pessoas</option>
                <option value="26-50">26-50 pessoas</option>
                <option value="50-100">50-100 pessoas</option>
                <option value="100+">100+ pessoas</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Horas por Semana</label>
              <select value={job.hoursPerWeek || ''} onChange={(e) => updateJob(index, 'hoursPerWeek', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="less-10">Menos de 10h</option>
                <option value="10-20">10-20h (part-time)</option>
                <option value="20-30">20-30h</option>
                <option value="30-40">30-40h (padrão)</option>
                <option value="40-50">40-50h</option>
                <option value="50-60">50-60h</option>
                <option value="60-70">60-70h</option>
                <option value="70+">70+h (workaholic)</option>
                <option value="variable">Variável</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* INDUSTRY */}
      <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
        <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">🏭 Indústria & Setor</h4>

        <div className="space-y-4">
          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-1 block">Indústria Principal</label>
            <select value={job.industry || ''} onChange={(e) => updateJob(index, 'industry', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <optgroup label="Technology">
                <option value="tech-software">Software Development</option>
                <option value="tech-saas">SaaS / Cloud Services</option>
                <option value="tech-ai">AI / Machine Learning</option>
                <option value="tech-cybersecurity">Cybersecurity</option>
                <option value="tech-data">Data / Analytics</option>
                <option value="tech-fintech">Fintech</option>
                <option value="tech-gaming">Gaming / Video Games</option>
                <option value="tech-blockchain">Blockchain / Crypto / Web3</option>
              </optgroup>
              <optgroup label="Finance & Business">
                <option value="fin-banking">Banking</option>
                <option value="fin-investment">Investment Banking</option>
                <option value="fin-pe-vc">Private Equity / Venture Capital</option>
                <option value="fin-insurance">Insurance</option>
                <option value="biz-consulting">Management Consulting</option>
                <option value="biz-legal">Legal Services / Law</option>
                <option value="biz-real-estate">Real Estate</option>
              </optgroup>
              <optgroup label="Healthcare">
                <option value="health-hospital">Hospitals / Health Systems</option>
                <option value="health-pharma">Pharmaceuticals</option>
                <option value="health-biotech">Biotechnology</option>
                <option value="health-mental">Mental Health</option>
              </optgroup>
              <optgroup label="Media & Creative">
                <option value="media-film">Film / Cinema</option>
                <option value="media-tv">Television / Streaming</option>
                <option value="media-music">Music Industry</option>
                <option value="media-advertising">Advertising</option>
                <option value="media-marketing">Marketing / Digital Marketing</option>
                <option value="creative-design">Design</option>
              </optgroup>
              <optgroup label="Education">
                <option value="edu-k12">K-12 Education</option>
                <option value="edu-higher">Higher Education</option>
                <option value="edu-online">Online Education</option>
              </optgroup>
              <optgroup label="Retail & Food">
                <option value="retail-general">General Retail</option>
                <option value="retail-ecommerce">E-commerce</option>
                <option value="hosp-restaurant">Restaurants</option>
                <option value="hosp-hotel">Hotels / Lodging</option>
              </optgroup>
              <optgroup label="Manufacturing & Energy">
                <option value="mfg-automotive">Automotive</option>
                <option value="mfg-aerospace">Aerospace / Defense</option>
                <option value="energy-oil-gas">Oil & Gas</option>
                <option value="energy-renewable">Renewable Energy</option>
              </optgroup>
              <optgroup label="Government & Non-Profit">
                <option value="gov-federal">Government</option>
                <option value="gov-military">Military</option>
                <option value="npo-charity">Non-Profit / Charity</option>
                <option value="npo-ngo">NGO</option>
              </optgroup>
              <optgroup label="Other">
                <option value="trade-construction">Construction</option>
                <option value="trans-logistics">Logistics / Transportation</option>
                <option value="ag-farming">Agriculture</option>
                <option value="other-security">Security Services</option>
                <option value="other-adult">Adult Entertainment</option>
                <option value="other-criminal">Criminal Enterprise</option>
                <option value="other-unknown">Unknown / Classified</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-2 block">Áreas Funcionais (até 3)</label>
            <div className="flex flex-wrap gap-2">
              {['Engineering','Software Development','Data Science','Product Management','Project Management','Design/UX','Marketing','Sales','Business Development','Customer Success','Operations','Finance','Accounting','HR/People','Legal','Strategy','Analytics','Research','QA/Testing','DevOps','IT/Infrastructure','Supply Chain','Manufacturing','Admin/Assistant','Communications','Content/Writing','Social Media','Consulting','General Management','Executive Leadership','Founder','Creative Direction','Teaching/Education','Healthcare/Clinical','Scientific Research','Manual Labor','Skilled Trades','Food Service','Retail Sales','Security','Military/Defense','Religious/Ministry','Freelance/Gig','Other'].map(area => (
                <button key={area} onClick={() => toggleJobArrayItem(index, 'functionalAreas', area, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(job.functionalAreas || []).includes(area) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{area}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
        <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🏢 Empresa / Organização</h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nome da Empresa</label>
              <input type="text" value={job.companyName || ''} onChange={(e) => updateJob(index, 'companyName', e.target.value)} placeholder="Nome da empresa ou 'Self-Employed'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo de Organização</label>
              <select value={job.companyType || ''} onChange={(e) => updateJob(index, 'companyType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <optgroup label="Private Sector">
                  <option value="startup-early">Startup - Early Stage</option>
                  <option value="startup-late">Startup - Late Stage</option>
                  <option value="scaleup">Scale-up (High Growth)</option>
                  <option value="sme-small">Small Business (&lt;50)</option>
                  <option value="sme-medium">Medium Business (50-250)</option>
                  <option value="large-corp">Large Corporation (250-1000)</option>
                  <option value="enterprise">Enterprise (1000+)</option>
                  <option value="multinational">Multinational Corporation</option>
                  <option value="public-company">Public Company</option>
                  <option value="family-business">Family Business</option>
                </optgroup>
                <optgroup label="Professional Services">
                  <option value="agency">Agency</option>
                  <option value="consultancy">Consultancy</option>
                  <option value="law-firm">Law Firm</option>
                  <option value="big-four">Big Four</option>
                  <option value="studio">Studio</option>
                </optgroup>
                <optgroup label="Public & Non-Profit">
                  <option value="government">Government Agency</option>
                  <option value="military">Military</option>
                  <option value="ngo">NGO / Non-Profit</option>
                  <option value="university">University</option>
                  <option value="hospital">Hospital</option>
                </optgroup>
                <optgroup label="Self-Employed">
                  <option value="solo-freelance">Solo Freelancer</option>
                  <option value="own-business">Own Business</option>
                  <option value="gig-platform">Gig Platform</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="criminal-org">Criminal Organization</option>
                  <option value="classified">Classified / Secret</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tamanho</label>
              <select value={job.companySize || ''} onChange={(e) => updateJob(index, 'companySize', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="1">Solo (1)</option>
                <option value="2-10">Micro (2-10)</option>
                <option value="11-50">Small (11-50)</option>
                <option value="51-200">Medium (51-200)</option>
                <option value="201-1000">Large (201-1000)</option>
                <option value="1001-10000">Enterprise (1001-10000)</option>
                <option value="10000+">Mega Corp (10000+)</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Presença</label>
              <select value={job.companyReach || ''} onChange={(e) => updateJob(index, 'companyReach', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="local">Local</option>
                <option value="regional">Regional</option>
                <option value="national">Nacional</option>
                <option value="global">Global</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade</label>
              <select value={job.companyAge || ''} onChange={(e) => updateJob(index, 'companyAge', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="less-1">&lt;1 ano</option>
                <option value="1-5">1-5 anos</option>
                <option value="5-10">5-10 anos</option>
                <option value="10-25">10-25 anos</option>
                <option value="25-50">25-50 anos</option>
                <option value="50+">50+ anos</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Reputação</label>
              <select value={job.companyReputation || ''} onChange={(e) => updateJob(index, 'companyReputation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="prestigious">Prestigious</option>
                <option value="well-known">Well-Known</option>
                <option value="respected">Respected</option>
                <option value="average">Average</option>
                <option value="unknown">Unknown</option>
                <option value="controversial">Controversial</option>
                <option value="bad">Bad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] text-gray-600 mb-2 block">Cultura da Empresa (até 4)</label>
            <div className="flex flex-wrap gap-2">
              {['Fast-Paced','Slow & Steady','Competitive','Collaborative','Innovative','Traditional','Formal','Casual','Results-Driven','Process-Oriented','Mission-Driven','Profit-Focused','Work Hard Play Hard','Work-Life Balance','Hierarchical','Flat Structure','Political','Meritocratic','Inclusive','Transparent','Micromanaging','Autonomous','Supportive','Sink or Swim','Learning Culture','Startup Vibes','Corporate Feel','Family-Like','Toxic','Healthy','Burnout Culture'].map(culture => (
                <button key={culture} onClick={() => toggleJobArrayItem(index, 'companyCulture', culture, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(job.companyCulture || []).includes(culture) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{culture}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SALARY ESTIMATOR */}
      <SalaryCalculator job={job} />

      {/* Botão de voltar */}
      <div className="flex justify-center pt-4">
        <button onClick={() => setEditingJobIndex(null)} className="px-6 py-2 bg-emerald-600 text-white font-mono text-xs rounded hover:bg-emerald-700 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          Concluir Edição
        </button>
      </div>
    </div>
  );

  // Lista de empregos
  const JobsList = () => (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4">
        <h3 className="font-mono text-sm font-bold text-emerald-900 mb-2">💼 EMPREGOS & OCUPAÇÕES</h3>
        <p className="font-mono text-xs text-emerald-800 leading-relaxed">
          Gerencie todos os empregos e ocupações do personagem. Pode ter múltiplos empregos simultaneamente.
        </p>
      </div>

      {/* Lista de empregos existentes */}
      {(data.jobs || []).length > 0 ? (
        <div className="space-y-3">
          {(data.jobs || []).map((job, index) => {
            const summary = getJobSummary(job);
            const salaryEstimate = calculateSalary(job);
            return (
              <div key={job.id || index} className={`border-2 rounded-sm p-4 transition-all hover:shadow-md cursor-pointer ${job.isPrimary ? 'border-yellow-400 bg-yellow-50/50' : 'border-gray-200 bg-white hover:border-emerald-300'}`} onClick={() => setEditingJobIndex(index)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {job.isPrimary && <span className="text-yellow-500">⭐</span>}
                      <h4 className="font-mono text-sm font-bold text-gray-900">{summary.title}</h4>
                      {job.isPrimary && <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 font-mono text-[9px] rounded">PRINCIPAL</span>}
                    </div>
                    <p className="font-mono text-xs text-gray-600 mb-1">🏢 {summary.company}</p>
                    <p className="font-mono text-[10px] text-gray-500">{summary.status}</p>
                    {job.industry && <p className="font-mono text-[10px] text-purple-600 mt-1">📁 {job.industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>}
                    {salaryEstimate && (
                      <p className="font-mono text-[10px] text-emerald-600 mt-1 font-bold">
                        💰 ${salaryEstimate.monthly.toLocaleString()}/mês (~${salaryEstimate.annual.toLocaleString()}/ano)
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4 items-end">
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setEditingJobIndex(index); }} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 font-mono text-[10px] rounded hover:bg-emerald-200">
                        ✏️ Editar
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); removeJob(index); }} className="px-3 py-1.5 bg-red-100 text-red-700 font-mono text-[10px] rounded hover:bg-red-200">
                        🗑️
                      </button>
                    </div>
                    {salaryEstimate && (
                      <div className="flex items-center gap-1">
                        <span className={`px-1.5 py-0.5 rounded font-mono text-[8px] ${
                          salaryEstimate.confidence.level === 'high' ? 'bg-emerald-100 text-emerald-700' :
                          salaryEstimate.confidence.level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {salaryEstimate.confidence.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
          <div className="text-gray-400 mb-3">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <p className="font-mono text-sm text-gray-500 mb-1">Nenhum emprego cadastrado</p>
          <p className="font-mono text-xs text-gray-400">Clique no botão abaixo para adicionar o primeiro emprego do personagem.</p>
        </div>
      )}

      {/* Botão de adicionar emprego */}
      <button onClick={addJob} className="w-full py-4 border-2 border-dashed border-emerald-400 rounded-sm text-emerald-600 font-mono text-sm hover:bg-emerald-50 hover:border-emerald-500 transition-all flex items-center justify-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Adicionar Emprego
      </button>

      {/* Resumo */}
      {(data.jobs || []).length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-emerald-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-xs font-bold text-gray-700 mb-3">📊 Resumo Financeiro</h4>

          {/* Salário Total */}
          <div className="bg-white border border-emerald-200 rounded-sm p-4 mb-4">
            <div className="text-center">
              <div className="font-mono text-[10px] text-gray-500 mb-1">Estimated Total Income (all jobs)</div>
              <div className="font-mono text-3xl font-bold text-emerald-600">
                R${(data.jobs || []).reduce((sum, job) => {
                  const estimate = calculateSalary(job);
                  return sum + (estimate?.monthly || 0);
                }, 0).toLocaleString('pt-BR')}
                <span className="text-lg text-gray-400">/mês</span>
              </div>
              <div className="font-mono text-sm text-gray-500">
                R${(data.jobs || []).reduce((sum, job) => {
                  const estimate = calculateSalary(job);
                  return sum + (estimate?.annual || 0);
                }, 0).toLocaleString('pt-BR')}/ano
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/50 rounded p-2">
              <div className="font-mono text-2xl font-bold text-emerald-600">{(data.jobs || []).length}</div>
              <div className="font-mono text-[10px] text-gray-500">Empregos</div>
            </div>
            <div className="bg-white/50 rounded p-2">
              <div className="font-mono text-2xl font-bold text-blue-600">
                {(data.jobs || []).reduce((sum, job) => {
                  const hours = job.hoursPerWeek;
                  if (!hours) return sum;
                  if (hours === 'variable') return sum + 30;
                  if (hours === '70+') return sum + 75;
                  const match = hours.match(/(\d+)/);
                  return sum + (match ? parseInt(match[1]) : 0);
                }, 0)}h
              </div>
              <div className="font-mono text-[10px] text-gray-500">Horas/Semana</div>
            </div>
            <div className="bg-white/50 rounded p-2">
              <div className="font-mono text-2xl font-bold text-purple-600">
                {[...new Set((data.jobs || []).map(j => j.industry).filter(Boolean))].length}
              </div>
              <div className="font-mono text-[10px] text-gray-500">Indústrias</div>
            </div>
            <div className="bg-white/50 rounded p-2">
              <div className="font-mono text-2xl font-bold text-amber-600">
                {[...new Set((data.jobs || []).map(j => j.companyName).filter(Boolean))].length}
              </div>
              <div className="font-mono text-[10px] text-gray-500">Empresas</div>
            </div>
          </div>

          {/* Breakdown por emprego */}
          {(data.jobs || []).length > 1 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="font-mono text-[10px] text-gray-500 mb-2">Breakdown por emprego:</div>
              <div className="space-y-2">
                {(data.jobs || []).map((job, idx) => {
                  const estimate = calculateSalary(job);
                  const totalMonthly = (data.jobs || []).reduce((sum, j) => sum + (calculateSalary(j)?.monthly || 0), 0);
                  const percentage = totalMonthly > 0 ? ((estimate?.monthly || 0) / totalMonthly * 100) : 0;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[10px] text-gray-700">
                            {job.isPrimary && '⭐ '}{job.jobTitle || `Emprego #${idx + 1}`}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-emerald-600">
                            ${(estimate?.monthly || 0).toLocaleString()}/mês
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${job.isPrimary ? 'bg-yellow-400' : 'bg-emerald-400'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-gray-400 w-10 text-right">{percentage.toFixed(0)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const sections = {
    // ========== SUBTAB 0: CURRENT WORK ==========
    0: editingJobIndex !== null && data.jobs?.[editingJobIndex] ? (
      <JobForm job={data.jobs[editingJobIndex]} index={editingJobIndex} />
    ) : (
      <JobsList />
    ),

    // ========== SUBTAB 1: CAREER PATH ==========
    1: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">📈 TRAJETÓRIA DE CARREIRA</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">História profissional, evolução, ambições e reputação no mercado.</p>
        </div>

        {/* CAREER ORIGIN */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-3">🌟 Origens da Carreira</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Sonho de Infância</label>
              <input type="text" value={data.career?.childhoodDream || ''} onChange={(e) => update('career', 'childhoodDream', e.target.value)} placeholder="Ex: Astronauta, médico, jogador de futebol, bombeiro..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Como Entrou na Carreira Atual?</label>
                <select value={data.career?.careerEntry || ''} onChange={(e) => update('career', 'careerEntry', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="planned">Planned</option>
                  <option value="education">Education</option>
                  <option value="opportunity">Opportunity</option>
                  <option value="accident">Accident</option>
                  <option value="necessity">Necessity</option>
                  <option value="family">Family</option>
                  <option value="networking">Networking</option>
                  <option value="pivot">Pivot</option>
                  <option value="passion">Passion</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="failed-dream">Failed Dream</option>
                  <option value="rebellion">Rebellion</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Primeiro Emprego</label>
                <input type="text" value={data.career?.firstJob || ''} onChange={(e) => update('career', 'firstJob', e.target.value)} placeholder="Ex: Estagiário em banco, garçom, babá..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Empregos/Cargos Anteriores Relevantes</label>
              <textarea value={data.career?.previousJobs || ''} onChange={(e) => update('career', 'previousJobs', e.target.value)} placeholder="Liste cargos anteriores importantes, empresas, e quanto tempo ficou..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>
          </div>
        </div>

        {/* CAREER TRAJECTORY */}
        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <h4 className="font-mono text-sm font-bold text-indigo-800 mb-3">📊 Trajetória & Padrões</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Anos de Experiência Total</label>
                <select value={data.career?.totalExperience || ''} onChange={(e) => update('career', 'totalExperience', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="0">Sem experiência</option>
                  <option value="less-1">Menos de 1 ano</option>
                  <option value="1-2">1-2 anos</option>
                  <option value="2-5">2-5 anos</option>
                  <option value="5-10">5-10 anos</option>
                  <option value="10-15">10-15 anos</option>
                  <option value="15-20">15-20 anos</option>
                  <option value="20-30">20-30 anos</option>
                  <option value="30+">30+ anos</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Padrão de Carreira</label>
                <select value={data.career?.careerPattern || ''} onChange={(e) => update('career', 'careerPattern', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="linear-up">Linear Up</option>
                  <option value="meteoric">Meteoric Rise</option>
                  <option value="steady">Steady</option>
                  <option value="zigzag">Zigzag</option>
                  <option value="pivot">Career Pivot</option>
                  <option value="multiple-pivots">Multiple Pivots</option>
                  <option value="late-bloomer">Late Bloomer</option>
                  <option value="early-peak">Early Peak</option>
                  <option value="comeback">Comeback</option>
                  <option value="decline">Decline</option>
                  <option value="sabbaticals">Sabbaticals</option>
                  <option value="entrepreneurial">Entrepreneurial</option>
                  <option value="corporate-ladder">Corporate Ladder</option>
                  <option value="job-hopper">Job Hopper</option>
                  <option value="loyal">Loyal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Maior Conquista Profissional</label>
                <input type="text" value={data.career?.biggestAchievement || ''} onChange={(e) => update('career', 'biggestAchievement', e.target.value)} placeholder="Ex: Promovido a diretor aos 30, fundou empresa de sucesso..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Maior Fracasso/Desafio Profissional</label>
                <input type="text" value={data.career?.biggestSetback || ''} onChange={(e) => update('career', 'biggestSetback', e.target.value)} placeholder="Ex: Demitido, empresa faliu, projeto fracassou..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL REPUTATION */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">🏆 Reputação Profissional</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status na Indústria</label>
                <select value={data.career?.industryStatus || ''} onChange={(e) => update('career', 'industryStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="legend">Legend</option>
                  <option value="thought-leader">Thought Leader</option>
                  <option value="industry-expert">Industry Expert</option>
                  <option value="well-known">Well-Known</option>
                  <option value="rising-star">Rising Star</option>
                  <option value="respected">Respected</option>
                  <option value="solid">Solid Professional</option>
                  <option value="average">Average</option>
                  <option value="unknown">Unknown</option>
                  <option value="controversial">Controversial</option>
                  <option value="has-been">Has-Been</option>
                  <option value="blacklisted">Blacklisted</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Network Profissional</label>
                <select value={data.career?.networkStrength || ''} onChange={(e) => update('career', 'networkStrength', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="exceptional">Exceptional</option>
                  <option value="strong">Strong</option>
                  <option value="growing">Growing</option>
                  <option value="average">Average</option>
                  <option value="weak">Weak</option>
                  <option value="isolated">Isolated</option>
                  <option value="burned-bridges">Burned Bridges</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Conhecido(a) por... (até 4)</label>
              <div className="flex flex-wrap gap-2">
                {['Technical Excellence','Leadership','Innovation','Creativity','Problem-Solving','Communication','Negotiation','Sales Skills','Strategic Thinking','Attention to Detail','Speed/Efficiency','Quality Work','Reliability','Meeting Deadlines','Team Building','Mentoring','Networking','Public Speaking','Writing','Design Sense','Data-Driven','Customer Focus','Business Acumen','Industry Knowledge','Political Savvy','Crisis Management','Turnaround Expert','Growth Hacker','Deal Maker','Visionary','Executor','Perfectionist','Workaholic','Work-Life Balance','Being Nice','Being Tough','Being Fair','Being Funny','Being Controversial','Being Difficult','Being Genius','Being Lucky'].map(rep => (
                  <button key={rep} onClick={() => toggleArrayItem('career', 'knownFor', rep, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.career?.knownFor || []).includes(rep) ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{rep}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FUTURE AMBITIONS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🎯 Ambições & Futuro</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Ambição de Carreira</label>
                <select value={data.career?.careerAmbition || ''} onChange={(e) => update('career', 'careerAmbition', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="ceo">CEO/Top Executive</option>
                  <option value="founder">Founder</option>
                  <option value="expert">Expert</option>
                  <option value="leader">Leader</option>
                  <option value="impact">Impact</option>
                  <option value="wealth">Wealth</option>
                  <option value="fame">Fame</option>
                  <option value="stability">Stability</option>
                  <option value="balance">Balance</option>
                  <option value="retire-early">Retire Early</option>
                  <option value="change-world">Change the World</option>
                  <option value="creative">Creative Freedom</option>
                  <option value="help-others">Help Others</option>
                  <option value="learn">Continuous Learning</option>
                  <option value="none">No Ambition</option>
                  <option value="survive">Just Survive</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Atitude sobre Carreira</label>
                <select value={data.career?.careerAttitude || ''} onChange={(e) => update('career', 'careerAttitude', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="passionate">Passionate</option>
                  <option value="driven">Driven</option>
                  <option value="content">Content</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="indifferent">Indifferent</option>
                  <option value="frustrated">Frustrated</option>
                  <option value="burned-out">Burned Out</option>
                  <option value="stuck">Stuck</option>
                  <option value="transitioning">Transitioning</option>
                  <option value="searching">Searching</option>
                  <option value="retired-mentality">Retired Mentality</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Cargo/Posição dos Sonhos</label>
              <input type="text" value={data.career?.dreamPosition || ''} onChange={(e) => update('career', 'dreamPosition', e.target.value)} placeholder="Ex: CEO de empresa Fortune 500, artista independente, aposentado numa praia..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Plano de 5 Anos</label>
              <textarea value={data.career?.fiveYearPlan || ''} onChange={(e) => update('career', 'fiveYearPlan', e.target.value)} placeholder="O que espera estar fazendo em 5 anos? Tem planos concretos?" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none" />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: SKILLS & COMPETENCIES ==========
    2: (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">🛠️ HABILIDADES & COMPETÊNCIAS</h3>
          <p className="font-mono text-xs text-purple-800 leading-relaxed">Hard skills, soft skills, talentos e áreas de melhoria profissional.</p>
        </div>

        {/* HARD SKILLS */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">💻 Hard Skills (até 10)</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades técnicas e conhecimentos específicos.</p>
          <div className="flex flex-wrap gap-2">
            {['Programming/Coding','Python','JavaScript','Java','C++','C#','Ruby','Go','Rust','Swift','Kotlin','PHP','SQL','R','MATLAB','HTML/CSS','React','Angular','Vue.js','Node.js','Django','Flask','Spring','.NET','Machine Learning','Deep Learning','Data Science','Data Analysis','Data Visualization','Statistics','Big Data','Cloud Computing','AWS','Azure','GCP','DevOps','CI/CD','Docker','Kubernetes','Linux/Unix','Networking','Cybersecurity','Database Management','System Administration','Mobile Development','iOS Development','Android Development','Web Development','Frontend Development','Backend Development','Full-Stack Development','API Development','Microservices','Blockchain','Smart Contracts','Game Development','Unity','Unreal Engine','3D Modeling','CAD','AutoCAD','SolidWorks','Revit','BIM','GIS','Photoshop','Illustrator','InDesign','Figma','Sketch','After Effects','Premiere Pro','Final Cut','Video Editing','Audio Production','Motion Graphics','UI Design','UX Design','Graphic Design','Industrial Design','Product Design','Interior Design','Architecture','Fashion Design','Animation','Photography','Videography','Writing','Copywriting','Technical Writing','Content Writing','Journalism','Editing','Proofreading','Translation','SEO','SEM','Google Ads','Facebook Ads','Social Media Marketing','Email Marketing','Content Marketing','Marketing Analytics','CRM','Salesforce','HubSpot','SAP','Oracle','Tableau','Power BI','Excel Advanced','Financial Modeling','Accounting','Bookkeeping','Auditing','Tax Preparation','Financial Analysis','Investment Analysis','Risk Management','Project Management','Agile/Scrum','Waterfall','PRINCE2','PMP','Six Sigma','Lean','Quality Assurance','Testing','Research','Lab Techniques','Scientific Writing','Clinical Research','Legal Research','Market Research','User Research','Surveying','Interviewing','Medical/Clinical Skills','Nursing','Surgery','Diagnosis','Pharmacy','Physical Therapy','Mental Health Counseling','Teaching','Curriculum Design','Training','Public Speaking','Presentation','Negotiation','Sales','Cold Calling','Account Management','Customer Service','Technical Support','Event Planning','Hospitality','Cooking/Culinary','Baking','Bartending','Barista','Driving','Heavy Machinery','Welding','Electrical Work','Plumbing','Carpentry','HVAC','Masonry','Landscaping','Farming','Animal Care','Music Performance','Music Production','Sound Engineering','Acting','Dancing','Sports Coaching','Personal Training','Massage Therapy','Hair Styling','Makeup Artistry','Tailoring/Sewing','Jewelry Making','Woodworking','Metalworking','Foreign Languages','Sign Language','Braille','First Aid/CPR','Security','Investigation','Military Training','Piloting','Navigation','Seamanship'].map(skill => (
              <button key={skill} onClick={() => toggleArrayItem('skills', 'hardSkills', skill, 10)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.skills?.hardSkills || []).includes(skill) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{skill}</button>
            ))}
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">🤝 Soft Skills (até 8)</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Habilidades interpessoais e comportamentais.</p>
          <div className="flex flex-wrap gap-2">
            {['Communication','Written Communication','Verbal Communication','Active Listening','Public Speaking','Presentation Skills','Storytelling','Persuasion','Negotiation','Conflict Resolution','Diplomacy','Empathy','Emotional Intelligence','Self-Awareness','Self-Regulation','Social Skills','Relationship Building','Networking','Collaboration','Teamwork','Leadership','People Management','Mentoring','Coaching','Delegation','Motivation','Inspiration','Decision Making','Problem Solving','Critical Thinking','Analytical Thinking','Strategic Thinking','Creative Thinking','Innovation','Lateral Thinking','Systems Thinking','Adaptability','Flexibility','Resilience','Stress Management','Time Management','Organization','Prioritization','Planning','Goal Setting','Self-Discipline','Focus','Attention to Detail','Initiative','Proactivity','Self-Motivation','Drive','Ambition','Work Ethic','Reliability','Accountability','Integrity','Honesty','Ethics','Professionalism','Customer Focus','Service Orientation','Cultural Sensitivity','Diversity Awareness','Inclusivity','Patience','Tolerance','Open-Mindedness','Curiosity','Learning Agility','Growth Mindset','Coachability','Feedback Reception','Self-Improvement','Positive Attitude','Optimism','Enthusiasm','Energy','Charisma','Influence','Confidence','Assertiveness','Courage','Risk-Taking','Entrepreneurial Mindset','Business Acumen','Political Savvy','Situational Awareness','Reading the Room','Humor','Wit','Grace Under Pressure','Crisis Management','Resourcefulness','Pragmatism','Common Sense','Street Smarts','Intuition','Instinct','Vision','Big Picture Thinking','Detail Orientation','Follow-Through','Execution','Results Orientation','Quality Focus','Perfectionism','Speed','Efficiency','Multitasking','Single-Tasking','Deep Work','Boundary Setting','Work-Life Balance','Self-Care','Mindfulness','Presence'].map(skill => (
              <button key={skill} onClick={() => toggleArrayItem('skills', 'softSkills', skill, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.skills?.softSkills || []).includes(skill) ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{skill}</button>
            ))}
          </div>
        </div>

        {/* SKILL LEVELS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">📊 Níveis de Competência</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Competência Técnica Geral</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Iniciante</span><span>Expert Mundial</span></div>
              <input type="range" min="1" max="9" value={data.skills?.technicalLevel || 5} onChange={(e) => update('skills', 'technicalLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Competência Interpessoal</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Difícil de lidar</span><span>Extremamente hábil</span></div>
              <input type="range" min="1" max="9" value={data.skills?.interpersonalLevel || 5} onChange={(e) => update('skills', 'interpersonalLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Competência de Liderança</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não lidera</span><span>Líder nato</span></div>
              <input type="range" min="1" max="9" value={data.skills?.leadershipLevel || 5} onChange={(e) => update('skills', 'leadershipLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* HIDDEN TALENTS & WEAKNESSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">✨ Talentos Ocultos</h4>
            <textarea value={data.skills?.hiddenTalents || ''} onChange={(e) => update('skills', 'hiddenTalents', e.target.value)} placeholder="Habilidades que poucos sabem que tem, talentos subutilizados..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
          </div>
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚠️ Fraquezas & Gaps</h4>
            <textarea value={data.skills?.weaknesses || ''} onChange={(e) => update('skills', 'weaknesses', e.target.value)} placeholder="Áreas onde precisa melhorar, gaps de conhecimento, pontos fracos conhecidos..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 3: WORK-LIFE ==========
    3: (
      <div className="space-y-6">
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">⚖️ WORK-LIFE</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">Satisfação no trabalho, relacionamentos profissionais e equilíbrio vida-trabalho.</p>
        </div>

        {/* JOB SATISFACTION */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">😊 Satisfação no Trabalho</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Satisfação Geral com o Trabalho</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>😫 Odeia</span><span>🤩 Ama</span></div>
              <input type="range" min="1" max="9" value={data.workLife?.jobSatisfaction || 5} onChange={(e) => update('workLife', 'jobSatisfaction', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Com o Salário</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Insatisfeito</span><span>Muito satisfeito</span></div>
                <input type="range" min="1" max="9" value={data.workLife?.salarySatisfaction || 5} onChange={(e) => update('workLife', 'salarySatisfaction', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Com o Chefe</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Péssimo</span><span>Excelente</span></div>
                <input type="range" min="1" max="9" value={data.workLife?.bossSatisfaction || 5} onChange={(e) => update('workLife', 'bossSatisfaction', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Com os Colegas</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Tóxico</span><span>Adoráveis</span></div>
                <input type="range" min="1" max="9" value={data.workLife?.colleaguesSatisfaction || 5} onChange={(e) => update('workLife', 'colleaguesSatisfaction', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Com o Trabalho em Si</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Tedious</span><span>Passionate</span></div>
                <input type="range" min="1" max="9" value={data.workLife?.workContentSatisfaction || 5} onChange={(e) => update('workLife', 'workContentSatisfaction', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Maiores Frustrações no Trabalho (até 4)</label>
              <div className="flex flex-wrap gap-2">
                {['Low Pay','No Growth','Bad Boss','Toxic Coworkers','Boring Work','Too Much Work','Too Little Work','No Recognition','Office Politics','Micromanagement','No Autonomy','Poor Communication','Unclear Expectations','Constant Change','No Change','Bad Culture','Long Hours','Commute','No Remote Option','Too Much Remote','No Benefits','Job Insecurity','Ethical Concerns','Meaningless Work','Too Much Stress','No Challenge','Too Challenging','Work-Life Imbalance','No Flexibility','Bureaucracy','Bad Tools/Tech','Physical Conditions','Discrimination','Harassment','No Friends at Work','Loneliness','None - Happy'].map(frustration => (
                  <button key={frustration} onClick={() => toggleArrayItem('workLife', 'frustrations', frustration, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.workLife?.frustrations || []).includes(frustration) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{frustration}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WORK-LIFE BALANCE */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">⚖️ Equilíbrio Vida-Trabalho</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Work-Life Balance Atual</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>🔥 Só trabalho</span><span>🏖️ Só vida pessoal</span></div>
              <input type="range" min="1" max="9" value={data.workLife?.workLifeBalance || 5} onChange={(e) => update('workLife', 'workLifeBalance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 rounded-lg appearance-none cursor-pointer" />
              <p className="font-mono text-[9px] text-gray-500 mt-1 text-center italic">
                {(data.workLife?.workLifeBalance || 5) <= 2 && 'Workaholic total, vida pessoal inexistente'}
                {(data.workLife?.workLifeBalance || 5) === 3 && 'Trabalho domina, pouco tempo pessoal'}
                {(data.workLife?.workLifeBalance || 5) === 4 && 'Trabalho é prioridade, mas tem algum equilíbrio'}
                {(data.workLife?.workLifeBalance || 5) === 5 && 'Equilíbrio razoável entre trabalho e vida'}
                {(data.workLife?.workLifeBalance || 5) === 6 && 'Vida pessoal é prioridade, trabalho é meio'}
                {(data.workLife?.workLifeBalance || 5) === 7 && 'Vida pessoal domina, trabalho mínimo necessário'}
                {(data.workLife?.workLifeBalance || 5) >= 8 && 'Trabalho é irrelevante, foco total em vida pessoal'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Leva Trabalho para Casa?</label>
                <select value={data.workLife?.workAtHome || ''} onChange={(e) => update('workLife', 'workAtHome', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="never">Never</option>
                  <option value="rarely">Rarely</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="often">Often</option>
                  <option value="always">Always</option>
                  <option value="remote">Remote Worker</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Consegue Desconectar?</label>
                <select value={data.workLife?.abilityToDisconnect || ''} onChange={(e) => update('workLife', 'abilityToDisconnect', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="moderate">Moderate</option>
                  <option value="poor">Poor</option>
                  <option value="impossible">Impossible</option>
                  <option value="by-choice">By Choice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nível de Stress no Trabalho</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>😌 Zero stress</span><span>🤯 Burnout</span></div>
              <input type="range" min="1" max="9" value={data.workLife?.stressLevel || 5} onChange={(e) => update('workLife', 'stressLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* WORKPLACE RELATIONSHIPS */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">👥 Relacionamentos no Trabalho</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relação com Chefe/Supervisor</label>
                <select value={data.workLife?.bossRelationship || ''} onChange={(e) => update('workLife', 'bossRelationship', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="mentor">Mentor</option>
                  <option value="friend">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="distant">Distant</option>
                  <option value="tense">Tense</option>
                  <option value="conflict">Conflict</option>
                  <option value="fear">Fear</option>
                  <option value="no-boss">No Boss</option>
                  <option value="multiple">Multiple Bosses</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relação com Colegas</label>
                <select value={data.workLife?.colleagueRelationship || ''} onChange={(e) => update('workLife', 'colleagueRelationship', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="best-friends">Best Friends</option>
                  <option value="friends">Friends</option>
                  <option value="friendly">Friendly</option>
                  <option value="cordial">Cordial</option>
                  <option value="professional">Professional</option>
                  <option value="competitive">Competitive</option>
                  <option value="cutthroat">Cutthroat</option>
                  <option value="isolated">Isolated</option>
                  <option value="conflict">Conflict</option>
                  <option value="works-alone">Works Alone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Papel Social no Trabalho (até 3)</label>
              <div className="flex flex-wrap gap-2">
                {['Leader','Follower','Mediator','Mentor','Mentee','Social Butterfly','Loner','Gossip','Confidant','Comedian','Serious One','Go-To Expert','Newbie','Veteran','Office Mom/Dad','Rebel','Yes-Person','Devil\'s Advocate','Peacemaker','Instigator','Hard Worker','Slacker','Overachiever','Underachiever','Teacher','Student','Innovator','Maintainer','Cheerleader','Critic','Invisible','Center of Attention','Political Player','Neutral Party','Union Rep','Outsider','Insider','Bridge Builder','Gatekeeper'].map(role => (
                  <button key={role} onClick={() => toggleArrayItem('workLife', 'socialRole', role, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.workLife?.socialRole || []).includes(role) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{role}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Amigos no Trabalho</label>
              <select value={data.workLife?.workFriends || ''} onChange={(e) => update('workLife', 'workFriends', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="best-friends">Best Friends</option>
                <option value="many">Many</option>
                <option value="few">Few</option>
                <option value="one">One</option>
                <option value="acquaintances">Acquaintances</option>
                <option value="none">None</option>
                <option value="prefers-separation">Prefers Separation</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 4: FINANCIAL LIFE ==========
    4: (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-yellow-900 mb-2">💰 VIDA FINANCEIRA</h3>
          <p className="font-mono text-xs text-yellow-800 leading-relaxed">Income, relationship with money, financial habits and economic situation.</p>
        </div>

        {/* INCOME */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">💵 Income Renda & Patrimônio Wealth</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Income Bracket (relative to local cost of living)</label>
                <select value={data.financial?.incomeLevel || ''} onChange={(e) => update('financial', 'incomeLevel', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="poverty">Poverty</option>
                  <option value="struggling">Struggling</option>
                  <option value="low">Low Income</option>
                  <option value="lower-middle">Lower Middle</option>
                  <option value="middle">Middle Class</option>
                  <option value="upper-middle">Upper Middle</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="affluent">Affluent</option>
                  <option value="wealthy">Wealthy</option>
                  <option value="very-wealthy">Very Wealthy</option>
                  <option value="ultra-wealthy">Ultra-Wealthy</option>
                  <option value="billionaire">Billionaire</option>
                  <option value="variable">Variable</option>
                  <option value="no-income">No Income</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Primary Income Source</label>
                <select value={data.financial?.incomeSource || ''} onChange={(e) => update('financial', 'incomeSource', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="salary">Salary</option>
                  <option value="hourly">Hourly Wage</option>
                  <option value="commission">Commission</option>
                  <option value="bonus-heavy">Bonus-Heavy</option>
                  <option value="freelance">Freelance</option>
                  <option value="business-profit">Business Profit</option>
                  <option value="investments">Investments</option>
                  <option value="dividends">Dividends</option>
                  <option value="rental">Rental Income</option>
                  <option value="royalties">Royalties</option>
                  <option value="inheritance">Inheritance</option>
                  <option value="trust-fund">Trust Fund</option>
                  <option value="spouse-partner">Spouse/Partner</option>
                  <option value="family-support">Family Support</option>
                  <option value="government">Government Benefits</option>
                  <option value="pension">Pension</option>
                  <option value="alimony">Alimony</option>
                  <option value="gig-economy">Gig Economy</option>
                  <option value="tips">Tips</option>
                  <option value="illegal">Illegal Activities</option>
                  <option value="multiple">Multiple Streams</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Wealth Status</label>
                <select value={data.financial?.wealthStatus || ''} onChange={(e) => update('financial', 'wealthStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="negative">Negative Net Worth</option>
                  <option value="zero">Zero</option>
                  <option value="building">Building</option>
                  <option value="modest">Modest Savings</option>
                  <option value="comfortable">Comfortable Cushion</option>
                  <option value="significant">Significant Assets</option>
                  <option value="wealthy">Wealthy</option>
                  <option value="generational">Generational Wealth</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Income Stability</label>
                <select value={data.financial?.incomeStability || ''} onChange={(e) => update('financial', 'incomeStability', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="rock-solid">Rock Solid</option>
                  <option value="stable">Stable</option>
                  <option value="mostly-stable">Mostly Stable</option>
                  <option value="somewhat-variable">Somewhat Variable</option>
                  <option value="variable">Variable</option>
                  <option value="unpredictable">Unpredictable</option>
                  <option value="feast-or-famine">Feast or Famine</option>
                  <option value="declining">Declining</option>
                  <option value="growing">Growing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RELATIONSHIP WITH MONEY */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">🧠 Relationship with Money</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">General Attitude towards Money</label>
                <select value={data.financial?.moneyAttitude || ''} onChange={(e) => update('financial', 'moneyAttitude', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="obsessed">Obsessed</option>
                  <option value="motivated">Motivated</option>
                  <option value="practical">Practical</option>
                  <option value="balanced">Balanced</option>
                  <option value="indifferent">Indifferent</option>
                  <option value="avoidant">Avoidant</option>
                  <option value="anxious">Anxious</option>
                  <option value="guilty">Guilty</option>
                  <option value="generous">Generous</option>
                  <option value="philosophical">Philosophical</option>
                  <option value="conflicted">Conflicted</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Spending Style</label>
                <select value={data.financial?.spendingStyle || ''} onChange={(e) => update('financial', 'spendingStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="extreme-saver">Extreme Saver</option>
                  <option value="frugal">Frugal</option>
                  <option value="careful">Careful</option>
                  <option value="moderate">Moderate</option>
                  <option value="generous">Generous</option>
                  <option value="liberal">Liberal</option>
                  <option value="impulsive">Impulsive</option>
                  <option value="lavish">Lavish</option>
                  <option value="reckless">Reckless</option>
                  <option value="strategic">Strategic</option>
                  <option value="experiences">Experiences Over Things</option>
                  <option value="things">Things Over Experiences</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Financial Anxiety</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>😌 Zero worry</span><span>😰 Constant panic</span></div>
              <input type="range" min="1" max="9" value={data.financial?.financialAnxiety || 5} onChange={(e) => update('financial', 'financialAnxiety', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Importance of Money vs Other Things</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>💭 Money irrelevant</span><span>💰 Money is priority</span></div>
              <input type="range" min="1" max="9" value={data.financial?.moneyImportance || 5} onChange={(e) => update('financial', 'moneyImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 to-yellow-500 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* FINANCIAL HABITS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">📊 Financial Habits</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Budgeting?</label>
                <select value={data.financial?.budgeting || ''} onChange={(e) => update('financial', 'budgeting', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="meticulous">Meticulous</option>
                  <option value="detailed">Detailed</option>
                  <option value="basic">Basic</option>
                  <option value="mental">Mental</option>
                  <option value="loose">Loose</option>
                  <option value="none">None</option>
                  <option value="chaos">Chaos</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Saving Habit</label>
                <select value={data.financial?.savingHabit || ''} onChange={(e) => update('financial', 'savingHabit', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="aggressive">Aggressive</option>
                  <option value="strong">Strong</option>
                  <option value="moderate">Moderate</option>
                  <option value="minimal">Minimal</option>
                  <option value="irregular">Irregular</option>
                  <option value="none">None</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Financial Literacy</label>
                <select value={data.financial?.financialLiteracy || ''} onChange={(e) => update('financial', 'financialLiteracy', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="expert">Expert</option>
                  <option value="sophisticated">Sophisticated</option>
                  <option value="good">Good</option>
                  <option value="basic">Basic</option>
                  <option value="limited">Limited</option>
                  <option value="poor">Poor</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Major Expenses (up to 4)</label>
              <div className="flex flex-wrap gap-2">
                {['Housing/Rent','Mortgage','Food/Groceries','Restaurants/Dining','Transportation','Car Expenses','Public Transit','Health/Medical','Insurance','Education','Student Loans','Childcare','Entertainment','Streaming Services','Gaming','Hobbies','Travel/Vacation','Shopping/Clothes','Electronics/Gadgets','Beauty/Personal Care','Fitness/Gym','Alcohol/Bars','Coffee','Pets','Gifts','Charity/Donations','Investments','Savings','Debt Payments','Credit Card Interest','Utilities','Phone/Internet','Subscriptions','Books/Courses','Art/Collectibles','Home Decor','Garden','Tools/Equipment','Experiences','Concerts/Events','Sports','Gambling','Vices','Family Support','Alimony/Child Support','Taxes','Legal Fees','Business Expenses','Miscellaneous'].map(expense => (
                  <button key={expense} onClick={() => toggleArrayItem('financial', 'majorExpenses', expense, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.financial?.majorExpenses || []).includes(expense) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{expense}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DEBT & FINANCIAL ISSUES */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-3">⚠️ Debts Dívidas & Problemas Financeiros Financial Issues</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Debt Situation</label>
                <select value={data.financial?.debtSituation || ''} onChange={(e) => update('financial', 'debtSituation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="debt-free">Debt-Free</option>
                  <option value="mortgage-only">Mortgage Only</option>
                  <option value="manageable">Manageable</option>
                  <option value="working-on-it">Working On It</option>
                  <option value="significant">Significant</option>
                  <option value="overwhelming">Overwhelming</option>
                  <option value="default">Default</option>
                  <option value="bankruptcy">Bankruptcy</option>
                  <option value="student-loans">Heavy Student Loans</option>
                  <option value="medical-debt">Medical Debt</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Credit History</label>
                <select value={data.financial?.creditHistory || ''} onChange={(e) => update('financial', 'creditHistory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="bad">Bad</option>
                  <option value="none">None</option>
                  <option value="rebuilding">Rebuilding</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Emergency Fund</label>
              <select value={data.financial?.emergencyFund || ''} onChange={(e) => update('financial', 'emergencyFund', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">None</option>
                <option value="less-1m">Less than 1 month</option>
                <option value="1-3m">1-3 months</option>
                <option value="3-6m">3-6 months</option>
                <option value="6-12m">6-12 months</option>
                <option value="1y+">1+ year</option>
                <option value="years">Multiple Years</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>
          </div>
        </div>

        {/* FINANCIAL GOALS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎯 Financial Goals</h4>
          <textarea value={data.financial?.financialGoals || ''} onChange={(e) => update('financial', 'financialGoals', e.target.value)} placeholder="What are the financial goals? Buy a house, retire early, pay off debt, travel..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


export default OccupationContent;
