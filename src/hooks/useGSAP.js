import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize GSAP ScrollTrigger defaults and refresh on load.
 */
export const useGSAPInit = () => {
  useEffect(() => {
    // Set GSAP defaults for smooth, premium feel
    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    });

    // Refresh ScrollTrigger after all images load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};

/* ──────────────── Animation Factories ──────────────── */

/**
 * Scroll-triggered fade-up animation for a set of elements.
 * @param {string} selector - CSS selector for elements to animate
 * @param {object} opts - Optional overrides
 */
export const animateFadeUp = (selector, opts = {}) => {
  const elements = gsap.utils.toArray(selector);
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: opts.duration || 1,
        delay: opts.delay || 0,
        ease: opts.ease || 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: opts.start || 'top 85%',
          toggleActions: 'play none none none',
          ...opts.scrollTrigger,
        },
      }
    );
  });
};

/**
 * Stagger-reveal a group of children within a container.
 */
export const animateStagger = (containerSelector, childSelector, opts = {}) => {
  const containers = gsap.utils.toArray(containerSelector);
  containers.forEach((container) => {
    const children = container.querySelectorAll(childSelector);
    gsap.fromTo(
      children,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: opts.duration || 0.9,
        stagger: opts.stagger || 0.15,
        ease: opts.ease || 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: opts.start || 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
};

/**
 * Parallax an element relative to scroll.
 */
export const animateParallax = (selector, opts = {}) => {
  const elements = gsap.utils.toArray(selector);
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: opts.from || -40 },
      {
        y: opts.to || 40,
        ease: 'none',
        scrollTrigger: {
          trigger: opts.trigger ? el.closest(opts.trigger) : el,
          start: opts.start || 'top bottom',
          end: opts.end || 'bottom top',
          scrub: opts.scrub || 1,
        },
      }
    );
  });
};

/**
 * Animate a horizontal line/divider width from 0 to target.
 */
export const animateDivider = (selector, opts = {}) => {
  const elements = gsap.utils.toArray(selector);
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { width: 0 },
      {
        width: opts.width || 60,
        duration: opts.duration || 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
};

/**
 * Character-by-character text reveal using clip-path.
 */
export const animateTextReveal = (selector, opts = {}) => {
  const elements = gsap.utils.toArray(selector);
  elements.forEach((el) => {
    // Wrap each word in a span
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="word-wrap"><span class="word-inner">${word}</span></span>`
      )
      .join(' ');

    const innerWords = el.querySelectorAll('.word-inner');
    gsap.fromTo(
      innerWords,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: opts.duration || 0.7,
        stagger: opts.stagger || 0.05,
        ease: opts.ease || 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: opts.start || 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
};

export { gsap, ScrollTrigger };
