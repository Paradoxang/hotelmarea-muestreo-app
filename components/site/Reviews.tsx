const REVIEWS = [
  {
    nombre: 'Isabella V.',
    estrellas: 5,
    suite: 'Suite Tantra',
    texto: 'El jacuzzi elevado y los espejos de techo fueron simplemente mágicos. Un espacio que invita a quedarse mucho más tiempo del planeado.',
  },
  {
    nombre: 'Nicolás & María',
    estrellas: 5,
    suite: 'Llegada privada',
    texto: 'La entrada es completamente reservada. Nadie nos vio llegar, y esa tranquilidad vale más que cualquier lujo material.',
  },
  {
    nombre: 'Ricardo A.',
    estrellas: 5,
    suite: 'Suite Marea',
    texto: 'La suite es exactamente lo que necesitábamos para celebrar. Espaciosa, elegante e impecablemente limpia. Sin duda volveremos.',
  },
  {
    nombre: 'Juliana M.',
    estrellas: 5,
    suite: 'Suite Jacuzzi',
    texto: 'Desde la reserva hasta la salida, todo fue perfecto. El servicio discreto y la habitación de primer nivel. 10 de 10.',
  },
  {
    nombre: 'Sebastián C.',
    estrellas: 5,
    suite: 'Suite Tantra',
    texto: 'La ducha lluvia doble y la silla tántrica nos robaron el corazón. Volvemos el próximo mes sin dudarlo.',
  },
  {
    nombre: 'Pareja anónima',
    estrellas: 5,
    suite: 'Atención al cliente',
    texto: 'A las 2am teníamos una duda y nos atendieron al instante. Ese nivel de servicio no lo encuentras en ningún otro lado.',
  },
];

function Estrellas({ n }: { n: number }) {
  return (
    <div className="text-naranja text-sm tracking-[0.18em]" aria-label={`${n} de 5 estrellas`}>
      {'★'.repeat(n)}
      <span className="text-navy/15">{'★'.repeat(5 - n)}</span>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-[clamp(70px,11vw,130px)] bg-crema">
      <div className="px-7 max-w-1240px mx-auto">
        <div className="mb-16">
          <span className="font-sans font-medium text-[11px] tracking-[0.44em] uppercase text-naranja">Reseñas</span>
          <h2 className="font-serif font-light mt-4 text-navy" style={{ fontSize: 'clamp(34px,5vw,62px)' }}>
            Quienes nos visitaron <em className="italic text-cielo">vuelven siempre</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <article key={r.nombre} className="card-soft bg-white border border-cielo/15 p-7 flex flex-col group">
              <Estrellas n={r.estrellas} />
              <p className="font-serif italic text-xl leading-snug mt-5 text-navy/85">&ldquo;{r.texto}&rdquo;</p>
              <div className="mt-auto pt-6 border-t border-navy/10 mt-7">
                <p className="font-sans font-medium text-sm text-navy">{r.nombre}</p>
                <p className="text-[11px] tracking-[0.08em] uppercase text-niebla mt-1">{r.suite}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
