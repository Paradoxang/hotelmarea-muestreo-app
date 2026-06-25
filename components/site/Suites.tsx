import Image from 'next/image';
import Link from 'next/link';
import { obtenerSuites } from '@/modules/reservas';
import { formatearCOP } from '@/lib/format';
import { imagenDeSuite } from '@/lib/images';

export async function Suites() {
  const suites = await obtenerSuites();

  return (
    <section id="suites" className="py-[clamp(80px,12vw,140px)] bg-crema">
      <div className="px-7 max-w-1240px mx-auto">
        <div className="mb-16">
          <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Nuestras suites</span>
          <h2 className="font-serif font-light mt-4 text-navy" style={{ fontSize: 'clamp(36px,5.5vw,64px)' }}>
            Tres experiencias, <em className="italic text-cielo">una sola intimidad</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suites.map((s) => {
            const imgSrc = imagenDeSuite(s.slug, s.imagenUrl, 900);

            return (
              <Link
                key={s.id}
                href={`/suites/${s.slug}`}
                className="relative overflow-hidden bg-navy/5 border border-navy/10 group block"
              >
                <div className="relative aspect-4/5">
                  <Image
                    src={imgSrc}
                    alt={s.nombre}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(14,42,71,.05) 30%, rgba(14,42,71,.92) 100%)' }}
                  />
                  {/* Brillo en hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, transparent 60%, rgba(232,132,60,.18) 100%)' }}
                  />
                </div>

                {/* Precio badge */}
                <div className="absolute top-4 right-4 bg-navy/75 border border-naranja/50 text-white font-sans font-medium text-[11px] tracking-wide px-3 py-1.5 backdrop-blur-sm">
                  {formatearCOP(s.precioDesdeCents)} <span className="font-normal opacity-70">/ entrada</span>
                </div>

                <div className="absolute left-0 right-0 bottom-0 p-7 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-px bg-naranja" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-naranja font-medium">Suite</span>
                  </div>
                  <h3 className="font-serif font-light text-3xl leading-none">{s.nombre}</h3>
                  <p className="text-xs text-white/65 mt-2 leading-relaxed">{s.descripcion}</p>
                  <span className="inline-block mt-4 text-[11px] tracking-[0.2em] uppercase text-white/55 group-hover:text-naranja transition">
                    Ver suite →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
