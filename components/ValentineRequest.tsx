import React, { useState, useRef } from 'react';
import { Position } from '../types';

interface ValentineRequestProps {
  onAccept: () => void;
}

const ValentineRequest: React.FC<ValentineRequestProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const taunts = [
    "Wait, what?",
    "Error 404: Option Not Found",
    "Are you sure, Dutee?",
    "Nice try! 😉",
    "Mahid won't be happy...",
    "Stop that right now!",
    "I can do this all day!",
    "Click the big red one!",
    "You're testing my patience! 😂"
  ];

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 140;
    const buttonHeight = 60;
    const margin = 100;

    const maxX = containerRect.width - buttonWidth - margin;
    const maxY = containerRect.height - buttonHeight - margin;
    
    const newX = margin + Math.random() * (maxX - margin);
    const newY = margin + Math.random() * (maxY - margin);

    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
    setHoverCount(prev => prev + 1);
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full max-w-5xl min-h-[85vh] px-6 flex flex-col justify-center items-center py-20 overflow-visible"
    >
      <div className="mb-12 animate-float pointer-events-none select-none text-center pt-16">
        <div className="relative inline-block mb-12">
          <svg 
            className="mx-auto w-32 h-32 text-rose-500 drop-shadow-[0_15px_40px_rgba(244,63,94,0.45)]" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="absolute top-0 right-0 -mr-10 -mt-10 animate-ping">
            <svg className="w-14 h-14 text-rose-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
        </div>
        
        <h1 className="text-8xl md:text-[12rem] font-black text-rose-900 mb-2 tracking-tighter italic leading-none">
          Dutee
        </h1>
        <div className="flex flex-col gap-2">
            <p className="text-4xl md:text-5xl text-rose-700/90 font-serif font-bold italic">
              Will you be my Valentine?
            </p>
            <p className="text-rose-400 text-sm font-black uppercase tracking-[0.6em] mt-6">
               Choose Wisely 💖
            </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-16 min-h-[300px] w-full relative">
        <button
          onClick={onAccept}
          className="px-24 py-8 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white text-4xl font-black rounded-full shadow-[0_25px_70px_-15px_rgba(244,63,94,0.6)] transition-all hover:scale-110 active:scale-95 z-20 flex items-center gap-4 group"
        >
          <span>YES!</span>
          <svg className="w-8 h-8 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="relative">
          <button
            onMouseEnter={moveButton}
            onMouseOver={moveButton}
            onClick={moveButton}
            style={isMoved ? {
              position: 'absolute',
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              transition: 'all 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              zIndex: 50
            } : {
              position: 'relative',
              zIndex: 10
            }}
            className="px-14 py-5 border-4 border-rose-200 text-rose-300 text-2xl font-bold rounded-full hover:bg-white/10 transition-colors whitespace-nowrap bg-white/5 backdrop-blur-sm"
          >
            {isMoved ? taunts[hoverCount % taunts.length] : "No"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValentineRequest;