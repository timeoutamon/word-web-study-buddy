
import React from "react";

interface MainPageProps {
  showPage: (pageId: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ showPage }) => {
  return (
    <div>
      {/* Header with Logo */}
      <header className="bg-white p-5 border-dashed-black text-center">
        <div className="text-4xl font-bold tracking-tighter">WORD WIDE WEB</div>
      </header>
      
      {/* Mission Section */}
      <section className="p-10 border-dashed-black bg-white">
        <h2 className="text-3xl mb-5 underline">For Studious Language Learners</h2>
        <p>Grab a pen and notebook. Seriously---you'll need it</p>
      </section>
      
      {/* Approach Section */}
      <section className="p-10 border-dashed-black bg-white">
        <h2 className="text-2xl mb-5">Old Fashioned Methods With a Modern Approach</h2>
        <p>We use etymology, memory tools, and word frequency to connect new words with words you already know. Once you finish your free course we hope you'll be able to see the Word Wide Web.</p>
      </section>
      
      {/* Language Buttons Section */}
      <section className="p-10 border-dashed-black">
        <div className="text-center mb-3 font-bold text-lg">Click a language to get started</div>
        <div className="flex justify-between mt-3">
          <a href="#nl" className="language-btn" onClick={() => showPage('nl')}>NL</a>
          <a href="#it" className="language-btn" onClick={() => showPage('it')}>IT</a>
          <a href="#sp" className="language-btn" onClick={() => showPage('sp')}>SP</a>
          <a href="#de" className="language-btn" onClick={() => showPage('de')}>DE</a>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
