import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const PhysiqueContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('physique', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // Helper components
  const PhysiqueSelect = ({ label, value, onChange, options }) => (
    <div>
      <label className="block font-mono text-xs font-bold text-stone-700 mb-1">{label}</label>
      <select value={value || ''} onChange={onChange} className="w-full px-3 py-2 border-2 border-stone-300 rounded-sm bg-white font-mono text-xs focus:border-stone-500 focus:outline-none">
        <option value="">-- Select --</option>
        {options.map((opt, i) => typeof opt === 'object'
          ? <option key={i} value={opt.value}>{opt.label}</option>
          : <option key={i} value={opt}>{opt}</option>
        )}
      </select>
    </div>
  );

  const PhysiqueInput = ({ label, value, onChange, placeholder }) => (
    <div>
      <label className="block font-mono text-xs font-bold text-stone-700 mb-1">{label}</label>
      <input type="text" value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 border-2 border-stone-300 rounded-sm font-mono text-xs focus:border-stone-500 focus:outline-none" />
    </div>
  );

  const sections = {
    // ========== SUBTAB 0: PHYSICAL CONDITION ==========
    0: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">PHYSICAL CONDITION — Health & Fitness</h3>
          <p className="font-mono text-xs text-amber-700">Overall physical health, fitness level, and athletic capabilities.</p>
        </div>

        {/* GENERAL HEALTH */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-4">🏥 General Health Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Overall Health" value={data.condition?.generalHealth} onChange={(e) => update('condition', 'generalHealth', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Peak health, rarely ill' },
                { value: 'very-good', label: 'Very Good — Strong health' },
                { value: 'good', label: 'Good — Healthy, occasional issues' },
                { value: 'fair', label: 'Fair — Some health concerns' },
                { value: 'poor', label: 'Poor — Frequent health issues' },
                { value: 'very-poor', label: 'Very Poor — Serious health problems' },
                { value: 'fragile', label: 'Fragile — Delicate constitution' },
                { value: 'chronic', label: 'Chronic Condition — Managed illness' },
                { value: 'terminal', label: 'Terminal — Life-limiting condition' },
                { value: 'recovering', label: 'Recovering — Healing from illness/injury' }
              ]} />
            <PhysiqueSelect label="Immune System" value={data.condition?.immuneSystem} onChange={(e) => update('condition', 'immuneSystem', e.target.value)}
              options={[
                { value: 'iron', label: 'Iron Constitution — Never gets sick' },
                { value: 'strong', label: 'Strong — Rarely gets sick' },
                { value: 'good', label: 'Good — Average resistance' },
                { value: 'weak', label: 'Weak — Gets sick easily' },
                { value: 'very-weak', label: 'Very Weak — Constantly catching things' },
                { value: 'compromised', label: 'Compromised — Immunocompromised' },
                { value: 'autoimmune', label: 'Autoimmune — Immune attacks self' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PhysiqueSelect label="Energy Levels" value={data.condition?.energyLevels} onChange={(e) => update('condition', 'energyLevels', e.target.value)}
              options={[
                { value: 'boundless', label: 'Boundless — Endless energy' },
                { value: 'high', label: 'High — Very energetic' },
                { value: 'good', label: 'Good — Normal energy' },
                { value: 'moderate', label: 'Moderate — Adequate' },
                { value: 'low', label: 'Low — Tires easily' },
                { value: 'very-low', label: 'Very Low — Chronic fatigue' },
                { value: 'variable', label: 'Variable — Fluctuates' }
              ]} />
            <PhysiqueSelect label="Recovery Rate" value={data.condition?.recoveryRate} onChange={(e) => update('condition', 'recoveryRate', e.target.value)}
              options={[
                { value: 'rapid', label: 'Rapid — Heals very quickly' },
                { value: 'fast', label: 'Fast — Above average healing' },
                { value: 'normal', label: 'Normal — Average healing' },
                { value: 'slow', label: 'Slow — Takes longer to heal' },
                { value: 'very-slow', label: 'Very Slow — Poor healing' },
                { value: 'impaired', label: 'Impaired — Complications common' }
              ]} />
            <PhysiqueSelect label="Pain Tolerance" value={data.condition?.painTolerance} onChange={(e) => update('condition', 'painTolerance', e.target.value)}
              options={[
                { value: 'extreme', label: 'Extreme — Almost immune to pain' },
                { value: 'very-high', label: 'Very High — Handles pain well' },
                { value: 'high', label: 'High — Above average tolerance' },
                { value: 'average', label: 'Average — Normal sensitivity' },
                { value: 'low', label: 'Low — Sensitive to pain' },
                { value: 'very-low', label: 'Very Low — Very pain sensitive' },
                { value: 'chronic-pain', label: 'Chronic Pain — Lives with constant pain' }
              ]} />
          </div>
        </div>

        {/* FITNESS & ATHLETICISM */}
        <div className="border-2 border-orange-200 rounded-sm p-4 bg-orange-50/30">
          <h4 className="font-mono text-sm font-bold text-orange-800 mb-4">🏃 Fitness & Athleticism</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Fitness Level" value={data.condition?.fitnessLevel} onChange={(e) => update('condition', 'fitnessLevel', e.target.value)}
              options={[
                { value: 'elite', label: 'Elite Athlete — Professional level' },
                { value: 'highly-fit', label: 'Highly Fit — Serious athlete' },
                { value: 'athletic', label: 'Athletic — Regular intense exercise' },
                { value: 'fit', label: 'Fit — Regular exercise' },
                { value: 'moderately-fit', label: 'Moderately Fit — Some exercise' },
                { value: 'average', label: 'Average — Occasional activity' },
                { value: 'below-average', label: 'Below Average — Minimal exercise' },
                { value: 'unfit', label: 'Unfit — Sedentary lifestyle' },
                { value: 'very-unfit', label: 'Very Unfit — No physical activity' }
              ]} />
            <PhysiqueSelect label="Natural Athleticism" value={data.condition?.athleticism} onChange={(e) => update('condition', 'athleticism', e.target.value)}
              options={[
                { value: 'gifted', label: 'Gifted — Natural born athlete' },
                { value: 'talented', label: 'Talented — Quick learner for sports' },
                { value: 'above-average', label: 'Above Average — Good coordination' },
                { value: 'average', label: 'Average — Normal abilities' },
                { value: 'below-average', label: 'Below Average — Struggles with sports' },
                { value: 'poor', label: 'Poor — Uncoordinated' },
                { value: 'clumsy', label: 'Clumsy — Accident prone' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PhysiqueSelect label="Strength" value={data.condition?.strength} onChange={(e) => update('condition', 'strength', e.target.value)}
              options={[
                { value: 'exceptional', label: 'Exceptional — Incredibly strong' },
                { value: 'very-strong', label: 'Very Strong — Well above average' },
                { value: 'strong', label: 'Strong — Above average' },
                { value: 'average', label: 'Average — Normal strength' },
                { value: 'below-average', label: 'Below Average — Somewhat weak' },
                { value: 'weak', label: 'Weak — Limited strength' },
                { value: 'very-weak', label: 'Very Weak — Minimal strength' }
              ]} />
            <PhysiqueSelect label="Speed/Agility" value={data.condition?.speed} onChange={(e) => update('condition', 'speed', e.target.value)}
              options={[
                { value: 'lightning', label: 'Lightning — Exceptionally fast' },
                { value: 'very-fast', label: 'Very Fast — Quick reflexes' },
                { value: 'fast', label: 'Fast — Above average speed' },
                { value: 'average', label: 'Average — Normal speed' },
                { value: 'below-average', label: 'Below Average — Somewhat slow' },
                { value: 'slow', label: 'Slow — Limited agility' },
                { value: 'very-slow', label: 'Very Slow — Poor mobility' }
              ]} />
            <PhysiqueSelect label="Endurance/Stamina" value={data.condition?.endurance} onChange={(e) => update('condition', 'endurance', e.target.value)}
              options={[
                { value: 'marathon', label: 'Marathon — Seemingly unlimited' },
                { value: 'excellent', label: 'Excellent — Long-lasting energy' },
                { value: 'good', label: 'Good — Above average stamina' },
                { value: 'average', label: 'Average — Normal endurance' },
                { value: 'below-average', label: 'Below Average — Tires somewhat fast' },
                { value: 'poor', label: 'Poor — Tires quickly' },
                { value: 'very-poor', label: 'Very Poor — Exhausts rapidly' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PhysiqueSelect label="Flexibility" value={data.condition?.flexibility} onChange={(e) => update('condition', 'flexibility', e.target.value)}
              options={[
                { value: 'contortionist', label: 'Contortionist — Extreme flexibility' },
                { value: 'very-flexible', label: 'Very Flexible — Dancer/gymnast level' },
                { value: 'flexible', label: 'Flexible — Above average' },
                { value: 'average', label: 'Average — Normal range' },
                { value: 'stiff', label: 'Stiff — Limited flexibility' },
                { value: 'very-stiff', label: 'Very Stiff — Significantly limited' },
                { value: 'rigid', label: 'Rigid — Minimal flexibility' }
              ]} />
            <PhysiqueSelect label="Balance" value={data.condition?.balance} onChange={(e) => update('condition', 'balance', e.target.value)}
              options={[
                { value: 'perfect', label: 'Perfect — Exceptional balance' },
                { value: 'excellent', label: 'Excellent — Very stable' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'average', label: 'Average — Normal balance' },
                { value: 'poor', label: 'Poor — Somewhat unsteady' },
                { value: 'very-poor', label: 'Very Poor — Frequently loses balance' }
              ]} />
            <PhysiqueSelect label="Coordination" value={data.condition?.coordination} onChange={(e) => update('condition', 'coordination', e.target.value)}
              options={[
                { value: 'exceptional', label: 'Exceptional — Perfect hand-eye' },
                { value: 'excellent', label: 'Excellent — Very coordinated' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'average', label: 'Average — Normal coordination' },
                { value: 'poor', label: 'Poor — Somewhat clumsy' },
                { value: 'very-poor', label: 'Very Poor — Frequently fumbles' }
              ]} />
          </div>
        </div>

        {/* PHYSICAL SKILLS */}
        <div className="border-2 border-yellow-200 rounded-sm p-4 bg-yellow-50/30">
          <h4 className="font-mono text-sm font-bold text-yellow-800 mb-4">⚡ Physical Skills & Abilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Swimming Ability" value={data.condition?.swimming} onChange={(e) => update('condition', 'swimming', e.target.value)}
              options={[
                { value: 'competitive', label: 'Competitive — Race-level swimmer' },
                { value: 'excellent', label: 'Excellent — Very strong swimmer' },
                { value: 'good', label: 'Good — Comfortable in water' },
                { value: 'adequate', label: 'Adequate — Can swim safely' },
                { value: 'basic', label: 'Basic — Limited swimming' },
                { value: 'poor', label: 'Poor — Struggles in water' },
                { value: 'cannot', label: 'Cannot Swim — Never learned' },
                { value: 'fear', label: 'Fear of Water — Avoids swimming' }
              ]} />
            <PhysiqueSelect label="Combat/Fighting" value={data.condition?.combat} onChange={(e) => update('condition', 'combat', e.target.value)}
              options={[
                { value: 'master', label: 'Master — Expert fighter' },
                { value: 'trained', label: 'Trained — Formal training' },
                { value: 'experienced', label: 'Experienced — Street smart' },
                { value: 'basic', label: 'Basic — Some self-defense' },
                { value: 'minimal', label: 'Minimal — Little training' },
                { value: 'none', label: 'None — No fighting ability' },
                { value: 'pacifist', label: 'Pacifist — Refuses to fight' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Dance/Movement" value={data.condition?.dance} onChange={(e) => update('condition', 'dance', e.target.value)}
              options={[
                { value: 'professional', label: 'Professional — Performance level' },
                { value: 'excellent', label: 'Excellent — Very skilled' },
                { value: 'good', label: 'Good — Moves well' },
                { value: 'average', label: 'Average — Can follow along' },
                { value: 'awkward', label: 'Awkward — Struggles with rhythm' },
                { value: 'terrible', label: 'Terrible — Two left feet' },
                { value: 'refuses', label: 'Refuses — Won\'t dance' }
              ]} />
            <PhysiqueInput label="Other Physical Skills" value={data.condition?.otherSkills} onChange={(e) => update('condition', 'otherSkills', e.target.value)}
              placeholder="Rock climbing, martial arts style, yoga, gymnastics, etc." />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: SENSES ==========
    1: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">SENSES — Perception & Sensitivity</h3>
          <p className="font-mono text-xs text-blue-700">How the character perceives the world through their senses.</p>
        </div>

        {/* VISION */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-4">👁️ Vision</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Visual Acuity" value={data.senses?.vision} onChange={(e) => update('senses', 'vision', e.target.value)}
              options={[
                { value: 'perfect', label: 'Perfect — 20/20 or better' },
                { value: 'good', label: 'Good — Slight imperfection' },
                { value: 'corrected', label: 'Corrected — Needs glasses/contacts' },
                { value: 'nearsighted', label: 'Nearsighted — Can\'t see far' },
                { value: 'farsighted', label: 'Farsighted — Can\'t see close' },
                { value: 'astigmatism', label: 'Astigmatism — Blurred vision' },
                { value: 'poor', label: 'Poor — Significantly impaired' },
                { value: 'legally-blind', label: 'Legally Blind — Severe impairment' },
                { value: 'blind-one', label: 'Blind in One Eye' },
                { value: 'blind', label: 'Blind — No vision' }
              ]} />
            <PhysiqueSelect label="Color Vision" value={data.senses?.colorVision} onChange={(e) => update('senses', 'colorVision', e.target.value)}
              options={[
                { value: 'normal', label: 'Normal — Full color vision' },
                { value: 'enhanced', label: 'Enhanced — Sees more colors' },
                { value: 'red-green', label: 'Red-Green Colorblind' },
                { value: 'blue-yellow', label: 'Blue-Yellow Colorblind' },
                { value: 'monochrome', label: 'Monochrome — Sees grayscale' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Night Vision" value={data.senses?.nightVision} onChange={(e) => update('senses', 'nightVision', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Sees well in dark' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'average', label: 'Average — Normal adaptation' },
                { value: 'poor', label: 'Poor — Struggles in dark' },
                { value: 'night-blind', label: 'Night Blind — Cannot see in dark' }
              ]} />
            <PhysiqueSelect label="Light Sensitivity" value={data.senses?.lightSensitivity} onChange={(e) => update('senses', 'lightSensitivity', e.target.value)}
              options={[
                { value: 'none', label: 'None — No issues with light' },
                { value: 'mild', label: 'Mild — Slight sensitivity' },
                { value: 'moderate', label: 'Moderate — Needs sunglasses' },
                { value: 'severe', label: 'Severe — Extreme photophobia' }
              ]} />
          </div>
        </div>

        {/* HEARING */}
        <div className="border-2 border-indigo-200 rounded-sm p-4 bg-indigo-50/30">
          <h4 className="font-mono text-sm font-bold text-indigo-800 mb-4">👂 Hearing</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Hearing Ability" value={data.senses?.hearing} onChange={(e) => update('senses', 'hearing', e.target.value)}
              options={[
                { value: 'exceptional', label: 'Exceptional — Can hear whispers' },
                { value: 'good', label: 'Good — Normal hearing' },
                { value: 'slight-loss', label: 'Slight Loss — Some difficulty' },
                { value: 'moderate-loss', label: 'Moderate Loss — Needs aids sometimes' },
                { value: 'severe-loss', label: 'Severe Loss — Needs hearing aids' },
                { value: 'deaf-one', label: 'Deaf in One Ear' },
                { value: 'deaf', label: 'Deaf — No hearing' },
                { value: 'tinnitus', label: 'Tinnitus — Ringing in ears' }
              ]} />
            <PhysiqueSelect label="Sound Sensitivity" value={data.senses?.soundSensitivity} onChange={(e) => update('senses', 'soundSensitivity', e.target.value)}
              options={[
                { value: 'none', label: 'None — No issues' },
                { value: 'mild', label: 'Mild — Dislikes loud sounds' },
                { value: 'moderate', label: 'Moderate — Needs quiet' },
                { value: 'severe', label: 'Severe — Hyperacusis' },
                { value: 'misophonia', label: 'Misophonia — Specific sounds trigger' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Musical Ear" value={data.senses?.musicalEar} onChange={(e) => update('senses', 'musicalEar', e.target.value)}
              options={[
                { value: 'perfect-pitch', label: 'Perfect Pitch — Identifies any note' },
                { value: 'excellent', label: 'Excellent — Very musical ear' },
                { value: 'good', label: 'Good — Carries a tune' },
                { value: 'average', label: 'Average — Normal ability' },
                { value: 'poor', label: 'Poor — Tone deaf' }
              ]} />
            <PhysiqueSelect label="Directional Hearing" value={data.senses?.directionalHearing} onChange={(e) => update('senses', 'directionalHearing', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Pinpoints sounds' },
                { value: 'good', label: 'Good — Usually accurate' },
                { value: 'average', label: 'Average — Normal ability' },
                { value: 'poor', label: 'Poor — Struggles to locate sounds' }
              ]} />
          </div>
        </div>

        {/* OTHER SENSES */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-4">👃 Other Senses</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PhysiqueSelect label="Sense of Smell" value={data.senses?.smell} onChange={(e) => update('senses', 'smell', e.target.value)}
              options={[
                { value: 'exceptional', label: 'Exceptional — Notices everything' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'average', label: 'Average — Normal' },
                { value: 'poor', label: 'Poor — Misses most scents' },
                { value: 'anosmia', label: 'Anosmia — No sense of smell' },
                { value: 'hyperosmia', label: 'Hyperosmia — Overly sensitive' }
              ]} />
            <PhysiqueSelect label="Sense of Taste" value={data.senses?.taste} onChange={(e) => update('senses', 'taste', e.target.value)}
              options={[
                { value: 'supertaster', label: 'Supertaster — Intense flavors' },
                { value: 'refined', label: 'Refined — Discerning palate' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'average', label: 'Average — Normal' },
                { value: 'poor', label: 'Poor — Limited taste' },
                { value: 'ageusia', label: 'Ageusia — No sense of taste' }
              ]} />
            <PhysiqueSelect label="Sense of Touch" value={data.senses?.touch} onChange={(e) => update('senses', 'touch', e.target.value)}
              options={[
                { value: 'hypersensitive', label: 'Hypersensitive — Feels everything' },
                { value: 'sensitive', label: 'Sensitive — Above average' },
                { value: 'normal', label: 'Normal — Average sensitivity' },
                { value: 'reduced', label: 'Reduced — Less sensitive' },
                { value: 'numb', label: 'Numb — Limited feeling' },
                { value: 'tactile-issues', label: 'Tactile Issues — Certain textures' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Temperature Sensitivity" value={data.senses?.temperatureSensitivity} onChange={(e) => update('senses', 'temperatureSensitivity', e.target.value)}
              options={[
                { value: 'heat-sensitive', label: 'Heat Sensitive — Can\'t handle warmth' },
                { value: 'cold-sensitive', label: 'Cold Sensitive — Freezes easily' },
                { value: 'both', label: 'Both — Sensitive to extremes' },
                { value: 'normal', label: 'Normal — Average tolerance' },
                { value: 'resistant', label: 'Resistant — Handles extremes well' }
              ]} />
            <PhysiqueSelect label="Proprioception" value={data.senses?.proprioception} onChange={(e) => update('senses', 'proprioception', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Perfect body awareness' },
                { value: 'good', label: 'Good — Above average' },
                { value: 'average', label: 'Average — Normal awareness' },
                { value: 'poor', label: 'Poor — Bumps into things' },
                { value: 'very-poor', label: 'Very Poor — Limited body sense' }
              ]} />
          </div>
        </div>

        {/* HANDEDNESS & MISC */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">✋ Handedness & Misc</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Dominant Hand" value={data.senses?.dominantHand} onChange={(e) => update('senses', 'dominantHand', e.target.value)}
              options={[
                { value: 'right', label: 'Right-Handed' },
                { value: 'left', label: 'Left-Handed' },
                { value: 'ambidextrous', label: 'Ambidextrous — Uses both equally' },
                { value: 'mixed', label: 'Mixed — Different for different tasks' },
                { value: 'converted', label: 'Converted — Trained to use non-dominant' }
              ]} />
            <PhysiqueSelect label="Dominant Eye" value={data.senses?.dominantEye} onChange={(e) => update('senses', 'dominantEye', e.target.value)}
              options={[
                { value: 'right', label: 'Right Eye' },
                { value: 'left', label: 'Left Eye' },
                { value: 'neither', label: 'Neither Dominant' },
                { value: 'cross-dominant', label: 'Cross-Dominant — Opposite to hand' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Motion Sensitivity" value={data.senses?.motionSensitivity} onChange={(e) => update('senses', 'motionSensitivity', e.target.value)}
              options={[
                { value: 'none', label: 'None — Never gets motion sick' },
                { value: 'mild', label: 'Mild — Occasional discomfort' },
                { value: 'moderate', label: 'Moderate — Gets carsick/seasick' },
                { value: 'severe', label: 'Severe — Very prone to motion sickness' }
              ]} />
            <PhysiqueInput label="Other Sensory Notes" value={data.senses?.sensoryNotes} onChange={(e) => update('senses', 'sensoryNotes', e.target.value)}
              placeholder="Synesthesia, sensory processing issues, unusual sensitivities..." />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: MEDICAL HISTORY ==========
    2: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">MEDICAL HISTORY — Health Records</h3>
          <p className="font-mono text-xs text-red-700">Medical conditions, disabilities, allergies, and health history.</p>
        </div>

        {/* CHRONIC CONDITIONS */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-4">🏥 Chronic Conditions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Chronic Illness" value={data.medical?.chronicConditions} onChange={(e) => update('medical', 'chronicConditions', e.target.value)}
              options={[
                { value: 'none', label: 'None — No chronic conditions' },
                { value: 'diabetes-1', label: 'Type 1 Diabetes' },
                { value: 'diabetes-2', label: 'Type 2 Diabetes' },
                { value: 'asthma', label: 'Asthma' },
                { value: 'copd', label: 'COPD' },
                { value: 'heart-disease', label: 'Heart Disease' },
                { value: 'hypertension', label: 'Hypertension (High BP)' },
                { value: 'hypotension', label: 'Hypotension (Low BP)' },
                { value: 'arthritis', label: 'Arthritis' },
                { value: 'fibromyalgia', label: 'Fibromyalgia' },
                { value: 'lupus', label: 'Lupus' },
                { value: 'ms', label: 'Multiple Sclerosis' },
                { value: 'epilepsy', label: 'Epilepsy' },
                { value: 'migraines', label: 'Chronic Migraines' },
                { value: 'crohns', label: 'Crohn\'s Disease' },
                { value: 'ibs', label: 'IBS' },
                { value: 'eczema', label: 'Eczema/Psoriasis' },
                { value: 'thyroid', label: 'Thyroid Disorder' },
                { value: 'cancer-survivor', label: 'Cancer Survivor' },
                { value: 'cancer-active', label: 'Active Cancer' },
                { value: 'kidney', label: 'Kidney Disease' },
                { value: 'liver', label: 'Liver Disease' },
                { value: 'chronic-fatigue', label: 'Chronic Fatigue Syndrome' },
                { value: 'autoimmune', label: 'Other Autoimmune' },
                { value: 'multiple', label: 'Multiple Conditions' },
                { value: 'other', label: 'Other (specify in notes)' }
              ]} />
            <PhysiqueSelect label="Condition Management" value={data.medical?.conditionManagement} onChange={(e) => update('medical', 'conditionManagement', e.target.value)}
              options={[
                { value: 'na', label: 'N/A — No conditions' },
                { value: 'well-managed', label: 'Well Managed — Under control' },
                { value: 'managed', label: 'Managed — Mostly controlled' },
                { value: 'struggling', label: 'Struggling — Difficult to control' },
                { value: 'unmanaged', label: 'Unmanaged — Not controlled' },
                { value: 'remission', label: 'In Remission' },
                { value: 'newly-diagnosed', label: 'Newly Diagnosed' }
              ]} />
          </div>
          <PhysiqueInput label="Condition Details" value={data.medical?.conditionDetails} onChange={(e) => update('medical', 'conditionDetails', e.target.value)}
            placeholder="Specific details about chronic conditions, severity, medications..." />
        </div>

        {/* DISABILITIES */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-4">♿ Disabilities & Impairments</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Physical Disability" value={data.medical?.disabilities} onChange={(e) => update('medical', 'disabilities', e.target.value)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'mobility-mild', label: 'Mild Mobility Impairment' },
                { value: 'mobility-moderate', label: 'Moderate Mobility Impairment' },
                { value: 'mobility-severe', label: 'Severe Mobility Impairment' },
                { value: 'wheelchair', label: 'Wheelchair User' },
                { value: 'amputee-arm', label: 'Amputee — Arm' },
                { value: 'amputee-leg', label: 'Amputee — Leg' },
                { value: 'amputee-multiple', label: 'Amputee — Multiple' },
                { value: 'paralysis-partial', label: 'Partial Paralysis' },
                { value: 'paraplegia', label: 'Paraplegia' },
                { value: 'quadriplegia', label: 'Quadriplegia' },
                { value: 'cerebral-palsy', label: 'Cerebral Palsy' },
                { value: 'muscular-dystrophy', label: 'Muscular Dystrophy' },
                { value: 'dwarfism', label: 'Dwarfism' },
                { value: 'chronic-pain', label: 'Chronic Pain Condition' },
                { value: 'other', label: 'Other (specify)' }
              ]} />
            <PhysiqueSelect label="Mobility Aid" value={data.medical?.mobilityAid} onChange={(e) => update('medical', 'mobilityAid', e.target.value)}
              options={[
                { value: 'none', label: 'None Needed' },
                { value: 'cane', label: 'Cane' },
                { value: 'crutches', label: 'Crutches' },
                { value: 'walker', label: 'Walker' },
                { value: 'wheelchair-manual', label: 'Manual Wheelchair' },
                { value: 'wheelchair-electric', label: 'Electric Wheelchair' },
                { value: 'scooter', label: 'Mobility Scooter' },
                { value: 'prosthetic', label: 'Prosthetic Limb' },
                { value: 'brace', label: 'Brace/Orthotic' },
                { value: 'service-animal', label: 'Service Animal' },
                { value: 'multiple', label: 'Multiple Aids' }
              ]} />
          </div>
          <PhysiqueInput label="Disability Details" value={data.medical?.disabilityDetails} onChange={(e) => update('medical', 'disabilityDetails', e.target.value)}
            placeholder="Details about the disability, how it affects daily life, accommodations needed..." />
        </div>

        {/* ALLERGIES */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-4">🤧 Allergies & Intolerances</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Allergy Severity" value={data.medical?.allergySeverity} onChange={(e) => update('medical', 'allergySeverity', e.target.value)}
              options={[
                { value: 'none', label: 'None — No known allergies' },
                { value: 'mild', label: 'Mild — Minor reactions' },
                { value: 'moderate', label: 'Moderate — Significant reactions' },
                { value: 'severe', label: 'Severe — Serious reactions' },
                { value: 'life-threatening', label: 'Life-Threatening — Anaphylaxis risk' }
              ]} />
            <PhysiqueSelect label="Allergy Type" value={data.medical?.allergyType} onChange={(e) => update('medical', 'allergyType', e.target.value)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'food', label: 'Food Allergies' },
                { value: 'environmental', label: 'Environmental (pollen, dust)' },
                { value: 'medication', label: 'Medication Allergies' },
                { value: 'animal', label: 'Animal Allergies' },
                { value: 'insect', label: 'Insect Sting/Bite' },
                { value: 'contact', label: 'Contact (latex, metals)' },
                { value: 'multiple', label: 'Multiple Types' }
              ]} />
          </div>
          <PhysiqueInput label="Specific Allergies" value={data.medical?.allergies} onChange={(e) => update('medical', 'allergies', e.target.value)}
            placeholder="List specific allergies: peanuts, shellfish, penicillin, bee stings, cats, latex..." />
        </div>

        {/* MEDICAL INFO */}
        <div className="border-2 border-orange-200 rounded-sm p-4 bg-orange-50/30">
          <h4 className="font-mono text-sm font-bold text-orange-800 mb-4">🩸 Medical Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PhysiqueSelect label="Blood Type" value={data.medical?.bloodType} onChange={(e) => update('medical', 'bloodType', e.target.value)}
              options={[
                { value: 'unknown', label: 'Unknown' },
                { value: 'a-pos', label: 'A Positive (A+)' },
                { value: 'a-neg', label: 'A Negative (A-)' },
                { value: 'b-pos', label: 'B Positive (B+)' },
                { value: 'b-neg', label: 'B Negative (B-)' },
                { value: 'ab-pos', label: 'AB Positive (AB+)' },
                { value: 'ab-neg', label: 'AB Negative (AB-)' },
                { value: 'o-pos', label: 'O Positive (O+)' },
                { value: 'o-neg', label: 'O Negative (O-)' }
              ]} />
            <PhysiqueSelect label="Organ Donor" value={data.medical?.organDonor} onChange={(e) => update('medical', 'organDonor', e.target.value)}
              options={[
                { value: 'yes', label: 'Yes — Registered donor' },
                { value: 'no', label: 'No — Not a donor' },
                { value: 'undecided', label: 'Undecided' },
                { value: 'partial', label: 'Partial — Specific organs only' }
              ]} />
            <PhysiqueSelect label="Medical ID/Bracelet" value={data.medical?.medicalId} onChange={(e) => update('medical', 'medicalId', e.target.value)}
              options={[
                { value: 'none', label: 'None — No medical ID' },
                { value: 'bracelet', label: 'Medical Bracelet' },
                { value: 'necklace', label: 'Medical Necklace' },
                { value: 'card', label: 'Medical ID Card' },
                { value: 'phone', label: 'Phone Emergency Info' },
                { value: 'tattoo', label: 'Medical Tattoo' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueInput label="Past Injuries/Surgeries" value={data.medical?.pastInjuries} onChange={(e) => update('medical', 'pastInjuries', e.target.value)}
              placeholder="Broken bones, surgeries, significant injuries..." />
            <PhysiqueInput label="Current Medications" value={data.medical?.medications} onChange={(e) => update('medical', 'medications', e.target.value)}
              placeholder="Any regular medications, prescriptions, or supplements..." />
          </div>
        </div>

        {/* MENTAL HEALTH */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">🧠 Mental Health (Medical)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Diagnosed Conditions" value={data.medical?.mentalHealthDx} onChange={(e) => update('medical', 'mentalHealthDx', e.target.value)}
              options={[
                { value: 'none', label: 'None Diagnosed' },
                { value: 'depression', label: 'Depression' },
                { value: 'anxiety', label: 'Anxiety Disorder' },
                { value: 'bipolar', label: 'Bipolar Disorder' },
                { value: 'ptsd', label: 'PTSD' },
                { value: 'ocd', label: 'OCD' },
                { value: 'adhd', label: 'ADHD' },
                { value: 'autism', label: 'Autism Spectrum' },
                { value: 'schizophrenia', label: 'Schizophrenia' },
                { value: 'bpd', label: 'Borderline Personality' },
                { value: 'eating-disorder', label: 'Eating Disorder' },
                { value: 'addiction', label: 'Addiction/Substance Use' },
                { value: 'multiple', label: 'Multiple Conditions' },
                { value: 'other', label: 'Other (specify)' }
              ]} />
            <PhysiqueSelect label="Treatment Status" value={data.medical?.mentalHealthTreatment} onChange={(e) => update('medical', 'mentalHealthTreatment', e.target.value)}
              options={[
                { value: 'na', label: 'N/A' },
                { value: 'therapy', label: 'In Therapy' },
                { value: 'medication', label: 'On Medication' },
                { value: 'both', label: 'Therapy + Medication' },
                { value: 'recovery', label: 'In Recovery' },
                { value: 'remission', label: 'In Remission' },
                { value: 'untreated', label: 'Untreated' },
                { value: 'refused', label: 'Refuses Treatment' }
              ]} />
          </div>
          <PhysiqueInput label="Mental Health Notes" value={data.medical?.mentalHealthNotes} onChange={(e) => update('medical', 'mentalHealthNotes', e.target.value)}
            placeholder="Details about mental health history, triggers, coping mechanisms..." />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: HABITS & LIFESTYLE ==========
    3: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-green-900 mb-2">HABITS & LIFESTYLE — Daily Patterns</h3>
          <p className="font-mono text-xs text-green-700">Sleep, diet, exercise, substances, and daily routines.</p>
        </div>

        {/* SLEEP */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-4">😴 Sleep Patterns</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Sleep Pattern" value={data.habits?.sleepPattern} onChange={(e) => update('habits', 'sleepPattern', e.target.value)}
              options={[
                { value: 'early-bird', label: 'Early Bird — Up at dawn' },
                { value: 'morning-person', label: 'Morning Person — Early riser' },
                { value: 'normal', label: 'Normal — Standard schedule' },
                { value: 'night-owl', label: 'Night Owl — Stays up late' },
                { value: 'nocturnal', label: 'Nocturnal — Awake at night' },
                { value: 'irregular', label: 'Irregular — No set pattern' },
                { value: 'shift-work', label: 'Shift Work — Varies by job' },
                { value: 'polyphasic', label: 'Polyphasic — Multiple sleep periods' }
              ]} />
            <PhysiqueSelect label="Sleep Duration" value={data.habits?.sleepDuration} onChange={(e) => update('habits', 'sleepDuration', e.target.value)}
              options={[
                { value: 'minimal', label: 'Minimal — Under 5 hours' },
                { value: 'short', label: 'Short Sleeper — 5-6 hours' },
                { value: 'average', label: 'Average — 7-8 hours' },
                { value: 'long', label: 'Long Sleeper — 9-10 hours' },
                { value: 'excessive', label: 'Excessive — 10+ hours' },
                { value: 'variable', label: 'Variable — Inconsistent' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Sleep Quality" value={data.habits?.sleepQuality} onChange={(e) => update('habits', 'sleepQuality', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Deep, restful' },
                { value: 'good', label: 'Good — Usually rested' },
                { value: 'fair', label: 'Fair — Sometimes tired' },
                { value: 'poor', label: 'Poor — Often unrested' },
                { value: 'insomnia', label: 'Insomnia — Can\'t fall asleep' },
                { value: 'disrupted', label: 'Disrupted — Wakes frequently' },
                { value: 'nightmares', label: 'Nightmares — Disturbing dreams' },
                { value: 'sleep-disorder', label: 'Sleep Disorder — Medical issue' }
              ]} />
            <PhysiqueSelect label="Napping" value={data.habits?.napping} onChange={(e) => update('habits', 'napping', e.target.value)}
              options={[
                { value: 'never', label: 'Never — Can\'t nap' },
                { value: 'rarely', label: 'Rarely — Only when exhausted' },
                { value: 'sometimes', label: 'Sometimes — Occasional' },
                { value: 'often', label: 'Often — Regular naps' },
                { value: 'daily', label: 'Daily — Every day' },
                { value: 'frequent', label: 'Frequent — Multiple times daily' }
              ]} />
          </div>
        </div>

        {/* DIET */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-4">🍽️ Diet & Eating</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Diet Type" value={data.habits?.dietType} onChange={(e) => update('habits', 'dietType', e.target.value)}
              options={[
                { value: 'omnivore', label: 'Omnivore — Eats everything' },
                { value: 'flexitarian', label: 'Flexitarian — Mostly plant-based' },
                { value: 'pescatarian', label: 'Pescatarian — Fish, no meat' },
                { value: 'vegetarian', label: 'Vegetarian — No meat' },
                { value: 'vegan', label: 'Vegan — No animal products' },
                { value: 'keto', label: 'Keto — Low carb, high fat' },
                { value: 'paleo', label: 'Paleo — Whole foods' },
                { value: 'mediterranean', label: 'Mediterranean' },
                { value: 'gluten-free', label: 'Gluten-Free' },
                { value: 'halal', label: 'Halal' },
                { value: 'kosher', label: 'Kosher' },
                { value: 'religious', label: 'Other Religious Diet' },
                { value: 'medical', label: 'Medical Diet — Health reasons' },
                { value: 'no-restrictions', label: 'No Restrictions — Eats anything' }
              ]} />
            <PhysiqueSelect label="Eating Habits" value={data.habits?.eatingHabits} onChange={(e) => update('habits', 'eatingHabits', e.target.value)}
              options={[
                { value: 'healthy', label: 'Very Healthy — Clean eating' },
                { value: 'mostly-healthy', label: 'Mostly Healthy — Some treats' },
                { value: 'balanced', label: 'Balanced — Moderate approach' },
                { value: 'inconsistent', label: 'Inconsistent — Varies' },
                { value: 'unhealthy', label: 'Unhealthy — Poor diet' },
                { value: 'fast-food', label: 'Fast Food Heavy' },
                { value: 'emotional', label: 'Emotional Eater' },
                { value: 'restrictive', label: 'Restrictive — Very controlled' },
                { value: 'disordered', label: 'Disordered — Has issues' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PhysiqueSelect label="Meal Frequency" value={data.habits?.mealFrequency} onChange={(e) => update('habits', 'mealFrequency', e.target.value)}
              options={[
                { value: 'one', label: 'One Meal — OMAD' },
                { value: 'two', label: 'Two Meals' },
                { value: 'three', label: 'Three Meals — Standard' },
                { value: 'grazer', label: 'Grazer — Many small meals' },
                { value: 'irregular', label: 'Irregular — No pattern' },
                { value: 'fasting', label: 'Intermittent Fasting' }
              ]} />
            <PhysiqueSelect label="Cooking Ability" value={data.habits?.cookingAbility} onChange={(e) => update('habits', 'cookingAbility', e.target.value)}
              options={[
                { value: 'chef', label: 'Chef Level — Expert cook' },
                { value: 'excellent', label: 'Excellent — Very skilled' },
                { value: 'good', label: 'Good — Competent cook' },
                { value: 'basic', label: 'Basic — Simple meals' },
                { value: 'minimal', label: 'Minimal — Barely cooks' },
                { value: 'none', label: 'None — Can\'t cook' },
                { value: 'learning', label: 'Learning — Improving' }
              ]} />
            <PhysiqueSelect label="Hydration" value={data.habits?.hydration} onChange={(e) => update('habits', 'hydration', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Always hydrated' },
                { value: 'good', label: 'Good — Drinks enough' },
                { value: 'fair', label: 'Fair — Could drink more' },
                { value: 'poor', label: 'Poor — Often dehydrated' },
                { value: 'very-poor', label: 'Very Poor — Rarely drinks water' }
              ]} />
          </div>
        </div>

        {/* SUBSTANCES */}
        <div className="border-2 border-teal-200 rounded-sm p-4 bg-teal-50/30">
          <h4 className="font-mono text-sm font-bold text-teal-800 mb-4">🚬 Substances</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PhysiqueSelect label="Alcohol Use" value={data.habits?.alcoholUse} onChange={(e) => update('habits', 'alcoholUse', e.target.value)}
              options={[
                { value: 'never', label: 'Never — Doesn\'t drink' },
                { value: 'rarely', label: 'Rarely — Special occasions' },
                { value: 'social', label: 'Social — With others' },
                { value: 'moderate', label: 'Moderate — Regular but controlled' },
                { value: 'heavy', label: 'Heavy — Frequent drinking' },
                { value: 'problem', label: 'Problem — Struggles with alcohol' },
                { value: 'recovering', label: 'Recovering — In recovery' },
                { value: 'sober', label: 'Sober — Former drinker' }
              ]} />
            <PhysiqueSelect label="Tobacco Use" value={data.habits?.tobaccoUse} onChange={(e) => update('habits', 'tobaccoUse', e.target.value)}
              options={[
                { value: 'never', label: 'Never — Never smoked' },
                { value: 'former', label: 'Former — Quit smoking' },
                { value: 'occasional', label: 'Occasional — Social smoker' },
                { value: 'light', label: 'Light — Few per day' },
                { value: 'moderate', label: 'Moderate — Pack a day' },
                { value: 'heavy', label: 'Heavy — Chain smoker' },
                { value: 'vaping', label: 'Vaping — E-cigarettes' },
                { value: 'chewing', label: 'Chewing Tobacco' }
              ]} />
            <PhysiqueSelect label="Caffeine Use" value={data.habits?.caffeineUse} onChange={(e) => update('habits', 'caffeineUse', e.target.value)}
              options={[
                { value: 'none', label: 'None — Caffeine-free' },
                { value: 'minimal', label: 'Minimal — Occasional' },
                { value: 'moderate', label: 'Moderate — 1-2 cups/day' },
                { value: 'heavy', label: 'Heavy — Multiple cups/day' },
                { value: 'dependent', label: 'Dependent — Needs it to function' },
                { value: 'excessive', label: 'Excessive — Unhealthy amount' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Other Substances" value={data.habits?.substanceUse} onChange={(e) => update('habits', 'substanceUse', e.target.value)}
              options={[
                { value: 'none', label: 'None — No other substances' },
                { value: 'cannabis-occasional', label: 'Cannabis — Occasional' },
                { value: 'cannabis-regular', label: 'Cannabis — Regular' },
                { value: 'recreational', label: 'Recreational — Occasional party drugs' },
                { value: 'regular', label: 'Regular — Frequent use' },
                { value: 'addiction', label: 'Addiction — Has a problem' },
                { value: 'recovering', label: 'Recovering — In recovery' },
                { value: 'prescription', label: 'Prescription Only — Medical use' }
              ]} />
            <PhysiqueInput label="Substance Notes" value={data.habits?.substanceNotes} onChange={(e) => update('habits', 'substanceNotes', e.target.value)}
              placeholder="Details about substance use, recovery, preferences..." />
          </div>
        </div>

        {/* EXERCISE & SELF-CARE */}
        <div className="border-2 border-lime-200 rounded-sm p-4 bg-lime-50/30">
          <h4 className="font-mono text-sm font-bold text-lime-800 mb-4">🏋️ Exercise & Self-Care</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PhysiqueSelect label="Exercise Routine" value={data.habits?.exerciseRoutine} onChange={(e) => update('habits', 'exerciseRoutine', e.target.value)}
              options={[
                { value: 'athlete', label: 'Athlete — Professional level' },
                { value: 'daily-intense', label: 'Daily Intense — Hard workouts' },
                { value: 'daily', label: 'Daily — Regular exercise' },
                { value: 'frequent', label: 'Frequent — 4-5 times/week' },
                { value: 'moderate', label: 'Moderate — 2-3 times/week' },
                { value: 'occasional', label: 'Occasional — Once a week' },
                { value: 'rare', label: 'Rare — Once a month' },
                { value: 'none', label: 'None — Doesn\'t exercise' },
                { value: 'wants-to', label: 'Wants To — Meaning to start' }
              ]} />
            <PhysiqueSelect label="Exercise Type" value={data.habits?.exerciseType} onChange={(e) => update('habits', 'exerciseType', e.target.value)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'cardio', label: 'Cardio Focus — Running, cycling' },
                { value: 'strength', label: 'Strength Focus — Weights, lifting' },
                { value: 'mixed', label: 'Mixed — Both cardio and strength' },
                { value: 'yoga', label: 'Yoga/Pilates — Flexibility focus' },
                { value: 'sports', label: 'Sports — Team or individual' },
                { value: 'martial-arts', label: 'Martial Arts' },
                { value: 'dance', label: 'Dance' },
                { value: 'swimming', label: 'Swimming' },
                { value: 'hiking', label: 'Hiking/Outdoor' },
                { value: 'varied', label: 'Varied — Mix of activities' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhysiqueSelect label="Self-Care Level" value={data.habits?.selfCareLevel} onChange={(e) => update('habits', 'selfCareLevel', e.target.value)}
              options={[
                { value: 'excellent', label: 'Excellent — Prioritizes self-care' },
                { value: 'good', label: 'Good — Regular self-care' },
                { value: 'moderate', label: 'Moderate — Sometimes' },
                { value: 'poor', label: 'Poor — Neglects self-care' },
                { value: 'very-poor', label: 'Very Poor — Severe neglect' },
                { value: 'improving', label: 'Improving — Working on it' }
              ]} />
            <PhysiqueInput label="Self-Care Practices" value={data.habits?.selfCarePractices} onChange={(e) => update('habits', 'selfCarePractices', e.target.value)}
              placeholder="Meditation, skincare, mental health days, hobbies..." />
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


export default PhysiqueContent;
