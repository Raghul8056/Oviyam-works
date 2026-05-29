import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../hooks/useGSAP';
import './OurWorks.css';

const worksGallery = [
  {
    title: 'Vaishnava Collection',
    subtitle: 'Sacred Traditions',
    image: '/collections/vaishnava.png',
    sizeClass: 'works__item--large',
  },
  {
    title: 'Shaiva Collection',
    subtitle: 'Divine Power',
    image: '/collections/shaiva.png',
    sizeClass: 'works__item--wide',
  },
  {
    title: 'Divine Feminine',
    subtitle: 'Goddess Energy',
    image: '/collections/devi.png',
    sizeClass: 'works__item--tall',
  },
  {
    title: 'Nagara Style',
    subtitle: 'Architectural Art',
    image: '/services/custom.png',
    sizeClass: 'works__item--small',
  },
  {
    title: 'Dravidian Style',
    subtitle: 'Temple Heritage',
    image: '/services/pooja-room.png',
    sizeClass: 'works__item--small',
  },
  {
    title: 'Krishna Special',
    subtitle: 'Divine Play',
    image: '/services/2d-3d.png',
    sizeClass: 'works__item--small',
  },
  {
    title: 'Fusion Heritage',
    subtitle: 'Contemporary Blend',
    image: '/story/tanjore-art.png',
    sizeClass: 'works__item--small',
  },
];

/* Hover spring card */
const WorkItem = ({ item, index }) => {
  return (
    <motion.div
      className={`works__item ${item.sizeClass}`}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      <img src={item.image} alt={item.title} className="works__image" loading="lazy" />
      <div className="works__overlay">
        <motion.h3
          className="works__item-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {item.title}
        </motion.h3>
        <motion.span
          className="works__item-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {item.subtitle}
        </motion.span>
      </div>
    </motion.div>
  );
};

const OurWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Title word reveal —
      const title = sectionRef.current?.querySelector('.works__title');
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
        '.works__divider',
        { width: 0 },
        {
          width: 60, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.works__divider', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Subtitle fade —
      gsap.fromTo(
        '.works__subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.works__subtitle', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Gallery items staggered waterfall reveal —
      const items = gsap.utils.toArray('.works__item');
      gsap.fromTo(
        items,
        { y: 60, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.works__gallery',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Parallax each image within its container —
      items.forEach((item) => {
        const img = item.querySelector('.works__image');
        if (img) {
          gsap.fromTo(
            img,
            { y: -15 },
            {
              y: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
              },
            }
          );
        }
      });

      // — CTA button —
      gsap.fromTo(
        '.works__explore-btn',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: '.works__footer', start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="works" id="our-works" ref={sectionRef}>
      <div className="works__header">
        <h2 className="works__title">Our Works</h2>
        <div className="works__divider"></div>
        <p className="works__subtitle">
          Every artwork is a reflection of tradition, devotion, and handcrafted excellence passed through generations of skilled artisans.
        </p>
      </div>

      <div className="works__gallery">
        {worksGallery.map((item, index) => (
          <WorkItem key={index} item={item} index={index} />
        ))}
      </div>

      <div className="works__footer">
        <a href="#explore-works" className="works__explore-btn">
          Explore Works
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default OurWorks;
