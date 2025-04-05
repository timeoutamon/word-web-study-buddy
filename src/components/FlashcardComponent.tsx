
import React, { useState, useEffect } from "react";
import { LANGUAGES } from "@/lib/constants";

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
    // This would normally fetch from a database or API
    // For now we'll use dummy data for demonstration
    const vocabularyData = getVocabularyForLesson(language, lessonNumber);
    setCards(vocabularyData);
    setOriginalCards(vocabularyData);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, [language, lessonNumber]);

  const getVocabularyForLesson = (lang: string, lesson: number) => {
    // This is where you would implement your actual vocabulary data
    // Using the wordlist sections you provided
    const dummyVocabulary = getDummyVocabularyForLanguage(lang, lesson);
    return dummyVocabulary;
  };

  const getDummyVocabularyForLanguage = (lang: string, lesson: number) => {
    // Section 1 vocabulary for demonstration purposes
    const section1Vocabulary = [
      {
        english: "the",
        translation: lang === "nl" ? "de/het" : lang === "de" ? "der/die/das" : lang === "it" ? "il/la/lo" : "el/la",
        type: "article",
        etymology: lang === "nl" 
          ? "Dutch has two articles ('de' for common gender and 'het' for neuter). Similar to English 'the' with Germanic roots."
          : lang === "de"
          ? "German uses three definite articles based on gender. From Proto-Germanic *sa (that one), related to English 'the'."
          : lang === "it" 
          ? "Italian articles change based on gender and first letter of noun. From Latin 'ille/illa' (that)."
          : "Spanish articles change with gender. From Latin 'ille/illa' (that), same origin as English 'the'."
      },
      {
        english: "be",
        translation: lang === "nl" ? "zijn" : lang === "de" ? "sein" : lang === "it" ? "essere" : "ser/estar",
        type: "verb",
        etymology: lang === "nl" 
          ? "WWW: 'Be/been' in English and 'zijn' both descend from Proto-Indo-European *h₁es- (to be). Related to English 'is'."
          : lang === "de"
          ? "WWW: 'Sein' and English 'be' both come from PIE *h₁es-, through different stems. Related to English 'is'."
          : lang === "it" 
          ? "WWW: 'Essere' comes from Latin 'esse' (to be), which derives from the same PIE root *h₁es- as English 'is'."
          : "WWW: Spanish has two verbs for 'be'. 'Ser' (permanent) from Latin 'esse' and 'estar' (temporary) from Latin 'stare' (to stand)."
      },
      {
        english: "to",
        translation: lang === "nl" ? "naar/om te" : lang === "de" ? "zu/nach" : lang === "it" ? "a/per" : "a/para",
        type: "preposition",
        etymology: lang === "nl" 
          ? "WWW: 'Naar' shares common Germanic origins with English 'near' for direction. 'Om te' for infinitive purpose."
          : lang === "de"
          ? "WWW: 'Zu' relates to English 'to' through Proto-Germanic *tō. Both indicate direction or purpose."
          : lang === "it" 
          ? "WWW: 'A' comes from Latin 'ad' (to, toward). 'Per' from Latin 'per' (through, by means of)."
          : "WWW: 'A' from Latin 'ad' (to, toward). 'Para' developed from Latin 'per ad' (for/toward)."
      },
      {
        english: "of",
        translation: lang === "nl" ? "van" : lang === "de" ? "von" : lang === "it" ? "di" : "de",
        type: "preposition",
        etymology: lang === "nl" 
          ? "WWW: 'Van' and English 'from' share Germanic roots. Both indicate source or possession."
          : lang === "de"
          ? "WWW: 'Von' and 'of' both evolved from Proto-Germanic *af (away, off), showing the connection."
          : lang === "it" 
          ? "WWW: 'Di' comes from Latin 'de' (from, concerning). Related to Old English 'of' through general possessive function."
          : "WWW: Spanish 'de' comes directly from Latin 'de' (from, concerning), serving the same function as English 'of'."
      },
      {
        english: "and",
        translation: lang === "nl" ? "en" : lang === "de" ? "und" : lang === "it" ? "e" : "y/e",
        type: "conjunction",
        etymology: lang === "nl" 
          ? "WWW: 'En' evolved from Proto-Germanic *andi, related to English 'and' from the same root."
          : lang === "de"
          ? "WWW: 'Und' and 'and' both derive from Proto-Germanic *andi, showing their common ancestry."
          : lang === "it" 
          ? "WWW: 'E' comes from Latin 'et'. Though not directly related to 'and', both serve as basic conjunctions in Indo-European languages."
          : "WWW: 'Y' (changes to 'e' before words starting with 'i-' sound) from Latin 'et'. Not directly related to 'and' but serves the same function."
      }
    ];
    
    // This would be replaced with actual data from your 50 sets of vocabulary
    // For now returning the same data for demonstration
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

      <div className="flex justify-center mt-8">
        <button 
          onClick={() => showPage(`grammar-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg mx-2 hover:bg-gray-800 transition"
        >
          Grammar
        </button>
        <button 
          onClick={() => showPage(`reading-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg mx-2 hover:bg-gray-800 transition"
        >
          Reading
        </button>
        <button 
          onClick={() => showPage(`writing-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg mx-2 hover:bg-gray-800 transition"
        >
          Writing
        </button>
        <button 
          onClick={() => showPage(`test-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg mx-2 hover:bg-gray-800 transition"
        >
          Test
        </button>
      </div>
    </div>
  );
};

export default FlashcardComponent;
