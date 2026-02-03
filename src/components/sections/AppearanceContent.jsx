import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const AppearanceContent = ({ data, updateData, subtab, characterAge, characterGender }) => {
  const update = (section, field, value) => {
    updateData('appearance', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // Parse age for conditional rendering
  const age = parseInt(characterAge) || 0;
  const isAdult = age >= 18;
  const isMinor = age > 0 && age < 18;

  // Determine gender category for body options
  const gender = (characterGender || '').toLowerCase();
  const isMale = ['male', 'man', 'masculine', 'trans man', 'trans male', 'ftm'].some(g => gender.includes(g));
  const isFemale = ['female', 'woman', 'feminine', 'trans woman', 'trans female', 'mtf'].some(g => gender.includes(g));
  const isNonBinary = !isMale && !isFemale && gender !== '';

  const FaceSelect = ({ label, value, onChange, options, placeholder = "-- Select --" }) => (
    <div className="mb-3">
      <label className="font-mono text-[10px] text-gray-600 mb-1 block">{label}</label>
      <select value={value || ''} onChange={onChange} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs focus:border-teal-400 focus:outline-none">
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  const FaceInput = ({ label, value, onChange, placeholder }) => (
    <div className="mb-3">
      <label className="font-mono text-[10px] text-gray-600 mb-1 block">{label}</label>
      <input type="text" value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs focus:border-teal-400 focus:outline-none" />
    </div>
  );

  const skinToneOptions = [
    { value: 'porcelain', label: 'Porcelain — Very fair, almost translucent' },
    { value: 'ivory', label: 'Ivory — Fair with slight yellow undertone' },
    { value: 'fair', label: 'Fair — Typical light skin' },
    { value: 'light', label: 'Light — Fair with some color' },
    { value: 'light-medium', label: 'Light-Medium — Transition tone' },
    { value: 'medium', label: 'Medium — Balanced medium tone' },
    { value: 'olive-light', label: 'Light Olive — Light greenish tone' },
    { value: 'olive', label: 'Olive — Medium greenish tone' },
    { value: 'tan', label: 'Tan — Warm golden' },
    { value: 'caramel', label: 'Caramel — Light golden brown' },
    { value: 'honey', label: 'Honey — Rich golden' },
    { value: 'brown', label: 'Brown — Classic brown tone' },
    { value: 'dark-brown', label: 'Dark Brown — Deep brown' },
    { value: 'espresso', label: 'Espresso — Rich dark brown' },
    { value: 'ebony', label: 'Ebony — Very dark' },
    { value: 'deep', label: 'Deep — Intense black' }
  ];

  const skinUndertoneOptions = [
    { value: 'cool-pink', label: 'Cool — Pink/Rosy' },
    { value: 'cool-blue', label: 'Cool — Bluish/Violet' },
    { value: 'neutral', label: 'Neutral — Balance of warm and cool' },
    { value: 'warm-yellow', label: 'Warm — Yellow' },
    { value: 'warm-golden', label: 'Warm — Golden' },
    { value: 'warm-peach', label: 'Warm — Peach' },
    { value: 'olive', label: 'Olive — Green-yellow' }
  ];

  const sections = {
    0: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-rose-900 mb-2">FACE — Complete Detail</h3>
          <p className="font-mono text-xs text-rose-700">Define every aspect of the character's face for precise visual description.</p>
        </div>

        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-4">Face Shape</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Overall Shape" value={data.face?.faceShape} onChange={(e) => update('face', 'faceShape', e.target.value)}
              options={[
                { value: 'oval', label: 'Oval — Balanced, slightly wider forehead' },
                { value: 'round', label: 'Round — Full cheeks, no defined angles' },
                { value: 'square', label: 'Square — Strong jaw, wide forehead' },
                { value: 'heart', label: 'Heart — Wide forehead, pointed chin' },
                { value: 'diamond', label: 'Diamond — Wide cheekbones, narrow forehead/chin' },
                { value: 'oblong', label: 'Oblong — Elongated, high forehead' },
                { value: 'triangle', label: 'Triangle — Wide jaw, narrow forehead' }
              ]} />
            <FaceSelect label="Face Length" value={data.face?.faceLength} onChange={(e) => update('face', 'faceLength', e.target.value)}
              options={[
                { value: 'short', label: 'Short — Compact face' },
                { value: 'average', label: 'Average — Standard proportion' },
                { value: 'long', label: 'Long — Elongated' }
              ]} />
            <FaceSelect label="Face Width" value={data.face?.faceWidth} onChange={(e) => update('face', 'faceWidth', e.target.value)}
              options={[
                { value: 'narrow', label: 'Narrow — Thin face' },
                { value: 'average', label: 'Average — Standard width' },
                { value: 'wide', label: 'Wide — Broad face' }
              ]} />
          </div>
        </div>

        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-4">Skin</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Skin Tone" value={data.face?.skinTone} onChange={(e) => update('face', 'skinTone', e.target.value)} options={skinToneOptions} />
            <FaceSelect label="Skin Undertone" value={data.face?.skinUndertone} onChange={(e) => update('face', 'skinUndertone', e.target.value)} options={skinUndertoneOptions} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Skin Texture" value={data.face?.skinTexture} onChange={(e) => update('face', 'skinTexture', e.target.value)}
              options={[
                { value: 'smooth', label: 'Smooth — No visible texture' },
                { value: 'normal', label: 'Normal — Common texture' },
                { value: 'rough', label: 'Rough — Noticeable texture' },
                { value: 'porous', label: 'Porous — Visible pores' },
                { value: 'scarred', label: 'Scarred — Acne scars' },
                { value: 'weathered', label: 'Weathered — Sun/time damage' }
              ]} />
            <FaceSelect label="Skin Condition" value={data.face?.skinCondition} onChange={(e) => update('face', 'skinCondition', e.target.value)}
              options={[
                { value: 'flawless', label: 'Flawless — No imperfections' },
                { value: 'clear', label: 'Clear — Few imperfections' },
                { value: 'normal', label: 'Normal — Occasional imperfections' },
                { value: 'oily', label: 'Oily — Visible shine' },
                { value: 'dry', label: 'Dry — Slight flaking' },
                { value: 'combination', label: 'Combination — Oily T-zone' },
                { value: 'acne-prone', label: 'Acne-Prone — Prone to breakouts' }
              ]} />
          </div>
        </div>

        <div className="border-2 border-yellow-200 rounded-sm p-4 bg-yellow-50/30">
          <h4 className="font-mono text-sm font-bold text-yellow-800 mb-4">Forehead</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Forehead Height" value={data.face?.foreheadHeight} onChange={(e) => update('face', 'foreheadHeight', e.target.value)}
              options={[
                { value: 'low', label: 'Low — Short forehead' },
                { value: 'average', label: 'Average — Normal proportion' },
                { value: 'high', label: 'High — Prominent forehead' }
              ]} />
            <FaceSelect label="Forehead Width" value={data.face?.foreheadWidth} onChange={(e) => update('face', 'foreheadWidth', e.target.value)}
              options={[
                { value: 'narrow', label: 'Narrow — Close temples' },
                { value: 'average', label: 'Average — Normal width' },
                { value: 'wide', label: 'Wide — Distant temples' }
              ]} />
            <FaceSelect label="Forehead Shape" value={data.face?.foreheadShape} onChange={(e) => update('face', 'foreheadShape', e.target.value)}
              options={[
                { value: 'flat', label: 'Flat — No curvature' },
                { value: 'rounded', label: 'Rounded — Soft curve' },
                { value: 'sloped', label: 'Sloped — Recedes backward' },
                { value: 'prominent', label: 'Prominent — Projects forward' }
              ]} />
          </div>
        </div>

        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-4">Eyebrows</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Eyebrow Shape" value={data.face?.eyebrowShape} onChange={(e) => update('face', 'eyebrowShape', e.target.value)}
              options={[
                { value: 'straight', label: 'Straight — Horizontal line' },
                { value: 'soft-angled', label: 'Soft Angled — Slight peak' },
                { value: 'hard-angled', label: 'Hard Angled — Defined peak' },
                { value: 'high-arch', label: 'High Arch — Elevated curve' },
                { value: 'soft-arch', label: 'Soft Arch — Gentle curve' },
                { value: 'curved', label: 'Curved — Continuous arc' },
                { value: 's-shaped', label: 'S-Shaped — Wavy' },
                { value: 'rounded', label: 'Rounded — No angles' }
              ]} />
            <FaceSelect label="Eyebrow Thickness" value={data.face?.eyebrowThickness} onChange={(e) => update('face', 'eyebrowThickness', e.target.value)}
              options={[
                { value: 'very-thin', label: 'Very Thin — Almost invisible' },
                { value: 'thin', label: 'Thin — Delicate' },
                { value: 'medium', label: 'Medium — Normal thickness' },
                { value: 'thick', label: 'Thick — Full' },
                { value: 'very-thick', label: 'Very Thick — Bold' },
                { value: 'bushy', label: 'Bushy — Untrimmed, wild' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Eyebrow Arch" value={data.face?.eyebrowArch} onChange={(e) => update('face', 'eyebrowArch', e.target.value)}
              options={[
                { value: 'no-arch', label: 'No Arch — Completely straight' },
                { value: 'low', label: 'Low Arch — Minimal curve' },
                { value: 'medium', label: 'Medium Arch — Standard curve' },
                { value: 'high', label: 'High Arch — Elevated curve' },
                { value: 'dramatic', label: 'Dramatic Arch — Very pronounced' }
              ]} />
            <FaceSelect label="Eyebrow Color" value={data.face?.eyebrowColor} onChange={(e) => update('face', 'eyebrowColor', e.target.value)}
              options={['Platinum', 'Blonde', 'Light Brown', 'Medium Brown', 'Dark Brown', 'Black', 'Auburn', 'Red', 'Gray', 'White']} />
          </div>
        </div>

        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-4">Eyes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Eye Color" value={data.face?.eyeColor} onChange={(e) => update('face', 'eyeColor', e.target.value)}
              options={[
                { value: 'light-blue', label: 'Light Blue' },
                { value: 'blue', label: 'Blue' },
                { value: 'dark-blue', label: 'Dark Blue' },
                { value: 'light-green', label: 'Light Green' },
                { value: 'green', label: 'Green' },
                { value: 'hazel-green', label: 'Hazel-Green' },
                { value: 'hazel-brown', label: 'Hazel-Brown' },
                { value: 'light-brown', label: 'Light Brown (Honey)' },
                { value: 'medium-brown', label: 'Medium Brown' },
                { value: 'dark-brown', label: 'Dark Brown' },
                { value: 'black', label: 'Black' },
                { value: 'amber', label: 'Amber (Golden)' },
                { value: 'gray', label: 'Gray' },
                { value: 'heterochromia', label: 'Heterochromia — Different colors' }
              ]} />
            <FaceSelect label="Eye Shape" value={data.face?.eyeShape} onChange={(e) => update('face', 'eyeShape', e.target.value)}
              options={[
                { value: 'almond', label: 'Almond — Classic shape' },
                { value: 'round', label: 'Round — Open and circular' },
                { value: 'monolid', label: 'Monolid — No crease' },
                { value: 'hooded', label: 'Hooded — Hidden lid' },
                { value: 'downturned', label: 'Downturned — Outer corners down' },
                { value: 'upturned', label: 'Upturned — Outer corners up' },
                { value: 'deep-set', label: 'Deep-Set — Recessed' },
                { value: 'protruding', label: 'Protruding — Prominent' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Eye Size" value={data.face?.eyeSize} onChange={(e) => update('face', 'eyeSize', e.target.value)}
              options={['Very Small', 'Small', 'Medium', 'Large', 'Very Large']} />
            <FaceSelect label="Eyelashes" value={data.face?.eyeLashes} onChange={(e) => update('face', 'eyeLashes', e.target.value)}
              options={[
                { value: 'sparse', label: 'Sparse — Few lashes' },
                { value: 'short', label: 'Short' },
                { value: 'average', label: 'Average' },
                { value: 'long', label: 'Long' },
                { value: 'very-long', label: 'Very Long' },
                { value: 'thick', label: 'Thick/Dense' }
              ]} />
          </div>
        </div>

        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <h4 className="font-mono text-sm font-bold text-indigo-800 mb-4">Nose</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Nose Type" value={data.face?.noseType} onChange={(e) => update('face', 'noseType', e.target.value)}
              options={[
                { value: 'greek', label: 'Greek — Straight, no curve' },
                { value: 'roman', label: 'Roman — Convex bridge' },
                { value: 'aquiline', label: 'Aquiline — Eagle-like curve' },
                { value: 'button', label: 'Button — Small and rounded' },
                { value: 'snub', label: 'Snub — Upturned tip' },
                { value: 'hawk', label: 'Hawk — High curved bridge' },
                { value: 'nubian', label: 'Nubian — Wide with downward tip' },
                { value: 'bulbous', label: 'Bulbous — Rounded wide tip' },
                { value: 'flat', label: 'Flat — Low bridge' },
                { value: 'crooked', label: 'Crooked — Deviated' }
              ]} />
            <FaceSelect label="Nose Size" value={data.face?.noseSize} onChange={(e) => update('face', 'noseSize', e.target.value)}
              options={['Petite', 'Small', 'Medium', 'Large', 'Prominent']} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Nose Bridge" value={data.face?.noseBridge} onChange={(e) => update('face', 'noseBridge', e.target.value)}
              options={['Low', 'Medium', 'High', 'Bumpy']} />
            <FaceSelect label="Nose Tip" value={data.face?.noseTip} onChange={(e) => update('face', 'noseTip', e.target.value)}
              options={['Pointed', 'Rounded', 'Bulbous', 'Upturned', 'Downturned']} />
            <FaceSelect label="Nostrils" value={data.face?.nostrilSize} onChange={(e) => update('face', 'nostrilSize', e.target.value)}
              options={['Small', 'Medium', 'Wide', 'Flared']} />
          </div>
        </div>

        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-4">Cheeks</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Cheekbone Height" value={data.face?.cheekboneHeight} onChange={(e) => update('face', 'cheekboneHeight', e.target.value)}
              options={['Low', 'Medium', 'High', 'Very High']} />
            <FaceSelect label="Cheekbone Prominence" value={data.face?.cheekboneProminence} onChange={(e) => update('face', 'cheekboneProminence', e.target.value)}
              options={['Flat', 'Subtle', 'Defined', 'Prominent', 'Very Prominent']} />
            <FaceSelect label="Cheek Fullness" value={data.face?.cheekFullness} onChange={(e) => update('face', 'cheekFullness', e.target.value)}
              options={['Hollow', 'Sunken', 'Slim', 'Average', 'Full', 'Chubby']} />
          </div>
        </div>

        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-4">Lips</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Lip Shape" value={data.face?.lipShape} onChange={(e) => update('face', 'lipShape', e.target.value)}
              options={[
                { value: 'heart', label: 'Heart — Defined cupids bow' },
                { value: 'bow', label: 'Bow — Classic bow shape' },
                { value: 'round', label: 'Round — Curved' },
                { value: 'wide', label: 'Wide — Extend horizontally' },
                { value: 'thin', label: 'Thin — Little volume' },
                { value: 'full', label: 'Full — Balanced volume' },
                { value: 'pouty', label: 'Pouty — Projected lower lip' },
                { value: 'downturned', label: 'Downturned — Corners down' },
                { value: 'upturned', label: 'Upturned — Corners up' }
              ]} />
            <FaceSelect label="Lip Thickness" value={data.face?.lipThickness} onChange={(e) => update('face', 'lipThickness', e.target.value)}
              options={[
                { value: 'very-thin', label: 'Very Thin' },
                { value: 'thin', label: 'Thin' },
                { value: 'medium', label: 'Medium' },
                { value: 'full', label: 'Full' },
                { value: 'very-full', label: 'Very Full' },
                { value: 'plump', label: 'Plump' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Upper/Lower Ratio" value={data.face?.lipUpperLower} onChange={(e) => update('face', 'lipUpperLower', e.target.value)}
              options={['Upper Larger', 'Balanced', 'Lower Slightly Larger', 'Lower Much Larger']} />
            <FaceSelect label="Natural Lip Color" value={data.face?.lipColor} onChange={(e) => update('face', 'lipColor', e.target.value)}
              options={['Pale', 'Light Pink', 'Pink', 'Dark Pink', 'Rose', 'Coral', 'Berry', 'Red', 'Brown-Pink', 'Brown']} />
            <FaceSelect label="Cupids Bow" value={data.face?.cupidsBow} onChange={(e) => update('face', 'cupidsBow', e.target.value)}
              options={['Undefined', 'Subtle', 'Moderate', 'Defined', 'Pronounced']} />
          </div>
        </div>

        <div className="border-2 border-slate-200 rounded-sm p-4 bg-slate-50/30">
          <h4 className="font-mono text-sm font-bold text-slate-800 mb-4">Jaw and Chin</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Jawline Shape" value={data.face?.jawlineShape} onChange={(e) => update('face', 'jawlineShape', e.target.value)}
              options={['Square', 'Angular', 'Rounded', 'Soft', 'Tapered', 'V-Shaped', 'Wide', 'Narrow']} />
            <FaceSelect label="Jawline Definition" value={data.face?.jawlineDefinition} onChange={(e) => update('face', 'jawlineDefinition', e.target.value)}
              options={['Undefined', 'Soft', 'Moderate', 'Defined', 'Sharp', 'Chiseled']} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Chin Shape" value={data.face?.chinShape} onChange={(e) => update('face', 'chinShape', e.target.value)}
              options={['Pointed', 'Rounded', 'Square', 'Cleft', 'Dimpled', 'Receding', 'Protruding', 'Double']} />
            <FaceSelect label="Chin Size" value={data.face?.chinSize} onChange={(e) => update('face', 'chinSize', e.target.value)}
              options={['Small', 'Medium', 'Large', 'Long', 'Short']} />
          </div>
        </div>

        <div className="border-2 border-stone-200 rounded-sm p-4 bg-stone-50/30">
          <h4 className="font-mono text-sm font-bold text-stone-800 mb-4">Facial Hair</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Facial Hair Type" value={data.face?.facialHairType} onChange={(e) => update('face', 'facialHairType', e.target.value)}
              options={[
                { value: 'none', label: 'None — Smooth face' },
                { value: 'clean-shaven', label: 'Clean-Shaven' },
                { value: 'stubble-light', label: 'Light Stubble (1-2 days)' },
                { value: 'stubble-heavy', label: 'Heavy Stubble (3-5 days)' },
                { value: 'goatee', label: 'Goatee' },
                { value: 'mustache', label: 'Mustache' },
                { value: 'short-beard', label: 'Short Beard' },
                { value: 'medium-beard', label: 'Medium Beard' },
                { value: 'full-beard', label: 'Full Beard' },
                { value: 'long-beard', label: 'Long Beard' }
              ]} />
            <FaceSelect label="Hair Density" value={data.face?.facialHairDensity} onChange={(e) => update('face', 'facialHairDensity', e.target.value)}
              options={['None', 'Sparse', 'Patchy', 'Moderate', 'Full', 'Thick', 'Very Thick']} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Facial Hair Color" value={data.face?.facialHairColor} onChange={(e) => update('face', 'facialHairColor', e.target.value)}
              options={['Blonde', 'Light Brown', 'Brown', 'Dark Brown', 'Black', 'Red', 'Auburn', 'Gray', 'White', 'Salt and Pepper']} />
            <FaceSelect label="Style" value={data.face?.facialHairStyle} onChange={(e) => update('face', 'facialHairStyle', e.target.value)}
              options={['Natural', 'Groomed', 'Shaped', 'Wild', 'Styled']} />
            <FaceSelect label="Length" value={data.face?.facialHairLength} onChange={(e) => update('face', 'facialHairLength', e.target.value)}
              options={['N/A', 'Shadow', 'Stubble', 'Short', 'Medium', 'Long', 'Very Long']} />
          </div>
        </div>

        <div className="border-2 border-cyan-200 rounded-sm p-4 bg-cyan-50/30">
          <h4 className="font-mono text-sm font-bold text-cyan-800 mb-4">Ears</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Ear Size" value={data.face?.earSize} onChange={(e) => update('face', 'earSize', e.target.value)}
              options={['Small', 'Medium', 'Large', 'Very Large']} />
            <FaceSelect label="Ear Shape" value={data.face?.earShape} onChange={(e) => update('face', 'earShape', e.target.value)}
              options={['Round', 'Oval', 'Pointed', 'Flat', 'Protruding']} />
            <FaceSelect label="Earlobe" value={data.face?.earLobe} onChange={(e) => update('face', 'earLobe', e.target.value)}
              options={['Attached', 'Detached', 'Stretched']} />
          </div>
        </div>

        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">Details and Marks</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Freckles" value={data.face?.freckles} onChange={(e) => update('face', 'freckles', e.target.value)}
              options={['None', 'Few', 'Light', 'Moderate', 'Heavy', 'Concentrated (nose/cheeks)']} />
            <FaceSelect label="Dimples" value={data.face?.dimples} onChange={(e) => update('face', 'dimples', e.target.value)}
              options={['None', 'Cheeks', 'Chin', 'One Cheek', 'Cheeks and Chin']} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Wrinkles" value={data.face?.wrinkles} onChange={(e) => update('face', 'wrinkles', e.target.value)}
              options={['None', 'Expression Lines', 'Fine Lines', 'Moderate', 'Pronounced', 'Deep', 'Forehead Lines', 'Crows Feet', 'Smile Lines']} />
            <FaceInput label="Distinctive Marks" value={data.face?.distinctiveMarks} onChange={(e) => update('face', 'distinctiveMarks', e.target.value)}
              placeholder="Scars, moles, birthmarks..." />
          </div>
        </div>
      </div>
    ),

    1: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">HAIR — Complete Detail</h3>
          <p className="font-mono text-xs text-amber-700">Comprehensive hair characteristics including color, texture, style by era, and presentation.</p>
        </div>

        {/* HAIR COLOR */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-4">🎨 Hair Color</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Natural Color" value={data.hair?.naturalColor} onChange={(e) => update('hair', 'naturalColor', e.target.value)}
              options={[
                { value: 'black-jet', label: 'Jet Black — Blue-black sheen' },
                { value: 'black-soft', label: 'Soft Black — Natural black' },
                { value: 'black-brown', label: 'Off-Black — Very dark brown-black' },
                { value: 'brown-darkest', label: 'Darkest Brown — Nearly black' },
                { value: 'brown-dark', label: 'Dark Brown — Deep chocolate' },
                { value: 'brown-espresso', label: 'Espresso — Rich dark brown' },
                { value: 'brown-chocolate', label: 'Chocolate Brown — Warm dark' },
                { value: 'brown-medium', label: 'Medium Brown — Classic brown' },
                { value: 'brown-chestnut', label: 'Chestnut — Warm medium brown' },
                { value: 'brown-walnut', label: 'Walnut — Neutral medium brown' },
                { value: 'brown-light', label: 'Light Brown — Soft brown' },
                { value: 'brown-caramel', label: 'Caramel Brown — Golden brown' },
                { value: 'brown-honey', label: 'Honey Brown — Warm light brown' },
                { value: 'brown-mousy', label: 'Mousy Brown — Dull light brown' },
                { value: 'auburn-dark', label: 'Dark Auburn — Deep red-brown' },
                { value: 'auburn', label: 'Auburn — Rich red-brown' },
                { value: 'auburn-light', label: 'Light Auburn — Soft red-brown' },
                { value: 'red-deep', label: 'Deep Red — Burgundy red' },
                { value: 'red-copper', label: 'Copper — Orange-red metallic' },
                { value: 'red-ginger', label: 'Ginger — Classic orange-red' },
                { value: 'red-strawberry', label: 'Strawberry — Light orange-red' },
                { value: 'red-titian', label: 'Titian — Golden red' },
                { value: 'blonde-dark', label: 'Dark Blonde — Dirty blonde' },
                { value: 'blonde-golden', label: 'Golden Blonde — Warm yellow' },
                { value: 'blonde-honey', label: 'Honey Blonde — Rich warm blonde' },
                { value: 'blonde-caramel', label: 'Caramel Blonde — Brownish blonde' },
                { value: 'blonde-medium', label: 'Medium Blonde — Classic blonde' },
                { value: 'blonde-sandy', label: 'Sandy Blonde — Beige blonde' },
                { value: 'blonde-ash', label: 'Ash Blonde — Cool grayish blonde' },
                { value: 'blonde-light', label: 'Light Blonde — Pale blonde' },
                { value: 'blonde-platinum', label: 'Platinum Blonde — Near white' },
                { value: 'blonde-white', label: 'White Blonde — Towhead' },
                { value: 'gray-silver', label: 'Silver — Bright metallic gray' },
                { value: 'gray-steel', label: 'Steel Gray — Blue-tinted gray' },
                { value: 'gray-salt-pepper', label: 'Salt & Pepper — Mixed gray/dark' },
                { value: 'gray-charcoal', label: 'Charcoal — Dark gray' },
                { value: 'gray-dove', label: 'Dove Gray — Soft medium gray' },
                { value: 'white-pure', label: 'Pure White — Snow white' },
                { value: 'white-ivory', label: 'Ivory White — Warm white' }
              ]} />
            <FaceSelect label="Current Color (if dyed)" value={data.hair?.currentColor} onChange={(e) => update('hair', 'currentColor', e.target.value)}
              options={[
                { value: '', label: '— Same as natural —' },
                { value: 'black-jet', label: 'Jet Black' },
                { value: 'black-blue', label: 'Blue-Black' },
                { value: 'brown-dark', label: 'Dark Brown' },
                { value: 'brown-medium', label: 'Medium Brown' },
                { value: 'brown-light', label: 'Light Brown' },
                { value: 'auburn', label: 'Auburn' },
                { value: 'red-burgundy', label: 'Burgundy' },
                { value: 'red-copper', label: 'Copper' },
                { value: 'red-cherry', label: 'Cherry Red' },
                { value: 'red-fire', label: 'Fire Engine Red' },
                { value: 'blonde-golden', label: 'Golden Blonde' },
                { value: 'blonde-platinum', label: 'Platinum Blonde' },
                { value: 'blonde-ash', label: 'Ash Blonde' },
                { value: 'gray-silver', label: 'Silver' },
                { value: 'fantasy-purple', label: 'Purple/Violet' },
                { value: 'fantasy-blue', label: 'Blue' },
                { value: 'fantasy-green', label: 'Green' },
                { value: 'fantasy-pink', label: 'Pink' },
                { value: 'fantasy-orange', label: 'Orange' },
                { value: 'fantasy-teal', label: 'Teal' },
                { value: 'ombre', label: 'Ombré (specify in notes)' },
                { value: 'balayage', label: 'Balayage highlights' },
                { value: 'highlights', label: 'Highlights' },
                { value: 'lowlights', label: 'Lowlights' },
                { value: 'streaks', label: 'Colored streaks' },
                { value: 'tips', label: 'Colored tips only' },
                { value: 'roots', label: 'Visible roots showing' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Color Shine/Luster" value={data.hair?.colorShine} onChange={(e) => update('hair', 'colorShine', e.target.value)}
              options={['Matte/Dull', 'Low Shine', 'Natural Shine', 'Glossy', 'Very Glossy/Shiny', 'Metallic Sheen']} />
            <FaceSelect label="Gray/White Amount" value={data.hair?.grayAmount} onChange={(e) => update('hair', 'grayAmount', e.target.value)}
              options={[
                { value: 'none', label: 'None — No gray' },
                { value: 'few', label: 'Few strands — Barely noticeable' },
                { value: 'temples', label: 'Temples only — Distinguished look' },
                { value: 'scattered', label: 'Scattered — 10-25% gray' },
                { value: 'salt-pepper', label: 'Salt & Pepper — 25-50% gray' },
                { value: 'mostly-gray', label: 'Mostly Gray — 50-75% gray' },
                { value: 'predominantly', label: 'Predominantly Gray — 75-90%' },
                { value: 'fully-gray', label: 'Fully Gray/White — 90%+' }
              ]} />
          </div>
        </div>

        {/* HAIR TEXTURE & TYPE */}
        <div className="border-2 border-yellow-200 rounded-sm p-4 bg-yellow-50/30">
          <h4 className="font-mono text-sm font-bold text-yellow-800 mb-4">〰️ Texture & Type</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Hair Type (Andre Walker System)" value={data.hair?.hairType} onChange={(e) => update('hair', 'hairType', e.target.value)}
              options={[
                { value: '1a', label: 'Type 1A — Pin straight, very fine, shiny' },
                { value: '1b', label: 'Type 1B — Straight with slight body, medium' },
                { value: '1c', label: 'Type 1C — Straight, coarse, some wave possible' },
                { value: '2a', label: 'Type 2A — Loose S-waves, fine, easy to style' },
                { value: '2b', label: 'Type 2B — Defined S-waves, medium, some frizz' },
                { value: '2c', label: 'Type 2C — Well-defined waves, coarse, frizzy' },
                { value: '3a', label: 'Type 3A — Loose spirals, big curls, shiny' },
                { value: '3b', label: 'Type 3B — Springy ringlets, medium curls' },
                { value: '3c', label: 'Type 3C — Tight corkscrews, densely packed' },
                { value: '4a', label: 'Type 4A — Soft S-coils, defined pattern' },
                { value: '4b', label: 'Type 4B — Z-pattern coils, less defined' },
                { value: '4c', label: 'Type 4C — Tight zigzag, least definition, shrinkage' }
              ]} />
            <FaceSelect label="Hair Texture Feel" value={data.hair?.textureDesc} onChange={(e) => update('hair', 'textureDesc', e.target.value)}
              options={[
                { value: 'silky', label: 'Silky — Smooth, soft, slippery' },
                { value: 'cottony', label: 'Cottony — Soft, dry, absorbs moisture' },
                { value: 'spongy', label: 'Spongy — Absorbs water, springy' },
                { value: 'wiry', label: 'Wiry — Coarse, rough texture' },
                { value: 'thready', label: 'Thready — Low sheen, easy to frizz' },
                { value: 'fine', label: 'Fine — Delicate, soft strands' },
                { value: 'medium', label: 'Medium — Average thickness' },
                { value: 'coarse', label: 'Coarse — Thick, strong strands' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Density/Thickness" value={data.hair?.density} onChange={(e) => update('hair', 'density', e.target.value)}
              options={[
                { value: 'very-thin', label: 'Very Thin — Scalp very visible' },
                { value: 'thin', label: 'Thin — Scalp somewhat visible' },
                { value: 'medium-thin', label: 'Medium-Thin — Moderate coverage' },
                { value: 'medium', label: 'Medium — Average density' },
                { value: 'medium-thick', label: 'Medium-Thick — Good coverage' },
                { value: 'thick', label: 'Thick — Full head of hair' },
                { value: 'very-thick', label: 'Very Thick — Abundant, heavy' }
              ]} />
            <FaceSelect label="Porosity" value={data.hair?.porosity} onChange={(e) => update('hair', 'porosity', e.target.value)}
              options={[
                { value: 'low', label: 'Low — Resists moisture, slow to dry' },
                { value: 'medium', label: 'Medium/Normal — Balanced' },
                { value: 'high', label: 'High — Absorbs fast, dries fast, frizzy' }
              ]} />
            <FaceSelect label="Hair Condition" value={data.hair?.condition} onChange={(e) => update('hair', 'condition', e.target.value)}
              options={[
                { value: 'pristine', label: 'Pristine — Perfect condition' },
                { value: 'healthy', label: 'Healthy — Good condition' },
                { value: 'normal', label: 'Normal — Average' },
                { value: 'dry', label: 'Dry — Needs moisture' },
                { value: 'oily', label: 'Oily — Gets greasy fast' },
                { value: 'damaged', label: 'Damaged — Split ends, breakage' },
                { value: 'over-processed', label: 'Over-processed — Chemical damage' },
                { value: 'heat-damaged', label: 'Heat Damaged — From styling tools' }
              ]} />
          </div>
        </div>

        {/* LENGTH & STRUCTURE */}
        <div className="border-2 border-orange-200 rounded-sm p-4 bg-orange-50/30">
          <h4 className="font-mono text-sm font-bold text-orange-800 mb-4">📏 Length & Structure</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Length" value={data.hair?.length} onChange={(e) => update('hair', 'length', e.target.value)}
              options={[
                { value: 'bald', label: 'Bald — No hair' },
                { value: 'shaved', label: 'Shaved — Razor/clipper no guard' },
                { value: 'buzzed', label: 'Buzz Cut — 1-3mm' },
                { value: 'cropped', label: 'Cropped — 5-10mm' },
                { value: 'short', label: 'Short — Above ears (1-2 inches)' },
                { value: 'ear-length', label: 'Ear Length — At ears (2-3 inches)' },
                { value: 'chin-length', label: 'Chin Length — Bob length (4-6 inches)' },
                { value: 'shoulder-length', label: 'Shoulder Length (8-12 inches)' },
                { value: 'armpit-length', label: 'Armpit Length (12-16 inches)' },
                { value: 'mid-back', label: 'Mid-Back (16-22 inches)' },
                { value: 'waist-length', label: 'Waist Length (22-28 inches)' },
                { value: 'hip-length', label: 'Hip Length (28-36 inches)' },
                { value: 'classic-length', label: 'Classic/Tailbone Length (36-42 in)' },
                { value: 'thigh-length', label: 'Thigh Length (42-52 inches)' },
                { value: 'knee-length', label: 'Knee Length (52+ inches)' },
                { value: 'floor-length', label: 'Floor Length — Extreme' }
              ]} />
            <FaceSelect label="Hairline" value={data.hair?.hairline} onChange={(e) => update('hair', 'hairline', e.target.value)}
              options={[
                { value: 'straight', label: 'Straight — Horizontal line' },
                { value: 'rounded', label: 'Rounded — Soft curve' },
                { value: 'widows-peak', label: 'Widows Peak — V-shaped point' },
                { value: 'double-peak', label: 'Double Widows Peak — M-shape' },
                { value: 'm-shaped', label: 'M-Shaped — Receding at temples' },
                { value: 'receding-slight', label: 'Slightly Receding — Early stage' },
                { value: 'receding-moderate', label: 'Moderately Receding' },
                { value: 'receding-advanced', label: 'Advanced Recession' },
                { value: 'high', label: 'Naturally High — Large forehead' },
                { value: 'low', label: 'Naturally Low — Small forehead' },
                { value: 'uneven', label: 'Uneven/Asymmetric' },
                { value: 'cowlick', label: 'Has Cowlick(s)' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Part/Parting" value={data.hair?.parting} onChange={(e) => update('hair', 'parting', e.target.value)}
              options={[
                { value: 'none', label: 'No Part — Slicked or combed back' },
                { value: 'left', label: 'Left Side Part' },
                { value: 'right', label: 'Right Side Part' },
                { value: 'center', label: 'Center Part' },
                { value: 'deep-left', label: 'Deep Left Part' },
                { value: 'deep-right', label: 'Deep Right Part' },
                { value: 'zigzag', label: 'Zigzag Part' },
                { value: 'natural', label: 'Natural/Uneven Part' },
                { value: 'multiple', label: 'Multiple Parts (cornrows, etc.)' }
              ]} />
            <FaceSelect label="Layers" value={data.hair?.layers} onChange={(e) => update('hair', 'layers', e.target.value)}
              options={[
                { value: 'none', label: 'No Layers — Blunt cut, one length' },
                { value: 'minimal', label: 'Minimal Layers — Face framing only' },
                { value: 'subtle', label: 'Subtle Layers — Barely visible' },
                { value: 'moderate', label: 'Moderate Layers — Movement' },
                { value: 'heavy', label: 'Heavy Layers — Lots of texture' },
                { value: 'choppy', label: 'Choppy Layers — Edgy, uneven' },
                { value: 'feathered', label: 'Feathered — Soft, wispy ends' },
                { value: 'razored', label: 'Razored — Sharp, textured' },
                { value: 'graduated', label: 'Graduated — Shorter in back' }
              ]} />
          </div>
        </div>

        {/* HAIRSTYLE BY CATEGORY */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-4">💇 Hairstyle — By Category</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Style Category" value={data.hair?.styleCategory} onChange={(e) => update('hair', 'styleCategory', e.target.value)}
              options={[
                { value: 'natural', label: '🌿 Natural — Worn as-is, minimal styling' },
                { value: 'classic', label: '👔 Classic — Timeless, professional' },
                { value: 'modern', label: '✨ Modern — Current trends' },
                { value: 'edgy', label: '⚡ Edgy — Bold, unconventional' },
                { value: 'romantic', label: '💕 Romantic — Soft, feminine' },
                { value: 'professional', label: '💼 Professional — Office-appropriate' },
                { value: 'casual', label: '😊 Casual — Relaxed, everyday' },
                { value: 'athletic', label: '🏃 Athletic — Practical for sports' },
                { value: 'vintage', label: '📷 Vintage — Retro inspired' },
                { value: 'cultural', label: '🌍 Cultural — Traditional styles' },
                { value: 'protective', label: '🛡️ Protective — Protects natural hair' },
                { value: 'avant-garde', label: '🎨 Avant-Garde — Artistic, experimental' }
              ]} />
            <FaceSelect label="Primary Hairstyle" value={data.hair?.primaryStyle} onChange={(e) => update('hair', 'primaryStyle', e.target.value)}
              options={[
                { value: '', label: '— Select Style —' },
                { value: 'natural-loose', label: 'Loose/Down — Natural and free' },
                { value: 'natural-air-dried', label: 'Air-Dried — Minimal styling' },
                { value: 'slicked-back', label: 'Slicked Back — Smooth, away from face' },
                { value: 'side-swept', label: 'Side-Swept — Swept to one side' },
                { value: 'pompadour', label: 'Pompadour — Volume on top, sides back' },
                { value: 'quiff', label: 'Quiff — Voluminous front' },
                { value: 'undercut', label: 'Undercut — Short sides, long top' },
                { value: 'fade', label: 'Fade — Graduated sides' },
                { value: 'crew-cut', label: 'Crew Cut — Short all over' },
                { value: 'buzz-cut', label: 'Buzz Cut — Very short' },
                { value: 'military', label: 'Military/High and Tight' },
                { value: 'mohawk', label: 'Mohawk/Faux Hawk' },
                { value: 'mullet', label: 'Mullet — Business front, party back' },
                { value: 'shag', label: 'Shag — Layered, messy' },
                { value: 'bob-blunt', label: 'Blunt Bob — Sharp, one length' },
                { value: 'bob-layered', label: 'Layered Bob — Textured bob' },
                { value: 'bob-asymmetric', label: 'Asymmetric Bob — Uneven lengths' },
                { value: 'bob-inverted', label: 'Inverted Bob — Shorter back' },
                { value: 'lob', label: 'Lob (Long Bob)' },
                { value: 'pixie', label: 'Pixie Cut — Very short, feminine' },
                { value: 'pixie-long', label: 'Long Pixie — Grown out pixie' },
                { value: 'bangs-full', label: 'With Full Bangs' },
                { value: 'bangs-side', label: 'With Side Bangs' },
                { value: 'bangs-curtain', label: 'With Curtain Bangs' },
                { value: 'bangs-wispy', label: 'With Wispy Bangs' },
                { value: 'layers-long', label: 'Long Layers' },
                { value: 'layers-face-frame', label: 'Face-Framing Layers' },
                { value: 'ponytail-high', label: 'High Ponytail' },
                { value: 'ponytail-low', label: 'Low Ponytail' },
                { value: 'ponytail-side', label: 'Side Ponytail' },
                { value: 'bun-high', label: 'High Bun/Top Knot' },
                { value: 'bun-low', label: 'Low Bun/Chignon' },
                { value: 'bun-messy', label: 'Messy Bun' },
                { value: 'half-up', label: 'Half-Up, Half-Down' },
                { value: 'updo-elegant', label: 'Elegant Updo' },
                { value: 'braids-single', label: 'Single Braid' },
                { value: 'braids-pigtails', label: 'Pigtail Braids' },
                { value: 'braids-crown', label: 'Crown/Halo Braid' },
                { value: 'braids-french', label: 'French Braid' },
                { value: 'braids-dutch', label: 'Dutch Braid' },
                { value: 'braids-fishtail', label: 'Fishtail Braid' },
                { value: 'braids-box', label: 'Box Braids' },
                { value: 'braids-cornrows', label: 'Cornrows' },
                { value: 'braids-ghana', label: 'Ghana Braids/Feed-in' },
                { value: 'braids-fulani', label: 'Fulani Braids' },
                { value: 'braids-goddess', label: 'Goddess Locs/Braids' },
                { value: 'locs-traditional', label: 'Traditional Locs' },
                { value: 'locs-freeform', label: 'Freeform Locs' },
                { value: 'locs-sisterlocks', label: 'Sisterlocks/Microlocs' },
                { value: 'twists-two-strand', label: 'Two-Strand Twists' },
                { value: 'twists-flat', label: 'Flat Twists' },
                { value: 'twists-passion', label: 'Passion Twists' },
                { value: 'twists-senegalese', label: 'Senegalese Twists' },
                { value: 'afro-natural', label: 'Natural Afro' },
                { value: 'afro-picked', label: 'Picked-Out Afro' },
                { value: 'afro-shaped', label: 'Shaped/Tapered Afro' },
                { value: 'twist-out', label: 'Twist-Out' },
                { value: 'braid-out', label: 'Braid-Out' },
                { value: 'bantu-knots', label: 'Bantu Knots' },
                { value: 'finger-coils', label: 'Finger Coils' },
                { value: 'wash-and-go', label: 'Wash and Go' },
                { value: 'perm-rod-set', label: 'Perm Rod Set' },
                { value: 'flexi-rod-set', label: 'Flexi Rod Set' },
                { value: 'roller-set', label: 'Roller Set' },
                { value: 'blowout', label: 'Blowout — Smooth, voluminous' },
                { value: 'pressed', label: 'Press/Silk Press' },
                { value: 'relaxed', label: 'Relaxed/Permed' },
                { value: 'jheri-curl', label: 'Jheri Curl/S-Curl' },
                { value: 'waves-360', label: '360 Waves' },
                { value: 'finger-waves', label: 'Finger Waves' },
                { value: 'beachy-waves', label: 'Beach Waves' },
                { value: 'hollywood-waves', label: 'Hollywood Waves — Glamorous' },
                { value: 'curls-defined', label: 'Defined Curls — Styled' },
                { value: 'curls-loose', label: 'Loose Curls' },
                { value: 'curls-tight', label: 'Tight Curls/Ringlets' },
                { value: 'straight-flat-ironed', label: 'Flat-Ironed Straight' },
                { value: 'messy-textured', label: 'Messy/Textured — Bedhead' },
                { value: 'spiky', label: 'Spiky' },
                { value: 'liberty-spikes', label: 'Liberty Spikes' },
                { value: 'deathhawk', label: 'Deathhawk' },
                { value: 'chelsea', label: 'Chelsea Cut' },
                { value: 'asymmetric', label: 'Asymmetric — Creative uneven' },
                { value: 'geometric', label: 'Geometric — Sharp lines' },
                { value: 'headwrap', label: 'Head Wrap/Turban' },
                { value: 'headband', label: 'With Headband' },
                { value: 'other', label: 'Other (describe in notes)' }
              ]} />
          </div>
        </div>

        {/* HAIRSTYLE BY DECADE */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">📅 Era-Inspired Style (Optional)</h4>
          <p className="font-mono text-[10px] text-purple-600 mb-4">If your character has a style inspired by a specific era, select it here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Style Era" value={data.hair?.styleEra} onChange={(e) => update('hair', 'styleEra', e.target.value)}
              options={[
                { value: '', label: '— No specific era —' },
                { value: 'ancient', label: '🏛️ Ancient — Egyptian, Greek, Roman' },
                { value: 'medieval', label: '🏰 Medieval — Braids, veils, long' },
                { value: 'renaissance', label: '👑 Renaissance — Elaborate, adorned' },
                { value: 'victorian', label: '🎩 Victorian (1837-1901) — Updos, ringlets' },
                { value: 'edwardian', label: '💐 Edwardian (1901-1910) — Gibson Girl, pompadour' },
                { value: '1920s', label: '🎷 1920s — Bob, finger waves, Marcel' },
                { value: '1930s', label: '🎬 1930s — Waves, pin curls, glamour' },
                { value: '1940s', label: '✈️ 1940s — Victory rolls, snoods, practical' },
                { value: '1950s', label: '🚗 1950s — Poodle cut, DA, ponytails' },
                { value: '1960s', label: '🚀 1960s — Beehive, bouffant, mod, hippie' },
                { value: '1970s', label: '🕺 1970s — Farrah, afro, shag, long straight' },
                { value: '1980s', label: '🎸 1980s — Big hair, perms, mullet, crimped' },
                { value: '1990s', label: '📺 1990s — Rachel, grunge, frosted tips' },
                { value: '2000s', label: '📱 2000s — Chunky highlights, emo, scene' },
                { value: '2010s', label: '💻 2010s — Ombré, lob, undercut, man bun' },
                { value: '2020s', label: '🌐 2020s — Natural texture, curtain bangs, wolf cut' }
              ]} />
            <FaceSelect label="Era-Specific Style" value={data.hair?.eraStyle} onChange={(e) => update('hair', 'eraStyle', e.target.value)}
              options={[
                { value: '', label: '— Select era first —' },
                { value: '1920s-bob', label: '1920s: Classic Bob/Flapper Bob' },
                { value: '1920s-shingle', label: '1920s: Shingle Bob (short back)' },
                { value: '1920s-eton', label: '1920s: Eton Crop (very short)' },
                { value: '1920s-finger-waves', label: '1920s: Finger Waves' },
                { value: '1920s-marcel', label: '1920s: Marcel Wave' },
                { value: '1930s-waves', label: '1930s: Sculpted Waves' },
                { value: '1930s-pin-curls', label: '1930s: Pin Curls' },
                { value: '1930s-pageboy', label: '1930s: Pageboy' },
                { value: '1940s-victory-rolls', label: '1940s: Victory Rolls' },
                { value: '1940s-snood', label: '1940s: Snood Style' },
                { value: '1940s-pompadour', label: '1940s: Pompadour' },
                { value: '1940s-waves', label: '1940s: Soft Waves' },
                { value: '1950s-poodle', label: '1950s: Poodle Cut' },
                { value: '1950s-da', label: '1950s: DA/Ducktail (greaser)' },
                { value: '1950s-pompadour', label: '1950s: Pompadour/Elvis' },
                { value: '1950s-ponytail', label: '1950s: High Ponytail' },
                { value: '1950s-bouffant', label: '1950s: Early Bouffant' },
                { value: '1960s-beehive', label: '1960s: Beehive' },
                { value: '1960s-bouffant', label: '1960s: Bouffant' },
                { value: '1960s-mod-bob', label: '1960s: Mod Bob/Vidal Sassoon' },
                { value: '1960s-pixie', label: '1960s: Twiggy Pixie' },
                { value: '1960s-flip', label: '1960s: Flip' },
                { value: '1960s-hippie', label: '1960s: Hippie Long & Straight' },
                { value: '1970s-farrah', label: '1970s: Farrah Fawcett Feathers' },
                { value: '1970s-shag', label: '1970s: Shag' },
                { value: '1970s-afro', label: '1970s: Afro' },
                { value: '1970s-disco', label: '1970s: Disco Curls' },
                { value: '1970s-long-straight', label: '1970s: Long & Straight' },
                { value: '1980s-big-hair', label: '1980s: Big Hair/Teased' },
                { value: '1980s-perm', label: '1980s: Perm' },
                { value: '1980s-mullet', label: '1980s: Mullet' },
                { value: '1980s-crimped', label: '1980s: Crimped' },
                { value: '1980s-side-ponytail', label: '1980s: Side Ponytail' },
                { value: '1980s-jheri-curl', label: '1980s: Jheri Curl' },
                { value: '1980s-hi-top-fade', label: '1980s: Hi-Top Fade' },
                { value: '1990s-rachel', label: '1990s: The Rachel' },
                { value: '1990s-grunge', label: '1990s: Grunge (messy, undone)' },
                { value: '1990s-curtains', label: '1990s: Curtain Hair (men)' },
                { value: '1990s-frosted-tips', label: '1990s: Frosted Tips' },
                { value: '1990s-spiky', label: '1990s: Spiky Gelled' },
                { value: '1990s-crimped', label: '1990s: Crimped sections' },
                { value: '2000s-chunky-highlights', label: '2000s: Chunky Highlights' },
                { value: '2000s-emo', label: '2000s: Emo Swoop' },
                { value: '2000s-scene', label: '2000s: Scene Hair' },
                { value: '2000s-faux-hawk', label: '2000s: Faux Hawk' },
                { value: '2000s-pouf', label: '2000s: Pouf/Bump' },
                { value: '2010s-ombre', label: '2010s: Ombré' },
                { value: '2010s-balayage', label: '2010s: Balayage' },
                { value: '2010s-undercut', label: '2010s: Undercut' },
                { value: '2010s-man-bun', label: '2010s: Man Bun' },
                { value: '2010s-lob', label: '2010s: Lob' },
                { value: '2020s-wolf-cut', label: '2020s: Wolf Cut' },
                { value: '2020s-curtain-bangs', label: '2020s: Curtain Bangs' },
                { value: '2020s-butterfly', label: '2020s: Butterfly Cut' },
                { value: '2020s-octopus', label: '2020s: Octopus Cut' },
                { value: '2020s-money-pieces', label: '2020s: Money Pieces' },
                { value: '2020s-shullet', label: '2020s: Shullet (shag+mullet)' }
              ]} />
          </div>
        </div>

        {/* STYLING & MAINTENANCE */}
        <div className="border-2 border-teal-200 rounded-sm p-4 bg-teal-50/30">
          <h4 className="font-mono text-sm font-bold text-teal-800 mb-4">🧴 Styling & Maintenance</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Styling Effort" value={data.hair?.stylingEffort} onChange={(e) => update('hair', 'stylingEffort', e.target.value)}
              options={[
                { value: 'none', label: 'None — No styling at all' },
                { value: 'minimal', label: 'Minimal — Quick finger-comb' },
                { value: 'low', label: 'Low — Basic brush/product' },
                { value: 'moderate', label: 'Moderate — Some time daily' },
                { value: 'high', label: 'High — Significant daily effort' },
                { value: 'extensive', label: 'Extensive — Elaborate routine' }
              ]} />
            <FaceSelect label="Products Used" value={data.hair?.productsUsed} onChange={(e) => update('hair', 'productsUsed', e.target.value)}
              options={[
                { value: 'none', label: 'None — Product-free' },
                { value: 'minimal', label: 'Minimal — Basic shampoo only' },
                { value: 'basic', label: 'Basic — Shampoo + conditioner' },
                { value: 'moderate', label: 'Moderate — Plus styling product' },
                { value: 'extensive', label: 'Extensive — Full routine' },
                { value: 'natural-only', label: 'Natural/Organic only' }
              ]} />
            <FaceSelect label="Heat Styling" value={data.hair?.heatStyling} onChange={(e) => update('hair', 'heatStyling', e.target.value)}
              options={[
                { value: 'never', label: 'Never — Heat-free' },
                { value: 'rarely', label: 'Rarely — Special occasions' },
                { value: 'sometimes', label: 'Sometimes — Weekly' },
                { value: 'often', label: 'Often — Several times/week' },
                { value: 'daily', label: 'Daily — Every day' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Hair Accessories" value={data.hair?.accessories} onChange={(e) => update('hair', 'accessories', e.target.value)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'basic-ties', label: 'Basic hair ties only' },
                { value: 'clips', label: 'Clips/Bobby pins' },
                { value: 'headbands', label: 'Headbands' },
                { value: 'scarves', label: 'Scarves/Wraps' },
                { value: 'decorative', label: 'Decorative clips/pins' },
                { value: 'flowers', label: 'Flowers/Natural elements' },
                { value: 'beads', label: 'Beads/Shells' },
                { value: 'ribbons', label: 'Ribbons/Bows' },
                { value: 'crowns-tiaras', label: 'Crowns/Tiaras' },
                { value: 'cultural', label: 'Cultural accessories' },
                { value: 'various', label: 'Various/Changes often' }
              ]} />
            <FaceInput label="Style Notes" value={data.hair?.styleNotes} onChange={(e) => update('hair', 'styleNotes', e.target.value)}
              placeholder="Additional details about hair styling, habits, or preferences..." />
          </div>
        </div>
      </div>
    ),

    2: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-emerald-900 mb-2">BODY — Physical Structure</h3>
          <p className="font-mono text-xs text-emerald-700">
            Complete physical characteristics of your character.
            {!age && <span className="text-amber-600 ml-2">⚠️ Set age in Identity tab for full options.</span>}
            {!characterGender && <span className="text-amber-600 ml-2">⚠️ Set gender in Identity tab for tailored options.</span>}
          </p>
          {isMinor && (
            <p className="font-mono text-[10px] text-emerald-600 mt-2 bg-emerald-100 p-2 rounded">
              📋 Simplified body options for characters under 18.
            </p>
          )}
        </div>

        {/* BASIC MEASUREMENTS */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-4">📏 Basic Measurements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Height" value={data.body?.height} onChange={(e) => update('body', 'height', e.target.value)}
              options={[
                { value: 'very-short', label: 'Very Short — Bottom 5%' },
                { value: 'short', label: 'Short — Below average' },
                { value: 'below-average', label: 'Below Average — Slightly short' },
                { value: 'average', label: 'Average — Typical height' },
                { value: 'above-average', label: 'Above Average — Slightly tall' },
                { value: 'tall', label: 'Tall — Above average' },
                { value: 'very-tall', label: 'Very Tall — Top 5%' },
                { value: 'exceptionally-tall', label: 'Exceptionally Tall — Top 1%' }
              ]} />
            <FaceInput label="Exact Height (optional)" value={data.body?.exactHeight} onChange={(e) => update('body', 'exactHeight', e.target.value)}
              placeholder="e.g. 5'9 / 175cm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Weight Category" value={data.body?.weightCategory} onChange={(e) => update('body', 'weightCategory', e.target.value)}
              options={[
                { value: 'underweight', label: 'Underweight — Below healthy range' },
                { value: 'slim', label: 'Slim — Lower end of healthy' },
                { value: 'average', label: 'Average — Middle of healthy range' },
                { value: 'athletic', label: 'Athletic — Muscular weight' },
                { value: 'above-average', label: 'Above Average — Higher healthy' },
                { value: 'heavy', label: 'Heavy — Above healthy range' },
                { value: 'very-heavy', label: 'Very Heavy — Significantly above' }
              ]} />
            <FaceInput label="Exact Weight (optional)" value={data.body?.exactWeight} onChange={(e) => update('body', 'exactWeight', e.target.value)}
              placeholder="e.g. 154lbs / 70kg" />
          </div>
        </div>

        {/* BODY TYPE & BUILD */}
        <div className="border-2 border-teal-200 rounded-sm p-4 bg-teal-50/30">
          <h4 className="font-mono text-sm font-bold text-teal-800 mb-4">🏋️ Body Type & Build</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Somatotype (Frame)" value={data.body?.somatotype} onChange={(e) => update('body', 'somatotype', e.target.value)}
              options={[
                { value: 'ectomorph', label: 'Ectomorph — Lean, long limbs, fast metabolism' },
                { value: 'mesomorph', label: 'Mesomorph — Athletic, muscular, medium frame' },
                { value: 'endomorph', label: 'Endomorph — Wider, stores fat easily, strong' },
                { value: 'ecto-meso', label: 'Ecto-Mesomorph — Lean but muscular' },
                { value: 'endo-meso', label: 'Endo-Mesomorph — Powerful, stocky build' },
                { value: 'ecto-endo', label: 'Ecto-Endomorph — Thin limbs, soft middle' }
              ]} />
            <FaceSelect label="Overall Build" value={data.body?.build} onChange={(e) => update('body', 'build', e.target.value)}
              options={
                isMale ? [
                  { value: 'skinny', label: 'Skinny — Very thin, little muscle' },
                  { value: 'slim', label: 'Slim — Thin but healthy' },
                  { value: 'lean', label: 'Lean — Low body fat, some muscle' },
                  { value: 'average', label: 'Average — Typical male build' },
                  { value: 'fit', label: 'Fit — Good muscle tone' },
                  { value: 'athletic', label: 'Athletic — Sports-ready physique' },
                  { value: 'muscular', label: 'Muscular — Well-developed muscles' },
                  { value: 'bodybuilder', label: 'Bodybuilder — Extreme muscle mass' },
                  { value: 'stocky', label: 'Stocky — Short, broad, solid' },
                  { value: 'husky', label: 'Husky — Large frame, some fat' },
                  { value: 'heavyset', label: 'Heavyset — Large with extra weight' },
                  { value: 'dad-bod', label: 'Dad Bod — Average with soft middle' },
                  { value: 'bear', label: 'Bear — Large, hairy, broad' }
                ] : isFemale ? [
                  { value: 'petite', label: 'Petite — Small and delicate' },
                  { value: 'slim', label: 'Slim — Thin, narrow frame' },
                  { value: 'slender', label: 'Slender — Tall and thin' },
                  { value: 'lean', label: 'Lean — Low body fat, toned' },
                  { value: 'average', label: 'Average — Typical female build' },
                  { value: 'fit', label: 'Fit — Good muscle tone' },
                  { value: 'athletic', label: 'Athletic — Sports-ready physique' },
                  { value: 'toned', label: 'Toned — Defined muscles, lean' },
                  { value: 'curvy', label: 'Curvy — Pronounced curves' },
                  { value: 'hourglass', label: 'Hourglass — Balanced bust/hips, small waist' },
                  { value: 'pear', label: 'Pear — Wider hips than bust' },
                  { value: 'apple', label: 'Apple — Fuller middle, slimmer legs' },
                  { value: 'rectangle', label: 'Rectangle — Balanced, less curves' },
                  { value: 'inverted-triangle', label: 'Inverted Triangle — Broad shoulders' },
                  { value: 'plus-size', label: 'Plus-Size — Full-figured' },
                  { value: 'bbw', label: 'BBW — Big beautiful woman' }
                ] : [
                  { value: 'very-thin', label: 'Very Thin' },
                  { value: 'slim', label: 'Slim' },
                  { value: 'lean', label: 'Lean' },
                  { value: 'average', label: 'Average' },
                  { value: 'fit', label: 'Fit' },
                  { value: 'athletic', label: 'Athletic' },
                  { value: 'muscular', label: 'Muscular' },
                  { value: 'stocky', label: 'Stocky' },
                  { value: 'curvy', label: 'Curvy' },
                  { value: 'heavyset', label: 'Heavyset' },
                  { value: 'plus-size', label: 'Plus-Size' }
                ]
              } />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Muscle Definition" value={data.body?.muscleDef} onChange={(e) => update('body', 'muscleDef', e.target.value)}
              options={[
                { value: 'none', label: 'None — No visible muscle' },
                { value: 'soft', label: 'Soft — Hidden under fat/skin' },
                { value: 'light', label: 'Light — Slight definition' },
                { value: 'moderate', label: 'Moderate — Visible when flexed' },
                { value: 'defined', label: 'Defined — Clearly visible' },
                { value: 'cut', label: 'Cut — Sharp definition' },
                { value: 'ripped', label: 'Ripped — Extreme definition' }
              ]} />
            <FaceSelect label="Body Fat" value={data.body?.bodyFat} onChange={(e) => update('body', 'bodyFat', e.target.value)}
              options={[
                { value: 'essential', label: 'Essential Only — Very low (athletes)' },
                { value: 'low', label: 'Low — Lean, visible abs' },
                { value: 'fit', label: 'Fit — Athletic level' },
                { value: 'average', label: 'Average — Healthy range' },
                { value: 'above-average', label: 'Above Average — Some softness' },
                { value: 'high', label: 'High — Noticeable fat' },
                { value: 'very-high', label: 'Very High — Obese range' }
              ]} />
            <FaceSelect label="Frame Size" value={data.body?.frameSize} onChange={(e) => update('body', 'frameSize', e.target.value)}
              options={[
                { value: 'very-small', label: 'Very Small — Delicate bones' },
                { value: 'small', label: 'Small — Narrow frame' },
                { value: 'medium', label: 'Medium — Average frame' },
                { value: 'large', label: 'Large — Broad frame' },
                { value: 'very-large', label: 'Very Large — Heavy bones' }
              ]} />
          </div>
        </div>

        {/* PROPORTIONS */}
        <div className="border-2 border-cyan-200 rounded-sm p-4 bg-cyan-50/30">
          <h4 className="font-mono text-sm font-bold text-cyan-800 mb-4">📐 Proportions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Torso Length" value={data.body?.torsoLength} onChange={(e) => update('body', 'torsoLength', e.target.value)}
              options={[
                { value: 'short', label: 'Short Torso — Long legs relative' },
                { value: 'average', label: 'Average Torso' },
                { value: 'long', label: 'Long Torso — Short legs relative' }
              ]} />
            <FaceSelect label="Leg Length" value={data.body?.legLength} onChange={(e) => update('body', 'legLength', e.target.value)}
              options={[
                { value: 'short', label: 'Short Legs' },
                { value: 'average', label: 'Average Legs' },
                { value: 'long', label: 'Long Legs' },
                { value: 'very-long', label: 'Very Long Legs' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FaceSelect label="Shoulder Width" value={data.body?.shoulderWidth} onChange={(e) => update('body', 'shoulderWidth', e.target.value)}
              options={[
                { value: 'narrow', label: 'Narrow — Slim shoulders' },
                { value: 'average', label: 'Average' },
                { value: 'broad', label: 'Broad — Wide shoulders' },
                { value: 'very-broad', label: 'Very Broad' }
              ]} />
            <FaceSelect label="Hip Width" value={data.body?.hipWidth} onChange={(e) => update('body', 'hipWidth', e.target.value)}
              options={[
                { value: 'narrow', label: 'Narrow Hips' },
                { value: 'average', label: 'Average Hips' },
                { value: 'wide', label: 'Wide Hips' },
                { value: 'very-wide', label: 'Very Wide Hips' }
              ]} />
            <FaceSelect label="Waist" value={data.body?.waist} onChange={(e) => update('body', 'waist', e.target.value)}
              options={[
                { value: 'very-small', label: 'Very Small — Tiny waist' },
                { value: 'small', label: 'Small Waist' },
                { value: 'average', label: 'Average Waist' },
                { value: 'thick', label: 'Thick Waist' },
                { value: 'very-thick', label: 'Very Thick — No definition' }
              ]} />
          </div>
        </div>

        {/* LIMBS & EXTREMITIES */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-4">🦵 Limbs & Extremities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Arm Length" value={data.body?.armLength} onChange={(e) => update('body', 'armLength', e.target.value)}
              options={['Short', 'Average', 'Long', 'Very Long']} />
            <FaceSelect label="Arm Build" value={data.body?.armBuild} onChange={(e) => update('body', 'armBuild', e.target.value)}
              options={[
                { value: 'thin', label: 'Thin — Slender arms' },
                { value: 'average', label: 'Average' },
                { value: 'toned', label: 'Toned — Visible definition' },
                { value: 'muscular', label: 'Muscular — Well-developed' },
                { value: 'very-muscular', label: 'Very Muscular — Large' },
                { value: 'soft', label: 'Soft — Little definition' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Leg Build" value={data.body?.legBuild} onChange={(e) => update('body', 'legBuild', e.target.value)}
              options={[
                { value: 'thin', label: 'Thin — Slender legs' },
                { value: 'average', label: 'Average' },
                { value: 'toned', label: 'Toned — Defined muscles' },
                { value: 'muscular', label: 'Muscular — Athletic' },
                { value: 'thick', label: 'Thick — Full, strong' },
                { value: 'very-thick', label: 'Very Thick — Large' }
              ]} />
            <FaceSelect label="Hand Size" value={data.body?.handSize} onChange={(e) => update('body', 'handSize', e.target.value)}
              options={[
                { value: 'very-small', label: 'Very Small — Delicate' },
                { value: 'small', label: 'Small' },
                { value: 'average', label: 'Average' },
                { value: 'large', label: 'Large' },
                { value: 'very-large', label: 'Very Large' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Hand Appearance" value={data.body?.handAppearance} onChange={(e) => update('body', 'handAppearance', e.target.value)}
              options={[
                { value: 'elegant', label: 'Elegant — Long, graceful fingers' },
                { value: 'delicate', label: 'Delicate — Small, fine' },
                { value: 'average', label: 'Average' },
                { value: 'strong', label: 'Strong — Capable looking' },
                { value: 'rough', label: 'Rough — Calloused, worked' },
                { value: 'stubby', label: 'Stubby — Short fingers' }
              ]} />
            <FaceSelect label="Feet Size" value={data.body?.feetSize} onChange={(e) => update('body', 'feetSize', e.target.value)}
              options={[
                { value: 'very-small', label: 'Very Small' },
                { value: 'small', label: 'Small' },
                { value: 'average', label: 'Average' },
                { value: 'large', label: 'Large' },
                { value: 'very-large', label: 'Very Large' }
              ]} />
          </div>
        </div>

        {/* SKIN & BODY DETAILS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-4">✨ Skin & Body Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Body Hair (Amount)" value={data.body?.bodyHairAmount} onChange={(e) => update('body', 'bodyHairAmount', e.target.value)}
              options={[
                { value: 'none', label: 'None — Completely hairless' },
                { value: 'very-light', label: 'Very Light — Barely visible' },
                { value: 'light', label: 'Light — Some fine hair' },
                { value: 'moderate', label: 'Moderate — Average' },
                { value: 'heavy', label: 'Heavy — Noticeable' },
                { value: 'very-heavy', label: 'Very Heavy — Very hairy' }
              ]} />
            <FaceSelect label="Body Hair Distribution" value={data.body?.bodyHairDist} onChange={(e) => update('body', 'bodyHairDist', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'arms-legs', label: 'Arms & Legs only' },
                { value: 'chest', label: 'Chest area' },
                { value: 'torso', label: 'Full torso' },
                { value: 'back', label: 'Back included' },
                { value: 'full-body', label: 'Full body coverage' }
              ]} />
            <FaceSelect label="Skin Condition (Body)" value={data.body?.bodySkinCondition} onChange={(e) => update('body', 'bodySkinCondition', e.target.value)}
              options={[
                { value: 'flawless', label: 'Flawless — Perfect skin' },
                { value: 'clear', label: 'Clear — Minor imperfections' },
                { value: 'normal', label: 'Normal — Average' },
                { value: 'dry', label: 'Dry — Needs moisture' },
                { value: 'stretch-marks', label: 'Stretch Marks' },
                { value: 'scarred', label: 'Scarred — Visible scars' },
                { value: 'moles-birthmarks', label: 'Moles/Birthmarks' },
                { value: 'freckled', label: 'Freckled' },
                { value: 'cellulite', label: 'Cellulite visible' }
              ]} />
          </div>
          <FaceInput label="Body Marks/Scars" value={data.body?.bodyMarks} onChange={(e) => update('body', 'bodyMarks', e.target.value)}
            placeholder="Describe any notable scars, birthmarks, moles, or other marks on the body..." />
        </div>

        {/* BODY FEATURES SHAPES */}
        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <h4 className="font-mono text-sm font-bold text-indigo-800 mb-4">🦴 Body Features — Shapes & Structure</h4>

          {/* NECK & UPPER BODY */}
          <div className="mb-6">
            <h5 className="font-mono text-xs font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Neck & Upper Body</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FaceSelect label="Neck Length" value={data.body?.neckLength} onChange={(e) => update('body', 'neckLength', e.target.value)}
                options={[
                  { value: 'very-short', label: 'Very Short — Almost no neck' },
                  { value: 'short', label: 'Short — Compact' },
                  { value: 'average', label: 'Average' },
                  { value: 'long', label: 'Long — Elegant' },
                  { value: 'very-long', label: 'Very Long — Swan-like' }
                ]} />
              <FaceSelect label="Neck Width" value={data.body?.neckWidth} onChange={(e) => update('body', 'neckWidth', e.target.value)}
                options={[
                  { value: 'thin', label: 'Thin — Slender' },
                  { value: 'average', label: 'Average' },
                  { value: 'thick', label: 'Thick — Muscular/stocky' },
                  { value: 'very-thick', label: 'Very Thick — Bull neck' }
                ]} />
              <FaceSelect label="Neck Shape" value={data.body?.neckShape} onChange={(e) => update('body', 'neckShape', e.target.value)}
                options={[
                  { value: 'straight', label: 'Straight — Vertical' },
                  { value: 'curved', label: 'Curved — Graceful arch' },
                  { value: 'muscular', label: 'Muscular — Defined tendons' },
                  { value: 'veiny', label: 'Veiny — Visible veins' },
                  { value: 'smooth', label: 'Smooth — No definition' }
                ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FaceSelect label="Adam's Apple" value={data.body?.adamsApple} onChange={(e) => update('body', 'adamsApple', e.target.value)}
                options={[
                  { value: 'not-visible', label: 'Not Visible' },
                  { value: 'subtle', label: 'Subtle — Barely noticeable' },
                  { value: 'moderate', label: 'Moderate — Visible' },
                  { value: 'prominent', label: 'Prominent — Very noticeable' }
                ]} />
              <FaceSelect label="Clavicle/Collarbone" value={data.body?.clavicle} onChange={(e) => update('body', 'clavicle', e.target.value)}
                options={[
                  { value: 'not-visible', label: 'Not Visible — Hidden' },
                  { value: 'subtle', label: 'Subtle — Slight definition' },
                  { value: 'visible', label: 'Visible — Clear outline' },
                  { value: 'prominent', label: 'Prominent — Very defined' },
                  { value: 'protruding', label: 'Protruding — Strongly visible' }
                ]} />
              <FaceSelect label="Shoulder Shape" value={data.body?.shoulderShape} onChange={(e) => update('body', 'shoulderShape', e.target.value)}
                options={[
                  { value: 'narrow-sloped', label: 'Narrow & Sloped' },
                  { value: 'sloped', label: 'Sloped — Downward angle' },
                  { value: 'rounded', label: 'Rounded — Soft curves' },
                  { value: 'square', label: 'Square — Angular, straight' },
                  { value: 'broad-square', label: 'Broad & Square' },
                  { value: 'athletic', label: 'Athletic — Defined deltoids' },
                  { value: 'bony', label: 'Bony — Prominent bones' },
                  { value: 'padded', label: 'Padded — Soft, rounded' }
                ]} />
            </div>
          </div>

          {/* BACK & TORSO */}
          <div className="mb-6">
            <h5 className="font-mono text-xs font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Back & Torso</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FaceSelect label="Back Width" value={data.body?.backWidth} onChange={(e) => update('body', 'backWidth', e.target.value)}
                options={[
                  { value: 'narrow', label: 'Narrow — Slim back' },
                  { value: 'average', label: 'Average' },
                  { value: 'wide', label: 'Wide — Broad back' },
                  { value: 'very-wide', label: 'Very Wide — V-taper' }
                ]} />
              <FaceSelect label="Back Shape" value={data.body?.backShape} onChange={(e) => update('body', 'backShape', e.target.value)}
                options={[
                  { value: 'flat', label: 'Flat — No curve' },
                  { value: 'straight', label: 'Straight — Normal alignment' },
                  { value: 'curved', label: 'Curved — Natural S-curve' },
                  { value: 'muscular', label: 'Muscular — Defined muscles' },
                  { value: 'rounded', label: 'Rounded — Soft, curved' },
                  { value: 'swayback', label: 'Swayback — Lordosis' },
                  { value: 'hunched', label: 'Hunched — Kyphosis' }
                ]} />
              <FaceSelect label="Spine Visibility" value={data.body?.spineVisibility} onChange={(e) => update('body', 'spineVisibility', e.target.value)}
                options={[
                  { value: 'not-visible', label: 'Not Visible' },
                  { value: 'subtle', label: 'Subtle — Slight ridge' },
                  { value: 'visible', label: 'Visible — Can trace' },
                  { value: 'prominent', label: 'Prominent — Very defined' }
                ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FaceSelect label="Ribcage" value={data.body?.ribcage} onChange={(e) => update('body', 'ribcage', e.target.value)}
                options={[
                  { value: 'not-visible', label: 'Not Visible — Covered' },
                  { value: 'subtle', label: 'Subtle — Slight outline' },
                  { value: 'visible', label: 'Visible — Can count ribs' },
                  { value: 'prominent', label: 'Prominent — Very defined' },
                  { value: 'barrel', label: 'Barrel — Wide, rounded' }
                ]} />
              <FaceSelect label="Waist Shape" value={data.body?.waistShape} onChange={(e) => update('body', 'waistShape', e.target.value)}
                options={[
                  { value: 'straight', label: 'Straight — No curve in' },
                  { value: 'slight-curve', label: 'Slight Curve — Subtle indent' },
                  { value: 'defined', label: 'Defined — Clear waistline' },
                  { value: 'cinched', label: 'Cinched — Very narrow' },
                  { value: 'blocky', label: 'Blocky — No definition' }
                ]} />
              <FaceSelect label="Hip Shape" value={data.body?.hipShape} onChange={(e) => update('body', 'hipShape', e.target.value)}
                options={[
                  { value: 'narrow', label: 'Narrow — Straight' },
                  { value: 'straight', label: 'Straight — Minimal curve' },
                  { value: 'average', label: 'Average' },
                  { value: 'curved', label: 'Curved — Noticeable flare' },
                  { value: 'wide', label: 'Wide — Prominent hips' },
                  { value: 'very-wide', label: 'Very Wide — Full hips' },
                  { value: 'high', label: 'High Hips — Up on waist' },
                  { value: 'low', label: 'Low Hips — Below waist' }
                ]} />
            </div>
          </div>

          {/* ARMS DETAILED */}
          <div className="mb-6">
            <h5 className="font-mono text-xs font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Arms — Detailed</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FaceSelect label="Upper Arm Shape" value={data.body?.upperArmShape} onChange={(e) => update('body', 'upperArmShape', e.target.value)}
                options={[
                  { value: 'thin', label: 'Thin — Little mass' },
                  { value: 'slender', label: 'Slender — Slim' },
                  { value: 'average', label: 'Average' },
                  { value: 'toned', label: 'Toned — Defined' },
                  { value: 'muscular', label: 'Muscular — Bicep visible' },
                  { value: 'very-muscular', label: 'Very Muscular — Large' },
                  { value: 'soft', label: 'Soft — Rounded, untoned' }
                ]} />
              <FaceSelect label="Forearm Shape" value={data.body?.forearmShape} onChange={(e) => update('body', 'forearmShape', e.target.value)}
                options={[
                  { value: 'thin', label: 'Thin — Delicate' },
                  { value: 'slender', label: 'Slender' },
                  { value: 'average', label: 'Average' },
                  { value: 'defined', label: 'Defined — Visible muscles' },
                  { value: 'muscular', label: 'Muscular — Strong' },
                  { value: 'veiny', label: 'Veiny — Visible veins' }
                ]} />
              <FaceSelect label="Elbow" value={data.body?.elbowShape} onChange={(e) => update('body', 'elbowShape', e.target.value)}
                options={[
                  { value: 'smooth', label: 'Smooth — Not prominent' },
                  { value: 'average', label: 'Average' },
                  { value: 'bony', label: 'Bony — Prominent' },
                  { value: 'dimpled', label: 'Dimpled — Soft indents' }
                ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FaceSelect label="Wrist Size" value={data.body?.wristSize} onChange={(e) => update('body', 'wristSize', e.target.value)}
                options={[
                  { value: 'very-thin', label: 'Very Thin — Delicate' },
                  { value: 'thin', label: 'Thin' },
                  { value: 'average', label: 'Average' },
                  { value: 'thick', label: 'Thick' },
                  { value: 'very-thick', label: 'Very Thick' }
                ]} />
              <FaceSelect label="Wrist Bones" value={data.body?.wristBones} onChange={(e) => update('body', 'wristBones', e.target.value)}
                options={[
                  { value: 'not-visible', label: 'Not Visible' },
                  { value: 'subtle', label: 'Subtle' },
                  { value: 'visible', label: 'Visible — Can see bone' },
                  { value: 'prominent', label: 'Prominent — Very bony' }
                ]} />
              <FaceSelect label="Finger Shape" value={data.body?.fingerShape} onChange={(e) => update('body', 'fingerShape', e.target.value)}
                options={[
                  { value: 'short-stubby', label: 'Short & Stubby' },
                  { value: 'short', label: 'Short' },
                  { value: 'average', label: 'Average' },
                  { value: 'long', label: 'Long' },
                  { value: 'long-slender', label: 'Long & Slender — Elegant' },
                  { value: 'thick', label: 'Thick — Wide fingers' },
                  { value: 'tapered', label: 'Tapered — Thin at tips' },
                  { value: 'knobby', label: 'Knobby — Prominent knuckles' }
                ]} />
            </div>
          </div>

          {/* LEGS DETAILED */}
          <div className="mb-6">
            <h5 className="font-mono text-xs font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Legs — Detailed</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FaceSelect label="Thigh Shape" value={data.body?.thighShape} onChange={(e) => update('body', 'thighShape', e.target.value)}
                options={[
                  { value: 'thin', label: 'Thin — Gap between' },
                  { value: 'slender', label: 'Slender — Slim' },
                  { value: 'average', label: 'Average' },
                  { value: 'athletic', label: 'Athletic — Toned' },
                  { value: 'muscular', label: 'Muscular — Defined quads' },
                  { value: 'thick', label: 'Thick — Full' },
                  { value: 'very-thick', label: 'Very Thick — Touch together' },
                  { value: 'soft', label: 'Soft — Rounded, untoned' }
                ]} />
              <FaceSelect label="Thigh Gap" value={data.body?.thighGap} onChange={(e) => update('body', 'thighGap', e.target.value)}
                options={[
                  { value: 'none', label: 'None — Thighs touch' },
                  { value: 'minimal', label: 'Minimal — Small space' },
                  { value: 'moderate', label: 'Moderate — Clear gap' },
                  { value: 'wide', label: 'Wide Gap' }
                ]} />
              <FaceSelect label="Knee Shape" value={data.body?.kneeShape} onChange={(e) => update('body', 'kneeShape', e.target.value)}
                options={[
                  { value: 'smooth', label: 'Smooth — Rounded' },
                  { value: 'average', label: 'Average' },
                  { value: 'bony', label: 'Bony — Prominent kneecap' },
                  { value: 'dimpled', label: 'Dimpled' },
                  { value: 'knobby', label: 'Knobby — Very bony' }
                ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FaceSelect label="Calf Shape" value={data.body?.calfShape} onChange={(e) => update('body', 'calfShape', e.target.value)}
                options={[
                  { value: 'thin', label: 'Thin — Little definition' },
                  { value: 'slender', label: 'Slender' },
                  { value: 'average', label: 'Average' },
                  { value: 'athletic', label: 'Athletic — Defined' },
                  { value: 'muscular', label: 'Muscular — Well-developed' },
                  { value: 'thick', label: 'Thick — Full' },
                  { value: 'diamond', label: 'Diamond — High, defined' }
                ]} />
              <FaceSelect label="Ankle Size" value={data.body?.ankleSize} onChange={(e) => update('body', 'ankleSize', e.target.value)}
                options={[
                  { value: 'very-thin', label: 'Very Thin — Delicate' },
                  { value: 'thin', label: 'Thin' },
                  { value: 'average', label: 'Average' },
                  { value: 'thick', label: 'Thick' },
                  { value: 'cankles', label: 'Cankles — No definition' }
                ]} />
              <FaceSelect label="Ankle Bones" value={data.body?.ankleBones} onChange={(e) => update('body', 'ankleBones', e.target.value)}
                options={[
                  { value: 'not-visible', label: 'Not Visible' },
                  { value: 'subtle', label: 'Subtle' },
                  { value: 'visible', label: 'Visible' },
                  { value: 'prominent', label: 'Prominent — Very bony' }
                ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FaceSelect label="Leg Alignment" value={data.body?.legAlignment} onChange={(e) => update('body', 'legAlignment', e.target.value)}
                options={[
                  { value: 'straight', label: 'Straight — Normal alignment' },
                  { value: 'bow-legged', label: 'Bow-Legged — Curve outward' },
                  { value: 'knock-kneed', label: 'Knock-Kneed — Knees inward' }
                ]} />
              <FaceSelect label="Foot Arch" value={data.body?.footArch} onChange={(e) => update('body', 'footArch', e.target.value)}
                options={[
                  { value: 'flat', label: 'Flat Feet — No arch' },
                  { value: 'low', label: 'Low Arch' },
                  { value: 'normal', label: 'Normal Arch' },
                  { value: 'high', label: 'High Arch' },
                  { value: 'very-high', label: 'Very High Arch' }
                ]} />
              <FaceSelect label="Toe Shape" value={data.body?.toeShape} onChange={(e) => update('body', 'toeShape', e.target.value)}
                options={[
                  { value: 'egyptian', label: 'Egyptian — Big toe longest' },
                  { value: 'roman', label: 'Roman — First 3 same length' },
                  { value: 'greek', label: 'Greek — Second toe longest' },
                  { value: 'germanic', label: 'Germanic — Big toe, others same' },
                  { value: 'celtic', label: 'Celtic — Second toe longest, others vary' }
                ]} />
            </div>
          </div>

          {/* NAILS */}
          <div>
            <h5 className="font-mono text-xs font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">Nails</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FaceSelect label="Nail Shape (Hands)" value={data.body?.nailShapeHands} onChange={(e) => update('body', 'nailShapeHands', e.target.value)}
                options={[
                  { value: 'round', label: 'Round' },
                  { value: 'oval', label: 'Oval' },
                  { value: 'square', label: 'Square' },
                  { value: 'squoval', label: 'Squoval — Square + Oval' },
                  { value: 'almond', label: 'Almond' },
                  { value: 'stiletto', label: 'Stiletto — Pointed' },
                  { value: 'coffin', label: 'Coffin/Ballerina' },
                  { value: 'natural', label: 'Natural — Unmanicured' }
                ]} />
              <FaceSelect label="Nail Length" value={data.body?.nailLength} onChange={(e) => update('body', 'nailLength', e.target.value)}
                options={[
                  { value: 'bitten', label: 'Bitten — Very short' },
                  { value: 'very-short', label: 'Very Short — Below fingertip' },
                  { value: 'short', label: 'Short — At fingertip' },
                  { value: 'medium', label: 'Medium — Past fingertip' },
                  { value: 'long', label: 'Long' },
                  { value: 'very-long', label: 'Very Long — Talons' }
                ]} />
              <FaceSelect label="Nail Condition" value={data.body?.nailCondition} onChange={(e) => update('body', 'nailCondition', e.target.value)}
                options={[
                  { value: 'perfect', label: 'Perfect — Manicured' },
                  { value: 'healthy', label: 'Healthy — Good condition' },
                  { value: 'average', label: 'Average' },
                  { value: 'rough', label: 'Rough — Need care' },
                  { value: 'bitten', label: 'Bitten — Damaged' },
                  { value: 'painted', label: 'Painted/Polished' },
                  { value: 'artificial', label: 'Artificial/Acrylics' }
                ]} />
            </div>
          </div>
        </div>

        {/* ADULT-ONLY DETAILED SECTIONS */}
        {isAdult && (
          <>
            {/* DETAILED MEASUREMENTS - ADULTS ONLY */}
            <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
              <h4 className="font-mono text-sm font-bold text-rose-800 mb-2">📊 Detailed Physique</h4>
              <p className="font-mono text-[10px] text-rose-600 mb-4">Detailed body characteristics for adult characters (18+).</p>

              {isFemale && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FaceSelect label="Bust Size" value={data.body?.bustSize} onChange={(e) => update('body', 'bustSize', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat — Very small/none' },
                        { value: 'very-small', label: 'Very Small — A cup' },
                        { value: 'small', label: 'Small — B cup' },
                        { value: 'medium', label: 'Medium — C cup' },
                        { value: 'large', label: 'Large — D cup' },
                        { value: 'very-large', label: 'Very Large — DD+ cup' },
                        { value: 'extremely-large', label: 'Extremely Large — G+ cup' }
                      ]} />
                    <FaceSelect label="Bust Shape" value={data.body?.bustShape} onChange={(e) => update('body', 'bustShape', e.target.value)}
                      options={[
                        { value: 'round', label: 'Round — Full and circular' },
                        { value: 'teardrop', label: 'Teardrop — Full at bottom' },
                        { value: 'athletic', label: 'Athletic — Firm, compact' },
                        { value: 'wide-set', label: 'Wide-Set — Space between' },
                        { value: 'close-set', label: 'Close-Set — Together' },
                        { value: 'side-set', label: 'Side-Set — Point outward' },
                        { value: 'east-west', label: 'East-West — Point sideways' },
                        { value: 'pendulous', label: 'Pendulous — Relaxed hang' }
                      ]} />
                    <FaceSelect label="Buttocks" value={data.body?.buttocks} onChange={(e) => update('body', 'buttocks', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat — Minimal projection' },
                        { value: 'small', label: 'Small — Subtle' },
                        { value: 'average', label: 'Average' },
                        { value: 'round', label: 'Round — Full and curved' },
                        { value: 'bubble', label: 'Bubble — Very round, prominent' },
                        { value: 'heart', label: 'Heart-Shaped — Wide at top' },
                        { value: 'square', label: 'Square — More angular' },
                        { value: 'large', label: 'Large — Full figured' }
                      ]} />
                  </div>
                </div>
              )}

              {isMale && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FaceSelect label="Chest" value={data.body?.chestMale} onChange={(e) => update('body', 'chestMale', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat — Thin' },
                        { value: 'slim', label: 'Slim — Little definition' },
                        { value: 'average', label: 'Average' },
                        { value: 'defined', label: 'Defined — Visible pecs' },
                        { value: 'muscular', label: 'Muscular — Well-developed' },
                        { value: 'very-muscular', label: 'Very Muscular — Large pecs' },
                        { value: 'barrel', label: 'Barrel — Wide, round' }
                      ]} />
                    <FaceSelect label="Abdomen" value={data.body?.abdomen} onChange={(e) => update('body', 'abdomen', e.target.value)}
                      options={[
                        { value: 'concave', label: 'Concave — Sunken in' },
                        { value: 'flat', label: 'Flat — No belly' },
                        { value: 'toned', label: 'Toned — Slight definition' },
                        { value: 'six-pack', label: 'Six-Pack — Visible abs' },
                        { value: 'eight-pack', label: 'Eight-Pack — Extreme definition' },
                        { value: 'soft', label: 'Soft — Some belly' },
                        { value: 'beer-belly', label: 'Beer Belly — Round stomach' },
                        { value: 'large-belly', label: 'Large Belly — Prominent' }
                      ]} />
                    <FaceSelect label="Buttocks" value={data.body?.buttocksMale} onChange={(e) => update('body', 'buttocksMale', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat — Minimal' },
                        { value: 'small', label: 'Small' },
                        { value: 'average', label: 'Average' },
                        { value: 'athletic', label: 'Athletic — Firm, toned' },
                        { value: 'muscular', label: 'Muscular — Well-developed' },
                        { value: 'round', label: 'Round — Full' },
                        { value: 'large', label: 'Large' }
                      ]} />
                  </div>
                </div>
              )}

              {isNonBinary && (
                <div className="space-y-4">
                  <p className="font-mono text-[10px] text-gray-500 mb-2">Select the options that apply to your character's physique:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FaceSelect label="Chest" value={data.body?.chestNB} onChange={(e) => update('body', 'chestNB', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat' },
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' },
                        { value: 'muscular', label: 'Muscular' },
                        { value: 'bound', label: 'Bound/Compressed' }
                      ]} />
                    <FaceSelect label="Abdomen" value={data.body?.abdomenNB} onChange={(e) => update('body', 'abdomenNB', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat' },
                        { value: 'toned', label: 'Toned' },
                        { value: 'soft', label: 'Soft' },
                        { value: 'round', label: 'Round' }
                      ]} />
                    <FaceSelect label="Buttocks" value={data.body?.buttocksNB} onChange={(e) => update('body', 'buttocksNB', e.target.value)}
                      options={[
                        { value: 'flat', label: 'Flat' },
                        { value: 'small', label: 'Small' },
                        { value: 'average', label: 'Average' },
                        { value: 'round', label: 'Round' },
                        { value: 'large', label: 'Large' }
                      ]} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* POSTURE & MOVEMENT */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-4">🚶 Posture & Movement</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Posture" value={data.body?.posture} onChange={(e) => update('body', 'posture', e.target.value)}
              options={[
                { value: 'perfect', label: 'Perfect — Military straight' },
                { value: 'excellent', label: 'Excellent — Very upright' },
                { value: 'good', label: 'Good — Generally straight' },
                { value: 'average', label: 'Average — Slight slouch' },
                { value: 'poor', label: 'Poor — Noticeable slouch' },
                { value: 'hunched', label: 'Hunched — Curved spine' },
                { value: 'slouched', label: 'Slouched — Relaxed, lazy' },
                { value: 'rigid', label: 'Rigid — Tense, stiff' },
                { value: 'relaxed', label: 'Relaxed — Loose, casual' }
              ]} />
            <FaceSelect label="Gait Style" value={data.body?.gaitStyle} onChange={(e) => update('body', 'gaitStyle', e.target.value)}
              options={[
                { value: 'confident', label: 'Confident — Sure, purposeful' },
                { value: 'graceful', label: 'Graceful — Elegant, flowing' },
                { value: 'athletic', label: 'Athletic — Bouncy, energetic' },
                { value: 'casual', label: 'Casual — Relaxed, easy' },
                { value: 'hurried', label: 'Hurried — Fast, rushed' },
                { value: 'slow', label: 'Slow — Deliberate, unhurried' },
                { value: 'shuffle', label: 'Shuffle — Dragging feet' },
                { value: 'swagger', label: 'Swagger — Cocky, rolling' },
                { value: 'sway', label: 'Sway — Hips move noticeably' },
                { value: 'stomp', label: 'Stomp — Heavy footfalls' },
                { value: 'light', label: 'Light — Quiet, soft steps' },
                { value: 'limp', label: 'Limp — Favoring one side' },
                { value: 'military', label: 'Military — Precise, measured' },
                { value: 'nervous', label: 'Nervous — Twitchy, hesitant' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="General Presence" value={data.body?.presence} onChange={(e) => update('body', 'presence', e.target.value)}
              options={[
                { value: 'commanding', label: 'Commanding — Demands attention' },
                { value: 'intimidating', label: 'Intimidating — Scary, imposing' },
                { value: 'authoritative', label: 'Authoritative — Leader-like' },
                { value: 'confident', label: 'Confident — Self-assured' },
                { value: 'average', label: 'Average — Unremarkable' },
                { value: 'unassuming', label: 'Unassuming — Easily overlooked' },
                { value: 'nervous', label: 'Nervous — Anxious energy' },
                { value: 'graceful', label: 'Graceful — Elegant, poised' },
                { value: 'awkward', label: 'Awkward — Clumsy, uncomfortable' },
                { value: 'relaxed', label: 'Relaxed — At ease' },
                { value: 'mysterious', label: 'Mysterious — Hard to read' }
              ]} />
            <FaceInput label="Movement Notes" value={data.body?.movementNotes} onChange={(e) => update('body', 'movementNotes', e.target.value)}
              placeholder="Any other details about how they move, stand, or carry themselves..." />
          </div>
        </div>

        {/* PHYSICAL CONDITION */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-4">💪 Physical Condition</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Fitness Level" value={data.body?.fitnessLevel} onChange={(e) => update('body', 'fitnessLevel', e.target.value)}
              options={[
                { value: 'sedentary', label: 'Sedentary — No exercise' },
                { value: 'low', label: 'Low — Minimal activity' },
                { value: 'moderate', label: 'Moderate — Some exercise' },
                { value: 'fit', label: 'Fit — Regular exercise' },
                { value: 'athletic', label: 'Athletic — Very active' },
                { value: 'elite', label: 'Elite — Peak condition' }
              ]} />
            <FaceSelect label="Flexibility" value={data.body?.flexibility} onChange={(e) => update('body', 'flexibility', e.target.value)}
              options={[
                { value: 'very-stiff', label: 'Very Stiff — Limited range' },
                { value: 'stiff', label: 'Stiff — Below average' },
                { value: 'average', label: 'Average' },
                { value: 'flexible', label: 'Flexible — Good range' },
                { value: 'very-flexible', label: 'Very Flexible — Dancer-like' },
                { value: 'contortionist', label: 'Contortionist — Extreme' }
              ]} />
            <FaceSelect label="Stamina" value={data.body?.stamina} onChange={(e) => update('body', 'stamina', e.target.value)}
              options={[
                { value: 'very-low', label: 'Very Low — Tires quickly' },
                { value: 'low', label: 'Low — Limited endurance' },
                { value: 'average', label: 'Average' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'high', label: 'High — Very enduring' },
                { value: 'exceptional', label: 'Exceptional — Marathon level' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Physical Disabilities/Conditions" value={data.body?.disabilities} onChange={(e) => update('body', 'disabilities', e.target.value)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'mobility', label: 'Mobility impairment' },
                { value: 'amputee', label: 'Amputee' },
                { value: 'chronic-pain', label: 'Chronic pain' },
                { value: 'chronic-illness', label: 'Chronic illness' },
                { value: 'visual', label: 'Visual impairment' },
                { value: 'hearing', label: 'Hearing impairment' },
                { value: 'prosthetic', label: 'Uses prosthetic' },
                { value: 'wheelchair', label: 'Uses wheelchair' },
                { value: 'cane-walker', label: 'Uses cane/walker' },
                { value: 'other', label: 'Other (describe in notes)' }
              ]} />
            <FaceInput label="Physical Notes" value={data.body?.physicalNotes} onChange={(e) => update('body', 'physicalNotes', e.target.value)}
              placeholder="Any other physical details, conditions, or notable features..." />
          </div>
        </div>
      </div>
    ),

    3: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">STYLE & PRESENTATION — Complete</h3>
          <p className="font-mono text-xs text-purple-700">How the character presents themselves through fashion, grooming, accessories, and personal style choices.</p>
        </div>

        {/* FASHION STYLE */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">👗 Fashion & Clothing Style</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Primary Fashion Style" value={data.style?.fashionStyle} onChange={(e) => update('style', 'fashionStyle', e.target.value)}
              options={[
                { value: 'casual', label: 'Casual — Relaxed, everyday wear' },
                { value: 'smart-casual', label: 'Smart Casual — Polished but relaxed' },
                { value: 'business-casual', label: 'Business Casual — Office appropriate' },
                { value: 'business-formal', label: 'Business Formal — Professional suits' },
                { value: 'formal', label: 'Formal — Black tie, evening wear' },
                { value: 'streetwear', label: 'Streetwear — Urban, trendy brands' },
                { value: 'athleisure', label: 'Athleisure — Sporty meets casual' },
                { value: 'athletic', label: 'Athletic — Sports/workout focused' },
                { value: 'minimalist', label: 'Minimalist — Clean, simple lines' },
                { value: 'maximalist', label: 'Maximalist — Bold, layered, statement' },
                { value: 'bohemian', label: 'Bohemian/Boho — Free-spirited, flowy' },
                { value: 'hippie', label: 'Hippie — 60s/70s inspired, natural' },
                { value: 'vintage', label: 'Vintage — Retro, thrift-inspired' },
                { value: 'retro', label: 'Retro — Specific era inspired' },
                { value: 'classic', label: 'Classic — Timeless, traditional' },
                { value: 'preppy', label: 'Preppy — Collegiate, polished' },
                { value: 'ivy-league', label: 'Ivy League — Academic, refined' },
                { value: 'punk', label: 'Punk — Rebellious, DIY, edgy' },
                { value: 'goth', label: 'Goth — Dark, dramatic, romantic' },
                { value: 'emo', label: 'Emo — Emotional, dark, expressive' },
                { value: 'grunge', label: 'Grunge — 90s, worn, layered' },
                { value: 'rock', label: 'Rock/Rocker — Band tees, leather' },
                { value: 'metal', label: 'Metal — Heavy metal aesthetic' },
                { value: 'hip-hop', label: 'Hip-Hop — Urban, branded, bold' },
                { value: 'skater', label: 'Skater — Skate brands, relaxed' },
                { value: 'surfer', label: 'Surfer — Beach-inspired, casual' },
                { value: 'cottagecore', label: 'Cottagecore — Rural, romantic, soft' },
                { value: 'dark-academia', label: 'Dark Academia — Scholarly, moody' },
                { value: 'light-academia', label: 'Light Academia — Scholarly, warm' },
                { value: 'e-girl-boy', label: 'E-Girl/E-Boy — Internet-inspired' },
                { value: 'soft-girl-boy', label: 'Soft Girl/Boy — Pastel, cute' },
                { value: 'kawaii', label: 'Kawaii — Japanese cute culture' },
                { value: 'harajuku', label: 'Harajuku — Japanese street fashion' },
                { value: 'lolita', label: 'Lolita — Victorian-inspired Japanese' },
                { value: 'visual-kei', label: 'Visual Kei — Japanese rock fashion' },
                { value: 'techwear', label: 'Techwear — Functional, futuristic' },
                { value: 'cyberpunk', label: 'Cyberpunk — Dystopian, tech-inspired' },
                { value: 'steampunk', label: 'Steampunk — Victorian + industrial' },
                { value: 'western', label: 'Western/Cowboy — Country, rustic' },
                { value: 'workwear', label: 'Workwear — Durable, practical' },
                { value: 'military', label: 'Military — Army-inspired' },
                { value: 'nautical', label: 'Nautical — Sailor-inspired' },
                { value: 'safari', label: 'Safari — Explorer, utilitarian' },
                { value: 'glamorous', label: 'Glamorous — Luxurious, showy' },
                { value: 'haute-couture', label: 'Haute Couture — High fashion' },
                { value: 'avant-garde', label: 'Avant-Garde — Experimental, artistic' },
                { value: 'androgynous', label: 'Androgynous — Gender-neutral' },
                { value: 'modest', label: 'Modest — Conservative, covered' },
                { value: 'eclectic', label: 'Eclectic — Mixed styles' },
                { value: 'normcore', label: 'Normcore — Intentionally plain' },
                { value: 'old-money', label: 'Old Money — Quiet luxury, understated' },
                { value: 'new-money', label: 'New Money — Flashy, branded' }
              ]} />
            <FaceSelect label="Secondary Style" value={data.style?.secondaryStyle} onChange={(e) => update('style', 'secondaryStyle', e.target.value)}
              options={[
                { value: '', label: '— None / Same as primary —' },
                { value: 'casual', label: 'Casual' },
                { value: 'formal', label: 'Formal' },
                { value: 'streetwear', label: 'Streetwear' },
                { value: 'athleisure', label: 'Athleisure' },
                { value: 'bohemian', label: 'Bohemian' },
                { value: 'vintage', label: 'Vintage' },
                { value: 'minimalist', label: 'Minimalist' },
                { value: 'preppy', label: 'Preppy' },
                { value: 'punk', label: 'Punk' },
                { value: 'goth', label: 'Goth' },
                { value: 'grunge', label: 'Grunge' },
                { value: 'glamorous', label: 'Glamorous' },
                { value: 'eclectic', label: 'Eclectic' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Style Era Preference" value={data.style?.styleEra} onChange={(e) => update('style', 'styleEra', e.target.value)}
              options={[
                { value: 'contemporary', label: 'Contemporary — Current trends' },
                { value: '2010s', label: '2010s — Recent past' },
                { value: '2000s', label: '2000s — Y2K aesthetic' },
                { value: '1990s', label: '1990s — Grunge, minimalism' },
                { value: '1980s', label: '1980s — Bold, colorful, power' },
                { value: '1970s', label: '1970s — Disco, bohemian' },
                { value: '1960s', label: '1960s — Mod, hippie' },
                { value: '1950s', label: '1950s — Classic, polished' },
                { value: '1940s', label: '1940s — Wartime elegance' },
                { value: '1930s', label: '1930s — Hollywood glamour' },
                { value: '1920s', label: '1920s — Flapper, art deco' },
                { value: 'victorian', label: 'Victorian — 19th century' },
                { value: 'medieval', label: 'Medieval — Historical' },
                { value: 'timeless', label: 'Timeless — Classic, no era' },
                { value: 'futuristic', label: 'Futuristic — Ahead of time' }
              ]} />
            <FaceSelect label="Fashion Priority" value={data.style?.fashionPriority} onChange={(e) => update('style', 'fashionPriority', e.target.value)}
              options={[
                { value: 'comfort', label: 'Comfort — Above all else' },
                { value: 'function', label: 'Function — Practical needs' },
                { value: 'style', label: 'Style — Looking good' },
                { value: 'impression', label: 'Impression — What others think' },
                { value: 'expression', label: 'Expression — Self-identity' },
                { value: 'blend-in', label: 'Blend In — Not standing out' },
                { value: 'stand-out', label: 'Stand Out — Being noticed' },
                { value: 'tradition', label: 'Tradition — Cultural norms' },
                { value: 'rebellion', label: 'Rebellion — Against norms' },
                { value: 'budget', label: 'Budget — Cost-conscious' }
              ]} />
            <FaceSelect label="Clothing Fit Preference" value={data.style?.clothingFit} onChange={(e) => update('style', 'clothingFit', e.target.value)}
              options={[
                { value: 'skin-tight', label: 'Skin-Tight — Very fitted' },
                { value: 'fitted', label: 'Fitted — Tailored, close' },
                { value: 'slim', label: 'Slim — Modern fit' },
                { value: 'regular', label: 'Regular — Standard fit' },
                { value: 'relaxed', label: 'Relaxed — Comfortable room' },
                { value: 'loose', label: 'Loose — Baggy, roomy' },
                { value: 'oversized', label: 'Oversized — Intentionally big' },
                { value: 'varied', label: 'Varied — Depends on item' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Clothing Quality" value={data.style?.clothingQuality} onChange={(e) => update('style', 'clothingQuality', e.target.value)}
              options={[
                { value: 'luxury', label: 'Luxury — Designer, high-end' },
                { value: 'premium', label: 'Premium — Quality brands' },
                { value: 'mid-range', label: 'Mid-Range — Standard brands' },
                { value: 'budget', label: 'Budget — Affordable options' },
                { value: 'thrift', label: 'Thrift — Secondhand, vintage' },
                { value: 'mixed', label: 'Mixed — Varies widely' },
                { value: 'handmade', label: 'Handmade — DIY, custom' }
              ]} />
            <FaceSelect label="Clothing Condition" value={data.style?.clothingCondition} onChange={(e) => update('style', 'clothingCondition', e.target.value)}
              options={[
                { value: 'pristine', label: 'Pristine — Perfect, new' },
                { value: 'well-kept', label: 'Well-Kept — Good condition' },
                { value: 'average', label: 'Average — Normal wear' },
                { value: 'worn', label: 'Worn — Visible use' },
                { value: 'distressed', label: 'Distressed — Intentionally worn' },
                { value: 'shabby', label: 'Shabby — Poor condition' },
                { value: 'tattered', label: 'Tattered — Very worn' }
              ]} />
          </div>
        </div>

        {/* COLOR PALETTE */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-4">🎨 Color Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Primary Color Palette" value={data.style?.colorPalette} onChange={(e) => update('style', 'colorPalette', e.target.value)}
              options={[
                { value: 'all-black', label: 'All Black — Monochrome dark' },
                { value: 'all-white', label: 'All White — Monochrome light' },
                { value: 'monochrome', label: 'Monochrome — One color family' },
                { value: 'neutrals', label: 'Neutrals — Black, white, gray, beige' },
                { value: 'earth-tones', label: 'Earth Tones — Browns, tans, greens' },
                { value: 'pastels', label: 'Pastels — Soft, muted colors' },
                { value: 'jewel-tones', label: 'Jewel Tones — Rich, deep colors' },
                { value: 'neons', label: 'Neons — Bright, fluorescent' },
                { value: 'primary', label: 'Primary Colors — Red, blue, yellow' },
                { value: 'warm', label: 'Warm Colors — Reds, oranges, yellows' },
                { value: 'cool', label: 'Cool Colors — Blues, greens, purples' },
                { value: 'rainbow', label: 'Rainbow — All colors welcome' },
                { value: 'muted', label: 'Muted — Desaturated, soft' },
                { value: 'bold', label: 'Bold — Bright, saturated' },
                { value: 'dark', label: 'Dark — Deep, moody shades' },
                { value: 'light', label: 'Light — Pale, airy shades' }
              ]} />
            <FaceSelect label="Favorite Color to Wear" value={data.style?.favoriteColor} onChange={(e) => update('style', 'favoriteColor', e.target.value)}
              options={[
                { value: 'black', label: 'Black' },
                { value: 'white', label: 'White' },
                { value: 'gray', label: 'Gray' },
                { value: 'navy', label: 'Navy Blue' },
                { value: 'blue', label: 'Blue' },
                { value: 'red', label: 'Red' },
                { value: 'burgundy', label: 'Burgundy' },
                { value: 'pink', label: 'Pink' },
                { value: 'purple', label: 'Purple' },
                { value: 'green', label: 'Green' },
                { value: 'olive', label: 'Olive/Army Green' },
                { value: 'yellow', label: 'Yellow' },
                { value: 'orange', label: 'Orange' },
                { value: 'brown', label: 'Brown' },
                { value: 'tan', label: 'Tan/Beige' },
                { value: 'cream', label: 'Cream/Off-White' },
                { value: 'gold', label: 'Gold' },
                { value: 'silver', label: 'Silver' },
                { value: 'varies', label: 'Varies — No preference' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Pattern Preference" value={data.style?.patternPreference} onChange={(e) => update('style', 'patternPreference', e.target.value)}
              options={[
                { value: 'solid-only', label: 'Solid Colors Only' },
                { value: 'minimal-pattern', label: 'Minimal Patterns' },
                { value: 'stripes', label: 'Stripes' },
                { value: 'plaid', label: 'Plaid/Tartan' },
                { value: 'checks', label: 'Checks/Gingham' },
                { value: 'polka-dots', label: 'Polka Dots' },
                { value: 'floral', label: 'Floral' },
                { value: 'animal-print', label: 'Animal Print' },
                { value: 'geometric', label: 'Geometric' },
                { value: 'abstract', label: 'Abstract' },
                { value: 'camo', label: 'Camouflage' },
                { value: 'graphic', label: 'Graphic Prints' },
                { value: 'paisley', label: 'Paisley' },
                { value: 'tie-dye', label: 'Tie-Dye' },
                { value: 'mixed', label: 'Mixed — Loves patterns' }
              ]} />
            <FaceSelect label="Color Coordination" value={data.style?.colorCoordination} onChange={(e) => update('style', 'colorCoordination', e.target.value)}
              options={[
                { value: 'perfectly-matched', label: 'Perfectly Matched — Always coordinated' },
                { value: 'well-coordinated', label: 'Well Coordinated — Usually matches' },
                { value: 'casual', label: 'Casual — Generally okay' },
                { value: 'uncoordinated', label: 'Uncoordinated — Doesn\'t match' },
                { value: 'intentional-clash', label: 'Intentional Clash — Deliberate mismatch' },
                { value: 'doesnt-care', label: 'Doesn\'t Care — Whatever is clean' }
              ]} />
          </div>
        </div>

        {/* GROOMING & HYGIENE */}
        <div className="border-2 border-fuchsia-200 rounded-sm p-4 bg-fuchsia-50/30">
          <h4 className="font-mono text-sm font-bold text-fuchsia-800 mb-4">🧴 Grooming & Personal Care</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Overall Grooming Level" value={data.style?.groomingLevel} onChange={(e) => update('style', 'groomingLevel', e.target.value)}
              options={[
                { value: 'impeccable', label: 'Impeccable — Flawless, perfect' },
                { value: 'meticulous', label: 'Meticulous — Very careful' },
                { value: 'well-groomed', label: 'Well-Groomed — Put together' },
                { value: 'neat', label: 'Neat — Clean and tidy' },
                { value: 'average', label: 'Average — Acceptable' },
                { value: 'casual', label: 'Casual — Minimal effort' },
                { value: 'messy', label: 'Messy — Disheveled' },
                { value: 'unkempt', label: 'Unkempt — Neglected' },
                { value: 'rugged', label: 'Rugged — Deliberately rough' }
              ]} />
            <FaceSelect label="Hygiene Level" value={data.style?.hygieneLevel} onChange={(e) => update('style', 'hygieneLevel', e.target.value)}
              options={[
                { value: 'obsessive', label: 'Obsessive — Multiple showers/day' },
                { value: 'excellent', label: 'Excellent — Very clean' },
                { value: 'good', label: 'Good — Daily care' },
                { value: 'average', label: 'Average — Acceptable' },
                { value: 'lax', label: 'Lax — Sometimes skips' },
                { value: 'poor', label: 'Poor — Infrequent care' }
              ]} />
            <FaceSelect label="Scent/Fragrance" value={data.style?.fragrance} onChange={(e) => update('style', 'fragrance', e.target.value)}
              options={[
                { value: 'none', label: 'None — Unscented' },
                { value: 'subtle', label: 'Subtle — Light, close range' },
                { value: 'moderate', label: 'Moderate — Noticeable' },
                { value: 'strong', label: 'Strong — Fills the room' },
                { value: 'overpowering', label: 'Overpowering — Too much' },
                { value: 'natural', label: 'Natural — No artificial scent' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Fragrance Type" value={data.style?.fragranceType} onChange={(e) => update('style', 'fragranceType', e.target.value)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'floral', label: 'Floral — Rose, jasmine, etc.' },
                { value: 'woody', label: 'Woody — Cedar, sandalwood' },
                { value: 'fresh', label: 'Fresh — Clean, citrus, aquatic' },
                { value: 'oriental', label: 'Oriental — Spicy, warm' },
                { value: 'musk', label: 'Musk — Earthy, animalistic' },
                { value: 'gourmand', label: 'Gourmand — Sweet, edible' },
                { value: 'leather', label: 'Leather — Rich, dark' },
                { value: 'tobacco', label: 'Tobacco/Smoke — Bold' },
                { value: 'herbal', label: 'Herbal — Natural, green' },
                { value: 'powdery', label: 'Powdery — Soft, delicate' },
                { value: 'varies', label: 'Varies — Changes often' }
              ]} />
            <FaceSelect label="Makeup Usage" value={data.style?.makeupUsage} onChange={(e) => update('style', 'makeupUsage', e.target.value)}
              options={[
                { value: 'none', label: 'None — Never wears' },
                { value: 'rare', label: 'Rare — Special occasions only' },
                { value: 'minimal', label: 'Minimal — Light, natural look' },
                { value: 'everyday', label: 'Everyday — Daily routine' },
                { value: 'moderate', label: 'Moderate — Noticeable makeup' },
                { value: 'full', label: 'Full — Complete face daily' },
                { value: 'dramatic', label: 'Dramatic — Bold, artistic' },
                { value: 'avant-garde', label: 'Avant-Garde — Experimental' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Makeup Style" value={data.style?.makeupStyle} onChange={(e) => update('style', 'makeupStyle', e.target.value)}
              options={[
                { value: 'none', label: 'N/A — No makeup' },
                { value: 'natural', label: 'Natural — Barely there' },
                { value: 'fresh', label: 'Fresh — Dewy, healthy glow' },
                { value: 'classic', label: 'Classic — Timeless, elegant' },
                { value: 'smoky', label: 'Smoky — Dark eyes' },
                { value: 'bold-lip', label: 'Bold Lip — Statement lips' },
                { value: 'colorful', label: 'Colorful — Bright, playful' },
                { value: 'goth', label: 'Goth — Dark, dramatic' },
                { value: 'glam', label: 'Glam — Full, polished' },
                { value: 'editorial', label: 'Editorial — Fashion-forward' },
                { value: 'no-makeup-makeup', label: 'No-Makeup Makeup — Enhanced natural' }
              ]} />
            <FaceSelect label="Skincare Routine" value={data.style?.skincareRoutine} onChange={(e) => update('style', 'skincareRoutine', e.target.value)}
              options={[
                { value: 'none', label: 'None — No routine' },
                { value: 'basic', label: 'Basic — Wash face only' },
                { value: 'simple', label: 'Simple — Cleanser + moisturizer' },
                { value: 'moderate', label: 'Moderate — Several steps' },
                { value: 'extensive', label: 'Extensive — Full routine' },
                { value: 'obsessive', label: 'Obsessive — Many products' },
                { value: 'professional', label: 'Professional — Regular treatments' }
              ]} />
          </div>
        </div>

        {/* ACCESSORIES */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-4">💍 Accessories & Jewelry</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Jewelry Amount" value={data.style?.jewelryAmount} onChange={(e) => update('style', 'jewelryAmount', e.target.value)}
              options={[
                { value: 'none', label: 'None — Never wears' },
                { value: 'minimal', label: 'Minimal — One or two pieces' },
                { value: 'moderate', label: 'Moderate — A few pieces' },
                { value: 'substantial', label: 'Substantial — Multiple items' },
                { value: 'heavy', label: 'Heavy — Lots of jewelry' },
                { value: 'dripping', label: 'Dripping — Covered in bling' }
              ]} />
            <FaceSelect label="Jewelry Style" value={data.style?.jewelryStyle} onChange={(e) => update('style', 'jewelryStyle', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'delicate', label: 'Delicate — Fine, subtle' },
                { value: 'classic', label: 'Classic — Timeless pieces' },
                { value: 'statement', label: 'Statement — Bold, eye-catching' },
                { value: 'bohemian', label: 'Bohemian — Natural, artistic' },
                { value: 'edgy', label: 'Edgy — Spikes, chains, dark' },
                { value: 'vintage', label: 'Vintage — Antique pieces' },
                { value: 'modern', label: 'Modern — Contemporary design' },
                { value: 'luxury', label: 'Luxury — High-end brands' },
                { value: 'handmade', label: 'Handmade — Artisan pieces' },
                { value: 'cultural', label: 'Cultural — Traditional items' },
                { value: 'mixed', label: 'Mixed — Eclectic collection' }
              ]} />
            <FaceSelect label="Jewelry Metal Preference" value={data.style?.jewelryMetal} onChange={(e) => update('style', 'jewelryMetal', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'gold', label: 'Gold — Yellow gold' },
                { value: 'rose-gold', label: 'Rose Gold' },
                { value: 'white-gold', label: 'White Gold' },
                { value: 'silver', label: 'Silver' },
                { value: 'platinum', label: 'Platinum' },
                { value: 'bronze', label: 'Bronze/Copper' },
                { value: 'mixed-metals', label: 'Mixed Metals' },
                { value: 'non-metal', label: 'Non-Metal — Leather, fabric' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Watch" value={data.style?.watch} onChange={(e) => update('style', 'watch', e.target.value)}
              options={[
                { value: 'none', label: 'None — Doesn\'t wear one' },
                { value: 'smart', label: 'Smart Watch — Apple, etc.' },
                { value: 'fitness', label: 'Fitness Tracker' },
                { value: 'digital', label: 'Digital — Basic digital' },
                { value: 'casual', label: 'Casual — Everyday analog' },
                { value: 'dress', label: 'Dress Watch — Elegant, thin' },
                { value: 'sport', label: 'Sport Watch — Durable, active' },
                { value: 'diver', label: 'Diver Watch' },
                { value: 'pilot', label: 'Pilot/Aviation Watch' },
                { value: 'luxury', label: 'Luxury — Rolex, etc.' },
                { value: 'vintage', label: 'Vintage — Antique watch' },
                { value: 'pocket', label: 'Pocket Watch' }
              ]} />
            <FaceSelect label="Eyewear" value={data.style?.eyewear} onChange={(e) => update('style', 'eyewear', e.target.value)}
              options={[
                { value: 'none', label: 'None — Perfect vision' },
                { value: 'prescription', label: 'Prescription Glasses — Needed' },
                { value: 'reading', label: 'Reading Glasses — For close work' },
                { value: 'contacts', label: 'Contact Lenses — Usually' },
                { value: 'fashion', label: 'Fashion Glasses — Non-prescription' },
                { value: 'sunglasses', label: 'Sunglasses — Frequently' },
                { value: 'both', label: 'Both — Glasses and sunglasses' },
                { value: 'monocle', label: 'Monocle — Unusual choice' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FaceSelect label="Glasses Style" value={data.style?.glassesStyle} onChange={(e) => update('style', 'glassesStyle', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'round', label: 'Round' },
                { value: 'square', label: 'Square' },
                { value: 'rectangular', label: 'Rectangular' },
                { value: 'oval', label: 'Oval' },
                { value: 'cat-eye', label: 'Cat-Eye' },
                { value: 'aviator', label: 'Aviator' },
                { value: 'wayfarer', label: 'Wayfarer' },
                { value: 'browline', label: 'Browline/Clubmaster' },
                { value: 'rimless', label: 'Rimless' },
                { value: 'half-rim', label: 'Half-Rim' },
                { value: 'oversized', label: 'Oversized' },
                { value: 'wire-frame', label: 'Wire Frame' },
                { value: 'thick-frame', label: 'Thick Frame' },
                { value: 'geometric', label: 'Geometric/Unusual' }
              ]} />
            <FaceSelect label="Bag/Purse Style" value={data.style?.bagStyle} onChange={(e) => update('style', 'bagStyle', e.target.value)}
              options={[
                { value: 'none', label: 'None — Pockets only' },
                { value: 'backpack', label: 'Backpack' },
                { value: 'messenger', label: 'Messenger Bag' },
                { value: 'briefcase', label: 'Briefcase' },
                { value: 'tote', label: 'Tote Bag' },
                { value: 'crossbody', label: 'Crossbody Bag' },
                { value: 'shoulder', label: 'Shoulder Bag' },
                { value: 'clutch', label: 'Clutch' },
                { value: 'satchel', label: 'Satchel' },
                { value: 'duffle', label: 'Duffle Bag' },
                { value: 'fanny-pack', label: 'Fanny Pack/Belt Bag' },
                { value: 'wallet-only', label: 'Wallet Only' },
                { value: 'designer', label: 'Designer Bag' }
              ]} />
            <FaceSelect label="Hat Wearing" value={data.style?.hatWearing} onChange={(e) => update('style', 'hatWearing', e.target.value)}
              options={[
                { value: 'never', label: 'Never — Hates hats' },
                { value: 'rarely', label: 'Rarely — Only when necessary' },
                { value: 'sometimes', label: 'Sometimes — Occasional' },
                { value: 'often', label: 'Often — Frequently wears' },
                { value: 'always', label: 'Always — Signature look' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Hat Style" value={data.style?.hatStyle} onChange={(e) => update('style', 'hatStyle', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'baseball-cap', label: 'Baseball Cap' },
                { value: 'beanie', label: 'Beanie' },
                { value: 'fedora', label: 'Fedora' },
                { value: 'trilby', label: 'Trilby' },
                { value: 'panama', label: 'Panama Hat' },
                { value: 'bucket', label: 'Bucket Hat' },
                { value: 'beret', label: 'Beret' },
                { value: 'newsboy', label: 'Newsboy/Flat Cap' },
                { value: 'cowboy', label: 'Cowboy Hat' },
                { value: 'top-hat', label: 'Top Hat' },
                { value: 'sun-hat', label: 'Sun Hat/Wide Brim' },
                { value: 'visor', label: 'Visor' },
                { value: 'snapback', label: 'Snapback' },
                { value: 'trucker', label: 'Trucker Hat' },
                { value: 'headscarf', label: 'Headscarf/Bandana' },
                { value: 'turban', label: 'Turban' },
                { value: 'hijab', label: 'Hijab' },
                { value: 'hood', label: 'Hood (from hoodie)' }
              ]} />
            <FaceInput label="Signature Accessories" value={data.style?.signatureAccessories} onChange={(e) => update('style', 'signatureAccessories', e.target.value)}
              placeholder="Items they're rarely seen without (specific ring, necklace, watch, etc.)..." />
          </div>
        </div>

        {/* BODY MODIFICATIONS */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-4">🎨 Body Modifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Tattoo Coverage" value={data.style?.tattooCoverage} onChange={(e) => update('style', 'tattooCoverage', e.target.value)}
              options={[
                { value: 'none', label: 'None — No tattoos' },
                { value: 'single', label: 'Single — One tattoo' },
                { value: 'few-hidden', label: 'Few Hidden — Small, concealed' },
                { value: 'few-visible', label: 'Few Visible — Some showing' },
                { value: 'moderate', label: 'Moderate — Several tattoos' },
                { value: 'sleeve-partial', label: 'Partial Sleeve' },
                { value: 'sleeve-full', label: 'Full Sleeve(s)' },
                { value: 'heavily-tattooed', label: 'Heavily Tattooed — Many visible' },
                { value: 'full-body', label: 'Full Body — Extensive coverage' }
              ]} />
            <FaceSelect label="Tattoo Style" value={data.style?.tattooStyle} onChange={(e) => update('style', 'tattooStyle', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'traditional', label: 'Traditional/Old School — Bold, classic' },
                { value: 'neo-traditional', label: 'Neo-Traditional — Modern classic' },
                { value: 'realistic', label: 'Realistic — Photo-like' },
                { value: 'watercolor', label: 'Watercolor — Painterly, flowing' },
                { value: 'geometric', label: 'Geometric — Shapes, patterns' },
                { value: 'minimalist', label: 'Minimalist — Simple line work' },
                { value: 'blackwork', label: 'Blackwork — Solid black designs' },
                { value: 'tribal', label: 'Tribal — Cultural patterns' },
                { value: 'japanese', label: 'Japanese/Irezumi' },
                { value: 'chicano', label: 'Chicano — Fine line, cultural' },
                { value: 'script', label: 'Script/Lettering — Words, quotes' },
                { value: 'portrait', label: 'Portrait — Faces, figures' },
                { value: 'biomech', label: 'Biomechanical — Machine/organic' },
                { value: 'trash-polka', label: 'Trash Polka — Red/black collage' },
                { value: 'mixed', label: 'Mixed Styles' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="Piercing Amount" value={data.style?.piercingAmount} onChange={(e) => update('style', 'piercingAmount', e.target.value)}
              options={[
                { value: 'none', label: 'None — No piercings' },
                { value: 'single-ear', label: 'Single Ear — One hole' },
                { value: 'both-ears', label: 'Both Ears — Standard lobes' },
                { value: 'multiple-ear', label: 'Multiple Ear — Several per ear' },
                { value: 'few', label: 'Few — Ears plus one other' },
                { value: 'moderate', label: 'Moderate — Several piercings' },
                { value: 'many', label: 'Many — Noticeably pierced' },
                { value: 'extensive', label: 'Extensive — Heavily pierced' }
              ]} />
            <FaceSelect label="Piercing Locations" value={data.style?.piercingLocations} onChange={(e) => update('style', 'piercingLocations', e.target.value)}
              options={[
                { value: 'none', label: 'N/A' },
                { value: 'lobes-only', label: 'Earlobes Only' },
                { value: 'ears-various', label: 'Ears — Various (helix, tragus, etc.)' },
                { value: 'nose', label: 'Nose (nostril or septum)' },
                { value: 'lip', label: 'Lip/Labret' },
                { value: 'eyebrow', label: 'Eyebrow' },
                { value: 'tongue', label: 'Tongue' },
                { value: 'navel', label: 'Navel/Belly Button' },
                { value: 'nipple', label: 'Nipple' },
                { value: 'dermal', label: 'Dermal/Surface' },
                { value: 'multiple-facial', label: 'Multiple Facial' },
                { value: 'multiple-body', label: 'Multiple Body' },
                { value: 'various', label: 'Various Locations' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceInput label="Tattoo Details" value={data.style?.tattooDetails} onChange={(e) => update('style', 'tattooDetails', e.target.value)}
              placeholder="Describe specific tattoos, their locations, and meanings..." />
            <FaceInput label="Piercing Details" value={data.style?.piercingDetails} onChange={(e) => update('style', 'piercingDetails', e.target.value)}
              placeholder="Describe specific piercings and jewelry worn in them..." />
          </div>
        </div>

        {/* OVERALL IMPRESSION */}
        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <h4 className="font-mono text-sm font-bold text-indigo-800 mb-4">✨ Overall Impression</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FaceSelect label="First Impression" value={data.style?.firstImpression} onChange={(e) => update('style', 'firstImpression', e.target.value)}
              options={[
                { value: 'intimidating', label: 'Intimidating — Scary, imposing' },
                { value: 'authoritative', label: 'Authoritative — Commanding' },
                { value: 'professional', label: 'Professional — Business-like' },
                { value: 'sophisticated', label: 'Sophisticated — Refined, elegant' },
                { value: 'approachable', label: 'Approachable — Friendly, warm' },
                { value: 'confident', label: 'Confident — Self-assured' },
                { value: 'cool', label: 'Cool — Effortlessly stylish' },
                { value: 'quirky', label: 'Quirky — Unique, interesting' },
                { value: 'artistic', label: 'Artistic — Creative, expressive' },
                { value: 'casual', label: 'Casual — Relaxed, easy-going' },
                { value: 'mysterious', label: 'Mysterious — Hard to read' },
                { value: 'edgy', label: 'Edgy — Alternative, rebellious' },
                { value: 'innocent', label: 'Innocent — Sweet, youthful' },
                { value: 'seductive', label: 'Seductive — Alluring' },
                { value: 'nerdy', label: 'Nerdy — Geeky, intellectual' },
                { value: 'athletic', label: 'Athletic — Sporty, fit' },
                { value: 'forgettable', label: 'Forgettable — Blends in' },
                { value: 'striking', label: 'Striking — Memorable, stands out' }
              ]} />
            <FaceSelect label="Style Consistency" value={data.style?.styleConsistency} onChange={(e) => update('style', 'styleConsistency', e.target.value)}
              options={[
                { value: 'very-consistent', label: 'Very Consistent — Same look always' },
                { value: 'consistent', label: 'Consistent — Predictable style' },
                { value: 'mostly-consistent', label: 'Mostly Consistent — Small variations' },
                { value: 'varied', label: 'Varied — Changes with mood/occasion' },
                { value: 'unpredictable', label: 'Unpredictable — Always different' },
                { value: 'chameleon', label: 'Chameleon — Adapts to situation' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaceSelect label="Attention to Appearance" value={data.style?.attentionToAppearance} onChange={(e) => update('style', 'attentionToAppearance', e.target.value)}
              options={[
                { value: 'obsessive', label: 'Obsessive — Constantly checking' },
                { value: 'very-high', label: 'Very High — Great care taken' },
                { value: 'high', label: 'High — Important to them' },
                { value: 'moderate', label: 'Moderate — Normal attention' },
                { value: 'low', label: 'Low — Not a priority' },
                { value: 'minimal', label: 'Minimal — Barely thinks about it' },
                { value: 'none', label: 'None — Doesn\'t care at all' }
              ]} />
            <FaceInput label="Style Notes" value={data.style?.styleNotes} onChange={(e) => update('style', 'styleNotes', e.target.value)}
              placeholder="Additional notes about their style, specific items, or how their look changes..." />
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


export default AppearanceContent;
