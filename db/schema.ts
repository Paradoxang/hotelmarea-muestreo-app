import {
  pgTable, pgEnum, uuid, text, integer, boolean, timestamp, unique, index,
} from 'drizzle-orm/pg-core';

export const turnoEnum = pgEnum('turno', ['tres_horas', 'seis_horas', 'amanecida']);
export const estadoEnum = pgEnum('reserva_estado', [
  'pendiente', 'confirmada', 'pagada', 'cancelada', 'expirada',
]);

export const suites = pgTable('suites', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion').notNull(),
  imagenUrl: text('imagen_url'),
  capacidad: integer('capacidad').notNull().default(2),
  activa: boolean('activa').notNull().default(true),
  creadaEn: timestamp('creada_en', { withTimezone: true }).notNull().defaultNow(),
});

export const suitePrecios = pgTable('suite_precios', {
  id: uuid('id').defaultRandom().primaryKey(),
  suiteId: uuid('suite_id').notNull().references(() => suites.id, { onDelete: 'cascade' }),
  turno: turnoEnum('turno').notNull(),
  precioCents: integer('precio_cents').notNull(),
  duracionMin: integer('duracion_min').notNull(),
}, (t) => ({
  unicoSuiteTurno: unique('unico_suite_turno').on(t.suiteId, t.turno),
}));

export const reservas = pgTable('reservas', {
  id: uuid('id').defaultRandom().primaryKey(),
  suiteId: uuid('suite_id').notNull().references(() => suites.id),
  turno: turnoEnum('turno').notNull(),
  inicia: timestamp('inicia', { withTimezone: true }).notNull(),
  termina: timestamp('termina', { withTimezone: true }).notNull(),
  estado: estadoEnum('estado').notNull().default('pendiente'),
  nombre: text('nombre'),
  email: text('email'),
  telefono: text('telefono'),
  totalCents: integer('total_cents').notNull(),
  referenciaPago: text('referencia_pago'),
  expiraEn: timestamp('expira_en', { withTimezone: true }),
  creadaEn: timestamp('creada_en', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  idxSuiteRango: index('idx_suite_rango').on(t.suiteId, t.inicia, t.termina),
}));
