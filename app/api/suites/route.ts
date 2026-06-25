import { NextResponse } from 'next/server';
import { obtenerSuites } from '@/modules/reservas';

export async function GET() {
  const suites = await obtenerSuites();
  return NextResponse.json(suites);
}
