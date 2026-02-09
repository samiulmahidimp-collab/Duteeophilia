
import React from 'react';

interface PostLoginChoiceProps {
  onSelectGallery: () => void;
  onSelectQuiz: () => void;
}

const PostLoginChoice: React.FC<PostLoginChoiceProps> = ({ onSelectGallery, onSelectQuiz }) => {
  return (
    <div className="relative z-10 w-full max-w-4xl px-6 text-center animate-in fade-in zoom-in duration-700">
      <h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4 font-serif">Welcome Home, Dutee</h2>
      <p className="text-rose-600/70 mb-12 text-lg">What would you like to explore today?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Gallery Card */}
        <button 
          onClick={onSelectGallery}
          className="group relative bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-rose-100 shadow-xl transition-all hover:scale-105 hover:shadow-2xl text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg className="w-24 h-24 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
          </div>
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-rose-900 mb-2">Picture Vault</h3>
          <p className="text-rose-500/70 text-sm">A collection of our most precious memories and secret snapshots.</p>
        </button>

        {/* Quiz Card */}
        <button 
          onClick={onSelectQuiz}
          className="group relative bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-rose-100 shadow-xl transition-all hover:scale-105 hover:shadow-2xl text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg className="w-24 h-24 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.937 7.937 0 0112 4c1.232 0 2.384.279 3.414.779A1 1 0 0017 5.681v9.204a1 1 0 01-1.414.914 5.937 5.937 0 00-4.586 0A1 1 0 0010 14.885V5.82a1 1 0 00-.586-.914 5.937 5.937 0 00-4.586 0A1 1 0 003 5.82v9.204a1 1 0 01-1.414.914A7.937 7.937 0 015 15c1.232 0 2.384.279 3.414.779A1 1 0 0010 14.885V4.804z" /></svg>
          </div>
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-rose-900 mb-2">Mahid Quiz</h3>
          <p className="text-rose-500/70 text-sm">How well do you know your favorite person? 20 questions await!</p>
        </button>
      </div>
    </div>
  );
};

export default PostLoginChoice;
