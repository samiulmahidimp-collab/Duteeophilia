
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden relative">
      {/* Persistent Stopwatch */}
      <RelationshipStopwatch />

      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-700" />
      
      {renderContent()}
    </div>
  );
};

export default App;
