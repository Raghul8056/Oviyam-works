import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { gsap } from '../hooks/useGSAP';
import './Cta.css';

/* Magnetic Button — follows cursor when nearby */
const MagneticButton = ({ children, href }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className="cta-section__btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.a>
  );
};

const Cta = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Title word reveal —
      const titleEl = sectionRef.current?.querySelector('.cta-section__title');
      if (titleEl) {
        // Preserve the highlight span
        const highlightSpan = titleEl.querySelector('.cta-section__title-highlight');
        const mainText = titleEl.childNodes[0]?.textContent || '';
        const highlightText = highlightSpan?.textContent || '';

        // Rebuild with word wraps
        const mainWords = mainText.trim().split(' ').filter(Boolean);
        const highlightWords = highlightText.trim().split(' ').filter(Boolean);

        titleEl.innerHTML = mainWords
          .map((w) => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
          .join(' ') +
          '<span class="cta-section__title-highlight">' +
          highlightWords
            .map((w) => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
            .join(' ') +
          '</span>';

        gsap.fromTo(
          titleEl.querySelectorAll('.word-inner'),
          { y: '100%', opacity: 0 },
          {
            y: '0%', opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: titleEl, start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      }

      // — Divider —
      gsap.fromTo(
        '.cta-section__divider',
        { width: 0 },
        {
          width: 60, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.cta-section__divider', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Subtitle —
      gsap.fromTo(
        '.cta-section__subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.cta-section__subtitle', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Button —
      gsap.fromTo(
        '.cta-section__btn',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: '.cta-section__btn', start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-section" id="contact-us" ref={sectionRef}>
      {/* Floating gold particles */}
      <div className="cta-section__particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="cta-section__particle"
            style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${5 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="cta-section__container">
        <h2 className="cta-section__title">
          LET'S MAKE SOMETHING
          <span className="cta-section__title-highlight">DIVINE TOGETHER</span>
        </h2>
        
        <div className="cta-section__divider"></div>
        
        <p className="cta-section__subtitle">
          Bring your spiritual vision to life with a custom, handcrafted Tanjore painting. Connect with our master artisans to discuss personalized designs, sizes, and specific deity portrayals.
        </p>

        <MagneticButton href="#consultation-form">
          Book Free Consultation
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </MagneticButton>
      </div>
    </section>
  );
};

export default Cta;
