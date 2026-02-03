import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';
import { Icons } from '../ui/Icons';

const VoiceContent = ({ data, updateData, subtab, characterNationality }) => {
  const update = (section, field, value) => {
    updateData('voice', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  // ElevenLabs compatible accent options based on regions
  const ACCENT_OPTIONS = {
    'American': ['General American', 'Southern American', 'New York', 'Boston', 'California', 'Midwest', 'Texas', 'African American Vernacular'],
    'British': ['Received Pronunciation (RP)', 'Cockney', 'Northern English', 'Scottish', 'Welsh', 'Irish', 'West Country', 'Midlands'],
    'Australian': ['General Australian', 'Broad Australian', 'Cultivated Australian'],
    'European': ['French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Russian', 'Greek', 'Czech', 'Hungarian'],
    'Asian': ['Chinese (Mandarin)', 'Japanese', 'Korean', 'Vietnamese', 'Thai', 'Filipino', 'Indian', 'Pakistani', 'Indonesian', 'Malaysian'],
    'Middle Eastern': ['Arabic', 'Persian/Farsi', 'Turkish', 'Hebrew', 'Kurdish'],
    'African': ['South African', 'Nigerian', 'Kenyan', 'Egyptian', 'Moroccan', 'Ethiopian'],
    'Latin American': ['Mexican', 'Brazilian', 'Argentine', 'Colombian', 'Cuban', 'Puerto Rican', 'Chilean', 'Peruvian'],
    'Other': ['Canadian', 'New Zealand', 'Caribbean', 'Neutral/No specific accent']
  };

  // Voice texture descriptors for ElevenLabs
  const VOICE_TEXTURES = [
    'Silky', 'Velvety', 'Honeyed', 'Buttery', 'Crisp', 'Crystalline', 'Gravelly', 'Gritty',
    'Husky', 'Smoky', 'Raspy', 'Throaty', 'Breathy', 'Airy', 'Wispy', 'Resonant', 'Booming',
    'Commanding', 'Authoritative', 'Gentle', 'Soothing', 'Melodic', 'Musical', 'Lilting',
    'Monotone', 'Flat', 'Nasal', 'Whiny', 'Squeaky', 'Shrill', 'Piercing', 'Rumbling'
  ];

  // Emotional base tones
  const EMOTIONAL_TONES = [
    'Cheerful', 'Warm', 'Friendly', 'Professional', 'Serious', 'Calm', 'Soothing',
    'Energetic', 'Enthusiastic', 'Confident', 'Authoritative', 'Mysterious', 'Seductive',
    'Playful', 'Mischievous', 'Melancholic', 'Sad', 'Tired', 'Bored', 'Anxious',
    'Nervous', 'Angry', 'Stern', 'Cold', 'Detached', 'Neutral', 'Matter-of-fact'
  ];

  // Generate ElevenLabs compatible voice description
  const generateVoiceDescription = () => {
    const parts = [];

    // Gender and age
    if (data.design?.voiceGender) parts.push(data.design.voiceGender);
    if (data.design?.voiceAge) parts.push(`${data.design.voiceAge} voice`);

    // Main characteristics based on sliders
    const pitch = data.design?.pitch || 5;
    if (pitch <= 3) parts.push('deep');
    else if (pitch >= 7) parts.push('high-pitched');

    const warmth = data.design?.timbreWarmth || 5;
    if (warmth <= 3) parts.push('cold');
    else if (warmth >= 7) parts.push('warm');

    const brightness = data.design?.timbreBrightness || 5;
    if (brightness >= 7) parts.push('bright');
    else if (brightness <= 3) parts.push('dark');

    const smoothness = data.design?.timbreSmoothness || 5;
    if (smoothness >= 7) parts.push('smooth');
    else if (smoothness <= 3) parts.push('rough');

    const richness = data.design?.timbreRichness || 5;
    if (richness >= 7) parts.push('rich');
    else if (richness <= 3) parts.push('thin');

    // Special characteristics
    const breathiness = data.design?.breathiness || 3;
    if (breathiness >= 6) parts.push('breathy');

    const nasality = data.design?.nasality || 3;
    if (nasality >= 6) parts.push('nasal');

    const roughness = data.design?.roughness || 3;
    if (roughness >= 6) parts.push('raspy');

    const resonance = data.design?.resonance || 5;
    if (resonance <= 3) parts.push('chest voice');
    else if (resonance >= 7) parts.push('head voice');

    // Texture and tone
    if (data.design?.voiceTexture) parts.push(data.design.voiceTexture.toLowerCase());
    if (data.design?.emotionalTone) parts.push(`${data.design.emotionalTone.toLowerCase()} tone`);

    // Speed
    const speed = data.design?.speed || 5;
    if (speed <= 3) parts.push('slow-paced');
    else if (speed >= 7) parts.push('fast-paced');

    // Accent
    if (data.languages?.accent) {
      const strength = data.languages?.accentStrength || 5;
      const strengthWord = strength <= 3 ? 'slight' : strength >= 7 ? 'strong' : 'moderate';
      parts.push(`with ${strengthWord} ${data.languages.accent} accent`);
    }

    return parts.join(', ') || 'No voice characteristics defined yet.';
  };

  // Voice slider component with visual feedback
  const VoiceSlider = ({ label, value, onChange, leftLabel, rightLabel, color = 'amber', description }) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="font-mono text-xs font-bold text-gray-700">{label}</label>
        <span className={`font-mono text-xs font-bold text-${color}-600`}>{value}/10</span>
      </div>
      {description && <p className="font-mono text-[9px] text-gray-500">{description}</p>}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-gray-500 w-16 text-right">{leftLabel}</span>
        <input
          type="range"
          min="1"
          max="10"
          value={value || 5}
          onChange={onChange}
          className={`flex-1 h-2 bg-gradient-to-r from-${color}-200 via-${color}-100 to-${color}-200 rounded-lg appearance-none cursor-pointer accent-${color}-600`}
        />
        <span className="font-mono text-[10px] text-gray-500 w-16">{rightLabel}</span>
      </div>
    </div>
  );

  const sections = {
    // ========== SUBTAB 0: VOICE DESIGN (ElevenLabs Compatible) ==========
    0: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">🎙️ VOICE DESIGN</h3>
          <p className="font-mono text-xs text-amber-700 mb-1">ElevenLabs Voice Design compatible parameters.</p>
          <p className="font-mono text-[10px] text-amber-600">Configure pitch, timbre, texture, and vocal characteristics.</p>
        </div>

        {/* Basic Voice Properties */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-xs font-bold text-amber-800 mb-4">📌 BASIC PROPERTIES</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Voice Gender</label>
              <select
                value={data.design?.voiceGender || ''}
                onChange={(e) => update('design', 'voiceGender', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Androgynous">Androgynous</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Voice Age</label>
              <select
                value={data.design?.voiceAge || ''}
                onChange={(e) => update('design', 'voiceAge', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Child">Child (under 12)</option>
                <option value="Teen">Teen (13-19)</option>
                <option value="Young adult">Young adult (20-35)</option>
                <option value="Middle-aged">Middle-aged (36-55)</option>
                <option value="Mature">Mature (56-70)</option>
                <option value="Elderly">Elderly (70+)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <VoiceSlider
              label="Pitch"
              value={data.design?.pitch || 5}
              onChange={(e) => update('design', 'pitch', parseInt(e.target.value))}
              leftLabel="Deep/Low"
              rightLabel="High"
              description="Base pitch of the voice"
            />
            <VoiceSlider
              label="Pitch Variation"
              value={data.design?.pitchVariation || 5}
              onChange={(e) => update('design', 'pitchVariation', parseInt(e.target.value))}
              leftLabel="Monotone"
              rightLabel="Expressive"
              description="How much the pitch varies during speech"
            />
            <VoiceSlider
              label="Speaking Speed"
              value={data.design?.speed || 5}
              onChange={(e) => update('design', 'speed', parseInt(e.target.value))}
              leftLabel="Slow"
              rightLabel="Fast"
            />
            <VoiceSlider
              label="Volume/Projection"
              value={data.design?.volume || 5}
              onChange={(e) => update('design', 'volume', parseInt(e.target.value))}
              leftLabel="Soft/Quiet"
              rightLabel="Loud"
            />
          </div>
        </div>

        {/* Timbre Section */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-xs font-bold text-purple-800 mb-4">🎨 TIMBRE CHARACTERISTICS</h4>
          <p className="font-mono text-[9px] text-purple-600 mb-4">The unique color and texture of the voice</p>

          <div className="space-y-4">
            <VoiceSlider
              label="Warmth"
              value={data.design?.timbreWarmth || 5}
              onChange={(e) => update('design', 'timbreWarmth', parseInt(e.target.value))}
              leftLabel="Cold"
              rightLabel="Warm"
              color="purple"
            />
            <VoiceSlider
              label="Brightness"
              value={data.design?.timbreBrightness || 5}
              onChange={(e) => update('design', 'timbreBrightness', parseInt(e.target.value))}
              leftLabel="Dark"
              rightLabel="Bright"
              color="purple"
            />
            <VoiceSlider
              label="Richness"
              value={data.design?.timbreRichness || 5}
              onChange={(e) => update('design', 'timbreRichness', parseInt(e.target.value))}
              leftLabel="Thin"
              rightLabel="Rich/Full"
              color="purple"
            />
            <VoiceSlider
              label="Smoothness"
              value={data.design?.timbreSmoothness || 5}
              onChange={(e) => update('design', 'timbreSmoothness', parseInt(e.target.value))}
              leftLabel="Rough"
              rightLabel="Smooth"
              color="purple"
            />
            <VoiceSlider
              label="Clarity"
              value={data.design?.clarity || 7}
              onChange={(e) => update('design', 'clarity', parseInt(e.target.value))}
              leftLabel="Muffled"
              rightLabel="Crystal Clear"
              color="purple"
            />
          </div>
        </div>

        {/* Special Characteristics */}
        <div className="border-2 border-teal-200 rounded-sm p-4 bg-teal-50/30">
          <h4 className="font-mono text-xs font-bold text-teal-800 mb-4">✨ SPECIAL CHARACTERISTICS</h4>

          <div className="space-y-4">
            <VoiceSlider
              label="Breathiness"
              value={data.design?.breathiness || 3}
              onChange={(e) => update('design', 'breathiness', parseInt(e.target.value))}
              leftLabel="None"
              rightLabel="Very Breathy"
              color="teal"
              description="Amount of air/breath sound in voice"
            />
            <VoiceSlider
              label="Nasality"
              value={data.design?.nasality || 3}
              onChange={(e) => update('design', 'nasality', parseInt(e.target.value))}
              leftLabel="None"
              rightLabel="Very Nasal"
              color="teal"
            />
            <VoiceSlider
              label="Roughness/Hoarseness"
              value={data.design?.roughness || 3}
              onChange={(e) => update('design', 'roughness', parseInt(e.target.value))}
              leftLabel="None"
              rightLabel="Very Raspy"
              color="teal"
              description="Gravelly, raspy quality"
            />
            <VoiceSlider
              label="Resonance"
              value={data.design?.resonance || 5}
              onChange={(e) => update('design', 'resonance', parseInt(e.target.value))}
              leftLabel="Chest Voice"
              rightLabel="Head Voice"
              color="teal"
              description="Where the voice resonates"
            />
          </div>
        </div>

        {/* Voice Texture & Emotional Tone */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-4">🎭 TEXTURE & EMOTIONAL TONE</h4>

          <div className="mb-4">
            <label className="block font-mono text-xs font-bold text-gray-700 mb-2">Voice Texture Descriptor</label>
            <div className="flex flex-wrap gap-2">
              {VOICE_TEXTURES.map((texture) => (
                <button
                  key={texture}
                  onClick={() => update('design', 'voiceTexture', data.design?.voiceTexture === texture ? '' : texture)}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    data.design?.voiceTexture === texture
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {texture}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-bold text-gray-700 mb-2">Base Emotional Tone</label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONAL_TONES.map((tone) => (
                <button
                  key={tone}
                  onClick={() => update('design', 'emotionalTone', data.design?.emotionalTone === tone ? '' : tone)}
                  className={`px-2 py-1 rounded-sm font-mono text-[10px] transition-all ${
                    data.design?.emotionalTone === tone
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: SPEECH PATTERNS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">💬 SPEECH PATTERNS</h3>
          <p className="font-mono text-xs text-blue-700">How the character speaks: rhythm, pauses, articulation, and verbal habits.</p>
        </div>

        {/* Articulation & Structure */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-xs font-bold text-blue-800 mb-4">🗣️ ARTICULATION & STRUCTURE</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Articulation</label>
              <select
                value={data.speech?.articulation || ''}
                onChange={(e) => update('speech', 'articulation', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Crisp and precise">Crisp and precise</option>
                <option value="Clear but relaxed">Clear but relaxed</option>
                <option value="Average/Normal">Average/Normal</option>
                <option value="Slightly mumbled">Slightly mumbled</option>
                <option value="Often mumbles">Often mumbles</option>
                <option value="Slurred">Slurred</option>
                <option value="Over-enunciated">Over-enunciated</option>
                <option value="Theatrical">Theatrical</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Sentence Structure</label>
              <select
                value={data.speech?.sentenceStructure || ''}
                onChange={(e) => update('speech', 'sentenceStructure', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Short and direct">Short and direct</option>
                <option value="Simple and clear">Simple and clear</option>
                <option value="Average complexity">Average complexity</option>
                <option value="Long and elaborate">Long and elaborate</option>
                <option value="Complex and winding">Complex and winding</option>
                <option value="Fragmented">Fragmented/Incomplete</option>
                <option value="Poetic and flowing">Poetic and flowing</option>
                <option value="Technical and precise">Technical and precise</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Speech Rhythm</label>
              <select
                value={data.speech?.speechRhythm || ''}
                onChange={(e) => update('speech', 'speechRhythm', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Steady and even">Steady and even</option>
                <option value="Staccato/Punchy">Staccato/Punchy</option>
                <option value="Flowing and smooth">Flowing and smooth</option>
                <option value="Halting and hesitant">Halting and hesitant</option>
                <option value="Rapid bursts">Rapid bursts</option>
                <option value="Deliberate and measured">Deliberate and measured</option>
                <option value="Musical/Sing-song">Musical/Sing-song</option>
                <option value="Unpredictable">Unpredictable/Variable</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Pause Pattern</label>
              <select
                value={data.speech?.pausePattern || ''}
                onChange={(e) => update('speech', 'pausePattern', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Minimal pauses">Minimal pauses</option>
                <option value="Natural pausing">Natural pausing</option>
                <option value="Dramatic pauses">Dramatic pauses</option>
                <option value="Long thoughtful pauses">Long thoughtful pauses</option>
                <option value="Frequent brief pauses">Frequent brief pauses</option>
                <option value="Pauses for effect">Pauses for effect</option>
                <option value="Nervous pauses">Nervous pauses</option>
                <option value="Strategic pauses">Strategic pauses</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verbal Habits */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-4">🔄 VERBAL HABITS</h4>

          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Filler Words</label>
              <input
                type="text"
                value={data.speech?.fillerWords || ''}
                onChange={(e) => update('speech', 'fillerWords', e.target.value)}
                placeholder="e.g., 'like', 'um', 'you know', 'basically', 'I mean'"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Emphasis Style</label>
              <select
                value={data.speech?.emphasis || ''}
                onChange={(e) => update('speech', 'emphasis', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Volume increase">Volume increase</option>
                <option value="Pitch change">Pitch change</option>
                <option value="Slower speech">Slower speech</option>
                <option value="Word repetition">Word repetition</option>
                <option value="Pause before">Pause before emphasis</option>
                <option value="Combination">Combination of methods</option>
                <option value="Minimal emphasis">Minimal emphasis</option>
              </select>
            </div>

            <VoiceSlider
              label="Profanity Level"
              value={data.speech?.profanityLevel || 3}
              onChange={(e) => update('speech', 'profanityLevel', parseInt(e.target.value))}
              leftLabel="Never"
              rightLabel="Frequent"
              color="gray"
            />
            <VoiceSlider
              label="Sarcasm Frequency"
              value={data.speech?.sarcasmFrequency || 5}
              onChange={(e) => update('speech', 'sarcasmFrequency', parseInt(e.target.value))}
              leftLabel="Sincere"
              rightLabel="Very Sarcastic"
              color="gray"
            />
          </div>
        </div>

        {/* Humor & Emotional Expression */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-4">😄 EMOTIONAL EXPRESSION IN VOICE</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Humor Style</label>
              <select
                value={data.speech?.humorStyle || ''}
                onChange={(e) => update('speech', 'humorStyle', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Dry/Deadpan">Dry/Deadpan</option>
                <option value="Witty">Witty</option>
                <option value="Goofy/Silly">Goofy/Silly</option>
                <option value="Dark">Dark humor</option>
                <option value="Self-deprecating">Self-deprecating</option>
                <option value="Sarcastic">Sarcastic</option>
                <option value="Puns/Wordplay">Puns/Wordplay</option>
                <option value="Observational">Observational</option>
                <option value="None">Rarely jokes</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Laugh Type</label>
              <input
                type="text"
                value={data.speech?.laughType || ''}
                onChange={(e) => update('speech', 'laughType', e.target.value)}
                placeholder="e.g., hearty belly laugh, quiet chuckle, snort"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">When Crying</label>
              <input
                type="text"
                value={data.speech?.cryingStyle || ''}
                onChange={(e) => update('speech', 'cryingStyle', e.target.value)}
                placeholder="e.g., silent tears, sobbing, hiccups"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">When Shouting/Angry</label>
              <input
                type="text"
                value={data.speech?.shoutingStyle || ''}
                onChange={(e) => update('speech', 'shoutingStyle', e.target.value)}
                placeholder="e.g., roars, voice cracks, cold and quiet"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: LANGUAGES & ACCENT ==========
    2: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-green-900 mb-2">🌍 LANGUAGES & ACCENT</h3>
          <p className="font-mono text-xs text-green-700">Language abilities, accent characteristics, and dialect features.</p>
        </div>

        {/* Primary Language & Accent */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-xs font-bold text-green-800 mb-4">🗣️ PRIMARY LANGUAGE & ACCENT</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Native Language</label>
              <input
                type="text"
                value={data.languages?.nativeLanguage || ''}
                onChange={(e) => update('languages', 'nativeLanguage', e.target.value)}
                placeholder="e.g., English, Spanish, Mandarin"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Accent Region</label>
              <select
                value={data.languages?.accent?.split(' - ')[0] || ''}
                onChange={(e) => update('languages', 'accent', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select Region --</option>
                {Object.entries(ACCENT_OPTIONS).map(([region, accents]) => (
                  <optgroup key={region} label={region}>
                    {accents.map((accent) => (
                      <option key={accent} value={accent}>{accent}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <VoiceSlider
              label="Accent Strength"
              value={data.languages?.accentStrength || 5}
              onChange={(e) => update('languages', 'accentStrength', parseInt(e.target.value))}
              leftLabel="Barely noticeable"
              rightLabel="Very strong"
              color="green"
              description="How pronounced is the accent"
            />

            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Accent Influence on Speech</label>
              <select
                value={data.languages?.accentInfluence || ''}
                onChange={(e) => update('languages', 'accentInfluence', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Select --</option>
                <option value="Pronunciation only">Pronunciation only</option>
                <option value="Rhythm and intonation">Rhythm and intonation</option>
                <option value="Word choice affected">Word choice affected</option>
                <option value="Grammar influenced">Grammar influenced</option>
                <option value="Full immersion">Full immersion (all aspects)</option>
                <option value="Code-switches">Code-switches frequently</option>
                <option value="Neutral/Adapted">Neutral/Adapted to audience</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Languages */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-4">📚 ADDITIONAL LANGUAGES</h4>

          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Second Languages (with fluency level)</label>
              <textarea
                value={data.languages?.secondLanguages || ''}
                onChange={(e) => update('languages', 'secondLanguages', e.target.value)}
                placeholder="e.g., Spanish (fluent), French (conversational), Japanese (basic), Latin (reading only)"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Code-Switching Habits</label>
              <input
                type="text"
                value={data.languages?.codeSwitching || ''}
                onChange={(e) => update('languages', 'codeSwitching', e.target.value)}
                placeholder="e.g., Switches to Spanish when emotional, uses French phrases"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Dialect Features */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white">
          <h4 className="font-mono text-xs font-bold text-gray-800 mb-4">🔤 DIALECT FEATURES</h4>

          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Dialect-Specific Features</label>
              <textarea
                value={data.languages?.dialectFeatures || ''}
                onChange={(e) => update('languages', 'dialectFeatures', e.target.value)}
                placeholder="e.g., Drops 'g' endings (runnin'), uses 'y'all', pronounces 'car' as 'cah', uses glottal stops"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-gray-700 mb-1">Written vs Spoken Difference</label>
              <textarea
                value={data.languages?.writtenVsSpoken || ''}
                onChange={(e) => update('languages', 'writtenVsSpoken', e.target.value)}
                placeholder="e.g., Writes formally but speaks casually, texting style differs from speech"
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-16 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 3: VOICE PREVIEW ==========
    3: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-white mb-2">📋 VOICE PREVIEW</h3>
          <p className="font-mono text-xs text-gray-300">ElevenLabs-compatible voice description generated from your settings.</p>
        </div>

        {/* Generated Description */}
        <div className="border-2 border-amber-300 rounded-sm p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-mono text-sm font-bold text-gray-800">Generated Voice Description</h4>
            <button
              onClick={() => navigator.clipboard.writeText(generateVoiceDescription())}
              className="flex items-center gap-1 px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-sm font-mono text-[10px] transition-colors"
            >
              <Icons.Copy className="w-3 h-3" />
              Copy
            </button>
          </div>

          <div className="font-mono text-sm leading-relaxed p-4 rounded bg-amber-50 border border-amber-200 text-gray-800">
            {generateVoiceDescription()}
          </div>

          <p className="font-mono text-[10px] text-gray-500 mt-2">
            💡 This description can be used directly with ElevenLabs Voice Design or similar TTS systems.
          </p>
        </div>

        {/* Visual Summary */}
        <div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-4">📊 VOICE CHARACTERISTICS SUMMARY</h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded bg-white border border-gray-200 text-center">
              <div className="font-mono text-[10px] text-gray-500">Gender</div>
              <div className="font-mono text-sm font-bold text-gray-800">{data.design?.voiceGender || '—'}</div>
            </div>
            <div className="p-3 rounded bg-white border border-gray-200 text-center">
              <div className="font-mono text-[10px] text-gray-500">Age</div>
              <div className="font-mono text-sm font-bold text-gray-800">{data.design?.voiceAge || '—'}</div>
            </div>
            <div className="p-3 rounded bg-white border border-gray-200 text-center">
              <div className="font-mono text-[10px] text-gray-500">Accent</div>
              <div className="font-mono text-sm font-bold text-gray-800">{data.languages?.accent || '—'}</div>
            </div>
            <div className="p-3 rounded bg-white border border-gray-200 text-center">
              <div className="font-mono text-[10px] text-gray-500">Texture</div>
              <div className="font-mono text-sm font-bold text-gray-800">{data.design?.voiceTexture || '—'}</div>
            </div>
          </div>

          {/* Sliders Visual */}
          <div className="space-y-2">
            {[
              { label: 'Pitch', value: data.design?.pitch || 5, left: 'Low', right: 'High' },
              { label: 'Speed', value: data.design?.speed || 5, left: 'Slow', right: 'Fast' },
              { label: 'Warmth', value: data.design?.timbreWarmth || 5, left: 'Cold', right: 'Warm' },
              { label: 'Brightness', value: data.design?.timbreBrightness || 5, left: 'Dark', right: 'Bright' },
              { label: 'Smoothness', value: data.design?.timbreSmoothness || 5, left: 'Rough', right: 'Smooth' },
              { label: 'Breathiness', value: data.design?.breathiness || 3, left: 'None', right: 'Breathy' },
              { label: 'Roughness', value: data.design?.roughness || 3, left: 'None', right: 'Raspy' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-gray-500 w-20">{item.label}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${item.value * 10}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-gray-500 w-8 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="border border-blue-200 rounded-sm p-4 bg-blue-50">
          <h4 className="font-mono text-xs font-bold text-blue-800 mb-2">💡 Voice Design Tips</h4>
          <ul className="font-mono text-[10px] text-blue-700 space-y-1">
            <li>• ElevenLabs Voice Design uses text descriptions to create voices</li>
            <li>• Be specific about qualities: "warm, breathy female voice with slight British accent"</li>
            <li>• Extreme slider values create more distinctive voices</li>
            <li>• Accent strength affects how recognizable the origin is</li>
            <li>• Combine texture words for unique voices: "silky and resonant"</li>
          </ul>
        </div>

        {/* Reset */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (confirm('Reset all voice settings?')) {
                updateData('voice', {
                  design: {
                    voiceGender: '', voiceAge: '', pitch: 5, pitchVariation: 5, speed: 5, volume: 5,
                    timbreWarmth: 5, timbreBrightness: 5, timbreRichness: 5, timbreSmoothness: 5,
                    breathiness: 3, nasality: 3, roughness: 3, resonance: 5, clarity: 7,
                    voiceTexture: '', emotionalTone: ''
                  },
                  speech: {
                    articulation: '', sentenceStructure: '', fillerWords: '', profanityLevel: 3,
                    sarcasmFrequency: 5, humorStyle: '', speechRhythm: '', emphasis: '', pausePattern: '',
                    laughType: '', cryingStyle: '', shoutingStyle: ''
                  },
                  languages: {
                    nativeLanguage: '', accent: '', accentStrength: 5, accentInfluence: '',
                    secondLanguages: '', codeSwitching: '', dialectFeatures: '', writtenVsSpoken: ''
                  }
                });
              }
            }}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-sm font-mono text-xs transition-colors"
          >
            Reset Voice Settings
          </button>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// WORLDVIEW CONTENT - Complete Implementation
// ============================================================================


export default VoiceContent;
