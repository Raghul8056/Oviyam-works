import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useGSAP';
import './OurServices.css';

const services = [
  {
    badge: 'HANDCRAFTED',
    number: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: '2D & 3D Designs',
    image: '/services/2d-3d.png',
    description: 'Specialised in creating premium Tanjore paintings in both 2D and 3D styles, with intricate gold leaf relief and gemstone embellishments.',
  },
  {
    badge: 'CUSTOM MADE',
    number: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: 'Custom Designs',
    image: '/services/custom.png',
    description: 'We create artworks in fully customized designs and custom sizes based on client preferences, bringing your divine vision to life.',
  },
  {
    badge: 'COMPLETE SOLUTIONS',
    number: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    title: 'Pooja Room Designs',
    image: '/services/pooja-room.png',
    description: 'We provide elegant pooja room design solutions with suitable artistic and traditional options that elevate your sacred space.',
  },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9Z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
    title: 'Premium Quality',
    desc: 'Finest materials & craftsmanship'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Custom Made',
    desc: 'Tailored to your preferences'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Secure Packaging',
    desc: 'Safe delivery across India'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: 'Expert Consultation',
    desc: 'Guidance at every step'
  }
];

const OurServices = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.services__header > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services__header',
            start: 'top 85%',
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        '.services__card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.services__grid',
            start: 'top 80%',
          },
        }
      );

      // Features bar reveal
      gsap.fromTo(
        '.services__features',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services__features',
            start: 'top 90%',
          },
        }
      );

      // CTA Form box
      gsap.fromTo(
        '.services__cta-box',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services__cta-container',
            start: 'top 85%',
          },
        }
      );

      // CTA Temple Watermark Parallax
      gsap.fromTo(
        '.services__cta-watermark',
        { y: 150 },
        {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: '.services__cta-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1, // Smooth scrubbing
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="our-services" ref={sectionRef}>

      {/* Header */}
      <div className="services__header">
        <span className="services__label">OUR SERVICES</span>
        <h2 className="services__title">Crafting Divine Experiences</h2>
        <div className="services__ornament">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.8">
             <path d="M50 20 L60 40 L80 50 L60 60 L50 80 L40 60 L20 50 L40 40 Z" fill="none"/>
             <circle cx="50" cy="50" r="5" fill="#C9A96E" />
             <line x1="0" y1="50" x2="35" y2="50" strokeWidth="1" stroke="#C9A96E" />
             <line x1="65" y1="50" x2="100" y2="50" strokeWidth="1" stroke="#C9A96E" />
          </svg>
        </div>
        <p className="services__subtitle">
          From traditional Tanjore art to complete pooja room solutions,<br />
          we bring devotion, artistry & craftsmanship together.
        </p>
      </div>

      {/* Cards */}
      <div className="services__grid">
        {services.map((service, index) => (
          <div className="services__card" key={index} id={`service-card-${index}`}>
            <div className="services__card-image-wrapper">
              <span className="services__card-badge">{service.badge}</span>
              <img
                src={service.image}
                alt={service.title}
                className="services__card-image"
                loading="lazy"
              />
              <div className="services__card-image-overlay"></div>
              <div className="services__card-icon-overlap">
                {service.icon}
              </div>
            </div>
            
            <div className="services__card-content">
              <div className="services__card-watermark">{service.number}</div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-text">{service.description}</p>
              <a href="#explore" className="services__card-btn">
                EXPLORE MORE
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Features Bar */}
      <div className="services__features">
        {features.map((feature, idx) => (
          <div className="services__feature-item" key={idx}>
            <div className="services__feature-icon">{feature.icon}</div>
            <div className="services__feature-text">
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
            {idx < features.length - 1 && <div className="services__feature-divider"></div>}
          </div>
        ))}
      </div>

      {/* Inquiry Form CTA */}
      <div className="services__cta-container" id="consultation-form">
        
        {/* Massive Temple Watermark on the Right */}
        <img 
          src="/story/temple-cutout.png" 
          alt="Tanjore Temple Alternate Angle" 
          className="services__cta-watermark" 
        />

        <div className="services__cta-box">
          <h3 className="services__cta-title">Request a Consultation</h3>
          <p className="services__cta-subtitle">Have a custom requirement or inquiry? We would love to hear from you.</p>

          <form className="services__form" onSubmit={(e) => e.preventDefault()}>
            <div className="services__form-row">
              <div className="services__form-group">
                <label htmlFor="name" className="services__form-label">Full Name</label>
                <input type="text" id="name" className="services__form-input" placeholder="Enter your name" />
              </div>
              <div className="services__form-group">
                <label htmlFor="phone" className="services__form-label">Phone Number</label>
                <input type="tel" id="phone" className="services__form-input" placeholder="Enter phone number" />
              </div>
            </div>

            <div className="services__form-group">
              <label htmlFor="email" className="services__form-label">Email Address</label>
              <input type="email" id="email" className="services__form-input" placeholder="Enter email address" />
            </div>

            <div className="services__form-group">
              <label htmlFor="message" className="services__form-label">Anything you want to ask?</label>
              <textarea id="message" className="services__form-textarea" placeholder="Tell us about your requirements..."></textarea>
            </div>

            <button type="submit" className="services__form-submit">
              <span>Send Inquiry</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
