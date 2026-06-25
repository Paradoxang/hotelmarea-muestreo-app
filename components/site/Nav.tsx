'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { MobileMenu } from './MobileMenu';

const ENLACES = [
  { href: '#suites',    label: 'Suites'    },
  { href: '#galeria',   label: 'Galería'   },
  { href: '#servicios', label: 'Servicios' },
  { href: '#reviews',   label: 'Reseñas'   },
  { href: '#contacto',  label: 'Contacto'  },
];

export function Nav({ reservasActivas }: { reservasActivas: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const accionHref  = reservasActivas ? '#reservar' : '/comparar';
  const accionLabel = reservasActivas ? 'Reservar' : 'Ver suites';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-crema/95 backdrop-blur-md border-b border-navy/10 py-4 text-navy'
          : 'py-7 text-white'
      }`}
    >
      <nav className="flex items-center justify-between px-7 md:px-10 max-w-1400px mx-auto">
        <Link href="/" className="shrink-0">
          <Wordmark size={20} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {ENLACES.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[11.5px] tracking-[0.18em] uppercase transition ${
                scrolled ? 'text-navy/65 hover:text-navy' : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={accionHref}
            className="hidden md:inline-block text-[11.5px] tracking-[0.2em] uppercase px-6 py-3 bg-naranja hover:bg-naranja-vivo transition text-white font-semibold"
          >
            {accionLabel}
          </a>
          <MobileMenu enlaces={ENLACES} accionHref={accionHref} accionLabel={accionLabel} />
        </div>
      </nav>
    </header>
  );
}
