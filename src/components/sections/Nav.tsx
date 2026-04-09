'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Nav({ t }: { t: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'es';
  const restOfPath = segments.slice(2).join('/');

  const switchLocale = (newLocale: string) => `/${newLocale}/${restOfPath}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const sections = ['skills', 'proyectos', 'sobre-mi', 'proceso'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.skills, id: 'skills' },
    { name: t.nav.projects, id: 'proyectos' },
    { name: t.nav.about, id: 'sobre-mi' },
    { name: t.nav.process, id: 'proceso' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-nex-black/80 backdrop-blur-md border-b border-nex-green/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href={`/${currentLocale}`}>
            <Image src="/logo.svg" alt="Logo" width={160} height={64} className="w-auto h-12" priority loading="eager" />
        </a>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? '✕' : '☰'}
        </button>

        <div className={`absolute md:static top-full left-0 w-full md:w-auto bg-nex-black md:bg-transparent p-6 md:p-0 flex flex-col md:flex-row gap-6 text-nex-grey text-sm font-medium ${isOpen ? 'block' : 'hidden md:flex'}`}>
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={() => setIsOpen(false)}
              className={`transition-all duration-300 relative py-2 ${activeSection === item.id ? 'text-nex-green' : 'hover:text-white'}`}
            >
              {item.name}
              {activeSection === item.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nex-green shadow-[0_0_10px_#22b561]"></span>}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="text-sm font-medium flex gap-2">
            <a href={switchLocale('es')} className={`transition ${currentLocale === 'es' ? 'text-nex-green font-bold' : 'text-nex-grey hover:text-white'}`}>ES</a>
            <span className="text-nex-grey">|</span>
            <a href={switchLocale('en')} className={`transition ${currentLocale === 'en' ? 'text-nex-green font-bold' : 'text-nex-grey hover:text-white'}`}>EN</a>
          </div>
          <a href="https://wa.me/573012632430" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-nex-green text-nex-green font-semibold px-5 py-2 rounded-full hover:bg-nex-green hover:text-black transition duration-300 text-sm">{t.nav.cta}</a>
        </div>
      </div>
    </nav>
  );
}
