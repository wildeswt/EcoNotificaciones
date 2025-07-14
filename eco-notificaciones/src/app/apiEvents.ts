// apiEvents.ts - Actualizado con logging orientado a aspectos
import { logAction } from './utils/logger';
import { notificationService } from './services/NotificationService';

export async function fetchEvents() {
  try {
    logAction('Iniciando fetchEvents', {}, true);
    const events = await notificationService.fetchNotifications();
    logAction('fetchEvents completado', { count: events.length }, true);
    return events;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAction('Error en fetchEvents', { error: errorMessage }, false, errorMessage);
    throw error;
  }
} 

export async function postEvent(notificación: any) {
  try {
    logAction('Iniciando postEvent', { notificación }, true);
    
    // Usar el servicio de notificaciones que incluye logging automático
    const result = await notificationService.createNotification(notificación);
    
    logAction('postEvent completado', { result, notificación }, true);
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAction('Error en postEvent', { 
      notificación, 
      error: errorMessage 
    }, false, errorMessage);
    throw error;
  }
}

// Nueva función que usa el procesamiento completo con validación
export async function createNotificationWithValidation(notificationData: any) {
  try {
    logAction('Iniciando creación de notificación con validación', { notificationData }, true);
    
    const result = await notificationService.processNotification(notificationData);
    
    if (result) {
      logAction('Notificación creada con validación exitosa', { result }, true);
      return result;
    } else {
      logAction('Validación de notificación fallida', { notificationData }, false, 'Datos de notificación inválidos');
      throw new Error('Datos de notificación inválidos');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAction('Error en creación con validación', { 
      notificationData, 
      error: errorMessage 
    }, false, errorMessage);
    throw error;
  }
}

// Función para obtener estadísticas
export async function getNotificationStats() {
  try {
    logAction('Solicitando estadísticas de notificaciones', {}, true);
    const stats = await notificationService.getNotificationStats();
    logAction('Estadísticas obtenidas', { stats }, true);
    return stats;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAction('Error al obtener estadísticas', { error: errorMessage }, false, errorMessage);
    throw error;
  }
}

