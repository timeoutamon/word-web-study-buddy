
import React, { useState } from "react";
import { LANGUAGES, VOCABULARY_SECTIONS } from "@/lib/constants";

interface ReadingComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const ReadingComponent: React.FC<ReadingComponentProps> = ({ language, lessonNumber, showPage }) => {
  const [activeTab, setActiveTab] = useState('story1');
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;
  
  // Get vocabulary for this lesson to use in the stories
  const lessonVocab = VOCABULARY_SECTIONS[lessonNumber as keyof typeof VOCABULARY_SECTIONS] || [];
  const vocabWords = lessonVocab.map(item => item.english.toLowerCase());
  
  // Get the stories for this language and lesson
  const { bilingualStory30, bilingualStory50, targetLanguageStory } = getStoriesForLesson(language, lessonNumber);

  function getStoriesForLesson(lang: string, lesson: number) {
    // Stories based on language and lesson number
    const stories = {
      nl: {
        1: {
          bilingualStory30: "Yesterday ik went to the winkel. At the store I bought some bread and melk. De milk costs five euros, but I didn't have any geld. My vriend had money though, so he betaalde for me. As we left the winkel, we saw that het was raining. We decided to drink the melk and eat the bread under a tree. Het was a nice way to spend time with my vriend on such a regenachtige dag.",
          bilingualStory50: "Ik went to the winkel today. De store was very groot. I wanted to kopen some brood and melk. The bread was vers and smelled heerlijk. I also saw some appels that looked lekker. De man at the kassa was very aardig. He helped me with my tassen. Ik thanked him and verliet de winkel. Outside, het was sunny and warm. Ik decided to wandelen home instead of taking the bus. Op my way, I saw many mensen enjoying the mooi weer.",
          targetLanguageStory: "Ik ging vandaag naar de winkel. De winkel was erg groot. Ik wilde brood en melk kopen. Het brood was vers en rook heerlijk. Ik zag ook appels die er lekker uitzagen. De man bij de kassa was erg aardig. Hij hielp me met mijn tassen. Ik bedankte hem en verliet de winkel. Buiten was het zonnig en warm. Ik besloot naar huis te wandelen in plaats van de bus te nemen. Onderweg zag ik veel mensen genieten van het mooie weer."
        },
        2: {
          bilingualStory30: "I can maken good food if I have tijd. No, I'm not just saying that - het is true. I know how to nemen the right ingredients and combineren them well. Some mensen think cooking is difficult, but in my jaar of practice, I've learned many recepten. Your first attempts might not be goed, but with some effort, you could cook like me. I can zien you're interested. Other dan professional chefs, I use simple methods that anyone can leren.",
          bilingualStory50: "Ik can maken good food als I have genoeg tijd. No, I'm niet just saying that - het is true. Ik know how to nemen the right ingrediënten and combineren them well. Sommige people denken that cooking is moeilijk, but in my jaren of practice, I've geleerd many recepten. Jouw first attempts might not be goed, but with some moeite, you could koken like me. Ik can zien you're geïnteresseerd. Anders than professional chefs, ik use simple methoden that anyone can leren.",
          targetLanguageStory: "Ik kan goed eten maken als ik genoeg tijd heb. Nee, ik zeg dit niet zomaar - het is waar. Ik weet hoe ik de juiste ingrediënten moet nemen en ze goed moet combineren. Sommige mensen denken dat koken moeilijk is, maar in mijn jaren van oefening heb ik veel recepten geleerd. Je eerste pogingen zijn misschien niet goed, maar met wat moeite zou je kunnen koken zoals ik. Ik kan zien dat je geïnteresseerd bent. Anders dan professionele koks gebruik ik eenvoudige methoden die iedereen kan leren."
        },
        // Add stories for lessons 3-50 for Dutch
      },
      de: {
        1: {
          bilingualStory30: "Yesterday ich went to the Bäckerei. The bakery had fresh Brot. I bought ein Brot and eine Tasse Kaffee. Der coffee was sehr gut. I sat on a Bank in the park. The sun was warm and it was a schöner Tag. I saw other Leute also enjoying the weather. Sie were reading books or talking with Freunde. After I finished my Kaffee, I decided to go nach Hause.",
          bilingualStory50: "Ich went to die Stadt yesterday. Die city was sehr busy. Viele people were walking auf der Straße. I wanted to kaufen a book from the Buchhandlung. Der shop had many interessante books. Ich chose a book über deutsche Geschichte. The history of Germany is sehr fascinating. Nach that, ich went to a Café and had a Stück Kuchen. It was lecker and freshly gebacken. Als I was leaving das Café, I saw meine friend Anna.",
          targetLanguageStory: "Ich ging gestern in die Stadt. Die Stadt war sehr geschäftig. Viele Menschen gingen auf der Straße. Ich wollte ein Buch aus der Buchhandlung kaufen. Der Laden hatte viele interessante Bücher. Ich wählte ein Buch über deutsche Geschichte. Die Geschichte Deutschlands ist sehr faszinierend. Danach ging ich in ein Café und aß ein Stück Kuchen. Es war lecker und frisch gebacken. Als ich das Café verließ, sah ich meine Freundin Anna."
        },
        2: {
          bilingualStory30: "I can machen good food when I have Zeit. No, I'm not just saying that - es ist true. I know how to nehmen the right ingredients and kombinieren them well. Some Leute think cooking is difficult, but in my Jahr of practice, I've learned many Rezepte. Your first attempts might not be gut, but with some effort, you could cook like me. I can sehen you're interested. Other als professional chefs, I use simple methods that anyone can lernen.",
          bilingualStory50: "Ich can machen good food wenn I have genug Zeit. No, I'm nicht just saying that - es ist true. Ich know how to nehmen the right Zutaten and kombinieren them well. Einige people denken that cooking is schwierig, but in my Jahren of practice, I've gelernt many Rezepte. Deine first attempts might not be gut, but with some Mühe, you could kochen like me. Ich can sehen you're interessiert. Anders than professional Köche, ich use simple Methoden that anyone can lernen.",
          targetLanguageStory: "Ich kann gutes Essen machen, wenn ich genug Zeit habe. Nein, ich sage das nicht nur so - es ist wahr. Ich weiß, wie man die richtigen Zutaten nimmt und sie gut kombiniert. Einige Leute denken, dass Kochen schwierig ist, aber in meinen Jahren der Übung habe ich viele Rezepte gelernt. Deine ersten Versuche sind vielleicht nicht gut, aber mit etwas Mühe könntest du kochen wie ich. Ich kann sehen, dass du interessiert bist. Anders als professionelle Köche verwende ich einfache Methoden, die jeder lernen kann."
        },
        // Add stories for lessons 3-50 for German
      },
      it: {
        1: {
          bilingualStory30: "Today io went to the mercato. The market had fresh frutta. I bought alcune mele and un po' di pane. Il bread was molto buono. I ate una mela while walking casa. It was a bellissima day in the città. The sun was shining and the cielo was blue. People were selling fiori and vegetables from their farms. I talked with a vecchio man who told me stories about la sua family.",
          bilingualStory50: "Io went to the ristorante yesterday sera. Il restaurant was molto elegante. The cameriere gave me the menu. Ho ordered pasta and vino rosso. La pasta was deliziosa and il wine was eccellente. Dopo dinner, ho paid il conto and gave una mancia. Then I walked home sotto le stelle. Era a beautiful notte and I felt felice. Domani I will go to another ristorante with i miei amici to celebrate il mio compleanno.",
          targetLanguageStory: "Sono andato al ristorante ieri sera. Il ristorante era molto elegante. Il cameriere mi ha dato il menu. Ho ordinato pasta e vino rosso. La pasta era deliziosa e il vino era eccellente. Dopo cena, ho pagato il conto e ho lasciato una mancia. Poi sono tornato a casa a piedi sotto le stelle. Era una bella notte e mi sentivo felice. Domani andrò in un altro ristorante con i miei amici per festeggiare il mio compleanno."
        },
        2: {
          bilingualStory30: "I can fare good food when I have tempo. No, I'm not just saying that - è true. I know how to prendere the right ingredients and combinarli well. Some persone think cooking is difficult, but in my anno of practice, I've learned many ricette. Your first attempts might not be buoni, but with some effort, you could cook like me. I can vedere you're interested. Other che professional chefs, I use simple methods that anyone can imparare.",
          bilingualStory50: "Io can fare good food quando I have abbastanza tempo. No, I'm non just saying that - è vero. Io know how to prendere the right ingredienti and combinarli well. Alcune people pensano that cooking is difficile, but in my anni of practice, I've imparato many ricette. I tuoi first attempts might not be buoni, but with some sforzo, you could cucinare like me. Io can vedere you're interessato. Diverso than professional cuochi, io use simple metodi that anyone can imparare.",
          targetLanguageStory: "Posso preparare buon cibo quando ho abbastanza tempo. No, non lo dico tanto per dire - è vero. So come prendere gli ingredienti giusti e combinarli bene. Alcune persone pensano che cucinare sia difficile, ma nei miei anni di pratica, ho imparato molte ricette. I tuoi primi tentativi potrebbero non essere buoni, ma con un po' di sforzo, potresti cucinare come me. Posso vedere che sei interessato. Diversamente dagli chef professionisti, uso metodi semplici che chiunque può imparare."
        },
        // Add stories for lessons 3-50 for Italian
      },
      sp: {
        1: {
          bilingualStory30: "Yesterday yo went to the mercado. The market had fresh frutas. I bought algunas manzanas and un poco de pan. El bread was muy bueno. I ate una manzana while walking a casa. It was a hermoso day in the ciudad. The sun was bright and the cielo was clear. Many personas were shopping for comida and ropa. I enjoyed watching the niños playing near the fuente in the center of the plaza.",
          bilingualStory50: "Yo went to the restaurante last noche. El restaurant was muy elegante. The camarero gave me the menú. Pedí paella and vino tinto. La paella was deliciosa and el wine was excelente. After dinner, pagué la cuenta and gave una propina. Then I walked home bajo las estrellas. Era a beautiful noche and I felt feliz. Mañana I will go to another restaurante with mis amigos to celebrate mi cumpleaños.",
          targetLanguageStory: "Fui al restaurante anoche. El restaurante era muy elegante. El camarero me dio el menú. Pedí paella y vino tinto. La paella estaba deliciosa y el vino era excelente. Después de cenar, pagué la cuenta y dejé una propina. Luego caminé a casa bajo las estrellas. Era una noche hermosa y me sentía feliz. Mañana iré a otro restaurante con mis amigos para celebrar mi cumpleaños."
        },
        2: {
          bilingualStory30: "I can hacer good food when I have tiempo. No, I'm not just saying that - es true. I know how to tomar the right ingredients and combinarlos well. Some personas think cooking is difficult, but in my año of practice, I've learned many recetas. Your first attempts might not be buenos, but with some effort, you could cook like me. I can ver you're interested. Other que professional chefs, I use simple methods that anyone can aprender.",
          bilingualStory50: "Yo can hacer good food cuando I have suficiente tiempo. No, I'm no just saying that - es verdad. Yo know how to tomar the right ingredientes and combinarlos well. Algunas people piensan that cooking is difícil, but in my años of practice, I've aprendido many recetas. Tus first attempts might not be buenos, but with some esfuerzo, you could cocinar like me. Yo can ver you're interesado. Diferente than professional cocineros, yo use simple métodos that anyone can aprender.",
          targetLanguageStory: "Puedo hacer buena comida cuando tengo suficiente tiempo. No, no lo digo solo por decir - es verdad. Sé cómo tomar los ingredientes correctos y combinarlos bien. Algunas personas piensan que cocinar es difícil, pero en mis años de práctica, he aprendido muchas recetas. Tus primeros intentos pueden no ser buenos, pero con algo de esfuerzo, podrías cocinar como yo. Puedo ver que estás interesado. A diferencia de los cocineros profesionales, uso métodos simples que cualquiera puede aprender."
        },
        // Add stories for lessons 3-50 for Spanish
      }
    };

    // Return stories for the specified language and lesson, or default if not found
    const langStories = stories[lang as keyof typeof stories] || {};
    const lessonStories = langStories[lesson as keyof typeof langStories] || {
      bilingualStory30: `This is a sample bilingual story with 30% ${languageName} words for lesson ${lesson}.`,
      bilingualStory50: `This is a sample bilingual story with 50% ${languageName} words for lesson ${lesson}.`,
      targetLanguageStory: `This is a sample story entirely in ${languageName} for lesson ${lesson}.`
    };

    return lessonStories;
  }

  // Helper function to highlight foreign words in the bilingual stories
  const highlightForeignWords = (text: string, lang: string) => {
    // Define language-specific words to highlight
    const foreignWords = {
      nl: ["ik", "winkel", "melk", "de", "geld", "vriend", "betaalde", "het", "was", "lekker", "dag", "groot", "kopen", "brood", "vers", "heerlijk", "appels", "man", "kassa", "aardig", "tassen", "verliet", "mooi", "weer", "regenachtige", "mensen", "wandelen", "op", "buiten", "erg", "rook", "uitzagen", "bij", "me", "bedankte", "zonnig", "besloot", "in", "plaats", "van", "onderweg", "veel", "genieten", "naar", "als", "genoeg", "niet", "zomaar", "waar", "ingrediënten", "combineren", "sommige", "moeilijk", "jaren", "oefening", "recepten", "pogingen", "misschien", "moeite", "zou", "kunnen", "dat", "ben", "anders", "dan", "gebruik", "eenvoudige", "methoden", "iedereen", "kan"],
      de: ["ich", "bäckerei", "frisches", "brot", "ein", "eine", "tasse", "kaffee", "der", "sehr", "gut", "bank", "schöner", "tag", "leute", "sie", "freunde", "nach", "hause", "die", "stadt", "viele", "auf", "straße", "kaufen", "buchhandlung", "interessante", "über", "deutsche", "geschichte", "café", "stück", "kuchen", "lecker", "gebacken", "als", "das", "meine", "ging", "gestern", "in", "war", "geschäftig", "menschen", "gingen", "wollte", "aus", "laden", "hatte", "bücher", "wählte", "deutschlands", "ist", "faszinierend", "danach", "aß", "es", "frisch", "verließ", "sah", "freundin"],
      it: ["io", "mercato", "frutta", "alcune", "mele", "un", "po'", "di", "pane", "il", "molto", "buono", "una", "casa", "bellissima", "città", "ristorante", "sera", "elegante", "cameriere", "ho", "vino", "rosso", "la", "deliziosa", "eccellente", "conto", "mancia", "sotto", "stelle", "cielo", "fiori", "vecchio", "sua", "sera", "dopo", "era", "notte", "felice", "domani", "i", "miei", "amici", "il", "mio", "compleanno"],
      sp: ["yo", "mercado", "frutas", "algunas", "manzanas", "un", "poco", "de", "pan", "el", "muy", "bueno", "una", "a", "casa", "hermoso", "ciudad", "restaurante", "noche", "elegante", "camarero", "menú", "pedí", "paella", "vino", "tinto", "la", "deliciosa", "excelente", "pagué", "cuenta", "propina", "bajo", "estrellas", "cielo", "personas", "comida", "ropa", "niños", "fuente", "plaza", "era", "feliz", "mañana", "mis", "amigos", "mi", "cumpleaños"]
    };
    
    const wordsToHighlight = foreignWords[lang as keyof typeof foreignWords] || [];
    
    return text.split(" ").map((word, index) => {
      // Clean the word to remove punctuation for comparison
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
      
      // Check if the clean word is in our highlight list
      if (wordsToHighlight.includes(cleanWord)) {
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
          These stories use vocabulary from this lesson and help reinforce the grammar points. Read them aloud for pronunciation practice.
        </p>
      </div>

      {/* Tabs for Different Reading Levels */}
      <div className="flex mb-6 border-b border-gray-200">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'story1' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('story1')}
        >
          Bilingual 30%
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'story2' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('story2')}
        >
          Bilingual 50%
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'story3' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('story3')}
        >
          Full {languageName}
        </button>
      </div>

      {/* Story Content Based on Active Tab */}
      <div className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        {activeTab === 'story1' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Story 1: Bilingual (30% {languageName})</h2>
            <p className="mb-3 text-sm text-gray-600">
              Words in <span className="text-red-600 font-medium">red</span> are in {languageName}. 
              This story introduces {languageName} vocabulary gradually.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-lg leading-relaxed">
              {highlightForeignWords(bilingualStory30, language)}
            </div>
          </>
        )}

        {activeTab === 'story2' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Story 2: Bilingual (50% {languageName})</h2>
            <p className="mb-3 text-sm text-gray-600">
              Words in <span className="text-red-600 font-medium">red</span> are in {languageName}. 
              This story uses more {languageName} vocabulary for increased immersion.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-lg leading-relaxed">
              {highlightForeignWords(bilingualStory50, language)}
            </div>
          </>
        )}

        {activeTab === 'story3' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Story 3: Full {languageName}</h2>
            <p className="mb-3 text-sm text-gray-600">
              This story is entirely in {languageName} and uses vocabulary from this lesson.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-lg leading-relaxed">
              {targetLanguageStory}
            </div>
          </>
        )}
      </div>

      {/* Reading Comprehension Questions */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reading Comprehension</h2>
        <p className="mb-3 text-sm text-gray-600">
          Answer these questions in your notebook to check your understanding.
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li className="text-lg">What is the main setting of the story?</li>
          <li className="text-lg">Who are the main characters in the story?</li>
          <li className="text-lg">What happened at the beginning of the story?</li>
          <li className="text-lg">How did the story end?</li>
          <li className="text-lg">List five {languageName} words from the story and their English translations.</li>
        </ol>
      </section>

      {/* Vocabulary Focus */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Vocabulary in Context</h2>
        <p className="mb-3 text-gray-600">
          These words from Lesson {lessonNumber} appear in the stories above. Practice using them in your own sentences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessonVocab.slice(0, 10).map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <strong>{item.english}</strong> <span className="text-gray-600">({item.type})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reading Tips */}
      <section className="mb-10 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">Reading Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Read aloud to practice pronunciation, even if you're not sure of all the words.</li>
          <li>Don't look up every unknown word - try to understand the main ideas first.</li>
          <li>Copy interesting phrases into your notebook to review later.</li>
          <li>Try to guess the meaning of new words from context before checking a dictionary.</li>
          <li>Re-read the stories several times - comprehension improves with each reading.</li>
        </ul>
      </section>

      {/* Back to Lesson button */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={() => showPage(language)} 
          className="language-btn bg-white py-3 px-6 border-2 border-black rounded-lg shadow-md hover:bg-gray-100 font-bold text-xl"
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
};

export default ReadingComponent;
