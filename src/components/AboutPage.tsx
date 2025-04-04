
import React from "react";

interface AboutPageProps {
  showPage: (pageId: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ showPage }) => {
  return (
    <div>
      <header className="bg-white p-5 border-dashed-black text-center">
        <div className="text-4xl font-bold tracking-tighter">ABOUT WWW</div>
      </header>
      
      <section className="p-10">
        <p className="mb-4">Hi. I'm Kevan, a wannabe polyglot speaking English, Dutch, ASL, Italian & Albanian at different levels. I made this site to help language learners like myself.</p>
        <p className="mb-4">I realized nothing can replace the old-fashioned methods of using pen & paper to learn a language. The gamification of language learning helps, but etymology-based memory tools aren't being used much these days. This site cannot replace interacting with a native, and alone with this site, you will not become fluent. But if you are studious, I predict it will give you a head start.</p>
        <p className="mb-4">I'm creating a website that I wish I would have had when I first learned my second language at age 18. The site is designed to be minimalistic. We don't need bright colors or engaging visuals to learn a language or engaging visuals. All you need is your laptop/mobile device, a dedicated notebook, and a writing utensil. Good luck on your language learning adventure!</p>
        <p className="mb-8">I'm not a web developer. I'm a copywriter. But I tried my best to make this. Be kind with your feedback.</p>
        
        <div className="flex justify-center gap-5">
          <a href="#" onClick={() => showPage('main')} className="language-btn">Home Page</a>
          <a href="https://paypal.me/YOURUSERNAME" target="_blank" className="language-btn">Buy Me a Coffee</a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
