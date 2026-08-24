'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(
  staggerMs = 50
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('[data-reveal]');
    const targets = children.length > 0 ? Array.from(children) : [el];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = targets.indexOf(target);
            target.style.transitionDelay = `${index * staggerMs}ms`;
            target.classList.add('revealed');
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
