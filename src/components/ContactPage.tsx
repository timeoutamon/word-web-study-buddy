
import React from "react";

interface ContactPageProps {
  showPage: (pageId: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ showPage }) => {
  return (
    <div>
      <header className="bg-white p-5 border-dashed-black text-center">
        <div className="text-4xl font-bold tracking-tighter">CONTACT US</div>
      </header>
      
      <section className="p-10">
        <div 
          className="text-5xl text-center my-10 cursor-pointer" 
          onClick={() => window.location.href = 'mailto:kevan@gmail.com'}
        >
          ✉️
        </div>
        <p className="text-center mb-8">Click the email icon above to contact us</p>
        
        <div className="flex justify-center gap-5">
          <a href="#" onClick={() => showPage('main')} className="language-btn">Home Page</a>
          <a href="https://paypal.me/YOURUSERNAME" target="_blank" className="language-btn">Buy Me a Coffee</a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
