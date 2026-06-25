export const featureFlags = {
  reservasActivas: process.env.RESERVAS_ACTIVAS === 'true',
  pagosActivos: process.env.PAGOS_ACTIVOS === 'true',
};

export const negocio = {
  nombre: 'Hotel Marea',
  whatsapp: '573109876543',
  telefono: '+57 310 987 6543',
  instagram: 'https://instagram.com/hotelmarea',
  facebook: 'https://facebook.com/hotelmarea',
  web: 'hotelmarea.com.co',
  direccion: 'Vía Las Palmas Km 3, El Poblado, Medellín, Antioquia',
  mensajeWhatsApp: 'Hola, quisiera reservar una suite en Hotel Marea.',
};
