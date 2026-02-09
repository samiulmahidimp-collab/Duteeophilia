
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
    const startDate = new Date('2025-09-08T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      // If the date is in the future, we show 0 or handle it gracefully
      if (diff <= 0) {
        setDuration({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate Months and Days using Calendar logic for better human readability
      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      let days = now.getDate() - startDate.getDate();

      // Adjust months if current day is before start day in the month
      if (days < 0) {
        months -= 1;
        // Get number of days in the previous month to "borrow" for correct day count
        const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
      }

      // Calculate Hours, Minutes, Seconds using absolute difference remainder
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <div className="bg-white/80 backdrop-blur-md border border-rose-100 px-6 py-2 rounded-full shadow-lg shadow-rose-100/30 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-400 whitespace-nowrap hidden sm:inline">Together For</span>
        </div>
        
        <div className="flex gap-3 text-rose-900 font-mono font-bold text-sm">
          <div className="flex flex-col items-center">
            <span>{duration.months}mo</span>
          </div>
          <div className="flex flex-col items-center border-l border-rose-100 pl-3">
            <span>{duration.days}d</span>
          </div>
          <div className="flex flex-col items-center">
            <span>{duration.hours}h</span>
          </div>
          <div className="flex flex-col items-center">
            <span>{duration.minutes}m</span>
          </div>
          <div className="flex flex-col items-center w-6">
            <span>{duration.seconds}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipStopwatch;
