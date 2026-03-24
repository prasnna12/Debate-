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
    <div className="premium-card animate-scale-in" style={{ 
      maxWidth: '1250px', 
      margin: '0 auto', 
      background: 'rgba(15, 23, 42, 0.9)',
      padding: '4rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem' }}>
        <div>
            <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '-2px' }}>{t.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Exploring the legacy of <strong style={{ color: 'white' }}>{topic}</strong></p>
        </div>
        <button className="btn-primary" onClick={onNext} style={{ padding: '1.2rem 2.8rem', fontSize: '1.1rem', borderRadius: '20px' }}>
          {t.nextBtn} ➔
        </button>
      </div>

      <div className="bio-grid" style={{ gap: '4rem' }}>
        {/* Biography Section */}
        <div className="glass-panel animate-fade-in" style={{ 
            padding: '3rem', 
            background: 'rgba(255,255,255,0.02)',
            border: '2px solid rgba(255,255,255,0.03)',
            borderRadius: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '40px', height: '2px', background: 'var(--grad-btn)' }}></div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0 }}>{t.personalInfo}</h3>
          </div>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div className="info-row glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.6rem' }}>{t.fullName}</span>
              <p style={{ fontSize: '1.3rem', color: 'white', fontWeight: '700' }}>{bioData.fullName}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="info-row glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.6rem' }}>{t.born}</span>
                    <p style={{ fontSize: '1.1rem', color: 'white', fontWeight: '600' }}>{bioData.birthDate}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{bioData.birthPlace}</p>
                </div>
                <div className="info-row glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.6rem' }}>{t.parents}</span>
                    <p style={{ fontSize: '1.1rem', color: 'white', fontWeight: '600' }}>{bioData.fatherName}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>& {bioData.motherName}</p>
                </div>
            </div>

            <div className="info-row glass-panel" style={{ padding: '1.5rem', background: 'rgba(30, 58, 138, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.6rem' }}>{t.achievements}</span>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#e2e8f0' }}>{bioData.majorAchievements}</p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>🎬 {t.documentary}</h3>
            {videoId && (
              <button 
                onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
                className="btn-ghost"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}
              >
                {t.watchOnYoutube} ↗
              </button>
            )}
          </div>
          
          <div style={{ 
              aspectRatio: '16/10', 
              background: '#000', 
              borderRadius: '32px', 
              overflow: 'hidden', 
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)', 
              position: 'relative', 
              border: '2px solid rgba(255,255,255,0.05)' 
          }}>
            {videoLoading ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner" style={{ width: '50px', height: '50px' }}></div>
                <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>Relieving History...</p>
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
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'grayscale(1)', opacity: 0.2 }}>🎞️</div>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>{t.noVideo}</p>
                <button 
                  onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' documentary')}`, '_blank')} 
                  className="btn-primary"
                  style={{ padding: '1rem 2rem', fontSize: '1rem' }}
                >
                  {t.searchHint}
                </button>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                💡 Tip: Use the documentary to gather specific anecdotes for your debate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_Bio;
