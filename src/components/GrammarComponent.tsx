import React, { useState } from "react";
import { LANGUAGES, getGrammarTypeForLesson } from "@/lib/constants";

interface GrammarComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const GrammarComponent: React.FC<GrammarComponentProps> = ({ language, lessonNumber, showPage }) => {
  const [notesContent, setNotesContent] = useState("");
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;
  const grammarType = getGrammarTypeForLesson(lessonNumber);
  
  // Grammar content based on language and lesson
  const getGrammarContent = () => {
    // Map of grammar content by language and grammar type
    const grammarContent: Record<string, Record<string, { title: string, explanation: string, examples: string[], exercises: string[] }>> = {
      nl: {
        "Present Tense": {
          title: "Dutch Present Tense (Tegenwoordige tijd)",
          explanation: "The Dutch present tense is used to express actions happening now or regularly. Most verbs follow a pattern with specific endings for each person. Regular verbs typically add -t for the second and third person singular.",
          examples: [
            "Ik werk (I work)",
            "Jij werkt / Je werkt (You work)",
            "Hij/zij/het werkt (He/she/it works)",
            "Wij werken (We work)",
            "Jullie werken (You all work)",
            "Zij werken (They work)"
          ],
          exercises: [
            "Fill in the correct form of the verb 'lopen' (to walk): Ik ___, jij ___, hij ___, wij ___, jullie ___, zij ___.",
            "Translate to Dutch: 'I learn Dutch every day.'",
            "Translate to Dutch: 'She reads a book now.'",
            "Complete the sentence: 'Wij ___ naar school.' (gaan - to go)",
            "Create 5 sentences using the present tense with the words from this lesson's vocabulary."
          ]
        },
        "Past Simple (Preterite)": {
          title: "Dutch Past Simple (Onvoltooid verleden tijd)",
          explanation: "The Dutch past simple is used for completed actions in the past. Regular verbs form the past tense by adding -te or -de to the stem, depending on the final sound of the stem (voicing).",
          examples: [
            "Ik werkte (I worked)",
            "Jij werkte (You worked)",
            "Hij/zij/het werkte (He/she/it worked)",
            "Wij werkten (We worked)",
            "Jullie werkten (You all worked)",
            "Zij werkten (They worked)"
          ],
          exercises: [
            "Fill in the correct form of the verb 'praten' (to talk) in past tense: Ik ___, jij ___, hij ___, wij ___, jullie ___, zij ___.",
            "Translate to Dutch: 'I bought a book yesterday.'",
            "Transform to past tense: 'Ik lees een boek.' (I read a book.)",
            "Complete the sentence: 'Zij ___ in Amsterdam.' (wonen - to live)",
            "Create 5 sentences using the past tense with the vocabulary from this lesson."
          ]
        },
        // Add other grammar types for Dutch
        "Future Simple": {
          title: "Dutch Future Simple (Toekomende tijd)",
          explanation: "The Dutch future tense is formed using the auxiliary verb 'zullen' (will) + infinitive. Another common way to express future is with 'gaan' (to go) + infinitive.",
          examples: [
            "Ik zal werken (I will work)",
            "Jij zult werken (You will work)",
            "Hij/zij/het zal werken (He/she/it will work)",
            "Wij zullen werken (We will work)",
            "Ik ga werken (I'm going to work)",
            "Zij gaat leren (She's going to learn)"
          ],
          exercises: [
            "Fill in with 'zullen': Ik ___, jij ___, hij ___, wij ___, jullie ___, zij ___",
            "Translate to Dutch: 'I will visit Amsterdam next year.'",
            "Translate to Dutch using 'gaan': 'She is going to cook dinner.'",
            "Complete: 'Wij ___ morgen studeren.' (zullen)",
            "Write 5 sentences about your future plans using both forms."
          ]
        },
        "Imperative": {
          title: "Dutch Imperative (Gebiedende wijs)",
          explanation: "The Dutch imperative is used to give commands or instructions. For most verbs, it's formed by using the stem of the verb.",
          examples: [
            "Werk! (Work!)",
            "Kom hier! (Come here!)",
            "Lees dit boek! (Read this book!)",
            "Ga zitten! (Sit down!)",
            "Spreek Nederlands! (Speak Dutch!)"
          ],
          exercises: [
            "Form the imperative of these verbs: lopen, eten, drinken, spreken, luisteren",
            "Translate to Dutch: 'Wait here!'",
            "Translate to Dutch: 'Don't talk!' (Hint: 'Niet' + imperative)",
            "Write 5 cooking instructions using the imperative form",
            "Create a short dialogue with at least 3 imperative forms"
          ]
        }
      },
      de: {
        "Present Tense": {
          title: "German Present Tense (Präsens)",
          explanation: "The German present tense expresses actions happening now or habitually. Regular verbs change their endings based on the subject. The second person singular (du) adds -st, and the third person singular (er/sie/es) adds -t.",
          examples: [
            "Ich arbeite (I work)",
            "Du arbeitest (You work)",
            "Er/sie/es arbeitet (He/she/it works)",
            "Wir arbeiten (We work)",
            "Ihr arbeitet (You all work)",
            "Sie arbeiten (They work)"
          ],
          exercises: [
            "Fill in the correct form of 'spielen' (to play): Ich ___, du ___, er ___, wir ___, ihr ___, sie ___.",
            "Translate to German: 'I learn German every day.'",
            "Translate to German: 'She reads a newspaper now.'",
            "Complete the sentence: 'Wir ___ in die Schule.' (gehen - to go)",
            "Create 5 sentences using the present tense with vocabulary from this lesson."
          ]
        },
        "Past Simple (Preterite)": {
          title: "German Past Simple (Präteritum)",
          explanation: "The German Präteritum (simple past) is mainly used in written language and formal speech. Regular verbs form it by adding -te to the stem and then the appropriate ending.",
          examples: [
            "Ich arbeitete (I worked)",
            "Du arbeitetest (You worked)",
            "Er/sie/es arbeitete (He/she/it worked)",
            "Wir arbeiteten (We worked)",
            "Ihr arbeitetet (You worked)",
            "Sie arbeiteten (They worked)"
          ],
          exercises: [
            "Fill in the correct form of 'spielen' in past tense: Ich ___, du ___, er ___, wir ___, ihr ___, sie ___.",
            "Translate to German: 'I bought a book yesterday.' (kaufen - to buy)",
            "Write sentences with these verbs in Präteritum: machen, sagen, fragen, hören",
            "Complete: 'Sie ___ in Berlin.' (wohnen - to live)",
            "Write a short paragraph about yesterday using the Präteritum."
          ]
        },
        // Other German grammar types
        "Imperative": {
          title: "German Imperative (Imperativ)",
          explanation: "The German imperative is used for commands and requests. It has three forms: for 'du' (informal singular), 'ihr' (informal plural), and 'Sie' (formal).",
          examples: [
            "Komm! (Come! - informal singular)",
            "Kommt! (Come! - informal plural)",
            "Kommen Sie! (Come! - formal)",
            "Arbeite! (Work! - informal singular)",
            "Arbeitet! (Work! - informal plural)",
            "Arbeiten Sie! (Work! - formal)"
          ],
          exercises: [
            "Form the 'du' imperative of: sprechen, lesen, gehen, sehen, hören",
            "Translate all three forms: 'Wait here!'",
            "Translate all three forms: 'Open the door!'",
            "Write 5 cooking instructions using the imperative (du form)",
            "Create a dialogue between a teacher and students using imperatives"
          ]
        }
      },
      it: {
        "Present Tense": {
          title: "Italian Present Tense (Presente Indicativo)",
          explanation: "The Italian present tense is used for actions happening now or habitually. Verbs are conjugated according to their ending (-are, -ere, -ire) and the subject.",
          examples: [
            "Io lavoro (I work)",
            "Tu lavori (You work)",
            "Lui/lei lavora (He/she works)",
            "Noi lavoriamo (We work)",
            "Voi lavorate (You all work)",
            "Loro lavorano (They work)"
          ],
          exercises: [
            "Conjugate 'parlare' (to speak): Io ___, tu ___, lui ___, noi ___, voi ___, loro ___.",
            "Translate to Italian: 'I study Italian every day.'",
            "Translate to Italian: 'She lives in Rome.'",
            "Complete the sentence: 'Noi ___ al ristorante.' (andare - to go)",
            "Create 5 sentences about your daily routine using the present tense."
          ]
        },
        "Past Simple (Preterite)": {
          title: "Italian Past Simple (Passato Remoto)",
          explanation: "The Passato Remoto is used for actions completed in the distant past, especially in literature and formal writing. It's formed by adding specific endings to the verb stem.",
          examples: [
            "Io parlai (I spoke)",
            "Tu parlasti (You spoke)",
            "Lui/lei parlò (He/she spoke)",
            "Noi parlammo (We spoke)",
            "Voi parlaste (You all spoke)",
            "Loro parlarono (They spoke)"
          ],
          exercises: [
            "Conjugate 'finire' (to finish) in Passato Remoto: Io ___, tu ___, lui ___, noi ___, voi ___, loro ___.",
            "Translate to Italian using Passato Remoto: 'Columbus discovered America.'",
            "Transform to Passato Remoto: 'Io mangio una mela.' (I eat an apple.)",
            "Complete: 'Lei ___ un libro famoso.' (scrivere - to write)",
            "Write a short story using Passato Remoto (3-5 sentences)."
          ]
        },
        // Other Italian grammar types
        "Imperative": {
          title: "Italian Imperative (Imperativo)",
          explanation: "The Italian imperative is used for giving commands or instructions. It has different forms for 'tu' (informal singular), 'voi' (plural), and 'Lei' (formal singular).",
          examples: [
            "Parla! (Speak! - informal singular)",
            "Parlate! (Speak! - plural)",
            "Parli! (Speak! - formal singular)",
            "Vieni qui! (Come here! - informal singular)",
            "Venite qui! (Come here! - plural)",
            "Venga qui! (Come here! - formal singular)"
          ],
          exercises: [
            "Form the 'tu' imperative of: mangiare, leggere, scrivere, dormire, uscire",
            "Translate all forms: 'Open the window!'",
            "Translate using the negative imperative: 'Don't wait for me!' (Hint: non + infinitive for 'tu')",
            "Write 5 cooking instructions using the imperative",
            "Create a dialogue between a tourist and a local using imperatives"
          ]
        }
      },
      sp: {
        "Present Tense": {
          title: "Spanish Present Tense (Presente de Indicativo)",
          explanation: "The Spanish present tense expresses actions happening now or habitually. Regular verbs are conjugated according to their ending (-ar, -er, -ir) and the subject pronoun.",
          examples: [
            "Yo hablo (I speak)",
            "Tú hablas (You speak)",
            "Él/ella/usted habla (He/she/you formal speaks)",
            "Nosotros/as hablamos (We speak)",
            "Vosotros/as habláis (You all speak - Spain)",
            "Ellos/ellas/ustedes hablan (They/you all speak)"
          ],
          exercises: [
            "Conjugate 'vivir' (to live): Yo ___, tú ___, él ___, nosotros ___, vosotros ___, ellos ___.",
            "Translate to Spanish: 'I study Spanish every day.'",
            "Translate to Spanish: 'She works in Madrid.'",
            "Complete the sentence: 'Nosotros ___ al cine.' (ir - to go)",
            "Create 5 sentences describing your routine using the present tense."
          ]
        },
        "Past Simple (Preterite)": {
          title: "Spanish Past Simple (Pretérito Indefinido)",
          explanation: "The Spanish Pretérito Indefinido expresses completed actions in the past. It's used for actions that are seen as single events or happened during a specific time period.",
          examples: [
            "Yo hablé (I spoke)",
            "Tú hablaste (You spoke)",
            "Él/ella/usted habló (He/she/you formal spoke)",
            "Nosotros/as hablamos (We spoke)",
            "Vosotros/as hablasteis (You all spoke - Spain)",
            "Ellos/ellas/ustedes hablaron (They/you all spoke)"
          ],
          exercises: [
            "Conjugate 'vivir' (to live) in Pretérito: Yo ___, tú ___, él ___, nosotros ___, vosotros ___, ellos ___.",
            "Translate to Spanish using Pretérito: 'I visited Mexico last year.'",
            "Transform to Pretérito: 'Yo como una manzana.' (I eat an apple.)",
            "Complete: 'Ella ___ una carta ayer.' (escribir - to write)",
            "Write 5 sentences about what you did yesterday using Pretérito."
          ]
        },
        // Other Spanish grammar types
        "Imperative": {
          title: "Spanish Imperative (Imperativo)",
          explanation: "The Spanish imperative is used for commands and requests. It has different forms for 'tú' (informal singular), 'vosotros' (informal plural), 'usted' (formal singular), and 'ustedes' (formal plural).",
          examples: [
            "¡Habla! (Speak! - informal singular)",
            "¡Hablad! (Speak! - informal plural, Spain)",
            "¡Hable! (Speak! - formal singular)",
            "¡Hablen! (Speak! - formal plural)",
            "¡No hables! (Don't speak! - informal singular)"
          ],
          exercises: [
            "Form the 'tú' and 'usted' imperative of: comer, escribir, venir, poner, salir",
            "Translate all forms: 'Open the door!'",
            "Translate the negative command: 'Don't forget me!' for 'tú' and 'ustedes'",
            "Write 5 cooking instructions using the imperative",
            "Create a dialogue between a doctor and patient using imperatives"
          ]
        }
      }
    };

    // Return grammar content for the given language and grammar type
    return grammarContent[language]?.[grammarType] || {
      title: `${languageName} ${grammarType}`,
      explanation: `Grammar explanation for ${grammarType} in ${languageName} would be provided here.`,
      examples: [`Example sentences for ${grammarType} in ${languageName}`],
      exercises: [`Practice exercises for ${grammarType} in ${languageName}`]
    };
  };

  const content = getGrammarContent();

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Grammar - Lesson {lessonNumber}
        </h1>
        <p className="text-gray-600">
          {grammarType} - Write all examples and exercises in your notebook
        </p>
      </div>

      {/* Grammar Explanation */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
        <p className="mb-6 text-lg leading-relaxed">
          {content.explanation}
        </p>
        
        <h3 className="text-xl font-bold mb-3">Examples:</h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          {content.examples.map((example, index) => (
            <li key={index} className="text-lg">{example}</li>
          ))}
        </ul>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-3">Exercises:</h3>
          <ol className="list-decimal pl-6 space-y-4">
            {content.exercises.map((exercise, index) => (
              <li key={index} className="text-lg">{exercise}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Notes Section */}
      <section className="mb-10 bg-white border-2 border-black rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
        <p className="mb-4 text-sm text-gray-600">
          Use this space for temporary notes, but remember to write everything in your notebook for better retention.
        </p>
        <textarea
          value={notesContent}
          onChange={(e) => setNotesContent(e.target.value)}
          placeholder="Type your notes here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
        ></textarea>
      </section>

      {/* Tips */}
      <section className="mb-10 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">Grammar Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Copy all examples into your notebook and underline the verb forms.</li>
          <li>Complete all exercises in your notebook rather than just thinking of the answers.</li>
          <li>Try to create your own additional examples to reinforce the grammar pattern.</li>
          <li>When speaking, prioritize getting the meaning across rather than perfect grammar.</li>
          <li>Practice by reading your examples aloud to improve pronunciation.</li>
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

export default GrammarComponent;
