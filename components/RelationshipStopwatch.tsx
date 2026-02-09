import React, { useState, useEffect } from 'react';

const RelationshipStopwatch: React.FC = () => {
  const [duration, setDuration] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Relationship start date updated to Sept 8, 2025
    const startDate = new Date('2025-09-08T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      // If the date is in the future, we show 0 or could show a countdown. 
      // Keeping it as 0 until the date arrives as requested for a "stopwatch".
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
    <div className="fixed top-6 right-6 z-[100] pointer-events-none">
      <div className="bg-white/95 backdrop-blur-3xl border-2 border-rose-200 px-8 py-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.4)] flex flex-col items-end gap-3 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="w-8 h-8 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-30"></div>
          </div>
          <span className="text-[12px] uppercase tracking-[0.5em] font-black text-rose-600 whitespace-nowrap">Our Love Story</span>
        </div>
        
        <div className="flex gap-6 text-rose-950 font-mono font-black text-4xl">
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">Months</span>
            <span className="tabular-nums">{duration.months}</span>
          </div>
          <div className="w-px h-12 bg-rose-100 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">Days</span>
            <span className="tabular-nums">{duration.days}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">Hrs</span>
            <span className="tabular-nums">{duration.hours}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">Min</span>
            <span className="tabular-nums">{duration.minutes}</span>
          </div>
          <div className="flex flex-col items-center w-16">
            <span className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-1">Sec</span>
            <span className="text-rose-600 tabular-nums">{duration.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipStopwatch;