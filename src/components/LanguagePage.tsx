
import React from "react";
import { LANGUAGES, LESSONS_PER_LANGUAGE } from "@/lib/constants";

interface LanguagePageProps {
  language: string;
  showPage: (pageId: string) => void;
  showVocabPage: (language: string, lesson: number) => void;
}

const LanguagePage: React.FC<LanguagePageProps> = ({ 
  language, 
  showPage, 
  showVocabPage 
}) => {
  const languageInfo = LANGUAGES[language as keyof typeof LANGUAGES];
  
  // Generate lessons list
  const renderLessons = () => {
    const lessons = [];
    
    for (let i = 1; i <= LESSONS_PER_LANGUAGE; i++) {
      lessons.push(
        <div key={i} className="flex items-center mb-4 pb-4 border-b border-dashed border-black">
          <div className="text-2xl font-bold w-12">{i}</div>
          <div className="flex flex-grow justify-between">
            <a 
              href={`#vocab-${language}-${i}`} 
              className="lesson-btn"
              onClick={(e) => {
                e.preventDefault();
                showVocabPage(language, i);
              }}
            >
              Vocabulary
            </a>
            <a 
              href="#" 
              className="lesson-btn"
              onClick={(e) => {
                e.preventDefault();
                alert(`Grammar for lesson ${i} in ${languageInfo.name} would open here`);
              }}
            >
              Grammar
            </a>
            <a 
              href="#" 
              className="lesson-btn"
              onClick={(e) => {
                e.preventDefault();
                alert(`Reading for lesson ${i} in ${languageInfo.name} would open here`);
              }}
            >
              Reading
            </a>
            <a 
              href="#" 
              className="lesson-btn"
              onClick={(e) => {
                e.preventDefault();
                alert(`Writing for lesson ${i} in ${languageInfo.name} would open here`);
              }}
            >
              Writing
            </a>
            <a 
              href="#" 
              className="lesson-btn"
              onClick={(e) => {
                e.preventDefault();
                alert(`Test for lesson ${i} in ${languageInfo.name} would open here`);
              }}
            >
              Test
            </a>
          </div>
        </div>
      );
    }
    
    return lessons;
  };
  
  return (
    <div>
      <header className="bg-white p-5 border-dashed-black text-center">
        <div className="text-4xl font-bold tracking-tighter">WORD WIDE WEB</div>
      </header>
      
      <section className="p-10">
        <h1 className="text-3xl text-center mb-2">Learn {languageInfo.name}</h1>
        <p className="text-center mb-8 text-lg">Remember to track your own progress</p>
        
        <h2 className="text-2xl text-center mb-5 underline">Lessons</h2>
        
        <div className="w-full max-w-4xl mx-auto">
          {renderLessons()}
        </div>
        
        <div className="flex justify-center gap-5 mt-8">
          <a href="#" onClick={() => showPage('main')} className="language-btn">Home Page</a>
          <a href="https://paypal.me/YOURUSERNAME" target="_blank" className="language-btn">Buy Me a Coffee</a>
        </div>
      </section>
    </div>
  );
};

export default LanguagePage;
