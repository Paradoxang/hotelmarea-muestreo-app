'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatearCOP } from '@/lib/format';
import { imagenDeSuite } from '@/lib/images';

type Precio = { turno: string; precioCents: number; duracionMin: number };
type Suite  = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string | null;
  precios: Precio[];
};

const TURNOS = [
  { value: 'tres_horas', label: '3 horas'   },
  { value: 'seis_horas', label: '6 horas'   },
  { value: 'amanecida',  label: 'Amanecida' },
];
const TURNO_TXT: Record<string, string> = {
  tres_horas: '3 horas',
  seis_horas: '6 horas',
  amanecida:  'amanecida',
};

const CARACTERISTICAS = [
  'Cama king size',
  'Jacuzzi privado',
  'Silla tántrica',
  'Pantalla 65" & streaming',
  'Ducha lluvia',
  'Iluminación ambiente',
  'Parqueadero privado',
  'Servicio 24h',
];

const TIENE: Record<string, string[]> = {
  extasis: ['Cama king size', 'Pantalla 65" & streaming', 'Iluminación ambiente', 'Parqueadero privado', 'Servicio 24h'],
  jacuzzi: ['Cama king size', 'Jacuzzi privado', 'Ducha lluvia', 'Pantalla 65" & streaming', 'Iluminación ambiente', 'Parqueadero privado', 'Servicio 24h'],
  tantra:  ['Cama king size', 'Jacuzzi privado', 'Silla tántrica', 'Pantalla 65" & streaming', 'Ducha lluvia', 'Iluminación ambiente', 'Parqueadero privado', 'Servicio 24h'],
};

const TAGLINE: Record<string, string> = {
  extasis: 'La entrada al placer',
  jacuzzi: 'Calor y sensualidad',
  tantra:  'La experiencia suprema',
};

const DESTACADA = 'tantra';

export function Comparador({ suites, whatsapp }: { suites: Suite[]; whatsapp: string }) {
  const [turno, setTurno] = useState('tres_horas');

  const precioDe = (s: Suite) => s.precios.find((p) => p.turno === turno)?.precioCents ?? 0;

  const waUrl = (s: Suite) => {
    const msg = `Hola, quiero reservar la ${s.nombre} (turno: ${TURNO_TXT[turno]}) en Hotel Marea.`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div>
      {/* Selector de turno */}
      <div className="flex justify-center mb-14">
        <div className="inline-flex border border-navy/15 p-1 bg-white">
          {TURNOS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTurno(t.value)}
              className={`px-6 py-3 text-xs tracking-[0.18em] uppercase transition ${
                turno === t.value ? 'bg-naranja text-white' : 'text-navy/55 hover:text-navy'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {suites.map((s, i) => {
          const destacada = s.slug === DESTACADA;
          const imgSrc = imagenDeSuite(s.slug, s.imagenUrl, 900);

          return (
            <article
              key={s.id}
              className={`comp-card card-soft relative flex flex-col bg-white border overflow-hidden ${
                destacada ? 'border-naranja' : 'border-cielo/15'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {destacada && (
                <div className="absolute top-0 right-0 bg-naranja text-white text-[10px] tracking-[0.22em] uppercase px-4 py-1.5 z-10 font-medium">
                  Recomendada
                </div>
              )}

              <div className="relative h-52">
                <Image
                  src={imgSrc}
                  alt={s.nombre}
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(14,42,71,.08), rgba(14,42,71,.9))' }}
                />
                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="font-serif text-3xl">{s.nombre}</h3>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-naranja mt-1">{TAGLINE[s.slug] ?? ''}</p>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="mb-6">
                  <span key={turno} className="precio-anim font-serif text-4xl text-navy inline-block">
                    {formatearCOP(precioDe(s))}
                  </span>
                  <span className="text-sm text-niebla ml-2">/ {TURNO_TXT[turno]}</span>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {CARACTERISTICAS.map((c) => {
                    const tiene = (TIENE[s.slug] ?? []).includes(c);
                    return (
                      <li key={c} className={`flex items-center gap-3 text-sm ${tiene ? 'text-navy/80' : 'text-navy/25'}`}>
                        {tiene ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-naranja shrink-0">
                            <path d="M5 12l5 5L20 6"/>
                          </svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy/20 shrink-0">
                            <line x1="6" y1="6" x2="18" y2="18"/>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                          </svg>
                        )}
                        {c}
                      </li>
                    );
                  })}
                </ul>

                <a
                  href={waUrl(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 text-center font-sans font-semibold text-xs tracking-[0.22em] uppercase py-4 transition ${
                    destacada
                      ? 'bg-naranja hover:bg-naranja-vivo text-white'
                      : 'border border-naranja/55 text-navy hover:bg-naranja hover:text-white'
                  }`}
                >
                  Reservar {s.nombre}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
