import { eq, asc, min } from 'drizzle-orm';
import { db } from '@/db';
import { suites, suitePrecios } from '@/db/schema';

export type SuiteListItem = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string | null;
  precioDesdeCents: number;
};

const SUITES_FALLBACK: SuiteListItem[] = [
  {
    id: 'static-extasis',
    slug: 'extasis',
    nombre: 'Suite Marea',
    descripcion: 'Cama king, pantalla 65" & streaming, luces de ambiente regulables. La entrada al placer.',
    imagenUrl: null,
    precioDesdeCents: 12_000_000,
  },
  {
    id: 'static-jacuzzi',
    slug: 'jacuzzi',
    nombre: 'Suite Jacuzzi',
    descripcion: 'Jacuzzi para dos, ducha lluvia, muro de ladrillo artesanal. Calor y sensualidad en cada rincón.',
    imagenUrl: null,
    precioDesdeCents: 16_000_000,
  },
  {
    id: 'static-tantra',
    slug: 'tantra',
    nombre: 'Suite Tantra',
    descripcion: 'Silla tántrica, jacuzzi elevado, espejo de piso a techo. La experiencia suprema del deseo.',
    imagenUrl: null,
    precioDesdeCents: 19_000_000,
  },
];

const PRECIOS_FALLBACK: Record<string, { turno: string; precioCents: number; duracionMin: number }[]> = {
  extasis: [
    { turno: 'tres_horas', precioCents: 12_000_000, duracionMin: 180 },
    { turno: 'seis_horas', precioCents: 18_000_000, duracionMin: 360 },
    { turno: 'amanecida',  precioCents: 24_000_000, duracionMin: 720 },
  ],
  jacuzzi: [
    { turno: 'tres_horas', precioCents: 16_000_000, duracionMin: 180 },
    { turno: 'seis_horas', precioCents: 22_000_000, duracionMin: 360 },
    { turno: 'amanecida',  precioCents: 30_000_000, duracionMin: 720 },
  ],
  tantra: [
    { turno: 'tres_horas', precioCents: 19_000_000, duracionMin: 180 },
    { turno: 'seis_horas', precioCents: 26_000_000, duracionMin: 360 },
    { turno: 'amanecida',  precioCents: 34_000_000, duracionMin: 720 },
  ],
};

export async function obtenerSuites(): Promise<SuiteListItem[]> {
  try {
    const rows = await db
      .select({
        id: suites.id,
        slug: suites.slug,
        nombre: suites.nombre,
        descripcion: suites.descripcion,
        imagenUrl: suites.imagenUrl,
        precioDesdeCents: min(suitePrecios.precioCents),
      })
      .from(suites)
      .leftJoin(suitePrecios, eq(suitePrecios.suiteId, suites.id))
      .where(eq(suites.activa, true))
      .groupBy(suites.id)
      .orderBy(asc(suites.creadaEn));

    if (rows.length === 0) return SUITES_FALLBACK;
    return rows.map((r) => ({ ...r, precioDesdeCents: r.precioDesdeCents ?? 0 }));
  } catch {
    return SUITES_FALLBACK;
  }
}

export async function obtenerSuitePorSlug(slug: string) {
  try {
    const [suite] = await db
      .select()
      .from(suites)
      .where(eq(suites.slug, slug))
      .limit(1);

    if (!suite) return buildFallbackSuite(slug);

    const precios = await db
      .select({
        turno: suitePrecios.turno,
        precioCents: suitePrecios.precioCents,
        duracionMin: suitePrecios.duracionMin,
      })
      .from(suitePrecios)
      .where(eq(suitePrecios.suiteId, suite.id));

    return { ...suite, precios };
  } catch {
    return buildFallbackSuite(slug);
  }
}

function buildFallbackSuite(slug: string) {
  const base = SUITES_FALLBACK.find((s) => s.slug === slug);
  if (!base) return null;
  return {
    id: base.id,
    slug: base.slug,
    nombre: base.nombre,
    descripcion: base.descripcion,
    imagenUrl: base.imagenUrl,
    capacidad: 2,
    activa: true,
    creadaEn: new Date(),
    precios: PRECIOS_FALLBACK[slug] ?? [],
  };
}
