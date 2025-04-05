
import React, { useState } from "react";
import { LANGUAGES } from "@/lib/constants";

interface GrammarComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const GrammarComponent: React.FC<GrammarComponentProps> = ({ language, lessonNumber, showPage }) => {
  const [hoveredBlank, setHoveredBlank] = useState<number | null>(null);
  
  // Determine the grammar topic based on lesson number
  const getGrammarTopic = (lessonNum: number) => {
    // Calculate which grammar type to use (modules of 7)
    const grammarTypeIndex = (lessonNum - 1) % 7;
    
    const grammarTypes = [
      "Present Tense",
      "Past Simple (Preterite)",
      "Past Continuous (Imperfect)",
      "Future Simple",
      "Present Perfect",
      "Conditional",
      "Imperative"
    ];
    
    return grammarTypes[grammarTypeIndex];
  };
  
  const grammarTopic = getGrammarTopic(lessonNumber);
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;
  
  // Example sentences with translations (would be dynamically generated based on vocabulary)
  const exampleSentences = getDummyExampleSentences(language, grammarTopic);
  
  // Fill-in-the-blank exercises
  const blankExercises = getDummyBlankExercises(language, grammarTopic);
  
  // Transliteration sentences
  const transliterationSentences = getDummyTransliterationSentences(language, grammarTopic);
  
  // Grammar-specific fill-in-the-blank exercises
  const grammarExercises = getDummyGrammarExercises(language, grammarTopic);

  // Helper function to get dummy data for demonstration
  function getDummyExampleSentences(lang: string, topic: string) {
    // This would be populated with real data aligned with vocabulary
    const sentences = [];
    
    if (lang === "nl") {
      if (topic === "Present Tense") {
        sentences.push(
          { original: "Ik ga naar de winkel.", translation: "I go to the store." },
          { original: "Hij werkt in Amsterdam.", translation: "He works in Amsterdam." },
          { original: "Wij spreken Nederlands.", translation: "We speak Dutch." },
          { original: "Zij leest een boek.", translation: "She reads a book." },
          { original: "Jullie drinken koffie.", translation: "You (plural) drink coffee." },
          { original: "De kinderen spelen buiten.", translation: "The children play outside." },
          { original: "Ik woon in Nederland.", translation: "I live in the Netherlands." },
          { original: "Het regent vandaag.", translation: "It rains today." },
          { original: "Wat doe je?", translation: "What are you doing?" },
          { original: "We eten brood.", translation: "We eat bread." }
        );
      }
    } else if (lang === "de") {
      if (topic === "Present Tense") {
        sentences.push(
          { original: "Ich gehe zum Markt.", translation: "I go to the market." },
          { original: "Er arbeitet in Berlin.", translation: "He works in Berlin." },
          { original: "Wir sprechen Deutsch.", translation: "We speak German." },
          { original: "Sie liest ein Buch.", translation: "She reads a book." },
          { original: "Ihr trinkt Kaffee.", translation: "You (plural) drink coffee." },
          { original: "Die Kinder spielen draußen.", translation: "The children play outside." },
          { original: "Ich wohne in Deutschland.", translation: "I live in Germany." },
          { original: "Es regnet heute.", translation: "It rains today." },
          { original: "Was machst du?", translation: "What are you doing?" },
          { original: "Wir essen Brot.", translation: "We eat bread." }
        );
      }
    } else if (lang === "it") {
      if (topic === "Present Tense") {
        sentences.push(
          { original: "Vado al mercato.", translation: "I go to the market." },
          { original: "Lui lavora a Roma.", translation: "He works in Rome." },
          { original: "Parliamo italiano.", translation: "We speak Italian." },
          { original: "Lei legge un libro.", translation: "She reads a book." },
          { original: "Voi bevete caffè.", translation: "You (plural) drink coffee." },
          { original: "I bambini giocano fuori.", translation: "The children play outside." },
          { original: "Abito in Italia.", translation: "I live in Italy." },
          { original: "Oggi piove.", translation: "Today it rains." },
          { original: "Cosa fai?", translation: "What are you doing?" },
          { original: "Mangiamo pane.", translation: "We eat bread." }
        );
      }
    } else if (lang === "sp") {
      if (topic === "Present Tense") {
        sentences.push(
          { original: "Voy al mercado.", translation: "I go to the market." },
          { original: "Él trabaja en Madrid.", translation: "He works in Madrid." },
          { original: "Hablamos español.", translation: "We speak Spanish." },
          { original: "Ella lee un libro.", translation: "She reads a book." },
          { original: "Vosotros bebéis café.", translation: "You (plural) drink coffee." },
          { original: "Los niños juegan afuera.", translation: "The children play outside." },
          { original: "Vivo en España.", translation: "I live in Spain." },
          { original: "Hoy llueve.", translation: "Today it rains." },
          { original: "¿Qué haces?", translation: "What are you doing?" },
          { original: "Comemos pan.", translation: "We eat bread." }
        );
      }
    }
    
    // Return at least 10 sentences, even if dummy ones
    while (sentences.length < 10) {
      sentences.push({ 
        original: `Example sentence ${sentences.length + 1} in ${languageName}.`, 
        translation: `English translation of example ${sentences.length + 1}.` 
      });
    }
    
    return sentences;
  }
  
  function getDummyBlankExercises(lang: string, topic: string) {
    // This would be populated with real data aligned with vocabulary
    const exercises = [];
    
    if (lang === "nl") {
      if (topic === "Present Tense") {
        exercises.push(
          { sentence: "Ik ___ naar huis.", answer: "ga", translation: "I go home." },
          { sentence: "Hij ___ een boek.", answer: "leest", translation: "He reads a book." },
          { sentence: "Wij ___ Nederlands.", answer: "spreken", translation: "We speak Dutch." },
          { sentence: "Zij ___ koffie.", answer: "drinkt", translation: "She drinks coffee." },
          { sentence: "Jullie ___ in Amsterdam.", answer: "wonen", translation: "You (plural) live in Amsterdam." }
        );
      }
    } else if (lang === "de") {
      if (topic === "Present Tense") {
        exercises.push(
          { sentence: "Ich ___ nach Hause.", answer: "gehe", translation: "I go home." },
          { sentence: "Er ___ ein Buch.", answer: "liest", translation: "He reads a book." },
          { sentence: "Wir ___ Deutsch.", answer: "sprechen", translation: "We speak German." },
          { sentence: "Sie ___ Kaffee.", answer: "trinkt", translation: "She drinks coffee." },
          { sentence: "Ihr ___ in Berlin.", answer: "wohnt", translation: "You (plural) live in Berlin." }
        );
      }
    }
    
    // Return at least 20 exercises, even if dummy ones
    while (exercises.length < 20) {
      exercises.push({ 
        sentence: `Fill in the blank exercise ${exercises.length + 1} in ${languageName}: ___.`, 
        answer: "answer", 
        translation: `English translation of exercise ${exercises.length + 1}.` 
      });
    }
    
    return exercises;
  }
  
  function getDummyTransliterationSentences(lang: string, topic: string) {
    // This would be populated with real data aligned with vocabulary
    const sentences = [];
    
    if (lang === "nl") {
      if (topic === "Present Tense") {
        sentences.push(
          { original: "Ik ga morgen naar de winkel.", transliteration: "I go tomorrow to the store." },
          { original: "Hij werkt elke dag in Amsterdam.", transliteration: "He works every day in Amsterdam." },
          { original: "Wij spreken graag Nederlands.", transliteration: "We speak gladly Dutch." }
        );
      }
    } else if (lang === "it") {
      if (topic === "Present Tense") {
        sentences.push(
          { original: "Ho detto alla mia mamma che non voglio mangiare.", transliteration: "I said to the my mom that don't I want to eat." },
          { original: "Vado al mercato ogni lunedì.", transliteration: "I go to the market every Monday." },
          { original: "Lei legge un libro interessante.", transliteration: "She reads a book interesting." }
        );
      }
    }
    
    // Return at least 20 sentences, even if dummy ones
    while (sentences.length < 20) {
      sentences.push({ 
        original: `Example sentence ${sentences.length + 1} in ${languageName}.`, 
        transliteration: `Word for word translation of example ${sentences.length + 1}.` 
      });
    }
    
    return sentences;
  }
  
  function getDummyGrammarExercises(lang: string, topic: string) {
    // This would be populated with real data based on the grammar topic
    const exercises = [];
    
    if (lang === "nl") {
      if (topic === "Present Perfect") {
        exercises.push(
          { sentence: "Ik heb vandaag een mooie film _____.", answer: "gezien", translation: "I've seen a beautiful movie today." },
          { sentence: "Jij hebt vandaag een mooie film _____.", answer: "gezien", translation: "You've seen a beautiful movie today." },
          { sentence: "Wij hebben _____ een mooie film gezien.", answer: "gisteren", translation: "We've seen a beautiful movie yesterday." },
          { sentence: "Hij heeft deze ochtend een _____ gezien.", answer: "film", translation: "He has seen a movie this morning." }
        );
      }
    }
    
    // Return at least 20 exercises, even if dummy ones
    while (exercises.length < 20) {
      exercises.push({ 
        sentence: `Grammar exercise ${exercises.length + 1} in ${languageName}: _____.`, 
        answer: "answer", 
        translation: `English translation of grammar exercise ${exercises.length + 1}.` 
      });
    }
    
    return exercises;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Grammar - Lesson {lessonNumber}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Topic: {grammarTopic}
        </h2>
      </div>

      {/* Example Sentences */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2">Example Sentences</h3>
        <div className="space-y-3">
          {exampleSentences.map((sentence, idx) => (
            <div key={idx} className="p-3 bg-white border rounded-lg">
              <p className="font-medium text-lg">{sentence.original}</p>
              <p className="text-gray-600 italic">{sentence.translation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fill in the Blank Exercises */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2">Fill in the Blank</h3>
        <p className="text-gray-600 mb-4">Hover over the blank to see the missing word.</p>
        <div className="space-y-4">
          {blankExercises.map((exercise, idx) => (
            <div key={idx} className="p-3 bg-white border rounded-lg">
              <p className="font-medium text-lg">
                {exercise.sentence.split('___').map((part, partIdx, arr) => (
                  <React.Fragment key={partIdx}>
                    {part}
                    {partIdx < arr.length - 1 && (
                      <span 
                        className="mx-1 px-4 py-1 bg-gray-200 rounded cursor-help"
                        onMouseEnter={() => setHoveredBlank(idx)}
                        onMouseLeave={() => setHoveredBlank(null)}
                      >
                        {hoveredBlank === idx ? exercise.answer : "___"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <p className="text-gray-600 italic mt-1">{exercise.translation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transliteration Sentences */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2">Word-for-Word Translations</h3>
        <div className="space-y-3">
          {transliterationSentences.map((sentence, idx) => (
            <div key={idx} className="p-3 bg-white border rounded-lg">
              <p className="font-medium text-lg">{sentence.original}</p>
              <p className="text-gray-600 italic">{sentence.transliteration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grammar-Specific Exercises */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2">{grammarTopic} Exercises</h3>
        <p className="text-gray-600 mb-4">Hover over the blank to see the missing word.</p>
        <div className="space-y-4">
          {grammarExercises.map((exercise, idx) => (
            <div key={idx} className="p-3 bg-white border rounded-lg">
              <p className="font-medium text-lg">
                {exercise.sentence.split('_____').map((part, partIdx, arr) => (
                  <React.Fragment key={partIdx}>
                    {part}
                    {partIdx < arr.length - 1 && (
                      <span 
                        className="mx-1 px-4 py-1 bg-gray-200 rounded cursor-help"
                        onMouseEnter={() => setHoveredBlank(idx + 100)} // Offset to avoid clash with first section
                        onMouseLeave={() => setHoveredBlank(null)}
                      >
                        {hoveredBlank === idx + 100 ? exercise.answer : "_____"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <p className="text-gray-600 italic mt-1">{exercise.translation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button 
          onClick={() => showPage(`vocab-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Vocabulary
        </button>
        <button 
          onClick={() => showPage(`reading-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Reading
        </button>
        <button 
          onClick={() => showPage(`writing-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Writing
        </button>
        <button 
          onClick={() => showPage(`test-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Test
        </button>
      </div>
    </div>
  );
};

export default GrammarComponent;
