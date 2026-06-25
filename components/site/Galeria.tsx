'use client';

import { useState, useEffect, useCallback } from 'react';
import { unsplash, galeriaFotos } from '@/lib/images';

const FOTOS = galeriaFotos;

const thumb = (id: string) => unsplash(id, 800);
const full  = (id: string) => unsplash(id, 1600);

const LAYOUT = [
  'col-span-2 aspect-[16/10] md:aspect-auto md:col-span-2 md:row-span-2',
  'col-span-1 aspect-square  md:aspect-auto md:col-span-2 md:row-span-1',
  'col-span-1 aspect-square  md:aspect-auto md:col-span-1 md:row-span-1',
  'col-span-1 aspect-square  md:aspect-auto md:col-span-1 md:row-span-1',
  'col-span-1 aspect-square  md:aspect-auto md:col-span-2 md:row-span-1',
  'col-span-2 aspect-[16/10] md:aspect-auto md:col-span-2 md:row-span-1',
];

const CSS = `
@keyframes lbFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes lbNext { from { opacity: 0; transform: translateX(40px) scale(.98) } to { opacity: 1; transform: none } }
@keyframes lbPrev { from { opacity: 0; transform: translateX(-40px) scale(.98) } to { opacity: 1; transform: none } }
.lb-overlay  { animation: lbFade .22s ease both; }
.lb-img-next { animation: lbNext .28s cubic-bezier(.22,.61,.36,1) both; }
.lb-img-prev { animation: lbPrev .28s cubic-bezier(.22,.61,.36,1) both; }
@media (prefers-reduced-motion: reduce) {
  .lb-overlay, .lb-img-next, .lb-img-prev { animation: none; }
}
`;

export function Galeria() {
  const [abierta,   setAbierta]   = useState<number | null>(null);
  const [direccion, setDireccion] = useState(1);
  const total = FOTOS.length;

  useEffect(() => {
    FOTOS.forEach(({ id }) => {
      const img = new window.Image();
      img.src = full(id);
    });
  }, []);

  const cerrar    = useCallback(() => setAbierta(null), []);
  const siguiente = useCallback(() => {
    setDireccion(1);
    setAbierta((i) => (i === null ? i : (i + 1) % total));
  }, [total]);
  const anterior = useCallback(() => {
    setDireccion(-1);
    setAbierta((i) => (i === null ? i : (i - 1 + total) % total));
  }, [total]);

  const irA = (idx: number) => {
    setDireccion(idx >= (abierta ?? 0) ? 1 : -1);
    setAbierta(idx);
  };

  useEffect(() => {
    if (abierta === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     cerrar();
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'ArrowLeft')  anterior();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [abierta, cerrar, siguiente, anterior]);

  return (
    <section id="galeria" className="px-7 max-w-1400px mx-auto py-[clamp(70px,11vw,130px)]">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="mb-12">
        <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Galería</span>
        <h2 className="font-serif font-light mt-3 text-navy" style={{ fontSize: 'clamp(30px,5vw,56px)' }}>
          Un lugar diseñado para <em className="italic text-cielo">los sentidos</em>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 md:auto-rows-[210px]">
        {FOTOS.map(({ id, alt }, i) => (
          <button
            key={id}
            onClick={() => irA(i)}
            aria-label={`Ver ${alt} en grande`}
            className={`group relative overflow-hidden bg-beige-2 ${LAYOUT[i]}`}
          >
            <img
              src={thumb(id)}
              alt={alt}
              loading="lazy"
              className="w-full h-full object-cover transition duration-600 group-hover:scale-106"
            />
            <span className="absolute inset-0 bg-navy/0 group-hover:bg-navy/25 transition" />
            <span className="absolute inset-0 ring-inset ring-naranja/0 group-hover:ring-2 group-hover:ring-naranja/60 transition" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" className="drop-shadow-lg">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      <p className="text-[11px] text-niebla mt-5">Imágenes de muestra · se reemplazan por fotos reales del hotel.</p>

      {/* Lightbox */}
      {abierta !== null && (
        <div onClick={cerrar} className="lb-overlay fixed inset-0 z-50 bg-navy/97 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm text-white/60">{abierta + 1} / {total}</span>
              <span className="text-xs text-white/40 tracking-widest uppercase">{FOTOS[abierta].alt}</span>
            </div>
            <button onClick={cerrar} aria-label="Cerrar" className="p-2 text-white/60 hover:text-white transition">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <line x1="5" y1="5" x2="19" y2="19"/>
                <line x1="19" y1="5" x2="5" y2="19"/>
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center px-3 relative overflow-hidden">
            <button
              onClick={(e) => { e.stopPropagation(); anterior(); }}
              aria-label="Anterior"
              className="absolute left-2 md:left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-naranja text-white transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 6l-6 6 6 6"/>
              </svg>
            </button>

            <img
              key={abierta}
              src={full(FOTOS[abierta].id)}
              alt={FOTOS[abierta].alt}
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[74vh] max-w-[92vw] object-contain ${direccion === 1 ? 'lb-img-next' : 'lb-img-prev'}`}
            />

            <button
              onClick={(e) => { e.stopPropagation(); siguiente(); }}
              aria-label="Siguiente"
              className="absolute right-2 md:right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-naranja text-white transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </button>
          </div>

          {/* Miniaturas */}
          <div className="px-4 py-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2 justify-start md:justify-center min-w-min">
              {FOTOS.map(({ id, alt }, idx) => (
                <button
                  key={id}
                  onClick={() => irA(idx)}
                  aria-label={`Ir a ${alt}`}
                  className={`h-12 w-16 md:h-14 md:w-20 shrink-0 overflow-hidden border-2 transition ${
                    idx === abierta ? 'border-naranja' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={thumb(id)} alt={alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
