'use client';
import { useEffect, useRef } from 'react';

// Vertical connector for the Experience timeline. Draws itself top-to-bottom
// on scroll-into-view (scaleY 0->1), and fades from live green at the top
// (present) to a dimmed gray at the bottom (past), matching the per-role dot
// treatment in Experience.tsx.
export default function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

    const timer = setTimeout(() => observer.observe(el), 100);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute -left-[7.1px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-nex-green via-nex-green/25 to-white/15 shadow-[0_0_8px_rgba(34,181,97,0.4)]"
    />
  );
}
