import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from '../hooks/useGSAP';
import './OurCollections.css';

const collections = [
  {
    title: 'Vaishnava Collection',
    description: 'Sacred artworks inspired by Vishnu traditions and divine stories.',
    image: '/collections/vaishnava.png',
  },
  {
    title: 'Shaiva Collection',
    description: 'Powerful depictions rooted in Shaivite culture and devotion.',
    image: '/collections/shaiva.png',
  },
  {
    title: 'Krishna Special',
    description: 'Joyful expressions of Krishna\u2019s divine leelas and childhood beauty.',
    image: '/services/2d-3d.png',
  },
  {
    title: 'Divine Feminine Collection',
    description: 'Embodying the supreme energy of goddesses with grace and power.',
    image: '/collections/devi.png',
  },
  {
    title: 'Nagara Style',
    description: 'Architectural elegance inspired by North Indian temple traditions.',
    image: '/services/custom.png',
  },
  {
    title: 'Dravidian Style',
    description: 'Rich heritage art mirroring the grandeur of South Indian temples.',
    image: '/services/pooja-room.png',
  },
  {
    title: 'Kula Deivam Collection',
    description: 'Personalized sacred art of your ancestral family deities.',
    image: '/collections/vaishnava.png',
  },
  {
    title: 'Local Deivam Collection',
    description: 'Vibrant portrayals of powerful regional guardian deities.',
    image: '/collections/shaiva.png',
  },
  {
    title: 'Fusion Heritage Collection',
    description: 'Traditional Tanjore techniques blended with contemporary themes.',
    image: '/services/custom.png',
  },
];

/* 3D Tilt Collection Card */
const CollectionCard = ({ item }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

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
      className="collections__card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
    >
      <div className="collections__card-bg">
        <img src={item.image} alt={item.title} loading="lazy" />
        <div className="collections__card-overlay"></div>
      </div>
      <div className="collections__card-content">
        <h3 className="collections__card-title">{item.title}</h3>
        <p className="collections__card-text">{item.description}</p>
      </div>
      <div className="collections__card-frame" />
    </motion.div>
  );
};

const OurCollections = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const reqRef = useRef(null);

  // Handle mouse wheel → manual horizontal scroll
  const handleWheel = useCallback((e) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    sliderRef.current.scrollLeft += e.deltaY + e.deltaX;
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Flawless infinite auto-scroll and manual wrap loop using scrollLeft
  const scrollLoop = useCallback(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    
    // Since we duplicated the items EXACTLY once, the midpoint is exactly half the total scrollable width
    const halfWidth = slider.scrollWidth / 2;
    
    // Auto-scroll when not hovering
    if (!isHovered) {
      slider.scrollLeft += 1.2; // Auto-scroll speed
    }
    
    // Seamless infinite wrap check
    // We add a tiny buffer (1px) to prevent precision issues on high-refresh monitors
    if (slider.scrollLeft >= halfWidth - 1) {
      slider.scrollLeft -= halfWidth; 
    } else if (slider.scrollLeft <= 0 && isHovered) {
      // If user scrolls backwards manually past 0, jump to the end of the first set
      slider.scrollLeft += halfWidth;
    }
    
    reqRef.current = requestAnimationFrame(scrollLoop);
  }, [isHovered]);

  // Attach wheel listener and start animation loop
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    reqRef.current = requestAnimationFrame(scrollLoop);
    
    return () => {
      if (slider) {
        slider.removeEventListener('wheel', handleWheel);
      }
      cancelAnimationFrame(reqRef.current);
    };
  }, [scrollLoop, handleWheel]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Title word reveal —
      const title = sectionRef.current?.querySelector('.collections__title');
      if (title) {
        const words = title.textContent.split(' ');
        title.innerHTML = words
          .map((w) => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
          .join(' ');
        gsap.fromTo(
          title.querySelectorAll('.word-inner'),
          { y: '100%', opacity: 0 },
          {
            y: '0%', opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // — Divider —
      gsap.fromTo(
        '.collections__divider',
        { width: 0 },
        {
          width: 60, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.collections__divider', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — Subtitle fade —
      gsap.fromTo(
        '.collections__subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.collections__subtitle', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // — CTA button fade —
      gsap.fromTo(
        '.collections__explore-btn',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: '.collections__footer', start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="collections" id="categories" ref={sectionRef}>
      {/* Background overlay pattern */}
      <div className="collections__bg-pattern"></div>

      <div className="collections__header">
        <h2 className="collections__title">Explore Our Collections</h2>
        <div className="collections__divider"></div>
        <p className="collections__subtitle">
          From sacred traditions to timeless craftsmanship, each collection reflects the spiritual essence and artistic heritage of handcrafted Tanjore paintings.
        </p>
      </div>

      <div
        className={`collections__slider-wrapper ${isHovered ? 'collections__slider-wrapper--manual' : ''}`}
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="collections__carousel-track" ref={trackRef}>
          <div className="collections__carousel">
            {[...collections, ...collections].map((item, index) => (
              <CollectionCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="collections__footer">
        <a href="#all-collections" className="collections__explore-btn">
          ✨ Explore Collections
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default OurCollections;
