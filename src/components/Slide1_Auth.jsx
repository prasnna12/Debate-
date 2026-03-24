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
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({ email: 'google.user@gmail.com', name: 'Google User', isGoogle: true });
      setLoading(false);
    }, 1500);
  };
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
<<<<<<< HEAD
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
=======
      setLoading(true);
      setTimeout(() => {
        onLogin({ email });
        setLoading(false);
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="premium-card" style={{ textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
        <p className="text-gradient" style={{ marginTop: '2rem', fontWeight: '800', fontSize: '1.2rem' }}>Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="premium-card animate-scale-in" style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      display: 'grid', 
      gridTemplateColumns: '1.2fr 1fr', 
      gap: '4rem',
      alignItems: 'center',
      padding: '4rem'
    }}>
      <div className="auth-hero animate-fade-in" style={{ textAlign: 'left' }}>
        <span className="text-gradient" style={{ 
          fontSize: '0.9rem', 
          fontWeight: '900', 
          letterSpacing: '5px', 
          display: 'block',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          opacity: 0.8
        }}>
          {t.tagline}
        </span>
        <h1 style={{ fontSize: '3.8rem', marginBottom: '2rem', lineHeight: '1.1', letterSpacing: '-2px' }}>
          {t.title.split(' ').map((word, i) => i === 3 ? <span key={i} className="text-gradient">{word} </span> : word + ' ')}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '100%' }}>
          {t.description}
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', opacity: 0.6 }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>500+</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Leaders Formed</div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>50k+</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Speeches Generated</div>
            </div>
        </div>
      </div>

      <div className="auth-form-container glass-panel animate-scale-in" style={{ padding: '3rem', background: 'rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '2.5rem', textAlign: 'center' }}>{isLogin ? t.loginBtn : t.signUpBtn}</h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>{t.email}</label>
            <input 
              type="email" 
              className="input-modern"
              style={{ padding: '1.1rem 1.5rem' }}
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>{t.password}</label>
            <input 
              type="password" 
              className="input-modern"
              style={{ padding: '1.1rem 1.5rem' }}
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.1rem' }}>
            {isLogin ? t.signIn : t.signUpBtn} ➔
          </button>

          <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.3 }}>
            <hr style={{ flex: 1, border: '0.5px solid var(--text-muted)' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: '900' }}>OR CONNECT VIA</span>
            <hr style={{ flex: 1, border: '0.5px solid var(--text-muted)' }} />
          </div>

          <button type="button" className="btn-google" onClick={handleGoogleLogin} style={{ width: '100%', padding: '0.9rem', borderRadius: '15px' }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '18px' }} />
            Google Workspace
          </button>

          <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {isLogin ? t.noAccount : t.hasAccount}
            <span 
              className="text-gradient"
              style={{ cursor: 'pointer', fontWeight: '800', borderBottom: '1px solid transparent' }}
              onMouseEnter={(e) => e.target.style.borderBottom = '1px solid var(--primary)'}
              onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? t.signUpBtn : t.loginBtn}
            </span>
          </p>
        </form>
      </div>
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
    </div>
  );
};

export default Slide1_Auth;
