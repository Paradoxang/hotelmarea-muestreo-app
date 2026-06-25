import { Nav } from '@/components/site/Nav';
import { Hero } from '@/components/site/Hero';
import { Suites } from '@/components/site/Suites';
import { Servicios } from '@/components/site/Servicios';
import { Galeria } from '@/components/site/Galeria';
import { Reviews } from '@/components/site/Reviews';
import { Contacto } from '@/components/site/Contacto';
import { Cierre } from '@/components/site/Cierre';
import { SiteAnimations } from '@/components/site/SiteAnimations';
import { featureFlags } from '@/lib/config';

export default function Home() {
  return (
    <main>
      <SiteAnimations />
      <Nav reservasActivas={featureFlags.reservasActivas} />
      <Hero />
      <Suites />
      <Servicios />
      <Galeria />
      <Reviews />
      <Contacto />
      <Cierre />
    </main>
  );
}
