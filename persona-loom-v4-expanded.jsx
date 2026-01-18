import React, { useState, useEffect } from 'react';

// ============================================================================
// PERSONA LOOM v4 - Complete Character Creation Tool
// Merged version with all rich content and fixed tab navigation
// ============================================================================

// ============================================================================
// ICONS
// ============================================================================
const Icons = {
  Fingerprint: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"/></svg>),
  Eye: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>),
  Brain: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>),
  Activity: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>),
  Mic: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>),
  Book: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>),
  Heart: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>),
  Users: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  Briefcase: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>),
  Lightbulb: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>),
  Globe: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Star: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Zap: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  Lock: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
  Target: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>),
  Database: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>),
  Share: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>),
  Copy: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>),
  Download: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>),
  Check: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
  ChevronRight: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>),
  ChevronDown: (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>),
};

// ============================================================================
// TABS CONFIGURATION
// ============================================================================
const TABS_CONFIG = [
  { 
    id: 'identity', 
    label: 'IDENTITY', 
    color: '#8B4513', 
    icon: Icons.Fingerprint,
    subtabs: ['Core Identity', 'Vital Statistics', 'Origins', 'Cultural Background']
  },
  { 
    id: 'appearance', 
    label: 'APPEARANCE', 
    color: '#2F4F4F', 
    icon: Icons.Eye,
    subtabs: ['Face', 'Hair', 'Body', 'Style & Presentation']
  },
  { 
    id: 'psychology', 
    label: 'PSYCHOLOGY', 
    color: '#4A3728', 
    icon: Icons.Brain,
    subtabs: ['Personality Framework', 'Core Traits', 'Emotional Landscape', 'Inner World', 'Mental Health']
  },
  { 
    id: 'physique', 
    label: 'PHYSIQUE', 
    color: '#5D4E37', 
    icon: Icons.Activity,
    subtabs: ['Physical Condition', 'Senses', 'Medical History', 'Habits & Lifestyle']
  },
  { 
    id: 'voice', 
    label: 'VOICE', 
    color: '#6B4423', 
    icon: Icons.Mic,
    subtabs: ['Vocal Characteristics', 'Speech Patterns', 'Languages & Expression']
  },
  { 
    id: 'history', 
    label: 'HISTORY', 
    color: '#3D5C5C', 
    icon: Icons.Book,
    subtabs: ['Origin Story', 'Family Background', 'Defining Moments', 'Trauma & Healing', 'Key Memories']
  },
  { 
    id: 'relationships', 
    label: 'RELATIONS', 
    color: '#6B3A3A', 
    icon: Icons.Users,
    subtabs: ['Social Patterns', 'Current Circle', 'Romantic History', 'Family Ties', 'Relationship with Self']
  },
  { 
    id: 'intimacy', 
    label: 'INTIMACY', 
    color: '#4A2C4A', 
    icon: Icons.Heart,
    locked: true,
    subtabs: ['Orientation & Identity', 'Preferences', 'Intimate Behavior']
  },
  { 
    id: 'occupation', 
    label: 'OCCUPATION', 
    color: '#3A4A3A', 
    icon: Icons.Briefcase,
    subtabs: ['Current Work', 'Career Path', 'Skills & Competencies', 'Work-Life', 'Financial Life']
  },
  { 
    id: 'intelligence', 
    label: 'INTELLIGENCE', 
    color: '#4A4A2C', 
    icon: Icons.Lightbulb,
    subtabs: ['Cognitive Profile', 'Multiple Intelligences', 'Skills & Talents', 'Knowledge & Interests', 'Education']
  },
  { 
    id: 'worldview', 
    label: 'WORLDVIEW', 
    color: '#2C4A6B', 
    icon: Icons.Globe,
    subtabs: ['Core Philosophy', 'Moral Compass', 'Beliefs & Faith', 'Political & Social', 'Judgments & Values']
  },
  { 
    id: 'favorites', 
    label: 'FAVORITES', 
    color: '#6B5B3A', 
    icon: Icons.Star,
    subtabs: ['Entertainment', 'Food & Drink', 'Hobbies & Leisure', 'Style & Aesthetics', 'Tastes & Preferences']
  },
  { 
    id: 'behavior', 
    label: 'BEHAVIOR', 
    color: '#5B3A5B', 
    icon: Icons.Zap,
    subtabs: ['Communication', 'Daily Patterns', 'Social Behavior', 'Quirks & Habits', 'Under Pressure']
  },
  { 
    id: 'secrets', 
    label: 'SECRETS', 
    color: '#1a1a2e', 
    icon: Icons.Lock,
    subtabs: ['Hidden Truths', 'Contradictions', 'Skeletons']
  },
  { 
    id: 'goals', 
    label: 'GOALS', 
    color: '#2e4a1a', 
    icon: Icons.Target,
    subtabs: ['Short-Term Goals', 'Long-Term Aspirations', 'Internal Conflicts', 'External Conflicts']
  },
  { 
    id: 'database', 
    label: 'DATABASE', 
    color: '#1a365d', 
    icon: Icons.Database,
    subtabs: []
  },
  { 
    id: 'export', 
    label: 'EXPORT', 
    color: '#2C3E50', 
    icon: Icons.Share,
    subtabs: []
  },
];

// ============================================================================
// INITIAL CHARACTER DATA STRUCTURE
// ============================================================================
const createInitialCharacterData = () => ({
  identity: {
    core: { firstName: '', middleName: '', lastName: '', nicknames: '', dateOfBirth: '', archetype: '' },
    vitals: { age: '', rpYear: new Date().getFullYear().toString(), generation: '', biologicalSex: '', genderIdentity: '', customGender: '', pronouns: '', customPronouns: '' },
    origins: { nationality: '', nationalityDetails: '', ethnicity: '', ethnicityDetails: '', birthCity: '', currentLocation: '', geographicType: '', childhoodTrope: '' },
    cultural: { primaryCulture: '', primaryCultureCustom: '', regionalCulture: '', regionalCultureCustom: '', religion: '', religionCustom: '', socialClassOrigin: '', subcultures: [], subculturesCustom: '' }
  },
  appearance: {
    face: { faceShape: '', skinTone: '', eyeColor: '', eyeShape: '', eyebrows: '', noseType: '', lipShape: '', facialHair: '', distinctiveMarks: '' },
    hair: { naturalColor: '', currentColor: '', texture: '', length: '', typicalStyle: '' },
    body: { height: '', weight: '', bodyType: '', posture: '', gait: '' },
    style: { fashionStyle: '', signatureItems: '', groomingLevel: '', tattoos: '', piercings: '', overallVibe: '' }
  },
  psychology: {
    framework: { mbtiType: '', enneagramType: '', enneagramWing: '', tritypeBody: '', tritypeHeart: '', tritypeHead: '', instinctualVariant: '', enneagramHealth: 5, bigFiveO: 5, bigFiveC: 5, bigFiveE: 5, bigFiveA: 5, bigFiveN: 5, temperament: '', darkNarcissism: 1, darkMachiavellianism: 1, darkPsychopathy: 1, narcissismSubtype: '', machiavellianismSubtype: '', psychopathySubtype: '', lightFaith: 5, lightHumanism: 5, lightKantianism: 5 },
    traits: { positiveTraits: [], neutralTraits: [], negativeTraits: [], hiddenTraits: [], whoKnowsTruth: '', maskFallsTrigger: '', whyHiding: '', whenRevealed: '' },
    emotional: { emotionalRange: 4, defaultMood: '', triggers: [], copingMechanisms: [], attachmentStyle: '', volatility: 3, emotionalIntelligence: 3, dominantEmotion: '', avoidedEmotion: '', avoidedEmotionReason: '' },
    innerWorld: { coreFears: [], coreDesires: [], coreShame: [], defenseMechanisms: [], innerCriticVoice: [], customFear: '', customDesire: '', customShame: '', customDefense: '', customCritic: '' },
    mentalHealth: { 
      hasMentalHealthHistory: false,
      diagnosedConditions: [], 
      customCondition: '',
      undiagnosedTendencies: [], 
      therapyStatus: '',
      therapyType: '',
      therapyRelationship: '',
      medications: [],
      medCompliance: '',
      hospitalization: ''
    }
  },
  physique: {
    condition: { generalHealth: '', fitnessLevel: '', athleticism: '', flexibility: '', endurance: '' },
    senses: { vision: '', hearing: '', dominantHand: '', physicalSensitivities: '' },
    medical: { chronicConditions: '', disabilities: '', allergies: '', pastInjuries: '', bloodType: '' },
    habits: { sleepPattern: '', dietType: '', substanceUse: '', exerciseRoutine: '', selfCareLevel: '' }
  },
  voice: {
    vocal: { pitch: 5, tone: '', volume: 5, speechSpeed: 5, laughType: '' },
    speech: { sentenceStructure: '', fillerWords: '', profanityLevel: 3, sarcasmFrequency: 5, humorStyle: '' },
    languages: { nativeLanguage: '', secondLanguages: '', codeSwitching: '', writtenVsSpoken: '' }
  },
  history: {
    origin: { birthCircumstances: '', earlyChildhood: '', childhood: '', adolescence: '', adulthoodPhases: '' },
    family: { parents: '', siblings: '', extendedFamily: '', familyDynamics: '', familySecrets: '' },
    moments: { happiestMemory: '', mostTraumaticEvent: '', turningPoints: '', regrets: '', proudestAchievement: '' },
    trauma: { coreWounds: '', unprocessedTrauma: '', healingJourney: '', flashbackTriggers: '' },
    memories: { keyFacts: '' }
  },
  relationships: {
    patterns: { socialEnergy: 5, trustLevel: 5, conflictStyle: '', loveLanguages: '', friendshipStyle: '' },
    circle: { bestFriends: '', closeFriends: '', acquaintances: '', rivals: '', mentors: '' },
    romantic: { relationshipStatus: '', pastRelationships: '', romanticPatterns: '', dealBreakers: '' },
    family: { relationshipWithParents: '', relationshipWithSiblings: '', estrangements: '' },
    self: { selfEsteem: 5, selfTalkPattern: '', bodyImage: '', identitySecurity: '' }
  },
  intimacy: {
    orientation: { sexualOrientation: '', romanticOrientation: '', experienceLevel: '' },
    preferences: { physicalPreferences: '', emotionalPreferences: '', turnOns: '', turnOffs: '', boundaries: '' },
    behavior: { initiativeLevel: 5, communicationStyle: '', vulnerabilityLevel: 5, fantasies: '' }
  },
  occupation: {
    current: { 
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
      companyCulture: [] 
    },
    career: { 
      childhoodDream: '', 
      careerEntry: '', 
      firstJob: '', 
      previousJobs: '', 
      totalExperience: '', 
      careerPattern: '', 
      biggestAchievement: '', 
      biggestSetback: '', 
      industryStatus: '', 
      networkStrength: '', 
      knownFor: [], 
      careerAmbition: '', 
      careerAttitude: '', 
      dreamPosition: '', 
      fiveYearPlan: '' 
    },
    skills: { 
      hardSkills: [], 
      softSkills: [], 
      technicalLevel: 5, 
      interpersonalLevel: 5, 
      leadershipLevel: 5, 
      hiddenTalents: '', 
      weaknesses: '' 
    },
    workLife: { 
      jobSatisfaction: 5, 
      salarySatisfaction: 5, 
      bossSatisfaction: 5, 
      colleaguesSatisfaction: 5, 
      workContentSatisfaction: 5, 
      frustrations: [], 
      workLifeBalance: 5, 
      workAtHome: '', 
      abilityToDisconnect: '', 
      stressLevel: 5, 
      bossRelationship: '', 
      colleagueRelationship: '', 
      socialRole: [], 
      workFriends: '' 
    },
    financial: { 
      incomeLevel: '', 
      incomeSource: '', 
      wealthStatus: '', 
      incomeStability: '', 
      moneyAttitude: '', 
      spendingStyle: '', 
      financialAnxiety: 5, 
      moneyImportance: 5, 
      budgeting: '', 
      savingHabit: '', 
      financialLiteracy: '', 
      majorExpenses: [], 
      debtSituation: '', 
      creditHistory: '', 
      emergencyFund: '', 
      financialGoals: '' 
    }
  },
  intelligence: {
    cognitive: { 
      iqRange: '', 
      processingSpeed: 4, 
      workingMemory: 3, 
      longTermMemory: 3, 
      eidetikMemory: '',
      learningStyle: '', 
      analyticalIntuitive: 5, 
      convergentDivergent: 5,
      abstractConcrete: 5,
      streetBookSmart: 5
    },
    multipleIntelligences: {
      logical: 5,
      linguistic: 5,
      spatial: 5,
      musical: 5,
      bodily: 5,
      naturalistic: 5,
      interpersonal: 5,
      intrapersonal: 5,
      existential: 5
    },
    skills: { 
      techSkills: [],
      creativeSkills: [],
      physicalSkills: [],
      professionalSkills: [],
      survivalSkills: [],
      socialSkills: [],
      hiddenTalents: '',
      notableWeaknesses: ''
    },
    knowledge: { 
      expertiseAreas: [], 
      intellectualInterests: [],
      currentlyLearning: '',
      informationDiet: [],
      curiosityLevel: 5
    },
    education: { 
      highestLevel: '', 
      schoolPerformance: '',
      institutions: [],
      degrees: [],
      certifications: [],
      autodidactLevel: 5,
      attitudeToEducation: '',
      incompleteStudies: ''
    }
  },
  worldview: {
    philosophy: { 
      optimismPessimism: 5, 
      humanNature: '', 
      freeWillDeterminism: 5, 
      meaningOfLife: '', 
      lifePhilosophy: '', 
      lifeMotto: '', 
      viewOnChange: '', 
      viewOnDeath: '',
      viewOnSuffering: ''
    },
    moral: { 
      ethicalFramework: '', 
      moralFlexibility: 5, 
      endsJustifyMeans: 5, 
      wouldLieToProtect: '', 
      wouldStealIfStarving: '', 
      wouldKillInDefense: '',
      personalCode: '', 
      linesNeverCrossed: [],
      guiltyConscienceLevel: 5
    },
    beliefs: { 
      religiousAffiliation: '', 
      religiosityLevel: 5, 
      viewOnAfterlife: '', 
      supernaturalStance: '', 
      superstitions: [],
      spiritualPractices: [],
      fateVsChoice: 5
    },
    political: { 
      politicalSpectrum: 5, 
      economicViews: 5, 
      socialViews: 5, 
      libertarianAuthoritarian: 5,
      nationalismLevel: 5,
      trustInGovernment: 3,
      trustInMedia: 3,
      trustInScience: 3,
      trustInReligion: 3,
      causesSupported: [],
      politicalEngagement: ''
    },
    judgments: { 
      whatTheyRespect: [], 
      whatTheyDespise: [], 
      roleModels: '',
      looksDownOn: '',
      knownPrejudices: [],
      howJudgesOthers: '',
      topValues: []
    }
  },
  favorites: {
    entertainment: { 
      musicGenres: [], musicEra: '', musicImportance: 5, playsInstrument: '',
      movieTvGenres: [], movieType: '', bingeLevel: 5, favoriteShows: '',
      bookGenres: [], readingFrequency: 5, bookFormat: '',
      gameTypes: [], gamePlatforms: [], competitiveness: 5,
      socialPlatforms: [], socialMediaUsage: 5, socialMediaType: ''
    },
    food: {
      cuisines: [], adventurousness: 5, dietaryRestrictions: [],
      drinks: [], alcoholRelation: '', coffeeDependency: 5,
      cookingFrequency: 5, fastFoodAttitude: '', comfortFoods: '', guiltyPleasures: ''
    },
    hobbies: {
      activeHobbies: [], creativeHobbies: [], mentalHobbies: [],
      relaxationActivities: [], collects: ''
    },
    style: {
      fashionStyle: '', appearanceImportance: 5, dressCode: 5, signatureItem: '',
      favoriteColors: [], avoidColors: [], colorPalette: '',
      decorStyle: '', organizationLevel: 5, spaceImportance: 5,
      favoriteEra: '', eraReason: ''
    },
    preferences: {
      natureUrban: 5, climate: '', season: '', timeOfDay: '', silenceNoise: 5,
      favoriteAnimals: [], petPreference: '', animalRelation: '',
      travelStyle: '', travelDestinations: '', travelFrequency: '',
      routineSpontaneity: 5, planningImproving: 5, qualityQuantity: 5, oldNew: 5,
      sweetSavory: '', hotCold: ''
    }
  },
  behavior: {
    communication: { speakingStyle: '', vocabularyLevel: '', accentDialect: '', verbalTics: '', nonVerbalHabits: '' },
    daily: { morningRoutine: '', dailyRituals: '', procrastinationHabits: '', organizationLevel: 5 },
    social: { firstImpression: '', behaviorInGroups: '', behaviorOneOnOne: '', behaviorUnderStress: '' },
    quirks: { nervousHabits: '', comfortBehaviors: '', petPeeves: '', superstitions: '' },
    pressure: { fightFlightFreeze: '', crisisPersonality: '', handleFailure: '', handleSuccess: '' }
  },
  secrets: {
    hidden: { biggestSecret: '', liesMaintained: '', neverAdmit: '', secretDesires: '' },
    contradictions: { publicVsPrivate: '', preachVsPractice: '', unawareHypocrisy: '' },
    skeletons: { pastMistakes: '', peopleWronged: '', couldDestroyThem: '' }
  },
  goals: {
    shortTerm: { thisWeekMonth: '', thisYear: '', obstacles: '' },
    longTerm: { lifeDream: '', legacy: '', whatSuccessMeans: '' },
    internal: { headVsHeart: '', dutyVsDesire: '', whoTheyAreVsWant: '' },
    external: { currentProblems: '', enemies: '', systemicObstacles: '' }
  }
});


// File Tab Component
const FileTab = ({ tab, isActive, onClick, index, isLocked = false, lockReason = '' }) => {
  const TabIcon = tab.icon;
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleClick = () => {
    if (isLocked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      onClick();
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="group relative transition-all duration-300 ease-out"
        style={{ marginTop: index === 0 ? '24px' : '0', zIndex: isActive ? 50 : 40 - index }}
      >
        <div
          className={`relative flex items-center gap-2 px-3 py-1.5 min-w-[130px] transition-all duration-300 ease-out 
            ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${isActive && !isLocked ? 'translate-x-2 shadow-lg' : 'hover:translate-x-1 hover:shadow-md'}`}
          style={{
            background: isLocked
              ? 'linear-gradient(135deg, #555 0%, #444 100%)'
              : isActive 
                ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                : `linear-gradient(135deg, ${tab.color}99 0%, ${tab.color}77 100%)`,
            borderRadius: '0 5px 5px 0',
            boxShadow: isActive && !isLocked
              ? `4px 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`
              : `2px 1px 4px rgba(0,0,0,0.2)`,
          }}
        >
          <TabIcon width={12} height={12} className={isActive && !isLocked ? 'text-white' : 'text-white/70'} />
          <span className={`font-mono text-[9px] font-bold tracking-[0.1em] uppercase ${isActive && !isLocked ? 'text-white' : 'text-white/80'}`}>
            {tab.label}
          </span>
          {(tab.locked || isLocked) && <Icons.Lock width={8} height={8} className="text-white/50 ml-auto" />}
          {isActive && !isLocked && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />}
        </div>
        {isActive && !isLocked && (
          <div className="absolute top-0 bottom-0 -right-1 w-2 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #f5f0e6)' }} />
        )}
      </button>
      
      {/* Lock Tooltip */}
      {showTooltip && isLocked && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[100] animate-fadeIn">
          <div className="bg-gray-900 text-white px-3 py-2 rounded shadow-lg max-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <Icons.Lock width={12} height={12} className="text-red-400" />
              <span className="font-mono text-[10px] font-bold uppercase text-red-400">Restricted</span>
            </div>
            <p className="font-mono text-[9px] text-gray-300 leading-relaxed">
              {lockReason}
            </p>
            {/* Arrow */}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};

// Subtab Navigation
const SubtabNav = ({ subtabs, activeSubtab, setActiveSubtab }) => {
  if (!subtabs || subtabs.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-200">
      {subtabs.map((subtab, idx) => (
        <button
          key={subtab}
          onClick={() => setActiveSubtab(idx)}
          className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all
            ${activeSubtab === idx 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}
        >
          {subtab}
        </button>
      ))}
    </div>
  );
};

// Input Component
const ArchiveInput = ({ label, value, onChange, type = 'text', placeholder = '', multiline = false }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-gray-300 py-2 font-mono text-sm text-gray-800 placeholder-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none min-h-[80px]"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-gray-300 py-1 font-mono text-sm text-gray-800 placeholder-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
      />
    )}
  </div>
);

// Select Component
const ArchiveSelect = ({ label, value, onChange, options = [] }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
    >
      <option value="">-- Select --</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// Slider Component
const ArchiveSlider = ({ label, value, onChange, min = 1, max = 10, leftLabel = '', rightLabel = '' }) => (
  <div className="flex flex-col gap-2 mb-4">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">{label}</label>
      <span className="font-mono text-xs font-bold text-gray-800">{value}/{max}</span>
    </div>
    <div className="flex items-center gap-2">
      {leftLabel && <span className="font-mono text-[8px] text-gray-400 w-16 text-right">{leftLabel}</span>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
      />
      {rightLabel && <span className="font-mono text-[8px] text-gray-400 w-16">{rightLabel}</span>}
    </div>
  </div>
);

// Section Header
const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-4 mt-8 mb-6">
    <div className="h-px flex-1 bg-gray-300" />
    <h3 className="font-serif text-sm font-bold italic text-gray-500 uppercase tracking-widest px-3 py-1 border border-gray-300 bg-gray-50/50">
      {title}
    </h3>
    <div className="h-px flex-1 bg-gray-300" />
  </div>
);

// Locked Content Screen - Shown when tab is restricted
const LockedContentScreen = ({ reason, tabName }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeIn">
    {/* Lock Icon Container */}
    <div className="relative mb-8">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
        <Icons.Lock width={40} height={40} className="text-gray-400" />
      </div>
      {/* Red indicator */}
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
        <span className="text-white text-xs font-bold">!</span>
      </div>
    </div>
    
    {/* Title */}
    <h2 className="font-serif text-2xl font-bold text-gray-700 mb-2">
      Access Restricted
    </h2>
    <p className="font-mono text-sm text-gray-500 mb-6">
      {tabName} Section
    </p>
    
    {/* Reason Box */}
    <div className="max-w-md bg-amber-50 border-2 border-amber-200 rounded-sm p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icons.Lock width={14} height={14} className="text-amber-700" />
        </div>
        <div className="text-left">
          <h3 className="font-mono text-xs font-bold uppercase text-amber-800 mb-2">
            Age Verification Required
          </h3>
          <p className="font-mono text-xs text-amber-700 leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    </div>
    
    {/* Help Text */}
    <p className="font-mono text-[10px] text-gray-400 mt-6 max-w-sm">
      This restriction ensures appropriate content handling based on character age.
      Navigate to <span className="font-bold">Identity → Vital Statistics</span> to update the character's age.
    </p>
    
    {/* Decorative stamp */}
    <div className="mt-8 opacity-20">
      <div className="border-4 border-red-800 rounded px-6 py-3 transform -rotate-6">
        <span className="font-mono text-red-800 text-lg font-black tracking-widest">RESTRICTED</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// TAB CONTENT COMPONENTS
// ============================================================================

const IdentityContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('identity', { ...data, [section]: { ...data[section], [field]: value } });
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
    const age = parseInt(data.vitals.age);
    const rpYear = parseInt(data.vitals.rpYear);
    
    if (age > 0 && rpYear > 0) {
      const birthYear = rpYear - age;
      const calculatedGen = calculateGeneration(birthYear);
      
      if (calculatedGen && data.vitals.generation !== calculatedGen) {
        update('vitals', 'generation', calculatedGen);
      }
    }
  }, [data.vitals.age, data.vitals.rpYear]);

  // Calculate birth year for display
  const birthYear = (parseInt(data.vitals.rpYear) || 0) - (parseInt(data.vitals.age) || 0);
  const showBirthYear = data.vitals.age && data.vitals.rpYear && birthYear > 0;

  // All generation options for manual override
  const generationOptions = [
    'Gen Beta (2025+)',
    'Gen Alpha (2013-2024)',
    'Zalpha ✦ (2010-2013)',
    'Gen Z (1997-2012)',
    'Zennial ✦ (1993-1998)',
    'Millennial / Gen Y (1981-1996)',
    'Xennial ✦ (1977-1983)',
    'Gen X (1965-1980)',
    'Generation Jones ✦ (1954-1965)',
    'Baby Boomer (1946-1964)',
    'Silent Generation (1928-1945)',
    'Greatest Generation (1901-1927)',
    'Lost Generation (1883-1900)',
    'Victorian Era (pre-1883)',
  ];

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

const AppearanceContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('appearance', { ...data, [section]: { ...data[section], [field]: value } });
  };

  const sections = {
    0: ( // Face
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ArchiveSelect label="Face Shape" value={data.face.faceShape} onChange={(e) => update('face', 'faceShape', e.target.value)} 
          options={['Oval', 'Round', 'Square', 'Heart', 'Oblong', 'Diamond', 'Triangle']} />
        <ArchiveInput label="Skin Tone" value={data.face.skinTone} onChange={(e) => update('face', 'skinTone', e.target.value)} placeholder="e.g. Fair, Olive, Dark" />
        <ArchiveSelect label="Eye Color" value={data.face.eyeColor} onChange={(e) => update('face', 'eyeColor', e.target.value)} 
          options={['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Amber', 'Black', 'Heterochromia']} />
        <ArchiveSelect label="Eye Shape" value={data.face.eyeShape} onChange={(e) => update('face', 'eyeShape', e.target.value)} 
          options={['Almond', 'Round', 'Monolid', 'Hooded', 'Downturned', 'Upturned', 'Deep-set', 'Protruding']} />
        <ArchiveInput label="Eyebrows" value={data.face.eyebrows} onChange={(e) => update('face', 'eyebrows', e.target.value)} placeholder="Shape and thickness" />
        <ArchiveSelect label="Nose Type" value={data.face.noseType} onChange={(e) => update('face', 'noseType', e.target.value)} 
          options={['Straight', 'Roman', 'Button', 'Upturned', 'Hawk', 'Wide', 'Thin', 'Crooked']} />
        <ArchiveInput label="Lip Shape" value={data.face.lipShape} onChange={(e) => update('face', 'lipShape', e.target.value)} placeholder="e.g. Full, Thin, Bow-shaped" />
        <ArchiveInput label="Facial Hair" value={data.face.facialHair} onChange={(e) => update('face', 'facialHair', e.target.value)} placeholder="If applicable" />
        <div className="md:col-span-2">
          <ArchiveInput label="Distinctive Marks" value={data.face.distinctiveMarks} onChange={(e) => update('face', 'distinctiveMarks', e.target.value)} placeholder="Scars, moles, birthmarks" multiline />
        </div>
      </div>
    ),
    1: ( // Hair
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ArchiveInput label="Natural Color" value={data.hair.naturalColor} onChange={(e) => update('hair', 'naturalColor', e.target.value)} placeholder="Birth hair color" />
        <ArchiveInput label="Current Color" value={data.hair.currentColor} onChange={(e) => update('hair', 'currentColor', e.target.value)} placeholder="Current color (if different)" />
        <ArchiveSelect label="Texture" value={data.hair.texture} onChange={(e) => update('hair', 'texture', e.target.value)} 
          options={['Straight', 'Wavy', 'Curly', 'Coily', 'Kinky']} />
        <ArchiveSelect label="Length" value={data.hair.length} onChange={(e) => update('hair', 'length', e.target.value)} 
          options={['Bald', 'Buzzed', 'Short', 'Medium', 'Long', 'Very Long']} />
        <div className="md:col-span-2">
          <ArchiveInput label="Typical Style" value={data.hair.typicalStyle} onChange={(e) => update('hair', 'typicalStyle', e.target.value)} placeholder="How they usually wear it" />
        </div>
      </div>
    ),
    2: ( // Body
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ArchiveInput label="Height" value={data.body.height} onChange={(e) => update('body', 'height', e.target.value)} placeholder="e.g. 5'10 / 178cm" />
        <ArchiveInput label="Weight" value={data.body.weight} onChange={(e) => update('body', 'weight', e.target.value)} placeholder="e.g. 160 lbs / 73kg" />
        <ArchiveSelect label="Body Type / Build" value={data.body.bodyType} onChange={(e) => update('body', 'bodyType', e.target.value)} 
          options={['Ectomorph (Thin)', 'Mesomorph (Athletic)', 'Endomorph (Stocky)', 'Slim', 'Average', 'Muscular', 'Curvy', 'Plus-size']} />
        <ArchiveSelect label="Posture" value={data.body.posture} onChange={(e) => update('body', 'posture', e.target.value)} 
          options={['Excellent', 'Good', 'Average', 'Slouched', 'Rigid']} />
        <div className="md:col-span-2">
          <ArchiveInput label="Gait / How They Walk" value={data.body.gait} onChange={(e) => update('body', 'gait', e.target.value)} placeholder="Confident stride, shuffle, graceful, etc." />
        </div>
      </div>
    ),
    3: ( // Style & Presentation
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ArchiveSelect label="Fashion Style" value={data.style.fashionStyle} onChange={(e) => update('style', 'fashionStyle', e.target.value)} 
          options={['Casual', 'Formal', 'Streetwear', 'Bohemian', 'Minimalist', 'Vintage', 'Preppy', 'Punk', 'Goth', 'Athletic', 'Business Casual', 'Eclectic']} />
        <ArchiveInput label="Signature Items / Accessories" value={data.style.signatureItems} onChange={(e) => update('style', 'signatureItems', e.target.value)} placeholder="Watch, ring, hat, etc." />
        <ArchiveSelect label="Grooming Level" value={data.style.groomingLevel} onChange={(e) => update('style', 'groomingLevel', e.target.value)} 
          options={['Meticulous', 'Well-groomed', 'Average', 'Casual', 'Unkempt']} />
        <ArchiveInput label="Tattoos" value={data.style.tattoos} onChange={(e) => update('style', 'tattoos', e.target.value)} placeholder="Describe if any" />
        <ArchiveInput label="Piercings" value={data.style.piercings} onChange={(e) => update('style', 'piercings', e.target.value)} placeholder="Describe if any" />
        <div className="md:col-span-2">
          <ArchiveInput label="Overall Vibe They Project" value={data.style.overallVibe} onChange={(e) => update('style', 'overallVibe', e.target.value)} placeholder="What impression do they give?" multiline />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

const PsychologyContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('psychology', { ...data, [section]: { ...data[section], [field]: value } });
  };

  // MBTI Data with full descriptions and cognitive functions
  const mbtiTypes = {
    // Analysts (NT) - Purple
    'INTJ': { 
      name: 'Architect', 
      desc: 'Strategic, independent, determined visionary',
      group: 'Analysts',
      color: 'purple',
      letters: { I: 'Introverted', N: 'Intuitive', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Ni (Introverted Intuition)', 'Te (Extraverted Thinking)', 'Fi (Introverted Feeling)', 'Se (Extraverted Sensing)'],
      strengths: 'Strategic thinking, independence, determination',
      weaknesses: 'Can be arrogant, dismissive of emotions, overly critical'
    },
    'INTP': { 
      name: 'Logician', 
      desc: 'Innovative, curious, logical thinker',
      group: 'Analysts',
      color: 'purple',
      letters: { I: 'Introverted', N: 'Intuitive', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Ti (Introverted Thinking)', 'Ne (Extraverted Intuition)', 'Si (Introverted Sensing)', 'Fe (Extraverted Feeling)'],
      strengths: 'Analytical, objective, imaginative',
      weaknesses: 'Can be insensitive, absent-minded, condescending'
    },
    'ENTJ': { 
      name: 'Commander', 
      desc: 'Bold, decisive, natural-born leader',
      group: 'Analysts',
      color: 'purple',
      letters: { E: 'Extraverted', N: 'Intuitive', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Te (Extraverted Thinking)', 'Ni (Introverted Intuition)', 'Se (Extraverted Sensing)', 'Fi (Introverted Feeling)'],
      strengths: 'Efficient, energetic, self-confident, strong-willed',
      weaknesses: 'Can be stubborn, dominant, intolerant, impatient'
    },
    'ENTP': { 
      name: 'Debater', 
      desc: 'Smart, curious, intellectual explorer',
      group: 'Analysts',
      color: 'purple',
      letters: { E: 'Extraverted', N: 'Intuitive', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Ne (Extraverted Intuition)', 'Ti (Introverted Thinking)', 'Fe (Extraverted Feeling)', 'Si (Introverted Sensing)'],
      strengths: 'Quick thinking, charismatic, knowledgeable',
      weaknesses: 'Can be argumentative, insensitive, unfocused'
    },
    // Diplomats (NF) - Green
    'INFJ': { 
      name: 'Advocate', 
      desc: 'Idealistic, principled, compassionate guide',
      group: 'Diplomats',
      color: 'green',
      letters: { I: 'Introverted', N: 'Intuitive', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Ni (Introverted Intuition)', 'Fe (Extraverted Feeling)', 'Ti (Introverted Thinking)', 'Se (Extraverted Sensing)'],
      strengths: 'Creative, insightful, principled, passionate',
      weaknesses: 'Can be perfectionistic, overly private, sensitive to criticism'
    },
    'INFP': { 
      name: 'Mediator', 
      desc: 'Poetic, kind, altruistic dreamer',
      group: 'Diplomats',
      color: 'green',
      letters: { I: 'Introverted', N: 'Intuitive', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Fi (Introverted Feeling)', 'Ne (Extraverted Intuition)', 'Si (Introverted Sensing)', 'Te (Extraverted Thinking)'],
      strengths: 'Empathetic, creative, passionate, idealistic',
      weaknesses: 'Can be impractical, self-isolating, overly idealistic'
    },
    'ENFJ': { 
      name: 'Protagonist', 
      desc: 'Charismatic, inspiring, natural mentor',
      group: 'Diplomats',
      color: 'green',
      letters: { E: 'Extraverted', N: 'Intuitive', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Fe (Extraverted Feeling)', 'Ni (Introverted Intuition)', 'Se (Extraverted Sensing)', 'Ti (Introverted Thinking)'],
      strengths: 'Charismatic, reliable, natural leader, altruistic',
      weaknesses: 'Can be overly idealistic, too selfless, condescending'
    },
    'ENFP': { 
      name: 'Campaigner', 
      desc: 'Enthusiastic, creative, free spirit',
      group: 'Diplomats',
      color: 'green',
      letters: { E: 'Extraverted', N: 'Intuitive', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Ne (Extraverted Intuition)', 'Fi (Introverted Feeling)', 'Te (Extraverted Thinking)', 'Si (Introverted Sensing)'],
      strengths: 'Curious, enthusiastic, good communicator, friendly',
      weaknesses: 'Can be unfocused, disorganized, overly accommodating'
    },
    // Sentinels (SJ) - Blue
    'ISTJ': { 
      name: 'Logistician', 
      desc: 'Practical, reliable, dutiful organizer',
      group: 'Sentinels',
      color: 'blue',
      letters: { I: 'Introverted', S: 'Sensing', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Si (Introverted Sensing)', 'Te (Extraverted Thinking)', 'Fi (Introverted Feeling)', 'Ne (Extraverted Intuition)'],
      strengths: 'Honest, responsible, calm, practical',
      weaknesses: 'Can be stubborn, insensitive, judgmental'
    },
    'ISFJ': { 
      name: 'Defender', 
      desc: 'Warm, dedicated, protective caretaker',
      group: 'Sentinels',
      color: 'blue',
      letters: { I: 'Introverted', S: 'Sensing', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Si (Introverted Sensing)', 'Fe (Extraverted Feeling)', 'Ti (Introverted Thinking)', 'Ne (Extraverted Intuition)'],
      strengths: 'Supportive, reliable, patient, loyal',
      weaknesses: 'Can be overworked, reluctant to change, too humble'
    },
    'ESTJ': { 
      name: 'Executive', 
      desc: 'Organized, logical, assertive manager',
      group: 'Sentinels',
      color: 'blue',
      letters: { E: 'Extraverted', S: 'Sensing', T: 'Thinking', J: 'Judging' },
      cognitiveStack: ['Te (Extraverted Thinking)', 'Si (Introverted Sensing)', 'Ne (Extraverted Intuition)', 'Fi (Introverted Feeling)'],
      strengths: 'Organized, dedicated, strong-willed, direct',
      weaknesses: 'Can be inflexible, stubborn, judgmental'
    },
    'ESFJ': { 
      name: 'Consul', 
      desc: 'Caring, social, community-oriented helper',
      group: 'Sentinels',
      color: 'blue',
      letters: { E: 'Extraverted', S: 'Sensing', F: 'Feeling', J: 'Judging' },
      cognitiveStack: ['Fe (Extraverted Feeling)', 'Si (Introverted Sensing)', 'Ne (Extraverted Intuition)', 'Ti (Introverted Thinking)'],
      strengths: 'Caring, sociable, loyal, warm',
      weaknesses: 'Can be needy, approval-seeking, inflexible'
    },
    // Explorers (SP) - Yellow
    'ISTP': { 
      name: 'Virtuoso', 
      desc: 'Bold, practical, hands-on experimenter',
      group: 'Explorers',
      color: 'yellow',
      letters: { I: 'Introverted', S: 'Sensing', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Ti (Introverted Thinking)', 'Se (Extraverted Sensing)', 'Ni (Introverted Intuition)', 'Fe (Extraverted Feeling)'],
      strengths: 'Optimistic, creative, practical, spontaneous',
      weaknesses: 'Can be stubborn, insensitive, private, risky'
    },
    'ISFP': { 
      name: 'Adventurer', 
      desc: 'Flexible, charming, artistic soul',
      group: 'Explorers',
      color: 'yellow',
      letters: { I: 'Introverted', S: 'Sensing', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Fi (Introverted Feeling)', 'Se (Extraverted Sensing)', 'Ni (Introverted Intuition)', 'Te (Extraverted Thinking)'],
      strengths: 'Charming, artistic, imaginative, passionate',
      weaknesses: 'Can be overly competitive, unpredictable, easily stressed'
    },
    'ESTP': { 
      name: 'Entrepreneur', 
      desc: 'Energetic, perceptive, risk-taking doer',
      group: 'Explorers',
      color: 'yellow',
      letters: { E: 'Extraverted', S: 'Sensing', T: 'Thinking', P: 'Perceiving' },
      cognitiveStack: ['Se (Extraverted Sensing)', 'Ti (Introverted Thinking)', 'Fe (Extraverted Feeling)', 'Ni (Introverted Intuition)'],
      strengths: 'Bold, rational, practical, perceptive',
      weaknesses: 'Can be insensitive, impatient, risk-prone, defiant'
    },
    'ESFP': { 
      name: 'Entertainer', 
      desc: 'Spontaneous, energetic, life of the party',
      group: 'Explorers',
      color: 'yellow',
      letters: { E: 'Extraverted', S: 'Sensing', F: 'Feeling', P: 'Perceiving' },
      cognitiveStack: ['Se (Extraverted Sensing)', 'Fi (Introverted Feeling)', 'Te (Extraverted Thinking)', 'Ni (Introverted Intuition)'],
      strengths: 'Bold, original, aesthetic, showman, practical',
      weaknesses: 'Can be sensitive, unfocused, conflict-averse, easily bored'
    }
  };

  const getGroupColor = (group) => {
    const colors = {
      'Analysts': 'purple',
      'Diplomats': 'green',
      'Sentinels': 'blue',
      'Explorers': 'amber'
    };
    return colors[group] || 'gray';
  };

  const selectedMbti = data.framework.mbtiType ? mbtiTypes[data.framework.mbtiType] : null;

  const sections = {
    0: ( // Personality Framework
      <div className="space-y-6">
        {/* MBTI Section */}
        <div className="space-y-3">
          <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em]">MBTI Type (Myers-Briggs Type Indicator)</label>
          <select
            value={data.framework.mbtiType || ''}
            onChange={(e) => update('framework', 'mbtiType', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm text-gray-800 focus:border-gray-900 focus:outline-none cursor-pointer"
          >
            <option value="">-- Select MBTI Type --</option>
            
            <optgroup label="🟣 Analysts (NT) — Rational, Strategic">
              <option value="INTJ">INTJ — Architect — Strategic visionary</option>
              <option value="INTP">INTP — Logician — Logical thinker</option>
              <option value="ENTJ">ENTJ — Commander — Natural leader</option>
              <option value="ENTP">ENTP — Debater — Intellectual explorer</option>
            </optgroup>
            
            <optgroup label="🟢 Diplomats (NF) — Empathetic, Idealistic">
              <option value="INFJ">INFJ — Advocate — Compassionate guide</option>
              <option value="INFP">INFP — Mediator — Altruistic dreamer</option>
              <option value="ENFJ">ENFJ — Protagonist — Inspiring mentor</option>
              <option value="ENFP">ENFP — Campaigner — Creative free spirit</option>
            </optgroup>
            
            <optgroup label="🔵 Sentinels (SJ) — Practical, Reliable">
              <option value="ISTJ">ISTJ — Logistician — Dutiful organizer</option>
              <option value="ISFJ">ISFJ — Defender — Protective caretaker</option>
              <option value="ESTJ">ESTJ — Executive — Assertive manager</option>
              <option value="ESFJ">ESFJ — Consul — Community helper</option>
            </optgroup>
            
            <optgroup label="🟡 Explorers (SP) — Spontaneous, Energetic">
              <option value="ISTP">ISTP — Virtuoso — Hands-on experimenter</option>
              <option value="ISFP">ISFP — Adventurer — Artistic soul</option>
              <option value="ESTP">ESTP — Entrepreneur — Risk-taking doer</option>
              <option value="ESFP">ESFP — Entertainer — Life of the party</option>
            </optgroup>
          </select>
          
          {/* MBTI Details Card */}
          {selectedMbti && (
            <div className={`mt-3 border-2 rounded-sm overflow-hidden ${
              selectedMbti.color === 'purple' ? 'border-purple-300 bg-purple-50' :
              selectedMbti.color === 'green' ? 'border-green-300 bg-green-50' :
              selectedMbti.color === 'blue' ? 'border-blue-300 bg-blue-50' :
              'border-amber-300 bg-amber-50'
            }`}>
              {/* Header */}
              <div className={`px-4 py-2 ${
                selectedMbti.color === 'purple' ? 'bg-purple-200' :
                selectedMbti.color === 'green' ? 'bg-green-200' :
                selectedMbti.color === 'blue' ? 'bg-blue-200' :
                'bg-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-lg font-bold">{data.framework.mbtiType}</span>
                    <span className="mx-2">—</span>
                    <span className="font-serif text-lg">{selectedMbti.name}</span>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded ${
                    selectedMbti.color === 'purple' ? 'bg-purple-300 text-purple-900' :
                    selectedMbti.color === 'green' ? 'bg-green-300 text-green-900' :
                    selectedMbti.color === 'blue' ? 'bg-blue-300 text-blue-900' :
                    'bg-amber-300 text-amber-900'
                  }`}>{selectedMbti.group}</span>
                </div>
                <p className="font-mono text-sm mt-1 opacity-80">{selectedMbti.desc}</p>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Letter Breakdown */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-2">Letter Breakdown</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(selectedMbti.letters).map(([letter, meaning]) => (
                      <div key={letter} className="text-center p-2 bg-white rounded border border-gray-200">
                        <div className="font-mono text-lg font-bold">{letter}</div>
                        <div className="font-mono text-[9px] text-gray-500">{meaning}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cognitive Stack */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-2">Cognitive Function Stack</h4>
                  <div className="space-y-1">
                    {selectedMbti.cognitiveStack.map((func, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                          i === 0 ? 'bg-gray-900 text-white' :
                          i === 1 ? 'bg-gray-600 text-white' :
                          i === 2 ? 'bg-gray-400 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>{i + 1}</span>
                        <span className="font-mono text-sm">{func}</span>
                        <span className="font-mono text-[9px] text-gray-400">
                          {i === 0 ? '(Dominant)' : i === 1 ? '(Auxiliary)' : i === 2 ? '(Tertiary)' : '(Inferior)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-green-600 mb-1">✓ Strengths</h4>
                    <p className="font-mono text-xs text-gray-600">{selectedMbti.strengths}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-red-600 mb-1">✗ Weaknesses</h4>
                    <p className="font-mono text-xs text-gray-600">{selectedMbti.weaknesses}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enneagram Section - Complete Rewrite */}
        <div className="space-y-4 mt-6">
          {/* Enneagram Header with Explanation */}
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
            <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">✦ ENNEAGRAM</h3>
            <p className="font-mono text-xs text-amber-800 leading-relaxed">
              O Enneagram é um sistema de 9 tipos de personalidade baseado em <strong>motivações centrais</strong>, não comportamentos. 
              Cada tipo tem um <strong>medo básico</strong> e um <strong>desejo básico</strong> que guiam suas ações. 
              Os tipos são organizados em 3 centros: <span className="text-red-600 font-bold">Corpo/Instinto</span> (raiva), 
              <span className="text-emerald-600 font-bold"> Coração</span> (vergonha), e <span className="text-blue-600 font-bold">Cabeça</span> (medo).
            </p>
          </div>
          
          {/* Core Type Selection */}
          <div>
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
              Core Type — Qual é a motivação central do seu personagem?
            </label>
            <select
              value={data.framework.enneagramType || ''}
              onChange={(e) => {
                const newType = e.target.value;
                updateData('psychology', {
                  ...data,
                  framework: {
                    ...data.framework,
                    enneagramType: newType,
                    enneagramWing: '' // Reset wing when type changes
                  }
                });
              }}
              className="w-full bg-white border-2 border-gray-300 rounded-sm py-3 px-3 font-mono text-sm text-gray-800 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="">-- Selecione o Tipo Principal --</option>
              <optgroup label="🔴 CORPO/INSTINTO — Relacionados à raiva e autonomia">
                <option value="8">Tipo 8 — O Desafiador — Quer estar no controle e ser forte</option>
                <option value="9">Tipo 9 — O Pacificador — Quer paz interior e harmonia</option>
                <option value="1">Tipo 1 — O Reformador — Quer ser correto e melhorar tudo</option>
              </optgroup>
              <optgroup label="💚 CORAÇÃO — Relacionados à vergonha e identidade">
                <option value="2">Tipo 2 — O Ajudante — Quer ser amado e necessário</option>
                <option value="3">Tipo 3 — O Realizador — Quer ser valioso e bem-sucedido</option>
                <option value="4">Tipo 4 — O Individualista — Quer ser único e autêntico</option>
              </optgroup>
              <optgroup label="🔵 CABEÇA — Relacionados ao medo e segurança">
                <option value="5">Tipo 5 — O Investigador — Quer ser capaz e entender tudo</option>
                <option value="6">Tipo 6 — O Leal — Quer segurança e apoio</option>
                <option value="7">Tipo 7 — O Entusiasta — Quer ser livre e feliz</option>
              </optgroup>
            </select>
          </div>

          {/* Type Details Card - Only shows when type is selected */}
          {data.framework.enneagramType && (
            <div className={`border-2 rounded-sm overflow-hidden ${
              ['8','9','1'].includes(data.framework.enneagramType) ? 'border-red-300' :
              ['2','3','4'].includes(data.framework.enneagramType) ? 'border-emerald-300' :
              'border-blue-300'
            }`}>
              {/* Dynamic Header based on type */}
              <div className={`px-4 py-3 ${
                ['8','9','1'].includes(data.framework.enneagramType) ? 'bg-red-100' :
                ['2','3','4'].includes(data.framework.enneagramType) ? 'bg-emerald-100' :
                'bg-blue-100'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-mono text-2xl font-bold">Tipo {data.framework.enneagramType}</span>
                    <span className="mx-2">—</span>
                    <span className="font-serif text-lg">
                      {data.framework.enneagramType === '1' && 'O Reformador'}
                      {data.framework.enneagramType === '2' && 'O Ajudante'}
                      {data.framework.enneagramType === '3' && 'O Realizador'}
                      {data.framework.enneagramType === '4' && 'O Individualista'}
                      {data.framework.enneagramType === '5' && 'O Investigador'}
                      {data.framework.enneagramType === '6' && 'O Leal'}
                      {data.framework.enneagramType === '7' && 'O Entusiasta'}
                      {data.framework.enneagramType === '8' && 'O Desafiador'}
                      {data.framework.enneagramType === '9' && 'O Pacificador'}
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded ${
                    ['8','9','1'].includes(data.framework.enneagramType) ? 'bg-red-200 text-red-800' :
                    ['2','3','4'].includes(data.framework.enneagramType) ? 'bg-emerald-200 text-emerald-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {['8','9','1'].includes(data.framework.enneagramType) && '🔴 Centro Corporal'}
                    {['2','3','4'].includes(data.framework.enneagramType) && '💚 Centro Emocional'}
                    {['5','6','7'].includes(data.framework.enneagramType) && '🔵 Centro Mental'}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-4 bg-white">
                {/* Type-specific content */}
                {data.framework.enneagramType === '1' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Principiado, propositivo, autocontrolado, perfeccionista</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ser corrupto, mau ou defeituoso</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ser bom, ter integridade, ser equilibrado</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Sábio, realista, nobre, heroico moralmente</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Ordenado, moralista, inflexível, crítico</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Obsessivo, contraditório, punitivo</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '2' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Generoso, demonstrativo, agradável, possessivo</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ser indesejado, indigno de amor</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Sentir-se amado e querido</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Altruísta, amoroso incondicionalmente</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Agradador, possessivo, intrusivo</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Manipulador, coercitivo, vitimista</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '3' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Adaptável, excelente, ambicioso, consciente da imagem</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ser sem valor ou sem sucesso</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Sentir-se valioso e admirado</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Autêntico, modesto, inspirador</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Competitivo, narcisista, workaholic</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Enganador, oportunista, vingativo</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '4' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Expressivo, dramático, introspectivo, temperamental</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Não ter identidade ou significado pessoal</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Encontrar a si mesmo e sua significância</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Criativo, inspirado, transformador</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Melancólico, invejoso, autoindulgente</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Depressivo, alienado, autodestrutivo</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '5' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Perceptivo, inovador, reservado, isolado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ser inútil, incapaz ou incompetente</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ser capaz e competente</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Visionário, pioneiro, compreensivo</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Desapegado, cerebral, provocativo</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Niilista, excêntrico, fóbico</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '6' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Engajado, responsável, ansioso, desconfiado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ficar sem apoio ou orientação</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ter segurança e suporte</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Confiante, corajoso, líder</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Cauteloso, defensivo, reclamão</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Paranoico, dependente, autodestrutivo</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '7' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Espontâneo, versátil, disperso, aquisitivo</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ser privado ou preso na dor</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ser satisfeito e contente</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Grato, presente, alegre, realizado</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Excessivo, disperso, impulsivo</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Escapista, maníaco, fora de controle</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '8' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Autoconfiante, decisivo, determinado, confrontador</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Ser machucado ou controlado por outros</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Proteger-se e controlar seu próprio destino</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Magnânimo, heroico, protetor</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Dominador, combativo, intimidador</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Implacável, ditatorial, destrutivo</p>
                      </div>
                    </div>
                  </>
                )}
                
                {data.framework.enneagramType === '9' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">Receptivo, tranquilizador, complacente, resignado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">😨 Medo Básico</h4>
                        <p className="font-mono text-xs">Perda, fragmentação, separação</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">💫 Desejo Básico</h4>
                        <p className="font-mono text-xs">Ter paz interior e estabilidade</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-2">📊 Níveis de Saúde</h4>
                      <div className="space-y-1 font-mono text-xs">
                        <p><span className="text-green-600 font-bold">Saudável:</span> Autônomo, sereno, conectado</p>
                        <p><span className="text-amber-600 font-bold">Médio:</span> Complacente, teimoso, apaziguador</p>
                        <p><span className="text-red-600 font-bold">Não-saudável:</span> Dissociado, negligente, entorpecido</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Wing Selection - Only shows when type is selected */}
          {data.framework.enneagramType && (
            <div>
              <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                Wing — A "asa" adiciona nuances ao tipo principal
              </label>
              <p className="font-mono text-[10px] text-gray-400 mb-2">
                Cada tipo tem duas wings possíveis (os números adjacentes). A wing influencia como o tipo principal se expressa.
              </p>
              <select
                value={data.framework.enneagramWing || ''}
                onChange={(e) => update('framework', 'enneagramWing', e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-sm py-3 px-3 font-mono text-sm text-gray-800 focus:border-amber-500 focus:outline-none cursor-pointer"
              >
                <option value="">-- Selecione a Wing --</option>
                {data.framework.enneagramType === '1' && (
                  <>
                    <option value="1w9">1w9 — O Idealista — Mais introvertido, filosófico, reservado</option>
                    <option value="1w2">1w2 — O Advogado — Mais extrovertido, empático, prestativo</option>
                  </>
                )}
                {data.framework.enneagramType === '2' && (
                  <>
                    <option value="2w1">2w1 — O Servidor — Mais idealista, objetivo, controlado</option>
                    <option value="2w3">2w3 — O Anfitrião — Mais ambicioso, charmoso, adaptável</option>
                  </>
                )}
                {data.framework.enneagramType === '3' && (
                  <>
                    <option value="3w2">3w2 — O Encantador — Mais sociável, generoso, sedutor</option>
                    <option value="3w4">3w4 — O Profissional — Mais introvertido, artístico, sério</option>
                  </>
                )}
                {data.framework.enneagramType === '4' && (
                  <>
                    <option value="4w3">4w3 — O Aristocrata — Mais ambicioso, sociável, competitivo</option>
                    <option value="4w5">4w5 — O Boêmio — Mais introvertido, intelectual, não-convencional</option>
                  </>
                )}
                {data.framework.enneagramType === '5' && (
                  <>
                    <option value="5w4">5w4 — O Iconoclasta — Mais criativo, sensível, introspectivo</option>
                    <option value="5w6">5w6 — O Solucionador — Mais cooperativo, leal, cético</option>
                  </>
                )}
                {data.framework.enneagramType === '6' && (
                  <>
                    <option value="6w5">6w5 — O Defensor — Mais introvertido, intelectual, independente</option>
                    <option value="6w7">6w7 — O Camarada — Mais extrovertido, brincalhão, divertido</option>
                  </>
                )}
                {data.framework.enneagramType === '7' && (
                  <>
                    <option value="7w6">7w6 — O Animador — Mais leal, responsável, ansioso</option>
                    <option value="7w8">7w8 — O Realista — Mais assertivo, competitivo, materialista</option>
                  </>
                )}
                {data.framework.enneagramType === '8' && (
                  <>
                    <option value="8w7">8w7 — O Maverick — Mais extrovertido, ambicioso, impulsivo</option>
                    <option value="8w9">8w9 — O Urso — Mais receptivo, paciente, gentil</option>
                  </>
                )}
                {data.framework.enneagramType === '9' && (
                  <>
                    <option value="9w8">9w8 — O Árbitro — Mais assertivo, confiante, teimoso</option>
                    <option value="9w1">9w1 — O Sonhador — Mais idealista, ordenado, crítico</option>
                  </>
                )}
              </select>
              
              {/* Wing Description */}
              {data.framework.enneagramWing && (
                <div className={`mt-3 p-3 rounded border-2 border-dashed ${
                  ['8','9','1'].includes(data.framework.enneagramType) ? 'border-red-300 bg-red-50' :
                  ['2','3','4'].includes(data.framework.enneagramType) ? 'border-emerald-300 bg-emerald-50' :
                  'border-blue-300 bg-blue-50'
                }`}>
                  <p className="font-mono text-sm">
                    <span className="font-bold">{data.framework.enneagramWing}</span> selecionado
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Advanced Options */}
          {data.framework.enneagramType && (
            <details className="border border-gray-200 rounded-sm overflow-hidden">
              <summary className="px-4 py-3 bg-gray-100 cursor-pointer font-mono text-[11px] uppercase tracking-wider text-gray-600 hover:bg-gray-200">
                ▶ Opções Avançadas (Tritype, Instinto, Saúde)
              </summary>
              <div className="p-4 space-y-4 bg-white">
                {/* Tritype */}
                <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                    Tritype — Um tipo de cada centro
                  </label>
                  <p className="font-mono text-[10px] text-gray-400 mb-3">
                    O Tritype combina um tipo de cada centro (Corpo + Coração + Cabeça) para maior precisão.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-mono text-[9px] text-red-500 mb-1 block">🔴 Corpo</label>
                      <select
                        value={data.framework.tritypeBody || ''}
                        onChange={(e) => update('framework', 'tritypeBody', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                      >
                        <option value="">--</option>
                        <option value="8">8 - Desafiador</option>
                        <option value="9">9 - Pacificador</option>
                        <option value="1">1 - Reformador</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-emerald-500 mb-1 block">💚 Coração</label>
                      <select
                        value={data.framework.tritypeHeart || ''}
                        onChange={(e) => update('framework', 'tritypeHeart', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                      >
                        <option value="">--</option>
                        <option value="2">2 - Ajudante</option>
                        <option value="3">3 - Realizador</option>
                        <option value="4">4 - Individualista</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-blue-500 mb-1 block">🔵 Cabeça</label>
                      <select
                        value={data.framework.tritypeHead || ''}
                        onChange={(e) => update('framework', 'tritypeHead', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                      >
                        <option value="">--</option>
                        <option value="5">5 - Investigador</option>
                        <option value="6">6 - Leal</option>
                        <option value="7">7 - Entusiasta</option>
                      </select>
                    </div>
                  </div>
                  {data.framework.tritypeBody && data.framework.tritypeHeart && data.framework.tritypeHead && (
                    <p className="mt-3 font-mono text-sm text-center p-2 bg-amber-50 rounded border border-amber-200">
                      Tritype: <span className="font-bold text-lg">{data.framework.tritypeBody}-{data.framework.tritypeHeart}-{data.framework.tritypeHead}</span>
                    </p>
                  )}
                </div>
                
                {/* Instinctual Variant */}
                <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                    Variante Instintiva
                  </label>
                  <p className="font-mono text-[10px] text-gray-400 mb-3">
                    Os 3 instintos básicos: <strong>SP</strong> (autopreservação), <strong>SX</strong> (sexual/intensidade), <strong>SO</strong> (social).
                  </p>
                  <select
                    value={data.framework.instinctualVariant || ''}
                    onChange={(e) => update('framework', 'instinctualVariant', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2 px-2 font-mono text-sm"
                  >
                    <option value="">-- Selecione --</option>
                    <option value="sp/sx">SP/SX — Autopreservação primeiro, depois Sexual</option>
                    <option value="sp/so">SP/SO — Autopreservação primeiro, depois Social</option>
                    <option value="sx/sp">SX/SP — Sexual primeiro, depois Autopreservação</option>
                    <option value="sx/so">SX/SO — Sexual primeiro, depois Social</option>
                    <option value="so/sp">SO/SP — Social primeiro, depois Autopreservação</option>
                    <option value="so/sx">SO/SX — Social primeiro, depois Sexual</option>
                  </select>
                </div>
                
                {/* Health Level */}
                <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
                    Nível de Saúde Atual (1 = Mais saudável, 9 = Menos saudável)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={data.framework.enneagramHealth || 5}
                    onChange={(e) => update('framework', 'enneagramHealth', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-gray-500 mt-1">
                    <span className="text-green-600">1-3 Saudável</span>
                    <span className="text-amber-600">4-6 Médio</span>
                    <span className="text-red-600">7-9 Não-saudável</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className={`font-mono text-xl font-bold ${
                      (data.framework.enneagramHealth || 5) <= 3 ? 'text-green-600' :
                      (data.framework.enneagramHealth || 5) <= 6 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      Nível {data.framework.enneagramHealth || 5}
                    </span>
                  </div>
                </div>
              </div>
            </details>
          )}
        </div>

        {/* Temperament Section - Complete */}
        <div className="space-y-4 mt-6">
          {/* Temperament Header with Explanation */}
          <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
            <h3 className="font-mono text-sm font-bold text-orange-900 mb-2">✦ TEMPERAMENTO</h3>
            <p className="font-mono text-xs text-orange-800 leading-relaxed">
              Sistema clássico de 4 temperamentos baseado na teoria dos <strong>humores</strong> de Hipócrates. 
              Cada temperamento tem características distintas baseadas em dois eixos: 
              <strong> Extroversão vs Introversão</strong> e <strong>Orientação a Pessoas vs Tarefas</strong>.
            </p>
            {/* Visual Matrix */}
            <div className="mt-3 p-3 bg-white rounded border border-orange-200">
              <div className="grid grid-cols-3 gap-1 text-center font-mono text-[9px]">
                <div></div>
                <div className="text-orange-600 font-bold">↑ EXTROVERTIDO</div>
                <div></div>
                <div className="text-orange-600 font-bold">PESSOAS ←</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-yellow-100 p-1 rounded text-yellow-800">🌞 Sanguíneo</div>
                  <div className="bg-red-100 p-1 rounded text-red-800">🔥 Colérico</div>
                  <div className="bg-blue-100 p-1 rounded text-blue-800">💧 Fleumático</div>
                  <div className="bg-purple-100 p-1 rounded text-purple-800">🌍 Melancólico</div>
                </div>
                <div className="text-orange-600 font-bold">→ TAREFAS</div>
                <div></div>
                <div className="text-orange-600 font-bold">↓ INTROVERTIDO</div>
                <div></div>
              </div>
            </div>
          </div>

          {/* Temperament Selection */}
          <div>
            <label className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.15em] mb-2 block">
              Temperamento Principal
            </label>
            <select
              value={data.framework.temperament || ''}
              onChange={(e) => update('framework', 'temperament', e.target.value)}
              className="w-full bg-white border-2 border-gray-300 rounded-sm py-3 px-3 font-mono text-sm text-gray-800 focus:border-orange-500 focus:outline-none cursor-pointer"
            >
              <option value="">-- Selecione o Temperamento --</option>
              <optgroup label="🎯 Temperamentos Puros">
                <option value="Sanguine">🌞 Sanguíneo — Otimista, social, energético, entusiasmado</option>
                <option value="Choleric">🔥 Colérico — Ambicioso, líder, decidido, orientado a resultados</option>
                <option value="Melancholic">🌍 Melancólico — Analítico, detalhista, perfeccionista, sensível</option>
                <option value="Phlegmatic">💧 Fleumático — Calmo, pacífico, consistente, diplomático</option>
              </optgroup>
              <optgroup label="🔀 Combinações (Primário-Secundário)">
                <option value="Sanguine-Choleric">🌞🔥 Sanguíneo-Colérico — Influente e orientado a resultados</option>
                <option value="Sanguine-Phlegmatic">🌞💧 Sanguíneo-Fleumático — Sociável mas estável e calmo</option>
                <option value="Choleric-Sanguine">🔥🌞 Colérico-Sanguíneo — Líder dinâmico e carismático</option>
                <option value="Choleric-Melancholic">🔥🌍 Colérico-Melancólico — Determinado e perfeccionista</option>
                <option value="Melancholic-Choleric">🌍🔥 Melancólico-Colérico — Analítico e assertivo</option>
                <option value="Melancholic-Phlegmatic">🌍💧 Melancólico-Fleumático — Pensativo e consistente</option>
                <option value="Phlegmatic-Sanguine">💧🌞 Fleumático-Sanguíneo — Estável e amigável</option>
                <option value="Phlegmatic-Melancholic">💧🌍 Fleumático-Melancólico — Paciente e metódico</option>
              </optgroup>
            </select>
          </div>

          {/* Temperament Details Card */}
          {data.framework.temperament && (
            <div className={`border-2 rounded-sm overflow-hidden ${
              data.framework.temperament.startsWith('Sanguine') ? 'border-yellow-300' :
              data.framework.temperament.startsWith('Choleric') ? 'border-red-300' :
              data.framework.temperament.startsWith('Melancholic') ? 'border-purple-300' :
              'border-blue-300'
            }`}>
              {/* Header */}
              <div className={`px-4 py-3 ${
                data.framework.temperament.startsWith('Sanguine') ? 'bg-yellow-100' :
                data.framework.temperament.startsWith('Choleric') ? 'bg-red-100' :
                data.framework.temperament.startsWith('Melancholic') ? 'bg-purple-100' :
                'bg-blue-100'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xl font-bold">
                    {data.framework.temperament === 'Sanguine' && '🌞 Sanguíneo'}
                    {data.framework.temperament === 'Choleric' && '🔥 Colérico'}
                    {data.framework.temperament === 'Melancholic' && '🌍 Melancólico'}
                    {data.framework.temperament === 'Phlegmatic' && '💧 Fleumático'}
                    {data.framework.temperament === 'Sanguine-Choleric' && '🌞🔥 Sanguíneo-Colérico'}
                    {data.framework.temperament === 'Sanguine-Phlegmatic' && '🌞💧 Sanguíneo-Fleumático'}
                    {data.framework.temperament === 'Choleric-Sanguine' && '🔥🌞 Colérico-Sanguíneo'}
                    {data.framework.temperament === 'Choleric-Melancholic' && '🔥🌍 Colérico-Melancólico'}
                    {data.framework.temperament === 'Melancholic-Choleric' && '🌍🔥 Melancólico-Colérico'}
                    {data.framework.temperament === 'Melancholic-Phlegmatic' && '🌍💧 Melancólico-Fleumático'}
                    {data.framework.temperament === 'Phlegmatic-Sanguine' && '💧🌞 Fleumático-Sanguíneo'}
                    {data.framework.temperament === 'Phlegmatic-Melancholic' && '💧🌍 Fleumático-Melancólico'}
                  </span>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded ${
                    data.framework.temperament.startsWith('Sanguine') ? 'bg-yellow-200 text-yellow-800' :
                    data.framework.temperament.startsWith('Choleric') ? 'bg-red-200 text-red-800' :
                    data.framework.temperament.startsWith('Melancholic') ? 'bg-purple-200 text-purple-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {(data.framework.temperament.startsWith('Sanguine') || data.framework.temperament.startsWith('Choleric')) ? 'Extrovertido' : 'Introvertido'}
                    {' • '}
                    {(data.framework.temperament.startsWith('Sanguine') || data.framework.temperament.startsWith('Phlegmatic') || 
                      data.framework.temperament === 'Choleric-Sanguine' || data.framework.temperament === 'Melancholic-Phlegmatic') 
                      ? 'Pessoas' : 'Tarefas'}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-4 bg-white">
                {/* Sanguine */}
                {data.framework.temperament === 'Sanguine' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Ar | <strong>Humor:</strong> Sangue | <strong>Estação:</strong> Primavera
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Sanguíneo é a "alma da festa" - otimista, sociável e cheio de energia. São comunicadores naturais que adoram estar rodeados de pessoas e tendem a ver o lado positivo de tudo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Carismático, entusiasmado, comunicativo, adaptável, alegre, criativo</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Impulsivo, desorganizado, superficial, esquecido, exagerado, indisciplinado</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Vendas, relações públicas, entretenimento, ensino, marketing</p>
                    </div>
                  </>
                )}
                
                {/* Choleric */}
                {data.framework.temperament === 'Choleric' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Fogo | <strong>Humor:</strong> Bile Amarela | <strong>Estação:</strong> Verão
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Colérico é o líder nato - ambicioso, determinado e orientado a resultados. São pessoas práticas que assumem o controle naturalmente e não têm medo de tomar decisões difíceis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Determinado, confiante, produtivo, decisivo, líder, independente</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Impaciente, dominador, irritável, insensível, workaholic, controlador</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Liderança, empreendedorismo, gestão, militar, política, direito</p>
                    </div>
                  </>
                )}
                
                {/* Melancholic */}
                {data.framework.temperament === 'Melancholic' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Terra | <strong>Humor:</strong> Bile Negra | <strong>Estação:</strong> Outono
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Melancólico é o pensador profundo - analítico, detalhista e perfeccionista. São pessoas sensíveis com rica vida interior que buscam significado e excelência em tudo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Analítico, criativo, leal, idealista, organizado, profundo</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Pessimista, crítico, rancoroso, inseguro, inflexível, difícil de agradar</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Artes, pesquisa, medicina, contabilidade, engenharia, escrita</p>
                    </div>
                  </>
                )}
                
                {/* Phlegmatic */}
                {data.framework.temperament === 'Phlegmatic' && (
                  <>
                    <p className="font-mono text-sm text-gray-700">
                      <strong>Elemento:</strong> Água | <strong>Humor:</strong> Fleuma | <strong>Estação:</strong> Inverno
                    </p>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      O Fleumático é o pacificador - calmo, estável e diplomático. São pessoas confiáveis que mantêm a paz e funcionam bem sob pressão, preferindo harmonia a conflito.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h4 className="font-mono text-[10px] uppercase text-green-600 mb-1">✓ Forças</h4>
                        <p className="font-mono text-xs">Calmo, confiável, paciente, equilibrado, diplomático, bom ouvinte</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded border border-red-200">
                        <h4 className="font-mono text-[10px] uppercase text-red-600 mb-1">✗ Fraquezas</h4>
                        <p className="font-mono text-xs">Passivo, indeciso, teimoso, desmotivado, resistente a mudanças, evasivo</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-1">💼 No trabalho</h4>
                      <p className="font-mono text-xs text-gray-600">Diplomacia, recursos humanos, counseling, administração, suporte</p>
                    </div>
                  </>
                )}

                {/* Combinations */}
                {data.framework.temperament === 'Sanguine-Choleric' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-yellow-600 font-bold">sociabilidade e entusiasmo</span> do Sanguíneo com a <span className="text-red-600 font-bold">determinação e liderança</span> do Colérico. São líderes carismáticos que inspiram outros enquanto buscam resultados.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Influente, persuasivo, orientado a resultados, inspirador, pode ser impaciente e dominador quando frustrado.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Sanguine-Phlegmatic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-yellow-600 font-bold">alegria e sociabilidade</span> do Sanguíneo com a <span className="text-blue-600 font-bold">calma e estabilidade</span> do Fleumático. São pessoas amigáveis e fáceis de conviver, menos intensas que o Sanguíneo puro.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Amigável, estável, adaptável, agradável, pode evitar conflitos e ter dificuldade com disciplina.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Choleric-Sanguine' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-red-600 font-bold">ambição e assertividade</span> do Colérico com o <span className="text-yellow-600 font-bold">carisma e entusiasmo</span> do Sanguíneo. São líderes dinâmicos que motivam equipes enquanto mantêm foco nos objetivos.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Dinâmico, assertivo, carismático, competitivo, pode ser impulsivo e insensível às vezes.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Choleric-Melancholic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-red-600 font-bold">determinação e liderança</span> do Colérico com o <span className="text-purple-600 font-bold">perfeccionismo e análise</span> do Melancólico. São realizadores exigentes que buscam excelência em tudo.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Perfeccionista, determinado, exigente, focado, pode ser muito crítico e workaholic.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Melancholic-Choleric' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-purple-600 font-bold">profundidade analítica</span> do Melancólico com a <span className="text-red-600 font-bold">assertividade</span> do Colérico. São pensadores estratégicos que também sabem agir e liderar.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Estratégico, analítico, determinado, independente, pode ser frio e excessivamente crítico.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Melancholic-Phlegmatic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-purple-600 font-bold">profundidade e idealismo</span> do Melancólico com a <span className="text-blue-600 font-bold">calma e consistência</span> do Fleumático. São introvertidos pensativos, consistentes e leais.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Pensativo, consistente, leal, metódico, pode ser pessimista e resistente a mudanças.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Phlegmatic-Sanguine' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-blue-600 font-bold">estabilidade e paciência</span> do Fleumático com a <span className="text-yellow-600 font-bold">simpatia e humor</span> do Sanguíneo. São pessoas agradáveis que equilibram calma com sociabilidade.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Agradável, humorado, estável, não-ameaçador, pode ser indeciso e evitar responsabilidades.</p>
                    </div>
                  </>
                )}
                
                {data.framework.temperament === 'Phlegmatic-Melancholic' && (
                  <>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed">
                      Combina a <span className="text-blue-600 font-bold">calma e diplomacia</span> do Fleumático com a <span className="text-purple-600 font-bold">atenção aos detalhes</span> do Melancólico. São observadores pacientes e metódicos.
                    </p>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-mono text-xs"><strong>Características:</strong> Metódico, paciente, observador, confiável, pode ser passivo e muito lento para agir.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <SectionHeader title="Big Five (OCEAN)" />
        
        {/* Big Five Explanation */}
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4 mb-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">✦ BIG FIVE (OCEAN)</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">
            O modelo dos <strong>Cinco Grandes Fatores</strong> é o sistema de personalidade mais aceito cientificamente. 
            Cada fator existe em um <strong>espectro</strong> — não há "bom" ou "ruim", apenas diferentes tendências. 
            Mova os controles para definir onde seu personagem se encontra em cada dimensão.
          </p>
        </div>

        {/* Openness */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">O — Openness</h4>
            <span className="font-mono text-xs text-gray-500">Abertura à Experiência</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede curiosidade intelectual, criatividade e preferência por novidade vs. tradição.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Convencional</span>
              <span>Inventivo</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveO}
              onChange={(e) => update('framework', 'bigFiveO', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-300 via-teal-200 to-teal-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveO <= 2 ? 'bg-gray-200 text-gray-700' :
                data.framework.bigFiveO <= 4 ? 'bg-gray-100 text-gray-600' :
                data.framework.bigFiveO === 5 ? 'bg-teal-100 text-teal-700' :
                data.framework.bigFiveO <= 7 ? 'bg-teal-200 text-teal-800' :
                'bg-teal-300 text-teal-900'
              }`}>
                {data.framework.bigFiveO === 1 && 'Muito Convencional'}
                {data.framework.bigFiveO === 2 && 'Convencional'}
                {data.framework.bigFiveO === 3 && 'Moderadamente Convencional'}
                {data.framework.bigFiveO === 4 && 'Levemente Convencional'}
                {data.framework.bigFiveO === 5 && 'Balanceado'}
                {data.framework.bigFiveO === 6 && 'Levemente Inventivo'}
                {data.framework.bigFiveO === 7 && 'Moderadamente Inventivo'}
                {data.framework.bigFiveO === 8 && 'Inventivo'}
                {data.framework.bigFiveO === 9 && 'Muito Inventivo'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveO <= 2 && '💡 Prefere fortemente o familiar, prático e concreto. Desconfia de ideias abstratas e mudanças.'}
              {data.framework.bigFiveO === 3 && '💡 Tendência a preferir rotina e tradição, mas aceita algumas novidades quando necessário.'}
              {data.framework.bigFiveO === 4 && '💡 Ligeira preferência pelo convencional, mas não é fechado a novas experiências.'}
              {data.framework.bigFiveO === 5 && '💡 Equilibra tradição com abertura. Adapta-se conforme a situação.'}
              {data.framework.bigFiveO === 6 && '💡 Ligeira curiosidade por novas ideias, mas mantém pés no chão.'}
              {data.framework.bigFiveO === 7 && '💡 Aprecia criatividade e novidade. Gosta de explorar ideias e possibilidades.'}
              {data.framework.bigFiveO === 8 && '💡 Muito curioso e criativo. Busca ativamente novas experiências e perspectivas.'}
              {data.framework.bigFiveO === 9 && '💡 Extremamente imaginativo e aberto. Vive no mundo das ideias e possibilidades.'}
            </p>
          </div>
        </div>

        {/* Conscientiousness */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">C — Conscientiousness</h4>
            <span className="font-mono text-xs text-gray-500">Conscienciosidade</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede organização, disciplina, confiabilidade e orientação a metas vs. espontaneidade.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Espontâneo</span>
              <span>Organizado</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveC}
              onChange={(e) => update('framework', 'bigFiveC', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-amber-300 via-amber-100 to-indigo-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveC <= 2 ? 'bg-amber-200 text-amber-800' :
                data.framework.bigFiveC <= 4 ? 'bg-amber-100 text-amber-700' :
                data.framework.bigFiveC === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveC <= 7 ? 'bg-indigo-100 text-indigo-700' :
                'bg-indigo-200 text-indigo-800'
              }`}>
                {data.framework.bigFiveC === 1 && 'Muito Espontâneo'}
                {data.framework.bigFiveC === 2 && 'Espontâneo'}
                {data.framework.bigFiveC === 3 && 'Moderadamente Espontâneo'}
                {data.framework.bigFiveC === 4 && 'Levemente Espontâneo'}
                {data.framework.bigFiveC === 5 && 'Balanceado'}
                {data.framework.bigFiveC === 6 && 'Levemente Organizado'}
                {data.framework.bigFiveC === 7 && 'Moderadamente Organizado'}
                {data.framework.bigFiveC === 8 && 'Organizado'}
                {data.framework.bigFiveC === 9 && 'Muito Organizado'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveC <= 2 && '💡 Vive o momento, improvisa, despreocupado com planejamento. Pode parecer irresponsável.'}
              {data.framework.bigFiveC === 3 && '💡 Prefere flexibilidade a estrutura. Planeja pouco, adapta-se conforme necessário.'}
              {data.framework.bigFiveC === 4 && '💡 Ligeiramente desorganizado, mas consegue se estruturar quando precisa.'}
              {data.framework.bigFiveC === 5 && '💡 Equilibra planejamento com flexibilidade. Nem rígido nem caótico.'}
              {data.framework.bigFiveC === 6 && '💡 Tendência a organização, mas não é inflexível. Gosta de ter um plano.'}
              {data.framework.bigFiveC === 7 && '💡 Disciplinado e confiável. Cumpre prazos e mantém compromissos.'}
              {data.framework.bigFiveC === 8 && '💡 Muito organizado e focado em metas. Trabalha duro para alcançar objetivos.'}
              {data.framework.bigFiveC === 9 && '💡 Extremamente metódico e perfeccionista. Pode ser workaholic ou inflexível.'}
            </p>
          </div>
        </div>

        {/* Extraversion */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">E — Extraversion</h4>
            <span className="font-mono text-xs text-gray-500">Extroversão</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede sociabilidade, assertividade e busca por estímulos externos vs. reflexão interna.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Introvertido</span>
              <span>Extrovertido</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveE}
              onChange={(e) => update('framework', 'bigFiveE', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-slate-400 via-slate-200 to-yellow-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveE <= 2 ? 'bg-slate-200 text-slate-700' :
                data.framework.bigFiveE <= 4 ? 'bg-slate-100 text-slate-600' :
                data.framework.bigFiveE === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveE <= 7 ? 'bg-yellow-100 text-yellow-700' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {data.framework.bigFiveE === 1 && 'Muito Introvertido'}
                {data.framework.bigFiveE === 2 && 'Introvertido'}
                {data.framework.bigFiveE === 3 && 'Moderadamente Introvertido'}
                {data.framework.bigFiveE === 4 && 'Levemente Introvertido'}
                {data.framework.bigFiveE === 5 && 'Ambivertido'}
                {data.framework.bigFiveE === 6 && 'Levemente Extrovertido'}
                {data.framework.bigFiveE === 7 && 'Moderadamente Extrovertido'}
                {data.framework.bigFiveE === 8 && 'Extrovertido'}
                {data.framework.bigFiveE === 9 && 'Muito Extrovertido'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveE <= 2 && '💡 Muito reservado e introspectivo. Precisa de muita solidão para recarregar. Evita holofotes.'}
              {data.framework.bigFiveE === 3 && '💡 Prefere pequenos grupos ou interações um-a-um. Esgota-se em ambientes sociais.'}
              {data.framework.bigFiveE === 4 && '💡 Ligeiramente reservado, mas sociável quando necessário. Prefere observar.'}
              {data.framework.bigFiveE === 5 && '💡 Ambivertido - equilibra tempo social com tempo sozinho. Adapta-se ao contexto.'}
              {data.framework.bigFiveE === 6 && '💡 Geralmente sociável, mas valoriza momentos de quietude. Confortável em grupos.'}
              {data.framework.bigFiveE === 7 && '💡 Gosta de estar com pessoas. Energizado por interações sociais. Comunicativo.'}
              {data.framework.bigFiveE === 8 && '💡 Muito sociável e assertivo. Busca ativamente interações. Entediado sozinho.'}
              {data.framework.bigFiveE === 9 && '💡 Extremamente extrovertido. Alma da festa. Precisa de estímulo social constante.'}
            </p>
          </div>
        </div>

        {/* Agreeableness */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">A — Agreeableness</h4>
            <span className="font-mono text-xs text-gray-500">Amabilidade</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede cooperação, empatia e harmonia social vs. ceticismo, competitividade e assertividade.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Desafiador</span>
              <span>Cooperativo</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveA}
              onChange={(e) => update('framework', 'bigFiveA', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-red-400 via-orange-200 to-green-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveA <= 2 ? 'bg-red-200 text-red-800' :
                data.framework.bigFiveA <= 4 ? 'bg-orange-100 text-orange-700' :
                data.framework.bigFiveA === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveA <= 7 ? 'bg-green-100 text-green-700' :
                'bg-green-200 text-green-800'
              }`}>
                {data.framework.bigFiveA === 1 && 'Muito Desafiador'}
                {data.framework.bigFiveA === 2 && 'Desafiador'}
                {data.framework.bigFiveA === 3 && 'Moderadamente Desafiador'}
                {data.framework.bigFiveA === 4 && 'Levemente Desafiador'}
                {data.framework.bigFiveA === 5 && 'Balanceado'}
                {data.framework.bigFiveA === 6 && 'Levemente Cooperativo'}
                {data.framework.bigFiveA === 7 && 'Moderadamente Cooperativo'}
                {data.framework.bigFiveA === 8 && 'Cooperativo'}
                {data.framework.bigFiveA === 9 && 'Muito Cooperativo'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveA <= 2 && '💡 Muito cético e competitivo. Questiona motivações alheias. Pode ser visto como hostil.'}
              {data.framework.bigFiveA === 3 && '💡 Direto e questionador. Não tem medo de discordar. Prefere verdade a harmonia.'}
              {data.framework.bigFiveA === 4 && '💡 Ligeiramente cético. Coopera, mas mantém olhar crítico. Assertivo quando necessário.'}
              {data.framework.bigFiveA === 5 && '💡 Equilibra assertividade com cooperação. Nem passivo nem agressivo.'}
              {data.framework.bigFiveA === 6 && '💡 Geralmente cooperativo e amigável. Busca harmonia, mas defende suas posições.'}
              {data.framework.bigFiveA === 7 && '💡 Empático e prestativo. Prioriza necessidades dos outros. Evita conflitos.'}
              {data.framework.bigFiveA === 8 && '💡 Muito altruísta e confiante. Acredita no melhor das pessoas. Harmonioso.'}
              {data.framework.bigFiveA === 9 && '💡 Extremamente empático e agradável. Pode ter dificuldade em dizer não.'}
            </p>
          </div>
        </div>

        {/* Neuroticism */}
        <div className="border border-gray-200 rounded-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">N — Neuroticism</h4>
            <span className="font-mono text-xs text-gray-500">Neuroticismo / Estabilidade Emocional</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Mede estabilidade emocional e resiliência vs. sensibilidade, ansiedade e reatividade emocional.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Estável</span>
              <span>Sensível</span>
            </div>
            <input
              type="range"
              min="1"
              max="9"
              value={data.framework.bigFiveN}
              onChange={(e) => update('framework', 'bigFiveN', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-400 via-blue-100 to-pink-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                data.framework.bigFiveN <= 2 ? 'bg-blue-200 text-blue-800' :
                data.framework.bigFiveN <= 4 ? 'bg-blue-100 text-blue-700' :
                data.framework.bigFiveN === 5 ? 'bg-gray-100 text-gray-700' :
                data.framework.bigFiveN <= 7 ? 'bg-pink-100 text-pink-700' :
                'bg-pink-200 text-pink-800'
              }`}>
                {data.framework.bigFiveN === 1 && 'Muito Estável'}
                {data.framework.bigFiveN === 2 && 'Estável'}
                {data.framework.bigFiveN === 3 && 'Moderadamente Estável'}
                {data.framework.bigFiveN === 4 && 'Levemente Estável'}
                {data.framework.bigFiveN === 5 && 'Balanceado'}
                {data.framework.bigFiveN === 6 && 'Levemente Sensível'}
                {data.framework.bigFiveN === 7 && 'Moderadamente Sensível'}
                {data.framework.bigFiveN === 8 && 'Sensível'}
                {data.framework.bigFiveN === 9 && 'Muito Sensível'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {data.framework.bigFiveN <= 2 && '💡 Extremamente calmo e resiliente. Raramente se abala. Pode parecer frio ou distante.'}
              {data.framework.bigFiveN === 3 && '💡 Emocionalmente estável na maioria das situações. Recupera-se rápido de estresse.'}
              {data.framework.bigFiveN === 4 && '💡 Geralmente calmo, mas pode reagir em situações de alto estresse.'}
              {data.framework.bigFiveN === 5 && '💡 Equilíbrio entre estabilidade e sensibilidade. Reage proporcionalmente.'}
              {data.framework.bigFiveN === 6 && '💡 Ligeiramente reativo emocionalmente. Sente as coisas com certa intensidade.'}
              {data.framework.bigFiveN === 7 && '💡 Sensível e reativo. Experimenta emoções intensamente. Pode preocupar-se demais.'}
              {data.framework.bigFiveN === 8 && '💡 Muito sensível e ansioso. Emoções fortes e frequentes. Vulnerável a estresse.'}
              {data.framework.bigFiveN === 9 && '💡 Extremamente reativo emocionalmente. Propenso a ansiedade, tristeza e instabilidade.'}
            </p>
          </div>
        </div>

        {/* Big Five Summary Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-500 mb-3">📊 Resumo do Perfil OCEAN</h4>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className={`p-2 rounded ${data.framework.bigFiveO >= 6 ? 'bg-teal-100' : data.framework.bigFiveO <= 4 ? 'bg-gray-200' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">O</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveO <= 4 ? 'Conv.' : data.framework.bigFiveO >= 6 ? 'Invent.' : 'Med.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveC >= 6 ? 'bg-indigo-100' : data.framework.bigFiveC <= 4 ? 'bg-amber-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">C</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveC <= 4 ? 'Espont.' : data.framework.bigFiveC >= 6 ? 'Organ.' : 'Med.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveE >= 6 ? 'bg-yellow-100' : data.framework.bigFiveE <= 4 ? 'bg-slate-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">E</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveE <= 4 ? 'Intro.' : data.framework.bigFiveE >= 6 ? 'Extro.' : 'Ambi.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveA >= 6 ? 'bg-green-100' : data.framework.bigFiveA <= 4 ? 'bg-red-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">A</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveA <= 4 ? 'Desaf.' : data.framework.bigFiveA >= 6 ? 'Coop.' : 'Med.'}</div>
            </div>
            <div className={`p-2 rounded ${data.framework.bigFiveN >= 6 ? 'bg-pink-100' : data.framework.bigFiveN <= 4 ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <div className="font-mono text-lg font-bold">N</div>
              <div className="font-mono text-[8px]">{data.framework.bigFiveN <= 4 ? 'Estáv.' : data.framework.bigFiveN >= 6 ? 'Sens.' : 'Med.'}</div>
            </div>
          </div>
        </div>

        {/* DARK TRIAD Section */}
        <div className="mt-8">
          <div className="bg-slate-900 border border-slate-700 rounded-sm p-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-red-400 mb-2">🔺 DARK TRIAD</h3>
            <p className="font-mono text-xs text-slate-300 leading-relaxed">
              A "Tríade Sombria" consiste em três traços de personalidade socialmente aversivos: <strong className="text-red-300">Narcisismo</strong>, <strong className="text-purple-300">Maquiavelismo</strong> e <strong className="text-slate-100">Psicopatia</strong>. 
              Estes traços existem em um espectro — níveis baixos a moderados são comuns na população. 
              Útil para criar personagens complexos, anti-heróis, vilões ou pessoas moralmente ambíguas.
            </p>
          </div>

          {/* Narcissism */}
          <div className="border-2 border-red-200 bg-red-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-red-800">🪞 Narcisismo</h4>
              <span className="font-mono text-xs text-red-600">Grandiosidade • Admiração • Superioridade</span>
            </div>
            <p className="font-mono text-[10px] text-red-700 mb-3">
              Senso inflado de auto-importância, necessidade de admiração excessiva e falta de empatia pelos outros.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-red-600">
                <span>Humilde</span>
                <span>Grandioso</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.darkNarcissism || 1}
                onChange={(e) => update('framework', 'darkNarcissism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-200 via-red-200 to-red-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.darkNarcissism || 1) <= 2 ? 'bg-slate-100 text-slate-600' :
                  (data.framework.darkNarcissism || 1) <= 4 ? 'bg-red-100 text-red-700' :
                  (data.framework.darkNarcissism || 1) <= 6 ? 'bg-red-200 text-red-800' :
                  'bg-red-300 text-red-900'
                }`}>
                  {(data.framework.darkNarcissism || 1) === 1 && 'Ausente'}
                  {(data.framework.darkNarcissism || 1) === 2 && 'Mínimo'}
                  {(data.framework.darkNarcissism || 1) === 3 && 'Baixo'}
                  {(data.framework.darkNarcissism || 1) === 4 && 'Moderado-Baixo'}
                  {(data.framework.darkNarcissism || 1) === 5 && 'Moderado'}
                  {(data.framework.darkNarcissism || 1) === 6 && 'Moderado-Alto'}
                  {(data.framework.darkNarcissism || 1) === 7 && 'Alto'}
                  {(data.framework.darkNarcissism || 1) === 8 && 'Muito Alto'}
                  {(data.framework.darkNarcissism || 1) === 9 && 'Extremo'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-red-700 text-center italic">
                {(data.framework.darkNarcissism || 1) <= 2 && '💡 Humilde e modesto. Não busca atenção especial. Reconhece méritos dos outros.'}
                {(data.framework.darkNarcissism || 1) === 3 && '💡 Autoestima saudável. Ocasionalmente gosta de reconhecimento, mas não depende dele.'}
                {(data.framework.darkNarcissism || 1) === 4 && '💡 Alguma necessidade de validação. Pode ser competitivo sobre conquistas.'}
                {(data.framework.darkNarcissism || 1) === 5 && '💡 Busca admiração regularmente. Tem dificuldade quando não é o centro das atenções.'}
                {(data.framework.darkNarcissism || 1) === 6 && '💡 Senso inflado de importância. Espera tratamento especial. Inveja os outros.'}
                {(data.framework.darkNarcissism || 1) === 7 && '💡 Grandiosidade marcante. Explora relacionamentos. Falta empatia significativa.'}
                {(data.framework.darkNarcissism || 1) === 8 && '💡 Arrogância extrema. Fantasias de poder ilimitado. Relacionamentos superficiais.'}
                {(data.framework.darkNarcissism || 1) === 9 && '💡 Narcisismo patológico. Incapaz de ver os outros como iguais. Potencialmente destrutivo.'}
              </p>
            </div>
            {/* Narcissism Subtype */}
            {(data.framework.darkNarcissism || 1) >= 4 && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <label className="font-mono text-[9px] text-red-600 uppercase tracking-wider mb-2 block">Subtipo Narcisista</label>
                <select
                  value={data.framework.narcissismSubtype || ''}
                  onChange={(e) => update('framework', 'narcissismSubtype', e.target.value)}
                  className="w-full bg-white border border-red-200 rounded-sm py-2 px-2 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="grandiose">Grandioso — Arrogante, dominante, busca status e poder</option>
                  <option value="vulnerable">Vulnerável — Frágil, hipersensível a críticas, ressentido</option>
                  <option value="communal">Comunal — Se vê como o "mais altruísta", bondade como superioridade</option>
                  <option value="malignant">Maligno — Combinado com sadismo e paranoia, destrutivo</option>
                </select>
              </div>
            )}
          </div>

          {/* Machiavellianism */}
          <div className="border-2 border-purple-200 bg-purple-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-purple-800">🎭 Maquiavelismo</h4>
              <span className="font-mono text-xs text-purple-600">Manipulação • Cinismo • Estratégia</span>
            </div>
            <p className="font-mono text-[10px] text-purple-700 mb-3">
              Tendência a manipular e explorar outros, visão cínica da natureza humana, foco em interesses próprios acima da moralidade.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-purple-600">
                <span>Sincero</span>
                <span>Manipulador</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.darkMachiavellianism || 1}
                onChange={(e) => update('framework', 'darkMachiavellianism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-200 via-purple-200 to-purple-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.darkMachiavellianism || 1) <= 2 ? 'bg-slate-100 text-slate-600' :
                  (data.framework.darkMachiavellianism || 1) <= 4 ? 'bg-purple-100 text-purple-700' :
                  (data.framework.darkMachiavellianism || 1) <= 6 ? 'bg-purple-200 text-purple-800' :
                  'bg-purple-300 text-purple-900'
                }`}>
                  {(data.framework.darkMachiavellianism || 1) === 1 && 'Ausente'}
                  {(data.framework.darkMachiavellianism || 1) === 2 && 'Mínimo'}
                  {(data.framework.darkMachiavellianism || 1) === 3 && 'Baixo'}
                  {(data.framework.darkMachiavellianism || 1) === 4 && 'Moderado-Baixo'}
                  {(data.framework.darkMachiavellianism || 1) === 5 && 'Moderado'}
                  {(data.framework.darkMachiavellianism || 1) === 6 && 'Moderado-Alto'}
                  {(data.framework.darkMachiavellianism || 1) === 7 && 'Alto'}
                  {(data.framework.darkMachiavellianism || 1) === 8 && 'Muito Alto'}
                  {(data.framework.darkMachiavellianism || 1) === 9 && 'Extremo'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-purple-700 text-center italic">
                {(data.framework.darkMachiavellianism || 1) <= 2 && '💡 Direto e sincero. Confia nos outros. Não usa pessoas como meios para fins.'}
                {(data.framework.darkMachiavellianism || 1) === 3 && '💡 Geralmente honesto, mas capaz de diplomacia estratégica quando necessário.'}
                {(data.framework.darkMachiavellianism || 1) === 4 && '💡 Pragmático. Entende jogos políticos mas prefere não participar.'}
                {(data.framework.darkMachiavellianism || 1) === 5 && '💡 Calculista em situações competitivas. "Os fins justificam os meios" às vezes.'}
                {(data.framework.darkMachiavellianism || 1) === 6 && '💡 Estratégico e oportunista. Manipula quando beneficia. Cínico sobre motivações.'}
                {(data.framework.darkMachiavellianism || 1) === 7 && '💡 Mestre manipulador. Vê relacionamentos como transações. Amoral pragmático.'}
                {(data.framework.darkMachiavellianism || 1) === 8 && '💡 Altamente explorador. Planeja movimentos com antecedência. Friamente calculista.'}
                {(data.framework.darkMachiavellianism || 1) === 9 && '💡 Manipulador patológico. Vê todos como peões. Completamente amoral.'}
              </p>
            </div>
            {/* Machiavellianism Subtype */}
            {(data.framework.darkMachiavellianism || 1) >= 4 && (
              <div className="mt-3 pt-3 border-t border-purple-200">
                <label className="font-mono text-[9px] text-purple-600 uppercase tracking-wider mb-2 block">Estilo Maquiavélico</label>
                <select
                  value={data.framework.machiavellianismSubtype || ''}
                  onChange={(e) => update('framework', 'machiavellianismSubtype', e.target.value)}
                  className="w-full bg-white border border-purple-200 rounded-sm py-2 px-2 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="tactician">Tático — Planeja cuidadosamente, jogadas de longo prazo</option>
                  <option value="opportunist">Oportunista — Age no momento, aproveita situações</option>
                  <option value="charmer">Encantador — Usa carisma e sedução para manipular</option>
                  <option value="bureaucrat">Burocrata — Manipula através de sistemas e regras</option>
                </select>
              </div>
            )}
          </div>

          {/* Psychopathy */}
          <div className="border-2 border-slate-400 bg-slate-100/50 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-slate-800">🖤 Psicopatia</h4>
              <span className="font-mono text-xs text-slate-600">Frieza • Impulsividade • Falta de Remorso</span>
            </div>
            <p className="font-mono text-[10px] text-slate-700 mb-3">
              Déficit de empatia e remorso, comportamento antissocial, impulsividade, charme superficial e frieza emocional.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-slate-600">
                <span>Empático</span>
                <span>Frio</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.darkPsychopathy || 1}
                onChange={(e) => update('framework', 'darkPsychopathy', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.darkPsychopathy || 1) <= 2 ? 'bg-slate-100 text-slate-600' :
                  (data.framework.darkPsychopathy || 1) <= 4 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.darkPsychopathy || 1) <= 6 ? 'bg-slate-300 text-slate-800' :
                  'bg-slate-400 text-slate-900'
                }`}>
                  {(data.framework.darkPsychopathy || 1) === 1 && 'Ausente'}
                  {(data.framework.darkPsychopathy || 1) === 2 && 'Mínimo'}
                  {(data.framework.darkPsychopathy || 1) === 3 && 'Baixo'}
                  {(data.framework.darkPsychopathy || 1) === 4 && 'Moderado-Baixo'}
                  {(data.framework.darkPsychopathy || 1) === 5 && 'Moderado'}
                  {(data.framework.darkPsychopathy || 1) === 6 && 'Moderado-Alto'}
                  {(data.framework.darkPsychopathy || 1) === 7 && 'Alto'}
                  {(data.framework.darkPsychopathy || 1) === 8 && 'Muito Alto'}
                  {(data.framework.darkPsychopathy || 1) === 9 && 'Extremo'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-700 text-center italic">
                {(data.framework.darkPsychopathy || 1) <= 2 && '💡 Empático e consciencioso. Sente culpa e remorso. Conexões emocionais profundas.'}
                {(data.framework.darkPsychopathy || 1) === 3 && '💡 Emocionalmente saudável. Pode ser assertivo mas respeita limites.'}
                {(data.framework.darkPsychopathy || 1) === 4 && '💡 Ligeiramente desapegado emocionalmente. Pode parecer frio sob pressão.'}
                {(data.framework.darkPsychopathy || 1) === 5 && '💡 Empatia reduzida. Busca emoções fortes. Tolerância baixa ao tédio.'}
                {(data.framework.darkPsychopathy || 1) === 6 && '💡 Charme superficial. Manipulador. Pouco remorso por ações prejudiciais.'}
                {(data.framework.darkPsychopathy || 1) === 7 && '💡 Frieza emocional marcante. Impulsivo. Desrespeita normas sociais.'}
                {(data.framework.darkPsychopathy || 1) === 8 && '💡 Ausência quase total de empatia. Predatório. Comportamento antissocial.'}
                {(data.framework.darkPsychopathy || 1) === 9 && '💡 Psicopatia clínica. Sem remorso, sem medo, sem conexão emocional genuína.'}
              </p>
            </div>
            {/* Psychopathy Subtype */}
            {(data.framework.darkPsychopathy || 1) >= 4 && (
              <div className="mt-3 pt-3 border-t border-slate-300">
                <label className="font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-2 block">Subtipo Psicopático</label>
                <select
                  value={data.framework.psychopathySubtype || ''}
                  onChange={(e) => update('framework', 'psychopathySubtype', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-sm py-2 px-2 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="primary">Primário — Frio, calculado, controlado, "bem-sucedido"</option>
                  <option value="secondary">Secundário — Impulsivo, reativo, emocional instável</option>
                  <option value="corporate">Corporativo — Funciona em ambientes de poder, "psicopata de terno"</option>
                  <option value="antisocial">Antissocial — Criminoso, violento, desrespeita leis</option>
                </select>
              </div>
            )}
          </div>

          {/* Dark Triad Summary */}
          <div className="bg-slate-800 border border-slate-600 rounded-sm p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-3">🔺 Perfil Dark Triad</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded ${
                (data.framework.darkNarcissism || 1) <= 3 ? 'bg-slate-700' :
                (data.framework.darkNarcissism || 1) <= 6 ? 'bg-red-900/50' :
                'bg-red-800'
              }`}>
                <div className="font-mono text-lg font-bold text-red-400">🪞</div>
                <div className="font-mono text-[10px] text-slate-300">Narcisismo</div>
                <div className="font-mono text-xs text-red-400 font-bold">
                  {(data.framework.darkNarcissism || 1) <= 3 ? 'Baixo' : (data.framework.darkNarcissism || 1) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.darkMachiavellianism || 1) <= 3 ? 'bg-slate-700' :
                (data.framework.darkMachiavellianism || 1) <= 6 ? 'bg-purple-900/50' :
                'bg-purple-800'
              }`}>
                <div className="font-mono text-lg font-bold text-purple-400">🎭</div>
                <div className="font-mono text-[10px] text-slate-300">Maquiavelismo</div>
                <div className="font-mono text-xs text-purple-400 font-bold">
                  {(data.framework.darkMachiavellianism || 1) <= 3 ? 'Baixo' : (data.framework.darkMachiavellianism || 1) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.darkPsychopathy || 1) <= 3 ? 'bg-slate-700' :
                (data.framework.darkPsychopathy || 1) <= 6 ? 'bg-slate-600' :
                'bg-slate-500'
              }`}>
                <div className="font-mono text-lg font-bold text-slate-300">🖤</div>
                <div className="font-mono text-[10px] text-slate-300">Psicopatia</div>
                <div className="font-mono text-xs text-slate-300 font-bold">
                  {(data.framework.darkPsychopathy || 1) <= 3 ? 'Baixo' : (data.framework.darkPsychopathy || 1) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIGHT TRIAD Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-amber-50 to-sky-50 border border-amber-200 rounded-sm p-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-amber-800 mb-2">🔆 LIGHT TRIAD</h3>
            <p className="font-mono text-xs text-amber-900 leading-relaxed">
              O contraponto positivo ao Dark Triad. Mede três traços pró-sociais: <strong className="text-amber-700">Fé na Humanidade</strong>, <strong className="text-sky-700">Humanismo</strong> e <strong className="text-emerald-700">Kantianismo</strong>. 
              Pessoas com alta Light Triad tendem a ver o melhor nos outros, valorizar a dignidade humana e tratar pessoas como fins, não meios.
            </p>
          </div>

          {/* Faith in Humanity */}
          <div className="border-2 border-amber-200 bg-amber-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-amber-800">🌟 Fé na Humanidade</h4>
              <span className="font-mono text-xs text-amber-600">Confiança • Otimismo • Bondade Presumida</span>
            </div>
            <p className="font-mono text-[10px] text-amber-700 mb-3">
              Crença de que as pessoas são fundamentalmente boas. Tendência a confiar nos outros e ver o melhor nas intenções alheias.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-amber-600">
                <span>Cínico</span>
                <span>Confiante</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.lightFaith || 5}
                onChange={(e) => update('framework', 'lightFaith', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-300 via-amber-200 to-amber-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.lightFaith || 5) <= 2 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.lightFaith || 5) <= 4 ? 'bg-amber-100 text-amber-700' :
                  (data.framework.lightFaith || 5) <= 6 ? 'bg-amber-200 text-amber-800' :
                  'bg-amber-300 text-amber-900'
                }`}>
                  {(data.framework.lightFaith || 5) === 1 && 'Muito Cínico'}
                  {(data.framework.lightFaith || 5) === 2 && 'Cínico'}
                  {(data.framework.lightFaith || 5) === 3 && 'Moderadamente Cínico'}
                  {(data.framework.lightFaith || 5) === 4 && 'Levemente Cínico'}
                  {(data.framework.lightFaith || 5) === 5 && 'Balanceado'}
                  {(data.framework.lightFaith || 5) === 6 && 'Levemente Confiante'}
                  {(data.framework.lightFaith || 5) === 7 && 'Moderadamente Confiante'}
                  {(data.framework.lightFaith || 5) === 8 && 'Confiante'}
                  {(data.framework.lightFaith || 5) === 9 && 'Muito Confiante'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-amber-700 text-center italic">
                {(data.framework.lightFaith || 5) <= 2 && '💡 Profundamente desconfiado. Assume más intenções. Difícil confiar em qualquer um.'}
                {(data.framework.lightFaith || 5) === 3 && '💡 Cético sobre motivações alheias. Confiança deve ser conquistada lentamente.'}
                {(data.framework.lightFaith || 5) === 4 && '💡 Cauteloso com novos relacionamentos. Prefere verificar antes de confiar.'}
                {(data.framework.lightFaith || 5) === 5 && '💡 Equilibra confiança com prudência. Nem ingênuo nem paranoico.'}
                {(data.framework.lightFaith || 5) === 6 && '💡 Geralmente assume boas intenções. Dá o benefício da dúvida.'}
                {(data.framework.lightFaith || 5) === 7 && '💡 Acredita no melhor das pessoas. Otimista sobre natureza humana.'}
                {(data.framework.lightFaith || 5) === 8 && '💡 Alta confiança nos outros. Vê bondade mesmo onde outros não veem.'}
                {(data.framework.lightFaith || 5) === 9 && '💡 Fé inabalável na humanidade. Pode ser visto como ingênuo. Perdoa facilmente.'}
              </p>
            </div>
          </div>

          {/* Humanism */}
          <div className="border-2 border-sky-200 bg-sky-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-sky-800">💙 Humanismo</h4>
              <span className="font-mono text-xs text-sky-600">Dignidade • Valor Inerente • Respeito</span>
            </div>
            <p className="font-mono text-[10px] text-sky-700 mb-3">
              Crença no valor e dignidade inerente de cada ser humano. Respeito universal independente de status, utilidade ou relação pessoal.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-sky-600">
                <span>Utilitário</span>
                <span>Humanista</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.lightHumanism || 5}
                onChange={(e) => update('framework', 'lightHumanism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-300 via-sky-200 to-sky-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.lightHumanism || 5) <= 2 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.lightHumanism || 5) <= 4 ? 'bg-sky-100 text-sky-700' :
                  (data.framework.lightHumanism || 5) <= 6 ? 'bg-sky-200 text-sky-800' :
                  'bg-sky-300 text-sky-900'
                }`}>
                  {(data.framework.lightHumanism || 5) === 1 && 'Muito Utilitário'}
                  {(data.framework.lightHumanism || 5) === 2 && 'Utilitário'}
                  {(data.framework.lightHumanism || 5) === 3 && 'Moderadamente Utilitário'}
                  {(data.framework.lightHumanism || 5) === 4 && 'Levemente Utilitário'}
                  {(data.framework.lightHumanism || 5) === 5 && 'Balanceado'}
                  {(data.framework.lightHumanism || 5) === 6 && 'Levemente Humanista'}
                  {(data.framework.lightHumanism || 5) === 7 && 'Moderadamente Humanista'}
                  {(data.framework.lightHumanism || 5) === 8 && 'Humanista'}
                  {(data.framework.lightHumanism || 5) === 9 && 'Muito Humanista'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-sky-700 text-center italic">
                {(data.framework.lightHumanism || 5) <= 2 && '💡 Vê pessoas pelo que podem oferecer. Valor baseado em utilidade. Hierárquico.'}
                {(data.framework.lightHumanism || 5) === 3 && '💡 Pragmático sobre relações. Respeito proporcional ao status ou utilidade.'}
                {(data.framework.lightHumanism || 5) === 4 && '💡 Reconhece valor humano mas prioriza relações úteis ou próximas.'}
                {(data.framework.lightHumanism || 5) === 5 && '💡 Respeita a maioria mas faz distinções. Equilibra princípios com pragmatismo.'}
                {(data.framework.lightHumanism || 5) === 6 && '💡 Valoriza pessoas como indivíduos. Respeito básico independente de status.'}
                {(data.framework.lightHumanism || 5) === 7 && '💡 Forte crença na dignidade humana. Defende os vulneráveis e marginalizados.'}
                {(data.framework.lightHumanism || 5) === 8 && '💡 Profundo respeito por toda vida humana. Igualitário. Empático universalmente.'}
                {(data.framework.lightHumanism || 5) === 9 && '💡 Humanismo radical. Cada pessoa é sagrada. Incapaz de desumanizar qualquer um.'}
              </p>
            </div>
          </div>

          {/* Kantianism */}
          <div className="border-2 border-emerald-200 bg-emerald-50/30 rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-bold text-emerald-800">⚖️ Kantianismo</h4>
              <span className="font-mono text-xs text-emerald-600">Ética • Não-Exploração • Fins não Meios</span>
            </div>
            <p className="font-mono text-[10px] text-emerald-700 mb-3">
              Baseado na ética de Kant: tratar pessoas sempre como fins em si mesmas, nunca apenas como meios. Recusa a usar ou manipular outros.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-emerald-600">
                <span>Instrumental</span>
                <span>Kantiano</span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                value={data.framework.lightKantianism || 5}
                onChange={(e) => update('framework', 'lightKantianism', parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-slate-300 via-emerald-200 to-emerald-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                  (data.framework.lightKantianism || 5) <= 2 ? 'bg-slate-200 text-slate-700' :
                  (data.framework.lightKantianism || 5) <= 4 ? 'bg-emerald-100 text-emerald-700' :
                  (data.framework.lightKantianism || 5) <= 6 ? 'bg-emerald-200 text-emerald-800' :
                  'bg-emerald-300 text-emerald-900'
                }`}>
                  {(data.framework.lightKantianism || 5) === 1 && 'Muito Instrumental'}
                  {(data.framework.lightKantianism || 5) === 2 && 'Instrumental'}
                  {(data.framework.lightKantianism || 5) === 3 && 'Moderadamente Instrumental'}
                  {(data.framework.lightKantianism || 5) === 4 && 'Levemente Instrumental'}
                  {(data.framework.lightKantianism || 5) === 5 && 'Balanceado'}
                  {(data.framework.lightKantianism || 5) === 6 && 'Levemente Kantiano'}
                  {(data.framework.lightKantianism || 5) === 7 && 'Moderadamente Kantiano'}
                  {(data.framework.lightKantianism || 5) === 8 && 'Kantiano'}
                  {(data.framework.lightKantianism || 5) === 9 && 'Muito Kantiano'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-emerald-700 text-center italic">
                {(data.framework.lightKantianism || 5) <= 2 && '💡 Vê pessoas como recursos. Usa outros sem hesitação. Os fins justificam os meios.'}
                {(data.framework.lightKantianism || 5) === 3 && '💡 Pragmático sobre usar outros. Não perde sono por pequenas manipulações.'}
                {(data.framework.lightKantianism || 5) === 4 && '💡 Prefere não manipular mas fará se necessário. Justifica quando conveniente.'}
                {(data.framework.lightKantianism || 5) === 5 && '💡 Evita usar pessoas mas não é absolutista. Contexto importa.'}
                {(data.framework.lightKantianism || 5) === 6 && '💡 Desconforto em usar outros. Busca relações genuínas e mutuamente benéficas.'}
                {(data.framework.lightKantianism || 5) === 7 && '💡 Forte aversão à manipulação. Trata pessoas com respeito consistente.'}
                {(data.framework.lightKantianism || 5) === 8 && '💡 Recusa usar pessoas como meios. Honestidade radical. Ética de princípios.'}
                {(data.framework.lightKantianism || 5) === 9 && '💡 Kantiano puro. Nunca manipula ou explora. Pode sacrificar ganhos por princípios.'}
              </p>
            </div>
          </div>

          {/* Light Triad Summary */}
          <div className="bg-gradient-to-r from-amber-100 via-sky-100 to-emerald-100 border border-amber-200 rounded-sm p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-amber-700 mb-3">🔆 Perfil Light Triad</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded ${
                (data.framework.lightFaith || 5) <= 3 ? 'bg-white/50' :
                (data.framework.lightFaith || 5) <= 6 ? 'bg-amber-200/50' :
                'bg-amber-300/50'
              }`}>
                <div className="font-mono text-lg font-bold text-amber-600">🌟</div>
                <div className="font-mono text-[10px] text-amber-800">Fé na Humanidade</div>
                <div className="font-mono text-xs text-amber-700 font-bold">
                  {(data.framework.lightFaith || 5) <= 3 ? 'Baixo' : (data.framework.lightFaith || 5) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.lightHumanism || 5) <= 3 ? 'bg-white/50' :
                (data.framework.lightHumanism || 5) <= 6 ? 'bg-sky-200/50' :
                'bg-sky-300/50'
              }`}>
                <div className="font-mono text-lg font-bold text-sky-600">💙</div>
                <div className="font-mono text-[10px] text-sky-800">Humanismo</div>
                <div className="font-mono text-xs text-sky-700 font-bold">
                  {(data.framework.lightHumanism || 5) <= 3 ? 'Baixo' : (data.framework.lightHumanism || 5) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
              <div className={`p-3 rounded ${
                (data.framework.lightKantianism || 5) <= 3 ? 'bg-white/50' :
                (data.framework.lightKantianism || 5) <= 6 ? 'bg-emerald-200/50' :
                'bg-emerald-300/50'
              }`}>
                <div className="font-mono text-lg font-bold text-emerald-600">⚖️</div>
                <div className="font-mono text-[10px] text-emerald-800">Kantianismo</div>
                <div className="font-mono text-xs text-emerald-700 font-bold">
                  {(data.framework.lightKantianism || 5) <= 3 ? 'Baixo' : (data.framework.lightKantianism || 5) <= 6 ? 'Médio' : 'Alto'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    1: ( // Core Traits
      <div className="space-y-6">
        {/* Explanation Header */}
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-violet-900 mb-2">✦ SISTEMA DE TRAITS (3-3-3)</h3>
          <p className="font-mono text-xs text-violet-800 leading-relaxed">
            Selecione traits que definem seu personagem. O sistema requer <strong>equilíbrio</strong>: 
            mínimo <strong>2 de cada tipo</strong> (positivo, neutro, negativo), máximo <strong>4 de cada</strong>. 
            Total: <strong>6-12 traits</strong>. Isso garante personagens complexos e realistas, não heróis perfeitos ou vilões caricatos.
          </p>
        </div>

        {(() => {
          // Massive Traits Database
// EXPANDED TRAITS DATABASE - ~400+ traits
const traitsDatabase = {
  positive: [
    // Caring (12)
    { id: 'compassionate', label: 'Compassionate', cat: 'Caring', desc: 'Deeply cares about others\' suffering' },
    { id: 'empathetic', label: 'Empathetic', cat: 'Caring', desc: 'Feels and understands others\' emotions' },
    { id: 'sympathetic', label: 'Sympathetic', cat: 'Caring', desc: 'Shows concern for others\' hardships' },
    { id: 'nurturing', label: 'Nurturing', cat: 'Caring', desc: 'Cares for and encourages growth' },
    { id: 'gentle', label: 'Gentle', cat: 'Caring', desc: 'Kind and soft in manner' },
    { id: 'tender', label: 'Tender', cat: 'Caring', desc: 'Shows gentleness and affection' },
    { id: 'caring', label: 'Caring', cat: 'Caring', desc: 'Shows kindness and concern' },
    { id: 'attentive', label: 'Attentive', cat: 'Caring', desc: 'Pays close attention to others\' needs' },
    { id: 'considerate', label: 'Considerate', cat: 'Caring', desc: 'Thoughtful of others\' feelings' },
    { id: 'thoughtful', label: 'Thoughtful', cat: 'Caring', desc: 'Shows consideration for others' },
    { id: 'understanding', label: 'Understanding', cat: 'Caring', desc: 'Shows comprehension and tolerance' },
    { id: 'comforting', label: 'Comforting', cat: 'Caring', desc: 'Provides solace and reassurance' },
    
    // Giving (10)
    { id: 'generous', label: 'Generous', cat: 'Giving', desc: 'Freely gives time, resources, attention' },
    { id: 'altruistic', label: 'Altruistic', cat: 'Giving', desc: 'Selflessly concerned for others' },
    { id: 'charitable', label: 'Charitable', cat: 'Giving', desc: 'Generous to those in need' },
    { id: 'selfless', label: 'Selfless', cat: 'Giving', desc: 'Puts others before self' },
    { id: 'helpful', label: 'Helpful', cat: 'Giving', desc: 'Willing to assist others' },
    { id: 'supportive', label: 'Supportive', cat: 'Giving', desc: 'Provides encouragement and help' },
    { id: 'accommodating', label: 'Accommodating', cat: 'Giving', desc: 'Willing to adjust for others' },
    { id: 'hospitable', label: 'Hospitable', cat: 'Giving', desc: 'Welcomes guests warmly' },
    { id: 'magnanimous', label: 'Magnanimous', cat: 'Giving', desc: 'Generous in forgiving' },
    { id: 'benevolent', label: 'Benevolent', cat: 'Giving', desc: 'Well-meaning and kindly' },
    
    // Loyalty (10)
    { id: 'loyal', label: 'Loyal', cat: 'Loyalty', desc: 'Steadfast in allegiance' },
    { id: 'faithful', label: 'Faithful', cat: 'Loyalty', desc: 'True to commitments' },
    { id: 'devoted', label: 'Devoted', cat: 'Loyalty', desc: 'Deeply dedicated to others' },
    { id: 'dependable', label: 'Dependable', cat: 'Loyalty', desc: 'Can be relied upon' },
    { id: 'trustworthy', label: 'Trustworthy', cat: 'Loyalty', desc: 'Worthy of confidence' },
    { id: 'reliable', label: 'Reliable', cat: 'Loyalty', desc: 'Consistently good in quality' },
    { id: 'committed', label: 'Committed', cat: 'Loyalty', desc: 'Dedicated to a cause or person' },
    { id: 'steadfast', label: 'Steadfast', cat: 'Loyalty', desc: 'Firmly loyal and constant' },
    { id: 'true', label: 'True', cat: 'Loyalty', desc: 'Genuine and loyal' },
    { id: 'dedicated', label: 'Dedicated', cat: 'Loyalty', desc: 'Devoted to a task or purpose' },
    
    // Harmony (10)
    { id: 'forgiving', label: 'Forgiving', cat: 'Harmony', desc: 'Lets go of grudges' },
    { id: 'diplomatic', label: 'Diplomatic', cat: 'Harmony', desc: 'Tactful in difficult situations' },
    { id: 'peacemaking', label: 'Peacemaking', cat: 'Harmony', desc: 'Works to resolve conflicts' },
    { id: 'tolerant', label: 'Tolerant', cat: 'Harmony', desc: 'Accepts differences in others' },
    { id: 'accepting', label: 'Accepting', cat: 'Harmony', desc: 'Receives others without judgment' },
    { id: 'patient', label: 'Patient', cat: 'Harmony', desc: 'Tolerates delays calmly' },
    { id: 'cooperative', label: 'Cooperative', cat: 'Harmony', desc: 'Works well with others' },
    { id: 'agreeable', label: 'Agreeable', cat: 'Harmony', desc: 'Pleasant and easy to work with' },
    { id: 'easygoing', label: 'Easygoing', cat: 'Harmony', desc: 'Relaxed and tolerant' },
    { id: 'flexible', label: 'Flexible', cat: 'Harmony', desc: 'Willing to compromise' },
    
    // Integrity (15)
    { id: 'honest', label: 'Honest', cat: 'Integrity', desc: 'Truthful and sincere' },
    { id: 'sincere', label: 'Sincere', cat: 'Integrity', desc: 'Free from pretense' },
    { id: 'truthful', label: 'Truthful', cat: 'Integrity', desc: 'Speaks only truth' },
    { id: 'genuine', label: 'Genuine', cat: 'Integrity', desc: 'Authentic and real' },
    { id: 'authentic', label: 'Authentic', cat: 'Integrity', desc: 'True to oneself' },
    { id: 'transparent', label: 'Transparent', cat: 'Integrity', desc: 'Open and honest' },
    { id: 'forthright', label: 'Forthright', cat: 'Integrity', desc: 'Direct and outspoken honestly' },
    { id: 'candid', label: 'Candid', cat: 'Integrity', desc: 'Frank and unreserved' },
    { id: 'principled', label: 'Principled', cat: 'Integrity', desc: 'Acts on moral code' },
    { id: 'ethical', label: 'Ethical', cat: 'Integrity', desc: 'Morally correct' },
    { id: 'moral', label: 'Moral', cat: 'Integrity', desc: 'Concerned with right and wrong' },
    { id: 'virtuous', label: 'Virtuous', cat: 'Integrity', desc: 'Having high moral standards' },
    { id: 'honorable', label: 'Honorable', cat: 'Integrity', desc: 'Worthy of respect' },
    { id: 'noble', label: 'Noble', cat: 'Integrity', desc: 'Having high moral qualities' },
    { id: 'righteous', label: 'Righteous', cat: 'Integrity', desc: 'Morally right and just' },
    
    // Courage (10)
    { id: 'courageous', label: 'Courageous', cat: 'Courage', desc: 'Faces fear bravely' },
    { id: 'brave', label: 'Brave', cat: 'Courage', desc: 'Ready to face danger' },
    { id: 'bold', label: 'Bold', cat: 'Courage', desc: 'Willing to take risks' },
    { id: 'fearless', label: 'Fearless', cat: 'Courage', desc: 'Lacking fear' },
    { id: 'daring', label: 'Daring', cat: 'Courage', desc: 'Adventurous and bold' },
    { id: 'valiant', label: 'Valiant', cat: 'Courage', desc: 'Brave and determined' },
    { id: 'heroic', label: 'Heroic', cat: 'Courage', desc: 'Extremely brave' },
    { id: 'gallant', label: 'Gallant', cat: 'Courage', desc: 'Brave and noble' },
    { id: 'audacious', label: 'Audacious', cat: 'Courage', desc: 'Willingness to take bold risks' },
    { id: 'intrepid', label: 'Intrepid', cat: 'Courage', desc: 'Fearless and adventurous' },
    
    // Humility (8)
    { id: 'humble', label: 'Humble', cat: 'Humility', desc: 'Modest about achievements' },
    { id: 'modest', label: 'Modest', cat: 'Humility', desc: 'Unassuming about abilities' },
    { id: 'unassuming', label: 'Unassuming', cat: 'Humility', desc: 'Not pretentious' },
    { id: 'unpretentious', label: 'Unpretentious', cat: 'Humility', desc: 'Not trying to impress' },
    { id: 'down-to-earth', label: 'Down-to-earth', cat: 'Humility', desc: 'Practical and realistic' },
    { id: 'grounded', label: 'Grounded', cat: 'Humility', desc: 'Well-balanced and sensible' },
    { id: 'self-effacing', label: 'Self-effacing', cat: 'Humility', desc: 'Not claiming attention' },
    { id: 'gracious', label: 'Gracious', cat: 'Humility', desc: 'Courteous, kind, and pleasant' },
    
    // Resilience (10)
    { id: 'resilient', label: 'Resilient', cat: 'Resilience', desc: 'Recovers quickly from setbacks' },
    { id: 'strong', label: 'Strong', cat: 'Resilience', desc: 'Able to withstand hardship' },
    { id: 'tough', label: 'Tough', cat: 'Resilience', desc: 'Able to endure difficulty' },
    { id: 'tenacious', label: 'Tenacious', cat: 'Resilience', desc: 'Persistent and determined' },
    { id: 'persevering', label: 'Persevering', cat: 'Resilience', desc: 'Continues despite difficulty' },
    { id: 'persistent', label: 'Persistent', cat: 'Resilience', desc: 'Refuses to give up' },
    { id: 'enduring', label: 'Enduring', cat: 'Resilience', desc: 'Lasting through hardship' },
    { id: 'indomitable', label: 'Indomitable', cat: 'Resilience', desc: 'Impossible to defeat' },
    { id: 'unbreakable', label: 'Unbreakable', cat: 'Resilience', desc: 'Cannot be broken' },
    { id: 'adaptable', label: 'Adaptable', cat: 'Resilience', desc: 'Adjusts to new conditions' },
    
    // Intelligence (12)
    { id: 'intelligent', label: 'Intelligent', cat: 'Intelligence', desc: 'Quick to learn and understand' },
    { id: 'smart', label: 'Smart', cat: 'Intelligence', desc: 'Having sharp mental ability' },
    { id: 'clever', label: 'Clever', cat: 'Intelligence', desc: 'Quick-witted and resourceful' },
    { id: 'brilliant', label: 'Brilliant', cat: 'Intelligence', desc: 'Exceptionally intelligent' },
    { id: 'sharp', label: 'Sharp', cat: 'Intelligence', desc: 'Quick and keen mentally' },
    { id: 'quick-witted', label: 'Quick-witted', cat: 'Intelligence', desc: 'Fast thinking and responses' },
    { id: 'astute', label: 'Astute', cat: 'Intelligence', desc: 'Shrewd and perceptive' },
    { id: 'wise', label: 'Wise', cat: 'Intelligence', desc: 'Having good judgment' },
    { id: 'knowledgeable', label: 'Knowledgeable', cat: 'Intelligence', desc: 'Well-informed' },
    { id: 'learned', label: 'Learned', cat: 'Intelligence', desc: 'Having much knowledge' },
    { id: 'intellectual', label: 'Intellectual', cat: 'Intelligence', desc: 'Engaged in mental activity' },
    { id: 'scholarly', label: 'Scholarly', cat: 'Intelligence', desc: 'Academic and studious' },
    
    // Creativity (10)
    { id: 'creative', label: 'Creative', cat: 'Creativity', desc: 'Original and imaginative' },
    { id: 'imaginative', label: 'Imaginative', cat: 'Creativity', desc: 'Has vivid imagination' },
    { id: 'innovative', label: 'Innovative', cat: 'Creativity', desc: 'Introduces new ideas' },
    { id: 'inventive', label: 'Inventive', cat: 'Creativity', desc: 'Creates new things' },
    { id: 'original', label: 'Original', cat: 'Creativity', desc: 'Unique and novel' },
    { id: 'artistic', label: 'Artistic', cat: 'Creativity', desc: 'Has creative skill' },
    { id: 'visionary', label: 'Visionary', cat: 'Creativity', desc: 'Thinks about the future' },
    { id: 'inspired', label: 'Inspired', cat: 'Creativity', desc: 'Filled with creative urge' },
    { id: 'ingenious', label: 'Ingenious', cat: 'Creativity', desc: 'Cleverly inventive' },
    { id: 'resourceful', label: 'Resourceful', cat: 'Creativity', desc: 'Finds clever solutions' },
    
    // Curiosity (7)
    { id: 'curious', label: 'Curious', cat: 'Curiosity', desc: 'Eager to learn' },
    { id: 'inquisitive', label: 'Inquisitive', cat: 'Curiosity', desc: 'Asks many questions' },
    { id: 'questioning', label: 'Questioning', cat: 'Curiosity', desc: 'Tends to ask questions' },
    { id: 'exploratory', label: 'Exploratory', cat: 'Curiosity', desc: 'Likes to explore' },
    { id: 'investigative', label: 'Investigative', cat: 'Curiosity', desc: 'Researches deeply' },
    { id: 'studious', label: 'Studious', cat: 'Curiosity', desc: 'Devoted to study' },
    { id: 'open-minded', label: 'Open-minded', cat: 'Curiosity', desc: 'Receptive to new ideas' },
    
    // Analysis (10)
    { id: 'analytical', label: 'Analytical', cat: 'Analysis', desc: 'Examines methodically' },
    { id: 'logical', label: 'Logical', cat: 'Analysis', desc: 'Uses clear reasoning' },
    { id: 'rational', label: 'Rational', cat: 'Analysis', desc: 'Based on reason' },
    { id: 'systematic', label: 'Systematic', cat: 'Analysis', desc: 'Methodical and organized' },
    { id: 'methodical', label: 'Methodical', cat: 'Analysis', desc: 'Done in ordered way' },
    { id: 'critical-thinker', label: 'Critical Thinker', cat: 'Analysis', desc: 'Analyzes objectively' },
    { id: 'objective', label: 'Objective', cat: 'Analysis', desc: 'Not influenced by emotions' },
    { id: 'discerning', label: 'Discerning', cat: 'Analysis', desc: 'Shows good judgment' },
    { id: 'perceptive', label: 'Perceptive', cat: 'Analysis', desc: 'Quick to notice things' },
    { id: 'insightful', label: 'Insightful', cat: 'Analysis', desc: 'Shows deep understanding' },
    
    // Ambition (9)
    { id: 'ambitious', label: 'Ambitious', cat: 'Ambition', desc: 'Strong desire to succeed' },
    { id: 'driven', label: 'Driven', cat: 'Ambition', desc: 'Compelled to achieve' },
    { id: 'motivated', label: 'Motivated', cat: 'Ambition', desc: 'Has drive to act' },
    { id: 'aspiring', label: 'Aspiring', cat: 'Ambition', desc: 'Seeking to achieve' },
    { id: 'goal-oriented', label: 'Goal-oriented', cat: 'Ambition', desc: 'Focused on objectives' },
    { id: 'determined', label: 'Determined', cat: 'Ambition', desc: 'Firm in purpose' },
    { id: 'resolute', label: 'Resolute', cat: 'Ambition', desc: 'Admirably purposeful' },
    { id: 'focused', label: 'Focused', cat: 'Ambition', desc: 'Concentrated on goals' },
    { id: 'purposeful', label: 'Purposeful', cat: 'Ambition', desc: 'Having clear purpose' },
    
    // Work Ethic (10)
    { id: 'hardworking', label: 'Hardworking', cat: 'Work Ethic', desc: 'Puts in consistent effort' },
    { id: 'diligent', label: 'Diligent', cat: 'Work Ethic', desc: 'Careful and persistent' },
    { id: 'industrious', label: 'Industrious', cat: 'Work Ethic', desc: 'Hard-working' },
    { id: 'conscientious', label: 'Conscientious', cat: 'Work Ethic', desc: 'Wishes to do right' },
    { id: 'thorough', label: 'Thorough', cat: 'Work Ethic', desc: 'Complete and careful' },
    { id: 'meticulous', label: 'Meticulous', cat: 'Work Ethic', desc: 'Very careful and precise' },
    { id: 'disciplined', label: 'Disciplined', cat: 'Work Ethic', desc: 'Controlled and orderly' },
    { id: 'organized', label: 'Organized', cat: 'Work Ethic', desc: 'Arranged systematically' },
    { id: 'efficient', label: 'Efficient', cat: 'Work Ethic', desc: 'Achieves maximum productivity' },
    { id: 'proactive', label: 'Proactive', cat: 'Work Ethic', desc: 'Takes initiative' },
    
    // Warmth (10)
    { id: 'warm', label: 'Warm', cat: 'Warmth', desc: 'Friendly and affectionate' },
    { id: 'friendly', label: 'Friendly', cat: 'Warmth', desc: 'Kind and pleasant' },
    { id: 'affectionate', label: 'Affectionate', cat: 'Warmth', desc: 'Shows fondness' },
    { id: 'loving', label: 'Loving', cat: 'Warmth', desc: 'Full of love' },
    { id: 'kind', label: 'Kind', cat: 'Warmth', desc: 'Considerate and helpful' },
    { id: 'sweet', label: 'Sweet', cat: 'Warmth', desc: 'Pleasant and kind' },
    { id: 'good-natured', label: 'Good-natured', cat: 'Warmth', desc: 'Kind and cheerful' },
    { id: 'amiable', label: 'Amiable', cat: 'Warmth', desc: 'Friendly and pleasant' },
    { id: 'approachable', label: 'Approachable', cat: 'Warmth', desc: 'Easy to talk to' },
    { id: 'welcoming', label: 'Welcoming', cat: 'Warmth', desc: 'Receives warmly' },
    
    // Charisma (10)
    { id: 'charismatic', label: 'Charismatic', cat: 'Charisma', desc: 'Naturally attracts others' },
    { id: 'charming', label: 'Charming', cat: 'Charisma', desc: 'Delightful and attractive' },
    { id: 'magnetic', label: 'Magnetic', cat: 'Charisma', desc: 'Very attractive personality' },
    { id: 'captivating', label: 'Captivating', cat: 'Charisma', desc: 'Attracts and holds attention' },
    { id: 'engaging', label: 'Engaging', cat: 'Charisma', desc: 'Charming and attractive' },
    { id: 'likeable', label: 'Likeable', cat: 'Charisma', desc: 'Easy to like' },
    { id: 'personable', label: 'Personable', cat: 'Charisma', desc: 'Pleasant appearance and manner' },
    { id: 'sociable', label: 'Sociable', cat: 'Charisma', desc: 'Enjoys company of others' },
    { id: 'outgoing', label: 'Outgoing', cat: 'Charisma', desc: 'Friendly and socially confident' },
    { id: 'gregarious', label: 'Gregarious', cat: 'Charisma', desc: 'Fond of company' },
    
    // Communication (8)
    { id: 'articulate', label: 'Articulate', cat: 'Communication', desc: 'Expresses clearly' },
    { id: 'eloquent', label: 'Eloquent', cat: 'Communication', desc: 'Fluent and persuasive' },
    { id: 'expressive', label: 'Expressive', cat: 'Communication', desc: 'Conveys thoughts well' },
    { id: 'persuasive', label: 'Persuasive', cat: 'Communication', desc: 'Good at convincing' },
    { id: 'witty', label: 'Witty', cat: 'Communication', desc: 'Clever and amusing' },
    { id: 'humorous', label: 'Humorous', cat: 'Communication', desc: 'Has sense of humor' },
    { id: 'funny', label: 'Funny', cat: 'Communication', desc: 'Causes laughter' },
    { id: 'entertaining', label: 'Entertaining', cat: 'Communication', desc: 'Provides amusement' },
    
    // Positivity (10)
    { id: 'optimistic', label: 'Optimistic', cat: 'Positivity', desc: 'Hopeful and positive' },
    { id: 'hopeful', label: 'Hopeful', cat: 'Positivity', desc: 'Full of hope' },
    { id: 'positive', label: 'Positive', cat: 'Positivity', desc: 'Constructive and optimistic' },
    { id: 'cheerful', label: 'Cheerful', cat: 'Positivity', desc: 'Happy and positive' },
    { id: 'joyful', label: 'Joyful', cat: 'Positivity', desc: 'Full of joy' },
    { id: 'happy', label: 'Happy', cat: 'Positivity', desc: 'Feeling pleasure' },
    { id: 'upbeat', label: 'Upbeat', cat: 'Positivity', desc: 'Cheerful and positive' },
    { id: 'buoyant', label: 'Buoyant', cat: 'Positivity', desc: 'Cheerful and optimistic' },
    { id: 'lighthearted', label: 'Lighthearted', cat: 'Positivity', desc: 'Carefree and cheerful' },
    { id: 'playful', label: 'Playful', cat: 'Positivity', desc: 'Fun-loving and light' },
    
    // Calm (10)
    { id: 'calm', label: 'Calm', cat: 'Calm', desc: 'Peaceful and untroubled' },
    { id: 'serene', label: 'Serene', cat: 'Calm', desc: 'Calm and peaceful' },
    { id: 'tranquil', label: 'Tranquil', cat: 'Calm', desc: 'Free from disturbance' },
    { id: 'peaceful', label: 'Peaceful', cat: 'Calm', desc: 'Free from conflict' },
    { id: 'composed', label: 'Composed', cat: 'Calm', desc: 'Calm and in control' },
    { id: 'collected', label: 'Collected', cat: 'Calm', desc: 'Calm and controlled' },
    { id: 'unflappable', label: 'Unflappable', cat: 'Calm', desc: 'Remains calm under pressure' },
    { id: 'level-headed', label: 'Level-headed', cat: 'Calm', desc: 'Calm and sensible' },
    { id: 'even-tempered', label: 'Even-tempered', cat: 'Calm', desc: 'Not easily upset' },
    { id: 'cool-headed', label: 'Cool-headed', cat: 'Calm', desc: 'Calm in difficult situations' },
    
    // Passion (10)
    { id: 'passionate', label: 'Passionate', cat: 'Passion', desc: 'Shows strong feeling' },
    { id: 'enthusiastic', label: 'Enthusiastic', cat: 'Passion', desc: 'Eager and excited' },
    { id: 'zealous', label: 'Zealous', cat: 'Passion', desc: 'Full of zeal' },
    { id: 'ardent', label: 'Ardent', cat: 'Passion', desc: 'Enthusiastic and passionate' },
    { id: 'fervent', label: 'Fervent', cat: 'Passion', desc: 'Having intense feeling' },
    { id: 'spirited', label: 'Spirited', cat: 'Passion', desc: 'Full of energy and courage' },
    { id: 'vivacious', label: 'Vivacious', cat: 'Passion', desc: 'Lively and animated' },
    { id: 'energetic', label: 'Energetic', cat: 'Passion', desc: 'Full of energy' },
    { id: 'dynamic', label: 'Dynamic', cat: 'Passion', desc: 'Full of energy and new ideas' },
    { id: 'vibrant', label: 'Vibrant', cat: 'Passion', desc: 'Full of life and energy' },
    
    // Leadership (10)
    { id: 'leader', label: 'Leader', cat: 'Leadership', desc: 'Guides and directs others' },
    { id: 'assertive', label: 'Assertive', cat: 'Leadership', desc: 'Confident and forceful' },
    { id: 'confident', label: 'Confident', cat: 'Leadership', desc: 'Self-assured' },
    { id: 'decisive', label: 'Decisive', cat: 'Leadership', desc: 'Makes decisions quickly' },
    { id: 'commanding', label: 'Commanding', cat: 'Leadership', desc: 'Projects authority' },
    { id: 'authoritative', label: 'Authoritative', cat: 'Leadership', desc: 'Commanding and self-confident' },
    { id: 'influential', label: 'Influential', cat: 'Leadership', desc: 'Has great influence' },
    { id: 'inspiring', label: 'Inspiring', cat: 'Leadership', desc: 'Motivates others' },
    { id: 'empowering', label: 'Empowering', cat: 'Leadership', desc: 'Gives power to others' },
    { id: 'mentoring', label: 'Mentoring', cat: 'Leadership', desc: 'Guides and teaches others' },
  ],
  
  neutral: [
    // Energy (8)
    { id: 'introverted', label: 'Introverted', cat: 'Energy', desc: 'Energized by solitude' },
    { id: 'extroverted', label: 'Extroverted', cat: 'Energy', desc: 'Energized by people' },
    { id: 'ambiverted', label: 'Ambiverted', cat: 'Energy', desc: 'Mix of intro/extrovert' },
    { id: 'high-energy', label: 'High-energy', cat: 'Energy', desc: 'Always active' },
    { id: 'low-energy', label: 'Low-energy', cat: 'Energy', desc: 'Calm and slow-paced' },
    { id: 'restless', label: 'Restless', cat: 'Energy', desc: 'Unable to stay still' },
    { id: 'hyperactive', label: 'Hyperactive', cat: 'Energy', desc: 'Extremely active' },
    { id: 'mellow', label: 'Mellow', cat: 'Energy', desc: 'Relaxed and unhurried' },
    
    // Expression (10)
    { id: 'reserved', label: 'Reserved', cat: 'Expression', desc: 'Restrained in expression' },
    { id: 'quiet', label: 'Quiet', cat: 'Expression', desc: 'Speaks little' },
    { id: 'soft-spoken', label: 'Soft-spoken', cat: 'Expression', desc: 'Speaks quietly' },
    { id: 'loud', label: 'Loud', cat: 'Expression', desc: 'Makes much noise' },
    { id: 'talkative', label: 'Talkative', cat: 'Expression', desc: 'Talks a lot' },
    { id: 'verbose', label: 'Verbose', cat: 'Expression', desc: 'Uses many words' },
    { id: 'laconic', label: 'Laconic', cat: 'Expression', desc: 'Uses few words' },
    { id: 'demonstrative', label: 'Demonstrative', cat: 'Expression', desc: 'Shows feelings openly' },
    { id: 'animated', label: 'Animated', cat: 'Expression', desc: 'Full of life in expression' },
    { id: 'understated', label: 'Understated', cat: 'Expression', desc: 'Deliberately restrained' },
    
    // Mood (10)
    { id: 'serious', label: 'Serious', cat: 'Mood', desc: 'Solemn, not frivolous' },
    { id: 'intense', label: 'Intense', cat: 'Mood', desc: 'Deeply focused' },
    { id: 'laid-back', label: 'Laid-back', cat: 'Mood', desc: 'Relaxed and easygoing' },
    { id: 'stoic', label: 'Stoic', cat: 'Mood', desc: 'Endures without complaint' },
    { id: 'emotional', label: 'Emotional', cat: 'Mood', desc: 'Expresses feelings openly' },
    { id: 'detached', label: 'Detached', cat: 'Mood', desc: 'Emotionally distant' },
    { id: 'brooding', label: 'Brooding', cat: 'Mood', desc: 'Thinks moodily' },
    { id: 'melancholic', label: 'Melancholic', cat: 'Mood', desc: 'Tends toward sadness' },
    { id: 'mercurial', label: 'Mercurial', cat: 'Mood', desc: 'Quick-changing moods' },
    { id: 'temperamental', label: 'Temperamental', cat: 'Mood', desc: 'Subject to mood changes' },
    
    // Decisions (10)
    { id: 'pragmatic', label: 'Pragmatic', cat: 'Decisions', desc: 'Practical over idealistic' },
    { id: 'idealistic', label: 'Idealistic', cat: 'Decisions', desc: 'Pursues high principles' },
    { id: 'realistic', label: 'Realistic', cat: 'Decisions', desc: 'Accepts things as they are' },
    { id: 'cautious', label: 'Cautious', cat: 'Decisions', desc: 'Careful to avoid risk' },
    { id: 'risk-taking', label: 'Risk-taking', cat: 'Decisions', desc: 'Willing to take chances' },
    { id: 'calculated', label: 'Calculated', cat: 'Decisions', desc: 'Carefully considered' },
    { id: 'deliberate', label: 'Deliberate', cat: 'Decisions', desc: 'Done consciously' },
    { id: 'spontaneous', label: 'Spontaneous', cat: 'Decisions', desc: 'Acts without planning' },
    { id: 'impulsive', label: 'Impulsive', cat: 'Decisions', desc: 'Acts on impulse' },
    { id: 'indecisive', label: 'Indecisive', cat: 'Decisions', desc: 'Has trouble deciding' },
    
    // Thinking (10)
    { id: 'skeptical', label: 'Skeptical', cat: 'Thinking', desc: 'Questions claims' },
    { id: 'credulous', label: 'Credulous', cat: 'Thinking', desc: 'Too ready to believe' },
    { id: 'cynical', label: 'Cynical', cat: 'Thinking', desc: 'Distrusts motives' },
    { id: 'trusting', label: 'Trusting', cat: 'Thinking', desc: 'Inclined to trust' },
    { id: 'literal', label: 'Literal', cat: 'Thinking', desc: 'Takes things at face value' },
    { id: 'abstract', label: 'Abstract', cat: 'Thinking', desc: 'Thinks in concepts' },
    { id: 'concrete', label: 'Concrete', cat: 'Thinking', desc: 'Thinks in specifics' },
    { id: 'daydreamer', label: 'Daydreamer', cat: 'Thinking', desc: 'Lost in fantasy' },
    { id: 'realist', label: 'Realist', cat: 'Thinking', desc: 'Accepts reality' },
    { id: 'philosophical', label: 'Philosophical', cat: 'Thinking', desc: 'Ponders deep questions' },
    
    // Values (12)
    { id: 'traditional', label: 'Traditional', cat: 'Values', desc: 'Values established customs' },
    { id: 'progressive', label: 'Progressive', cat: 'Values', desc: 'Favors change' },
    { id: 'conservative', label: 'Conservative', cat: 'Values', desc: 'Prefers tradition' },
    { id: 'unconventional', label: 'Unconventional', cat: 'Values', desc: 'Does things differently' },
    { id: 'nonconformist', label: 'Nonconformist', cat: 'Values', desc: 'Rejects accepted behavior' },
    { id: 'conformist', label: 'Conformist', cat: 'Values', desc: 'Follows conventions' },
    { id: 'rebellious', label: 'Rebellious', cat: 'Values', desc: 'Resists authority' },
    { id: 'spiritual', label: 'Spiritual', cat: 'Values', desc: 'Concerned with the spirit' },
    { id: 'materialistic', label: 'Materialistic', cat: 'Values', desc: 'Values possessions' },
    { id: 'minimalist', label: 'Minimalist', cat: 'Values', desc: 'Prefers simplicity' },
    { id: 'hedonistic', label: 'Hedonistic', cat: 'Values', desc: 'Pursues pleasure' },
    { id: 'ascetic', label: 'Ascetic', cat: 'Values', desc: 'Practices self-denial' },
    
    // Social Style (10)
    { id: 'formal', label: 'Formal', cat: 'Social Style', desc: 'Proper and ceremonious' },
    { id: 'informal', label: 'Informal', cat: 'Social Style', desc: 'Casual and relaxed' },
    { id: 'private', label: 'Private', cat: 'Social Style', desc: 'Keeps life hidden' },
    { id: 'open-book', label: 'Open Book', cat: 'Social Style', desc: 'Shares everything' },
    { id: 'mysterious', label: 'Mysterious', cat: 'Social Style', desc: 'Hard to understand' },
    { id: 'enigmatic', label: 'Enigmatic', cat: 'Social Style', desc: 'Puzzling and mysterious' },
    { id: 'flamboyant', label: 'Flamboyant', cat: 'Social Style', desc: 'Showy and dramatic' },
    { id: 'eccentric', label: 'Eccentric', cat: 'Social Style', desc: 'Unconventional and peculiar' },
    { id: 'bohemian', label: 'Bohemian', cat: 'Social Style', desc: 'Artistic and unconventional' },
    { id: 'mainstream', label: 'Mainstream', cat: 'Social Style', desc: 'Follows popular trends' },
    
    // Communication Style (10)
    { id: 'blunt', label: 'Blunt', cat: 'Comm Style', desc: 'Direct without softening' },
    { id: 'tactful', label: 'Tactful', cat: 'Comm Style', desc: 'Careful not to offend' },
    { id: 'sarcastic', label: 'Sarcastic', cat: 'Comm Style', desc: 'Uses ironic remarks' },
    { id: 'dry', label: 'Dry', cat: 'Comm Style', desc: 'Subtle, deadpan humor' },
    { id: 'deadpan', label: 'Deadpan', cat: 'Comm Style', desc: 'Expressionless delivery' },
    { id: 'dramatic', label: 'Dramatic', cat: 'Comm Style', desc: 'Theatrical expression' },
    { id: 'matter-of-fact', label: 'Matter-of-fact', cat: 'Comm Style', desc: 'Unemotional and practical' },
    { id: 'flowery', label: 'Flowery', cat: 'Comm Style', desc: 'Elaborate language' },
    { id: 'plain-spoken', label: 'Plain-spoken', cat: 'Comm Style', desc: 'Simple and direct' },
    { id: 'diplomatic', label: 'Diplomatic', cat: 'Comm Style', desc: 'Handles delicately' },
    
    // Focus (8)
    { id: 'detail-oriented', label: 'Detail-oriented', cat: 'Focus', desc: 'Attends to small things' },
    { id: 'big-picture', label: 'Big-picture', cat: 'Focus', desc: 'Sees overall pattern' },
    { id: 'perfectionist', label: 'Perfectionist', cat: 'Focus', desc: 'Demands perfection' },
    { id: 'present-focused', label: 'Present-focused', cat: 'Focus', desc: 'Lives in the now' },
    { id: 'future-focused', label: 'Future-focused', cat: 'Focus', desc: 'Plans ahead' },
    { id: 'past-focused', label: 'Past-focused', cat: 'Focus', desc: 'Dwells on past' },
    { id: 'nostalgic', label: 'Nostalgic', cat: 'Focus', desc: 'Attached to the past' },
    { id: 'forward-thinking', label: 'Forward-thinking', cat: 'Focus', desc: 'Plans for the future' },
    
    // Independence (8)
    { id: 'independent', label: 'Independent', cat: 'Independence', desc: 'Self-reliant' },
    { id: 'dependent', label: 'Dependent', cat: 'Independence', desc: 'Relies on others' },
    { id: 'self-sufficient', label: 'Self-sufficient', cat: 'Independence', desc: 'Needs no help' },
    { id: 'collaborative', label: 'Collaborative', cat: 'Independence', desc: 'Works with others' },
    { id: 'lone-wolf', label: 'Lone Wolf', cat: 'Independence', desc: 'Prefers working alone' },
    { id: 'team-player', label: 'Team Player', cat: 'Independence', desc: 'Works well in groups' },
    { id: 'competitive', label: 'Competitive', cat: 'Independence', desc: 'Driven to win' },
    { id: 'cooperative', label: 'Cooperative', cat: 'Independence', desc: 'Works with others' },
    
    // Quirks (15)
    { id: 'superstitious', label: 'Superstitious', cat: 'Quirks', desc: 'Believes in luck/omens' },
    { id: 'habitual', label: 'Habitual', cat: 'Quirks', desc: 'Follows routines' },
    { id: 'ritualistic', label: 'Ritualistic', cat: 'Quirks', desc: 'Performs rituals' },
    { id: 'absent-minded', label: 'Absent-minded', cat: 'Quirks', desc: 'Forgetful, distracted' },
    { id: 'scatterbrained', label: 'Scatterbrained', cat: 'Quirks', desc: 'Disorganized thinking' },
    { id: 'hyperfocused', label: 'Hyperfocused', cat: 'Quirks', desc: 'Intensely concentrated' },
    { id: 'night-owl', label: 'Night Owl', cat: 'Quirks', desc: 'Active at night' },
    { id: 'early-bird', label: 'Early Bird', cat: 'Quirks', desc: 'Active in morning' },
    { id: 'workaholic', label: 'Workaholic', cat: 'Quirks', desc: 'Obsessed with work' },
    { id: 'thrill-seeker', label: 'Thrill-seeker', cat: 'Quirks', desc: 'Seeks excitement' },
    { id: 'homebody', label: 'Homebody', cat: 'Quirks', desc: 'Prefers staying home' },
    { id: 'wanderer', label: 'Wanderer', cat: 'Quirks', desc: 'Loves to travel' },
    { id: 'collector', label: 'Collector', cat: 'Quirks', desc: 'Gathers items' },
    { id: 'neat-freak', label: 'Neat Freak', cat: 'Quirks', desc: 'Obsessed with cleanliness' },
    { id: 'messy', label: 'Messy', cat: 'Quirks', desc: 'Disorganized surroundings' },
  ],
  
  negative: [
    // Selfishness (10)
    { id: 'selfish', label: 'Selfish', cat: 'Selfishness', desc: 'Prioritizes self over others' },
    { id: 'self-centered', label: 'Self-centered', cat: 'Selfishness', desc: 'Focused on self' },
    { id: 'egotistical', label: 'Egotistical', cat: 'Selfishness', desc: 'Excessively conceited' },
    { id: 'narcissistic', label: 'Narcissistic', cat: 'Selfishness', desc: 'Excessive self-love' },
    { id: 'self-absorbed', label: 'Self-absorbed', cat: 'Selfishness', desc: 'Preoccupied with self' },
    { id: 'entitled', label: 'Entitled', cat: 'Selfishness', desc: 'Believes deserves special treatment' },
    { id: 'greedy', label: 'Greedy', cat: 'Selfishness', desc: 'Excessive desire for more' },
    { id: 'stingy', label: 'Stingy', cat: 'Selfishness', desc: 'Unwilling to give' },
    { id: 'miserly', label: 'Miserly', cat: 'Selfishness', desc: 'Hoards wealth' },
    { id: 'ungrateful', label: 'Ungrateful', cat: 'Selfishness', desc: 'Not thankful' },
    
    // Hostility (18)
    { id: 'hostile', label: 'Hostile', cat: 'Hostility', desc: 'Unfriendly and aggressive' },
    { id: 'aggressive', label: 'Aggressive', cat: 'Hostility', desc: 'Ready to attack' },
    { id: 'antagonistic', label: 'Antagonistic', cat: 'Hostility', desc: 'Actively hostile' },
    { id: 'belligerent', label: 'Belligerent', cat: 'Hostility', desc: 'Hostile and aggressive' },
    { id: 'combative', label: 'Combative', cat: 'Hostility', desc: 'Ready to fight' },
    { id: 'confrontational', label: 'Confrontational', cat: 'Hostility', desc: 'Tends to confront' },
    { id: 'quarrelsome', label: 'Quarrelsome', cat: 'Hostility', desc: 'Given to arguing' },
    { id: 'argumentative', label: 'Argumentative', cat: 'Hostility', desc: 'Loves to argue' },
    { id: 'spiteful', label: 'Spiteful', cat: 'Hostility', desc: 'Wanting to hurt' },
    { id: 'malicious', label: 'Malicious', cat: 'Hostility', desc: 'Intending harm' },
    { id: 'vindictive', label: 'Vindictive', cat: 'Hostility', desc: 'Seeks revenge' },
    { id: 'vengeful', label: 'Vengeful', cat: 'Hostility', desc: 'Seeking vengeance' },
    { id: 'cruel', label: 'Cruel', cat: 'Hostility', desc: 'Willfully causes pain' },
    { id: 'sadistic', label: 'Sadistic', cat: 'Hostility', desc: 'Enjoys others\' pain' },
    { id: 'brutal', label: 'Brutal', cat: 'Hostility', desc: 'Savagely violent' },
    { id: 'ruthless', label: 'Ruthless', cat: 'Hostility', desc: 'Without pity' },
    { id: 'merciless', label: 'Merciless', cat: 'Hostility', desc: 'Shows no mercy' },
    { id: 'vicious', label: 'Vicious', cat: 'Hostility', desc: 'Deliberately cruel' },
    
    // Manipulation (10)
    { id: 'manipulative', label: 'Manipulative', cat: 'Manipulation', desc: 'Controls others deceptively' },
    { id: 'deceitful', label: 'Deceitful', cat: 'Manipulation', desc: 'Deceives others' },
    { id: 'deceptive', label: 'Deceptive', cat: 'Manipulation', desc: 'Misleads others' },
    { id: 'scheming', label: 'Scheming', cat: 'Manipulation', desc: 'Makes secret plans' },
    { id: 'conniving', label: 'Conniving', cat: 'Manipulation', desc: 'Secretly plans harm' },
    { id: 'calculating', label: 'Calculating', cat: 'Manipulation', desc: 'Coldly plans' },
    { id: 'exploitative', label: 'Exploitative', cat: 'Manipulation', desc: 'Uses others unfairly' },
    { id: 'opportunistic', label: 'Opportunistic', cat: 'Manipulation', desc: 'Exploits circumstances' },
    { id: 'two-faced', label: 'Two-faced', cat: 'Manipulation', desc: 'Insincere and deceitful' },
    { id: 'backstabbing', label: 'Backstabbing', cat: 'Manipulation', desc: 'Betrays trust' },
    
    // Coldness (10)
    { id: 'cold', label: 'Cold', cat: 'Coldness', desc: 'Emotionally distant' },
    { id: 'aloof', label: 'Aloof', cat: 'Coldness', desc: 'Distant and uninvolved' },
    { id: 'distant', label: 'Distant', cat: 'Coldness', desc: 'Emotionally remote' },
    { id: 'unfeeling', label: 'Unfeeling', cat: 'Coldness', desc: 'Lacks sympathy' },
    { id: 'callous', label: 'Callous', cat: 'Coldness', desc: 'Insensitive and cruel' },
    { id: 'heartless', label: 'Heartless', cat: 'Coldness', desc: 'Lacking compassion' },
    { id: 'indifferent', label: 'Indifferent', cat: 'Coldness', desc: 'No interest or concern' },
    { id: 'apathetic', label: 'Apathetic', cat: 'Coldness', desc: 'Lacking enthusiasm' },
    { id: 'unsympathetic', label: 'Unsympathetic', cat: 'Coldness', desc: 'Not showing sympathy' },
    { id: 'dismissive', label: 'Dismissive', cat: 'Coldness', desc: 'Treats as unworthy' },
    
    // Dishonesty (10)
    { id: 'dishonest', label: 'Dishonest', cat: 'Dishonesty', desc: 'Lies and deceives' },
    { id: 'liar', label: 'Liar', cat: 'Dishonesty', desc: 'Tells lies habitually' },
    { id: 'untruthful', label: 'Untruthful', cat: 'Dishonesty', desc: 'Not truthful' },
    { id: 'insincere', label: 'Insincere', cat: 'Dishonesty', desc: 'Not genuine' },
    { id: 'hypocritical', label: 'Hypocritical', cat: 'Dishonesty', desc: 'Says one thing, does another' },
    { id: 'phony', label: 'Phony', cat: 'Dishonesty', desc: 'Not genuine' },
    { id: 'fake', label: 'Fake', cat: 'Dishonesty', desc: 'Not authentic' },
    { id: 'treacherous', label: 'Treacherous', cat: 'Dishonesty', desc: 'Guilty of betrayal' },
    { id: 'disloyal', label: 'Disloyal', cat: 'Dishonesty', desc: 'Betrays allegiance' },
    { id: 'unfaithful', label: 'Unfaithful', cat: 'Dishonesty', desc: 'Not true to commitments' },
    
    // Pride (12)
    { id: 'arrogant', label: 'Arrogant', cat: 'Pride', desc: 'Exaggerated self-importance' },
    { id: 'proud', label: 'Proud', cat: 'Pride', desc: 'Excessively proud' },
    { id: 'haughty', label: 'Haughty', cat: 'Pride', desc: 'Arrogantly superior' },
    { id: 'pompous', label: 'Pompous', cat: 'Pride', desc: 'Self-important' },
    { id: 'conceited', label: 'Conceited', cat: 'Pride', desc: 'Excessively proud of oneself' },
    { id: 'vain', label: 'Vain', cat: 'Pride', desc: 'Excessive pride in appearance' },
    { id: 'smug', label: 'Smug', cat: 'Pride', desc: 'Excessively pleased with self' },
    { id: 'snobbish', label: 'Snobbish', cat: 'Pride', desc: 'Looks down on others' },
    { id: 'condescending', label: 'Condescending', cat: 'Pride', desc: 'Patronizingly superior' },
    { id: 'pretentious', label: 'Pretentious', cat: 'Pride', desc: 'Claims undeserved importance' },
    { id: 'boastful', label: 'Boastful', cat: 'Pride', desc: 'Brags excessively' },
    { id: 'show-off', label: 'Show-off', cat: 'Pride', desc: 'Displays abilities excessively' },
    
    // Weakness (9)
    { id: 'cowardly', label: 'Cowardly', cat: 'Weakness', desc: 'Lacks courage' },
    { id: 'fearful', label: 'Fearful', cat: 'Weakness', desc: 'Afraid of things' },
    { id: 'timid', label: 'Timid', cat: 'Weakness', desc: 'Lacking courage' },
    { id: 'spineless', label: 'Spineless', cat: 'Weakness', desc: 'Lacks courage or willpower' },
    { id: 'weak-willed', label: 'Weak-willed', cat: 'Weakness', desc: 'Easily influenced' },
    { id: 'pushover', label: 'Pushover', cat: 'Weakness', desc: 'Easily persuaded' },
    { id: 'submissive', label: 'Submissive', cat: 'Weakness', desc: 'Yields to others' },
    { id: 'doormat', label: 'Doormat', cat: 'Weakness', desc: 'Lets others walk over them' },
    { id: 'passive', label: 'Passive', cat: 'Weakness', desc: 'Accepts without resistance' },
    
    // Irresponsibility (10)
    { id: 'lazy', label: 'Lazy', cat: 'Irresponsibility', desc: 'Avoids work' },
    { id: 'slothful', label: 'Slothful', cat: 'Irresponsibility', desc: 'Reluctant to work' },
    { id: 'negligent', label: 'Negligent', cat: 'Irresponsibility', desc: 'Fails to take care' },
    { id: 'careless', label: 'Careless', cat: 'Irresponsibility', desc: 'Not careful' },
    { id: 'reckless', label: 'Reckless', cat: 'Irresponsibility', desc: 'Disregards consequences' },
    { id: 'irresponsible', label: 'Irresponsible', cat: 'Irresponsibility', desc: 'Not responsible' },
    { id: 'unreliable', label: 'Unreliable', cat: 'Irresponsibility', desc: 'Cannot be depended on' },
    { id: 'flaky', label: 'Flaky', cat: 'Irresponsibility', desc: 'Unreliable' },
    { id: 'inconsistent', label: 'Inconsistent', cat: 'Irresponsibility', desc: 'Not consistent' },
    { id: 'procrastinator', label: 'Procrastinator', cat: 'Irresponsibility', desc: 'Delays tasks' },
    
    // Anger (10)
    { id: 'angry', label: 'Angry', cat: 'Anger', desc: 'Easily angered' },
    { id: 'hot-tempered', label: 'Hot-tempered', cat: 'Anger', desc: 'Quick to anger' },
    { id: 'short-tempered', label: 'Short-tempered', cat: 'Anger', desc: 'Easily angered' },
    { id: 'irritable', label: 'Irritable', cat: 'Anger', desc: 'Easily annoyed' },
    { id: 'volatile', label: 'Volatile', cat: 'Anger', desc: 'Explosive temperament' },
    { id: 'explosive', label: 'Explosive', cat: 'Anger', desc: 'Bursts into anger' },
    { id: 'rageful', label: 'Rageful', cat: 'Anger', desc: 'Full of rage' },
    { id: 'resentful', label: 'Resentful', cat: 'Anger', desc: 'Feels bitterness' },
    { id: 'bitter', label: 'Bitter', cat: 'Anger', desc: 'Angry and resentful' },
    { id: 'wrathful', label: 'Wrathful', cat: 'Anger', desc: 'Full of wrath' },
    
    // Fear/Anxiety (10)
    { id: 'anxious', label: 'Anxious', cat: 'Fear', desc: 'Constantly worried' },
    { id: 'nervous', label: 'Nervous', cat: 'Fear', desc: 'Easily agitated' },
    { id: 'worried', label: 'Worried', cat: 'Fear', desc: 'Troubled by concerns' },
    { id: 'paranoid', label: 'Paranoid', cat: 'Fear', desc: 'Irrationally suspicious' },
    { id: 'suspicious', label: 'Suspicious', cat: 'Fear', desc: 'Distrustful' },
    { id: 'distrustful', label: 'Distrustful', cat: 'Fear', desc: 'Doesn\'t trust' },
    { id: 'insecure', label: 'Insecure', cat: 'Fear', desc: 'Lacks confidence' },
    { id: 'self-doubting', label: 'Self-doubting', cat: 'Fear', desc: 'Doubts own abilities' },
    { id: 'phobic', label: 'Phobic', cat: 'Fear', desc: 'Has irrational fears' },
    { id: 'neurotic', label: 'Neurotic', cat: 'Fear', desc: 'Prone to anxiety' },
    
    // Sadness (10)
    { id: 'pessimistic', label: 'Pessimistic', cat: 'Sadness', desc: 'Expects the worst' },
    { id: 'negative', label: 'Negative', cat: 'Sadness', desc: 'Focuses on bad' },
    { id: 'cynical', label: 'Cynical', cat: 'Sadness', desc: 'Distrusts motives' },
    { id: 'depressive', label: 'Depressive', cat: 'Sadness', desc: 'Prone to depression' },
    { id: 'gloomy', label: 'Gloomy', cat: 'Sadness', desc: 'Dark and depressing' },
    { id: 'morose', label: 'Morose', cat: 'Sadness', desc: 'Sullen and ill-tempered' },
    { id: 'sullen', label: 'Sullen', cat: 'Sadness', desc: 'Bad-tempered and sulky' },
    { id: 'moody', label: 'Moody', cat: 'Sadness', desc: 'Given to moods' },
    { id: 'brooding', label: 'Brooding', cat: 'Sadness', desc: 'Dark and threatening' },
    { id: 'melancholy', label: 'Melancholy', cat: 'Sadness', desc: 'Deep sadness' },
    
    // Jealousy (6)
    { id: 'jealous', label: 'Jealous', cat: 'Jealousy', desc: 'Envious of others' },
    { id: 'envious', label: 'Envious', cat: 'Jealousy', desc: 'Wants what others have' },
    { id: 'covetous', label: 'Covetous', cat: 'Jealousy', desc: 'Wants others\' possessions' },
    { id: 'possessive', label: 'Possessive', cat: 'Jealousy', desc: 'Overly controlling' },
    { id: 'territorial', label: 'Territorial', cat: 'Jealousy', desc: 'Protective of territory' },
    { id: 'resentful', label: 'Resentful', cat: 'Jealousy', desc: 'Feels bitterness at others' },
    
    // Control (8)
    { id: 'controlling', label: 'Controlling', cat: 'Control', desc: 'Needs to dominate' },
    { id: 'domineering', label: 'Domineering', cat: 'Control', desc: 'Overbearing' },
    { id: 'authoritarian', label: 'Authoritarian', cat: 'Control', desc: 'Demands obedience' },
    { id: 'bossy', label: 'Bossy', cat: 'Control', desc: 'Gives orders' },
    { id: 'overbearing', label: 'Overbearing', cat: 'Control', desc: 'Unpleasantly dominant' },
    { id: 'micromanaging', label: 'Micromanaging', cat: 'Control', desc: 'Controls every detail' },
    { id: 'tyrannical', label: 'Tyrannical', cat: 'Control', desc: 'Exercises power cruelly' },
    { id: 'dictatorial', label: 'Dictatorial', cat: 'Control', desc: 'Like a dictator' },
    
    // Stubbornness (8)
    { id: 'stubborn', label: 'Stubborn', cat: 'Stubbornness', desc: 'Refuses to change' },
    { id: 'obstinate', label: 'Obstinate', cat: 'Stubbornness', desc: 'Stubbornly refuses' },
    { id: 'pig-headed', label: 'Pig-headed', cat: 'Stubbornness', desc: 'Stupidly stubborn' },
    { id: 'inflexible', label: 'Inflexible', cat: 'Stubbornness', desc: 'Unwilling to change' },
    { id: 'rigid', label: 'Rigid', cat: 'Stubbornness', desc: 'Not flexible' },
    { id: 'unyielding', label: 'Unyielding', cat: 'Stubbornness', desc: 'Not giving way' },
    { id: 'uncompromising', label: 'Uncompromising', cat: 'Stubbornness', desc: 'Refuses to compromise' },
    { id: 'close-minded', label: 'Close-minded', cat: 'Stubbornness', desc: 'Not open to new ideas' },
    
    // Impulsivity (8)
    { id: 'impulsive', label: 'Impulsive', cat: 'Impulsivity', desc: 'Acts without thinking' },
    { id: 'rash', label: 'Rash', cat: 'Impulsivity', desc: 'Acts hastily' },
    { id: 'hasty', label: 'Hasty', cat: 'Impulsivity', desc: 'Done too quickly' },
    { id: 'impatient', label: 'Impatient', cat: 'Impulsivity', desc: 'Unable to wait' },
    { id: 'erratic', label: 'Erratic', cat: 'Impulsivity', desc: 'Unpredictable' },
    { id: 'unpredictable', label: 'Unpredictable', cat: 'Impulsivity', desc: 'Cannot be predicted' },
    { id: 'chaotic', label: 'Chaotic', cat: 'Impulsivity', desc: 'Complete disorder' },
    { id: 'wild', label: 'Wild', cat: 'Impulsivity', desc: 'Uncontrolled and unruly' },
    
    // Obsession (6)
    { id: 'obsessive', label: 'Obsessive', cat: 'Obsession', desc: 'Unhealthily fixated' },
    { id: 'compulsive', label: 'Compulsive', cat: 'Obsession', desc: 'Driven by urges' },
    { id: 'addictive', label: 'Addictive', cat: 'Obsession', desc: 'Prone to addiction' },
    { id: 'fanatical', label: 'Fanatical', cat: 'Obsession', desc: 'Excessively enthusiastic' },
    { id: 'fixated', label: 'Fixated', cat: 'Obsession', desc: 'Focused obsessively' },
    { id: 'manic', label: 'Manic', cat: 'Obsession', desc: 'Frenzied and obsessive' },
    
    // Social Flaws (10)
    { id: 'socially-awkward', label: 'Socially Awkward', cat: 'Social', desc: 'Uncomfortable socially' },
    { id: 'awkward', label: 'Awkward', cat: 'Social', desc: 'Lacking grace' },
    { id: 'shy', label: 'Shy', cat: 'Social', desc: 'Nervous around others' },
    { id: 'withdrawn', label: 'Withdrawn', cat: 'Social', desc: 'Not sociable' },
    { id: 'reclusive', label: 'Reclusive', cat: 'Social', desc: 'Avoids others' },
    { id: 'antisocial', label: 'Antisocial', cat: 'Social', desc: 'Contrary to society' },
    { id: 'misanthropic', label: 'Misanthropic', cat: 'Social', desc: 'Dislikes humanity' },
    { id: 'attention-seeking', label: 'Attention-seeking', cat: 'Social', desc: 'Craves spotlight' },
    { id: 'clingy', label: 'Clingy', cat: 'Social', desc: 'Overly dependent' },
    { id: 'needy', label: 'Needy', cat: 'Social', desc: 'Requires constant attention' },
    
    // Rudeness (10)
    { id: 'rude', label: 'Rude', cat: 'Rudeness', desc: 'Offensively impolite' },
    { id: 'impolite', label: 'Impolite', cat: 'Rudeness', desc: 'Not polite' },
    { id: 'disrespectful', label: 'Disrespectful', cat: 'Rudeness', desc: 'Lacking respect' },
    { id: 'tactless', label: 'Tactless', cat: 'Rudeness', desc: 'Lacks tact' },
    { id: 'inconsiderate', label: 'Inconsiderate', cat: 'Rudeness', desc: 'Not thoughtful' },
    { id: 'insensitive', label: 'Insensitive', cat: 'Rudeness', desc: 'Not aware of feelings' },
    { id: 'abrasive', label: 'Abrasive', cat: 'Rudeness', desc: 'Rough manner' },
    { id: 'obnoxious', label: 'Obnoxious', cat: 'Rudeness', desc: 'Extremely unpleasant' },
    { id: 'insufferable', label: 'Insufferable', cat: 'Rudeness', desc: 'Unbearable' },
    { id: 'offensive', label: 'Offensive', cat: 'Rudeness', desc: 'Causing offense' },
    
    // Judgment (9)
    { id: 'judgmental', label: 'Judgmental', cat: 'Judgment', desc: 'Critically judges others' },
    { id: 'critical', label: 'Critical', cat: 'Judgment', desc: 'Finds fault' },
    { id: 'harsh', label: 'Harsh', cat: 'Judgment', desc: 'Cruelly critical' },
    { id: 'unforgiving', label: 'Unforgiving', cat: 'Judgment', desc: 'Doesn\'t forgive' },
    { id: 'intolerant', label: 'Intolerant', cat: 'Judgment', desc: 'Not tolerant' },
    { id: 'prejudiced', label: 'Prejudiced', cat: 'Judgment', desc: 'Has unfair opinions' },
    { id: 'biased', label: 'Biased', cat: 'Judgment', desc: 'Unfairly prejudiced' },
    { id: 'narrow-minded', label: 'Narrow-minded', cat: 'Judgment', desc: 'Not open to other views' },
    { id: 'bigoted', label: 'Bigoted', cat: 'Judgment', desc: 'Intolerant toward others' },
  ]
};

          const positiveTraits = data.traits.positiveTraits || [];
          const neutralTraits = data.traits.neutralTraits || [];
          const negativeTraits = data.traits.negativeTraits || [];
          
          const totalTraits = positiveTraits.length + neutralTraits.length + negativeTraits.length;
          
          const isValid = totalTraits >= 6 && totalTraits <= 12 &&
            positiveTraits.length >= 2 && positiveTraits.length <= 4 &&
            neutralTraits.length >= 2 && neutralTraits.length <= 4 &&
            negativeTraits.length >= 2 && negativeTraits.length <= 4;

          const toggleTrait = (type, traitId) => {
            const currentTraits = type === 'positive' ? positiveTraits :
                                  type === 'neutral' ? neutralTraits : negativeTraits;
            const fieldName = type === 'positive' ? 'positiveTraits' :
                             type === 'neutral' ? 'neutralTraits' : 'negativeTraits';
            
            if (currentTraits.includes(traitId)) {
              // Remove
              update('traits', fieldName, currentTraits.filter(t => t !== traitId));
            } else {
              // Add (check max)
              if (currentTraits.length < 4) {
                update('traits', fieldName, [...currentTraits, traitId]);
              }
            }
          };

          const TraitSelector = ({ type, traits, selected, color }) => {
            const [expanded, setExpanded] = React.useState(false);
            const categories = [...new Set(traits.map(t => t.cat))];
            
            return (
              <div className={`border-2 rounded-sm overflow-hidden ${
                type === 'positive' ? 'border-green-300' :
                type === 'neutral' ? 'border-gray-300' :
                'border-red-300'
              }`}>
                {/* Header */}
                <div className={`px-4 py-3 ${
                  type === 'positive' ? 'bg-green-100' :
                  type === 'neutral' ? 'bg-gray-100' :
                  'bg-red-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-bold">
                        {type === 'positive' && '✦ POSITIVE TRAITS'}
                        {type === 'neutral' && '◈ NEUTRAL TRAITS'}
                        {type === 'negative' && '✗ NEGATIVE TRAITS / FLAWS'}
                      </span>
                      <span className={`ml-2 font-mono text-xs ${
                        selected.length < 2 ? 'text-red-600' :
                        selected.length > 4 ? 'text-red-600' :
                        'text-gray-500'
                      }`}>
                        ({selected.length}/4) {selected.length < 2 && '⚠️ min 2'}
                      </span>
                    </div>
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="font-mono text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                    >
                      {expanded ? '▼ Fechar' : '▶ Selecionar'}
                    </button>
                  </div>
                  
                  {/* Selected Tags */}
                  {selected.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selected.map(traitId => {
                        const trait = traits.find(t => t.id === traitId);
                        return trait ? (
                          <span
                            key={traitId}
                            onClick={() => toggleTrait(type, traitId)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                              type === 'positive' ? 'bg-green-200 text-green-800' :
                              type === 'neutral' ? 'bg-gray-200 text-gray-800' :
                              'bg-red-200 text-red-800'
                            }`}
                          >
                            {trait.label} <span className="text-[10px]">×</span>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                
                {/* Expanded Selection */}
                {expanded && (
                  <div className="p-4 bg-white max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                      <div key={cat} className="mb-3">
                        <h5 className="font-mono text-[10px] uppercase text-gray-500 mb-2">{cat}</h5>
                        <div className="flex flex-wrap gap-1">
                          {traits.filter(t => t.cat === cat).map(trait => (
                            <button
                              key={trait.id}
                              onClick={() => toggleTrait(type, trait.id)}
                              disabled={!selected.includes(trait.id) && selected.length >= 4}
                              title={trait.desc}
                              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                selected.includes(trait.id)
                                  ? type === 'positive' ? 'bg-green-500 text-white' :
                                    type === 'neutral' ? 'bg-gray-500 text-white' :
                                    'bg-red-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              } ${!selected.includes(trait.id) && selected.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {trait.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          };

          return (
            <div className="space-y-4">
              {/* Validation Status */}
              <div className={`p-3 rounded-sm border-2 ${
                isValid ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">
                    {isValid ? '✓ Perfil válido' : '⚠️ Ajuste necessário'}
                  </span>
                  <span className="font-mono text-sm font-bold">
                    Total: {totalTraits}/12 traits
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div className={`p-1 rounded ${positiveTraits.length >= 2 && positiveTraits.length <= 4 ? 'bg-green-200' : 'bg-red-200'}`}>
                    <span className="font-mono text-[10px]">Positivos: {positiveTraits.length}/4</span>
                  </div>
                  <div className={`p-1 rounded ${neutralTraits.length >= 2 && neutralTraits.length <= 4 ? 'bg-gray-200' : 'bg-red-200'}`}>
                    <span className="font-mono text-[10px]">Neutros: {neutralTraits.length}/4</span>
                  </div>
                  <div className={`p-1 rounded ${negativeTraits.length >= 2 && negativeTraits.length <= 4 ? 'bg-red-200' : 'bg-amber-200'}`}>
                    <span className="font-mono text-[10px]">Negativos: {negativeTraits.length}/4</span>
                  </div>
                </div>
              </div>

              {/* Trait Selectors */}
              <TraitSelector 
                type="positive" 
                traits={traitsDatabase.positive} 
                selected={positiveTraits}
              />
              
              <TraitSelector 
                type="neutral" 
                traits={traitsDatabase.neutral} 
                selected={neutralTraits}
              />
              
              <TraitSelector 
                type="negative" 
                traits={traitsDatabase.negative} 
                selected={negativeTraits}
              />

              {/* Hidden/Shadow Traits */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-purple-50 border border-purple-200 rounded-sm p-4 mb-4">
                  <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">🌑 HIDDEN / SHADOW TRAITS</h3>
                  <p className="font-mono text-xs text-purple-800 leading-relaxed">
                    Traits que o personagem <strong>possui mas esconde</strong> dos outros. Podem ser positivos (bondade escondida por fachada fria), 
                    neutros (introversão mascarada) ou negativos (crueldade sob gentileza). Selecione <strong>1-3 traits</strong> que não estejam nos traits visíveis.
                  </p>
                </div>

                {(() => {
                  const hiddenTraits = data.traits.hiddenTraits || [];
                  const allVisibleTraits = [...positiveTraits, ...neutralTraits, ...negativeTraits];
                  const allTraits = [...traitsDatabase.positive, ...traitsDatabase.neutral, ...traitsDatabase.negative];
                  
                  // Group all traits by type for display
                  const traitsByType = {
                    positive: traitsDatabase.positive,
                    neutral: traitsDatabase.neutral,
                    negative: traitsDatabase.negative
                  };

                  const toggleHiddenTrait = (traitId) => {
                    if (hiddenTraits.includes(traitId)) {
                      update('traits', 'hiddenTraits', hiddenTraits.filter(t => t !== traitId));
                    } else if (hiddenTraits.length < 3 && !allVisibleTraits.includes(traitId)) {
                      update('traits', 'hiddenTraits', [...hiddenTraits, traitId]);
                    }
                  };

                  const getTraitInfo = (traitId) => {
                    return allTraits.find(t => t.id === traitId);
                  };

                  const getTraitType = (traitId) => {
                    if (traitsDatabase.positive.find(t => t.id === traitId)) return 'positive';
                    if (traitsDatabase.neutral.find(t => t.id === traitId)) return 'neutral';
                    return 'negative';
                  };

                  const [hiddenExpanded, setHiddenExpanded] = React.useState(false);

                  const isHiddenValid = hiddenTraits.length >= 1 && hiddenTraits.length <= 3;

                  return (
                    <div className={`border-2 rounded-sm overflow-hidden border-purple-300`}>
                      {/* Header */}
                      <div className="px-4 py-3 bg-purple-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-sm font-bold text-purple-900">
                              🌑 SHADOW TRAITS
                            </span>
                            <span className={`ml-2 font-mono text-xs ${
                              hiddenTraits.length < 1 ? 'text-amber-600' :
                              hiddenTraits.length > 3 ? 'text-red-600' :
                              'text-purple-600'
                            }`}>
                              ({hiddenTraits.length}/3) {hiddenTraits.length < 1 && '⚠️ min 1'}
                            </span>
                          </div>
                          <button
                            onClick={() => setHiddenExpanded(!hiddenExpanded)}
                            className="font-mono text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                          >
                            {hiddenExpanded ? '▼ Fechar' : '▶ Selecionar'}
                          </button>
                        </div>
                        
                        {/* Selected Tags */}
                        {hiddenTraits.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {hiddenTraits.map(traitId => {
                              const trait = getTraitInfo(traitId);
                              const type = getTraitType(traitId);
                              return trait ? (
                                <span
                                  key={traitId}
                                  onClick={() => toggleHiddenTrait(traitId)}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                                    type === 'positive' ? 'bg-green-200 text-green-800 border border-green-400' :
                                    type === 'neutral' ? 'bg-gray-200 text-gray-800 border border-gray-400' :
                                    'bg-red-200 text-red-800 border border-red-400'
                                  }`}
                                >
                                  {type === 'positive' && '✦'} 
                                  {type === 'neutral' && '◈'} 
                                  {type === 'negative' && '✗'} 
                                  {trait.label} <span className="text-[10px]">×</span>
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                      
                      {/* Expanded Selection */}
                      {hiddenExpanded && (
                        <div className="p-4 bg-white max-h-80 overflow-y-auto">
                          {/* Positive Traits */}
                          <div className="mb-4">
                            <h5 className="font-mono text-xs font-bold text-green-700 mb-2 flex items-center gap-1">
                              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                              POSITIVE TRAITS (escondidos)
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {traitsByType.positive.map(trait => {
                                const isVisible = allVisibleTraits.includes(trait.id);
                                const isSelected = hiddenTraits.includes(trait.id);
                                const isDisabled = isVisible || (!isSelected && hiddenTraits.length >= 3);
                                
                                return (
                                  <button
                                    key={trait.id}
                                    onClick={() => !isDisabled && toggleHiddenTrait(trait.id)}
                                    disabled={isDisabled}
                                    title={isVisible ? 'Já está nos traits visíveis' : trait.desc}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                      isSelected ? 'bg-green-500 text-white' :
                                      isVisible ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' :
                                      isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                                    }`}
                                  >
                                    {trait.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Neutral Traits */}
                          <div className="mb-4">
                            <h5 className="font-mono text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                              <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                              NEUTRAL TRAITS (escondidos)
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {traitsByType.neutral.map(trait => {
                                const isVisible = allVisibleTraits.includes(trait.id);
                                const isSelected = hiddenTraits.includes(trait.id);
                                const isDisabled = isVisible || (!isSelected && hiddenTraits.length >= 3);
                                
                                return (
                                  <button
                                    key={trait.id}
                                    onClick={() => !isDisabled && toggleHiddenTrait(trait.id)}
                                    disabled={isDisabled}
                                    title={isVisible ? 'Já está nos traits visíveis' : trait.desc}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                      isSelected ? 'bg-gray-500 text-white' :
                                      isVisible ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' :
                                      isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      'bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer'
                                    }`}
                                  >
                                    {trait.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Negative Traits */}
                          <div className="mb-2">
                            <h5 className="font-mono text-xs font-bold text-red-700 mb-2 flex items-center gap-1">
                              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                              NEGATIVE TRAITS (escondidos)
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {traitsByType.negative.map(trait => {
                                const isVisible = allVisibleTraits.includes(trait.id);
                                const isSelected = hiddenTraits.includes(trait.id);
                                const isDisabled = isVisible || (!isSelected && hiddenTraits.length >= 3);
                                
                                return (
                                  <button
                                    key={trait.id}
                                    onClick={() => !isDisabled && toggleHiddenTrait(trait.id)}
                                    disabled={isDisabled}
                                    title={isVisible ? 'Já está nos traits visíveis' : trait.desc}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                      isSelected ? 'bg-red-500 text-white' :
                                      isVisible ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' :
                                      isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                      'bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer'
                                    }`}
                                  >
                                    {trait.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <p className="font-mono text-[10px] text-gray-500 mt-3 italic">
                            💡 Traits riscados já estão selecionados como visíveis e não podem ser shadow traits.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Perceived vs Reality - Visual System */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 rounded-sm p-4 mb-4">
                  <h3 className="font-mono text-sm font-bold text-gray-800 mb-2">👁️💀 MÁSCARA vs VERDADE</h3>
                  <p className="font-mono text-xs text-gray-600 leading-relaxed">
                    O contraste entre como o personagem é <strong>percebido pelos outros</strong> e <strong>quem realmente é</strong> por dentro.
                    Baseado nos traits visíveis e ocultos que você selecionou.
                  </p>
                </div>

                {/* Visual Contrast Display */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Facade - What others see */}
                  <div className="bg-cyan-50 border-2 border-cyan-300 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">👁️</span>
                      <h4 className="font-mono text-sm font-bold text-cyan-800">FACHADA</h4>
                    </div>
                    <p className="font-mono text-[10px] text-cyan-600 mb-3">Como os outros o veem</p>
                    
                    {positiveTraits.length + neutralTraits.length + negativeTraits.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {positiveTraits.map(traitId => {
                          const trait = traitsDatabase.positive.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className="px-2 py-1 bg-green-200 text-green-800 rounded text-[10px] font-mono">
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                        {neutralTraits.map(traitId => {
                          const trait = traitsDatabase.neutral.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-[10px] font-mono">
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                        {negativeTraits.map(traitId => {
                          const trait = traitsDatabase.negative.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className="px-2 py-1 bg-red-200 text-red-800 rounded text-[10px] font-mono">
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="font-mono text-[10px] text-cyan-400 italic">Selecione traits visíveis acima</p>
                    )}
                  </div>

                  {/* Interior - Hidden truth */}
                  <div className="bg-purple-50 border-2 border-purple-300 rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">💀</span>
                      <h4 className="font-mono text-sm font-bold text-purple-800">INTERIOR</h4>
                    </div>
                    <p className="font-mono text-[10px] text-purple-600 mb-3">O que esconde dos outros</p>
                    
                    {(data.traits.hiddenTraits || []).length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {(data.traits.hiddenTraits || []).map(traitId => {
                          const allTraits = [...traitsDatabase.positive, ...traitsDatabase.neutral, ...traitsDatabase.negative];
                          const trait = allTraits.find(t => t.id === traitId);
                          const isPositive = traitsDatabase.positive.find(t => t.id === traitId);
                          const isNeutral = traitsDatabase.neutral.find(t => t.id === traitId);
                          return trait ? (
                            <span key={traitId} className={`px-2 py-1 rounded text-[10px] font-mono border ${
                              isPositive ? 'bg-green-100 text-green-800 border-green-400' :
                              isNeutral ? 'bg-gray-100 text-gray-800 border-gray-400' :
                              'bg-red-100 text-red-800 border-red-400'
                            }`}>
                              {trait.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="font-mono text-[10px] text-purple-400 italic">Selecione shadow traits acima</p>
                    )}
                  </div>
                </div>

                {/* Contrast Symbol */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-full">
                    <span className="font-mono text-lg">≠</span>
                  </div>
                </div>

                {/* Additional Context Fields */}
                <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-sm p-4">
                  <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">📝 Contexto Adicional</h4>
                  
                  {/* Who knows the truth */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      Quem conhece a verdade?
                    </label>
                    <select
                      value={data.traits.whoKnowsTruth || ''}
                      onChange={(e) => update('traits', 'whoKnowsTruth', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                    >
                      <option value="">-- Selecione --</option>
                      <option value="nobody">Ninguém — Completamente isolado</option>
                      <option value="one-person">Uma pessoa — Confidente único</option>
                      <option value="family">Família próxima</option>
                      <option value="best-friend">Melhor amigo(a)</option>
                      <option value="partner">Parceiro(a) romântico(a)</option>
                      <option value="therapist">Terapeuta/Psicólogo</option>
                      <option value="few-people">Poucas pessoas de confiança</option>
                      <option value="everyone">Todos sabem — Não esconde mais</option>
                    </select>
                  </div>

                  {/* When does the mask fall */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      Quando a máscara cai?
                    </label>
                    <select
                      value={data.traits.maskFallsTrigger || ''}
                      onChange={(e) => update('traits', 'maskFallsTrigger', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                    >
                      <option value="">-- Selecione --</option>
                      <option value="never">Nunca — Controle absoluto</option>
                      <option value="alcohol">Sob efeito de álcool/substâncias</option>
                      <option value="extreme-stress">Estresse extremo</option>
                      <option value="anger">Momentos de raiva intensa</option>
                      <option value="intimacy">Momentos de intimidade</option>
                      <option value="vulnerability">Quando se sente vulnerável</option>
                      <option value="alone">Quando está sozinho(a)</option>
                      <option value="crisis">Em situações de crise</option>
                      <option value="triggered">Quando algo específico o(a) triggera</option>
                      <option value="gradually">Gradualmente com confiança</option>
                    </select>
                  </div>

                  {/* Why they hide it */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      Por que esconde essa parte de si?
                    </label>
                    <textarea
                      value={data.traits.whyHiding || ''}
                      onChange={(e) => update('traits', 'whyHiding', e.target.value)}
                      placeholder="Ex: Medo de rejeição, trauma do passado, vergonha, proteção..."
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
                    />
                  </div>

                  {/* What happens when revealed */}
                  <div>
                    <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">
                      O que acontece quando é revelado?
                    </label>
                    <textarea
                      value={data.traits.whenRevealed || ''}
                      onChange={(e) => update('traits', 'whenRevealed', e.target.value)}
                      placeholder="Ex: Fica em negação, ataca quem descobriu, fecha-se completamente, sente alívio..."
                      className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    ),
    2: ( // Emotional Landscape
      <div className="space-y-6">
        {/* Header Explanation */}
        <div className="bg-rose-50 border border-rose-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-rose-900 mb-2">💗 PAISAGEM EMOCIONAL</h3>
          <p className="font-mono text-xs text-rose-800 leading-relaxed">
            Como seu personagem <strong>experimenta, processa e expressa</strong> emoções. 
            Isso define como ele reage ao mundo e como os outros percebem seu estado emocional.
          </p>
        </div>

        {/* Emotional Range - Qualitative */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">🎭 Amplitude Emocional</h4>
            <span className="font-mono text-xs text-gray-500">Como expressa emoções</span>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Quão intensamente o personagem demonstra suas emoções para os outros.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Contido</span>
              <span>Expressivo</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={data.emotional.emotionalRange || 4}
              onChange={(e) => update('emotional', 'emotionalRange', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-200 via-gray-200 to-red-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.emotional.emotionalRange || 4) === 1 ? 'bg-blue-200 text-blue-800' :
                (data.emotional.emotionalRange || 4) === 2 ? 'bg-blue-100 text-blue-700' :
                (data.emotional.emotionalRange || 4) === 3 ? 'bg-slate-100 text-slate-700' :
                (data.emotional.emotionalRange || 4) === 4 ? 'bg-gray-100 text-gray-700' :
                (data.emotional.emotionalRange || 4) === 5 ? 'bg-orange-100 text-orange-700' :
                (data.emotional.emotionalRange || 4) === 6 ? 'bg-red-100 text-red-700' :
                'bg-red-200 text-red-800'
              }`}>
                {(data.emotional.emotionalRange || 4) === 1 && 'Estoico'}
                {(data.emotional.emotionalRange || 4) === 2 && 'Muito Contido'}
                {(data.emotional.emotionalRange || 4) === 3 && 'Reservado'}
                {(data.emotional.emotionalRange || 4) === 4 && 'Equilibrado'}
                {(data.emotional.emotionalRange || 4) === 5 && 'Emotivo'}
                {(data.emotional.emotionalRange || 4) === 6 && 'Muito Expressivo'}
                {(data.emotional.emotionalRange || 4) === 7 && 'Intenso/Dramático'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.emotional.emotionalRange || 4) === 1 && '💡 Quase nunca demonstra emoções. Rosto impassível. Outros não sabem o que sente.'}
              {(data.emotional.emotionalRange || 4) === 2 && '💡 Raramente mostra emoções. Controlado. Pode parecer frio ou distante.'}
              {(data.emotional.emotionalRange || 4) === 3 && '💡 Emoções sutis. Expressa principalmente com pessoas próximas.'}
              {(data.emotional.emotionalRange || 4) === 4 && '💡 Expressa emoções de forma apropriada ao contexto. Adaptável.'}
              {(data.emotional.emotionalRange || 4) === 5 && '💡 Emoções visíveis. Ri alto, chora em filmes. Transparente.'}
              {(data.emotional.emotionalRange || 4) === 6 && '💡 Muito expressivo. Gesticula, voz varia muito. Energia contagiante.'}
              {(data.emotional.emotionalRange || 4) === 7 && '💡 Emoções intensas e dramáticas. Tudo é vivido com máxima intensidade.'}
            </p>
          </div>
        </div>

        {/* Default Mood */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😊 Humor Base</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O estado emocional padrão quando nada específico está acontecendo.
          </p>
          <select
            value={data.emotional.defaultMood || ''}
            onChange={(e) => update('emotional', 'defaultMood', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs mb-3"
          >
            <option value="">-- Selecione o humor base --</option>
            <optgroup label="😊 Positivos">
              <option value="cheerful">Alegre — Geralmente de bom humor, sorridente</option>
              <option value="content">Contente — Satisfeito, em paz</option>
              <option value="optimistic">Otimista — Espera o melhor, esperançoso</option>
              <option value="playful">Brincalhão — Leve, gosta de humor</option>
              <option value="enthusiastic">Entusiasmado — Animado, energético</option>
              <option value="serene">Sereno — Calmo, tranquilo, zen</option>
              <option value="confident">Confiante — Seguro de si, assertivo</option>
            </optgroup>
            <optgroup label="😐 Neutros">
              <option value="neutral">Neutro — Sem inclinação particular</option>
              <option value="calm">Calmo — Tranquilo, estável</option>
              <option value="focused">Focado — Concentrado, sério</option>
              <option value="pensive">Pensativo — Reflexivo, contemplativo</option>
              <option value="reserved">Reservado — Quieto, observador</option>
              <option value="practical">Prático — Objetivo, pragmático</option>
              <option value="detached">Desapegado — Emocionalmente distante</option>
            </optgroup>
            <optgroup label="😔 Negativos">
              <option value="melancholic">Melancólico — Tristeza suave constante</option>
              <option value="anxious">Ansioso — Preocupado, tenso</option>
              <option value="irritable">Irritável — Facilmente incomodado</option>
              <option value="cynical">Cínico — Descrente, sarcástico</option>
              <option value="bitter">Amargo — Ressentido, azedo</option>
              <option value="gloomy">Sombrio — Pessimista, negativo</option>
              <option value="restless">Inquieto — Agitado, impaciente</option>
              <option value="defensive">Defensivo — Na guarda, desconfiado</option>
            </optgroup>
          </select>
        </div>

        {/* Emotional Triggers - Multi-select */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚡ Gatilhos Emocionais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O que provoca reações emocionais intensas. Selecione até 5.
          </p>
          
          {(() => {
            const triggerOptions = [
              { id: 'rejection', label: 'Rejeição', cat: 'Interpersonal', desc: 'Ser rejeitado ou excluído' },
              { id: 'abandonment', label: 'Abandono', cat: 'Interpersonal', desc: 'Medo de ser deixado' },
              { id: 'betrayal', label: 'Traição', cat: 'Interpersonal', desc: 'Quebra de confiança' },
              { id: 'disrespect', label: 'Desrespeito', cat: 'Interpersonal', desc: 'Ser tratado com desdém' },
              { id: 'injustice', label: 'Injustiça', cat: 'Interpersonal', desc: 'Testemunhar ou sofrer injustiça' },
              { id: 'criticism', label: 'Crítica', cat: 'Self', desc: 'Ser criticado ou julgado' },
              { id: 'failure', label: 'Fracasso', cat: 'Self', desc: 'Falhar ou não atingir metas' },
              { id: 'incompetence', label: 'Incompetência', cat: 'Self', desc: 'Parecer incapaz ou burro' },
              { id: 'vulnerability', label: 'Vulnerabilidade', cat: 'Self', desc: 'Ser visto como fraco' },
              { id: 'loss-control', label: 'Perda de Controle', cat: 'Self', desc: 'Não ter controle da situação' },
              { id: 'crowds', label: 'Multidões', cat: 'Environment', desc: 'Lugares com muita gente' },
              { id: 'conflict', label: 'Conflito', cat: 'Environment', desc: 'Brigas, discussões' },
              { id: 'chaos', label: 'Caos', cat: 'Environment', desc: 'Desordem, imprevisibilidade' },
              { id: 'silence', label: 'Silêncio', cat: 'Environment', desc: 'Quietude prolongada' },
              { id: 'confinement', label: 'Confinamento', cat: 'Environment', desc: 'Espaços fechados ou restrição' },
              { id: 'memories', label: 'Memórias', cat: 'Past', desc: 'Lembranças específicas do passado' },
              { id: 'anniversaries', label: 'Datas', cat: 'Past', desc: 'Aniversários de eventos' },
              { id: 'similar-people', label: 'Pessoas Similares', cat: 'Past', desc: 'Pessoas que lembram alguém' },
              { id: 'specific-places', label: 'Lugares', cat: 'Past', desc: 'Locais com significado' },
              { id: 'sensory', label: 'Sensorial', cat: 'Past', desc: 'Cheiros, sons, músicas específicas' },
            ];
            
            const selectedTriggers = data.emotional.triggers || [];
            
            const toggleTrigger = (triggerId) => {
              if (selectedTriggers.includes(triggerId)) {
                update('emotional', 'triggers', selectedTriggers.filter(t => t !== triggerId));
              } else if (selectedTriggers.length < 5) {
                update('emotional', 'triggers', [...selectedTriggers, triggerId]);
              }
            };
            
            const categories = [...new Set(triggerOptions.map(t => t.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedTriggers.length}/5</span>
                </div>
                
                {/* Selected triggers */}
                {selectedTriggers.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedTriggers.map(triggerId => {
                      const trigger = triggerOptions.find(t => t.id === triggerId);
                      return trigger ? (
                        <span
                          key={triggerId}
                          onClick={() => toggleTrigger(triggerId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-mono cursor-pointer hover:bg-red-200"
                        >
                          ⚡ {trigger.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {/* Trigger options by category */}
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {triggerOptions.filter(t => t.cat === cat).map(trigger => (
                        <button
                          key={trigger.id}
                          onClick={() => toggleTrigger(trigger.id)}
                          disabled={!selectedTriggers.includes(trigger.id) && selectedTriggers.length >= 5}
                          title={trigger.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedTriggers.includes(trigger.id)
                              ? 'bg-red-500 text-white'
                              : selectedTriggers.length >= 5
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-100 text-gray-700 hover:bg-red-100 cursor-pointer'
                          }`}
                        >
                          {trigger.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Coping Mechanisms - Multi-select */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🛡️ Mecanismos de Coping</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como lida com estresse e emoções difíceis. Selecione até 4.
          </p>
          
          {(() => {
            const copingOptions = [
              // Healthy
              { id: 'exercise', label: 'Exercício físico', cat: 'Saudável', desc: 'Corre, academia, esportes' },
              { id: 'meditation', label: 'Meditação', cat: 'Saudável', desc: 'Mindfulness, respiração' },
              { id: 'talking', label: 'Conversar', cat: 'Saudável', desc: 'Desabafa com alguém' },
              { id: 'journaling', label: 'Escrever', cat: 'Saudável', desc: 'Diário, journaling' },
              { id: 'creative', label: 'Arte/Criatividade', cat: 'Saudável', desc: 'Música, pintura, escrita' },
              { id: 'nature', label: 'Natureza', cat: 'Saudável', desc: 'Caminhadas, ar livre' },
              { id: 'therapy', label: 'Terapia', cat: 'Saudável', desc: 'Busca ajuda profissional' },
              { id: 'problem-solving', label: 'Resolver problemas', cat: 'Saudável', desc: 'Enfrenta de frente' },
              
              // Neutral
              { id: 'sleeping', label: 'Dormir', cat: 'Neutro', desc: 'Dorme para escapar' },
              { id: 'distraction', label: 'Distração', cat: 'Neutro', desc: 'TV, jogos, redes sociais' },
              { id: 'humor', label: 'Humor', cat: 'Neutro', desc: 'Faz piadas, ri da situação' },
              { id: 'work', label: 'Trabalho', cat: 'Neutro', desc: 'Mergulha no trabalho' },
              { id: 'cleaning', label: 'Organizar/Limpar', cat: 'Neutro', desc: 'Faxina compulsiva' },
              { id: 'isolation', label: 'Isolamento', cat: 'Neutro', desc: 'Fica sozinho' },
              { id: 'compartmentalization', label: 'Compartimentar', cat: 'Neutro', desc: 'Separa e ignora' },
              
              // Unhealthy
              { id: 'substance', label: 'Substâncias', cat: 'Prejudicial', desc: 'Álcool, drogas, cigarro' },
              { id: 'eating', label: 'Comer demais/de menos', cat: 'Prejudicial', desc: 'Relação com comida' },
              { id: 'aggression', label: 'Agressividade', cat: 'Prejudicial', desc: 'Explode, briga' },
              { id: 'self-harm', label: 'Autolesão', cat: 'Prejudicial', desc: 'Se machuca' },
              { id: 'denial', label: 'Negação', cat: 'Prejudicial', desc: 'Finge que está bem' },
              { id: 'blame', label: 'Culpar outros', cat: 'Prejudicial', desc: 'Projeta nos outros' },
              { id: 'shopping', label: 'Compras compulsivas', cat: 'Prejudicial', desc: 'Gasta dinheiro' },
              { id: 'risk-taking', label: 'Comportamento de risco', cat: 'Prejudicial', desc: 'Busca adrenalina perigosa' },
            ];
            
            const selectedCoping = data.emotional.copingMechanisms || [];
            
            const toggleCoping = (copingId) => {
              if (selectedCoping.includes(copingId)) {
                update('emotional', 'copingMechanisms', selectedCoping.filter(c => c !== copingId));
              } else if (selectedCoping.length < 4) {
                update('emotional', 'copingMechanisms', [...selectedCoping, copingId]);
              }
            };
            
            const categories = [...new Set(copingOptions.map(c => c.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedCoping.length}/4</span>
                </div>
                
                {/* Selected coping */}
                {selectedCoping.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedCoping.map(copingId => {
                      const coping = copingOptions.find(c => c.id === copingId);
                      const isHealthy = coping?.cat === 'Saudável';
                      const isUnhealthy = coping?.cat === 'Prejudicial';
                      return coping ? (
                        <span
                          key={copingId}
                          onClick={() => toggleCoping(copingId)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                            isHealthy ? 'bg-green-100 text-green-800' :
                            isUnhealthy ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          🛡️ {coping.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {/* Coping options by category */}
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className={`font-mono text-[10px] uppercase mb-1 ${
                      cat === 'Saudável' ? 'text-green-600' :
                      cat === 'Prejudicial' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {copingOptions.filter(c => c.cat === cat).map(coping => (
                        <button
                          key={coping.id}
                          onClick={() => toggleCoping(coping.id)}
                          disabled={!selectedCoping.includes(coping.id) && selectedCoping.length >= 4}
                          title={coping.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedCoping.includes(coping.id)
                              ? cat === 'Saudável' ? 'bg-green-500 text-white' :
                                cat === 'Prejudicial' ? 'bg-red-500 text-white' :
                                'bg-amber-500 text-white'
                              : selectedCoping.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : cat === 'Saudável' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                                cat === 'Prejudicial' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          } cursor-pointer`}
                        >
                          {coping.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Attachment Style */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💕 Estilo de Apego</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como forma e mantém vínculos emocionais com outras pessoas.
          </p>
          <select
            value={data.emotional.attachmentStyle || ''}
            onChange={(e) => update('emotional', 'attachmentStyle', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs mb-3"
          >
            <option value="">-- Selecione --</option>
            <option value="secure">🟢 Seguro — Confortável com intimidade e independência</option>
            <option value="anxious">🟡 Ansioso-Preocupado — Busca validação, medo de abandono</option>
            <option value="avoidant">🟠 Evitativo-Dismissivo — Valoriza independência, evita intimidade</option>
            <option value="fearful">🔴 Evitativo-Medroso — Deseja intimidade mas teme rejeição</option>
            <option value="disorganized">⚫ Desorganizado — Padrões inconsistentes, trauma</option>
          </select>
          
          {/* Attachment Style Description */}
          {data.emotional.attachmentStyle && (
            <div className={`p-3 rounded-sm text-xs font-mono ${
              data.emotional.attachmentStyle === 'secure' ? 'bg-green-50 text-green-800 border border-green-200' :
              data.emotional.attachmentStyle === 'anxious' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
              data.emotional.attachmentStyle === 'avoidant' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
              data.emotional.attachmentStyle === 'fearful' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-gray-100 text-gray-800 border border-gray-300'
            }`}>
              {data.emotional.attachmentStyle === 'secure' && (
                <div>
                  <strong>Seguro:</strong> Tem facilidade em confiar nos outros e ser confiável. 
                  Confortável com proximidade emocional. Comunica necessidades claramente. 
                  Relacionamentos estáveis e satisfatórios.
                </div>
              )}
              {data.emotional.attachmentStyle === 'anxious' && (
                <div>
                  <strong>Ansioso-Preocupado:</strong> Preocupa-se muito com relacionamentos. 
                  Busca constante validação e reasseguramento. Medo intenso de abandono. 
                  Pode parecer "carente" ou possessivo. Muito sensível a sinais de rejeição.
                </div>
              )}
              {data.emotional.attachmentStyle === 'avoidant' && (
                <div>
                  <strong>Evitativo-Dismissivo:</strong> Valoriza muito independência e autossuficiência. 
                  Desconfortável com muita proximidade emocional. Minimiza importância de relacionamentos. 
                  Pode parecer distante ou emocionalmente indisponível.
                </div>
              )}
              {data.emotional.attachmentStyle === 'fearful' && (
                <div>
                  <strong>Evitativo-Medroso:</strong> Deseja intimidade mas teme muito a rejeição. 
                  Conflito interno entre aproximar-se e afastar-se. Dificuldade em confiar. 
                  Relacionamentos intensos e turbulentos. Baixa autoestima.
                </div>
              )}
              {data.emotional.attachmentStyle === 'disorganized' && (
                <div>
                  <strong>Desorganizado:</strong> Padrões inconsistentes e imprevisíveis. 
                  Geralmente resultado de trauma ou abuso na infância. 
                  Pode alternar entre buscar e rejeitar intimidade. 
                  Dificuldade em regular emoções em relacionamentos.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Emotional Volatility */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">🌊 Volatilidade Emocional</h4>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Quão rapidamente as emoções mudam e quão intensas são as oscilações.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Estável</span>
              <span>Volátil</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={data.emotional.volatility || 3}
              onChange={(e) => update('emotional', 'volatility', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-300 via-gray-200 to-orange-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.emotional.volatility || 3) === 1 ? 'bg-blue-200 text-blue-800' :
                (data.emotional.volatility || 3) === 2 ? 'bg-blue-100 text-blue-700' :
                (data.emotional.volatility || 3) === 3 ? 'bg-gray-100 text-gray-700' :
                (data.emotional.volatility || 3) === 4 ? 'bg-orange-100 text-orange-700' :
                'bg-orange-200 text-orange-800'
              }`}>
                {(data.emotional.volatility || 3) === 1 && 'Muito Estável'}
                {(data.emotional.volatility || 3) === 2 && 'Estável'}
                {(data.emotional.volatility || 3) === 3 && 'Moderado'}
                {(data.emotional.volatility || 3) === 4 && 'Volátil'}
                {(data.emotional.volatility || 3) === 5 && 'Muito Volátil'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.emotional.volatility || 3) === 1 && '💡 Emoções mudam lentamente. Difícil de abalar. Previsível.'}
              {(data.emotional.volatility || 3) === 2 && '💡 Geralmente estável com mudanças graduais. Recupera-se bem.'}
              {(data.emotional.volatility || 3) === 3 && '💡 Mudanças emocionais normais. Às vezes oscila mais.'}
              {(data.emotional.volatility || 3) === 4 && '💡 Emoções mudam rapidamente. Pode surpreender os outros.'}
              {(data.emotional.volatility || 3) === 5 && '💡 Montanha-russa emocional. Oscilações intensas e rápidas.'}
            </p>
          </div>
        </div>

        {/* Emotional Intelligence */}
        <div className="border border-gray-200 rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-gray-800">🧠 Inteligência Emocional</h4>
          </div>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Capacidade de reconhecer, entender e gerenciar emoções próprias e dos outros.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-gray-500">
              <span>Baixa</span>
              <span>Alta</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={data.emotional.emotionalIntelligence || 3}
              onChange={(e) => update('emotional', 'emotionalIntelligence', parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-gray-300 via-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                (data.emotional.emotionalIntelligence || 3) === 1 ? 'bg-gray-200 text-gray-700' :
                (data.emotional.emotionalIntelligence || 3) === 2 ? 'bg-gray-100 text-gray-600' :
                (data.emotional.emotionalIntelligence || 3) === 3 ? 'bg-purple-100 text-purple-700' :
                (data.emotional.emotionalIntelligence || 3) === 4 ? 'bg-purple-200 text-purple-800' :
                'bg-purple-300 text-purple-900'
              }`}>
                {(data.emotional.emotionalIntelligence || 3) === 1 && 'Muito Baixa'}
                {(data.emotional.emotionalIntelligence || 3) === 2 && 'Baixa'}
                {(data.emotional.emotionalIntelligence || 3) === 3 && 'Média'}
                {(data.emotional.emotionalIntelligence || 3) === 4 && 'Alta'}
                {(data.emotional.emotionalIntelligence || 3) === 5 && 'Muito Alta'}
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 text-center italic">
              {(data.emotional.emotionalIntelligence || 3) === 1 && '💡 Dificuldade em identificar emoções. Não percebe como afeta outros.'}
              {(data.emotional.emotionalIntelligence || 3) === 2 && '💡 Reconhece emoções básicas mas luta para gerenciá-las.'}
              {(data.emotional.emotionalIntelligence || 3) === 3 && '💡 Entende emoções razoavelmente. Às vezes perde sinais sutis.'}
              {(data.emotional.emotionalIntelligence || 3) === 4 && '💡 Boa leitura emocional. Empático. Gerencia bem conflitos.'}
              {(data.emotional.emotionalIntelligence || 3) === 5 && '💡 Excepcional em ler pessoas. Nato mediador. Muito empático.'}
            </p>
          </div>
        </div>

        {/* Dominant Emotion */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💖 Emoção Dominante</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            A emoção que o personagem mais sente, que colore sua experiência do mundo.
          </p>
          <select
            value={data.emotional.dominantEmotion || ''}
            onChange={(e) => update('emotional', 'dominantEmotion', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione a emoção dominante --</option>
            <optgroup label="🌟 Emoções Positivas">
              <option value="joy">Joy (Alegria) — Felicidade, contentamento, prazer</option>
              <option value="love">Love (Amor) — Carinho, afeição, conexão</option>
              <option value="hope">Hope (Esperança) — Otimismo, expectativa positiva</option>
              <option value="gratitude">Gratitude (Gratidão) — Apreciação, reconhecimento</option>
              <option value="serenity">Serenity (Serenidade) — Paz, calma, tranquilidade</option>
              <option value="interest">Interest (Interesse) — Curiosidade, engajamento</option>
              <option value="amusement">Amusement (Diversão) — Humor, leveza</option>
              <option value="pride">Pride (Orgulho) — Satisfação com conquistas</option>
              <option value="awe">Awe (Admiração) — Maravilhamento, reverência</option>
              <option value="inspiration">Inspiration (Inspiração) — Elevação, motivação</option>
            </optgroup>
            <optgroup label="😐 Emoções Neutras/Mistas">
              <option value="nostalgia">Nostalgia — Saudade agridoce do passado</option>
              <option value="anticipation">Anticipation (Antecipação) — Expectativa, ansiedade boa</option>
              <option value="surprise">Surprise (Surpresa) — Choque, admiração</option>
              <option value="confusion">Confusion (Confusão) — Incerteza, perplexidade</option>
              <option value="ambivalence">Ambivalence (Ambivalência) — Sentimentos conflitantes</option>
            </optgroup>
            <optgroup label="😔 Emoções Negativas">
              <option value="sadness">Sadness (Tristeza) — Melancolia, pesar, luto</option>
              <option value="fear">Fear (Medo) — Ansiedade, preocupação, terror</option>
              <option value="anger">Anger (Raiva) — Frustração, irritação, fúria</option>
              <option value="shame">Shame (Vergonha) — Humilhação, inadequação</option>
              <option value="guilt">Guilt (Culpa) — Remorso, arrependimento</option>
              <option value="envy">Envy (Inveja) — Ciúme, cobiça</option>
              <option value="disgust">Disgust (Nojo) — Repulsa, aversão</option>
              <option value="contempt">Contempt (Desprezo) — Desdém, superioridade</option>
              <option value="loneliness">Loneliness (Solidão) — Isolamento, abandono</option>
              <option value="boredom">Boredom (Tédio) — Apatia, desinteresse</option>
              <option value="resentment">Resentment (Ressentimento) — Amargura guardada</option>
              <option value="despair">Despair (Desespero) — Desesperança, vazio</option>
            </optgroup>
          </select>
        </div>

        {/* Avoided Emotion */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚫 Emoção Evitada</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            A emoção que o personagem mais reprime, evita ou não consegue lidar.
          </p>
          <select
            value={data.emotional.avoidedEmotion || ''}
            onChange={(e) => update('emotional', 'avoidedEmotion', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
          >
            <option value="">-- Selecione a emoção evitada --</option>
            <optgroup label="😔 Emoções Frequentemente Evitadas">
              <option value="vulnerability">Vulnerability (Vulnerabilidade) — Evita mostrar fraqueza</option>
              <option value="sadness">Sadness (Tristeza) — Não se permite chorar ou lamentar</option>
              <option value="fear">Fear (Medo) — Nega ou esconde seus medos</option>
              <option value="anger">Anger (Raiva) — Reprime irritação e frustração</option>
              <option value="shame">Shame (Vergonha) — Esconde a todo custo</option>
              <option value="guilt">Guilt (Culpa) — Evita enfrentar arrependimentos</option>
              <option value="loneliness">Loneliness (Solidão) — Nega sentir-se sozinho</option>
              <option value="helplessness">Helplessness (Impotência) — Não aceita não ter controle</option>
              <option value="neediness">Neediness (Carência) — Esconde necessidade de outros</option>
              <option value="jealousy">Jealousy (Ciúme) — Não admite sentir ciúmes</option>
              <option value="grief">Grief (Luto) — Evita processar perdas</option>
              <option value="disappointment">Disappointment (Decepção) — Não admite expectativas frustradas</option>
            </optgroup>
            <optgroup label="🌟 Emoções Positivas (paradoxalmente evitadas)">
              <option value="joy">Joy (Alegria) — Desconforto com felicidade, espera o pior</option>
              <option value="love">Love (Amor) — Medo de amar, evita conexão</option>
              <option value="hope">Hope (Esperança) — Cinismo protege de decepção</option>
              <option value="pride">Pride (Orgulho) — Não se permite sentir orgulho</option>
              <option value="excitement">Excitement (Empolgação) — Contém entusiasmo</option>
              <option value="trust">Trust (Confiança) — Evita confiar em outros</option>
            </optgroup>
          </select>
          
          {/* Why avoided */}
          {data.emotional.avoidedEmotion && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <label className="font-mono text-[10px] text-gray-500 mb-1 block">Por que evita essa emoção?</label>
              <select
                value={data.emotional.avoidedEmotionReason || ''}
                onChange={(e) => update('emotional', 'avoidedEmotionReason', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Selecione a razão --</option>
                <option value="childhood">Childhood (Infância) — Aprendeu que não era seguro/permitido</option>
                <option value="trauma">Trauma — Associa a experiência dolorosa</option>
                <option value="weakness">Weakness (Fraqueza) — Vê como sinal de fraqueza</option>
                <option value="control">Control (Controle) — Perde o controle quando sente</option>
                <option value="overwhelm">Overwhelm (Sobrecarga) — Intensidade é demais</option>
                <option value="shame">Shame (Vergonha) — Tem vergonha de sentir isso</option>
                <option value="cultural">Cultural — Cultura/família não permite</option>
                <option value="gender">Gender — Expectativas de gênero</option>
                <option value="protection">Protection (Proteção) — Se protege de mais dor</option>
                <option value="unknown">Unknown (Desconhecido) — Não sabe, apenas evita</option>
              </select>
            </div>
          )}
        </div>
      </div>
    ),
    3: ( // Inner World
      <div className="space-y-6">
        {/* Header Explanation */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-indigo-900 mb-2">🌌 MUNDO INTERIOR</h3>
          <p className="font-mono text-xs text-indigo-800 leading-relaxed">
            Os <strong>medos, desejos, vergonhas e defesas</strong> mais profundos do personagem. 
            O que move suas ações e o que ele esconde até de si mesmo.
          </p>
        </div>

        {/* Core Fears - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😨 Medos Centrais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Os medos mais profundos que motivam comportamentos. Selecione até 4.
          </p>
          
          {(() => {
            const fearOptions = [
              // Existential (12)
              { id: 'death', label: 'Morte', cat: 'Existencial', desc: 'Medo da própria mortalidade' },
              { id: 'meaninglessness', label: 'Falta de Sentido', cat: 'Existencial', desc: 'Que a vida não tenha propósito' },
              { id: 'insignificance', label: 'Insignificância', cat: 'Existencial', desc: 'Não importar, ser esquecido' },
              { id: 'being-ordinary', label: 'Ser Comum', cat: 'Existencial', desc: 'Não ser especial ou único' },
              { id: 'wasted-life', label: 'Vida Desperdiçada', cat: 'Existencial', desc: 'Não realizar seu potencial' },
              { id: 'losing-identity', label: 'Perder Identidade', cat: 'Existencial', desc: 'Não saber quem realmente é' },
              { id: 'nonexistence', label: 'Não-Existência', cat: 'Existencial', desc: 'Deixar de existir completamente' },
              { id: 'futility', label: 'Futilidade', cat: 'Existencial', desc: 'Que nada que faça importe' },
              { id: 'time-running-out', label: 'Tempo Acabando', cat: 'Existencial', desc: 'Não ter tempo suficiente' },
              { id: 'legacy', label: 'Sem Legado', cat: 'Existencial', desc: 'Não deixar nada para trás' },
              { id: 'forgotten', label: 'Ser Esquecido', cat: 'Existencial', desc: 'Ninguém lembrar que existiu' },
              { id: 'meaningless-suffering', label: 'Sofrimento Inútil', cat: 'Existencial', desc: 'Sofrer sem razão ou propósito' },
              
              // Relational (16)
              { id: 'abandonment', label: 'Abandono', cat: 'Relacional', desc: 'Ser deixado por quem ama' },
              { id: 'rejection', label: 'Rejeição', cat: 'Relacional', desc: 'Ser rejeitado pelos outros' },
              { id: 'betrayal', label: 'Traição', cat: 'Relacional', desc: 'Ser traído por quem confia' },
              { id: 'loneliness', label: 'Solidão', cat: 'Relacional', desc: 'Ficar completamente sozinho' },
              { id: 'intimacy', label: 'Intimidade', cat: 'Relacional', desc: 'Ser verdadeiramente conhecido' },
              { id: 'commitment', label: 'Compromisso', cat: 'Relacional', desc: 'Ficar preso em relacionamento' },
              { id: 'losing-loved-ones', label: 'Perder Quem Ama', cat: 'Relacional', desc: 'Morte ou perda de entes queridos' },
              { id: 'being-unlovable', label: 'Ser Não-Amável', cat: 'Relacional', desc: 'Que ninguém possa amá-lo' },
              { id: 'being-replaced', label: 'Ser Substituído', cat: 'Relacional', desc: 'Outro tomar seu lugar' },
              { id: 'being-forgotten-by-loved', label: 'Esquecido por Quem Ama', cat: 'Relacional', desc: 'Entes queridos esquecerem de você' },
              { id: 'disappointing-others', label: 'Decepcionar Outros', cat: 'Relacional', desc: 'Não corresponder às expectativas' },
              { id: 'being-burden', label: 'Ser um Fardo', cat: 'Relacional', desc: 'Atrapalhar a vida dos outros' },
              { id: 'suffocation', label: 'Sufocamento', cat: 'Relacional', desc: 'Relacionamentos que aprisionam' },
              { id: 'losing-connection', label: 'Perder Conexão', cat: 'Relacional', desc: 'Afastar-se de quem ama' },
              { id: 'being-used', label: 'Ser Usado', cat: 'Relacional', desc: 'Outros só querem algo de você' },
              { id: 'never-finding-love', label: 'Nunca Encontrar Amor', cat: 'Relacional', desc: 'Ficar sem parceiro para sempre' },
              
              // Self-worth (14)
              { id: 'failure', label: 'Fracasso', cat: 'Autoestima', desc: 'Falhar em objetivos importantes' },
              { id: 'inadequacy', label: 'Inadequação', cat: 'Autoestima', desc: 'Nunca ser bom o suficiente' },
              { id: 'being-exposed', label: 'Ser Exposto', cat: 'Autoestima', desc: 'Que descubram quem realmente é' },
              { id: 'humiliation', label: 'Humilhação', cat: 'Autoestima', desc: 'Ser ridicularizado publicamente' },
              { id: 'incompetence', label: 'Incompetência', cat: 'Autoestima', desc: 'Parecer burro ou incapaz' },
              { id: 'being-weak', label: 'Parecer Fraco', cat: 'Autoestima', desc: 'Ser visto como vulnerável' },
              { id: 'losing-respect', label: 'Perder Respeito', cat: 'Autoestima', desc: 'Que outros parem de respeitá-lo' },
              { id: 'being-judged', label: 'Ser Julgado', cat: 'Autoestima', desc: 'Outros julgando suas escolhas' },
              { id: 'being-seen-as-fraud', label: 'Parecer Fraude', cat: 'Autoestima', desc: 'Descobrirem que é impostor' },
              { id: 'not-measuring-up', label: 'Não Estar à Altura', cat: 'Autoestima', desc: 'Não alcançar padrões' },
              { id: 'being-mocked', label: 'Ser Zombado', cat: 'Autoestima', desc: 'Rirem de você' },
              { id: 'losing-status', label: 'Perder Status', cat: 'Autoestima', desc: 'Cair na hierarquia social' },
              { id: 'being-pitied', label: 'Ser Digno de Pena', cat: 'Autoestima', desc: 'Outros sentirem pena' },
              { id: 'mediocrity', label: 'Mediocridade', cat: 'Autoestima', desc: 'Ser apenas mais um' },
              
              // Control (12)
              { id: 'loss-of-control', label: 'Perda de Controle', cat: 'Controle', desc: 'Não controlar sua vida' },
              { id: 'chaos', label: 'Caos', cat: 'Controle', desc: 'Desordem e imprevisibilidade' },
              { id: 'helplessness', label: 'Impotência', cat: 'Controle', desc: 'Não poder fazer nada' },
              { id: 'dependency', label: 'Dependência', cat: 'Controle', desc: 'Precisar dos outros' },
              { id: 'being-trapped', label: 'Estar Preso', cat: 'Controle', desc: 'Sem opções ou saída' },
              { id: 'uncertainty', label: 'Incerteza', cat: 'Controle', desc: 'Não saber o que vai acontecer' },
              { id: 'losing-autonomy', label: 'Perder Autonomia', cat: 'Controle', desc: 'Outros controlando sua vida' },
              { id: 'powerlessness', label: 'Impotência Total', cat: 'Controle', desc: 'Não ter nenhum poder' },
              { id: 'being-manipulated', label: 'Ser Manipulado', cat: 'Controle', desc: 'Outros controlando você' },
              { id: 'unpredictability', label: 'Imprevisibilidade', cat: 'Controle', desc: 'Não conseguir prever' },
              { id: 'forced-change', label: 'Mudança Forçada', cat: 'Controle', desc: 'Ser obrigado a mudar' },
              { id: 'losing-freedom', label: 'Perder Liberdade', cat: 'Controle', desc: 'Restrições à liberdade' },
              
              // Physical/Practical (14)
              { id: 'poverty', label: 'Pobreza', cat: 'Prático', desc: 'Perder dinheiro, segurança material' },
              { id: 'illness', label: 'Doença', cat: 'Prático', desc: 'Ficar doente ou incapacitado' },
              { id: 'aging', label: 'Envelhecer', cat: 'Prático', desc: 'Perder juventude e vitalidade' },
              { id: 'physical-harm', label: 'Violência', cat: 'Prático', desc: 'Ser ferido ou atacado' },
              { id: 'losing-home', label: 'Perder o Lar', cat: 'Prático', desc: 'Não ter onde morar' },
              { id: 'disability', label: 'Deficiência', cat: 'Prático', desc: 'Perder capacidades físicas' },
              { id: 'pain', label: 'Dor', cat: 'Prático', desc: 'Sofrer dor física' },
              { id: 'starvation', label: 'Fome', cat: 'Prático', desc: 'Não ter o que comer' },
              { id: 'homelessness', label: 'Sem-Teto', cat: 'Prático', desc: 'Viver nas ruas' },
              { id: 'accidents', label: 'Acidentes', cat: 'Prático', desc: 'Desastres e acidentes' },
              { id: 'natural-disasters', label: 'Desastres Naturais', cat: 'Prático', desc: 'Terremotos, enchentes, etc.' },
              { id: 'losing-possessions', label: 'Perder Bens', cat: 'Prático', desc: 'Perder posses importantes' },
              { id: 'job-loss', label: 'Perder Emprego', cat: 'Prático', desc: 'Ficar desempregado' },
              { id: 'financial-ruin', label: 'Ruína Financeira', cat: 'Prático', desc: 'Falência total' },
              
              // Moral/Spiritual (12)
              { id: 'being-evil', label: 'Ser Mau', cat: 'Moral', desc: 'Descobrir que é uma pessoa má' },
              { id: 'corruption', label: 'Corrupção', cat: 'Moral', desc: 'Perder seus princípios' },
              { id: 'damnation', label: 'Condenação', cat: 'Moral', desc: 'Punição divina ou karma' },
              { id: 'becoming-like-parent', label: 'Virar os Pais', cat: 'Moral', desc: 'Repetir erros dos pais' },
              { id: 'hurting-others', label: 'Machucar Outros', cat: 'Moral', desc: 'Causar dor a quem ama' },
              { id: 'losing-faith', label: 'Perder a Fé', cat: 'Moral', desc: 'Perder crenças espirituais' },
              { id: 'being-wrong', label: 'Estar Errado', cat: 'Moral', desc: 'Descobrir que estava errado' },
              { id: 'moral-failure', label: 'Falha Moral', cat: 'Moral', desc: 'Não viver seus valores' },
              { id: 'guilt', label: 'Culpa Eterna', cat: 'Moral', desc: 'Carregar culpa para sempre' },
              { id: 'becoming-monster', label: 'Virar Monstro', cat: 'Moral', desc: 'Transformar-se em algo terrível' },
              { id: 'losing-humanity', label: 'Perder Humanidade', cat: 'Moral', desc: 'Perder compaixão e empatia' },
              { id: 'divine-punishment', label: 'Castigo Divino', cat: 'Moral', desc: 'Ser punido por forças superiores' },
              
              // Phobias/Specific (16)
              { id: 'darkness', label: 'Escuridão', cat: 'Fobias', desc: 'Medo do escuro' },
              { id: 'heights', label: 'Alturas', cat: 'Fobias', desc: 'Medo de lugares altos' },
              { id: 'enclosed-spaces', label: 'Espaços Fechados', cat: 'Fobias', desc: 'Claustrofobia' },
              { id: 'open-spaces', label: 'Espaços Abertos', cat: 'Fobias', desc: 'Agorafobia' },
              { id: 'water', label: 'Água', cat: 'Fobias', desc: 'Medo de água/afogamento' },
              { id: 'fire', label: 'Fogo', cat: 'Fobias', desc: 'Medo de incêndios' },
              { id: 'crowds', label: 'Multidões', cat: 'Fobias', desc: 'Medo de muita gente' },
              { id: 'animals', label: 'Animais', cat: 'Fobias', desc: 'Medo de certos animais' },
              { id: 'insects', label: 'Insetos', cat: 'Fobias', desc: 'Medo de insetos' },
              { id: 'blood', label: 'Sangue', cat: 'Fobias', desc: 'Medo de ver sangue' },
              { id: 'needles', label: 'Agulhas', cat: 'Fobias', desc: 'Medo de injeções' },
              { id: 'flying', label: 'Voar', cat: 'Fobias', desc: 'Medo de avião' },
              { id: 'public-speaking', label: 'Falar em Público', cat: 'Fobias', desc: 'Medo de discursos' },
              { id: 'being-watched', label: 'Ser Observado', cat: 'Fobias', desc: 'Medo de estar sendo vigiado' },
              { id: 'germs', label: 'Germes', cat: 'Fobias', desc: 'Medo de contaminação' },
              { id: 'supernatural', label: 'Sobrenatural', cat: 'Fobias', desc: 'Medo de fantasmas, demônios' },
            ];
            
            const selectedFears = data.innerWorld.coreFears || [];
            
            const toggleFear = (fearId) => {
              if (selectedFears.includes(fearId)) {
                update('innerWorld', 'coreFears', selectedFears.filter(f => f !== fearId));
              } else if (selectedFears.length < 4) {
                update('innerWorld', 'coreFears', [...selectedFears, fearId]);
              }
            };
            
            const categories = [...new Set(fearOptions.map(f => f.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedFears.length}/4</span>
                </div>
                
                {selectedFears.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedFears.map(fearId => {
                      const fear = fearOptions.find(f => f.id === fearId);
                      return fear ? (
                        <span
                          key={fearId}
                          onClick={() => toggleFear(fearId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-mono cursor-pointer hover:bg-red-200"
                        >
                          😨 {fear.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {fearOptions.filter(f => f.cat === cat).map(fear => (
                        <button
                          key={fear.id}
                          onClick={() => toggleFear(fear.id)}
                          disabled={!selectedFears.includes(fear.id) && selectedFears.length >= 4}
                          title={fear.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedFears.includes(fear.id)
                              ? 'bg-red-500 text-white'
                              : selectedFears.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer'
                          }`}
                        >
                          {fear.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Custom fear input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Medo personalizado (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customFear || ''}
                    onChange={(e) => update('innerWorld', 'customFear', e.target.value)}
                    placeholder="Descreva um medo específico não listado..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Core Desires - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💫 Desejos Centrais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O que o personagem mais quer na vida, consciente ou inconscientemente. Selecione até 4.
          </p>
          
          {(() => {
            const desireOptions = [
              // Love & Connection (16)
              { id: 'love', label: 'Amor', cat: 'Conexão', desc: 'Ser amado incondicionalmente' },
              { id: 'belonging', label: 'Pertencimento', cat: 'Conexão', desc: 'Fazer parte de algo' },
              { id: 'acceptance', label: 'Aceitação', cat: 'Conexão', desc: 'Ser aceito como é' },
              { id: 'intimacy', label: 'Intimidade', cat: 'Conexão', desc: 'Conexão profunda com outro' },
              { id: 'family', label: 'Família', cat: 'Conexão', desc: 'Ter ou criar uma família' },
              { id: 'friendship', label: 'Amizade', cat: 'Conexão', desc: 'Amigos verdadeiros' },
              { id: 'partnership', label: 'Parceria', cat: 'Conexão', desc: 'Companheiro(a) de vida' },
              { id: 'understanding', label: 'Ser Compreendido', cat: 'Conexão', desc: 'Que outros o entendam' },
              { id: 'community', label: 'Comunidade', cat: 'Conexão', desc: 'Pertencer a um grupo' },
              { id: 'reconciliation', label: 'Reconciliação', cat: 'Conexão', desc: 'Fazer as pazes com alguém' },
              { id: 'reunion', label: 'Reencontro', cat: 'Conexão', desc: 'Reencontrar alguém perdido' },
              { id: 'approval', label: 'Aprovação', cat: 'Conexão', desc: 'Ser aprovado por outros' },
              { id: 'validation', label: 'Validação', cat: 'Conexão', desc: 'Ter sentimentos validados' },
              { id: 'loyalty', label: 'Lealdade', cat: 'Conexão', desc: 'Pessoas leais ao seu lado' },
              { id: 'trust', label: 'Confiança', cat: 'Conexão', desc: 'Poder confiar em alguém' },
              { id: 'soulmate', label: 'Alma Gêmea', cat: 'Conexão', desc: 'Encontrar pessoa perfeita' },
              
              // Achievement & Status (14)
              { id: 'success', label: 'Sucesso', cat: 'Conquista', desc: 'Alcançar grandes objetivos' },
              { id: 'power', label: 'Poder', cat: 'Conquista', desc: 'Influência e controle' },
              { id: 'wealth', label: 'Riqueza', cat: 'Conquista', desc: 'Abundância material' },
              { id: 'fame', label: 'Fama', cat: 'Conquista', desc: 'Ser conhecido e admirado' },
              { id: 'respect', label: 'Respeito', cat: 'Conquista', desc: 'Ser respeitado pelos outros' },
              { id: 'status', label: 'Status', cat: 'Conquista', desc: 'Posição social elevada' },
              { id: 'legacy', label: 'Legado', cat: 'Conquista', desc: 'Deixar marca no mundo' },
              { id: 'mastery', label: 'Maestria', cat: 'Conquista', desc: 'Ser o melhor em algo' },
              { id: 'recognition', label: 'Reconhecimento', cat: 'Conquista', desc: 'Ter trabalho reconhecido' },
              { id: 'influence', label: 'Influência', cat: 'Conquista', desc: 'Impactar decisões e pessoas' },
              { id: 'victory', label: 'Vitória', cat: 'Conquista', desc: 'Vencer competições e desafios' },
              { id: 'dominance', label: 'Dominância', cat: 'Conquista', desc: 'Estar no topo da hierarquia' },
              { id: 'achievement', label: 'Realização', cat: 'Conquista', desc: 'Completar grandes feitos' },
              { id: 'excellence', label: 'Excelência', cat: 'Conquista', desc: 'Ser excelente em tudo' },
              
              // Self & Growth (14)
              { id: 'freedom', label: 'Liberdade', cat: 'Autonomia', desc: 'Viver sem restrições' },
              { id: 'independence', label: 'Independência', cat: 'Autonomia', desc: 'Não depender de ninguém' },
              { id: 'authenticity', label: 'Autenticidade', cat: 'Autonomia', desc: 'Ser verdadeiro consigo' },
              { id: 'self-knowledge', label: 'Autoconhecimento', cat: 'Autonomia', desc: 'Entender a si mesmo' },
              { id: 'growth', label: 'Crescimento', cat: 'Autonomia', desc: 'Evoluir constantemente' },
              { id: 'healing', label: 'Cura', cat: 'Autonomia', desc: 'Superar traumas e dores' },
              { id: 'self-acceptance', label: 'Auto-Aceitação', cat: 'Autonomia', desc: 'Aceitar a si mesmo' },
              { id: 'self-expression', label: 'Auto-Expressão', cat: 'Autonomia', desc: 'Expressar quem é' },
              { id: 'self-improvement', label: 'Auto-Melhoria', cat: 'Autonomia', desc: 'Melhorar constantemente' },
              { id: 'transformation', label: 'Transformação', cat: 'Autonomia', desc: 'Mudar completamente' },
              { id: 'reinvention', label: 'Reinvenção', cat: 'Autonomia', desc: 'Começar de novo' },
              { id: 'empowerment', label: 'Empoderamento', cat: 'Autonomia', desc: 'Sentir-se poderoso' },
              { id: 'confidence', label: 'Autoconfiança', cat: 'Autonomia', desc: 'Confiar em si mesmo' },
              { id: 'wholeness', label: 'Completude', cat: 'Autonomia', desc: 'Sentir-se completo' },
              
              // Purpose & Meaning (14)
              { id: 'purpose', label: 'Propósito', cat: 'Significado', desc: 'Razão para viver' },
              { id: 'meaning', label: 'Sentido', cat: 'Significado', desc: 'Vida com significado' },
              { id: 'justice', label: 'Justiça', cat: 'Significado', desc: 'Ver justiça ser feita' },
              { id: 'truth', label: 'Verdade', cat: 'Significado', desc: 'Conhecer a verdade' },
              { id: 'knowledge', label: 'Conhecimento', cat: 'Significado', desc: 'Saber e entender' },
              { id: 'wisdom', label: 'Sabedoria', cat: 'Significado', desc: 'Compreensão profunda' },
              { id: 'spirituality', label: 'Espiritualidade', cat: 'Significado', desc: 'Conexão com o transcendente' },
              { id: 'enlightenment', label: 'Iluminação', cat: 'Significado', desc: 'Despertar espiritual' },
              { id: 'answers', label: 'Respostas', cat: 'Significado', desc: 'Respostas para grandes perguntas' },
              { id: 'understanding-world', label: 'Entender o Mundo', cat: 'Significado', desc: 'Compreender como tudo funciona' },
              { id: 'contribution', label: 'Contribuição', cat: 'Significado', desc: 'Contribuir para algo maior' },
              { id: 'making-difference', label: 'Fazer Diferença', cat: 'Significado', desc: 'Impactar positivamente' },
              { id: 'calling', label: 'Vocação', cat: 'Significado', desc: 'Encontrar seu chamado' },
              { id: 'destiny', label: 'Destino', cat: 'Significado', desc: 'Cumprir seu destino' },
              
              // Safety & Stability (12)
              { id: 'security', label: 'Segurança', cat: 'Estabilidade', desc: 'Estar protegido' },
              { id: 'stability', label: 'Estabilidade', cat: 'Estabilidade', desc: 'Vida previsível e calma' },
              { id: 'peace', label: 'Paz', cat: 'Estabilidade', desc: 'Tranquilidade interior' },
              { id: 'comfort', label: 'Conforto', cat: 'Estabilidade', desc: 'Vida confortável' },
              { id: 'order', label: 'Ordem', cat: 'Estabilidade', desc: 'Organização e controle' },
              { id: 'home', label: 'Lar', cat: 'Estabilidade', desc: 'Lugar para pertencer' },
              { id: 'routine', label: 'Rotina', cat: 'Estabilidade', desc: 'Previsibilidade diária' },
              { id: 'certainty', label: 'Certeza', cat: 'Estabilidade', desc: 'Saber o que esperar' },
              { id: 'protection', label: 'Proteção', cat: 'Estabilidade', desc: 'Estar protegido de ameaças' },
              { id: 'health', label: 'Saúde', cat: 'Estabilidade', desc: 'Corpo e mente saudáveis' },
              { id: 'normalcy', label: 'Normalidade', cat: 'Estabilidade', desc: 'Vida normal e comum' },
              { id: 'simplicity', label: 'Simplicidade', cat: 'Estabilidade', desc: 'Vida simples e descomplicada' },
              
              // Experience (12)
              { id: 'adventure', label: 'Aventura', cat: 'Experiência', desc: 'Experiências emocionantes' },
              { id: 'pleasure', label: 'Prazer', cat: 'Experiência', desc: 'Desfrutar a vida' },
              { id: 'beauty', label: 'Beleza', cat: 'Experiência', desc: 'Beleza e estética' },
              { id: 'creativity', label: 'Criatividade', cat: 'Experiência', desc: 'Expressar-se criativamente' },
              { id: 'novelty', label: 'Novidade', cat: 'Experiência', desc: 'Coisas novas e diferentes' },
              { id: 'excitement', label: 'Emoção', cat: 'Experiência', desc: 'Adrenalina e emoção' },
              { id: 'fun', label: 'Diversão', cat: 'Experiência', desc: 'Se divertir e brincar' },
              { id: 'travel', label: 'Viajar', cat: 'Experiência', desc: 'Conhecer lugares novos' },
              { id: 'variety', label: 'Variedade', cat: 'Experiência', desc: 'Experiências diversas' },
              { id: 'intensity', label: 'Intensidade', cat: 'Experiência', desc: 'Viver intensamente' },
              { id: 'sensation', label: 'Sensação', cat: 'Experiência', desc: 'Experiências sensoriais' },
              { id: 'exploration', label: 'Exploração', cat: 'Experiência', desc: 'Explorar o desconhecido' },
              
              // Helping/Impact (12)
              { id: 'helping', label: 'Ajudar Outros', cat: 'Impacto', desc: 'Fazer diferença na vida de outros' },
              { id: 'protecting', label: 'Proteger', cat: 'Impacto', desc: 'Proteger quem ama' },
              { id: 'saving', label: 'Salvar', cat: 'Impacto', desc: 'Resgatar ou salvar pessoas' },
              { id: 'changing-world', label: 'Mudar o Mundo', cat: 'Impacto', desc: 'Melhorar o mundo' },
              { id: 'revenge', label: 'Vingança', cat: 'Impacto', desc: 'Fazer justiça pessoal' },
              { id: 'teaching', label: 'Ensinar', cat: 'Impacto', desc: 'Passar conhecimento adiante' },
              { id: 'inspiring', label: 'Inspirar', cat: 'Impacto', desc: 'Inspirar outras pessoas' },
              { id: 'leading', label: 'Liderar', cat: 'Impacto', desc: 'Guiar outros ao sucesso' },
              { id: 'healing-others', label: 'Curar Outros', cat: 'Impacto', desc: 'Ajudar na cura de outros' },
              { id: 'justice-for-others', label: 'Justiça para Outros', cat: 'Impacto', desc: 'Defender os injustiçados' },
              { id: 'sacrifice', label: 'Sacrifício', cat: 'Impacto', desc: 'Dar-se por algo maior' },
              { id: 'martyrdom', label: 'Martírio', cat: 'Impacto', desc: 'Sofrer por uma causa' },
            ];
            
            const selectedDesires = data.innerWorld.coreDesires || [];
            
            const toggleDesire = (desireId) => {
              if (selectedDesires.includes(desireId)) {
                update('innerWorld', 'coreDesires', selectedDesires.filter(d => d !== desireId));
              } else if (selectedDesires.length < 4) {
                update('innerWorld', 'coreDesires', [...selectedDesires, desireId]);
              }
            };
            
            const categories = [...new Set(desireOptions.map(d => d.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedDesires.length}/4</span>
                </div>
                
                {selectedDesires.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedDesires.map(desireId => {
                      const desire = desireOptions.find(d => d.id === desireId);
                      return desire ? (
                        <span
                          key={desireId}
                          onClick={() => toggleDesire(desireId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-mono cursor-pointer hover:bg-amber-200"
                        >
                          💫 {desire.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {desireOptions.filter(d => d.cat === cat).map(desire => (
                        <button
                          key={desire.id}
                          onClick={() => toggleDesire(desire.id)}
                          disabled={!selectedDesires.includes(desire.id) && selectedDesires.length >= 4}
                          title={desire.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedDesires.includes(desire.id)
                              ? 'bg-amber-500 text-white'
                              : selectedDesires.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer'
                          }`}
                        >
                          {desire.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Custom desire input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Desejo personalizado (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customDesire || ''}
                    onChange={(e) => update('innerWorld', 'customDesire', e.target.value)}
                    placeholder="Descreva um desejo específico não listado..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Core Shame - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😔 Vergonhas / Inseguranças Centrais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            As vergonhas mais profundas, aquilo que mais teme que descubram sobre si. Selecione até 4.
          </p>
          
          {(() => {
            const shameOptions = [
              // Appearance (12)
              { id: 'body', label: 'Corpo/Aparência', cat: 'Aparência', desc: 'Vergonha do próprio corpo' },
              { id: 'ugly', label: 'Ser Feio', cat: 'Aparência', desc: 'Não se achar atraente' },
              { id: 'aging', label: 'Idade', cat: 'Aparência', desc: 'Vergonha de envelhecer' },
              { id: 'disability', label: 'Deficiência', cat: 'Aparência', desc: 'Limitação física ou mental' },
              { id: 'scars', label: 'Cicatrizes/Marcas', cat: 'Aparência', desc: 'Marcas no corpo' },
              { id: 'weight', label: 'Peso', cat: 'Aparência', desc: 'Vergonha do peso' },
              { id: 'height', label: 'Altura', cat: 'Aparência', desc: 'Muito alto ou baixo' },
              { id: 'skin', label: 'Pele', cat: 'Aparência', desc: 'Cor, acne, condições de pele' },
              { id: 'hair', label: 'Cabelo', cat: 'Aparência', desc: 'Calvície, tipo de cabelo' },
              { id: 'voice', label: 'Voz', cat: 'Aparência', desc: 'Vergonha da própria voz' },
              { id: 'physical-feature', label: 'Característica Física', cat: 'Aparência', desc: 'Algo específico do corpo' },
              { id: 'aging-body', label: 'Corpo Envelhecendo', cat: 'Aparência', desc: 'Mudanças físicas da idade' },
              
              // Intelligence/Competence (14)
              { id: 'stupid', label: 'Ser Burro', cat: 'Competência', desc: 'Acha que não é inteligente' },
              { id: 'uneducated', label: 'Falta de Estudo', cat: 'Competência', desc: 'Não ter educação formal' },
              { id: 'incompetent', label: 'Incompetência', cat: 'Competência', desc: 'Não ser capaz' },
              { id: 'fraud', label: 'Impostor', cat: 'Competência', desc: 'Síndrome do impostor' },
              { id: 'failure', label: 'Ser Fracassado', cat: 'Competência', desc: 'Não ter conseguido nada' },
              { id: 'poor-decisions', label: 'Más Decisões', cat: 'Competência', desc: 'Histórico de escolhas ruins' },
              { id: 'ignorant', label: 'Ignorância', cat: 'Competência', desc: 'Não saber coisas básicas' },
              { id: 'slow', label: 'Ser Lento', cat: 'Competência', desc: 'Demorar para entender' },
              { id: 'untalented', label: 'Sem Talento', cat: 'Competência', desc: 'Não ter habilidades especiais' },
              { id: 'unsuccessful', label: 'Sem Sucesso', cat: 'Competência', desc: 'Não ter alcançado nada' },
              { id: 'cant-provide', label: 'Não Prover', cat: 'Competência', desc: 'Não conseguir sustentar' },
              { id: 'bad-at-job', label: 'Ruim no Trabalho', cat: 'Competência', desc: 'Performance profissional ruim' },
              { id: 'cant-learn', label: 'Não Aprender', cat: 'Competência', desc: 'Dificuldade de aprendizado' },
              { id: 'wasted-potential', label: 'Potencial Desperdiçado', cat: 'Competência', desc: 'Não usar suas capacidades' },
              
              // Social/Status (14)
              { id: 'poverty', label: 'Pobreza', cat: 'Social', desc: 'Origem ou situação pobre' },
              { id: 'class', label: 'Classe Social', cat: 'Social', desc: 'Origem social "inferior"' },
              { id: 'family-shame', label: 'Família', cat: 'Social', desc: 'Vergonha da própria família' },
              { id: 'unpopular', label: 'Ser Impopular', cat: 'Social', desc: 'Não ser querido/popular' },
              { id: 'weird', label: 'Ser Estranho', cat: 'Social', desc: 'Ser visto como esquisito' },
              { id: 'boring', label: 'Ser Chato', cat: 'Social', desc: 'Não ser interessante' },
              { id: 'no-friends', label: 'Sem Amigos', cat: 'Social', desc: 'Não ter amizades' },
              { id: 'social-anxiety', label: 'Ansiedade Social', cat: 'Social', desc: 'Medo de interações' },
              { id: 'awkwardness', label: 'Ser Desajeitado', cat: 'Social', desc: 'Comportamento social estranho' },
              { id: 'outcast', label: 'Ser Excluído', cat: 'Social', desc: 'Não pertencer a grupos' },
              { id: 'background', label: 'Origem', cat: 'Social', desc: 'De onde veio' },
              { id: 'accent', label: 'Sotaque', cat: 'Social', desc: 'Forma de falar' },
              { id: 'culture', label: 'Cultura', cat: 'Social', desc: 'Vergonha cultural' },
              { id: 'religion', label: 'Religião', cat: 'Social', desc: 'Crenças religiosas' },
              
              // Character (16)
              { id: 'selfish', label: 'Ser Egoísta', cat: 'Caráter', desc: 'Acha que só pensa em si' },
              { id: 'cruel', label: 'Ser Cruel', cat: 'Caráter', desc: 'Potencial para maldade' },
              { id: 'weak', label: 'Ser Fraco', cat: 'Caráter', desc: 'Falta de força ou coragem' },
              { id: 'coward', label: 'Ser Covarde', cat: 'Caráter', desc: 'Não enfrentar desafios' },
              { id: 'bad-person', label: 'Ser Má Pessoa', cat: 'Caráter', desc: 'No fundo ser alguém ruim' },
              { id: 'unlovable', label: 'Não-Amável', cat: 'Caráter', desc: 'Impossível de ser amado' },
              { id: 'toxic', label: 'Ser Tóxico', cat: 'Caráter', desc: 'Fazer mal a quem está perto' },
              { id: 'liar', label: 'Ser Mentiroso', cat: 'Caráter', desc: 'Tendência a mentir' },
              { id: 'manipulative', label: 'Ser Manipulador', cat: 'Caráter', desc: 'Manipula pessoas' },
              { id: 'jealous', label: 'Ser Ciumento', cat: 'Caráter', desc: 'Ciúme excessivo' },
              { id: 'envious', label: 'Ser Invejoso', cat: 'Caráter', desc: 'Inveja dos outros' },
              { id: 'lazy', label: 'Ser Preguiçoso', cat: 'Caráter', desc: 'Falta de iniciativa' },
              { id: 'angry', label: 'Raiva Interna', cat: 'Caráter', desc: 'Raiva que esconde' },
              { id: 'hateful', label: 'Ódio Interno', cat: 'Caráter', desc: 'Ódio que carrega' },
              { id: 'fake', label: 'Ser Falso', cat: 'Caráter', desc: 'Não ser genuíno' },
              { id: 'hypocrite', label: 'Ser Hipócrita', cat: 'Caráter', desc: 'Não pratica o que prega' },
              
              // Past (14)
              { id: 'past-actions', label: 'Ações do Passado', cat: 'Passado', desc: 'Algo terrível que fez' },
              { id: 'abuse-victim', label: 'Ter Sido Vítima', cat: 'Passado', desc: 'Vergonha de ter sofrido abuso' },
              { id: 'addiction', label: 'Vício', cat: 'Passado', desc: 'Histórico de dependência' },
              { id: 'criminal-past', label: 'Passado Criminal', cat: 'Passado', desc: 'Crimes ou prisão' },
              { id: 'secrets', label: 'Segredos', cat: 'Passado', desc: 'Coisas que esconde de todos' },
              { id: 'trauma', label: 'Trauma', cat: 'Passado', desc: 'Experiências traumáticas' },
              { id: 'cheating', label: 'Ter Traído', cat: 'Passado', desc: 'Traições amorosas' },
              { id: 'betrayed-someone', label: 'Ter Traído Alguém', cat: 'Passado', desc: 'Traiu confiança de alguém' },
              { id: 'abandoned-someone', label: 'Abandonou Alguém', cat: 'Passado', desc: 'Deixou alguém que precisava' },
              { id: 'hurt-someone', label: 'Machucou Alguém', cat: 'Passado', desc: 'Causou dor a outros' },
              { id: 'failed-someone', label: 'Falhou com Alguém', cat: 'Passado', desc: 'Não estava lá quando precisaram' },
              { id: 'lost-opportunity', label: 'Oportunidade Perdida', cat: 'Passado', desc: 'Chance que deixou passar' },
              { id: 'past-relationship', label: 'Relacionamento Passado', cat: 'Passado', desc: 'Vergonha de relacionamentos' },
              { id: 'past-self', label: 'Quem Era', cat: 'Passado', desc: 'Vergonha de quem foi' },
              
              // Emotional (12)
              { id: 'needs', label: 'Ter Necessidades', cat: 'Emocional', desc: 'Vergonha de precisar de algo' },
              { id: 'vulnerability', label: 'Vulnerabilidade', cat: 'Emocional', desc: 'Mostrar fraqueza' },
              { id: 'emotions', label: 'Emoções', cat: 'Emocional', desc: 'Sentir emoções intensas' },
              { id: 'desire', label: 'Desejos', cat: 'Emocional', desc: 'Vergonha dos próprios desejos' },
              { id: 'mental-health', label: 'Saúde Mental', cat: 'Emocional', desc: 'Problemas psicológicos' },
              { id: 'crying', label: 'Chorar', cat: 'Emocional', desc: 'Vergonha de chorar' },
              { id: 'fear', label: 'Ter Medo', cat: 'Emocional', desc: 'Vergonha de sentir medo' },
              { id: 'neediness', label: 'Ser Carente', cat: 'Emocional', desc: 'Precisar demais dos outros' },
              { id: 'sensitivity', label: 'Sensibilidade', cat: 'Emocional', desc: 'Ser muito sensível' },
              { id: 'anxiety', label: 'Ansiedade', cat: 'Emocional', desc: 'Sofrer de ansiedade' },
              { id: 'depression', label: 'Depressão', cat: 'Emocional', desc: 'Sofrer de depressão' },
              { id: 'darkness-inside', label: 'Escuridão Interior', cat: 'Emocional', desc: 'Pensamentos sombrios' },
              
              // Sexual/Romantic (12)
              { id: 'sexuality', label: 'Sexualidade', cat: 'Íntimo', desc: 'Orientação ou expressão sexual' },
              { id: 'inexperience', label: 'Inexperiência', cat: 'Íntimo', desc: 'Falta de experiência' },
              { id: 'desires-taboo', label: 'Desejos Tabu', cat: 'Íntimo', desc: 'Desejos "inaceitáveis"' },
              { id: 'romantic-failure', label: 'Fracasso Amoroso', cat: 'Íntimo', desc: 'Histórico de relacionamentos ruins' },
              { id: 'virginity', label: 'Virgindade', cat: 'Íntimo', desc: 'Ainda ser virgem' },
              { id: 'body-intimate', label: 'Corpo na Intimidade', cat: 'Íntimo', desc: 'Vergonha do corpo nu' },
              { id: 'performance', label: 'Performance', cat: 'Íntimo', desc: 'Medo de não satisfazer' },
              { id: 'kinks', label: 'Fetiches', cat: 'Íntimo', desc: 'Desejos não convencionais' },
              { id: 'romantic-history', label: 'Histórico Romântico', cat: 'Íntimo', desc: 'Número de parceiros' },
              { id: 'never-loved', label: 'Nunca Amado', cat: 'Íntimo', desc: 'Nunca teve relacionamento' },
              { id: 'heartbreak', label: 'Coração Partido', cat: 'Íntimo', desc: 'Ter sido devastado' },
              { id: 'romantic-mistakes', label: 'Erros Românticos', cat: 'Íntimo', desc: 'Decisões ruins no amor' },
            ];
            
            const selectedShames = data.innerWorld.coreShame || [];
            
            const toggleShame = (shameId) => {
              if (selectedShames.includes(shameId)) {
                update('innerWorld', 'coreShame', selectedShames.filter(s => s !== shameId));
              } else if (selectedShames.length < 4) {
                update('innerWorld', 'coreShame', [...selectedShames, shameId]);
              }
            };
            
            const categories = [...new Set(shameOptions.map(s => s.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedShames.length}/4</span>
                </div>
                
                {selectedShames.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedShames.map(shameId => {
                      const shame = shameOptions.find(s => s.id === shameId);
                      return shame ? (
                        <span
                          key={shameId}
                          onClick={() => toggleShame(shameId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono cursor-pointer hover:bg-purple-200"
                        >
                          😔 {shame.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {shameOptions.filter(s => s.cat === cat).map(shame => (
                        <button
                          key={shame.id}
                          onClick={() => toggleShame(shame.id)}
                          disabled={!selectedShames.includes(shame.id) && selectedShames.length >= 4}
                          title={shame.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedShames.includes(shame.id)
                              ? 'bg-purple-500 text-white'
                              : selectedShames.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer'
                          }`}
                        >
                          {shame.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Custom shame input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Vergonha personalizada (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customShame || ''}
                    onChange={(e) => update('innerWorld', 'customShame', e.target.value)}
                    placeholder="Descreva uma vergonha específica não listada..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Defense Mechanisms - Multi-select up to 4 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🛡️ Mecanismos de Defesa</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            Como a mente se protege de pensamentos e emoções dolorosas. Selecione até 4.
          </p>
          
          {(() => {
            const defenseOptions = [
              // Primitive (10)
              { id: 'denial', label: 'Negação', cat: 'Primitivo', desc: 'Recusa aceitar a realidade' },
              { id: 'projection', label: 'Projeção', cat: 'Primitivo', desc: 'Atribui seus sentimentos a outros' },
              { id: 'splitting', label: 'Cisão', cat: 'Primitivo', desc: 'Vê tudo como bom ou mau' },
              { id: 'dissociation', label: 'Dissociação', cat: 'Primitivo', desc: 'Desconecta da realidade' },
              { id: 'regression', label: 'Regressão', cat: 'Primitivo', desc: 'Volta a comportamentos infantis' },
              { id: 'acting-out', label: 'Acting Out', cat: 'Primitivo', desc: 'Age ao invés de sentir' },
              { id: 'omnipotence', label: 'Onipotência', cat: 'Primitivo', desc: 'Acredita ter poderes especiais' },
              { id: 'primitive-idealization', label: 'Idealização Primitiva', cat: 'Primitivo', desc: 'Vê outros como perfeitos' },
              { id: 'projective-identification', label: 'Identificação Projetiva', cat: 'Primitivo', desc: 'Força outros a sentir o que sente' },
              { id: 'schizoid-fantasy', label: 'Fantasia Esquizóide', cat: 'Primitivo', desc: 'Retiro para mundo interno' },
              
              // Neurotic (14)
              { id: 'repression', label: 'Repressão', cat: 'Neurótico', desc: 'Empurra para o inconsciente' },
              { id: 'displacement', label: 'Deslocamento', cat: 'Neurótico', desc: 'Direciona a outro alvo' },
              { id: 'intellectualization', label: 'Intelectualização', cat: 'Neurótico', desc: 'Racionaliza para não sentir' },
              { id: 'rationalization', label: 'Racionalização', cat: 'Neurótico', desc: 'Cria explicações aceitáveis' },
              { id: 'reaction-formation', label: 'Formação Reativa', cat: 'Neurótico', desc: 'Age oposto ao que sente' },
              { id: 'undoing', label: 'Anulação', cat: 'Neurótico', desc: 'Tenta reverter ações/pensamentos' },
              { id: 'isolation', label: 'Isolamento Afetivo', cat: 'Neurótico', desc: 'Separa emoção do pensamento' },
              { id: 'controlling', label: 'Controle Excessivo', cat: 'Neurótico', desc: 'Tenta controlar tudo' },
              { id: 'externalization', label: 'Externalização', cat: 'Neurótico', desc: 'Culpa fatores externos' },
              { id: 'inhibition', label: 'Inibição', cat: 'Neurótico', desc: 'Limita funções do ego' },
              { id: 'sexualization', label: 'Sexualização', cat: 'Neurótico', desc: 'Dá conotação sexual a coisas' },
              { id: 'moralization', label: 'Moralização', cat: 'Neurótico', desc: 'Transforma em questão moral' },
              { id: 'turning-against-self', label: 'Volta Contra Si', cat: 'Neurótico', desc: 'Direciona raiva para si' },
              { id: 'reversal', label: 'Reversão', cat: 'Neurótico', desc: 'Transforma em oposto' },
              
              // Mature (10)
              { id: 'humor', label: 'Humor', cat: 'Maduro', desc: 'Usa humor para lidar' },
              { id: 'sublimation', label: 'Sublimação', cat: 'Maduro', desc: 'Canaliza para algo produtivo' },
              { id: 'suppression', label: 'Supressão', cat: 'Maduro', desc: 'Conscientemente adia lidar' },
              { id: 'altruism', label: 'Altruísmo', cat: 'Maduro', desc: 'Ajuda outros para se sentir bem' },
              { id: 'anticipation', label: 'Antecipação', cat: 'Maduro', desc: 'Planeja para futuras dificuldades' },
              { id: 'acceptance', label: 'Aceitação', cat: 'Maduro', desc: 'Aceita a realidade' },
              { id: 'identification', label: 'Identificação', cat: 'Maduro', desc: 'Incorpora qualidades de outros' },
              { id: 'affiliation', label: 'Afiliação', cat: 'Maduro', desc: 'Busca apoio de outros' },
              { id: 'self-observation', label: 'Auto-Observação', cat: 'Maduro', desc: 'Reflete sobre si mesmo' },
              { id: 'self-assertion', label: 'Auto-Afirmação', cat: 'Maduro', desc: 'Expressa sentimentos diretamente' },
              
              // Other common (14)
              { id: 'avoidance', label: 'Evitação', cat: 'Comum', desc: 'Evita situações difíceis' },
              { id: 'compensation', label: 'Compensação', cat: 'Comum', desc: 'Sobressai em outra área' },
              { id: 'fantasy', label: 'Fantasia', cat: 'Comum', desc: 'Escapa para mundo imaginário' },
              { id: 'passive-aggression', label: 'Passivo-Agressivo', cat: 'Comum', desc: 'Hostilidade indireta' },
              { id: 'idealization', label: 'Idealização', cat: 'Comum', desc: 'Vê outros como perfeitos' },
              { id: 'devaluation', label: 'Desvalorização', cat: 'Comum', desc: 'Diminui valor de outros' },
              { id: 'somatization', label: 'Somatização', cat: 'Comum', desc: 'Converte em sintomas físicos' },
              { id: 'compartmentalization', label: 'Compartimentalização', cat: 'Comum', desc: 'Separa partes da vida' },
              { id: 'minimization', label: 'Minimização', cat: 'Comum', desc: 'Diminui importância de algo' },
              { id: 'exaggeration', label: 'Exagero', cat: 'Comum', desc: 'Amplifica situações' },
              { id: 'distancing', label: 'Distanciamento', cat: 'Comum', desc: 'Se afasta emocionalmente' },
              { id: 'withdrawal', label: 'Retirada', cat: 'Comum', desc: 'Se retira de situações' },
              { id: 'help-rejecting', label: 'Rejeitar Ajuda', cat: 'Comum', desc: 'Pede ajuda mas rejeita' },
              { id: 'autistic-fantasy', label: 'Devaneio Excessivo', cat: 'Comum', desc: 'Vive em fantasia' },
            ];
            
            const selectedDefenses = data.innerWorld.defenseMechanisms || [];
            
            const toggleDefense = (defenseId) => {
              if (selectedDefenses.includes(defenseId)) {
                update('innerWorld', 'defenseMechanisms', selectedDefenses.filter(d => d !== defenseId));
              } else if (selectedDefenses.length < 4) {
                update('innerWorld', 'defenseMechanisms', [...selectedDefenses, defenseId]);
              }
            };
            
            const categories = [...new Set(defenseOptions.map(d => d.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedDefenses.length}/4</span>
                </div>
                
                {selectedDefenses.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedDefenses.map(defenseId => {
                      const defense = defenseOptions.find(d => d.id === defenseId);
                      const isPrimitive = defense?.cat === 'Primitivo';
                      const isMature = defense?.cat === 'Maduro';
                      return defense ? (
                        <span
                          key={defenseId}
                          onClick={() => toggleDefense(defenseId)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono cursor-pointer hover:opacity-75 ${
                            isPrimitive ? 'bg-red-100 text-red-800' :
                            isMature ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          🛡️ {defense.label} <span className="text-[10px]">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className={`font-mono text-[10px] uppercase mb-1 ${
                      cat === 'Primitivo' ? 'text-red-600' :
                      cat === 'Maduro' ? 'text-green-600' :
                      cat === 'Neurótico' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {defenseOptions.filter(d => d.cat === cat).map(defense => (
                        <button
                          key={defense.id}
                          onClick={() => toggleDefense(defense.id)}
                          disabled={!selectedDefenses.includes(defense.id) && selectedDefenses.length >= 4}
                          title={defense.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedDefenses.includes(defense.id)
                              ? cat === 'Primitivo' ? 'bg-red-500 text-white' :
                                cat === 'Maduro' ? 'bg-green-500 text-white' :
                                cat === 'Neurótico' ? 'bg-orange-500 text-white' :
                                'bg-blue-500 text-white'
                              : selectedDefenses.length >= 4
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : cat === 'Primitivo' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                cat === 'Maduro' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                                cat === 'Neurótico' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' :
                                'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          } cursor-pointer`}
                        >
                          {defense.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <p className="font-mono text-[10px] text-gray-500 mt-2 italic">
                  💡 <span className="text-red-600">Primitivos</span> = menos saudáveis | 
                  <span className="text-orange-600"> Neuróticos</span> = moderados | 
                  <span className="text-green-600"> Maduros</span> = mais saudáveis
                </p>
                
                {/* Custom defense input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Mecanismo personalizado (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customDefense || ''}
                    onChange={(e) => update('innerWorld', 'customDefense', e.target.value)}
                    placeholder="Descreva um mecanismo de defesa específico..."
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Inner Critic Voice - Multi-select up to 5 */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👤 Voz do Crítico Interior</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">
            O que a voz negativa interna diz constantemente. Selecione até 5 frases principais.
          </p>
          
          {(() => {
            const criticOptions = [
              // Inadequacy (12)
              { id: 'not-good-enough', label: '"Você não é bom o suficiente"', cat: 'Inadequação', desc: 'Nunca atinge o padrão' },
              { id: 'not-smart', label: '"Você é burro"', cat: 'Inadequação', desc: 'Não é inteligente' },
              { id: 'not-talented', label: '"Você não tem talento"', cat: 'Inadequação', desc: 'Sem habilidades especiais' },
              { id: 'not-trying', label: '"Você não se esforça"', cat: 'Inadequação', desc: 'Preguiçoso, sem dedicação' },
              { id: 'mediocre', label: '"Você é medíocre"', cat: 'Inadequação', desc: 'Comum, sem destaque' },
              { id: 'failure', label: '"Você é um fracasso"', cat: 'Inadequação', desc: 'Não consegue nada' },
              { id: 'not-capable', label: '"Você não é capaz"', cat: 'Inadequação', desc: 'Incapaz de fazer' },
              { id: 'cant-do-anything', label: '"Você não faz nada direito"', cat: 'Inadequação', desc: 'Tudo que faz é errado' },
              { id: 'never-succeed', label: '"Você nunca vai conseguir"', cat: 'Inadequação', desc: 'Destinado a falhar' },
              { id: 'not-as-good', label: '"Outros são melhores que você"', cat: 'Inadequação', desc: 'Sempre inferior' },
              { id: 'disappointing', label: '"Você é uma decepção"', cat: 'Inadequação', desc: 'Decepciona a todos' },
              { id: 'pathetic', label: '"Você é patético"', cat: 'Inadequação', desc: 'Digno de pena' },
              
              // Unlovability (12)
              { id: 'unlovable', label: '"Ninguém te ama de verdade"', cat: 'Amor', desc: 'Impossível ser amado' },
              { id: 'burden', label: '"Você é um fardo"', cat: 'Amor', desc: 'Atrapalha os outros' },
              { id: 'alone', label: '"Você vai morrer sozinho"', cat: 'Amor', desc: 'Destinado à solidão' },
              { id: 'too-much', label: '"Você é demais"', cat: 'Amor', desc: 'Intenso demais, cansativo' },
              { id: 'not-enough', label: '"Você não é suficiente"', cat: 'Amor', desc: 'Não satisfaz ninguém' },
              { id: 'abandoned', label: '"Todos vão te abandonar"', cat: 'Amor', desc: 'Sempre será deixado' },
              { id: 'dont-deserve-love', label: '"Você não merece amor"', cat: 'Amor', desc: 'Não merece ser amado' },
              { id: 'no-one-cares', label: '"Ninguém se importa com você"', cat: 'Amor', desc: 'Ignorado por todos' },
              { id: 'better-without-you', label: '"Estariam melhor sem você"', cat: 'Amor', desc: 'Atrapalha a vida dos outros' },
              { id: 'annoying', label: '"Você é irritante"', cat: 'Amor', desc: 'Incomoda as pessoas' },
              { id: 'unwanted', label: '"Ninguém te quer"', cat: 'Amor', desc: 'Não é desejado' },
              { id: 'replaceable', label: '"Você é substituível"', cat: 'Amor', desc: 'Qualquer um serve no seu lugar' },
              
              // Shame (12)
              { id: 'disgusting', label: '"Você é nojento"', cat: 'Vergonha', desc: 'Algo repulsivo em si' },
              { id: 'shameful', label: '"Você deveria ter vergonha"', cat: 'Vergonha', desc: 'Deveria se envergonhar' },
              { id: 'fraud', label: '"Você é uma fraude"', cat: 'Vergonha', desc: 'Enganando todo mundo' },
              { id: 'wrong', label: '"Tem algo errado com você"', cat: 'Vergonha', desc: 'Fundamentalmente defeituoso' },
              { id: 'broken', label: '"Você é quebrado"', cat: 'Vergonha', desc: 'Danificado, irreparável' },
              { id: 'dirty', label: '"Você é sujo"', cat: 'Vergonha', desc: 'Impuro, manchado' },
              { id: 'defective', label: '"Você é defeituoso"', cat: 'Vergonha', desc: 'Nasceu com problema' },
              { id: 'ugly-inside', label: '"Você é feio por dentro"', cat: 'Vergonha', desc: 'Alma feia' },
              { id: 'monster', label: '"Você é um monstro"', cat: 'Vergonha', desc: 'Pessoa terrível' },
              { id: 'secret-self', label: '"Se soubessem quem você é..."', cat: 'Vergonha', desc: 'O eu escondido é horrível' },
              { id: 'pretending', label: '"Você está fingindo"', cat: 'Vergonha', desc: 'Não é quem parece' },
              { id: 'dont-belong', label: '"Você não pertence aqui"', cat: 'Vergonha', desc: 'Intruso, não pertence' },
              
              // Worthlessness (10)
              { id: 'worthless', label: '"Você não vale nada"', cat: 'Valor', desc: 'Sem nenhum valor' },
              { id: 'useless', label: '"Você é inútil"', cat: 'Valor', desc: 'Não serve para nada' },
              { id: 'waste', label: '"Você é um desperdício"', cat: 'Valor', desc: 'Desperdiçando potencial/vida' },
              { id: 'invisible', label: '"Ninguém te nota"', cat: 'Valor', desc: 'Invisível, ignorado' },
              { id: 'matter', label: '"Você não importa"', cat: 'Valor', desc: 'Sem significância' },
              { id: 'pointless', label: '"Sua existência é inútil"', cat: 'Valor', desc: 'Não há razão para existir' },
              { id: 'contribute-nothing', label: '"Você não contribui com nada"', cat: 'Valor', desc: 'Sem contribuição' },
              { id: 'take-space', label: '"Você só ocupa espaço"', cat: 'Valor', desc: 'Apenas existe, sem propósito' },
              { id: 'no-impact', label: '"Nada mudaria sem você"', cat: 'Valor', desc: 'Sem impacto no mundo' },
              { id: 'forgettable', label: '"Você é esquecível"', cat: 'Valor', desc: 'Ninguém vai lembrar' },
              
              // Self-blame (10)
              { id: 'your-fault', label: '"É tudo culpa sua"', cat: 'Culpa', desc: 'Responsável por tudo de ruim' },
              { id: 'deserve-bad', label: '"Você merece coisas ruins"', cat: 'Culpa', desc: 'Merece sofrer' },
              { id: 'ruined', label: '"Você estragou tudo"', cat: 'Culpa', desc: 'Arruina tudo que toca' },
              { id: 'selfish', label: '"Você só pensa em si"', cat: 'Culpa', desc: 'Egoísta demais' },
              { id: 'hurt-everyone', label: '"Você machuca quem ama"', cat: 'Culpa', desc: 'Tóxico para outros' },
              { id: 'caused-this', label: '"Você causou isso"', cat: 'Culpa', desc: 'Responsável pelo problema' },
              { id: 'should-have', label: '"Você deveria ter feito diferente"', cat: 'Culpa', desc: 'Sempre escolhe errado' },
              { id: 'punishment', label: '"Você merece ser punido"', cat: 'Culpa', desc: 'Merece castigo' },
              { id: 'blame', label: '"A culpa é sua"', cat: 'Culpa', desc: 'Culpado por tudo' },
              { id: 'destroyed', label: '"Você destruiu tudo"', cat: 'Culpa', desc: 'Destruidor' },
              
              // Fear (12)
              { id: 'cant-handle', label: '"Você não vai aguentar"', cat: 'Medo', desc: 'Vai desmoronar' },
              { id: 'too-weak', label: '"Você é fraco demais"', cat: 'Medo', desc: 'Sem força para enfrentar' },
              { id: 'fail-again', label: '"Você vai falhar de novo"', cat: 'Medo', desc: 'História se repetindo' },
              { id: 'exposed', label: '"Vão descobrir quem você é"', cat: 'Medo', desc: 'A máscara vai cair' },
              { id: 'too-late', label: '"É tarde demais"', cat: 'Medo', desc: 'Perdeu a chance' },
              { id: 'never-change', label: '"Você nunca vai mudar"', cat: 'Medo', desc: 'Preso para sempre' },
              { id: 'cant-escape', label: '"Você não pode escapar"', cat: 'Medo', desc: 'Sem saída' },
              { id: 'something-bad', label: '"Algo ruim vai acontecer"', cat: 'Medo', desc: 'Desastre iminente' },
              { id: 'lose-everything', label: '"Você vai perder tudo"', cat: 'Medo', desc: 'Perda total' },
              { id: 'not-safe', label: '"Você não está seguro"', cat: 'Medo', desc: 'Perigo constante' },
              { id: 'time-running-out', label: '"O tempo está acabando"', cat: 'Medo', desc: 'Urgência constante' },
              { id: 'doomed', label: '"Você está condenado"', cat: 'Medo', desc: 'Destino selado' },
            ];
            
            const selectedCritic = data.innerWorld.innerCriticVoice || [];
            
            const toggleCritic = (criticId) => {
              if (selectedCritic.includes(criticId)) {
                update('innerWorld', 'innerCriticVoice', selectedCritic.filter(c => c !== criticId));
              } else if (selectedCritic.length < 5) {
                update('innerWorld', 'innerCriticVoice', [...selectedCritic, criticId]);
              }
            };
            
            const categories = [...new Set(criticOptions.map(c => c.cat))];
            
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">Selecionados: {selectedCritic.length}/5</span>
                </div>
                
                {selectedCritic.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedCritic.map(criticId => {
                      const critic = criticOptions.find(c => c.id === criticId);
                      return critic ? (
                        <span
                          key={criticId}
                          onClick={() => toggleCritic(criticId)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono cursor-pointer hover:bg-slate-300 italic"
                        >
                          {critic.label} <span className="text-[10px] not-italic">×</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {categories.map(cat => (
                  <div key={cat} className="mb-2">
                    <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                    <div className="flex flex-wrap gap-1">
                      {criticOptions.filter(c => c.cat === cat).map(critic => (
                        <button
                          key={critic.id}
                          onClick={() => toggleCritic(critic.id)}
                          disabled={!selectedCritic.includes(critic.id) && selectedCritic.length >= 5}
                          title={critic.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all italic ${
                            selectedCritic.includes(critic.id)
                              ? 'bg-slate-700 text-white'
                              : selectedCritic.length >= 5
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer'
                          }`}
                        >
                          {critic.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Custom critic input */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Voz personalizada (opcional):</label>
                  <input
                    type="text"
                    value={data.innerWorld.customCritic || ''}
                    onChange={(e) => update('innerWorld', 'customCritic', e.target.value)}
                    placeholder='Ex: "Você nunca será como seu irmão"'
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs italic"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    ),
    4: ( // Mental Health
      <div className="space-y-6">
        {/* Header Explanation */}
        <div className="bg-teal-50 border border-teal-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-teal-900 mb-2">🧠 SAÚDE MENTAL (Opcional)</h3>
          <p className="font-mono text-xs text-teal-800 leading-relaxed">
            Transtornos, tratamentos e medicações do personagem. <strong>Esta seção é completamente opcional</strong> e 
            deve ser usada com sensibilidade. Códigos CID-10 incluídos para precisão clínica.
          </p>
        </div>

        {/* Toggle for enabling mental health section */}
        <div className="border border-gray-200 rounded-sm p-4 bg-gray-50">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.mentalHealth.hasMentalHealthHistory || false}
              onChange={(e) => update('mentalHealth', 'hasMentalHealthHistory', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="font-mono text-sm text-gray-700">
              Este personagem tem histórico de saúde mental relevante para a narrativa
            </span>
          </label>
        </div>

        {data.mentalHealth.hasMentalHealthHistory && (
          <>
            {/* Diagnosed Conditions - Multi-select with CID */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📋 Condições Diagnosticadas</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Diagnósticos oficiais com código CID-10. Selecione até 3.
              </p>
              
              {(() => {
                const conditionOptions = [
                  // Mood Disorders F30-F39
                  { id: 'f32', cid: 'F32', label: 'Episódio Depressivo', cat: 'Transtornos do Humor', desc: 'Depressão maior, episódio único' },
                  { id: 'f33', cid: 'F33', label: 'Transtorno Depressivo Recorrente', cat: 'Transtornos do Humor', desc: 'Depressão com múltiplos episódios' },
                  { id: 'f34.1', cid: 'F34.1', label: 'Distimia', cat: 'Transtornos do Humor', desc: 'Depressão crônica de baixa intensidade' },
                  { id: 'f31', cid: 'F31', label: 'Transtorno Afetivo Bipolar', cat: 'Transtornos do Humor', desc: 'Oscilação entre mania e depressão' },
                  { id: 'f30', cid: 'F30', label: 'Episódio Maníaco', cat: 'Transtornos do Humor', desc: 'Mania isolada' },
                  { id: 'f34.0', cid: 'F34.0', label: 'Ciclotimia', cat: 'Transtornos do Humor', desc: 'Oscilações de humor menos intensas' },
                  
                  // Anxiety Disorders F40-F48
                  { id: 'f41.1', cid: 'F41.1', label: 'Transtorno de Ansiedade Generalizada', cat: 'Transtornos de Ansiedade', desc: 'Preocupação excessiva constante' },
                  { id: 'f41.0', cid: 'F41.0', label: 'Transtorno de Pânico', cat: 'Transtornos de Ansiedade', desc: 'Ataques de pânico recorrentes' },
                  { id: 'f40.1', cid: 'F40.1', label: 'Fobia Social', cat: 'Transtornos de Ansiedade', desc: 'Medo intenso de situações sociais' },
                  { id: 'f40.2', cid: 'F40.2', label: 'Fobias Específicas', cat: 'Transtornos de Ansiedade', desc: 'Medo intenso de objetos/situações específicas' },
                  { id: 'f40.0', cid: 'F40.0', label: 'Agorafobia', cat: 'Transtornos de Ansiedade', desc: 'Medo de espaços abertos/multidões' },
                  { id: 'f42', cid: 'F42', label: 'Transtorno Obsessivo-Compulsivo (TOC)', cat: 'Transtornos de Ansiedade', desc: 'Obsessões e compulsões' },
                  { id: 'f43.1', cid: 'F43.1', label: 'TEPT', cat: 'Transtornos de Ansiedade', desc: 'Transtorno de Estresse Pós-Traumático' },
                  { id: 'f43.2', cid: 'F43.2', label: 'Transtorno de Ajustamento', cat: 'Transtornos de Ansiedade', desc: 'Reação a estresse/mudança de vida' },
                  
                  // Psychotic Disorders F20-F29
                  { id: 'f20', cid: 'F20', label: 'Esquizofrenia', cat: 'Transtornos Psicóticos', desc: 'Alucinações, delírios, desorganização' },
                  { id: 'f25', cid: 'F25', label: 'Transtorno Esquizoafetivo', cat: 'Transtornos Psicóticos', desc: 'Sintomas de esquizofrenia + humor' },
                  { id: 'f22', cid: 'F22', label: 'Transtorno Delirante', cat: 'Transtornos Psicóticos', desc: 'Delírios persistentes sem outros sintomas' },
                  { id: 'f23', cid: 'F23', label: 'Transtorno Psicótico Breve', cat: 'Transtornos Psicóticos', desc: 'Episódio psicótico de curta duração' },
                  
                  // Personality Disorders F60-F69
                  { id: 'f60.3', cid: 'F60.3', label: 'Transtorno de Personalidade Borderline', cat: 'Transtornos de Personalidade', desc: 'Instabilidade emocional, impulsividade' },
                  { id: 'f60.2', cid: 'F60.2', label: 'Transtorno de Personalidade Antissocial', cat: 'Transtornos de Personalidade', desc: 'Desrespeito por normas e direitos' },
                  { id: 'f60.81', cid: 'F60.81', label: 'Transtorno de Personalidade Narcisista', cat: 'Transtornos de Personalidade', desc: 'Grandiosidade, necessidade de admiração' },
                  { id: 'f60.4', cid: 'F60.4', label: 'Transtorno de Personalidade Histriônica', cat: 'Transtornos de Personalidade', desc: 'Emotividade excessiva, busca de atenção' },
                  { id: 'f60.6', cid: 'F60.6', label: 'Transtorno de Personalidade Evitativa', cat: 'Transtornos de Personalidade', desc: 'Inibição social, sentimentos de inadequação' },
                  { id: 'f60.7', cid: 'F60.7', label: 'Transtorno de Personalidade Dependente', cat: 'Transtornos de Personalidade', desc: 'Necessidade excessiva de cuidado' },
                  { id: 'f60.5', cid: 'F60.5', label: 'Transtorno de Personalidade Obsessiva', cat: 'Transtornos de Personalidade', desc: 'Perfeccionismo, rigidez' },
                  { id: 'f60.0', cid: 'F60.0', label: 'Transtorno de Personalidade Paranoide', cat: 'Transtornos de Personalidade', desc: 'Desconfiança e suspeita' },
                  { id: 'f60.1', cid: 'F60.1', label: 'Transtorno de Personalidade Esquizoide', cat: 'Transtornos de Personalidade', desc: 'Distanciamento social, afeto restrito' },
                  { id: 'f21', cid: 'F21', label: 'Transtorno de Personalidade Esquizotípica', cat: 'Transtornos de Personalidade', desc: 'Excentricidade, pensamento mágico' },
                  
                  // Eating Disorders F50
                  { id: 'f50.0', cid: 'F50.0', label: 'Anorexia Nervosa', cat: 'Transtornos Alimentares', desc: 'Restrição alimentar, medo de engordar' },
                  { id: 'f50.2', cid: 'F50.2', label: 'Bulimia Nervosa', cat: 'Transtornos Alimentares', desc: 'Compulsão alimentar + purgação' },
                  { id: 'f50.8', cid: 'F50.8', label: 'Transtorno de Compulsão Alimentar', cat: 'Transtornos Alimentares', desc: 'Compulsão sem purgação' },
                  
                  // Substance Use F10-F19
                  { id: 'f10', cid: 'F10', label: 'Transtorno por Uso de Álcool', cat: 'Transtornos por Substâncias', desc: 'Dependência ou abuso de álcool' },
                  { id: 'f11', cid: 'F11', label: 'Transtorno por Uso de Opioides', cat: 'Transtornos por Substâncias', desc: 'Dependência de opioides' },
                  { id: 'f12', cid: 'F12', label: 'Transtorno por Uso de Cannabis', cat: 'Transtornos por Substâncias', desc: 'Dependência de maconha' },
                  { id: 'f14', cid: 'F14', label: 'Transtorno por Uso de Cocaína', cat: 'Transtornos por Substâncias', desc: 'Dependência de cocaína/crack' },
                  { id: 'f15', cid: 'F15', label: 'Transtorno por Uso de Estimulantes', cat: 'Transtornos por Substâncias', desc: 'Anfetaminas, metanfetaminas' },
                  { id: 'f17', cid: 'F17', label: 'Transtorno por Uso de Tabaco', cat: 'Transtornos por Substâncias', desc: 'Dependência de nicotina' },
                  { id: 'f19', cid: 'F19', label: 'Transtorno por Múltiplas Substâncias', cat: 'Transtornos por Substâncias', desc: 'Poliusuário' },
                  
                  // Neurodevelopmental F80-F89, F90-F98
                  { id: 'f90', cid: 'F90', label: 'TDAH', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Déficit de Atenção e Hiperatividade' },
                  { id: 'f84.0', cid: 'F84.0', label: 'Transtorno do Espectro Autista', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Autismo, dificuldades sociais e comunicação' },
                  { id: 'f81', cid: 'F81', label: 'Transtornos de Aprendizagem', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Dislexia, discalculia' },
                  { id: 'f95', cid: 'F95', label: 'Transtorno de Tiques / Tourette', cat: 'Transtornos do Neurodesenvolvimento', desc: 'Tiques motores e vocais' },
                  
                  // Other
                  { id: 'f44', cid: 'F44', label: 'Transtorno Dissociativo', cat: 'Outros', desc: 'Dissociação, amnésia dissociativa' },
                  { id: 'f44.81', cid: 'F44.81', label: 'Transtorno Dissociativo de Identidade', cat: 'Outros', desc: 'Múltiplas personalidades' },
                  { id: 'f45', cid: 'F45', label: 'Transtorno Somatoforme', cat: 'Outros', desc: 'Sintomas físicos sem causa médica' },
                  { id: 'f51', cid: 'F51', label: 'Transtornos do Sono', cat: 'Outros', desc: 'Insônia, hipersonia, parassonias' },
                  { id: 'f63', cid: 'F63', label: 'Transtornos de Controle de Impulsos', cat: 'Outros', desc: 'Cleptomania, piromania, jogo patológico' },
                  { id: 'f64', cid: 'F64', label: 'Disforia de Gênero', cat: 'Outros', desc: 'Incongruência de gênero' },
                ];
                
                const selectedConditions = data.mentalHealth.diagnosedConditions || [];
                
                const toggleCondition = (conditionId) => {
                  if (selectedConditions.includes(conditionId)) {
                    update('mentalHealth', 'diagnosedConditions', selectedConditions.filter(c => c !== conditionId));
                  } else if (selectedConditions.length < 3) {
                    update('mentalHealth', 'diagnosedConditions', [...selectedConditions, conditionId]);
                  }
                };
                
                const categories = [...new Set(conditionOptions.map(c => c.cat))];
                
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">Selecionados: {selectedConditions.length}/3</span>
                    </div>
                    
                    {selectedConditions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedConditions.map(conditionId => {
                          const condition = conditionOptions.find(c => c.id === conditionId);
                          return condition ? (
                            <span
                              key={conditionId}
                              onClick={() => toggleCondition(conditionId)}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-mono cursor-pointer hover:bg-teal-200"
                            >
                              <span className="text-[9px] bg-teal-200 px-1 rounded">{condition.cid}</span> {condition.label} <span className="text-[10px]">×</span>
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                    
                    {categories.map(cat => (
                      <div key={cat} className="mb-2">
                        <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                        <div className="flex flex-wrap gap-1">
                          {conditionOptions.filter(c => c.cat === cat).map(condition => (
                            <button
                              key={condition.id}
                              onClick={() => toggleCondition(condition.id)}
                              disabled={!selectedConditions.includes(condition.id) && selectedConditions.length >= 3}
                              title={`${condition.cid}: ${condition.desc}`}
                              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                selectedConditions.includes(condition.id)
                                  ? 'bg-teal-500 text-white'
                                  : selectedConditions.length >= 3
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100 cursor-pointer'
                              }`}
                            >
                              <span className="text-[9px] opacity-75">{condition.cid}</span> {condition.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Custom condition */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <label className="font-mono text-[10px] text-gray-500 mb-1 block">📝 Condição personalizada (opcional):</label>
                      <input
                        type="text"
                        value={data.mentalHealth.customCondition || ''}
                        onChange={(e) => update('mentalHealth', 'customCondition', e.target.value)}
                        placeholder="Descreva uma condição específica..."
                        className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Undiagnosed Tendencies */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">❓ Tendências Não-Diagnosticadas</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Padrões comportamentais ou emocionais que o personagem demonstra, mas nunca foram formalmente diagnosticados. Selecione até 3.
              </p>
              
              {(() => {
                const tendencyOptions = [
                  { id: 'depressive', label: 'Tendências Depressivas', desc: 'Humor baixo recorrente, sem diagnóstico formal' },
                  { id: 'anxious', label: 'Tendências Ansiosas', desc: 'Preocupação excessiva, nervosismo' },
                  { id: 'obsessive', label: 'Tendências Obsessivas', desc: 'Pensamentos repetitivos, rituais' },
                  { id: 'paranoid', label: 'Tendências Paranoides', desc: 'Desconfiança, suspeita excessiva' },
                  { id: 'narcissistic', label: 'Traços Narcisistas', desc: 'Grandiosidade, necessidade de admiração' },
                  { id: 'borderline', label: 'Traços Borderline', desc: 'Instabilidade emocional, medo de abandono' },
                  { id: 'avoidant', label: 'Traços Evitativos', desc: 'Evitação social, medo de rejeição' },
                  { id: 'dependent', label: 'Traços Dependentes', desc: 'Dificuldade em tomar decisões sozinho' },
                  { id: 'histrionic', label: 'Traços Histriônicos', desc: 'Dramaticidade, busca de atenção' },
                  { id: 'antisocial', label: 'Traços Antissociais', desc: 'Desrespeito por regras, falta de remorso' },
                  { id: 'schizoid', label: 'Traços Esquizoides', desc: 'Preferência por solidão, afeto restrito' },
                  { id: 'adhd', label: 'Traços de TDAH', desc: 'Desatenção, impulsividade' },
                  { id: 'autism', label: 'Traços Autísticos', desc: 'Dificuldades sociais sutis, interesses específicos' },
                  { id: 'trauma', label: 'Trauma Não Processado', desc: 'Sintomas de TEPT sem diagnóstico' },
                  { id: 'dissociative', label: 'Tendências Dissociativas', desc: 'Episódios de desconexão da realidade' },
                  { id: 'eating', label: 'Relação Difícil com Comida', desc: 'Padrões alimentares problemáticos' },
                  { id: 'addiction', label: 'Comportamentos Aditivos', desc: 'Vícios não-substâncias (jogo, compras, sexo)' },
                  { id: 'self-harm', label: 'Histórico de Autolesão', desc: 'Comportamentos autolesivos passados' },
                  { id: 'suicidal', label: 'Ideação Suicida Prévia', desc: 'Pensamentos suicidas no passado' },
                ];
                
                const selectedTendencies = data.mentalHealth.undiagnosedTendencies || [];
                
                const toggleTendency = (tendencyId) => {
                  if (selectedTendencies.includes(tendencyId)) {
                    update('mentalHealth', 'undiagnosedTendencies', selectedTendencies.filter(t => t !== tendencyId));
                  } else if (selectedTendencies.length < 3) {
                    update('mentalHealth', 'undiagnosedTendencies', [...selectedTendencies, tendencyId]);
                  }
                };
                
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">Selecionados: {selectedTendencies.length}/3</span>
                    </div>
                    
                    {selectedTendencies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedTendencies.map(tendencyId => {
                          const tendency = tendencyOptions.find(t => t.id === tendencyId);
                          return tendency ? (
                            <span
                              key={tendencyId}
                              onClick={() => toggleTendency(tendencyId)}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-mono cursor-pointer hover:bg-amber-200"
                            >
                              ❓ {tendency.label} <span className="text-[10px]">×</span>
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {tendencyOptions.map(tendency => (
                        <button
                          key={tendency.id}
                          onClick={() => toggleTendency(tendency.id)}
                          disabled={!selectedTendencies.includes(tendency.id) && selectedTendencies.length >= 3}
                          title={tendency.desc}
                          className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                            selectedTendencies.includes(tendency.id)
                              ? 'bg-amber-500 text-white'
                              : selectedTendencies.length >= 3
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer'
                          }`}
                        >
                          {tendency.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Therapy History */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🛋️ Histórico de Terapia</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Experiência do personagem com tratamento psicológico/psiquiátrico.
              </p>
              
              {/* Therapy Status */}
              <div className="mb-4">
                <label className="font-mono text-[10px] text-gray-500 mb-1 block">Status atual:</label>
                <select
                  value={data.mentalHealth.therapyStatus || ''}
                  onChange={(e) => update('mentalHealth', 'therapyStatus', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="never">Nunca fez terapia</option>
                  <option value="considering">Considerando começar</option>
                  <option value="tried-quit">Tentou mas desistiu</option>
                  <option value="past">Fez no passado, não faz mais</option>
                  <option value="current">Em terapia atualmente</option>
                  <option value="longtime">Em terapia há anos</option>
                  <option value="resistant">Resistente/Recusa tratamento</option>
                  <option value="forced">Forçado/Obrigatório (judicial, família)</option>
                </select>
              </div>
              
              {/* Therapy Type */}
              {(data.mentalHealth.therapyStatus === 'current' || data.mentalHealth.therapyStatus === 'longtime' || data.mentalHealth.therapyStatus === 'past') && (
                <div className="mb-4">
                  <label className="font-mono text-[10px] text-gray-500 mb-1 block">Abordagem terapêutica:</label>
                  <select
                    value={data.mentalHealth.therapyType || ''}
                    onChange={(e) => update('mentalHealth', 'therapyType', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                  >
                    <option value="">-- Selecione --</option>
                    <optgroup label="Abordagens Principais">
                      <option value="tcc">TCC — Terapia Cognitivo-Comportamental (foco em pensamentos/comportamentos)</option>
                      <option value="psychoanalysis">Psicanálise — Freudiana (foco no inconsciente, longo prazo)</option>
                      <option value="jungian">Junguiana — Psicologia Analítica (arquétipos, sonhos)</option>
                      <option value="humanist">Humanista/Rogeriana — Centrada na pessoa (autoatualização)</option>
                      <option value="gestalt">Gestalt-Terapia — Aqui e agora (experiência presente)</option>
                      <option value="behavioral">Comportamental — Behaviorismo (modificação de comportamento)</option>
                      <option value="systemic">Sistêmica — Terapia familiar (relações e sistemas)</option>
                    </optgroup>
                    <optgroup label="Outras Abordagens">
                      <option value="psychodrama">Psicodrama — Dramatização e encenação</option>
                      <option value="existential">Existencial-Fenomenológica — Sentido da vida</option>
                      <option value="dbt">DBT — Terapia Dialética (regulação emocional)</option>
                      <option value="emdr">EMDR — Dessensibilização por movimentos oculares (trauma)</option>
                      <option value="act">ACT — Terapia de Aceitação e Compromisso</option>
                      <option value="art">Arteterapia — Expressão criativa</option>
                      <option value="group">Terapia de Grupo</option>
                      <option value="couples">Terapia de Casal</option>
                      <option value="unknown">Não sabe/Genérica</option>
                    </optgroup>
                  </select>
                </div>
              )}
              
              {/* Relationship with Therapy */}
              <div className="mb-4">
                <label className="font-mono text-[10px] text-gray-500 mb-1 block">Relação com o processo terapêutico:</label>
                <select
                  value={data.mentalHealth.therapyRelationship || ''}
                  onChange={(e) => update('mentalHealth', 'therapyRelationship', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                >
                  <option value="">-- Selecione --</option>
                  <option value="engaged">Engajado — Participa ativamente, faz as tarefas</option>
                  <option value="ambivalent">Ambivalente — Às vezes vai, às vezes falta</option>
                  <option value="resistant">Resistente — Vai mas não se abre</option>
                  <option value="skeptical">Cético — Não acredita muito que funciona</option>
                  <option value="dependent">Dependente — Não consegue ficar sem</option>
                  <option value="avoidant">Evitativo — Evita tópicos difíceis</option>
                  <option value="performative">Performático — Diz o que o terapeuta quer ouvir</option>
                  <option value="hostile">Hostil — Antagoniza o terapeuta</option>
                </select>
              </div>
            </div>

            {/* Medications */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💊 Medicação Psiquiátrica</h4>
              <p className="font-mono text-[10px] text-gray-500 mb-3">
                Classes de medicamentos (não marcas específicas). Selecione até 3.
              </p>
              
              {(() => {
                const medicationOptions = [
                  // Antidepressants
                  { id: 'ssri', label: 'ISRS (Antidepressivo)', cat: 'Antidepressivos', 
                    desc: 'Inibidor Seletivo de Recaptação de Serotonina',
                    effects: 'Náusea, insônia, disfunção sexual, ganho de peso' },
                  { id: 'snri', label: 'IRSN (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Inibidor de Recaptação de Serotonina e Noradrenalina',
                    effects: 'Náusea, tontura, sudorese, pressão alta' },
                  { id: 'tricyclic', label: 'Tricíclico (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Antidepressivo de primeira geração',
                    effects: 'Boca seca, constipação, visão turva, sedação, ganho de peso' },
                  { id: 'maoi', label: 'IMAO (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Inibidor da Monoamina Oxidase',
                    effects: 'Restrições alimentares severas, pressão alta, insônia' },
                  { id: 'atypical-ad', label: 'Atípico (Antidepressivo)', cat: 'Antidepressivos',
                    desc: 'Bupropiona, Mirtazapina, Trazodona',
                    effects: 'Varia: insônia ou sedação, ganho ou perda de peso' },
                  
                  // Anxiolytics
                  { id: 'benzo', label: 'Benzodiazepínico (Ansiolítico)', cat: 'Ansiolíticos',
                    desc: 'Diazepam, Clonazepam, Alprazolam',
                    effects: 'Sonolência, dependência, confusão, amnésia, abstinência' },
                  { id: 'buspirone', label: 'Buspirona (Ansiolítico)', cat: 'Ansiolíticos',
                    desc: 'Ansiolítico não-benzodiazepínico',
                    effects: 'Tontura, náusea, demora para fazer efeito' },
                  { id: 'z-drugs', label: 'Hipnótico-Z (Sono)', cat: 'Ansiolíticos',
                    desc: 'Zolpidem, Zopiclona',
                    effects: 'Sonambulismo, amnésia, dependência' },
                  
                  // Antipsychotics
                  { id: 'typical-ap', label: 'Antipsicótico Típico', cat: 'Antipsicóticos',
                    desc: 'Haloperidol, Clorpromazina (1ª geração)',
                    effects: 'Rigidez, tremores, inquietação, sedação intensa' },
                  { id: 'atypical-ap', label: 'Antipsicótico Atípico', cat: 'Antipsicóticos',
                    desc: 'Risperidona, Quetiapina, Olanzapina (2ª geração)',
                    effects: 'Ganho de peso, diabetes, sedação, dislipidemia' },
                  { id: 'third-gen-ap', label: 'Antipsicótico 3ª Geração', cat: 'Antipsicóticos',
                    desc: 'Aripiprazol, Brexpiprazol',
                    effects: 'Inquietação, insônia, menos efeitos metabólicos' },
                  
                  // Mood Stabilizers
                  { id: 'lithium', label: 'Lítio (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Carbonato de Lítio',
                    effects: 'Tremor, sede, tireoide, rins, janela terapêutica estreita' },
                  { id: 'valproate', label: 'Valproato (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Ácido Valproico, Divalproato',
                    effects: 'Ganho de peso, queda de cabelo, tremor, hepatotoxicidade' },
                  { id: 'carbamazepine', label: 'Carbamazepina (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Anticonvulsivante estabilizador',
                    effects: 'Sedação, lentidão mental, rash cutâneo' },
                  { id: 'lamotrigine', label: 'Lamotrigina (Estabilizador)', cat: 'Estabilizadores de Humor',
                    desc: 'Anticonvulsivante, bom para depressão bipolar',
                    effects: 'Rash (Stevens-Johnson), insônia, cefaleia' },
                  
                  // Stimulants
                  { id: 'stimulant', label: 'Estimulante (TDAH)', cat: 'Estimulantes',
                    desc: 'Metilfenidato, Lisdexanfetamina',
                    effects: 'Insônia, perda de apetite, ansiedade, taquicardia' },
                  { id: 'non-stim-adhd', label: 'Não-Estimulante (TDAH)', cat: 'Estimulantes',
                    desc: 'Atomoxetina',
                    effects: 'Náusea, fadiga, demora para fazer efeito' },
                  
                  // Other
                  { id: 'prn', label: 'SOS / Conforme Necessário', cat: 'Outros',
                    desc: 'Medicação de resgate para crises',
                    effects: 'Varia conforme o medicamento' },
                  { id: 'supplement', label: 'Suplemento/Natural', cat: 'Outros',
                    desc: 'Melatonina, Magnésio, Ômega-3, Erva de São João',
                    effects: 'Geralmente leves, interações possíveis' },
                ];
                
                const selectedMeds = data.mentalHealth.medications || [];
                
                const toggleMed = (medId) => {
                  if (selectedMeds.includes(medId)) {
                    update('mentalHealth', 'medications', selectedMeds.filter(m => m !== medId));
                  } else if (selectedMeds.length < 3) {
                    update('mentalHealth', 'medications', [...selectedMeds, medId]);
                  }
                };
                
                const categories = [...new Set(medicationOptions.map(m => m.cat))];
                
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">Selecionados: {selectedMeds.length}/3</span>
                    </div>
                    
                    {selectedMeds.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {selectedMeds.map(medId => {
                          const med = medicationOptions.find(m => m.id === medId);
                          return med ? (
                            <div
                              key={medId}
                              className="bg-blue-50 border border-blue-200 rounded-sm p-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-blue-800">
                                  💊 {med.label}
                                </span>
                                <button
                                  onClick={() => toggleMed(medId)}
                                  className="text-blue-400 hover:text-blue-600 text-xs"
                                >
                                  ×
                                </button>
                              </div>
                              <p className="font-mono text-[10px] text-blue-600 mt-1">{med.desc}</p>
                              <p className="font-mono text-[10px] text-red-600 mt-1">
                                ⚠️ Efeitos: {med.effects}
                              </p>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                    
                    {categories.map(cat => (
                      <div key={cat} className="mb-2">
                        <h5 className="font-mono text-[10px] uppercase text-gray-400 mb-1">{cat}</h5>
                        <div className="flex flex-wrap gap-1">
                          {medicationOptions.filter(m => m.cat === cat).map(med => (
                            <button
                              key={med.id}
                              onClick={() => toggleMed(med.id)}
                              disabled={!selectedMeds.includes(med.id) && selectedMeds.length >= 3}
                              title={`${med.desc}\n⚠️ ${med.effects}`}
                              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                                selectedMeds.includes(med.id)
                                  ? 'bg-blue-500 text-white'
                                  : selectedMeds.length >= 3
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer'
                              }`}
                            >
                              {med.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Medication Compliance */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <label className="font-mono text-[10px] text-gray-500 mb-1 block">Adesão à medicação:</label>
                      <select
                        value={data.mentalHealth.medCompliance || ''}
                        onChange={(e) => update('mentalHealth', 'medCompliance', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
                      >
                        <option value="">-- Selecione --</option>
                        <option value="perfect">Perfeita — Nunca esquece, horários certos</option>
                        <option value="good">Boa — Raramente esquece</option>
                        <option value="irregular">Irregular — Às vezes esquece</option>
                        <option value="poor">Ruim — Frequentemente esquece ou pula doses</option>
                        <option value="self-adjust">Auto-ajusta — Muda doses por conta própria</option>
                        <option value="stops">Para sozinho — Interrompe quando se sente bem</option>
                        <option value="resistant">Resistente — Não quer tomar</option>
                        <option value="hiding">Esconde — Finge que toma</option>
                      </select>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Hospitalization History */}
            <div className="border border-gray-200 rounded-sm p-4">
              <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏥 Histórico de Internação</h4>
              <select
                value={data.mentalHealth.hospitalization || ''}
                onChange={(e) => update('mentalHealth', 'hospitalization', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs"
              >
                <option value="">-- Selecione --</option>
                <option value="never">Nunca foi internado</option>
                <option value="once-voluntary">Uma vez — Voluntária</option>
                <option value="once-involuntary">Uma vez — Involuntária</option>
                <option value="multiple-voluntary">Múltiplas — Voluntárias</option>
                <option value="multiple-involuntary">Múltiplas — Involuntárias</option>
                <option value="recent">Internação recente (último ano)</option>
                <option value="current">Atualmente internado</option>
              </select>
            </div>
          </>
        )}
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

// ============================================================================
// INTELLIGENCE CONTENT - Complete Implementation
// ============================================================================

const IntelligenceContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('intelligence', { ...data, [section]: { ...data[section], [field]: value } });
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

const VoiceContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('voice', { ...data, [section]: { ...data[section], [field]: value } });
  };

  const sections = {
    0: ( // Vocal Characteristics
      <div className="space-y-4">
        <ArchiveSlider label="Pitch" value={data.vocal.pitch} onChange={(e) => update('vocal', 'pitch', parseInt(e.target.value))} leftLabel="Deep" rightLabel="High" />
        <ArchiveSelect label="Tone" value={data.vocal.tone} onChange={(e) => update('vocal', 'tone', e.target.value)} 
          options={['Warm', 'Cold', 'Raspy', 'Smooth', 'Nasal', 'Breathy', 'Gravelly', 'Melodic', 'Monotone', 'Shrill']} />
        <ArchiveSlider label="Volume" value={data.vocal.volume} onChange={(e) => update('vocal', 'volume', parseInt(e.target.value))} leftLabel="Soft-spoken" rightLabel="Loud" />
        <ArchiveSlider label="Speech Speed" value={data.vocal.speechSpeed} onChange={(e) => update('vocal', 'speechSpeed', parseInt(e.target.value))} leftLabel="Slow" rightLabel="Fast" />
        <ArchiveInput label="Laugh Type" value={data.vocal.laughType} onChange={(e) => update('vocal', 'laughType', e.target.value)} placeholder="Describe their laugh" />
      </div>
    ),
    1: ( // Speech Patterns
      <div className="space-y-4">
        <ArchiveSelect label="Sentence Structure" value={data.speech.sentenceStructure} onChange={(e) => update('speech', 'sentenceStructure', e.target.value)} 
          options={['Short and direct', 'Average', 'Long and elaborate', 'Fragmented', 'Poetic']} />
        <ArchiveInput label="Filler Words" value={data.speech.fillerWords} onChange={(e) => update('speech', 'fillerWords', e.target.value)} placeholder="e.g. 'like', 'um', 'you know'" />
        <ArchiveSlider label="Profanity Level" value={data.speech.profanityLevel} onChange={(e) => update('speech', 'profanityLevel', parseInt(e.target.value))} leftLabel="None" rightLabel="Frequent" />
        <ArchiveSlider label="Sarcasm Frequency" value={data.speech.sarcasmFrequency} onChange={(e) => update('speech', 'sarcasmFrequency', parseInt(e.target.value))} leftLabel="Sincere" rightLabel="Very Sarcastic" />
        <ArchiveSelect label="Humor Style" value={data.speech.humorStyle} onChange={(e) => update('speech', 'humorStyle', e.target.value)} 
          options={['Dry/Deadpan', 'Witty', 'Goofy/Silly', 'Dark', 'Self-deprecating', 'Sarcastic', 'Puns/Wordplay', 'Physical', 'None']} />
      </div>
    ),
    2: ( // Languages & Expression
      <div className="grid grid-cols-1 gap-6">
        <ArchiveInput label="Native Language" value={data.languages.nativeLanguage} onChange={(e) => update('languages', 'nativeLanguage', e.target.value)} placeholder="First language" />
        <ArchiveInput label="Second Languages (with fluency)" value={data.languages.secondLanguages} onChange={(e) => update('languages', 'secondLanguages', e.target.value)} placeholder="e.g. Spanish (fluent), French (basic)" />
        <ArchiveInput label="Code-Switching Habits" value={data.languages.codeSwitching} onChange={(e) => update('languages', 'codeSwitching', e.target.value)} placeholder="Do they switch languages/dialects?" />
        <ArchiveInput label="Written vs Spoken Difference" value={data.languages.writtenVsSpoken} onChange={(e) => update('languages', 'writtenVsSpoken', e.target.value)} placeholder="How does their writing differ from speech?" multiline />
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// WORLDVIEW CONTENT - Complete Implementation
// ============================================================================

const WorldviewContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('worldview', { ...data, [section]: { ...data[section], [field]: value } });
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
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔄 Visão sobre Mudança</h4>
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
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💀 Visão sobre a Morte</h4>
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
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😢 Visão sobre o Sofrimento</h4>
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
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">✨ Visão sobre Vida Após Morte</h4>
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

const FavoritesContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('favorites', { ...data, [section]: { ...data[section], [field]: value } });
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
    // ========== SUBTAB 0: ENTERTAINMENT ==========
    0: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">🎬 ENTRETENIMENTO</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">Mídia consumida: música, filmes, séries, livros, games e redes sociais.</p>
        </div>

        {/* MUSIC SECTION */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">🎵 Música</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Gêneros Favoritos (até 8)</label>
              <div className="flex flex-wrap gap-2">
                {['Rock','Classic Rock','Hard Rock','Soft Rock','Progressive Rock','Psychedelic Rock','Pop','Synth Pop','Dream Pop','Art Pop','Indie Pop','Electropop','Hip-Hop/Rap','Old School Hip-Hop','Trap','Drill','Conscious Rap','R&B/Soul','Neo-Soul','Motown','Contemporary R&B','Jazz','Smooth Jazz','Bebop','Fusion Jazz','Acid Jazz','Classical','Baroque','Romantic Era','Contemporary Classical','Opera','Chamber Music','Electronic/EDM','House','Techno','Trance','Drum & Bass','Dubstep','Hardstyle','Deep House','Chillwave','Synthwave','Vaporwave','Metal','Heavy Metal','Thrash Metal','Death Metal','Black Metal','Doom Metal','Power Metal','Nu-Metal','Metalcore','Country','Outlaw Country','Bluegrass','Americana','Country Pop','Indie','Indie Rock','Indie Folk','Post-Punk','Shoegaze','Lo-Fi Indie','Folk','Traditional Folk','Contemporary Folk','Celtic','Latin','Reggaeton','Salsa','Bachata','Cumbia','Bossa Nova','Samba','Tango','Mariachi','K-Pop','J-Pop','J-Rock','City Pop','C-Pop','Cantopop','Reggae','Dancehall','Dub','Ska','Blues','Delta Blues','Chicago Blues','Electric Blues','Punk','Hardcore Punk','Pop Punk','Emo','Post-Hardcore','Alternative','Grunge','Britpop','New Wave','Noise Rock','Gospel','Christian Rock','Worship','Spirituals','World Music','Afrobeats','Highlife','Bollywood','Flamenco','Fado','Klezmer','Lo-Fi','Lo-Fi Hip Hop','Chillhop','Ambient','Dark Ambient','New Age','Drone','Soundtrack/OST','Video Game Music','Anime OST','Film Score','Musical Theater','Experimental','Avant-Garde','Noise','Industrial','Glitch'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'musicGenres', g, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.musicGenres || []).includes(g) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Era Musical Preferida</label>
                <select value={data.entertainment?.musicEra || ''} onChange={(e) => update('entertainment', 'musicEra', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="classical">Classical Era (Baroque, Romantic)</option>
                  <option value="50s-60s">50s-60s (Rock and Roll, Motown)</option>
                  <option value="70s">70s (Disco, Prog Rock, Punk)</option>
                  <option value="80s">80s (Synth, New Wave, Hair Metal)</option>
                  <option value="90s">90s (Grunge, Hip-Hop Golden Age)</option>
                  <option value="2000s">2000s (Pop Punk, R&B, Early EDM)</option>
                  <option value="2010s">2010s (EDM, Trap, Streaming Era)</option>
                  <option value="current">Current (2020s)</option>
                  <option value="no-preference">No Era Preference</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Toca Instrumento?</label>
                <input type="text" value={data.entertainment?.playsInstrument || ''} onChange={(e) => update('entertainment', 'playsInstrument', e.target.value)} placeholder="Ex: Guitarra, Piano, Nenhum..." className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Importância da Música na Vida</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Background</span><span>Central</span></div>
              <input type="range" min="1" max="9" value={data.entertainment?.musicImportance || 5} onChange={(e) => update('entertainment', 'musicImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-purple-400 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* MOVIES & TV SECTION */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-3">🎬 Filmes & TV</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Gêneros Favoritos (até 8)</label>
              <div className="flex flex-wrap gap-2">
                {['Action','Martial Arts','Espionage/Spy','Heist','Comedy','Romantic Comedy','Dark Comedy','Slapstick','Parody','Satire','Stand-Up','Improv','Drama','Period Drama','Legal Drama','Medical Drama','Family Drama','Teen Drama','Melodrama','Horror','Psychological Horror','Slasher','Supernatural Horror','Body Horror','Found Footage','Cosmic Horror','Gothic Horror','Zombie','Sci-Fi','Space Opera','Dystopian','Cyberpunk','Time Travel','Post-Apocalyptic','Alien Invasion','Hard Sci-Fi','Romance','Period Romance','Contemporary Romance','LGBTQ+ Romance','Forbidden Love','Thriller','Psychological Thriller','Political Thriller','Techno-Thriller','Conspiracy','Erotic Thriller','Documentary','Nature Documentary','True Crime Doc','Historical Doc','Music Documentary','Sports Documentary','Social Issue Doc','Animation','2D Animation','3D Animation','Stop Motion','Claymation','Rotoscope','Fantasy','High Fantasy','Urban Fantasy','Dark Fantasy','Fairy Tale','Sword & Sorcery','Crime','Noir','Neo-Noir','Gangster','Police Procedural','Detective','Organized Crime','Mystery','Whodunit','Cozy Mystery','Locked Room','Amateur Sleuth','Adventure','Survival','Treasure Hunt','Expedition','Swashbuckler','War','WWII','Vietnam','Modern Warfare','Anti-War','War Drama','Western','Spaghetti Western','Neo-Western','Revisionist Western','Musical','Jukebox Musical','Original Musical','Dance Film','Opera Film','Biographical','Sports Biopic','Music Biopic','Historical Figure','Artist Biography','Superhero','MCU Style','DC Style','Anti-Hero','Origin Story','Team-Up','Anime','Shonen','Shojo','Seinen','Josei','Isekai','Mecha','Slice of Life Anime','Reality TV','Competition Reality','Dating Shows','Makeover Shows','Survival Reality','Celebrity Reality','Docu-Reality','Sitcom','Single-Camera','Multi-Camera','Workplace Sitcom','Family Sitcom','True Crime','Crime Investigation','Serial Killer','Missing Persons','Court Cases','K-Drama','Historical K-Drama','Romance K-Drama','Thriller K-Drama','Workplace K-Drama','Variety Show','Cooking Show','Travel Show','Talk Show','Game Show','Mini-Series','Limited Series','Anthology','Soap Opera','Telenovela'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'movieTvGenres', g, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.movieTvGenres || []).includes(g) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo Preferido</label>
                <select value={data.entertainment?.movieType || ''} onChange={(e) => update('entertainment', 'movieType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="mainstream">Mainstream/Blockbusters</option>
                  <option value="indie">Independent/Arthouse</option>
                  <option value="foreign">Foreign/International</option>
                  <option value="classic">Classic/Old Hollywood</option>
                  <option value="mixed">Mixed/No Preference</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Binge-Watching Level</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>1 ep/vez</span><span>Maratona</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.bingeLevel || 5} onChange={(e) => update('entertainment', 'bingeLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-red-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Filmes/Séries Favoritos</label>
              <textarea value={data.entertainment?.favoriteShows || ''} onChange={(e) => update('entertainment', 'favoriteShows', e.target.value)} placeholder="Liste alguns favoritos..." className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px] h-16 resize-none" />
            </div>
          </div>
        </div>

        {/* BOOKS SECTION */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-3">📚 Livros & Leitura</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Gêneros Literários (até 6)</label>
              <div className="flex flex-wrap gap-2">
                {['Literary Fiction','Contemporary Fiction','Experimental Fiction','Postmodern','Magical Realism','Southern Gothic','Dystopian Fiction','Utopian Fiction','Absurdist Fiction','Sci-Fi','Hard Science Fiction','Space Opera','Cyberpunk','Steampunk','Dieselpunk','Biopunk','Climate Fiction','Military Sci-Fi','First Contact','Fantasy','Epic/High Fantasy','Urban Fantasy','Dark Fantasy','Grimdark','Sword & Sorcery','Portal Fantasy','Fairy Tale Retelling','Mythological Fiction','Arthurian','Low Fantasy','Mystery/Thriller','Cozy Mystery','Police Procedural','Noir','Legal Thriller','Medical Thriller','Spy Thriller','Psychological Thriller','Techno-Thriller','Political Thriller','Domestic Thriller','Romance','Contemporary Romance','Historical Romance','Paranormal Romance','Romantic Suspense','Erotic Romance','LGBTQ+ Romance','Regency Romance','Gothic Romance','Sports Romance','Horror','Cosmic Horror','Gothic Horror','Psychological Horror','Supernatural Horror','Folk Horror','Body Horror','Splatterpunk','Quiet Horror','Historical Fiction','Ancient History','Medieval','Renaissance','Victorian','WWI/WWII','1960s-70s','Alternative History','Non-Fiction','Narrative Non-Fiction','Creative Non-Fiction','Investigative Journalism','Essay Collections','Biography/Memoir','Autobiography','Celebrity Memoir','Coming-of-Age Memoir','Travel Memoir','Family Memoir','Addiction & Recovery','Self-Help','Productivity','Relationships','Mindfulness','Financial','Career Development','Personal Growth','Philosophy','Eastern Philosophy','Western Philosophy','Ethics','Existentialism','Stoicism','Political Philosophy','History','Ancient History','Medieval History','Military History','Social History','Cultural History','Art History','Science History','Science','Popular Science','Physics','Biology','Astronomy','Neuroscience','Evolution','Climate Science','Psychology','Business','Entrepreneurship','Leadership','Marketing','Economics','Investing','Management','Poetry','Contemporary Poetry','Classical Poetry','Spoken Word','Haiku','Epic Poetry','Confessional Poetry','Graphic Novels/Comics','Superhero Comics','Manga','Indie Comics','Memoir Comics','Webcomics','Young Adult','YA Fantasy','YA Dystopian','YA Romance','YA Contemporary','YA Horror','New Adult','Classic Literature','Victorian Classics','Russian Classics','American Classics','British Classics','French Classics','Modernist Classics','Ancient Classics','Plays/Drama','Tragedy','Comedy of Manners','Absurdist Drama','Contemporary Drama','Musical Theater Scripts','True Crime Books','Cold Cases','Serial Killers','Wrongful Convictions','Organized Crime','Religious/Spiritual','Religious Fiction','Spiritual Growth','Theology','Sacred Texts','Devotional','Humor','Satire','Parody','Comedic Essays','Absurdist Humor','Academic/Scholarly','Textbooks','Research Papers','Thesis','Academic Essays','Anthologies','Short Story Collections','Flash Fiction','Novellas','Mixed Genre Collections','LitRPG/GameLit','Progression Fantasy','Wuxia/Xianxia','Cultivation','Isekai Novels'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'bookGenres', g, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.bookGenres || []).includes(g) ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Frequência de Leitura</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Nunca</span><span>Diário</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.readingFrequency || 5} onChange={(e) => update('entertainment', 'readingFrequency', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-emerald-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Formato Preferido</label>
                <select value={data.entertainment?.bookFormat || ''} onChange={(e) => update('entertainment', 'bookFormat', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="physical">Physical Books</option>
                  <option value="ebook">E-Books/Kindle</option>
                  <option value="audiobook">Audiobooks</option>
                  <option value="mixed">Mixed/No Preference</option>
                  <option value="none">Does Not Read</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* GAMES SECTION */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">🎮 Games</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Tipos de Games (até 6)</label>
              <div className="flex flex-wrap gap-2">
                {['RPG','JRPG','Western RPG','Action RPG','Tactical RPG','MMORPG','Dungeon Crawler','Roguelike','Roguelite','FPS/Shooter','Tactical Shooter','Hero Shooter','Looter Shooter','Military Shooter','Arena Shooter','Third-Person Shooter','Action/Adventure','Open World','Metroidvania','Soulslike','Character Action','Hack and Slash','Beat Em Up','Strategy','Real-Time Strategy','Turn-Based Strategy','4X Strategy','Grand Strategy','Tower Defense','Auto Battler','City Builder','Sports','Soccer/Football','Basketball','American Football','Baseball','Hockey','Golf','Tennis','Extreme Sports','Wrestling','Boxing/MMA','Racing','Arcade Racing','Simulation Racing','Kart Racing','Combat Racing','Open World Racing','Motorcycle','Fighting','2D Fighting','3D Fighting','Platform Fighter','Tag Team','Puzzle','Match-3','Physics Puzzle','Escape Room','Point-and-Click','Hidden Object','Brain Training','Simulation','Life Simulation','Farming Simulation','Business Simulation','Flight Simulation','Driving Simulation','Social Simulation','God Games','Horror','Survival Horror','Psychological Horror','Action Horror','Cosmic Horror','MOBA','Battle Royale','Platformer','2D Platformer','3D Platformer','Precision Platformer','Collectathon','Sandbox','Survival Sandbox','Creative Sandbox','Open World Sandbox','MMO','MMORPG','Sandbox MMO','Action MMO','Visual Novel','Dating Sim','Mystery VN','Horror VN','Otome','Board Games','Classic Board Games','Euro Games','Deck Building','Worker Placement','Area Control','Cooperative','Card Games','Trading Card Games','Collectible Card Games','Deck Builders Digital','Poker/Casino','Tabletop RPG','D&D Style','Narrative TTRPG','Rules-Light','Crunchy Systems','Mobile Games','Gacha Games','Idle Games','Hyper Casual','Puzzle Mobile','Rhythm Games','Music/Rhythm','Dance Games','Instrument Games','Stealth','Tactical Stealth','Action Stealth','Social Stealth','Immersive Sim','Party Games','Trivia Games','Drawing Games','Minigame Collections','Educational','Language Learning','Math Games','History Games','Science Games','Narrative/Story','Interactive Fiction','Choice-Based','Walking Simulator','Episodic Adventure','Cozy Games','Farming Cozy','Animal Crossing Style','Relaxation Games','Crafting Focus','VR Games','VR Action','VR Simulation','VR Social','VR Horror','Indie Games','Retro/Pixel Art','Experimental Indie','Narrative Indie','Art Games','Multiplayer','Co-op','Competitive','Asymmetric','Local Multiplayer','MMO','Esports Titles','Doesn\'t Play'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'gameTypes', g, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.gameTypes || []).includes(g) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-2 block">Plataformas (até 3)</label>
                <div className="flex flex-wrap gap-2">
                  {['PC','PlayStation','Xbox','Nintendo','Mobile','Tabletop'].map(p => (
                    <button key={p} onClick={() => toggleArrayItem('entertainment', 'gamePlatforms', p, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.gamePlatforms || []).includes(p) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Competitividade</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Casual</span><span>Hardcore</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.competitiveness || 5} onChange={(e) => update('entertainment', 'competitiveness', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-300 to-red-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA SECTION */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-3">📱 Redes Sociais</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Plataformas Usadas (até 6)</label>
              <div className="flex flex-wrap gap-2">
                {['Instagram','TikTok','Twitter/X','Facebook','YouTube','YouTube Shorts','LinkedIn','Reddit','Discord','Snapchat','Pinterest','Twitch','BeReal','Threads','WhatsApp','Telegram','Signal','Mastodon','Bluesky','Tumblr','WeChat','Line','KakaoTalk','Viber','VK','QQ','Weibo','Xiaohongshu','Douyin','Bilibili','Nico Nico','Steam Community','Xbox Live','PlayStation Network','Nintendo Online','Letterboxd','Goodreads','Last.fm','Spotify Social','Strava','Untappd','Yelp','Nextdoor','Meetup','Clubhouse','Patreon','Substack','Medium','DeviantArt','ArtStation','Behance','Dribbble','Figma Community','GitHub','Stack Overflow','Hacker News','Product Hunt','AngelList','Glassdoor','Indeed','Quora','Wikipedia','Fandom/Wikia','4chan','8kun','Gab','Parler','Truth Social','Gettr','Rumble','Odysee','BitChute','Minds','OnlyFans','Fansly','Ko-fi','Buy Me a Coffee','Linktree','Carrd','About.me','VSCO','500px','Flickr','SmugMug','Imgur','Giphy','Tenor','SoundCloud','Bandcamp','Mixcloud','Audiomack','Deezer','Apple Music Connect','Tidal','Pandora','iHeartRadio','Stitcher','Pocket Casts','Overcast','Spotify Podcasts','Apple Podcasts','Anchor','Podbean','Dating Apps','Tinder','Bumble','Hinge','OkCupid','Match.com','eHarmony','Grindr','HER','Feeld','Gaming Social','Battle.net','Origin/EA App','Ubisoft Connect','GOG Galaxy','Epic Games','Roblox','Minecraft Realms','None/Minimal'].map(p => (
                  <button key={p} onClick={() => toggleArrayItem('entertainment', 'socialPlatforms', p, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.socialPlatforms || []).includes(p) ? 'bg-pink-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nível de Uso</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Non-User</span><span>Addicted</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.socialMediaUsage || 5} onChange={(e) => update('entertainment', 'socialMediaUsage', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-pink-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo de Uso</label>
                <select value={data.entertainment?.socialMediaType || ''} onChange={(e) => update('entertainment', 'socialMediaType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="lurker">Lurker — Só observa, nunca posta</option>
                  <option value="casual">Casual — Posta ocasionalmente</option>
                  <option value="active">Active — Engaja regularmente</option>
                  <option value="creator">Creator — Cria conteúdo ativamente</option>
                  <option value="influencer">Influencer — Grande audiência</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: FOOD & DRINK ==========
    1: (
      <div className="space-y-6">
        <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-orange-900 mb-2">🍽️ COMIDA & BEBIDA</h3>
          <p className="font-mono text-xs text-orange-800 leading-relaxed">Preferências culinárias, dieta, bebidas e hábitos alimentares.</p>
        </div>

        {/* CUISINES */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌍 Cozinhas Favoritas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Tipos de culinária que mais gosta. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Italian','Northern Italian','Southern Italian','Sicilian','Tuscan','Japanese','Sushi/Sashimi','Ramen','Izakaya','Kaiseki','Teppanyaki','Yakitori','Okonomiyaki','Mexican','Tex-Mex','Oaxacan','Yucatecan','Baja Style','Taco Stand','Chinese','Cantonese','Sichuan','Hunan','Shanghainese','Beijing','Dim Sum','Hot Pot','Indian','North Indian','South Indian','Punjabi','Bengali','Goan','Hyderabadi','French','Provençal','Parisian Bistro','Haute Cuisine','Normandy','Thai','Bangkok Street Food','Northern Thai','Isaan','Southern Thai','American','Southern/Soul Food','New England','Cajun','Creole','BBQ','Midwest','Pacific Northwest','California','Hawaiian','Brazilian','Churrasco','Bahian','Mineiro','Gaúcho','Paulistano','Amazonian','Mediterranean','Spanish','Catalan','Basque','Galician','Andalusian','Tapas','Korean','Korean BBQ','Fried Chicken','Temple Food','Street Food','Vietnamese','Pho','Banh Mi','Southern Vietnamese','Central Vietnamese','Greek','Cypriot','Cretan','Spanish','Portuguese','Alentejo','Lisbon','Middle Eastern','Lebanese','Syrian','Palestinian','Jordanian','Iraqi','Gulf','Turkish','Ottoman','Anatolian','Aegean','Black Sea','Ethiopian/Eritrean','Moroccan','Tunisian','Algerian','Egyptian','West African','Nigerian','Ghanaian','Senegalese','South African','East African','Peruvian','Ceviche','Nikkei','Criollo','Andean','Caribbean','Jamaican','Cuban','Puerto Rican','Dominican','Trinidadian','Haitian','German','Bavarian','Austrian','Swiss','Belgian','Dutch','Scandinavian','Swedish','Norwegian','Danish','Finnish','Icelandic','British','English','Scottish','Welsh','Irish','Russian','Ukrainian','Polish','Czech','Hungarian','Balkan','Serbian','Croatian','Bulgarian','Romanian','Central Asian','Georgian','Armenian','Uzbek','Kazakh','Afghan','Pakistani','Bangladeshi','Sri Lankan','Nepalese','Tibetan','Malaysian','Singaporean','Indonesian','Filipino','Burmese','Cambodian','Laotian','Australian','New Zealand','Oceanian','Comfort/Home','Diner Food','Fast Food','Fast Casual','Fine Dining','Farm-to-Table','Fusion','Asian Fusion','Latin Fusion','Modern American','Contemporary','Molecular Gastronomy','Vegan Cuisine','Raw Food','Plant-Based','Kosher','Halal','Gluten-Free Focus','Allergen-Friendly','Paleo/Keto','Health Food','Organic Focus','Locavore','Street Food General','Food Truck','Pop-Up','Night Market','Hawker Center','Izakaya Style'].map(c => (
              <button key={c} onClick={() => toggleArrayItem('food', 'cuisines', c, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.food?.cuisines || []).includes(c) ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* ADVENTUROUSNESS & RESTRICTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎲 Aventura Gastronômica</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Picky Eater</span><span>Adventurous</span></div>
            <input type="range" min="1" max="9" value={data.food?.adventurousness || 5} onChange={(e) => update('food', 'adventurousness', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
            <p className="font-mono text-[9px] text-gray-500 mt-2 text-center italic">
              {(data.food?.adventurousness || 5) <= 3 && 'Come sempre as mesmas coisas, evita novidades'}
              {(data.food?.adventurousness || 5) === 4 || (data.food?.adventurousness || 5) === 5 && 'Experimenta coisas novas às vezes'}
              {(data.food?.adventurousness || 5) >= 6 && 'Adora experimentar comidas exóticas e novas'}
            </p>
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🥗 Restrições/Dieta</h4>
            <div className="flex flex-wrap gap-2">
              {['Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Lacto-Ovo Vegetarian','Flexitarian','Vegan','Raw Vegan','Whole Food Vegan','Junk Food Vegan','Pescatarian','Pollotarian','Keto','Standard Keto','Cyclical Keto','Targeted Keto','Low-Carb','Atkins','South Beach','Zone Diet','Gluten-Free','Celiac','Non-Celiac Sensitivity','Wheat-Free','Lactose-Free','Dairy-Free','Casein-Free','Halal','Kosher','Kosher Style','Strict Orthodox','Allergies','Nut Allergy','Peanut Allergy','Tree Nut Allergy','Shellfish Allergy','Fish Allergy','Egg Allergy','Soy Allergy','Sesame Allergy','Mustard Allergy','Sulfite Sensitivity','MSG Sensitivity','Nightshade Sensitivity','FODMAP','Low FODMAP','Elimination Diet','Paleo','Autoimmune Paleo','Primal','Whole30','Clean Eating','Anti-Inflammatory','Mediterranean Diet','DASH Diet','MIND Diet','Heart-Healthy','Diabetic-Friendly','Low Sodium','Low Sugar','No Added Sugar','Sugar-Free','Carnivore','Lion Diet','Nose-to-Tail','Organ Meats','Raw Food','Fruitarian','Macrobiotic','Ayurvedic','Sattvic','Blood Type Diet','Intermittent Fasting','16:8','OMAD','5:2','Alternate Day','Calorie Counting','CICO','Portion Control','Intuitive Eating','Mindful Eating','Weight Watchers','Noom','Macro Counting','IIFYM','High Protein','Bodybuilder Diet','Athletic Performance','Pre-Competition','Bulking','Cutting','Maintenance','Pregnancy Diet','Breastfeeding Diet','Pediatric','Senior Nutrition','Medical Diet','Renal Diet','Liver-Friendly','Cancer Diet','Post-Surgery','Tube Feeding','No Restrictions'].map(d => (
                <button key={d} onClick={() => toggleArrayItem('food', 'dietaryRestrictions', d, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.food?.dietaryRestrictions || []).includes(d) ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* DRINKS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🥤 Bebidas Favoritas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Até 6 bebidas.</p>
          <div className="flex flex-wrap gap-2">
            {['Coffee','Espresso','Americano','Latte','Cappuccino','Flat White','Macchiato','Mocha','Cold Brew','Iced Coffee','Nitro Cold Brew','Pour Over','French Press','Turkish Coffee','Irish Coffee','Vietnamese Coffee','Affogato','Tea','Black Tea','Green Tea','Oolong','White Tea','Pu-erh','Herbal Tea','Chamomile','Peppermint','Rooibos','Chai','Matcha','Earl Grey','English Breakfast','Darjeeling','Jasmine Tea','Bubble Tea','Thai Tea','Water','Sparkling Water','Mineral Water','Flavored Water','Coconut Water','Alkaline Water','Spring Water','Soda/Soft Drinks','Cola','Lemon-Lime','Root Beer','Ginger Ale','Cream Soda','Orange Soda','Grape Soda','Dr Pepper Style','Juice','Orange Juice','Apple Juice','Grape Juice','Cranberry','Pomegranate','Grapefruit','Pineapple','Mango','Passion Fruit','Tomato/V8','Green Juice','Cold Pressed','Smoothies','Fruit Smoothie','Green Smoothie','Protein Smoothie','Acai Bowl Drinks','Energy Drinks','Red Bull Style','Monster Style','Natural Energy','Yerba Mate','Guayusa','Pre-Workout','Wine','Red Wine','Cabernet','Merlot','Pinot Noir','Syrah/Shiraz','Malbec','Tempranillo','Sangiovese','Zinfandel','White Wine','Chardonnay','Sauvignon Blanc','Pinot Grigio','Riesling','Moscato','Gewürztraminer','Rosé','Sparkling Wine','Champagne','Prosecco','Cava','Crémant','Dessert Wine','Port','Sherry','Ice Wine','Fortified Wine','Natural Wine','Orange Wine','Biodynamic','Beer','Lager','Pilsner','Pale Ale','IPA','Double IPA','Hazy IPA','Stout','Porter','Wheat Beer','Belgian','Sour Beer','Gose','Amber Ale','Brown Ale','Kolsch','Hefeweizen','Craft Beer','Import Beer','Light Beer','Non-Alcoholic Beer','Cocktails','Margarita','Mojito','Old Fashioned','Manhattan','Martini','Cosmopolitan','Negroni','Daiquiri','Whiskey Sour','Mai Tai','Piña Colada','Long Island','Moscow Mule','Aperol Spritz','Bellini','Bloody Mary','Mimosa','Gin & Tonic','Rum & Coke','Vodka Soda','Paloma','Espresso Martini','Tiki Drinks','Whiskey/Bourbon','Scotch','Irish Whiskey','Japanese Whisky','Rye','Tennessee','Canadian','Single Malt','Blended','Bourbon','Vodka','Flavored Vodka','Premium Vodka','Craft Vodka','Rum','White Rum','Dark Rum','Spiced Rum','Aged Rum','Cachaça','Tequila','Blanco','Reposado','Añejo','Mezcal','Gin','London Dry','Old Tom','Plymouth','Navy Strength','Botanical Gin','Sake','Junmai','Ginjo','Daiginjo','Nigori','Sparkling Sake','Shochu','Soju','Baijiu','Brandy','Cognac','Armagnac','Calvados','Grappa','Pisco','Liqueurs','Amaretto','Kahlua','Baileys','Grand Marnier','Cointreau','Chartreuse','Limoncello','Sambuca','Jägermeister','Milk/Dairy','Whole Milk','Skim Milk','2% Milk','Chocolate Milk','Buttermilk','Kefir','Lassi','Horchata','Eggnog','Plant Milk','Oat Milk','Almond Milk','Soy Milk','Coconut Milk','Cashew Milk','Rice Milk','Hemp Milk','Kombucha','Hard Kombucha','Jun','Tepache','Kvass','Cider','Hard Cider','Apple Cider','Mulled Cider','Mead','Functional Drinks','Probiotic Drinks','Collagen Drinks','CBD Drinks','Adaptogen Drinks','Electrolyte Drinks','Sports Drinks','Hot Chocolate','Horchata','Agua Fresca','Lemonade','Arnold Palmer','Iced Tea','Sweet Tea'].map(d => (
              <button key={d} onClick={() => toggleArrayItem('food', 'drinks', d, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.food?.drinks || []).includes(d) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{d}</button>
            ))}
          </div>
        </div>

        {/* ALCOHOL & COFFEE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍷 Relação com Álcool</h4>
            <select value={data.food?.alcoholRelation || ''} onChange={(e) => update('food', 'alcoholRelation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="never">Never — Não bebe (escolha pessoal)</option>
              <option value="cant">Cannot — Não pode (saúde, religião)</option>
              <option value="rarely">Rarely — Muito ocasionalmente</option>
              <option value="social">Social — Em eventos sociais</option>
              <option value="regular">Regular — Bebe regularmente</option>
              <option value="heavy">Heavy — Bebe muito/frequente</option>
              <option value="recovering">Recovering — Em recuperação</option>
            </select>
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">☕ Dependência de Café</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não bebe</span><span>IV Drip</span></div>
            <input type="range" min="1" max="9" value={data.food?.coffeeDependency || 5} onChange={(e) => update('food', 'coffeeDependency', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-amber-700 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        {/* COOKING & FAST FOOD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👨‍🍳 Frequência de Cozinhar</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Nunca</span><span>Sempre</span></div>
            <input type="range" min="1" max="9" value={data.food?.cookingFrequency || 5} onChange={(e) => update('food', 'cookingFrequency', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-orange-400 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍔 Atitude com Fast Food</h4>
            <select value={data.food?.fastFoodAttitude || ''} onChange={(e) => update('food', 'fastFoodAttitude', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="loves">Loves — Adora, come sempre que pode</option>
              <option value="enjoys">Enjoys — Gosta, mas com moderação</option>
              <option value="occasional">Occasional — Só quando conveniente</option>
              <option value="avoids">Avoids — Evita, prefere outras opções</option>
              <option value="refuses">Refuses — Nunca come, questão de princípio</option>
            </select>
          </div>
        </div>

        {/* COMFORT FOODS & GUILTY PLEASURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🤗 Comfort Foods</h4>
            <textarea value={data.food?.comfortFoods || ''} onChange={(e) => update('food', 'comfortFoods', e.target.value)} placeholder="Comidas que trazem conforto emocional..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😈 Guilty Pleasures</h4>
            <textarea value={data.food?.guiltyPleasures || ''} onChange={(e) => update('food', 'guiltyPleasures', e.target.value)} placeholder="Comidas 'proibidas' que adora secretamente..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: HOBBIES & LEISURE ==========
    2: (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-green-900 mb-2">🎨 HOBBIES & LAZER</h3>
          <p className="font-mono text-xs text-green-800 leading-relaxed">Passatempos, atividades físicas, hobbies criativos e formas de relaxar.</p>
        </div>

        {/* ACTIVE HOBBIES */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">🏃 Hobbies Ativos & Esportes</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Atividades físicas e esportivas. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Running','Jogging','Sprinting','Trail Running','Marathon','Ultra Running','Cross Country','Track & Field','Swimming','Lap Swimming','Open Water','Synchronized','Water Polo','Diving','Snorkeling','Cycling','Road Cycling','Mountain Biking','BMX','Cyclocross','Gravel Biking','Spinning','Triathlon','Gym/Weightlifting','Powerlifting','Olympic Lifting','Bodybuilding','CrossFit','Functional Fitness','Calisthenics','HIIT','Circuit Training','Bootcamp','Yoga','Vinyasa','Hatha','Ashtanga','Bikram/Hot Yoga','Restorative','Yin Yoga','Power Yoga','Aerial Yoga','Pilates','Mat Pilates','Reformer Pilates','Barre','Martial Arts','Karate','Taekwondo','Judo','Jiu-Jitsu','BJJ','Muay Thai','Kickboxing','MMA','Kung Fu','Wing Chun','Capoeira','Aikido','Krav Maga','Hapkido','Kendo','Fencing','Boxing','Kickboxing','Cardio Boxing','Dance','Ballet','Contemporary','Jazz Dance','Hip-Hop Dance','Breakdancing','Salsa','Bachata','Tango','Swing','Ballroom','Line Dancing','Belly Dance','Pole Dancing','Zumba','Aerobics','Step Aerobics','Tennis','Pickleball','Padel','Squash','Racquetball','Badminton','Table Tennis','Golf','Disc Golf','Mini Golf','Footgolf','Soccer','Futsal','Beach Soccer','Indoor Soccer','Basketball','3x3 Basketball','Streetball','Volleyball','Beach Volleyball','Indoor Volleyball','Baseball','Softball','Cricket','Rugby','Rugby Union','Rugby League','Touch Rugby','Flag Football','American Football','Touch Football','Hockey','Ice Hockey','Field Hockey','Roller Hockey','Street Hockey','Lacrosse','Ultimate Frisbee','Handball','Netball','Hiking','Day Hiking','Backpacking','Thru-Hiking','Peak Bagging','Climbing','Rock Climbing','Bouldering','Sport Climbing','Trad Climbing','Ice Climbing','Alpine Climbing','Indoor Climbing','Mountaineering','Surfing','Shortboard','Longboard','Bodyboarding','Stand Up Paddle','Windsurfing','Kitesurfing','Wakeboarding','Water Skiing','Jet Skiing','Skiing','Alpine Skiing','Cross-Country Skiing','Backcountry Skiing','Telemark','Snowboarding','Freestyle','Freeride','Splitboarding','Snowshoeing','Ice Skating','Figure Skating','Speed Skating','Roller Skating','Inline Skating','Roller Derby','Skateboarding','Street Skating','Vert Skating','Longboarding','Fishing','Fly Fishing','Deep Sea Fishing','Ice Fishing','Bass Fishing','Kayak Fishing','Spearfishing','Hunting','Big Game Hunting','Bird Hunting','Bow Hunting','Horseback Riding','Dressage','Show Jumping','Eventing','Trail Riding','Western Riding','Polo','Rodeo','Kayaking','White Water Kayaking','Sea Kayaking','Recreational Kayaking','Canoeing','Rowing','Crew/Sculling','Dragon Boat','Rafting','Scuba Diving','Technical Diving','Cave Diving','Wreck Diving','Free Diving','Sailing','Racing','Cruising','Catamaran','Windsurfing','Parkour','Freerunning','Obstacle Course Racing','Ninja Warrior','Mud Runs','Adventure Racing','Orienteering','Geocaching','Airsoft','Paintball','Archery','Target Archery','Field Archery','3D Archery','Shooting Sports','Target Shooting','Clay Pigeon','Biathlon','Motorsports','Go-Karting','Track Days','Rally','Motocross','ATV/Quad','Equestrian','Horse Racing','Polo','Rodeo','E-Sports','Competitive Gaming','Speed Running','VR Fitness','Beat Saber','Ring Fit','Walking','Power Walking','Nordic Walking','Racewalking','Dog Walking','Tai Chi','Qigong','Stretching','Foam Rolling','Animal Flow','Gymnastics','Artistic','Rhythmic','Trampoline','Acrobatics','Circus Arts','Aerial Silks','Trapeze','Cheerleading','Team Sports General','Individual Sports','Combat Sports','Water Sports','Winter Sports','Extreme Sports','Adventure Sports','Mind-Body','Outdoor Recreation','None'].map(h => (
              <button key={h} onClick={() => toggleArrayItem('hobbies', 'activeHobbies', h, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.activeHobbies || []).includes(h) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{h}</button>
            ))}
          </div>
        </div>

        {/* CREATIVE HOBBIES */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-2">🎨 Hobbies Criativos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Atividades artísticas e criativas. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {['Drawing/Sketching','Pencil Drawing','Charcoal','Ink Drawing','Gesture Drawing','Figure Drawing','Botanical Illustration','Architectural Drawing','Fashion Illustration','Caricature','Manga/Anime Art','Comic Art','Painting','Oil Painting','Acrylic','Watercolor','Gouache','Tempera','Encaustic','Spray Paint/Graffiti','Mural Art','Palette Knife','Plein Air','Abstract Painting','Portrait Painting','Landscape Painting','Still Life','Digital Art','Digital Painting','Digital Illustration','Concept Art','Character Design','Environment Design','Pixel Art','Voxel Art','Vector Art','3D Modeling','3D Sculpting','3D Animation','Motion Graphics','VFX','AI Art','NFT Art','Generative Art','Photography','Portrait Photography','Landscape Photography','Street Photography','Wildlife Photography','Macro Photography','Architectural Photography','Product Photography','Food Photography','Fashion Photography','Astrophotography','Drone Photography','Film Photography','Darkroom/Analog','Instant Film','Cyanotype','Alternative Processes','Photo Manipulation','Photo Editing','Videography','Short Films','Documentary','Music Videos','Vlogs','Cinematography','Video Editing','Color Grading','Sound Design','Stop Motion','Animation','Writing/Fiction','Novel Writing','Short Stories','Flash Fiction','Fan Fiction','Genre Fiction','Literary Fiction','Screenwriting','Playwriting','Journaling','Bullet Journaling','Art Journaling','Travel Journaling','Dream Journaling','Gratitude Journaling','Blogging','Personal Blog','Niche Blogging','Microblogging','Newsletter Writing','Poetry','Free Verse','Sonnets','Haiku','Slam Poetry','Spoken Word','Lyric Writing','Music/Instrument','Piano','Guitar','Acoustic Guitar','Electric Guitar','Bass Guitar','Ukulele','Violin','Viola','Cello','Double Bass','Harp','Drums','Percussion','Saxophone','Trumpet','Trombone','French Horn','Clarinet','Flute','Oboe','Bassoon','Harmonica','Accordion','Banjo','Mandolin','Synthesizer','Keyboard','Organ','Turntables','Electronic Music','Beatmaking','Singing','Choral','Opera','A Cappella','Beatboxing','Rapping','Voice Acting','DJing','Club DJ','Radio DJ','Wedding DJ','Turntablism','Music Production','Recording','Mixing','Mastering','Sound Engineering','Foley','Podcast Production','Audio Books','Acting','Theater Acting','Film Acting','Improv','Method Acting','Voice Acting','Motion Capture','Sculpting','Clay Sculpting','Stone Carving','Wood Carving','Ice Sculpting','Sand Sculpting','Wire Sculpture','Found Object Art','Pottery','Wheel Throwing','Hand Building','Glazing','Raku','Porcelain','Stoneware','Earthenware','Ceramic Sculpture','Knitting','Cable Knitting','Fair Isle','Lace Knitting','Sock Knitting','Sweater Making','Crocheting','Amigurumi','Granny Squares','Filet Crochet','Tunisian Crochet','Sewing','Garment Making','Alterations','Quilting','Patchwork','Embroidery','Cross-Stitch','Needlepoint','Hand Embroidery','Machine Embroidery','Beading','Weaving','Loom Weaving','Tapestry','Macramé','Basket Weaving','Felting','Wet Felting','Needle Felting','Woodworking','Furniture Making','Cabinetry','Turning','Whittling','Scroll Saw','Pyrography','Wood Burning','Marquetry','Metalworking','Blacksmithing','Jewelry Making','Silversmithing','Welding','Metal Sculpture','DIY Projects','Home Improvement','Upcycling','Restoration','Crafts','Paper Crafts','Origami','Kirigami','Quilling','Paper Mache','Card Making','Scrapbooking','Bookbinding','Leather Crafting','Candle Making','Soap Making','Resin Art','Epoxy','Glass Blowing','Stained Glass','Mosaic','Enamel','Cosplay','Costume Making','Prop Making','Armor Crafting','Wig Styling','Prosthetics','Makeup Art','Special FX Makeup','Body Painting','Face Painting','Nail Art','Henna','Calligraphy','Western Calligraphy','Chinese Calligraphy','Japanese Calligraphy','Arabic Calligraphy','Brush Lettering','Hand Lettering','Typography','Font Design','Graphic Design','Logo Design','Brand Design','Print Design','Packaging Design','UI/UX Design','Web Design','App Design','Game Design','Interior Design','Fashion Design','Textile Design','Pattern Making','Draping','Surface Design','Floral Design','Flower Arranging','Ikebana','Terrarium Making','Bonsai','Garden Design','Landscape Design','Cake Decorating','Sugar Art','Fondant','Food Styling','Mixology/Cocktail Creation','Perfume Making','Fragrance Blending','Aromatherapy','Herbalism','Tea Blending','Coffee Roasting','Fermentation/Brewing','Home Brewing','Wine Making','Mead Making','Kombucha','Pickling','Model Making','Scale Models','Miniatures','Diorama','Warhammer/Miniature Painting','Dollhouse','Model Trains','RC Vehicles','Drone Building','Robotics','Arduino','Raspberry Pi','Electronics','Circuit Design','Invention','Tattooing','Tattoo Design','Henna Design','None'].map(h => (
              <button key={h} onClick={() => toggleArrayItem('hobbies', 'creativeHobbies', h, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.creativeHobbies || []).includes(h) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{h}</button>
            ))}
          </div>
        </div>

        {/* MENTAL HOBBIES */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-2">🧠 Hobbies Mentais & Intelectuais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Atividades que exercitam a mente. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {['Chess','Speed Chess','Bullet Chess','Correspondence Chess','Chess Puzzles','Chess Variants','Shogi','Go/Weiqi','Xiangqi','Poker/Card Games','Texas Holdem','Omaha','Blackjack','Bridge','Canasta','Rummy','Gin Rummy','Spades','Hearts','Euchre','Pinochle','Cribbage','Solitaire','Patience','Magic: The Gathering','Puzzles/Crosswords','NYT Crossword','Cryptic Crosswords','Word Search','Anagrams','Sudoku','Killer Sudoku','Kakuro','Nonograms','Logic Puzzles','Jigsaw Puzzles','3D Puzzles','Mechanical Puzzles','Rubiks Cube','Speedcubing','Escape Rooms','Puzzle Boxes','Trivia/Quiz','Pub Trivia','Quiz Bowl','Jeopardy Style','Sporcle','General Knowledge','Specialized Trivia','Board Games','Euro Games','Catan','Ticket to Ride','Carcassonne','Agricola','Terraforming Mars','Wingspan','Scythe','Gloomhaven','Pandemic','Cooperative Games','Legacy Games','Deck Building','Dominion','Star Realms','Clank','Worker Placement','Lords of Waterdeep','Viticulture','Strategy Games','Risk','Axis & Allies','Twilight Imperium','Diplomacy','War Games','Wargaming','Miniatures Gaming','Warhammer 40K','Age of Sigmar','Historical Wargames','Party Games','Codenames','Dixit','Telestrations','Wavelength','Deception Games','Mafia/Werewolf','Secret Hitler','Avalon','Abstract Strategy','Azul','Sagrada','Hive','Santorini','Learning Languages','Spanish','French','German','Italian','Portuguese','Japanese','Chinese Mandarin','Korean','Arabic','Russian','Hindi','Greek','Latin','Hebrew','Sign Language','Constructed Languages','Esperanto','Conlangs','Language Exchange','Polyglot Challenge','Online Courses','Coursera','edX','Udemy','Skillshare','MasterClass','Khan Academy','MIT OpenCourseWare','University MOOCs','Certification Courses','Professional Development','Reading','Speed Reading','Book Clubs','Reading Challenges','Audiobooks','Research/Deep Dives','Wikipedia Rabbit Holes','Academic Papers','Investigative Research','OSINT','Fact Checking','Investing/Trading','Stock Trading','Day Trading','Swing Trading','Options','Futures','Forex','Crypto Trading','Value Investing','Index Investing','Real Estate Investing','Dividend Investing','Technical Analysis','Fundamental Analysis','Programming/Coding','Web Development','Mobile Development','Game Development','Data Science','Machine Learning','AI Development','Blockchain','Open Source','Competitive Programming','Hackathons','Code Golf','Automation','Scripting','Building PCs','Custom Builds','Overclocking','Water Cooling','Server Building','Home Lab','NAS Building','Tinkering/Electronics','Arduino Projects','Raspberry Pi','IoT','Home Automation','Smart Home','Soldering','Circuit Design','Radio/Ham Radio','Amateur Radio','SDR','Scanner Listening','3D Printing','FDM Printing','Resin Printing','3D Design','CAD','Parametric Design','Astronomy','Amateur Astronomy','Astrophotography','Telescope Building','Star Parties','Satellite Tracking','Space News','Birdwatching','Bird Photography','Bird Calls','Life Lists','eBird','Birding Tours','Genealogy','Family History','DNA Testing','Ancestry Research','Historical Records','Family Trees','Collecting','Stamps','Coins','Currency','Sports Cards','Trading Cards','Pokemon Cards','Vinyl Records','Vintage Items','Antiques','Art Collecting','Book Collecting','Wine Collecting','Sneaker Collecting','Watch Collecting','Memorabilia','Autographs','Comics','Action Figures','Minerals/Gems','Fossils','Maps','Vintage Tech','Philosophy','Reading Philosophy','Philosophical Debates','Ethics Discussions','Applied Philosophy','Meditation/Mindfulness','Meditation Apps','Mindfulness Practice','Breathwork','Contemplation','Writing Philosophy','Mathematics','Recreational Math','Math Puzzles','Statistics','Probability','Cryptography','Number Theory','History Study','Military History','Ancient History','Medieval Studies','Modern History','Local History','Science Study','Physics','Biology','Chemistry','Astronomy','Earth Science','Environmental Science','Current Events','News Analysis','Geopolitics','Economics','Politics','Debate','Competitive Debate','Casual Debate','Devils Advocate','Rhetoric','Critical Thinking','Logic','Argumentation','Fallacy Spotting','Memory Training','Memory Palace','Mnemonics','Speed Memory','Memory Competitions','Creativity Exercises','Brainstorming','Mind Mapping','Lateral Thinking','TRIZ','None'].map(h => (
              <button key={h} onClick={() => toggleArrayItem('hobbies', 'mentalHobbies', h, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.mentalHobbies || []).includes(h) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{h}</button>
            ))}
          </div>
        </div>

        {/* RELAXATION */}
        <div className="border-2 border-teal-200 rounded-sm p-4 bg-teal-50/30">
          <h4 className="font-mono text-sm font-bold text-teal-800 mb-2">😌 Atividades de Relaxamento</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como o personagem relaxa e recarrega. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {['Watching TV/Movies','Binge Watching','Movie Marathons','Rewatching Favorites','Comfort Shows','Background TV','Reading','Light Reading','Beach Reads','Comfort Rereads','Magazines','Comics/Manga','Napping/Sleeping','Power Naps','Sleep In','Afternoon Naps','Lazy Mornings','Taking Baths','Bubble Baths','Bath Bombs','Hot Springs','Sauna','Steam Room','Hot Tub','Cold Plunge','Walking','Leisurely Walks','Neighborhood Walks','Park Walks','Window Shopping','Aimless Wandering','Listening to Music','Background Music','Active Listening','Vinyl Sessions','Playlist Curating','Music Discovery','Podcasts','Playing Games','Casual Gaming','Mobile Games','Cozy Games','Replay Old Games','Scrolling Social Media','Mindless Scrolling','Meme Browsing','Reddit Browsing','TikTok','Instagram','Twitter Lurking','YouTube Rabbit Holes','Meditation','Guided Meditation','Mindfulness','Body Scan','Breathing Exercises','Progressive Relaxation','ASMR','Visualization','Yoga','Gentle Yoga','Restorative Yoga','Yin Yoga','Stretching','Light Stretching','Morning Stretch','Evening Routine','Foam Rolling','Cooking/Baking','Comfort Food Cooking','Baking Therapy','Meal Prep','Trying New Recipes','Slow Cooking','Gardening','Puttering in Garden','Watering Plants','Plant Care','Houseplants','Weeding','Flower Arranging','Pet Time','Cuddling Pets','Playing with Pets','Walking Dog','Grooming','Training','Just Being Together','Doing Nothing','Staring at Wall','Lying Down','Zoning Out','Quiet Time','Stillness','Nature/Outdoors','Sitting Outside','Porch Sitting','Park Bench','Beach Time','Forest Bathing','Star Gazing','Cloud Watching','Sunset Watching','Sunrise Watching','Shopping','Window Shopping','Online Shopping','Thrift Shopping','Browsing Stores','Retail Therapy','Spa/Self-Care','Face Masks','Skincare Routine','Manicure/Pedicure','Hair Care','Body Care','Massage','Self Massage','Aromatherapy','Essential Oils','Candle Lighting','Incense','Driving','Aimless Driving','Scenic Routes','Late Night Drives','Road Trips','Listening to Music in Car','People Watching','Cafe Sitting','Park Bench','Airport','Mall','Public Spaces','Daydreaming','Mind Wandering','Fantasy','Future Planning','Reminiscing','Imagination','Drinking Tea/Coffee','Tea Ceremony','Coffee Ritual','Morning Coffee','Afternoon Tea','Comfort Drinks','Comfort Foods','Snacking','Eating Treats','Guilty Pleasures','Midnight Snacks','Socializing Casually','Chatting with Friends','Phone Calls','Video Calls','Hanging Out','Comfortable Silence','Crafting','Easy Crafts','Adult Coloring','Diamond Painting','Simple Projects','Organizing','Tidying Up','Decluttering','Sorting Things','Marie Kondo Style','Rearranging','Cleaning','Satisfying Cleaning','Deep Cleaning','Light Tidying','Laundry','Ironing','Watching Sports','Casual Sports Viewing','Background Sports','Game Day','Watching Others Play Games','Twitch','YouTube Gaming','Let\'s Plays','Speedruns','Writing','Journaling','Free Writing','Letters','Lists','Planning','Home Activities','Puzzles','Board Games Solo','Card Games Solo','Crosswords','Sudoku','Hobbies at Easy Pace','Low-Key Creative Work','Maintenance Tasks','Photo Organizing','Listening to Rain','Thunderstorm Sounds','Nature Sounds','White Noise','Lo-Fi','Ambient Music','Binaural Beats','Sound Healing','Hammock','Swing','Rocking Chair','Lounging','Couch Time','Bed Lounging','Floor Time','Sunbathing','Tanning','Vitamin D','Light Exposure','Hugging/Cuddling','Physical Affection','Weighted Blanket','Cozy Clothes','Comfort Items','Sensory Items','Fidget Toys','Texture Play','Prayer/Spiritual','Religious Practice','Spiritual Reading','Contemplation','Gratitude Practice','Affirmations','Screen-Free Time','Digital Detox','Unplugging','Quiet Hours','Tech Sabbath','Nothing Specific','Just Existing','Being Present','Mindful Moments'].map(a => (
              <button key={a} onClick={() => toggleArrayItem('hobbies', 'relaxationActivities', a, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.relaxationActivities || []).includes(a) ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{a}</button>
            ))}
          </div>
        </div>

        {/* COLLECTIONS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📦 Coleções</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Se coleciona algo, descreva.</p>
          <textarea value={data.hobbies?.collects || ''} onChange={(e) => update('hobbies', 'collects', e.target.value)} placeholder="Ex: Vinil, selos, action figures, livros raros, moedas, arte, plantas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: STYLE & AESTHETICS ==========
    3: (
      <div className="space-y-6">
        <div className="bg-pink-50 border border-pink-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-pink-900 mb-2">👔 ESTILO & ESTÉTICA</h3>
          <p className="font-mono text-xs text-pink-800 leading-relaxed">Moda, aparência, cores preferidas, decoração e era estética favorita.</p>
        </div>

        {/* FASHION STYLE */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👕 Estilo de Moda</h4>
          <select value={data.style?.fashionStyle || ''} onChange={(e) => update('style', 'fashionStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <optgroup label="Basic Styles">
              <option value="casual">Casual — Jeans, camiseta, confortável</option>
              <option value="smart-casual">Smart Casual — Arrumado mas não formal</option>
              <option value="business-casual">Business Casual — Profissional relaxado</option>
              <option value="formal">Formal/Business — Profissional, elegante</option>
              <option value="black-tie">Black Tie — Formal de gala</option>
              <option value="cocktail">Cocktail — Semi-formal elegante</option>
            </optgroup>
            <optgroup label="Urban & Street">
              <option value="streetwear">Streetwear — Urban, marcas, sneakers</option>
              <option value="hypebeast">Hypebeast — Supreme, Off-White, hype brands</option>
              <option value="skater">Skater — Vans, Thrasher, loose fit</option>
              <option value="hip-hop">Hip-Hop — Oversized, chains, urban luxury</option>
              <option value="techwear">Techwear — Functional, futuristic, black</option>
              <option value="gorpcore">Gorpcore — Outdoor gear as fashion</option>
              <option value="normcore">Normcore — Deliberately plain, anti-fashion</option>
            </optgroup>
            <optgroup label="Alternative & Subculture">
              <option value="gothic">Gothic/Dark — Preto, alternativo, romantic</option>
              <option value="punk">Punk — Rebelde, DIY, patches, studs</option>
              <option value="grunge">Grunge — Flannel, torn jeans, messy</option>
              <option value="emo">Emo — Skinny jeans, band tees, fringe</option>
              <option value="scene">Scene — Colorful, layered, dramatic hair</option>
              <option value="metal">Metal — Band shirts, leather, dark</option>
              <option value="goth-romantic">Romantic Goth — Victorian, lace, velvet</option>
              <option value="cyber-goth">Cyber Goth — Neon, industrial, futuristic</option>
              <option value="pastel-goth">Pastel Goth — Soft colors with dark elements</option>
              <option value="nu-goth">Nu-Goth — Modern minimalist dark</option>
              <option value="witch-core">Witchy/Occult — Dark, mystical, symbolic</option>
            </optgroup>
            <optgroup label="Retro & Vintage">
              <option value="vintage">Vintage/Retro — Roupas de outras décadas</option>
              <option value="rockabilly">Rockabilly — 50s inspired, pompadour</option>
              <option value="pin-up">Pin-Up — 1940s-50s glamour</option>
              <option value="mod">Mod — 60s British, geometric</option>
              <option value="hippie">Hippie — 70s, tie-dye, peace symbols</option>
              <option value="disco">Disco — 70s glamour, shine</option>
              <option value="80s">80s Revival — Neon, big hair, bold</option>
              <option value="90s">90s Nostalgia — Baggy, denim, simple</option>
              <option value="y2k">Y2K — Low rise, butterfly clips, shiny</option>
              <option value="old-money">Old Money — Classic, inherited wealth aesthetic</option>
              <option value="quiet-luxury">Quiet Luxury — Subtle expensive, no logos</option>
            </optgroup>
            <optgroup label="Classic & Elegant">
              <option value="classic">Classic — Timeless pieces, quality basics</option>
              <option value="preppy">Preppy — Clássico, collegiate, polished</option>
              <option value="ivy-league">Ivy League — Academic, traditional</option>
              <option value="nautical">Nautical — Stripes, navy, maritime</option>
              <option value="equestrian">Equestrian — Riding inspired, tailored</option>
              <option value="country-club">Country Club — Tennis, golf aesthetic</option>
              <option value="parisian">Parisian Chic — Effortless French style</option>
              <option value="italian">Italian Style — Sharp, tailored, luxe</option>
              <option value="scandinavian">Scandinavian — Clean, minimal, functional</option>
            </optgroup>
            <optgroup label="Artistic & Creative">
              <option value="bohemian">Bohemian — Fluido, étnico, artístico</option>
              <option value="boho-chic">Boho Chic — Refined bohemian</option>
              <option value="artsy">Artsy — Creative, unusual combinations</option>
              <option value="avant-garde">Avant-Garde — Experimental, conceptual</option>
              <option value="fashion-forward">Fashion Forward — Trend-setting, bold</option>
              <option value="eclectic">Eclectic — Mistura de tudo, unique</option>
              <option value="maximalist">Maximalist — More is more, bold patterns</option>
            </optgroup>
            <optgroup label="Minimalist & Modern">
              <option value="minimalist">Minimalist — Cores neutras, peças simples</option>
              <option value="monochrome">Monochrome — One color palette</option>
              <option value="all-black">All Black — Everything black</option>
              <option value="clean-girl">Clean Girl — Natural, dewy, minimal</option>
              <option value="scandinavian-minimal">Scandi Minimal — Nordic simplicity</option>
              <option value="japanese-minimal">Japanese Minimal — Muji-style simplicity</option>
            </optgroup>
            <optgroup label="Active & Sport">
              <option value="athletic">Athletic/Sporty — Roupas esportivas</option>
              <option value="athleisure">Athleisure — Gym to street</option>
              <option value="yoga">Yoga/Wellness — Comfortable, stretchy</option>
              <option value="tennis-core">Tennis Core — Tennis skirts, polo</option>
              <option value="soccer-casual">Soccer Casual — Jerseys, tracksuits</option>
              <option value="hiking">Outdoor/Hiking — Functional outdoor wear</option>
            </optgroup>
            <optgroup label="Glamour & Statement">
              <option value="glamorous">Glamorous — Chamativo, luxuoso</option>
              <option value="hollywood">Hollywood Glam — Red carpet inspired</option>
              <option value="instagram-baddie">Instagram Baddie — Trendy, curated sexy</option>
              <option value="sexy">Sexy/Revealing — Body-confident, bold</option>
              <option value="club-wear">Club Wear — Night out, flashy</option>
              <option value="festival">Festival — Glitter, bold, expressive</option>
            </optgroup>
            <optgroup label="Cultural & Traditional">
              <option value="traditional">Traditional — Cultural garments</option>
              <option value="modest">Modest Fashion — Covered, elegant</option>
              <option value="hijabi">Hijabi Fashion — Modest with style</option>
              <option value="hanbok-inspired">Korean Traditional Inspired</option>
              <option value="kimono-inspired">Japanese Traditional Inspired</option>
              <option value="african">African Fashion — Ankara, Kente, traditional prints</option>
              <option value="indian">South Asian Fashion — Kurta, saree-inspired</option>
              <option value="latin">Latin Fashion — Colorful, passionate</option>
            </optgroup>
            <optgroup label="Japanese Street">
              <option value="harajuku">Harajuku — Eclectic Japanese street</option>
              <option value="kawaii">Kawaii — Cute, pastel, childlike</option>
              <option value="lolita">Lolita — Victorian doll aesthetic</option>
              <option value="gyaru">Gyaru — Glamorous, tanned, bold makeup</option>
              <option value="visual-kei">Visual Kei — Rock band inspired, dramatic</option>
              <option value="decora">Decora — Excessive accessories, colorful</option>
              <option value="fairy-kei">Fairy Kei — Pastel, 80s toys inspired</option>
              <option value="mori-kei">Mori Kei — Forest girl, natural</option>
              <option value="dark-mori">Dark Mori — Dark forest aesthetic</option>
            </optgroup>
            <optgroup label="Aesthetic Specific">
              <option value="cottagecore">Cottagecore — Rural, pastoral, handmade</option>
              <option value="dark-academia">Dark Academia — Scholarly, vintage, literary</option>
              <option value="light-academia">Light Academia — Lighter scholarly aesthetic</option>
              <option value="royalcore">Royalcore — Regal, crown motifs, luxe</option>
              <option value="fairycore">Fairycore — Ethereal, nature spirits</option>
              <option value="angelcore">Angelcore — Heavenly, white, pure</option>
              <option value="devilcore">Devilcore — Dark, red, edgy</option>
              <option value="cyberpunk">Cyberpunk — Dystopian future, neon</option>
              <option value="steampunk">Steampunk — Victorian + industrial</option>
              <option value="dieselpunk">Dieselpunk — 1920s-40s + diesel technology</option>
              <option value="solarpunk">Solarpunk — Sustainable future aesthetic</option>
              <option value="goblincore">Goblincore — Earthy, moss, found objects</option>
              <option value="clowncore">Clowncore — Circus, colorful, playful</option>
              <option value="kidcore">Kidcore — Nostalgic childhood, bright</option>
              <option value="weirdcore">Weirdcore — Surreal, unsettling</option>
            </optgroup>
            <optgroup label="Practical & Lifestyle">
              <option value="practical">Practical — Funcional acima de tudo</option>
              <option value="workwear">Workwear — Durable, functional</option>
              <option value="military">Military — Army surplus, tactical</option>
              <option value="western">Western — Cowboy, boots, denim</option>
              <option value="coastal">Coastal Grandmother — Relaxed, linen, beachy</option>
              <option value="soft-boy">Soft Boy — Pastel, cardigans, gentle</option>
              <option value="soft-girl">Soft Girl — Blush, hearts, cute</option>
              <option value="e-boy">E-Boy — TikTok, chain, striped undershirt</option>
              <option value="e-girl">E-Girl — TikTok, blush, winged liner</option>
              <option value="vsco-girl">VSCO Girl — Scrunchies, Hydro Flask</option>
              <option value="dad-style">Dad Style — Practical, comfortable, unfashionable</option>
              <option value="mom-style">Mom Style — Practical, comfortable, family-focused</option>
              <option value="no-style">No Defined Style — Veste o que tiver</option>
              <option value="anti-fashion">Anti-Fashion — Deliberately unfashionable</option>
              <option value="whatever-clean">Whatever is Clean — No thought given</option>
            </optgroup>
          </select>
        </div>

        {/* APPEARANCE IMPORTANCE & DRESS CODE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💄 Importância da Aparência</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não liga</span><span>Obsessed</span></div>
            <input type="range" min="1" max="9" value={data.style?.appearanceImportance || 5} onChange={(e) => update('style', 'appearanceImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-pink-400 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👔 Dress Code Pessoal</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Pijama OK</span><span>Sempre Arrumado</span></div>
            <input type="range" min="1" max="9" value={data.style?.dressCode || 5} onChange={(e) => update('style', 'dressCode', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-violet-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        {/* SIGNATURE ITEM */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⭐ Peça Signature / Item Característico</h4>
          <input type="text" value={data.style?.signatureItem || ''} onChange={(e) => update('style', 'signatureItem', e.target.value)} placeholder="Ex: Jaqueta de couro, óculos redondos, sempre de preto, relógio específico..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
        </div>

        {/* COLORS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">🎨 Cores</h4>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Cores Favoritas (até 3)</label>
              <div className="flex flex-wrap gap-2">
                {[
                  {name:'Black',color:'bg-black'},{name:'Charcoal',color:'bg-gray-800'},{name:'Jet Black',color:'bg-neutral-950'},
                  {name:'White',color:'bg-white border border-gray-300'},{name:'Off-White',color:'bg-stone-100'},{name:'Cream',color:'bg-amber-50'},
                  {name:'Ivory',color:'bg-yellow-50'},{name:'Pearl',color:'bg-gray-100'},
                  {name:'Gray',color:'bg-gray-500'},{name:'Light Gray',color:'bg-gray-300'},{name:'Dark Gray',color:'bg-gray-700'},{name:'Slate',color:'bg-slate-600'},
                  {name:'Red',color:'bg-red-500'},{name:'Crimson',color:'bg-red-700'},{name:'Scarlet',color:'bg-red-600'},{name:'Cherry',color:'bg-rose-600'},
                  {name:'Burgundy',color:'bg-rose-900'},{name:'Maroon',color:'bg-red-900'},{name:'Wine',color:'bg-rose-800'},{name:'Rust',color:'bg-orange-700'},
                  {name:'Orange',color:'bg-orange-500'},{name:'Tangerine',color:'bg-orange-400'},{name:'Peach',color:'bg-orange-200'},{name:'Coral',color:'bg-red-400'},
                  {name:'Salmon',color:'bg-red-300'},{name:'Apricot',color:'bg-orange-300'},{name:'Burnt Orange',color:'bg-orange-600'},
                  {name:'Yellow',color:'bg-yellow-400'},{name:'Golden Yellow',color:'bg-yellow-500'},{name:'Lemon',color:'bg-yellow-300'},{name:'Mustard',color:'bg-yellow-600'},
                  {name:'Amber',color:'bg-amber-500'},{name:'Honey',color:'bg-amber-400'},{name:'Marigold',color:'bg-yellow-500'},
                  {name:'Green',color:'bg-green-500'},{name:'Forest Green',color:'bg-green-800'},{name:'Emerald',color:'bg-emerald-500'},{name:'Jade',color:'bg-emerald-600'},
                  {name:'Sage',color:'bg-green-300'},{name:'Mint',color:'bg-green-200'},{name:'Olive',color:'bg-lime-700'},{name:'Lime',color:'bg-lime-500'},
                  {name:'Kelly Green',color:'bg-green-600'},{name:'Hunter Green',color:'bg-green-900'},{name:'Seafoam',color:'bg-emerald-200'},
                  {name:'Teal',color:'bg-teal-500'},{name:'Turquoise',color:'bg-cyan-400'},{name:'Aqua',color:'bg-cyan-300'},{name:'Cyan',color:'bg-cyan-500'},
                  {name:'Blue',color:'bg-blue-500'},{name:'Sky Blue',color:'bg-sky-400'},{name:'Baby Blue',color:'bg-blue-200'},{name:'Powder Blue',color:'bg-blue-300'},
                  {name:'Royal Blue',color:'bg-blue-700'},{name:'Cobalt',color:'bg-blue-600'},{name:'Sapphire',color:'bg-blue-800'},
                  {name:'Navy',color:'bg-blue-900'},{name:'Midnight Blue',color:'bg-indigo-950'},{name:'Steel Blue',color:'bg-slate-500'},
                  {name:'Indigo',color:'bg-indigo-600'},{name:'Periwinkle',color:'bg-indigo-300'},
                  {name:'Purple',color:'bg-purple-500'},{name:'Violet',color:'bg-violet-500'},{name:'Lavender',color:'bg-purple-300'},{name:'Lilac',color:'bg-purple-200'},
                  {name:'Plum',color:'bg-purple-800'},{name:'Eggplant',color:'bg-purple-900'},{name:'Amethyst',color:'bg-violet-600'},{name:'Orchid',color:'bg-fuchsia-400'},
                  {name:'Pink',color:'bg-pink-500'},{name:'Hot Pink',color:'bg-pink-600'},{name:'Magenta',color:'bg-fuchsia-600'},{name:'Fuchsia',color:'bg-fuchsia-500'},
                  {name:'Rose',color:'bg-rose-400'},{name:'Blush',color:'bg-pink-200'},{name:'Baby Pink',color:'bg-pink-100'},{name:'Dusty Rose',color:'bg-rose-300'},
                  {name:'Mauve',color:'bg-pink-300'},{name:'Bubblegum',color:'bg-pink-400'},
                  {name:'Brown',color:'bg-amber-700'},{name:'Chocolate',color:'bg-amber-900'},{name:'Coffee',color:'bg-amber-800'},{name:'Espresso',color:'bg-stone-800'},
                  {name:'Tan',color:'bg-amber-300'},{name:'Caramel',color:'bg-amber-600'},{name:'Cinnamon',color:'bg-orange-800'},{name:'Terracotta',color:'bg-orange-700'},
                  {name:'Sienna',color:'bg-amber-700'},{name:'Umber',color:'bg-stone-700'},{name:'Taupe',color:'bg-stone-400'},
                  {name:'Beige',color:'bg-amber-100'},{name:'Sand',color:'bg-amber-200'},{name:'Khaki',color:'bg-yellow-700'},{name:'Oatmeal',color:'bg-stone-200'},
                  {name:'Gold',color:'bg-yellow-600'},{name:'Champagne',color:'bg-yellow-100'},{name:'Bronze',color:'bg-amber-600'},
                  {name:'Copper',color:'bg-orange-600'},{name:'Rose Gold',color:'bg-rose-300'},
                  {name:'Silver',color:'bg-gray-400'},{name:'Platinum',color:'bg-gray-300'},{name:'Pewter',color:'bg-gray-500'},
                  {name:'Neon Pink',color:'bg-pink-500'},{name:'Neon Green',color:'bg-lime-400'},{name:'Neon Yellow',color:'bg-yellow-300'},
                  {name:'Neon Orange',color:'bg-orange-400'},{name:'Electric Blue',color:'bg-blue-400'}
                ].map(c => (
                  <button key={c.name} onClick={() => toggleArrayItem('style', 'favoriteColors', c.name, 3)} className={`px-3 py-1 rounded-full font-mono text-[9px] transition-all flex items-center gap-1 ${(data.style?.favoriteColors || []).includes(c.name) ? 'ring-2 ring-offset-1 ring-pink-500' : ''}`}>
                    <span className={`w-3 h-3 rounded-full ${c.color}`}></span> {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Cores que Evita (até 2)</label>
              <div className="flex flex-wrap gap-2">
                {['Black','White','Gray','Red','Orange','Yellow','Green','Blue','Purple','Pink','Brown','Neon','Pastels','None'].map(c => (
                  <button key={c} onClick={() => toggleArrayItem('style', 'avoidColors', c, 2)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.style?.avoidColors || []).includes(c) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Paleta Geral</label>
              <select value={data.style?.colorPalette || ''} onChange={(e) => update('style', 'colorPalette', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="bright">Bright & Vibrant — Cores vivas e chamativas</option>
                <option value="muted">Muted & Soft — Tons suaves e apagados</option>
                <option value="dark">Dark & Moody — Tons escuros e dramáticos</option>
                <option value="neutral">Neutral — Preto, branco, bege, cinza</option>
                <option value="earthy">Earthy — Tons terrosos, naturais</option>
                <option value="pastel">Pastel — Tons claros e delicados</option>
                <option value="colorful">Colorful — Arco-íris, muitas cores</option>
                <option value="monochrome">Monochrome — Uma cor só, variações de tom</option>
              </select>
            </div>
          </div>
        </div>

        {/* DECORATION STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏠 Estilo de Decoração</h4>
            <select value={data.style?.decorStyle || ''} onChange={(e) => update('style', 'decorStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <optgroup label="Modern & Contemporary">
                <option value="modern">Modern/Contemporary — Linhas limpas, atual</option>
                <option value="minimalist">Minimalist — Pouco, funcional, espaço</option>
                <option value="mid-century-modern">Mid-Century Modern — 1950s-60s design icons</option>
                <option value="contemporary">Contemporary — Current trends, evolving</option>
                <option value="transitional">Transitional — Traditional meets modern</option>
                <option value="urban-modern">Urban Modern — City loft aesthetic</option>
              </optgroup>
              <optgroup label="Traditional & Classic">
                <option value="traditional">Traditional — Clássico, atemporal</option>
                <option value="classic">Classic — Timeless elegance</option>
                <option value="victorian">Victorian — Ornate, antique, dramatic</option>
                <option value="edwardian">Edwardian — Elegant, lighter Victorian</option>
                <option value="georgian">Georgian — 18th century English</option>
                <option value="colonial">Colonial — American colonial style</option>
                <option value="art-deco">Art Deco — 1920s-30s glamour, geometric</option>
                <option value="art-nouveau">Art Nouveau — Organic curves, nature</option>
                <option value="baroque">Baroque — Ornate, gilded, dramatic</option>
                <option value="rococo">Rococo — Elaborate, pastel, romantic</option>
                <option value="neoclassical">Neoclassical — Greek/Roman inspired</option>
                <option value="regency">Regency — Early 19th century British</option>
              </optgroup>
              <optgroup label="Industrial & Urban">
                <option value="industrial">Industrial — Tijolos, metal, urbano</option>
                <option value="warehouse">Warehouse — Raw, open, converted</option>
                <option value="loft">Loft — Open plan, high ceilings</option>
                <option value="urban">Urban Industrial — City grit, exposed</option>
                <option value="steampunk-decor">Steampunk — Victorian industrial fusion</option>
              </optgroup>
              <optgroup label="Bohemian & Eclectic">
                <option value="bohemian">Bohemian — Plantas, texturas, global</option>
                <option value="boho-chic">Boho Chic — Refined bohemian</option>
                <option value="eclectic">Eclectic — Mistura de estilos</option>
                <option value="maximalist">Maximalist — Cheio, colorido, coleções</option>
                <option value="global">Global/World — Multicultural influences</option>
                <option value="moroccan">Moroccan — Tiles, lanterns, rich colors</option>
                <option value="indian">Indian — Vibrant, ornate, textiles</option>
              </optgroup>
              <optgroup label="Scandinavian & Nordic">
                <option value="scandinavian">Scandinavian — Claro, madeira, hygge</option>
                <option value="nordic">Nordic — Clean, functional, cozy</option>
                <option value="danish-modern">Danish Modern — Mid-century Nordic</option>
                <option value="hygge">Hygge — Cozy, warm, comfortable</option>
                <option value="lagom">Lagom — Swedish balance, just right</option>
              </optgroup>
              <optgroup label="Vintage & Retro">
                <option value="vintage">Vintage/Retro — Móveis antigos, nostalgia</option>
                <option value="retro">Retro — Specific era throwback</option>
                <option value="50s-retro">1950s Retro — Atomic age, pastels</option>
                <option value="60s-retro">1960s Retro — Mod, pop art</option>
                <option value="70s-retro">1970s Retro — Earth tones, shag</option>
                <option value="80s-retro">1980s Retro — Memphis, neon, bold</option>
                <option value="90s-retro">1990s Retro — Minimalist, natural</option>
                <option value="shabby-chic">Shabby Chic — Worn, feminine, vintage</option>
                <option value="cottagecore-decor">Cottagecore — Rural, handmade, nostalgic</option>
              </optgroup>
              <optgroup label="Rustic & Natural">
                <option value="rustic">Rustic — Madeira, campo, aconchegante</option>
                <option value="farmhouse">Farmhouse — Country charm, practical</option>
                <option value="modern-farmhouse">Modern Farmhouse — Updated country</option>
                <option value="cabin">Cabin — Lodge, mountain, cozy</option>
                <option value="lodge">Lodge — Hunting lodge, masculine</option>
                <option value="country">Country — Traditional rural charm</option>
                <option value="french-country">French Country — Provence inspired</option>
                <option value="tuscan">Tuscan — Italian countryside warmth</option>
                <option value="southwestern">Southwestern — Desert, Native American</option>
              </optgroup>
              <optgroup label="Coastal & Beach">
                <option value="coastal">Coastal — Beach, nautical, relaxed</option>
                <option value="beach-house">Beach House — Sandy, light, casual</option>
                <option value="nautical">Nautical — Maritime, navy, rope</option>
                <option value="hamptons">Hamptons — Elegant beach, white</option>
                <option value="tropical">Tropical — Island, palms, bright</option>
                <option value="caribbean">Caribbean — Colorful, island, relaxed</option>
                <option value="mediterranean">Mediterranean — Blue, white, terracotta</option>
              </optgroup>
              <optgroup label="Asian Inspired">
                <option value="japanese">Japanese — Minimalist, zen, natural</option>
                <option value="wabi-sabi">Wabi-Sabi — Imperfection, simplicity</option>
                <option value="zen">Zen — Peaceful, minimal, balanced</option>
                <option value="chinese">Chinese — Red, gold, ornate</option>
                <option value="asian-fusion">Asian Fusion — Mixed Asian influences</option>
                <option value="korean">Korean — Modern, minimal, functional</option>
              </optgroup>
              <optgroup label="Glamorous & Luxe">
                <option value="glam">Hollywood Glam — Luxurious, dramatic</option>
                <option value="hollywood-regency">Hollywood Regency — Bold, glamorous</option>
                <option value="luxury">Luxury — High-end, expensive materials</option>
                <option value="parisian">Parisian — French elegance, ornate</option>
                <option value="french">French — Elegant, romantic, refined</option>
              </optgroup>
              <optgroup label="Specific Aesthetics">
                <option value="dark-academia-decor">Dark Academia — Books, leather, wood</option>
                <option value="light-academia-decor">Light Academia — Bright, scholarly</option>
                <option value="witchy">Witchy/Occult — Mystical, dark, crystals</option>
                <option value="gothic-decor">Gothic — Dark, dramatic, ornate</option>
                <option value="punk-decor">Punk — DIY, rebellious, edgy</option>
                <option value="kawaii-decor">Kawaii — Cute, pastel, playful</option>
                <option value="anime">Anime/Otaku — Collectibles, posters</option>
                <option value="gamer">Gamer — RGB, tech, collectibles</option>
                <option value="memphis">Memphis Design — Bold 80s, geometric</option>
                <option value="brutalist">Brutalist — Concrete, raw, bold</option>
                <option value="biophilic">Biophilic — Plants, nature, green</option>
                <option value="organic-modern">Organic Modern — Natural shapes, materials</option>
              </optgroup>
              <optgroup label="Practical">
                <option value="functional">Functional — Practical, organized</option>
                <option value="bachelor-pad">Bachelor Pad — Masculine, simple</option>
                <option value="student">Student — Budget, temporary, practical</option>
                <option value="family">Family-Friendly — Durable, safe, practical</option>
                <option value="pet-friendly">Pet-Friendly — Durable, washable</option>
                <option value="dont-care">Does Not Care — Funcional, sem estilo</option>
              </optgroup>
            </select>
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📐 Nível de Organização</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Caótico</span><span>Impecável</span></div>
            <input type="range" min="1" max="9" value={data.style?.organizationLevel || 5} onChange={(e) => update('style', 'organizationLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-blue-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        {/* SPACE IMPORTANCE */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚪 Importância do Espaço Pessoal</h4>
          <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não liga</span><span>Muito importante</span></div>
          <input type="range" min="1" max="9" value={data.style?.spaceImportance || 5} onChange={(e) => update('style', 'spaceImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-indigo-400 rounded-lg appearance-none cursor-pointer" />
        </div>

        {/* FAVORITE ERA */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🕰️ Era/Época Estética Favorita</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={data.style?.favoriteEra || ''} onChange={(e) => update('style', 'favoriteEra', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="ancient">Ancient (Greek, Roman, Egyptian)</option>
              <option value="medieval">Medieval (Knights, Castles)</option>
              <option value="renaissance">Renaissance (1400s-1600s)</option>
              <option value="victorian">Victorian (1837-1901)</option>
              <option value="edwardian">Edwardian/Belle Époque (1900-1910s)</option>
              <option value="1920s">1920s (Art Deco, Jazz Age)</option>
              <option value="1940s">1940s (WWII Era, Classic Hollywood)</option>
              <option value="1950s">1950s (Mid-Century, Rock and Roll)</option>
              <option value="1960s">1960s (Mod, Hippie, Space Age)</option>
              <option value="1970s">1970s (Disco, Bohemian)</option>
              <option value="1980s">1980s (Neon, Synth, Excess)</option>
              <option value="1990s">1990s (Grunge, Minimalism)</option>
              <option value="y2k">Y2K/2000s (Cyber, Pop)</option>
              <option value="2010s">2010s (Hipster, Instagram)</option>
              <option value="futuristic">Futuristic (Sci-Fi, Cyberpunk)</option>
              <option value="timeless">Timeless/No Preference</option>
            </select>
            <input type="text" value={data.style?.eraReason || ''} onChange={(e) => update('style', 'eraReason', e.target.value)} placeholder="Por quê? (nostalgia, estética, história...)" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 4: TASTES & PREFERENCES ==========
    4: (
      <div className="space-y-6">
        <div className="bg-cyan-50 border border-cyan-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-cyan-900 mb-2">⭐ GOSTOS & PREFERÊNCIAS</h3>
          <p className="font-mono text-xs text-cyan-800 leading-relaxed">Preferências gerais: clima, ambiente, animais, viagem e tendências pessoais.</p>
        </div>

        {/* ENVIRONMENT */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">🌍 Ambiente & Clima</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Natureza vs Urbano</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>🌲 Nature</span><span>🏙️ Urban</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.natureUrban || 5} onChange={(e) => update('preferences', 'natureUrban', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 to-gray-500 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Clima Preferido</label>
                <select value={data.preferences?.climate || ''} onChange={(e) => update('preferences', 'climate', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="tropical">Tropical — Quente e úmido o ano todo</option>
                  <option value="mediterranean">Mediterranean — Verões secos, invernos suaves</option>
                  <option value="temperate">Temperate — Quatro estações distintas</option>
                  <option value="continental">Continental — Extremos de calor e frio</option>
                  <option value="arid">Arid/Desert — Quente e seco</option>
                  <option value="arctic">Cold/Arctic — Frio a maior parte do ano</option>
                  <option value="mild">Mild — Nem muito quente nem muito frio</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estação Favorita</label>
                <select value={data.preferences?.season || ''} onChange={(e) => update('preferences', 'season', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="spring">🌸 Spring — Renovação, flores, clima ameno</option>
                  <option value="summer">☀️ Summer — Calor, praia, dias longos</option>
                  <option value="fall">🍂 Fall — Folhas, colheita, clima fresco</option>
                  <option value="winter">❄️ Winter — Frio, neve, festas</option>
                  <option value="no-preference">No Preference</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Horário do Dia</label>
                <select value={data.preferences?.timeOfDay || ''} onChange={(e) => update('preferences', 'timeOfDay', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="early-morning">🌅 Early Morning (5-8am)</option>
                  <option value="morning">☀️ Morning Person (8am-12pm)</option>
                  <option value="afternoon">🌤️ Afternoon (12-5pm)</option>
                  <option value="evening">🌆 Evening (5-9pm)</option>
                  <option value="night">🌙 Night Owl (9pm-1am)</option>
                  <option value="late-night">🦇 Late Night (1-5am)</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Silêncio vs Ruído</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>🤫 Silence</span><span>🔊 Noise</span></div>
                <input type="range" min="1" max="9" value={data.preferences?.silenceNoise || 5} onChange={(e) => update('preferences', 'silenceNoise', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-300 to-orange-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* ANIMALS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🐾 Animais</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Animais Favoritos (até 3)</label>
              <div className="flex flex-wrap gap-2">
                {['Dogs','Puppies','Golden Retriever','Labrador','German Shepherd','Husky','Corgi','Poodle','Bulldog','Beagle','Border Collie','Shiba Inu','Pomeranian','Chihuahua','Great Dane','Rottweiler','Dalmatian','Pit Bull','Cats','Kittens','Persian','Siamese','Maine Coon','British Shorthair','Scottish Fold','Bengal','Ragdoll','Sphynx','Tabby','Black Cat','Orange Tabby','Tuxedo Cat','Horses','Wild Horses','Ponies','Unicorns','Pegasus','Zebras','Donkeys','Birds','Parrots','Macaws','Cockatoos','Budgies','Cockatiels','Lovebirds','Canaries','Finches','Doves','Pigeons','Crows','Ravens','Magpies','Hummingbirds','Peacocks','Flamingos','Swans','Ducks','Geese','Chickens','Roosters','Turkeys','Fish','Goldfish','Koi','Betta Fish','Tropical Fish','Clownfish','Sharks','Great White Shark','Whale Shark','Manta Rays','Stingrays','Seahorses','Jellyfish','Octopus','Squid','Starfish','Sea Turtles','Rabbits','Bunnies','Lop-Eared Rabbits','Hamsters','Guinea Pigs','Chinchillas','Ferrets','Gerbils','Mice','Rats','Hedgehogs','Sugar Gliders','Snakes','Pythons','Boa Constrictors','Corn Snakes','Ball Pythons','Cobras','Rattlesnakes','Lizards','Geckos','Leopard Geckos','Bearded Dragons','Chameleons','Iguanas','Komodo Dragons','Monitor Lizards','Salamanders','Newts','Axolotls','Frogs','Tree Frogs','Poison Dart Frogs','Toads','Turtles','Tortoises','Box Turtles','Crocodiles','Alligators','Spiders','Tarantulas','Jumping Spiders','Black Widows','Scorpions','Crabs','Hermit Crabs','Lobsters','Shrimp','Insects','Butterflies','Monarch Butterflies','Moths','Luna Moths','Ladybugs','Fireflies','Dragonflies','Damselflies','Bees','Bumblebees','Honeybees','Praying Mantis','Beetles','Stag Beetles','Rhinoceros Beetles','Ants','Caterpillars','Grasshoppers','Crickets','Cicadas','Wolves','Gray Wolves','Arctic Wolves','Timber Wolves','Werewolves','Lions','Lionesses','White Lions','Tigers','Bengal Tigers','White Tigers','Siberian Tigers','Bears','Grizzly Bears','Polar Bears','Black Bears','Panda Bears','Red Pandas','Koalas','Sun Bears','Sloth Bears','Elephants','African Elephants','Asian Elephants','Baby Elephants','Mammoths','Dolphins','Bottlenose Dolphins','Orcas/Killer Whales','Porpoises','Whales','Blue Whales','Humpback Whales','Sperm Whales','Beluga Whales','Narwhals','Owls','Barn Owls','Snowy Owls','Great Horned Owls','Burrowing Owls','Eagle Owls','Eagles','Bald Eagles','Golden Eagles','Hawks','Falcons','Peregrine Falcons','Vultures','Condors','Ospreys','Foxes','Red Foxes','Arctic Foxes','Fennec Foxes','Gray Foxes','Deer','Fawns','Elk','Moose','Reindeer','Caribou','Antelope','Gazelles','Impala','Pandas','Giant Pandas','Red Pandas','Penguins','Emperor Penguins','King Penguins','Adelie Penguins','Little Blue Penguins','Puffins','Monkeys','Chimpanzees','Gorillas','Orangutans','Bonobos','Baboons','Macaques','Capuchins','Spider Monkeys','Howler Monkeys','Lemurs','Ring-Tailed Lemurs','Aye-Ayes','Gibbons','Sloths','Two-Toed Sloths','Three-Toed Sloths','Anteaters','Armadillos','Pangolins','Bats','Flying Foxes','Fruit Bats','Vampire Bats','Squirrels','Chipmunks','Flying Squirrels','Prairie Dogs','Groundhogs','Beavers','Otters','Sea Otters','River Otters','Seals','Sea Lions','Walruses','Manatees','Dugongs','Hippos','Pygmy Hippos','Rhinos','White Rhinos','Black Rhinos','Giraffes','Okapi','Camels','Llamas','Alpacas','Vicuñas','Kangaroos','Wallabies','Wombats','Tasmanian Devils','Platypus','Possums','Opossums','Raccoons','Badgers','Honey Badgers','Wolverines','Minks','Weasels','Stoats','Skunks','Porcupines','Hyenas','Cheetahs','Leopards','Snow Leopards','Clouded Leopards','Jaguars','Panthers','Black Panthers','Cougars/Mountain Lions','Lynx','Bobcats','Caracals','Servals','Ocelots','Wildcats','Buffalos','Bison','Yaks','Oxen','Bulls','Cows','Highland Cattle','Goats','Mountain Goats','Ibex','Sheep','Bighorn Sheep','Lambs','Pigs','Wild Boars','Warthogs','Tapirs','Mongooses','Meerkats','Aardvarks','Capybaras','Nutrias','Maras','Chinchillas','Pikas','Hares','Jackrabbits','Coyotes','Dingoes','Jackals','African Wild Dogs','Dholes','Dinosaurs','T-Rex','Velociraptors','Triceratops','Brontosaurus','Pterodactyls','Stegosaurus','Dragons','Phoenix','Griffins','Mythical Creatures','None'].map(a => (
                  <button key={a} onClick={() => toggleArrayItem('preferences', 'favoriteAnimals', a, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.preferences?.favoriteAnimals || []).includes(a) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{a}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Preferência de Pet</label>
                <select value={data.preferences?.petPreference || ''} onChange={(e) => update('preferences', 'petPreference', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="dogs">🐕 Dogs — Definitivamente cães</option>
                  <option value="cats">🐈 Cats — Definitivamente gatos</option>
                  <option value="both">Both — Ama os dois igualmente</option>
                  <option value="small">Small Pets — Hamsters, coelhos, etc.</option>
                  <option value="exotic">Exotic — Répteis, aves, exóticos</option>
                  <option value="fish">Fish/Aquarium — Peixes</option>
                  <option value="none">No Pets — Não quer ter pets</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relação com Animais</label>
                <select value={data.preferences?.animalRelation || ''} onChange={(e) => update('preferences', 'animalRelation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="loves">Loves — Adora todos os animais</option>
                  <option value="likes">Likes — Gosta da maioria</option>
                  <option value="neutral">Neutral — Indiferente</option>
                  <option value="selective">Selective — Gosta de alguns, não de outros</option>
                  <option value="fears">Fears — Tem medo de muitos</option>
                  <option value="allergic">Allergic — Alérgico</option>
                  <option value="dislikes">Dislikes — Não gosta de animais</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TRAVEL */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">✈️ Viagem</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo de Viagem</label>
                <select value={data.preferences?.travelStyle || ''} onChange={(e) => update('preferences', 'travelStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <optgroup label="Accommodation Style">
                    <option value="luxury">Luxury — 5 estrelas, conforto máximo</option>
                    <option value="ultra-luxury">Ultra-Luxury — Private jets, villas</option>
                    <option value="boutique">Boutique Hotels — Unique, designed</option>
                    <option value="comfortable">Comfortable — Bom hotel, sem exageros</option>
                    <option value="mid-range">Mid-Range — 3-4 stars, reliable</option>
                    <option value="budget">Budget — Basic but clean</option>
                    <option value="backpacker">Backpacker — Mochilão, hostels, budget</option>
                    <option value="hostel">Hostel Hopper — Social, shared</option>
                    <option value="airbnb">Airbnb/Vacation Rental — Local living</option>
                    <option value="couchsurfing">Couchsurfing — Free, social, trusting</option>
                    <option value="camping">Camping — Tent, under the stars</option>
                    <option value="glamping">Glamping — Luxury camping</option>
                    <option value="rv">RV/Campervan — Mobile home</option>
                    <option value="van-life">Van Life — Minimalist mobile</option>
                  </optgroup>
                  <optgroup label="Activity Focus">
                    <option value="adventure">Adventure — Trilhas, radical, natureza</option>
                    <option value="extreme">Extreme Adventure — Skydiving, bungee</option>
                    <option value="hiking">Hiking/Trekking — Trails, mountains</option>
                    <option value="mountaineering">Mountaineering — Summits, climbing</option>
                    <option value="safari">Safari — Wildlife, Africa</option>
                    <option value="wildlife">Wildlife Tourism — Animal focused</option>
                    <option value="scuba">Scuba/Diving — Underwater exploration</option>
                    <option value="surfing-travel">Surf Travel — Chasing waves</option>
                    <option value="ski">Ski/Snow — Winter sports destinations</option>
                    <option value="cultural">Cultural — Museus, história, locais</option>
                    <option value="historical">Historical — Ancient sites, ruins</option>
                    <option value="religious">Religious/Pilgrimage — Spiritual sites</option>
                    <option value="culinary">Culinary/Food — Eating, cooking classes</option>
                    <option value="wine">Wine Tourism — Vineyards, tastings</option>
                    <option value="beer">Beer Tourism — Breweries, pubs</option>
                    <option value="coffee">Coffee Tourism — Origins, cafes</option>
                    <option value="shopping">Shopping — Markets, outlets, fashion</option>
                    <option value="art">Art Tourism — Galleries, installations</option>
                    <option value="music">Music Tourism — Concerts, festivals</option>
                    <option value="festival">Festival Hopping — Events, celebrations</option>
                    <option value="nightlife">Nightlife — Clubs, bars, parties</option>
                    <option value="wellness">Wellness/Spa — Retreats, healing</option>
                    <option value="yoga-retreat">Yoga/Meditation Retreat — Spiritual</option>
                    <option value="volunteering">Voluntourism — Giving back</option>
                    <option value="educational">Educational — Learning, courses</option>
                    <option value="photography">Photography — Capturing beauty</option>
                  </optgroup>
                  <optgroup label="Destination Type">
                    <option value="beach">Beach — Resort, praia, relaxar</option>
                    <option value="tropical-island">Tropical Island — Paradise, palm trees</option>
                    <option value="all-inclusive">All-Inclusive Resort — Everything included</option>
                    <option value="city">City Explorer — Cidades, urbano, nightlife</option>
                    <option value="capital-cities">Capital Cities — Major cities only</option>
                    <option value="off-beaten-path">Off the Beaten Path — Hidden gems</option>
                    <option value="small-towns">Small Towns — Local, authentic</option>
                    <option value="countryside">Countryside — Rural, peaceful</option>
                    <option value="mountain">Mountain — Altitude, views</option>
                    <option value="desert">Desert — Sand, extreme, unique</option>
                    <option value="arctic">Arctic/Antarctic — Cold, remote</option>
                    <option value="rainforest">Rainforest/Jungle — Biodiversity</option>
                    <option value="national-parks">National Parks — Nature preserved</option>
                  </optgroup>
                  <optgroup label="Travel Style">
                    <option value="road-trip">Road Trip — Carro, estrada, flexível</option>
                    <option value="train">Train Travel — Scenic railways</option>
                    <option value="cruise">Cruise — Cruzeiros, tudo incluído</option>
                    <option value="river-cruise">River Cruise — Intimate, scenic</option>
                    <option value="expedition-cruise">Expedition Cruise — Adventure at sea</option>
                    <option value="sailing">Sailing — Wind-powered, freedom</option>
                    <option value="motorcycle">Motorcycle — Two wheels, freedom</option>
                    <option value="bicycle">Bicycle Touring — Slow, immersive</option>
                    <option value="group-tour">Group Tour — Organized, social</option>
                    <option value="private-tour">Private Tour — Exclusive, personalized</option>
                    <option value="self-guided">Self-Guided — Independent, flexible</option>
                    <option value="spontaneous">Spontaneous — No plans, go with flow</option>
                    <option value="meticulously-planned">Meticulously Planned — Every detail</option>
                    <option value="slow-travel">Slow Travel — Extended stays, immersion</option>
                    <option value="speed-travel">Speed Travel — Many places, little time</option>
                    <option value="digital-nomad">Digital Nomad — Work while traveling</option>
                    <option value="gap-year">Gap Year — Extended world travel</option>
                    <option value="weekend-trips">Weekend Trips — Short escapes</option>
                    <option value="staycation">Staycation — Local tourism</option>
                    <option value="homebody">Homebody — Prefere ficar em casa</option>
                  </optgroup>
                  <optgroup label="Social Style">
                    <option value="solo">Solo Travel — Independent, self-discovery</option>
                    <option value="couple">Couples Travel — Romantic getaways</option>
                    <option value="family">Family Travel — Kid-friendly</option>
                    <option value="friends">Friend Groups — Social adventures</option>
                    <option value="girls-trip">Girls Trip — Female bonding</option>
                    <option value="guys-trip">Guys Trip — Male bonding</option>
                    <option value="meeting-locals">Meeting Locals — Authentic connections</option>
                    <option value="avoiding-tourists">Avoiding Tourists — Local experience</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Frequência Ideal</label>
                <select value={data.preferences?.travelFrequency || ''} onChange={(e) => update('preferences', 'travelFrequency', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="homebody">Homebody — Raramente/nunca viaja</option>
                  <option value="occasional">Occasional — 1x por ano ou menos</option>
                  <option value="regular">Regular — Algumas vezes por ano</option>
                  <option value="frequent">Frequent — Viaja bastante</option>
                  <option value="constant">Constant — Sempre viajando</option>
                  <option value="nomad">Digital Nomad — Vida nômade</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Destinos Favoritos/Sonho</label>
              <input type="text" value={data.preferences?.travelDestinations || ''} onChange={(e) => update('preferences', 'travelDestinations', e.target.value)} placeholder="Ex: Japão, Itália, Nova York, Patagônia..." className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]" />
            </div>
          </div>
        </div>

        {/* PERSONAL TENDENCIES */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-3">🎚️ Tendências Pessoais</h4>
          
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Rotina vs Espontaneidade</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>📅 Routine</span><span>🎲 Spontaneous</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.routineSpontaneity || 5} onChange={(e) => update('preferences', 'routineSpontaneity', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Planejamento vs Improviso</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>📋 Planner</span><span>🌊 Go with Flow</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.planningImproving || 5} onChange={(e) => update('preferences', 'planningImproving', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 to-orange-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Qualidade vs Quantidade</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>💎 Quality</span><span>📦 Quantity</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.qualityQuantity || 5} onChange={(e) => update('preferences', 'qualityQuantity', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-purple-400 to-teal-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nostalgia vs Novidade</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>📼 Nostalgic</span><span>🚀 Early Adopter</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.oldNew || 5} onChange={(e) => update('preferences', 'oldNew', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Sweet vs Savory</label>
                <select value={data.preferences?.sweetSavory || ''} onChange={(e) => update('preferences', 'sweetSavory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="sweet">🍰 Sweet — Prefere doces</option>
                  <option value="savory">🧀 Savory — Prefere salgados</option>
                  <option value="both">Both — Ama os dois igualmente</option>
                  <option value="depends">Depends — Varia com o humor</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Hot vs Cold Drinks</label>
                <select value={data.preferences?.hotCold || ''} onChange={(e) => update('preferences', 'hotCold', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="hot">☕ Hot — Prefere bebidas quentes</option>
                  <option value="cold">🧊 Cold — Prefere bebidas geladas</option>
                  <option value="both">Both — Depende da situação</option>
                  <option value="room-temp">Room Temp — Temperatura ambiente</option>
                </select>
              </div>
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
// BEHAVIOR CONTENT - Complete Implementation
// ============================================================================
const BehaviorContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('behavior', { ...data, [section]: { ...data[section], [field]: value } });
  };

  const sections = {
    // ========== SUBTAB 0: COMMUNICATION ==========
    0: (
      <div className="space-y-6">
        <div className="bg-violet-50 border border-violet-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-violet-900 mb-2">💬 COMUNICAÇÃO</h3>
          <p className="font-mono text-xs text-violet-800 leading-relaxed">Como o personagem se comunica verbalmente e não-verbalmente.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗣️ Estilo de Fala</h4>
          <select value={data.communication?.speakingStyle || ''} onChange={(e) => update('communication', 'speakingStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="eloquent">Eloquent — Articulado, escolhe palavras com cuidado</option>
            <option value="direct">Direct — Vai direto ao ponto, sem rodeios</option>
            <option value="rambling">Rambling — Divaga, perde o fio da meada</option>
            <option value="quiet">Quiet — Fala pouco, só quando necessário</option>
            <option value="loud">Loud — Fala alto, domina conversas</option>
            <option value="fast">Fast — Fala rápido, atropela palavras</option>
            <option value="slow">Slow — Fala devagar, pausado</option>
            <option value="mumbling">Mumbling — Murmura, difícil de entender</option>
            <option value="animated">Animated — Expressivo, usa muitos gestos</option>
            <option value="monotone">Monotone — Tom monótono, pouca variação</option>
            <option value="formal">Formal — Sempre formal, mesmo casualmente</option>
            <option value="casual">Casual — Sempre informal, gírias</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📚 Nível de Vocabulário</h4>
          <select value={data.communication?.vocabularyLevel || ''} onChange={(e) => update('communication', 'vocabularyLevel', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="simple">Simple — Palavras básicas, frases curtas</option>
            <option value="average">Average — Vocabulário comum, adequado</option>
            <option value="educated">Educated — Vocabulário amplo, bem articulado</option>
            <option value="academic">Academic — Jargão técnico, termos específicos</option>
            <option value="pretentious">Pretentious — Usa palavras difíceis para impressionar</option>
            <option value="slang-heavy">Slang-Heavy — Muitas gírias e expressões</option>
            <option value="mixed">Mixed — Varia conforme contexto</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌍 Sotaque / Dialeto</h4>
          <input type="text" value={data.communication?.accentDialect || ''} onChange={(e) => update('communication', 'accentDialect', e.target.value)} placeholder="Ex: Sotaque nordestino, Inglês britânico, Sem sotaque marcante..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔄 Tiques Verbais</h4>
          <textarea value={data.communication?.verbalTics || ''} onChange={(e) => update('communication', 'verbalTics', e.target.value)} placeholder="Ex: Diz 'tipo' frequentemente, pigarreia antes de falar, termina frases com 'sabe?'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👐 Hábitos Não-Verbais</h4>
          <textarea value={data.communication?.nonVerbalHabits || ''} onChange={(e) => update('communication', 'nonVerbalHabits', e.target.value)} placeholder="Ex: Evita contato visual, gesticula muito, cruza os braços, toca no cabelo..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: DAILY PATTERNS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">📅 PADRÕES DIÁRIOS</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">Rotinas, rituais e hábitos do dia-a-dia.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌅 Rotina Matinal</h4>
          <textarea value={data.daily?.morningRoutine || ''} onChange={(e) => update('daily', 'morningRoutine', e.target.value)} placeholder="Descreva como começa o dia: acorda cedo/tarde, primeiro café, exercício, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔁 Rituais Diários</h4>
          <textarea value={data.daily?.dailyRituals || ''} onChange={(e) => update('daily', 'dailyRituals', e.target.value)} placeholder="Hábitos que repete todos os dias: ler antes de dormir, café às 3pm, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⏰ Hábitos de Procrastinação</h4>
          <textarea value={data.daily?.procrastinationHabits || ''} onChange={(e) => update('daily', 'procrastinationHabits', e.target.value)} placeholder="Como procrastina: redes sociais, limpeza, soneca, 'só mais um episódio'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📐 Nível de Organização</h4>
          <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Caótico</span><span>Metódico</span></div>
          <input type="range" min="1" max="9" value={data.daily?.organizationLevel || 5} onChange={(e) => update('daily', 'organizationLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-blue-400 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: SOCIAL BEHAVIOR ==========
    2: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">👥 COMPORTAMENTO SOCIAL</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">Como se comporta em diferentes contextos sociais.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👋 Primeira Impressão</h4>
          <textarea value={data.social?.firstImpression || ''} onChange={(e) => update('social', 'firstImpression', e.target.value)} placeholder="Como as pessoas geralmente o percebem no primeiro encontro..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👥 Comportamento em Grupos</h4>
          <select value={data.social?.behaviorInGroups || ''} onChange={(e) => update('social', 'behaviorInGroups', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="leader">Leader — Assume comando naturalmente</option>
            <option value="entertainer">Entertainer — Conta piadas, anima o grupo</option>
            <option value="observer">Observer — Observa mais do que participa</option>
            <option value="mediator">Mediator — Resolve conflitos, harmoniza</option>
            <option value="wallflower">Wallflower — Fica nos cantos, evita atenção</option>
            <option value="contrarian">Contrarian — Discorda por esporte</option>
            <option value="supporter">Supporter — Apoia ideias dos outros</option>
            <option value="dominator">Dominator — Monopoliza conversas</option>
            <option value="chameleon">Chameleon — Adapta-se ao grupo</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🤝 Comportamento One-on-One</h4>
          <select value={data.social?.behaviorOneOnOne || ''} onChange={(e) => update('social', 'behaviorOneOnOne', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="intimate">Intimate — Abre-se facilmente, conexão profunda</option>
            <option value="guarded">Guarded — Mantém distância, superficial</option>
            <option value="listener">Listener — Prefere ouvir do que falar</option>
            <option value="talker">Talker — Fala mais do que ouve</option>
            <option value="awkward">Awkward — Desconfortável, silêncios</option>
            <option value="intense">Intense — Contato visual forte, foco total</option>
            <option value="distracted">Distracted — Mente vagueia facilmente</option>
            <option value="warm">Warm — Caloroso, faz o outro se sentir bem</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😰 Comportamento Sob Estresse</h4>
          <textarea value={data.social?.behaviorUnderStress || ''} onChange={(e) => update('social', 'behaviorUnderStress', e.target.value)} placeholder="Como muda quando estressado: isola-se, fica irritável, busca ajuda..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: QUIRKS & HABITS ==========
    3: (
      <div className="space-y-6">
        <div className="bg-pink-50 border border-pink-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-pink-900 mb-2">🎭 MANIAS & HÁBITOS</h3>
          <p className="font-mono text-xs text-pink-800 leading-relaxed">Peculiaridades, tiques e comportamentos característicos.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😬 Hábitos Nervosos</h4>
          <textarea value={data.quirks?.nervousHabits || ''} onChange={(e) => update('quirks', 'nervousHabits', e.target.value)} placeholder="Ex: Rói unhas, balança a perna, mexe no cabelo, range dentes..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🤗 Comportamentos de Conforto</h4>
          <textarea value={data.quirks?.comfortBehaviors || ''} onChange={(e) => update('quirks', 'comfortBehaviors', e.target.value)} placeholder="O que faz para se acalmar: come doce, abraça travesseiro, banho quente..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😤 Pet Peeves</h4>
          <textarea value={data.quirks?.petPeeves || ''} onChange={(e) => update('quirks', 'petPeeves', e.target.value)} placeholder="Coisas que irritam desproporcionalmente: barulho de mastigar, atraso, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍀 Superstições Pessoais</h4>
          <textarea value={data.quirks?.superstitions || ''} onChange={(e) => update('quirks', 'superstitions', e.target.value)} placeholder="Rituais de sorte, manias, 'se eu não fizer X, Y vai acontecer'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 4: UNDER PRESSURE ==========
    4: (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">⚡ SOB PRESSÃO</h3>
          <p className="font-mono text-xs text-red-800 leading-relaxed">Como reage a crises, falhas e situações extremas.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🥊 Resposta Instintiva</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Qual a primeira reação quando ameaçado ou em perigo?</p>
          <div className="grid grid-cols-4 gap-2">
            {['Fight', 'Flight', 'Freeze', 'Fawn'].map(response => (
              <button key={response} onClick={() => update('pressure', 'fightFlightFreeze', response)} className={`py-3 rounded font-mono text-xs transition-all ${data.pressure?.fightFlightFreeze === response ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                {response === 'Fight' && '🥊 Fight'}
                {response === 'Flight' && '🏃 Flight'}
                {response === 'Freeze' && '🧊 Freeze'}
                {response === 'Fawn' && '🙇 Fawn'}
              </button>
            ))}
          </div>
          <p className="font-mono text-[9px] text-gray-500 mt-2 italic">
            {data.pressure?.fightFlightFreeze === 'Fight' && 'Enfrenta o perigo de frente, pode ser agressivo ou assertivo.'}
            {data.pressure?.fightFlightFreeze === 'Flight' && 'Foge, evita, procura escapar da situação.'}
            {data.pressure?.fightFlightFreeze === 'Freeze' && 'Paralisa, fica imóvel, não consegue reagir.'}
            {data.pressure?.fightFlightFreeze === 'Fawn' && 'Tenta agradar, apaziguar, evitar conflito a todo custo.'}
          </p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚨 Personalidade em Crise</h4>
          <select value={data.pressure?.crisisPersonality || ''} onChange={(e) => update('pressure', 'crisisPersonality', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <option value="calm-leader">Calm Leader — Fica mais calmo, assume controle</option>
            <option value="panics">Panics — Entra em pânico, perde controle</option>
            <option value="shuts-down">Shuts Down — Desliga, fica apático</option>
            <option value="hyper-focused">Hyper-Focused — Foco extremo no problema</option>
            <option value="emotional">Emotional — Reage emocionalmente primeiro</option>
            <option value="analytical">Analytical — Analisa friamente a situação</option>
            <option value="denial">Denial — Nega que há problema</option>
            <option value="blame">Blame — Procura culpados</option>
            <option value="helper">Helper — Foca em ajudar outros</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📉 Como Lida com Fracasso</h4>
          <textarea value={data.pressure?.handleFailure || ''} onChange={(e) => update('pressure', 'handleFailure', e.target.value)} placeholder="Descreva: nega, aprende, se culpa, culpa outros, tenta de novo imediatamente..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📈 Como Lida com Sucesso</h4>
          <textarea value={data.pressure?.handleSuccess || ''} onChange={(e) => update('pressure', 'handleSuccess', e.target.value)} placeholder="Descreva: celebra abertamente, minimiza, fica desconfortável, usa como motivação..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// SECRETS CONTENT - Complete Implementation
// ============================================================================
const SecretsContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('secrets', { ...data, [section]: { ...data[section], [field]: value } });
  };

  const sections = {
    // ========== SUBTAB 0: HIDDEN TRUTHS ==========
    0: (
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-400 mb-2">🔒 VERDADES OCULTAS</h3>
          <p className="font-mono text-xs text-gray-400 leading-relaxed">Os segredos mais profundos que o personagem guarda.</p>
        </div>

        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">💀 O Maior Segredo</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que destruiria a vida dele se fosse revelado?</p>
          <textarea value={data.hidden?.biggestSecret || ''} onChange={(e) => update('hidden', 'biggestSecret', e.target.value)} placeholder="O segredo que carrega, que pouquíssimas pessoas (ou ninguém) sabem..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Mentiras Mantidas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Mentiras que conta regularmente ou há muito tempo.</p>
          <textarea value={data.hidden?.liesMaintained || ''} onChange={(e) => update('hidden', 'liesMaintained', e.target.value)} placeholder="Ex: Finge que se formou na faculdade, diz que os pais morreram, esconde vício..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚫 Nunca Admitiria</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Coisas que nunca confessaria, mesmo sob tortura.</p>
          <textarea value={data.hidden?.neverAdmit || ''} onChange={(e) => update('hidden', 'neverAdmit', e.target.value)} placeholder="Verdades que nega até para si mesmo, coisas que morreria sem revelar..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💭 Desejos Secretos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Vontades que tem vergonha de admitir.</p>
          <textarea value={data.hidden?.secretDesires || ''} onChange={(e) => update('hidden', 'secretDesires', e.target.value)} placeholder="Ex: Quer largar tudo e sumir, fantasia com a vida de outra pessoa, inveja alguém..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: CONTRADICTIONS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">⚖️ CONTRADIÇÕES</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">As inconsistências entre quem o personagem finge ser e quem realmente é.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Público vs Privado</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como a persona pública difere da pessoa real?</p>
          <textarea value={data.contradictions?.publicVsPrivate || ''} onChange={(e) => update('contradictions', 'publicVsPrivate', e.target.value)} placeholder="Ex: Parece confiante mas é inseguro, age feliz mas está deprimido, finge ser durão mas é sensível..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🗣️ O Que Prega vs O Que Pratica</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Conselhos que dá mas não segue.</p>
          <textarea value={data.contradictions?.preachVsPractice || ''} onChange={(e) => update('contradictions', 'preachVsPractice', e.target.value)} placeholder="Ex: Diz para outros serem honestos mas mente, critica vícios mas tem os próprios..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🙈 Hipocrisia Inconsciente</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Contradições que ele nem percebe em si mesmo.</p>
          <textarea value={data.contradictions?.unawareHypocrisy || ''} onChange={(e) => update('contradictions', 'unawareHypocrisy', e.target.value)} placeholder="Ex: Reclama de fofoca mas fofoca, critica preconceito mas tem preconceitos, etc..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: SKELETONS ==========
    2: (
      <div className="space-y-6">
        <div className="bg-slate-800 border border-slate-600 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-slate-200 mb-2">💀 ESQUELETOS NO ARMÁRIO</h3>
          <p className="font-mono text-xs text-slate-400 leading-relaxed">O passado sombrio e as pessoas que poderiam usar isso contra ele.</p>
        </div>

        <div className="border-2 border-slate-300 rounded-sm p-4 bg-slate-50">
          <h4 className="font-mono text-sm font-bold text-slate-800 mb-2">❌ Erros do Passado</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Coisas terríveis que fez e gostaria de apagar.</p>
          <textarea value={data.skeletons?.pastMistakes || ''} onChange={(e) => update('skeletons', 'pastMistakes', e.target.value)} placeholder="Ex: Traiu alguém, causou um acidente, roubou, mentiu com consequências graves..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😔 Pessoas que Prejudicou</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Quem ele machucou e ainda carrega essa culpa?</p>
          <textarea value={data.skeletons?.peopleWronged || ''} onChange={(e) => update('skeletons', 'peopleWronged', e.target.value)} placeholder="Nomes ou descrições de pessoas que prejudicou, abandonou, ou traiu..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border-2 border-red-300 rounded-sm p-4 bg-red-50">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">⚠️ Quem Poderia Destruí-lo?</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Pessoas que sabem demais e poderiam arruinar sua vida.</p>
          <textarea value={data.skeletons?.couldDestroyThem || ''} onChange={(e) => update('skeletons', 'couldDestroyThem', e.target.value)} placeholder="Nomes de pessoas que têm informação comprometedora, ex-parceiros vingativos, testemunhas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};


// ============================================================================
// GOALS CONTENT - Complete Implementation
// ============================================================================
const GoalsContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('goals', { ...data, [section]: { ...data[section], [field]: value } });
  };

  const sections = {
    // ========== SUBTAB 0: SHORT-TERM GOALS ==========
    0: (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-green-900 mb-2">🎯 METAS DE CURTO PRAZO</h3>
          <p className="font-mono text-xs text-green-800 leading-relaxed">O que o personagem quer alcançar no futuro próximo.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📅 Esta Semana / Este Mês</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Objetivos imediatos, tarefas urgentes.</p>
          <textarea value={data.shortTerm?.thisWeekMonth || ''} onChange={(e) => update('shortTerm', 'thisWeekMonth', e.target.value)} placeholder="Ex: Terminar projeto, conversar com alguém, resolver problema específico..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📆 Este Ano</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Metas para os próximos meses.</p>
          <textarea value={data.shortTerm?.thisYear || ''} onChange={(e) => update('shortTerm', 'thisYear', e.target.value)} placeholder="Ex: Mudar de emprego, terminar curso, viajar para lugar específico, economizar X..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/50">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-2">🚧 Obstáculos Imediatos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que está impedindo de alcançar essas metas?</p>
          <textarea value={data.shortTerm?.obstacles || ''} onChange={(e) => update('shortTerm', 'obstacles', e.target.value)} placeholder="Ex: Falta de dinheiro, pessoa específica, medo, falta de tempo, habilidade que falta..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 1: LONG-TERM ASPIRATIONS ==========
    1: (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-blue-900 mb-2">🌟 ASPIRAÇÕES DE LONGO PRAZO</h3>
          <p className="font-mono text-xs text-blue-800 leading-relaxed">Os grandes sonhos e o legado que quer deixar.</p>
        </div>

        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-2">✨ O Grande Sonho</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Se pudesse ter qualquer coisa na vida, o que seria?</p>
          <textarea value={data.longTerm?.lifeDream || ''} onChange={(e) => update('longTerm', 'lifeDream', e.target.value)} placeholder="O sonho que persegue, o objetivo final, o que daria sentido à vida..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏛️ Legado</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como quer ser lembrado depois que partir?</p>
          <textarea value={data.longTerm?.legacy || ''} onChange={(e) => update('longTerm', 'legacy', e.target.value)} placeholder="Ex: Como bom pai, como revolucionário, como artista, como alguém que ajudou os outros..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏆 O Que Significa Sucesso?</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Definição pessoal de uma vida bem-sucedida.</p>
          <textarea value={data.longTerm?.whatSuccessMeans || ''} onChange={(e) => update('longTerm', 'whatSuccessMeans', e.target.value)} placeholder="Ex: Riqueza, família feliz, reconhecimento, paz interior, liberdade, impacto no mundo..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 2: INTERNAL CONFLICTS ==========
    2: (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-purple-900 mb-2">💭 CONFLITOS INTERNOS</h3>
          <p className="font-mono text-xs text-purple-800 leading-relaxed">As batalhas que trava consigo mesmo.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🧠❤️ Cabeça vs Coração</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Onde a razão e a emoção estão em conflito?</p>
          <textarea value={data.internal?.headVsHeart || ''} onChange={(e) => update('internal', 'headVsHeart', e.target.value)} placeholder="Ex: Sabe que deveria terminar o relacionamento mas não consegue, quer seguir paixão mas precisa de estabilidade..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⚖️ Dever vs Desejo</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">O que sente que deve fazer vs o que quer fazer.</p>
          <textarea value={data.internal?.dutyVsDesire || ''} onChange={(e) => update('internal', 'dutyVsDesire', e.target.value)} placeholder="Ex: Obrigação com família vs vontade de ir embora, responsabilidade no trabalho vs sonho pessoal..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎭 Quem É vs Quem Quer Ser</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">A distância entre a realidade e o ideal.</p>
          <textarea value={data.internal?.whoTheyAreVsWant || ''} onChange={(e) => update('internal', 'whoTheyAreVsWant', e.target.value)} placeholder="Ex: É tímido mas quer ser confiante, é medroso mas quer ser corajoso, é egoísta mas quer ser generoso..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: EXTERNAL CONFLICTS ==========
    3: (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-red-900 mb-2">⚔️ CONFLITOS EXTERNOS</h3>
          <p className="font-mono text-xs text-red-800 leading-relaxed">Obstáculos, inimigos e forças que trabalham contra o personagem.</p>
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🔥 Problemas Atuais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Situações difíceis que está enfrentando agora.</p>
          <textarea value={data.external?.currentProblems || ''} onChange={(e) => update('external', 'currentProblems', e.target.value)} placeholder="Ex: Dívidas, processo judicial, doença na família, conflito no trabalho, ameaça física..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-28 resize-none" />
        </div>

        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">👿 Inimigos / Antagonistas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Pessoas ou grupos que ativamente trabalham contra ele.</p>
          <textarea value={data.external?.enemies || ''} onChange={(e) => update('external', 'enemies', e.target.value)} placeholder="Nomes, descrições, motivos do conflito, quão perigosos são..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
        </div>

        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏛️ Obstáculos Sistêmicos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Forças maiores que limitam suas opções.</p>
          <textarea value={data.external?.systemicObstacles || ''} onChange={(e) => update('external', 'systemicObstacles', e.target.value)} placeholder="Ex: Discriminação, pobreza, sistema político, leis injustas, barreiras sociais, localização geográfica..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-24 resize-none" />
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

const OccupationContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('occupation', { ...data, [section]: { ...data[section], [field]: value } });
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
    // ========== SUBTAB 0: CURRENT WORK ==========
    0: (
      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-emerald-900 mb-2">💼 TRABALHO ATUAL</h3>
          <p className="font-mono text-xs text-emerald-800 leading-relaxed">Situação profissional atual, cargo, empresa e estilo de trabalho.</p>
        </div>

        {/* EMPLOYMENT STATUS */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">📊 Status de Emprego</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Status Atual</label>
              <select value={data.current?.employmentStatus || ''} onChange={(e) => update('current', 'employmentStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <optgroup label="Employed">
                  <option value="full-time">Full-Time Employee — Tempo integral CLT</option>
                  <option value="part-time">Part-Time Employee — Meio período</option>
                  <option value="contract">Contract Worker — Por contrato/projeto</option>
                  <option value="temporary">Temporary — Trabalho temporário</option>
                  <option value="seasonal">Seasonal — Trabalho sazonal</option>
                  <option value="probationary">Probationary — Em período de experiência</option>
                  <option value="intern-paid">Paid Intern — Estagiário remunerado</option>
                  <option value="intern-unpaid">Unpaid Intern — Estagiário não remunerado</option>
                  <option value="apprentice">Apprentice — Aprendiz</option>
                  <option value="trainee">Trainee — Programa de trainee</option>
                </optgroup>
                <optgroup label="Self-Employed">
                  <option value="freelancer">Freelancer — Autônomo por projetos</option>
                  <option value="consultant">Independent Consultant — Consultor independente</option>
                  <option value="contractor">Independent Contractor — Prestador de serviços</option>
                  <option value="gig-worker">Gig Worker — Trabalho por demanda (Uber, etc)</option>
                  <option value="business-owner">Business Owner — Dono de empresa</option>
                  <option value="entrepreneur">Entrepreneur — Empreendedor ativo</option>
                  <option value="startup-founder">Startup Founder — Fundador de startup</option>
                  <option value="solopreneur">Solopreneur — Empreendedor solo</option>
                  <option value="creator">Content Creator — Criador de conteúdo</option>
                  <option value="influencer">Influencer — Influenciador digital</option>
                  <option value="artist-independent">Independent Artist — Artista independente</option>
                </optgroup>
                <optgroup label="Not Working">
                  <option value="unemployed-seeking">Unemployed - Seeking — Desempregado buscando</option>
                  <option value="unemployed-not-seeking">Unemployed - Not Seeking — Desempregado sem buscar</option>
                  <option value="laid-off">Recently Laid Off — Demitido recentemente</option>
                  <option value="between-jobs">Between Jobs — Entre empregos</option>
                  <option value="career-break">Career Break — Pausa na carreira</option>
                  <option value="sabbatical">Sabbatical — Ano sabático</option>
                  <option value="parental-leave">Parental Leave — Licença parental</option>
                  <option value="medical-leave">Medical Leave — Licença médica</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="student">Student — Estudante em tempo integral</option>
                  <option value="student-working">Working Student — Estudante que trabalha</option>
                  <option value="retired">Retired — Aposentado</option>
                  <option value="semi-retired">Semi-Retired — Semi-aposentado</option>
                  <option value="homemaker">Homemaker — Cuida do lar</option>
                  <option value="caregiver">Full-Time Caregiver — Cuidador</option>
                  <option value="volunteer">Full-Time Volunteer — Voluntário</option>
                  <option value="military">Military Service — Serviço militar</option>
                  <option value="trust-fund">Trust Fund/Inherited Wealth — Vive de herança</option>
                  <option value="disability">On Disability — Afastado por invalidez</option>
                  <option value="criminal">Criminal Activities — Atividades ilegais</option>
                  <option value="unknown">Unknown/Mysterious — Fonte de renda desconhecida</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Regime de Trabalho</label>
              <select value={data.current?.workArrangement || ''} onChange={(e) => update('current', 'workArrangement', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="office-full">100% Office — Presencial todos os dias</option>
                <option value="office-mostly">Mostly Office — Presencial maioria dos dias</option>
                <option value="hybrid-balanced">Hybrid Balanced — Metade escritório, metade casa</option>
                <option value="hybrid-mostly-remote">Hybrid Mostly Remote — Maioria remoto</option>
                <option value="remote-full">100% Remote — Totalmente remoto</option>
                <option value="remote-async">Remote Async — Remoto assíncrono</option>
                <option value="digital-nomad">Digital Nomad — Trabalha viajando</option>
                <option value="field-work">Field Work — Trabalho de campo</option>
                <option value="traveling">Traveling — Viaja constantemente</option>
                <option value="on-site-client">On-Site at Client — No cliente</option>
                <option value="multiple-locations">Multiple Locations — Vários locais</option>
                <option value="shift-work">Shift Work — Trabalho por turnos</option>
                <option value="on-call">On-Call — De sobreaviso</option>
                <option value="flexible">Fully Flexible — Totalmente flexível</option>
                <option value="na">N/A — Não se aplica</option>
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
                <input type="text" value={data.current?.jobTitle || ''} onChange={(e) => update('current', 'jobTitle', e.target.value)} placeholder="Ex: Software Engineer, Marketing Manager..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nível de Senioridade</label>
                <select value={data.current?.seniorityLevel || ''} onChange={(e) => update('current', 'seniorityLevel', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
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
                    <option value="chro">CHRO/Chief HR Officer</option>
                    <option value="cio">CIO/Chief Information Officer</option>
                    <option value="cpo">CPO/Chief Product Officer</option>
                    <option value="founder">Founder</option>
                    <option value="co-founder">Co-Founder</option>
                    <option value="owner">Owner/Proprietário</option>
                    <option value="partner">Partner</option>
                    <option value="board-member">Board Member</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="freelance-junior">Freelance - Junior</option>
                    <option value="freelance-experienced">Freelance - Experienced</option>
                    <option value="freelance-expert">Freelance - Expert</option>
                    <option value="contractor">Contractor</option>
                    <option value="consultant">Consultant</option>
                    <option value="advisor">Advisor</option>
                    <option value="na">N/A</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Descrição do Trabalho</label>
              <textarea value={data.current?.jobDescription || ''} onChange={(e) => update('current', 'jobDescription', e.target.value)} placeholder="O que faz no dia-a-dia? Responsabilidades principais..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tempo no Cargo</label>
                <select value={data.current?.timeInRole || ''} onChange={(e) => update('current', 'timeInRole', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
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
                  <option value="entire-career">Carreira inteira</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tempo na Empresa</label>
                <select value={data.current?.timeAtCompany || ''} onChange={(e) => update('current', 'timeAtCompany', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
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
                <select value={data.current?.managesPeople || ''} onChange={(e) => update('current', 'managesPeople', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="no">Não — Contribuidor individual</option>
                  <option value="informal">Informal — Mentoria, sem cargo</option>
                  <option value="1-3">1-3 pessoas</option>
                  <option value="4-10">4-10 pessoas</option>
                  <option value="11-25">11-25 pessoas</option>
                  <option value="26-50">26-50 pessoas</option>
                  <option value="50-100">50-100 pessoas</option>
                  <option value="100-500">100-500 pessoas</option>
                  <option value="500+">500+ pessoas</option>
                  <option value="entire-org">Organização inteira</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Horas por Semana</label>
                <select value={data.current?.hoursPerWeek || ''} onChange={(e) => update('current', 'hoursPerWeek', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="less-10">Menos de 10h</option>
                  <option value="10-20">10-20h (part-time)</option>
                  <option value="20-30">20-30h</option>
                  <option value="30-40">30-40h (padrão)</option>
                  <option value="40-50">40-50h</option>
                  <option value="50-60">50-60h</option>
                  <option value="60-70">60-70h</option>
                  <option value="70-80">70-80h</option>
                  <option value="80+">80+h (workaholic)</option>
                  <option value="variable">Variável</option>
                  <option value="project-based">Por projeto</option>
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
              <select value={data.current?.industry || ''} onChange={(e) => update('current', 'industry', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <optgroup label="Technology">
                  <option value="tech-software">Software Development</option>
                  <option value="tech-saas">SaaS / Cloud Services</option>
                  <option value="tech-ai">AI / Machine Learning</option>
                  <option value="tech-cybersecurity">Cybersecurity</option>
                  <option value="tech-data">Data / Analytics</option>
                  <option value="tech-hardware">Hardware / Electronics</option>
                  <option value="tech-semiconductor">Semiconductors</option>
                  <option value="tech-telecom">Telecommunications</option>
                  <option value="tech-it-services">IT Services / Consulting</option>
                  <option value="tech-gaming">Gaming / Video Games</option>
                  <option value="tech-fintech">Fintech</option>
                  <option value="tech-edtech">EdTech</option>
                  <option value="tech-healthtech">HealthTech / MedTech</option>
                  <option value="tech-proptech">PropTech / Real Estate Tech</option>
                  <option value="tech-agtech">AgTech / FoodTech</option>
                  <option value="tech-cleantech">CleanTech / GreenTech</option>
                  <option value="tech-blockchain">Blockchain / Crypto / Web3</option>
                  <option value="tech-ar-vr">AR / VR / Metaverse</option>
                  <option value="tech-robotics">Robotics / Automation</option>
                  <option value="tech-iot">IoT / Connected Devices</option>
                  <option value="tech-space">Space Tech / Aerospace</option>
                </optgroup>
                <optgroup label="Finance & Business">
                  <option value="fin-banking">Banking</option>
                  <option value="fin-investment">Investment Banking</option>
                  <option value="fin-asset-mgmt">Asset Management</option>
                  <option value="fin-hedge-fund">Hedge Funds</option>
                  <option value="fin-pe-vc">Private Equity / Venture Capital</option>
                  <option value="fin-insurance">Insurance</option>
                  <option value="fin-accounting">Accounting / Audit</option>
                  <option value="fin-tax">Tax Services</option>
                  <option value="fin-wealth">Wealth Management</option>
                  <option value="fin-credit">Credit / Lending</option>
                  <option value="fin-payments">Payments / Processing</option>
                  <option value="biz-consulting">Management Consulting</option>
                  <option value="biz-strategy">Strategy Consulting</option>
                  <option value="biz-hr-consulting">HR Consulting</option>
                  <option value="biz-legal">Legal Services / Law</option>
                  <option value="biz-real-estate">Real Estate</option>
                  <option value="biz-recruitment">Recruitment / Staffing</option>
                </optgroup>
                <optgroup label="Healthcare & Life Sciences">
                  <option value="health-hospital">Hospitals / Health Systems</option>
                  <option value="health-clinic">Clinics / Medical Practice</option>
                  <option value="health-pharma">Pharmaceuticals</option>
                  <option value="health-biotech">Biotechnology</option>
                  <option value="health-medical-devices">Medical Devices</option>
                  <option value="health-diagnostics">Diagnostics / Labs</option>
                  <option value="health-dental">Dental</option>
                  <option value="health-mental">Mental Health</option>
                  <option value="health-veterinary">Veterinary</option>
                  <option value="health-eldercare">Elder Care / Senior Living</option>
                  <option value="health-fitness">Fitness / Wellness</option>
                  <option value="health-alternative">Alternative Medicine</option>
                  <option value="health-insurance">Health Insurance</option>
                </optgroup>
                <optgroup label="Education & Research">
                  <option value="edu-k12">K-12 Education</option>
                  <option value="edu-higher">Higher Education</option>
                  <option value="edu-vocational">Vocational Training</option>
                  <option value="edu-online">Online Education</option>
                  <option value="edu-tutoring">Tutoring / Test Prep</option>
                  <option value="edu-corporate">Corporate Training</option>
                  <option value="edu-early-childhood">Early Childhood Education</option>
                  <option value="edu-special-needs">Special Education</option>
                  <option value="research-academic">Academic Research</option>
                  <option value="research-think-tank">Think Tanks / Policy Research</option>
                  <option value="research-market">Market Research</option>
                </optgroup>
                <optgroup label="Media & Entertainment">
                  <option value="media-film">Film / Cinema</option>
                  <option value="media-tv">Television / Streaming</option>
                  <option value="media-music">Music Industry</option>
                  <option value="media-publishing">Publishing / Books</option>
                  <option value="media-news">News / Journalism</option>
                  <option value="media-advertising">Advertising</option>
                  <option value="media-pr">Public Relations</option>
                  <option value="media-marketing">Marketing / Digital Marketing</option>
                  <option value="media-social">Social Media</option>
                  <option value="media-events">Events / Live Entertainment</option>
                  <option value="media-sports">Sports / Athletics</option>
                  <option value="media-esports">Esports</option>
                  <option value="media-podcast">Podcasting</option>
                  <option value="media-influencer">Influencer / Creator Economy</option>
                </optgroup>
                <optgroup label="Creative & Design">
                  <option value="creative-design">Graphic Design</option>
                  <option value="creative-ux">UX/UI Design</option>
                  <option value="creative-architecture">Architecture</option>
                  <option value="creative-interior">Interior Design</option>
                  <option value="creative-fashion">Fashion / Apparel Design</option>
                  <option value="creative-photography">Photography</option>
                  <option value="creative-video">Videography / Production</option>
                  <option value="creative-animation">Animation / VFX</option>
                  <option value="creative-art">Fine Arts</option>
                  <option value="creative-crafts">Crafts / Artisanal</option>
                  <option value="creative-writing">Writing / Copywriting</option>
                  <option value="creative-branding">Branding / Identity</option>
                </optgroup>
                <optgroup label="Retail & Consumer">
                  <option value="retail-general">General Retail</option>
                  <option value="retail-ecommerce">E-commerce</option>
                  <option value="retail-luxury">Luxury Goods</option>
                  <option value="retail-fashion">Fashion Retail</option>
                  <option value="retail-grocery">Grocery / Supermarket</option>
                  <option value="retail-electronics">Electronics Retail</option>
                  <option value="retail-home">Home Goods / Furniture</option>
                  <option value="retail-automotive">Automotive Sales</option>
                  <option value="retail-pharmacy">Pharmacy / Drugstore</option>
                  <option value="consumer-goods">Consumer Goods / CPG</option>
                  <option value="consumer-beauty">Beauty / Cosmetics</option>
                  <option value="consumer-food">Food & Beverage</option>
                </optgroup>
                <optgroup label="Food & Hospitality">
                  <option value="hosp-restaurant">Restaurants</option>
                  <option value="hosp-fast-food">Fast Food / QSR</option>
                  <option value="hosp-fine-dining">Fine Dining</option>
                  <option value="hosp-cafe">Cafes / Coffee Shops</option>
                  <option value="hosp-bar">Bars / Nightclubs</option>
                  <option value="hosp-catering">Catering</option>
                  <option value="hosp-hotel">Hotels / Lodging</option>
                  <option value="hosp-resort">Resorts</option>
                  <option value="hosp-travel">Travel / Tourism</option>
                  <option value="hosp-airlines">Airlines / Aviation</option>
                  <option value="hosp-cruise">Cruise Lines</option>
                  <option value="hosp-casino">Casinos / Gaming</option>
                </optgroup>
                <optgroup label="Manufacturing & Industrial">
                  <option value="mfg-automotive">Automotive Manufacturing</option>
                  <option value="mfg-aerospace">Aerospace / Defense</option>
                  <option value="mfg-electronics">Electronics Manufacturing</option>
                  <option value="mfg-machinery">Machinery / Equipment</option>
                  <option value="mfg-chemicals">Chemicals</option>
                  <option value="mfg-plastics">Plastics / Packaging</option>
                  <option value="mfg-textiles">Textiles / Apparel Manufacturing</option>
                  <option value="mfg-food">Food Manufacturing</option>
                  <option value="mfg-pharma">Pharmaceutical Manufacturing</option>
                  <option value="mfg-metals">Metals / Steel</option>
                  <option value="mfg-furniture">Furniture Manufacturing</option>
                  <option value="mfg-3d-printing">3D Printing / Additive</option>
                </optgroup>
                <optgroup label="Energy & Utilities">
                  <option value="energy-oil-gas">Oil & Gas</option>
                  <option value="energy-renewable">Renewable Energy</option>
                  <option value="energy-solar">Solar</option>
                  <option value="energy-wind">Wind</option>
                  <option value="energy-nuclear">Nuclear</option>
                  <option value="energy-utilities">Utilities</option>
                  <option value="energy-electric">Electric Power</option>
                  <option value="energy-water">Water / Wastewater</option>
                  <option value="energy-mining">Mining</option>
                </optgroup>
                <optgroup label="Construction & Real Estate">
                  <option value="const-residential">Residential Construction</option>
                  <option value="const-commercial">Commercial Construction</option>
                  <option value="const-infrastructure">Infrastructure</option>
                  <option value="const-engineering">Civil Engineering</option>
                  <option value="re-residential">Residential Real Estate</option>
                  <option value="re-commercial">Commercial Real Estate</option>
                  <option value="re-property-mgmt">Property Management</option>
                  <option value="re-development">Real Estate Development</option>
                </optgroup>
                <optgroup label="Transportation & Logistics">
                  <option value="trans-trucking">Trucking / Freight</option>
                  <option value="trans-shipping">Shipping / Maritime</option>
                  <option value="trans-rail">Rail</option>
                  <option value="trans-air-cargo">Air Cargo</option>
                  <option value="trans-delivery">Last-Mile Delivery</option>
                  <option value="trans-warehousing">Warehousing</option>
                  <option value="trans-logistics">Logistics / Supply Chain</option>
                  <option value="trans-rideshare">Rideshare / Mobility</option>
                  <option value="trans-public">Public Transit</option>
                </optgroup>
                <optgroup label="Government & Public Sector">
                  <option value="gov-federal">Federal Government</option>
                  <option value="gov-state">State / Regional Government</option>
                  <option value="gov-local">Local Government / Municipal</option>
                  <option value="gov-military">Military</option>
                  <option value="gov-law-enforcement">Law Enforcement</option>
                  <option value="gov-fire-ems">Fire / EMS</option>
                  <option value="gov-intelligence">Intelligence Services</option>
                  <option value="gov-diplomacy">Diplomacy / Foreign Service</option>
                  <option value="gov-public-health">Public Health</option>
                </optgroup>
                <optgroup label="Non-Profit & Social Impact">
                  <option value="npo-charity">Charitable Organizations</option>
                  <option value="npo-foundation">Foundations</option>
                  <option value="npo-ngo">NGO / International Development</option>
                  <option value="npo-advocacy">Advocacy / Policy</option>
                  <option value="npo-environment">Environmental Organizations</option>
                  <option value="npo-humanitarian">Humanitarian Aid</option>
                  <option value="npo-religious">Religious Organizations</option>
                  <option value="npo-arts">Arts & Culture Non-Profit</option>
                  <option value="npo-social-services">Social Services</option>
                </optgroup>
                <optgroup label="Agriculture & Environment">
                  <option value="ag-farming">Farming / Agriculture</option>
                  <option value="ag-livestock">Livestock / Ranching</option>
                  <option value="ag-fishing">Fishing / Aquaculture</option>
                  <option value="ag-forestry">Forestry / Timber</option>
                  <option value="ag-organic">Organic / Sustainable Ag</option>
                  <option value="env-conservation">Conservation</option>
                  <option value="env-environmental">Environmental Services</option>
                  <option value="env-waste">Waste Management / Recycling</option>
                </optgroup>
                <optgroup label="Personal Services">
                  <option value="serv-beauty">Beauty / Salon / Spa</option>
                  <option value="serv-fitness">Personal Training / Fitness</option>
                  <option value="serv-childcare">Childcare</option>
                  <option value="serv-eldercare">Home Care / Elder Care</option>
                  <option value="serv-cleaning">Cleaning Services</option>
                  <option value="serv-pet">Pet Care / Grooming</option>
                  <option value="serv-photography">Photography Services</option>
                  <option value="serv-wedding">Wedding / Event Planning</option>
                  <option value="serv-funeral">Funeral Services</option>
                </optgroup>
                <optgroup label="Trades & Skilled Labor">
                  <option value="trade-electrical">Electrical</option>
                  <option value="trade-plumbing">Plumbing</option>
                  <option value="trade-hvac">HVAC</option>
                  <option value="trade-carpentry">Carpentry</option>
                  <option value="trade-welding">Welding</option>
                  <option value="trade-automotive">Automotive Repair</option>
                  <option value="trade-landscaping">Landscaping</option>
                  <option value="trade-painting">Painting</option>
                  <option value="trade-roofing">Roofing</option>
                  <option value="trade-masonry">Masonry</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="other-security">Security Services</option>
                  <option value="other-investigation">Private Investigation</option>
                  <option value="other-adult">Adult Entertainment</option>
                  <option value="other-cannabis">Cannabis Industry</option>
                  <option value="other-gambling">Gambling / Betting</option>
                  <option value="other-underground">Underground / Gray Market</option>
                  <option value="other-criminal">Criminal Enterprise</option>
                  <option value="other-unknown">Unknown / Classified</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Áreas Funcionais (até 3)</label>
              <div className="flex flex-wrap gap-2">
                {['Engineering','Software Development','Data Science','Product Management','Project Management','Design/UX','Marketing','Sales','Business Development','Customer Success','Customer Support','Operations','Finance','Accounting','HR/People','Recruiting','Legal','Compliance','Strategy','Analytics','Research','QA/Testing','DevOps/SRE','Security','IT/Infrastructure','Supply Chain','Procurement','Manufacturing','Logistics','Admin/Executive Assistant','Communications','Public Relations','Content/Writing','Social Media','SEO/SEM','Growth','Partnerships','Training/L&D','Consulting','Advisory','General Management','Executive Leadership','Founder/Entrepreneurship','Creative Direction','Art Direction','Animation','Video Production','Photography','Journalism','Editorial','Translation','Teaching/Education','Healthcare/Clinical','Nursing','Therapy/Counseling','Social Work','Scientific Research','Lab Work','Field Work','Manual Labor','Skilled Trades','Maintenance','Construction','Driving/Transportation','Food Service','Hospitality','Retail Sales','Security','Military/Defense','Law Enforcement','Emergency Services','Religious/Ministry','Volunteer Work','Freelance/Gig'].map(area => (
                  <button key={area} onClick={() => toggleArrayItem('current', 'functionalAreas', area, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.current?.functionalAreas || []).includes(area) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{area}</button>
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
                <input type="text" value={data.current?.companyName || ''} onChange={(e) => update('current', 'companyName', e.target.value)} placeholder="Nome da empresa ou 'Self-Employed'..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo de Organização</label>
                <select value={data.current?.companyType || ''} onChange={(e) => update('current', 'companyType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <optgroup label="Private Sector">
                    <option value="startup-pre-seed">Startup - Pre-Seed/Idea Stage</option>
                    <option value="startup-seed">Startup - Seed Stage</option>
                    <option value="startup-series-a">Startup - Series A</option>
                    <option value="startup-series-b">Startup - Series B+</option>
                    <option value="startup-late">Late-Stage Startup</option>
                    <option value="scaleup">Scale-up (High Growth)</option>
                    <option value="sme-small">Small Business (&lt;50 employees)</option>
                    <option value="sme-medium">Medium Business (50-250)</option>
                    <option value="large-corp">Large Corporation (250-1000)</option>
                    <option value="enterprise">Enterprise (1000-10000)</option>
                    <option value="mega-corp">Mega Corporation (10000+)</option>
                    <option value="multinational">Multinational Corporation</option>
                    <option value="public-company">Public Company (Stock Listed)</option>
                    <option value="private-equity">Private Equity Owned</option>
                    <option value="family-business">Family Business</option>
                    <option value="franchise">Franchise</option>
                    <option value="cooperative">Cooperative / Co-op</option>
                  </optgroup>
                  <optgroup label="Professional Services">
                    <option value="agency">Agency</option>
                    <option value="consultancy">Consultancy</option>
                    <option value="law-firm">Law Firm</option>
                    <option value="accounting-firm">Accounting Firm</option>
                    <option value="big-four">Big Four (Deloitte, PwC, EY, KPMG)</option>
                    <option value="mbb">MBB (McKinsey, BCG, Bain)</option>
                    <option value="boutique">Boutique Firm</option>
                    <option value="studio">Studio</option>
                  </optgroup>
                  <optgroup label="Public & Non-Profit">
                    <option value="government">Government Agency</option>
                    <option value="military">Military</option>
                    <option value="ngo">NGO / Non-Profit</option>
                    <option value="foundation">Foundation</option>
                    <option value="charity">Charity</option>
                    <option value="religious-org">Religious Organization</option>
                    <option value="political">Political Organization</option>
                    <option value="union">Labor Union</option>
                    <option value="association">Professional Association</option>
                  </optgroup>
                  <optgroup label="Education & Research">
                    <option value="university">University</option>
                    <option value="college">College</option>
                    <option value="school">School (K-12)</option>
                    <option value="research-institute">Research Institute</option>
                    <option value="think-tank">Think Tank</option>
                    <option value="lab">Laboratory</option>
                  </optgroup>
                  <optgroup label="Healthcare">
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic / Medical Practice</option>
                    <option value="healthcare-system">Healthcare System</option>
                  </optgroup>
                  <optgroup label="Self-Employed">
                    <option value="solo-freelance">Solo Freelancer</option>
                    <option value="solo-consultant">Independent Consultant</option>
                    <option value="solo-contractor">Independent Contractor</option>
                    <option value="own-business">Own Business</option>
                    <option value="side-hustle">Side Hustle / Part-time Business</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="temp-agency">Temp Agency Placement</option>
                    <option value="gig-platform">Gig Platform (Uber, Fiverr, etc)</option>
                    <option value="influencer-brand">Personal Brand / Influencer</option>
                    <option value="criminal-org">Criminal Organization</option>
                    <option value="underground">Underground / Informal</option>
                    <option value="classified">Classified / Secret</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tamanho da Empresa</label>
                <select value={data.current?.companySize || ''} onChange={(e) => update('current', 'companySize', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="1">Solo (1 pessoa)</option>
                  <option value="2-10">Micro (2-10)</option>
                  <option value="11-50">Small (11-50)</option>
                  <option value="51-200">Medium (51-200)</option>
                  <option value="201-500">Large (201-500)</option>
                  <option value="501-1000">Enterprise (501-1000)</option>
                  <option value="1001-5000">Big Enterprise (1001-5000)</option>
                  <option value="5001-10000">Corporation (5001-10000)</option>
                  <option value="10001-50000">Large Corp (10001-50000)</option>
                  <option value="50000+">Mega Corp (50000+)</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Presença Global</label>
                <select value={data.current?.companyReach || ''} onChange={(e) => update('current', 'companyReach', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="local">Local — Uma cidade/região</option>
                  <option value="regional">Regional — Parte do país</option>
                  <option value="national">Nacional — Todo o país</option>
                  <option value="multi-national">Multi-Nacional — Alguns países</option>
                  <option value="continental">Continental — Um continente</option>
                  <option value="global">Global — Presença mundial</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Idade da Empresa</label>
                <select value={data.current?.companyAge || ''} onChange={(e) => update('current', 'companyAge', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="less-1">Menos de 1 ano</option>
                  <option value="1-3">1-3 anos</option>
                  <option value="3-5">3-5 anos</option>
                  <option value="5-10">5-10 anos</option>
                  <option value="10-25">10-25 anos</option>
                  <option value="25-50">25-50 anos</option>
                  <option value="50-100">50-100 anos</option>
                  <option value="100+">100+ anos (centenária)</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Reputação</label>
                <select value={data.current?.companyReputation || ''} onChange={(e) => update('current', 'companyReputation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="prestigious">Prestigious — Top tier, muito respeitada</option>
                  <option value="well-known">Well-Known — Conhecida, boa reputação</option>
                  <option value="respected">Respected — Respeitada na indústria</option>
                  <option value="growing">Growing — Em crescimento, promissora</option>
                  <option value="average">Average — Normal, sem destaque</option>
                  <option value="unknown">Unknown — Desconhecida</option>
                  <option value="controversial">Controversial — Polêmica</option>
                  <option value="declining">Declining — Em declínio</option>
                  <option value="bad">Bad Reputation — Má reputação</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Cultura da Empresa (até 4)</label>
              <div className="flex flex-wrap gap-2">
                {['Fast-Paced','Slow & Steady','Competitive','Collaborative','Innovative','Traditional','Formal','Casual','Results-Driven','Process-Oriented','Customer-Obsessed','Employee-First','Mission-Driven','Profit-Focused','Work Hard Play Hard','Work-Life Balance','Hierarchical','Flat Structure','Political','Meritocratic','Inclusive','Homogeneous','Transparent','Secretive','Micromanaging','Autonomous','Supportive','Sink or Swim','Learning Culture','Stagnant','Tech-Forward','Tech-Averse','Global Mindset','Local Focus','Startup Vibes','Corporate Feel','Family-Like','Professional','Toxic','Healthy','Burnout Culture','Sustainable Pace'].map(culture => (
                  <button key={culture} onClick={() => toggleArrayItem('current', 'companyCulture', culture, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.current?.companyCulture || []).includes(culture) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{culture}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Sonho de Infância — O que queria ser quando crescesse?</label>
              <input type="text" value={data.career?.childhoodDream || ''} onChange={(e) => update('career', 'childhoodDream', e.target.value)} placeholder="Ex: Astronauta, médico, jogador de futebol, bombeiro..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Como Entrou na Carreira Atual?</label>
                <select value={data.career?.careerEntry || ''} onChange={(e) => update('career', 'careerEntry', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="planned">Planned — Sempre soube o que queria</option>
                  <option value="education">Education — Natural da formação</option>
                  <option value="opportunity">Opportunity — Surgiu uma chance</option>
                  <option value="accident">Accident — Por acaso/sem querer</option>
                  <option value="necessity">Necessity — Precisou de dinheiro</option>
                  <option value="family">Family — Negócio/tradição familiar</option>
                  <option value="networking">Networking — Através de contatos</option>
                  <option value="pivot">Pivot — Mudou de área</option>
                  <option value="passion">Passion — Seguiu uma paixão</option>
                  <option value="mentorship">Mentorship — Influência de mentor</option>
                  <option value="failed-dream">Failed Dream — Plano B</option>
                  <option value="rebellion">Rebellion — Contra expectativas</option>
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
                  <option value="linear-up">Linear Up — Crescimento constante</option>
                  <option value="meteoric">Meteoric Rise — Subiu muito rápido</option>
                  <option value="steady">Steady — Estável, sem grandes mudanças</option>
                  <option value="zigzag">Zigzag — Altos e baixos</option>
                  <option value="pivot">Career Pivot — Mudou de área</option>
                  <option value="multiple-pivots">Multiple Pivots — Várias mudanças</option>
                  <option value="late-bloomer">Late Bloomer — Sucesso tardio</option>
                  <option value="early-peak">Early Peak — Pico cedo, depois estável</option>
                  <option value="comeback">Comeback — Caiu e voltou</option>
                  <option value="decline">Decline — Em declínio</option>
                  <option value="sabbaticals">Sabbaticals — Pausas frequentes</option>
                  <option value="entrepreneurial">Entrepreneurial — Sempre próprio negócio</option>
                  <option value="corporate-ladder">Corporate Ladder — Subiu na empresa</option>
                  <option value="job-hopper">Job Hopper — Muda muito de emprego</option>
                  <option value="loyal">Loyal — Poucas empresas, muito tempo</option>
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
                  <option value="legend">Legend — Lendário, referência histórica</option>
                  <option value="thought-leader">Thought Leader — Líder de opinião</option>
                  <option value="industry-expert">Industry Expert — Especialista reconhecido</option>
                  <option value="well-known">Well-Known — Conhecido na área</option>
                  <option value="rising-star">Rising Star — Promessa, em ascensão</option>
                  <option value="respected">Respected — Respeitado pelos pares</option>
                  <option value="solid">Solid Professional — Profissional sólido</option>
                  <option value="average">Average — Normal, sem destaque</option>
                  <option value="unknown">Unknown — Desconhecido</option>
                  <option value="controversial">Controversial — Polêmico</option>
                  <option value="has-been">Has-Been — Já foi importante</option>
                  <option value="blacklisted">Blacklisted — Má fama</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Network Profissional</label>
                <select value={data.career?.networkStrength || ''} onChange={(e) => update('career', 'networkStrength', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="exceptional">Exceptional — Conhece todo mundo</option>
                  <option value="strong">Strong — Boa rede de contatos</option>
                  <option value="growing">Growing — Construindo network</option>
                  <option value="average">Average — Alguns contatos</option>
                  <option value="weak">Weak — Poucos contatos</option>
                  <option value="isolated">Isolated — Praticamente nenhum</option>
                  <option value="burned-bridges">Burned Bridges — Queimou pontes</option>
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
                  <option value="ceo">CEO/Top Executive — Quer chegar ao topo</option>
                  <option value="founder">Founder — Quer ter próprio negócio</option>
                  <option value="expert">Expert — Ser referência na área</option>
                  <option value="leader">Leader — Liderar grandes equipes</option>
                  <option value="impact">Impact — Fazer diferença no mundo</option>
                  <option value="wealth">Wealth — Ficar rico</option>
                  <option value="fame">Fame — Ser famoso/reconhecido</option>
                  <option value="stability">Stability — Ter estabilidade</option>
                  <option value="balance">Balance — Equilíbrio vida-trabalho</option>
                  <option value="retire-early">Retire Early — Aposentar cedo</option>
                  <option value="change-world">Change the World — Mudar o mundo</option>
                  <option value="creative">Creative Freedom — Liberdade criativa</option>
                  <option value="help-others">Help Others — Ajudar pessoas</option>
                  <option value="learn">Continuous Learning — Sempre aprender</option>
                  <option value="none">No Ambition — Sem grandes ambições</option>
                  <option value="survive">Just Survive — Apenas sobreviver</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Atitude sobre Carreira</label>
                <select value={data.career?.careerAttitude || ''} onChange={(e) => update('career', 'careerAttitude', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="passionate">Passionate — Ama o que faz</option>
                  <option value="driven">Driven — Muito motivado</option>
                  <option value="content">Content — Satisfeito</option>
                  <option value="comfortable">Comfortable — Confortável</option>
                  <option value="indifferent">Indifferent — Indiferente</option>
                  <option value="frustrated">Frustrated — Frustrado</option>
                  <option value="burned-out">Burned Out — Esgotado</option>
                  <option value="stuck">Stuck — Preso, sem saída</option>
                  <option value="transitioning">Transitioning — Em transição</option>
                  <option value="searching">Searching — Buscando propósito</option>
                  <option value="retired-mentality">Retired Mentality — Já desistiu</option>
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
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Tedioso</span><span>Apaixonante</span></div>
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
                  <option value="never">Never — Separa completamente</option>
                  <option value="rarely">Rarely — Só em emergências</option>
                  <option value="sometimes">Sometimes — Ocasionalmente</option>
                  <option value="often">Often — Frequentemente</option>
                  <option value="always">Always — Trabalha de casa ou não desliga</option>
                  <option value="remote">Remote Worker — Casa é o trabalho</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Consegue Desconectar?</label>
                <select value={data.workLife?.abilityToDisconnect || ''} onChange={(e) => update('workLife', 'abilityToDisconnect', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="excellent">Excellent — Desliga completamente fora do horário</option>
                  <option value="good">Good — Consegue desconectar bem</option>
                  <option value="moderate">Moderate — Às vezes checa coisas</option>
                  <option value="poor">Poor — Dificuldade em desconectar</option>
                  <option value="impossible">Impossible — Sempre conectado</option>
                  <option value="by-choice">By Choice — Fica conectado porque quer</option>
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
                  <option value="mentor">Mentor — Chefe é mentor e protetor</option>
                  <option value="friend">Friendly — Relação de amizade</option>
                  <option value="professional">Professional — Estritamente profissional</option>
                  <option value="distant">Distant — Pouco contato</option>
                  <option value="tense">Tense — Relação tensa</option>
                  <option value="conflict">Conflict — Em conflito aberto</option>
                  <option value="fear">Fear — Tem medo do chefe</option>
                  <option value="no-boss">No Boss — É o próprio chefe</option>
                  <option value="multiple">Multiple Bosses — Vários chefes</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relação com Colegas</label>
                <select value={data.workLife?.colleagueRelationship || ''} onChange={(e) => update('workLife', 'colleagueRelationship', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="best-friends">Best Friends — Melhores amigos</option>
                  <option value="friends">Friends — São amigos</option>
                  <option value="friendly">Friendly — Ambiente amigável</option>
                  <option value="cordial">Cordial — Cordial, mas não íntimo</option>
                  <option value="professional">Professional — Só profissional</option>
                  <option value="competitive">Competitive — Competição saudável</option>
                  <option value="cutthroat">Cutthroat — Competição agressiva</option>
                  <option value="isolated">Isolated — Isolado dos colegas</option>
                  <option value="conflict">Conflict — Conflitos frequentes</option>
                  <option value="works-alone">Works Alone — Não tem colegas</option>
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
                <option value="best-friends">Best Friends — Melhores amigos são do trabalho</option>
                <option value="many">Many — Vários amigos do trabalho</option>
                <option value="few">Few — Alguns amigos próximos</option>
                <option value="one">One — Um amigo especial</option>
                <option value="acquaintances">Acquaintances — Só conhecidos</option>
                <option value="none">None — Nenhum amigo no trabalho</option>
                <option value="prefers-separation">Prefers Separation — Prefere não misturar</option>
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
          <p className="font-mono text-xs text-yellow-800 leading-relaxed">Renda, relação com dinheiro, hábitos financeiros e situação econômica.</p>
        </div>

        {/* INCOME */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">💵 Renda & Patrimônio</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Faixa de Renda (relativa ao custo de vida local)</label>
                <select value={data.financial?.incomeLevel || ''} onChange={(e) => update('financial', 'incomeLevel', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="poverty">Poverty — Abaixo da linha da pobreza</option>
                  <option value="struggling">Struggling — Dificuldade para sobreviver</option>
                  <option value="low">Low Income — Baixa renda</option>
                  <option value="lower-middle">Lower Middle — Classe média baixa</option>
                  <option value="middle">Middle Class — Classe média</option>
                  <option value="upper-middle">Upper Middle — Classe média alta</option>
                  <option value="comfortable">Comfortable — Confortável financeiramente</option>
                  <option value="affluent">Affluent — Afluente</option>
                  <option value="wealthy">Wealthy — Rico</option>
                  <option value="very-wealthy">Very Wealthy — Muito rico</option>
                  <option value="ultra-wealthy">Ultra-Wealthy — Ultra rico (1%)</option>
                  <option value="billionaire">Billionaire — Bilionário</option>
                  <option value="variable">Variable — Renda variável/instável</option>
                  <option value="no-income">No Income — Sem renda própria</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Fonte Principal de Renda</label>
                <select value={data.financial?.incomeSource || ''} onChange={(e) => update('financial', 'incomeSource', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="salary">Salary — Salário de emprego</option>
                  <option value="hourly">Hourly Wage — Por hora</option>
                  <option value="commission">Commission — Comissões</option>
                  <option value="bonus-heavy">Bonus-Heavy — Bônus são significativos</option>
                  <option value="freelance">Freelance — Trabalho autônomo</option>
                  <option value="business-profit">Business Profit — Lucro de negócio</option>
                  <option value="investments">Investments — Investimentos</option>
                  <option value="dividends">Dividends — Dividendos</option>
                  <option value="rental">Rental Income — Aluguéis</option>
                  <option value="royalties">Royalties — Royalties</option>
                  <option value="inheritance">Inheritance — Herança</option>
                  <option value="trust-fund">Trust Fund — Fundo fiduciário</option>
                  <option value="spouse-partner">Spouse/Partner — Cônjuge sustenta</option>
                  <option value="family-support">Family Support — Família ajuda</option>
                  <option value="government">Government Benefits — Benefícios do governo</option>
                  <option value="pension">Pension — Aposentadoria</option>
                  <option value="alimony">Alimony — Pensão alimentícia</option>
                  <option value="gig-economy">Gig Economy — Apps e bicos</option>
                  <option value="tips">Tips — Gorjetas</option>
                  <option value="illegal">Illegal Activities — Atividades ilegais</option>
                  <option value="multiple">Multiple Streams — Múltiplas fontes</option>
                  <option value="unknown">Unknown — Origem misteriosa</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Situação de Patrimônio</label>
                <select value={data.financial?.wealthStatus || ''} onChange={(e) => update('financial', 'wealthStatus', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="negative">Negative Net Worth — Deve mais do que tem</option>
                  <option value="zero">Zero — Empata</option>
                  <option value="building">Building — Construindo patrimônio</option>
                  <option value="modest">Modest Savings — Algumas economias</option>
                  <option value="comfortable">Comfortable Cushion — Reserva confortável</option>
                  <option value="significant">Significant Assets — Ativos significativos</option>
                  <option value="wealthy">Wealthy — Patrimônio considerável</option>
                  <option value="generational">Generational Wealth — Riqueza geracional</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estabilidade de Renda</label>
                <select value={data.financial?.incomeStability || ''} onChange={(e) => update('financial', 'incomeStability', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="rock-solid">Rock Solid — Extremamente estável</option>
                  <option value="stable">Stable — Estável e previsível</option>
                  <option value="mostly-stable">Mostly Stable — Geralmente estável</option>
                  <option value="somewhat-variable">Somewhat Variable — Alguma variação</option>
                  <option value="variable">Variable — Varia bastante</option>
                  <option value="unpredictable">Unpredictable — Imprevisível</option>
                  <option value="feast-or-famine">Feast or Famine — Extremos</option>
                  <option value="declining">Declining — Em declínio</option>
                  <option value="growing">Growing — Em crescimento</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RELATIONSHIP WITH MONEY */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">🧠 Relação com Dinheiro</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Atitude Geral com Dinheiro</label>
                <select value={data.financial?.moneyAttitude || ''} onChange={(e) => update('financial', 'moneyAttitude', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="obsessed">Obsessed — Dinheiro é tudo</option>
                  <option value="motivated">Motivated — Dinheiro é grande motivador</option>
                  <option value="practical">Practical — Ferramenta necessária</option>
                  <option value="balanced">Balanced — Equilíbrio saudável</option>
                  <option value="indifferent">Indifferent — Não pensa muito</option>
                  <option value="avoidant">Avoidant — Evita pensar em dinheiro</option>
                  <option value="anxious">Anxious — Causa ansiedade</option>
                  <option value="guilty">Guilty — Se sente culpado</option>
                  <option value="generous">Generous — Gosta de dar</option>
                  <option value="philosophical">Philosophical — Dinheiro não é importante</option>
                  <option value="conflicted">Conflicted — Relação complicada</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo de Gastar</label>
                <select value={data.financial?.spendingStyle || ''} onChange={(e) => update('financial', 'spendingStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="extreme-saver">Extreme Saver — Não gasta quase nada</option>
                  <option value="frugal">Frugal — Muito econômico</option>
                  <option value="careful">Careful — Cuidadoso com gastos</option>
                  <option value="moderate">Moderate — Equilibrado</option>
                  <option value="generous">Generous — Gasta bem, não exagera</option>
                  <option value="liberal">Liberal — Gasta com facilidade</option>
                  <option value="impulsive">Impulsive — Compra por impulso</option>
                  <option value="lavish">Lavish — Gasta muito</option>
                  <option value="reckless">Reckless — Sem controle</option>
                  <option value="strategic">Strategic — Gasta estrategicamente</option>
                  <option value="experiences">Experiences Over Things — Prioriza experiências</option>
                  <option value="things">Things Over Experiences — Prioriza posses</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Ansiedade Financeira</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>😌 Zero preocupação</span><span>😰 Pânico constante</span></div>
              <input type="range" min="1" max="9" value={data.financial?.financialAnxiety || 5} onChange={(e) => update('financial', 'financialAnxiety', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Importância do Dinheiro vs Outras Coisas</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>💭 Dinheiro irrelevante</span><span>💰 Dinheiro é prioridade</span></div>
              <input type="range" min="1" max="9" value={data.financial?.moneyImportance || 5} onChange={(e) => update('financial', 'moneyImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 to-yellow-500 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* FINANCIAL HABITS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">📊 Hábitos Financeiros</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Faz Orçamento?</label>
                <select value={data.financial?.budgeting || ''} onChange={(e) => update('financial', 'budgeting', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="meticulous">Meticulous — Cada centavo rastreado</option>
                  <option value="detailed">Detailed — Orçamento detalhado</option>
                  <option value="basic">Basic — Orçamento básico</option>
                  <option value="mental">Mental — Controle mental</option>
                  <option value="loose">Loose — Ideia geral</option>
                  <option value="none">None — Não faz orçamento</option>
                  <option value="chaos">Chaos — Sem controle nenhum</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Hábito de Poupar</label>
                <select value={data.financial?.savingHabit || ''} onChange={(e) => update('financial', 'savingHabit', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="aggressive">Aggressive — Poupa muito (30%+)</option>
                  <option value="strong">Strong — Poupa bem (15-30%)</option>
                  <option value="moderate">Moderate — Poupa algo (5-15%)</option>
                  <option value="minimal">Minimal — Poupa pouco (&lt;5%)</option>
                  <option value="irregular">Irregular — Quando sobra</option>
                  <option value="none">None — Não consegue poupar</option>
                  <option value="negative">Negative — Gasta mais do que ganha</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Conhecimento Financeiro</label>
                <select value={data.financial?.financialLiteracy || ''} onChange={(e) => update('financial', 'financialLiteracy', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="expert">Expert — Expertise profissional</option>
                  <option value="sophisticated">Sophisticated — Muito conhecimento</option>
                  <option value="good">Good — Bom entendimento</option>
                  <option value="basic">Basic — Conhecimento básico</option>
                  <option value="limited">Limited — Conhecimento limitado</option>
                  <option value="poor">Poor — Pouco conhecimento</option>
                  <option value="none">None — Sem conhecimento</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Onde Gasta Mais (até 4)</label>
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
          <h4 className="font-mono text-sm font-bold text-red-800 mb-3">⚠️ Dívidas & Problemas Financeiros</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Situação de Dívida</label>
                <select value={data.financial?.debtSituation || ''} onChange={(e) => update('financial', 'debtSituation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="debt-free">Debt-Free — Sem nenhuma dívida</option>
                  <option value="mortgage-only">Mortgage Only — Só financiamento de imóvel</option>
                  <option value="manageable">Manageable — Dívidas sob controle</option>
                  <option value="working-on-it">Working On It — Pagando ativamente</option>
                  <option value="significant">Significant — Dívidas significativas</option>
                  <option value="overwhelming">Overwhelming — Dívidas esmagadoras</option>
                  <option value="default">Default — Em inadimplência</option>
                  <option value="bankruptcy">Bankruptcy — Falência/recuperação</option>
                  <option value="student-loans">Heavy Student Loans — Empréstimos estudantis</option>
                  <option value="medical-debt">Medical Debt — Dívidas médicas</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Histórico de Crédito</label>
                <select value={data.financial?.creditHistory || ''} onChange={(e) => update('financial', 'creditHistory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                  <option value="">-- Selecione --</option>
                  <option value="excellent">Excellent — Score excelente</option>
                  <option value="good">Good — Bom histórico</option>
                  <option value="fair">Fair — Razoável</option>
                  <option value="poor">Poor — Ruim</option>
                  <option value="bad">Bad — Muito ruim, nome sujo</option>
                  <option value="none">None — Sem histórico</option>
                  <option value="rebuilding">Rebuilding — Reconstruindo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Reserva de Emergência</label>
              <select value={data.financial?.emergencyFund || ''} onChange={(e) => update('financial', 'emergencyFund', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="none">None — Nenhuma reserva</option>
                <option value="less-1m">Less than 1 month — Menos de 1 mês de despesas</option>
                <option value="1-3m">1-3 months — 1-3 meses</option>
                <option value="3-6m">3-6 months — 3-6 meses (recomendado)</option>
                <option value="6-12m">6-12 months — 6-12 meses</option>
                <option value="1y+">1+ year — Mais de 1 ano</option>
                <option value="years">Multiple Years — Anos de reserva</option>
                <option value="unlimited">Unlimited — Não precisa se preocupar</option>
              </select>
            </div>
          </div>
        </div>

        {/* FINANCIAL GOALS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎯 Objetivos Financeiros</h4>
          <textarea value={data.financial?.financialGoals || ''} onChange={(e) => update('financial', 'financialGoals', e.target.value)} placeholder="Quais são os objetivos financeiros? Comprar casa, aposentar cedo, pagar dívidas, viajar..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

const GenericTabContent = ({ tabId, data, updateData, subtab, subtabs }) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-300 mb-4">
        <Icons.Database width={48} height={48} className="mx-auto" />
      </div>
      <h3 className="font-serif text-xl text-gray-400 mb-2">
        {subtabs && subtabs[subtab] ? subtabs[subtab] : tabId.toUpperCase()}
      </h3>
      <p className="font-mono text-xs text-gray-400">
        Content structure ready. Implementation in progress.
      </p>
    </div>
  );
};

// ============================================================================
// DATABASE CONTENT
// ============================================================================
const DatabaseContent = ({ characterData, onCopy, onDownload, copied }) => {
  const countFields = (obj) => {
    let filled = 0, total = 0;
    const count = (o) => {
      Object.values(o).forEach(v => {
        if (typeof v === 'object' && v !== null && !Array.isArray(v)) count(v);
        else {
          total++;
          if (Array.isArray(v)) { if (v.length > 0) filled++; }
          else if (v !== '' && v !== null && v !== undefined && v !== 5) filled++;
        }
      });
    };
    count(obj);
    return { filled, total };
  };
  
  const stats = countFields(characterData);
  const percent = Math.round((stats.filled / stats.total) * 100);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <span className="inline-block bg-[#1a365d] text-white font-mono text-[9px] px-2 py-1 tracking-[0.15em]">SYSTEM // DATA REGISTRY</span>
      </div>
      <h1 className="font-serif text-4xl font-black italic text-gray-900 mb-4">Character Database</h1>
      <p className="font-mono text-xs text-gray-500 mb-8">Real-time structured data from all profile sections.</p>
      
      <div className="flex items-center gap-4 mb-6 p-4 bg-white/70 border border-gray-200">
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] text-gray-500 uppercase">Completion</span>
            <span className="font-mono text-sm font-bold">{stats.filled}/{stats.total}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <div className="text-center px-4 border-l border-gray-200">
          <div className="font-mono text-2xl font-black">{percent}%</div>
        </div>
      </div>
      
      <div className="flex gap-3 mb-6">
        <button onClick={onCopy} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white font-mono text-xs uppercase hover:bg-gray-700">
          {copied ? <Icons.Check width={14} height={14} /> : <Icons.Copy width={14} height={14} />}
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
        <button onClick={onDownload} className="flex items-center gap-2 px-4 py-2 border-2 border-gray-900 font-mono text-xs uppercase hover:bg-gray-100">
          <Icons.Download width={14} height={14} />
          Download
        </button>
      </div>
      
      <div className="bg-[#1e293b] rounded-t-md">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[10px] text-gray-400 ml-2">character_profile.json</span>
        </div>
      </div>
      <div className="bg-slate-50 border-2 border-t-0 border-[#1e293b] rounded-b-md p-4 max-h-[400px] overflow-auto">
        <pre className="font-mono text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(characterData, null, 2)}</pre>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT CONTENT
// ============================================================================
const ExportContent = ({ characterData, onCopy, onDownload }) => {
  const [exportFormat, setExportFormat] = useState('json');
  
  const generateTextExport = () => {
    let text = `CHARACTER PROFILE: ${characterData.identity?.core?.firstName || 'Unnamed'} ${characterData.identity?.core?.lastName || ''}\n`;
    text += `${'='.repeat(60)}\n\n`;
    
    const addSection = (title, obj, depth = 0) => {
      if (!obj) return;
      text += `${title.toUpperCase()}\n${'-'.repeat(40)}\n`;
      Object.entries(obj).forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          text += `\n[${key}]\n`;
          Object.entries(val).forEach(([k, v]) => {
            if (Array.isArray(v) && v.length > 0) text += `${k}: ${v.join(', ')}\n`;
            else if (v && v !== '' && v !== 5) text += `${k}: ${v}\n`;
          });
        }
      });
      text += '\n';
    };
    
    addSection('Identity', characterData.identity);
    addSection('Appearance', characterData.appearance);
    addSection('Psychology', characterData.psychology);
    addSection('Worldview', characterData.worldview);
    addSection('Favorites', characterData.favorites);
    addSection('Behavior', characterData.behavior);
    addSection('Secrets', characterData.secrets);
    addSection('Goals', characterData.goals);
    
    text += `\nGenerated by Persona Loom v4\n`;
    return text;
  };
  
  const handleExport = () => {
    if (exportFormat === 'json') {
      onDownload();
    } else {
      const text = generateTextExport();
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${characterData.identity?.core?.firstName || 'character'}_profile.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <span className="inline-block bg-[#2C3E50] text-white font-mono text-[9px] px-2 py-1 tracking-[0.15em]">SYSTEM // EXPORT</span>
      </div>
      <h1 className="font-serif text-4xl font-black italic text-gray-900 mb-4">Export Character</h1>
      <p className="font-mono text-xs text-gray-500 mb-8">Export your character profile in different formats.</p>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <h3 className="font-mono text-sm font-bold text-gray-800 mb-4">Export Format</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setExportFormat('json')} className={`p-4 border-2 rounded-sm transition-all ${exportFormat === 'json' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="text-2xl mb-2">📄</div>
              <div className="font-mono text-sm font-bold">JSON</div>
              <div className="font-mono text-[10px] text-gray-500">Full data, machine-readable</div>
            </button>
            <button onClick={() => setExportFormat('txt')} className={`p-4 border-2 rounded-sm transition-all ${exportFormat === 'txt' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="text-2xl mb-2">📝</div>
              <div className="font-mono text-sm font-bold">Text</div>
              <div className="font-mono text-[10px] text-gray-500">Human-readable summary</div>
            </button>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-mono text-xs uppercase hover:bg-gray-700">
            <Icons.Download width={16} height={16} />
            Export as {exportFormat.toUpperCase()}
          </button>
          <button onClick={onCopy} className="flex items-center gap-2 px-4 py-3 border-2 border-gray-900 font-mono text-xs uppercase hover:bg-gray-100">
            <Icons.Copy width={16} height={16} />
            Copy JSON
          </button>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-xs font-bold text-gray-600 mb-3">Preview</h4>
          <div className="bg-white border border-gray-200 rounded-sm p-4 max-h-[300px] overflow-auto">
            <pre className="font-mono text-[10px] text-gray-600 whitespace-pre-wrap">
              {exportFormat === 'json' ? JSON.stringify(characterData, null, 2).substring(0, 1500) + '...' : generateTextExport()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================
export default function PersonaLoomV4() {
  const [activeTab, setActiveTab] = useState('identity');
  const [activeSubtab, setActiveSubtab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [characterData, setCharacterData] = useState(createInitialCharacterData);

  useEffect(() => { setActiveSubtab(0); }, [activeTab]);

  const characterAge = parseInt(characterData.identity.vitals.age) || 0;
  const isAdult = characterAge >= 18;
  
  useEffect(() => {
    if (!isAdult && hasIntimacyData(characterData.intimacy)) {
      setCharacterData(prev => ({ ...prev, intimacy: createInitialCharacterData().intimacy }));
    }
  }, [isAdult]);
  
  function hasIntimacyData(intimacy) {
    return Object.values(intimacy).some(section => Object.values(section).some(val => val !== '' && val !== 5));
  }
  
  const isTabLocked = (tabId) => tabId === 'intimacy' && !isAdult;
  
  const getLockReason = (tabId) => {
    if (tabId === 'intimacy' && !isAdult) {
      return characterAge === 0 
        ? "Character age must be set to 18+ to access this section."
        : `This section is restricted to adult characters (18+). Current age: ${characterAge}.`;
    }
    return '';
  };

  const updateData = (section, data) => setCharacterData(prev => ({ ...prev, [section]: data }));

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(characterData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `persona_${characterData.identity.core.firstName || 'unnamed'}_${Date.now()}.json`;
    a.click();
  };

  const currentTabConfig = TABS_CONFIG.find(t => t.id === activeTab);

  const renderTabContent = () => {
    if (isTabLocked(activeTab)) {
      return <LockedContentScreen reason={getLockReason(activeTab)} tabName={currentTabConfig?.label || activeTab} />;
    }
    
    switch (activeTab) {
      case 'identity':
        return <IdentityContent data={characterData.identity} updateData={updateData} subtab={activeSubtab} />;
      case 'appearance':
        return <AppearanceContent data={characterData.appearance} updateData={updateData} subtab={activeSubtab} />;
      case 'psychology':
        return <PsychologyContent data={characterData.psychology} updateData={updateData} subtab={activeSubtab} />;
      case 'physique':
        return <GenericTabContent tabId={activeTab} data={characterData.physique} updateData={updateData} subtab={activeSubtab} subtabs={currentTabConfig?.subtabs} />;
      case 'voice':
        return <VoiceContent data={characterData.voice} updateData={updateData} subtab={activeSubtab} />;
      case 'history':
        return <GenericTabContent tabId={activeTab} data={characterData.history} updateData={updateData} subtab={activeSubtab} subtabs={currentTabConfig?.subtabs} />;
      case 'relationships':
        return <GenericTabContent tabId={activeTab} data={characterData.relationships} updateData={updateData} subtab={activeSubtab} subtabs={currentTabConfig?.subtabs} />;
      case 'intimacy':
        return <GenericTabContent tabId={activeTab} data={characterData.intimacy} updateData={updateData} subtab={activeSubtab} subtabs={currentTabConfig?.subtabs} />;
      case 'occupation':
        return <OccupationContent data={characterData.occupation} updateData={updateData} subtab={activeSubtab} />;
      case 'intelligence':
        return <IntelligenceContent data={characterData.intelligence} updateData={updateData} subtab={activeSubtab} />;
      case 'worldview':
        return <WorldviewContent data={characterData.worldview} updateData={updateData} subtab={activeSubtab} />;
      case 'favorites':
        return <FavoritesContent data={characterData.favorites} updateData={updateData} subtab={activeSubtab} />;
      case 'behavior':
        return <BehaviorContent data={characterData.behavior} updateData={updateData} subtab={activeSubtab} />;
      case 'secrets':
        return <SecretsContent data={characterData.secrets} updateData={updateData} subtab={activeSubtab} />;
      case 'goals':
        return <GoalsContent data={characterData.goals} updateData={updateData} subtab={activeSubtab} />;
      case 'database':
        return <DatabaseContent characterData={characterData} onCopy={handleCopy} onDownload={handleDownload} copied={copied} />;
      case 'export':
        return <ExportContent characterData={characterData} onCopy={handleCopy} onDownload={handleDownload} />;
      default:
        return <GenericTabContent tabId={activeTab} data={characterData[activeTab]} updateData={updateData} subtab={activeSubtab} subtabs={currentTabConfig?.subtabs || []} />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
      
      <div className="relative flex shadow-2xl w-full max-w-[1200px] h-[85vh] min-h-[600px]">
        {/* Spine */}
        <div className="w-6 flex-shrink-0 relative rounded-l-md" style={{ background: 'linear-gradient(90deg, #3d3428, #5a4d3a, #4a4035)' }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full" style={{ top: `${15 + i * 14}%`, background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #1a1a1a)' }} />
          ))}
        </div>

        {/* Tabs sidebar */}
        <div className="w-[140px] flex-shrink-0 flex flex-col -mr-2 overflow-y-auto" style={{ background: '#e8e0d0', zIndex: 10 }}>
          <div className="flex flex-col gap-0.5 pr-2">
            {TABS_CONFIG.map((tab, idx) => (
              <FileTab 
                key={tab.id} 
                tab={tab} 
                isActive={activeTab === tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                index={idx}
                isLocked={isTabLocked(tab.id)}
                lockReason={getLockReason(tab.id)}
              />
            ))}
          </div>
          
          <div className="px-3 py-2 mt-2 mx-2 bg-white/50 border border-gray-300">
            <div className="font-mono text-[8px] text-gray-500 uppercase tracking-widest mb-1">Character Age</div>
            <div className={`font-mono text-lg font-bold ${isAdult ? 'text-emerald-700' : 'text-amber-600'}`}>
              {characterAge > 0 ? `${characterAge} yrs` : '—'}
            </div>
            <div className={`font-mono text-[8px] uppercase ${isAdult ? 'text-emerald-600' : 'text-amber-500'}`}>
              {characterAge > 0 ? (isAdult ? '✓ Adult' : '✗ Minor') : 'Not set'}
            </div>
          </div>
          
          <div className="mt-auto p-3">
            <div className="font-mono text-[7px] text-gray-500 uppercase tracking-widest opacity-50" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              PERSONA LOOM v4
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 relative overflow-hidden rounded-r-md" style={{ background: '#f5f0e6' }}>
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
          
          <div className="relative z-10 p-6 md:p-10 h-full overflow-y-auto">
            {currentTabConfig && activeTab !== 'database' && activeTab !== 'export' && (
              <>
                <div className="mb-4">
                  <span className="inline-block text-white font-mono text-[9px] px-2 py-1 tracking-[0.15em]" style={{ background: currentTabConfig.color }}>
                    FILE {String(TABS_CONFIG.findIndex(t => t.id === activeTab) + 1).padStart(2, '0')} // {currentTabConfig.label}
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-black italic text-gray-900 mb-2">{currentTabConfig.label}</h1>
                <div className="h-1 bg-gray-900 mb-6 w-32" />
                <SubtabNav subtabs={currentTabConfig.subtabs} activeSubtab={activeSubtab} setActiveSubtab={setActiveSubtab} />
              </>
            )}
            {renderTabContent()}
          </div>

          <div className="absolute top-6 right-6 w-16 h-16 flex items-center justify-center pointer-events-none opacity-30" style={{ border: '3px solid rgba(139, 0, 0, 0.4)', borderRadius: '50%', transform: 'rotate(-15deg)' }}>
            <span className="font-mono text-[7px] font-bold text-center leading-tight" style={{ color: 'rgba(139, 0, 0, 0.5)' }}>CLASSIFIED<br/>DOCUMENT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
