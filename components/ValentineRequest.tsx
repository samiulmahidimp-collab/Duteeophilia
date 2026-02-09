
import React, { useState, useRef, useEffect } from 'react';
import { Position } from '../types';

interface ValentineRequestProps {
  onAccept: () => void;
}

const ValentineRequest: React.FC<ValentineRequestProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 52;
    const margin = 50;

    // Calculate a random position within the container, avoiding the edges
    const maxX = containerRect.width - buttonWidth - margin;
    const maxY = containerRect.height - buttonHeight - margin;
    
    const newX = margin + Math.random() * (maxX - margin);
    const newY = margin + Math.random() * (maxY - margin);

    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full max-w-4xl h-[70vh] px-6 flex flex-col justify-center items-center"
    >
      <div className="mb-12 animate-float pointer-events-none select-none text-center">
        <div className="relative inline-block">
          <svg 
            className="mx-auto w-24 h-24 text-rose-500 mb-6 drop-shadow-lg" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="absolute top-0 right-0 -mr-4 -mt-4 animate-ping">
            <svg className="w-8 h-8 text-rose-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-rose-900 mb-4 tracking-tighter italic">
          Dutee
        </h1>
        <p className="text-2xl md:text-3xl text-rose-700/90 font-serif font-medium">
          Will you be my Valentine?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[200px] w-full relative">
        <button
          ref={yesButtonRef}
          onClick={onAccept}
          className="px-16 py-5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-2xl font-bold rounded-full shadow-2xl shadow-rose-200 transition-all hover:scale-110 active:scale-95 z-20"
        >
          Yes, I will!
        </button>

        <button
          onMouseEnter={moveButton}
          onMouseOver={moveButton}
          onClick={moveButton}
          style={isMoved ? {
            position: 'absolute',
            left: `${noButtonPos.x}px`,
            top: `${noButtonPos.y}px`,
            transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 50
          } : {
            position: 'relative',
            zIndex: 10
          }}
          className="px-12 py-4 border-2 border-rose-300 text-rose-500 text-xl font-semibold rounded-full hover:bg-white/50 backdrop-blur-sm transition-colors whitespace-nowrap bg-white/20"
        >
          No
        </button>
      </div>
      
      <div className="mt-20 text-rose-400/50 text-sm font-medium tracking-widest uppercase">
        Clicking 'No' is not an option
      </div>
    </div>
  );
};

export default ValentineRequest;
