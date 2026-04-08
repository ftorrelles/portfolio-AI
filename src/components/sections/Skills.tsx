import SectionLabel from "../ui/SectionLabel";
import AnimatedEntry from "../ui/AnimatedEntry";

export default function Skills({ t }: { t: any }) {
  const SkillCard = ({ title, items, color, icon }: { title: string, items: string[], color: 'white' | 'green', icon: React.ReactNode }) => (
    <AnimatedEntry>
      <div className={`bg-nex-dark p-8 rounded-xl border border-${color === 'white' ? 'white' : 'nex-green'}/10 h-full group transition-all duration-300 hover:border-${color === 'white' ? 'white' : 'nex-green'}/30 ${color === 'white' ? 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'hover:shadow-[0_0_30px_rgba(34,181,97,0.15)]'}`}>
        <div className={`bg-${color === 'white' ? 'white/8' : 'nex-green/15'} border border-${color === 'white' ? 'white/15' : 'nex-green/40'} rounded-lg p-3 w-fit mb-6`}>
            {icon}
        </div>
        <h3 className={`text-xl text-${color} mb-6 font-semibold`}>{title}</h3>
        <div className="flex flex-col gap-2">
          {items.map((item: string) => (
            <span key={item} className="text-nex-grey text-sm flex items-center gap-2 group-hover:text-white transition">
              <span className={`w-1.5 h-1.5 rounded-full ${color === 'white' ? 'bg-white/40' : 'bg-nex-green'}`}></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </AnimatedEntry>
  );

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <SectionLabel>{t.skills.label}</SectionLabel>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-16">
        <span className="text-white">{t.skills.h2_white} </span>
        <span className="text-nex-green">{t.skills.h2_green}</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <SkillCard 
          title={t.skills.dev_frontend.title} 
          items={t.skills.dev_frontend.items} 
          color="white" 
          icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} 
        />
        <SkillCard 
          title={t.skills.dev_backend.title} 
          items={t.skills.dev_backend.items} 
          color="white" 
          icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>}
        />
        <SkillCard 
          title={t.skills.ai.title} 
          items={t.skills.ai.items} 
          color="green" 
          icon={<svg className="w-8 h-8 text-nex-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} 
        />
      </div>
    </section>
  );
}
