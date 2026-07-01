import SectionLabel from "../ui/SectionLabel";
import AnimatedEntry from "../ui/AnimatedEntry";

type SkillCategory = {
  id: string;
  title: string;
  icon: "frontend" | "backend" | "ai" | "ai_aug" | "ai_infra";
  color: "white" | "green";
  items: string[];
};

const ICONS: Record<SkillCategory["icon"], React.ReactNode> = {
  frontend: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  ),
  backend: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  ),
  ai: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  ),
  ai_aug: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  ),
  ai_infra: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  ),
};

const CARD_STYLES: Record<"white" | "green", { card: string; iconBox: string; icon: string; title: string; dot: string }> = {
  white: {
    card: "border border-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconBox: "bg-white/8 border border-white/15",
    icon: "text-white",
    title: "text-white",
    dot: "bg-white/40",
  },
  green: {
    card: "border border-nex-green/10 hover:border-nex-green/30 hover:shadow-[0_0_30px_rgba(34,181,97,0.15)]",
    iconBox: "bg-nex-green/15 border border-nex-green/40",
    icon: "text-nex-green",
    title: "text-nex-green",
    dot: "bg-nex-green",
  },
};

function SkillCard({ title, items, color, icon }: { title: string; items: string[]; color: "white" | "green"; icon: React.ReactNode }) {
  const s = CARD_STYLES[color];
  return (
    <AnimatedEntry>
      <div className={`bg-nex-dark p-8 rounded-xl h-full group transition-all duration-300 ${s.card}`}>
        <div className={`${s.iconBox} rounded-lg p-3 w-fit mb-6`}>
          <svg className={`w-8 h-8 ${s.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            {icon}
          </svg>
        </div>
        <h3 className={`text-xl ${s.title} mb-6 font-semibold`}>{title}</h3>
        <div className="flex flex-col gap-2">
          {items.map((item: string) => (
            <span key={item} className="text-nex-grey text-sm flex items-center gap-2 group-hover:text-white transition">
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </AnimatedEntry>
  );
}

export default function Skills({ t }: { t: any }) {
  const categories: SkillCategory[] = t.skills.categories;

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto section-divider">
      <SectionLabel>{t.skills.label}</SectionLabel>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} className="font-bold leading-tight mb-16">
        <span className="text-white">{t.skills.h2_white} </span>
        <span className="text-nex-green">{t.skills.h2_green}</span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <SkillCard
            key={category.id}
            title={category.title}
            items={category.items}
            color={category.color}
            icon={ICONS[category.icon]}
          />
        ))}
      </div>
    </section>
  );
}
