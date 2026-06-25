import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Wordmark } from '@/components/site/Wordmark';
import { Cierre } from '@/components/site/Cierre';
import { obtenerSuitePorSlug, obtenerSuites } from '@/modules/reservas';
import { formatearCOP } from '@/lib/format';
import { negocio } from '@/lib/config';
import { unsplash, imagenDeSuite, detalleFotos } from '@/lib/images';

const TURNOS_INFO = [
  { value: 'tres_horas', label: '3 horas', icon: '🕐' },
  { value: 'seis_horas', label: '6 horas', icon: '🕕' },
  { value: 'amanecida',  label: 'Amanecida', icon: '🌙' },
];

const AMENIDADES: Record<string, string[]> = {
  extasis: [
    'Cama king size con ropa de cama premium',
    'Pantalla 65" con streaming incluido',
    'Iluminación ambiente regulable',
    'Parqueadero privado cerrado',
    'WiFi banda ancha sin costo',
    'Servicio 24 horas',
  ],
  jacuzzi: [
    'Cama king size con ropa de cama premium',
    'Jacuzzi para dos personas',
    'Ducha lluvia doble',
    'Pantalla 65" con streaming incluido',
    'Iluminación ambiente regulable',
    'Parqueadero privado cerrado',
    'WiFi banda ancha sin costo',
    'Servicio 24 horas',
  ],
  tantra: [
    'Cama king size con ropa de cama premium',
    'Jacuzzi elevado panorámico',
    'Silla tántrica artesanal',
    'Espejo de piso a techo',
    'Ducha lluvia doble',
    'Pantalla 65" con streaming incluido',
    'Iluminación ambiente regulable',
    'Parqueadero privado cerrado',
    'WiFi banda ancha sin costo',
    'Servicio 24 horas',
  ],
};

export async function generateStaticParams() {
  const suites = await obtenerSuites();
  return suites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const suite = await obtenerSuitePorSlug(slug);
  if (!suite) return {};
  return {
    title: `${suite.nombre} — Hotel Marea`,
    description: suite.descripcion,
  };
}

export default async function SuiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const suite = await obtenerSuitePorSlug(slug);
  if (!suite) notFound();

  const imgSrc = imagenDeSuite(slug, suite.imagenUrl, 1600);
  const amenidades = AMENIDADES[slug] ?? [];

  const waMsg = `Hola, quisiera información sobre la ${suite.nombre} en Hotel Marea.`;
  const waUrl = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  return (
    <main className="min-h-screen bg-crema">
      <header className="flex items-center justify-between px-7 py-7 max-w-1400px mx-auto border-b border-navy/10 text-navy">
        <Link href="/"><Wordmark size={20} /></Link>
        <Link href="/" className="text-xs tracking-[0.2em] uppercase text-niebla hover:text-navy transition">← Inicio</Link>
      </header>

      {/* Hero de la suite */}
      <section className="relative h-[60vh] min-h-400px">
        <Image src={imgSrc} alt={suite.nombre} fill priority sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(14,42,71,.25) 0%, rgba(14,42,71,.78) 100%)' }}
        />
        <div className="absolute bottom-10 left-7 right-7 max-w-1400px mx-auto text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-naranja" />
            <span className="text-[10px] tracking-[0.36em] uppercase text-naranja font-medium">Suite</span>
          </div>
          <h1 className="font-serif font-light" style={{ fontSize: 'clamp(40px,7vw,88px)', lineHeight: 1 }}>{suite.nombre}</h1>
          <p className="text-white/75 mt-3 max-w-[44ch] leading-relaxed">{suite.descripcion}</p>
        </div>
      </section>

      {/* Contenido */}
      <section className="px-7 max-w-1400px mx-auto py-16">
        <div className="grid lg:grid-cols-[1fr,380px] gap-12">
          {/* Amenidades */}
          <div>
            <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Amenidades</span>
            <h2 className="font-serif font-light mt-3 mb-8 text-navy" style={{ fontSize: 'clamp(26px,4vw,44px)' }}>
              Todo lo que encontrarás
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {amenidades.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-navy/75">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-naranja shrink-0 mt-0.5">
                    <path d="M5 12l5 5L20 6"/>
                  </svg>
                  {a}
                </li>
              ))}
            </ul>

            {/* Galería rápida */}
            <div className="mt-12 grid grid-cols-3 gap-2">
              {detalleFotos.map((id, i) => (
                <div key={id} className="relative aspect-square overflow-hidden">
                  <Image
                    src={unsplash(id, 500)}
                    alt={`${suite.nombre} ${i + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Panel de precios */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card-soft bg-white border border-cielo/15 border-t-2 border-t-naranja p-7">
              <p className="text-[11px] tracking-[0.3em] uppercase text-niebla mb-5">Tarifas</p>

              <div className="space-y-4">
                {TURNOS_INFO.map(({ value, label, icon }) => {
                  const precio = suite.precios.find((p) => p.turno === value);
                  if (!precio) return null;
                  return (
                    <div key={value} className="flex items-center justify-between py-3 border-b border-navy/10 last:border-0">
                      <div>
                        <span className="mr-2">{icon}</span>
                        <span className="text-sm text-navy/70">{label}</span>
                      </div>
                      <span className="font-serif text-xl text-navy">{formatearCOP(precio.precioCents)}</span>
                    </div>
                  );
                })}
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-7 text-center bg-naranja hover:bg-naranja-vivo transition text-white font-sans font-semibold text-xs tracking-[0.22em] uppercase py-4"
              >
                Reservar por WhatsApp
              </a>

              <p className="text-[10.5px] text-niebla text-center mt-4 leading-relaxed">
                Reserva anónima · Llegada discreta · Parqueadero privado incluido
              </p>
            </div>

            <Link
              href="/comparar"
              className="block mt-4 text-center border border-navy/15 text-niebla hover:text-navy hover:border-navy/30 transition font-sans text-xs tracking-[0.18em] uppercase py-3.5"
            >
              Comparar todas las suites
            </Link>
          </div>
        </div>
      </section>

      <Cierre />
    </main>
  );
}
