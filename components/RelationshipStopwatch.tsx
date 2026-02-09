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
    // Relationship start date: Sept 8, 2025
    const startDate = new Date('2025-09-08T00:00:00');

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
    <div className="fixed top-4 right-4 z-[100] pointer-events-none scale-90 md:scale-100 origin-top-right">
      <div className="bg-white/95 backdrop-blur-3xl border border-rose-100 px-6 py-4 rounded-[2rem] shadow-xl flex flex-col items-end gap-2 pointer-events-auto">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-rose-600 whitespace-nowrap">Relationship Age</span>
        </div>
        
        <div className="flex gap-4 text-rose-950 font-mono font-black text-2xl">
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[8px] uppercase font-bold tracking-widest mb-1">Mo</span>
            <span className="tabular-nums">{duration.months}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[8px] uppercase font-bold tracking-widest mb-1">Day</span>
            <span className="tabular-nums">{duration.days}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[8px] uppercase font-bold tracking-widest mb-1">Hr</span>
            <span className="tabular-nums">{duration.hours}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 text-[8px] uppercase font-bold tracking-widest mb-1">Min</span>
            <span className="tabular-nums">{duration.minutes}</span>
          </div>
          <div className="flex flex-col items-center w-10">
            <span className="text-rose-400 text-[8px] uppercase font-bold tracking-widest mb-1">Sec</span>
            <span className="text-rose-600 tabular-nums">{duration.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipStopwatch;