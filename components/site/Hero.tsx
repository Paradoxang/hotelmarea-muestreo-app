import Image from 'next/image';
import { obtenerSuites } from '@/modules/reservas';
import { ConsolaReserva } from './ConsolaReserva';
import { featureFlags } from '@/lib/config';
import { unsplash, heroIzq, heroDer } from '@/lib/images';

export async function Hero() {
  const opciones = featureFlags.reservasActivas
    ? (await obtenerSuites()).map((s) => ({ id: s.id, nombre: s.nombre }))
    : [];

  return (
    <section
      id="reservar"
      className="hero-stage relative min-h-screen flex flex-col items-center justify-center text-center isolate px-7 overflow-hidden"
    >
      {/* ── Split-screen de fondo ── */}
      <div className="absolute inset-0 -z-20 grid grid-cols-2">
        <div className="panel-l relative overflow-hidden">
          <Image
            src={unsplash(heroIzq, 1400)}
            alt=""
            fill
            priority
            sizes="50vw"
            className="hero-bg object-cover"
          />
          {/* tinte cálido sobre el panel íntimo */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(120deg, rgba(14,42,71,.55), rgba(232,132,60,.12))' }}
          />
        </div>
        <div className="panel-r relative overflow-hidden">
          <Image
            src={unsplash(heroDer, 1400)}
            alt=""
            fill
            priority
            sizes="50vw"
            className="hero-bg object-cover"
          />
          {/* tinte fresco sobre el panel luminoso */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(240deg, rgba(14,42,71,.42), rgba(63,155,212,.16))' }}
          />
        </div>
      </div>

      {/* Línea divisoria central */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/25 -z-10 hidden sm:block" />

      {/* Viñeta para legibilidad del texto */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 48%, rgba(14,42,71,.55) 0%, rgba(14,42,71,.15) 55%, transparent 80%), linear-gradient(180deg, rgba(14,42,71,.35) 0%, transparent 30%, rgba(14,42,71,.55) 100%)',
        }}
      />

      <div className="hero-enter relative z-10 flex flex-col items-center">
        {/* Ubicación */}
        <div
          className="font-sans font-medium text-white/75 mb-7 flex items-center gap-3"
          style={{ fontSize: '11px', letterSpacing: '0.46em' }}
        >
          <span className="inline-block w-10 h-px bg-naranja/80" />
          MEDELLÍN · ANTIOQUIA
          <span className="inline-block w-10 h-px bg-naranja/80" />
        </div>

        {/* Título */}
        <h1
          className="hero-title font-serif font-light text-white"
          style={{
            fontSize: 'clamp(58px,13vw,168px)',
            letterSpacing: '0.01em',
            lineHeight: 0.9,
            textShadow: '0 14px 50px rgba(14,42,71,.55)',
          }}
        >
          Hotel <em className="italic text-naranja">Marea</em>
        </h1>

        {/* Tagline */}
        <p
          className="font-serif italic text-white/85 mt-4"
          style={{ fontSize: 'clamp(18px,3vw,34px)', textShadow: '0 6px 24px rgba(14,42,71,.5)' }}
        >
          Lugares que apetecen
        </p>

        {/* Línea shimmer decorativa */}
        <div className="flex items-center gap-0 mt-7 w-32 overflow-hidden">
          <div className="shimmer-line h-px w-full" />
        </div>

        {/* CTA / Consola */}
        <div className="mt-9 w-full flex justify-center">
          {featureFlags.reservasActivas ? (
            <ConsolaReserva suites={opciones} />
          ) : (
            <a
              href="/comparar"
              className="hero-cta inline-block bg-naranja hover:bg-naranja-vivo transition text-white font-sans font-semibold tracking-[0.24em] uppercase px-16 py-5"
              style={{ fontSize: '13px' }}
            >
              Descubrir suites
            </a>
          )}
        </div>

        {/* Garantías */}
        <div className="mt-8 flex flex-wrap justify-center gap-5 text-[10.5px] text-white/60 hero-enter-delay">
          <span>Reserva anónima</span>
          <span className="text-naranja/70">·</span>
          <span>Privacidad garantizada</span>
          <span className="text-naranja/70">·</span>
          <span>Llegada discreta</span>
        </div>
      </div>

      {/* Badge +18 */}
      <div className="badge-float absolute bottom-10 right-10 hidden md:block">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-white/65">
          <defs>
            <path id="circulo18" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#E8843C" strokeOpacity="0.55" />
          <text fill="currentColor" fontSize="8" letterSpacing="2.5" style={{ fontFamily: 'var(--font-sans)' }}>
            <textPath href="#circulo18" startOffset="0%">SOLO PARA MAYORES DE EDAD · </textPath>
          </text>
          <text x="50" y="57" textAnchor="middle" fill="currentColor" fontSize="22" style={{ fontFamily: 'var(--font-serif)' }}>18+</text>
        </svg>
      </div>

      {/* Botón scroll */}
      <a
        href="#suites"
        aria-label="Bajar a las suites"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group"
      >
        <span className="flex items-start justify-center w-7 h-11 rounded-full border border-white/45 group-hover:border-naranja transition pt-2">
          <span className="scroll-dot block w-1 h-2 rounded-full bg-white group-hover:bg-naranja" />
        </span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/55 group-hover:text-white transition">Scroll</span>
      </a>
    </section>
  );
}
