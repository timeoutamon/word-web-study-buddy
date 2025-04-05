
import React, { useState, useEffect } from "react";
import { LANGUAGES, VOCABULARY_SECTIONS, TRANSLATIONS } from "@/lib/constants";

interface TestComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const TestComponent: React.FC<TestComponentProps> = ({ language, lessonNumber, showPage }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [originalCards, setOriginalCards] = useState<any[]>([]);
  const [notepadContent, setNotepadContent] = useState<string>("");
  
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;

  useEffect(() => {
    // Get vocabulary data for this lesson
    const vocabularyData = getVocabularyForLesson(language, lessonNumber);
    setCards(vocabularyData);
    setOriginalCards(vocabularyData);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, [language, lessonNumber]);
  
  const getVocabularyForLesson = (lang: string, lesson: number) => {
    // Get the base vocabulary for this lesson
    const baseVocabulary = VOCABULARY_SECTIONS[lesson as keyof typeof VOCABULARY_SECTIONS] || [];
    
    // Get translations for this language and lesson
    // Fix TypeScript error by adding type assertions
    const translations = (TRANSLATIONS as any)[lang]?.[lesson] || {};
    
    // Create the vocabulary cards with translations
    return baseVocabulary.map(item => {
      return {
        english: item.english,
        translation: translations[item.english] || `[${item.english} in ${lang}]`,
        type: item.type
      };
    });
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleShuffle = () => {
    setShuffleEnabled(!shuffleEnabled);
    
    if (!shuffleEnabled) {
      // Enable shuffle: shuffle the cards
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    } else {
      // Disable shuffle: restore original order
      setCards([...originalCards]);
      setCurrentCardIndex(0);
    }
    setShowAnswer(false);
  };

  if (cards.length === 0) {
    return <div className="text-center p-10">Loading test data...</div>;
  }

  const currentCard = cards[currentCardIndex];
  
  // Get example sentences for the current word
  const getExampleSentences = (word: string, type: string) => {
    // This is a placeholder - in a real implementation you would have a database of example sentences
    const basicExamples = {
      "verb": [
        `I will ${word} tomorrow.`,
        `She doesn't ${word} very often.`,
        `They ${word} every day.`
      ],
      "noun": [
        `The ${word} is very important.`,
        `I don't have a ${word}.`,
        `There are many ${word}s in the room.`
      ],
      "adjective": [
        `That's a very ${word} person.`,
        `The ${word} book is on the table.`,
        `I feel ${word} today.`
      ],
      "adverb": [
        `She speaks ${word}.`,
        `He ${word} finished the race.`,
        `They ${word} understand the concept.`
      ],
      "preposition": [
        `The book is ${word} the table.`,
        `I'm going ${word} the store.`,
        `She stood ${word} me.`
      ],
      "pronoun": [
        `${word.charAt(0).toUpperCase() + word.slice(1)} is going to the party.`,
        `I gave it to ${word}.`,
        `${word.charAt(0).toUpperCase() + word.slice(1)} are my friends.`
      ],
      "conjunction": [
        `I wanted to go, ${word} it was too late.`,
        `Run fast ${word} you'll miss the bus.`,
        `She likes tea ${word} coffee.`
      ],
      "article": [
        `${word.charAt(0).toUpperCase() + word.slice(1)} book is on the table.`,
        `I saw ${word} cat in the garden.`,
        `${word.charAt(0).toUpperCase() + word.slice(1)} apples are fresh.`
      ]
    };
    
    // Determine which example set to use based on the word type
    let wordType = type.split('/')[0].toLowerCase();
    if (!basicExamples[wordType as keyof typeof basicExamples]) {
      wordType = "noun"; // Default to noun if type is not recognized
    }
    
    return basicExamples[wordType as keyof typeof basicExamples];
  };

  const examples = getExampleSentences(currentCard.english, currentCard.type);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Test - Lesson {lessonNumber}
        </h1>
        <p className="text-gray-600">
          Test your knowledge of the vocabulary from this lesson. Write all answers in your notebook.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flashcard Test */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <div className="text-center mb-4">
            <p className="text-gray-600">Card {currentCardIndex + 1} of {cards.length}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 min-h-[220px] flex flex-col justify-between">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">{currentCard.type}</div>
              <div className="text-3xl font-bold mb-6">{currentCard.english}</div>
              
              {showAnswer ? (
                <div className="mt-4 text-3xl font-bold text-blue-600">{currentCard.translation}</div>
              ) : (
                <button 
                  onClick={toggleAnswer} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Show Answer
                </button>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-3">
                <button 
                  onClick={prevCard} 
                  disabled={currentCardIndex === 0}
                  className={`p-2 border border-gray-300 rounded w-10 h-10 flex items-center justify-center ${
                    currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  ←
                </button>
                <button 
                  onClick={nextCard} 
                  disabled={currentCardIndex === cards.length - 1}
                  className={`p-2 border border-gray-300 rounded w-10 h-10 flex items-center justify-center ${
                    currentCardIndex === cards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  →
                </button>
              </div>
              
              <button 
                onClick={toggleShuffle} 
                className={`p-2 border border-gray-300 rounded w-10 h-10 flex items-center justify-center ${
                  shuffleEnabled ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-100'
                }`}
                title={shuffleEnabled ? "Disable shuffle" : "Enable shuffle"}
              >
                🔀
              </button>
            </div>
          </div>
          
          {/* Example Sentences */}
          <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-2">Example Sentences:</h3>
            <ul className="space-y-2 text-gray-700">
              {examples.map((example, index) => (
                <li key={index}>- {example}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Answer Notepad and Test Instructions */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Your Answers</h2>
            <p className="mb-4 text-sm text-gray-600">
              Type your answers here temporarily or write them in your notebook (recommended).
            </p>
            <textarea
              value={notepadContent}
              onChange={(e) => setNotepadContent(e.target.value)}
              placeholder="Type your answers here..."
              className="w-full h-[170px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            ></textarea>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Test Instructions</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Look at the English word and try to recall the {languageName} translation.</li>
              <li>Write your answer in your notebook before checking.</li>
              <li>Try to use the word in a sentence similar to the examples.</li>
              <li>Click "Show Answer" only after writing your response.</li>
              <li>Review any words you missed at the end of your session.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Additional Test Types */}
      <div className="mt-8 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Additional Test Exercises</h2>
        <p className="mb-4 text-sm text-gray-600">
          Complete these additional exercises in your notebook for more practice:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">1. Translation Practice</h3>
            <p className="mb-2">Translate the following sentences to {languageName}:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>I went to the store yesterday.</li>
              <li>She likes to read books in the evening.</li>
              <li>We will visit our friends next weekend.</li>
              <li>The children are playing in the park.</li>
              <li>Can you help me with this exercise?</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">2. Fill in the Blanks</h3>
            <p className="mb-2">Use words from this lesson to complete these sentences:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>I _____ to go to the movies tonight.</li>
              <li>She _____ the book on the table.</li>
              <li>They live in a _____ house near the river.</li>
              <li>We _____ seen that movie before.</li>
              <li>The weather is very _____ today.</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">3. Word Association</h3>
            <p className="mb-2">Write at least 3 related words or phrases for each of these words:</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {cards.slice(0, 5).map((card, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded text-center">{card.english}</div>
              ))}
            </div>
          </div>
        </div>
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

export default TestComponent;
