
import React from "react";

interface MainPageProps {
  showPage: (pageId: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ showPage }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Logo */}
      <header className="bg-white p-5 border-b border-dashed border-black text-center">
        <div className="text-4xl font-bold tracking-tighter">WORD WIDE WEB</div>
      </header>
      
      {/* Mission Section */}
      <section className="p-8 border-b border-dashed border-black bg-white">
        <h2 className="text-3xl mb-5 font-bold underline">For Studious Language Learners</h2>
        <p className="text-lg">Grab a pen and notebook. Seriously—you'll need it</p>
      </section>
      
      {/* Approach Section */}
      <section className="p-8 border-b border-dashed border-black bg-white">
        <h2 className="text-2xl mb-5 font-semibold">Old Fashioned Methods With a Modern Approach</h2>
        <p className="text-lg leading-relaxed">
          We use etymology, memory tools, and word frequency to connect new words with words you already know. 
          Once you finish your free course we hope you'll be able to see the Word Wide Web.
        </p>
      </section>
      
      {/* Language Buttons Section - Updated for better visibility */}
      <section className="p-8 border-b border-dashed border-black">
        <div className="text-center mb-5 font-bold text-xl">Choose a language to get started</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">
          <button 
            className="bg-black text-white py-3 px-4 border-2 border-black rounded-lg shadow-md hover:bg-white hover:text-black transition-colors font-bold text-xl" 
            onClick={() => showPage('nl')}
          >
            Dutch (NL)
          </button>
          <button 
            className="bg-black text-white py-3 px-4 border-2 border-black rounded-lg shadow-md hover:bg-white hover:text-black transition-colors font-bold text-xl" 
            onClick={() => showPage('it')}
          >
            Italian (IT)
          </button>
          <button 
            className="bg-black text-white py-3 px-4 border-2 border-black rounded-lg shadow-md hover:bg-white hover:text-black transition-colors font-bold text-xl" 
            onClick={() => showPage('sp')}
          >
            Spanish (SP)
          </button>
          <button 
            className="bg-black text-white py-3 px-4 border-2 border-black rounded-lg shadow-md hover:bg-white hover:text-black transition-colors font-bold text-xl" 
            onClick={() => showPage('de')}
          >
            German (DE)
          </button>
        </div>
      </section>
      
      {/* How It Works Section - Emphasizing paper & pen */}
      <section className="p-8 border-b border-dashed border-black bg-white">
        <h2 className="text-2xl mb-5 font-semibold">How Our Method Works</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li className="text-lg"><strong className="text-xl underline">Paper & pen are essential</strong> - write everything down to commit it to memory</li>
          <li className="text-lg">Learn high-frequency words first with our carefully curated vocabulary lists</li>
          <li className="text-lg">Understand word connections through etymology and memory aids</li>
          <li className="text-lg">Practice with structured grammar lessons and immersive reading</li>
          <li className="text-lg">Test your knowledge with interactive exercises, but <strong>always write answers in your notebook</strong></li>
          <li className="text-lg">Progress through 50 carefully structured lessons with <strong>50 unique words per lesson</strong> to reach B2 proficiency</li>
        </ul>
      </section>
    </div>
  );
};

export default MainPage;
