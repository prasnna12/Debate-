import React, { useState } from 'react';

const Slide1_Auth = ({ language, onLogin }) => {
  const translations = {
    en: {
      tagline: 'EMPOWERING FUTURE LEADERS',
      title: 'Master the Art of Debate',
      description: 'AI Debate Pro helps students build confidence, research deep biographies, and generate stage-ready speeches in seconds.',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In to Platform',
      signUpBtn: 'Create Account',
      loginBtn: 'Log In',
      noAccount: "New to the platform? ",
      hasAccount: "Already a member? ",
    },
    hi: {
      tagline: 'भविष्य के नेताओं को सशक्त बनाना',
      title: 'वाद-विवाद की कला में महारत हासिल करें',
      description: 'AI डिबेट प्रो छात्रों को आत्मविश्वास बनाने, गहराई से जीवनी शोध करने और सेकंडों में मंच-तैयार भाषण देने में मदद करता है।',
      email: 'ईमेल',
      password: 'पासवर्ड',
      signIn: 'प्लेटफॉर्म पर साइन इन करें',
      signUpBtn: 'खाता बनाएँ',
      loginBtn: 'लॉग इन करें',
      noAccount: "प्लेटफॉर्म पर नए हैं? ",
      hasAccount: "पहले से सदस्य हैं? ",
    },
    or: {
      tagline: 'ଭବିଷ୍ୟତର ନେତାମାନଙ୍କୁ ସଶକ୍ତିକରଣ',
      title: 'ବିତର୍କ କଳାରେ ପାରଦର୍ଶିତା ଲାଭ କରନ୍ତୁ',
      description: 'AI ଡିବେଟ୍ ପ୍ରୋ ଛାତ୍ରମାନଙ୍କୁ ଆତ୍ମବିଶ୍ୱାସ ବଢ଼ାଇବା, ଗଭୀର ଜୀବନୀ ଅନୁସନ୍ଧାନ କରିବା ଏବଂ ସେକେଣ୍ଡରେ ମଞ୍ଚ-ପ୍ରସ୍ତୁତ ଭାଷଣ ପ୍ରସ୍ତୁତ କରିବାରେ ସାହାଯ୍ୟ କରେ।',
      email: 'ଇମେଲ୍',
      password: 'ପାସୱାର୍ଡ',
      signIn: 'ପ୍ଲାଟଫର୍ମରେ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ',
      signUpBtn: 'ଆକାଉଣ୍ଟ୍ ତିଆରି କରନ୍ତୁ',
      loginBtn: 'ଲଗଇନ୍',
      noAccount: "ପ୍ଲାଟଫର୍ମରେ ନୂଆ କି? ",
      hasAccount: "ପୂର୍ବରୁ ସଦସ୍ୟ ଅଛନ୍ତି କି? ",
    }
  };

  const t = translations[language] || translations['en'];
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email });
    }
  };

  return (
    <div className="premium-card" style={{ textAlign: 'center' }}>
      <div className="animate-fade-in">
        <span className="text-gradient" style={{ 
          fontSize: '0.9rem', 
          fontWeight: '900', 
          letterSpacing: '3px', 
          display: 'block',
          marginBottom: '1.5rem',
          textTransform: 'uppercase'
        }}>
          {t.tagline}
        </span>
        <h1 style={{ marginBottom: '1.5rem' }}>{t.title}</h1>
        <p style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>
          {t.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '420px', margin: '0 auto' }}>
        <input 
          type="email" 
          className="input-modern"
          style={{ marginBottom: '1.2rem' }}
          placeholder={t.email} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          className="input-modern"
          style={{ marginBottom: '2.5rem' }}
          placeholder={t.password} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.4rem' }}>
          {isLogin ? t.signIn : t.signUpBtn}
        </button>
      </form>

      <p style={{ marginTop: '2.5rem' }}>
        {isLogin ? t.noAccount : t.hasAccount}
        <span 
          className="text-gradient"
          style={{ cursor: 'pointer', fontWeight: '800', marginLeft: '0.5rem' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? t.signUpBtn : t.loginBtn}
        </span>
      </p>
    </div>
  );
};

export default Slide1_Auth;
