
import React, { useState } from 'react';
import { QuizQuestion } from '../types.ts';

const questions: QuizQuestion[] = [
  { question: "What is Mahid's absolute favorite colors?", options: ["Crimson & Gold", "Blue & White", "Emerald & Black", "Pink & Purple"], correctAnswer: 1 },
  { question: "What is Mahid's absolute favorite dish?", options: ["Biryani", "Kacchi", "Pasta", "Burger"], correctAnswer: 1 },
  { question: "What app does Mahid say is his 'Life'?", options: ["Instagram", "WhatsApp", "Snapchat", "Telegram"], correctAnswer: 2 },
  { question: "When is Mahid's birthday?", options: ["27 Feb 2005", "14 Feb 2005", "27 March 2004", "08 Sept 2005"], correctAnswer: 0 },
  { question: "Which season is Mahid's favorite?", options: ["Spring", "Summer", "Autumn", "Winter"], correctAnswer: 3 },
  { question: "Who does Mahid love most after Dutee?", options: ["His Father", "His Mother", "His Best Friend", "His Pet"], correctAnswer: 1 },
  { question: "What does Mahid have a serious obsession for?", options: ["Gaming", "Movies", "Money", "Cars"], correctAnswer: 2 },
  { question: "Which sport does Mahid love to play?", options: ["Football", "Cricket", "Volleyball", "Basketball"], correctAnswer: 2 },
  { question: "Where is Mahid's native village?", options: ["Dhaka", "Sylhet", "Brahmanbaria", "Cumilla"], correctAnswer: 2 },
  { question: "What are Mahid's favorite snacks to have?", options: ["Chips & Soda", "Chanachur & Bhelpuri", "Fries & Wings", "Samosa & Tea"], correctAnswer: 1 },
  { question: "Mountains or Sea? What does Mahid prefer for travel?", options: ["Sea", "Mountains", "Both equally", "None"], correctAnswer: 1 },
  { question: "What's Mahid's favorite genre in movies?", options: ["Action", "Horror", "Romance", "Comedy"], correctAnswer: 2 },
  { question: "Which movie were we watching on our very first date?", options: ["Insidious", "Conjuring", "Notebook", "Annabelle"], correctAnswer: 1 },
  { question: "When did our relation officially begin?", options: ["1st Jan 2025", "14th Feb 2025", "8th Sept 2025", "10th Oct 2025"], correctAnswer: 2 },
  { question: "What does Mahid love to do most in his free time?", options: ["Play", "Eat", "Sleep", "Talk"], correctAnswer: 2 },
  { question: "What is Mahid's favorite flower?", options: ["Rose", "Sunflower", "Plumeria", "Lotus"], correctAnswer: 2 },
  { question: "Where does Mahid go when he's sad?", options: ["Coffee Shop", "Playground / Free Space", "His Room", "The Mall"], correctAnswer: 1 },
  { question: "What does Mahid love to do to Dutee the most?", options: ["Hug her", "Tease her", "Kiss her", "Stare at her"], correctAnswer: 2 },
  { question: "What is the name of this app's hero?", options: ["Mahid", "Dutee", "Both", "None"], correctAnswer: 0 },
  { question: "How much does Mahid love Dutee?", options: ["A little", "A lot", "Infinitely", "More than anyone can imagine"], correctAnswer: 3 },
];

interface QuizViewProps {
  onBack: () => void;
  onFinished: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onBack, onFinished }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected: number) => {
    if (selected === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { title: "Incredible!", msg: "You need a doctor, cause You have \"Mahidophilia\"", icon: "🩺💖" };
    if (percentage >= 60) return { title: "Good Job!", msg: "Less Mahidophilia", icon: "✨" };
    return { title: "Oh no...", msg: "u failed 😢, knk me immediately.", icon: "💔" };
  };

  if (showResult) {
    const result = getResultMessage();
    return (
      <div className="relative z-10 w-full max-w-lg px-6 text-center animate-in zoom-in duration-700">
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] border border-rose-100 shadow-2xl">
          <div className="text-6xl mb-6">{result.icon}</div>
          <h2 className="text-3xl font-bold text-rose-900 mb-4">{result.title}</h2>
          <div className="text-rose-500 font-bold text-lg mb-6">Score: {score} / {questions.length}</div>
          <p className="text-rose-800 text-xl font-medium mb-8 leading-relaxed">
            {result.msg}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={onFinished}
              className="px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 transition-all transform hover:scale-105"
            >
              Continue to Written Part
            </button>
            <button
              onClick={onBack}
              className="text-rose-400 font-medium hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="relative z-10 w-full max-w-2xl px-6 animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/80 backdrop-blur-xl border border-rose-100 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-rose-400 hover:text-rose-600 font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg> Dashboard
          </button>
          <span className="text-rose-400 font-bold tracking-widest text-sm uppercase">Question {currentIdx + 1} / {questions.length}</span>
        </div>

        <div className="w-full bg-rose-100 h-2 rounded-full mb-10 overflow-hidden">
          <div 
            className="bg-rose-500 h-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-rose-900 mb-8 font-serif leading-tight">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left px-6 py-4 bg-white border-2 border-rose-50 text-rose-800 rounded-2xl hover:border-rose-400 hover:bg-rose-50 transition-all transform hover:-translate-y-1 active:scale-95 font-medium"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
