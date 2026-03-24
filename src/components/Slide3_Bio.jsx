import React, { useState, useEffect } from 'react';

const Slide3_Bio = ({ topic, bioData, language, isActive, onNext }) => {
  const [videoId, setVideoId] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);

  const t = {
    en: { 
      title: "Biography & Insights", 
      personalInfo: "Personal Profile", 
      documentary: "Documentary", 
      nextBtn: "Prepare Speeches", 
      fullName: "Full Name", 
      born: "Born", 
      parents: "Parents", 
      achievements: "Major Achievements", 
      noVideo: "No specific biography video found.",
      watchOnYoutube: "Watch on YouTube",
      searchHint: "Search on YouTube for more insights."
    },
    hi: { 
      title: "जीवनी और अंतर्दृष्टि", 
      personalInfo: "व्यक्तिगत विवरण", 
      documentary: "वृत्तचित्र", 
      nextBtn: "भाषण तैयार करें", 
      fullName: "पूरा नाम", 
      born: "जन्म", 
      parents: "माता-पिता", 
      achievements: "प्रमुख उपलब्धियां", 
      noVideo: "कोई विशिष्ट जीवनी वीडियो नहीं मिला।",
      watchOnYoutube: "यूट्यूब पर देखें",
      searchHint: "अधिक जानकारी के लिए यूट्यूब पर खोजें।"
    },
    or: { 
      title: "ଜୀବନୀ ଏବଂ ଅନ୍ତର୍ନିହିତ ସୂଚନା", 
      personalInfo: "ବ୍ୟକ୍ତିଗତ ବିବରଣୀ", 
      documentary: "ଡକ୍ୟୁମେଣ୍ଟାରୀ", 
      nextBtn: "ଭାଷଣ ପ୍ରସ୍ତୁତ କରନ୍ତୁ", 
      fullName: "ପୂରା ନାମ", 
      born: "ଜନ୍ମ", 
      parents: "ପିତାମାତା", 
      achievements: "ପ୍ରମୁଖ ସଫଳତା", 
      noVideo: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଜୀବନୀ ଭିଡିଓ ମିଳିଲା ନାହିଁ।",
      watchOnYoutube: "ୟୁଟ୍ୟୁବ୍‌ରେ ଦେଖନ୍ତୁ",
      searchHint: "ଅଧିକ ଜାଣିବା ପାଇଁ ୟୁଟ୍ୟୁବ୍‌ରେ ଖୋଜନ୍ତୁ।"
    }
  }[language] || { title: "Biography & Insights" };

  useEffect(() => {
    if (isActive && topic) {
      const fetchVideo = async () => {
        setVideoLoading(true);
        try {
          const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
          if (!API_KEY) return;
          
          const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(topic + ' biography documentary')}&type=video&key=${API_KEY}`);
          const data = await res.json();
          if (data.items?.length > 0) {
            setVideoId(data.items[0].id.videoId);
          }
        } catch (e) { 
          console.error(e); 
        } finally { 
          setVideoLoading(false); 
        }
      };
      fetchVideo();
    }
  }, [isActive, topic]);

  if (!bioData) return null;

  return (
    <div className="premium-card animate-scale-in" style={{ maxWidth: '1200px', background: 'rgba(15, 23, 42, 0.8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.8rem' }}>{t.title}</h2>
        <button className="btn-primary" onClick={onNext} style={{ padding: '1rem 2.2rem', fontSize: '1.1rem' }}>
          {t.nextBtn} ➔
        </button>
      </div>

      <div className="bio-grid">
        {/* Biography Section */}
        <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <h3 style={{ borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.4rem', marginBottom: '1.8rem', fontSize: '1.4rem' }}>{t.personalInfo}</h3>
          
          <div style={{ display: 'grid', gap: '1.4rem' }}>
            <div className="info-row">
              <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.fullName}</span>
              <p style={{ fontSize: '1.15rem', color: 'white', fontWeight: '600' }}>{bioData.fullName}</p>
            </div>
            <div className="info-row">
              <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.born}</span>
              <p style={{ fontSize: '1.15rem', color: 'white', fontWeight: '600' }}>{bioData.birthDate} - {bioData.birthPlace}</p>
            </div>
            <div className="info-row">
              <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.parents}</span>
              <p style={{ fontSize: '1.15rem', color: 'white', fontWeight: '600' }}>{bioData.fatherName} & {bioData.motherName}</p>
            </div>
            <div className="info-row">
              <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.achievements}</span>
              <p style={{ fontSize: '1.1rem' }}>{bioData.majorAchievements}</p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>🎬 {t.documentary}</h3>
            {videoId && (
              <button 
                onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
                className="btn-ghost"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '10px' }}
              >
                {t.watchOnYoutube} ↗
              </button>
            )}
          </div>
          
          <div style={{ flex: 1, minHeight: '380px', background: '#000', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.4)', position: 'relative', border: '1px solid var(--glass-border)' }}>
            {videoLoading ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Finding documentary...</p>
              </div>
            ) : videoId ? (
              <iframe
                title="YouTube Video Player"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.2 }}>📺</div>
                <p style={{ marginBottom: '1.5rem', opacity: 0.6 }}>{t.noVideo}</p>
                <button 
                  onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' documentary')}`, '_blank')} 
                  className="btn-primary"
                  style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
                >
                  {t.searchHint}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_Bio;
