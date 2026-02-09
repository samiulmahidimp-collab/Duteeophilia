
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface SuccessViewProps {
  onProceed: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ onProceed }) => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateSpecialMessage = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a short, incredibly sweet, and elegant one-sentence valentine message for a girl named Dutee. Mention her beauty or how much she means to Mahid. Keep it poetic.",
      });
      setMessage(response.text || "You've made me the happiest person in the world, Dutee.");
    } catch (error) {
      console.error("AI Generation Error:", error);
      setMessage("You've made me the happiest person in the world, Dutee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-3xl px-6 text-center animate-in fade-in zoom-in duration-1000">
      <div className="mb-8">
        <div className="flex justify-center gap-4 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`animate-bounce`} style={{ animationDelay: `${i * 0.15}s` }}>
              <svg 
                className="w-14 h-14 text-rose-500 drop-shadow-md" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          ))}
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold text-rose-900 mb-8 font-serif leading-tight">
          She Said Yes! 💖
        </h2>
        
        <div className="bg-white/70 backdrop-blur-xl border border-rose-100 p-10 rounded-[3rem] shadow-2xl max-w-2xl mx-auto mb-12 transform transition-all hover:scale-[1.02]">
          <p className="text-2xl md:text-3xl italic text-rose-800 leading-relaxed font-serif">
            {message || "Every beat of my heart now has your name written on it. You've made me the happiest person alive, Dutee."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {!message && !loading && (
            <button
              onClick={generateSpecialMessage}
              className="group flex items-center gap-3 px-8 py-4 bg-white/50 border border-rose-200 text-rose-600 rounded-full hover:bg-white transition-all hover:shadow-xl font-bold uppercase tracking-widest text-xs"
            >
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              <span>Read a personalized note from Mahid</span>
            </button>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-3 text-rose-400 py-3">
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce delay-150" />
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce delay-300" />
            </div>
          )}

          <button
            onClick={onProceed}
            className="group mt-4 px-12 py-5 bg-rose-600 text-white rounded-full font-bold shadow-2xl hover:bg-rose-700 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <span>Enter the Private Vault</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
