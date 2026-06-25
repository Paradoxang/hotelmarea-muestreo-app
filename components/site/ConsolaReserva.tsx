'use client';

import { useState } from 'react';
import { formatearCOP, formatearHora } from '@/lib/format';

type SuiteOpcion = { id: string; nombre: string };

const TURNOS = [
  { value: 'tres_horas', label: '3 horas'   },
  { value: 'seis_horas', label: '6 horas'   },
  { value: 'amanecida',  label: 'Amanecida' },
];

function fechaPorDefecto() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T21:00`;
}

export function ConsolaReserva({ suites }: { suites: SuiteOpcion[] }) {
  const [suiteId, setSuiteId] = useState(suites[0]?.id ?? '');
  const [turno,   setTurno]   = useState(TURNOS[0].value);
  const [fecha,   setFecha]   = useState(fechaPorDefecto());

  const [estado, setEstado] = useState<'idle' | 'consultando' | 'resultado' | 'reservando' | 'confirmada'>('idle');
  const [resultado, setResultado] = useState<{ disponible: boolean; termina: string; precioCents: number } | null>(null);
  const [reserva,   setReserva]   = useState<{ inicia: string; termina: string; totalCents: number } | null>(null);
  const [error,     setError]     = useState<string | null>(null);
  const [nombre,    setNombre]    = useState('');
  const [telefono,  setTelefono]  = useState('');

  const inicia = `${fecha}:00-05:00`;

  async function consultar() {
    setError(null); setReserva(null); setEstado('consultando');
    try {
      const url = `/api/disponibilidad?suiteId=${suiteId}&turno=${turno}&inicia=${encodeURIComponent(inicia)}`;
      const res  = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'No se pudo consultar.');
      setResultado(data);
      setEstado('resultado');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
      setEstado('idle');
    }
  }

  async function reservar() {
    setError(null); setEstado('reservando');
    try {
      const res  = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suiteId, turno, inicia,
          contacto: { nombre: nombre || undefined, telefono: telefono || undefined },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'No se pudo reservar.');
      setReserva(data);
      setEstado('confirmada');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
      setEstado('resultado');
    }
  }

  return (
    <div className="mt-10 max-w-920px w-full">
      {/* Barra de selección */}
      <div className="flex flex-wrap bg-white/90 backdrop-blur-md border border-white/50 border-t-2 border-t-naranja shadow-2xl">
        <div className="flex-1 min-w-150px px-5 py-4 border-r border-navy/10 text-left">
          <label className="block text-[10px] tracking-[0.28em] uppercase text-navy/40 font-medium mb-2">Suite</label>
          <select
            value={suiteId}
            onChange={(e) => setSuiteId(e.target.value)}
            className="w-full bg-transparent text-navy font-serif text-xl font-normal outline-none cursor-pointer"
          >
            {suites.map((s) => (
              <option key={s.id} value={s.id} className="bg-white font-sans text-sm">{s.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-130px px-5 py-4 border-r border-navy/10 text-left">
          <label className="block text-[10px] tracking-[0.28em] uppercase text-navy/40 font-medium mb-2">Turno</label>
          <select
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            className="w-full bg-transparent text-navy font-serif text-xl font-normal outline-none cursor-pointer"
          >
            {TURNOS.map((t) => (
              <option key={t.value} value={t.value} className="bg-white font-sans text-sm">{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-210px px-5 py-4 border-r border-navy/10 text-left">
          <label className="block text-[10px] tracking-[0.28em] uppercase text-navy/40 font-medium mb-2">Llegada</label>
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full bg-transparent text-navy font-serif text-lg font-normal outline-none cursor-pointer"
          />
        </div>

        <button
          onClick={consultar}
          disabled={estado === 'consultando'}
          className="hero-cta bg-naranja hover:bg-naranja-vivo disabled:opacity-60 transition text-white font-sans font-semibold text-xs tracking-[0.22em] uppercase px-8 grow md:grow-0 py-5"
        >
          {estado === 'consultando' ? 'Buscando…' : 'Ver disponibilidad'}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600 bg-white/85 inline-block px-3 py-1.5 rounded">{error}</p>}

      {estado === 'resultado' && resultado && !resultado.disponible && (
        <p className="mt-4 text-sm text-white/85 bg-navy/55 inline-block px-3 py-1.5 rounded">
          Esa suite está ocupada en ese horario. Prueba otro turno u hora.
        </p>
      )}

      {(estado === 'resultado' || estado === 'reservando') && resultado?.disponible && (
        <div className="mt-4 bg-white border border-navy/10 border-l-2 border-l-naranja p-5 text-left shadow-xl">
          <p className="font-serif text-2xl text-navy">
            Disponible · <span className="text-naranja">{formatearCOP(resultado.precioCents)}</span>
          </p>
          <p className="text-sm text-niebla mt-1">Termina a las {formatearHora(resultado.termina)}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <input
              placeholder="Nombre (opcional)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="flex-1 min-w-140px bg-transparent border border-navy/15 px-3 py-2 text-sm text-navy outline-none focus:border-naranja transition"
            />
            <input
              placeholder="Teléfono (opcional)"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="flex-1 min-w-140px bg-transparent border border-navy/15 px-3 py-2 text-sm text-navy outline-none focus:border-naranja transition"
            />
          </div>

          <button
            onClick={reservar}
            disabled={estado === 'reservando'}
            className="mt-4 bg-naranja hover:bg-naranja-vivo disabled:opacity-60 transition text-white font-sans font-semibold text-xs tracking-[0.22em] uppercase px-8 py-3.5"
          >
            {estado === 'reservando' ? 'Reservando…' : 'Confirmar reserva'}
          </button>
        </div>
      )}

      {estado === 'confirmada' && reserva && (
        <div className="mt-4 bg-white border border-naranja/40 p-5 text-left shadow-xl">
          <p className="font-serif text-2xl text-naranja">¡Reserva creada!</p>
          <p className="text-sm text-niebla mt-2">
            {formatearHora(reserva.inicia)} → {formatearHora(reserva.termina)} · {formatearCOP(reserva.totalCents)}
          </p>
          <p className="text-xs text-niebla mt-3">
            Tu reserva quedó <strong className="text-navy">pendiente</strong>. El equipo de Hotel Marea te confirmará pronto.
          </p>
        </div>
      )}
    </div>
  );
}
