import React, { useEffect } from 'react';
import { useCharacter } from '../../context/CharacterContext';
import ArchiveInput from '../../components/ui/ArchiveInput';
import ArchiveSelect from '../../components/ui/ArchiveSelect';
import {
  GENERATION_OPTIONS,
  ARCHETYPES,
  BIOLOGICAL_SEX_OPTIONS,
  GENDER_IDENTITIES,
  PRONOUNS,
  NATIONALITIES,
  ETHNICITIES,
  CHILDHOOD_TROPES,
  GEOGRAPHIC_TYPES,
  PRIMARY_CULTURES,
  REGIONAL_CULTURES
} from '../../data/constants';

const IdentityTab = ({ subtab }) => {
  const { characterData, updateData } = useCharacter();
  const data = characterData.identity;

  const update = (section, field, value) => {
    updateData('identity', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // Generation calculation based on birth year
  const calculateGeneration = (birthYear) => {
    if (!birthYear || isNaN(birthYear)) return '';

    // Generations with cusps (micro-generations)
    if (birthYear >= 2025) return 'Gen Beta (2025+)';
    if (birthYear >= 2013) return 'Gen Alpha (2013-2024)';
    if (birthYear >= 2010 && birthYear <= 2013) return 'Zalpha ✦ (2010-2013)';
    if (birthYear >= 1997 && birthYear <= 2012) return 'Gen Z (1997-2012)';
    if (birthYear >= 1993 && birthYear <= 1998) return 'Zennial ✦ (1993-1998)';
    if (birthYear >= 1981 && birthYear <= 1996) return 'Millennial / Gen Y (1981-1996)';
    if (birthYear >= 1977 && birthYear <= 1983) return 'Xennial ✦ (1977-1983)';
    if (birthYear >= 1965 && birthYear <= 1980) return 'Gen X (1965-1980)';
    if (birthYear >= 1954 && birthYear <= 1965) return 'Generation Jones ✦ (1954-1965)';
    if (birthYear >= 1946 && birthYear <= 1964) return 'Baby Boomer (1946-1964)';
    if (birthYear >= 1928 && birthYear <= 1945) return 'Silent Generation (1928-1945)';
    if (birthYear >= 1901 && birthYear <= 1927) return 'Greatest Generation (1901-1927)';
    if (birthYear >= 1883 && birthYear <= 1900) return 'Lost Generation (1883-1900)';
    if (birthYear < 1883) return 'Victorian Era (pre-1883)';

    return 'Unknown';
  };

  // Auto-calculate generation
  useEffect(() => {
    const age = parseInt(data?.vitals?.age, 10);
    const rpYear = parseInt(data?.vitals?.rpYear, 10);

    if (!isNaN(age) && !isNaN(rpYear) && age > 0 && rpYear > 0) {
      const birthYear = rpYear - age;
      const calculatedGen = calculateGeneration(birthYear);

      if (calculatedGen && data?.vitals?.generation !== calculatedGen) {
        update('vitals', 'generation', calculatedGen);
      }
    }
  }, [data?.vitals?.age, data?.vitals?.rpYear, data?.vitals?.generation]);

  const birthYear = (parseInt(data?.vitals?.rpYear, 10) || 0) - (parseInt(data?.vitals?.age, 10) || 0);
  const showBirthYear = data?.vitals?.age && data?.vitals?.rpYear && birthYear > 0;

  const renderSection = () => {
    switch (subtab) {
      case 0: // Core Identity
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <ArchiveInput label="First Name" value={data.core.firstName} onChange={(e) => update('core', 'firstName', e.target.value)} placeholder="Given name" />
            <ArchiveInput label="Middle Name(s)" value={data.core.middleName} onChange={(e) => update('core', 'middleName', e.target.value)} placeholder="Middle name(s)" />
            <ArchiveInput label="Last Name" value={data.core.lastName} onChange={(e) => update('core', 'lastName', e.target.value)} placeholder="Family name" />
            <ArchiveInput label="Nicknames / Aliases" value={data.core.nicknames} onChange={(e) => update('core', 'nicknames', e.target.value)} placeholder="Known aliases" />
            <ArchiveInput label="Date of Birth" value={data.core.dateOfBirth} onChange={(e) => update('core', 'dateOfBirth', e.target.value)} type="date" />
            <ArchiveSelect label="Archetype" value={data.core.archetype} onChange={(e) => update('core', 'archetype', e.target.value)} options={ARCHETYPES} />
          </div>
        );

      case 1: // Vital Statistics
        return (
          <div className="space-y-6">
            {/* Roleplay Year */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 text-sm">📅</span>
                </div>
                <div className="flex-1">
                  <label className="font-mono text-[9px] text-amber-800 uppercase tracking-[0.15em] font-bold">Roleplay Year</label>
                  <p className="font-mono text-[10px] text-amber-600 mb-2">The year in which your story takes place. Used to calculate the character's generation.</p>
                  <input
                    type="number"
                    value={data.vitals.rpYear}
                    onChange={(e) => update('vitals', 'rpYear', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-32 bg-white border-2 border-amber-300 py-2 px-3 font-mono text-lg font-bold text-amber-900 placeholder-amber-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <ArchiveInput label="Age" value={data.vitals.age} onChange={(e) => update('vitals', 'age', e.target.value)} type="number" placeholder="Years" />
                {showBirthYear && (
                  <div className="mt-1 font-mono text-[10px] text-gray-500">
                    Born in: <span className="font-bold text-gray-700">{birthYear}</span>
                  </div>
                )}
              </div>

              <ArchiveSelect label="Generation" value={data.vitals.generation} onChange={(e) => update('vitals', 'generation', e.target.value)} options={GENERATION_OPTIONS} />

              <ArchiveSelect label="Biological Sex" value={data.vitals.biologicalSex} onChange={(e) => update('vitals', 'biologicalSex', e.target.value)} options={BIOLOGICAL_SEX_OPTIONS} />

              {/* Gender Identity */}
              <div className="flex flex-col gap-1 mb-4">
                <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Gender Identity</label>
                <select
                  value={data.vitals.genderIdentity}
                  onChange={(e) => update('vitals', 'genderIdentity', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
                >
                  <option value="">-- Select --</option>
                  {GENDER_IDENTITIES.map((group, idx) => (
                    <optgroup key={idx} label={group.label}>
                      {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </optgroup>
                  ))}
                </select>
                {data.vitals.genderIdentity === 'Custom' && (
                  <input
                    type="text"
                    value={data.vitals.customGender || ''}
                    onChange={(e) => update('vitals', 'customGender', e.target.value)}
                    placeholder="Describe your gender identity..."
                    className="mt-2 w-full bg-white border-2 border-violet-300 py-2 px-3 font-mono text-sm text-violet-900 placeholder-violet-300 focus:border-violet-500 focus:outline-none"
                  />
                )}
              </div>

              {/* Pronouns */}
              <div className="flex flex-col gap-1 mb-4">
                <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Pronouns</label>
                <select
                  value={data.vitals.pronouns}
                  onChange={(e) => update('vitals', 'pronouns', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
                >
                  <option value="">-- Select --</option>
                  {PRONOUNS.map((group, idx) => (
                    <optgroup key={idx} label={group.label}>
                      {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </optgroup>
                  ))}
                </select>
                {data.vitals.pronouns === 'Custom' && (
                  <input
                    type="text"
                    value={data.vitals.customPronouns || ''}
                    onChange={(e) => update('vitals', 'customPronouns', e.target.value)}
                    placeholder="Enter your pronouns"
                    className="mt-2 w-full bg-white border-2 border-violet-300 py-2 px-3 font-mono text-sm text-violet-900 placeholder-violet-300 focus:border-violet-500 focus:outline-none"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Origins
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Nationality</label>
              <select
                value={data.origins.nationality}
                onChange={(e) => update('origins', 'nationality', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Country --</option>
                {NATIONALITIES.map((group, idx) => (
                  <optgroup key={idx} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
              {['Stateless', 'Dual Nationality', 'Refugee', 'Fictional Nation', 'Custom', 'Other Historical'].includes(data.origins.nationality) && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.origins.nationalityDetails || ''}
                    onChange={(e) => update('origins', 'nationalityDetails', e.target.value)}
                    placeholder="Specify details..."
                    className="w-full bg-white border-2 border-amber-300 py-2 px-3 font-mono text-sm text-amber-900 placeholder-amber-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Ethnicity / Ancestral Origin</label>
              <select
                value={data.origins.ethnicity}
                onChange={(e) => update('origins', 'ethnicity', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Ethnicity --</option>
                {ETHNICITIES.map((group, idx) => (
                  <optgroup key={idx} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
              {['Other African', 'Other European', 'Other East Asian', 'Other Southeast Asian', 'Other South Asian', 'Other Central Asian', 'Other Middle Eastern', 'Other Indigenous American', 'Other Pacific Islander', 'Other Mixed', 'Custom'].includes(data.origins.ethnicity) && (
                <input
                  type="text"
                  value={data.origins.ethnicityDetails || ''}
                  onChange={(e) => update('origins', 'ethnicityDetails', e.target.value)}
                  placeholder="Specify ethnicity..."
                  className="mt-2 w-full bg-white border-2 border-teal-300 py-2 px-3 font-mono text-sm text-teal-900 placeholder-teal-400 focus:border-teal-500 focus:outline-none"
                />
              )}
            </div>

            <ArchiveInput label="Birth City / Region" value={data.origins.birthCity} onChange={(e) => update('origins', 'birthCity', e.target.value)} placeholder="City, State/Province, Country" />
            <ArchiveInput label="Current Location" value={data.origins.currentLocation} onChange={(e) => update('origins', 'currentLocation', e.target.value)} placeholder="City, State/Province, Country" />

            <div className="flex flex-col gap-1 mb-4">
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Geographic Type</label>
              <select
                value={data.origins.geographicType}
                onChange={(e) => update('origins', 'geographicType', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Environment --</option>
                {GEOGRAPHIC_TYPES.map((group, idx) => (
                  <optgroup key={idx} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            <ArchiveSelect label="Childhood Trope" value={data.origins.childhoodTrope} onChange={(e) => update('origins', 'childhoodTrope', e.target.value)} options={CHILDHOOD_TROPES} />
          </div>
        );

      case 3: // Cultural Background
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Primary Culture</label>
              <select
                value={data.cultural.primaryCulture}
                onChange={(e) => update('cultural', 'primaryCulture', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Culture --</option>
                {PRIMARY_CULTURES.map((group, idx) => (
                  <optgroup key={idx} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
              {data.cultural.primaryCulture === 'Custom' && (
                <input
                  type="text"
                  value={data.cultural.primaryCultureCustom || ''}
                  onChange={(e) => update('cultural', 'primaryCultureCustom', e.target.value)}
                  placeholder="Describe your primary culture..."
                  className="mt-2 w-full bg-white border-2 border-indigo-300 py-2 px-3 font-mono text-sm text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:outline-none"
                />
              )}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Regional Culture</label>
              <select
                value={data.cultural.regionalCulture}
                onChange={(e) => update('cultural', 'regionalCulture', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Regional Culture --</option>
                {REGIONAL_CULTURES.map((group, idx) => (
                  <optgroup key={idx} label={group.label}>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderSection();
};

export default IdentityTab;
