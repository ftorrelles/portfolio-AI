import { getMessages } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import CursorEffect from '@/components/ui/CursorEffect';

const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: true });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: true });
const About = dynamic(() => import('@/components/sections/About'), { ssr: true });
const Process = dynamic(() => import('@/components/sections/Process'), { ssr: true });
const CtaFinal = dynamic(() => import('@/components/sections/CtaFinal'), { ssr: true });
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: true });

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'es' | 'en' }>;
}) {
  const { locale } = await params;

  if (locale !== 'es' && locale !== 'en') {
    notFound();
  }

  const t = await getMessages(locale);

  return (
    <main className="bg-nex-black min-h-screen text-nex-grey">
      <CursorEffect />
      <Nav t={t} />
      <Hero t={t} />
      <Stats t={t} />
      <Skills t={t} />
      <Projects t={t} />
      <About t={t} />
      <Process t={t} />
      <CtaFinal t={t} />
      <Footer t={t} />
      <WhatsAppFloat />
    </main>
  );
}
