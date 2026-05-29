import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';
import './HeroSlider.css';

const HeroSlider = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Parallax video on scroll —
      gsap.to(videoRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // — Title character reveal —
      if (titleRef.current) {
        const text = titleRef.current.textContent;
        const chars = text.split('');
        titleRef.current.innerHTML = chars
          .map((char) =>
            char === ' '
              ? ' '
              : `<span class="hero-char">${char}</span>`
          )
          .join('');

        const charEls = titleRef.current.querySelectorAll('.hero-char');
        gsap.fromTo(
          charEls,
          { y: 80, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // — Tagline fade up —
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
        );
      }

      // — Explore button fade —
      const exploreBtn = sectionRef.current?.querySelector('.hero-slider__explore-btn');
      if (exploreBtn) {
        gsap.fromTo(
          exploreBtn,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' }
        );
      }

      // — Scroll indicator bounce —
      const scrollInd = sectionRef.current?.querySelector('.hero-slider__scroll-indicator');
      if (scrollInd) {
        gsap.fromTo(
          scrollInd,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 1.5 }
        );
        // Fade out on scroll
        gsap.to(scrollInd, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-slider" id="hero-slider" ref={sectionRef}>
      <div className="hero-slider__wrapper">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          className="hero-slider__video"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark gradient overlay */}
        <div className="hero-slider__overlay" />

        {/* Floating particles */}
        <div className="hero-slider__particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="hero-slider__particle"
              style={{
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Text Content */}
        <div className="hero-slider__content">
          <h1 className="hero-slider__title" ref={titleRef}>
            OVIYAM
          </h1>
          <p className="hero-slider__tagline" ref={taglineRef}>
            Sacred Art &nbsp;·&nbsp; Timeless Tradition
          </p>
        </div>
        {/* Explore Button inside video */}
        <div className="hero-slider__cta">
          <a href="#categories" className="hero-slider__explore-btn" id="hero-explore-btn">
            <span>Explore</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
        {/* Scroll indicator */}
        <div className="hero-slider__scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
