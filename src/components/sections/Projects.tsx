import SectionLabel from "../ui/SectionLabel";
import AnimatedEntry from "../ui/AnimatedEntry";
import Image from 'next/image';

export default function Projects({ t }: { t: any }) {
  // Sort and filter to separate AI-powered
  const aiProjects = t.projects.items.filter((p: any) => p.badge === "AI-Powered");
  const webProjects = t.projects.items.filter((p: any) => p.badge !== "AI-Powered");

  return (
    <section id="proyectos" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <SectionLabel>{t.projects.label}</SectionLabel>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-16">
        <span className="text-white">{t.projects.h2_white} </span>
        <span className="text-nex-green">{t.projects.h2_green}</span>
      </h2>

      {/* AI Projects */}
      <h3 className="text-2xl font-bold text-white mb-8">{t.projects.ai_label}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {aiProjects.map((proj: any, i: number) => (
          <ProjectCard key={i} proj={proj} index={i} isAi={true} />
        ))}
      </div>

      {/* Web Projects */}
      <h3 className="text-2xl font-bold text-white mb-8">{t.projects.web_label}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {webProjects.map((proj: any, i: number) => (
          <ProjectCard key={i} proj={proj} index={i} isAi={false} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ proj, index, isAi }: { proj: any, index: number, isAi: boolean }) {
  const gradient = isAi 
    ? "linear-gradient(135deg, #0d2818, #191a1b)" 
    : "linear-gradient(135deg, #191a1b, #1a1a2e)";
  
  const shadowClass = isAi 
    ? "hover:border-nex-green/30 hover:shadow-[0_0_30px_rgba(34,181,97,0.15)]" 
    : "hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]";
    
  return (
    <AnimatedEntry delay={index * 100}>
      <div className={`bg-nex-dark p-6 rounded-xl border border-${isAi ? 'nex-green' : 'white'}/10 h-full group transition-all duration-300 ${shadowClass} relative overflow-hidden`}>
        <div className="h-48 rounded-md mb-4 flex items-center justify-center text-white/10 font-black text-4xl font-mono overflow-hidden" 
             style={{ background: gradient }}>
          <Image src={`/projects/${proj.image}`} alt={proj.name} width={400} height={225} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-nex-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="bg-nex-green text-black font-semibold px-4 py-2 rounded-md">Ver proyecto ↗</a>
        </div>

        <div className="relative">
          {proj.badge && <span className="absolute -top-12 right-0 bg-nex-green text-black text-xs font-bold px-2 py-0.5 rounded-full">{proj.badge}</span>}
          <h3 className="text-xl font-bold text-white mb-2">{proj.name}</h3>
          <p className="text-nex-grey text-sm mb-4">{proj.desc}</p>
          <div className="flex gap-2">
            {proj.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-nex-grey bg-white/8 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedEntry>
  );
}
