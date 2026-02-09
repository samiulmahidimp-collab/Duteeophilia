
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

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
  { question: "Mountains or Sea? What does Mahid prefer for travel?", options: ["Sea", "Mountains", "Both equally", "None"], correctAnswer: 2 },
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
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswer = (selected: number) => {
    const newUserAnswers = [...userAnswers, selected];
    setUserAnswers(newUserAnswers);
    
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
      <div className="relative z-10 w-full max-w-2xl px-6 py-10 animate-in zoom-in duration-700">
        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-rose-100 shadow-2xl flex flex-col items-center">
          <div className="text-6xl mb-6">{result.icon}</div>
          <h2 className="text-3xl font-bold text-rose-900 mb-2">{result.title}</h2>
          <div className="text-rose-500 font-bold text-xl mb-4">Score: {score} / {questions.length}</div>
          <p className="text-rose-800 text-lg font-medium mb-8 leading-relaxed text-center">
            {result.msg}
          </p>

          <div className="w-full max-h-[40vh] overflow-y-auto mb-10 pr-2 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
            <h3 className="text-left text-rose-900 font-bold uppercase tracking-widest text-xs mb-4 border-b border-rose-100 pb-2">Review Your Answers</h3>
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.correctAnswer;
                return (
                  <div key={idx} className={`p-4 rounded-2xl border transition-all ${isCorrect ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
                    <p className="text-sm font-bold text-slate-800 mb-2">{idx + 1}. {q.question}</p>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-500">Your choice:</span>
                        <span className={isCorrect ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                          {q.options[userAnswers[idx]]} {isCorrect ? '✓' : '✗'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-500">Correct answer:</span>
                          <span className="text-emerald-600 font-bold">{q.options[q.correctAnswer]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={onFinished}
              className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold shadow-lg hover:bg-rose-700 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              <span>Continue to Written Part</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            <button
              onClick={onBack}
              className="text-rose-400 font-medium hover:text-rose-600 hover:underline transition-colors text-sm"
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
          <button onClick={onBack} className="text-rose-400 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors">
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
              className="w-full text-left px-6 py-4 bg-white border-2 border-rose-50 text-rose-800 rounded-2xl hover:border-rose-400 hover:bg-rose-50 transition-all transform hover:-translate-y-1 active:scale-95 font-medium shadow-sm hover:shadow-md"
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
