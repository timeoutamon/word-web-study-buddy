
import React from "react";

interface HowItWorksPageProps {
  showPage: (pageId: string) => void;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ showPage }) => {
  return (
    <div>
      <header className="bg-white p-5 border-dashed-black text-center">
        <div className="text-4xl font-bold tracking-tighter">HOW IT WORKS</div>
      </header>
      
      <section className="p-10">
        <p className="mb-4">Paper & pen to start.</p>
        <p className="mb-4">Select the language you want to learn and pick the lesson you want to complete. We suggest starting from one and working your way up to the final lesson. Keep track of your progress in your notebook. You can learn new vocabulary, practice reading, learn grammar, practice typing, and be tested on the words you've learned for each section. Each section has 50 words that you'll be working with.</p>
        <p className="mb-4">This is designed for beginners who want to get to an intermediate level in the provided languages; from there, you'll be able to learn on your own. This is a study tool. It will take effort on your part. And it's that effort that will help you progress further. Learning languages isn't easy. It's work.</p>
        <p className="mb-8">Using this etymology-based approach, we hope that you can speed up your learning journey. All you have to be is studious.</p>
        
        <div className="flex justify-center gap-5">
          <a href="#" onClick={() => showPage('main')} className="language-btn">Home Page</a>
          <a href="https://paypal.me/YOURUSERNAME" target="_blank" className="language-btn">Buy Me a Coffee</a>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
