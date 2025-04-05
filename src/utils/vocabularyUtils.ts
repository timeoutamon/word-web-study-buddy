
import { LANGUAGES } from "@/lib/constants";

// Helper function to get vocabulary with etymological connections
export const getVocabularyWithEtymology = (language: string, sectionNumber: number) => {
  // In a real implementation, this would fetch from a database or large JSON file
  // For now, we'll demonstrate with a smaller example
  
  const vocabularyWithEtymology = {
    // Section 1 vocabulary for different languages
    nl: {
      1: [
        {
          english: "the",
          translation: "de/het",
          type: "article",
          etymology: "Dutch has two articles ('de' for common gender and 'het' for neuter). Similar to English 'the' with Germanic roots."
        },
        {
          english: "be",
          translation: "zijn",
          type: "verb",
          etymology: "WWW: 'Be/been' in English and 'zijn' both descend from Proto-Indo-European *h₁es- (to be). Related to English 'is'."
        },
        {
          english: "to",
          translation: "naar/om te",
          type: "preposition",
          etymology: "WWW: 'Naar' shares common Germanic origins with English 'near' for direction. 'Om te' for infinitive purpose."
        },
        {
          english: "of",
          translation: "van",
          type: "preposition",
          etymology: "WWW: 'Van' and English 'from' share Germanic roots. Both indicate source or possession."
        },
        {
          english: "and",
          translation: "en",
          type: "conjunction",
          etymology: "WWW: 'En' evolved from Proto-Germanic *andi, related to English 'and' from the same root."
        }
      ]
    },
    de: {
      1: [
        {
          english: "the",
          translation: "der/die/das",
          type: "article",
          etymology: "WWW: German uses three definite articles based on gender. From Proto-Germanic *sa (that one), related to English 'the'."
        },
        {
          english: "be",
          translation: "sein",
          type: "verb",
          etymology: "WWW: 'Sein' and English 'be' both come from PIE *h₁es-, through different stems. Related to English 'is'."
        },
        {
          english: "to",
          translation: "zu/nach",
          type: "preposition",
          etymology: "WWW: 'Zu' relates to English 'to' through Proto-Germanic *tō. Both indicate direction or purpose."
        },
        {
          english: "of",
          translation: "von",
          type: "preposition",
          etymology: "WWW: 'Von' and 'of' both evolved from Proto-Germanic *af (away, off), showing the connection."
        },
        {
          english: "and",
          translation: "und",
          type: "conjunction",
          etymology: "WWW: 'Und' and 'and' both derive from Proto-Germanic *andi, showing their common ancestry."
        }
      ]
    },
    it: {
      1: [
        {
          english: "the",
          translation: "il/la/lo",
          type: "article",
          etymology: "WWW: Italian articles change based on gender and first letter of noun. From Latin 'ille/illa' (that)."
        },
        {
          english: "be",
          translation: "essere",
          type: "verb",
          etymology: "WWW: 'Essere' comes from Latin 'esse' (to be), which derives from the same PIE root *h₁es- as English 'is'."
        },
        {
          english: "to",
          translation: "a/per",
          type: "preposition",
          etymology: "WWW: 'A' comes from Latin 'ad' (to, toward). 'Per' from Latin 'per' (through, by means of)."
        },
        {
          english: "of",
          translation: "di",
          type: "preposition",
          etymology: "WWW: 'Di' comes from Latin 'de' (from, concerning). Related to Old English 'of' through general possessive function."
        },
        {
          english: "and",
          translation: "e",
          type: "conjunction",
          etymology: "WWW: 'E' comes from Latin 'et'. Though not directly related to 'and', both serve as basic conjunctions in Indo-European languages."
        }
      ]
    },
    sp: {
      1: [
        {
          english: "the",
          translation: "el/la",
          type: "article",
          etymology: "WWW: Spanish articles change with gender. From Latin 'ille/illa' (that), same origin as English 'the'."
        },
        {
          english: "be",
          translation: "ser/estar",
          type: "verb",
          etymology: "WWW: Spanish has two verbs for 'be'. 'Ser' (permanent) from Latin 'esse' and 'estar' (temporary) from Latin 'stare' (to stand)."
        },
        {
          english: "to",
          translation: "a/para",
          type: "preposition",
          etymology: "WWW: 'A' from Latin 'ad' (to, toward). 'Para' developed from Latin 'per ad' (for/toward)."
        },
        {
          english: "of",
          translation: "de",
          type: "preposition",
          etymology: "WWW: Spanish 'de' comes directly from Latin 'de' (from, concerning), serving the same function as English 'of'."
        },
        {
          english: "and",
          translation: "y/e",
          type: "conjunction",
          etymology: "WWW: 'Y' (changes to 'e' before words starting with 'i-' sound) from Latin 'et'. Not directly related to 'and' but serves the same function."
        }
      ]
    }
  };

  // Return the vocabulary for the specified language and section
  return vocabularyWithEtymology[language as keyof typeof vocabularyWithEtymology]?.[sectionNumber] || [];
};

// Function to create non-overlapping vocabulary sets
export const createNonOverlappingVocabularySets = () => {
  // This would create 50 sets of vocabulary with no duplicates between sets
  // Here we would implement the logic to distribute the words you provided
  // across 50 sets for each language
  console.log("Creating non-overlapping vocabulary sets");
  
  // In a real implementation, this would be much more extensive
};

// Function to get proper etymology for a word
export const getEtymology = (word: string, sourceLang: string, targetLang: string) => {
  // This would contain a database of etymological connections between languages
  // For demonstration, we'll return a placeholder
  return `Etymology connection between ${word} (${sourceLang}) and its ${targetLang} translation.`;
};

// Function to check if a word has similar roots in another language
export const hasSimilarRoots = (word: string, sourceLang: string, targetLang: string) => {
  // This would check if the word has similar roots in the target language
  // For demonstration, we'll return a simple logic
  return Math.random() > 0.5; // 50% chance for demonstration
};
