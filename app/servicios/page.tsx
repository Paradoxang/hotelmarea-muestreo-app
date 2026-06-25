import Link from 'next/link';
import Image from 'next/image';
import { Wordmark } from '@/components/site/Wordmark';
import { Cierre } from '@/components/site/Cierre';
import { unsplash, servicioFoto } from '@/lib/images';

export const metadata = {
  title: 'Servicios — Hotel Marea',
  description: 'Parqueadero privado por suite, espacios independientes y discreción total. Lo que hace de Hotel Marea una experiencia distinta.',
};

const sw = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 } as const;
const ic = 'w-6 h-6';

const SERVICIOS = [
  {
    icon: <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M3 13l2-5h14l2 5v4h-2v-2H5v2H3z"/><circle cx="7.5" cy="15.5" r="1.1"/><circle cx="16.5" cy="15.5" r="1.1"/></svg>,
    titulo: 'Parqueadero privado por suite',
    desc: 'Cada suite tiene su propio garaje cerrado. Tu vehículo entra directo, sin que nadie lo vea. Llegas y te vas con total privacidad.',
  },
  {
    icon: <svg viewBox="0 0 24 24" {...sw} className={ic}><rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="14.5" cy="12" r="0.9" fill="currentColor" stroke="none"/></svg>,
    titulo: 'Suites independientes',
    desc: 'Espacios totalmente separados entre sí, como pequeños mundos privados. Nada de pasillos compartidos ni miradas ajenas: solo ustedes.',
  },
  {
    icon: <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>,
    titulo: 'Esterilización con ozono',
    desc: 'Cada habitación se esteriliza con ozono entre huéspedes, quedando 99% libre de bacterias. Higiene de verdad, no de promesa.',
  },
  {
    icon: <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M5 9a11 11 0 0 1 14 0"/><path d="M7.5 12a7 7 0 0 1 9 0"/><path d="M10 15a3 3 0 0 1 4 0"/><circle cx="12" cy="18" r="0.8" fill="currentColor" stroke="none"/></svg>,
    titulo: 'WiFi banda ancha · gratis',
    desc: 'Conexión rápida y sin costo en cada suite, por si quieren poner su propia música, película o ambiente.',
  },
  {
    icon: <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z"/><path d="M9.3 12l1.9 1.9 3.5-4"/></svg>,
    titulo: 'Parqueadero monitoreado',
    desc: 'Vigilancia permanente para tu tranquilidad, cuidando tu vehículo sin sacrificar en ningún momento la discreción.',
  },
  {
    icon: <svg viewBox="0 0 24 24" {...sw} className={ic}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>,
    titulo: 'Discreción total',
    desc: 'Reserva anónima, llegada privada y cobro discreto. Tu intimidad es el lujo principal que ofrecemos.',
  },
];

const CSS = `
@keyframes svcRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
.svc-rise { animation: svcRise .7s cubic-bezier(.16,1,.3,1) both; }
@media (prefers-reduced-motion: reduce) { .svc-rise { animation: none; } }
`;

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-crema">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="flex items-center justify-between px-7 py-7 max-w-1400px mx-auto border-b border-navy/10 text-navy">
        <Link href="/"><Wordmark size={20} /></Link>
        <Link href="/" className="text-xs tracking-[0.2em] uppercase text-niebla hover:text-navy transition">← Inicio</Link>
      </header>

      {/* Intro */}
      <section className="px-7 max-w-1400px mx-auto pt-14 pb-14">
        <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Servicios</span>
        <div className="grid md:grid-cols-2 gap-8 md:items-end mt-5">
          <h1 className="font-serif font-light text-navy" style={{ fontSize: 'clamp(40px,6.5vw,80px)', lineHeight: 1.02 }}>
            Más privacidad,<br /><em className="italic text-cielo">más intimidad</em>
          </h1>
          <p className="text-niebla font-light leading-relaxed max-w-[46ch] text-sm">
            En Hotel Marea no compartes pasillos ni miradas. Cada suite es independiente, con su propio
            parqueadero privado, pensada para encuentros completamente discretos.
          </p>
        </div>
      </section>

      {/* Bento visual */}
      <section className="px-7 max-w-1400px mx-auto pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[210px]">
          <div className="svc-rise col-span-2 row-span-2 relative overflow-hidden">
            <Image
              src={unsplash(servicioFoto.suite, 900)}
              alt="Suite privada"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,42,71,.08), rgba(14,42,71,.85))' }} />
            <div className="absolute bottom-5 left-6 text-white">
              <p className="font-serif text-2xl">Tu espacio, solo tuyo</p>
              <p className="text-white/65 text-sm mt-1">Suites pensadas para la intimidad</p>
            </div>
          </div>

          <div className="svc-rise col-span-2 bg-cielo-suave text-navy p-7 flex flex-col justify-between" style={{ animationDelay: '80ms' }}>
            <span className="font-serif" style={{ fontSize: 'clamp(40px,6vw,64px)', lineHeight: 1 }}>100%</span>
            <p className="text-navy/70 text-sm tracking-[0.04em]">de las suites con parqueadero privado independiente</p>
          </div>

          <div className="svc-rise relative overflow-hidden" style={{ animationDelay: '160ms' }}>
            <Image
              src={unsplash(servicioFoto.jacuzzi, 500)}
              alt="Jacuzzi"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>

          <div className="svc-rise bg-durazno text-navy p-6 flex flex-col justify-between" style={{ animationDelay: '240ms' }}>
            <span className="font-serif text-naranja" style={{ fontSize: 'clamp(36px,5vw,58px)', lineHeight: 1 }}>99%</span>
            <p className="text-navy/70 text-sm">libre de bacterias gracias a la esterilización con ozono</p>
          </div>

          <div className="svc-rise col-span-2 md:col-span-4 bg-navy text-white p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ animationDelay: '320ms' }}>
            <p className="font-serif text-2xl md:text-3xl">Cada suite, un mundo aparte.</p>
            <p className="text-white/90 text-sm max-w-[44ch]">Sin pasillos compartidos, sin miradas ajenas. La privacidad no es un extra: es el corazón de Hotel Marea.</p>
          </div>
        </div>
      </section>

      {/* Tarjetas de servicios */}
      <section className="px-7 max-w-1400px mx-auto pb-20">
        <div className="text-center mb-12 max-w-620px mx-auto">
          <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">El detalle</span>
          <h2 className="font-serif font-light mt-3 text-navy" style={{ fontSize: 'clamp(28px,4.5vw,50px)' }}>Todo pensado para tu discreción</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICIOS.map((s, i) => (
            <article
              key={s.titulo}
              className="svc-rise card-soft bg-white border border-cielo/15 p-7 hover:border-naranja/50 transition"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="text-naranja inline-flex">{s.icon}</span>
              <h3 className="font-serif text-xl mt-4 text-navy">{s.titulo}</h3>
              <p className="text-niebla text-sm font-light leading-relaxed mt-2">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-28 px-7">
        <h2 className="font-serif font-light mx-auto max-w-[18ch] text-navy" style={{ fontSize: 'clamp(28px,4.5vw,50px)' }}>
          ¿Listo para una experiencia <em className="italic text-cielo">distinta</em>?
        </h2>
        <div className="mt-8">
          <Link
            href="/comparar"
            className="inline-block bg-naranja hover:bg-naranja-vivo transition text-white font-sans font-semibold text-xs tracking-[0.22em] uppercase px-12 py-5"
          >
            Ver las suites
          </Link>
        </div>
      </section>

      <Cierre />
    </main>
  );
}
