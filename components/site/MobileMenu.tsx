'use client';

import { useState, useEffect } from 'react';
import { Wordmark } from './Wordmark';

type Enlace = { href: string; label: string };

export function MobileMenu({
  enlaces,
  accionHref,
  accionLabel,
}: {
  enlaces: Enlace[];
  accionHref: string;
  accionLabel: string;
}) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [abierto]);

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        aria-label="Abrir menú"
        className="md:hidden flex flex-col gap-1.5 p-2 text-current"
      >
        <span className="block w-6 h-px bg-current transition-all" />
        <span className="block w-4 h-px bg-current/60 transition-all" />
        <span className="block w-6 h-px bg-current transition-all" />
      </button>

      {abierto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy text-white md:hidden">
          <div className="flex items-center justify-between px-7 py-7">
            <Wordmark size={20} />
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar menú"
              className="p-2 text-white/70 hover:text-white"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-10 gap-2">
            {enlaces.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setAbierto(false)}
                className="font-serif text-5xl font-light text-white/85 hover:text-white py-3 border-b border-white/10 hover:border-naranja/60 transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="px-7 pb-12">
            <a
              href={accionHref}
              onClick={() => setAbierto(false)}
              className="block text-center bg-naranja hover:bg-naranja-vivo transition text-white font-sans font-semibold text-xs tracking-[0.22em] uppercase py-5"
            >
              {accionLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
