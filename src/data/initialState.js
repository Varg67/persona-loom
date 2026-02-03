export const createInitialCharacterData = () => ({
  identity: {
    core: { firstName: '', middleName: '', lastName: '', nicknames: '', dateOfBirth: '', archetype: '' },
    vitals: { age: '', rpYear: new Date().getFullYear().toString(), generation: '', biologicalSex: '', genderIdentity: '', customGender: '', pronouns: '', customPronouns: '' },
    origins: { nationality: '', nationalityDetails: '', ethnicity: '', ethnicityDetails: '', birthCity: '', currentLocation: '', geographicType: '', childhoodTrope: '' },
    cultural: { primaryCulture: '', primaryCultureCustom: '', regionalCulture: '', regionalCultureCustom: '', religion: '', religionCustom: '', socialClassOrigin: '', subcultures: [], subculturesCustom: '' }
  },
  appearance: {
    face: {
      faceShape: '', faceLength: '', faceWidth: '',
      skinTone: '', skinUndertone: '', skinTexture: '', skinCondition: '',
      foreheadHeight: '', foreheadWidth: '', foreheadShape: '',
      eyeColor: '', eyeColorPattern: '', eyeShape: '', eyeSize: '', eyeLashes: '',
      eyebrowShape: '', eyebrowThickness: '', eyebrowColor: '', eyebrowArch: '',
      noseType: '', noseSize: '', noseBridge: '', noseTip: '', nostrilSize: '',
      cheekboneHeight: '', cheekboneProminence: '', cheekFullness: '',
      lipShape: '', lipThickness: '', lipUpperLower: '', lipColor: '', cupidsBow: '',
      jawlineShape: '', jawlineDefinition: '', chinShape: '', chinSize: '',
      earSize: '', earShape: '', earLobe: '',
      facialHairType: '', facialHairDensity: '', facialHairColor: '', facialHairStyle: '', facialHairLength: '',
      distinctiveMarks: '', wrinkles: '', dimples: '', freckles: ''
    },
    hair: {
      naturalColor: '', currentColor: '', colorShine: '', grayAmount: '',
      hairType: '', textureDesc: '', density: '', porosity: '', condition: '',
      length: '', hairline: '', parting: '', layers: '',
      styleCategory: '', primaryStyle: '', styleEra: '', eraStyle: '',
      stylingEffort: '', productsUsed: '', heatStyling: '', accessories: '', styleNotes: ''
    },
    body: {
      height: '', exactHeight: '', weightCategory: '', exactWeight: '',
      somatotype: '', build: '', muscleDef: '', bodyFat: '', frameSize: '',
      torsoLength: '', legLength: '', shoulderWidth: '', hipWidth: '', waist: '',
      armLength: '', armBuild: '', legBuild: '', handSize: '', handAppearance: '', feetSize: '',
      bodyHairAmount: '', bodyHairDist: '', bodySkinCondition: '', bodyMarks: '',
      neckLength: '', neckWidth: '', neckShape: '', adamsApple: '', clavicle: '', shoulderShape: '',
      backWidth: '', backShape: '', spineVisibility: '', ribcage: '', waistShape: '', hipShape: '',
      upperArmShape: '', forearmShape: '', elbowShape: '', wristSize: '', wristBones: '', fingerShape: '',
      thighShape: '', thighGap: '', kneeShape: '', calfShape: '', ankleSize: '', ankleBones: '',
      legAlignment: '', footArch: '', toeShape: '',
      nailShapeHands: '', nailLength: '', nailCondition: '',
      bustSize: '', bustShape: '', buttocks: '',
      chestMale: '', abdomen: '', buttocksMale: '',
      chestNB: '', abdomenNB: '', buttocksNB: '',
      posture: '', gaitStyle: '', presence: '', movementNotes: '',
      fitnessLevel: '', flexibility: '', stamina: '', disabilities: '', physicalNotes: ''
    },
    style: {
      fashionStyle: '', secondaryStyle: '', styleEra: '', fashionPriority: '', clothingFit: '', clothingQuality: '', clothingCondition: '',
      colorPalette: '', favoriteColor: '', patternPreference: '', colorCoordination: '',
      groomingLevel: '', hygieneLevel: '', fragrance: '', fragranceType: '', makeupUsage: '', makeupStyle: '', skincareRoutine: '',
      jewelryAmount: '', jewelryStyle: '', jewelryMetal: '', watch: '', eyewear: '', glassesStyle: '', bagStyle: '', hatWearing: '', hatStyle: '', signatureAccessories: '',
      tattooCoverage: '', tattooStyle: '', tattooDetails: '', piercingAmount: '', piercingLocations: '', piercingDetails: '',
      firstImpression: '', styleConsistency: '', attentionToAppearance: '', styleNotes: ''
    }
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
    condition: {
      generalHealth: '', immuneSystem: '', energyLevels: '', recoveryRate: '', painTolerance: '',
      fitnessLevel: '', athleticism: '', strength: '', speed: '', endurance: '',
      flexibility: '', balance: '', coordination: '',
      swimming: '', combat: '', dance: '', otherSkills: ''
    },
    senses: {
      vision: '', colorVision: '', nightVision: '', lightSensitivity: '',
      hearing: '', soundSensitivity: '', musicalEar: '', directionalHearing: '',
      smell: '', taste: '', touch: '', temperatureSensitivity: '', proprioception: '',
      dominantHand: '', dominantEye: '', motionSensitivity: '', sensoryNotes: ''
    },
    medical: {
      chronicConditions: '', conditionManagement: '', conditionDetails: '',
      disabilities: '', mobilityAid: '', disabilityDetails: '',
      allergySeverity: '', allergyType: '', allergies: '',
      bloodType: '', organDonor: '', medicalId: '', pastInjuries: '', medications: '',
      mentalHealthDx: '', mentalHealthTreatment: '', mentalHealthNotes: ''
    },
    habits: {
      sleepPattern: '', sleepDuration: '', sleepQuality: '', napping: '',
      dietType: '', eatingHabits: '', mealFrequency: '', cookingAbility: '', hydration: '',
      alcoholUse: '', tobaccoUse: '', caffeineUse: '', substanceUse: '', substanceNotes: '',
      exerciseRoutine: '', exerciseType: '', selfCareLevel: '', selfCarePractices: ''
    }
  },
  voice: {
    design: {
      voiceGender: '',
      voiceAge: '',
      pitch: 5,
      pitchVariation: 5,
      speed: 5,
      volume: 5,
      timbreWarmth: 5,
      timbreBrightness: 5,
      timbreRichness: 5,
      timbreSmoothness: 5,
      breathiness: 3,
      nasality: 3,
      roughness: 3,
      resonance: 5,
      clarity: 7,
      voiceTexture: '',
      emotionalTone: ''
    },
    speech: {
      articulation: '',
      sentenceStructure: '',
      fillerWords: '',
      profanityLevel: 3,
      sarcasmFrequency: 5,
      humorStyle: '',
      speechRhythm: '',
      emphasis: '',
      pausePattern: '',
      laughType: '',
      cryingStyle: '',
      shoutingStyle: ''
    },
    languages: {
      nativeLanguage: '',
      accent: '',
      accentStrength: 5,
      accentInfluence: '',
      secondLanguages: '',
      codeSwitching: '',
      dialectFeatures: '',
      writtenVsSpoken: ''
    }
  },
  history: {
    origin: {
      birthDate: '', birthPlace: '', birthCircumstances: '', birthOrder: '', plannedPregnancy: '',
      earlyChildhood: '', childhoodEnvironment: '', childhoodSocioeconomic: '', childhoodStability: '',
      elementarySchool: '', childhoodFriendships: '', childhoodActivities: [], childhoodPersonality: '',
      adolescence: '', teenageYears: '', highSchoolExperience: '', firstLove: '', teenageRebellion: '',
      comingOfAge: '', youngAdulthood: '', adultMilestones: [], currentLifePhase: '', lifePhaseNotes: ''
    },
    family: {
      familyStructure: '', parentsRelationship: '', motherDescription: '', motherRelationship: '', motherStatus: '',
      fatherDescription: '', fatherRelationship: '', fatherStatus: '', stepParents: '',
      siblingsCount: '', siblingsDetails: '', siblingsDynamic: '', siblingRivalry: '',
      grandparentsInfluence: '', extendedFamily: '', familyTraditions: [], familyValues: [],
      familySecrets: '', familyConflicts: '', inheritedTraits: [], familyExpectations: '',
      blackSheep: '', goldenChild: '', familyRole: '', familyLegacy: ''
    },
    moments: {
      definingMoments: [], happiestMemory: '', happiestMemoryAge: '', happiestMemoryWhy: '',
      worstMemory: '', worstMemoryAge: '', worstMemoryImpact: '',
      turningPoints: [], lifeChangingDecisions: [], biggestRegret: '', regretResolution: '',
      proudestAchievement: '', achievementAge: '', nearDeathExperience: '', lossesExperienced: [],
      majorFailures: '', failureLessons: '', luckyBreaks: '', missedOpportunities: ''
    },
    trauma: {
      childhoodTrauma: [], childhoodTraumaImpact: '', traumaAge: '', traumaType: '',
      coreWounds: [], woundOrigin: '', attachmentWounds: '', abandonmentExperiences: '',
      betrayalExperiences: '', abuseSurvived: [], neglectExperiences: '', bullyingHistory: '',
      lossTrauma: '', medicalTrauma: '', witnessedTrauma: '',
      ptsdSymptoms: [], triggers: [], copingMechanisms: [], unhealthyCoping: [],
      therapyHistory: '', healingJourney: '', healingProgress: 5, supportSystems: [],
      resilienceFactors: [], postTraumaticGrowth: '', unprocessedTrauma: ''
    },
    memories: {
      earliestMemory: '', earliestMemoryAge: '', childhoodHome: '', childhoodSmells: '',
      childhoodSounds: '', favoriteChildhoodToy: '', childhoodHideout: '', childhoodFears: [],
      schoolMemories: '', teachersRemembered: '', friendshipMemories: '', familyVacations: '',
      holidayMemories: '', birthdayMemories: '', embarrassingMemories: '', secretMemories: '',
      sensoryTriggers: [], memoriesRepressed: '', memoriesIdealized: '', photographMoments: ''
    }
  },
  relationships: {
    npcs: [],
    patterns: { socialEnergy: 5, trustLevel: 5, conflictStyle: '', loveLanguages: '', friendshipStyle: '' },
    circle: { bestFriends: '', closeFriends: '', acquaintances: '', rivals: '', mentors: '' },
    romantic: { relationshipStatus: '', pastRelationships: '', romanticPatterns: '', dealBreakers: '' },
    family: { relationshipWithParents: '', relationshipWithSiblings: '', estrangements: '' },
    self: { selfEsteem: 5, selfTalkPattern: '', bodyImage: '', identitySecurity: '' }
  },
  intimacy: {
    orientation: {
      sexualOrientation: '', kinseyScale: '', orientationCertainty: '', outnessLevel: '',
      romanticOrientation: '', relationshipStyle: '', loveLangPrimary: '', loveLangSecondary: '',
      experienceLevel: '', romanticExperience: '', firstExperienceAge: '', currentStatus: '',
      partnerCount: '', longestRelationship: ''
    },
    preferences: {
      preferredBodyType: '', agePreference: '', hairPreference: '', facialHairPref: '', stylePref: '', physicalPreferences: '',
      personalityPref: '', intelligencePref: '', humorPref: '', emotionalPref: '', emotionalPreferences: '',
      turnOnCategory: '', turnOffCategory: '', turnOns: '', turnOffs: '',
      boundaryStyle: '', opennessLevel: '', boundaries: ''
    },
    behavior: {
      attachmentStyle: '', jealousyLevel: '', communicationStyle: '', conflictStyle: '',
      initiativeLevel: 5, vulnerabilityLevel: 5,
      intimacyApproach: '', libido: '', preferredFrequency: '', preferredTime: '', preferredSetting: '',
      intensityLevel: 5, noiseLevel: 5, durationPref: 5,
      aftercareNeeds: '', postIntimacyBehavior: '',
      fantasySharing: '', roleplayInterest: '', fantasies: '',
      kinks: [], fetishes: []
    }
  },
  occupation: {
    jobs: [],
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
  },
  directives: {
    formatting: {
      responseLength: '',
      actionStyle: '',
      dialogueStyle: '',
      thoughtStyle: '',
      narrativePerson: '',
      paragraphStyle: ''
    },
    writingStyle: {
      detailLevel: '',
      vocabulary: '',
      pacing: '',
      focus: '',
      tone: ''
    },
    narrative: {
      genre: '',
      plotStyle: '',
      autonomy: '',
      agency: '',
      surprises: '',
      npcControl: '',
      collaboration: '',
      realism: ''
    },
    content: {
      consequences: '',
      matureContent: '',
      violence: '',
      language: '',
      themes: ''
    },
    customDirective: '',
    ruler: {
      plotRole: '',
      responseStructure: '',
      pacing: '',
      consistency: '',
      boundaries: '',
      interaction: '',
      autonomyBehavior: '',
      sliceOfLife: '',
      adventureRules: '',
      casualRules: '',
      importantRules: [],
      customRules: ''
    },
    proactive: {
      timing: '',
      frequency: '',
      quietHours: '',
      actionTypes: [],
      triggers: '',
      limits: '',
      personality: '',
      calendarAware: '',
      inactivityResponse: '',
      customDirective: ''
    }
  }
});
