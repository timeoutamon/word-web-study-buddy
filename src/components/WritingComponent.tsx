
import React, { useState } from "react";
import { LANGUAGES } from "@/lib/constants";

interface WritingComponentProps {
  language: string;
  lessonNumber: number;
  showPage: (pageId: string) => void;
}

const WritingComponent: React.FC<WritingComponentProps> = ({ language, lessonNumber, showPage }) => {
  const [notepadContent, setNotepadContent] = useState<string>("");
  const languageName = LANGUAGES[language as keyof typeof LANGUAGES]?.name || language;
  
  // Get writing prompts based on the vocabulary for this lesson
  const writingPrompts = getWritingPromptsForLesson(language, lessonNumber);
  
  function getWritingPromptsForLesson(lang: string, lesson: number) {
    // This would fetch real prompts based on the vocabulary for this lesson
    // For now, using sample prompts
    
    const prompts = [];
    
    if (lang === "nl" && lesson === 1) {
      prompts.push(
        "Describe your daily routine using present tense verbs.",
        "Write about your favorite food and why you like it.",
        "Describe your family members using the vocabulary from this lesson.",
        "Write about what you did yesterday using as many Dutch words as you can.",
        "Create a short dialogue between two people meeting for the first time."
      );
    } else if (lang === "de" && lesson === 1) {
      prompts.push(
        "Describe your house and the rooms in it.",
        "Write about your favorite hobby and why you enjoy it.",
        "Describe the weather today and what clothes you are wearing.",
        "Write about a trip you would like to take to Germany.",
        "Create a short shopping list for ingredients to make your favorite meal."
      );
    } else if (lang === "it" && lesson === 1) {
      prompts.push(
        "Describe your ideal vacation in Italy.",
        "Write about your favorite Italian food and why you like it.",
        "Describe your daily routine from morning to evening.",
        "Write about your family members and their personalities.",
        "Create a short dialogue ordering food at an Italian restaurant."
      );
    } else if (lang === "sp" && lesson === 1) {
      prompts.push(
        "Describe your city or town.",
        "Write about your favorite Spanish-speaking country and why you'd like to visit.",
        "Describe what you do on weekends.",
        "Write about your favorite foods and drinks.",
        "Create a short dialogue introducing yourself to a new friend."
      );
    } else {
      // Default prompts if no specific ones are available
      prompts.push(
        `Describe yourself using ${languageName} vocabulary from this lesson.`,
        `Write about your day using ${languageName} words you've learned.`,
        `Create a short story using at least 10 ${languageName} words from this lesson.`,
        `Describe your favorite place using ${languageName} vocabulary.`,
        `Write a dialogue between two people using ${languageName} greetings and basic phrases.`
      );
    }
    
    return prompts;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {languageName} Writing - Lesson {lessonNumber}
        </h1>
        <p className="text-gray-600">
          Practice writing in {languageName} using the vocabulary from this lesson.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Writing Prompts */}
        <div className="md:col-span-1">
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md h-full">
            <h2 className="text-2xl font-bold mb-4">Writing Prompts</h2>
            <p className="mb-4 text-sm text-gray-600">
              Choose one or more of these prompts for your writing practice.
            </p>
            <ol className="list-decimal pl-5 space-y-4">
              {writingPrompts.map((prompt, index) => (
                <li key={index} className="font-medium">
                  {prompt}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Notepad */}
        <div className="md:col-span-2">
          <div className="bg-white border-2 border-black rounded-lg p-6 shadow-md h-full">
            <h2 className="text-2xl font-bold mb-4">Your Writing Space</h2>
            <p className="mb-4 text-sm text-gray-600">
              Write your answers in your notebook or type them here temporarily.
            </p>
            <textarea
              value={notepadContent}
              onChange={(e) => setNotepadContent(e.target.value)}
              placeholder="Start writing here..."
              className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none font-medium"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">Writing Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Try to use as many words from this lesson's vocabulary as possible.</li>
          <li>Focus on the grammar points covered in this lesson.</li>
          <li>Start with simple sentences and gradually build more complex ones.</li>
          <li>Don't worry about making mistakes – they're part of the learning process!</li>
          <li>Save your writing to track your progress over time.</li>
        </ul>
      </div>

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
          onClick={() => showPage(`reading-${language}-${lessonNumber}`)} 
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition"
        >
          Reading
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

export default WritingComponent;
