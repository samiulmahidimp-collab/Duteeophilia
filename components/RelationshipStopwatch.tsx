
import React, { useState, useEffect } from 'react';

const RelationshipStopwatch: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [duration, setDuration] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Relationship start date: Sept 8, 2024
    const startDate = new Date('2024-09-08T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      if (diff <= 0) {
        setDuration({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setDuration({ 
        months: Math.max(0, months), 
        days: Math.max(0, days), 
        hours, 
        minutes, 
        seconds 
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed top-6 right-6 z-[100] transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
      <div 
        className="group bg-white/80 backdrop-blur-xl border border-rose-100 px-6 py-3 rounded-3xl shadow-2xl shadow-rose-200/50 flex flex-col items-end gap-1 cursor-pointer hover:bg-white transition-colors"
        onClick={() => setIsVisible(false)}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="relative">
            <svg className="w-4 h-4 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-rose-500 whitespace-nowrap">Our Love Journey</span>
        </div>
        
        <div className="flex gap-3 text-rose-900 font-mono font-bold text-sm">
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[7px] uppercase font-bold">Mo</span>
            <span>{duration.months}</span>
          </div>
          <div className="w-px h-4 bg-rose-100 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[7px] uppercase font-bold">Day</span>
            <span>{duration.days}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[7px] uppercase font-bold">Hr</span>
            <span>{duration.hours}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[7px] uppercase font-bold">Min</span>
            <span>{duration.minutes}</span>
          </div>
          <div className="flex flex-col items-center w-6">
            <span className="text-rose-400 text-[7px] uppercase font-bold">Sec</span>
            <span className="text-rose-600 tabular-nums">{duration.seconds}</span>
          </div>
        </div>
      </div>
      {!isVisible && (
        <button 
          onClick={() => setIsVisible(true)}
          className="fixed top-6 right-2 bg-rose-500/10 hover:bg-rose-500/20 p-2 rounded-full transition-all text-rose-400 pointer-events-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 19l-7-7 7-7" /></svg>
        </button>
      )}
    </div>
  );
};

export default RelationshipStopwatch;
