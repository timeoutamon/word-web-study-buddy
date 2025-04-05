
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainPage from "@/components/MainPage";
import AboutPage from "@/components/AboutPage";
import HowItWorksPage from "@/components/HowItWorksPage";
import ContactPage from "@/components/ContactPage";
import LanguagePage from "@/components/LanguagePage";
import FlashcardComponent from "@/components/FlashcardComponent";
import GrammarComponent from "@/components/GrammarComponent";
import ReadingComponent from "@/components/ReadingComponent";
import WritingComponent from "@/components/WritingComponent";
import TestComponent from "@/components/TestComponent";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("main");
  const [lessonNumber, setLessonNumber] = useState(1);
  const [language, setLanguage] = useState("");
  
  // Parse the current page from URL hash or use default
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setCurrentPage(hash);
      
      // Parse language and lesson number from hash if available
      if (hash.startsWith("vocab-") || hash.startsWith("grammar-") || 
          hash.startsWith("reading-") || hash.startsWith("writing-") || 
          hash.startsWith("test-")) {
        
        const parts = hash.split("-");
        if (parts.length >= 3) {
          setLanguage(parts[1]);
          setLessonNumber(parseInt(parts[2], 10));
        }
      } else if (["nl", "it", "sp", "de"].includes(hash)) {
        setLanguage(hash);
      }
    }
  }, []);

  // Function to show different pages
  const showPage = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo(0, 0);
    
    // Parse language and lesson from pageId if applicable
    if (pageId.startsWith("vocab-") || pageId.startsWith("grammar-") || 
        pageId.startsWith("reading-") || pageId.startsWith("writing-") || 
        pageId.startsWith("test-")) {
      
      const parts = pageId.split("-");
      if (parts.length >= 3) {
        setLanguage(parts[1]);
        setLessonNumber(parseInt(parts[2], 10));
      }
    } else if (["nl", "it", "sp", "de"].includes(pageId)) {
      setLanguage(pageId);
    }
  };

  // Function to show vocabulary page
  const showVocabPage = (language: string, lesson: number) => {
    setCurrentPage(`vocab-${language}-${lesson}`);
    setLessonNumber(lesson);
    setLanguage(language);
    window.location.hash = `vocab-${language}-${lesson}`;
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
      const [, pageLang, pageLesson] = currentPage.split("-");
      return (
        <FlashcardComponent 
          language={pageLang}
          lessonNumber={parseInt(pageLesson)}
          showPage={showPage}
        />
      );
    } else if (currentPage.startsWith("grammar-")) {
      const [, pageLang, pageLesson] = currentPage.split("-");
      return (
        <GrammarComponent 
          language={pageLang}
          lessonNumber={parseInt(pageLesson)}
          showPage={showPage}
        />
      );
    } else if (currentPage.startsWith("reading-")) {
      const [, pageLang, pageLesson] = currentPage.split("-");
      return (
        <ReadingComponent 
          language={pageLang}
          lessonNumber={parseInt(pageLesson)}
          showPage={showPage}
        />
      );
    } else if (currentPage.startsWith("writing-")) {
      const [, pageLang, pageLesson] = currentPage.split("-");
      return (
        <WritingComponent 
          language={pageLang}
          lessonNumber={parseInt(pageLesson)}
          showPage={showPage}
        />
      );
    } else if (currentPage.startsWith("test-")) {
      const [, pageLang, pageLesson] = currentPage.split("-");
      return (
        <TestComponent 
          language={pageLang}
          lessonNumber={parseInt(pageLesson)}
          showPage={showPage}
        />
      );
    }
    
    return <MainPage showPage={showPage} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
