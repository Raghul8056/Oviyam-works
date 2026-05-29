import { useEffect, useRef } from 'react';
import './ParallaxBackground.css';

const ParallaxBackground = () => {
  const trackRef = useRef(null);

  // Parallax: slight vertical movement on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (trackRef.current) {
        const scrollY = window.scrollY;
        trackRef.current.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-bg" aria-hidden="true">
      <div className="parallax-bg__track" ref={trackRef}>
        <img src="/bg/temple-panorama-real.png" alt="Tanjore Temple" className="parallax-bg__img" />
        <img src="/bg/temple-panorama-real.png" alt="Tanjore Temple" className="parallax-bg__img" />
      </div>
      {/* White overlay for readability */}
      <div className="parallax-bg__overlay" />
      {/* Subtle ornamental pattern */}
      <div className="parallax-bg__pattern" />
    </div>
  );
};

export default ParallaxBackground;
