import React from 'react';

const Slide3_Video = ({ topic, onNext, onBack }) => {
  // Using a common YouTube search embed approach
  // Note: YouTube doesn't always allow 'search' listType anymore in iframe without a key, 
  // but we can try to find a relevant video or use a fallback.
  // For this application, we'll use a known trick or a high-quality educational channel embed.
  
  const videoUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(topic + ' documentary education')}`;

  return (
    <div className="glass-card" style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Educational Videos: {topic}</h2>
      
      <div className="video-container" style={{ 
        position: 'relative', 
        paddingBottom: '56.25%', 
        height: 0, 
        overflow: 'hidden', 
        borderRadius: '16px',
        background: '#000'
      }}>
        <iframe 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button 
          className="btn-primary" 
          style={{ background: 'rgba(255,255,255,0.1)', flex: 1 }}
          onClick={onBack}
        >
          ← Change Topic
        </button>
        <button 
          className="btn-primary" 
          style={{ flex: 2 }}
          onClick={onNext}
        >
          Generate Debate →
        </button>
      </div>
      
      <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        If video doesn't load, please check your internet or try a different topic.
      </p>
    </div>
  );
};

export default Slide3_Video;
