import React, { useRef, useState } from 'react';
import './VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="video-section">
      <div className="video-section__container" onClick={togglePlay}>
        
        <video 
          ref={videoRef}
          className="video-section__video" 
          src="/videos/user-video.mp4" 
          loop 
          playsInline
        />

        <div className={`video-section__overlay ${isPlaying ? 'video-section__overlay--hidden' : ''}`}>
          <button className="video-section__play-btn" aria-label="Play Video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="video-section__text">
            <h3 className="video-section__title">The Art of Devotion</h3>
            <p className="video-section__subtitle">Watch how our master artisans bring divine visions to life.</p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default VideoSection;
