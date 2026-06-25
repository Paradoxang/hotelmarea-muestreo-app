import 'dotenv/config';
import { db } from './index';
import { suites, suitePrecios } from './schema';

const data = [
  {
    slug: 'extasis',
    nombre: 'Suite Marea',
    descripcion: 'Cama king, pantalla 65" & streaming, luces de ambiente regulables. La entrada al placer.',
    imagenUrl: null,
    precios: [['tres_horas', 12_000_000, 180], ['seis_horas', 18_000_000, 360], ['amanecida', 24_000_000, 720]],
  },
  {
    slug: 'jacuzzi',
    nombre: 'Suite Jacuzzi',
    descripcion: 'Jacuzzi para dos, ducha lluvia, muro de ladrillo artesanal. Calor y sensualidad en cada rincón.',
    imagenUrl: null,
    precios: [['tres_horas', 16_000_000, 180], ['seis_horas', 22_000_000, 360], ['amanecida', 30_000_000, 720]],
  },
  {
    slug: 'tantra',
    nombre: 'Suite Tantra',
    descripcion: 'Silla tántrica, jacuzzi elevado, espejo de piso a techo. La experiencia suprema del deseo.',
    imagenUrl: null,
    precios: [['tres_horas', 19_000_000, 180], ['seis_horas', 26_000_000, 360], ['amanecida', 34_000_000, 720]],
  },
] as const;

async function seed() {
  console.log('Sembrando suites Hotel Marea…');
  for (const s of data) {
    const [suite] = await db.insert(suites)
      .values({ slug: s.slug, nombre: s.nombre, descripcion: s.descripcion, imagenUrl: s.imagenUrl })
      .returning();

    await db.insert(suitePrecios).values(
      s.precios.map(([turno, precioCents, duracionMin]) => ({
        suiteId: suite.id,
        turno: turno as 'tres_horas' | 'seis_horas' | 'amanecida',
        precioCents,
        duracionMin,
      })),
    );
    console.log('  +', s.nombre);
  }
  console.log('Listo ✔');
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
