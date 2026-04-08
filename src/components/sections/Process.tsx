import SectionLabel from "../ui/SectionLabel";

export default function Process({ t }: { t: any }) {
  return (
    <section id="proceso" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <SectionLabel>{t.process.label}</SectionLabel>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-16 text-center">
        <span className="text-white">{t.process.h2_white} </span>
        <span className="text-nex-green">{t.process.h2_green}</span>
      </h2>
      <div className="grid md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-nex-green/40 to-transparent z-0" />
        {t.process.steps.map((step: any, i: number) => (
          <div key={i} className="flex flex-col items-center relative">
            <div className="w-14 h-14 rounded-full border-2 border-nex-green bg-nex-green/10 text-nex-green font-mono font-bold text-lg flex items-center justify-center mb-4 z-10">
              {step.number}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-nex-grey text-sm text-center">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
