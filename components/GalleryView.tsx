
import React from 'react';

interface GalleryViewProps {
  onBack: () => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ onBack }) => {
  const folderUrl = "https://drive.google.com/drive/folders/1iJHuAlkQ53n_D298GH-HCjpRWDE_F2Az";

  return (
    <div className="relative z-10 w-full max-w-4xl px-6 text-center animate-in zoom-in-95 duration-1000">
      <div className="bg-white/40 backdrop-blur-lg border border-white/60 p-10 rounded-[3rem] shadow-2xl overflow-hidden relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-rose-400 hover:text-rose-600 flex items-center gap-1 font-bold uppercase text-xs tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg> Dashboard
        </button>

        <div className="mb-10 mt-8">
          <span className="inline-block px-4 py-1 bg-rose-500 text-white text-[10px] uppercase tracking-[0.3em] rounded-full mb-6 font-bold shadow-sm">
            Authenticated: Dutee
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-rose-900 mb-6 font-serif">
            Our Secret Moments
          </h1>
          <p className="text-rose-800/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Every moment with you is a treasure, Dutee. I've collected our memories here just for us. You are the most beautiful part of my life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <a 
              href={folderUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block w-full bg-white px-8 py-10 rounded-[2rem] border border-rose-100 transition-all hover:border-rose-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rose-900 mb-2">Open Our Gallery</h3>
                <p className="text-rose-400 text-sm">Click to see the pictures I've saved for you</p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rose-100/50 flex flex-col items-center gap-4">
          <div className="text-rose-900/40 text-xs uppercase tracking-widest font-bold">
            Forever & Always
          </div>
          <div className="flex gap-4">
             <div className="w-1 h-1 bg-rose-300 rounded-full animate-ping" />
             <div className="w-1 h-1 bg-rose-300 rounded-full animate-ping delay-300" />
             <div className="w-1 h-1 bg-rose-300 rounded-full animate-ping delay-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
