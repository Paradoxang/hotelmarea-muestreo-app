import { NextRequest, NextResponse } from 'next/server';
import { estaDisponible, obtenerTarifa, calcularFin } from '@/modules/reservas';
import type { Turno } from '@/modules/reservas';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const suiteId = searchParams.get('suiteId');
  const turno = searchParams.get('turno') as Turno | null;
  const iniciaStr = searchParams.get('inicia');

  if (!suiteId || !turno || !iniciaStr) {
    return NextResponse.json({ error: 'Faltan parámetros.' }, { status: 400 });
  }

  const inicia = new Date(iniciaStr);
  if (isNaN(inicia.getTime())) {
    return NextResponse.json({ error: 'Fecha inválida.' }, { status: 400 });
  }

  const tarifa = await obtenerTarifa(suiteId, turno);
  if (!tarifa) {
    return NextResponse.json({ error: 'Turno no disponible para esa suite.' }, { status: 404 });
  }

  const termina = calcularFin(inicia, tarifa.duracionMin);
  const disponible = await estaDisponible(suiteId, inicia, termina);

  return NextResponse.json({
    disponible,
    termina: termina.toISOString(),
    precioCents: tarifa.precioCents,
  });
}
