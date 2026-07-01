'use client';
import { useEffect, useState } from 'react';

interface Props {
  value: number;
  suffix?: string;
  label?: string;
}

// Width animates 0 -> target via CSS transition (not JS-driven), triggered
// by flipping a mounted flag one tick after mount so the transition fires.
export default function Grow({ value, suffix = '', label }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full bg-nex-green transition-[width] duration-[1200ms] ease-out"
          style={{ width: mounted ? `${clamped}%` : '0%' }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </div>
  );
}
