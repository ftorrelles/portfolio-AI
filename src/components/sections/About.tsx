import SectionLabel from "../ui/SectionLabel";
import AnimatedEntry from "../ui/AnimatedEntry";
import Image from 'next/image';

export default function About({ t }: { t: any }) {
  return (
    <section id="sobre-mi" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <SectionLabel>{t.about.label}</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-8">
            <span className="text-white">{t.about.h2_white} </span>
            <span className="text-nex-green">{t.about.h2_green}</span>
          </h2>
          <p className="text-nex-grey text-lg leading-relaxed mb-6"><span className="text-nex-green font-bold text-3xl">{t.about.text[0]}</span>{t.about.text.slice(1)}</p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-nex-green/40 mb-6 mx-auto flex items-center justify-center bg-nex-dark">
             <Image src="/logo.svg" alt="Logo" width={80} height={80} className="w-20 h-20" />
          </div>
          {t.about.achievements.map((ach: any, i: number) => (
            <AnimatedEntry key={i} delay={i * 200}>
              <div className="flex items-center gap-4 bg-white/4 p-4 rounded-xl border border-white/8">
                <div className="text-2xl">{ach.icon}</div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{ach.title}</h3>
                  <p className="text-xs text-nex-grey">{ach.subtitle}</p>
                </div>
              </div>
            </AnimatedEntry>
          ))}
          <p className="text-nex-grey text-xs text-center mt-4">{t.about.social_proof}</p>
        </div>
      </div>
    </section>
  );
}
