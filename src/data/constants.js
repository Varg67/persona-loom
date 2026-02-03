import { Icons } from '../components/ui/Icons';

export const TABS_CONFIG = [
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
    subtabs: ['Voice Design', 'Speech Patterns', 'Languages & Accent', 'Voice Preview']
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
    subtabs: ['Key NPCs', 'Social Patterns', 'Current Circle', 'Romantic History', 'Family Ties']
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
    id: 'directives',
    label: 'DIRECTIVES',
    color: '#6B2D5B',
    icon: Icons.Sliders,
    subtabs: ['Formatting', 'Writing Style', 'Narrative', 'Content', 'Directive Preview', 'Ruler Builder', 'Ruler Preview', 'Proactive Mode', 'Proactive Preview']
  },
  {
    id: 'database',
    label: 'DATABASE',
    color: '#1a365d',
    icon: Icons.Database,
    subtabs: ['Overview', 'Browse Data', 'Statistics', 'Validation', 'Quick Edit', 'Compare']
  },
  {
    id: 'export',
    label: 'EXPORT',
    color: '#2C3E50',
    icon: Icons.Share,
    subtabs: ['Quick Export', 'Platform Templates', 'Custom Export', 'Import/Backup', 'Character Card', 'Share']
  },
];
