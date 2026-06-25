import { negocio } from '@/lib/config';

export function Contacto() {
  const waUrl = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(negocio.mensajeWhatsApp)}`;

  return (
    <section id="contacto" className="py-[clamp(70px,11vw,130px)] bg-beige border-y border-navy/10">
      <div className="px-7 max-w-1240px mx-auto">
        <div className="mb-14 text-center">
          <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Contacto</span>
          <h2
            className="font-serif font-light mt-4 mx-auto max-w-[22ch] text-navy"
            style={{ fontSize: 'clamp(34px,5vw,62px)' }}
          >
            Tu noche comienza con un <em className="italic text-cielo">mensaje</em>
          </h2>
        </div>

        <div className="flex justify-center mb-12">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-naranja hover:bg-naranja-vivo transition text-white font-sans font-semibold text-sm tracking-[0.2em] uppercase px-12 py-5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.565 4.157 1.546 5.894L0 24l6.344-1.513A11.949 11.949 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.947 0-3.768-.538-5.32-1.47l-.385-.228-3.766.898.928-3.657-.246-.38A9.795 9.795 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-820px mx-auto">
          <ContactoCard titulo="Instagram" valor="@hotelmarea"   href={negocio.instagram} />
          <ContactoCard titulo="Facebook"  valor="Hotel Marea"      href={negocio.facebook} />
          <ContactoCard titulo="Teléfono"  valor={negocio.telefono} href={`tel:${negocio.telefono.replace(/\s/g, '')}`} />
        </div>
      </div>
    </section>
  );
}

function ContactoCard({ titulo, valor, href }: { titulo: string; valor: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-soft block bg-white border border-cielo/15 hover:border-cielo/60 transition p-6 text-center group"
    >
      <p className="text-[10px] tracking-[0.28em] uppercase text-niebla font-medium mb-2">{titulo}</p>
      <p className="font-serif text-xl text-navy group-hover:text-naranja transition">{valor}</p>
    </a>
  );
}
