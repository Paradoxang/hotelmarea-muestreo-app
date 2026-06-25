import Link from 'next/link';

const sw = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 } as const;
const ic = 'w-5 h-5';

const IconCar    = () => <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M3 13l2-5h14l2 5v4h-2v-2H5v2H3z"/><circle cx="7.5" cy="15.5" r="1.1"/><circle cx="16.5" cy="15.5" r="1.1"/></svg>;
const IconPuerta = () => <svg viewBox="0 0 24 24" {...sw} className={ic}><rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="14.5" cy="12" r="0.9" fill="currentColor" stroke="none"/></svg>;
const IconEscudo = () => <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z"/><path d="M9.3 12l1.9 1.9 3.5-4"/></svg>;
const IconWifi   = () => <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M5 9a11 11 0 0 1 14 0"/><path d="M7.5 12a7 7 0 0 1 9 0"/><path d="M10 15a3 3 0 0 1 4 0"/><circle cx="12" cy="18" r="0.8" fill="currentColor" stroke="none"/></svg>;
const IconBrillo = () => <svg viewBox="0 0 24 24" {...sw} className={ic}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>;
const IconCandado= () => <svg viewBox="0 0 24 24" {...sw} className={ic}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;

const SERVICIOS = [
  { Icon: IconCar,     label: 'Parqueadero privado por suite'                 },
  { Icon: IconPuerta,  label: 'Suites independientes y discretas'             },
  { Icon: IconEscudo,  label: 'Parqueadero monitoreado 24/7'                  },
  { Icon: IconWifi,    label: 'WiFi banda ancha · sin costo'                  },
  { Icon: IconBrillo,  label: 'Esterilización con ozono · 99% libre de bacterias' },
  { Icon: IconCandado, label: 'Discreción total · Tu privacidad es el lujo'   },
];

export function Servicios() {
  return (
    <section id="servicios" className="py-[clamp(70px,10vw,120px)] bg-beige border-y border-navy/10">
      <div className="mb-12 text-center px-7">
        <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Servicios</span>
        <h2 className="font-serif font-light mt-3 text-navy" style={{ fontSize: 'clamp(30px,5vw,56px)' }}>
          Lo que nos hace <em className="italic text-cielo">diferentes</em>
        </h2>
        <p className="mt-5 text-niebla font-light leading-relaxed max-w-[52ch] mx-auto text-sm">
          Cada suite es un mundo aparte: parqueadero privado propio, espacios independientes
          y discreción total desde la llegada hasta la salida.
        </p>
      </div>

      <div className="svc-mask overflow-hidden py-2 px-0">
        <div className="svc-track flex gap-4 w-max">
          {[...SERVICIOS, ...SERVICIOS].map(({ Icon, label }, i) => (
            <div key={i} className="card-soft flex items-center gap-3 whitespace-nowrap border border-cielo/15 bg-white px-6 py-4 hover:border-naranja/50 transition">
              <span className="text-naranja shrink-0"><Icon /></span>
              <span className="text-sm text-navy/80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="/servicios"
          className="inline-block border border-naranja text-navy hover:bg-naranja hover:text-white transition font-sans font-semibold text-xs tracking-[0.22em] uppercase px-10 py-4"
        >
          Ver todos los servicios
        </Link>
      </div>
    </section>
  );
}
