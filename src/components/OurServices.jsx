import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';
import './OurServices.css';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    title: 'Pooja Room Designs',
    image: '/services/pooja-room.png',
    description: 'We provide elegant pooja room design solutions with suitable artistic and traditional options that elevate your sacred space.',
  },
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
        <span className="services__label">Premium Craftsmanship</span>
        <h2 className="services__title">Our Services</h2>
        <div className="services__divider"></div>
      </div>

      {/* Cards */}
      <div className="services__grid">
        {services.map((service, index) => (
          <div className="services__card" key={index} id={`service-card-${index}`}>
            <div className="services__card-image-wrapper">
              <img
                src={service.image}
                alt={service.title}
                className="services__card-image"
                loading="lazy"
              />
              <div className="services__card-image-overlay"></div>
            </div>
            <div className="services__card-content">
              <div className="services__card-icon">
                {service.icon}
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-text">{service.description}</p>
              <a href="#explore" className="services__card-btn">
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
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
