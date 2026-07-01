import SectionLabel from "../ui/SectionLabel";
import AnimatedEntry from "../ui/AnimatedEntry";
import TimelineLine from "../ui/TimelineLine";

export default function Experience({ t }: { t: any }) {
  return (
    <section id="experiencia" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <SectionLabel>{t.experience.label}</SectionLabel>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-16">
        <span className="text-white">{t.experience.h2_white} </span>
        <span className="text-nex-green">{t.experience.h2_green}</span>
      </h2>
      <div className="relative pl-8 flex flex-col gap-12">
        <TimelineLine />

        {t.experience.seeking_label && (
          <div className="relative mb-6">
            <span data-timeline-dot className="absolute z-10 -left-[2.85rem] top-1/2 -translate-y-1/2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nex-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-nex-green"></span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-nex-green bg-nex-green/10 border border-nex-green/30 rounded-full px-3 py-1">
              {t.experience.seeking_label}
            </span>
          </div>
        )}

        {t.experience.roles.map((role: any, i: number) => (
          <AnimatedEntry key={i} delay={i * 150} className="relative">
            <div className={i === 0 ? undefined : 'opacity-60'}>
              {i === 0 ? (
                <span data-timeline-dot className="absolute z-10 -left-[2.85rem] top-0.5 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nex-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-nex-green shadow-[0_0_12px_#22b561]"></span>
                </span>
              ) : (
                <span data-timeline-dot className="absolute z-10 -left-[2.85rem] top-0.5 w-4 h-4 rounded-full bg-white/20"></span>
              )}
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                <h3 className="text-white font-semibold text-lg">
                  {role.role} <span className="text-nex-green">· {role.company}</span>
                </h3>
                <span className="text-xs uppercase tracking-widest text-nex-grey">{role.period}</span>
              </div>
              {role.location && (
                <p className="text-xs text-nex-grey mb-3">{role.location}</p>
              )}
              {role.blurb && (
                <p className="text-nex-grey text-sm mb-4 italic">{role.blurb}</p>
              )}
              {Array.isArray(role.groups) && role.groups.map((group: { heading?: string; items: string[] }, gIdx: number) => (
                <div key={gIdx} className={gIdx > 0 ? 'mt-5' : undefined}>
                  {group.heading && (
                    <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">{group.heading}</h4>
                  )}
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item: string, iIdx: number) => (
                      <li key={iIdx} className="text-nex-grey text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-nex-green mt-1.5 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedEntry>
        ))}
      </div>
    </section>
  );
}
