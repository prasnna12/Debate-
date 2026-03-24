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
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
          {currentSlide > 1 ? (
            <button className="btn-ghost" onClick={prevSlide} style={{ padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.9rem' }}>
              ← {t.back}
            </button>
          ) : (
            <div className="nav-logo" onClick={() => setCurrentSlide(1)}>AI Debate Pro</div>
          )}
        </div>

        {currentSlide > 1 && (
          <div className="nav-logo" style={{ flex: 1, textAlign: 'center' }} onClick={() => setCurrentSlide(user ? 2 : 1)}>
            AI Debate Pro
          </div>
        )}

        <div className="nav-actions" style={{ flex: 1, justifyContent: 'flex-end' }}>
          {user ? (
            <div className="glass-panel" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.5rem 1rem', 
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--grad-btn)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
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

      {/* Slide Container */}
      <div className="slide-container">
        <div className={`slide ${currentSlide === 1 ? 'active' : 'prev'}`}>
          <Slide1_Auth onLogin={handleLogin} language={language} setLanguage={setLanguage} />
        </div>

        <div className={`slide ${currentSlide === 2 ? 'active' : currentSlide < 2 ? '' : 'prev'}`}>
          <Slide2_Topic onGenerate={handleTopicSubmit} language={language} />
        </div>

        <div className={`slide ${currentSlide === 3 ? 'active' : currentSlide < 3 ? '' : 'prev'}`}>
          <Slide3_Bio 
            topic={topic} 
            bioData={bioData} 
            isActive={currentSlide === 3}
            onNext={() => setCurrentSlide(4)} 
            language={language}
          />
        </div>

        <div className={`slide ${currentSlide === 4 ? 'active' : currentSlide < 4 ? '' : 'prev'}`}>
          <Slide4_Debate 
            topic={topic} 
            bioData={bioData} 
            isActive={currentSlide === 4}
            language={language}
          />
        </div>
      </div>

      <div className="branding-footer" style={{ 
        padding: '3rem', 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        letterSpacing: '4px', 
        fontWeight: '900', 
        color: 'var(--text-muted)',
        opacity: 0.4,
        textTransform: 'uppercase'
      }}>
        @ AI DEBATE PLATFORM 2024 • PREMIUM STAGE ASSISTANT
      </div>
    </div>
  );
};

export default App;
