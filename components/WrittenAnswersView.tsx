
import React, { useState } from 'react';

interface WrittenAnswersViewProps {
  onBack: () => void;
}

const WrittenAnswersView: React.FC<WrittenAnswersViewProps> = ({ onBack }) => {
  const [answers, setAnswers] = useState({
    about: '',
    like: '',
    special: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Constructing the email body
    const emailTo = "samiulmahid.official@gmail.com";
    const subject = "Dutee's Special Answers for Mahid";
    const body = `Hi Mahid,\n\nHere are Dutee's answers from the app:\n\n1. Tell something about Mahid?\n"${answers.about}"\n\n2. Why do you like him?\n"${answers.like}"\n\n3. Why is he special to you?\n"${answers.special}"\n\nLove,\nDutee`;
    
    // Open user's email client
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative z-10 w-full max-w-xl px-6 text-center animate-in zoom-in duration-700">
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] border border-rose-100 shadow-2xl">
          <div className="text-6xl mb-6">💋</div>
          <h2 className="text-3xl font-bold text-rose-900 mb-4">Sent to My Hero!</h2>
          <p className="text-rose-800 text-lg mb-8 leading-relaxed italic">
            "knk me immediately, I'm waiting to kiss you."
          </p>
          <button
            onClick={onBack}
            className="px-10 py-3 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-2xl px-6 animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/80 backdrop-blur-xl border border-rose-100 p-8 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-3xl font-bold text-rose-900 mb-6 font-serif text-center">A Few More Things...</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-rose-900/60 mb-2 uppercase tracking-wider">Tell something about Mahid?</label>
            <textarea
              required
              value={answers.about}
              onChange={(e) => setAnswers({...answers, about: e.target.value})}
              className="w-full px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none h-24 transition-all"
              placeholder="Your heart's thoughts..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rose-900/60 mb-2 uppercase tracking-wider">Why do you like him?</label>
            <textarea
              required
              value={answers.like}
              onChange={(e) => setAnswers({...answers, like: e.target.value})}
              className="w-full px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none h-24 transition-all"
              placeholder="What makes him lovable?"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-rose-900/60 mb-2 uppercase tracking-wider">Why is he special to you?</label>
            <textarea
              required
              value={answers.special}
              onChange={(e) => setAnswers({...answers, special: e.target.value})}
              className="w-full px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none h-24 transition-all"
              placeholder="What's that unique thing?"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Send to Mahid's Heart</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default WrittenAnswersView;
