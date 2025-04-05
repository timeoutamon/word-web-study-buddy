// Language information
export const LANGUAGES = {
  nl: {
    code: 'nl',
    name: 'Dutch',
    fullName: 'Dutch',
    nativeName: 'Nederlands'
  },
  it: {
    code: 'it',
    name: 'Italian',
    fullName: 'Italian',
    nativeName: 'Italiano'
  },
  sp: {
    code: 'sp',
    name: 'Spanish',
    fullName: 'Spanish',
    nativeName: 'Español'
  },
  de: {
    code: 'de',
    name: 'German',
    fullName: 'German',
    nativeName: 'Deutsch'
  }
};

// Number of lessons per language
export const LESSONS_PER_LANGUAGE = 50;

// Grammar types in order of lesson sequence (repeats every 7 lessons)
export const GRAMMAR_TYPES = [
  "Present Tense",
  "Past Simple (Preterite)",
  "Past Continuous (Imperfect)",
  "Future Simple",
  "Present Perfect",
  "Conditional",
  "Imperative"
];

// Helper function to get grammar type for a lesson
export const getGrammarTypeForLesson = (lessonNumber: number) => {
  const index = (lessonNumber - 1) % GRAMMAR_TYPES.length;
  return GRAMMAR_TYPES[index];
};

// Vocabulary sections mapped to lesson numbers
// This is a placeholder - in a real implementation,
// this would contain the actual 50 sections of vocabulary
export const VOCABULARY_SECTIONS = {
  // Only section 1 is defined for demo purposes
  1: [
    { english: "the", type: "article" },
    { english: "be", type: "verb" },
    { english: "to", type: "preposition" },
    { english: "of", type: "preposition" },
    { english: "and", type: "conjunction" },
    { english: "a", type: "article" },
    { english: "in", type: "preposition" },
    { english: "that", type: "pronoun/conjunction" },
    { english: "have", type: "verb" },
    { english: "I", type: "pronoun" }
    // ... rest of section 1 words
  ]
  // Other sections would be defined similarly
};
