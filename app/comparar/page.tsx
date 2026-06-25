import Link from 'next/link';
import { Wordmark } from '@/components/site/Wordmark';
import { Cierre } from '@/components/site/Cierre';
import { Comparador } from '@/components/site/Comparador';
import { obtenerSuitePorSlug, obtenerSuites } from '@/modules/reservas';
import { negocio } from '@/lib/config';

export const metadata = {
  title: 'Comparar suites — Hotel Marea',
  description: 'Compara nuestras tres suites y elige la experiencia perfecta para ti.',
};

export default async function CompararPage() {
  const listado = await obtenerSuites();
  const suites = await Promise.all(listado.map((s) => obtenerSuitePorSlug(s.slug)));
  const validas = suites.filter(Boolean) as NonNullable<typeof suites[number]>[];

  return (
    <main className="min-h-screen bg-crema">
      <header className="flex items-center justify-between px-7 py-7 max-w-1400px mx-auto border-b border-navy/10 text-navy">
        <Link href="/"><Wordmark size={20} /></Link>
        <Link
          href="/"
          className="text-xs tracking-[0.2em] uppercase text-niebla hover:text-navy transition"
        >
          ← Inicio
        </Link>
      </header>

      <section className="px-7 pt-16 pb-10 max-w-1400px mx-auto">
        <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Comparar</span>
        <h1 className="font-serif font-light mt-4 text-navy" style={{ fontSize: 'clamp(36px,6vw,72px)' }}>
          Elige tu <em className="italic text-cielo">experiencia</em>
        </h1>
        <p className="text-niebla mt-4 max-w-[44ch] text-sm leading-relaxed">
          Tres suites, tres atmósferas. Selecciona el turno y compara precios y amenidades.
        </p>
      </section>

      <section className="px-7 pb-24 max-w-1400px mx-auto">
        <Comparador suites={validas} whatsapp={negocio.whatsapp} />
      </section>

      <Cierre />
    </main>
  );
}
