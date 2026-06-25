// ── Imágenes de stock (Unsplash) ──
// Todas verificadas (HTTP 200). Para sustituir cualquier foto, edita SOLO este archivo.
// `unsplash(id, ancho)` arma la URL optimizada.

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

// Hero split-screen: panel íntimo (izq) + panel luminoso/costa (der)
export const heroIzq = '1582719478250-c89cae4dc85b'; // suite cálida e íntima
export const heroDer = '1507525428034-b723cf961d3e'; // costa luminosa

// Foto principal por suite (slug)
export const suiteFoto: Record<string, string> = {
  extasis: '1591088398332-8a7791972843',
  jacuzzi: '1590490360182-c33d57733427',
  tantra:  '1610641818989-c2051b5e2cfd',
};
export const suiteFotoDefault = '1566073771259-6a8506099945';
export const fotoDeSuite = (slug: string) => suiteFoto[slug] ?? suiteFotoDefault;

// URL final de la imagen de una suite. Respeta `imagenUrl` SOLO si es http(s);
// cualquier ruta local heredada en la DB (p.ej. '/suites/extasis.jpg') cae al stock.
export const imagenDeSuite = (slug: string, imagenUrl?: string | null, w = 1200) =>
  imagenUrl && /^https?:\/\//.test(imagenUrl) ? imagenUrl : unsplash(fotoDeSuite(slug), w);

// Galería principal (6 imágenes)
export const galeriaFotos = [
  { id: '1611892440504-42a792e24d32', alt: 'Suite principal' },
  { id: '1590490360182-c33d57733427', alt: 'Jacuzzi privado' },
  { id: '1505693416388-ac5ce068fe85', alt: 'Ambiente íntimo' },
  { id: '1551776235-dde6d482980b',    alt: 'Área de baño' },
  { id: '1554995207-c18c203602cb',    alt: 'Área de piscina' },
  { id: '1535827841776-24afc1e255ac', alt: 'Iluminación de ambiente' },
];

// Página de servicios (bento)
export const servicioFoto = {
  suite:   '1566073771259-6a8506099945',
  jacuzzi: '1596178065887-1198b6148b2b',
};

// Galería rápida del detalle de suite (3 imágenes)
export const detalleFotos = [
  '1631049307264-da0ec9d70304',
  '1507652313519-d4e9174996dd',
  '1560448204-e02f11c3d0e2',
];
