
import React, { useState, useEffect } from 'react';
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
        contents: "Write a short, incredibly sweet, and elegant one-sentence valentine message for a girl named Dutee. Keep it romantic and poetic.",
      });
      setMessage(response.text || "You've made me the happiest person in the world, Dutee.");
    } catch (error) {
      console.error(error);
      setMessage("You've made me the happiest person in the world, Dutee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-3xl px-6 text-center animate-in fade-in zoom-in duration-1000">
      <div className="mb-8">
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg 
              key={i}
              className={`w-12 h-12 text-rose-500 animate-bounce`} 
              style={{ animationDelay: `${i * 0.1}s` }}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-rose-900 mb-6">
          Yay! Happy Valentine's Day!
        </h2>
        
        <div className="bg-white/60 backdrop-blur-md border border-rose-100 p-8 rounded-3xl shadow-xl max-w-xl mx-auto mb-8">
          <p className="text-2xl italic text-rose-800 leading-relaxed font-serif">
            {message || "You've made me the happiest person in the world, Dutee. This is just the beginning of our beautiful story."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!message && !loading && (
            <button
              onClick={generateSpecialMessage}
              className="group flex items-center gap-2 px-6 py-3 bg-white border border-rose-200 text-rose-600 rounded-full hover:bg-rose-50 transition-all hover:shadow-md"
            >
              <span>Read a special note</span>
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
            </button>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-2 text-rose-400 py-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-150" />
            </div>
          )}

          <button
            onClick={onProceed}
            className="mt-4 px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Login as Dutee
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
