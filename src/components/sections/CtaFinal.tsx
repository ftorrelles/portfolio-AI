import Button from "../ui/Button";

export default function CtaFinal({ t }: { t: any }) {
  return (
    <section className="py-32 px-6 max-w-4xl mx-auto text-center section-divider relative overflow-hidden"
             style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(34,181,97,0.18) 0%, transparent 65%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-nex-green/30" />
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }} className="font-black leading-tight mb-8">
        <span className="text-white">{t.cta.h2_white} </span>
        <span className="text-nex-green">{t.cta.h2_green}</span>
      </h2>
      <p className="text-nex-grey text-lg mb-12 max-w-lg mx-auto">{t.cta.subtitle}</p>
      <Button href="https://wa.me/573012634230" variant="primary" className="text-lg px-12 py-5 font-bold rounded-md hover:scale-105">
        {t.cta.button}
      </Button>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-nex-green/30" />
    </section>
  );
}
