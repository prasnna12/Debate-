import React, { useState } from 'react';

const Slide2_Topic = ({ language, onGenerate }) => {
  const translations = {
    en: {
      title: 'Define Your Subject',
      subtitle: 'Enter a name or topic to generate a comprehensive profile',
      placeholder: 'e.g. Mahatma Gandhi or Global Warming',
      btn: 'Generate Full Experience',
      loading: 'Analyzing Topic & Fetching Records...',
      errorEmpty: 'Please enter a topic to continue.',
      errorNotFound: 'Could not find sufficient data. Please try a different name.',
      suggestions: ['Subhash Chandra Bose', 'Bhagat Singh', 'Rani Lakshmibai', 'APJ Abdul Kalam']
    },
    hi: {
      title: 'अपना विषय चुनें',
      subtitle: 'एक व्यापक प्रोफाइल बनाने के लिए नाम या विषय दर्ज करें',
      placeholder: 'जैसे महात्मा गांधी या ग्लोबल वार्मिंग',
      btn: 'पूर्ण अनुभव उत्पन्न करें',
      loading: 'विषय का विश्लेषण और रिकॉर्ड प्राप्त किया जा रहा है...',
      errorEmpty: 'जारी रखने के लिए कृपया एक विषय दर्ज करें।',
      errorNotFound: 'पर्याप्त डेटा नहीं मिल सका। कृपया दूसरा नाम आज़माएँ।',
      suggestions: ['सुभाष चंद्र बोस', 'भगत सिंह', 'रानी लक्ष्मीबाई', 'एपीजे अब्दुल कलाम']
    },
    or: {
      title: 'ଆପଣଙ୍କର ବିଷୟ ବାଛନ୍ତୁ',
      subtitle: 'ଏକ ବିସ୍ତୃତ ପ୍ରୋଫାଇଲ୍ ପ୍ରସ୍ତୁତ କରିବାକୁ ନାମ କିମ୍ବା ବିଷୟ ପ୍ରବେଶ କରନ୍ତୁ',
      placeholder: 'ଯଥା: ମହାତ୍ମା ଗାନ୍ଧୀ କିମ୍ବା ଗ୍ଲୋବାଲ୍ ୱାର୍ମିଂ',
      btn: 'ପୂର୍ଣ୍ଣ ଅଭିଜ୍ଞତା ପ୍ରସ୍ତୁତ କରନ୍ତୁ',
      loading: 'ବିଷୟର ବିଶ୍ଳେଷଣ ଏବଂ ତଥ୍ୟ ସଂଗ୍ରହ ଚାଲିଛି...',
      errorEmpty: 'ଜାରି ରଖିବା ପାଇଁ ଦୟାକରି ଏକ ବିଷୟ ପ୍ରବେଶ କରନ୍ତୁ।',
      errorNotFound: 'ଯଥେଷ୍ଟ ତଥ୍ୟ ମିଳିଲା ନାହିଁ। ଦୟାକରି ଅନ୍ୟ ଏକ ନାମ ଚେଷ୍ଟା କରନ୍ତୁ।',
      suggestions: ['ସୁଭାଷ ଚନ୍ଦ୍ର ବୋଷ', 'ଭଗତ ସିଂ', 'ରାଣୀ ଲକ୍ଷ୍ମୀବାଈ', 'ଏପିଜେ ଅବଦୁଲ କଲାମ']
    }
  };

  const t = translations[language] || translations['en'];
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBioData = async (query) => {
    const normalizedQuery = query.trim().replace(/\s+/g, ' ');
    const langSub = language === 'or' ? 'or' : language === 'hi' ? 'hi' : 'en';
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const getWikiData = async (title) => {
      try {
        const url = `https://${langSub}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const res = await fetch(url);
        if (res.ok) return await res.json();
      } catch (e) { return null; }
      return null;
    };

    const searchWikiTitle = async (q) => {
      try {
        const searchUrl = `https://${langSub}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`;
        const res = await fetch(searchUrl);
        const data = await res.json();
        if (data.query?.search?.length > 0) return data.query.search[0].title;
      } catch (e) { return null; }
      return null;
    };

    let wikiData = null;
    let resolvedTitle = normalizedQuery;

    wikiData = await getWikiData(normalizedQuery);
    if (!wikiData || !wikiData.extract || wikiData.extract.length < 50) {
      const bestTitle = await searchWikiTitle(normalizedQuery);
      if (bestTitle) {
        resolvedTitle = bestTitle;
        wikiData = await getWikiData(bestTitle);
      }
    }

    if (!wikiData || !wikiData.extract) {
       const bioTitle = await searchWikiTitle(`${normalizedQuery} biography`);
       if (bioTitle) {
         resolvedTitle = bioTitle;
         wikiData = await getWikiData(bioTitle);
       }
    }

    let aiData = null;
    if (apiKey && (!wikiData || !wikiData.extract || wikiData.extract.length < 100)) {
       try {
         const langLabel = language === 'hi' ? 'Hindi (Devanagari Script)' : language === 'or' ? 'Odia (Odia Script)' : 'English';
         const prompt = `Provide a comprehensive JSON profile for: "${normalizedQuery}" in ${langLabel}.
         CRITICAL: All values must be in ${langLabel}. No English.
         Keys: fullName, description, birthDate, birthPlace, fatherName, motherName, importantYears, majorAchievements, summary.`;
         
         const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             contents: [{ role: "user", parts: [{ text: prompt }] }],
             generationConfig: { 
               response_mime_type: "application/json",
               temperature: 0.1 
             }
           })
         });
         if (res.ok) {
           const json = await res.json();
           const rawText = json.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
           aiData = JSON.parse(rawText);
         }
       } catch (e) { console.error(e); }
    }

    if (!wikiData && !aiData) return null;

    // Helper to ensure we don't return English names in Hindi/Odia mode if possible
    const finalName = aiData?.fullName || wikiData?.title || resolvedTitle;

    return {
      fullName: finalName,
      summary: aiData?.summary || wikiData?.extract || '...',
      image: wikiData?.thumbnail?.source || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300&h=400',
      description: aiData?.description || wikiData?.description || (language === 'hi' ? 'ऐतिहासिक प्रेरणा' : language === 'or' ? 'ଐତିହାସିକ ପ୍ରେରଣା' : 'Historical Inspiration'),
      birthDate: aiData?.birthDate || wikiData?.description?.match(/\d+\s\w+\s\d{4}|\b\d{4}\b/)?.[0] || '...',
      birthPlace: aiData?.birthPlace || (language === 'hi' ? 'वैश्विक विरासत' : language === 'or' ? 'ବିଶ୍ୱସ୍ତରୀୟ ଐତିହ୍ୟ' : 'Global Legacy'),
      fatherName: aiData?.fatherName || (language === 'hi' ? 'ऐतिहासिक रिकॉर्ड' : language === 'or' ? 'ଐତିହାସିକ ରେକର୍ଡ' : 'Historical Record'),
      motherName: aiData?.motherName || (language === 'hi' ? 'ऐतिहासिक रिकॉर्ड' : language === 'or' ? 'ଐତିହାସିକ ରେକର୍ଡ' : 'Historical Record'),
      importantYears: aiData?.importantYears || wikiData?.extract?.match(/\b(18|19|20)\d{2}\b/g)?.slice(0, 4).join(', ') || '...',
      majorAchievements: aiData?.majorAchievements || wikiData?.extract?.split('. ').slice(0, 3).join('. ') + '.'
    };
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(t.errorEmpty);
      return;
    }
    setLoading(true);
    setError('');
    const bio = await fetchBioData(topic);
    setLoading(false);
    if (!bio) {
      setError(t.errorNotFound);
      return;
    }
    onGenerate(bio.fullName, bio);
  };

  return (
    <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', letterSpacing: '-0.5px' }} className="text-gradient">{t.title}</h2>
      <p style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem', fontWeight: '500' }}>{t.subtitle}</p>

      {loading ? (
        <div className="loading-overlay" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner"></div>
          <p style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px', marginTop: '2rem' }} className="text-gradient">{t.loading}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>This may take a few seconds...</p>
        </div>
      ) : (
        <>
          <div className="search-wrapper" style={{ margin: '0 auto 3.5rem', maxWidth: '650px' }}>
            <input 
              type="text" 
              className="input-modern"
              style={{ textAlign: 'center', fontSize: '1.3rem', padding: '1.6rem', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder={t.placeholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', marginBottom: '4.5rem' }}>
            {t.suggestions.map(s => (
              <button key={s} className="btn-ghost" onClick={() => { setTopic(s); }} style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem', borderRadius: '12px' }}>
                {s}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={handleGenerate} style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}>
            🚀 {t.btn}
          </button>
          
          {error && <p className="animate-fade-in" style={{ color: '#fb7185', marginTop: '2.5rem', textAlign: 'center', fontWeight: '600', fontSize: '1rem' }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default Slide2_Topic;
