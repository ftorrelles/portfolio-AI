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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.certifications.items.map((item: any, i: number) => (
          <AnimatedEntry key={i} delay={i * 100}>
            <div className="h-full bg-nex-dark border border-white/10 rounded-xl p-6 flex flex-col gap-3">
              <h3 className="text-white font-semibold text-base leading-snug">{item.name}</h3>
              <p className="text-nex-grey text-sm">{item.issuer}</p>
              {item.date ? (
                <span className="text-xs uppercase tracking-widest text-nex-green mt-auto">{item.date}</span>
              ) : (
                <span className="inline-flex w-fit items-center gap-1.5 mt-auto text-xs uppercase tracking-widest text-nex-green bg-nex-green/10 border border-nex-green/30 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-nex-green shadow-[0_0_10px_#22b561]"></span>
                  {t.certifications.in_progress}
                </span>
              )}
            </div>
          </AnimatedEntry>
        ))}
      </div>
    </section>
  );
}
