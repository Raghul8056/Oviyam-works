import { useEffect, useRef, useState } from 'react';
import { gsap } from '../hooks/useGSAP';
import './OurStats.css';

const AnimatedNumber = ({ target, suffix = '' }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    // Parse numeric part
    const numStr = target.replace(/[^0-9]/g, '');
    const num = parseInt(numStr, 10);

    const trigger = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: num,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              const v = Math.floor(obj.val);
              // Format with commas
              const formatted = v.toLocaleString();
              setDisplay(formatted + suffix);
            },
          });
        },
      },
    });

    return () => trigger.kill();
  }, [target, suffix]);

  return <span ref={ref} className="stats__number">{display}</span>;
};

const OurStats = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Title word reveal —
      const title = sectionRef.current?.querySelector('.stats__title');
      if (title) {
        const words = title.textContent.split(' ');
        title.innerHTML = words
          .map((w) => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
          .join(' ');
        gsap.fromTo(
          title.querySelectorAll('.word-inner'),
          { y: '100%', opacity: 0 },
          {
            y: '0%', opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // — Divider —
      gsap.fromTo(
        '.stats__divider',
        { width: 0 },
        {
          width: 60, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.stats__divider', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Subtitle —
      gsap.fromTo(
        '.stats__subtitle',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: '.stats__subtitle', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Labels fade in —
      gsap.fromTo(
        '.stats__label',
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.2, delay: 0.5,
          scrollTrigger: { trigger: '.stats__container', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // — Border lines animate —
      gsap.fromTo(
        '.stats__container',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.stats__container', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" id="our-stats" ref={sectionRef}>
      {/* Subtle background texture */}
      <div className="stats__bg-texture" />

      <div className="stats__header">
        <h2 className="stats__title">Our Work In Numbers</h2>
        <div className="stats__divider"></div>
        <p className="stats__subtitle">
          Committed to excellence through tradition, craftsmanship, and timeless artistry.
        </p>
      </div>

      <div className="stats__container">
        <div className="stats__item">
          <AnimatedNumber target="2053" suffix="+" />
          <span className="stats__label">Projects</span>
        </div>
        
        <div className="stats__item">
          <AnimatedNumber target="14" suffix="+" />
          <span className="stats__label">Years</span>
        </div>

        <div className="stats__item">
          <AnimatedNumber target="50" suffix="+" />
          <span className="stats__label">Artisans</span>
        </div>

        <div className="stats__item">
          <AnimatedNumber target="3" suffix="" />
          <span className="stats__label">Generations</span>
        </div>
      </div>
    </section>
  );
};

export default OurStats;
