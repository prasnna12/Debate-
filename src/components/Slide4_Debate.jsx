import React, { useState, useEffect } from 'react';

const Slide4_Debate = ({ topic, bioData, language, isActive }) => {
  const [targetWords, setTargetWords] = useState(250);
  const [debateLanguage, setDebateLanguage] = useState(language);
  const [speeches, setSpeeches] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showStageMode, setShowStageMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);

  // Clear speeches when settings change to ensure user sees loading state
  useEffect(() => {
    setSpeeches([]);
  }, [debateLanguage, targetWords]);

  const t = {
    en: { 
      title: "Premium AI Speeches", 
      stageMode: "Enter Stage Mode", 
      exitStage: "Exit Stage Mode", 
      loading: "AI is crafting 5 unique speeches...", 
      words: "Word Count", 
      listen: "Listen", 
      stop: "Stop", 
      scroll: "Auto-Scroll", 
      speed: "Speed",
      selectLang: "Language",
      errorMsg: "Could not generate speeches. Using backup knowledge...",
      instruction: "Generated for: "
    },
    hi: { 
      title: "प्रीमियम AI भाषण", 
      stageMode: "स्टेज मोड", 
      exitStage: "स्टेज मोड से बाहर", 
      loading: "AI 5 अनूठे भाषण तैयार कर रहा है...", 
      words: "शब्द गणना", 
      listen: "सुनें", 
      stop: "रोकें", 
      scroll: "ऑटो-स्क्रॉल", 
      speed: "गति",
      selectLang: "भाषा",
      errorMsg: "भाषण उत्पन्न नहीं किए जा सके। बैकअप ज्ञान का उपयोग किया जा रहा है...",
      instruction: "इसके लिए तैयार: "
    },
    or: { 
      title: "ପ୍ରିମିୟମ୍ AI ଭାଷଣ", 
      stageMode: "ଷ୍ଟେଜ୍ ମୋଡ୍", 
      exitStage: "ଷ୍ଟେଜ୍ ରୁ ବାହାରନ୍ତୁ", 
      loading: "AI 5 ଟି ଅନନ୍ୟ ଭାଷଣ ପ୍ରସ୍ତୁତ କରୁଛି...", 
      words: "ଶବ୍ଦ ସଂଖ୍ୟା", 
      listen: "ଶୁଣନ୍ତୁ", 
      stop: "ବନ୍ଦ କରନ୍ତୁ", 
      scroll: "ଅଟୋ-ସ୍କ୍ରୋଲ୍", 
      speed: "ଗତି",
      selectLang: "ଭାଷା",
      errorMsg: "ଭାଷଣ ପ୍ରସ୍ତୁତ କରାଯାଇପାରିଲା ନାହିଁ। ବ୍ୟାକଅପ୍ ଜ୍ଞାନ ବ୍ୟବହାର କରାଯାଉଛି...",
      instruction: "ପାଇଁ ପ୍ରସ୍ତୁତ: "
    }
  }[debateLanguage] || { title: "Premium AI Speeches", loading: "AI is crafting 5 unique speeches..." };

  // Strict Word Count Enforcement: Handles both trimming and expansion
  const enforceWordCount = (text, target) => {
    const words = text.split(/\s+/);
    
    // If within 5% of target, keep as is
    if (words.length >= target * 0.95 && words.length <= target * 1.05) return text;

    if (words.length > target) {
      // Trimming logic: Cut at the last sentence boundary near the target
      const truncated = words.slice(0, Math.floor(target * 1.1)).join(' ');
      const lastPunct = Math.max(
        truncated.lastIndexOf('.'),
        truncated.lastIndexOf('!'),
        truncated.lastIndexOf('?')
      );
      if (lastPunct > target * 0.85) {
        return truncated.substring(0, lastPunct + 1) + ' Thank you.';
      }
      return words.slice(0, target).join(' ') + '... Thank you.';
    } else {
      // Growth logic: Append meaningful biographical expansion to reach target
      const expansion = ` Beyond the documented facts, the life of ${bioData.fullName} serves as a grand blueprint for future generations. Their birth on ${bioData.birthDate} in ${bioData.birthPlace} marked the beginning of an era that would redefine ${bioData.majorAchievements}. As we analyze the pivotal moments of ${bioData.importantYears}, we realize that their legacy is not just a part of history, but a living inspiration that encourages us to dream bigger and work harder for the progress of humanity.`;
      let extendedText = text;
      while (extendedText.split(/\s+/).length < target * 0.92) {
        extendedText += expansion;
      }
      return extendedText;
    }
  };

  useEffect(() => {
    if (isActive && topic && bioData) {
      const fetchSpeeches = async () => {
        setAiLoading(true);
        setError(null);
        try {
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          const prompt = `Task: Generate exactly 5 unique, deeply detailed speeches about ${topic} in ${debateLanguage === 'hi' ? 'Hindi' : debateLanguage === 'or' ? 'Odia' : 'English'}.
Length: Each speech must be exactly ${targetWords} words.
Bio: ${bioData.fullName}, Born ${bioData.birthDate} in ${bioData.birthPlace}, Parents ${bioData.fatherName}/${bioData.motherName}, Achievements: ${bioData.majorAchievements}, Events: ${bioData.importantYears}.
Styles: 1. Grand Opening, 2. Emotional Life Story, 3. Logical/Analytical, 4. Modern/Engaging, 5. Formal Tribute.
Format: Return ONLY a JSON object with one key "speeches" containing an array of 5 strings.
CRITICAL: USE ${debateLanguage === 'hi' ? 'HINDI SCRIPT' : debateLanguage === 'or' ? 'ODIA SCRIPT' : 'ENGLISH'}. NO ENGLISH WORDS ALLOWED.`;

          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              contents: [{ parts: [{ text: prompt }] }], 
              generationConfig: { response_mime_type: "application/json" } 
            })
          });
          
          if (!res.ok) throw new Error('API request failed');
          
          const data = await res.json();
          const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
          const processed = parsed.speeches.map(s => enforceWordCount(s, targetWords));
          setSpeeches(processed);
        } catch (e) {
          console.error(e);
          setError(t.errorMsg);
          
          const baseFactEn = `Respected everyone, today we talk about ${bioData.fullName}. Born on ${bioData.birthDate} in ${bioData.birthPlace}, they achieved ${bioData.majorAchievements}. Their life during ${bioData.importantYears} is an inspiration for all.`;
          const baseFactHi = `आदरणीय गुरुजन और साथियों, आज हम ${bioData.fullName} के बारे में बात करेंगे। उनका जन्म ${bioData.birthDate} को ${bioData.birthPlace} में हुआ था। उनकी शिक्षा और ${bioData.majorAchievements} ने समाज को नयी दिशा दी। हमारे लिए ${bioData.importantYears} के उनके कार्य सदैव प्रेरणादायी रहेंगे।`;
          const baseFactOr = `ମାନ୍ୟବର ଶିକ୍ଷକ ଏବଂ ବନ୍ଧୁଗଣ, ଆଜି ଆମେ ${bioData.fullName} ବିଷୟରେ ଆଲୋଚନା କରିବା। ସେ ${bioData.birthDate} ରେ ${bioData.birthPlace} ଠାରେ ଜନ୍ମଗ୍ରହଣ କରିଥିଲେ। ${bioData.majorAchievements} ପାଇଁ ସେ ଚିରସ୍ମରଣୀୟ। ${bioData.importantYears} ର ତାଙ୍କର କାର୍ଯ୍ୟ ଆମ ପାଇଁ ସର୍ବଦା ପ୍ରେରଣାଦାୟୀ।`;
          
          const fact = debateLanguage === 'hi' ? baseFactHi : debateLanguage === 'or' ? baseFactOr : baseFactEn;
          
          const fallbackArr = Array(5).fill(0).map((_, i) => enforceWordCount(`${i+1}. ${fact}`, targetWords));
          setSpeeches(fallbackArr);
        } finally { 
          setAiLoading(false); 
        }
      };
      fetchSpeeches();
    }
  }, [isActive, topic, debateLanguage, targetWords, bioData]);

  const handleDownload = () => {
    const text = speeches[activeTab];
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '_')}_Speech_${activeTab + 1}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleStageEnter = () => {
    setCountdown(3);
    setShowStageMode(true);
    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) clearInterval(timer);
    }, 1000);
  };

  useEffect(() => {
    let interval;
    if (showStageMode && scrollSpeed > 0 && countdown === 0) {
      const track = document.querySelector('.teleprompter-track');
      if (track) {
        const speedMap = [0, 1.5, 3, 6];
        interval = setInterval(() => { 
          track.scrollTop += speedMap[scrollSpeed]; 
          const current = track.scrollTop;
          const total = track.scrollHeight - track.clientHeight;
          setScrollPos((current / total) * 100);
        }, 30);
      }
    }
    return () => clearInterval(interval);
  }, [showStageMode, scrollSpeed, countdown]);

  return (
    <div className="premium-card animate-scale-in" style={{ maxWidth: '1200px', background: 'rgba(15, 23, 42, 0.8)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{t.title}</h2>
          <p style={{ fontSize: '1.1rem' }}>{t.instruction}<strong style={{ color: 'var(--primary)' }}>{topic}</strong></p>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Language Selector */}
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase' }}>{t.selectLang}</span>
            <select 
              value={debateLanguage} 
              onChange={(e) => setDebateLanguage(e.target.value)}
              className="input-modern"
              style={{ padding: '0.5rem', border: 'none', background: 'transparent', width: 'auto', fontSize: '0.95rem', fontWeight: '800' }}
            >
              <option value="en" style={{ color: 'black' }}>EN</option>
              <option value="hi" style={{ color: 'black' }}>HI</option>
              <option value="or" style={{ color: 'black' }}>OR</option>
            </select>
          </div>

          {/* Word Count Selector */}
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', marginRight: '0.5rem' }}>{t.words}</span>
            {[100, 250, 500].map(w => (
              <button 
                key={w} 
                onClick={() => setTargetWords(w)}
                style={{ 
                  background: targetWords === w ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.4rem 0.8rem',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '0.85rem'
                }}
              >
                {w}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={handleStageEnter} style={{ padding: '1rem 2rem' }}>
            🎬 {t.stageMode}
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="debate-tabs">
        {[1, 2, 3, 4, 5].map((num, i) => (
          <button 
            key={num} 
            className={`debate-tab ${activeTab === i ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {debateLanguage === 'en' ? `Speech ${num}` : debateLanguage === 'hi' ? `भाषण ${num}` : `ଭାଷଣ ${num}`}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="scroll-content" style={{ minHeight: '400px', maxHeight: '55vh', overflowY: 'auto' }}>
        {aiLoading ? (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p className="text-gradient" style={{ fontWeight: '800' }}>{t.loading}</p>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ padding: '1rem' }}>
            {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '2rem' }}>{error}</p>}
            
            {speeches[activeTab] && (
              <div 
                className="glass-panel animate-scale-in" 
                style={{ 
                  padding: '3rem', 
                  position: 'relative',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                  <button onClick={handleDownload} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.3rem', opacity: 0.7 }} title="Download">
                    📥
                  </button>
                  <button onClick={toggleSpeech} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }} title={t.listen}>
                    {isSpeaking ? '⏹' : '🔊'}
                  </button>
                </div>
                <p style={{ fontSize: '1.4rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#e2e8f0', fontWeight: '400' }}>
                  {speeches[activeTab]}
                </p>
                <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div className="glass-panel" style={{ padding: '0.4rem 1rem', border: '1px solid var(--primary)', borderRadius: '10px' }}>
                     <span style={{ fontSize: '0.9rem', color: 'white', fontWeight: '800' }}>{t.words}: {speeches[activeTab].split(/\s+/).length}</span>
                   </div>
                   <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>Variant {activeTab + 1}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stage Mode Overlay */}
      {showStageMode && (
        <div className="stage-overlay">
          {countdown > 0 && (
            <div className="countdown-overlay">
              <div className="countdown-number">{countdown}</div>
            </div>
          )}
          
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${scrollPos}%` }}></div>
          </div>

          <div className="stage-controls">
            <button className="btn-exit" onClick={() => { setShowStageMode(false); setScrollPos(0); }}>✕ {t.exitStage}</button>
            <div className="stage-meta">
              <span className="text-gradient" style={{ fontWeight: '900' }}>V{activeTab + 1}: {topic}</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '2rem' }}>
                {[0, 1, 2, 3].map(s => (
                  <button key={s} onClick={() => setScrollSpeed(s)} style={{ background: scrollSpeed === s ? 'var(--primary)' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>
                    {s === 0 ? 'OFF' : s}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-primary" onClick={toggleSpeech} style={{ minWidth: '140px' }}>
              {isSpeaking ? `⏹ ${t.stop}` : `🔊 ${t.listen}`}
            </button>
          </div>
          <div className="teleprompter-track" onScroll={(e) => {
            const current = e.target.scrollTop;
            const total = e.target.scrollHeight - e.target.clientHeight;
            setScrollPos((current / total) * 100);
          }}>
            <div className="teleprompter-content">
              <p style={{ fontSize: '4.5rem', lineHeight: '1.4', fontWeight: '800', textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                {speeches[activeTab]}
              </p>
              <div style={{ height: '80vh' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slide4_Debate;
