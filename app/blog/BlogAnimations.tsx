'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/utils/gsap';

export default function BlogAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      const header = document.querySelector('[data-blog-header]');
      if (header) {
        gsap.from(header.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Tags fade in
      const tags = document.querySelector('[data-blog-tags]');
      if (tags) {
        gsap.from(tags.children, {
          y: 10,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          delay: 0.6,
        });
      }

      // Divider draw-in
      const divider = document.querySelector('[data-blog-divider]');
      if (divider) {
        gsap.from(divider, {
          scaleX: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 0.8,
        });
      }

      // Cards stagger up with scroll trigger
      const cards = document.querySelectorAll('[data-blog-card]');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
