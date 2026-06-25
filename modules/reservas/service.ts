import { and, eq, lt, gt, inArray } from 'drizzle-orm';
import { db } from '@/db';
import { suites, suitePrecios, reservas } from '@/db/schema';

export type Turno = 'tres_horas' | 'seis_horas' | 'amanecida';

const ESTADOS_VIVOS = ['pendiente', 'confirmada', 'pagada'] as const;

export function calcularFin(inicia: Date, duracionMin: number): Date {
  return new Date(inicia.getTime() + duracionMin * 60_000);
}

export async function estaDisponible(suiteId: string, inicia: Date, termina: Date) {
  const choques = await db
    .select({ id: reservas.id })
    .from(reservas)
    .where(
      and(
        eq(reservas.suiteId, suiteId),
        inArray(reservas.estado, [...ESTADOS_VIVOS]),
        lt(reservas.inicia, termina),
        gt(reservas.termina, inicia),
      ),
    )
    .limit(1);

  return choques.length === 0;
}

export async function obtenerTarifa(suiteId: string, turno: Turno) {
  const [tarifa] = await db
    .select({ precioCents: suitePrecios.precioCents, duracionMin: suitePrecios.duracionMin })
    .from(suitePrecios)
    .where(and(eq(suitePrecios.suiteId, suiteId), eq(suitePrecios.turno, turno)))
    .limit(1);

  return tarifa ?? null;
}

export async function crearReserva(input: {
  suiteId: string;
  turno: Turno;
  inicia: Date;
  contacto?: { nombre?: string; email?: string; telefono?: string };
}) {
  const tarifa = await obtenerTarifa(input.suiteId, input.turno);
  if (!tarifa) throw new Error('Esa suite no ofrece ese turno.');

  const termina = calcularFin(input.inicia, tarifa.duracionMin);

  if (!(await estaDisponible(input.suiteId, input.inicia, termina))) {
    throw new Error('La suite ya está reservada en ese horario.');
  }

  const expiraEn = new Date(Date.now() + 15 * 60_000);

  try {
    const [reserva] = await db
      .insert(reservas)
      .values({
        suiteId: input.suiteId,
        turno: input.turno,
        inicia: input.inicia,
        termina,
        estado: 'pendiente',
        totalCents: tarifa.precioCents,
        nombre: input.contacto?.nombre,
        email: input.contacto?.email,
        telefono: input.contacto?.telefono,
        expiraEn,
      })
      .returning();

    return reserva;
  } catch (err: unknown) {
    if (String((err as { message?: string })?.message).includes('reservas_sin_solapamiento')) {
      throw new Error('Justo alguien reservó esa suite ese horario. Intenta otro turno.');
    }
    throw err;
  }
}
