
import React, { useState } from "react";
import { LANGUAGES } from "@/lib/constants";

interface VocabularyPageProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const VocabularyPage: React.FC<VocabularyPageProps> = ({ 
  language, 
  lessonNumber, 
  showPage 
}) => {
  const languageInfo = LANGUAGES[language as keyof typeof LANGUAGES];
  const [noteColor, setNoteColor] = useState("black");
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  
  const changeTextColor = (color: string) => {
    setNoteColor(color);
  };
  
  const toggleShuffle = () => {
    setIsShuffleActive(!isShuffleActive);
    alert('Shuffle functionality would be implemented here');
  };
  
  return (
    <div>
      <header className="bg-white p-5 border-dashed-black text-center">
        <div className="text-4xl font-bold tracking-tighter">
          {languageInfo.name.toUpperCase()} VOCABULARY - LESSON {lessonNumber}
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row min-h-[60vh] p-5">
        {/* Flashcard container */}
        <div className="w-full md:w-7/12 flex flex-col items-center justify-center mb-8 md:mb-0">
          <div className="w-full max-w-md h-64 border-3 border-black flex items-center justify-center text-2xl relative mb-5">
            <div className="absolute top-2 left-2 text-base">Card 1/50</div>
            {languageInfo.name} vocabulary content for lesson {lessonNumber}
          </div>
          
          <button 
            className={`text-2xl bg-white border-2 border-black py-1 px-4 cursor-pointer ${isShuffleActive ? 'bg-black text-white' : ''}`}
            onClick={toggleShuffle}
          >
            🔀 Shuffle
          </button>
        </div>
        
        {/* Notepad container */}
        <div className="w-full md:w-5/12 p-5 md:border-l-3 md:border-l-dashed md:border-black">
          <h3 className="mb-2">Your Notes</h3>
          <div className="flex gap-3 mb-3">
            <div 
              className={`w-6 h-6 border-2 border-black cursor-pointer ${noteColor === 'black' ? 'shadow-md border-gray-500' : ''}`}
              style={{ backgroundColor: 'black' }}
              onClick={() => changeTextColor('black')}
            ></div>
            <div 
              className={`w-6 h-6 border-2 border-black cursor-pointer ${noteColor === 'red' ? 'shadow-md border-gray-500' : ''}`}
              style={{ backgroundColor: 'red' }}
              onClick={() => changeTextColor('red')}
            ></div>
            <div 
              className={`w-6 h-6 border-2 border-black cursor-pointer ${noteColor === 'blue' ? 'shadow-md border-gray-500' : ''}`}
              style={{ backgroundColor: 'blue' }}
              onClick={() => changeTextColor('blue')}
            ></div>
          </div>
          
          <textarea 
            className="w-full h-72 border-2 border-black p-3 font-mono resize-none"
            style={{ color: noteColor }}
            defaultValue="Every time you see a new word, write it out 10 times in the target language and vocalize the word as you say it. Once you're comfortable with these words move on to the grammar tab from the previous page. If you need to temporarily take notes online, type them here."
          ></textarea>
          <p className="text-sm mt-2">Notes are temporary and will be lost when you leave this page</p>
        </div>
      </div>
      
      <div className="flex justify-center gap-5 p-5">
        <a 
          href="#" 
          onClick={() => showPage(language)} 
          className="language-btn"
        >
          Back to Lessons
        </a>
        <a 
          href="https://paypal.me/YOURUSERNAME" 
          target="_blank" 
          className="language-btn"
        >
          Buy Me a Coffee
        </a>
      </div>
    </div>
  );
};

export default VocabularyPage;
