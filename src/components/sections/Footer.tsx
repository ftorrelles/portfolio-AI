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
    <footer className="py-12 border-t border-white/5 px-6 max-w-7xl mx-auto bg-nex-dark">
      <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-12 text-center md:text-left mb-12">
        <div className="flex flex-col items-center order-first md:order-none">
          <Image src="/logo.svg" alt="Logo" width={160} height={60} className="w-auto h-16 mb-4" />
          <p className="font-semibold text-white text-sm">{t.footer.name}</p>
          <p className="text-nex-grey text-sm">{t.footer.role1}</p>
          <p className="text-nex-grey text-sm">{t.footer.role2}</p>
        </div>
        <div className="flex flex-col items-center">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">{t.footer.explore_title}</h4>
            <div className="flex flex-col gap-3">
                {t.footer.explore.map((item: string) => <a key={item} href={navMap[item] || '#'} className="text-nex-grey text-sm hover:text-nex-green transition">{item}</a>)}
            </div>
        </div>
        <div className="flex flex-col items-center">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">{t.footer.connect_title}</h4>
            <div className="flex flex-col gap-3">
                {t.footer.connect.map((link: any, i: number) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-nex-grey text-sm hover:text-nex-green transition">{link.name}</a>
                ))}
            </div>
        </div>
      </div>
      <p className="border-t border-white/5 pt-8 text-nex-grey text-xs text-center">{t.footer.copy}</p>
    </footer>
  );
}
