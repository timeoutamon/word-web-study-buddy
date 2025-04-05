
import React from "react";

interface ContactPageProps {
  showPage: (pageId: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ showPage }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="bg-white p-5 border-b border-dashed border-black text-center">
        <div className="text-4xl font-bold tracking-tighter">CONTACT US</div>
      </header>
      
      <section className="p-10">
        <div 
          className="text-5xl text-center my-10 cursor-pointer transition-transform hover:scale-110" 
          onClick={() => window.location.href = 'mailto:kevan@gmail.com'}
          aria-label="Email us"
        >
          ✉️
        </div>
        <p className="text-center mb-8 text-lg">Click the email icon above to contact us</p>
        
        <div className="flex justify-center gap-5 mt-10">
          <button 
            onClick={() => showPage('main')} 
            className="bg-white py-3 px-6 border-2 border-black rounded-lg shadow-md hover:bg-gray-100 font-bold"
          >
            Home Page
          </button>
          <a 
            href="https://paypal.me/YOURUSERNAME" 
            target="_blank" 
            className="bg-white py-3 px-6 border-2 border-black rounded-lg shadow-md hover:bg-gray-100 font-bold"
          >
            Buy Me a Coffee
          </a>
        </div>
      </section>
      
      <section className="p-10 bg-gray-50 mt-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Connect With Us</h2>
        <p className="text-center mb-6">
          Have questions about our language learning methods? Want to suggest improvements?
          We'd love to hear from you!
        </p>
        <p className="text-center font-medium">
          Email: kevan@gmail.com
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
