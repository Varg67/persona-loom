import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const IntimacyContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('intimacy', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // Helper components
  const IntimacySelect = ({ label, value, onChange, options }) => (
    <div>
      <label className="block font-mono text-xs font-bold text-purple-700 mb-1">{label}</label>
      <select value={value || ''} onChange={onChange} className="w-full px-3 py-2 border-2 border-purple-300 rounded-sm bg-white font-mono text-xs focus:border-purple-500 focus:outline-none">
        <option value="">-- Select --</option>
        {options.map((opt, i) => typeof opt === 'object'
          ? <option key={i} value={opt.value}>{opt.label}</option>
          : <option key={i} value={opt}>{opt}</option>
        )}
      </select>
    </div>
  );

  const IntimacyInput = ({ label, value, onChange, placeholder }) => (
    <div>
      <label className="block font-mono text-xs font-bold text-purple-700 mb-1">{label}</label>
      <input type="text" value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 border-2 border-purple-300 rounded-sm font-mono text-xs focus:border-purple-500 focus:outline-none" />
    </div>
  );

  const IntimacyTextarea = ({ label, value, onChange, placeholder }) => (
    <div>
      <label className="block font-mono text-xs font-bold text-purple-700 mb-1">{label}</label>
      <textarea value={value || ''} onChange={onChange} placeholder={placeholder} rows={3} className="w-full px-3 py-2 border-2 border-purple-300 rounded-sm font-mono text-xs focus:border-purple-500 focus:outline-none resize-none" />
    </div>
  );

  const IntimacySlider = ({ label, value, onChange, leftLabel, rightLabel }) => (
    <div className="space-y-1">
      <label className="block font-mono text-xs font-bold text-purple-700">{label}</label>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-purple-600 w-20">{leftLabel}</span>
        <input type="range" min="1" max="10" value={value || 5} onChange={onChange} className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
        <span className="font-mono text-[10px] text-purple-600 w-20 text-right">{rightLabel}</span>
      </div>
      <div className="text-center font-mono text-xs text-purple-500">{value || 5}/10</div>
    </div>
  );

  const sections = {
    // ========== SUBTAB 0: ORIENTATION & IDENTITY ==========
    0: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">ORIENTATION & IDENTITY — Sexual & Romantic</h3>
          <p className="font-mono text-xs text-purple-700">Sexual orientation, romantic orientation, and intimate identity.</p>
          <p className="font-mono text-[10px] text-purple-500 mt-2">🔒 This tab is only available for adult characters (18+).</p>
        </div>

        {/* SEXUAL ORIENTATION */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">🌈 Sexual Orientation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Sexual Orientation" value={data.orientation?.sexualOrientation} onChange={(e) => update('orientation', 'sexualOrientation', e.target.value)}
              options={[
                { value: 'heterosexual', label: 'Heterosexual/Straight — Attracted to opposite gender' },
                { value: 'homosexual-gay', label: 'Gay — Men attracted to men' },
                { value: 'homosexual-lesbian', label: 'Lesbian — Women attracted to women' },
                { value: 'bisexual', label: 'Bisexual — Attracted to both men and women' },
                { value: 'pansexual', label: 'Pansexual — Attracted regardless of gender' },
                { value: 'polysexual', label: 'Polysexual — Attracted to multiple genders' },
                { value: 'omnisexual', label: 'Omnisexual — Attracted to all genders with preference' },
                { value: 'queer', label: 'Queer — Non-specific LGBTQ+ identity' },
                { value: 'fluid', label: 'Fluid — Orientation changes over time' },
                { value: 'questioning', label: 'Questioning — Still exploring' },
                { value: 'asexual', label: 'Asexual — Little to no sexual attraction' },
                { value: 'demisexual', label: 'Demisexual — Attraction only after bond' },
                { value: 'graysexual', label: 'Graysexual — Rarely experiences attraction' },
                { value: 'heteroflex', label: 'Heteroflexible — Mostly straight' },
                { value: 'homoflex', label: 'Homoflexible — Mostly gay/lesbian' },
                { value: 'androsexual', label: 'Androsexual — Attracted to masculinity' },
                { value: 'gynesexual', label: 'Gynesexual — Attracted to femininity' },
                { value: 'skoliosexual', label: 'Skoliosexual — Attracted to non-binary' },
                { value: 'unlabeled', label: 'Unlabeled — Doesn\'t use labels' },
                { value: 'unknown', label: 'Unknown — Hasn\'t figured it out' }
              ]} />
            <IntimacySelect label="Kinsey Scale Position" value={data.orientation?.kinseyScale} onChange={(e) => update('orientation', 'kinseyScale', e.target.value)}
              options={[
                { value: '0', label: '0 — Exclusively heterosexual' },
                { value: '1', label: '1 — Predominantly heterosexual, incidentally homosexual' },
                { value: '2', label: '2 — Predominantly heterosexual, more than incidentally homosexual' },
                { value: '3', label: '3 — Equally heterosexual and homosexual (bisexual)' },
                { value: '4', label: '4 — Predominantly homosexual, more than incidentally heterosexual' },
                { value: '5', label: '5 — Predominantly homosexual, incidentally heterosexual' },
                { value: '6', label: '6 — Exclusively homosexual' },
                { value: 'x', label: 'X — Asexual / No socio-sexual contacts' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntimacySelect label="Orientation Certainty" value={data.orientation?.orientationCertainty} onChange={(e) => update('orientation', 'orientationCertainty', e.target.value)}
              options={[
                { value: 'absolute', label: 'Absolute — 100% certain' },
                { value: 'very-confident', label: 'Very Confident — Almost certain' },
                { value: 'confident', label: 'Confident — Pretty sure' },
                { value: 'somewhat', label: 'Somewhat — Mostly sure' },
                { value: 'uncertain', label: 'Uncertain — Not sure' },
                { value: 'questioning', label: 'Questioning — Actively exploring' },
                { value: 'fluid', label: 'Fluid — Changes over time' }
              ]} />
            <IntimacySelect label="Outness Level" value={data.orientation?.outnessLevel} onChange={(e) => update('orientation', 'outnessLevel', e.target.value)}
              options={[
                { value: 'not-applicable', label: 'N/A — Heterosexual/cisgender' },
                { value: 'fully-out', label: 'Fully Out — Everyone knows' },
                { value: 'mostly-out', label: 'Mostly Out — Most people know' },
                { value: 'selectively-out', label: 'Selectively Out — Some people know' },
                { value: 'out-to-close', label: 'Out to Close Friends/Family' },
                { value: 'closeted', label: 'Closeted — Hiding orientation' },
                { value: 'deeply-closeted', label: 'Deeply Closeted — No one knows' },
                { value: 'dont-discuss', label: 'Doesn\'t Discuss — Private matter' }
              ]} />
          </div>
        </div>

        {/* ROMANTIC ORIENTATION */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-4">💕 Romantic Orientation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Romantic Orientation" value={data.orientation?.romanticOrientation} onChange={(e) => update('orientation', 'romanticOrientation', e.target.value)}
              options={[
                { value: 'same-as-sexual', label: 'Same as Sexual Orientation' },
                { value: 'heteroromantic', label: 'Heteroromantic — Romantic to opposite gender' },
                { value: 'homoromantic', label: 'Homoromantic — Romantic to same gender' },
                { value: 'biromantic', label: 'Biromantic — Romantic to multiple genders' },
                { value: 'panromantic', label: 'Panromantic — Romantic regardless of gender' },
                { value: 'aromantic', label: 'Aromantic — Little to no romantic attraction' },
                { value: 'demiromantic', label: 'Demiromantic — Romance only after bond' },
                { value: 'grayromantic', label: 'Grayromantic — Rarely romantic feelings' },
                { value: 'quoiromantic', label: 'Quoiromantic — Can\'t distinguish romantic/platonic' },
                { value: 'fluid', label: 'Fluid — Changes over time' },
                { value: 'questioning', label: 'Questioning — Still exploring' }
              ]} />
            <IntimacySelect label="Relationship Style Preference" value={data.orientation?.relationshipStyle} onChange={(e) => update('orientation', 'relationshipStyle', e.target.value)}
              options={[
                { value: 'monogamous', label: 'Monogamous — One partner only' },
                { value: 'serial-monogamy', label: 'Serial Monogamy — One at a time' },
                { value: 'monogamish', label: 'Monogamish — Mostly monogamous, some flexibility' },
                { value: 'open', label: 'Open Relationship — Primary + others' },
                { value: 'polyamorous', label: 'Polyamorous — Multiple romantic relationships' },
                { value: 'relationship-anarchy', label: 'Relationship Anarchy — No hierarchy' },
                { value: 'swinging', label: 'Swinging — Recreational non-monogamy' },
                { value: 'dont-know', label: 'Don\'t Know — Hasn\'t explored' },
                { value: 'flexible', label: 'Flexible — Depends on partner' },
                { value: 'aromantic', label: 'Aromantic — No romantic relationships' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntimacySelect label="Love Language (Primary)" value={data.orientation?.loveLangPrimary} onChange={(e) => update('orientation', 'loveLangPrimary', e.target.value)}
              options={[
                { value: 'words', label: 'Words of Affirmation — Verbal expressions' },
                { value: 'acts', label: 'Acts of Service — Helpful actions' },
                { value: 'gifts', label: 'Receiving Gifts — Thoughtful presents' },
                { value: 'time', label: 'Quality Time — Undivided attention' },
                { value: 'touch', label: 'Physical Touch — Affectionate contact' }
              ]} />
            <IntimacySelect label="Love Language (Secondary)" value={data.orientation?.loveLangSecondary} onChange={(e) => update('orientation', 'loveLangSecondary', e.target.value)}
              options={[
                { value: '', label: '— None / Same as primary —' },
                { value: 'words', label: 'Words of Affirmation' },
                { value: 'acts', label: 'Acts of Service' },
                { value: 'gifts', label: 'Receiving Gifts' },
                { value: 'time', label: 'Quality Time' },
                { value: 'touch', label: 'Physical Touch' }
              ]} />
          </div>
        </div>

        {/* EXPERIENCE & HISTORY */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-4">📖 Experience & History</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Sexual Experience Level" value={data.orientation?.experienceLevel} onChange={(e) => update('orientation', 'experienceLevel', e.target.value)}
              options={[
                { value: 'virgin', label: 'Virgin — No sexual experience' },
                { value: 'minimal', label: 'Minimal — Very limited experience' },
                { value: 'some', label: 'Some — A few experiences' },
                { value: 'moderate', label: 'Moderate — Average experience' },
                { value: 'experienced', label: 'Experienced — Significant experience' },
                { value: 'very-experienced', label: 'Very Experienced — Extensive history' },
                { value: 'expert', label: 'Expert — Highly knowledgeable' }
              ]} />
            <IntimacySelect label="Romantic Experience Level" value={data.orientation?.romanticExperience} onChange={(e) => update('orientation', 'romanticExperience', e.target.value)}
              options={[
                { value: 'none', label: 'None — Never dated' },
                { value: 'minimal', label: 'Minimal — Brief dating' },
                { value: 'some', label: 'Some — A few relationships' },
                { value: 'moderate', label: 'Moderate — Several relationships' },
                { value: 'experienced', label: 'Experienced — Many relationships' },
                { value: 'very-experienced', label: 'Very Experienced — Long history' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Age of First Experience" value={data.orientation?.firstExperienceAge} onChange={(e) => update('orientation', 'firstExperienceAge', e.target.value)}
              options={[
                { value: 'none-yet', label: 'None Yet — Still a virgin' },
                { value: 'late-teens', label: 'Late Teens (18-19)' },
                { value: 'early-20s', label: 'Early 20s' },
                { value: 'mid-20s', label: 'Mid 20s' },
                { value: 'late-20s', label: 'Late 20s' },
                { value: '30s', label: '30s' },
                { value: '40s-plus', label: '40s or later' },
                { value: 'prefers-not-say', label: 'Prefers Not to Say' }
              ]} />
            <IntimacySelect label="Current Status" value={data.orientation?.currentStatus} onChange={(e) => update('orientation', 'currentStatus', e.target.value)}
              options={[
                { value: 'single-looking', label: 'Single — Actively looking' },
                { value: 'single-open', label: 'Single — Open to dating' },
                { value: 'single-not-looking', label: 'Single — Not looking' },
                { value: 'dating-casual', label: 'Dating — Casually' },
                { value: 'dating-serious', label: 'Dating — Seriously' },
                { value: 'relationship', label: 'In a Relationship' },
                { value: 'engaged', label: 'Engaged' },
                { value: 'married', label: 'Married' },
                { value: 'domestic-partner', label: 'Domestic Partnership' },
                { value: 'separated', label: 'Separated' },
                { value: 'divorced', label: 'Divorced' },
                { value: 'widowed', label: 'Widowed' },
                { value: 'its-complicated', label: 'It\'s Complicated' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntimacySelect label="Number of Past Partners" value={data.orientation?.partnerCount} onChange={(e) => update('orientation', 'partnerCount', e.target.value)}
              options={[
                { value: '0', label: '0 — None' },
                { value: '1', label: '1 — One partner' },
                { value: '2-3', label: '2-3 — A few' },
                { value: '4-6', label: '4-6 — Several' },
                { value: '7-10', label: '7-10 — Many' },
                { value: '11-20', label: '11-20 — Quite a few' },
                { value: '21-50', label: '21-50 — Very many' },
                { value: '50-plus', label: '50+ — Extensive' },
                { value: 'lost-count', label: 'Lost Count' },
                { value: 'private', label: 'Private — Won\'t say' }
              ]} />
            <IntimacySelect label="Longest Relationship" value={data.orientation?.longestRelationship} onChange={(e) => update('orientation', 'longestRelationship', e.target.value)}
              options={[
                { value: 'none', label: 'None — Never had a relationship' },
                { value: 'weeks', label: 'Weeks — Brief flings' },
                { value: 'months', label: 'Months — Short term' },
                { value: '1-year', label: 'About a Year' },
                { value: '2-3-years', label: '2-3 Years' },
                { value: '4-5-years', label: '4-5 Years' },
                { value: '6-10-years', label: '6-10 Years' },
                { value: '10-plus', label: '10+ Years' },
                { value: 'lifetime', label: 'Lifetime — Still together' }
              ]} />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: PREFERENCES ==========
    1: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-rose-900 mb-2">PREFERENCES — Attraction & Desires</h3>
          <p className="font-mono text-xs text-rose-700">What the character is attracted to and what they desire in partners and intimacy.</p>
        </div>

        {/* PHYSICAL ATTRACTION */}
        <div className="border-2 border-rose-200 rounded-sm p-4 bg-rose-50/30">
          <h4 className="font-mono text-sm font-bold text-rose-800 mb-4">👀 Physical Attraction</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Preferred Body Type" value={data.preferences?.preferredBodyType} onChange={(e) => update('preferences', 'preferredBodyType', e.target.value)}
              options={[
                { value: 'no-preference', label: 'No Preference — Doesn\'t matter' },
                { value: 'slim', label: 'Slim/Thin — Lean bodies' },
                { value: 'athletic', label: 'Athletic — Fit and toned' },
                { value: 'muscular', label: 'Muscular — Built bodies' },
                { value: 'average', label: 'Average — Typical build' },
                { value: 'curvy', label: 'Curvy — Full figures' },
                { value: 'plus-size', label: 'Plus Size — Larger bodies' },
                { value: 'petite', label: 'Petite — Small and delicate' },
                { value: 'tall', label: 'Tall — Height matters' },
                { value: 'short', label: 'Short — Shorter partners' },
                { value: 'varies', label: 'Varies — Depends on person' }
              ]} />
            <IntimacySelect label="Age Preference (Relative)" value={data.preferences?.agePreference} onChange={(e) => update('preferences', 'agePreference', e.target.value)}
              options={[
                { value: 'same-age', label: 'Same Age — Peers' },
                { value: 'slightly-younger', label: 'Slightly Younger (1-5 years)' },
                { value: 'much-younger', label: 'Much Younger (5-10 years)' },
                { value: 'significantly-younger', label: 'Significantly Younger (10+ years)' },
                { value: 'slightly-older', label: 'Slightly Older (1-5 years)' },
                { value: 'much-older', label: 'Much Older (5-10 years)' },
                { value: 'significantly-older', label: 'Significantly Older (10+ years)' },
                { value: 'no-preference', label: 'No Preference — Age doesn\'t matter' },
                { value: 'varies', label: 'Varies — Case by case' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <IntimacySelect label="Hair Preference" value={data.preferences?.hairPreference} onChange={(e) => update('preferences', 'hairPreference', e.target.value)}
              options={[
                { value: 'no-preference', label: 'No Preference' },
                { value: 'long', label: 'Long Hair' },
                { value: 'short', label: 'Short Hair' },
                { value: 'bald', label: 'Bald/Shaved' },
                { value: 'dark', label: 'Dark Hair' },
                { value: 'light', label: 'Light/Blonde Hair' },
                { value: 'red', label: 'Red Hair' },
                { value: 'unique', label: 'Unique/Colored Hair' },
                { value: 'natural', label: 'Natural (not dyed)' }
              ]} />
            <IntimacySelect label="Facial Hair Preference" value={data.preferences?.facialHairPref} onChange={(e) => update('preferences', 'facialHairPref', e.target.value)}
              options={[
                { value: 'no-preference', label: 'No Preference' },
                { value: 'clean-shaven', label: 'Clean Shaven' },
                { value: 'stubble', label: 'Stubble' },
                { value: 'beard', label: 'Beard' },
                { value: 'mustache', label: 'Mustache' },
                { value: 'goatee', label: 'Goatee' },
                { value: 'any-facial-hair', label: 'Any Facial Hair' },
                { value: 'none', label: 'None — Prefers no facial hair' }
              ]} />
            <IntimacySelect label="Style/Presentation Pref" value={data.preferences?.stylePref} onChange={(e) => update('preferences', 'stylePref', e.target.value)}
              options={[
                { value: 'no-preference', label: 'No Preference' },
                { value: 'masculine', label: 'Masculine Presenting' },
                { value: 'feminine', label: 'Feminine Presenting' },
                { value: 'androgynous', label: 'Androgynous' },
                { value: 'well-dressed', label: 'Well-Dressed/Stylish' },
                { value: 'casual', label: 'Casual/Relaxed' },
                { value: 'alternative', label: 'Alternative/Edgy' },
                { value: 'professional', label: 'Professional' }
              ]} />
          </div>
          <IntimacyTextarea label="Other Physical Preferences" value={data.preferences?.physicalPreferences} onChange={(e) => update('preferences', 'physicalPreferences', e.target.value)}
            placeholder="Other physical traits they find attractive: eyes, smile, hands, voice, specific features..." />
        </div>

        {/* EMOTIONAL/PERSONALITY ATTRACTION */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-4">💝 Personality Attraction</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Personality Type Attraction" value={data.preferences?.personalityPref} onChange={(e) => update('preferences', 'personalityPref', e.target.value)}
              options={[
                { value: 'no-preference', label: 'No Preference' },
                { value: 'extrovert', label: 'Extroverts — Outgoing, social' },
                { value: 'introvert', label: 'Introverts — Quiet, thoughtful' },
                { value: 'ambivert', label: 'Ambiverts — Balanced' },
                { value: 'dominant', label: 'Dominant — Takes charge' },
                { value: 'submissive', label: 'Submissive — Follows lead' },
                { value: 'switch', label: 'Switch — Either role' },
                { value: 'confident', label: 'Confident — Self-assured' },
                { value: 'shy', label: 'Shy — Reserved' },
                { value: 'intellectual', label: 'Intellectual — Smart, thoughtful' },
                { value: 'creative', label: 'Creative — Artistic, imaginative' },
                { value: 'adventurous', label: 'Adventurous — Spontaneous' },
                { value: 'stable', label: 'Stable — Reliable, steady' }
              ]} />
            <IntimacySelect label="Intelligence Preference" value={data.preferences?.intelligencePref} onChange={(e) => update('preferences', 'intelligencePref', e.target.value)}
              options={[
                { value: 'no-preference', label: 'No Preference' },
                { value: 'sapiosexual', label: 'Sapiosexual — Highly attracted to intelligence' },
                { value: 'very-important', label: 'Very Important — Must be smart' },
                { value: 'important', label: 'Important — Values intelligence' },
                { value: 'somewhat', label: 'Somewhat Important' },
                { value: 'not-important', label: 'Not Important — Doesn\'t matter' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Humor Compatibility" value={data.preferences?.humorPref} onChange={(e) => update('preferences', 'humorPref', e.target.value)}
              options={[
                { value: 'essential', label: 'Essential — Must make them laugh' },
                { value: 'very-important', label: 'Very Important — Values humor highly' },
                { value: 'important', label: 'Important — Appreciates humor' },
                { value: 'somewhat', label: 'Somewhat Important' },
                { value: 'not-important', label: 'Not Important — Serious is fine' }
              ]} />
            <IntimacySelect label="Emotional Availability Pref" value={data.preferences?.emotionalPref} onChange={(e) => update('preferences', 'emotionalPref', e.target.value)}
              options={[
                { value: 'very-open', label: 'Very Open — Emotionally available' },
                { value: 'open', label: 'Open — Willing to share' },
                { value: 'balanced', label: 'Balanced — Not too much/little' },
                { value: 'reserved', label: 'Reserved — Keeps feelings private' },
                { value: 'mysterious', label: 'Mysterious — Hard to read' },
                { value: 'no-preference', label: 'No Preference' }
              ]} />
          </div>
          <IntimacyTextarea label="Other Personality Preferences" value={data.preferences?.emotionalPreferences} onChange={(e) => update('preferences', 'emotionalPreferences', e.target.value)}
            placeholder="Other personality traits they find attractive: kindness, ambition, loyalty, independence..." />
        </div>

        {/* TURN-ONS & TURN-OFFS */}
        <div className="border-2 border-orange-200 rounded-sm p-4 bg-orange-50/30">
          <h4 className="font-mono text-sm font-bold text-orange-800 mb-4">🔥 Turn-Ons & Turn-Offs</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Primary Turn-On Category" value={data.preferences?.turnOnCategory} onChange={(e) => update('preferences', 'turnOnCategory', e.target.value)}
              options={[
                { value: 'physical', label: 'Physical — Looks, touch, bodies' },
                { value: 'emotional', label: 'Emotional — Connection, intimacy' },
                { value: 'intellectual', label: 'Intellectual — Mind, conversation' },
                { value: 'power', label: 'Power — Dominance, control' },
                { value: 'submission', label: 'Submission — Being controlled' },
                { value: 'romance', label: 'Romance — Courtship, gestures' },
                { value: 'spontaneity', label: 'Spontaneity — Surprise, adventure' },
                { value: 'taboo', label: 'Taboo — Forbidden, risky' },
                { value: 'sensory', label: 'Sensory — Specific sensations' },
                { value: 'aesthetic', label: 'Aesthetic — Visual beauty' }
              ]} />
            <IntimacySelect label="Primary Turn-Off Category" value={data.preferences?.turnOffCategory} onChange={(e) => update('preferences', 'turnOffCategory', e.target.value)}
              options={[
                { value: 'dishonesty', label: 'Dishonesty — Lying, cheating' },
                { value: 'arrogance', label: 'Arrogance — Ego, condescension' },
                { value: 'hygiene', label: 'Poor Hygiene — Uncleanliness' },
                { value: 'disrespect', label: 'Disrespect — Rudeness, dismissiveness' },
                { value: 'neediness', label: 'Neediness — Clinginess, insecurity' },
                { value: 'coldness', label: 'Coldness — Emotional unavailability' },
                { value: 'aggression', label: 'Aggression — Anger, violence' },
                { value: 'laziness', label: 'Laziness — Lack of ambition' },
                { value: 'closed-minded', label: 'Closed-Mindedness — Judgmental' },
                { value: 'selfishness', label: 'Selfishness — Self-centered' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntimacyTextarea label="Specific Turn-Ons" value={data.preferences?.turnOns} onChange={(e) => update('preferences', 'turnOns', e.target.value)}
              placeholder="Specific things that attract or excite them..." />
            <IntimacyTextarea label="Specific Turn-Offs" value={data.preferences?.turnOffs} onChange={(e) => update('preferences', 'turnOffs', e.target.value)}
              placeholder="Specific things that repel or disgust them..." />
          </div>
        </div>

        {/* BOUNDARIES */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-4">🚧 Boundaries & Limits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Boundary Setting Style" value={data.preferences?.boundaryStyle} onChange={(e) => update('preferences', 'boundaryStyle', e.target.value)}
              options={[
                { value: 'very-clear', label: 'Very Clear — States boundaries explicitly' },
                { value: 'clear', label: 'Clear — Communicates boundaries' },
                { value: 'moderate', label: 'Moderate — Some boundaries stated' },
                { value: 'flexible', label: 'Flexible — Negotiable boundaries' },
                { value: 'unclear', label: 'Unclear — Doesn\'t communicate well' },
                { value: 'poor', label: 'Poor — Struggles with boundaries' }
              ]} />
            <IntimacySelect label="Openness to New Experiences" value={data.preferences?.opennessLevel} onChange={(e) => update('preferences', 'opennessLevel', e.target.value)}
              options={[
                { value: 'very-adventurous', label: 'Very Adventurous — Tries almost anything' },
                { value: 'adventurous', label: 'Adventurous — Open to new things' },
                { value: 'somewhat-open', label: 'Somewhat Open — Will consider things' },
                { value: 'cautious', label: 'Cautious — Needs convincing' },
                { value: 'conservative', label: 'Conservative — Prefers familiar' },
                { value: 'very-conservative', label: 'Very Conservative — Strict limits' }
              ]} />
          </div>
          <IntimacyTextarea label="Hard Boundaries" value={data.preferences?.boundaries} onChange={(e) => update('preferences', 'boundaries', e.target.value)}
            placeholder="Absolute limits, things they will never do or accept..." />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: INTIMATE BEHAVIOR ==========
    2: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 border border-fuchsia-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-fuchsia-900 mb-2">INTIMATE BEHAVIOR — In Relationships & Bed</h3>
          <p className="font-mono text-xs text-fuchsia-700">How the character behaves in intimate situations and relationships.</p>
        </div>

        {/* RELATIONSHIP BEHAVIOR */}
        <div className="border-2 border-fuchsia-200 rounded-sm p-4 bg-fuchsia-50/30">
          <h4 className="font-mono text-sm font-bold text-fuchsia-800 mb-4">💑 Relationship Behavior</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Attachment Style" value={data.behavior?.attachmentStyle} onChange={(e) => update('behavior', 'attachmentStyle', e.target.value)}
              options={[
                { value: 'secure', label: 'Secure — Comfortable with intimacy and independence' },
                { value: 'anxious', label: 'Anxious — Needs reassurance, fears abandonment' },
                { value: 'avoidant', label: 'Avoidant — Values independence, uncomfortable with closeness' },
                { value: 'fearful-avoidant', label: 'Fearful-Avoidant — Wants closeness but fears it' },
                { value: 'earned-secure', label: 'Earned Secure — Worked through insecure attachment' }
              ]} />
            <IntimacySelect label="Jealousy Level" value={data.behavior?.jealousyLevel} onChange={(e) => update('behavior', 'jealousyLevel', e.target.value)}
              options={[
                { value: 'none', label: 'None — Never jealous' },
                { value: 'minimal', label: 'Minimal — Rarely jealous' },
                { value: 'low', label: 'Low — Occasionally jealous' },
                { value: 'moderate', label: 'Moderate — Sometimes jealous' },
                { value: 'high', label: 'High — Often jealous' },
                { value: 'very-high', label: 'Very High — Extremely jealous' },
                { value: 'possessive', label: 'Possessive — Controlling jealousy' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Communication Style" value={data.behavior?.communicationStyle} onChange={(e) => update('behavior', 'communicationStyle', e.target.value)}
              options={[
                { value: 'very-open', label: 'Very Open — Shares everything' },
                { value: 'open', label: 'Open — Communicates well' },
                { value: 'moderate', label: 'Moderate — Shares when needed' },
                { value: 'reserved', label: 'Reserved — Keeps some things private' },
                { value: 'closed', label: 'Closed — Rarely shares feelings' },
                { value: 'avoidant', label: 'Avoidant — Avoids difficult conversations' }
              ]} />
            <IntimacySelect label="Conflict Style" value={data.behavior?.conflictStyle} onChange={(e) => update('behavior', 'conflictStyle', e.target.value)}
              options={[
                { value: 'collaborative', label: 'Collaborative — Works together' },
                { value: 'compromising', label: 'Compromising — Finds middle ground' },
                { value: 'accommodating', label: 'Accommodating — Gives in easily' },
                { value: 'competitive', label: 'Competitive — Must win' },
                { value: 'avoidant', label: 'Avoidant — Avoids conflict' },
                { value: 'explosive', label: 'Explosive — Blows up' },
                { value: 'passive-aggressive', label: 'Passive-Aggressive — Indirect' },
                { value: 'silent-treatment', label: 'Silent Treatment — Shuts down' }
              ]} />
          </div>
          <div className="space-y-4">
            <IntimacySlider label="Initiative/Pursuing" value={data.behavior?.initiativeLevel} onChange={(e) => update('behavior', 'initiativeLevel', parseInt(e.target.value))}
              leftLabel="Waits to be pursued" rightLabel="Always initiates" />
            <IntimacySlider label="Vulnerability Level" value={data.behavior?.vulnerabilityLevel} onChange={(e) => update('behavior', 'vulnerabilityLevel', parseInt(e.target.value))}
              leftLabel="Guarded/Protected" rightLabel="Completely open" />
          </div>
        </div>

        {/* INTIMACY STYLE */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-4">🔥 Intimacy Style</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="General Approach" value={data.behavior?.intimacyApproach} onChange={(e) => update('behavior', 'intimacyApproach', e.target.value)}
              options={[
                { value: 'passionate', label: 'Passionate — Intense, fiery' },
                { value: 'romantic', label: 'Romantic — Tender, loving' },
                { value: 'playful', label: 'Playful — Fun, lighthearted' },
                { value: 'sensual', label: 'Sensual — Slow, focused on sensation' },
                { value: 'dominant', label: 'Dominant — Takes control' },
                { value: 'submissive', label: 'Submissive — Follows lead' },
                { value: 'switch', label: 'Switch — Either role' },
                { value: 'adventurous', label: 'Adventurous — Tries new things' },
                { value: 'vanilla', label: 'Vanilla — Traditional, simple' },
                { value: 'kinky', label: 'Kinky — Into specific interests' },
                { value: 'mechanical', label: 'Mechanical — Goes through motions' },
                { value: 'emotional', label: 'Emotional — Needs connection' }
              ]} />
            <IntimacySelect label="Libido/Drive" value={data.behavior?.libido} onChange={(e) => update('behavior', 'libido', e.target.value)}
              options={[
                { value: 'none', label: 'None — Asexual/No drive' },
                { value: 'very-low', label: 'Very Low — Rarely interested' },
                { value: 'low', label: 'Low — Occasionally interested' },
                { value: 'moderate', label: 'Moderate — Average drive' },
                { value: 'high', label: 'High — Frequently interested' },
                { value: 'very-high', label: 'Very High — Almost always interested' },
                { value: 'insatiable', label: 'Insatiable — Constantly wants more' },
                { value: 'variable', label: 'Variable — Changes with mood/situation' }
              ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <IntimacySelect label="Preferred Frequency" value={data.behavior?.preferredFrequency} onChange={(e) => update('behavior', 'preferredFrequency', e.target.value)}
              options={[
                { value: 'rarely', label: 'Rarely — Few times a year' },
                { value: 'occasionally', label: 'Occasionally — Monthly' },
                { value: 'regularly', label: 'Regularly — Weekly' },
                { value: 'often', label: 'Often — Multiple times/week' },
                { value: 'daily', label: 'Daily — Every day' },
                { value: 'multiple-daily', label: 'Multiple Daily — Several times/day' },
                { value: 'no-preference', label: 'No Preference — Flexible' }
              ]} />
            <IntimacySelect label="Preferred Time" value={data.behavior?.preferredTime} onChange={(e) => update('behavior', 'preferredTime', e.target.value)}
              options={[
                { value: 'morning', label: 'Morning — After waking' },
                { value: 'afternoon', label: 'Afternoon — Midday' },
                { value: 'evening', label: 'Evening — After dinner' },
                { value: 'night', label: 'Night — Before bed' },
                { value: 'late-night', label: 'Late Night — Middle of night' },
                { value: 'anytime', label: 'Anytime — No preference' },
                { value: 'spontaneous', label: 'Spontaneous — Whenever mood strikes' }
              ]} />
            <IntimacySelect label="Preferred Setting" value={data.behavior?.preferredSetting} onChange={(e) => update('behavior', 'preferredSetting', e.target.value)}
              options={[
                { value: 'bedroom', label: 'Bedroom — Traditional' },
                { value: 'anywhere-home', label: 'Anywhere at Home' },
                { value: 'adventurous', label: 'Adventurous — Unusual places' },
                { value: 'outdoor', label: 'Outdoor — Nature' },
                { value: 'public-risk', label: 'Public/Risk — Thrill of being caught' },
                { value: 'romantic-setting', label: 'Romantic Setting — Candles, music' },
                { value: 'no-preference', label: 'No Preference' }
              ]} />
          </div>
          <div className="space-y-4">
            <IntimacySlider label="Intensity Level" value={data.behavior?.intensityLevel} onChange={(e) => update('behavior', 'intensityLevel', parseInt(e.target.value))}
              leftLabel="Gentle/Soft" rightLabel="Rough/Intense" />
            <IntimacySlider label="Noise Level" value={data.behavior?.noiseLevel} onChange={(e) => update('behavior', 'noiseLevel', parseInt(e.target.value))}
              leftLabel="Silent/Quiet" rightLabel="Very Vocal" />
            <IntimacySlider label="Duration Preference" value={data.behavior?.durationPref} onChange={(e) => update('behavior', 'durationPref', parseInt(e.target.value))}
              leftLabel="Quick" rightLabel="Extended/Marathon" />
          </div>
        </div>

        {/* AFTER INTIMACY */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-4">🌙 After Intimacy</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Aftercare Needs" value={data.behavior?.aftercareNeeds} onChange={(e) => update('behavior', 'aftercareNeeds', e.target.value)}
              options={[
                { value: 'none', label: 'None — Doesn\'t need aftercare' },
                { value: 'minimal', label: 'Minimal — Brief check-in' },
                { value: 'moderate', label: 'Moderate — Some cuddling/talking' },
                { value: 'significant', label: 'Significant — Extended aftercare' },
                { value: 'extensive', label: 'Extensive — Needs lots of attention' }
              ]} />
            <IntimacySelect label="Post-Intimacy Behavior" value={data.behavior?.postIntimacyBehavior} onChange={(e) => update('behavior', 'postIntimacyBehavior', e.target.value)}
              options={[
                { value: 'cuddler', label: 'Cuddler — Wants to snuggle' },
                { value: 'talker', label: 'Talker — Wants to chat' },
                { value: 'sleeper', label: 'Sleeper — Falls asleep quickly' },
                { value: 'hungry', label: 'Hungry — Wants food' },
                { value: 'energized', label: 'Energized — Ready to do things' },
                { value: 'space-needed', label: 'Space Needed — Needs alone time' },
                { value: 'clingy', label: 'Clingy — Doesn\'t want to separate' },
                { value: 'awkward', label: 'Awkward — Feels uncomfortable' },
                { value: 'varies', label: 'Varies — Depends on mood' }
              ]} />
          </div>
        </div>

        {/* FANTASIES & INTERESTS */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-4">💭 Fantasies & Interests</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <IntimacySelect label="Fantasy Sharing" value={data.behavior?.fantasySharing} onChange={(e) => update('behavior', 'fantasySharing', e.target.value)}
              options={[
                { value: 'open', label: 'Open — Shares fantasies freely' },
                { value: 'with-trust', label: 'With Trust — Shares with trusted partners' },
                { value: 'hints', label: 'Hints — Drops hints, doesn\'t say directly' },
                { value: 'private', label: 'Private — Keeps fantasies to self' },
                { value: 'ashamed', label: 'Ashamed — Embarrassed by fantasies' },
                { value: 'none', label: 'None — Doesn\'t have fantasies' }
              ]} />
            <IntimacySelect label="Interest in Roleplay" value={data.behavior?.roleplayInterest} onChange={(e) => update('behavior', 'roleplayInterest', e.target.value)}
              options={[
                { value: 'loves-it', label: 'Loves It — Very into roleplay' },
                { value: 'enjoys', label: 'Enjoys — Likes it sometimes' },
                { value: 'open', label: 'Open — Willing to try' },
                { value: 'neutral', label: 'Neutral — Take it or leave it' },
                { value: 'uncomfortable', label: 'Uncomfortable — Doesn\'t like it' },
                { value: 'refuses', label: 'Refuses — Won\'t do it' }
              ]} />
          </div>
          <IntimacyTextarea label="Fantasies & Interests (Notes)" value={data.behavior?.fantasies} onChange={(e) => update('behavior', 'fantasies', e.target.value)}
            placeholder="Additional notes about fantasies and interests..." />
        </div>

        {/* KINKS SELECTION */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">🔥 Kinks Selection</h4>
          <p className="font-mono text-[10px] text-red-600 mb-4">Select all kinks that apply to this character. These are activities or dynamics they enjoy.</p>

          {/* Power Exchange */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">⚡ Power Exchange</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Dominance', 'Submission', 'Switching', 'Master/Slave', 'Pet Play', 'Ownership', 'Service Submission', 'Power Bottom', 'Gentle Domination', 'Strict Domination', 'Bratting', 'Taming', 'Worship', 'Objectification', 'Human Furniture', 'Control'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Bondage & Restraint */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">🔗 Bondage & Restraint</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Light Bondage', 'Rope Bondage', 'Shibari', 'Handcuffs', 'Chains', 'Leather Restraints', 'Spreader Bars', 'Suspension', 'Mummification', 'Predicament Bondage', 'Self-Bondage', 'Blindfolds', 'Gags', 'Hoods', 'Collars', 'Leashes'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Impact Play */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">👋 Impact Play</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Spanking', 'Paddling', 'Flogging', 'Whipping', 'Caning', 'Cropping', 'Slapping', 'Hair Pulling', 'Biting', 'Scratching', 'Belt', 'Hand Spanking', 'OTK (Over The Knee)', 'Bruising', 'Marking'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Sensory Play */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">✨ Sensory Play</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Sensation Play', 'Temperature Play', 'Ice Play', 'Wax Play', 'Feathers', 'Pinwheels', 'Electrostimulation', 'Tickling', 'Sensory Deprivation', 'Overstimulation', 'Edging', 'Orgasm Control', 'Orgasm Denial', 'Forced Orgasms', 'Ruined Orgasms', 'Chastity'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Role Play Scenarios */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">🎭 Role Play Scenarios</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Teacher/Student', 'Boss/Employee', 'Doctor/Patient', 'Stranger Scenario', 'Age Play (Adult)', 'Uniform Play', 'Authority Figures', 'Interrogation', 'Captured/Captor', 'Servant/Royalty', 'Massage Therapist', 'Personal Trainer', 'Celebrity/Fan', 'Photographer/Model', 'Landlord/Tenant', 'Interview Scenario'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Exhibition & Voyeurism */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">👁️ Exhibition & Voyeurism</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Exhibitionism', 'Voyeurism', 'Public Play', 'Semi-Public', 'Being Watched', 'Watching Others', 'Mirrors', 'Recording (Consensual)', 'Photos (Consensual)', 'Video Calls', 'Window Play', 'Car Play', 'Outdoor Sex', 'Risk of Discovery', 'Performing', 'Stripping'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Group & Sharing */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">👥 Group & Sharing</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Threesomes', 'Group Sex', 'Orgies', 'Gangbang', 'Cuckolding', 'Cuckqueaning', 'Hotwifing', 'Swinging', 'Swapping', 'Double Penetration', 'Spitroasting', 'Bukkake', 'Same Room Sex', 'Partner Sharing', 'Being Shared', 'Watching Partner'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Psychological */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">🧠 Psychological</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Humiliation', 'Degradation', 'Praise Kink', 'Begging', 'Name Calling', 'Dirty Talk', 'Mind Games', 'Blackmail Fantasy', 'Consensual Non-Consent', 'Fear Play', 'Crying', 'Comforting', 'Aftercare Heavy', 'Mindfuck', 'Gaslighting (Scene)', 'Total Power Exchange'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Physical Acts */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">💋 Physical Acts & Positions</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Oral (Giving)', 'Oral (Receiving)', 'Deep Throat', 'Face Sitting', 'Rimming', 'Anal', 'Pegging', 'Fisting', 'Fingering', 'Handjobs', 'Prostate Play', 'Rough Sex', 'Gentle Sex', 'Marathon Sex', 'Quickies', 'Morning Sex', 'Shower Sex', 'Bath Sex', 'Standing Sex', 'Against Wall', 'On Furniture', 'Floor Sex', '69', 'Cowgirl', 'Reverse Cowgirl', 'Doggy Style', 'Missionary', 'Spooning', 'Prone Bone', 'Lotus'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Toys & Tools */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">🎀 Toys & Tools</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Vibrators', 'Dildos', 'Butt Plugs', 'Anal Beads', 'Cock Rings', 'Nipple Clamps', 'Nipple Suckers', 'Pumps', 'Fucking Machines', 'Strapons', 'Double-Ended', 'Remote Control Toys', 'Wearable Toys', 'Sounds', 'Speculums', 'Chastity Devices'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>

          {/* Other Kinks */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 border-b border-red-200 pb-1">✨ Other Kinks</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Breeding', 'Creampie', 'Cum Play', 'Facials', 'Body Worship', 'Massage', 'Oil/Lotion', 'Food Play', 'Wet & Messy', 'Squirting', 'Multiple Orgasms', 'Tantric', 'Mutual Masturbation', 'Phone Sex', 'Sexting', 'Long Distance Play', 'Teasing', 'Seduction', 'Corruption', 'Innocence', 'Experience Gap', 'Size Difference', 'Strength Difference', 'Free Use'].map(kink => (
                <label key={kink} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-red-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.kinks || []).includes(kink)} onChange={(e) => {
                    const current = data.behavior?.kinks || [];
                    const updated = e.target.checked ? [...current, kink] : current.filter(k => k !== kink);
                    update('behavior', 'kinks', updated);
                  }} className="w-3 h-3 accent-red-600" />
                  {kink}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* FETISHES SELECTION */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-2">💜 Fetishes Selection</h4>
          <p className="font-mono text-[10px] text-violet-600 mb-4">Select all fetishes that apply. Fetishes are specific attractions to objects, materials, body parts, or situations.</p>

          {/* Body Parts */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">🦶 Body Parts</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Feet', 'Toes', 'Legs', 'Thighs', 'Calves', 'Ankles', 'Hands', 'Fingers', 'Nails', 'Arms', 'Armpits', 'Neck', 'Shoulders', 'Back', 'Spine', 'Stomach', 'Navel', 'Hips', 'Butt', 'Breasts', 'Nipples', 'Chest', 'Collarbones', 'Lips', 'Mouth', 'Tongue', 'Ears', 'Hair', 'Eyes', 'Nose', 'Muscles', 'Veins'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Clothing & Fashion */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">👗 Clothing & Fashion</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Lingerie', 'Stockings', 'Pantyhose', 'Garter Belts', 'Corsets', 'High Heels', 'Boots', 'Uniforms', 'Suits', 'Dresses', 'Skirts', 'Jeans', 'Leggings', 'Yoga Pants', 'Swimwear', 'Underwear', 'Boxers', 'Briefs', 'Thongs', 'Glasses', 'Masks', 'Gloves', 'Hats', 'Jewelry', 'Watches', 'Chokers', 'Collars', 'Ties', 'Suspenders', 'Cross-Dressing', 'Gender-Bent Clothing', 'Cosplay'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Materials & Textures */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">🖤 Materials & Textures</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Leather', 'Latex', 'Rubber', 'PVC', 'Vinyl', 'Silk', 'Satin', 'Velvet', 'Lace', 'Mesh', 'Sheer Fabric', 'Fur', 'Feathers', 'Metal', 'Chains', 'Rope', 'Cotton', 'Denim', 'Spandex', 'Nylon', 'Wet Fabric', 'Tight Clothing', 'Loose Clothing'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">💪 Physical Attributes</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Tall Partners', 'Short Partners', 'Muscular Build', 'Slim Build', 'Curvy/Thick', 'Plus Size', 'Petite', 'Body Hair', 'Hairless/Smooth', 'Tattoos', 'Piercings', 'Scars', 'Freckles', 'Tan Lines', 'Pale Skin', 'Dark Skin', 'Red Hair', 'Blonde Hair', 'Dark Hair', 'Gray/Silver Hair', 'Long Hair', 'Short Hair', 'Bald', 'Beards', 'Stubble', 'Clean Shaven', 'Pregnancy', 'Lactation', 'Sweat', 'Natural Scent'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Situations & Scenarios */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">🎬 Situations & Scenarios</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['First Time', 'Virginity', 'Innocence', 'Experience', 'Affairs', 'Forbidden', 'Secret Relationships', 'Taboo', 'Cheating Fantasy', 'Revenge Sex', 'Make-Up Sex', 'Angry Sex', 'Hate Sex', 'Jealousy Sex', 'Competition', 'Bet/Wager', 'Dares', 'Truth or Dare', 'Spin the Bottle', 'Seven Minutes', 'Blind Date', 'One Night Stand', 'Friends to Lovers', 'Enemies to Lovers', 'Reunion', 'Long Distance', 'Vacation Sex', 'Hotel Rooms', 'Office Sex', 'Workplace', 'School Reunion', 'Wedding Night'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Sensory & Atmosphere */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">🕯️ Sensory & Atmosphere</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Candlelight', 'Fireplace', 'Rain/Storm', 'Music', 'Silence', 'Darkness', 'Dim Lighting', 'Bright Light', 'Mirrors', 'Windows', 'Nature Setting', 'Beach', 'Forest', 'Mountains', 'Water', 'Hot Tub', 'Pool', 'Sauna', 'Steam Room', 'Bubble Bath', 'Shower', 'Perfume/Cologne', 'Incense', 'Flowers', 'Chocolate', 'Wine', 'Champagne', 'Strawberries', 'Whipped Cream', 'Ice Cream'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Age & Experience Related */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">⏳ Age & Experience (Adults Only)</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Older Partners', 'Younger Partners (18+)', 'Same Age', 'Age Gap', 'MILF/DILF', 'Cougars/Cubs', 'Silver Fox', 'Maturity', 'Youthful Energy', 'Experience Gap', 'Teaching/Learning', 'Mentor/Protégé', 'Sugar Dynamics', 'Trophy Partner'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Voice & Sound */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">🎤 Voice & Sound</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Deep Voice', 'High Voice', 'Soft Voice', 'Commanding Voice', 'Accent', 'Foreign Language', 'Whispering', 'Moaning', 'Screaming', 'Gasping', 'Breathing', 'Grunting', 'Growling', 'Laughing', 'Talking Dirty', 'Praise', 'Begging Sounds', 'Crying Sounds'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>

          {/* Other Fetishes */}
          <div className="mb-4">
            <h5 className="font-mono text-xs font-bold text-violet-700 mb-2 border-b border-violet-200 pb-1">✨ Other Fetishes</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {['Intelligence', 'Competence', 'Power/Status', 'Wealth', 'Danger', 'Bad Boy/Girl', 'Good Boy/Girl', 'Nerds/Geeks', 'Jocks/Athletes', 'Artists', 'Musicians', 'Writers', 'Doctors', 'Military', 'Police', 'Firefighters', 'Teachers', 'Librarians', 'Chefs', 'Bartenders', 'Models', 'Dancers', 'Performers', 'Royalty', 'Vampires', 'Werewolves', 'Angels', 'Demons', 'Aliens', 'Robots/AI', 'Tentacles', 'Monsters'].map(fetish => (
                <label key={fetish} className="flex items-center gap-1 font-mono text-[10px] text-gray-700 cursor-pointer hover:bg-violet-100 p-1 rounded">
                  <input type="checkbox" checked={(data.behavior?.fetishes || []).includes(fetish)} onChange={(e) => {
                    const current = data.behavior?.fetishes || [];
                    const updated = e.target.checked ? [...current, fetish] : current.filter(f => f !== fetish);
                    update('behavior', 'fetishes', updated);
                  }} className="w-3 h-3 accent-violet-600" />
                  {fetish}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

// ============================================================================
// GENERIC TAB CONTENT (Placeholder)
// ============================================================================
// ============================================================================
// OCCUPATION CONTENT - Complete Implementation
// ============================================================================


export default IntimacyContent;
