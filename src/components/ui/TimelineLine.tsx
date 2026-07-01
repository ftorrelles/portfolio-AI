'use client';
import { useEffect, useRef } from 'react';

// Vertical connector for the Experience timeline. Measures the actual dot
// elements (marked with data-timeline-dot) so it starts exactly at the first
// dot and ends exactly at the last one, instead of spanning the whole
// section. Draws itself top-to-bottom on scroll-into-view, fading from live
// green at the top (present) to a dimmed gray at the bottom (past).
export default function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const positionLine = () => {
      const dots = parent.querySelectorAll<HTMLElement>('[data-timeline-dot]');
      if (dots.length < 2) return;
      const parentRect = parent.getBoundingClientRect();
      const centers = Array.from(dots).map((dot) => {
        const r = dot.getBoundingClientRect();
        return r.top + r.height / 2 - parentRect.top;
      });
      const top = Math.min(...centers);
      const bottom = Math.max(...centers);
      el.style.top = `${top}px`;
      el.style.height = `${bottom - top}px`;
    };

    positionLine();

    // Each role entry (AnimatedEntry) only fades/slides in once it scrolls
    // into view, which can happen long after mount — re-measure whenever
    // one of those transforms actually finishes, instead of guessing a
    // fixed delay.
    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'transform') positionLine();
    };
    parent.addEventListener('transitionend', handleTransitionEnd);

    el.style.transform = 'scaleY(0)';
    el.style.transformOrigin = 'top';
    el.style.transition = 'transform 1.4s ease-out';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'scaleY(1)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const obsTimer = setTimeout(() => observer.observe(el), 100);

    window.addEventListener('resize', positionLine);
    return () => {
      clearTimeout(obsTimer);
      observer.disconnect();
      parent.removeEventListener('transitionend', handleTransitionEnd);
      window.removeEventListener('resize', positionLine);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute -left-[7.1px] w-[3px] rounded-full bg-gradient-to-b from-nex-green via-nex-green/25 to-white/15 shadow-[0_0_8px_rgba(34,181,97,0.4)] z-0"
    />
  );
}
