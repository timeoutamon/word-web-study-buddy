
import React, { useState, useEffect } from "react";
import { LANGUAGES, VOCABULARY_SECTIONS, TRANSLATIONS, ETYMOLOGY } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface FlashcardProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({ language, lessonNumber, showPage }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [originalCards, setOriginalCards] = useState<any[]>([]);

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
    
    // Get etymology data for this language and lesson
    // Fix TypeScript error by adding type assertions
    const etymologyData = (ETYMOLOGY as any)[lang]?.[lesson] || {};
    
    // Create the vocabulary cards with translations and etymology
    return baseVocabulary.map(item => {
      return {
        english: item.english,
        translation: translations[item.english] || `[${item.english} in ${lang}]`,
        type: item.type,
        etymology: etymologyData[item.english] || `Etymology connection between ${item.english} and its ${lang} translation.`
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
    return <div className="text-center p-10">Loading vocabulary...</div>;
  }

  const currentCard = cards[currentCardIndex];
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {languageName} Vocabulary - Lesson {lessonNumber}
        </h2>
        <p className="text-gray-600">Card {currentCardIndex + 1} of {cards.length}</p>
      </div>

      <div className="bg-white border-2 border-black rounded-lg p-8 shadow-lg min-h-[300px] flex flex-col justify-between">
        <div className="text-center mb-4">
          <div className="text-lg text-gray-600 mb-2">{currentCard.type}</div>
          <div className="text-3xl font-bold mb-6">{currentCard.english}</div>
          
          {showAnswer ? (
            <div className="mt-4">
              <div className="text-3xl font-bold text-blue-600 mb-4">{currentCard.translation}</div>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-2">Etymology & Memory Aid:</h3>
                <p className="text-gray-700">{currentCard.etymology}</p>
              </div>
            </div>
          ) : (
            <button 
              onClick={toggleAnswer} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Show Answer
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
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

      {/* Back to Lesson button - Updated for better visibility */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => showPage(language)} 
          className="bg-black text-white py-3 px-6 border-2 border-black rounded-lg shadow-md hover:bg-white hover:text-black transition-colors font-bold text-xl"
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
};

export default FlashcardComponent;
