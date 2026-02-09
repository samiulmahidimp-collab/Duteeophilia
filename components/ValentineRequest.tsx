import React, { useState, useRef, useEffect } from 'react';
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
    "Error 404: No",
    "Are you sure, Dutee?",
    "Nice try! 😉",
    "Mahid is watching...",
    "Stop that!",
    "I'm faster than you!",
    "Click the RED one!",
    "Testing my patience? 😂"
  ];

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 50;
    const padding = 20;

    // Calculate bounds relative to the container
    const maxX = containerRect.width - buttonWidth - padding;
    const maxY = containerRect.height - buttonHeight - padding;
    
    const newX = padding + Math.random() * (maxX - padding);
    const newY = padding + Math.random() * (maxY - padding);

    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
    setHoverCount(prev => prev + 1);
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full max-w-4xl min-h-[70vh] px-4 flex flex-col justify-center items-center py-10 overflow-hidden bg-white/20 backdrop-blur-sm rounded-[3rem] border border-white/40 shadow-xl"
    >
      {/* Header Section */}
      <div className="mb-8 animate-float pointer-events-none select-none text-center pt-4">
        <div className="relative inline-block mb-6">
          <svg 
            className="mx-auto w-20 h-20 text-rose-500 drop-shadow-lg" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-rose-900 mb-2 tracking-tighter italic leading-tight">
          Dutee
        </h1>
        <div className="flex flex-col gap-1">
            <p className="text-2xl md:text-3xl text-rose-700 font-serif font-bold italic">
              Will you be my Valentine?
            </p>
            <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">
               A very important decision 💖
            </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-[180px] w-full relative">
        <button
          onClick={onAccept}
          className="px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-2xl font-black rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 z-20 flex items-center gap-3 group"
        >
          <span>YES!</span>
          <svg className="w-6 h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="relative w-32 h-14 flex items-center justify-center">
          <button
            onMouseEnter={moveButton}
            onMouseOver={moveButton}
            onClick={moveButton}
            style={isMoved ? {
              position: 'fixed',
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              zIndex: 50
            } : {
              position: 'relative',
              zIndex: 10
            }}
            className="px-8 py-3 border-2 border-rose-200 text-rose-400 text-lg font-bold rounded-full hover:bg-white transition-all whitespace-nowrap bg-white/20 backdrop-blur-sm shadow-sm"
          >
            {isMoved ? taunts[hoverCount % taunts.length] : "No"}
          </button>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="mt-8 flex gap-3 opacity-20">
        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce delay-75" />
        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce delay-150" />
        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce delay-225" />
      </div>
    </div>
  );
};

export default ValentineRequest;