import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../hooks/useGSAP';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Staggered column fade-in —
      const columns = gsap.utils.toArray('.footer__column');
      gsap.fromTo(
        columns,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.footer__container', start: 'top 88%', toggleActions: 'play none none none' },
        }
      );

      // — Copyright bar —
      gsap.fromTo(
        '.footer__bottom',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: '.footer__bottom', start: 'top 95%', toggleActions: 'play none none none' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__container">
        {/* Column 1: Brand */}
        <div className="footer__column footer__brand">
          <img src="/logo.png" alt="Oviyam" className="footer__logo-img" />
          <p className="footer__desc">
            Exquisite handcrafted Tanjore art, preserving divine traditions and timeless craftsmanship for generations to come.
          </p>
          <div className="footer__socials">
            {[
              { label: 'Instagram', href: '#instagram', path: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></> },
              { label: 'Facebook', href: '#facebook', path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path> },
              { label: 'Pinterest', href: '#pinterest', path: <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.67 7.9 6.44 9.38-.08-.79-.15-2 .03-2.87.16-.78 1.05-4.46 1.05-4.46s-.26-.53-.26-1.3c0-1.22.7-2.13 1.58-2.13.75 0 1.11.56 1.11 1.23 0 .76-.48 1.89-.73 2.94-.2.88.44 1.6 1.3 1.6 1.57 0 2.77-1.65 2.77-4.04 0-2.12-1.52-3.6-3.7-3.6-2.54 0-4.03 1.9-4.03 3.87 0 .76.29 1.58.66 2.02.07.08.08.16.06.24-.06.26-.2.83-.23.94-.04.13-.13.16-.27.09-1-.48-1.63-2-1.63-3.23 0-2.63 1.9-5.05 5.53-5.05 2.93 0 5.2 2.08 5.2 4.88 0 2.9-1.83 5.24-4.38 5.24-.85 0-1.65-.44-1.92-.96l-.53 2c-.19.72-.7 1.63-1.05 2.18 1.14.34 2.34.52 3.58.52 5.52 0 10-4.48 10-10S17.52 2 12 2z"></path> },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                className="footer__social-link"
                aria-label={social.label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {social.path}
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2: Links */}
        <div className="footer__column">
          <h4 className="footer__heading">Explore</h4>
          <ul className="footer__links">
            <li><a href="#our-story">Our Story</a></li>
            <li><a href="#our-services">Our Services</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#pooja-rooms">Pooja Rooms</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer__column">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__contact">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +91 98765 43210
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              hello@oviyam.com
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Chennai, Tamil Nadu
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2026 OVIYAM TANJORE ART GALLERY | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
