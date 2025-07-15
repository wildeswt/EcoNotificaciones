import { logAction, withLogging } from '../utils/logger';

export interface Notification {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
}

class NotificationService {
  private baseUrl = '/api/notificaciones';

  // Método decorado con logging automático
  @withLogging
  async fetchNotifications(): Promise<Notification[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Error al obtener notificaciones');
    }
    return response.json();
  }

  // Método decorado con logging automático
  @withLogging
  async createNotification(notification: Omit<Notification, 'id'>): Promise<{ ok: boolean }> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });

    if (!response.ok) {
      throw new Error('Error al crear notificación');
    }

    return response.json();
  }

  // Método para validar notificación antes de enviar
  validateNotification(notification: Partial<Notification>): boolean {
    const requiredFields = ['name', 'date', 'description', 'category'];
    const missingFields = requiredFields.filter(field => {
      const value = notification[field as keyof Notification];
      return !value || (typeof value === 'string' && value.trim() === '');
    });
    
    if (missingFields.length > 0) {
      logAction('Validación de notificación fallida', {
        notification,
        missingFields,
        receivedFields: Object.keys(notification)
      }, false, `Campos requeridos faltantes o vacíos: ${missingFields.join(', ')}`);
      return false;
    }

    // Validación adicional para campos específicos
    if (notification.name && notification.name.trim().length < 3) {
      logAction('Validación de notificación fallida', {
        notification,
        error: 'El nombre debe tener al menos 3 caracteres'
      }, false, 'Nombre demasiado corto');
      return false;
    }

    if (notification.description && notification.description.trim().length < 10) {
      logAction('Validación de notificación fallida', {
        notification,
        error: 'La descripción debe tener al menos 10 caracteres'
      }, false, 'Descripción demasiado corta');
      return false;
    }

    logAction('Validación de notificación exitosa', { notification }, true);
    return true;
  }

  // Método para procesar notificación con logging manual
  async processNotification(notificationData: Partial<Notification>): Promise<Notification | null> {
    try {
      // Log del inicio del procesamiento
      logAction('Iniciando procesamiento de notificación', { notificationData }, true);

      // Validar la notificación
      if (!this.validateNotification(notificationData)) {
        return null;
      }

      // Generar ID único
      const existingNotifications = await this.fetchNotifications();
      const newId = `e00${existingNotifications.length + 1}`;

      // Crear notificación completa
      const completeNotification: Notification = {
        id: newId,
        name: notificationData.name!,
        date: notificationData.date!,
        time: notificationData.time || 'Todo el día',
        location: notificationData.location || 'No especificada',
        description: notificationData.description!,
        category: notificationData.category!
      };

      // Enviar notificación
      const result = await this.createNotification(completeNotification);

      if (result.ok) {
        logAction('Notificación procesada exitosamente', { 
          notification: completeNotification,
          result 
        }, true);
        return completeNotification;
      } else {
        throw new Error('Error en la respuesta del servidor');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logAction('Error en procesamiento de notificación', { 
        notificationData,
        error: errorMessage 
      }, false, errorMessage);
      return null;
    }
  }

  // Método para obtener estadísticas de notificaciones
  async getNotificationStats(): Promise<{
    total: number;
    byCategory: Record<string, number>;
    recentCount: number;
  }> {
    try {
      const notifications = await this.fetchNotifications();
      
      const stats = {
        total: notifications.length,
        byCategory: {} as Record<string, number>,
        recentCount: 0
      };

      // Contar por categoría
      notifications.forEach(notification => {
        stats.byCategory[notification.category] = (stats.byCategory[notification.category] || 0) + 1;
      });

      // Contar notificaciones recientes (últimos 7 días)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      stats.recentCount = notifications.filter(notification => 
        new Date(notification.date) >= sevenDaysAgo
      ).length;

      logAction('Estadísticas de notificaciones obtenidas', { stats }, true);
      return stats;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logAction('Error al obtener estadísticas', { error: errorMessage }, false, errorMessage);
      throw error;
    }
  }
}

// Exportar instancia singleton
export const notificationService = new NotificationService();
export default NotificationService; 