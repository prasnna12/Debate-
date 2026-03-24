import React, { useState, useEffect } from 'react';

const Slide3_Bio = ({ topic, bioData, language, isActive, onNext }) => {
  const [videoData, setVideoData] = useState({ id: '', title: '' });
  const [videoLoading, setVideoLoading] = useState(false);

  const t = {
    en: { 
      bioHeader: "The Story", 
      docHeader: "Documentary", 
      nextBtn: "Prepare My Speech", 
      details: "Quick Facts", 
      birth: "Born", 
      place: "Place", 
      father: "Father", 
      mother: "Mother", 
      years: "Years", 
      noVideo: "Scanning for relevant documentaries...",
      recommended: "Recommended Video",
      watchOnYoutube: "Watch on YouTube",
      searchOnYoutube: "Search on YouTube",
      fallbackMsg: "No specific biography video found. Try searching on YouTube directly."
    },
    hi: { 
      bioHeader: "कहानी", 
      docHeader: "वृत्तचित्र", 
      nextBtn: "भाषण तैयार करें", 
      details: "मुख्य तथ्य", 
      birth: "जन्म", 
      place: "स्थान", 
      father: "पिता", 
      mother: "माता", 
      years: "वर्ष", 
      noVideo: "प्रासंगिक वृत्तचित्रों की खोज की जा रही है...",
      recommended: "अनुशंसित वीडियो",
      watchOnYoutube: "यूट्यूब पर देखें",
      searchOnYoutube: "यूट्यूब पर खोजें",
      fallbackMsg: "कोई विशिष्ट जीवनी वीडियो नहीं मिला। सीधे यूट्यूब पर खोजने का प्रयास करें।"
    },
    or: { 
      bioHeader: "କାହାଣୀ", 
      docHeader: "ଡକ୍ୟୁମେଣ୍ଟାରୀ", 
      nextBtn: "ଭାଷଣ ପ୍ରସ୍ତୁତ କରନ୍ତୁ", 
      details: "ମୁଖ୍ୟ ତଥ୍ୟ", 
      birth: "ଜନ୍ମ", 
      place: "ସ୍ଥାନ", 
      father: "ପିତା", 
      mother: "ମାତା", 
      years: "ବର୍ଷ", 
      noVideo: "ସମ୍ବନ୍ଧିତ ପ୍ରାମାଣିକ ଚଳଚ୍ଚିତ୍ର ଖୋଜା ଚାଲିଛି...",
      recommended: "ସୁପାରିଶ କରାଯାଇଥିବା ଭିଡିଓ",
      watchOnYoutube: "ୟୁଟ୍ୟୁବ୍‌ରେ ଦେଖନ୍ତୁ",
      searchOnYoutube: "ୟୁଟ୍ୟୁବ୍‌ରେ ଖୋଜନ୍ତୁ",
      fallbackMsg: "କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଜୀବନୀ ଭିଡିଓ ମିଳିଲା ନାହିଁ। ସିଧାସଳଖ ୟୁଟ୍ୟୁବ୍‌ରେ ଖୋଜିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ।"
    }
  }[language] || { bioHeader: "The Story", docHeader: "Documentary" };

  useEffect(() => {
    if (isActive && topic) {
      const fetchVideo = async () => {
        setVideoLoading(true);
        try {
          const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
          if (!API_KEY || API_KEY.includes('YOUR_')) {
             setVideoData({ id: '', title: '' });
             return;
          }
          
          // Try multiple queries to find the best match
          const queries = [
            `${topic} biography`,
            `${topic} history for students`,
            `${topic} life story`
          ];
          
          let foundVideo = null;
          for (const q of queries) {
            const query = encodeURIComponent(q);
            const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&type=video&key=${API_KEY}`);
            const data = await res.json();
            if (data.items?.length > 0) {
              foundVideo = {
                id: data.items[0].id.videoId,
                title: data.items[0].snippet.title
              };
              break;
            }
          }
          
          if (foundVideo) {
            setVideoData(foundVideo);
          } else {
            setVideoData({ id: '', title: '' });
          }
        } catch (e) { 
          console.error(e); 
          setVideoData({ id: '', title: '' });
        } finally { 
          setVideoLoading(false); 
        }
      };
      fetchVideo();
    }
  }, [isActive, topic]);

  if (!bioData) return null;

  return (
    <div className="bio-grid">
      {/* Left Card: Portrait & Facts */}
      <div className="premium-card" style={{ padding: '3rem', textAlign: 'center', height: 'fit-content' }}>
        <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
          <img 
            src={bioData.image} 
            alt={bioData.fullName} 
            style={{ width: '100%', borderRadius: '28px', boxShadow: '0 20px 45px rgba(0,0,0,0.5)', border: '4px solid rgba(255,255,255,0.1)', objectFit: 'cover', aspectRatio: '3/4' }} 
          />
        </div>
        <h2 style={{ fontSize: '2.8rem', marginBottom: '2rem' }} className="text-gradient">{bioData.fullName}</h2>
        
        <div className="glass-panel" style={{ textAlign: 'left', padding: '2rem', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.03)' }}>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: '900' }}>{t.details}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.95rem' }}>
            <div><p style={{ fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.birth}</p><p style={{ fontWeight: '800', color: 'white' }}>{bioData.birthDate}</p></div>
            <div><p style={{ fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.place}</p><p style={{ fontWeight: '800', color: 'white' }}>{bioData.birthPlace}</p></div>
            <div><p style={{ fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.father}</p><p style={{ fontWeight: '800', color: 'white' }}>{bioData.fatherName}</p></div>
            <div><p style={{ fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.mother}</p><p style={{ fontWeight: '800', color: 'white' }}>{bioData.motherName}</p></div>
          </div>
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{t.years}</p>
            <p style={{ fontWeight: '800', color: 'white', fontSize: '1.1rem' }}>{bioData.importantYears}</p>
          </div>
        </div>
      </div>

      {/* Right Content: Summary & Video */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div className="premium-card" style={{ padding: '3rem' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: '800' }} className="text-gradient">{t.bioHeader}</h3>
          <p style={{ color: '#e2e8f0', fontSize: '1.2rem', lineHeight: '1.9' }}>{bioData.summary}</p>
        </div>

        <div className="premium-card" style={{ padding: '2.5rem' }}>
           <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: '800' }} className="text-gradient">{t.docHeader}</h3>
           
           <div style={{ borderRadius: '24px', overflow: 'hidden', minHeight: '350px', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid var(--glass-border)' }}>
              {videoLoading ? (
                <div className="spinner" style={{ borderTopColor: 'var(--accent)' }}></div>
              ) : videoData.id ? (
                <>
                  <iframe width="100%" height="350" src={`https://www.youtube.com/embed/${videoData.id}`} title="Video" frameBorder="0" allowFullScreen style={{ display: 'block' }}></iframe>
                  <div style={{ padding: '1.5rem', width: '100%', background: 'rgba(2, 6, 23, 0.8)', textAlign: 'center', backdropFilter: 'blur(15px)', borderTop: '1px solid var(--glass-border)' }}>
                    <p style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '0.5rem' }}>{t.recommended}</p>
                    <p style={{ color: 'white', fontWeight: '700', fontSize: '1rem', marginBottom: '1.5rem' }}>{videoData.title}</p>
                    <button 
                      className="btn-primary" 
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${videoData.id}`, '_blank')}
                      style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', borderRadius: '12px', margin: '0 auto' }}
                    >
                      📺 {t.watchOnYoutube}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.02)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.3 }}>🎬</div>
                  <p style={{ color: 'white', opacity: 0.6, fontWeight: '600', marginBottom: '2rem', maxWidth: '300px' }}>{t.fallbackMsg}</p>
                  <button 
                    className="btn-primary" 
                    onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`, '_blank')}
                    style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', borderRadius: '18px', background: '#e11d48', border: 'none', boxShadow: '0 10px 25px rgba(225, 29, 72, 0.4)' }}
                  >
                    🔍 {t.searchOnYoutube}
                  </button>
                </div>
              )}
           </div>

           {videoData.id && (
             <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button 
                  className="btn-ghost" 
                  onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`, '_blank')}
                  style={{ fontSize: '0.85rem', opacity: 0.6 }}
                >
                  {t.searchOnYoutube}
                </button>
             </div>
           )}
        </div>

        <button className="btn-primary" onClick={onNext} style={{ width: '100%', padding: '1.5rem', fontSize: '1.3rem', borderRadius: '22px' }}>
          🚀 {t.nextBtn}
        </button>
      </div>
    </div>
  );
};

export default Slide3_Bio;
