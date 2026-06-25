import { NextRequest, NextResponse } from 'next/server';
import { crearReserva } from '@/modules/reservas';
import type { Turno } from '@/modules/reservas';

export async function POST(req: NextRequest) {
  let body: { suiteId?: string; turno?: Turno; inicia?: string; contacto?: { nombre?: string; email?: string; telefono?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
  }

  const { suiteId, turno, inicia: iniciaStr, contacto } = body;
  if (!suiteId || !turno || !iniciaStr) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  const inicia = new Date(iniciaStr);
  if (isNaN(inicia.getTime())) {
    return NextResponse.json({ error: 'Fecha inválida.' }, { status: 400 });
  }

  try {
    const reserva = await crearReserva({ suiteId, turno, inicia, contacto });
    return NextResponse.json({
      id: reserva.id,
      inicia: reserva.inicia.toISOString(),
      termina: reserva.termina.toISOString(),
      totalCents: reserva.totalCents,
      estado: reserva.estado,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error al crear la reserva.' },
      { status: 409 },
    );
  }
}
