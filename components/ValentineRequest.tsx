
import React, { useState, useRef } from 'react';
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
    if (!containerRef.current || !yesButtonRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const yesRect = yesButtonRef.current.getBoundingClientRect();
    
    // Relative coordinates of Yes button within the container
    const relativeYes = {
      left: yesRect.left - containerRect.left,
      top: yesRect.top - containerRect.top,
      right: yesRect.right - containerRect.left,
      bottom: yesRect.bottom - containerRect.top,
    };

    const buttonWidth = 120;
    const buttonHeight = 50;
    const paddingAroundYes = 100; // Extra buffer to stay far away from the Yes button
    const screenMargin = 40; // Stay away from the container edges to prevent clipping

    let newX = 0, newY = 0;
    let isValid = false;
    let attempts = 0;

    // Calculate maximum available space within the container
    const maxX = containerRect.width - buttonWidth - screenMargin;
    const maxY = containerRect.height - buttonHeight - screenMargin;
    const minX = screenMargin;
    const minY = screenMargin;

    // Safety check for small containers
    if (maxX <= minX || maxY <= minY) {
      // If container is too small, just teleport to a random edge
      newX = Math.random() > 0.5 ? minX : maxX;
      newY = Math.random() > 0.5 ? minY : maxY;
      isValid = true;
    }

    while (!isValid && attempts < 100) {
      newX = minX + Math.random() * (maxX - minX);
      newY = minY + Math.random() * (maxY - minY);

      // Collision detection with Yes button zone
      const overlapsYes = !(
        newX + buttonWidth < relativeYes.left - paddingAroundYes ||
        newX > relativeYes.right + paddingAroundYes ||
        newY + buttonHeight < relativeYes.top - paddingAroundYes ||
        newY > relativeYes.bottom + paddingAroundYes
      );

      if (!overlapsYes) {
        isValid = true;
      }
      attempts++;
    }

    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full max-w-3xl h-[80vh] px-6 py-12 text-center flex flex-col justify-center items-center overflow-visible"
    >
      <div className="mb-12 animate-float pointer-events-none select-none">
        <svg 
          className="mx-auto w-24 h-24 text-rose-500 mb-6" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <h1 className="text-5xl md:text-7xl font-bold text-rose-900 mb-4 tracking-tight">
          Dutee
        </h1>
        <p className="text-xl md:text-2xl text-rose-700/80 font-medium">
          Will you be my valentine?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-[150px] w-full relative">
        <button
          ref={yesButtonRef}
          onClick={onAccept}
          className="px-12 py-4 bg-rose-600 hover:bg-rose-700 text-white text-xl font-semibold rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 z-10"
        >
          Yes
        </button>

        <button
          onMouseEnter={moveButton}
          onMouseOver={moveButton}
          onClick={moveButton}
          style={isMoved ? {
            position: 'absolute',
            left: `${noButtonPos.x}px`,
            top: `${noButtonPos.y}px`,
            transition: 'all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 50
          } : {
            position: 'relative',
            zIndex: 5
          }}
          className="px-12 py-4 border-2 border-rose-300 text-rose-600 text-xl font-semibold rounded-full hover:bg-rose-50 transition-colors whitespace-nowrap"
        >
          No
        </button>
      </div>
      
      {/* Visual aid to show boundary (invisible) */}
      <div className="absolute inset-0 pointer-events-none border border-transparent" />
    </div>
  );
};

export default ValentineRequest;
