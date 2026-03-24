<<<<<<< HEAD
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
=======
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
  }[debateLanguage] || { title: "Premium AI Speeches", loading: "Generating 5 Professional Speeches..." };

  // Strict Word Count Enforcement: Handles both trimming and expansion
  const enforceWordCount = (text, target) => {
    if (!text) return "";
    let words = text.trim().split(/\s+/);
    
    // Hindi/Odia word split check (sometimes space is missing or punctuation is different)
    if (debateLanguage !== 'en') {
        const charCount = text.length;
        const estWords = Math.ceil(charCount / 5); // Rough estimate for Indic languages if split fails
        if (words.length < estWords * 0.5) {
            // If word count is suspiciously low, Indic script might be joined
            words = text.match(/[\u0900-\u097F\u0B00-\u0B7F\w]+/g) || words;
        }
    }

    if (words.length >= target * 0.98 && words.length <= target * 1.05) return text;

    if (words.length > target) {
      const truncated = words.slice(0, target).join(' ');
      return truncated + (debateLanguage === 'en' ? ' Thank you.' : debateLanguage === 'hi' ? ' धन्यवाद।' : ' ଧନ୍ୟବାଦ |');
    } else {
      const expansionTemplates = {
        en: [
          ` The life of ${localizedBio?.fullName || topic} serves as a profound blueprint for future generations.`,
          ` Their journey from ${localizedBio?.birthPlace || 'the past'} to achieving ${localizedBio?.majorAchievements || 'greatness'} is a testament to human resilience.`,
          ` We must look at the events of ${localizedBio?.importantYears || 'history'} as a guiding light for our endeavors.`,
          ` Their contribution remains etched in the annals of history forever.`
        ],
        hi: [
          ` ${localizedBio?.fullName || topic} का जीवन आने वाली पीढ़ियों के लिए एक गहन खाका पेश करता है।`,
          ` ${localizedBio?.birthPlace || 'जन्मभूमि'} से लेकर ${localizedBio?.majorAchievements || 'उपलब्धियों'} तक की उनकी यात्रा मानवीय लचीलापन का प्रमाण है।`,
          ` हमें ${localizedBio?.importantYears || 'इतिहास'} की घटनाओं को अपने प्रयासों के लिए एक मार्गदर्शक प्रकाश के रूप में देखना चाहिए।`,
          ` उनका योगदान हमेशा के लिए इतिहास के पन्नों में दर्ज रहेगा।`
        ],
        or: [
          ` ${localizedBio?.fullName || topic} ଙ୍କ ଜୀବନ ଆଗାମୀ ପିଢି ପାଇଁ ଏକ ଗଭୀର ନକ୍ସା ଭାବରେ କାର୍ଯ୍ୟ କରେ |`,
          ` ${localizedBio?.birthPlace || 'ଜନ୍ମସ୍ଥାନ'} ରୁ ${localizedBio?.majorAchievements || 'ସଫଳତା'} ହାସଲ ପର୍ଯ୍ୟନ୍ତ ସେମାନଙ୍କର ଯାତ୍ରା ମାନବିକ ସହନଶୀଳତାର ପ୍ରମାଣ |`,
          ` ଆମେ ଆମର ପ୍ରୟାସ ପାଇଁ ${localizedBio?.importantYears || 'ଇତିହାସ'} ର ଘଟଣାଗୁଡ଼ିକୁ ଏକ ମାର୍ଗଦର୍ଶକ ଆଲୋକ ଭାବରେ ଦେଖିବା ଜୁରୁରୀ |`,
          ` ସେମାନଙ୍କର ଅବଦାନ ଇତିହାସର ପୃଷ୍ଠାରେ ଚିରଦିନ ପାଇଁ ଲିପିବଦ୍ଧ ହୋଇ ରହିବ |`
        ]
      };
      
      const templates = expansionTemplates[debateLanguage] || expansionTemplates.en;
      let extendedText = text;
      let i = 0;
      while (extendedText.split(/\s+/).length < target * 0.95) {
        extendedText += " " + templates[i % templates.length];
        i++;
      }
      return extendedText;
    }
  };

  const [localizedBio, setLocalizedBio] = useState(null);

  // Localize bioData before fetching speeches to ensure 100% native context
  useEffect(() => {
    if (!isActive || !bioData) return;
    
    // If already in target language (rough check), skip
    if (debateLanguage === 'en') {
        setLocalizedBio(bioData);
        return;
    }

    const localize = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const targetLabel = debateLanguage === 'hi' ? 'Hindi (Devanagari)' : 'Odia (Odia Script)';
        const prompt = `Translate/Transliterate these profile fields into ${targetLabel}. 
        Return ONLY valid JSON. No English values except numbers.
        Fields: ${JSON.stringify(bioData)}`;
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: "application/json", temperature: 0.1 }
          })
        });
        if (res.ok) {
          const json = await res.json();
          const rawText = json.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
          setLocalizedBio(JSON.parse(rawText));
        } else {
          setLocalizedBio(bioData); // Fallback to raw if API fails
        }
      } catch (e) {
        setLocalizedBio(bioData);
      }
    };
    localize();
  }, [isActive, bioData, debateLanguage]);

  const fetchSpeeches = async (retryCount = 0) => {
    if (!isActive || !topic || !localizedBio) return;
    setAiLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      const targetScript = debateLanguage === 'hi' ? 'HINDI (DEVANAGARI SCRIPT)' : debateLanguage === 'or' ? 'ODIA (ODIA SCRIPT)' : 'ENGLISH';
      const prompt = `Act as an Elite Speech Writer. Generate exactly 5 distinct, high-impact debate speeches about ${topic}.
Language: ${targetScript}.
Target Length: Each speech MUST be exactly ${targetWords} words.
Context: ${localizedBio.fullName}, ${localizedBio.majorAchievements}.

Speech Varieties:
1. PERSUASIVE: Focus on emotional appeal and vision.
2. ANALYTICAL: Focus on facts, logic, and historical impact.
3. AGGRESSIVE: Focus on countering opposition and strong rhetoric.
4. INSPIRATIONAL: Focus on the legacy and future generations.
5. SUMMARY: A concise yet powerful synthesis of their life's work.

CRITICAL: Use ONLY ${targetScript}. 
DO NOT USE A SINGLE ENGLISH WORD. EXCLUSIVELY NATIVE SCRIPT.
Format: Return ONLY valid JSON: {"speeches": ["text1", "text2", "text3", "text4", "text5"]}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      });
      
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      
      const data = await res.json();
      let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty AI response');
      
      rawText = rawText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(rawText);
      if (!parsed.speeches || parsed.speeches.length < 5) throw new Error('Incomplete Speech Data');
      
      // Strict Validation: Reject if ANY English letters remain (A-Z)
      if (debateLanguage !== 'en') {
          const hasEnglish = parsed.speeches.some(s => /[a-zA-Z]/.test(s));
          if (hasEnglish && retryCount < 2) {
              return fetchSpeeches(retryCount + 1);
          }
      }

      const processed = parsed.speeches.map(s => enforceWordCount(s, targetWords));
      setSpeeches(processed);
    } catch (e) {
      console.error(`Attempt ${retryCount + 1} failed:`, e);
      if (retryCount < 2) return fetchSpeeches(retryCount + 1);
      
      setError(t.errorMsg);
      const baseTemplates = {
        en: `Respected audience, the legacy of ${localizedBio.fullName} remains a beacon of hope.`,
        hi: `आदरणीय श्रोताओं, ${localizedBio.fullName} की विरासत आशा की एक किरण बनी हुई है।`,
        or: `ସମ୍ମାନିତ ଶ୍ରୋତାମାନେ, ${localizedBio.fullName} ଙ୍କର ଐତିହ୍ୟ ଆମ ପାଇଁ ଏକ ଆଶାର କିରଣ |`
      };
      const base = baseTemplates[debateLanguage] || baseTemplates.en;
      const fallbackArr = Array(5).fill(0).map((_, i) => enforceWordCount(`${i+1}. ${base}`, targetWords));
      setSpeeches(fallbackArr);
    } finally { 
      setAiLoading(false); 
    }
  };

  useEffect(() => {
    if (isActive && topic && localizedBio && speeches.length === 0 && !aiLoading) {
      fetchSpeeches();
    }
  }, [isActive, topic, debateLanguage, targetWords, localizedBio]);
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

<<<<<<< HEAD
    if (!aiContent) return;

    const fullSpeech = `${aiContent.intro}. ${aiContent.arg}. ${aiContent.counter}. ${aiContent.conclusion}. ${aiContent.quotes.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    
    // Attempt to set voice based on language
    const voices = window.speechSynthesis.getVoices();
    const langMap = { en: 'en-US', hi: 'hi-IN', or: 'hi-IN' }; // Fallback Odia to Hindi if not available
    utterance.lang = langMap[language] || 'en-US';
    
    utterance.onend = () => setIsSpeaking(false);
=======
    const text = speeches[activeTab];
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = debateLanguage === 'hi' ? 'hi-IN' : debateLanguage === 'or' ? 'or-IN' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

<<<<<<< HEAD
  // Auto-scroll Logic for Stage Mode
  useEffect(() => {
    let interval;
    if (showStageMode && scrollSpeed > 0) {
      const track = document.querySelector('.teleprompter-track');
      if (track) {
        const speedMap = [0, 1, 2, 4]; // pixels per frame
        interval = setInterval(() => {
          track.scrollTop += speedMap[scrollSpeed];
=======
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

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
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
        }, 30);
      }
    }
    return () => clearInterval(interval);
<<<<<<< HEAD
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
=======
  }, [showStageMode, scrollSpeed, countdown]);

  return (
    <div className="premium-card animate-scale-in" style={{ maxWidth: '1200px', background: 'rgba(15, 23, 42, 0.8)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '-2px' }}>{t.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{t.instruction}<strong style={{ color: 'white', marginLeft: '0.5rem' }}>{topic}</strong></p>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Language Selector */}
          <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '15px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>{t.selectLang}</span>
            <select 
              value={debateLanguage} 
              onChange={(e) => setDebateLanguage(e.target.value)}
              className="input-modern"
              style={{ padding: '0.4rem', border: 'none', background: 'transparent', width: 'auto', fontSize: '1rem', fontWeight: '800', cursor: 'pointer' }}
            >
              <option value="en" style={{ color: 'black' }}>ENGLISH</option>
              <option value="hi" style={{ color: 'black' }}>HINDI</option>
              <option value="or" style={{ color: 'black' }}>ODIA</option>
            </select>
          </div>

          {/* Word Count Selector */}
          <div className="glass-panel" style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '15px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginRight: '0.5rem' }}>{t.words}</span>
            {[100, 250, 500].map(w => (
              <button 
                key={w} 
                onClick={() => setTargetWords(w)}
                style={{ 
                  background: targetWords === w ? 'var(--grad-btn)' : 'rgba(255,255,255,0.03)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  transition: 'var(--transition)',
                  boxShadow: targetWords === w ? '0 5px 15px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                {w}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={handleStageEnter} style={{ padding: '1.1rem 2.5rem', borderRadius: '20px' }}>
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
            🎬 {t.stageMode}
          </button>
        </div>
      </div>

<<<<<<< HEAD
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
=======
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
            {error && (
              <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1px solid #ef4444', marginBottom: '2rem' }}>
                <p style={{ color: '#ef4444', marginBottom: '1.5rem', fontWeight: '700' }}>{error}</p>
                <button className="btn-ghost" onClick={() => fetchSpeeches()}>🔄 Retry Generation</button>
              </div>
            )}
            
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
                <p style={{ fontSize: '1.5rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: '#f1f5f9', fontWeight: '400', letterSpacing: '0.2px' }}>
                  {speeches[activeTab]}
                </p>
                <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="glass-panel" style={{ padding: '0.5rem 1.2rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: '800' }}>{t.words}: {speeches[activeTab].split(/\s+/).length}</span>
                        </div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '0.3rem' }}>Variant {activeTab + 1}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                            {['Persuasive', 'Analytical', 'Aggressive', 'Inspirational', 'Summary'][activeTab]}
                        </span>
                   </div>
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
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
                  </button>
                ))}
              </div>
            </div>
<<<<<<< HEAD
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
=======
            <button className="btn-primary" onClick={toggleSpeech} style={{ minWidth: '140px' }}>
              {isSpeaking ? `⏹ ${t.stop}` : `🔊 ${t.listen}`}
            </button>
          </div>
          <div className="teleprompter-track" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }} onScroll={(e) => {
            const current = e.target.scrollTop;
            const total = e.target.scrollHeight - e.target.clientHeight;
            setScrollPos((current / total) * 100);
          }}>
            <div className="teleprompter-content">
              <p style={{ fontSize: '5rem', lineHeight: '1.5', fontWeight: '800', textAlign: 'center', whiteSpace: 'pre-wrap', color: 'white', textShadow: '0 10px 30px rgba(0,0,0,1)' }}>
                {speeches[activeTab]}
              </p>
              <div style={{ height: '90vh' }}></div>
>>>>>>> 533a2688305e7c143872cb85e8bd3d2340392baf
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slide4_Debate;
