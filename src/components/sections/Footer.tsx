import Image from 'next/image';

export default function Footer({ t }: { t: any }) {
  const navMap: { [key: string]: string } = {
    'Skills': '#skills',
    'Proyectos': '#proyectos',
    'Sobre mí': '#sobre-mi',
    'Proceso': '#proceso',
    'Habilidades': '#skills',
    'Skills ': '#skills',
    'Projects': '#proyectos',
    'About': '#sobre-mi',
    'Process': '#proceso'
  };

  return (
    <footer className="py-12 border-t border-white/5 px-6 max-w-5xl mx-auto bg-nex-dark">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center">
        
        {/* Explore */}
        <div className="flex flex-col items-center">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.explore_title}</h4>
            <div className="flex flex-col gap-2">
                {t.footer.explore.map((item: string) => <a key={item} href={navMap[item] || '#'} className="text-nex-grey text-sm hover:text-nex-green transition">{item}</a>)}
            </div>
        </div>

        {/* Logo/Info (Center Desktop / Top Mobile) */}
        <div className="flex flex-col items-center order-first md:order-none mb-8 md:mb-0">
          <Image src="/logo.svg" alt="Logo" width={120} height={45} className="w-auto h-12 mb-3" />
          <p className="font-semibold text-white text-sm">{t.footer.name}</p>
          <p className="text-nex-grey text-sm">{t.footer.role1}</p>
          <p className="text-nex-grey text-sm">{t.footer.role2}</p>
        </div>

        {/* Connect */}
        <div className="flex flex-col items-center">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.connect_title}</h4>
            <div className="flex flex-col gap-2">
                {t.footer.connect.map((link: any, i: number) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-nex-grey text-sm hover:text-nex-green transition">{link.name}</a>
                ))}
            </div>
        </div>
      </div>
      
      <p className="border-t border-white/5 mt-8 pt-6 text-nex-grey text-xs text-center">{t.footer.copy}</p>
    </footer>
  );
}
