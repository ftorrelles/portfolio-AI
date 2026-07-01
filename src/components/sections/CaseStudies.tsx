'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedEntry from '../ui/AnimatedEntry';
import DeviceFrame from '../ui/DeviceFrame';
import Counter from '../ui/Counter';
import Grow from '../ui/Grow';
import { getRealScreenMockup } from '../case-mockups/RealScreens';

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  kind: 'counter' | 'bar';
};

type Screen = {
  slug: string;
  label: string;
  image: string;
  caption?: string;
};

type Featured = {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  screens: Screen[];
  metrics: Metric[];
};

export default function CaseStudies({ t }: { t: any }) {
  const cases: Featured[] = t.projects.featured;
  const [caseIdx, setCaseIdx] = useState(0);
  const [screenIdx, setScreenIdx] = useState(0);
  const [hasInteractedWithScreens, setHasInteractedWithScreens] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'en' ? 'en' : 'es';

  const activeCase = cases[caseIdx];
  const activeScreen = activeCase.screens[screenIdx];
  const mockup = getRealScreenMockup(activeCase.slug, activeScreen.slug, locale);

  const handleCaseSelect = (idx: number) => {
    setCaseIdx(idx);
    setScreenIdx(0);
  };

  const handleScreenSelect = (idx: number) => {
    setScreenIdx(idx);
    setHasInteractedWithScreens(true);
  };

  return (
    <div>
      {/* Case selector (outer tabs) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {cases.map((c, idx) => (
          <button
            key={c.slug}
            onClick={() => handleCaseSelect(idx)}
            className={
              idx === caseIdx
                ? 'px-4 py-2 rounded-full text-sm font-semibold bg-nex-green text-black transition-all duration-300'
                : 'px-4 py-2 rounded-full text-sm font-semibold bg-white/5 text-nex-grey border border-white/10 hover:text-white hover:border-white/30 transition-all duration-300'
            }
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <TiltPanel key={`${caseIdx}-${screenIdx}`}>
            <DeviceFrame
              slug={activeCase.slug}
              screenSlug={activeScreen.slug}
              image={activeScreen.image}
              label={activeScreen.label}
              mockup={mockup}
            />
          </TiltPanel>

          {activeScreen.caption && (
            <p className="text-nex-grey text-sm mt-4">{activeScreen.caption}</p>
          )}

          {/* Screen selector (inner tabs) */}
          <div className="flex flex-wrap gap-2 mt-6">
            {activeCase.screens.map((screen, idx) => (
              <button
                key={screen.slug}
                onClick={() => handleScreenSelect(idx)}
                className={[
                  'px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-300',
                  idx === screenIdx
                    ? 'border-nex-green/40 text-nex-green bg-nex-green/10'
                    : 'border-white/10 text-nex-grey hover:text-white hover:border-white/30',
                  !hasInteractedWithScreens && idx !== screenIdx ? 'tab-hint' : '',
                ].join(' ')}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatedEntry>
            <div className="bg-nex-dark border border-white/10 rounded-xl p-6 h-full">
              <p className="text-nex-grey text-sm mb-4">{activeCase.summary}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeCase.tags.map((tag) => (
                  <span key={tag} className="text-xs text-nex-grey bg-white/8 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-5" key={`metrics-${caseIdx}`}>
                {activeCase.metrics.map((metric, i) => (
                  <div key={`${caseIdx}-${i}`}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-nex-grey text-xs uppercase tracking-wide">{metric.label}</span>
                      {metric.kind === 'counter' && (
                        <span className="text-nex-green font-black text-2xl">
                          <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                        </span>
                      )}
                    </div>
                    {metric.kind === 'bar' && (
                      <Grow value={metric.value} suffix={metric.suffix} label={metric.label} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedEntry>
        </div>
      </div>
    </div>
  );
}

function TiltPanel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotionRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current = { x: py * -8, y: px * 8 };
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x = lerp(current.x, target.x, 0.1);
      current.y = lerp(current.y, target.y, 0.1);
      if (el) {
        el.style.transform = `perspective(1000px) rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <AnimatedEntry>
      <div ref={ref} className="tilt-panel">
        {children}
      </div>
    </AnimatedEntry>
  );
}
