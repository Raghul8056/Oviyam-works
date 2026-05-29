import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useGSAP';
import './ParallaxDivider.css';

const ParallaxDivider = ({ image, alt, height = '50vh', overlay = 0.4, children }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax: image moves slower than scroll
      gsap.fromTo(
        imgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Fade-in content if any
      if (children) {
        const content = sectionRef.current?.querySelector('.parallax-divider__content');
        if (content) {
          gsap.fromTo(
            content,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <div
      className="parallax-divider"
      ref={sectionRef}
      style={{ height }}
    >
      <img
        ref={imgRef}
        src={image}
        alt={alt || 'Tanjore Art'}
        className="parallax-divider__image"
        loading="lazy"
      />
      <div
        className="parallax-divider__overlay"
        style={{ background: `rgba(10, 10, 10, ${overlay})` }}
      />
      {children && (
        <div className="parallax-divider__content">
          {children}
        </div>
      )}
    </div>
  );
};

export default ParallaxDivider;
