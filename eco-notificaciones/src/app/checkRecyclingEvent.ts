import { fetchEvents } from './apiEvents';

// Función para verificar si hay un evento de reciclaje hoy y mostrar alerta
export async function checkRecyclingEventToday() {
  try {
    const events = await fetchEvents();
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

    const eventToday = events.find(
      (event) => event.date === today && event.category === 'reciclaje'
    );

    if (eventToday) {
      alert(
        `¡Participa en ${eventToday.name}, hoy de ${eventToday.time} en ${eventToday.location}!`
      );
    }
  } catch (error) {
    console.error('Error al consultar los eventos:', error);
    // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
  }
} 