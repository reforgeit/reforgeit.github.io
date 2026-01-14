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
  // MOBILE NAVIGATION (Phase 5)
  // Hamburger menu toggle with accessibility
  // ==========================================================================

  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileNav) {
    function openNav() {
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
      // Focus first nav link for accessibility
      if (mobileNavLinks.length > 0) {
        mobileNavLinks[0].focus();
      }
    }

    function closeNav() {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
    }

    function toggleNav() {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    }

    // Click handler
    hamburger.addEventListener('click', toggleNav);

    // Close on nav link click
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
        closeNav();
        hamburger.focus();
      }
    });

    // Close on click outside (on the overlay background)
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeNav();
      }
    });
  }

  // ==========================================================================
  // HERO TYPING ANIMATION (Phase 4)
  // Character-by-character typing effect for hero headline
  // ==========================================================================

  const typedTextEl = document.querySelector('.typed-text');

  if (typedTextEl && motionAllowed()) {
    const text = typedTextEl.textContent;
    const cursor = document.querySelector('.typed-cursor');

    // Check if we've already shown the animation this session
    const hasAnimated = sessionStorage.getItem('heroAnimated');

    if (!hasAnimated) {
      // Hide text initially
      typedTextEl.textContent = '';
      typedTextEl.style.visibility = 'visible';

      let charIndex = 0;
      const typingSpeed = 50; // ms per character

      function typeChar() {
        if (charIndex < text.length) {
          typedTextEl.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, typingSpeed);
        } else {
          // Animation complete, mark as done for this session
          sessionStorage.setItem('heroAnimated', 'true');
        }
      }

      // Start typing after a brief delay for page load
      setTimeout(typeChar, 300);
    }
  }

  // ==========================================================================
  // HERO STAGGERED ENTRANCE (Phase 4)
  // Animate hero elements in sequence
  // ==========================================================================

  if (motionAllowed()) {
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    const staggerDelay = 200; // ms between each element

    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * staggerDelay);
    });
  } else {
    // Show immediately if motion is reduced
    document.querySelectorAll('.hero .animate-on-scroll').forEach(el => {
      el.classList.add('animate-in');
    });
  }

  // ==========================================================================
  // INTERSECTION OBSERVER - Scroll-triggered animations (Phase 3)
  // Animates elements as they enter the viewport
  // ==========================================================================

  if ('IntersectionObserver' in window && motionAllowed()) {
    // Exclude hero elements (already handled above)
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll:not(.hero .animate-on-scroll)');

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
  } else if (!motionAllowed()) {
    // If reduced motion, show all immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('animate-in');
    });
  }

})();
