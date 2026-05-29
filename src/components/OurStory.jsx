import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';
import './OurStory.css';

/* 3D Tilt Image Component */
const TiltImage = ({ src, alt, className, id }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.isArray(src) ? src : [src];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3500); // 3.5s per image
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className={`our-story__tilt-wrapper ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {images.map((imgSrc, index) => (
        <img 
          key={imgSrc}
          src={imgSrc} 
          alt={`${alt} ${index + 1}`} 
          className={`our-story__image ${index === currentIndex ? 'our-story__image--active' : 'our-story__image--hidden'}`} 
          id={id ? `${id}-${index}` : undefined} 
        />
      ))}
      <div className="our-story__image-shine" />
    </motion.div>
  );
};

const OurStory = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Section title word reveal —
      const title = sectionRef.current?.querySelector('.our-story__title');
      if (title) {
        const words = title.textContent.split(' ');
        title.innerHTML = words
          .map(
            (word) =>
              `<span class="word-wrap"><span class="word-inner">${word}</span></span>`
          )
          .join(' ');

        gsap.fromTo(
          title.querySelectorAll('.word-inner'),
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // — Label fade up —
      gsap.fromTo(
        '.our-story__label',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.our-story__label',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Divider animate width —
      gsap.fromTo(
        '.our-story__divider',
        { width: 0 },
        {
          width: 60,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.our-story__divider',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Subtitle fade —
      gsap.fromTo(
        '.our-story__subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.our-story__subtitle',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Generation title reveal —
      const genTitle = sectionRef.current?.querySelector('.our-story__generation-title');
      if (genTitle) {
        const words = genTitle.textContent.split(' ');
        genTitle.innerHTML = words
          .map(
            (word) =>
              `<span class="word-wrap"><span class="word-inner">${word}</span></span>`
          )
          .join(' ');

        gsap.fromTo(
          genTitle.querySelectorAll('.word-inner'),
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: genTitle,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // — Generation text paragraphs stagger —
      gsap.fromTo(
        '.our-story__generation-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.our-story__generation-content',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Parallax images at different speeds —
      // Generation image (slower)
      const genImg = sectionRef.current?.querySelector('.our-story__generation-image');
      if (genImg) {
        gsap.fromTo(
          genImg,
          { y: -30 },
          {
            y: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: genImg,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // — Artisans section title —
      const artTitle = sectionRef.current?.querySelector('.our-story__artisans-title');
      if (artTitle) {
        gsap.fromTo(
          artTitle,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: artTitle,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // — Artisans divider —
      gsap.fromTo(
        '.our-story__artisans-divider',
        { width: 0 },
        {
          width: 40,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.our-story__artisans-divider',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Artisans text stagger —
      gsap.fromTo(
        '.our-story__artisans-text',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.our-story__artisans-center',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // — Parallax on side images —
      const leftImg = sectionRef.current?.querySelector('.our-story__artisans-left');
      const rightImg = sectionRef.current?.querySelector('.our-story__artisans-right');
      if (leftImg) {
        gsap.fromTo(
          leftImg,
          { y: 40 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: { trigger: leftImg, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          }
        );
      }
      if (rightImg) {
        gsap.fromTo(
          rightImg,
          { y: -30 },
          {
            y: 50,
            ease: 'none',
            scrollTrigger: { trigger: rightImg, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="our-story" id="our-story" ref={sectionRef}>
      {/* Part 1: Our Story heading — centered */}
      <div className="our-story__intro">
        <span className="our-story__label">Heritage</span>
        <h2 className="our-story__title">Our Story</h2>
        <div className="our-story__divider"></div>
        <p className="our-story__subtitle">
          A legacy of devotion, artistry, and timeless tradition — preserved through generations.
        </p>
      </div>

      {/* Part 2: 3rd Generation Artisans */}
      <div className="our-story__generation">
        <div className="our-story__generation-content">
          <h3 className="our-story__generation-title">
            We Are 3rd Generation Artisans
          </h3>
          <p className="our-story__generation-text">
            For over seven decades, our family has been dedicated to the ancient art of 
            Tanjore painting. What began with our grandfather in the sacred city of Thanjavur 
            has evolved into a celebrated tradition, carried forward with the same reverence 
            and meticulous craftsmanship. Each piece we create is a testament to our lineage — 
            blending 22-carat gold foils, precious stones, and vivid natural pigments to bring 
            divine stories to life.
          </p>
          <p className="our-story__generation-text">
            Our artisans undergo years of rigorous training, mastering the intricate techniques 
            of gesso work, gold leafing, and stone setting that define authentic Tanjore art. 
            Every brushstroke carries the wisdom of three generations.
          </p>
        </div>
        <div className="our-story__generation-image">
          <TiltImage
            src={['/story/artisan.png', '/story/artisan-2.png', '/story/artisan-3.png']}
            alt="Artisan at Work"
            id="story-artisan-img"
          />
        </div>
      </div>

      {/* Part 3: About the Artisans — 3-column layout */}
      <div className="our-story__artisans">
        <div className="our-story__artisans-left">
          <img
            src="/story/temple-cutout.png"
            alt="Thanjavur Periya Kovil Cutout"
            className="our-story__image-watermark"
            id="story-temple-img"
          />
        </div>

        <div className="our-story__artisans-center">
          <h3 className="our-story__artisans-title">About the Artisans</h3>
          <div className="our-story__artisans-divider"></div>
          <p className="our-story__artisans-text">
            Rooted in the cultural heartland of Thanjavur, our artisans are the custodians of 
            a 400-year-old art form that originated in the Maratha courts of South India.
          </p>
          <p className="our-story__artisans-text">
            Each painting begins with a prayer and a wooden panel. Layers of limestone paste 
            and cloth create the foundation, upon which our artists meticulously sketch 
            divine figures, adorn them with 22K gold foil, and embed semi-precious stones — 
            a process that can take weeks or even months.
          </p>
          <p className="our-story__artisans-text">
            At Oviyam, we don't just create art — we preserve a sacred tradition and share 
            it with the world.
          </p>
        </div>

        <div className="our-story__artisans-right">
          <img
            src="/story/mural.png"
            alt="Traditional Mural Painting"
            className="our-story__image our-story__image--tall"
            id="story-mural-img"
          />
        </div>
      </div>
    </section>
  );
};

export default OurStory;
