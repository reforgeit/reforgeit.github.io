/**
 * Main JavaScript for World-Class UI/UX Enhancement
 * Handles scroll detection, animations, and interactions
 */

(function() {
  'use strict';

  // ==========================================================================
  // SCROLL DETECTION - Header enhancement on scroll
  // ==========================================================================

  const header = document.querySelector('.site-header');

  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial state
    handleScroll();
  }

  // ==========================================================================
  // REDUCED MOTION - Respect user preferences
  // ==========================================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Helper function to check if motion is allowed
  function motionAllowed() {
    return !prefersReducedMotion.matches;
  }

  // ==========================================================================
  // INTERSECTION OBSERVER - Scroll-triggered animations (Phase 3)
  // Prepared for future use, currently just marks elements as visible
  // ==========================================================================

  if ('IntersectionObserver' in window && motionAllowed()) {
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');

    if (animateOnScroll.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      animateOnScroll.forEach(el => observer.observe(el));
    }
  } else {
    // If no IntersectionObserver or reduced motion, show all immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('animate-in');
    });
  }

})();
