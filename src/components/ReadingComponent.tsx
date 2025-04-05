
import React from "react";
import { LANGUAGES } from "@/lib/constants";

interface ReadingComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const ReadingComponent: React.FC<ReadingComponentProps> = ({ language, lessonNumber, showPage }) => {
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;
  
  // Get the stories for this language and lesson
  const { bilingualStory30, bilingualStory50, targetLanguageStory } = getStoriesForLesson(language, lessonNumber);

  function getStoriesForLesson(lang: string, lesson: number) {
    // This would fetch real stories from a database or API
    // For now, we'll use dummy stories for demonstration
    
    let bilingualStory30 = "";
    let bilingualStory50 = "";
    let targetLanguageStory = "";
    
    if (lang === "nl" && lesson === 1) {
      bilingualStory30 = "Today ik went to the winkel. At the store I bought melk. De milk costs me 5 euros. But I didn't have any geld. My vriend had money though, so he betaalde for me. We drank the melk together in the park. Het was lekker and refreshing on such a warm dag.";
      
      bilingualStory50 = "Ik went to the winkel today. De store was very groot. I wanted to kopen some brood and melk. The bread was vers and smelled heerlijk. I also saw some appels that looked lekker. De man at the kassa was very aardig. He helped me with my tassen. Ik thanked him and left de winkel.";
      
      targetLanguageStory = "Ik ging vandaag naar de winkel. De winkel was erg groot. Ik wilde brood en melk kopen. Het brood was vers en rook heerlijk. Ik zag ook appels die er lekker uitzagen. De man bij de kassa was erg aardig. Hij hielp me met mijn tassen. Ik bedankte hem en verliet de winkel.";
    } else if (lang === "de" && lesson === 1) {
      bilingualStory30 = "Yesterday ich went to the Bäckerei. The bakery had frisches Brot. I bought ein Brot and eine Tasse Kaffee. Der coffee was sehr gut. I sat on a Bank in the park. The sun was shining and it was a schöner Tag.";
      
      bilingualStory50 = "Ich went to the Stadt yesterday. Die city was sehr busy. Viele people were walking on the Straße. I wanted to kaufen a book from the Buchhandlung. Der shop had many interessante books. Ich chose a book about deutsche Geschichte. The history of Germany is sehr fascinating. After that, ich went to a Café and had a Stück Kuchen.";
      
      targetLanguageStory = "Ich ging gestern in die Stadt. Die Stadt war sehr geschäftig. Viele Menschen gingen auf der Straße. Ich wollte ein Buch aus der Buchhandlung kaufen. Der Laden hatte viele interessante Bücher. Ich wählte ein Buch über deutsche Geschichte. Die Geschichte Deutschlands ist sehr faszinierend. Danach ging ich in ein Café und aß ein Stück Kuchen.";
    } else if (lang === "it" && lesson === 1) {
      bilingualStory30 = "Today io went to the mercato. The market had fresh frutta. I bought alcune mele and un po' di pane. Il bread was molto buono. I ate una mela while walking casa. It was a bellissima day in the città.";
      
      bilingualStory50 = "Io went to the ristorante yesterday sera. Il restaurant was molto elegante. The cameriere gave me the menu. Ho ordered pasta and vino rosso. La pasta was deliziosa and il wine was eccellente. After dinner, ho paid il conto and gave una mancia. Then I walked home sotto le stelle.";
      
      targetLanguageStory = "Sono andato al ristorante ieri sera. Il ristorante era molto elegante. Il cameriere mi ha dato il menu. Ho ordinato pasta e vino rosso. La pasta era deliziosa e il vino era eccellente. Dopo cena, ho pagato il conto e ho lasciato una mancia. Poi sono tornato a casa a piedi sotto le stelle.";
    } else if (lang === "sp" && lesson === 1) {
      bilingualStory30 = "Yesterday yo went to the mercado. The market had fresh frutas. I bought algunas manzanas and un poco de pan. El bread was muy bueno. I ate una manzana while walking a casa. It was a hermoso day in the ciudad.";
      
      bilingualStory50 = "Yo went to the restaurante last noche. El restaurant was muy elegante. The camarero gave me the menú. Pedí paella and vino tinto. La paella was deliciosa and el wine was excelente. After dinner, pagué la cuenta and gave una propina. Then I walked home bajo las estrellas.";
      
      targetLanguageStory = "Fui al restaurante anoche. El restaurante era muy elegante. El camarero me dio el menú. Pedí paella y vino tinto. La paella estaba deliciosa y el vino era excelente. Después de cenar, pagué la cuenta y dejé una propina. Luego caminé a casa bajo las estrellas.";
    } else {
      // Default dummy stories if no specific ones are available
      bilingualStory30 = `This is a sample bilingual story with 30% ${languageName} words. Some words would be in ${languageName} and marked in red.`;
      bilingualStory50 = `This is a sample bilingual story with 50% ${languageName} words. Half of the words would be in ${languageName} and marked in red.`;
      targetLanguageStory = `This is a sample story entirely in ${languageName}. It would use the vocabulary from lesson ${lesson}.`;
    }
    
    return {
      bilingualStory30,
      bilingualStory50,
      targetLanguageStory
    };
  }

  // Helper function to highlight foreign words in the bilingual stories
  const highlightForeignWords = (text: string, lang: string) => {
    // In a real implementation, this would identify which words are in the target language
    // For demo purposes, we'll make some assumptions based on example stories
    
    // For Dutch example
    if (lang === "nl") {
      const dutchWords = ["ik", "winkel", "melk", "de", "geld", "vriend", "betaalde", "het", "was", "lekker", "dag", "groot", "kopen", "brood", "vers", "heerlijk", "appels", "man", "kassa", "aardig", "tassen"];
      
      return text.split(" ").map((word, index) => {
        // Check if the word (removing punctuation) is in our Dutch word list
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
        if (dutchWords.includes(cleanWord)) {
          return <span key={index} className="text-red-600 font-medium">{word} </span>;
        }
        return <span key={index}>{word} </span>;
      });
    }
    
    // For German example
    if (lang === "de") {
      const germanWords = ["ich", "bäckerei", "frisches", "brot", "ein", "eine", "tasse", "kaffee", "der", "sehr", "gut", "bank", "schöner", "tag", "stadt", "die", "viele", "straße", "kaufen", "buchhandlung", "interessante", "deutsche", "geschichte", "café", "stück", "kuchen"];
      
      return text.split(" ").map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
        if (germanWords.includes(cleanWord)) {
          return <span key={index} className="text-red-600 font-medium">{word} </span>;
        }
        return <span key={index}>{word} </span>;
      });
    }
    
    // For Italian example
    if (lang === "it") {
      const italianWords = ["io", "mercato", "frutta", "alcune", "mele", "un", "po'", "di", "pane", "il", "molto", "buono", "una", "casa", "bellissima", "città", "ristorante", "sera", "elegante", "cameriere", "ho", "vino", "rosso", "la", "deliziosa", "eccellente", "conto", "mancia", "sotto", "stelle"];
      
      return text.split(" ").map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
        if (italianWords.includes(cleanWord)) {
          return <span key={index} className="text-red-600 font-medium">{word} </span>;
        }
        return <span key={index}>{word} </span>;
      });
    }
    
    // For Spanish example
    if (lang === "sp") {
      const spanishWords = ["yo", "mercado", "frutas", "algunas", "manzanas", "un", "poco", "de", "pan", "el", "muy", "bueno", "una", "a", "casa", "hermoso", "ciudad", "restaurante", "noche", "elegante", "camarero", "menú", "pedí", "paella", "vino", "tinto", "la", "deliciosa", "excelente", "pagué", "cuenta", "propina", "bajo", "estrellas"];
      
      return text.split(" ").map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
        if (spanishWords.includes(cleanWord)) {
          return <span key={index} className="text-red-600 font-medium">{word} </span>;
        }
        return <span key={index}>{word} </span>;
      });
    }
    
    // Default highlighting (every 3rd word for demo)
    return text.split(" ").map((word, index) => {
      if (index % 3 === 0) {
        return <span key={index} className="text-red-600 font-medium">{word} </span>;
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Reading - Lesson {lessonNumber}
        </h1>
        <p className="text-gray-600">
          These stories use vocabulary from this lesson and help reinforce the grammar points.
        </p>
      </div>

      {/* Bilingual Story 30% */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Story 1: Bilingual (30% {languageName})</h2>
        <p className="mb-3 text-sm text-gray-600">
          Words in <span className="text-red-600 font-medium">red</span> are in {languageName}. 
          This story introduces {languageName} vocabulary gradually.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-lg leading-relaxed">
          {highlightForeignWords(bilingualStory30, language)}
        </div>
      </section>

      {/* Bilingual Story 50% */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Story 2: Bilingual (50% {languageName})</h2>
        <p className="mb-3 text-sm text-gray-600">
          Words in <span className="text-red-600 font-medium">red</span> are in {languageName}. 
          This story uses more {languageName} vocabulary for increased immersion.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-lg leading-relaxed">
          {highlightForeignWords(bilingualStory50, language)}
        </div>
      </section>

      {/* Target Language Story */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Story 3: Full {languageName}</h2>
        <p className="mb-3 text-sm text-gray-600">
          This story is entirely in {languageName} and uses vocabulary from this lesson.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-lg leading-relaxed">
          {targetLanguageStory}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button 
          onClick={() => showPage(`vocab-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Vocabulary
        </button>
        <button 
          onClick={() => showPage(`grammar-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Grammar
        </button>
        <button 
          onClick={() => showPage(`writing-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Writing
        </button>
        <button 
          onClick={() => showPage(`test-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Test
        </button>
      </div>
    </div>
  );
};

export default ReadingComponent;
