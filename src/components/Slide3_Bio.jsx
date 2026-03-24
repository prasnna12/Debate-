import React, { useState, useEffect } from 'react';

const Slide3_Bio = ({ topic, bioData, language, isActive, onNext }) => {
  const [videoId, setVideoId] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);

  const t = {
    en: { bioHeader: "The Story", docHeader: "Documentary", nextBtn: "Prepare My Speech", details: "Quick Facts", birth: "Born", place: "Place", father: "Father", mother: "Mother", years: "Years", noVideo: "Content unavailable" },
    hi: { bioHeader: "कहानी", docHeader: "वृत्तचित्र", nextBtn: "भाषण तैयार करें", details: "मुख्य तथ्य", birth: "जन्म", place: "स्थान", father: "पिता", mother: "माता", years: "वर्ष", noVideo: "सामग्री अनुपलब्ध" },
    or: { bioHeader: "କାହାଣୀ", docHeader: "ଡକ୍ୟୁମେଣ୍ଟାରୀ", nextBtn: "ଭାଷଣ ପ୍ରସ୍ତୁତ କରନ୍ତୁ", details: "ମୁଖ୍ୟ ତଥ୍ୟ", birth: "ଜନ୍ମ", place: "ସ୍ଥାନ", father: "ପିତା", mother: "ମାତା", years: "ବର୍ଷ", noVideo: "ସୂଚନା ମିଳିଲା ନାହିଁ" }
  }[language] || { bioHeader: "The Story", docHeader: "Documentary", nextBtn: "Prepare My Speech", details: "Quick Facts", birth: "Born", place: "Place", father: "Father", mother: "Mother", years: "Years", noVideo: "Content unavailable" };

  useEffect(() => {
    if (isActive && topic) {
      const fetchVideo = async () => {
        setVideoLoading(true);
        try {
          const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
          if (!API_KEY || API_KEY.includes('YOUR_')) return;
          const query = encodeURIComponent(bioData?.birthDate ? `${topic} biography` : `${topic} documentary`);
          const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&type=video&key=${API_KEY}`);
          const data = await res.json();
          if (data.items?.length > 0) setVideoId(data.items[0].id.videoId);
        } catch (e) { console.error(e); } finally { setVideoLoading(false); }
      };
      fetchVideo();
    }
  }, [isActive, topic, bioData]);

  if (!bioData) return null;

  return (
    <div className="bio-grid">
      {/* Left Card: Portrait & Facts */}
      <div className="premium-card" style={{ padding: '3rem', textAlign: 'center', height: 'fit-content' }}>
        <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
          <img 
            src={bioData.image} 
            alt={bioData.fullName} 
            style={{ width: '100%', borderRadius: '28px', boxShadow: '0 20px 45px rgba(0,0,0,0.2)', border: '8px solid white', objectFit: 'cover', aspectRatio: '3/4' }} 
          />
        </div>
        <h2 style={{ fontSize: '2.8rem', marginBottom: '2rem' }} className="text-gradient">{bioData.fullName}</h2>
        
        <div className="glass-panel" style={{ textAlign: 'left', padding: '2rem', border: '1px solid rgba(79, 70, 229, 0.15)', background: 'rgba(255, 255, 255, 0.5)' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '900' }}>{t.details}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '1rem' }}>
            <div><p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.birth}</p><p style={{ fontWeight: '800', color: '#1e293b' }}>{bioData.birthDate}</p></div>
            <div><p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.place}</p><p style={{ fontWeight: '800', color: '#1e293b' }}>{bioData.birthPlace}</p></div>
            <div><p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.father}</p><p style={{ fontWeight: '800', color: '#1e293b' }}>{bioData.fatherName}</p></div>
            <div><p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.mother}</p><p style={{ fontWeight: '800', color: '#1e293b' }}>{bioData.motherName}</p></div>
          </div>
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.years}</p>
            <p style={{ fontWeight: '800', color: '#1e293b', fontSize: '1.1rem' }}>{bioData.importantYears}</p>
          </div>
        </div>
      </div>

      {/* Right Content: Summary & Video */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div className="premium-card" style={{ padding: '3rem' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: '800' }} className="text-gradient">{t.bioHeader}</h3>
          <p style={{ color: '#334155', fontSize: '1.2rem', lineHeight: '1.9' }}>{bioData.summary}</p>
        </div>

        <div className="premium-card" style={{ padding: '2.5rem' }}>
           <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: '800' }} className="text-gradient">{t.docHeader}</h3>
           <div style={{ borderRadius: '24px', overflow: 'hidden', minHeight: '350px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
              {videoLoading ? (
                <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'white' }}></div>
              ) : videoId ? (
                <iframe width="100%" height="350" src={`https://www.youtube.com/embed/${videoId}`} title="Video" frameBorder="0" allowFullScreen style={{ display: 'block' }}></iframe>
              ) : (
                <p style={{ color: 'white', opacity: 0.6, fontWeight: '700' }}>{t.noVideo}</p>
              )}
           </div>
        </div>

        <button className="btn-primary" onClick={onNext} style={{ width: '100%', padding: '1.6rem', fontSize: '1.3rem', borderRadius: '26px' }}>
          🚀 {t.nextBtn}
        </button>
      </div>
    </div>
  );
};

export default Slide3_Bio;
