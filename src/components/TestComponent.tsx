
import React, { useState, useEffect } from "react";
import { LANGUAGES } from "@/lib/constants";

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
    // This would normally fetch from a database or API
    // For now we'll use dummy data for demonstration
    const vocabularyData = getVocabularyForLesson(language, lessonNumber);
    setCards(vocabularyData);
    setOriginalCards(vocabularyData);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, [language, lessonNumber]);
  
  // Same vocabulary getter function as in FlashcardComponent
  const getVocabularyForLesson = (lang: string, lesson: number) => {
    // This is where you would implement your actual vocabulary data
    // Using the wordlist sections you provided
    const dummyVocabulary = getDummyVocabularyForLanguage(lang, lesson);
    return dummyVocabulary;
  };
  
  const getDummyVocabularyForLanguage = (lang: string, lesson: number) => {
    // For demonstration purposes - this would be replaced with actual vocabulary
    const section1Vocabulary = [
      {
        english: "the",
        translation: lang === "nl" ? "de/het" : lang === "de" ? "der/die/das" : lang === "it" ? "il/la/lo" : "el/la",
        type: "article"
      },
      {
        english: "be",
        translation: lang === "nl" ? "zijn" : lang === "de" ? "sein" : lang === "it" ? "essere" : "ser/estar",
        type: "verb"
      },
      {
        english: "to",
        translation: lang === "nl" ? "naar/om te" : lang === "de" ? "zu/nach" : lang === "it" ? "a/per" : "a/para",
        type: "preposition"
      },
      {
        english: "of",
        translation: lang === "nl" ? "van" : lang === "de" ? "von" : lang === "it" ? "di" : "de",
        type: "preposition"
      },
      {
        english: "and",
        translation: lang === "nl" ? "en" : lang === "de" ? "und" : lang === "it" ? "e" : "y/e",
        type: "conjunction"
      }
    ];
    
    // This would be replaced with actual data from your 50 sets of vocabulary
    // For now returning simplified data for demonstration
    return section1Vocabulary;
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

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Test - Lesson {lessonNumber}
        </h1>
        <p className="text-gray-600">
          Test your knowledge of the vocabulary from this lesson.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flashcard Test */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <div className="text-center mb-4">
            <p className="text-gray-600">Card {currentCardIndex + 1} of {cards.length}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 min-h-[200px] flex flex-col justify-between">
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
        </div>

        {/* Answer Notepad */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Answers</h2>
          <p className="mb-4 text-sm text-gray-600">
            Type your answers here temporarily or write them in your notebook.
          </p>
          <textarea
            value={notepadContent}
            onChange={(e) => setNotepadContent(e.target.value)}
            placeholder="Type your answers here..."
            className="w-full h-[250px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          ></textarea>
        </div>
      </div>

      {/* Test Instructions */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">Test Instructions</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Look at the English word and try to recall the {languageName} translation.</li>
          <li>Write your answer in the notepad or in your notebook.</li>
          <li>Click "Show Answer" to check if you were correct.</li>
          <li>Use the arrow buttons to navigate between cards.</li>
          <li>Use the shuffle button for randomized practice.</li>
        </ol>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button 
          onClick={() => showPage(`vocab-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Vocabulary
        </button>
        <button 
          onClick={() => showPage(`grammar-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Grammar
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
      </div>
    </div>
  );
};

export default TestComponent;
