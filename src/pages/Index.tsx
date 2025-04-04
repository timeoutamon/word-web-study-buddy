
import { useState } from "react";
import { Link } from "react-router-dom";
import MainPage from "@/components/MainPage";
import AboutPage from "@/components/AboutPage";
import HowItWorksPage from "@/components/HowItWorksPage";
import ContactPage from "@/components/ContactPage";
import LanguagePage from "@/components/LanguagePage";
import VocabularyPage from "@/components/VocabularyPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("main");
  const [lessonNumber, setLessonNumber] = useState(1);
  
  // Parse the current page from URL hash or use default
  useState(() => {
    const hash = window.location.hash.substring(1);
    if (hash) setCurrentPage(hash);
  });

  // Function to show different pages
  const showPage = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo(0, 0);
  };

  // Function to show vocabulary page
  const showVocabPage = (language: string, lesson: number) => {
    setCurrentPage(`vocab-${language}-${lesson}`);
    setLessonNumber(lesson);
    window.scrollTo(0, 0);
  };

  // Determine which page to render
  const renderPage = () => {
    if (currentPage === "main") {
      return <MainPage showPage={showPage} />;
    } else if (currentPage === "about") {
      return <AboutPage showPage={showPage} />;
    } else if (currentPage === "how") {
      return <HowItWorksPage showPage={showPage} />;
    } else if (currentPage === "contact") {
      return <ContactPage showPage={showPage} />;
    } else if (currentPage === "nl" || currentPage === "it" || currentPage === "sp" || currentPage === "de") {
      return (
        <LanguagePage 
          language={currentPage}
          showPage={showPage}
          showVocabPage={showVocabPage}
        />
      );
    } else if (currentPage.startsWith("vocab-")) {
      const [, language, lesson] = currentPage.split("-");
      return (
        <VocabularyPage 
          language={language}
          lessonNumber={parseInt(lesson)}
          showPage={showPage}
        />
      );
    }
    
    return <MainPage showPage={showPage} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Top Bar with Spider Web and Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-black text-white px-5 py-3 border-b-3 border-black flex justify-center items-center z-50">
        <div 
          className="absolute left-5 text-2xl cursor-pointer" 
          onClick={() => showPage("main")}
        >
          🕸️
        </div>
        <div className="flex gap-5">
          <Link 
            to="#about" 
            className="text-white no-underline uppercase text-base hover:underline"
            onClick={() => showPage("about")}
          >
            About Us
          </Link>
          <Link 
            to="#how" 
            className="text-white no-underline uppercase text-base hover:underline"
            onClick={() => showPage("how")}
          >
            How It Works
          </Link>
          <Link 
            to="#contact" 
            className="text-white no-underline uppercase text-base hover:underline"
            onClick={() => showPage("contact")}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pt-16">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white p-5 text-center">
        <p>Connect with us:</p>
        <div className="my-2">
          <a href="https://www.instagram.com/whereskevan/" target="_blank" className="text-white mx-2 no-underline text-lg">IG</a> | 
          <a href="https://www.linkedin.com/in/kevan-hudson-467735bb/" target="_blank" className="text-white mx-2 no-underline text-lg">LinkedIn</a> | 
          <a href="https://x.com/whereskevan" target="_blank" className="text-white mx-2 no-underline text-lg">Twitter</a>
        </div>
        <p>© 2025 WORD WIDE WEB Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
