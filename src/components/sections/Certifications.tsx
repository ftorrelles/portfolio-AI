import SectionLabel from "../ui/SectionLabel";
import AnimatedEntry from "../ui/AnimatedEntry";

export default function Certifications({ t }: { t: any }) {
  return (
    <section id="certificaciones" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <SectionLabel>{t.certifications.label}</SectionLabel>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-16">
        <span className="text-white">{t.certifications.h2_white} </span>
        <span className="text-nex-green">{t.certifications.h2_green}</span>
      </h2>

      <p className="text-nex-grey text-xs font-semibold uppercase tracking-widest mb-4">{t.certifications.education_label}</p>
      <AnimatedEntry>
        <div className="bg-nex-dark border border-white/10 rounded-xl p-6 mb-14 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nex-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-nex-green"></span>
          </span>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base">{t.certifications.education.institution}</h3>
            <p className="text-nex-grey text-sm">{t.certifications.education.degree} · {t.certifications.education.period}</p>
          </div>
          <span className="inline-flex w-fit items-center text-xs uppercase tracking-widest text-nex-green bg-nex-green/10 border border-nex-green/30 rounded-full px-3 py-1">
            {t.certifications.education.status}
          </span>
        </div>
      </AnimatedEntry>

      <p className="text-nex-grey text-xs font-semibold uppercase tracking-widest mb-5">{t.certifications.featured_label}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {t.certifications.featured.map((cert: any, i: number) => (
          <AnimatedEntry key={i} delay={i * 100}>
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full bg-nex-dark border border-nex-green/20 rounded-xl p-6 flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-nex-green/50 hover:shadow-[0_10px_40px_rgba(34,181,97,0.15)] transition-all duration-300"
            >
              <h3 className="text-white font-semibold text-base leading-snug group-hover:text-nex-green transition-colors">{cert.name}</h3>
              <p className="text-nex-grey text-sm">{cert.issuer}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-xs uppercase tracking-widest text-nex-green">{cert.date}</span>
                <span className="text-xs text-nex-grey group-hover:text-nex-green transition-colors">{t.certifications.verify_label} ↗</span>
              </div>
            </a>
          </AnimatedEntry>
        ))}
      </div>

      <p className="text-nex-grey text-xs font-semibold uppercase tracking-widest mb-4">{t.certifications.chips_label}</p>
      <AnimatedEntry>
        <div className="flex flex-wrap gap-2">
          {t.certifications.chips.map((chip: { name: string; ai: boolean }, i: number) => (
            <span
              key={i}
              className={
                chip.ai
                  ? "text-xs px-3 py-1.5 rounded-full border bg-nex-green/10 text-nex-green border-nex-green/25"
                  : "text-xs px-3 py-1.5 rounded-full border bg-white/5 text-nex-grey border-white/10"
              }
            >
              {chip.name}
            </span>
          ))}
        </div>
      </AnimatedEntry>
    </section>
  );
}
