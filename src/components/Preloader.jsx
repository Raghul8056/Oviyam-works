import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for fonts + initial assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Top curtain */}
          <motion.div
            className="preloader__curtain preloader__curtain--top"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="preloader__curtain preloader__curtain--bottom"
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          {/* Logo */}
          <motion.div
            className="preloader__content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="preloader__logo-wrapper">
              <img src="/logo.png" alt="Oviyam" className="preloader__logo" />
            </div>
            <div className="preloader__bar-track">
              <motion.div
                className="preloader__bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </motion.div>

          {/* Floating particles */}
          <div className="preloader__particles">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="preloader__particle" style={{
                left: `${8 + Math.random() * 84}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
