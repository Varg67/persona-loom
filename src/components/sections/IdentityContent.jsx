import React, { useEffect } from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { generationOptions } from '../../data/lists';

const IdentityContent = ({ data, updateData, subtab }) => {
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
    if (birthYear >= 2010 && birthYear <= 2013) return 'Zalpha ✦ (2010-2013)'; // Cusp
    if (birthYear >= 1997 && birthYear <= 2012) return 'Gen Z (1997-2012)';
    if (birthYear >= 1993 && birthYear <= 1998) return 'Zennial ✦ (1993-1998)'; // Cusp
    if (birthYear >= 1981 && birthYear <= 1996) return 'Millennial / Gen Y (1981-1996)';
    if (birthYear >= 1977 && birthYear <= 1983) return 'Xennial ✦ (1977-1983)'; // Cusp
    if (birthYear >= 1965 && birthYear <= 1980) return 'Gen X (1965-1980)';
    if (birthYear >= 1954 && birthYear <= 1965) return 'Generation Jones ✦ (1954-1965)'; // Cusp
    if (birthYear >= 1946 && birthYear <= 1964) return 'Baby Boomer (1946-1964)';
    if (birthYear >= 1928 && birthYear <= 1945) return 'Silent Generation (1928-1945)';
    if (birthYear >= 1901 && birthYear <= 1927) return 'Greatest Generation (1901-1927)';
    if (birthYear >= 1883 && birthYear <= 1900) return 'Lost Generation (1883-1900)';
    if (birthYear < 1883) return 'Victorian Era (pre-1883)';

    return 'Unknown';
  };

  // Auto-calculate generation when age or rpYear changes
  useEffect(() => {
    const age = parseInt(data?.vitals?.age, 10);
    const rpYear = parseInt(data?.vitals?.rpYear, 10);

    if (!isNaN(age) && !isNaN(rpYear) && age > 0 && rpYear > 0) {
      const birthYear = rpYear - age;
      const calculatedGen = calculateGeneration(birthYear);

      if (calculatedGen && data?.vitals?.generation !== calculatedGen) {
        updateData('identity', {
          ...data,
          vitals: { ...data?.vitals, generation: calculatedGen }
        });
      }
    }
    // Note: updateData is stable from parent, calculateGeneration is defined in this scope
  }, [data?.vitals?.age, data?.vitals?.rpYear, data?.vitals?.generation, data, updateData]);

  // Calculate birth year for display
  const birthYear = (parseInt(data?.vitals?.rpYear, 10) || 0) - (parseInt(data?.vitals?.age, 10) || 0);
  const showBirthYear = data?.vitals?.age && data?.vitals?.rpYear && birthYear > 0;

  // All generation options for manual override
  // generationOptions imported from data/lists

  const sections = {
    0: ( // Core Identity
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ArchiveInput label="First Name" value={data.core.firstName} onChange={(e) => update('core', 'firstName', e.target.value)} placeholder="Given name" />
        <ArchiveInput label="Middle Name(s)" value={data.core.middleName} onChange={(e) => update('core', 'middleName', e.target.value)} placeholder="Middle name(s)" />
        <ArchiveInput label="Last Name" value={data.core.lastName} onChange={(e) => update('core', 'lastName', e.target.value)} placeholder="Family name" />
        <ArchiveInput label="Nicknames / Aliases" value={data.core.nicknames} onChange={(e) => update('core', 'nicknames', e.target.value)} placeholder="Known aliases" />
        <ArchiveInput label="Date of Birth" value={data.core.dateOfBirth} onChange={(e) => update('core', 'dateOfBirth', e.target.value)} type="date" />
        <ArchiveSelect label="Archetype" value={data.core.archetype} onChange={(e) => update('core', 'archetype', e.target.value)}
          options={['The Hero', 'The Mentor', 'The Outlaw', 'The Magician', 'The Lover', 'The Jester', 'The Everyman', 'The Caregiver', 'The Ruler', 'The Creator', 'The Innocent', 'The Sage', 'The Explorer']} />
      </div>
    ),
    1: ( // Vital Statistics
      <div className="space-y-6">
        {/* Roleplay Year - Important for generation calculation */}
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

          <div>
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex justify-between items-center">
                <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Generation</label>
                {data.vitals.age && data.vitals.rpYear && (
                  <span className="font-mono text-[8px] text-emerald-600 uppercase">✓ Auto-calculated</span>
                )}
              </div>
              <select
                value={data.vitals.generation}
                onChange={(e) => update('vitals', 'generation', e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="">-- Select --</option>
                {generationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt.includes('✦') ? `${opt} (cusp)` : opt}</option>
                ))}
              </select>
            </div>
          </div>

          <ArchiveSelect label="Biological Sex" value={data.vitals.biologicalSex} onChange={(e) => update('vitals', 'biologicalSex', e.target.value)}
            options={['Male', 'Female', 'Intersex']} />

          {/* Gender Identity - Expanded with categories */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Gender Identity</label>
            <select
              value={data.vitals.genderIdentity}
              onChange={(e) => update('vitals', 'genderIdentity', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="">-- Select --</option>

              <optgroup label="─── Cisgender ───">
                <option value="Cisgender Male">Cisgender Male</option>
                <option value="Cisgender Female">Cisgender Female</option>
              </optgroup>

              <optgroup label="─── Transgender ───">
                <option value="Transgender Male (FtM)">Transgender Male (FtM)</option>
                <option value="Transgender Female (MtF)">Transgender Female (MtF)</option>
                <option value="Transmasculine">Transmasculine</option>
                <option value="Transfeminine">Transfeminine</option>
              </optgroup>

              <optgroup label="─── Non-Binary Spectrum ───">
                <option value="Non-binary">Non-binary</option>
                <option value="Genderqueer">Genderqueer</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Bigender">Bigender</option>
                <option value="Trigender">Trigender</option>
                <option value="Pangender">Pangender</option>
                <option value="Polygender">Polygender</option>
                <option value="Demiboy">Demiboy</option>
                <option value="Demigirl">Demigirl</option>
                <option value="Demigender">Demigender</option>
                <option value="Agender">Agender</option>
                <option value="Neutrois">Neutrois</option>
                <option value="Androgyne">Androgyne</option>
                <option value="Maverique">Maverique</option>
                <option value="Aporagender">Aporagender</option>
              </optgroup>

              <optgroup label="─── Cultural / Indigenous ───">
                <option value="Two-Spirit (Indigenous)">Two-Spirit (Indigenous North American)</option>
                <option value="Hijra (South Asian)">Hijra (South Asian)</option>
                <option value="Māhū (Polynesian)">Māhū (Hawaiian/Polynesian)</option>
                <option value="Fa'afafine (Samoan)">Fa'afafine (Samoan)</option>
                <option value="Muxe (Zapotec)">Muxe (Zapotec/Mexican)</option>
                <option value="Kathoey (Thai)">Kathoey (Thai)</option>
                <option value="Bakla (Filipino)">Bakla (Filipino)</option>
                <option value="Waria (Indonesian)">Waria (Indonesian)</option>
                <option value="Sworn Virgin (Balkan)">Sworn Virgin (Balkan)</option>
              </optgroup>

              <optgroup label="─── Other ───">
                <option value="Questioning">Questioning</option>
                <option value="Gender Non-Conforming">Gender Non-Conforming</option>
                <option value="Xenogender">Xenogender</option>
                <option value="Custom">Custom / Self-Described</option>
              </optgroup>
            </select>

            {/* Custom gender input if "Custom" is selected */}
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

          {/* Pronouns - Expanded */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Pronouns</label>
            <select
              value={data.vitals.pronouns}
              onChange={(e) => update('vitals', 'pronouns', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="">-- Select --</option>

              <optgroup label="─── Common ───">
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
              </optgroup>

              <optgroup label="─── Combined ───">
                <option value="He/They">He/They</option>
                <option value="She/They">She/They</option>
                <option value="He/She">He/She</option>
                <option value="He/She/They">He/She/They</option>
              </optgroup>

              <optgroup label="─── Neopronouns ───">
                <option value="Ze/Zir">Ze/Zir</option>
                <option value="Ze/Hir">Ze/Hir</option>
                <option value="Xe/Xem">Xe/Xem</option>
                <option value="Ey/Em">Ey/Em</option>
                <option value="Fae/Faer">Fae/Faer</option>
                <option value="Ve/Ver">Ve/Ver</option>
                <option value="Per/Per">Per/Per</option>
                <option value="It/Its">It/Its</option>
              </optgroup>

              <optgroup label="─── Other ───">
                <option value="Any Pronouns">Any Pronouns</option>
                <option value="No Pronouns (Use Name)">No Pronouns (Use Name)</option>
                <option value="Ask Me">Ask Me</option>
                <option value="Custom">Custom</option>
              </optgroup>
            </select>

            {/* Custom pronouns input */}
            {data.vitals.pronouns === 'Custom' && (
              <input
                type="text"
                value={data.vitals.customPronouns || ''}
                onChange={(e) => update('vitals', 'customPronouns', e.target.value)}
                placeholder="Enter your pronouns (e.g. Ne/Nem/Nir)"
                className="mt-2 w-full bg-white border-2 border-violet-300 py-2 px-3 font-mono text-sm text-violet-900 placeholder-violet-300 focus:border-violet-500 focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Generation Info Card */}
        {data.vitals.generation && (
          <div className="bg-gray-100 border border-gray-200 p-4 rounded-sm mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Generation Profile</span>
              {data.vitals.generation.includes('✦') && (
                <span className="font-mono text-[8px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded">CUSP / MICRO-GEN</span>
              )}
            </div>
            <div className="font-serif text-lg font-bold text-gray-800">
              {data.vitals.generation.replace(' ✦', '')}
            </div>
            {showBirthYear && (
              <div className="font-mono text-xs text-gray-500 mt-1">
                Birth Year: {birthYear} | Age in {data.vitals.rpYear}: {data.vitals.age}
              </div>
            )}
          </div>
        )}
      </div>
    ),
    2: ( // Origins
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {/* Nationality - All countries organized by continent */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Nationality</label>
          <select
            value={data.origins.nationality}
            onChange={(e) => update('origins', 'nationality', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select Country --</option>

            <optgroup label="─── Africa ───">
              <option value="Algerian">Algerian</option>
              <option value="Angolan">Angolan</option>
              <option value="Beninese">Beninese</option>
              <option value="Botswanan">Botswanan</option>
              <option value="Burkinabé">Burkinabé</option>
              <option value="Burundian">Burundian</option>
              <option value="Cabo Verdean">Cabo Verdean</option>
              <option value="Cameroonian">Cameroonian</option>
              <option value="Central African">Central African</option>
              <option value="Chadian">Chadian</option>
              <option value="Comorian">Comorian</option>
              <option value="Congolese (DRC)">Congolese (DRC)</option>
              <option value="Congolese (Republic)">Congolese (Republic)</option>
              <option value="Djiboutian">Djiboutian</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Equatorial Guinean">Equatorial Guinean</option>
              <option value="Eritrean">Eritrean</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopian">Ethiopian</option>
              <option value="Gabonese">Gabonese</option>
              <option value="Gambian">Gambian</option>
              <option value="Ghanaian">Ghanaian</option>
              <option value="Guinean">Guinean</option>
              <option value="Guinea-Bissauan">Guinea-Bissauan</option>
              <option value="Ivorian">Ivorian</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberian">Liberian</option>
              <option value="Libyan">Libyan</option>
              <option value="Malagasy">Malagasy</option>
              <option value="Malawian">Malawian</option>
              <option value="Malian">Malian</option>
              <option value="Mauritanian">Mauritanian</option>
              <option value="Mauritian">Mauritian</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Mozambican">Mozambican</option>
              <option value="Namibian">Namibian</option>
              <option value="Nigerien">Nigerien</option>
              <option value="Nigerian">Nigerian</option>
              <option value="Rwandan">Rwandan</option>
              <option value="São Toméan">São Toméan</option>
              <option value="Senegalese">Senegalese</option>
              <option value="Seychellois">Seychellois</option>
              <option value="Sierra Leonean">Sierra Leonean</option>
              <option value="Somali">Somali</option>
              <option value="South African">South African</option>
              <option value="South Sudanese">South Sudanese</option>
              <option value="Sudanese">Sudanese</option>
              <option value="Tanzanian">Tanzanian</option>
              <option value="Togolese">Togolese</option>
              <option value="Tunisian">Tunisian</option>
              <option value="Ugandan">Ugandan</option>
              <option value="Zambian">Zambian</option>
              <option value="Zimbabwean">Zimbabwean</option>
            </optgroup>

            <optgroup label="─── Americas (North) ───">
              <option value="American">American</option>
              <option value="Canadian">Canadian</option>
              <option value="Mexican">Mexican</option>
            </optgroup>

            <optgroup label="─── Americas (Central & Caribbean) ───">
              <option value="Antiguan">Antiguan</option>
              <option value="Bahamian">Bahamian</option>
              <option value="Barbadian">Barbadian</option>
              <option value="Belizean">Belizean</option>
              <option value="Costa Rican">Costa Rican</option>
              <option value="Cuban">Cuban</option>
              <option value="Dominican (Dominica)">Dominican (Dominica)</option>
              <option value="Dominican (Republic)">Dominican (Republic)</option>
              <option value="Salvadoran">Salvadoran</option>
              <option value="Grenadian">Grenadian</option>
              <option value="Guatemalan">Guatemalan</option>
              <option value="Haitian">Haitian</option>
              <option value="Honduran">Honduran</option>
              <option value="Jamaican">Jamaican</option>
              <option value="Nicaraguan">Nicaraguan</option>
              <option value="Panamanian">Panamanian</option>
              <option value="Puerto Rican">Puerto Rican</option>
              <option value="Kittitian/Nevisian">Kittitian/Nevisian</option>
              <option value="Saint Lucian">Saint Lucian</option>
              <option value="Vincentian">Vincentian</option>
              <option value="Trinidadian/Tobagonian">Trinidadian/Tobagonian</option>
            </optgroup>

            <optgroup label="─── Americas (South) ───">
              <option value="Argentine">Argentine</option>
              <option value="Bolivian">Bolivian</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Chilean">Chilean</option>
              <option value="Colombian">Colombian</option>
              <option value="Ecuadorian">Ecuadorian</option>
              <option value="Guyanese">Guyanese</option>
              <option value="Paraguayan">Paraguayan</option>
              <option value="Peruvian">Peruvian</option>
              <option value="Surinamese">Surinamese</option>
              <option value="Uruguayan">Uruguayan</option>
              <option value="Venezuelan">Venezuelan</option>
            </optgroup>

            <optgroup label="─── Asia (East) ───">
              <option value="Chinese">Chinese</option>
              <option value="Hong Konger">Hong Konger</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean (North)">Korean (North)</option>
              <option value="Korean (South)">Korean (South)</option>
              <option value="Macanese">Macanese</option>
              <option value="Mongolian">Mongolian</option>
              <option value="Taiwanese">Taiwanese</option>
            </optgroup>

            <optgroup label="─── Asia (Southeast) ───">
              <option value="Bruneian">Bruneian</option>
              <option value="Burmese">Burmese</option>
              <option value="Cambodian">Cambodian</option>
              <option value="Filipino">Filipino</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Laotian">Laotian</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Singaporean">Singaporean</option>
              <option value="Thai">Thai</option>
              <option value="Timorese">Timorese</option>
              <option value="Vietnamese">Vietnamese</option>
            </optgroup>

            <optgroup label="─── Asia (South) ───">
              <option value="Afghan">Afghan</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Bhutanese">Bhutanese</option>
              <option value="Indian">Indian</option>
              <option value="Maldivian">Maldivian</option>
              <option value="Nepali">Nepali</option>
              <option value="Pakistani">Pakistani</option>
              <option value="Sri Lankan">Sri Lankan</option>
            </optgroup>

            <optgroup label="─── Asia (Central) ───">
              <option value="Kazakh">Kazakh</option>
              <option value="Kyrgyz">Kyrgyz</option>
              <option value="Tajik">Tajik</option>
              <option value="Turkmen">Turkmen</option>
              <option value="Uzbek">Uzbek</option>
            </optgroup>

            <optgroup label="─── Asia (West) / Middle East ───">
              <option value="Armenian">Armenian</option>
              <option value="Azerbaijani">Azerbaijani</option>
              <option value="Bahraini">Bahraini</option>
              <option value="Cypriot">Cypriot</option>
              <option value="Georgian">Georgian</option>
              <option value="Iranian">Iranian</option>
              <option value="Iraqi">Iraqi</option>
              <option value="Israeli">Israeli</option>
              <option value="Jordanian">Jordanian</option>
              <option value="Kuwaiti">Kuwaiti</option>
              <option value="Lebanese">Lebanese</option>
              <option value="Omani">Omani</option>
              <option value="Palestinian">Palestinian</option>
              <option value="Qatari">Qatari</option>
              <option value="Saudi">Saudi</option>
              <option value="Syrian">Syrian</option>
              <option value="Turkish">Turkish</option>
              <option value="Emirati">Emirati</option>
              <option value="Yemeni">Yemeni</option>
            </optgroup>

            <optgroup label="─── Europe (Western) ───">
              <option value="Austrian">Austrian</option>
              <option value="Belgian">Belgian</option>
              <option value="Dutch">Dutch</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Liechtensteiner">Liechtensteiner</option>
              <option value="Luxembourger">Luxembourger</option>
              <option value="Monacan">Monacan</option>
              <option value="Swiss">Swiss</option>
            </optgroup>

            <optgroup label="─── Europe (Northern) ───">
              <option value="British">British</option>
              <option value="Danish">Danish</option>
              <option value="Estonian">Estonian</option>
              <option value="Finnish">Finnish</option>
              <option value="Icelandic">Icelandic</option>
              <option value="Irish">Irish</option>
              <option value="Latvian">Latvian</option>
              <option value="Lithuanian">Lithuanian</option>
              <option value="Norwegian">Norwegian</option>
              <option value="Swedish">Swedish</option>
            </optgroup>

            <optgroup label="─── Europe (Southern) ───">
              <option value="Albanian">Albanian</option>
              <option value="Andorran">Andorran</option>
              <option value="Bosnian">Bosnian</option>
              <option value="Croatian">Croatian</option>
              <option value="Greek">Greek</option>
              <option value="Italian">Italian</option>
              <option value="Kosovar">Kosovar</option>
              <option value="Macedonian">Macedonian</option>
              <option value="Maltese">Maltese</option>
              <option value="Montenegrin">Montenegrin</option>
              <option value="Portuguese">Portuguese</option>
              <option value="San Marinese">San Marinese</option>
              <option value="Serbian">Serbian</option>
              <option value="Slovenian">Slovenian</option>
              <option value="Spanish">Spanish</option>
              <option value="Vatican">Vatican</option>
            </optgroup>

            <optgroup label="─── Europe (Eastern) ───">
              <option value="Belarusian">Belarusian</option>
              <option value="Bulgarian">Bulgarian</option>
              <option value="Czech">Czech</option>
              <option value="Hungarian">Hungarian</option>
              <option value="Moldovan">Moldovan</option>
              <option value="Polish">Polish</option>
              <option value="Romanian">Romanian</option>
              <option value="Russian">Russian</option>
              <option value="Slovak">Slovak</option>
              <option value="Ukrainian">Ukrainian</option>
            </optgroup>

            <optgroup label="─── Oceania ───">
              <option value="Australian">Australian</option>
              <option value="Fijian">Fijian</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Marshallese">Marshallese</option>
              <option value="Micronesian">Micronesian</option>
              <option value="Nauruan">Nauruan</option>
              <option value="New Zealander">New Zealander</option>
              <option value="Palauan">Palauan</option>
              <option value="Papua New Guinean">Papua New Guinean</option>
              <option value="Samoan">Samoan</option>
              <option value="Solomon Islander">Solomon Islander</option>
              <option value="Tongan">Tongan</option>
              <option value="Tuvaluan">Tuvaluan</option>
              <option value="Vanuatuan">Vanuatuan</option>
            </optgroup>

            <optgroup label="─── Historical Nations ───">
              <option value="Soviet (USSR)">Soviet (USSR) [1922-1991]</option>
              <option value="Yugoslav">Yugoslav [1918-1992]</option>
              <option value="Czechoslovak">Czechoslovak [1918-1993]</option>
              <option value="East German (DDR)">East German (DDR) [1949-1990]</option>
              <option value="West German (FRG)">West German (FRG) [1949-1990]</option>
              <option value="Austro-Hungarian">Austro-Hungarian [1867-1918]</option>
              <option value="Ottoman">Ottoman [1299-1922]</option>
              <option value="Prussian">Prussian [1525-1947]</option>
              <option value="Russian Imperial">Russian Imperial [1721-1917]</option>
              <option value="Byzantine">Byzantine [330-1453]</option>
              <option value="Roman">Roman [753 BC-476 AD]</option>
              <option value="Ancient Egyptian">Ancient Egyptian [3100 BC-30 BC]</option>
              <option value="Ancient Greek">Ancient Greek [800 BC-31 BC]</option>
              <option value="Persian (Ancient)">Persian (Ancient) [550 BC-330 BC]</option>
              <option value="Mesopotamian">Mesopotamian [3500 BC-539 BC]</option>
              <option value="Phoenician">Phoenician [1500 BC-300 BC]</option>
              <option value="Carthaginian">Carthaginian [814 BC-146 BC]</option>
              <option value="Mongol Empire">Mongol Empire [1206-1368]</option>
              <option value="Holy Roman">Holy Roman [800-1806]</option>
              <option value="Rhodesian">Rhodesian [1965-1979]</option>
              <option value="South Vietnamese">South Vietnamese [1955-1975]</option>
              <option value="North Vietnamese">North Vietnamese [1945-1976]</option>
              <option value="Tibetan (historical)">Tibetan (historical) [618-1950]</option>
              <option value="Hawaiian Kingdom">Hawaiian Kingdom [1795-1893]</option>
              <option value="Confederate (CSA)">Confederate (CSA) [1861-1865]</option>
              <option value="Republic of Texas">Republic of Texas [1836-1846]</option>
              <option value="Gran Colombian">Gran Colombian [1819-1831]</option>
              <option value="Zulu Kingdom">Zulu Kingdom [1816-1897]</option>
              <option value="Incan">Incan [1438-1533]</option>
              <option value="Aztec">Aztec [1428-1521]</option>
              <option value="Mayan">Mayan [2000 BC-1697 AD]</option>
              <option value="Other Historical">Other Historical</option>
            </optgroup>

            <optgroup label="─── Stateless / Other ───">
              <option value="Stateless">Stateless</option>
              <option value="Dual Nationality">Dual Nationality</option>
              <option value="Refugee">Refugee</option>
              <option value="Unknown">Unknown</option>
              <option value="Fictional Nation">Fictional Nation</option>
              <option value="Custom">Custom / Other</option>
            </optgroup>
          </select>

          {/* Custom nationality input for special cases */}
          {['Stateless', 'Dual Nationality', 'Refugee', 'Fictional Nation', 'Custom', 'Other Historical'].includes(data.origins.nationality) && (
            <div className="mt-2">
              <input
                type="text"
                value={data.origins.nationalityDetails || ''}
                onChange={(e) => update('origins', 'nationalityDetails', e.target.value)}
                placeholder={
                  data.origins.nationality === 'Dual Nationality' ? "Enter both nationalities (e.g. Brazilian-Italian)" :
                  data.origins.nationality === 'Refugee' ? "Original country / Seeking asylum from..." :
                  data.origins.nationality === 'Fictional Nation' ? "Name of fictional nation..." :
                  data.origins.nationality === 'Other Historical' ? "Name of historical nation/empire..." :
                  data.origins.nationality === 'Stateless' ? "Additional context (optional)..." :
                  "Specify nationality..."
                }
                className="w-full bg-white border-2 border-amber-300 py-2 px-3 font-mono text-sm text-amber-900 placeholder-amber-400 focus:border-amber-500 focus:outline-none"
              />
              {data.origins.nationality === 'Other Historical' && (
                <p className="mt-1 font-mono text-[9px] text-gray-500">
                  💡 Tip: Include the time period, e.g. "Venetian Republic [697-1797]"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Ethnicity - Comprehensive list independent of nationality */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Ethnicity / Ancestral Origin</label>
          <select
            value={data.origins.ethnicity}
            onChange={(e) => update('origins', 'ethnicity', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select Ethnicity --</option>

            <optgroup label="─── African ───">
              <option value="Afro-Caribbean">Afro-Caribbean</option>
              <option value="Afro-Latino">Afro-Latino/Latina</option>
              <option value="African American">African American</option>
              <option value="Afro-Brazilian">Afro-Brazilian</option>
              <option value="Afro-European">Afro-European</option>
              <option value="West African">West African</option>
              <option value="East African">East African</option>
              <option value="Central African">Central African</option>
              <option value="Southern African">Southern African</option>
              <option value="North African">North African (non-Arab)</option>
              <option value="Akan">Akan (Ashanti, Fante)</option>
              <option value="Yoruba">Yoruba</option>
              <option value="Igbo">Igbo</option>
              <option value="Hausa">Hausa</option>
              <option value="Fulani">Fulani</option>
              <option value="Zulu">Zulu</option>
              <option value="Xhosa">Xhosa</option>
              <option value="Swahili">Swahili</option>
              <option value="Amhara">Amhara</option>
              <option value="Oromo">Oromo</option>
              <option value="Tigrinya">Tigrinya</option>
              <option value="Somali">Somali</option>
              <option value="Maasai">Maasai</option>
              <option value="Berber/Amazigh">Berber/Amazigh</option>
              <option value="Khoisan">Khoisan</option>
              <option value="Tutsi">Tutsi</option>
              <option value="Hutu">Hutu</option>
              <option value="Mandinka">Mandinka</option>
              <option value="Wolof">Wolof</option>
              <option value="Bantu">Bantu (general)</option>
              <option value="Other African">Other African</option>
            </optgroup>

            <optgroup label="─── European ───">
              <option value="Northern European">Northern European (general)</option>
              <option value="Western European">Western European (general)</option>
              <option value="Southern European">Southern European (general)</option>
              <option value="Eastern European">Eastern European (general)</option>
              <option value="Anglo-Saxon">Anglo-Saxon</option>
              <option value="Celtic">Celtic (Irish, Scottish, Welsh, Breton)</option>
              <option value="Nordic/Scandinavian">Nordic/Scandinavian</option>
              <option value="Germanic">Germanic</option>
              <option value="Slavic">Slavic (general)</option>
              <option value="Baltic">Baltic (Lithuanian, Latvian)</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Iberian">Iberian (Spanish, Portuguese)</option>
              <option value="Italian">Italian</option>
              <option value="Greek">Greek</option>
              <option value="Balkan">Balkan</option>
              <option value="Romani/Roma">Romani/Roma</option>
              <option value="Basque">Basque</option>
              <option value="Sami">Sami</option>
              <option value="Jewish (Ashkenazi)">Jewish (Ashkenazi)</option>
              <option value="Jewish (Sephardic)">Jewish (Sephardic)</option>
              <option value="Jewish (Mizrahi)">Jewish (Mizrahi)</option>
              <option value="Caucasian (general)">Caucasian (general)</option>
              <option value="Other European">Other European</option>
            </optgroup>

            <optgroup label="─── East Asian ───">
              <option value="Han Chinese">Han Chinese</option>
              <option value="Cantonese">Cantonese</option>
              <option value="Hakka">Hakka</option>
              <option value="Manchu">Manchu</option>
              <option value="Mongolian">Mongolian</option>
              <option value="Tibetan">Tibetan</option>
              <option value="Uyghur">Uyghur</option>
              <option value="Zhuang">Zhuang</option>
              <option value="Japanese">Japanese</option>
              <option value="Ainu">Ainu</option>
              <option value="Ryukyuan">Ryukyuan (Okinawan)</option>
              <option value="Korean">Korean</option>
              <option value="Taiwanese Indigenous">Taiwanese Indigenous</option>
              <option value="Other East Asian">Other East Asian</option>
            </optgroup>

            <optgroup label="─── Southeast Asian ───">
              <option value="Filipino">Filipino</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Thai">Thai</option>
              <option value="Khmer">Khmer (Cambodian)</option>
              <option value="Lao">Lao</option>
              <option value="Burmese">Burmese</option>
              <option value="Malay">Malay</option>
              <option value="Indonesian">Indonesian (general)</option>
              <option value="Javanese">Javanese</option>
              <option value="Sundanese">Sundanese</option>
              <option value="Balinese">Balinese</option>
              <option value="Hmong">Hmong</option>
              <option value="Karen">Karen</option>
              <option value="Shan">Shan</option>
              <option value="Singaporean Chinese">Singaporean Chinese</option>
              <option value="Peranakan">Peranakan</option>
              <option value="Other Southeast Asian">Other Southeast Asian</option>
            </optgroup>

            <optgroup label="─── South Asian ───">
              <option value="South Asian (general)">South Asian (general)</option>
              <option value="North Indian">North Indian</option>
              <option value="South Indian">South Indian</option>
              <option value="Bengali">Bengali</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Marathi">Marathi</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Kannada">Kannada</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Kashmiri">Kashmiri</option>
              <option value="Sindhi">Sindhi</option>
              <option value="Pakistani">Pakistani (general)</option>
              <option value="Pashtun">Pashtun</option>
              <option value="Baloch">Baloch</option>
              <option value="Nepali">Nepali</option>
              <option value="Sinhalese">Sinhalese</option>
              <option value="Sri Lankan Tamil">Sri Lankan Tamil</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Indo-Caribbean">Indo-Caribbean</option>
              <option value="Indo-Fijian">Indo-Fijian</option>
              <option value="Anglo-Indian">Anglo-Indian</option>
              <option value="Other South Asian">Other South Asian</option>
            </optgroup>

            <optgroup label="─── Central Asian ───">
              <option value="Kazakh">Kazakh</option>
              <option value="Uzbek">Uzbek</option>
              <option value="Tajik">Tajik</option>
              <option value="Kyrgyz">Kyrgyz</option>
              <option value="Turkmen">Turkmen</option>
              <option value="Afghan (Pashtun)">Afghan (Pashtun)</option>
              <option value="Hazara">Hazara</option>
              <option value="Other Central Asian">Other Central Asian</option>
            </optgroup>

            <optgroup label="─── Middle Eastern / West Asian ───">
              <option value="Arab">Arab (general)</option>
              <option value="Levantine Arab">Levantine Arab</option>
              <option value="Gulf Arab">Gulf Arab</option>
              <option value="Egyptian Arab">Egyptian Arab</option>
              <option value="Maghrebi Arab">Maghrebi Arab</option>
              <option value="Persian/Iranian">Persian/Iranian</option>
              <option value="Turkish">Turkish</option>
              <option value="Kurdish">Kurdish</option>
              <option value="Armenian">Armenian</option>
              <option value="Georgian">Georgian</option>
              <option value="Azerbaijani">Azerbaijani</option>
              <option value="Assyrian">Assyrian</option>
              <option value="Druze">Druze</option>
              <option value="Coptic">Coptic</option>
              <option value="Maronite">Maronite</option>
              <option value="Israeli/Jewish">Israeli/Jewish</option>
              <option value="Palestinian">Palestinian</option>
              <option value="Other Middle Eastern">Other Middle Eastern</option>
            </optgroup>

            <optgroup label="─── Indigenous Americas ───">
              <option value="Native American (general)">Native American (general)</option>
              <option value="Cherokee">Cherokee</option>
              <option value="Navajo">Navajo (Diné)</option>
              <option value="Sioux">Sioux (Lakota, Dakota)</option>
              <option value="Apache">Apache</option>
              <option value="Choctaw">Choctaw</option>
              <option value="Ojibwe">Ojibwe (Chippewa)</option>
              <option value="Iroquois">Iroquois (Haudenosaunee)</option>
              <option value="Pueblo">Pueblo</option>
              <option value="Inuit">Inuit</option>
              <option value="Yupik">Yupik</option>
              <option value="Aleut">Aleut</option>
              <option value="First Nations (Canada)">First Nations (Canada)</option>
              <option value="Métis">Métis</option>
              <option value="Maya">Maya</option>
              <option value="Aztec/Nahua">Aztec/Nahua</option>
              <option value="Zapotec">Zapotec</option>
              <option value="Mixtec">Mixtec</option>
              <option value="Taíno">Taíno</option>
              <option value="Garifuna">Garifuna</option>
              <option value="Quechua">Quechua</option>
              <option value="Aymara">Aymara</option>
              <option value="Guaraní">Guaraní</option>
              <option value="Mapuche">Mapuche</option>
              <option value="Amazonian Indigenous">Amazonian Indigenous</option>
              <option value="Other Indigenous American">Other Indigenous American</option>
            </optgroup>

            <optgroup label="─── Pacific Islander / Oceanian ───">
              <option value="Polynesian (general)">Polynesian (general)</option>
              <option value="Hawaiian">Hawaiian (Native)</option>
              <option value="Samoan">Samoan</option>
              <option value="Tongan">Tongan</option>
              <option value="Tahitian">Tahitian</option>
              <option value="Māori">Māori</option>
              <option value="Micronesian">Micronesian (general)</option>
              <option value="Chamorro">Chamorro (Guam)</option>
              <option value="Melanesian">Melanesian (general)</option>
              <option value="Fijian">Fijian (Indigenous)</option>
              <option value="Papua New Guinean">Papua New Guinean</option>
              <option value="Aboriginal Australian">Aboriginal Australian</option>
              <option value="Torres Strait Islander">Torres Strait Islander</option>
              <option value="Other Pacific Islander">Other Pacific Islander</option>
            </optgroup>

            <optgroup label="─── Mixed / Multiracial ───">
              <option value="Biracial">Biracial (general)</option>
              <option value="Multiracial">Multiracial (3+)</option>
              <option value="Mixed Black/White">Mixed Black/White</option>
              <option value="Mixed Asian/White">Mixed Asian/White (Hapa)</option>
              <option value="Mixed Latino/White">Mixed Latino/White</option>
              <option value="Mixed Black/Latino">Mixed Black/Latino</option>
              <option value="Mixed Black/Asian">Mixed Black/Asian (Blasian)</option>
              <option value="Mixed Asian/Latino">Mixed Asian/Latino</option>
              <option value="Mixed Indigenous/European">Mixed Indigenous/European (Mestizo)</option>
              <option value="Mixed Indigenous/African">Mixed Indigenous/African (Zambo)</option>
              <option value="Mixed Arab/European">Mixed Arab/European</option>
              <option value="Mixed South Asian/European">Mixed South Asian/European</option>
              <option value="Creole">Creole</option>
              <option value="Mulatto">Mulatto</option>
              <option value="Pardo">Pardo (Brazilian mixed)</option>
              <option value="Eurasian">Eurasian</option>
              <option value="Amerasian">Amerasian</option>
              <option value="Dougla">Dougla (South Asian/African)</option>
              <option value="Other Mixed">Other Mixed</option>
            </optgroup>

            <optgroup label="─── Other ───">
              <option value="Unknown">Unknown</option>
              <option value="Ambiguous">Ambiguous/Racially Ambiguous</option>
              <option value="Custom">Custom / Self-Described</option>
            </optgroup>
          </select>

          {/* Custom ethnicity input */}
          {['Other African', 'Other European', 'Other East Asian', 'Other Southeast Asian', 'Other South Asian', 'Other Central Asian', 'Other Middle Eastern', 'Other Indigenous American', 'Other Pacific Islander', 'Other Mixed', 'Custom'].includes(data.origins.ethnicity) && (
            <input
              type="text"
              value={data.origins.ethnicityDetails || ''}
              onChange={(e) => update('origins', 'ethnicityDetails', e.target.value)}
              placeholder="Specify ethnicity or mix..."
              className="mt-2 w-full bg-white border-2 border-teal-300 py-2 px-3 font-mono text-sm text-teal-900 placeholder-teal-400 focus:border-teal-500 focus:outline-none"
            />
          )}

          <p className="mt-1 font-mono text-[9px] text-gray-400">
            💡 Ethnicity refers to ancestral/genetic heritage, independent of current nationality or citizenship.
          </p>
        </div>

        {/* Birth City / Region - with format hint */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Birth City / Region</label>
          <input
            type="text"
            value={data.origins.birthCity}
            onChange={(e) => update('origins', 'birthCity', e.target.value)}
            placeholder="City, State/Province, Country"
            className="w-full bg-transparent border-b-2 border-gray-300 py-1 font-mono text-sm text-gray-800 placeholder-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
          />
          <p className="font-mono text-[9px] text-gray-400">
            e.g. "São Paulo, SP, Brazil" or "London, England, UK" or "Lagos, Nigeria"
          </p>
        </div>

        {/* Current Location - with format hint */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Current Location</label>
          <input
            type="text"
            value={data.origins.currentLocation}
            onChange={(e) => update('origins', 'currentLocation', e.target.value)}
            placeholder="City, State/Province, Country"
            className="w-full bg-transparent border-b-2 border-gray-300 py-1 font-mono text-sm text-gray-800 placeholder-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
          />
          <p className="font-mono text-[9px] text-gray-400">
            e.g. "New York, NY, USA" or "Tokyo, Japan" or "Berlin, Germany"
          </p>
        </div>

        {/* Geographic Type - Expanded with categories */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Geographic Type</label>
          <select
            value={data.origins.geographicType}
            onChange={(e) => update('origins', 'geographicType', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select Environment --</option>

            <optgroup label="─── Urban ───">
              <option value="Megacity">Megacity (10M+ population)</option>
              <option value="Major City">Major City (1M-10M)</option>
              <option value="Mid-size City">Mid-size City (100K-1M)</option>
              <option value="Small City">Small City (50K-100K)</option>
              <option value="Urban Downtown">Urban Downtown / City Center</option>
              <option value="Urban Neighborhood">Urban Neighborhood</option>
              <option value="Inner City">Inner City</option>
              <option value="Urban Projects">Urban Projects / Housing Estate</option>
              <option value="Gentrified Area">Gentrified Area</option>
              <option value="Historic District">Historic District</option>
              <option value="Industrial District">Industrial District</option>
              <option value="Commercial District">Commercial District</option>
              <option value="Arts District">Arts District</option>
              <option value="Chinatown/Ethnic Enclave">Chinatown / Ethnic Enclave</option>
            </optgroup>

            <optgroup label="─── Suburban ───">
              <option value="Suburban">Suburban (general)</option>
              <option value="Affluent Suburb">Affluent Suburb</option>
              <option value="Middle-class Suburb">Middle-class Suburb</option>
              <option value="Working-class Suburb">Working-class Suburb</option>
              <option value="Gated Community">Gated Community</option>
              <option value="Planned Community">Planned Community</option>
              <option value="Subdivision">Subdivision / Housing Development</option>
              <option value="Commuter Town">Commuter Town</option>
              <option value="Bedroom Community">Bedroom Community</option>
              <option value="Exurb">Exurb (outer suburb)</option>
            </optgroup>

            <optgroup label="─── Small Town ───">
              <option value="Small Town">Small Town (general)</option>
              <option value="College Town">College Town</option>
              <option value="Factory Town">Factory / Mill Town</option>
              <option value="Mining Town">Mining Town</option>
              <option value="Tourist Town">Tourist Town</option>
              <option value="Resort Town">Resort Town</option>
              <option value="Historic Town">Historic Town</option>
              <option value="Border Town">Border Town</option>
              <option value="Port Town">Port Town</option>
              <option value="Market Town">Market Town</option>
              <option value="Ghost Town">Ghost Town (declining)</option>
            </optgroup>

            <optgroup label="─── Rural ───">
              <option value="Rural">Rural (general)</option>
              <option value="Farming Community">Farming Community</option>
              <option value="Ranch Country">Ranch Country</option>
              <option value="Plantation">Plantation Area</option>
              <option value="Village">Village</option>
              <option value="Hamlet">Hamlet (tiny village)</option>
              <option value="Countryside">Countryside</option>
              <option value="Backcountry">Backcountry / Backwoods</option>
              <option value="Frontier">Frontier / Outback</option>
              <option value="Homestead">Homestead / Farmstead</option>
              <option value="Rural Poverty">Rural Poverty Area</option>
            </optgroup>

            <optgroup label="─── Coastal & Water ───">
              <option value="Coastal City">Coastal City</option>
              <option value="Beach Town">Beach Town</option>
              <option value="Fishing Village">Fishing Village</option>
              <option value="Harbor/Port City">Harbor / Port City</option>
              <option value="Seaside Resort">Seaside Resort</option>
              <option value="Coastal Rural">Coastal Rural</option>
              <option value="Riverfront">Riverfront</option>
              <option value="River Delta">River Delta</option>
              <option value="Lakeside">Lakeside</option>
              <option value="Wetlands">Wetlands / Marshland</option>
              <option value="Bayou">Bayou / Swamp Area</option>
              <option value="Fjord">Fjord Region</option>
            </optgroup>

            <optgroup label="─── Island ───">
              <option value="Island Nation">Island Nation</option>
              <option value="Large Island">Large Island</option>
              <option value="Small Island">Small Island</option>
              <option value="Tropical Island">Tropical Island</option>
              <option value="Remote Island">Remote Island</option>
              <option value="Island Chain">Island Chain / Archipelago</option>
              <option value="Coral Atoll">Coral Atoll</option>
              <option value="Volcanic Island">Volcanic Island</option>
            </optgroup>

            <optgroup label="─── Mountain & Highland ───">
              <option value="Mountain">Mountain Region</option>
              <option value="Mountain Village">Mountain Village</option>
              <option value="Alpine">Alpine</option>
              <option value="Highland">Highland / Plateau</option>
              <option value="Foothill">Foothill</option>
              <option value="Valley">Valley</option>
              <option value="Canyon">Canyon Region</option>
              <option value="Hill Country">Hill Country</option>
              <option value="Ski Resort Area">Ski Resort Area</option>
            </optgroup>

            <optgroup label="─── Forest & Woodland ───">
              <option value="Forest">Forest Region</option>
              <option value="Rainforest">Rainforest</option>
              <option value="Jungle">Jungle</option>
              <option value="Woodland">Woodland</option>
              <option value="Taiga">Taiga / Boreal Forest</option>
              <option value="Logging Community">Logging Community</option>
            </optgroup>

            <optgroup label="─── Desert & Arid ───">
              <option value="Desert">Desert</option>
              <option value="Desert City">Desert City</option>
              <option value="Oasis">Oasis</option>
              <option value="Arid Steppe">Arid Steppe</option>
              <option value="Badlands">Badlands</option>
              <option value="Mesa">Mesa / Butte Region</option>
            </optgroup>

            <optgroup label="─── Arctic & Extreme ───">
              <option value="Arctic">Arctic Region</option>
              <option value="Tundra">Tundra</option>
              <option value="Subarctic">Subarctic</option>
              <option value="Antarctic">Antarctic Region</option>
              <option value="Permafrost Region">Permafrost Region</option>
            </optgroup>

            <optgroup label="─── Grassland & Plains ───">
              <option value="Plains">Plains / Prairie</option>
              <option value="Savanna">Savanna</option>
              <option value="Steppe">Steppe</option>
              <option value="Grassland">Grassland</option>
              <option value="Pampas">Pampas</option>
              <option value="Veldt">Veldt</option>
            </optgroup>

            <optgroup label="─── Special / Unique ───">
              <option value="Nomadic">Nomadic / No Fixed Location</option>
              <option value="Military Base">Military Base</option>
              <option value="Embassy/Diplomatic">Embassy / Diplomatic Compound</option>
              <option value="Refugee Camp">Refugee Camp</option>
              <option value="Commune">Commune / Intentional Community</option>
              <option value="Monastery">Monastery / Religious Community</option>
              <option value="Reservation">Reservation / Indigenous Territory</option>
              <option value="Offshore Platform">Offshore Platform</option>
              <option value="Research Station">Research Station</option>
              <option value="Space Station">Space Station</option>
              <option value="Underground">Underground / Subterranean</option>
              <option value="Floating Community">Floating Community</option>
              <option value="Shipboard">Shipboard / Maritime</option>
              <option value="Caravan">Caravan / Traveling Community</option>
              <option value="Circus/Carnival">Circus / Carnival / Fair</option>
            </optgroup>

            <optgroup label="─── Historical / Fantasy ───">
              <option value="Medieval Village">Medieval Village</option>
              <option value="Castle/Fortress">Castle / Fortress</option>
              <option value="Ancient City">Ancient City</option>
              <option value="Colonial Settlement">Colonial Settlement</option>
              <option value="Frontier Settlement">Frontier Settlement</option>
              <option value="Trading Post">Trading Post</option>
              <option value="Kingdom Capital">Kingdom Capital</option>
              <option value="Magical Realm">Magical Realm</option>
              <option value="Post-Apocalyptic">Post-Apocalyptic</option>
              <option value="Dystopian City">Dystopian City</option>
              <option value="Utopian Community">Utopian Community</option>
              <option value="Cyberpunk Megacity">Cyberpunk Megacity</option>
              <option value="Other Fictional">Other Fictional Setting</option>
            </optgroup>
          </select>
        </div>

        <ArchiveSelect label="Childhood Trope" value={data.origins.childhoodTrope} onChange={(e) => update('origins', 'childhoodTrope', e.target.value)}
          options={['Only Child', 'Oldest Sibling', 'Middle Child', 'Youngest Sibling', 'Twin', 'Orphan', 'Adopted', 'Foster Child', 'Raised by Single Parent', 'Raised by Grandparents']} />
      </div>
    ),
    3: ( // Cultural Background
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {/* Primary Culture - Comprehensive dropdown */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Primary Culture</label>
          <select
            value={data.cultural.primaryCulture}
            onChange={(e) => update('cultural', 'primaryCulture', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select Culture --</option>

            <optgroup label="─── Western (Anglo) ───">
              <option value="American (USA)">American (USA)</option>
              <option value="American Southern">American Southern</option>
              <option value="American Midwest">American Midwest</option>
              <option value="American Northeast">American Northeast</option>
              <option value="American West Coast">American West Coast</option>
              <option value="Texan">Texan</option>
              <option value="Canadian">Canadian</option>
              <option value="Canadian Québécois">Canadian Québécois</option>
              <option value="British">British</option>
              <option value="English">English</option>
              <option value="Scottish">Scottish</option>
              <option value="Welsh">Welsh</option>
              <option value="Irish">Irish</option>
              <option value="Australian">Australian</option>
              <option value="New Zealander (Kiwi)">New Zealander (Kiwi)</option>
            </optgroup>

            <optgroup label="─── Western European ───">
              <option value="French">French</option>
              <option value="Parisian">Parisian</option>
              <option value="German">German</option>
              <option value="Bavarian">Bavarian</option>
              <option value="Austrian">Austrian</option>
              <option value="Swiss German">Swiss German</option>
              <option value="Swiss French">Swiss French</option>
              <option value="Swiss Italian">Swiss Italian</option>
              <option value="Belgian">Belgian</option>
              <option value="Dutch">Dutch</option>
              <option value="Luxembourgish">Luxembourgish</option>
            </optgroup>

            <optgroup label="─── Northern European ───">
              <option value="Scandinavian (Nordic)">Scandinavian (Nordic)</option>
              <option value="Swedish">Swedish</option>
              <option value="Norwegian">Norwegian</option>
              <option value="Danish">Danish</option>
              <option value="Finnish">Finnish</option>
              <option value="Icelandic">Icelandic</option>
              <option value="Estonian">Estonian</option>
              <option value="Latvian">Latvian</option>
              <option value="Lithuanian">Lithuanian</option>
            </optgroup>

            <optgroup label="─── Southern European ───">
              <option value="Italian">Italian</option>
              <option value="Sicilian">Sicilian</option>
              <option value="Neapolitan">Neapolitan</option>
              <option value="Spanish">Spanish</option>
              <option value="Catalan">Catalan</option>
              <option value="Basque">Basque</option>
              <option value="Galician">Galician</option>
              <option value="Andalusian">Andalusian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Greek">Greek</option>
              <option value="Maltese">Maltese</option>
              <option value="Cypriot">Cypriot</option>
            </optgroup>

            <optgroup label="─── Eastern European ───">
              <option value="Russian">Russian</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Belarusian">Belarusian</option>
              <option value="Polish">Polish</option>
              <option value="Czech">Czech</option>
              <option value="Slovak">Slovak</option>
              <option value="Hungarian">Hungarian</option>
              <option value="Romanian">Romanian</option>
              <option value="Moldovan">Moldovan</option>
              <option value="Bulgarian">Bulgarian</option>
            </optgroup>

            <optgroup label="─── Balkan ───">
              <option value="Serbian">Serbian</option>
              <option value="Croatian">Croatian</option>
              <option value="Bosnian">Bosnian</option>
              <option value="Slovenian">Slovenian</option>
              <option value="Macedonian">Macedonian</option>
              <option value="Montenegrin">Montenegrin</option>
              <option value="Albanian">Albanian</option>
              <option value="Kosovar">Kosovar</option>
            </optgroup>

            <optgroup label="─── Latin American (Hispanic) ───">
              <option value="Mexican">Mexican</option>
              <option value="Mexican-American (Chicano)">Mexican-American (Chicano)</option>
              <option value="Central American">Central American</option>
              <option value="Guatemalan">Guatemalan</option>
              <option value="Salvadoran">Salvadoran</option>
              <option value="Honduran">Honduran</option>
              <option value="Nicaraguan">Nicaraguan</option>
              <option value="Costa Rican">Costa Rican</option>
              <option value="Panamanian">Panamanian</option>
              <option value="Cuban">Cuban</option>
              <option value="Cuban-American">Cuban-American</option>
              <option value="Puerto Rican">Puerto Rican</option>
              <option value="Dominican">Dominican</option>
              <option value="Caribbean Hispanic">Caribbean Hispanic</option>
              <option value="Colombian">Colombian</option>
              <option value="Venezuelan">Venezuelan</option>
              <option value="Peruvian">Peruvian</option>
              <option value="Ecuadorian">Ecuadorian</option>
              <option value="Bolivian">Bolivian</option>
              <option value="Chilean">Chilean</option>
              <option value="Argentine">Argentine</option>
              <option value="Uruguayan">Uruguayan</option>
              <option value="Paraguayan">Paraguayan</option>
            </optgroup>

            <optgroup label="─── Brazilian ───">
              <option value="Brazilian">Brazilian</option>
              <option value="Brazilian (Paulistano)">Brazilian (Paulistano/São Paulo)</option>
              <option value="Brazilian (Carioca)">Brazilian (Carioca/Rio)</option>
              <option value="Brazilian (Nordestino)">Brazilian (Nordestino)</option>
              <option value="Brazilian (Gaúcho)">Brazilian (Gaúcho)</option>
              <option value="Brazilian (Mineiro)">Brazilian (Mineiro)</option>
              <option value="Afro-Brazilian">Afro-Brazilian</option>
            </optgroup>

            <optgroup label="─── Caribbean (Non-Hispanic) ───">
              <option value="Jamaican">Jamaican</option>
              <option value="Haitian">Haitian</option>
              <option value="Trinidadian">Trinidadian</option>
              <option value="Barbadian">Barbadian</option>
              <option value="Bahamian">Bahamian</option>
              <option value="Guyanese">Guyanese</option>
              <option value="Surinamese">Surinamese</option>
              <option value="Dutch Caribbean">Dutch Caribbean</option>
              <option value="French Caribbean">French Caribbean</option>
            </optgroup>

            <optgroup label="─── Middle Eastern ───">
              <option value="Arab (general)">Arab (general)</option>
              <option value="Levantine">Levantine (Lebanese/Syrian/Palestinian/Jordanian)</option>
              <option value="Lebanese">Lebanese</option>
              <option value="Syrian">Syrian</option>
              <option value="Palestinian">Palestinian</option>
              <option value="Jordanian">Jordanian</option>
              <option value="Gulf Arab">Gulf Arab</option>
              <option value="Saudi">Saudi</option>
              <option value="Emirati">Emirati</option>
              <option value="Qatari">Qatari</option>
              <option value="Kuwaiti">Kuwaiti</option>
              <option value="Bahraini">Bahraini</option>
              <option value="Omani">Omani</option>
              <option value="Yemeni">Yemeni</option>
              <option value="Iraqi">Iraqi</option>
              <option value="Persian/Iranian">Persian/Iranian</option>
              <option value="Turkish">Turkish</option>
              <option value="Kurdish">Kurdish</option>
              <option value="Israeli">Israeli</option>
              <option value="Armenian">Armenian</option>
              <option value="Georgian">Georgian</option>
              <option value="Azerbaijani">Azerbaijani</option>
            </optgroup>

            <optgroup label="─── North African ───">
              <option value="Egyptian">Egyptian</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Algerian">Algerian</option>
              <option value="Tunisian">Tunisian</option>
              <option value="Libyan">Libyan</option>
              <option value="Berber/Amazigh">Berber/Amazigh</option>
              <option value="Sudanese">Sudanese</option>
            </optgroup>

            <optgroup label="─── Sub-Saharan African ───">
              <option value="West African">West African</option>
              <option value="Nigerian">Nigerian</option>
              <option value="Ghanaian">Ghanaian</option>
              <option value="Senegalese">Senegalese</option>
              <option value="Malian">Malian</option>
              <option value="Ivorian">Ivorian</option>
              <option value="East African">East African</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Ethiopian">Ethiopian</option>
              <option value="Eritrean">Eritrean</option>
              <option value="Somali">Somali</option>
              <option value="Tanzanian">Tanzanian</option>
              <option value="Ugandan">Ugandan</option>
              <option value="Rwandan">Rwandan</option>
              <option value="Central African">Central African</option>
              <option value="Congolese">Congolese</option>
              <option value="Cameroonian">Cameroonian</option>
              <option value="Southern African">Southern African</option>
              <option value="South African">South African</option>
              <option value="South African (Afrikaner)">South African (Afrikaner)</option>
              <option value="Zimbabwean">Zimbabwean</option>
              <option value="Namibian">Namibian</option>
              <option value="Botswanan">Botswanan</option>
              <option value="Angolan">Angolan</option>
              <option value="Mozambican">Mozambican</option>
            </optgroup>

            <optgroup label="─── African Diaspora ───">
              <option value="African American">African American</option>
              <option value="African American (Southern)">African American (Southern)</option>
              <option value="Afro-Caribbean">Afro-Caribbean</option>
              <option value="Afro-British">Afro-British</option>
              <option value="Afro-French">Afro-French</option>
              <option value="Afro-Latino">Afro-Latino</option>
              <option value="Black Canadian">Black Canadian</option>
            </optgroup>

            <optgroup label="─── South Asian ───">
              <option value="Indian (general)">Indian (general)</option>
              <option value="North Indian">North Indian</option>
              <option value="South Indian">South Indian</option>
              <option value="Bengali">Bengali</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Marathi">Marathi</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Kannada">Kannada</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Kashmiri">Kashmiri</option>
              <option value="Pakistani">Pakistani</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Nepali">Nepali</option>
              <option value="Sri Lankan">Sri Lankan</option>
              <option value="Afghan">Afghan</option>
              <option value="Bhutanese">Bhutanese</option>
              <option value="Maldivian">Maldivian</option>
              <option value="British Asian">British Asian</option>
              <option value="Indian-American (Desi)">Indian-American (Desi)</option>
              <option value="Indo-Caribbean">Indo-Caribbean</option>
              <option value="Indo-Fijian">Indo-Fijian</option>
            </optgroup>

            <optgroup label="─── East Asian ───">
              <option value="Chinese (Mainland)">Chinese (Mainland)</option>
              <option value="Chinese (Hong Kong)">Chinese (Hong Kong)</option>
              <option value="Chinese (Taiwanese)">Chinese (Taiwanese)</option>
              <option value="Chinese-American">Chinese-American</option>
              <option value="British Chinese">British Chinese</option>
              <option value="Cantonese">Cantonese</option>
              <option value="Shanghainese">Shanghainese</option>
              <option value="Japanese">Japanese</option>
              <option value="Japanese-American">Japanese-American</option>
              <option value="Korean">Korean</option>
              <option value="Korean-American">Korean-American</option>
              <option value="Mongolian">Mongolian</option>
              <option value="Tibetan">Tibetan</option>
            </optgroup>

            <optgroup label="─── Southeast Asian ───">
              <option value="Filipino">Filipino</option>
              <option value="Filipino-American">Filipino-American</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Vietnamese-American">Vietnamese-American</option>
              <option value="Thai">Thai</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Javanese">Javanese</option>
              <option value="Balinese">Balinese</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Singaporean">Singaporean</option>
              <option value="Cambodian (Khmer)">Cambodian (Khmer)</option>
              <option value="Laotian">Laotian</option>
              <option value="Burmese/Myanmar">Burmese/Myanmar</option>
              <option value="Hmong">Hmong</option>
              <option value="Timorese">Timorese</option>
            </optgroup>

            <optgroup label="─── Central Asian ───">
              <option value="Kazakh">Kazakh</option>
              <option value="Uzbek">Uzbek</option>
              <option value="Tajik">Tajik</option>
              <option value="Kyrgyz">Kyrgyz</option>
              <option value="Turkmen">Turkmen</option>
              <option value="Uyghur">Uyghur</option>
            </optgroup>

            <optgroup label="─── Pacific Islander & Oceanian ───">
              <option value="Hawaiian">Hawaiian</option>
              <option value="Polynesian">Polynesian</option>
              <option value="Samoan">Samoan</option>
              <option value="Tongan">Tongan</option>
              <option value="Tahitian">Tahitian</option>
              <option value="Māori">Māori</option>
              <option value="Fijian">Fijian</option>
              <option value="Micronesian">Micronesian</option>
              <option value="Chamorro (Guam)">Chamorro (Guam)</option>
              <option value="Melanesian">Melanesian</option>
              <option value="Papua New Guinean">Papua New Guinean</option>
              <option value="Aboriginal Australian">Aboriginal Australian</option>
              <option value="Torres Strait Islander">Torres Strait Islander</option>
            </optgroup>

            <optgroup label="─── Indigenous Americas ───">
              <option value="Native American (general)">Native American (general)</option>
              <option value="Navajo (Diné)">Navajo (Diné)</option>
              <option value="Cherokee">Cherokee</option>
              <option value="Sioux/Lakota">Sioux/Lakota</option>
              <option value="Apache">Apache</option>
              <option value="Ojibwe">Ojibwe</option>
              <option value="Iroquois">Iroquois</option>
              <option value="Pueblo">Pueblo</option>
              <option value="Hopi">Hopi</option>
              <option value="Inuit">Inuit</option>
              <option value="Yupik">Yupik</option>
              <option value="First Nations (Canada)">First Nations (Canada)</option>
              <option value="Métis">Métis</option>
              <option value="Maya">Maya</option>
              <option value="Aztec/Nahua">Aztec/Nahua</option>
              <option value="Zapotec">Zapotec</option>
              <option value="Quechua">Quechua</option>
              <option value="Aymara">Aymara</option>
              <option value="Mapuche">Mapuche</option>
              <option value="Guaraní">Guaraní</option>
              <option value="Amazonian Indigenous">Amazonian Indigenous</option>
            </optgroup>

            <optgroup label="─── Jewish ───">
              <option value="Ashkenazi Jewish">Ashkenazi Jewish</option>
              <option value="Sephardic Jewish">Sephardic Jewish</option>
              <option value="Mizrahi Jewish">Mizrahi Jewish</option>
              <option value="Israeli Secular">Israeli Secular</option>
              <option value="Orthodox Jewish">Orthodox Jewish</option>
              <option value="Hasidic">Hasidic</option>
              <option value="American Jewish">American Jewish</option>
            </optgroup>

            <optgroup label="─── Romani ───">
              <option value="Romani/Roma">Romani/Roma</option>
              <option value="Sinti">Sinti</option>
              <option value="Traveller (Irish)">Traveller (Irish)</option>
              <option value="Traveller (British)">Traveller (British)</option>
            </optgroup>

            <optgroup label="─── Mixed & Global ───">
              <option value="Third Culture Kid (TCK)">Third Culture Kid (TCK)</option>
              <option value="Global Nomad">Global Nomad</option>
              <option value="Expatriate">Expatriate</option>
              <option value="Immigrant (1st gen)">Immigrant (1st generation)</option>
              <option value="Immigrant (2nd gen)">Immigrant (2nd generation)</option>
              <option value="Bicultural">Bicultural</option>
              <option value="Multicultural">Multicultural</option>
              <option value="Cosmopolitan/Global">Cosmopolitan/Global</option>
              <option value="Military Brat">Military Brat</option>
              <option value="Diplomatic Family">Diplomatic Family</option>
              <option value="Diaspora">Diaspora (general)</option>
            </optgroup>

            <optgroup label="─── Other ───">
              <option value="Stateless/Displaced">Stateless/Displaced</option>
              <option value="Refugee Background">Refugee Background</option>
              <option value="Unknown/Uncertain">Unknown/Uncertain</option>
              <option value="Custom">Custom / Self-Described</option>
            </optgroup>
          </select>

          {/* Custom culture input */}
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

        {/* Regional Culture - Comprehensive dropdown */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Regional Culture</label>
          <select
            value={data.cultural.regionalCulture}
            onChange={(e) => update('cultural', 'regionalCulture', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select Regional Culture --</option>

            <optgroup label="─── USA Regions ───">
              <option value="New England">New England</option>
              <option value="Mid-Atlantic">Mid-Atlantic</option>
              <option value="Deep South">Deep South</option>
              <option value="Appalachian">Appalachian</option>
              <option value="Midwest/Heartland">Midwest/Heartland</option>
              <option value="Great Plains">Great Plains</option>
              <option value="Texas/Texan">Texas/Texan</option>
              <option value="Southwest">Southwest</option>
              <option value="Pacific Northwest">Pacific Northwest</option>
              <option value="California (SoCal)">California (SoCal)</option>
              <option value="California (NorCal)">California (NorCal)</option>
              <option value="California (Bay Area)">California (Bay Area)</option>
              <option value="Hawaii/Island">Hawaii/Island</option>
              <option value="Alaska">Alaska</option>
              <option value="Rust Belt">Rust Belt</option>
              <option value="Bible Belt">Bible Belt</option>
              <option value="Sun Belt">Sun Belt</option>
              <option value="East Coast Urban">East Coast Urban</option>
              <option value="West Coast Urban">West Coast Urban</option>
              <option value="New York/Tri-State">New York/Tri-State</option>
              <option value="Chicago/Great Lakes">Chicago/Great Lakes</option>
              <option value="Florida">Florida</option>
              <option value="Cajun/Creole (Louisiana)">Cajun/Creole (Louisiana)</option>
              <option value="Gullah Geechee">Gullah Geechee</option>
              <option value="Native Reservation">Native Reservation</option>
            </optgroup>

            <optgroup label="─── Canada Regions ───">
              <option value="Ontario/Greater Toronto">Ontario/Greater Toronto</option>
              <option value="Québécois">Québécois</option>
              <option value="Montreal">Montreal</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Vancouver">Vancouver</option>
              <option value="Prairie Provinces">Prairie Provinces</option>
              <option value="Alberta">Alberta</option>
              <option value="Maritime/Atlantic">Maritime/Atlantic</option>
              <option value="Newfoundland">Newfoundland</option>
              <option value="Northern/Territories">Northern/Territories</option>
            </optgroup>

            <optgroup label="─── UK Regions ───">
              <option value="London/Metropolitan">London/Metropolitan</option>
              <option value="Southeast England">Southeast England</option>
              <option value="Southwest England">Southwest England</option>
              <option value="East Anglia">East Anglia</option>
              <option value="Midlands">Midlands</option>
              <option value="Northern England">Northern England</option>
              <option value="Yorkshire">Yorkshire</option>
              <option value="Manchester/Lancashire">Manchester/Lancashire</option>
              <option value="Liverpool/Merseyside">Liverpool/Merseyside</option>
              <option value="Newcastle/Geordie">Newcastle/Geordie</option>
              <option value="Scottish Lowlands">Scottish Lowlands</option>
              <option value="Scottish Highlands">Scottish Highlands</option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="Glasgow">Glasgow</option>
              <option value="Welsh">Welsh</option>
              <option value="Northern Irish">Northern Irish</option>
              <option value="Cornish">Cornish</option>
            </optgroup>

            <optgroup label="─── Ireland Regions ───">
              <option value="Dublin">Dublin</option>
              <option value="Cork">Cork</option>
              <option value="Galway/West">Galway/West</option>
              <option value="Rural Ireland">Rural Ireland</option>
              <option value="Ulster">Ulster</option>
            </optgroup>

            <optgroup label="─── France Regions ───">
              <option value="Parisian">Parisian</option>
              <option value="Provençal">Provençal</option>
              <option value="Breton">Breton</option>
              <option value="Alsatian">Alsatian</option>
              <option value="Norman">Norman</option>
              <option value="Burgundian">Burgundian</option>
              <option value="Lyonnais">Lyonnais</option>
              <option value="Marseillais">Marseillais</option>
              <option value="Corsican">Corsican</option>
              <option value="Occitan">Occitan</option>
              <option value="Basque (French)">Basque (French)</option>
            </optgroup>

            <optgroup label="─── Germany Regions ───">
              <option value="Berliner">Berliner</option>
              <option value="Bavarian">Bavarian</option>
              <option value="Rhineland">Rhineland</option>
              <option value="Saxon">Saxon</option>
              <option value="Swabian">Swabian</option>
              <option value="Hessian">Hessian</option>
              <option value="Prussian">Prussian</option>
              <option value="Franconian">Franconian</option>
              <option value="Hamburg/Northern">Hamburg/Northern</option>
              <option value="East German">East German</option>
            </optgroup>

            <optgroup label="─── Italy Regions ───">
              <option value="Roman">Roman</option>
              <option value="Milanese/Lombard">Milanese/Lombard</option>
              <option value="Tuscan/Florentine">Tuscan/Florentine</option>
              <option value="Venetian">Venetian</option>
              <option value="Neapolitan">Neapolitan</option>
              <option value="Sicilian">Sicilian</option>
              <option value="Sardinian">Sardinian</option>
              <option value="Piedmontese">Piedmontese</option>
              <option value="Genoese/Ligurian">Genoese/Ligurian</option>
              <option value="Emilian/Bolognese">Emilian/Bolognese</option>
              <option value="Calabrian">Calabrian</option>
              <option value="Apulian">Apulian</option>
            </optgroup>

            <optgroup label="─── Spain Regions ───">
              <option value="Castilian/Madrileño">Castilian/Madrileño</option>
              <option value="Catalan/Barcelonés">Catalan/Barcelonés</option>
              <option value="Andalusian">Andalusian</option>
              <option value="Basque">Basque</option>
              <option value="Galician">Galician</option>
              <option value="Valencian">Valencian</option>
              <option value="Aragonese">Aragonese</option>
              <option value="Canarian">Canarian</option>
              <option value="Asturian">Asturian</option>
              <option value="Balearic">Balearic</option>
            </optgroup>

            <optgroup label="─── Brazil Regions ───">
              <option value="Paulistano (São Paulo)">Paulistano (São Paulo)</option>
              <option value="Carioca (Rio)">Carioca (Rio)</option>
              <option value="Mineiro (Minas Gerais)">Mineiro (Minas Gerais)</option>
              <option value="Nordestino (Northeast)">Nordestino (Northeast)</option>
              <option value="Baiano (Bahia)">Baiano (Bahia)</option>
              <option value="Pernambucano">Pernambucano</option>
              <option value="Cearense">Cearense</option>
              <option value="Gaúcho (Sul)">Gaúcho (Sul)</option>
              <option value="Paranaense">Paranaense</option>
              <option value="Catarinense">Catarinense</option>
              <option value="Amazônico">Amazônico</option>
              <option value="Brasiliense">Brasiliense</option>
              <option value="Goiano">Goiano</option>
              <option value="Capixaba">Capixaba</option>
              <option value="Pantaneiro">Pantaneiro</option>
              <option value="Sertanejo">Sertanejo</option>
            </optgroup>

            <optgroup label="─── Mexico Regions ───">
              <option value="Chilango (Mexico City)">Chilango (Mexico City)</option>
              <option value="Norteño (Northern)">Norteño (Northern)</option>
              <option value="Jalisciense (Jalisco)">Jalisciense (Jalisco)</option>
              <option value="Yucateco">Yucateco</option>
              <option value="Oaxaqueño">Oaxaqueño</option>
              <option value="Veracruzano">Veracruzano</option>
              <option value="Regiomontano (Monterrey)">Regiomontano (Monterrey)</option>
              <option value="Tapatío (Guadalajara)">Tapatío (Guadalajara)</option>
              <option value="Fronterizo (Border)">Fronterizo (Border)</option>
            </optgroup>

            <optgroup label="─── Argentina Regions ───">
              <option value="Porteño (Buenos Aires)">Porteño (Buenos Aires)</option>
              <option value="Cordobés">Cordobés</option>
              <option value="Patagónico">Patagónico</option>
              <option value="Mendocino">Mendocino</option>
              <option value="Pampeano">Pampeano</option>
              <option value="Norteño Argentino">Norteño Argentino</option>
            </optgroup>

            <optgroup label="─── China Regions ───">
              <option value="Beijinger">Beijinger</option>
              <option value="Shanghainese">Shanghainese</option>
              <option value="Cantonese (Guangdong)">Cantonese (Guangdong)</option>
              <option value="Sichuanese">Sichuanese</option>
              <option value="Hunanese">Hunanese</option>
              <option value="Fujianese">Fujianese</option>
              <option value="Hakka">Hakka</option>
              <option value="Dongbei (Northeast)">Dongbei (Northeast)</option>
              <option value="Hong Konger">Hong Konger</option>
              <option value="Macanese">Macanese</option>
              <option value="Taiwanese">Taiwanese</option>
              <option value="Xinjiang">Xinjiang</option>
              <option value="Tibetan Region">Tibetan Region</option>
            </optgroup>

            <optgroup label="─── Japan Regions ───">
              <option value="Tokyoite">Tokyoite</option>
              <option value="Osakan/Kansai">Osakan/Kansai</option>
              <option value="Kyoto">Kyoto</option>
              <option value="Nagoya/Chubu">Nagoya/Chubu</option>
              <option value="Hokkaido">Hokkaido</option>
              <option value="Tohoku (Northern)">Tohoku (Northern)</option>
              <option value="Kyushu">Kyushu</option>
              <option value="Okinawan">Okinawan</option>
              <option value="Hiroshima/Chugoku">Hiroshima/Chugoku</option>
            </optgroup>

            <optgroup label="─── Korea Regions ───">
              <option value="Seoul Metropolitan">Seoul Metropolitan</option>
              <option value="Busan/Gyeongsang">Busan/Gyeongsang</option>
              <option value="Jeju Island">Jeju Island</option>
              <option value="Jeolla">Jeolla</option>
              <option value="Chungcheong">Chungcheong</option>
              <option value="Gangwon">Gangwon</option>
            </optgroup>

            <optgroup label="─── India Regions ───">
              <option value="Mumbai/Maharashtrian">Mumbai/Maharashtrian</option>
              <option value="Delhi/NCR">Delhi/NCR</option>
              <option value="Kolkata/Bengali">Kolkata/Bengali</option>
              <option value="Chennai/Tamil">Chennai/Tamil</option>
              <option value="Bangalore/Kannadiga">Bangalore/Kannadiga</option>
              <option value="Hyderabad/Telugu">Hyderabad/Telugu</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Rajasthani">Rajasthani</option>
              <option value="Kashmiri">Kashmiri</option>
              <option value="Kerala/Malayali">Kerala/Malayali</option>
              <option value="Goan">Goan</option>
              <option value="Northeast Indian">Northeast Indian</option>
            </optgroup>

            <optgroup label="─── Russia Regions ───">
              <option value="Muscovite">Muscovite</option>
              <option value="St. Petersburg">St. Petersburg</option>
              <option value="Siberian">Siberian</option>
              <option value="Caucasus">Caucasus</option>
              <option value="Ural">Ural</option>
              <option value="Far East Russian">Far East Russian</option>
              <option value="Volga Region">Volga Region</option>
            </optgroup>

            <optgroup label="─── Australia Regions ───">
              <option value="Sydney">Sydney</option>
              <option value="Melbourne">Melbourne</option>
              <option value="Brisbane/Queensland">Brisbane/Queensland</option>
              <option value="Perth/Western">Perth/Western</option>
              <option value="Adelaide/South">Adelaide/South</option>
              <option value="Tasmanian">Tasmanian</option>
              <option value="Outback">Outback</option>
              <option value="Tropical North">Tropical North</option>
            </optgroup>

            <optgroup label="─── Middle East Regions ───">
              <option value="Levantine Urban">Levantine Urban</option>
              <option value="Gulf Urban">Gulf Urban</option>
              <option value="Bedouin">Bedouin</option>
              <option value="Cairene (Cairo)">Cairene (Cairo)</option>
              <option value="Upper Egyptian">Upper Egyptian</option>
              <option value="Tehrani">Tehrani</option>
              <option value="Istanbul">Istanbul</option>
              <option value="Anatolian">Anatolian</option>
              <option value="Coastal Levant">Coastal Levant</option>
            </optgroup>

            <optgroup label="─── Africa Regions ───">
              <option value="Lagos/Lagosian">Lagos/Lagosian</option>
              <option value="Johannesburg">Johannesburg</option>
              <option value="Cape Town">Cape Town</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Dakar">Dakar</option>
              <option value="Accra">Accra</option>
              <option value="Kinshasa">Kinshasa</option>
              <option value="Rural African">Rural African</option>
              <option value="Sahel">Sahel</option>
              <option value="Coastal West African">Coastal West African</option>
            </optgroup>

            <optgroup label="─── General Types ───">
              <option value="Urban Metropolitan">Urban Metropolitan</option>
              <option value="Suburban">Suburban</option>
              <option value="Small Town">Small Town</option>
              <option value="Rural/Countryside">Rural/Countryside</option>
              <option value="Coastal">Coastal</option>
              <option value="Mountain">Mountain</option>
              <option value="Island">Island</option>
              <option value="Border Region">Border Region</option>
              <option value="Industrial">Industrial</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Tourist Region">Tourist Region</option>
              <option value="University Town">University Town</option>
              <option value="Capital City">Capital City</option>
              <option value="Provincial">Provincial</option>
              <option value="Port City">Port City</option>
              <option value="Desert">Desert</option>
              <option value="Tropical">Tropical</option>
              <option value="Arctic/Subarctic">Arctic/Subarctic</option>
            </optgroup>

            <optgroup label="─── Other ───">
              <option value="Mixed Regional">Mixed Regional</option>
              <option value="No Strong Regional Identity">No Strong Regional Identity</option>
              <option value="Custom">Custom / Self-Described</option>
            </optgroup>
          </select>

          {/* Custom regional culture input */}
          {data.cultural.regionalCulture === 'Custom' && (
            <input
              type="text"
              value={data.cultural.regionalCultureCustom || ''}
              onChange={(e) => update('cultural', 'regionalCultureCustom', e.target.value)}
              placeholder="Describe your regional culture..."
              className="mt-2 w-full bg-white border-2 border-indigo-300 py-2 px-3 font-mono text-sm text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:outline-none"
            />
          )}
        </div>

        {/* Religion / Spirituality - Comprehensive dropdown */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Religion / Spirituality</label>
          <select
            value={data.cultural.religion}
            onChange={(e) => update('cultural', 'religion', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select Religion / Spirituality --</option>

            <optgroup label="─── Christianity (Catholic) ───">
              <option value="Catholic">Catholic (general)</option>
              <option value="Roman Catholic">Roman Catholic</option>
              <option value="Eastern Catholic">Eastern Catholic</option>
              <option value="Traditional Catholic">Traditional Catholic</option>
              <option value="Liberal Catholic">Liberal Catholic</option>
              <option value="Cultural Catholic">Cultural Catholic (non-practicing)</option>
            </optgroup>

            <optgroup label="─── Christianity (Orthodox) ───">
              <option value="Eastern Orthodox">Eastern Orthodox (general)</option>
              <option value="Greek Orthodox">Greek Orthodox</option>
              <option value="Russian Orthodox">Russian Orthodox</option>
              <option value="Serbian Orthodox">Serbian Orthodox</option>
              <option value="Ukrainian Orthodox">Ukrainian Orthodox</option>
              <option value="Romanian Orthodox">Romanian Orthodox</option>
              <option value="Bulgarian Orthodox">Bulgarian Orthodox</option>
              <option value="Coptic Orthodox">Coptic Orthodox</option>
              <option value="Ethiopian Orthodox">Ethiopian Orthodox</option>
              <option value="Armenian Apostolic">Armenian Apostolic</option>
              <option value="Syriac Orthodox">Syriac Orthodox</option>
            </optgroup>

            <optgroup label="─── Christianity (Protestant) ───">
              <option value="Protestant">Protestant (general)</option>
              <option value="Baptist">Baptist</option>
              <option value="Southern Baptist">Southern Baptist</option>
              <option value="Methodist">Methodist</option>
              <option value="United Methodist">United Methodist</option>
              <option value="Lutheran">Lutheran</option>
              <option value="Presbyterian">Presbyterian</option>
              <option value="Anglican">Anglican</option>
              <option value="Episcopalian">Episcopalian</option>
              <option value="Church of England">Church of England</option>
              <option value="Congregationalist">Congregationalist</option>
              <option value="Reformed">Reformed</option>
              <option value="Calvinist">Calvinist</option>
            </optgroup>

            <optgroup label="─── Christianity (Evangelical/Charismatic) ───">
              <option value="Evangelical">Evangelical</option>
              <option value="Pentecostal">Pentecostal</option>
              <option value="Charismatic">Charismatic</option>
              <option value="Assemblies of God">Assemblies of God</option>
              <option value="Church of God">Church of God</option>
              <option value="Foursquare">Foursquare</option>
              <option value="Vineyard">Vineyard</option>
              <option value="Non-denominational">Non-denominational Christian</option>
              <option value="Megachurch">Megachurch</option>
              <option value="Born Again">Born Again Christian</option>
            </optgroup>

            <optgroup label="─── Christianity (Other) ───">
              <option value="Seventh-day Adventist">Seventh-day Adventist</option>
              <option value="Mormon (LDS)">Mormon (LDS)</option>
              <option value="Jehovah's Witness">Jehovahs Witness</option>
              <option value="Quaker">Quaker (Society of Friends)</option>
              <option value="Mennonite">Mennonite</option>
              <option value="Amish">Amish</option>
              <option value="Hutterite">Hutterite</option>
              <option value="Brethren">Brethren</option>
              <option value="Unitarian">Unitarian</option>
              <option value="Christian Science">Christian Science</option>
              <option value="Unity Church">Unity Church</option>
              <option value="Progressive Christian">Progressive Christian</option>
              <option value="Liberal Christian">Liberal Christian</option>
              <option value="Messianic Jewish">Messianic Jewish</option>
            </optgroup>

            <optgroup label="─── Islam ───">
              <option value="Muslim">Muslim (general)</option>
              <option value="Sunni">Sunni</option>
              <option value="Sunni Hanafi">Sunni Hanafi</option>
              <option value="Sunni Maliki">Sunni Maliki</option>
              <option value="Sunni Shafi'i">Sunni Shafi'i</option>
              <option value="Sunni Hanbali">Sunni Hanbali</option>
              <option value="Shia">Shia</option>
              <option value="Shia Twelver">Shia Twelver</option>
              <option value="Shia Ismaili">Shia Ismaili</option>
              <option value="Shia Zaydi">Shia Zaydi</option>
              <option value="Sufi">Sufi</option>
              <option value="Ibadi">Ibadi</option>
              <option value="Ahmadiyya">Ahmadiyya</option>
              <option value="Nation of Islam">Nation of Islam</option>
              <option value="Salafi">Salafi</option>
              <option value="Wahabi">Wahabi</option>
              <option value="Progressive Muslim">Progressive/Liberal Muslim</option>
              <option value="Cultural Muslim">Cultural Muslim (non-practicing)</option>
            </optgroup>

            <optgroup label="─── Judaism ───">
              <option value="Jewish">Jewish (general)</option>
              <option value="Orthodox Jewish">Orthodox Jewish</option>
              <option value="Haredi/Ultra-Orthodox">Haredi/Ultra-Orthodox</option>
              <option value="Hasidic">Hasidic</option>
              <option value="Chabad-Lubavitch">Chabad-Lubavitch</option>
              <option value="Modern Orthodox">Modern Orthodox</option>
              <option value="Conservative Jewish">Conservative Jewish</option>
              <option value="Reform Jewish">Reform Jewish</option>
              <option value="Reconstructionist">Reconstructionist</option>
              <option value="Secular Jewish">Secular Jewish</option>
              <option value="Cultural Jewish">Cultural Jewish</option>
              <option value="Kabbalistic">Kabbalistic</option>
              <option value="Jewish Renewal">Jewish Renewal</option>
            </optgroup>

            <optgroup label="─── Hinduism ───">
              <option value="Hindu">Hindu (general)</option>
              <option value="Vaishnavism">Vaishnavism</option>
              <option value="Shaivism">Shaivism</option>
              <option value="Shaktism">Shaktism</option>
              <option value="Smartism">Smartism</option>
              <option value="ISKCON (Hare Krishna)">ISKCON (Hare Krishna)</option>
              <option value="Arya Samaj">Arya Samaj</option>
              <option value="Brahmo Samaj">Brahmo Samaj</option>
              <option value="Swaminarayan">Swaminarayan</option>
              <option value="Lingayat">Lingayat</option>
              <option value="Cultural Hindu">Cultural Hindu (non-practicing)</option>
            </optgroup>

            <optgroup label="─── Buddhism ───">
              <option value="Buddhist">Buddhist (general)</option>
              <option value="Theravada">Theravada</option>
              <option value="Mahayana">Mahayana</option>
              <option value="Zen">Zen</option>
              <option value="Tibetan Buddhist">Tibetan Buddhist</option>
              <option value="Vajrayana">Vajrayana</option>
              <option value="Pure Land">Pure Land</option>
              <option value="Nichiren">Nichiren</option>
              <option value="Soka Gakkai">Soka Gakkai</option>
              <option value="Chan">Chan</option>
              <option value="Secular Buddhist">Secular Buddhist</option>
              <option value="Western Buddhist">Western Buddhist</option>
              <option value="Engaged Buddhist">Engaged Buddhist</option>
            </optgroup>

            <optgroup label="─── East Asian Religions ───">
              <option value="Confucian">Confucian</option>
              <option value="Neo-Confucian">Neo-Confucian</option>
              <option value="Taoist/Daoist">Taoist/Daoist</option>
              <option value="Shinto">Shinto</option>
              <option value="Chinese Folk Religion">Chinese Folk Religion</option>
              <option value="Korean Shamanism">Korean Shamanism (Muism)</option>
              <option value="Caodaism">Caodaism</option>
              <option value="Tenrikyo">Tenrikyo</option>
              <option value="Seicho-no-Ie">Seicho-no-Ie</option>
              <option value="Falun Gong">Falun Gong</option>
            </optgroup>

            <optgroup label="─── South Asian Religions ───">
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain</option>
              <option value="Jain Digambara">Jain Digambara</option>
              <option value="Jain Svetambara">Jain Svetambara</option>
              <option value="Zoroastrian/Parsi">Zoroastrian/Parsi</option>
              <option value="Baháʼí">Baháʼí</option>
              <option value="Ayyavazhi">Ayyavazhi</option>
            </optgroup>

            <optgroup label="─── Indigenous & Traditional African ───">
              <option value="African Traditional">African Traditional Religion</option>
              <option value="Yoruba/Ifá">Yoruba/Ifá</option>
              <option value="Vodou/Voodoo">Vodou/Voodoo</option>
              <option value="Haitian Vodou">Haitian Vodou</option>
              <option value="Louisiana Voodoo">Louisiana Voodoo</option>
              <option value="Santería">Santería</option>
              <option value="Candomblé">Candomblé</option>
              <option value="Umbanda">Umbanda</option>
              <option value="Quimbanda">Quimbanda</option>
              <option value="Obeah">Obeah</option>
              <option value="Akan Religion">Akan Religion</option>
              <option value="Zulu Traditional">Zulu Traditional</option>
            </optgroup>

            <optgroup label="─── Indigenous Americas ───">
              <option value="Native American Spirituality">Native American Spirituality</option>
              <option value="Lakota Spirituality">Lakota Spirituality</option>
              <option value="Navajo Spirituality">Navajo Spirituality</option>
              <option value="Hopi Spirituality">Hopi Spirituality</option>
              <option value="Native American Church">Native American Church</option>
              <option value="Mesoamerican Traditional">Mesoamerican Traditional</option>
              <option value="Mayan Spirituality">Mayan Spirituality</option>
              <option value="Aztec/Mexica">Aztec/Mexica</option>
              <option value="Andean Spirituality">Andean Spirituality</option>
              <option value="Amazonian Shamanism">Amazonian Shamanism</option>
              <option value="Inuit Spirituality">Inuit Spirituality</option>
            </optgroup>

            <optgroup label="─── Indigenous Oceania & Asia ───">
              <option value="Hawaiian Traditional">Hawaiian Traditional</option>
              <option value="Māori Spirituality">Māori Spirituality</option>
              <option value="Aboriginal Australian">Aboriginal Australian Spirituality</option>
              <option value="Polynesian Traditional">Polynesian Traditional</option>
              <option value="Melanesian Traditional">Melanesian Traditional</option>
              <option value="Siberian Shamanism">Siberian Shamanism</option>
              <option value="Mongolian Shamanism">Mongolian Shamanism (Tengerism)</option>
            </optgroup>

            <optgroup label="─── Pagan & Earth-Based ───">
              <option value="Pagan">Pagan (general)</option>
              <option value="Neo-Pagan">Neo-Pagan</option>
              <option value="Wicca">Wicca</option>
              <option value="Wiccan (Gardnerian)">Wiccan (Gardnerian)</option>
              <option value="Wiccan (Alexandrian)">Wiccan (Alexandrian)</option>
              <option value="Druidism">Druidism</option>
              <option value="Celtic Paganism">Celtic Paganism</option>
              <option value="Heathenry/Ásatrú">Heathenry/Ásatrú</option>
              <option value="Norse Paganism">Norse Paganism</option>
              <option value="Slavic Paganism">Slavic Paganism (Rodnovery)</option>
              <option value="Hellenic Polytheism">Hellenic Polytheism</option>
              <option value="Roman Polytheism">Roman Polytheism</option>
              <option value="Kemetism">Kemetism (Egyptian)</option>
              <option value="Animism">Animism</option>
              <option value="Shamanism">Shamanism (general)</option>
              <option value="Witchcraft">Witchcraft</option>
              <option value="Eclectic Pagan">Eclectic Pagan</option>
            </optgroup>

            <optgroup label="─── New Religious Movements ───">
              <option value="Scientology">Scientology</option>
              <option value="Rastafari">Rastafari</option>
              <option value="Unitarian Universalist">Unitarian Universalist</option>
              <option value="New Age">New Age</option>
              <option value="New Thought">New Thought</option>
              <option value="Spiritualist">Spiritualist</option>
              <option value="Theosophy">Theosophy</option>
              <option value="Anthroposophy">Anthroposophy</option>
              <option value="Eckankar">Eckankar</option>
              <option value="Raëlism">Raëlism</option>
              <option value="Discordianism">Discordianism</option>
              <option value="Satanism (LaVeyan)">Satanism (LaVeyan)</option>
              <option value="Satanism (Theistic)">Satanism (Theistic)</option>
              <option value="The Satanic Temple">The Satanic Temple</option>
              <option value="Thelema">Thelema</option>
            </optgroup>

            <optgroup label="─── Philosophical / Non-Religious ───">
              <option value="Agnostic">Agnostic</option>
              <option value="Atheist">Atheist</option>
              <option value="Secular Humanist">Secular Humanist</option>
              <option value="Deist">Deist</option>
              <option value="Pantheist">Pantheist</option>
              <option value="Panentheist">Panentheist</option>
              <option value="Spiritual but not religious">Spiritual but not religious (SBNR)</option>
              <option value="Anti-theist">Anti-theist</option>
              <option value="Apatheist">Apatheist</option>
              <option value="Ignostic">Ignostic</option>
              <option value="Freethinking">Freethinking</option>
              <option value="Rationalist">Rationalist</option>
              <option value="Existentialist">Existentialist</option>
              <option value="Nihilist">Nihilist</option>
              <option value="Absurdist">Absurdist</option>
              <option value="Stoic">Stoic</option>
              <option value="Epicurean">Epicurean</option>
            </optgroup>

            <optgroup label="─── Syncretic & Mixed ───">
              <option value="Syncretic">Syncretic (mixed traditions)</option>
              <option value="Interfaith">Interfaith</option>
              <option value="Omnist">Omnist (all religions have truth)</option>
              <option value="Perennialism">Perennialism</option>
              <option value="Spiritual Seeker">Spiritual Seeker</option>
              <option value="Questioning/Exploring">Questioning/Exploring</option>
              <option value="Dual Faith">Dual Faith</option>
            </optgroup>

            <optgroup label="─── Relationship to Religion ───">
              <option value="Devout/Practicing">Devout/Practicing</option>
              <option value="Moderate/Casual">Moderate/Casual</option>
              <option value="Cultural/Heritage only">Cultural/Heritage only</option>
              <option value="Lapsed/Former">Lapsed/Former believer</option>
              <option value="Converted">Converted (specify in notes)</option>
              <option value="Deconstructing">Deconstructing</option>
              <option value="Closeted">Closeted (hiding beliefs)</option>
              <option value="Ex-religious">Ex-religious</option>
              <option value="Cult Survivor">Cult Survivor</option>
            </optgroup>

            <optgroup label="─── Other ───">
              <option value="No Religion">No Religion</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Unknown">Unknown</option>
              <option value="Fictional Religion">Fictional Religion</option>
              <option value="Custom">Custom / Self-Described</option>
            </optgroup>
          </select>

          {/* Custom religion input */}
          {['Custom', 'Fictional Religion', 'Syncretic', 'Converted', 'Dual Faith'].includes(data.cultural.religion) && (
            <input
              type="text"
              value={data.cultural.religionCustom || ''}
              onChange={(e) => update('cultural', 'religionCustom', e.target.value)}
              placeholder={
                data.cultural.religion === 'Fictional Religion' ? "Describe the fictional religion..." :
                data.cultural.religion === 'Syncretic' ? "Which traditions are mixed..." :
                data.cultural.religion === 'Converted' ? "Converted from/to..." :
                data.cultural.religion === 'Dual Faith' ? "Which two faiths..." :
                "Describe your beliefs..."
              }
              className="mt-2 w-full bg-white border-2 border-purple-300 py-2 px-3 font-mono text-sm text-purple-900 placeholder-purple-400 focus:border-purple-500 focus:outline-none"
            />
          )}
        </div>

        <ArchiveSelect label="Social Class of Origin" value={data.cultural.socialClassOrigin} onChange={(e) => update('cultural', 'socialClassOrigin', e.target.value)}
          options={['Poverty', 'Working Class', 'Lower Middle Class', 'Middle Class', 'Upper Middle Class', 'Wealthy', 'Old Money', 'Nobility/Royalty']} />

        {/* Subcultures - Multi-select with categories */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">Subculture(s) / Urban Tribes</label>
            <p className="font-mono text-[9px] text-gray-400 -mt-1">Select all that apply. Click categories to expand.</p>

            {/* Selected subcultures display */}
            {data.cultural.subcultures && data.cultural.subcultures.length > 0 && (
              <div className="flex flex-wrap gap-1 p-2 bg-indigo-50 border border-indigo-200 rounded-sm">
                {(Array.isArray(data.cultural.subcultures) ? data.cultural.subcultures : data.cultural.subcultures.split(',')).filter(s => s.trim()).map((sub, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 font-mono text-[10px] rounded">
                    {sub.trim()}
                    <button
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(data.cultural.subcultures)
                          ? data.cultural.subcultures
                          : data.cultural.subcultures.split(',').filter(s => s.trim());
                        const updated = current.filter(s => s.trim() !== sub.trim());
                        update('cultural', 'subcultures', updated);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 font-bold"
                    >×</button>
                  </span>
                ))}
              </div>
            )}

            {/* Subculture selector */}
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  const current = Array.isArray(data.cultural.subcultures)
                    ? data.cultural.subcultures
                    : (data.cultural.subcultures || '').split(',').filter(s => s.trim());
                  if (!current.includes(e.target.value)) {
                    update('cultural', 'subcultures', [...current, e.target.value]);
                  }
                }
              }}
              className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="">-- Add Subculture --</option>

              <optgroup label="─── Rock & Metal (50s-90s) ───">
                <option value="Rocker (50s-60s)">Rocker (50s-60s)</option>
                <option value="Teddy Boy">Teddy Boy (UK 50s)</option>
                <option value="Greaser">Greaser (50s-60s)</option>
                <option value="Mod">Mod (UK 60s)</option>
                <option value="Hippie">Hippie (60s-70s)</option>
                <option value="Psychedelic">Psychedelic</option>
                <option value="Glam Rock">Glam Rock (70s)</option>
                <option value="Hard Rock">Hard Rock</option>
                <option value="Classic Rock">Classic Rock</option>
                <option value="Southern Rock">Southern Rock</option>
                <option value="Progressive Rock">Progressive Rock</option>
                <option value="Arena Rock">Arena Rock</option>
                <option value="Hair Metal">Hair Metal (80s)</option>
                <option value="Metalhead">Metalhead</option>
                <option value="Thrasher">Thrasher</option>
                <option value="Death Metal">Death Metal</option>
                <option value="Black Metal">Black Metal</option>
                <option value="Doom Metal">Doom Metal</option>
                <option value="Power Metal">Power Metal</option>
                <option value="Nu Metal">Nu Metal (90s-00s)</option>
                <option value="Grunge">Grunge (90s)</option>
                <option value="Seattle Sound">Seattle Sound</option>
                <option value="Post-Grunge">Post-Grunge</option>
                <option value="Stoner Rock">Stoner Rock</option>
              </optgroup>

              <optgroup label="─── Punk & Post-Punk ───">
                <option value="Punk">Punk (general)</option>
                <option value="UK Punk 77">UK Punk (77)</option>
                <option value="US Hardcore Punk">US Hardcore Punk</option>
                <option value="Anarcho-Punk">Anarcho-Punk</option>
                <option value="Crust Punk">Crust Punk</option>
                <option value="Street Punk">Street Punk</option>
                <option value="Oi!">Oi!</option>
                <option value="Pop Punk">Pop Punk</option>
                <option value="Skate Punk">Skate Punk</option>
                <option value="Post-Punk">Post-Punk</option>
                <option value="Deathrock">Deathrock</option>
                <option value="Horror Punk">Horror Punk</option>
                <option value="Queercore">Queercore</option>
                <option value="Riot Grrrl">Riot Grrrl</option>
                <option value="Straight Edge">Straight Edge</option>
              </optgroup>

              <optgroup label="─── Goth & Dark ───">
                <option value="Goth">Goth (general)</option>
                <option value="Trad Goth">Trad Goth (80s)</option>
                <option value="Romantic Goth">Romantic Goth</option>
                <option value="Victorian Goth">Victorian Goth</option>
                <option value="Cyber Goth">Cyber Goth</option>
                <option value="Industrial Goth">Industrial Goth</option>
                <option value="Pastel Goth">Pastel Goth</option>
                <option value="Nu Goth">Nu Goth</option>
                <option value="Gothabilly">Gothabilly</option>
                <option value="Batcaver">Batcaver</option>
                <option value="Darkwave">Darkwave</option>
                <option value="Ethereal/Dreampop">Ethereal/Dreampop</option>
              </optgroup>

              <optgroup label="─── Alternative & Indie (90s-00s) ───">
                <option value="Alternative">Alternative</option>
                <option value="Indie">Indie</option>
                <option value="Indie Rock">Indie Rock</option>
                <option value="Indie Pop">Indie Pop</option>
                <option value="Britpop">Britpop (90s UK)</option>
                <option value="Shoegaze">Shoegaze</option>
                <option value="Dream Pop">Dream Pop</option>
                <option value="College Rock">College Rock</option>
                <option value="Slacker">Slacker</option>
              </optgroup>

              <optgroup label="─── Emo & Scene (00s) ───">
                <option value="Emo">Emo</option>
                <option value="Emo (90s Midwest)">Emo (90s Midwest)</option>
                <option value="Emo (00s)">Emo (00s Mainstream)</option>
                <option value="Scene Kid">Scene Kid</option>
                <option value="Screamo">Screamo</option>
                <option value="Post-Hardcore">Post-Hardcore</option>
                <option value="Metalcore">Metalcore</option>
                <option value="Myspace Era">Myspace Era</option>
              </optgroup>

              <optgroup label="─── Ska & Reggae ───">
                <option value="Ska">Ska</option>
                <option value="Rude Boy/Rude Girl">Rude Boy/Rude Girl</option>
                <option value="Two Tone">Two Tone (UK)</option>
                <option value="Ska Punk">Ska Punk</option>
                <option value="Reggae">Reggae</option>
                <option value="Rastafari">Rastafari</option>
                <option value="Dub">Dub</option>
                <option value="Dancehall">Dancehall</option>
              </optgroup>

              <optgroup label="─── Skinhead & Oi! ───">
                <option value="Skinhead (Original 69)">Skinhead (Original 69)</option>
                <option value="Trojan Skinhead">Trojan Skinhead</option>
                <option value="SHARP">SHARP (Anti-racist Skinhead)</option>
                <option value="RASH">RASH (Red/Anarchist Skinhead)</option>
                <option value="Skinhead (Controversial)">Skinhead (Controversial/Political)</option>
                <option value="Skinbyrd">Skinbyrd (Female)</option>
              </optgroup>

              <optgroup label="─── Rockabilly & Retro ───">
                <option value="Rockabilly">Rockabilly</option>
                <option value="Psychobilly">Psychobilly</option>
                <option value="Pin-Up">Pin-Up</option>
                <option value="Vintage/Retro">Vintage/Retro</option>
                <option value="Swing/Lindy Hop">Swing/Lindy Hop</option>
                <option value="Zoot Suit">Zoot Suit</option>
                <option value="50s Revival">50s Revival</option>
              </optgroup>

              <optgroup label="─── Electronic & Rave ───">
                <option value="Raver">Raver</option>
                <option value="Acid House">Acid House (80s-90s)</option>
                <option value="Techno">Techno</option>
                <option value="House">House</option>
                <option value="Trance">Trance</option>
                <option value="Drum & Bass">Drum & Bass / Jungle</option>
                <option value="Dubstep">Dubstep</option>
                <option value="EDM">EDM</option>
                <option value="Hardstyle">Hardstyle</option>
                <option value="Gabber">Gabber</option>
                <option value="Happy Hardcore">Happy Hardcore</option>
                <option value="UK Garage">UK Garage</option>
                <option value="2-Step">2-Step</option>
                <option value="Bassline">Bassline</option>
                <option value="Plur">PLUR</option>
                <option value="Kandi Kid">Kandi Kid</option>
              </optgroup>

              <optgroup label="─── Industrial & EBM ───">
                <option value="Industrial">Industrial</option>
                <option value="Rivethead">Rivethead</option>
                <option value="EBM">EBM</option>
                <option value="Aggrotech">Aggrotech</option>
                <option value="Dark Electro">Dark Electro</option>
                <option value="Futurepop">Futurepop</option>
                <option value="Power Electronics">Power Electronics</option>
                <option value="Noise">Noise</option>
              </optgroup>

              <optgroup label="─── Synth & Retro Electronic ───">
                <option value="Synthwave">Synthwave</option>
                <option value="Retrowave">Retrowave</option>
                <option value="Outrun">Outrun</option>
                <option value="Darksynth">Darksynth</option>
                <option value="Vaporwave">Vaporwave</option>
                <option value="Future Funk">Future Funk</option>
                <option value="Chillwave">Chillwave</option>
                <option value="Hyperpop">Hyperpop</option>
                <option value="PC Music">PC Music</option>
              </optgroup>

              <optgroup label="─── Hip-Hop & Rap ───">
                <option value="Hip-Hop Head">Hip-Hop Head</option>
                <option value="B-Boy/B-Girl">B-Boy/B-Girl</option>
                <option value="MC/Rapper">MC/Rapper</option>
                <option value="DJ Culture">DJ Culture</option>
                <option value="Graffiti Writer">Graffiti Writer</option>
                <option value="Old School Hip-Hop">Old School Hip-Hop (70s-80s)</option>
                <option value="Golden Age Hip-Hop">Golden Age Hip-Hop (80s-90s)</option>
                <option value="Gangsta Rap">Gangsta Rap (90s)</option>
                <option value="Conscious Hip-Hop">Conscious Hip-Hop</option>
                <option value="Underground Hip-Hop">Underground Hip-Hop</option>
                <option value="Backpacker">Backpacker</option>
                <option value="Trap">Trap</option>
                <option value="Drill">Drill</option>
                <option value="UK Drill">UK Drill</option>
                <option value="Chicago Drill">Chicago Drill</option>
                <option value="Mumble Rap">Mumble Rap</option>
                <option value="Emo Rap">Emo Rap/SoundCloud Rap</option>
                <option value="Cloud Rap">Cloud Rap</option>
              </optgroup>

              <optgroup label="─── UK Urban ───">
                <option value="Grime">Grime</option>
                <option value="UK Garage Scene">UK Garage Scene</option>
                <option value="Roadman">Roadman</option>
                <option value="Mandem">Mandem</option>
                <option value="Chav">Chav (controversial)</option>
                <option value="Essex">Essex</option>
                <option value="Casual (Football)">Casual (80s Football)</option>
              </optgroup>

              <optgroup label="─── Streetwear & Urban Fashion ───">
                <option value="Streetwear">Streetwear</option>
                <option value="Sneakerhead">Sneakerhead</option>
                <option value="Hypebeast">Hypebeast</option>
                <option value="Techwear">Techwear</option>
                <option value="Gorpcore">Gorpcore</option>
                <option value="Athleisure">Athleisure</option>
              </optgroup>

              <optgroup label="─── Latin American ───">
                <option value="Cholo/Chola">Cholo/Chola</option>
                <option value="Pachuco/Pachuca">Pachuco/Pachuca (40s-50s)</option>
                <option value="Chicano">Chicano</option>
                <option value="Lowrider">Lowrider</option>
                <option value="Reggaetonero">Reggaetonero</option>
                <option value="Perreo">Perreo</option>
                <option value="Cumbia/Cumbiero">Cumbia/Cumbiero</option>
                <option value="Flaite">Flaite (Chile)</option>
                <option value="Cuma">Cuma (Chile)</option>
                <option value="Plancha">Plancha (Argentina)</option>
                <option value="Villero">Villero (Argentina)</option>
                <option value="Naco">Naco (Mexico)</option>
                <option value="Reggaeton Latino">Reggaeton Latino</option>
              </optgroup>

              <optgroup label="─── Brazilian ───">
                <option value="Funkeiro">Funkeiro</option>
                <option value="Baile Funk">Baile Funk</option>
                <option value="Pagodeiro">Pagodeiro</option>
                <option value="Sertanejo">Sertanejo</option>
                <option value="Forrozeiro">Forrozeiro</option>
                <option value="Roqueiro BR">Roqueiro BR</option>
                <option value="Metaleiro BR">Metaleiro BR</option>
                <option value="Punk BR">Punk BR</option>
                <option value="Emo BR">Emo BR</option>
                <option value="Clubber BR">Clubber BR</option>
                <option value="Skatista BR">Skatista BR</option>
                <option value="Surfista BR">Surfista BR</option>
                <option value="Hippie BR">Hippie BR</option>
                <option value="Alternativo BR">Alternativo BR</option>
                <option value="Malandro">Malandro</option>
                <option value="Favelado">Favelado</option>
                <option value="Trapper BR">Trapper BR</option>
                <option value="K-Popper BR">K-Popper BR</option>
              </optgroup>

              <optgroup label="─── Japanese ───">
                <option value="Otaku">Otaku</option>
                <option value="Visual Kei">Visual Kei</option>
                <option value="Lolita">Lolita (Fashion)</option>
                <option value="Gothic Lolita">Gothic Lolita</option>
                <option value="Sweet Lolita">Sweet Lolita</option>
                <option value="Classic Lolita">Classic Lolita</option>
                <option value="Harajuku">Harajuku</option>
                <option value="Decora">Decora</option>
                <option value="Fairy Kei">Fairy Kei</option>
                <option value="Gyaru/Gal">Gyaru/Gal</option>
                <option value="Ganguro">Ganguro</option>
                <option value="Kogal">Kogal</option>
                <option value="Mamba">Mamba</option>
                <option value="Bosozoku">Bosozoku</option>
                <option value="Yankii">Yankii</option>
                <option value="Sukeban">Sukeban</option>
                <option value="J-Rock">J-Rock</option>
              </optgroup>

              <optgroup label="─── Korean ───">
                <option value="K-Pop Fan/Stan">K-Pop Fan/Stan</option>
                <option value="K-Pop Idol Trainee">K-Pop Idol Trainee</option>
                <option value="Korean Indie">Korean Indie</option>
                <option value="K-Rock">K-Rock</option>
                <option value="K-Hip-Hop">K-Hip-Hop</option>
                <option value="Hallyu Fan">Hallyu Fan</option>
                <option value="Ulzzang">Ulzzang</option>
                <option value="Korean Street Fashion">Korean Street Fashion</option>
              </optgroup>

              <optgroup label="─── Anime/Manga/Cosplay ───">
                <option value="Anime Fan">Anime Fan</option>
                <option value="Manga Reader">Manga Reader</option>
                <option value="Weeaboo">Weeaboo</option>
                <option value="Koreaboo">Koreaboo</option>
                <option value="Cosplayer">Cosplayer</option>
                <option value="Idol Fan">Idol Fan</option>
                <option value="VTuber Fan">VTuber Fan</option>
                <option value="Figure Collector">Figure Collector</option>
                <option value="Doujin">Doujin</option>
              </optgroup>

              <optgroup label="─── Gaming & Internet ───">
                <option value="Gamer">Gamer (general)</option>
                <option value="PC Gamer">PC Gamer</option>
                <option value="Console Gamer">Console Gamer</option>
                <option value="Retro Gamer">Retro Gamer</option>
                <option value="Esports">Esports</option>
                <option value="Speedrunner">Speedrunner</option>
                <option value="Streamer">Streamer/Content Creator</option>
                <option value="YouTuber">YouTuber</option>
                <option value="TikToker">TikToker</option>
                <option value="Influencer">Influencer</option>
                <option value="Discord Community">Discord Community</option>
                <option value="Reddit Community">Reddit Community</option>
                <option value="4chan/Anonymous">4chan/Anonymous</option>
                <option value="Meme Culture">Meme Culture</option>
                <option value="Crypto Bro">Crypto Bro</option>
                <option value="NFT Community">NFT Community</option>
                <option value="Tech Bro">Tech Bro</option>
                <option value="Hacker/Hacktivist">Hacker/Hacktivist</option>
                <option value="Cyberpunk (lifestyle)">Cyberpunk (lifestyle)</option>
              </optgroup>

              <optgroup label="─── Tabletop & RPG ───">
                <option value="LARPer">LARPer</option>
                <option value="Tabletop Gamer">Tabletop Gamer</option>
                <option value="D&D/RPG Community">D&D/RPG Community</option>
                <option value="Board Gamer">Board Gamer</option>
                <option value="Wargamer">Wargamer</option>
                <option value="TCG Player">TCG Player (Magic, Pokemon, etc.)</option>
              </optgroup>

              <optgroup label="─── Furry & Fandom ───">
                <option value="Furry">Furry</option>
                <option value="Brony">Brony/Pegasister</option>
                <option value="Trekkie">Trekkie (Star Trek)</option>
                <option value="Star Wars Fan">Star Wars Fan</option>
                <option value="Whovian">Whovian (Doctor Who)</option>
                <option value="Potterhead">Potterhead (Harry Potter)</option>
                <option value="Tolkien Fan">Tolkien Fan</option>
                <option value="Marvel Fan">Marvel Fan</option>
                <option value="DC Fan">DC Fan</option>
                <option value="Disney Adult">Disney Adult</option>
                <option value="Horror Fan">Horror Fan</option>
                <option value="Sci-Fi Fan">Sci-Fi Fan</option>
                <option value="Fantasy Fan">Fantasy Fan</option>
              </optgroup>

              <optgroup label="─── Internet Aesthetics (2010s-20s) ───">
                <option value="E-Girl/E-Boy">E-Girl/E-Boy</option>
                <option value="Soft Girl/Soft Boy">Soft Girl/Soft Boy</option>
                <option value="VSCO Girl">VSCO Girl</option>
                <option value="Art Hoe">Art Hoe</option>
                <option value="Dark Academia">Dark Academia</option>
                <option value="Light Academia">Light Academia</option>
                <option value="Cottagecore">Cottagecore</option>
                <option value="Goblincore">Goblincore</option>
                <option value="Fairycore">Fairycore</option>
                <option value="Witchcore">Witchcore</option>
                <option value="Royalcore">Royalcore</option>
                <option value="Coquette">Coquette</option>
                <option value="Balletcore">Balletcore</option>
                <option value="Barbiecore">Barbiecore</option>
                <option value="Coastal Grandmother">Coastal Grandmother</option>
                <option value="Clean Girl">Clean Girl</option>
                <option value="That Girl">That Girl</option>
                <option value="Old Money Aesthetic">Old Money Aesthetic</option>
                <option value="Quiet Luxury">Quiet Luxury</option>
                <option value="Mob Wife">Mob Wife Aesthetic</option>
                <option value="Normcore">Normcore</option>
                <option value="Gorpcore">Gorpcore</option>
                <option value="Blokecore">Blokecore</option>
              </optgroup>

              <optgroup label="─── Fashion-Based ───">
                <option value="Hipster">Hipster</option>
                <option value="Boho/Bohemian">Boho/Bohemian</option>
                <option value="Prep/Preppy">Prep/Preppy</option>
                <option value="Ivy League">Ivy League</option>
                <option value="Minimalist Fashion">Minimalist Fashion</option>
                <option value="Maximalist">Maximalist</option>
                <option value="Avant-Garde Fashion">Avant-Garde Fashion</option>
                <option value="High Fashion">High Fashion</option>
                <option value="Vintage">Vintage</option>
                <option value="Thrift/Secondhand">Thrift/Secondhand</option>
                <option value="Sustainable Fashion">Sustainable Fashion</option>
              </optgroup>

              <optgroup label="─── Sports & Action ───">
                <option value="Skater/Skateboarder">Skater/Skateboarder</option>
                <option value="Surfer">Surfer</option>
                <option value="BMXer">BMXer</option>
                <option value="Snowboarder">Snowboarder</option>
                <option value="Parkour/Freerunner">Parkour/Freerunner</option>
                <option value="Bodybuilder">Bodybuilder</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Gym Bro/Gym Rat">Gym Bro/Gym Rat</option>
                <option value="Runner">Runner</option>
                <option value="Cyclist">Cyclist</option>
                <option value="Climber">Climber</option>
                <option value="Martial Artist">Martial Artist</option>
                <option value="MMA Community">MMA Community</option>
                <option value="Yogi">Yogi</option>
              </optgroup>

              <optgroup label="─── Sports Fans ───">
                <option value="Football/Soccer Fan">Football/Soccer Fan</option>
                <option value="Ultras">Ultras</option>
                <option value="Hooligan">Hooligan</option>
                <option value="NFL Fan">NFL Fan</option>
                <option value="NBA Fan">NBA Fan</option>
                <option value="Baseball Fan">Baseball Fan</option>
                <option value="Hockey Fan">Hockey Fan</option>
                <option value="Wrestling Fan">Wrestling Fan</option>
                <option value="F1/Motorsport Fan">F1/Motorsport Fan</option>
                <option value="Torcedor BR">Torcedor BR</option>
              </optgroup>

              <optgroup label="─── Art & Creative ───">
                <option value="Street Artist">Street Artist</option>
                <option value="Fine Artist">Fine Artist</option>
                <option value="Tattoo Culture">Tattoo Culture</option>
                <option value="Body Modification">Body Modification</option>
                <option value="DIY/Maker">DIY/Maker</option>
                <option value="Zine Culture">Zine Culture</option>
                <option value="Underground Comics">Underground Comics</option>
                <option value="Art Collective">Art Collective</option>
                <option value="Performance Art">Performance Art</option>
                <option value="Beatnik">Beatnik</option>
                <option value="Jazz Scene">Jazz Scene</option>
                <option value="Blues Scene">Blues Scene</option>
                <option value="Folk Scene">Folk Scene</option>
                <option value="Spoken Word/Poetry">Spoken Word/Poetry Slam</option>
                <option value="Theater Kid">Theater Kid</option>
                <option value="Band Kid">Band Kid</option>
                <option value="Film Buff/Cinephile">Film Buff/Cinephile</option>
              </optgroup>

              <optgroup label="─── LGBTQ+ ───">
                <option value="Ball Culture">Ball Culture</option>
                <option value="Drag Culture">Drag Culture</option>
                <option value="Leather Community">Leather Community</option>
                <option value="Bear Community">Bear Community</option>
                <option value="Twink Culture">Twink Culture</option>
                <option value="Butch/Femme">Butch/Femme</option>
                <option value="Dyke Culture">Dyke Culture</option>
                <option value="Circuit Party">Circuit Party</option>
                <option value="Pride Community">Pride Community</option>
                <option value="Chosen Family">Chosen Family</option>
              </optgroup>

              <optgroup label="─── Spiritual & Alternative ───">
                <option value="New Age">New Age</option>
                <option value="Crystal/Healing">Crystal/Healing</option>
                <option value="Astrology Community">Astrology Community</option>
                <option value="Tarot Community">Tarot Community</option>
                <option value="Witchy/Witch Aesthetic">Witchy/Witch Aesthetic</option>
                <option value="Pagan Community">Pagan Community</option>
                <option value="Occult">Occult</option>
                <option value="Psychonaut">Psychonaut</option>
                <option value="Festival Culture">Festival Culture</option>
                <option value="Burner">Burner (Burning Man)</option>
                <option value="Rainbow Gathering">Rainbow Gathering</option>
                <option value="Deadhead">Deadhead</option>
                <option value="Phish Head">Phish Head</option>
                <option value="Jam Band Scene">Jam Band Scene</option>
              </optgroup>

              <optgroup label="─── Lifestyle ───">
                <option value="Hippie/Neo-Hippie">Hippie/Neo-Hippie</option>
                <option value="Activist/Militant">Activist/Militant</option>
                <option value="Environmentalist">Environmentalist</option>
                <option value="Vegan/Plant-Based">Vegan/Plant-Based</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Digital Nomad">Digital Nomad</option>
                <option value="Van Life">Van Life</option>
                <option value="Tiny House">Tiny House</option>
                <option value="Homesteader">Homesteader</option>
                <option value="Prepper/Survivalist">Prepper/Survivalist</option>
                <option value="Off-Grid">Off-Grid</option>
                <option value="Commune Living">Commune Living</option>
                <option value="FIRE Movement">FIRE Movement</option>
                <option value="Biohacker">Biohacker</option>
                <option value="Transhumanist">Transhumanist</option>
                <option value="Quantified Self">Quantified Self</option>
              </optgroup>

              <optgroup label="─── Historical Recreation ───">
                <option value="Steampunk">Steampunk</option>
                <option value="Dieselpunk">Dieselpunk</option>
                <option value="Atompunk">Atompunk</option>
                <option value="Cyberpunk">Cyberpunk</option>
                <option value="Solarpunk">Solarpunk</option>
                <option value="Medieval Recreation">Medieval Recreation</option>
                <option value="Historical Reenactor">Historical Reenactor</option>
                <option value="Renaissance Faire">Renaissance Faire</option>
                <option value="SCA">SCA</option>
                <option value="Civil War Reenactor">Civil War Reenactor</option>
                <option value="Viking Reenactor">Viking Reenactor</option>
              </optgroup>

              <optgroup label="─── Academic & Intellectual ───">
                <option value="Nerd">Nerd</option>
                <option value="Geek">Geek</option>
                <option value="Bookworm">Bookworm</option>
                <option value="Academic">Academic</option>
                <option value="Intellectual">Intellectual</option>
                <option value="STEM Culture">STEM Culture</option>
                <option value="Humanities">Humanities</option>
                <option value="Philosophy Bro">Philosophy Bro</option>
                <option value="Literature Snob">Literature Snob</option>
              </optgroup>

              <optgroup label="─── Class & Social ───">
                <option value="Old Money">Old Money</option>
                <option value="New Money/Nouveau Riche">New Money/Nouveau Riche</option>
                <option value="Trust Fund">Trust Fund</option>
                <option value="Yuppie">Yuppie (80s)</option>
                <option value="Bobo">Bobo (Bourgeois Bohemian)</option>
                <option value="Basic">Basic</option>
                <option value="Normie">Normie</option>
                <option value="Working Class Pride">Working Class Pride</option>
                <option value="Blue Collar">Blue Collar</option>
                <option value="White Collar">White Collar</option>
                <option value="Creative Class">Creative Class</option>
              </optgroup>

              <optgroup label="─── Conspiracy & Fringe ───">
                <option value="Conspiracy Theorist">Conspiracy Theorist</option>
                <option value="UFO/Alien Community">UFO/Alien Community</option>
                <option value="Paranormal Investigator">Paranormal Investigator</option>
                <option value="Truther">Truther</option>
                <option value="Prepper Community">Prepper Community</option>
              </optgroup>

              <optgroup label="─── Other ───">
                <option value="Mainstream">Mainstream/No Specific Subculture</option>
                <option value="Anti-Subculture">Anti-Subculture</option>
                <option value="Multiple/Mixed">Multiple/Mixed</option>
                <option value="Custom">Custom / Other</option>
              </optgroup>
            </select>

            {/* Custom subculture input */}
            {Array.isArray(data.cultural.subcultures) && data.cultural.subcultures.includes('Custom') && (
              <input
                type="text"
                value={data.cultural.subculturesCustom || ''}
                onChange={(e) => update('cultural', 'subculturesCustom', e.target.value)}
                placeholder="Describe other subcultures..."
                className="mt-2 w-full bg-white border-2 border-indigo-300 py-2 px-3 font-mono text-sm text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


export default IdentityContent;
