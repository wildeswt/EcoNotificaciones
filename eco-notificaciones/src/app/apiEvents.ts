// apiEvents.ts

// Datos simulados para eventos universitarios sostenibles
export const simulatedEventsData = [
  {
    id: 'e001',
    name: 'Jornada de Recolección de Residuos Electrónicos',
    date: '2025-07-05',
    time: '09:00 AM - 04:00 PM',
    location: 'Plaza Central de la Universidad',
    description: 'Trae tus equipos electrónicos viejos o dañados para un reciclaje responsable.',
    category: 'reciclaje'
  },
  {
    id: 'e002',
    name: 'Taller de Huertos Urbanos',
    date: '2025-07-12',
    time: '10:00 AM - 01:00 PM',
    location: 'Jardín Botánico Universitario',
    description: 'Aprende a crear tu propio huerto urbano con métodos sostenibles.',
    category: 'educacion'
  },
  {
    id: 'e003',
    name: 'Día del Peatón y Ciclista Universitario',
    date: '2025-07-19',
    time: 'Todo el día',
    location: 'Campus Universitario',
    description: 'Fomentamos el uso de transporte sostenible. ¡Ven sin tu coche!',
    category: 'transporte'
  },
  // Evento adicional para hoy
  {
    id: 'e004',
    name: 'Reciclaje Exprés en el Campus',
    date: '2025-07-13',
    time: '11:00 AM - 01:00 PM',
    location: 'Edificio Central',
    description: '¡Trae tus botellas y participa en el reto de reciclaje!',
    category: 'reciclaje'
  },
  {
    id: 'e004',
    name: 'Reciclaje Exprés en el Campus 2',
    date: '2025-07-13',
    time: '11:00 AM - 01:00 PM',
    location: 'Edificio Central',
    description: '¡Trae tus botellas y participa en el reto de reciclaje!',
    category: 'reciclaje'
  }
];

//promises
export async function fetchEvents() {
  return new Promise<typeof simulatedEventsData>((resolve) => {
    setTimeout(() => resolve(simulatedEventsData), 500);
  });
} 