import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { negocio } from '@/lib/config';

export function Cierre() {
  return (
    <footer className="bg-navy text-white py-16 px-7">
      <div className="max-w-1240px mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <Wordmark size={24} />
            <p className="text-[11px] text-white/45 mt-4 max-w-[32ch] leading-relaxed">
              Suites privadas con parqueadero independiente.<br />
              Medellín, Antioquia · Colombia.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[11.5px]">
            <a href="#suites"    className="text-white/55 hover:text-white transition tracking-[0.14em] uppercase">Suites</a>
            <a href="#galeria"   className="text-white/55 hover:text-white transition tracking-[0.14em] uppercase">Galería</a>
            <a href="#servicios" className="text-white/55 hover:text-white transition tracking-[0.14em] uppercase">Servicios</a>
            <a href="#reviews"   className="text-white/55 hover:text-white transition tracking-[0.14em] uppercase">Reseñas</a>
            <Link href="/comparar"  className="text-white/55 hover:text-white transition tracking-[0.14em] uppercase">Comparar</Link>
            <Link href="/servicios" className="text-white/55 hover:text-white transition tracking-[0.14em] uppercase">Más info</Link>
          </div>
        </div>

        {/* Línea shimmer */}
        <div className="shimmer-line h-px w-full my-8 opacity-50" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10.5px] text-white/35">
          <span>© {new Date().getFullYear()} {negocio.nombre} · Todos los derechos reservados</span>
          <span className="text-white/25">{negocio.web}</span>
        </div>
      </div>
    </footer>
  );
}
