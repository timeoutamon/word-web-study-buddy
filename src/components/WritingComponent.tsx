
import React, { useState } from "react";
import { LANGUAGES, VOCABULARY_SECTIONS } from "@/lib/constants";

interface WritingComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const WritingComponent: React.FC<WritingComponentProps> = ({ language, lessonNumber, showPage }) => {
  const [notepadContent, setNotepadContent] = useState<string>("");
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;
  
  // Get vocabulary for this lesson to use in the writing prompts
  const lessonVocab = VOCABULARY_SECTIONS[lessonNumber as keyof typeof VOCABULARY_SECTIONS] || [];
  
  // Get writing prompts based on the vocabulary for this lesson
  const writingPrompts = getWritingPromptsForLesson(language, lessonNumber);
  
  function getWritingPromptsForLesson(lang: string, lesson: number) {
    // Writing prompts based on language and lesson number
    const promptsData = {
      nl: {
        1: [
          "Describe yourself using these words: 'ik', 'zijn', 'hebben', 'en', 'niet'.",
          "Write a short paragraph about your family using the pronouns 'ik', 'mijn', 'hij', 'zij', 'we'.",
          "Create 5 basic questions using 'wat', 'wie', 'waar', 'hoe', and 'waarom'.",
          "Describe your daily routine using present tense verbs.",
          "Write a short dialogue between two people meeting for the first time."
        ],
        2: [
          "Write about what you like to do in your free time using 'kunnen', 'willen', and 'maken'.",
          "Describe a typical year in your life using words for seasons and months.",
          "Create sentences comparing two things or people using 'dan' and 'zoals'.",
          "Write about a place you want to visit using 'naar', 'gaan', and 'zien'.",
          "Describe a good friend using 5 adjectives from this lesson."
        ],
        // More prompts for other lessons
      },
      de: {
        1: [
          "Introduce yourself using 'ich', 'sein', 'haben', 'und', and 'nicht'.",
          "Write a short paragraph about your family using the pronouns 'ich', 'mein', 'er', 'sie', 'wir'.",
          "Create 5 basic questions using 'was', 'wer', 'wo', 'wie', and 'warum'.",
          "Describe your typical day using present tense verbs.",
          "Write a short dialogue between two people meeting at a café."
        ],
        2: [
          "Write about what you can do and like to do using 'können', 'mögen', and 'machen'.",
          "Describe the four seasons and what activities you do in each one.",
          "Create sentences comparing two things or people using 'als' and 'wie'.",
          "Write about a place you want to visit using 'nach', 'gehen', and 'sehen'.",
          "Describe a good friend using 5 adjectives from this lesson."
        ],
        // More prompts for other lessons
      },
      it: {
        1: [
          "Introduce yourself using 'io', 'essere', 'avere', 'e', and 'non'.",
          "Write a short paragraph about your family using the pronouns 'io', 'mio', 'lui', 'lei', 'noi'.",
          "Create 5 basic questions using 'cosa', 'chi', 'dove', 'come', and 'perché'.",
          "Describe your daily routine using present tense verbs.",
          "Write a short dialogue ordering food at an Italian restaurant."
        ],
        2: [
          "Write about what you can do and like to do using 'potere', 'piacere', and 'fare'.",
          "Describe a year in your life using words for seasons and months.",
          "Create sentences comparing two things or people using 'di' and 'come'.",
          "Write about a place you want to visit in Italy using 'andare', 'vedere', and 'visitare'.",
          "Describe a good friend using 5 adjectives from this lesson."
        ],
        // More prompts for other lessons
      },
      sp: {
        1: [
          "Introduce yourself using 'yo', 'ser', 'tener', 'y', and 'no'.",
          "Write a short paragraph about your family using the pronouns 'yo', 'mi', 'él', 'ella', 'nosotros'.",
          "Create 5 basic questions using 'qué', 'quién', 'dónde', 'cómo', and 'por qué'.",
          "Describe your daily routine using present tense verbs.",
          "Write a short dialogue between two people meeting for the first time."
        ],
        2: [
          "Write about what you can do and like to do using 'poder', 'gustar', and 'hacer'.",
          "Describe the four seasons and what activities you do in each one.",
          "Create sentences comparing two things or people using 'que' and 'como'.",
          "Write about a place you want to visit using 'ir', 'ver', and 'visitar'.",
          "Describe a good friend using 5 adjectives from this lesson."
        ],
        // More prompts for other lessons
      }
    };

    // Get prompts for the specified language and lesson, or provide default prompts
    const langPrompts = promptsData[lang as keyof typeof promptsData] || {};
    const lessonPrompts = langPrompts[lesson as keyof typeof langPrompts];
    
    if (lessonPrompts) {
      return lessonPrompts;
    }
    
    // Default prompts if no specific ones are available
    return [
      `Describe yourself using ${languageName} vocabulary from this lesson.`,
      `Write about your day using ${languageName} words you've learned.`,
      `Create a short story using at least 10 ${languageName} words from this lesson.`,
      `Describe your favorite place using ${languageName} vocabulary.`,
      `Write a dialogue between two people using ${languageName} greetings and basic phrases.`
    ];
  }

  // Get vocabulary words for writing exercises
  const getRelevantVocabulary = () => {
    // Return a subset of the vocabulary that's particularly useful for writing
    const relevantTypes = ["verb", "adjective", "adverb", "noun", "preposition"];
    return lessonVocab.filter(item => {
      const type = item.type.toLowerCase();
      return relevantTypes.some(relevantType => type.includes(relevantType));
    }).slice(0, 15);
  };

  const relevantVocab = getRelevantVocabulary();

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Writing - Lesson {lessonNumber}
        </h1>
        <p className="text-gray-600">
          Practice writing in {languageName} using the vocabulary from this lesson. Write all exercises in your notebook.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Writing Prompts */}
        <div className="md:col-span-1">
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md h-full">
            <h2 className="text-2xl font-bold mb-4">Writing Prompts</h2>
            <p className="mb-4 text-sm text-gray-600">
              Choose one or more of these prompts for your writing practice. Write your responses in your notebook.
            </p>
            <ol className="list-decimal pl-5 space-y-4">
              {writingPrompts.map((prompt, index) => (
                <li key={index} className="font-medium">
                  {prompt}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Vocabulary Aid and Notepad */}
        <div className="md:col-span-2">
          {/* Key Vocabulary */}
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Key Vocabulary for Writing</h2>
            <p className="mb-3 text-sm text-gray-600">
              Use these words from Lesson {lessonNumber} in your writing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relevantVocab.map((word, index) => (
                <div key={index} className="bg-gray-50 py-1 px-3 rounded-lg text-sm">
                  <strong>{word.english}</strong> <span className="text-gray-600">({word.type})</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Notepad */}
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Writing Space</h2>
            <p className="mb-4 text-sm text-gray-600">
              Write your answers in your notebook first, then type them here to check for mistakes.
            </p>
            <textarea
              value={notepadContent}
              onChange={(e) => setNotepadContent(e.target.value)}
              placeholder="Type your writing here to practice..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none font-medium"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">Writing Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Start by writing simple sentences and gradually build more complex ones.</li>
          <li>Use your vocabulary and grammar notes from previous lessons.</li>
          <li>Don't worry about making mistakes – they're part of the learning process!</li>
          <li>Read your writing aloud to practice pronunciation simultaneously.</li>
          <li>Date your writing in your notebook to track your progress over time.</li>
          <li>Try to use at least 10 new words from this lesson in your writing.</li>
        </ul>
      </div>

      {/* Back to Lesson button */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={() => showPage(language)} 
          className="language-btn bg-white py-3 px-6 border-2 border-black rounded-lg shadow-md hover:bg-gray-100 font-bold text-xl"
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
};

export default WritingComponent;
