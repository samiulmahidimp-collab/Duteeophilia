import React, { useState } from 'react';
import { AppState } from './types';
import ValentineRequest from './components/ValentineRequest';
import SuccessView from './components/SuccessView';
import LoginForm from './components/LoginForm';
import GalleryView from './components/GalleryView';
import PostLoginChoice from './components/PostLoginChoice';
import QuizView from './components/QuizView';
import WrittenAnswersView from './components/WrittenAnswersView';
import RelationshipStopwatch from './components/RelationshipStopwatch';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.ASKING);

  const renderContent = () => {
    switch (state) {
      case AppState.ASKING:
        return <ValentineRequest onAccept={() => setState(AppState.CELEBRATING)} />;
      case AppState.CELEBRATING:
        return <SuccessView onProceed={() => setState(AppState.LOGGING_IN)} />;
      case AppState.LOGGING_IN:
        return <LoginForm onLoginSuccess={() => setState(AppState.CHOICE)} />;
      case AppState.CHOICE:
        return (
          <PostLoginChoice 
            onSelectGallery={() => setState(AppState.GALLERY)} 
            onSelectQuiz={() => setState(AppState.QUIZ)} 
          />
        );
      case AppState.GALLERY:
        return <GalleryView onBack={() => setState(AppState.CHOICE)} />;
      case AppState.QUIZ:
        return <QuizView 
          onBack={() => setState(AppState.CHOICE)} 
          onFinished={() => setState(AppState.WRITTEN_ANSWERS)}
        />;
      case AppState.WRITTEN_ANSWERS:
        return <WrittenAnswersView onBack={() => setState(AppState.CHOICE)} />;
      default:
        return <ValentineRequest onAccept={() => setState(AppState.CELEBRATING)} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden relative selection:bg-rose-200 selection:text-rose-900">
      <RelationshipStopwatch />

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="absolute inset-0 opacity-[0.03] flex flex-wrap gap-20 p-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <svg key={i} className={`w-8 h-8 text-rose-900 animate-float`} style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${5 + Math.random() * 5}s` }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 w-full flex justify-center items-center px-4 pb-12 overflow-visible">
        {renderContent()}
      </div>

      <div className="fixed bottom-8 left-8 text-left pointer-events-none z-50">
        <p className="text-[11px] uppercase tracking-[0.4em] font-semibold text-rose-300/80">
          Made with Love for <span className="text-rose-400 font-bold">Dutee</span>
        </p>
      </div>
    </div>
  );
};

export default App;