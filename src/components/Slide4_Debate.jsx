import React, { useState, useEffect, useMemo } from 'react';

const Slide4_Debate = ({ topic, bioData, language, isActive }) => {
  const [length, setLength] = useState(250);
  const [selectedDebate, setSelectedDebate] = useState(0);
  const [aiContent, setAiContent] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showStageMode, setShowStageMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0); // 0 = off, 1 = slow, 2 = med, 3 = fast

  const t = {
    en: { title: "Stage Ready Speech", intro: "Opening", arg: "Strong Arguments", counter: "Critical View", conclusion: "Closing", quotes: "Impactful Quotes", stageMode: "Enter Stage Mode", exitStage: "Exit Stage Mode", loading: "AI is crafting your speech...", words: "Words", debate: "Variation", listen: "Listen", stop: "Stop", scroll: "Auto-Scroll", speed: "Speed" },
    hi: { title: "मंच तैयार भाषण", intro: "प्रारंभ", arg: "मजबूत तर्क", counter: "समीक्षा", conclusion: "निष्कर्ष", quotes: "प्रभावशाली उद्धरण", stageMode: "स्टेज मोड", exitStage: "स्टेज मोड से बाहर", loading: "AI आपका भाषण तैयार कर रहा है...", words: "शब्द", debate: "विविधता", listen: "सुनें", stop: "रोकें", scroll: "ऑटो-स्क्रॉल", speed: "गति" },
    or: { title: "ମଞ୍ଚ ପ୍ରସ୍ତୁତ ଭାଷଣ", intro: "ପ୍ରାରମ୍ଭ", arg: "ଶକ୍ତିଶାଳୀ ଯୁକ୍ତି", counter: "ସମୀକ୍ଷା", conclusion: "ଉପସଂହାର", quotes: "ପ୍ରଭାବଶାଳୀ ଉଦ୍ଧୃତି", stageMode: "ଷ୍ଟେଜ୍ ମୋଡ୍", exitStage: "ଷ୍ଟେଜ୍ ରୁ ବାହାରନ୍ତୁ", loading: "AI ଆପଣଙ୍କ ଭାଷଣ ପ୍ରସ୍ତୁତ କରୁଛି...", words: "ଶବ୍ଦ", debate: "ବିବିଧତା", listen: "ଶୁଣନ୍ତୁ", stop: "ବନ୍ଦ କରନ୍ତୁ", scroll: "ଅଟୋ-ସ୍କ୍ରୋଲ୍", speed: "ଗତି" }
  }[language] || { title: "Stage Ready Speech", loading: "AI is crafting your speech...", stageMode: "Enter Stage Mode", listen: "Listen", stop: "Stop" };

  useEffect(() => {
    if (isActive && topic) {
      const fetchDebate = async () => {
        setAiLoading(true);
        try {
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          const prompt = `Generate a structured debate speech for ${topic} in ${language}. Tone: Oratorical. Word count: ${length}. Version: ${selectedDebate}. JSON Keys: intro, arg, counter, conclusion, quotes (array).`;
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { response_mime_type: "application/json" } })
          });
          const data = await res.json();
          setAiContent(JSON.parse(data.candidates[0].content.parts[0].text));
        } catch (e) {
          setAiContent({ intro: "Respected audience...", arg: "Their impact is undeniable...", counter: "However, challenges exist...", conclusion: "In summary, a true leader. Thank you.", quotes: ["Leadership is action, not position."] });
        } finally { setAiLoading(false); }
      };
      fetchDebate();
    }
  }, [isActive, topic, language, length, selectedDebate]);

  // TTS Logic
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!aiContent) return;

    const fullSpeech = `${aiContent.intro}. ${aiContent.arg}. ${aiContent.counter}. ${aiContent.conclusion}. ${aiContent.quotes.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    
    // Attempt to set voice based on language
    const voices = window.speechSynthesis.getVoices();
    const langMap = { en: 'en-US', hi: 'hi-IN', or: 'hi-IN' }; // Fallback Odia to Hindi if not available
    utterance.lang = langMap[language] || 'en-US';
    
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Auto-scroll Logic for Stage Mode
  useEffect(() => {
    let interval;
    if (showStageMode && scrollSpeed > 0) {
      const track = document.querySelector('.teleprompter-track');
      if (track) {
        const speedMap = [0, 1, 2, 4]; // pixels per frame
        interval = setInterval(() => {
          track.scrollTop += speedMap[scrollSpeed];
        }, 30);
      }
    }
    return () => clearInterval(interval);
  }, [showStageMode, scrollSpeed]);

  if (!aiContent && !aiLoading) return null;

  return (
    <div className="premium-card" style={{ maxWidth: '1100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
        <div>
          <h2 style={{ fontSize: '3.2rem', marginBottom: '0.6rem' }} className="text-gradient">{t.title}</h2>
          <p style={{ fontSize: '1.2rem' }}>Professional debate for: <strong style={{ color: 'var(--primary)' }}>{topic}</strong></p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={`btn-ghost ${isSpeaking ? 'active' : ''}`} onClick={toggleSpeech} style={{ padding: '0.8rem 1.6rem', borderColor: isSpeaking ? 'var(--primary)' : '#e2e8f0', color: isSpeaking ? 'var(--primary)' : 'var(--text-muted)' }}>
            {isSpeaking ? `⏹ ${t.stop}` : `🔊 ${t.listen}`}
          </button>
          <button className="btn-primary" onClick={() => setShowStageMode(true)} style={{ background: 'var(--secondary)', padding: '1.2rem 2.2rem', fontSize: '1.1rem' }}>
            🎬 {t.stageMode}
          </button>
        </div>
      </div>

      <div className="debate-tabs" style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          {[0, 1, 2].map(i => (
            <button key={i} className={`debate-tab ${selectedDebate === i ? 'active' : ''}`} onClick={() => setSelectedDebate(i)}>
              {t.debate} {i + 1}
            </button>
          ))}
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.08)', margin: '0 1.5rem' }}></div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          {[100, 250, 500].map(v => (
            <button key={v} className={`debate-tab ${length === v ? 'active' : ''}`} onClick={() => setLength(v)}>
              {v} {t.words}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-content" style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '2.5rem' }}>
        {aiLoading ? (
          <div className="loading-overlay" style={{ minHeight: '400px' }}>
            <div className="spinner"></div>
            <p style={{ fontWeight: '800', fontSize: '1.2rem' }} className="text-gradient">{t.loading}</p>
          </div>
        ) : (
          aiContent && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <section>
                <h4 style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: '900' }}>{t.intro}</h4>
                <p style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.4' }}>{aiContent.intro}</p>
              </section>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
                <section>
                  <h4 style={{ color: 'var(--secondary)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: '900' }}>{t.arg}</h4>
                  <p style={{ lineHeight: '1.9', fontSize: '1.15rem' }}>{aiContent.arg}</p>
                </section>
                <section>
                  <h4 style={{ color: 'var(--text-muted)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: '900' }}>{t.counter}</h4>
                  <p style={{ fontStyle: 'italic', opacity: 0.9, lineHeight: '1.9', fontSize: '1.15rem', borderLeft: '4px solid #e2e8f0', paddingLeft: '2rem' }}>{aiContent.counter}</p>
                </section>
              </div>

              <section>
                <h4 style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: '900' }}>{t.conclusion}</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', background: 'rgba(79, 70, 229, 0.04)', padding: '2.5rem', borderRadius: '28px' }}>{aiContent.conclusion}</p>
              </section>

              {aiContent.quotes?.length > 0 && (
                <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(124, 58, 237, 0.1)' }}>
                  <h4 style={{ color: 'var(--secondary)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: '900' }}>{t.quotes}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {aiContent.quotes.map((q, i) => (
                      <p key={i} style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: '700', color: '#1e293b' }}>
                        <span style={{ fontSize: '3rem', color: 'var(--secondary)', opacity: 0.2, lineHeight: 0, verticalAlign: 'middle', marginRight: '0.5rem' }}>"</span>
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {showStageMode && (
        <div className="stage-overlay">
          <div className="stage-controls">
            <button className="btn-exit" onClick={() => setShowStageMode(false)}>✕ {t.exitStage}</button>
            <div className="stage-meta" style={{ display: 'flex', gap: '2rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', alignItems: 'center' }}>
              <span>{topic}</span>
              <span style={{ opacity: 0.2 }}>|</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1.5rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{t.scroll}:</span>
                {[0, 1, 2, 3].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setScrollSpeed(s)}
                    style={{ 
                      background: scrollSpeed === s ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                      color: scrollSpeed === s ? 'black' : 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.3rem 0.8rem',
                      cursor: 'pointer',
                      fontWeight: '800',
                      fontSize: '0.8rem'
                    }}
                  >
                    {s === 0 ? 'OFF' : s === 1 ? 'S' : s === 2 ? 'M' : 'F'}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-exit" onClick={toggleSpeech} style={{ background: isSpeaking ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)', borderColor: isSpeaking ? '#ef4444' : 'rgba(255, 255, 255, 0.2)' }}>
              {isSpeaking ? '⏹ STOP' : '🔊 LISTEN'}
            </button>
          </div>
          <div className="teleprompter-track">
            <div className="teleprompter-content">
              <div className="teleprompter-section"><span className="section-label">{t.intro}</span><p>{aiContent?.intro}</p></div>
              <div className="teleprompter-section"><span className="section-label">{t.arg}</span><p>{aiContent?.arg}</p></div>
              <div className="teleprompter-section"><span className="section-label">{t.counter}</span><p>{aiContent?.counter}</p></div>
              <div className="teleprompter-section"><span className="section-label">{t.conclusion}</span><p>{aiContent?.conclusion}</p></div>
              <div style={{ height: '60vh' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slide4_Debate;
