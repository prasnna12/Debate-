import React, { useState } from 'react';
import Slide1_Auth from './components/Slide1_Auth';
import Slide2_Topic from './components/Slide2_Topic';
import Slide3_Bio from './components/Slide3_Bio';
import Slide4_Debate from './components/Slide4_Debate';
import './index.css';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState('');
  const [bioData, setBioData] = useState(null);
  const [language, setLanguage] = useState('en');

  const prevSlide = () => {
    if (currentSlide > 1) setCurrentSlide(currentSlide - 1);
  };

  const handleTopicSubmit = (t, b) => {
    setTopic(t);
    setBioData(b);
    setCurrentSlide(3);
  };

  const handleLogin = (u) => {
    setUser(u);
    setCurrentSlide(2);
  };

  const t = {
    en: { back: 'Back', logout: 'Logout', login: 'Login', signup: 'Sign Up' },
    hi: { back: 'पीछे', logout: 'लॉगआउट', login: 'लॉगिन', signup: 'साइन अप' },
    or: { back: 'ପଛକୁ', logout: 'ଲଗଆଉଟ୍', login: 'ଲଗଇନ୍', signup: 'ସାଇନ୍ ଅପ୍' }
  }[language] || { back: 'Back', logout: 'Logout', login: 'Login', signup: 'Sign Up' };

  return (
    <div className="app-container animate-fade-in">
      {/* Premium Navbar */}
      <nav className="premium-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
          {currentSlide > 1 && (
            <button className="btn-ghost" onClick={prevSlide} style={{ padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.9rem' }}>
              ← {t.back}
            </button>
          )}
          {currentSlide === 1 && <div className="logo-brand">AI Debate Pro</div>}
        </div>

        {currentSlide > 1 && (
          <div className="logo-brand" style={{ flex: 1, justifyContent: 'center', display: 'flex' }} onClick={() => setCurrentSlide(user ? 2 : 1)}>
            AI Debate Pro
          </div>
        )}

        <div className="nav-actions" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          {user ? (
            <div className="glass-panel" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.5rem 1rem', 
              borderRadius: '16px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--grad-btn)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', color: 'white' }}>
                {user.isGoogle ? 'G' : user.email[0].toUpperCase()}
              </div>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'white' }}>{user.name || user.email.split('@')[0]}</span>
              <button 
                className="btn-ghost" 
                onClick={() => { setUser(null); setCurrentSlide(1); }} 
                style={{ padding: '0.3rem 0.7rem', borderRadius: '10px', fontSize: '0.75rem', border: 'none' }}
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-ghost" style={{ border: 'none' }} onClick={() => setCurrentSlide(1)}>{t.login}</button>
              <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.85rem' }} onClick={() => setCurrentSlide(1)}>
                {t.signup}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {currentSlide === 1 && (
          <Slide1_Auth onLogin={handleLogin} language={language} setLanguage={setLanguage} />
        )}

        {currentSlide === 2 && (
          <Slide2_Topic onGenerate={handleTopicSubmit} language={language} />
        )}

        {currentSlide === 3 && (
          <Slide3_Bio 
            topic={topic} 
            bioData={bioData} 
            isActive={currentSlide === 3}
            onNext={() => setCurrentSlide(4)} 
            language={language}
          />
        )}

        {currentSlide === 4 && (
          <Slide4_Debate 
            topic={topic} 
            bioData={bioData} 
            isActive={currentSlide === 4}
            language={language}
          />
        )}
      </main>
    </div>
  );
};

export default App;
