import AnimatedEntry from "../ui/AnimatedEntry";

export default function Stats({ t }: { t: any }) {
  return (
    <section className="bg-nex-dark py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.stats.map((stat: any, i: number) => (
          <AnimatedEntry key={i} delay={i * 200}>
            <div className="text-center md:text-left md:border-r border-white/8 last:border-none pb-8 md:pb-0">
              <div className="text-nex-green font-black" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-nex-grey mt-1">{stat.label}</div>
            </div>
          </AnimatedEntry>
        ))}
      </div>
    </section>
  );
}
