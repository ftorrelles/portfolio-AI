import Button from "../ui/Button";
import AnimatedEntry from "../ui/AnimatedEntry";

export default function Hero({ t }: { t: any }) {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-32 px-6 sm:py-40" 
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%,
            rgba(34,181,97,0.12) 0%,
            transparent 60%),
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 48px 48px, 48px 48px',
        backgroundColor: '#191a1b'
      }}
    >
      <AnimatedEntry delay={100}>
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 border border-nex-green/30 bg-nex-green/10 rounded-full px-4 py-1.5 text-sm text-nex-green mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-nex-green pulse-dot" />
            {t.hero.badge}
          </div>

          <h1 className="font-extrabold tracking-tighter mb-8 leading-[1.05]" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
            <span className="text-white block">{t.hero.h1_white}</span>
            <span className="text-nex-green block" style={{ textShadow: '0 0 80px rgba(34,181,97,0.4)' }}>{t.hero.h1_green}</span>
          </h1>
          
          <p className="text-nex-grey text-lg mb-10 max-w-lg">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="https://wa.me/573012632430" variant="primary">
              {t.hero.cta_primary}
            </Button>
            <Button href="#proyectos" variant="secondary">
              {t.hero.cta_secondary}
            </Button>
          </div>
        </div>
      </AnimatedEntry>

      <AnimatedEntry delay={300} className="hidden lg:block">
        <div className="bg-[#0d1117] rounded-xl border border-white/10 p-5 font-mono text-xs shadow-2xl">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="text-nex-grey ml-2">architect.py — francisco-torrelles</span>
          </div>
          <pre className="text-white overflow-x-auto">
            <code>
              {`import `}<span className="text-[#ff79c6]">openai</span>
              {`\n\n`}<span className="text-[#ff79c6]">class</span> <span className="text-[#f1fa8c]">SolutionArchitect</span>:
              {`\n  `}<span className="text-[#ff79c6]">def</span> <span className="text-[#50fa7b]">__init__</span>(self, tech_stack):
              {`\n    self.stack = [`}<span className="text-[#f1fa8c]">"React"</span>, <span className="text-[#f1fa8c]">"Python"</span>, <span className="text-[#f1fa8c]">"Node"</span>]
              {`\n    self.vision = `}<span className="text-[#f1fa8c]">"AI-Driven"</span>
              {`\n\n  `}<span className="text-[#ff79c6]">async</span> <span className="text-[#ff79c6]">def</span> <span className="text-[#50fa7b]">deploy_innovation</span>(self, mission):
              {`\n    `}<span className="text-nex-grey italic"># Injecting intelligence into the core</span>
              {`\n    `}<span className="text-[#ff79c6]">return</span> <span className="text-[#ff79c6]">await</span> self.AI.engine.optimize(mission)
            </code>
          </pre>
        </div>
      </AnimatedEntry>
    </section>
  );
}

